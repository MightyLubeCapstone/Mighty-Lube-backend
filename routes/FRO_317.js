const express = require("express");
const { authenticate } = require("./sessions");
const FRO_317 = require("../models/FRO_317");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { FRO_317Data, numRequested } = req.body || {};

    if (!FRO_317Data) {
      return res.status(400).json({
        error: "FRO_317Data is required",
      });
    }

    const order = new FRO_317({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName:
        FRO_317Data.conveyorName || "",

      wheelManufacturer:
        FRO_317Data.wheelManufacturer || "",

      otherWheelManufacturer:
        FRO_317Data.otherWheelManufacturer || "",

      conveyorLength:
        FRO_317Data.conveyorLength || "",

      conveyorLengthUnit:
        FRO_317Data.conveyorLengthUnit || "",

      conveyorSpeed:
        FRO_317Data.conveyorSpeed || "",

      conveyorSpeedUnit:
        FRO_317Data.conveyorSpeedUnit || "",

      indexingVariableSpeedConditions:
        FRO_317Data.indexingVariableSpeedConditions || "",

      travelDirection:
        FRO_317Data.travelDirection || "",

      applicationEnvironment:
        FRO_317Data.applicationEnvironment || "",

      otherApplicationEnvironment:
        FRO_317Data.otherApplicationEnvironment || "",

      surroundingTemperature:
        FRO_317Data.surroundingTemperature || "",

      conveyorSwingStatus:
        FRO_317Data.conveyorSwingStatus || "",

      conveyorOrientation:
        FRO_317Data.conveyorOrientation || "",

      // =====================================================
      // CUSTOMER POWER UTILITIES
      // =====================================================

      operatingVoltage:
        FRO_317Data.operatingVoltage || "",

      controlVoltage:
        FRO_317Data.controlVoltage || "",

      compressedAirSupply:
        FRO_317Data.compressedAirSupply || "",

      compressedAirSupplyUnit:
        FRO_317Data.compressedAirSupplyUnit || "",

      // =====================================================
      // NEW MONITORING SYSTEM OR ADDING TO EXISTING
      // =====================================================

      existingMonitoring:
        FRO_317Data.existingMonitoring || "",

      newMonitoringSystem:
        FRO_317Data.newMonitoringSystem || "",

      // =====================================================
      // CONVEYOR SPECIFICATIONS
      // =====================================================

      freeTrolleyWheels:
        FRO_317Data.freeTrolleyWheels || "",

      guideRollers:
        FRO_317Data.guideRollers || "",

      guideRollersOpenRaceStyle:
        FRO_317Data.guideRollersOpenRaceStyle || "",

      guideRollersSealedStyle:
        FRO_317Data.guideRollersSealedStyle || "",

      openHole:
        FRO_317Data.openHole || "",

      currentLubricationEquipmentBrand:
        FRO_317Data.currentLubricationEquipmentBrand || "",

      currentLubricantType:
        FRO_317Data.currentLubricantType || "",

      currentLubricantViscosityGrade:
        FRO_317Data.currentLubricantViscosityGrade || "",

      currentGreaseType:
        FRO_317Data.currentGreaseType || "",

      currentGreaseNlgiGrade:
        FRO_317Data.currentGreaseNlgiGrade || "",

      zerkFittingLocationSide:
        FRO_317Data.zerkFittingLocationSide || "",

      zerkFittingLocationOrientation:
        FRO_317Data.zerkFittingLocationOrientation || "",

      // =====================================================
      // CONTROLLER
      // =====================================================

      chainMasterController:
        FRO_317Data.chainMasterController || "",

      remote:
        FRO_317Data.remote || "",

      mountedOnGreaser:
        FRO_317Data.mountedOnGreaser || "",

      controlsOtherUnits:
        FRO_317Data.controlsOtherUnits || "",

      timer:
        FRO_317Data.timer || "",

      electricOnOff:
        FRO_317Data.electricOnOff || "",

      mightyLubeMonitoring:
        FRO_317Data.mightyLubeMonitoring || "",

      preMountingRequirements:
        FRO_317Data.preMountingRequirements || "",

      otherPreMountingRequirements:
        FRO_317Data.otherPreMountingRequirements || "",

      plcConnection:
        FRO_317Data.plcConnection || "",

      otherControllerInfo:
        FRO_317Data.otherControllerInfo || "",

      // =====================================================
      // INVERTED P&F: MEASUREMENTS
      // =====================================================

      measurementUnit:
        FRO_317Data.measurementUnit || "",

      invertedChainDropA:
        FRO_317Data.invertedChainDropA || "",

      invertedPowerTrolleyWheelB:
        FRO_317Data.invertedPowerTrolleyWheelB || "",

      invertedZerkFittingVerticalE:
        FRO_317Data.invertedZerkFittingVerticalE || "",

      invertedRailG:
        FRO_317Data.invertedRailG || "",

      invertedRailH:
        FRO_317Data.invertedRailH || "",

      invertedPowerTrolleyPitchS:
        FRO_317Data.invertedPowerTrolleyPitchS || "",

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote:
        FRO_317Data.technicianNote || "",
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FRO_317",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FRO_317 entry added",
    });
  } catch (error) {
    console.log("FRO_317 add error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router