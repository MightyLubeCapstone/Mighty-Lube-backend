const express = require("express");
const { authenticate } = require("./sessions");
const FC_314 = require("../models/FC_314");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { FC_314Data, numRequested } = req.body || {};

    if (!FC_314Data) {
      return res.status(400).json({
        error: "FC_314Data is required",
      });
    }

    const order = new FC_314({
      // =====================================================
      // 1. GENERAL INFORMATION
      // =====================================================

      conveyorName: FC_314Data.conveyorName || "",

      wheelManufacturer:
        FC_314Data.wheelManufacturer || "",

      otherWheelManufacturer:
        FC_314Data.otherWheelManufacturer || "",

      conveyorLength:
        FC_314Data.conveyorLength || "",

      conveyorLengthUnit:
        FC_314Data.conveyorLengthUnit || "",

      conveyorSpeed:
        FC_314Data.conveyorSpeed || "",

      conveyorSpeedUnit:
        FC_314Data.conveyorSpeedUnit || "",

      indexingVariableSpeedConditions:
        FC_314Data.indexingVariableSpeedConditions || "",

      travelDirection:
        FC_314Data.travelDirection || "",

      applicationEnvironment:
        FC_314Data.applicationEnvironment || "",

      otherApplicationEnvironment:
        FC_314Data.otherApplicationEnvironment || "",

      surroundingTemperature:
        FC_314Data.surroundingTemperature || "",

      conveyorSwingStatus:
        FC_314Data.conveyorSwingStatus || "",

      // =====================================================
      // 2. CUSTOMER POWER UTILITIES
      // =====================================================

      operatingVoltage:
        FC_314Data.operatingVoltage || "",

      controlVoltage:
        FC_314Data.controlVoltage || "",

      compressedAirSupply:
        FC_314Data.compressedAirSupply || "",

      compressedAirSupplyUnit:
        FC_314Data.compressedAirSupplyUnit || "",

      // =====================================================
      // 3. NEW / EXISTING MONITORING SYSTEM
      // =====================================================

      existingMonitoring:
        FC_314Data.existingMonitoring || "",

      newMonitoringSystem:
        FC_314Data.newMonitoringSystem || "",

      // =====================================================
      // 4. CONVEYOR SPECIFICATIONS
      // =====================================================

      freeTrolleyWheels:
        FC_314Data.freeTrolleyWheels || "",

      dogActuator:
        FC_314Data.dogActuator || "",

      pivotPoints:
        FC_314Data.pivotPoints || "",

      kingPin:
        FC_314Data.kingPin || "",

      currentLubricationEquipmentBrand:
        FC_314Data.currentLubricationEquipmentBrand || "",

      currentLubricantType:
        FC_314Data.currentLubricantType || "",

      currentLubricantViscosityGrade:
        FC_314Data.currentLubricantViscosityGrade || "",

      currentGreaseType:
        FC_314Data.currentGreaseType || "",

      currentGreaseNlgiGrade:
        FC_314Data.currentGreaseNlgiGrade || "",

      zerkFittingLocationSide:
        FC_314Data.zerkFittingLocationSide || "",

      zerkFittingLocationOrientation:
        FC_314Data.zerkFittingLocationOrientation || "",

      // =====================================================
      // 5. CONTROLLER
      // =====================================================

      chainMasterController:
        FC_314Data.chainMasterController || "",

      remote:
        FC_314Data.remote || "",

      mountedOnGreaser:
        FC_314Data.mountedOnGreaser || "",

      controlsOtherUnits:
        FC_314Data.controlsOtherUnits || "",

      timer:
        FC_314Data.timer || "",

      electricOnOff:
        FC_314Data.electricOnOff || "",

      mightyLubeMonitoring:
        FC_314Data.mightyLubeMonitoring || "",

      preMountingRequirements:
        FC_314Data.preMountingRequirements || "",

      plcConnection:
        FC_314Data.plcConnection || "",

      otherControllerInfo:
        FC_314Data.otherControllerInfo || "",

      // =====================================================
      // 6. GREASER - FREE CARRIER
      // =====================================================

      measurementUnit:
        FC_314Data.measurementUnit || "",

      freeCarrierZerkFittingE:
        FC_314Data.freeCarrierZerkFittingE || "",

      freeCarrierRailG:
        FC_314Data.freeCarrierRailG || "",

      freeCarrierRailH:
        FC_314Data.freeCarrierRailH || "",

      freeCarrierTrolleyWheelPitchK:
        FC_314Data.freeCarrierTrolleyWheelPitchK || "",

      freeCarrierTrolleyPitchT:
        FC_314Data.freeCarrierTrolleyPitchT || "",

      freeCarrierTrolleyPitchU:
        FC_314Data.freeCarrierTrolleyPitchU || "",

      freeCarrierTrolleyPitchV:
        FC_314Data.freeCarrierTrolleyPitchV || "",

      // =====================================================
      // 7. TECHNICIAN NOTE
      // Intentionally retained from legacy Flutter.
      // =====================================================

      technicianNote:
        FC_314Data.technicianNote || "",
    });

    // =====================================================
    // ADD PRODUCT TO USER CART
    // =====================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FC_314",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FC_314 entry added",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router