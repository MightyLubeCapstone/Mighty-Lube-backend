const express = require("express");

const ETI_807 = require("../../../models/ETI/CCS/8075");
const ProductConfiguration = require("../../../models/product_configuration");
const { authenticate } = require("../../sessions");

const router = express.Router();


// =========================================================
// POST /api/eti_807
//
// Product:
// Overhead Non-Powered Mighty Lube
// Chain Cleaners 8074-B / 8075-B
//
// ETI_807 model:
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
      ETI_807Data,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETI_807Data ||
      typeof ETI_807Data !== "object" ||
      Array.isArray(ETI_807Data)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETI_807Data is required",
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
    // ETI_807 handles:
    //
    // - required fields
    // - conditional required fields
    // - trimming
    // - default null
    // - allowed schema fields
    //
    // Conditional rules:
    //
    // chainSize === "Other"
    // -> otherChainSize required
    //
    // industrialChainManufacturer === "Other"
    // -> otherIndustrialChainManufacturer required
    //
    // appEnviroment === "Other"
    // -> otherAppEnviroment required
    //
    // ETI_807 is NOT saved separately.
    // =====================================================

    const validation =
      new ETI_807(ETI_807Data);

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
          "ETI 807",

        productType:
          "ETI_807",

        productName:
          "Chain Cleaners 8074-B / 8075-B",

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
        "ETI_807 configuration added to cart successfully",

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
      "ETI_807 configuration error:",
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
          "Invalid ETI_807 configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETI_807 configuration",
    });
  }
});


module.exports = router;