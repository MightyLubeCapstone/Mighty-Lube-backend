const express = require("express");

const { authenticate } = require("../../sessions");
const FT_CDL = require("../../../models/FT/CLS/CDL");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();

// =========================================================
// POST /api/ft_cdl
//
// Product:
// Flat Top - Caterpillar Drive Lubricators
//
// Supports:
// Current reusable Flutter flat payload
//
// FT_CDL model is used ONLY for validation.
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
      FT_CDLData,
      numRequested,
    } = req.body || {};

    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !FT_CDLData ||
      typeof FT_CDLData !== "object" ||
      Array.isArray(FT_CDLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "FT_CDLData is required",
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
    // Only fields defined in models/FT/CLS/CDL.js will be
    // preserved inside configurationData.
    // =====================================================

    const validation = new FT_CDL({
      ...FT_CDLData,
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
        "Flat Top Caterpillar Drive Lubricators",

      productType:
        "FT_CDL",

      productName:
        "Caterpillar Drive Lubricators",

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
        "FT_CDL configuration added to cart successfully",

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
      "FT_CDL add configuration error:",
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
          "Invalid FT_CDL configuration",

        errors,
      });
    }

    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add FT_CDL configuration",
    });
  }
});

module.exports = router;