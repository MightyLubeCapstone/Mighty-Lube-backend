const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CCS_OP8 = require("../../../models/PFO/CCS/PFO_CCS_OP8");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/pfo_ccs_op8
//
// Product:
// OP-8 Power Brush Cleaning System
// Conveyor Chain & Trolley Wheel Cleaner
//
// Product ID:
// PFO_CCS_OP8
//
// PFO_CCS_OP8 model:
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
      PFO_CCS_OP8Data,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !PFO_CCS_OP8Data ||
      typeof PFO_CCS_OP8Data !== "object" ||
      Array.isArray(PFO_CCS_OP8Data)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CCS_OP8Data is required",
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
    // PFO_CCS_OP8Data and PFO_CCS_OP8 schema use the same
    // flat field structure.
    //
    // Conditional "Other" fields are handled by the
    // model's required functions.
    //
    // PFO_CCS_OP8 is validation-only.
    // Do NOT call validation.save().
    // =====================================================

    const validation =
      new PFO_CCS_OP8(PFO_CCS_OP8Data);

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
          "PFO OP-8 Power Brush Cleaning System",

        productType:
          "PFO_CCS_OP8",

        productName:
          "OP-8 Power Brush Cleaning System Conveyor Chain & Trolley Wheel Cleaner",

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
    // SAVE INTO GENERIC COLLECTION
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();


    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CCS_OP8 configuration added to cart successfully",

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
      "PFO_CCS_OP8 configuration error:",
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
          "Invalid PFO_CCS_OP8 configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add PFO_CCS_OP8 configuration",
    });
  }
});


module.exports = router;