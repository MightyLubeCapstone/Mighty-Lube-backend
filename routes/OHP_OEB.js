const express = require("express");

const { authenticate } = require("./sessions");
const OH_CCS_BRUSH = require("../models/OH_CCS_BRUSH");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      OH_CCS_BRUSHData,
      numRequested,
    } = req.body || {};

    if (
      !OH_CCS_BRUSHData ||
      typeof OH_CCS_BRUSHData !== "object" ||
      Array.isArray(OH_CCS_BRUSHData)
    ) {
      return res.status(400).json({
        success: false,
        message: "OH_CCS_BRUSHData is required",
      });
    }

    const quantity = Number(numRequested);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be a positive integer",
      });
    }

    // Product-specific model is validation-only.
    const validation = new OH_CCS_BRUSH(
      OH_CCS_BRUSHData
    );

    await validation.validate();

    const configurationData =
      validation.toObject({
        versionKey: false,
      });

    delete configurationData._id;
    delete configurationData.createdAt;
    delete configurationData.updatedAt;

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role || "user",
    };

    const productConfiguration =
      new ProductConfiguration({
        userID: req.user.userID,

        configurationName:
          configurationData.conveyorName ||
          "OH CCS Brush",

        productType: "OH_CCS_BRUSH",

        productName: "OH CCS Brush",

        status: "cart",

        isComplete: true,

        numRequested: quantity,

        configurationData,

        createdBy: actor,

        updatedBy: actor,
      });

    const savedConfiguration =
      await productConfiguration.save();

    return res.status(201).json({
      success: true,

      message:
        "OH_CCS_BRUSH configuration added to cart successfully",

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
      "OH_CCS_BRUSH configuration error:",
      error
    );

    if (error?.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] =
          error.errors[field].message;
      }

      return res.status(422).json({
        success: false,
        message:
          "Invalid OH_CCS_BRUSH configuration",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to add OH_CCS_BRUSH configuration",
    });
  }
});

module.exports = router;