// routes/OH_CCS_BRUSH.js

const express = require("express");
const { dbConnect } = require("../config/config"); // kept (even if unused)
const { authenticate } = require("./sessions");
const OH_CCS_BRUSH = require("../models/OH_CCS_BRUSH");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OH_CCS_BRUSHData, numRequested } = req.body;

    const order = new OH_CCS_BRUSH({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: OH_CCS_BRUSHData.conveyorName,

      conveyorChainSize: OH_CCS_BRUSHData.conveyorChainSize,

      ...(OH_CCS_BRUSHData.otherConveyorChainSize && {
        otherConveyorChainSize:
          OH_CCS_BRUSHData.otherConveyorChainSize,
      }),

      chainManufacturer: OH_CCS_BRUSHData.chainManufacturer,

      ...(OH_CCS_BRUSHData.otherChainManufacturer && {
        otherChainManufacturer:
          OH_CCS_BRUSHData.otherChainManufacturer,
      }),

      conveyorLength: OH_CCS_BRUSHData.conveyorLength,

      conveyorLengthUnit: OH_CCS_BRUSHData.conveyorLengthUnit,

      applicationEnvironment:
        OH_CCS_BRUSHData.applicationEnvironment,

      ...(OH_CCS_BRUSHData.otherApplicationEnvironment && {
        otherApplicationEnvironment:
          OH_CCS_BRUSHData.otherApplicationEnvironment,
      }),

      surroundingTemperatureOutsideRange:
        OH_CCS_BRUSHData.surroundingTemperatureOutsideRange,

      // =====================================================
      // OVERHEAD POWER RAIL: MEASUREMENTS
      // =====================================================

      measurementUnit: OH_CCS_BRUSHData.measurementUnit,

      chainDropA: OH_CCS_BRUSHData.chainDropA,

      overheadPowerMonoRailPowerRailG:
        OH_CCS_BRUSHData.overheadPowerMonoRailPowerRailG,

      overheadPowerMonoRailPowerRailH:
        OH_CCS_BRUSHData.overheadPowerMonoRailPowerRailH,

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote: OH_CCS_BRUSHData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OH_CCS_BRUSH",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OH_CCS_BRUSH entry added",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router