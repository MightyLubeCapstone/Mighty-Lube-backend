const express = require("express");

const { authenticate } = require("./sessions");
const ETO_MLAIO = require("../models/ETO_MLAIO");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/eto_mlaio
//
// Product:
// ETO MLAIO
//
// ETO_MLAIO model:
// validation only
//
// IMPORTANT:
//
// Do NOT call:
//
// await validation.save()
//
// ETO_MLAIO must NOT create its own product collection.
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
      ETO_MLAIOData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETO_MLAIOData ||
      typeof ETO_MLAIOData !== "object" ||
      Array.isArray(ETO_MLAIOData)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETO_MLAIOData is required",
      });
    }

    const quantity =
      numRequested === undefined ||
      numRequested === null
        ? 1
        : Number(numRequested);

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
    // Route payload and ETO_MLAIO schema have the same
    // flat structure.
    //
    // No transformation is required.
    //
    // Schema defaults missing String fields to "".
    // =====================================================

    const validation =
      new ETO_MLAIO(ETO_MLAIOData);

    await validation.validate();


    // =====================================================
    // CLEAN VALIDATED CONFIGURATION DATA
    //
    // IMPORTANT:
    //
    // validation.save() is intentionally NOT called.
    //
    // ETO_MLAIO is only being used as a validation/schema
    // normalization layer.
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
          "ETO MLAIO",

        productType:
          "ETO_MLAIO",

        productName:
          "ETO MLAIO",

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
    // SAVE INTO COMMON COLLECTION
    //
    // OLD:
    //
    // await order.save()
    //
    // req.user.cart.push(...)
    // await req.user.save()
    //
    // NEW:
    //
    // Only product_configurations
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();


    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "ETO_MLAIO configuration added to cart successfully",

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
      "ETO_MLAIO route error:",
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
          "Invalid ETO_MLAIO configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETO_MLAIO configuration",
    });
  }
});


module.exports = router;