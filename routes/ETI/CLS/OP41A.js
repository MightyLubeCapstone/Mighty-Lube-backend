const express = require("express");

const { authenticate } = require("../../sessions");
const ETI_OP41A = require("../../../models/ETI/CLS/OP41A");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();

// =========================================================
// POST /api/eti_op41a
//
// Product:
// OP-41A Conveyor Lubricators
//
// Supports:
// Current reusable Flutter flat payload
//
// ETI_OP41A model is used ONLY for validation.
//
// Actual storage:
// product_configurations
//
// Add to Cart:
// status = "cart"
// isComplete = true
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      ETI_OP41AData,
      numRequested,
    } = req.body || {};

    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETI_OP41AData ||
      typeof ETI_OP41AData !== "object" ||
      Array.isArray(ETI_OP41AData)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETI_OP41AData is required",
      });
    }

    const quantity = Number(numRequested);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }

    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // technicianNote is preserved through the ETI_OP41A
    // schema and saved inside configurationData.
    // =====================================================

    const validation = new ETI_OP41A({
      ...ETI_OP41AData,
    });

    await validation.validate();

    const configurationData = validation.toObject({
      versionKey: false,
    });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    // =====================================================
    // AUTHENTICATED USER / AUDIT SNAPSHOT
    // =====================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role || "user",
    };

    // =====================================================
    // CREATE GENERIC PRODUCT CONFIGURATION
    // =====================================================

    const productConfiguration = new ProductConfiguration({
      userID: req.user.userID,

      configurationName:
        configurationData.conveyorName ||
        "OP-41A",

      productType:
        "ETI_OP41A",

      productName:
        "OP-41A Conveyor Lubricators",

      status:
        "cart",

      isComplete:
        true,

      numRequested:
        quantity,

      configurationData,

      createdBy:
        actor,

      updatedBy:
        actor,
    });

    const savedConfiguration =
      await productConfiguration.save();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "ETI_OP41A configuration added to cart successfully",

      configurationID:
        savedConfiguration.configurationID,

      configuration: {
        configurationID:
          savedConfiguration.configurationID,

        configurationName:
          savedConfiguration.configurationName,

        productType:
          savedConfiguration.productType,

        productName:
          savedConfiguration.productName,

        status:
          savedConfiguration.status,

        isComplete:
          savedConfiguration.isComplete,

        numRequested:
          savedConfiguration.numRequested,
      },
    });
  } catch (error) {
    console.error(
      "ETI_OP41A add configuration error:",
      error
    );

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error?.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] =
          error.errors[field].message;
      }

      return res.status(422).json({
        success: false,

        message:
          "Invalid ETI_OP41A configuration",

        errors,
      });
    }

    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETI_OP41A configuration",
    });
  }
});

module.exports = router;