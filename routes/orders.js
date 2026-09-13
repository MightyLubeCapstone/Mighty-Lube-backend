const express = require("express");
const { authenticate, requireAdmin } = require("./sessions");
const ProductConfiguration = require("../models/product_configuration");
const { sendOrderNotification } = require("../utils/emailnotif");

const router = express.Router();

const ALLOWED_STATUSES = [
  "draft",
  "cart",
  "submitted",
  "completed",
  "archived",
];

/**
 * Calculates elapsed time between two dates.
 * Used mainly for submitted/completed configurations.
 */
function calculateProcessingTime(startDate, endDate) {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;

  if (diffMs < 0) return null;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (diffMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  return {
    totalMs: diffMs,
    days,
    hours,
    minutes,
    formatted:
      days > 0
        ? `${days} day${days > 1 ? "s" : ""}, ${hours} hour${hours > 1 ? "s" : ""}`
        : hours > 0
          ? `${hours} hour${hours > 1 ? "s" : ""}, ${minutes} minute${minutes > 1 ? "s" : ""}`
          : `${minutes} minute${minutes > 1 ? "s" : ""}`,
  };
}

/**
 * Deep-merges incoming configurationData into existing data.
 * Arrays and primitive values are replaced.
 */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      deepMerge(targetValue, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  }

  return target;
}

/**
 * Stores who performed the latest change.
 */
function createActor(user) {
  return {
    userID: user.userID,
    username: user.username,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    role: user.role || "user",
  };
}

/**
 * PUT /api/orders/editing
 *
 * Updates one ProductConfiguration.
 *
 * Normal user:
 *   Can edit only own configuration.
 *
 * Admin:
 *   Can edit any configuration.
 *
 * Body:
 * {
 *   configurationID,
 *   userID?,              // optional for admin
 *   configurationName?,
 *   numRequested?,
 *   configurationData?
 * }
 */
router.put("/editing", authenticate, async (req, res) => {
  try {
    const {
      configurationID,
      userID,
      configurationName,
      numRequested,
      configurationData,
    } = req.body || {};

    if (!configurationID) {
      return res.status(400).json({
        success: false,
        message: "configurationID is required",
      });
    }

    // Ownership is enforced directly in the database query.
    const query = { configurationID };

    if (req.user.role !== "admin") {
      query.userID = req.user.userID;
    } else if (userID) {
      query.userID = userID;
    }

    const configuration = await ProductConfiguration.findOne(query);

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    if (configurationName !== undefined) {
      configuration.configurationName = configurationName;
    }

    if (numRequested !== undefined) {
      const quantity = Number(numRequested);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "numRequested must be a positive integer",
        });
      }

      configuration.numRequested = quantity;
    }

    if (configurationData !== undefined) {
      if (
        !configurationData ||
        typeof configurationData !== "object" ||
        Array.isArray(configurationData)
      ) {
        return res.status(400).json({
          success: false,
          message: "configurationData must be an object",
        });
      }

      const currentData =
        configuration.configurationData &&
        typeof configuration.configurationData === "object"
          ? configuration.configurationData
          : {};

      configuration.configurationData = deepMerge(
        currentData,
        configurationData
      );

      // configurationData is Mixed in ProductConfiguration schema.
      configuration.markModified("configurationData");
    }

    configuration.updatedBy = createActor(req.user);

    const savedConfiguration = await configuration.save();

    // Email failure must not fail the actual configuration update.
    try {
      await sendOrderNotification(
        req.user,
        savedConfiguration,
        "edited"
      );
    } catch (emailError) {
      console.warn(
        "Failed to send configuration edit notification:",
        emailError
      );
    }

    return res.status(200).json({
      success: true,
      message: "Configuration updated successfully",
      configurationID: savedConfiguration.configurationID,
      userID: savedConfiguration.userID,
      configurationName: savedConfiguration.configurationName,
      status: savedConfiguration.status,
      numRequested: savedConfiguration.numRequested,
      updatedAt: savedConfiguration.updatedAt,
    });
  } catch (error) {
    console.error("Error updating configuration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update configuration",
    });
  }
});

/**
 * PUT /api/orders/status
 *
 * Admin-only route for changing configuration workflow status.
 *
 * Body:
 * {
 *   configurationID,
 *   status
 * }
 */
