const express = require("express");

const { authenticate } = require("../sessions");
const PROTEIN_FGLM =
  require("../../models/Protein/PROTEIN_FGLM");
const ProductConfiguration =
  require("../../models/product_configuration");

const router = express.Router();

// ============================================================
// PROTEIN
// FOOD GRADE LUBRICATION AND MONITOR
//
// Product ID:
// PROTEIN_FGLM
//
// Endpoint:
// POST /api/protein_fglm
//
// Request Body:
//
// {
//   "PROTEIN_FGLMData": {
//     ...product configuration
//   },
//   "numRequested": 1
// }
//
// FLOW:
//
// Flutter Product Configurator
//            ↓
// POST /api/protein_fglm
//            ↓
// This Route
//            ↓
// PROTEIN_FGLM validation model
//            ↓
// ProductConfiguration
//            ↓
// MongoDB
//
// IMPORTANT:
//
// PROTEIN_FGLM is only the product-specific validation model.
//
// We do NOT save the PROTEIN_FGLM Mongoose document.
//
// The validated configuration is stored inside the generic
// ProductConfiguration.configurationData field.
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    // ========================================================
    // READ REQUEST BODY
    // ========================================================

    const {
      PROTEIN_FGLMData,
      numRequested,
    } = req.body || {};

    // ========================================================
    // CONFIGURATION BODY VALIDATION
    //
    // PROTEIN_FGLMData must:
    //
    // - Exist
    // - Be an object
    // - Not be an Array
    // ========================================================

    if (
      !PROTEIN_FGLMData ||
      typeof PROTEIN_FGLMData !== "object" ||
      Array.isArray(PROTEIN_FGLMData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PROTEIN_FGLMData is required",
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
        message:
          "numRequested must be a positive integer",
      });
    }

    // ========================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // Create a temporary PROTEIN_FGLM document.
    //
    // IMPORTANT:
    //
    // validate() is used instead of save().
    //
    // This model validates the product configuration but does
    // NOT create a separate PROTEIN_FGLM MongoDB document.
    // ========================================================

    const validation =
      new PROTEIN_FGLM(PROTEIN_FGLMData);

    await validation.validate();

    // ========================================================
    // CONVERT VALIDATED DOCUMENT TO PLAIN OBJECT
    // ========================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    // ========================================================
    // REMOVE TEMPORARY VALIDATION MODEL METADATA
    // ========================================================

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    // ========================================================
    // AUTHENTICATED USER SNAPSHOT
    //
    // Used for createdBy / updatedBy audit information.
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
    // This is the actual document that will be persisted.
    // ========================================================

    const productConfiguration =
      new ProductConfiguration({
        // ----------------------------------------------------
        // Owner
        // ----------------------------------------------------

        userID:
          req.user.userID,

        // ----------------------------------------------------
        // Configuration Name
        //
        // Use the customer's conveyor name when available.
        // ----------------------------------------------------

        configurationName:
          configurationData.conveyorName ||
          "Food Grade Lubrication and Monitor",

        // ----------------------------------------------------
        // Product Identity
        // ----------------------------------------------------

        productType:
          "PROTEIN_FGLM",

        productName:
          "Food Grade Lubrication and Monitor",

        // ----------------------------------------------------
        // Workflow State
        // ----------------------------------------------------

        status:
          "cart",

        isComplete:
          true,

        // ----------------------------------------------------
        // Requested Quantity
        // ----------------------------------------------------

        numRequested:
          quantity,

        // ----------------------------------------------------
        // Validated Product Configuration
        // ----------------------------------------------------

        configurationData,

        // ----------------------------------------------------
        // Audit Information
        // ----------------------------------------------------

        createdBy:
          actor,

        updatedBy:
          actor,
      });

    // ========================================================
    // SAVE TO MONGODB
    //
    // ProductConfiguration is the actual persisted model.
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PROTEIN_FGLM configuration added to cart successfully",

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
    // SERVER LOG
    // ========================================================

    console.error(
      "PROTEIN_FGLM configuration error:",
      error
    );

    // ========================================================
    // MONGOOSE VALIDATION ERROR
    //
    // Return individual field errors to the frontend.
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
          "Invalid PROTEIN_FGLM configuration",

        errors,
      });
    }

    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add PROTEIN_FGLM configuration",
    });
  }
});

module.exports = router;