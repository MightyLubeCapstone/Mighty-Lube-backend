const express = require("express");
const { authenticate } = require("./sessions");
const COE_OP4OE = require("../models/COE_OP4OE");

const router = express.Router();

// =========================================================
// ADD COE OP-40E TO CONFIGURATOR
//
// Endpoint:
// POST /api/coe_op4oe
//
// Request:
//
// {
//   "COE_OP4OEData": {
//     "conveyorName": "...",
//     "chainSize": "...",
//     ...
//   },
//   "numRequested": 1
// }
//
// Product ID:
// COE_OP4OE
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    // =====================================================
    // REQUEST BODY
    // =====================================================

    const {
      COE_OP4OEData,
      numRequested,
    } = req.body || {};

    // =====================================================
    // VALIDATE CONFIGURATION
    // =====================================================

    if (
      !COE_OP4OEData ||
      typeof COE_OP4OEData !== "object" ||
      Array.isArray(COE_OP4OEData)
    ) {
      return res.status(400).json({
        success: false,
        message: "COE_OP4OEData is required",
      });
    }

    // =====================================================
    // VALIDATE QUANTITY
    // =====================================================

    const quantity = Number(numRequested);

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "numRequested must be a positive integer",
      });
    }

    // =====================================================
    // PREPARE CONFIGURATION
    //
    // Flutter reusable form sends field keys that directly
    // match the COE_OP4OE mongoose schema.
    //
    // So manual field-by-field mapping is not required.
    // =====================================================

    const configurationData = {
      ...COE_OP4OEData,
    };

    // =====================================================
    // NORMALIZE OPTIONAL STRING FIELDS
    // =====================================================

    const optionalStringFields = [
      "otherChainSize",
      "otherIndustrialChainManufacturer",
      "conveyorIndex",
      "travelDirection",
      "otherAppEnviroment",
      "surroundingTemp",
      "conveyorLoaded",
      "conveyorSwing",
      "plantLayout",
      "requiredPics",
      "existingMonitoring",
      "addMonitoring",
      "wheelOpenRaceStyle",
      "wheelSealedStyle",
      "openInsideShieldedOutside",
      "freeTrolleyWheels",
      "guideRollers",
      "guideRollersOpenRaceStyle",
      "guideRollersSealedStyle",
      "openHole",
      "dogActuator",
      "pivotPoints",
      "kingPin",
      "railLubeStatus",
      "lubeBrand",
      "lubeType",
      "lubeViscosity",
      "chainMaster",
      "timerStatus",
      "electricStatus",
      "pneumaticStatus",
      "mightyLubeMonitoring",
      "plcConnection",
      "otherControllerInfo",
      "specialControllerOptions",
      "technicianNote",
    ];

    for (const field of optionalStringFields) {
      if (
        typeof configurationData[field] === "string"
      ) {
        configurationData[field] =
          configurationData[field].trim();

        if (configurationData[field] === "") {
          configurationData[field] = null;
        }
      }
    }

    // =====================================================
    // CREATE PRODUCT CONFIGURATION
    // =====================================================

    const order =
      new COE_OP4OE(configurationData);

    // Validate before putting configuration in cart.
    //
    // This also handles conditional rules:
    //
    // chainSize === "Other"
    // -> otherChainSize required
    //
    // industrialChainManufacturer === "Other"
    // -> otherIndustrialChainManufacturer required
    //
    // appEnviroment === "Other"
    // -> otherAppEnviroment required
    // =====================================================

    await order.validate();

    // =====================================================
    // ADD TO USER CART / CONFIGURATOR
    // =====================================================

    req.user.cart.push({
      numRequested: quantity,
      productConfigurationInfo: order,
      productType: "COE_OP4OE",
    });

    await req.user.save();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      message: "COE_OP4OE entry added",
    });
  } catch (error) {
    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] =
          error.errors[field].message;
      }

      return res.status(400).json({
        success: false,
        message:
          "Invalid COE_OP4OE configuration",
        errors,
      });
    }

    // =====================================================
    // SERVER ERROR
    // =====================================================

    console.error(
      "COE_OP4OE route error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to add COE_OP4OE configuration",
    });
  }
});

module.exports = router