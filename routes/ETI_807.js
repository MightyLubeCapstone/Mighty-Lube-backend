const express = require("express");
const { authenticate } = require("./sessions");
const ETI_807 = require("../models/ETI_807");

const router = express.Router();

// =========================================================
// POST /api/eti_807
//
// Product:
// Overhead Non-Powered Mighty Lube
// Chain Cleaners 8074-B / 8075-B
//
// Expected body:
//
// {
//   "ETI_807Data": {
//     "conveyorName": "...",
//     "chainSize": "...",
//     "otherChainSize": "...",
//     "industrialChainManufacturer": "...",
//     "otherIndustrialChainManufacturer": "...",
//     "conveyorLength": "...",
//     "conveyorLengthUnit": "...",
//     "conveyorSpeed": "...",
//     "conveyorSpeedUnit": "...",
//     "appEnviroment": "...",
//     "otherAppEnviroment": "...",
//     "technicianNote": "..."
//   },
//   "numRequested": 1
// }
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { ETI_807Data, numRequested } = req.body || {};

    // =====================================================
    // BASIC REQUEST VALIDATION
    // =====================================================

    if (!ETI_807Data) {
      return res.status(400).json({
        error: "ETI_807Data is required",
      });
    }

    if (!numRequested || numRequested < 1) {
      return res.status(400).json({
        error: "numRequested must be at least 1",
      });
    }

    // =====================================================
    // BUILD PRODUCT CONFIGURATION
    // =====================================================

    const order = new ETI_807({
      // ---------------------------------------------------
      // GENERAL INFORMATION
      // ---------------------------------------------------

      conveyorName: ETI_807Data.conveyorName,

      chainSize: ETI_807Data.chainSize,

      industrialChainManufacturer:
        ETI_807Data.industrialChainManufacturer,

      conveyorLength: ETI_807Data.conveyorLength,

      conveyorLengthUnit:
        ETI_807Data.conveyorLengthUnit,

      conveyorSpeed: ETI_807Data.conveyorSpeed,

      conveyorSpeedUnit:
        ETI_807Data.conveyorSpeedUnit,

      appEnviroment: ETI_807Data.appEnviroment,

      // ---------------------------------------------------
      // CONDITIONAL: OTHER CHAIN SIZE
      // ---------------------------------------------------

      ...(ETI_807Data.chainSize === "Other" &&
        ETI_807Data.otherChainSize && {
          otherChainSize:
            ETI_807Data.otherChainSize.trim(),
        }),

      // ---------------------------------------------------
      // CONDITIONAL: OTHER CHAIN MANUFACTURER
      // ---------------------------------------------------

      ...(ETI_807Data.industrialChainManufacturer ===
        "Other" &&
        ETI_807Data.otherIndustrialChainManufacturer && {
          otherIndustrialChainManufacturer:
            ETI_807Data.otherIndustrialChainManufacturer.trim(),
        }),

      // ---------------------------------------------------
      // CONDITIONAL: OTHER APPLICATION ENVIRONMENT
      // ---------------------------------------------------

      ...(ETI_807Data.appEnviroment === "Other" &&
        ETI_807Data.otherAppEnviroment && {
          otherAppEnviroment:
            ETI_807Data.otherAppEnviroment.trim(),
        }),

      // ---------------------------------------------------
      // OPTIONAL TECHNICIAN NOTE
      // ---------------------------------------------------

      ...(ETI_807Data.technicianNote &&
        ETI_807Data.technicianNote.trim() && {
          technicianNote:
            ETI_807Data.technicianNote.trim(),
        }),
    });

    // =====================================================
    // VALIDATE CONFIGURATION
    //
    // Important because this document is embedded into
    // user's cart and is not saved independently here.
    // =====================================================

    await order.validate();

    // =====================================================
    // ADD TO AUTHENTICATED USER CART
    // =====================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "ETI_807",
    });

    await req.user.save();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(200).json({
      message: "ETI_807 entry added",
    });
  } catch (error) {
    console.error("ETI_807 configuration error:", error);

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: error.message,
      });
    }

    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router