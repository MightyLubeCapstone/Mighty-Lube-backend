const express = require("express")
const router = express.Router();

const ETI_91 = require("../models/ETI_91");
const Cart = require("../models/cart");
const { authenticate } = require("./sessions");

// =========================================================
// POST /api/eti_91
//
// Body:
//
// {
//   "ETI_91Data": {
//     "conveyorName": "...",
//     "chainSize": "...",
//     "otherChainSize": "...",
//     "industrialChainManufacturer": "...",
//     "otherIndustrialChainManufacturer": "...",
//     "conveyorLength": "...",
//     "conveyorLengthUnit": "...",
//     "conveyorSpeed": "...",ss
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
    const { ETI_91Data, numRequested } = req.body;

    // =====================================================
    // BASIC REQUEST VALIDATION
    // =====================================================

    if (!ETI_91Data) {
      return res.status(400).json({
        success: false,
        message: "ETI_91Data is required",
      });
    }

    if (!numRequested || numRequested < 1) {
      return res.status(400).json({
        success: false,
        message: "numRequested must be at least 1",
      });
    }

    // =====================================================
    // BUILD CONFIGURATION DATA
    //
    // Hidden conditional fields are not expected from
    // Flutter when their parent field is not "Other".
    // =====================================================

    const configurationData = {
      conveyorName: ETI_91Data.conveyorName,

      chainSize: ETI_91Data.chainSize,

      industrialChainManufacturer:
        ETI_91Data.industrialChainManufacturer,

      conveyorLength: ETI_91Data.conveyorLength,

      conveyorLengthUnit:
        ETI_91Data.conveyorLengthUnit,

      conveyorSpeed: ETI_91Data.conveyorSpeed,

      conveyorSpeedUnit:
        ETI_91Data.conveyorSpeedUnit,

      appEnviroment: ETI_91Data.appEnviroment,
    };

    // =====================================================
    // CONDITIONAL FIELDS
    // =====================================================

    if (ETI_91Data.chainSize === "Other") {
      configurationData.otherChainSize =
        ETI_91Data.otherChainSize;
    }

    if (
      ETI_91Data.industrialChainManufacturer === "Other"
    ) {
      configurationData.otherIndustrialChainManufacturer =
        ETI_91Data.otherIndustrialChainManufacturer;
    }

    if (ETI_91Data.appEnviroment === "Other") {
      configurationData.otherAppEnviroment =
        ETI_91Data.otherAppEnviroment;
    }

    // =====================================================
    // OPTIONAL TECHNICIAN NOTE
    // =====================================================

    if (
      ETI_91Data.technicianNote &&
      ETI_91Data.technicianNote.trim() !== ""
    ) {
      configurationData.technicianNote =
        ETI_91Data.technicianNote.trim();
    }

    // =====================================================
    // SAVE CONFIGURATION
    //
    // Mongoose model performs required-field and conditional
    // validation here.
    // =====================================================

    const configuration = new ETI_91(
      configurationData
    );

    const savedConfiguration =
      await configuration.save();

    // =====================================================
    // ADD PRODUCT TO CART
    // =====================================================

    const cartItem = new Cart({
      userId: req.user._id,
      productType: "ETI_91",
      productConfiguration:
        savedConfiguration._id,
      numRequested,
    });

    await cartItem.save();

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,
      message:
        "ETI_91 configuration added successfully",
      data: {
        configuration:
          savedConfiguration,
        cartItem,
      },
    });
  } catch (error) {
    console.error(
      "ETI_91 configuration error:",
      error
    );

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to add ETI_91 configuration",
      error: error.message,
    });
  }
});

module.exports = router