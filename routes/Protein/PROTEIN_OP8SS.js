const express = require("express");

const { authenticate } = require("../sessions");
const PROTEIN_OP8SS =
  require("../../models/Protein/PROTEIN_OP8SS");
const ProductConfiguration =
  require("../../models/product_configuration");

const router = express.Router();

// ============================================================
// PROTEIN
// FOOD GRADE CLEANER OP-8SS
//
// Product ID:
// PROTEIN_OP8SS
//
// Endpoint:
// POST /api/protein_op8ss
//
// Expected Request:
//
// {
//   "PROTEIN_OP8SSData": {
//     ...product configuration
//   },
//   "numRequested": 1
// }
//
// FLOW:
//
// Flutter
//    ↓
// POST /api/protein_op8ss
//    ↓
// This Route
//    ↓
// PROTEIN_OP8SS validation model
//    ↓
// ProductConfiguration
//    ↓
// MongoDB
//
// IMPORTANT:
//
// PROTEIN_OP8SS is used only for validation.
//
// The actual configuration is persisted through the generic
// ProductConfiguration model.
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    // ========================================================
    // READ REQUEST BODY
    // ========================================================

    const {
      PROTEIN_OP8SSData,
      numRequested,
    } = req.body || {};

    // ========================================================
    // CONFIGURATION VALIDATION
    //
    // Product configuration must:
    // - Exist
    // - Be an object
    // - Not be an Array
    // ========================================================

    if (
      !PROTEIN_OP8SSData ||
      typeof PROTEIN_OP8SSData !== "object" ||
      Array.isArray(PROTEIN_OP8SSData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PROTEIN_OP8SSData is required",
      });
    }

    // ========================================================
    // QUANTITY VALIDATION
    //
    // numRequested must be a positive integer.
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
    //
    // Create a temporary validation document.
    //
    // IMPORTANT:
    // validate() is called instead of save().
    // ========================================================

    const validation =
      new PROTEIN_OP8SS(PROTEIN_OP8SSData);

    await validation.validate();

    // ========================================================
    // CONVERT VALIDATED DOCUMENT TO PLAIN OBJECT
    // ========================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    // ========================================================
    // REMOVE TEMPORARY MONGOOSE METADATA
    // ========================================================

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    // ========================================================
    // AUTHENTICATED USER SNAPSHOT
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
    //
    // This is the actual object persisted to MongoDB.
    // ========================================================

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        // Prefer customer's conveyor name.
        configurationName:
          configurationData.conveyorName ||
          "Food Grade Cleaner OP-8SS",

        productType:
          "PROTEIN_OP8SS",

        productName:
          "Food Grade Cleaner OP-8SS",

        // Successfully submitted configurations go to cart.
        status:
          "cart",

        isComplete:
          true,

        numRequested:
          quantity,

        // Complete validated product-specific configuration.
        configurationData,

        createdBy:
          actor,

        updatedBy:
          actor,
      });

    // ========================================================
    // SAVE PRODUCT CONFIGURATION
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PROTEIN_OP8SS configuration added to cart successfully",

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
    // SERVER ERROR LOG
    // ========================================================

    console.error(
      "PROTEIN_OP8SS configuration error:",
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
          "Invalid PROTEIN_OP8SS configuration",
        errors,
      });
    }

    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add PROTEIN_OP8SS configuration",
    });
  }
});

module.exports = router;