const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CLS_CDL =
  require("../../../models/PFO/CLS/PFO_CLS_CDL");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/pfo_cls_cdl
//
// Product:
// Caterpillar Drive Lubricators
//
// Product ID:
// PFO_CLS_CDL
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
      PFO_CLS_CDLData,
      numRequested,
    } = req.body || {};


    // ========================================================
    // REQUEST VALIDATION
    // ========================================================

    if (
      !PFO_CLS_CDLData ||
      typeof PFO_CLS_CDLData !== "object" ||
      Array.isArray(PFO_CLS_CDLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CLS_CDLData is required",
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
      new PFO_CLS_CDL(PFO_CLS_CDLData);

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
          "Caterpillar Drive Lubricators",

        productType:
          "PFO_CLS_CDL",

        productName:
          "Caterpillar Drive Lubricators",

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
        "PFO_CLS_CDL configuration added to cart successfully",

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
      "PFO_CLS_CDL configuration error:",
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
          "Invalid PFO_CLS_CDL configuration",
        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add PFO_CLS_CDL configuration",
    });
  }
});


module.exports = router;