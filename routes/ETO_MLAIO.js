const express = require("express");
const router = express.Router();

const { authenticate } = require("./sessions");
const ETO_MLAIO = require("../models/ETO_MLAIO");

router.post("/", authenticate, async (req, res) => {
  try {
    const { ETO_MLAIOData, numRequested } = req.body || {};

    if (!ETO_MLAIOData) {
      return res.status(400).json({
        success: false,
        message: "ETO_MLAIOData is required",
      });
    }

    const order = new ETO_MLAIO({
      // ======================================================
      // GENERAL INFORMATION
      // ======================================================

      conveyorName: ETO_MLAIOData.conveyorName || "",
      chainSize: ETO_MLAIOData.chainSize || "",
      otherChainSize: ETO_MLAIOData.otherChainSize || "",

      industrialChainManufacturer:
        ETO_MLAIOData.industrialChainManufacturer || "",

      otherIndustrialChainManufacturer:
        ETO_MLAIOData.otherIndustrialChainManufacturer || "",

      conveyorLength: ETO_MLAIOData.conveyorLength || "",
      conveyorLengthUnit: ETO_MLAIOData.conveyorLengthUnit || "",

      conveyorSpeed: ETO_MLAIOData.conveyorSpeed || "",
      conveyorSpeedUnit: ETO_MLAIOData.conveyorSpeedUnit || "",

      conveyorIndex: ETO_MLAIOData.conveyorIndex || "",
      travelDirection: ETO_MLAIOData.travelDirection || "",

      appEnviroment: ETO_MLAIOData.appEnviroment || "",
      otherAppEnviroment: ETO_MLAIOData.otherAppEnviroment || "",

      surroundingTemp: ETO_MLAIOData.surroundingTemp || "",
      conveyorLoaded: ETO_MLAIOData.conveyorLoaded || "",
      conveyorSwing: ETO_MLAIOData.conveyorSwing || "",

      // ======================================================
      // CUSTOMER POWER UTILITIES
      // ======================================================

      operatingVoltage: ETO_MLAIOData.operatingVoltage || "",
      controlVoltage: ETO_MLAIOData.controlVoltage || "",

      // ======================================================
      // NEW / EXISTING MONITORING SYSTEM
      // ======================================================

      existingMonitoring: ETO_MLAIOData.existingMonitoring || "",
      newMonitoringSystem: ETO_MLAIOData.newMonitoringSystem || "",

      // ======================================================
      // CONVEYOR SPECIFICATIONS
      // ======================================================

      wheelOpenType: ETO_MLAIOData.wheelOpenType || "",
      wheelClosedType: ETO_MLAIOData.wheelClosedType || "",

      powerChain: ETO_MLAIOData.powerChain || "",
      chainPins: ETO_MLAIOData.chainPins || "",

      catDriveStatus: ETO_MLAIOData.catDriveStatus || "",
      catDriveNum: ETO_MLAIOData.catDriveNum || "",

      railLubeStatus: ETO_MLAIOData.railLubeStatus || "",
      externalLubeStatus: ETO_MLAIOData.externalLubeStatus || "",

      lubeBrand: ETO_MLAIOData.lubeBrand || "",
      lubeType: ETO_MLAIOData.lubeType || "",
      lubeViscosity: ETO_MLAIOData.lubeViscosity || "",

      reservoirSize: ETO_MLAIOData.reservoirSize || "",
      reservoirSizeQuantity:
        ETO_MLAIOData.reservoirSizeQuantity || "",

      chainCleanStatus: ETO_MLAIOData.chainCleanStatus || "",

      // ======================================================
      // ENCLOSED TRACK OVERHEAD: MEASUREMENTS
      // ======================================================

      enclosedUnitType: ETO_MLAIOData.enclosedUnitType || "",

      enclosedTrackB: ETO_MLAIOData.enclosedTrackB || "",
      enclosedTrackG: ETO_MLAIOData.enclosedTrackG || "",
      enclosedTrackH: ETO_MLAIOData.enclosedTrackH || "",
      enclosedTrackS: ETO_MLAIOData.enclosedTrackS || "",

      enclosedTrackK2: ETO_MLAIOData.enclosedTrackK2 || "",
      enclosedTrackL2: ETO_MLAIOData.enclosedTrackL2 || "",
      enclosedTrackM2: ETO_MLAIOData.enclosedTrackM2 || "",
      enclosedTrackN2: ETO_MLAIOData.enclosedTrackN2 || "",
      enclosedTrackS2: ETO_MLAIOData.enclosedTrackS2 || "",
    });

    await order.save();

    req.user.cart.push({
      numRequested: numRequested || 1,
      productConfigurationInfo: order,
      productType: "ETO_MLAIO",
    });

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "ETO_MLAIO entry added",
      data: order,
    });
  } catch (error) {
    console.error("ETO_MLAIO route error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add ETO_MLAIO configuration",
      error: error.message,
    });
  }
});

module.exports = router;