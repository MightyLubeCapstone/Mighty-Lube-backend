const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CLS_ES =
  require("../../../models/PFO/CLS/PFO_CLS_ES");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/pfo_cls_es
//
// Product:
// E-Series
//
// Product ID:
// PFO_CLS_ES
//
// Product-specific model:
// Validation only
//
// Actual persistence:
// ProductConfiguration
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      PFO_CLS_ESData,
      numRequested,
    } = req.body || {};


    // ========================================================
    // REQUEST VALIDATION
    // ========================================================

    if (
      !PFO_CLS_ESData ||
      typeof PFO_CLS_ESData !== "object" ||
      Array.isArray(PFO_CLS_ESData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CLS_ESData is required",
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
    // PRODUCT-SPECIFIC MODEL VALIDATION
    // ========================================================

    const validation =
      new PFO_CLS_ES(PFO_CLS_ESData);

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
    // GENERIC PRODUCT CONFIGURATION
    // ========================================================

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "E-Series",

        productType:
          "PFO_CLS_ES",

        productName:
          "E-Series",

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
    // SUCCESS
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CLS_ES configuration added to cart successfully",

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

        configurationData:
          savedConfiguration.configurationData,
      },
    });

  } catch (error) {
    console.error(
      "PFO_CLS_ES configuration error:",
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
          "Invalid PFO_CLS_ES configuration",
        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add PFO_CLS_ES configuration",
    });
  }
});


module.exports = router;