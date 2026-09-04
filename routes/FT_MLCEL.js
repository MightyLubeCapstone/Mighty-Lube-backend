const express = require("express");
const { authenticate } = require("./sessions");
const FT_MLCEL = require("../models/FT_MLCEL");

const router = express.Router();

// =========================================================
// ADD MIGHTY LUBE FLAT TOP LUBRICATOR TO CONFIGURATOR
//
// Product ID: FT_MLCEL
// POST /api/ft_mlcel
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { FT_MLCELData, numRequested } = req.body || {};

    // =====================================================
    // BASIC REQUEST VALIDATION
    // =====================================================

    if (!FT_MLCELData) {
      return res.status(400).json({
        error: "FT_MLCELData is required",
      });
    }

    // =====================================================
    // CREATE PRODUCT CONFIGURATION
    // =====================================================

    const order = new FT_MLCEL({
      // ---------------------------------------------------
      // GENERAL INFORMATION
      // ---------------------------------------------------

      conveyorName: FT_MLCELData.conveyorName,

      chainSize: FT_MLCELData.chainSize,

      otherChainSize: FT_MLCELData.otherChainSize,

      chainManufacturer: FT_MLCELData.chainManufacturer,

      otherChainManufacturer:
        FT_MLCELData.otherChainManufacturer,

      conveyorLength: FT_MLCELData.conveyorLength,

      conveyorLengthUnit:
        FT_MLCELData.conveyorLengthUnit,

      conveyorSpeed: FT_MLCELData.conveyorSpeed,

      conveyorSpeedUnit:
        FT_MLCELData.conveyorSpeedUnit,

      indexingVariableSpeedConditions:
        FT_MLCELData.indexingVariableSpeedConditions,

      travelDirection:
        FT_MLCELData.travelDirection,

      applicationEnvironment:
        FT_MLCELData.applicationEnvironment,

      otherApplicationEnvironment:
        FT_MLCELData.otherApplicationEnvironment,

      surroundingTemperature:
        FT_MLCELData.surroundingTemperature,

      conveyorLoadedStatus:
        FT_MLCELData.conveyorLoadedStatus,

      conveyorSwingStatus:
        FT_MLCELData.conveyorSwingStatus,

      conveyorStrandType:
        FT_MLCELData.conveyorStrandType,

      plantLayoutAvailable:
        FT_MLCELData.plantLayoutAvailable,

      plantLayoutFile:
        FT_MLCELData.plantLayoutFile,

      chainPhotosAvailable:
        FT_MLCELData.chainPhotosAvailable,

      chainPhotosFile:
        FT_MLCELData.chainPhotosFile,

      // ---------------------------------------------------
      // CUSTOMER POWER UTILITIES
      // ---------------------------------------------------

      operatingVoltage:
        FT_MLCELData.operatingVoltage,

      controlVoltage:
        FT_MLCELData.controlVoltage,

      // ---------------------------------------------------
      // MONITORING SYSTEM
      // ---------------------------------------------------

      existingMonitoring:
        FT_MLCELData.existingMonitoring,

      newMonitoringSystem:
        FT_MLCELData.newMonitoringSystem,

      // ---------------------------------------------------
      // CONVEYOR SPECIFICATIONS
      // ---------------------------------------------------

      wheelOpenRaceStyle:
        FT_MLCELData.wheelOpenRaceStyle,

      wheelSealedStyle:
        FT_MLCELData.wheelSealedStyle,

      openInsideShieldedOutside:
        FT_MLCELData.openInsideShieldedOutside,

      powerChain:
        FT_MLCELData.powerChain,

      chainPins:
        FT_MLCELData.chainPins,

      sliderPlates:
        FT_MLCELData.sliderPlates,

      outboardWheels:
        FT_MLCELData.outboardWheels,

      caterpillarDrive:
        FT_MLCELData.caterpillarDrive,

      caterpillarDriveQuantity:
        FT_MLCELData.caterpillarDriveQuantity,

      railLubrication:
        FT_MLCELData.railLubrication,

      externalLubrication:
        FT_MLCELData.externalLubrication,

      currentLubricationEquipmentBrand:
        FT_MLCELData.currentLubricationEquipmentBrand,

      currentLubricantType:
        FT_MLCELData.currentLubricantType,

      currentLubricantViscosityGrade:
        FT_MLCELData.currentLubricantViscosityGrade,

      reservoirSize:
        FT_MLCELData.reservoirSize,

      reservoirSizeQuantity:
        FT_MLCELData.reservoirSizeQuantity,

      conveyorChainClean:
        FT_MLCELData.conveyorChainClean,

      // ---------------------------------------------------
      // CONTROLLER
      // ---------------------------------------------------

      mightyLubeMonitoring:
        FT_MLCELData.mightyLubeMonitoring,

      ctrController:
        FT_MLCELData.ctrController,

      plcConnection:
        FT_MLCELData.plcConnection,

      monitoringController:
        FT_MLCELData.monitoringController,

      controllerOtherDescribe:
        FT_MLCELData.controllerOtherDescribe,

      specialControllerOptions:
        FT_MLCELData.specialControllerOptions,

      controllerPleaseSpecify:
        FT_MLCELData.controllerPleaseSpecify,

      // ---------------------------------------------------
      // FLAT TOP MEASUREMENTS
      // ---------------------------------------------------

      measurementUnit:
        FT_MLCELData.measurementUnit,

      flatTopPowerRailG:
        FT_MLCELData.flatTopPowerRailG,

      flatTopPowerRailH:
        FT_MLCELData.flatTopPowerRailH,

      flatTopRollerWheelA1:
        FT_MLCELData.flatTopRollerWheelA1,

      flatTopRollerWheelB1:
        FT_MLCELData.flatTopRollerWheelB1,

      flatTopRollerSleeveH1:
        FT_MLCELData.flatTopRollerSleeveH1,

      flatTopRailJ1:
        FT_MLCELData.flatTopRailJ1,

      flatTopDoubleChainPitchL1:
        FT_MLCELData.flatTopDoubleChainPitchL1,

      flatTopRollerWheelPitchM1:
        FT_MLCELData.flatTopRollerWheelPitchM1,

      flatTopMountingPlateN1:
        FT_MLCELData.flatTopMountingPlateN1,

      flatTopRailPitchP1:
        FT_MLCELData.flatTopRailPitchP1,

      flatTopDoubleStrandPitchR1:
        FT_MLCELData.flatTopDoubleStrandPitchR1,

      // ---------------------------------------------------
      // WIRE
      // ---------------------------------------------------

      wireMeasurementUnit:
        FT_MLCELData.wireMeasurementUnit,

      wire2Conductor:
        FT_MLCELData.wire2Conductor,

      wire4Conductor:
        FT_MLCELData.wire4Conductor,

      wire7Conductor:
        FT_MLCELData.wire7Conductor,

      wire12Conductor:
        FT_MLCELData.wire12Conductor,

      junctionBoxQuantities:
        FT_MLCELData.junctionBoxQuantities,
    });

    // =====================================================
    // ADD TO AUTHENTICATED USER CART
    // =====================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FT_MLCEL",
    });

    await req.user.save();

    // =====================================================
    // SUCCESS
    // =====================================================

    return res.status(200).json({
      message: "Mighty Lube Flat Top Lubricator entry added",
    });
  } catch (error) {
    console.error("FT_MLCEL Error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;