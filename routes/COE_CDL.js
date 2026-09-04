const express = require("express");

const { authenticate } = require("./sessions");
const COE_CDL = require("../models/COE_CDL");

const router = express.Router();

// ===========================================================
// ADD CATERPILLAR DRIVE LUBRICATOR TO CONFIGURATOR
//
// Endpoint:
// POST /api/coe_cdl
//
// Expected body:
//
// {
//   "COE_CDLData": {
//     "...configuration fields...": "..."
//   },
//   "numRequested": 1
// }
// ===========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      COE_CDLData,
      numRequested,
    } = req.body || {};

    // =======================================================
    // REQUEST VALIDATION
    // =======================================================

    if (
      !COE_CDLData ||
      typeof COE_CDLData !== "object" ||
      Array.isArray(COE_CDLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "COE_CDLData is required",
      });
    }

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

    // =======================================================
    // CREATE PRODUCT CONFIGURATION
    //
    // Frontend configuration is passed directly to Mongoose.
    //
    // COE_CDL model controls:
    // - allowed fields
    // - required fields
    // - field types
    // =======================================================

    const order = new COE_CDL(
      COE_CDLData,
    );

    // Validate before putting into cart.
    await order.validate();

    // =======================================================
    // ADD TO AUTHENTICATED USER CART
    // =======================================================

    req.user.cart.push({
      numRequested: quantity,

      productConfigurationInfo:
        order,

      productType: "COE_CDL",
    });

    // =======================================================
    // SAVE USER
    // =======================================================

    await req.user.save();

    // =======================================================
    // SUCCESS
    // =======================================================

    return res.status(200).json({
      success: true,
      message:
        "Caterpillar Drive Lubricator added to configurator successfully",
    });
  } catch (error) {
    console.error(
      "COE_CDL route error:",
      error,
    );

    // =======================================================
    // MONGOOSE VALIDATION ERROR
    // =======================================================

    if (
      error.name ===
      "ValidationError"
    ) {
      return res.status(422).json({
        success: false,
        message: error.message,
      });
    }

    // =======================================================
    // UNKNOWN SERVER ERROR
    // =======================================================

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
});

module.exports = router