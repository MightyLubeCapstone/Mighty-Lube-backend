const express = require("express");
const { authenticate } = require("../../sessions");
const SLMLMS = require("../../../models/OHP/CMS/SLMLMS");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();

// ============================================================
// POST /api/slmlms
// Single Line (Stationary) Mighty Lube Monitoring System
// Product ID: OHP_001
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { SLMLMSData, numRequested } = req.body || {};

    // ============================================================
    // REQUEST VALIDATION
    // ============================================================

    if (
      !SLMLMSData ||
      typeof SLMLMSData !== "object" ||
      Array.isArray(SLMLMSData)
    ) {
      return res.status(400).json({
        success: false,
        message: "SLMLMSData is required",
      });
    }

    const quantity = Number(numRequested);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }

    // ============================================================
    // PRODUCT-SPECIFIC VALIDATION
    // ============================================================

    const validation = new SLMLMS(SLMLMSData);

    await validation.validate();

    const configurationData = validation.toObject({
      versionKey: false,
    });

    // Validation model is not persisted directly.
    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    // ============================================================
    // USER / ACTOR INFORMATION
    // ============================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role || "user",
    };

    // ============================================================
    // SAVE GENERIC PRODUCT CONFIGURATION
    // ============================================================

    const productConfiguration = new ProductConfiguration({
      userID: req.user.userID,

      configurationName:
        configurationData.conveyorName ||
        "Single Line Stationary Monitoring System",

      // Actual frontend/catalog Product ID
      productType: "OHP_001",

      productName:
        "Single Line (Stationary) Mighty Lube Monitoring System",

      status: "cart",
      isComplete: true,

      numRequested: quantity,

      configurationData,

      createdBy: actor,
      updatedBy: actor,
    });

    const savedConfiguration = await productConfiguration.save();

    // ============================================================
    // RESPONSE
    // ============================================================

    return res.status(201).json({
      success: true,
      message: "SLMLMS configuration added to cart successfully",

      configurationID: savedConfiguration.configurationID,

      configuration: {
        configurationID: savedConfiguration.configurationID,
        configurationName: savedConfiguration.configurationName,
        productType: savedConfiguration.productType,
        productName: savedConfiguration.productName,
        status: savedConfiguration.status,
        isComplete: savedConfiguration.isComplete,
        numRequested: savedConfiguration.numRequested,
        configurationData: savedConfiguration.configurationData,
      },
    });
  } catch (error) {
    console.error("SLMLMS configuration error:", error);

    // ============================================================
    // MONGOOSE VALIDATION ERROR
    // ============================================================

    if (error?.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      return res.status(422).json({
        success: false,
        message: "Invalid SLMLMS configuration",
        errors,
      });
    }

    // ============================================================
    // INTERNAL SERVER ERROR
    // ============================================================

    return res.status(500).json({
      success: false,
      message: "Failed to add SLMLMS configuration",
    });
  }
});

module.exports = router;