router.put("/status", authenticate, requireAdmin, async (req, res) => {
  try {
    const { configurationID, status } = req.body || {};

    if (!configurationID || !status) {
      return res.status(400).json({
        success: false,
        message: "configurationID and status are required",
      });
    }

    const normalizedStatus = String(status).trim().toLowerCase();

    if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid configuration status",
        allowedStatuses: ALLOWED_STATUSES,
      });
    }

    const configuration = await ProductConfiguration.findOne({
      configurationID,
    });

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    const previousStatus = configuration.status;

    configuration.status = normalizedStatus;
    configuration.updatedBy = createActor(req.user);

    // First time configuration reaches submitted state.
    if (
      normalizedStatus === "submitted" &&
      !configuration.submittedAt
    ) {
      configuration.submittedAt = new Date();
    }

    // Completion timestamp is stored only once.
    if (normalizedStatus === "completed") {
      configuration.isComplete = true;

      if (!configuration.completedAt) {
        configuration.completedAt = new Date();
      }
    }

    const savedConfiguration = await configuration.save();

    if (
      normalizedStatus === "completed" &&
      previousStatus !== "completed"
    ) {
      try {
        await sendOrderNotification(
          req.user,
          savedConfiguration,
          "complete",
          savedConfiguration.configurationName
        );
      } catch (emailError) {
        console.warn(
          "Failed to send completion notification:",
          emailError
        );
      }
    }

    const response = {
      success: true,
      message: "Configuration status updated successfully",
      configurationID: savedConfiguration.configurationID,
      userID: savedConfiguration.userID,
      configurationName: savedConfiguration.configurationName,
      previousStatus,
      status: savedConfiguration.status,
      updatedAt: savedConfiguration.updatedAt,
    };

    if (normalizedStatus === "completed") {
      response.completedAt = savedConfiguration.completedAt;
      response.processingTime = calculateProcessingTime(
        savedConfiguration.submittedAt || savedConfiguration.createdAt,
        savedConfiguration.completedAt
      );
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error updating configuration status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update configuration status",
    });
  }
});

/**
 * PUT /api/orders/complete-cart-order
 *
 * Kept with old route name for API compatibility.
 * Internally there is no embedded cart anymore.
 *
 * Body:
 * {
 *   configurationID
 * }
 */
router.put("/complete-cart-order", authenticate, async (req, res) => {
  try {
    const { configurationID } = req.body || {};

    if (!configurationID) {
      return res.status(400).json({
        success: false,
        message: "configurationID is required",
      });
    }

    // User can complete only their own configuration.
    const configuration = await ProductConfiguration.findOne({
      configurationID,
      userID: req.user.userID,
    });

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    configuration.status = "completed";
    configuration.isComplete = true;
    configuration.updatedBy = createActor(req.user);

    if (!configuration.completedAt) {
      configuration.completedAt = new Date();
    }

    const savedConfiguration = await configuration.save();

    try {
      await sendOrderNotification(
        req.user,
        savedConfiguration,
        "complete"
      );
    } catch (emailError) {
      console.warn(
        "Failed to send completion notification:",
        emailError
      );
    }

    const processingTime = calculateProcessingTime(
      savedConfiguration.submittedAt || savedConfiguration.createdAt,
      savedConfiguration.completedAt
    );

    return res.status(200).json({
      success: true,
      message: `Configuration ${configurationID} marked as completed`,
      configurationID: savedConfiguration.configurationID,
      status: savedConfiguration.status,
      completedAt: savedConfiguration.completedAt,
      processingTime,
    });
  } catch (error) {
    console.error("Error completing configuration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete configuration",
    });
  }
});

/**
 * GET /api/orders/completion-status/:configurationID
 *
 * Returns completion information directly from
 * product_configurations.
 *
 * Normal user sees only their own configuration.
 * Admin can check any configuration.
 */
router.get(
  "/completion-status/:configurationID",
  authenticate,
  async (req, res) => {
    try {
      const { configurationID } = req.params;

      const query = { configurationID };

      if (req.user.role !== "admin") {
        query.userID = req.user.userID;
      }

      const configuration = await ProductConfiguration.findOne(query);

      if (!configuration) {
        return res.status(404).json({
          success: false,
          message: "Configuration not found",
        });
      }

      const processingTime = configuration.completedAt
        ? calculateProcessingTime(
            configuration.submittedAt || configuration.createdAt,
            configuration.completedAt
          )
        : null;

      return res.status(200).json({
        success: true,
        configurationID: configuration.configurationID,
        configurationName: configuration.configurationName,
        productType: configuration.productType,
        productName: configuration.productName,
        status: configuration.status,
        isComplete: configuration.isComplete,
        createdAt: configuration.createdAt,
        submittedAt: configuration.submittedAt,
        completedAt: configuration.completedAt,
        processingTime,
      });
    } catch (error) {
      console.error(
        "Error getting configuration completion status:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to get configuration completion status",
      });
    }
  }
);

module.exports = router