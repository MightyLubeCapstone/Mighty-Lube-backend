const express = require("express");

const { authenticate } = require("../../sessions");
const PFO_CLS_9000LTCL =
  require("../../../models/PFO/CLS/PFO_CLS_9000LTCL");
const ProductConfiguration =
  require("../../../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/pfo_cls_9000ltcl
//
// Product:
// 9000L Series Central System Power and Free
// C-Channel Conveyor Lubricators
//
// Product ID:
// PFO_CLS_9000LTCL
//
// Product-specific model:
// Validation only
//
// Actual persistence:
// ProductConfiguration
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      PFO_CLS_9000LTCLData,
      numRequested,
    } = req.body || {};


    // ========================================================
    // REQUEST VALIDATION
    // ========================================================

    if (
      !PFO_CLS_9000LTCLData ||
      typeof PFO_CLS_9000LTCLData !== "object" ||
      Array.isArray(PFO_CLS_9000LTCLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "PFO_CLS_9000LTCLData is required",
      });
    }


    // ========================================================
    // QUANTITY VALIDATION
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
    // DCU QUANTITY NORMALIZATION
    //
    // Add DCU = No
    //     -> always save "0"
    //
    // Add DCU = Yes
    //     -> use quantity entered by user
    // ========================================================

    const normalizedData = {
      ...PFO_CLS_9000LTCLData,

      dcuQuantity:
        PFO_CLS_9000LTCLData.addDcu === "Yes"
          ? String(
              PFO_CLS_9000LTCLData.dcuQuantity ?? ""
            ).trim()
          : "0",
    };


    // ========================================================
    // DCU QUANTITY VALIDATION
    // ========================================================

    if (normalizedData.addDcu === "Yes") {
      const dcuQuantity =
        Number(normalizedData.dcuQuantity);

      if (
        !Number.isInteger(dcuQuantity) ||
        dcuQuantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "DCU Quantity must be a positive integer when Add DCU is Yes",
        });
      }

      normalizedData.dcuQuantity =
        String(dcuQuantity);
    }


    // ========================================================
    // PRODUCT-SPECIFIC MODEL VALIDATION
    // ========================================================

    const validation =
      new PFO_CLS_9000LTCL(normalizedData);

    await validation.validate();


    // ========================================================
    // CLEAN VALIDATED CONFIGURATION
    // ========================================================

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;


    // ========================================================
    // USER / AUDIT SNAPSHOT
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
    // ========================================================

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "9000L Series Central System Power and Free C-Channel Conveyor Lubricators",

        productType:
          "PFO_CLS_9000LTCL",

        productName:
          "9000L Series Central System Power and Free C-Channel Conveyor Lubricators",

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


    // ========================================================
    // SAVE
    // ========================================================

    const savedConfiguration =
      await productConfiguration.save();


    // ========================================================
    // SUCCESS
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "PFO_CLS_9000LTCL configuration added to cart successfully",

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
    console.error(
      "PFO_CLS_9000LTCL configuration error:",
      error
    );


    // ========================================================
    // MONGOOSE VALIDATION ERROR
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
          "Invalid PFO_CLS_9000LTCL configuration",
        errors,
      });
    }


    // ========================================================
    // INTERNAL SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      message:
        "Failed to add PFO_CLS_9000LTCL configuration",
    });
  }
});


module.exports = router;