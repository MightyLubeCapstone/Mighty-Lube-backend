const express = require("express");

const { authenticate } = require("./sessions");
const CC5_CL = require("../models/CC5_CL");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// ===========================================================
// ADD CC5 CHAIN LUBRICATOR
//
// Endpoint:
// POST /api/cc5_cl
//
// Expected body:
//
// {
//   "CC5_CLData": {
//     "...configuration fields...": "..."
//   },
//   "numRequested": 1
// }
//
// Flow:
//
// Flutter
//   ↓
// POST /api/cc5_cl
//   ↓
// CC5_CL model validation
//   ↓
// ProductConfiguration
//   ↓
// product_configurations collection
//
// CC5_CL model is used ONLY for validation.
// No CC5_CL document is saved in a separate collection.
// ===========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { CC5_CLData, numRequested } = req.body || {};


    // =======================================================
    // REQUEST VALIDATION
    // =======================================================

    if (
      !CC5_CLData ||
      typeof CC5_CLData !== "object" ||
      Array.isArray(CC5_CLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "CC5_CLData is required",
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
    // PRODUCT VALIDATION
    //
    // Let the existing CC5_CL mongoose schema:
    //
    // - validate required fields
    // - apply trim
    // - apply mongoose casting
    //
    // We validate only.
    // We do NOT call save() on CC5_CL.
    // =======================================================

    const cc5Validation = new CC5_CL(CC5_CLData);

    await cc5Validation.validate();


    // =======================================================
    // CLEAN VALIDATED CONFIGURATION DATA
    //
    // Convert mongoose validation document back to plain data.
    //
    // Remove mongoose-generated fields because this data will
    // live inside ProductConfiguration.configurationData.
    // =======================================================

    const configurationData = cc5Validation.toObject({
      versionKey: false,
    });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // =======================================================
    // AUTHENTICATED ACTOR
    //
    // Ownership always comes from req.user.
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
        "CC5 Chain Lubricator",

      productType: "CC5_CL",

      productName: "CC5 Chain Lubricator",

      status: "cart",

      isComplete: true,

      numRequested: quantity,

      configurationData,

      createdBy: actor,

      updatedBy: actor,
    });


    // =======================================================
    // SAVE
    //
    // Saves ONLY inside:
    //
    // product_configurations
    // =======================================================

    await productConfiguration.save();


    // =======================================================
    // SUCCESS RESPONSE
    // =======================================================

    return res.status(200).json({
      success: true,

      message:
        "CC5 Chain Lubricator added to configurator successfully",

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
    console.error("CC5_CL route error:", error);


    // =======================================================
    // PRODUCT MODEL VALIDATION ERROR
    // =======================================================

    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: "CC5_CL validation failed",

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