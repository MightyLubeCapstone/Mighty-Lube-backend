const express = require("express");
const { authenticate } = require("./sessions");
const ETO_9000E = require("../models/ETO_9000E");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { ETO_9000EData, numRequested } = req.body || {};

    if (!ETO_9000EData) {
      return res.status(400).json({
        error: "ETO_9000EData is required",
      });
    }

    const order = new ETO_9000E({
      // =========================================================
      // GENERAL INFORMATION
      // =========================================================

      conveyorName: ETO_9000EData.conveyorName,

      chainSize: ETO_9000EData.chainSize,
      otherChainSize: ETO_9000EData.otherChainSize,

      industrialChainManufacturer:
        ETO_9000EData.industrialChainManufacturer,

      otherIndustrialChainManufacturer:
        ETO_9000EData.otherIndustrialChainManufacturer,

      conveyorLength: ETO_9000EData.conveyorLength,
      conveyorLengthUnit: ETO_9000EData.conveyorLengthUnit,

      conveyorSpeed: ETO_9000EData.conveyorSpeed,
      conveyorSpeedUnit: ETO_9000EData.conveyorSpeedUnit,

      conveyorIndex: ETO_9000EData.conveyorIndex,

      travelDirection: ETO_9000EData.travelDirection,

      appEnviroment: ETO_9000EData.appEnviroment,

      otherAppEnviroment:
        ETO_9000EData.otherAppEnviroment,

      surroundingTemp: ETO_9000EData.surroundingTemp,

      // =========================================================
      // CUSTOMER POWER UTILITIES
      // =========================================================

      operatingVoltage: ETO_9000EData.operatingVoltage,

      controlVoltage: ETO_9000EData.controlVoltage,

      // =========================================================
      // MONITORING
      // =========================================================

      existingMonitoring:
        ETO_9000EData.existingMonitoring,

      newMonitoringSystem:
        ETO_9000EData.newMonitoringSystem,

      // =========================================================
      // CONVEYOR SPECIFICATIONS
      // =========================================================

      wheelOpenType:
        ETO_9000EData.wheelOpenType,

      wheelClosedType:
        ETO_9000EData.wheelClosedType,

      powerChain:
        ETO_9000EData.powerChain,

      chainPins:
        ETO_9000EData.chainPins,

      catDriveStatus:
        ETO_9000EData.catDriveStatus,

      catDriveNum:
        ETO_9000EData.catDriveNum,

      railLubeStatus:
        ETO_9000EData.railLubeStatus,

      externalLubeStatus:
        ETO_9000EData.externalLubeStatus,

      lubeBrand:
        ETO_9000EData.lubeBrand,

      lubeType:
        ETO_9000EData.lubeType,

      lubeViscosity:
        ETO_9000EData.lubeViscosity,

      sideLubeStatus:
        ETO_9000EData.sideLubeStatus,

      topLubeStatus:
        ETO_9000EData.topLubeStatus,

      reservoirSize:
        ETO_9000EData.reservoirSize,

      reservoirSizeQuantity:
        ETO_9000EData.reservoirSizeQuantity,

      chainCleanStatus:
        ETO_9000EData.chainCleanStatus,

      // =========================================================
      // CONTROLLER
      // =========================================================

      specialControllerOptions:
        ETO_9000EData.specialControllerOptions,

      controllerPleaseSpecify:
        ETO_9000EData.controllerPleaseSpecify,

      // =========================================================
      // WIRE
      // =========================================================

      wireMeasurementUnit:
        ETO_9000EData.wireMeasurementUnit,

      conductor2:
        ETO_9000EData.conductor2,

      conductor4:
        ETO_9000EData.conductor4,

      conductor7:
        ETO_9000EData.conductor7,

      conductor12:
        ETO_9000EData.conductor12,

      junctionBoxNum:
        ETO_9000EData.junctionBoxNum,

      // =========================================================
      // ENCLOSED TRACK OVERHEAD MEASUREMENTS
      // =========================================================

      enclosedUnitType:
        ETO_9000EData.enclosedUnitType,

      enclosedTrackB:
        ETO_9000EData.enclosedTrackB,

      enclosedTrackG:
        ETO_9000EData.enclosedTrackG,

      enclosedTrackH:
        ETO_9000EData.enclosedTrackH,

      enclosedTrackS:
        ETO_9000EData.enclosedTrackS,

      enclosedTrackK2:
        ETO_9000EData.enclosedTrackK2,

      enclosedTrackL2:
        ETO_9000EData.enclosedTrackL2,

      enclosedTrackM2:
        ETO_9000EData.enclosedTrackM2,

      enclosedTrackN2:
        ETO_9000EData.enclosedTrackN2,

      enclosedTrackS2:
        ETO_9000EData.enclosedTrackS2,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "ETO_9000E",
    });

    await req.user.save();

    return res.status(200).json({
      message: "ETO_9000E entry added",
    });
  } catch (error) {
    console.error("ETO_9000E error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router