const express = require("express");

const { authenticate } = require("./sessions");
const OH_CCS_OP13 = require("../models/OH_CCS_OP13");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/oh_ccs_op13
//
// Product:
// OH CCS OP13
//
// Product ID:
// OH_CCS_OP13
//
// OH_CCS_OP13 model:
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
      OH_CCS_OP13Data,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !OH_CCS_OP13Data ||
      typeof OH_CCS_OP13Data !== "object" ||
      Array.isArray(OH_CCS_OP13Data)
    ) {
      return res.status(400).json({
        success: false,
        message: "OH_CCS_OP13Data is required",
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
    // OH_CCS_OP13Data and OH_CCS_OP13 schema use the same
    // flat field structure.
    //
    // No aliases, templates, nested mappings, or field
    // transformations are required.
    //
    // IMPORTANT:
    // OH_CCS_OP13 is validation-only.
    // Do NOT call validation.save().
    // =====================================================

    const validation =
      new OH_CCS_OP13(OH_CCS_OP13Data);

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
        userID:
          req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "OH CCS OP13",

        productType:
          "OH_CCS_OP13",

        productName:
          "OH CCS OP13",

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
    //
    // OLD:
    //
    // req.user.cart.push(...)
    // await req.user.save()
    //
    // NEW:
    //
    // Only ProductConfiguration is persisted.
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();


    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "OH_CCS_OP13 configuration added to cart successfully",

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
      "OH_CCS_OP13 configuration error:",
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
          "Invalid OH_CCS_OP13 configuration",
        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add OH_CCS_OP13 configuration",
    });
  }
});


module.exports = router;