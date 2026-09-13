const express = require("express");

const { authenticate } = require("./sessions");
const CC5_OP4OE = require("../models/CC5_OP4OE");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// ===========================================================
// ADD CC5 OP-40E
//
// Endpoint:
// POST /api/cc5_op40e
//
// Expected body:
//
// {
//   "CC5_OP4OEData": {
//     "...configuration fields...": "..."
//   },
//   "numRequested": 1
// }
//
// CC5_OP4OE model is used ONLY for validation.
// Final data is stored in product_configurations.
// ===========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { CC5_OP4OEData, numRequested } = req.body || {};


    // =======================================================
    // REQUEST VALIDATION
    // =======================================================

    if (
      !CC5_OP4OEData ||
      typeof CC5_OP4OEData !== "object" ||
      Array.isArray(CC5_OP4OEData)
    ) {
      return res.status(400).json({
        success: false,
        message: "CC5_OP4OEData is required",
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
    // Existing mongoose model handles:
    //
    // - required fields
    // - trim
    // - mongoose casting
    //
    // CC5_OP4OE itself is NOT saved.
    // =======================================================

    const validation =
      new CC5_OP4OE(CC5_OP4OEData);

    await validation.validate();


    // =======================================================
    // CLEAN VALIDATED DATA
    // =======================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // =======================================================
    // AUTHENTICATED ACTOR
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

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "CC5 OP-40E",

        productType: "CC5_OP4OE",

        productName: "CC5 OP-40E",

        status: "cart",

        isComplete: true,

        numRequested: quantity,

        configurationData,

        createdBy: actor,

        updatedBy: actor,
      });


    // =======================================================
    // SAVE ONLY TO product_configurations
    // =======================================================

    await productConfiguration.save();


    // =======================================================
    // SUCCESS RESPONSE
    // =======================================================

    return res.status(200).json({
      success: true,

      message:
        "CC5 OP-40E added to configurator successfully",

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
      "CC5_OP4OE route error:",
      error,
    );


    // =======================================================
    // PRODUCT VALIDATION ERROR
    // =======================================================

    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,

        message:
          "CC5_OP4OE validation failed",

        details: Object.values(
          error.errors,
        ).map(
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