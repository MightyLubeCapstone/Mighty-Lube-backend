const express = require("express");

const { authenticate } = require("../../sessions");
const ETI_MLAIO = require("../../../models/ETI/CMS/MLAIO");
const ProductConfiguration = require("../../../models/product_configuration");

const router = express.Router();

// =========================================================
// POST /api/eti_mlaio
//
// Product:
// Multi Line (Permanent) ALL IN ONE Monitoring + Lubrication
//
// Supports:
// Current reusable Flutter flat payload
//
// ETI_MLAIO model is used ONLY for validation.
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
      ETI_MLAIOData,
      numRequested,
    } = req.body || {};

    // =====================================================
    // REQUEST VALIDATION
    // =====================================================

    if (
      !ETI_MLAIOData ||
      typeof ETI_MLAIOData !== "object" ||
      Array.isArray(ETI_MLAIOData)
    ) {
      return res.status(400).json({
        success: false,
        message: "ETI_MLAIOData is required",
      });
    }

    const quantity = Number(numRequested);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }

    // =====================================================
    // PRODUCT-SPECIFIC VALIDATION
    //
    // technicianNote is preserved through the ETI_MLAIO
    // schema and saved inside configurationData.
    // =====================================================

    const validation = new ETI_MLAIO({
      ...ETI_MLAIOData,
    });

    await validation.validate();

    const configurationData = validation.toObject({
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

    const productConfiguration = new ProductConfiguration({
      userID: req.user.userID,

      configurationName:configurationData.conveyorName ||
    "Multi Line ALL IN ONE Monitoring + Lubrication",
      productType:"ETI_MLAIO",
      productName:
        "Multi Line (Permanent) ALL IN ONE Monitoring + Lubrication",
      status:"cart",
      isComplete:true,

      numRequested:
        quantity,

      configurationData,

      createdBy:
        actor,

      updatedBy:
        actor,
    });

    const savedConfiguration = await productConfiguration.save();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message:
        "ETI_MLAIO configuration added to cart successfully",

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
      "ETI_MLAIO add configuration error:",
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
          "Invalid ETI_MLAIO configuration",

        errors,
      });
    }

    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,

      message:
        "Failed to add ETI_MLAIO configuration",
    });
  }
});

module.exports = router;