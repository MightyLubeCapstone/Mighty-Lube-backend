const express = require("express");
const { authenticate } = require("./sessions");
const ETO_OP48E = require("../models/ETO_OP48E");

const router = express.Router();

// =========================================================
// ADD ETOPO OP-48E TO CONFIGURATOR
//
// Product ID: ETO_OP48E
// POST /api/eto_op48e
// =========================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { ETO_OP48EData, numRequested } = req.body || {};

    // =====================================================
    // BASIC REQUEST VALIDATION
    // =====================================================

    if (!ETO_OP48EData) {
      return res.status(400).json({
        error: "ETO_OP48EData is required",
      });
    }

    // =====================================================
    // CREATE PRODUCT CONFIGURATION
    // =====================================================

    const order = new ETO_OP48E({
      // ---------------------------------------------------
      // GENERAL INFORMATION
      // ---------------------------------------------------

      conveyorName: ETO_OP48EData.conveyorName,

      chainSize: ETO_OP48EData.chainSize,

      otherChainSize: ETO_OP48EData.otherChainSize,

      industrialChainManufacturer:
        ETO_OP48EData.industrialChainManufacturer,

      otherIndustrialChainManufacturer:
        ETO_OP48EData.otherIndustrialChainManufacturer,

      conveyorLength: ETO_OP48EData.conveyorLength,

      conveyorLengthUnit: ETO_OP48EData.conveyorLengthUnit,

      conveyorSpeed: ETO_OP48EData.conveyorSpeed,

      conveyorSpeedUnit: ETO_OP48EData.conveyorSpeedUnit,

      conveyorIndex: ETO_OP48EData.conveyorIndex,

      travelDirection: ETO_OP48EData.travelDirection,

      appEnviroment: ETO_OP48EData.appEnviroment,

      otherAppEnviroment: ETO_OP48EData.otherAppEnviroment,

      surroundingTemp: ETO_OP48EData.surroundingTemp,

      // ---------------------------------------------------
      // CUSTOMER POWER UTILITIES
      // ---------------------------------------------------

      operatingVoltage: ETO_OP48EData.operatingVoltage,

      controlVoltage: ETO_OP48EData.controlVoltage,

      // ---------------------------------------------------
      // MONITORING SYSTEM
      // ---------------------------------------------------

      existingMonitoring: ETO_OP48EData.existingMonitoring,

      newMonitoringSystem: ETO_OP48EData.newMonitoringSystem,

      // ---------------------------------------------------
      // CONVEYOR SPECIFICATIONS
      // ---------------------------------------------------

      wheelOpenType: ETO_OP48EData.wheelOpenType,

      wheelClosedType: ETO_OP48EData.wheelClosedType,

      powerChain: ETO_OP48EData.powerChain,

      chainPins: ETO_OP48EData.chainPins,

      catDriveStatus: ETO_OP48EData.catDriveStatus,

      catDriveNum: ETO_OP48EData.catDriveNum,

      railLubeStatus: ETO_OP48EData.railLubeStatus,

      externalLubeStatus: ETO_OP48EData.externalLubeStatus,

      lubeBrand: ETO_OP48EData.lubeBrand,

      lubeType: ETO_OP48EData.lubeType,

      lubeViscosity: ETO_OP48EData.lubeViscosity,

      sideLubeStatus: ETO_OP48EData.sideLubeStatus,

      topLubeStatus: ETO_OP48EData.topLubeStatus,

      chainCleanStatus: ETO_OP48EData.chainCleanStatus,

      // ---------------------------------------------------
      // CONTROLLER
      // ---------------------------------------------------

      specialControllerOptions:
        ETO_OP48EData.specialControllerOptions,

      controllerPleaseSpecify:
        ETO_OP48EData.controllerPleaseSpecify,

      // ---------------------------------------------------
      // ENCLOSED TRACK OVERHEAD MEASUREMENTS
      // ---------------------------------------------------

      etUnitType: ETO_OP48EData.etUnitType,

      etOverheadB: ETO_OP48EData.etOverheadB,

      etOverheadG: ETO_OP48EData.etOverheadG,

      etOverheadH: ETO_OP48EData.etOverheadH,

      etOverheadS: ETO_OP48EData.etOverheadS,

      etOverheadK2: ETO_OP48EData.etOverheadK2,

      etOverheadL2: ETO_OP48EData.etOverheadL2,

      etOverheadM2: ETO_OP48EData.etOverheadM2,

      etOverheadN2: ETO_OP48EData.etOverheadN2,

      etOverheadS2: ETO_OP48EData.etOverheadS2,
    });

    // =====================================================
    // ADD TO AUTHENTICATED USER CART
    // =====================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "ETO_OP48E",
    });

    await req.user.save();

    // =====================================================
    // SUCCESS
    // =====================================================

    return res.status(200).json({
      message: "ETO_OP48E entry added",
    });
  } catch (error) {
    console.error("ETO_OP48E Error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router