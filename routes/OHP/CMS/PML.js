const express = require("express");

const { authenticate } = require("../../sessions");
const OHP_PML = require("../../../models/OHP/CMS/PML");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/ohp_pml
//
// Product:
// OHP PML
//
// Product ID:
// OHP_PML
//
// OHP_PML model:
// validation only
//
// Actual storage:
// product_configurations
//
// Add to Cart:
// status = "cart"
// isComplete = true
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      OHP_PMLData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !OHP_PMLData ||
      typeof OHP_PMLData !== "object" ||
      Array.isArray(OHP_PMLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "OHP_PMLData is required",
      });
    }


    // =====================================================
    // QUANTITY VALIDATION
    // =====================================================

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


    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // OHP_PMLData and OHP_PML schema use the same
    // flat field structure.
    //
    // No aliases, templates, nested mappings, or field
    // transformations are required.
    //
    // Conditional "Other" validation is handled by
    // the OHP_PML Mongoose schema.
    //
    // IMPORTANT:
    // OHP_PML is validation-only.
    // Do NOT call validation.save().
    // =====================================================

    const validation =
      new OHP_PML(OHP_PMLData);

    await validation.validate();


    // =====================================================
    // CLEAN VALIDATED CONFIGURATION DATA
    // =====================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // =====================================================
    // AUTHENTICATED USER / AUDIT SNAPSHOT
    // =====================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role || "user",
    };


    // =====================================================
    // CREATE GENERIC PRODUCT CONFIGURATION
    // =====================================================

    const productConfiguration =
      new ProductConfiguration({
        userID:
          req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "OHP PML",

        productType:
          "OHP_PML",

        productName:
          "OHP PML",

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


    // =====================================================
    // SAVE ONLY GENERIC PRODUCT CONFIGURATION
    //
    // OLD:
    //
    // req.user.cart.push(...)
    // await req.user.save()
    //
    // NEW:
    //
    // ProductConfiguration only
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();


    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "OHP_PML configuration added to cart successfully",

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
      "OHP_PML configuration error:",
      error
    );


    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error?.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] =
          error.errors[field].message;
      }

      return res.status(422).json({
        success: false,
        message:
          "Invalid OHP_PML configuration",
        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add OHP_PML configuration",
    });
  }
});


module.exports = router;