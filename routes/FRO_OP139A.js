const express = require("express");
const { authenticate } = require("./sessions");
const FRO_OP139A = require("../models/FRO_OP139A");

const router = express.Router();

// =========================================================
// OP-139A
// Product ID: FRO_OP139A
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { FRO_OP139AData, numRequested } = req.body;

    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    if (!FRO_OP139AData) {
      return res.status(400).json({
        error: "FRO_OP139AData is required",
      });
    }

    // =====================================================
    // CREATE PRODUCT CONFIGURATION
    // =====================================================

    const order = new FRO_OP139A({
      // ===================================================
      // GENERAL INFORMATION
      // ===================================================

      conveyorName: FRO_OP139AData.conveyorName,

      conveyorChainSize: FRO_OP139AData.conveyorChainSize,

      otherConveyorChainSize:
        FRO_OP139AData.otherConveyorChainSize,

      chainManufacturer:
        FRO_OP139AData.chainManufacturer,

      otherChainManufacturer:
        FRO_OP139AData.otherChainManufacturer,

      conveyorLength:
        FRO_OP139AData.conveyorLength,

      conveyorLengthUnit:
        FRO_OP139AData.conveyorLengthUnit,

      conveyorSpeed:
        FRO_OP139AData.conveyorSpeed,

      conveyorSpeedUnit:
        FRO_OP139AData.conveyorSpeedUnit,

      indexingVariableSpeedConditions:
        FRO_OP139AData.indexingVariableSpeedConditions,

      travelDirection:
        FRO_OP139AData.travelDirection,

      applicationEnvironment:
        FRO_OP139AData.applicationEnvironment,

      surroundingTemperature:
        FRO_OP139AData.surroundingTemperature,

      conveyorLoadedStatus:
        FRO_OP139AData.conveyorLoadedStatus,

      conveyorSwingStatus:
        FRO_OP139AData.conveyorSwingStatus,

      // ===================================================
      // CUSTOMER POWER UTILITIES
      // ===================================================

      controlVoltage:
        FRO_OP139AData.controlVoltage,

      compressedAirSupply:
        FRO_OP139AData.compressedAirSupply,

      compressedAirSupplyUnit:
        FRO_OP139AData.compressedAirSupplyUnit,

      // ===================================================
      // MONITORING
      // ===================================================

      existingMonitoring:
        FRO_OP139AData.existingMonitoring,

      newMonitoringSystem:
        FRO_OP139AData.newMonitoringSystem,

      // ===================================================
      // CONVEYOR SPECIFICATIONS
      // ===================================================

      wheelOpenRaceStyle:
        FRO_OP139AData.wheelOpenRaceStyle,

      wheelSealedStyle:
        FRO_OP139AData.wheelSealedStyle,

      openInsideShieldedOutside:
        FRO_OP139AData.openInsideShieldedOutside,

      freeTrolleyWheels:
        FRO_OP139AData.freeTrolleyWheels,

      guideRollers:
        FRO_OP139AData.guideRollers,

      guideRollersOpenRaceStyle:
        FRO_OP139AData.guideRollersOpenRaceStyle,

      guideRollersSealedStyle:
        FRO_OP139AData.guideRollersSealedStyle,

      openHole:
        FRO_OP139AData.openHole,

      dogActuator:
        FRO_OP139AData.dogActuator,

      pivotPoints:
        FRO_OP139AData.pivotPoints,

      kingPin:
        FRO_OP139AData.kingPin,

      railLubrication:
        FRO_OP139AData.railLubrication,

      currentLubricationEquipmentBrand:
        FRO_OP139AData.currentLubricationEquipmentBrand,

      currentLubricantType:
        FRO_OP139AData.currentLubricantType,

      currentLubricantViscosityGrade:
        FRO_OP139AData.currentLubricantViscosityGrade,

      lubricationFromSideOfChain:
        FRO_OP139AData.lubricationFromSideOfChain,

      lubricationFromTopOfChain:
        FRO_OP139AData.lubricationFromTopOfChain,

      // ===================================================
      // CONTROLLER
      // ===================================================

      chainMasterController:
        FRO_OP139AData.chainMasterController,

      timer:
        FRO_OP139AData.timer,

      electricOnOff:
        FRO_OP139AData.electricOnOff,

      pneumaticOnOff:
        FRO_OP139AData.pneumaticOnOff,

      mightyLubeMonitoring:
        FRO_OP139AData.mightyLubeMonitoring,

      plcConnection:
        FRO_OP139AData.plcConnection,

      otherControllerInfo:
        FRO_OP139AData.otherControllerInfo,

      specialControllerOptions:
        FRO_OP139AData.specialControllerOptions,

      controllerSpecify:
        FRO_OP139AData.controllerSpecify,

      // ===================================================
      // FREE RAIL MEASUREMENTS
      // ===================================================

      freeRailMeasurementUnit:
        FRO_OP139AData.freeRailMeasurementUnit,

      overheadFreeRailG:
        FRO_OP139AData.overheadFreeRailG,

      overheadFreeRailH:
        FRO_OP139AData.overheadFreeRailH,

      overheadTrolleyWheelPitchK:
        FRO_OP139AData.overheadTrolleyWheelPitchK,

      overheadFreeRailTrolleyWheelK2:
        FRO_OP139AData.overheadFreeRailTrolleyWheelK2,

      invertedPowerFreeChainDropA:
        FRO_OP139AData.invertedPowerFreeChainDropA,

      invertedPowerFreePowerTrolleyWheelB:
        FRO_OP139AData.invertedPowerFreePowerTrolleyWheelB,

      invertedPowerFreeRailG:
        FRO_OP139AData.invertedPowerFreeRailG,

      invertedPowerFreeRailH:
        FRO_OP139AData.invertedPowerFreeRailH,

      invertedPowerFreeTrolleyWheelPitchK:
        FRO_OP139AData.invertedPowerFreeTrolleyWheelPitchK,

      overheadFreeTrolleyWheelPositionL:
        FRO_OP139AData.overheadFreeTrolleyWheelPositionL,

      // ===================================================
      // TECHNICIAN NOTE
      // ===================================================

      technicianNote:
        FRO_OP139AData.technicianNote,
    });

    // =====================================================
    // ADD TO USER CART
    // =====================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FRO_OP139A",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FRO_OP139A entry added",
    });
  } catch (error) {
    console.error("FRO_OP139A route error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router