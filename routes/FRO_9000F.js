const express = require("express");
const { authenticate } = require("./sessions");
const FRO_9000F = require("../models/FRO_9000F");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { FRO_9000FData, numRequested } = req.body || {};

    if (!FRO_9000FData) {
      return res.status(400).json({
        error: "FRO_9000FData is required",
      });
    }

    const order = new FRO_9000F({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: FRO_9000FData.conveyorName || "",

      conveyorChainSize: FRO_9000FData.conveyorChainSize || "",

      chainManufacturer: FRO_9000FData.chainManufacturer || "",

      conveyorLength: FRO_9000FData.conveyorLength || "",

      conveyorLengthUnit: FRO_9000FData.conveyorLengthUnit || "",

      conveyorSpeed: FRO_9000FData.conveyorSpeed || "",

      conveyorSpeedUnit: FRO_9000FData.conveyorSpeedUnit || "",

      indexingVariableSpeedConditions:
        FRO_9000FData.indexingVariableSpeedConditions || "",

      travelDirection: FRO_9000FData.travelDirection || "",

      applicationEnvironment:
        FRO_9000FData.applicationEnvironment || "",

      surroundingTemperature:
        FRO_9000FData.surroundingTemperature || "",

      conveyorLoadedStatus:
        FRO_9000FData.conveyorLoadedStatus || "",

      conveyorSwingStatus:
        FRO_9000FData.conveyorSwingStatus || "",

      // =====================================================
      // CUSTOMER POWER UTILITIES
      // =====================================================

      operatingVoltage:
        FRO_9000FData.operatingVoltage || "",

      controlVoltage:
        FRO_9000FData.controlVoltage || "",

      // =====================================================
      // MONITORING
      // =====================================================

      existingMonitoring:
        FRO_9000FData.existingMonitoring || "",

      newMonitoringSystem:
        FRO_9000FData.newMonitoringSystem || "",

      // =====================================================
      // CONVEYOR SPECIFICATIONS
      // =====================================================

      wheelOpenRaceStyle:
        FRO_9000FData.wheelOpenRaceStyle || "",

      wheelSealedStyle:
        FRO_9000FData.wheelSealedStyle || "",

      openInsideShieldedOutside:
        FRO_9000FData.openInsideShieldedOutside || "",

      freeTrolleyWheels:
        FRO_9000FData.freeTrolleyWheels || "",

      guideRollers:
        FRO_9000FData.guideRollers || "",

      guideRollersOpenRaceStyle:
        FRO_9000FData.guideRollersOpenRaceStyle || "",

      guideRollersSealedStyle:
        FRO_9000FData.guideRollersSealedStyle || "",

      openHole:
        FRO_9000FData.openHole || "",

      dogActuator:
        FRO_9000FData.dogActuator || "",

      pivotPoints:
        FRO_9000FData.pivotPoints || "",

      kingPin:
        FRO_9000FData.kingPin || "",

      railLubrication:
        FRO_9000FData.railLubrication || "",

      currentLubricationEquipmentBrand:
        FRO_9000FData.currentLubricationEquipmentBrand || "",

      currentLubricantType:
        FRO_9000FData.currentLubricantType || "",

      currentLubricantViscosityGrade:
        FRO_9000FData.currentLubricantViscosityGrade || "",

      lubricationFromSideOfChain:
        FRO_9000FData.lubricationFromSideOfChain || "",

      lubricationFromTopOfChain:
        FRO_9000FData.lubricationFromTopOfChain || "",

      // =====================================================
      // CONTROLLER
      // =====================================================

      specialControllerOptions:
        FRO_9000FData.specialControllerOptions || "",

      controllerSpecify:
        FRO_9000FData.controllerSpecify || "",

      // =====================================================
      // WIRE
      // =====================================================

      wireMeasurementUnit:
        FRO_9000FData.wireMeasurementUnit || "",

      twoConductor:
        FRO_9000FData.twoConductor || "",

      fourConductor:
        FRO_9000FData.fourConductor || "",

      sevenConductor:
        FRO_9000FData.sevenConductor || "",

      twelveConductor:
        FRO_9000FData.twelveConductor || "",

      junctionBoxQuantities:
        FRO_9000FData.junctionBoxQuantities || "",

      // =====================================================
      // FREE RAIL MEASUREMENTS
      // =====================================================

      freeRailMeasurementUnit:
        FRO_9000FData.freeRailMeasurementUnit || "",

      overheadFreeRailC:
        FRO_9000FData.overheadFreeRailC || "",

      overheadFreeRailD:
        FRO_9000FData.overheadFreeRailD || "",

      overheadTrolleyWheelPitchK:
        FRO_9000FData.overheadTrolleyWheelPitchK || "",

      overheadFreeTrolleyWheelPositionL:
        FRO_9000FData.overheadFreeTrolleyWheelPositionL || "",

      overheadFreeRailTrolleyWheelC2:
        FRO_9000FData.overheadFreeRailTrolleyWheelC2 || "",

      invertedPowerFreeRailE:
        FRO_9000FData.invertedPowerFreeRailE || "",

      invertedPowerFreeTrolleyWheelPitchK:
        FRO_9000FData.invertedPowerFreeTrolleyWheelPitchK || "",

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote:
        FRO_9000FData.technicianNote || "",
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "9000L",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FRO_9000F entry added",
    });
  } catch (error) {
    console.log("FRO_9000F add error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;