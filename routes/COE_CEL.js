const express = require("express");

const { authenticate } = require("./sessions");
const COE_CEL = require("../models/COE_CEL");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// ===========================================================
// ADD CHAIN ON EDGE LUBRICATOR TO CONFIGURATOR
//
// Endpoint:
// POST /api/coe_cel
//
// Expected body:
//
// {
//   "COE_CELData": {
//     "...configuration fields...": "..."
//   },
//   "numRequested": 1
// }
//
// FLOW:
//
// Frontend
//   ↓
// COE_CELData
//   ↓
// COE_CEL model validation
//   ↓
// ProductConfiguration
//   ↓
// product_configurations collection
//
// status = "cart"
// ===========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { COE_CELData, numRequested } = req.body || {};


    // =======================================================
    // REQUEST VALIDATION
    // =======================================================

    if (
      !COE_CELData ||
      typeof COE_CELData !== "object" ||
      Array.isArray(COE_CELData)
    ) {
      return res.status(400).json({
        success: false,
        message: "COE_CELData is required",
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
    // COE_CEL is used only for:
    //
    // - required field validation
    // - String casting
    // - trim
    // - allowed schema fields
    //
    // It is NOT saved into the COE_CEL collection.
    // =======================================================

    const validation = new COE_CEL(COE_CELData);

    await validation.validate();


    // =======================================================
    // CLEAN VALIDATED CONFIGURATION DATA
    // =======================================================

    const configurationData = validation.toObject({
      versionKey: false,
    });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // =======================================================
    // AUTHENTICATED USER SNAPSHOT
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
        "Chain On Edge Lubricator",

      productType: "COE_CEL",

      productName: "Chain On Edge Lubricator",

      status: "cart",

      isComplete: true,

      numRequested: quantity,

      configurationData,

      createdBy: actor,

      updatedBy: actor,
    });


    // =======================================================
    // SAVE INTO GENERIC COLLECTION
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
        "Chain On Edge Lubricator added to configurator successfully",

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
    console.error("COE_CEL route error:", error);


    // =======================================================
    // MONGOOSE VALIDATION ERROR
    // =======================================================

    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: "COE_CEL validation failed",

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