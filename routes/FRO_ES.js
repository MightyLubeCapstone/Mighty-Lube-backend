const express = require("express");
const { authenticate } = require("./sessions");
const FRO_ES = require("../models/FRO_ES");

const router = express.Router();

// =========================================================
// E-SERIES
// Product ID: FRO_ES
// POST /api/fro_es
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { FRO_ESData, numRequested } = req.body;

    // =====================================================
    // BASIC REQUEST VALIDATION
    // =====================================================

    if (!FRO_ESData) {
      return res.status(400).json({
        error: "FRO_ESData is required",
      });
    }

    // =====================================================
    // CREATE PRODUCT CONFIGURATION
    // =====================================================

    const order = new FRO_ES({
      // ===================================================
      // GENERAL INFORMATION
      // ===================================================

      conveyorName: FRO_ESData.conveyorName,

      conveyorChainSize: FRO_ESData.conveyorChainSize,

      chainManufacturer: FRO_ESData.chainManufacturer,

      conveyorLength: FRO_ESData.conveyorLength,

      conveyorLengthUnit: FRO_ESData.conveyorLengthUnit,

      conveyorSpeed: FRO_ESData.conveyorSpeed,

      conveyorSpeedUnit: FRO_ESData.conveyorSpeedUnit,

      indexingVariableSpeedConditions:
        FRO_ESData.indexingVariableSpeedConditions,

      travelDirection: FRO_ESData.travelDirection,

      applicationEnvironment: FRO_ESData.applicationEnvironment,

      surroundingTemperature: FRO_ESData.surroundingTemperature,

      conveyorLoadedStatus: FRO_ESData.conveyorLoadedStatus,

      conveyorSwingStatus: FRO_ESData.conveyorSwingStatus,

      // ===================================================
      // CUSTOMER POWER UTILITIES
      // ===================================================

      operatingVoltage: FRO_ESData.operatingVoltage,

      controlVoltage: FRO_ESData.controlVoltage,

      // ===================================================
      // MONITORING
      // ===================================================

      existingMonitoring: FRO_ESData.existingMonitoring,

      newMonitoringSystem: FRO_ESData.newMonitoringSystem,

      // ===================================================
      // CONVEYOR SPECIFICATIONS
      // ===================================================

      wheelOpenRaceStyle: FRO_ESData.wheelOpenRaceStyle,

      wheelSealedStyle: FRO_ESData.wheelSealedStyle,

      openInsideShieldedOutside:
        FRO_ESData.openInsideShieldedOutside,

      freeTrolleyWheels: FRO_ESData.freeTrolleyWheels,

      guideRollers: FRO_ESData.guideRollers,

      guideRollersOpenRaceStyle:
        FRO_ESData.guideRollersOpenRaceStyle,

      guideRollersSealedStyle:
        FRO_ESData.guideRollersSealedStyle,

      openHole: FRO_ESData.openHole,

      dogActuator: FRO_ESData.dogActuator,

      pivotPoints: FRO_ESData.pivotPoints,

      kingPin: FRO_ESData.kingPin,

      railLubrication: FRO_ESData.railLubrication,

      currentLubricationEquipmentBrand:
        FRO_ESData.currentLubricationEquipmentBrand,

      currentLubricantType:
        FRO_ESData.currentLubricantType,

      currentLubricantViscosityGrade:
        FRO_ESData.currentLubricantViscosityGrade,

      lubricationFromSideOfChain:
        FRO_ESData.lubricationFromSideOfChain,

      lubricationFromTopOfChain:
        FRO_ESData.lubricationFromTopOfChain,

      // ===================================================
      // CONTROLLER
      // ===================================================

      chainMasterController:
        FRO_ESData.chainMasterController,

      timer: FRO_ESData.timer,

      electricOnOff: FRO_ESData.electricOnOff,

      pneumaticOnOff: FRO_ESData.pneumaticOnOff,

      mightyLubeMonitoring:
        FRO_ESData.mightyLubeMonitoring,

      plcConnection: FRO_ESData.plcConnection,

      otherControllerInfo:
        FRO_ESData.otherControllerInfo,

      specialControllerOptions:
        FRO_ESData.specialControllerOptions,

      controllerSpecify:
        FRO_ESData.controllerSpecify,

      // ===================================================
      // FREE RAIL MEASUREMENTS
      // ===================================================

      freeRailMeasurementUnit:
        FRO_ESData.freeRailMeasurementUnit,

      overheadFreeRailC:
        FRO_ESData.overheadFreeRailC,

      overheadFreeRailD:
        FRO_ESData.overheadFreeRailD,

      overheadTrolleyWheelPitchK:
        FRO_ESData.overheadTrolleyWheelPitchK,

      overheadFreeTrolleyWheelPositionL:
        FRO_ESData.overheadFreeTrolleyWheelPositionL,

      overheadFreeRailTrolleyWheelC2:
        FRO_ESData.overheadFreeRailTrolleyWheelC2,

      invertedPowerFreeRailE:
        FRO_ESData.invertedPowerFreeRailE,

      invertedPowerFreeTrolleyWheelPitchK:
        FRO_ESData.invertedPowerFreeTrolleyWheelPitchK,

      // ===================================================
      // TECHNICIAN NOTE
      // ===================================================

      technicianNote: FRO_ESData.technicianNote,
    });

    // =====================================================
    // ADD TO USER CART
    // =====================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FRO_ES",
    });

    await req.user.save();

    // =====================================================
    // SUCCESS
    // =====================================================

    return res.status(200).json({
      message: "FRO_ES entry added",
    });
  } catch (error) {
    console.error("FRO_ES route error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router