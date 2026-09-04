const express = require("express");
const { authenticate } = require("./sessions");
const OH_CCS_IBEAM = require("../models/OH_CCS_IBEAM");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OH_CCS_IBEAMData, numRequested } = req.body;

    if (!OH_CCS_IBEAMData) {
      return res.status(400).json({
        error: "OH_CCS_IBEAMData is required",
      });
    }

    const order = new OH_CCS_IBEAM({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: OH_CCS_IBEAMData.conveyorName,

      conveyorChainSize: OH_CCS_IBEAMData.conveyorChainSize,

      otherConveyorChainSize:
        OH_CCS_IBEAMData.otherConveyorChainSize,

      chainManufacturer:
        OH_CCS_IBEAMData.chainManufacturer,

      otherChainManufacturer:
        OH_CCS_IBEAMData.otherChainManufacturer,

      conveyorLength:
        OH_CCS_IBEAMData.conveyorLength,

      conveyorLengthUnit:
        OH_CCS_IBEAMData.conveyorLengthUnit,

      applicationEnvironment:
        OH_CCS_IBEAMData.applicationEnvironment,

      otherApplicationEnvironment:
        OH_CCS_IBEAMData.otherApplicationEnvironment,

      // =====================================================
      // OVERHEAD POWER RAIL MEASUREMENTS
      // =====================================================

      measurementUnit:
        OH_CCS_IBEAMData.measurementUnit,

      overheadPowerRailChannelTrolleyWheelB:
        OH_CCS_IBEAMData.overheadPowerRailChannelTrolleyWheelB,

      overheadPowerRailG:
        OH_CCS_IBEAMData.overheadPowerRailG,

      overheadPowerRailH:
        OH_CCS_IBEAMData.overheadPowerRailH,

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote:
        OH_CCS_IBEAMData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OH_CCS_IBEAM",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OH_CCS_IBEAM entry added",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router