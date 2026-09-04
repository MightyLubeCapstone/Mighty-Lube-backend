const express = require("express");
const router = express.Router();

const { authenticate } = require("./sessions");
const FT_OPCO = require("../models/FT_OPCO");

// ============================================================
// CREATE FT OPCO CONFIGURATION
// POST /api/ft_opco
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { FT_OPCOData, numRequested } = req.body || {};

    if (!FT_OPCOData) {
      return res.status(400).json({
        success: false,
        message: "FT_OPCOData is required",
      });
    }

    const order = new FT_OPCO({
      // ======================================================
      // GENERAL INFORMATION
      // ======================================================

      conveyorName: FT_OPCOData.conveyorName || "",

      chainSize: FT_OPCOData.chainSize || "",
      otherChainSize: FT_OPCOData.otherChainSize || "",

      industrialChainManufacturer:
        FT_OPCOData.industrialChainManufacturer || "",

      otherIndustrialChainManufacturer:
        FT_OPCOData.otherIndustrialChainManufacturer || "",

      wheelManufacturer: FT_OPCOData.wheelManufacturer || "",
      otherWheelManufacturer:
        FT_OPCOData.otherWheelManufacturer || "",

      conveyorLength: FT_OPCOData.conveyorLength || "",
      conveyorLengthUnit: FT_OPCOData.conveyorLengthUnit || "",

      conveyorSpeed: FT_OPCOData.conveyorSpeed || "",
      conveyorSpeedUnit: FT_OPCOData.conveyorSpeedUnit || "",

      conveyorIndex: FT_OPCOData.conveyorIndex || "",
      travelDirection: FT_OPCOData.travelDirection || "",

      appEnviroment: FT_OPCOData.appEnviroment || "",
      otherAppEnviroment: FT_OPCOData.otherAppEnviroment || "",

      surroundingTemp: FT_OPCOData.surroundingTemp || "",
      conveyorLoaded: FT_OPCOData.conveyorLoaded || "",
      conveyorSwing: FT_OPCOData.conveyorSwing || "",

      // ======================================================
      // CUSTOMER POWER UTILITIES
      // ======================================================

      operatingVoltage: FT_OPCOData.operatingVoltage || "",
      controlVoltage: FT_OPCOData.controlVoltage || "",

      compressedAir: FT_OPCOData.compressedAir || "",
      compressedAirUnit: FT_OPCOData.compressedAirUnit || "",

      // ======================================================
      // NEW / EXISTING MONITORING SYSTEM
      // ======================================================

      existingMonitoring: FT_OPCOData.existingMonitoring || "",
      newMonitoringSystem: FT_OPCOData.newMonitoringSystem || "",

      // ======================================================
      // CONVEYOR SPECIFICATIONS
      // ======================================================

      wheelOpenType: FT_OPCOData.wheelOpenType || "",
      wheelClosedType: FT_OPCOData.wheelClosedType || "",

      openInsideShieldedOutside:
        FT_OPCOData.openInsideShieldedOutside || "",

      freeTrolleyWheels: FT_OPCOData.freeTrolleyWheels || "",
      guideRollers: FT_OPCOData.guideRollers || "",

      rollerChains: FT_OPCOData.rollerChains || "",
      bushings: FT_OPCOData.bushings || "",
      outboardWheels: FT_OPCOData.outboardWheels || "",

      lubeBrand: FT_OPCOData.lubeBrand || "",
      lubeViscosity: FT_OPCOData.lubeViscosity || "",

      currentGrease: FT_OPCOData.currentGrease || "",
      currentLube: FT_OPCOData.currentLube || "",

      oilOrGrease: FT_OPCOData.oilOrGrease || "",
      oilViscosity: FT_OPCOData.oilViscosity || "",
      greaseNGLIGrade: FT_OPCOData.greaseNGLIGrade || "",

      zerkDirection: FT_OPCOData.zerkDirection || "",
      zerkFtgLocation: FT_OPCOData.zerkFtgLocation || "",

      wheelDiameter: FT_OPCOData.wheelDiameter || "",

      chainCleanStatus: FT_OPCOData.chainCleanStatus || "",

      // ======================================================
      // CONTROLLER
      // ======================================================

      chainMaster: FT_OPCOData.chainMaster || "",
      remoteStatus: FT_OPCOData.remoteStatus || "",
      mountStatus: FT_OPCOData.mountStatus || "",
      otherUnitStatus: FT_OPCOData.otherUnitStatus || "",

      timerStatus: FT_OPCOData.timerStatus || "",
      electricStatus: FT_OPCOData.electricStatus || "",

      mightyLubeMonitoring:
        FT_OPCOData.mightyLubeMonitoring || "",

      preMountType: FT_OPCOData.preMountType || "",
      otherPreMountType:
        FT_OPCOData.otherPreMountType || "",

      plcConnection: FT_OPCOData.plcConnection || "",

      otherControllerNotes:
        FT_OPCOData.otherControllerNotes || "",

      // ======================================================
      // FLAT TOP: MEASUREMENTS
      // ======================================================

      ftUnitType: FT_OPCOData.ftUnitType || "",

      ftTopG: FT_OPCOData.ftTopG || "",
      ftTopH: FT_OPCOData.ftTopH || "",

      ftTopA1: FT_OPCOData.ftTopA1 || "",
      ftTopB1: FT_OPCOData.ftTopB1 || "",
      ftTopH1: FT_OPCOData.ftTopH1 || "",
      ftTopJ1: FT_OPCOData.ftTopJ1 || "",
      ftTopL1: FT_OPCOData.ftTopL1 || "",
      ftTopM1: FT_OPCOData.ftTopM1 || "",
      ftTopN1: FT_OPCOData.ftTopN1 || "",
      ftTopP1: FT_OPCOData.ftTopP1 || "",
      ftTopR1: FT_OPCOData.ftTopR1 || "",
    });

    // ========================================================
    // SAVE PRODUCT CONFIGURATION
    // ========================================================

    await order.save();

    // ========================================================
    // ADD CONFIGURATION TO USER CART
    // ========================================================

    req.user.cart.push({
      numRequested: numRequested || 1,
      productConfigurationInfo: order,
      productType: "FT_OPCO",
    });

    await req.user.save();

    // ========================================================
    // SUCCESS
    // ========================================================

    return res.status(200).json({
      success: true,
      message: "FT_OPCO entry added",
      data: order,
    });
  } catch (error) {
    console.error("FT_OPCO route error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add FT_OPCO configuration",
      error: error.message,
    });
  }
});

module.exports = router