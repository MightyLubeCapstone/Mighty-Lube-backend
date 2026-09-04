const express = require("express");
const { authenticate } = require("./sessions");
const FRO_314 = require("../models/FRO_314");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { FRO_314Data, numRequested } = req.body || {};

    if (!FRO_314Data) {
      return res.status(400).json({
        error: "FRO_314Data is required",
      });
    }

    const order = new FRO_314({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: FRO_314Data.conveyorName || "",

      wheelManufacturer:
        FRO_314Data.wheelManufacturer || "",

      otherWheelManufacturer:
        FRO_314Data.otherWheelManufacturer || "",

      conveyorLength:
        FRO_314Data.conveyorLength || "",

      conveyorLengthUnit:
        FRO_314Data.conveyorLengthUnit || "",

      conveyorSpeed:
        FRO_314Data.conveyorSpeed || "",

      conveyorSpeedUnit:
        FRO_314Data.conveyorSpeedUnit || "",

      indexingVariableSpeedConditions:
        FRO_314Data.indexingVariableSpeedConditions || "",

      travelDirection:
        FRO_314Data.travelDirection || "",

      applicationEnvironment:
        FRO_314Data.applicationEnvironment || "",

      otherApplicationEnvironment:
        FRO_314Data.otherApplicationEnvironment || "",

      surroundingTemperature:
        FRO_314Data.surroundingTemperature || "",

      conveyorSwingStatus:
        FRO_314Data.conveyorSwingStatus || "",

      conveyorOrientation:
        FRO_314Data.conveyorOrientation || "",

      // =====================================================
      // CUSTOMER POWER UTILITIES
      // =====================================================

      operatingVoltage:
        FRO_314Data.operatingVoltage || "",

      controlVoltage:
        FRO_314Data.controlVoltage || "",

      compressedAirSupply:
        FRO_314Data.compressedAirSupply || "",

      compressedAirSupplyUnit:
        FRO_314Data.compressedAirSupplyUnit || "",

      // =====================================================
      // NEW MONITORING SYSTEM OR ADDING TO EXISTING
      // =====================================================

      existingMonitoring:
        FRO_314Data.existingMonitoring || "",

      newMonitoringSystem:
        FRO_314Data.newMonitoringSystem || "",

      // =====================================================
      // CONVEYOR SPECIFICATIONS
      // =====================================================

      freeTrolleyWheels:
        FRO_314Data.freeTrolleyWheels || "",

      dogActuator:
        FRO_314Data.dogActuator || "",

      pivotPoints:
        FRO_314Data.pivotPoints || "",

      kingPin:
        FRO_314Data.kingPin || "",

      currentLubricationEquipmentBrand:
        FRO_314Data.currentLubricationEquipmentBrand || "",

      currentLubricantType:
        FRO_314Data.currentLubricantType || "",

      currentLubricantViscosityGrade:
        FRO_314Data.currentLubricantViscosityGrade || "",

      currentGreaseType:
        FRO_314Data.currentGreaseType || "",

      currentGreaseNlgiGrade:
        FRO_314Data.currentGreaseNlgiGrade || "",

      zerkFittingLocationSide:
        FRO_314Data.zerkFittingLocationSide || "",

      zerkFittingLocationOrientation:
        FRO_314Data.zerkFittingLocationOrientation || "",

      // =====================================================
      // CONTROLLER
      // =====================================================

      chainMasterController:
        FRO_314Data.chainMasterController || "",

      remote:
        FRO_314Data.remote || "",

      mountedOnGreaser:
        FRO_314Data.mountedOnGreaser || "",

      controlsOtherUnits:
        FRO_314Data.controlsOtherUnits || "",

      timer:
        FRO_314Data.timer || "",

      electricOnOff:
        FRO_314Data.electricOnOff || "",

      mightyLubeMonitoring:
        FRO_314Data.mightyLubeMonitoring || "",

      preMountingRequirements:
        FRO_314Data.preMountingRequirements || "",

      plcConnection:
        FRO_314Data.plcConnection || "",

      otherControllerInfo:
        FRO_314Data.otherControllerInfo || "",

      // =====================================================
      // INVERTED P&F: MEASUREMENTS
      // =====================================================

      measurementUnit:
        FRO_314Data.measurementUnit || "",

      invertedPowerTrolleyWheelB:
        FRO_314Data.invertedPowerTrolleyWheelB || "",

      invertedZerkFittingVerticalE:
        FRO_314Data.invertedZerkFittingVerticalE || "",

      invertedRailG:
        FRO_314Data.invertedRailG || "",

      invertedRailH:
        FRO_314Data.invertedRailH || "",

      invertedTrolleyWheelPitchK:
        FRO_314Data.invertedTrolleyWheelPitchK || "",

      invertedCarrierTrolleyPitchT:
        FRO_314Data.invertedCarrierTrolleyPitchT || "",

      invertedCarrierTrolleyPitchU:
        FRO_314Data.invertedCarrierTrolleyPitchU || "",

      invertedCarrierTrolleyPitchV:
        FRO_314Data.invertedCarrierTrolleyPitchV || "",

      invertedFreeTrolleyWheelOffsetW:
        FRO_314Data.invertedFreeTrolleyWheelOffsetW || "",

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote:
        FRO_314Data.technicianNote || "",
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FRO_314",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FRO_314 entry added",
    });
  } catch (error) {
    console.log("FRO_314 add error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router