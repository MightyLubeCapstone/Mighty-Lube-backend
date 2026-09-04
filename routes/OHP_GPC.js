const express = require("express");
const { authenticate } = require("./sessions");
const OHP_GPC = require("../models/OHP_GPC");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OHP_GPCData, numRequested } = req.body;

    const order = new OHP_GPC({
      // ============================================================
      // GENERAL INFORMATION
      // ============================================================

      conveyorName: OHP_GPCData.conveyorName,

      conveyorChainSize: OHP_GPCData.conveyorChainSize,

      ...(OHP_GPCData.otherConveyorChainSize && {
        otherConveyorChainSize: OHP_GPCData.otherConveyorChainSize,
      }),

      chainManufacturer: OHP_GPCData.chainManufacturer,

      ...(OHP_GPCData.otherChainManufacturer && {
        otherChainManufacturer: OHP_GPCData.otherChainManufacturer,
      }),

      wheelManufacturer: OHP_GPCData.wheelManufacturer,

      ...(OHP_GPCData.otherWheelManufacturer && {
        otherWheelManufacturer: OHP_GPCData.otherWheelManufacturer,
      }),

      conveyorLength: OHP_GPCData.conveyorLength,

      conveyorLengthUnit: OHP_GPCData.conveyorLengthUnit,

      conveyorSpeed: OHP_GPCData.conveyorSpeed,

      conveyorSpeedUnit: OHP_GPCData.conveyorSpeedUnit,

      indexingOrVariableSpeedConditions:
        OHP_GPCData.indexingOrVariableSpeedConditions,

      directionOfTravel: OHP_GPCData.directionOfTravel,

      applicationEnvironment: OHP_GPCData.applicationEnvironment,

      surroundingTemperature: OHP_GPCData.surroundingTemperature,

      conveyorLoadedOrUnloaded: OHP_GPCData.conveyorLoadedOrUnloaded,

      conveyorMovement: OHP_GPCData.conveyorMovement,

      ...(OHP_GPCData.plantLayout && {
        plantLayout: OHP_GPCData.plantLayout,
      }),

      // ============================================================
      // CUSTOMER POWER UTILITIES
      // ============================================================

      operatingVoltageSinglePhase:
        OHP_GPCData.operatingVoltageSinglePhase,

      controlVoltage: OHP_GPCData.controlVoltage,

      compressedAirSupply: OHP_GPCData.compressedAirSupply,

      compressedAirSupplyUnit:
        OHP_GPCData.compressedAirSupplyUnit,

      // ============================================================
      // MONITORING SYSTEM
      // ============================================================

      connectingToExistingMonitoring:
        OHP_GPCData.connectingToExistingMonitoring,

      addNewMonitoringSystem:
        OHP_GPCData.addNewMonitoringSystem,

      // ============================================================
      // CONVEYOR SPECIFICATIONS
      // ============================================================

      currentGreaseType: OHP_GPCData.currentGreaseType,

      currentGreaseNlgiGrade:
        OHP_GPCData.currentGreaseNlgiGrade,

      // ============================================================
      // CONTROLLER
      // ============================================================

      chainMasterController:
        OHP_GPCData.chainMasterController,

      remote: OHP_GPCData.remote,

      mountedOnGreaser:
        OHP_GPCData.mountedOnGreaser,

      controlsOtherUnits:
        OHP_GPCData.controlsOtherUnits,

      timer: OHP_GPCData.timer,

      electricOnOff:
        OHP_GPCData.electricOnOff,

      mightyLubeMonitoring:
        OHP_GPCData.mightyLubeMonitoring,

      preMountingRequirements:
        OHP_GPCData.preMountingRequirements,

      ...(OHP_GPCData.otherDescribe && {
        otherDescribe: OHP_GPCData.otherDescribe,
      }),

      // ============================================================
      // GREASER - POWER CHAIN: MEASUREMENTS
      // ============================================================

      measurementUnit:
        OHP_GPCData.measurementUnit,

      chainDropA:
        OHP_GPCData.chainDropA,

      powerTrolleyWheelB:
        OHP_GPCData.powerTrolleyWheelB,

      trolleyWheelBracketWidthC:
        OHP_GPCData.trolleyWheelBracketWidthC,

      trolleyWheelSpacerD:
        OHP_GPCData.trolleyWheelSpacerD,

      zerkFittingVerticalLocationE:
        OHP_GPCData.zerkFittingVerticalLocationE,

      zerkFittingHorizontalLocationF:
        OHP_GPCData.zerkFittingHorizontalLocationF,

      railG:
        OHP_GPCData.railG,

      railH:
        OHP_GPCData.railH,

      trolleyPitchS:
        OHP_GPCData.trolleyPitchS,

      // ============================================================
      // TECHNICIAN NOTE
      // ============================================================

      technicianNote:
        OHP_GPCData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OHP_GPC",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OHP_GPC entry added",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router