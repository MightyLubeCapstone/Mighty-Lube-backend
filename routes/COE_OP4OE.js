const express = require("express");

const { authenticate } = require("./sessions");
const COE_OP4OE = require("../models/COE_OP4OE");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// =========================================================
// ADD COE OP-40E TO CONFIGURATOR
//
// Endpoint:
// POST /api/coe_op4oe
//
// Request:
//
// {
//   "COE_OP4OEData": {
//     "conveyorName": "...",
//     "chainSize": "...",
//     ...
//   },
//   "numRequested": 1
// }
//
// Product ID:
// COE_OP4OE
//
// FLOW:
//
// Frontend
//   ↓
// COE_OP4OEData
//   ↓
// COE_OP4OE validation model
//   ↓
// ProductConfiguration
//   ↓
// product_configurations collection
//
// status = "cart"
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    // =====================================================
    // REQUEST BODY
    // =====================================================

    const {
      COE_OP4OEData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // VALIDATE CONFIGURATION
    // =====================================================

    if (
      !COE_OP4OEData ||
      typeof COE_OP4OEData !== "object" ||
      Array.isArray(COE_OP4OEData)
    ) {
      return res.status(400).json({
        success: false,
        message: "COE_OP4OEData is required",
      });
    }


    // =====================================================
    // VALIDATE QUANTITY
    // =====================================================

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
    // COE_OP4OE model handles:
    //
    // - required fields
    // - optional fields
    // - conditional required fields
    // - String trim
    // - default null values
    //
    // Examples:
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
    // COE_OP4OE document is validation-only.
    // It is NOT saved into its own collection.
    // =====================================================

    const validation =
      new COE_OP4OE(COE_OP4OEData);

    await validation.validate();


    // =====================================================
    // CLEAN VALIDATED CONFIGURATION
    //
    // Mongoose schema already handles trim/default values,
    // so manual optionalStringFields loop is not required.
    // =====================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // =====================================================
    // AUTHENTICATED ACTOR
    // =====================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role,
    };


    // =====================================================
    // CREATE GENERIC PRODUCT CONFIGURATION
    // =====================================================

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "COE OP-40E",

        productType: "COE_OP4OE",

        productName: "COE OP-40E",

        status: "cart",

        isComplete: true,

        numRequested: quantity,

        configurationData,

        createdBy: actor,

        updatedBy: actor,
      });


    // =====================================================
    // SAVE TO GENERIC COLLECTION
    //
    // OLD:
    //
    // req.user.cart.push(...)
    // await req.user.save()
    //
    // NEW:
    //
    // product_configurations collection
    // =====================================================

    await productConfiguration.save();


    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      message:
        "COE OP-40E added to configurator successfully",

      configurationID:
        productConfiguration.configurationID,

      configuration: {
        configurationID:
          productConfiguration.configurationID,

        configurationName:
          productConfiguration.configurationName,

        productType:
          productConfiguration.productType,

        productName:
          productConfiguration.productName,

        status:
          productConfiguration.status,

        isComplete:
          productConfiguration.isComplete,

        numRequested:
          productConfiguration.numRequested,
      },
    });
  } catch (error) {
    console.error(
      "COE_OP4OE route error:",
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
          "Invalid COE_OP4OE configuration",
        errors,
      });
    }


    // =====================================================
    // SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add COE_OP4OE configuration",
    });
  }
});


module.exports = router;