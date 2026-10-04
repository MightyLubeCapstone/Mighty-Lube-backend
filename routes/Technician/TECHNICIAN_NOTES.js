const express = require("express");

const { authenticate } = require("../sessions");
const TECHNICIAN_NOTES = require("../../models/Technician/TECHNICIAN_NOTES");
const ProductConfiguration = require("../../models/product_configuration");

const router = express.Router();

// ============================================================
// TECHNICIAN
// TECHNICIAN NOTES
//
// Product ID:
// TECHNICIAN_NOTES
//
// Endpoint:
// POST /api/technician_notes
//
// Expected Request Body:
//
// {
//   "TECHNICIAN_NOTESData": {
//     "notes": "..."
//   },
//   "numRequested": 1
// }
//
// FLOW:
//
// Flutter Technician Notes Configurator
//            ↓
// POST /api/technician_notes
//            ↓
// This Route
//            ↓
// TECHNICIAN_NOTES validation model
//            ↓
// ProductConfiguration
//            ↓
// MongoDB
//
// IMPORTANT:
//
// TECHNICIAN_NOTES is used only for product-specific
// validation.
//
// We call validate(), NOT save(), on this model.
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
      TECHNICIAN_NOTESData,
      numRequested,
    } = req.body || {};

    // ========================================================
    // CONFIGURATION BODY VALIDATION
    //
    // TECHNICIAN_NOTESData must:
    //
    // - Exist
    // - Be an object
    // - Not be an Array
    // ========================================================

    if (
      !TECHNICIAN_NOTESData ||
      typeof TECHNICIAN_NOTESData !== "object" ||
      Array.isArray(TECHNICIAN_NOTESData)
    ) {
      return res.status(400).json({
        success: false,
        message: "TECHNICIAN_NOTESData is required",
      });
    }

    // ========================================================
    // QUANTITY VALIDATION
    //
    // Quantity is still handled by the generic product
    // configurator flow.
    //
    // It must be a positive integer:
    //
    // Valid:
    // 1, 2, 3, ...
    //
    // Invalid:
    // 0, -1, 1.5, abc
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
    // Create a temporary Technician Notes document.
    //
    // IMPORTANT:
    //
    // validate() is used instead of save().
    //
    // Therefore no separate TECHNICIAN_NOTES document is
    // persisted in MongoDB.
    // ========================================================

    const validation =
      new TECHNICIAN_NOTES(TECHNICIAN_NOTESData);

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
    // These fields belong only to the temporary validation
    // document and should not become part of configurationData.
    // ========================================================

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    // ========================================================
    // AUTHENTICATED USER SNAPSHOT
    //
    // Stored with ProductConfiguration for audit tracking.
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
    // This is the actual document persisted to MongoDB.
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
        // Technician Notes does not have a conveyorName field,
        // so the product name is used directly.
        // ----------------------------------------------------

        configurationName:
          "Technician Notes",

        // ----------------------------------------------------
        // Product Identity
        // ----------------------------------------------------

        productType:
          "TECHNICIAN_NOTES",

        productName:
          "Technician Notes",

        // ----------------------------------------------------
        // PRODUCT CONFIGURATION WORKFLOW
        //
        // Successfully submitted configuration is added
        // directly to the cart.
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
        // Validated Technician Notes Data
        //
        // {
        //   notes: "..."
        // }
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
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "TECHNICIAN_NOTES configuration added to cart successfully",

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
      "TECHNICIAN_NOTES configuration error:",
      error
    );

    // ========================================================
    // MONGOOSE VALIDATION ERROR
    //
    // Example:
    //
    // {
    //   "success": false,
    //   "message": "Invalid TECHNICIAN_NOTES configuration",
    //   "errors": {
    //     "notes": "Path `notes` is required."
    //   }
    // }
    // ========================================================

    if (error?.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] =
          error.errors[field].message;
      }

      return res.status(422).json({
        success: false,
        message: "Invalid TECHNICIAN_NOTES configuration",
        errors,
      });
    }

    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add TECHNICIAN_NOTES configuration",
    });
  }
});

module.exports = router;