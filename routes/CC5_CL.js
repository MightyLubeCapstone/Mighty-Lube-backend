const express = require("express");

const { authenticate } = require("./sessions");
const CC5_CL = require("../models/CC5_CL");

const router = express.Router();

// ===========================================================
// ADD CC5 CHAIN LUBRICATOR TO CONFIGURATOR
//
// Endpoint:
// POST /api/cc5_cl
//
// Expected body:
//
// {
//   "CC5_CLData": {
//     "...configuration fields...": "...",
//     "technicianNote": "Optional technician note"
//   },
//   "numRequested": 1
// }
// ===========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      CC5_CLData,
      numRequested,
    } = req.body || {};

    // =======================================================
    // REQUEST VALIDATION
    // =======================================================

    if (
      !CC5_CLData ||
      typeof CC5_CLData !== "object" ||
      Array.isArray(CC5_CLData)
    ) {
      return res.status(400).json({
        success: false,
        message: "CC5_CLData is required",
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
    // to the CC5_CL Mongoose model.
    //
    // This includes technicianNote automatically.
    //
    // Model handles:
    // - allowed fields
    // - required fields
    // - optional fields
    // - field types
    // =======================================================

    const order = new CC5_CL(
      CC5_CLData,
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

      productType: "CC5_CL",
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
        "CC5 Chain Lubricator added to configurator successfully",
    });
  } catch (error) {
    console.error(
      "CC5_CL route error:",
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

module.exports = router;