const express = require("express");

const { authenticate } = require("./sessions");
const COE_CDL = require("../models/COE_CDL");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// ===========================================================
// ADD CATERPILLAR DRIVE LUBRICATOR TO CONFIGURATOR
//
// Endpoint:
// POST /api/coe_cdl
//
// Expected body:
//
// {
//   "COE_CDLData": {
//     "...configuration fields...": "..."
//   },
//   "numRequested": 1
// }
//
// FLOW:
//
// Flutter
//   ↓
// COE_CDLData
//   ↓
// COE_CDL model validation
//   ↓
// ProductConfiguration
//   ↓
// product_configurations collection
//
// status = "cart"
// ===========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { COE_CDLData, numRequested } = req.body || {};


    // =======================================================
    // REQUEST VALIDATION
    // =======================================================

    if (
      !COE_CDLData ||
      typeof COE_CDLData !== "object" ||
      Array.isArray(COE_CDLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "COE_CDLData is required",
      });
    }

    const quantity = Number(numRequested);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }


    // =======================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // COE_CDL is used ONLY for:
    //
    // - required field validation
    // - String casting
    // - trim
    // - allowed schema fields
    //
    // It is NOT saved into its own MongoDB collection.
    // =======================================================

    const validation = new COE_CDL(COE_CDLData);

    await validation.validate();


    // =======================================================
    // CLEAN VALIDATED CONFIGURATION
    //
    // Convert mongoose document into normal JS object.
    // Remove mongoose-specific fields before embedding it.
    // =======================================================

    const configurationData = validation.toObject({
      versionKey: false,
    });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // =======================================================
    // AUTHENTICATED ACTOR
    //
    // User ownership always comes from req.user.
    // Frontend cannot decide userID.
    // =======================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role,
    };


    // =======================================================
    // CREATE GENERIC PRODUCT CONFIGURATION
    // =======================================================

    const productConfiguration = new ProductConfiguration({
      userID: req.user.userID,

      configurationName:
        configurationData.conveyorName ||
        "Caterpillar Drive Lubricator",

      productType: "COE_CDL",

      productName: "Caterpillar Drive Lubricator",

      status: "cart",

      isComplete: true,

      numRequested: quantity,

      configurationData,

      createdBy: actor,

      updatedBy: actor,
    });


    // =======================================================
    // SAVE TO SINGLE GENERIC COLLECTION
    //
    // OLD:
    //
    // req.user.cart.push(...)
    // await req.user.save()
    //
    // NEW:
    //
    // product_configurations collection
    // =======================================================

    await productConfiguration.save();


    // =======================================================
    // SUCCESS RESPONSE
    // =======================================================

    return res.status(200).json({
      success: true,

      message:
        "Caterpillar Drive Lubricator added to configurator successfully",

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
    console.error("COE_CDL route error:", error);


    // =======================================================
    // PRODUCT VALIDATION ERROR
    // =======================================================

    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: "COE_CDL validation failed",

        details: Object.values(error.errors).map(
          (validationError) =>
            validationError.message,
        ),
      });
    }


    // =======================================================
    // UNKNOWN SERVER ERROR
    // =======================================================

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


module.exports = router;