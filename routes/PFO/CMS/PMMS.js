const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CMS_PMMS = require("../../../models/PFO/CMS/PMMS");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// PFO - CONVEYOR MONITOR SYSTEMS
//
// PAINT MARKER FOR MONITORING SYSTEM (OPTIONAL)
//
// Product ID:
// PFO_CMS_PMMS
//
// Endpoint:
// POST /api/pfo_cms_pmms
//
// Expected Request Body:
//
// {
//   "PFO_CMS_PMMSData": {
//     "conveyorName": "...",
//     "conveyorChainSize": "...",
//     "otherConveyorChainSize": "...",
//     "chainManufacturer": "...",
//     "otherChainManufacturer": "...",
//     "conveyorOrientation": "..."
//   },
//   "numRequested": 1
// }
//
// ARCHITECTURE:
//
// Flutter Product Configurator
//            ↓
// POST /api/pfo_cms_pmms
//            ↓
// This Route
//            ↓
// PFO_CMS_PMMS validation model
//            ↓
// ProductConfiguration
//            ↓
// MongoDB
//
// IMPORTANT:
//
// PFO_CMS_PMMS is used only for product-specific validation.
//
// The actual configuration is persisted using the generic
// ProductConfiguration model.
// ============================================================


router.post("/", authenticate, async (req, res) => {
  try {
    // ========================================================
    // READ REQUEST BODY
    // ========================================================

    const {
      PFO_CMS_PMMSData,
      numRequested,
    } = req.body || {};


    // ========================================================
    // CONFIGURATION BODY VALIDATION
    //
    // PFO_CMS_PMMSData must:
    //
    // 1. Exist
    // 2. Be an object
    // 3. Not be an Array
    // ========================================================

    if (
      !PFO_CMS_PMMSData ||
      typeof PFO_CMS_PMMSData !== "object" ||
      Array.isArray(PFO_CMS_PMMSData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CMS_PMMSData is required",
      });
    }


    // ========================================================
    // QUANTITY VALIDATION
    //
    // numRequested must be a positive integer.
    //
    // Valid:
    // 1, 2, 3, ...
    //
    // Invalid:
    // 0
    // -1
    // 1.5
    // abc
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
    // Create a temporary Mongoose document using the
    // PFO_CMS_PMMS schema.
    //
    // IMPORTANT:
    //
    // We call validate(), NOT save().
    //
    // This validates:
    //
    // - Required fields
    // - Dropdown enum values
    // - Conditional "Other" fields
    //
    // No PFO_CMS_PMMS document is persisted here.
    // ========================================================

    const validation =
      new PFO_CMS_PMMS(PFO_CMS_PMMSData);

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
    //
    // These fields belong to the temporary validation model
    // and must not be stored as part of configurationData.
    // ========================================================

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // ========================================================
    // AUTHENTICATED USER SNAPSHOT
    //
    // Used by ProductConfiguration for audit information.
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
    // This is the document that is actually saved to MongoDB.
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
        // Prefer Name of Conveyor System.
        //
        // Fall back to the product name if conveyorName is
        // somehow unavailable.
        // ----------------------------------------------------

        configurationName:
          configurationData.conveyorName ||
          "Paint Marker for Monitoring System (Optional)",


        // ----------------------------------------------------
        // Product Identity
        // ----------------------------------------------------

        productType:
          "PFO_CMS_PMMS",

        productName:
          "Paint Marker for Monitoring System (Optional)",


        // ----------------------------------------------------
        // Cart / Completion State
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
        // Validated Product-Specific Configuration
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
    // SAVE
    //
    // This is the actual MongoDB persistence operation.
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();


    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CMS_PMMS configuration added to cart successfully",

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
      "PFO_CMS_PMMS configuration error:",
      error
    );


    // ========================================================
    // MONGOOSE VALIDATION ERROR
    //
    // Return individual field validation errors so the
    // frontend can identify exactly what failed.
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
          "Invalid PFO_CMS_PMMS configuration",

        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add PFO_CMS_PMMS configuration",
    });
  }
});


module.exports = router;