const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CC5_CL = require("../models/CC5_CL");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  // used for CC5_CL form
  try {
    const { CC5_CLData, numRequested } = req.body;

    // ✅ safety: if templateA missing, keep empty object to avoid crash
    const templateAData = CC5_CLData?.templateA || {};

    const order = new CC5_CL({
      conveyorName: CC5_CLData.conveyorName,
      cc5ChainSize: CC5_CLData.cc5ChainSize,
      ...(CC5_CLData.otherChainSize && { otherChainSize: CC5_CLData.otherChainSize }),
      industrialChainManufacturer: CC5_CLData.industrialChainManufacturer,
      ...(CC5_CLData.otherChainManufacturer && {
        otherChainManufacturer: CC5_CLData.otherChainManufacturer,
      }),
      ...(CC5_CLData.conveyorLength && { conveyorLength: CC5_CLData.conveyorLength }),
      ...(CC5_CLData.conveyorLengthUnit && {
        conveyorLengthUnit: CC5_CLData.conveyorLengthUnit,
      }),
      conveyorSpeed: CC5_CLData.conveyorSpeed,
      ...(CC5_CLData.conveyorSpeedUnit && {
        conveyorSpeedUnit: CC5_CLData.conveyorSpeedUnit,
      }),
      ...(CC5_CLData.conveyorIndex && { conveyorIndex: CC5_CLData.conveyorIndex }),
      ...(CC5_CLData.travelDirection && { travelDirection: CC5_CLData.travelDirection }),
      appEnviroment: CC5_CLData.appEnviroment,
      ...(CC5_CLData.ovenStatus && { ovenStatus: CC5_CLData.ovenStatus }),
      ...(CC5_CLData.ovenTemp && { ovenTemp: CC5_CLData.ovenTemp }),
      ...(CC5_CLData.otherAppEnviroment && {
        otherAppEnviroment: CC5_CLData.otherAppEnviroment,
      }),
      ...(CC5_CLData.surroundingTemp && { surroundingTemp: CC5_CLData.surroundingTemp }),
      strandStatus: CC5_CLData.strandStatus,
      ...(CC5_CLData.plantLayout && { plantLayout: CC5_CLData.plantLayout }),
      ...(CC5_CLData.requiredPics && { requiredPics: CC5_CLData.requiredPics }),
      operatingVoltage: CC5_CLData.operatingVoltage,

      // ✅ NEW: optional technician note
      ...(CC5_CLData.technicianNote &&
        CC5_CLData.technicianNote.trim() && {
          technicianNote: CC5_CLData.technicianNote.trim(),
        }),

      monitorData: {
        existingMonitor: templateAData.existingMonitor,
        newMonitor: templateAData.newMonitor,
        ...(templateAData.dcuStatus && { dcuStatus: templateAData.dcuStatus }),
        ...(templateAData.dcuNum && { dcuNum: templateAData.dcuNum }),
        ...(templateAData.existingWindows && { existingWindows: templateAData.existingWindows }),
        ...(templateAData.existingHeadUnit && { existingHeadUnit: templateAData.existingHeadUnit }),
        ...(templateAData.existingDCU && { existingDCU: templateAData.existingDCU }),
        ...(templateAData.existingPowerInterface && {
          existingPowerInterface: templateAData.existingPowerInterface,
        }),
        ...(templateAData.newReservoir && { newReservoir: templateAData.newReservoir }),
        ...(templateAData.reservoirSize && { reservoirSize: templateAData.reservoirSize }),
        ...(templateAData.otherReservoirSize && {
          otherReservoirSize: templateAData.otherReservoirSize,
        }),
        ...(templateAData.newReservoirNum && { newReservoirNum: templateAData.newReservoirNum }),
        ...(templateAData.typeMonitor && { typeMonitor: templateAData.typeMonitor }),
        ...(templateAData.driveMotorAmp && { driveMotorAmp: templateAData.driveMotorAmp }),
        ...(templateAData.driveMotorAmpNum && { driveMotorAmpNum: templateAData.driveMotorAmpNum }),
        ...(templateAData.driveTakeUpAir && { driveTakeUpAir: templateAData.driveTakeUpAir }),
        ...(templateAData.driveTakeUpAirNum && {
          driveTakeUpAirNum: templateAData.driveTakeUpAirNum,
        }),
        ...(templateAData.takeUpDistance && { takeUpDistance: templateAData.takeUpDistance }),
        ...(templateAData.takeUpDistanceNum && { takeUpDistanceNum: templateAData.takeUpDistanceNum }),
        ...(templateAData.driveTemp && { driveTemp: templateAData.driveTemp }),
        ...(templateAData.driveTempNum && { driveTempNum: templateAData.driveTempNum }),
        ...(templateAData.driveVibration && { driveVibration: templateAData.driveVibration }),
        ...(templateAData.driveVibrationNum && {
          driveVibrationNum: templateAData.driveVibrationNum,
        }),
        ...(templateAData.dogPitch && { dogPitch: templateAData.dogPitch }),
        ...(templateAData.dogPitchNum && { dogPitchNum: templateAData.dogPitchNum }),
        ...(templateAData.paintMarker && { paintMarker: templateAData.paintMarker }),
        ...(templateAData.paintMarkerNum && { paintMarkerNum: templateAData.paintMarkerNum }),
        ...(templateAData.chainVision && { chainVision: templateAData.chainVision }),
        ...(templateAData.lubeVision && { lubeVision: templateAData.lubeVision }),
        ...(templateAData.trolleyVision && { trolleyVision: templateAData.trolleyVision }),
        ...(templateAData.trolleyDetect && { trolleyDetect: templateAData.trolleyDetect }),
        ...(templateAData.omniView && { omniView: templateAData.omniView }),
        ...(templateAData.dcuUpgradeNum && { dcuUpgradeNum: templateAData.dcuUpgradeNum }),
        ...(templateAData.piuDistance && { piuDistance: templateAData.piuDistance }),
        ...(templateAData.switchDistance && { switchDistance: templateAData.switchDistance }),
        ...(templateAData.ampPickup && { ampPickup: templateAData.ampPickup }),
        ...(templateAData.fromAirTakeUpDistance && {
          fromAirTakeUpDistance: templateAData.fromAirTakeUpDistance,
        }),
        ...(templateAData.specialControllerOptions && {
          specialControllerOptions: templateAData.specialControllerOptions,
        }),
        ...(templateAData.operatingVoltage && { operatingVoltage: templateAData.operatingVoltage }),
      },

      outboardStatus: CC5_CLData.outboardStatus,
      highRollerStatus: CC5_CLData.highRollerStatus,
      ...(CC5_CLData.lubeBrand && { lubeBrand: CC5_CLData.lubeBrand }),
      ...(CC5_CLData.lubeType && { lubeType: CC5_CLData.lubeType }),
      ...(CC5_CLData.lubeViscosity && { lubeViscosity: CC5_CLData.lubeViscosity }),
      ...(CC5_CLData.cleanChain && { cleanChain: CC5_CLData.cleanChain }),
      ...(CC5_CLData.wireMeasurementUnit && { wireMeasurementUnit: CC5_CLData.wireMeasurementUnit }),
      ...(CC5_CLData.conductor2 && { conductor2: CC5_CLData.conductor2 }),
      ...(CC5_CLData.conductor4 && { conductor4: CC5_CLData.conductor4 }),
      ...(CC5_CLData.conductor7 && { conductor7: CC5_CLData.conductor7 }),
      ...(CC5_CLData.conductor12 && { conductor12: CC5_CLData.conductor12 }),
      ...(CC5_CLData.junctionBoxNum && { junctionBoxNum: CC5_CLData.junctionBoxNum }),
      ...(CC5_CLData.cc5UnitType && { cc5UnitType: CC5_CLData.cc5UnitType }),
      ...(CC5_CLData.powerRailWidth && { powerRailWidth: CC5_CLData.powerRailWidth }),
      ...(CC5_CLData.powerRailHeight && { powerRailHeight: CC5_CLData.powerRailHeight }),
      ...(CC5_CLData.rollerWheelA1 && { rollerWheelA1: CC5_CLData.rollerWheelA1 }),
      ...(CC5_CLData.rollerWheelB1 && { rollerWheelB1: CC5_CLData.rollerWheelB1 }),
      ...(CC5_CLData.linkD1 && { linkD1: CC5_CLData.linkD1 }),
      ...(CC5_CLData.wheelPitchM1 && { wheelPitchM1: CC5_CLData.wheelPitchM1 }),
      ...(CC5_CLData.rollerPinY1 && { rollerPinY1: CC5_CLData.rollerPinY1 }),
      ...(CC5_CLData.rollerPinZ1 && { rollerPinZ1: CC5_CLData.rollerPinZ1 }),
    });

    req.user.cart.push({
      numRequested: numRequested,
      productConfigurationInfo: order,
      productType: "CC5_CL",
    });

    await req.user.save();

    return res.status(200).json({ message: "CC5_CL entry added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;