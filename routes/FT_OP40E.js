const express = require("express");
const { authenticate } = require("./sessions");
const FT_OP40E = require("../models/FT_OP40E");

const router = express.Router();

/**
 * OP-40E
 *
 * Product ID:
 * FT_OP40E
 *
 * Endpoint:
 * POST /api/ft_op40e
 *
 * Body:
 * {
 *   FT_OP40EData: {...},
 *   numRequested: 1
 * }
 */
router.post("/", authenticate, async (req, res) => {
  try {
    const { FT_OP40EData, numRequested } = req.body || {};

    if (!FT_OP40EData) {
      return res.status(400).json({
        error: "FT_OP40EData is required",
      });
    }

    const order = new FT_OP40E({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: FT_OP40EData.conveyorName || "",

      chainSize: FT_OP40EData.chainSize || "",

      otherChainSize: FT_OP40EData.otherChainSize || "",

      chainManufacturer:
        FT_OP40EData.chainManufacturer || "",

      otherChainManufacturer:
        FT_OP40EData.otherChainManufacturer || "",

      conveyorLength:
        FT_OP40EData.conveyorLength || "",

      conveyorLengthUnit:
        FT_OP40EData.conveyorLengthUnit || "",

      conveyorSpeed:
        FT_OP40EData.conveyorSpeed || "",

      conveyorSpeedUnit:
        FT_OP40EData.conveyorSpeedUnit || "",

      indexingVariableSpeedConditions:
        FT_OP40EData.indexingVariableSpeedConditions || "",

      travelDirection:
        FT_OP40EData.travelDirection || "",

      applicationEnvironment:
        FT_OP40EData.applicationEnvironment || "",

      otherApplicationEnvironment:
        FT_OP40EData.otherApplicationEnvironment || "",

      surroundingTemperature:
        FT_OP40EData.surroundingTemperature || "",

      conveyorLoadedStatus:
        FT_OP40EData.conveyorLoadedStatus || "",

      conveyorSwingStatus:
        FT_OP40EData.conveyorSwingStatus || "",

      conveyorStrandType:
        FT_OP40EData.conveyorStrandType || "",

      // =====================================================
      // FILE REFERENCES
      //
      // Actual upload handling will be implemented separately.
      // These currently store URL/path/reference values if sent.
      // =====================================================

      plantLayoutFile:
        FT_OP40EData.plantLayoutFile || "",

      chainPicturesFile:
        FT_OP40EData.chainPicturesFile || "",

      // =====================================================
      // CUSTOMER POWER UTILITIES
      // =====================================================

      operatingVoltage:
        FT_OP40EData.operatingVoltage || "",

      controlVoltage:
        FT_OP40EData.controlVoltage || "",

      // =====================================================
      // NEW / EXISTING MONITORING SYSTEM
      // =====================================================

      existingMonitoring:
        FT_OP40EData.existingMonitoring || "",

      newMonitoringSystem:
        FT_OP40EData.newMonitoringSystem || "",

      // =====================================================
      // CONVEYOR SPECIFICATIONS
      // =====================================================

      wheelOpenRaceStyle:
        FT_OP40EData.wheelOpenRaceStyle || "",

      wheelSealedStyle:
        FT_OP40EData.wheelSealedStyle || "",

      openInsideShieldedOutside:
        FT_OP40EData.openInsideShieldedOutside || "",

      freeTrolleyWheels:
        FT_OP40EData.freeTrolleyWheels || "",

      guideRollers:
        FT_OP40EData.guideRollers || "",

      guideRollersOpenRaceStyle:
        FT_OP40EData.guideRollersOpenRaceStyle || "",

      guideRollersSealedStyle:
        FT_OP40EData.guideRollersSealedStyle || "",

      openHole:
        FT_OP40EData.openHole || "",

      dogActuator:
        FT_OP40EData.dogActuator || "",

      pivotPoints:
        FT_OP40EData.pivotPoints || "",

      kingPin:
        FT_OP40EData.kingPin || "",

      outboardWheels:
        FT_OP40EData.outboardWheels || "",

      railLubrication:
        FT_OP40EData.railLubrication || "",

      currentLubricationEquipmentBrand:
        FT_OP40EData.currentLubricationEquipmentBrand || "",

      currentLubricantType:
        FT_OP40EData.currentLubricantType || "",

      currentLubricantViscosityGrade:
        FT_OP40EData.currentLubricantViscosityGrade || "",

      // =====================================================
      // CONTROLLER
      // =====================================================

      chainMasterController:
        FT_OP40EData.chainMasterController || "",

      timer:
        FT_OP40EData.timer || "",

      electricOnOff:
        FT_OP40EData.electricOnOff || "",

      pneumaticOnOff:
        FT_OP40EData.pneumaticOnOff || "",

      mightyLubeMonitoring:
        FT_OP40EData.mightyLubeMonitoring || "",

      plcConnection:
        FT_OP40EData.plcConnection || "",

      controllerOtherDescribe:
        FT_OP40EData.controllerOtherDescribe || "",

      specialControllerOptions:
        FT_OP40EData.specialControllerOptions || "",

      controllerPleaseSpecify:
        FT_OP40EData.controllerPleaseSpecify || "",

      // =====================================================
      // FLAT TOP: MEASUREMENTS
      // =====================================================

      measurementUnit:
        FT_OP40EData.measurementUnit || "",

      flatTopPowerRailG:
        FT_OP40EData.flatTopPowerRailG || "",

      flatTopPowerRailH:
        FT_OP40EData.flatTopPowerRailH || "",

      flatTopRollerWheelA1:
        FT_OP40EData.flatTopRollerWheelA1 || "",

      flatTopRollerWheelB1:
        FT_OP40EData.flatTopRollerWheelB1 || "",

      flatTopRollerSleeveH1:
        FT_OP40EData.flatTopRollerSleeveH1 || "",

      flatTopRailJ1:
        FT_OP40EData.flatTopRailJ1 || "",

      flatTopDoubleChainPitchL1:
        FT_OP40EData.flatTopDoubleChainPitchL1 || "",

      flatTopRollerWheelPitchM1:
        FT_OP40EData.flatTopRollerWheelPitchM1 || "",

      flatTopMountingPlateN1:
        FT_OP40EData.flatTopMountingPlateN1 || "",

      flatTopRailPitchP1:
        FT_OP40EData.flatTopRailPitchP1 || "",

      flatTopDoubleStrandPitchR1:
        FT_OP40EData.flatTopDoubleStrandPitchR1 || "",
    });

    // =======================================================
    // ADD PRODUCT CONFIGURATION TO USER CART
    // =======================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FT_OP40E",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FT_OP40E entry added",
    });
  } catch (error) {
    console.error("FT_OP40E error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router