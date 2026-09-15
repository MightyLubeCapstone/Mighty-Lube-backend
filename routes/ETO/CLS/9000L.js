const express = require("express");

const { authenticate } = require("../../sessions");
const ETO_9000E = require("../../../models/ETO/CLS/9000L");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/eto_9000e
//
// Product:
// ETO 9000E
//
// ETO_9000E model:
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
      ETO_9000EData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETO_9000EData ||
      typeof ETO_9000EData !== "object" ||
      Array.isArray(ETO_9000EData)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETO_9000EData is required",
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
    // Route data and ETO_9000E schema use the same
    // flat field structure.
    //
    // No transformation is required.
    //
    // ETO_9000E model is NOT saved separately.
    // =====================================================

    const validation =
      new ETO_9000E(ETO_9000EData);

    await validation.validate();


    // =====================================================
    // CLEAN VALIDATED CONFIGURATION DATA
    //
    // Mongoose schema also removes fields that do not
    // belong to ETO_9000E schema.
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
      userID:
        req.user.userID,

      username:
        req.user.username,

      firstName:
        req.user.firstName || "",

      lastName:
        req.user.lastName || "",

      role:
        req.user.role || "user",
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
          "ETO 9000E",

        productType:
          "ETO_9000E",

        productName:
          "ETO 9000E",

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
    //
    // OLD:
    //
    // req.user.cart.push(...)
    // await req.user.save()
    //
    // NEW:
    //
    // product_configurations
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();


    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "ETO_9000E configuration added to cart successfully",

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
      "ETO_9000E configuration error:",
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
          "Invalid ETO_9000E configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETO_9000E configuration",
    });
  }
});


module.exports = router;