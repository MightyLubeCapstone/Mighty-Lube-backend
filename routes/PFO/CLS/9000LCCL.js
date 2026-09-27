const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_9000LCCL =require("../../../models/PFO/CLS/9000LCCL");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/9000lccl
//
// Product:
// 9000L Series Central System Power and Free
// C-Channel Conveyor Lubricators
//
// Product ID:
// 9000LCCL
//
// Frontend Request Key:
// 9000LCCLData
//
// Product-specific model:
// Validation only
//
// Actual persistence:
// ProductConfiguration
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    // JavaScript variable names cannot start with a number,
    // therefore read the request key using bracket notation.
    const productData =
      req.body?.["9000LCCLData"];

    const numRequested =
      req.body?.numRequested;


    // ========================================================
    // REQUEST VALIDATION
    // ========================================================

    if (
      !productData ||
      typeof productData !== "object" ||
      Array.isArray(productData)
    ) {
      return res.status(400).json({
        success: false,
        message: "9000LCCLData is required",
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
        message:
          "numRequested must be a positive integer",
      });
    }


    // ========================================================
    // PRODUCT-SPECIFIC VALIDATION
    // ========================================================

    const validation =
      new PFO_9000LCCL(productData);

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
        userID:
          req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "9000L Series Central System Power and Free C-Channel Conveyor Lubricators",

        productType:
          "9000LCCL",

        productName:
          "9000L Series Central System Power and Free C-Channel Conveyor Lubricators",

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
        "9000LCCL configuration added to cart successfully",

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
      "9000LCCL configuration error:",
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
          "Invalid 9000LCCL configuration",
        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add 9000LCCL configuration",
    });
  }
});


module.exports = router;