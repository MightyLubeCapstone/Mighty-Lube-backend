// routes/OH_CCS_3000.js

const express = require("express");
const { dbConnect } = require("../config/config"); // kept (even if unused)
const { authenticate } = require("./sessions");
const OH_CCS_3000 = require("../models/OH_CCS_3000");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OH_CCS_3000Data, numRequested } = req.body;

    const order = new OH_CCS_3000({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: OH_CCS_3000Data.conveyorName,

      conveyorChainSize: OH_CCS_3000Data.conveyorChainSize,

      ...(OH_CCS_3000Data.otherConveyorChainSize && {
        otherConveyorChainSize:
          OH_CCS_3000Data.otherConveyorChainSize,
      }),

      chainManufacturer: OH_CCS_3000Data.chainManufacturer,

      ...(OH_CCS_3000Data.otherChainManufacturer && {
        otherChainManufacturer:
          OH_CCS_3000Data.otherChainManufacturer,
      }),

      conveyorLength: OH_CCS_3000Data.conveyorLength,

      conveyorLengthUnit: OH_CCS_3000Data.conveyorLengthUnit,

      conveyorSpeed: OH_CCS_3000Data.conveyorSpeed,

      conveyorSpeedUnit: OH_CCS_3000Data.conveyorSpeedUnit,

      applicationEnvironment:
        OH_CCS_3000Data.applicationEnvironment,

      ...(OH_CCS_3000Data.otherApplicationEnvironment && {
        otherApplicationEnvironment:
          OH_CCS_3000Data.otherApplicationEnvironment,
      }),

      surroundingTemperatureOutsideRange:
        OH_CCS_3000Data.surroundingTemperatureOutsideRange,

      // =====================================================
      // OVERHEAD POWER RAIL: MEASUREMENTS
      // =====================================================

      measurementUnit: OH_CCS_3000Data.measurementUnit,

      chainDropA: OH_CCS_3000Data.chainDropA,

      overheadPowerMonoRailPowerTrolleyWheelB:
        OH_CCS_3000Data.overheadPowerMonoRailPowerTrolleyWheelB,

      overheadPowerMonoRailPowerRailG:
        OH_CCS_3000Data.overheadPowerMonoRailPowerRailG,

      overheadPowerMonoRailPowerRailH:
        OH_CCS_3000Data.overheadPowerMonoRailPowerRailH,

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote: OH_CCS_3000Data.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OH_CCS_3000",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OH_CCS_3000 entry added",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;