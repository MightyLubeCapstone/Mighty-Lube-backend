const express = require("express");
const { authenticate } = require("./sessions");
const FC_317 = require("../models/FC_317");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { FC_317Data, numRequested } = req.body || {};

    if (!FC_317Data) {
      return res.status(400).json({
        error: "FC_317Data is required",
      });
    }

    const order = new FC_317({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: FC_317Data.conveyorName || "",

      wheelManufacturer:
        FC_317Data.wheelManufacturer || "",

      otherWheelManufacturer:
        FC_317Data.otherWheelManufacturer || "",

      conveyorLength:
        FC_317Data.conveyorLength || "",

      conveyorLengthUnit:
        FC_317Data.conveyorLengthUnit || "",

      conveyorSpeed:
        FC_317Data.conveyorSpeed || "",

      conveyorSpeedUnit:
        FC_317Data.conveyorSpeedUnit || "",

      indexingVariableSpeedConditions:
        FC_317Data.indexingVariableSpeedConditions || "",

      travelDirection:
        FC_317Data.travelDirection || "",

      applicationEnvironment:
        FC_317Data.applicationEnvironment || "",

      otherApplicationEnvironment:
        FC_317Data.otherApplicationEnvironment || "",

      surroundingTemperature:
        FC_317Data.surroundingTemperature || "",

      conveyorSwingStatus:
        FC_317Data.conveyorSwingStatus || "",

      // =====================================================
      // CUSTOMER POWER UTILITIES
      // =====================================================

      operatingVoltage:
        FC_317Data.operatingVoltage || "",

      controlVoltage:
        FC_317Data.controlVoltage || "",

      compressedAirSupply:
        FC_317Data.compressedAirSupply || "",

      compressedAirSupplyUnit:
        FC_317Data.compressedAirSupplyUnit || "",

      // =====================================================
      // NEW / EXISTING MONITORING SYSTEM
      // =====================================================

      existingMonitoring:
        FC_317Data.existingMonitoring || "",

      newMonitoringSystem:
        FC_317Data.newMonitoringSystem || "",

      // =====================================================
      // CONVEYOR SPECIFICATIONS
      // =====================================================

      freeTrolleyWheels:
        FC_317Data.freeTrolleyWheels || "",

      guideRollers:
        FC_317Data.guideRollers || "",

      guideRollersOpenRaceStyle:
        FC_317Data.guideRollersOpenRaceStyle || "",

      guideRollersSealedStyle:
        FC_317Data.guideRollersSealedStyle || "",

      openHole:
        FC_317Data.openHole || "",

      currentLubricationEquipmentBrand:
        FC_317Data.currentLubricationEquipmentBrand || "",

      currentLubricantType:
        FC_317Data.currentLubricantType || "",

      currentLubricantViscosityGrade:
        FC_317Data.currentLubricantViscosityGrade || "",

      currentGreaseType:
        FC_317Data.currentGreaseType || "",

      currentGreaseNlgiGrade:
        FC_317Data.currentGreaseNlgiGrade || "",

      zerkFittingLocationSide:
        FC_317Data.zerkFittingLocationSide || "",

      zerkFittingLocationOrientation:
        FC_317Data.zerkFittingLocationOrientation || "",

      // =====================================================
      // CONTROLLER
      // =====================================================

      chainMasterController:
        FC_317Data.chainMasterController || "",

      remote:
        FC_317Data.remote || "",

      mountedOnGreaser:
        FC_317Data.mountedOnGreaser || "",

      controlsOtherUnits:
        FC_317Data.controlsOtherUnits || "",

      timer:
        FC_317Data.timer || "",

      electricOnOff:
        FC_317Data.electricOnOff || "",

      mightyLubeMonitoring:
        FC_317Data.mightyLubeMonitoring || "",

      preMountingRequirements:
        FC_317Data.preMountingRequirements || "",

      plcConnection:
        FC_317Data.plcConnection || "",

      otherControllerInfo:
        FC_317Data.otherControllerInfo || "",

      // =====================================================
      // GREASER - FREE CARRIER
      // =====================================================

      measurementUnit:
        FC_317Data.measurementUnit || "",

      freeCarrierZerkFittingE:
        FC_317Data.freeCarrierZerkFittingE || "",

      freeCarrierZerkFittingF:
        FC_317Data.freeCarrierZerkFittingF || "",

      freeCarrierRailG:
        FC_317Data.freeCarrierRailG || "",

      freeCarrierRailH:
        FC_317Data.freeCarrierRailH || "",

      // =====================================================
      // TECHNICIAN NOTE
      // =====================================================

      technicianNote:
        FC_317Data.technicianNote || "",
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FC_317",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FC_317 entry added",
    });
  } catch (error) {
    console.error("FC_317 add error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router