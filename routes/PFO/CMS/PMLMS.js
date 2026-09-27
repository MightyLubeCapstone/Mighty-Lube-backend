const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CMS_PMLMS =
  require("../../../models/PFO/CMS/PMLMS");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// PFO - CONVEYOR MONITOR SYSTEMS
//
// PORTABLE (MULTI-LINE) MIGHTY LUBE® MONITORING SYSTEM
//
// Product ID:
// PFO_CMS_PMLMS
//
// Endpoint:
// POST /api/pfo_cms_pmlms
//
// Expected Request Body:
//
// {
//   "PFO_CMS_PMLMSData": {
//     ...product configuration
//   },
//   "numRequested": 1
// }
//
// ARCHITECTURE:
//
// Flutter Product Configurator
//            ↓
// POST /api/pfo_cms_pmlms
//            ↓
// This Route
//            ↓
// PFO_CMS_PMLMS Mongoose Model
//            ↓
// Product-specific validation only
//            ↓
// ProductConfiguration
//            ↓
// Actual MongoDB persistence
//
// IMPORTANT:
//
// The PFO_CMS_PMLMS validation document itself is NOT saved.
// ============================================================


router.post("/", authenticate, async (req, res) => {
  try {
    // ========================================================
    // READ REQUEST BODY
    // ========================================================

    const {
      PFO_CMS_PMLMSData,
      numRequested,
    } = req.body || {};


    // ========================================================
    // CONFIGURATION BODY VALIDATION
    //
    // PFO_CMS_PMLMSData must:
    //
    // - Exist
    // - Be an object
    // - Not be an Array
    // ========================================================

    if (
      !PFO_CMS_PMLMSData ||
      typeof PFO_CMS_PMLMSData !== "object" ||
      Array.isArray(PFO_CMS_PMLMSData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CMS_PMLMSData is required",
      });
    }


    // ========================================================
    // QUANTITY VALIDATION
    //
    // Convert the received value into Number first.
    //
    // Accepted:
    // 1, 2, 3, ...
    //
    // Rejected:
    // 0
    // negative numbers
    // decimals
    // non-numeric values
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
    // Create a temporary PFO_CMS_PMLMS Mongoose document.
    //
    // IMPORTANT:
    //
    // We call validate(), NOT save().
    //
    // Therefore this model is only responsible for validating:
    //
    // - Required fields
    // - Dropdown enum values
    // - Conditional "Other" fields
    // - Product configuration structure
    //
    // Nothing is persisted to a PFO_CMS_PMLMS collection here.
    // ========================================================

    const validation =
      new PFO_CMS_PMLMS(PFO_CMS_PMLMSData);

    await validation.validate();


    // ========================================================
    // CONVERT VALIDATED DATA TO PLAIN OBJECT
    //
    // ProductConfiguration.configurationData expects the
    // validated product data, not the temporary Mongoose
    // validation document itself.
    // ========================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });


    // ========================================================
    // REMOVE TEMPORARY VALIDATION MODEL METADATA
    //
    // These values belong only to the temporary Mongoose
    // validation document and should not become part of the
    // actual product configuration.
    // ========================================================

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // ========================================================
    // AUTHENTICATED USER SNAPSHOT
    //
    // Store user information with the ProductConfiguration
    // for createdBy / updatedBy audit tracking.
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
    // ProductConfiguration is the actual persisted model.
    //
    // The complete validated Portable Multi-Line configuration
    // is stored inside:
    //
    // configurationData
    // ========================================================

    const productConfiguration =
      new ProductConfiguration({
        // ----------------------------------------------------
        // Configuration Owner
        // ----------------------------------------------------

        userID:
          req.user.userID,


        // ----------------------------------------------------
        // Configuration Name
        //
        // Prefer the customer's conveyor name.
        //
        // If it is unavailable, fall back to the product name.
        // ----------------------------------------------------

        configurationName:
          configurationData.conveyorName ||
          "Portable (Multi-Line) Mighty Lube® Monitoring System",


        // ----------------------------------------------------
        // Product Identity
        // ----------------------------------------------------

        productType:
          "PFO_CMS_PMLMS",

        productName:
          "Portable (Multi-Line) Mighty Lube® Monitoring System",


        // ----------------------------------------------------
        // PRODUCT CONFIGURATION WORKFLOW
        //
        // A successfully submitted product configuration is
        // added directly to the cart and marked complete.
        // ----------------------------------------------------

        status:
          "cart",

        isComplete:
          true,


        // ----------------------------------------------------
        // Requested Product Quantity
        // ----------------------------------------------------

        numRequested:
          quantity,


        // ----------------------------------------------------
        // Validated Product-Specific Data
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
    // SAVE PRODUCT CONFIGURATION
    //
    // This is the actual MongoDB persistence operation.
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();


    // ========================================================
    // SUCCESS RESPONSE
    //
    // Return the important ProductConfiguration information
    // required by the frontend/cart workflow.
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CMS_PMLMS configuration added to cart successfully",

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
      "PFO_CMS_PMLMS configuration error:",
      error
    );


    // ========================================================
    // MONGOOSE PRODUCT VALIDATION ERROR
    //
    // Return individual field errors so the frontend can see
    // exactly which product field failed validation.
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
          "Invalid PFO_CMS_PMLMS configuration",

        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add PFO_CMS_PMLMS configuration",
    });
  }
});


module.exports = router;