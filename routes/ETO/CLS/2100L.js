const express = require("express");

const { authenticate } = require("../../sessions");
const ETO_2100 = require("../../../models/ETO/CLS/2100L");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/eto_2100
//
// Product:
// ETO 2100
//
// Supports:
//
// 1. Current reusable Flutter flat payload
// 2. Legacy template payload
// 3. Legacy measurement field etOverheadLS
//
// ETO_2100 model:
// validation only
//
// Actual storage:
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
      ETO_2100Data,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETO_2100Data ||
      typeof ETO_2100Data !== "object" ||
      Array.isArray(ETO_2100Data)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETO_2100Data is required",
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
    // Most current Flutter fields already match the
    // ETO_2100 mongoose schema directly.
    // =====================================================

    const orderData = {
      ...ETO_2100Data,
    };


    // =====================================================
    // LEGACY MEASUREMENT COMPATIBILITY
    //
    // OLD:
    // etOverheadLS
    //
    // CURRENT:
    // etOverheadL2
    //
    // Preserve LS for old data compatibility.
    //
    // If old client sends LS and does NOT send L2,
    // populate L2 from LS as well.
    // =====================================================

    if (ETO_2100Data.etOverheadLS !== undefined) {
      orderData.etOverheadLS =
        ETO_2100Data.etOverheadLS;

      if (
        ETO_2100Data.etOverheadL2 === undefined
      ) {
        orderData.etOverheadL2 =
          ETO_2100Data.etOverheadLS;
      }
    }


    // =====================================================
    // LEGACY TEMPLATE A
    //
    // OLD:
    // templateA
    //
    // MODEL:
    // monitorData
    //
    // Existing normalized monitorData gets priority.
    // =====================================================

    if (
      !orderData.monitorData &&
      ETO_2100Data.templateA &&
      typeof ETO_2100Data.templateA === "object"
    ) {
      orderData.monitorData =
        ETO_2100Data.templateA;
    }


    // =====================================================
    // LEGACY TEMPLATE B
    // =====================================================

    if (
      !orderData.templateBData &&
      ETO_2100Data.templateB &&
      typeof ETO_2100Data.templateB === "object"
    ) {
      orderData.templateBData =
        ETO_2100Data.templateB;
    }


    // =====================================================
    // LEGACY TEMPLATE C
    // =====================================================

    if (
      !orderData.templateCData &&
      ETO_2100Data.templateC &&
      typeof ETO_2100Data.templateC === "object"
    ) {
      orderData.templateCData =
        ETO_2100Data.templateC;
    }


    // =====================================================
    // LEGACY TEMPLATE E
    // =====================================================

    if (
      !orderData.templateEData &&
      ETO_2100Data.templateE &&
      typeof ETO_2100Data.templateE === "object"
    ) {
      orderData.templateEData =
        ETO_2100Data.templateE;
    }


    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // ETO_2100 is used ONLY for validation/schema cleanup.
    //
    // It is NOT saved into its own collection.
    // =====================================================

    const validation =
      new ETO_2100(orderData);

    await validation.validate();


    // =====================================================
    // CLEAN VALIDATED CONFIGURATION
    //
    // Unknown raw legacy aliases such as:
    //
    // templateA
    // templateB
    // templateC
    // templateE
    //
    // will not be retained unless represented by their
    // actual schema fields:
    //
    // monitorData
    // templateBData
    // templateCData
    // templateEData
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
          "ETO 2100",

        productType:
          "ETO_2100",

        productName:
          "ETO 2100",

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
        "ETO_2100 configuration added to cart successfully",

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
      "ETO_2100 configuration error:",
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
          "Invalid ETO_2100 configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETO_2100 configuration",
    });
  }
});


module.exports = router;