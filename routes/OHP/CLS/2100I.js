const express = require("express");

const { authenticate } = require("../../sessions");
const OHP_2100I = require("../../../models/OHP/CLS/2100I");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/ohp_2100i
//
// Product:
// 2100L Series Self-Contained I-Beam Conveyor Lubricators
//
// Product ID:
// OHP_2100I
//
// OHP_2100I model:
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
      OHP_2100IData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !OHP_2100IData ||
      typeof OHP_2100IData !== "object" ||
      Array.isArray(OHP_2100IData)
    ) {
      return res.status(400).json({
        success: false,
        message: "OHP_2100IData is required",
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
    // OHP_2100IData and OHP_2100I schema use the same
    // flat field structure.
    //
    // The old conditional spreads only omitted empty
    // optional fields. No data transformation was performed.
    //
    // Conditional "Other" validation is handled directly
    // by the OHP_2100I Mongoose schema.
    //
    // IMPORTANT:
    // OHP_2100I is validation-only.
    // Do NOT call validation.save().
    // =====================================================

    const validation =
      new OHP_2100I(OHP_2100IData);

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
          "OHP 2100I",

        productType:
          "OHP_2100I",

        productName:
          "2100L Series Self-Contained I-Beam Conveyor Lubricators",

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
        "OHP_2100I configuration added to cart successfully",

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
      "OHP_2100I configuration error:",
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
          "Invalid OHP_2100I configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add OHP_2100I configuration",
    });
  }
});


module.exports = router;