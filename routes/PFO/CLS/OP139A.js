const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CLS_OP139A =
  require("../../../models/PFO/CLS/OP139A");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/pfo_cls_op139a
//
// Product:
// OP-139A
//
// Product ID:
// PFO_CLS_OP139A
//
// Request Body:
// {
//   "PFO_CLS_OP139AData": { ... },
//   "numRequested": 1
// }
//
// Product-specific model:
// PFO_CLS_OP139A
//
// IMPORTANT:
// The product-specific model is used for VALIDATION ONLY.
//
// Actual persistence:
// ProductConfiguration
//
// The validated OP-139A configuration is stored inside:
//
// ProductConfiguration.configurationData
//
// This keeps the cart / configuration workflow consistent with
// the other PFO product configurators.
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    // ========================================================
    // REQUEST BODY
    // ========================================================

    const {
      PFO_CLS_OP139AData,
      numRequested,
    } = req.body || {};


    // ========================================================
    // CONFIGURATION REQUEST VALIDATION
    //
    // Configuration must:
    // - Exist
    // - Be an object
    // - Not be an array
    // ========================================================

    if (
      !PFO_CLS_OP139AData ||
      typeof PFO_CLS_OP139AData !== "object" ||
      Array.isArray(PFO_CLS_OP139AData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CLS_OP139AData is required",
      });
    }


    // ========================================================
    // QUANTITY VALIDATION
    //
    // numRequested must be:
    // - Numeric
    // - Integer
    // - Greater than zero
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
    //
    // IMPORTANT:
    // Calling validate() does NOT save this model.
    //
    // The PFO_CLS_OP139A model exists only to validate:
    // - Required fields
    // - Enum values
    // - Conditional fields
    // - Field structure
    //
    // Actual persistence happens later using
    // ProductConfiguration.
    // ========================================================

    const validation =
      new PFO_CLS_OP139A(PFO_CLS_OP139AData);

    await validation.validate();


    // ========================================================
    // CLEAN VALIDATED CONFIGURATION
    //
    // Convert the validated Mongoose document into a plain
    // JavaScript object before storing it inside the generic
    // ProductConfiguration document.
    // ========================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });


    // --------------------------------------------------------
    // Remove product-validation document metadata.
    //
    // We only need the actual product configuration fields.
    // --------------------------------------------------------

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // ========================================================
    // USER / AUDIT SNAPSHOT
    //
    // Store the authenticated user's current information so
    // ProductConfiguration has an audit record of who created
    // and last updated the configuration.
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
    //
    // The product-specific PFO_CLS_OP139A model is NOT saved.
    //
    // All actual configuration persistence happens here.
    // ========================================================

    const productConfiguration =
      new ProductConfiguration({
        // ----------------------------------------------------
        // Owner
        // ----------------------------------------------------

        userID: req.user.userID,


        // ----------------------------------------------------
        // Configuration Name
        //
        // Prefer the conveyor name entered by the user.
        // If unavailable, use the product name.
        // ----------------------------------------------------

        configurationName:
          configurationData.conveyorName ||
          "OP-139A",


        // ----------------------------------------------------
        // Product Identity
        // ----------------------------------------------------

        productType:
          "PFO_CLS_OP139A",

        productName:
          "OP-139A",


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
    // SAVE
    //
    // Persist the complete configuration into the generic
    // ProductConfiguration collection.
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();


    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CLS_OP139A configuration added to cart successfully",

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
      "PFO_CLS_OP139A configuration error:",
      error
    );


    // ========================================================
    // MONGOOSE VALIDATION ERROR
    //
    // Product-specific validation failures return 422.
    //
    // Each invalid field is returned separately so the
    // frontend can identify the exact validation problem.
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
          "Invalid PFO_CLS_OP139A configuration",

        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add PFO_CLS_OP139A configuration",
    });
  }
});


module.exports = router;