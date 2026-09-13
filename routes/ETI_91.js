const express = require("express");

const ETI_91 = require("../models/ETI_91");
const ProductConfiguration = require("../models/product_configuration");
const { authenticate } = require("./sessions");

const router = express.Router();


// =========================================================
// POST /api/eti_91
//
// ETI_91 model:
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
      ETI_91Data,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETI_91Data ||
      typeof ETI_91Data !== "object" ||
      Array.isArray(ETI_91Data)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETI_91Data is required",
      });
    }

    const quantity = Number(numRequested);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          "numRequested must be a positive integer",
      });
    }


    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // ETI_91 handles:
    //
    // - required fields
    // - conditional required fields
    // - trimming
    // - default null
    // - allowed schema fields
    //
    // ETI_91 is NOT saved separately.
    // =====================================================

    const validation =
      new ETI_91(ETI_91Data);

    await validation.validate();


    // =====================================================
    // CLEAN VALIDATED DATA
    // =====================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // =====================================================
    // USER / AUDIT INFORMATION
    // =====================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName:
        req.user.firstName || "",
      lastName:
        req.user.lastName || "",
      role:
        req.user.role || "user",
    };


    // =====================================================
    // SAVE INTO GENERIC COLLECTION
    // =====================================================

    const productConfiguration =
      new ProductConfiguration({
        userID:
          req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "ETI 91",

        productType:
          "ETI_91",

        productName:
          "ETI 91",

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
    // RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "ETI_91 configuration added to cart successfully",

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
      "ETI_91 configuration error:",
      error
    );


    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] =
          error.errors[field].message;
      }

      return res.status(422).json({
        success: false,

        message:
          "Invalid ETI_91 configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETI_91 configuration",
    })
  }
});


module.exports = router