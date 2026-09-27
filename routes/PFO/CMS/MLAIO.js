const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CMS_MLAIO = require("../../../models/PFO/CMS/MLAIO");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();

// ============================================================
// PFO - CONVEYOR MONITOR SYSTEMS
// MULTI LINE (PERMANENT) ALL IN ONE
//
// Product ID:
// PFO_CMS_MLAIO
//
// Endpoint:
// POST /api/pfo_cms_mlaio
//
// Request Body:
// {
//   "PFO_CMS_MLAIOData": { ... },
//   "numRequested": 1
// }
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    // ========================================================
    // REQUEST DATA
    // ========================================================

    const {
      PFO_CMS_MLAIOData,
      numRequested,
    } = req.body || {};

    // ========================================================
    // CONFIGURATION DATA VALIDATION
    // ========================================================

    if (
      !PFO_CMS_MLAIOData ||
      typeof PFO_CMS_MLAIOData !== "object" ||
      Array.isArray(PFO_CMS_MLAIOData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CMS_MLAIOData is required",
      });
    }

    // ========================================================
    // QUANTITY VALIDATION
    // ========================================================

    const quantity = Number(numRequested);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }

    // ========================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // PFO_CMS_MLAIO is validation-only.
    // It is NOT directly persisted.
    // ========================================================

    const validation = new PFO_CMS_MLAIO(
      PFO_CMS_MLAIOData
    );

    await validation.validate();

    // ========================================================
    // CONVERT VALIDATED DOCUMENT TO PLAIN OBJECT
    // ========================================================

    const configurationData = validation.toObject({
      versionKey: false,
    });

    // Remove validation-model-only Mongo/Mongoose fields.
    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    // ========================================================
    // USER / ACTOR INFORMATION
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

    const productConfiguration = new ProductConfiguration({
      userID: req.user.userID,

      configurationName:
        configurationData.conveyorName ||
        "Multi Line (Permanent) All In One",

      productType: "PFO_CMS_MLAIO",

      productName:
        "Multi Line (Permanent) All In One",

      status: "cart",

      isComplete: true,

      numRequested: quantity,

      configurationData,

      createdBy: actor,

      updatedBy: actor,
    });

    // ========================================================
    // SAVE TO PRODUCT CONFIGURATION COLLECTION
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CMS_MLAIO configuration added to cart successfully",

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
    // ========================================================
    // ERROR LOG
    // ========================================================

    console.error(
      "PFO_CMS_MLAIO configuration error:",
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
          "Invalid PFO_CMS_MLAIO configuration",
        errors,
      });
    }

    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add PFO_CMS_MLAIO configuration",
    });
  }
});

module.exports = router;