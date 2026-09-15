const express = require("express");

const ETI_9000INVL = require("../../../models/ETI/CLS/9000");
const ProductConfiguration = require("../../../models/product_configuration");
const { authenticate } = require("../../sessions");

const router = express.Router();


// =========================================================
// POST /api/eti_9000invl
//
// Product:
// Enclosed Track Inverted Lubricator
//
// ETI_9000INVL model:
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
      ETI_9000INVLData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETI_9000INVLData ||
      typeof ETI_9000INVLData !== "object" ||
      Array.isArray(ETI_9000INVLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETI_9000INVLData is required",
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
    // ETI_9000INVL handles:
    //
    // - required fields
    // - optional fields
    // - conditional validation
    // - String trimming
    // - allowed schema fields
    //
    // Example:
    //
    // appEnviroment === "Other"
    // -> otherAppEnviroment required
    //
    // ETI_9000INVL is NOT saved separately.
    // =====================================================

    const validation =
      new ETI_9000INVL(ETI_9000INVLData);

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
          "ETI 9000 INVL",

        productType:
          "ETI_9000INVL",

        productName:
          "ETI 9000 INVL",

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
        "ETI_9000INVL configuration added to cart successfully",

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
      "ETI_9000INVL configuration error:",
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
          "Invalid ETI_9000INVL configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETI_9000INVL configuration",
    });
  }
});


module.exports = router;