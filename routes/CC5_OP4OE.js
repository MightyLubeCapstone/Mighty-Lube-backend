const express = require("express");

const { authenticate } = require("./sessions");
const CC5_OP4OE = require("../models/CC5_OP4OE");

const router = express.Router();

// ===========================================================
// ADD CC5 OP-40E TO CONFIGURATOR
//
// Endpoint:
// POST /api/cc5_op40e
//
// Expected body:
//
// {
//   "CC5_OP4OEData": {
//     "...configuration fields...": "...",
//     "technicianNote": "Optional technician note"
//   },
//   "numRequested": 1
// }
// ===========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      CC5_OP4OEData,
      numRequested,
    } = req.body || {};

    // =======================================================
    // REQUEST VALIDATION
    // =======================================================

    if (
      !CC5_OP4OEData ||
      typeof CC5_OP4OEData !== "object" ||
      Array.isArray(CC5_OP4OEData)
    ) {
      return res.status(400).json({
        success: false,
        message: "CC5_OP4OEData is required",
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
    // Complete frontend configuration is passed directly
    // to the CC5_OP4OE Mongoose model.
    //
    // This includes technicianNote automatically.
    //
    // Mongoose model handles:
    // - allowed fields
    // - required fields
    // - optional fields
    // - field types
    // =======================================================

    const order = new CC5_OP4OE(
      CC5_OP4OEData,
    );

    // =======================================================
    // VALIDATE CONFIGURATION
    // =======================================================

    await order.validate();

    // =======================================================
    // ADD TO AUTHENTICATED USER CART
    // =======================================================

    req.user.cart.push({
      numRequested: quantity,

      productConfigurationInfo:
        order,

      // Keep existing backend product type
      // so old cart/order handling does not break.
      productType: "CC5_OP4OE",
    });

    // =======================================================
    // SAVE USER
    // =======================================================

    await req.user.save();

    // =======================================================
    // SUCCESS RESPONSE
    // =======================================================

    return res.status(200).json({
      success: true,
      message:
        "CC5 OP-40E added to configurator successfully",
    });
  } catch (error) {
    console.error(
      "CC5_OP4OE route error:",
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