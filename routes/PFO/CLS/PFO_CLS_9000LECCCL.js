const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CLS_9000LECCCL =
  require("../../../models/PFO/CLS/PFO_CLS_9000LECCCL");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/pfo_cls_9000lecccl
//
// Product:
// 9000L Series Central System Enclosed Track Conveyor Lubricators
//
// Product ID:
// PFO_CLS_9000LECCCL
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
      PFO_CLS_9000LECCCLData,
      numRequested,
    } = req.body || {};


    // ========================================================
    // REQUEST VALIDATION
    // ========================================================

    if (
      !PFO_CLS_9000LECCCLData ||
      typeof PFO_CLS_9000LECCCLData !== "object" ||
      Array.isArray(PFO_CLS_9000LECCCLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CLS_9000LECCCLData is required",
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
      new PFO_CLS_9000LECCCL(
        PFO_CLS_9000LECCCLData
      );

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
          "9000L Series Central System Enclosed Track Conveyor Lubricators",

        productType:
          "PFO_CLS_9000LECCCL",

        productName:
          "9000L Series Central System Enclosed Track Conveyor Lubricators",

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
        "PFO_CLS_9000LECCCL configuration added to cart successfully",

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
      "PFO_CLS_9000LECCCL configuration error:",
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
          "Invalid PFO_CLS_9000LECCCL configuration",
        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add PFO_CLS_9000LECCCL configuration",
    });
  }
});


module.exports = router;