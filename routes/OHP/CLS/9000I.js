const express = require("express");

const { authenticate } = require("../../sessions");
const OHP_9000I = require("../../../models/OHP/CLS/9000I");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/ohp_9000i
//
// Product:
// 9000L Series Central System I-Beam Conveyor Lubricators
//
// Product ID:
// OHP_9000I
//
// OHP_9000I model:
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
      OHP_9000IData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !OHP_9000IData ||
      typeof OHP_9000IData !== "object" ||
      Array.isArray(OHP_9000IData)
    ) {
      return res.status(400).json({
        success: false,
        message: "OHP_9000IData is required",
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
    // Current OHP_9000I payload and schema use the same
    // flat field structure.
    //
    // Legacy templateA / templateB / templateC mappings
    // are intentionally not used by the current configurator.
    //
    // Conditional "Other" fields are enforced by the
    // OHP_9000I Mongoose schema.
    //
    // IMPORTANT:
    // OHP_9000I is validation-only.
    // Do NOT call validation.save().
    // =====================================================

    const validation =
      new OHP_9000I(OHP_9000IData);

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
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "OHP 9000I",

        productType:
          "OHP_9000I",

        productName:
          "9000L Series Central System I-Beam Conveyor Lubricators",

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
    // SAVE INTO GENERIC COLLECTION
    //
    // OLD:
    //
    // req.user.cart.push(...)
    // await req.user.save()
    //
    // NEW:
    //
    // Only ProductConfiguration is persisted.
    // =====================================================

    const savedConfiguration =
      await productConfiguration.save();


    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "OHP_9000I configuration added to cart successfully",

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
      "OHP_9000I configuration error:",
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
          "Invalid OHP_9000I configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add OHP_9000I configuration",
    });
  }
});


module.exports = router;