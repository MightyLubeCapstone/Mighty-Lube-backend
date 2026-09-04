// routes/OH_CCS_OP8.js

const express = require("express");
const { dbConnect } = require("../config/config"); // kept (even if unused)
const { authenticate } = require("./sessions");
const OH_CCS_OP8 = require("../models/OH_CCS_OP8");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OH_CCS_OP8Data, numRequested } = req.body;

    const order = new OH_CCS_OP8({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: OH_CCS_OP8Data.conveyorName,

      conveyorChainSize: OH_CCS_OP8Data.conveyorChainSize,

      chainManufacturer: OH_CCS_OP8Data.chainManufacturer,

      conveyorLength: OH_CCS_OP8Data.conveyorLength,

      conveyorLengthUnit: OH_CCS_OP8Data.conveyorLengthUnit,

      directionOfTravel: OH_CCS_OP8Data.directionOfTravel,

      applicationEnvironment:
        OH_CCS_OP8Data.applicationEnvironment,

      surroundingTemperatureOutsideRange:
        OH_CCS_OP8Data.surroundingTemperatureOutsideRange,

      conveyorLoadState:
        OH_CCS_OP8Data.conveyorLoadState,

      // =====================================================
      // CUSTOMER POWER UTILITIES
      // =====================================================

      operatingVoltage3Phase:
        OH_CCS_OP8Data.operatingVoltage3Phase,

      controlVoltage:
        OH_CCS_OP8Data.controlVoltage,

      // =====================================================
      // OP-SS
      // =====================================================

      poweredNonPoweredAvailable:
        OH_CCS_OP8Data.poweredNonPoweredAvailable,

      brushMaterialsAvailable:
        OH_CCS_OP8Data.brushMaterialsAvailable,

      installationClearanceConfirmed:
        OH_CCS_OP8Data.installationClearanceConfirmed,

      // =====================================================
      // ADDITIONAL OPTIONS AVAILABLE
      // =====================================================

      washDown:
        OH_CCS_OP8Data.washDown,

      foodIndustry:
        OH_CCS_OP8Data.foodIndustry,

      powerPanelWithTimer:
        OH_CCS_OP8Data.powerPanelWithTimer,

      threeStationPushButtonSwitch:
        OH_CCS_OP8Data.threeStationPushButtonSwitch,

      shroud:
        OH_CCS_OP8Data.shroud,

      otherAdditionalOptions:
        OH_CCS_OP8Data.otherAdditionalOptions,

      // =====================================================
      // OVERHEAD POWER RAIL: MEASUREMENTS
      // =====================================================

      measurementUnit:
        OH_CCS_OP8Data.measurementUnit,

      chainDropA:
        OH_CCS_OP8Data.chainDropA,

      overheadPowerMonoRailPowerTrolleyWheelB:
        OH_CCS_OP8Data.overheadPowerMonoRailPowerTrolleyWheelB,

      overheadPowerMonoRailPowerRailG:
        OH_CCS_OP8Data.overheadPowerMonoRailPowerRailG,

      overheadPowerMonoRailPowerRailH:
        OH_CCS_OP8Data.overheadPowerMonoRailPowerRailH,

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote:
        OH_CCS_OP8Data.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OH_CCS_OP8",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OH_CCS_OP8 entry added",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router