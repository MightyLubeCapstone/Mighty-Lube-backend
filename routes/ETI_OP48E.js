const express = require("express");

const { authenticate } = require("./sessions");
const ETI_OP48E = require("../models/ETI_OP48E");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/eti_op48e
//
// Product:
// OP-48E
//
// Supports:
//
// 1. Current reusable Flutter flat payload
// 2. Legacy template payload
//
// ETI_OP48E model is used ONLY for validation.
//
// Actual storage:
//
// product_configurations
//
// Add to Cart:
//
// status = "cart"
// isComplete = true
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      ETI_OP48EData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETI_OP48EData ||
      typeof ETI_OP48EData !== "object" ||
      Array.isArray(ETI_OP48EData)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETI_OP48EData is required",
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
    // CURRENT FLAT CONFIGURATION
    //
    // Most current frontend fields already match the
    // ETI_OP48E schema directly.
    //
    // Mongoose strict schema will remove unknown fields.
    // =====================================================

    const orderData = {
      ...ETI_OP48EData,
    };


    // =====================================================
    // LEGACY TEMPLATE COMPATIBILITY
    //
    // OLD:
    //
    // templateA
    // templateB
    // templateC
    // templateF
    //
    // MODEL EXPECTS:
    //
    // monitorData
    // templateBData
    // templateCData
    // templateFData
    //
    // Existing normalized fields take priority.
    // =====================================================

    if (!orderData.monitorData && ETI_OP48EData.templateA) {
      orderData.monitorData =
        ETI_OP48EData.templateA;
    }

    if (
      !orderData.templateBData &&
      ETI_OP48EData.templateB
    ) {
      orderData.templateBData =
        ETI_OP48EData.templateB;
    }

    if (
      !orderData.templateCData &&
      ETI_OP48EData.templateC
    ) {
      orderData.templateCData =
        ETI_OP48EData.templateC;
    }

    if (
      !orderData.templateFData &&
      ETI_OP48EData.templateF
    ) {
      orderData.templateFData =
        ETI_OP48EData.templateF;
    }


    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // IMPORTANT:
    //
    // ETI_OP48E is validation-only.
    //
    // It is NOT saved into a separate ETI_OP48E collection.
    // =====================================================

    const validation =
      new ETI_OP48E(orderData);

    await validation.validate();


    // =====================================================
    // CLEAN VALIDATED CONFIGURATION
    //
    // This also ensures legacy raw keys such as:
    //
    // templateA
    // templateB
    // templateC
    // templateF
    //
    // are NOT stored separately because they are not part
    // of the ETI_OP48E schema.
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
          "OP-48E",

        productType:
          "ETI_OP48E",

        productName:
          "OP-48E",

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
        "ETI_OP48E configuration added to cart successfully",

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
      "ETI_OP48E add configuration error:",
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
          "Invalid ETI_OP48E configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETI_OP48E configuration",
    });
  }
});


module.exports = router;