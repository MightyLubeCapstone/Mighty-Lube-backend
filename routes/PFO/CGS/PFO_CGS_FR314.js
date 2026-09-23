const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CGS_FR314 =
  require("../../../models/PFO/CGS/PFO_CGS_FR314");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/pfo_cgs_fr314
//
// Product:
// Free Rail 314 "Load" Wheel Greaser
//
// Product ID:
// PFO_CGS_FR314
//
// Product-specific model:
// Validation only
//
// Actual storage:
// ProductConfiguration
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      PFO_CGS_FR314Data,
      numRequested,
    } = req.body || {};


    // ========================================================
    // REQUEST VALIDATION
    // ========================================================

    if (
      !PFO_CGS_FR314Data ||
      typeof PFO_CGS_FR314Data !== "object" ||
      Array.isArray(PFO_CGS_FR314Data)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CGS_FR314Data is required",
      });
    }


    // ========================================================
    // QUANTITY VALIDATION
    // ========================================================

    const quantity = Number(numRequested);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }


    // ========================================================
    // PRODUCT-SPECIFIC VALIDATION
    // ========================================================

    const validation =
      new PFO_CGS_FR314(PFO_CGS_FR314Data);

    await validation.validate();


    // ========================================================
    // CLEAN VALIDATED CONFIGURATION
    // ========================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // ========================================================
    // USER / AUDIT SNAPSHOT
    // ========================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role || "user",
    };


    // ========================================================
    // CREATE GENERIC PRODUCT CONFIGURATION
    // ========================================================

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          'Free Rail 314 "Load" Wheel Greaser',

        productType:
          "PFO_CGS_FR314",

        productName:
          'Free Rail 314 "Load" Wheel Greaser',

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


    // ========================================================
    // SAVE
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();


    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CGS_FR314 configuration added to cart successfully",

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
      "PFO_CGS_FR314 configuration error:",
      error
    );


    // ========================================================
    // MONGOOSE VALIDATION ERROR
    // ========================================================

    if (error?.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] =
          error.errors[field].message;
      }

      return res.status(422).json({
        success: false,
        message:
          "Invalid PFO_CGS_FR314 configuration",
        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add PFO_CGS_FR314 configuration",
    });
  }
});


module.exports = router;