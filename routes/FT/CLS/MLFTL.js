const express = require("express");

const { authenticate } = require("../../sessions");
const FT_MLCEL = require("../../../models/FT/CLS/MLFTL");
const ProductConfiguration = require(
  "../../../models/product_configuration"
);

const router = express.Router();

// =========================================================
// MIGHTY LUBE FLAT TOP LUBRICATOR
//
// Product ID: FT_MLCEL
// POST /api/ft_mlcel
//
// Product-specific model:
// models/FT/CLS/MLFTL.js
//
// The product-specific model is used for validation only.
// Actual configuration is stored in ProductConfiguration.
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      FT_MLCELData,
      numRequested,
    } = req.body || {};

    // =====================================================
    // BASIC REQUEST VALIDATION
    // =====================================================

    if (
      !FT_MLCELData ||
      typeof FT_MLCELData !== "object" ||
      Array.isArray(FT_MLCELData)
    ) {
      return res.status(400).json({
        success: false,
        message: "FT_MLCELData is required",
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
    // =====================================================

    const validation = new FT_MLCEL(
      FT_MLCELData
    );

    await validation.validate();

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    // Product-specific validation document metadata
    // should not be stored inside configurationData.
    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    // =====================================================
    // AUTHENTICATED USER SNAPSHOT
    // =====================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role || "user",
    };

    // =====================================================
    // CREATE PRODUCT CONFIGURATION
    // =====================================================

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "Mighty Lube Flat Top Lubricator",

        productType: "FT_MLCEL",

        productName:
          "Mighty Lube Flat Top Lubricator",

        status: "cart",

        isComplete: true,

        numRequested: quantity,

        configurationData,

        createdBy: actor,

        updatedBy: actor,
      });

    // =====================================================
    // SAVE TO PRODUCT CONFIGURATIONS COLLECTION
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "FT_MLCEL configuration added to cart successfully",

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

        configurationData:
          savedConfiguration.configurationData,
      },
    });
  } catch (error) {
    // =====================================================
    // ERROR LOG
    // =====================================================

    console.error(
      "FT_MLCEL configuration error:",
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
          "Invalid FT_MLCEL configuration",
        errors,
      });
    }

    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add FT_MLCEL configuration",
    });
  }
});

module.exports = router