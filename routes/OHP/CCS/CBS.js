const express = require("express");

const { authenticate } = require("../../sessions");
const OH_CCS_IBEAM = require("../models/OH_CCS_IBEAM");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/oh_ccs_ibeam
//
// Product:
// OH CCS I-Beam
//
// Product ID:
// OH_CCS_IBEAM
//
// OH_CCS_IBEAM model:
// validation only
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
      OH_CCS_IBEAMData,
      numRequested,
    } = req.body || {};

    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !OH_CCS_IBEAMData ||
      typeof OH_CCS_IBEAMData !== "object" ||
      Array.isArray(OH_CCS_IBEAMData)
    ) {
      return res.status(400).json({
        success: false,
        message: "OH_CCS_IBEAMData is required",
      });
    }

    // =====================================================
    // QUANTITY VALIDATION
    // =====================================================

    const quantity = Number(numRequested);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }

    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // Direct flat match.
    // No alias/template/transformation required.
    //
    // OH_CCS_IBEAM is validation-only.
    // Do NOT call validation.save().
    // =====================================================

    const validation =
      new OH_CCS_IBEAM(OH_CCS_IBEAMData);

    await validation.validate();

    // =====================================================
    // CLEAN VALIDATED CONFIGURATION DATA
    // =====================================================

    const configurationData =
      validation.toObject({
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

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "OH CCS I-Beam",

        productType:
          "OH_CCS_IBEAM",

        productName:
          "OH CCS I-Beam",

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

    // =====================================================
    // SAVE ONLY GENERIC PRODUCT CONFIGURATION
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "OH_CCS_IBEAM configuration added to cart successfully",

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
      "OH_CCS_IBEAM configuration error:",
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
          "Invalid OH_CCS_IBEAM configuration",
        errors,
      });
    }

    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add OH_CCS_IBEAM configuration",
    });
  }
});


module.exports = router;