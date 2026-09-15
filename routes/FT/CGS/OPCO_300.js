const express = require("express");

const { authenticate } = require("../../sessions");
const FT_OPCO = require("../../../models/FT/CGS/OPCO_300");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();


// =========================================================
// POST /api/ft_opco
//
// Product:
// FT OPCO
//
// FT_OPCO model:
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
      FT_OPCOData,
      numRequested,
    } = req.body || {};


    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !FT_OPCOData ||
      typeof FT_OPCOData !== "object" ||
      Array.isArray(FT_OPCOData)
    ) {
      return res.status(400).json({
        success: false,
        message: "FT_OPCOData is required",
      });
    }


    // =====================================================
    // QUANTITY
    //
    // Legacy behavior preserved:
    // if numRequested is not provided, default to 1.
    // =====================================================

    const quantity =
      numRequested === undefined ||
      numRequested === null
        ? 1
        : Number(numRequested);

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


    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // FT_OPCOData and FT_OPCO schema use the same
    // flat field structure.
    //
    // No transformation or legacy mapping is required.
    //
    // IMPORTANT:
    // FT_OPCO is validation-only.
    // Do NOT call validation.save().
    // =====================================================

    const validation =
      new FT_OPCO(FT_OPCOData);

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
      userID:
        req.user.userID,

      username:
        req.user.username,

      firstName:
        req.user.firstName || "",

      lastName:
        req.user.lastName || "",

      role:
        req.user.role || "user",
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
          "FT OPCO",

        productType:
          "FT_OPCO",

        productName:
          "FT OPCO",

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
    // await order.save()
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
        "FT_OPCO configuration added to cart successfully",

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
      "FT_OPCO configuration error:",
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
          "Invalid FT_OPCO configuration",

        errors,
      });
    }


    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add FT_OPCO configuration",
    });
  }
});


module.exports = router;