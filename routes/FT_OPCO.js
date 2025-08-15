const express = require("express");
const { authenticate } = require("./sessions");
const FT_OPCO = require("../models/FT_OPCO");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { FT_OPCOData, numRequested } = req.body;

    const order = new FT_OPCO({
      conveyorName: FT_OPCOData.conveyorName,
      chainSize: FT_OPCOData.chainSize,
      ...(FT_OPCOData.otherChainSize && { otherChainSize: FT_OPCOData.otherChainSize }),
      industrialChainManufacturer: FT_OPCOData.industrialChainManufacturer,
      ...(FT_OPCOData.otherChainManufacturer && { otherChainManufacturer: FT_OPCOData.otherChainManufacturer }),
      wheelManufacturer: FT_OPCOData.wheelManufacturer,
      ...(FT_OPCOData.otherWheelManufacturer && { otherWheelManufacturer: FT_OPCOData.otherWheelManufacturer }),
      conveyorLength: FT_OPCOData.conveyorLength,
      conveyorLengthUnit: FT_OPCOData.conveyorLengthUnit,
      conveyorSpeed: FT_OPCOData.conveyorSpeed,
      conveyorSpeedUnit: FT_OPCOData.conveyorSpeedUnit,
      ...(FT_OPCOData.conveyorIndex && { conveyorIndex: FT_OPCOData.conveyorIndex }),
      ...(FT_OPCOData.travelDirection && { travelDirection: FT_OPCOData.travelDirection }),
      appEnviroment: FT_OPCOData.appEnviroment,
      ...(FT_OPCOData.ovenStatus && { ovenStatus: FT_OPCOData.ovenStatus }),
      ...(FT_OPCOData.ovenTemp && { ovenTemp: FT_OPCOData.ovenTemp }),
      ...(FT_OPCOData.otherAppEnviroment && { otherAppEnviroment: FT_OPCOData.otherAppEnviroment }),
      ...(FT_OPCOData.surroundingTemp && { surroundingTemp: FT_OPCOData.surroundingTemp }),
      ...(FT_OPCOData.conveyorLoaded && { conveyorLoaded: FT_OPCOData.conveyorLoaded }),
      strandStatus: FT_OPCOData.strandStatus,
      conveyorSwing: FT_OPCOData.conveyorSwing,
      ...(FT_OPCOData.wearStrips && { wearStrips: FT_OPCOData.wearStrips }),
      ...(FT_OPCOData.skiBars && { skiBars: FT_OPCOData.skiBars }),
      ...(FT_OPCOData.relayStatus && { relayStatus: FT_OPCOData.relayStatus }),
      ...(FT_OPCOData.plantLayout && { plantLayout: FT_OPCOData.plantLayout }),
      ...(FT_OPCOData.requiredPics && { requiredPics: FT_OPCOData.requiredPics }),
      operatingVoltage: FT_OPCOData.operatingVoltage,
      controlVoltage: FT_OPCOData.controlVoltage,
      compressedAir: FT_OPCOData.compressedAir,
      monitorData: {
          existingMonitor: FT_OPCOData.templateA.existingMonitor,
          newMonitor: FT_OPCOData.templateA.newMonitor,		
          ...(FT_OPCOData.templateA.dcuStatus && { dcuStatus: FT_OPCOData.templateA.dcuStatus }),
          ...(FT_OPCOData.templateA.dcuNum && { dcuNum: FT_OPCOData.templateA.dcuNum }),
          ...(FT_OPCOData.templateA.existingWindows && { existingWindows: FT_OPCOData.templateA.existingWindows }),
          ...(FT_OPCOData.templateA.existingHeadUnit && { existingHeadUnit: FT_OPCOData.templateA.existingHeadUnit }),
          ...(FT_OPCOData.templateA.existingDCU && { existingDCU: FT_OPCOData.templateA.existingDCU }),
          ...(FT_OPCOData.templateA.existingPowerInterface && { existingPowerInterface: FT_OPCOData.templateA.existingPowerInterface }),
          ...(FT_OPCOData.templateA.newReservoir && { newReservoir: FT_OPCOData.templateA.newReservoir }),
          ...(FT_OPCOData.templateA.reservoirSize && { reservoirSize: FT_OPCOData.templateA.reservoirSize }),
          ...(FT_OPCOData.templateA.otherReservoirSize && { otherReservoirSize: FT_OPCOData.templateA.otherReservoirSize }),
          ...(FT_OPCOData.templateA.newReservoirNum && { newReservoirNum: FT_OPCOData.templateA.newReservoirNum }),
          ...(FT_OPCOData.templateA.typeMonitor && { typeMonitor: FT_OPCOData.templateA.typeMonitor }),
          ...(FT_OPCOData.templateA.driveMotorAmp && { driveMotorAmp: FT_OPCOData.templateA.driveMotorAmp }),
          ...(FT_OPCOData.templateA.driveMotorAmpNum && { driveMotorAmpNum: FT_OPCOData.templateA.driveMotorAmpNum }),
          ...(FT_OPCOData.templateA.driveTakeUpAir && { driveTakeUpAir: FT_OPCOData.templateA.driveTakeUpAir }),
          ...(FT_OPCOData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FT_OPCOData.templateA.driveTakeUpAirNum }),
          ...(FT_OPCOData.templateA.takeUpDistance && { takeUpDistance: FT_OPCOData.templateA.takeUpDistance }),
          ...(FT_OPCOData.templateA.takeUpDistanceNum && { takeUpDistanceNum: FT_OPCOData.templateA.takeUpDistanceNum }),
          ...(FT_OPCOData.templateA.driveTemp && { driveTemp: FT_OPCOData.templateA.driveTemp }),
          ...(FT_OPCOData.templateA.driveTempNum && { driveTempNum: FT_OPCOData.templateA.driveTempNum }),
          ...(FT_OPCOData.templateA.driveVibration && { driveVibration: FT_OPCOData.templateA.driveVibration }),
          ...(FT_OPCOData.templateA.driveVibrationNum && { driveVibrationNum: FT_OPCOData.templateA.driveVibrationNum }),
          ...(FT_OPCOData.templateA.dogPitch && { dogPitch: FT_OPCOData.templateA.dogPitch }),
          ...(FT_OPCOData.templateA.dogPitchNum && { dogPitchNum: FT_OPCOData.templateA.dogPitchNum }),
          ...(FT_OPCOData.templateA.paintMarker && { paintMarker: FT_OPCOData.templateA.paintMarker }),
          ...(FT_OPCOData.templateA.paintMarkerNum && { paintMarkerNum: FT_OPCOData.templateA.paintMarkerNum }),
          ...(FT_OPCOData.templateA.chainVision && { chainVision: FT_OPCOData.templateA.chainVision }),
          ...(FT_OPCOData.templateA.lubeVision && { lubeVision: FT_OPCOData.templateA.lubeVision }),
          ...(FT_OPCOData.templateA.trolleyVision && { trolleyVision: FT_OPCOData.templateA.trolleyVision }),
          ...(FT_OPCOData.templateA.trolleyDetect && { trolleyDetect: FT_OPCOData.templateA.trolleyDetect }),
          ...(FT_OPCOData.templateA.omniView && { omniView: FT_OPCOData.templateA.omniView }),
          ...(FT_OPCOData.templateA.dcuUpgradeNum && { dcuUpgradeNum: FT_OPCOData.templateA.dcuUpgradeNum }),
          ...(FT_OPCOData.templateA.piuDistance && { piuDistance: FT_OPCOData.templateA.piuDistance }),
          ...(FT_OPCOData.templateA.switchDistance && { switchDistance: FT_OPCOData.templateA.switchDistance }),
          ...(FT_OPCOData.templateA.ampPickup && { ampPickup: FT_OPCOData.templateA.ampPickup }),
          ...(FT_OPCOData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FT_OPCOData.templateA.fromAirTakeUpDistance }),
          ...(FT_OPCOData.templateA.specialControllerOptions && { specialControllerOptions: FT_OPCOData.templateA.specialControllerOptions }),
          ...(FT_OPCOData.templateA.operatingVoltage && { operatingVoltage: FT_OPCOData.templateA.operatingVoltage })
      },

      ...(FT_OPCOData.wheelOpenType && { wheelOpenType: FT_OPCOData.wheelOpenType }),
      ...(FT_OPCOData.wheelClosedType && { wheelClosedType: FT_OPCOData.wheelClosedType }),
      ...(FT_OPCOData.openStatus && { openStatus: FT_OPCOData.openStatus }),
      freeWheelStatus: FT_OPCOData.freeWheelStatus,
      actuatorStatus: FT_OPCOData.actuatorStatus,
      ...(FT_OPCOData.kingPinStatus && { kingPinStatus: FT_OPCOData.kingPinStatus }),
      ...(FT_OPCOData.guideRollerStatus && { guideRollerStatus: FT_OPCOData.guideRollerStatus }),
      ...(FT_OPCOData.openRaceStyleType && { openRaceStyleType: FT_OPCOData.openRaceStyleType }),
      ...(FT_OPCOData.closedRaceStyleType && { closedRaceStyleType: FT_OPCOData.closedRaceStyleType }),
      ...(FT_OPCOData.holeStatus && { holeStatus: FT_OPCOData.holeStatus }),
      ...(FT_OPCOData.rollerChainStatus && { rollerChainStatus: FT_OPCOData.rollerChainStatus }),
      ...(FT_OPCOData.brushStatus && { brushStatus: FT_OPCOData.brushStatus }),
      ...(FT_OPCOData.outboardStatus && { outboardStatus: FT_OPCOData.outboardStatus }),
      lubeBrand: FT_OPCOData.lubeBrand,
      lubeViscosity: FT_OPCOData.lubeViscosity,
      currentGrease: FT_OPCOData.currentGrease,
      currentLube: FT_OPCOData.currentLube,
      oilOrGrease: FT_OPCOData.oilOrGrease,
      ...(FT_OPCOData.oilViscosity && { oilViscosity: FT_OPCOData.oilViscosity }),
      ...(FT_OPCOData.greaseNGLIGrade && { greaseNGLIGrade: FT_OPCOData.greaseNGLIGrade }),
      zerkDirection: FT_OPCOData.zerkDirection,
      zerkLocationType: FT_OPCOData.zerkLocationType,
      swingStatusAgain: FT_OPCOData.swingStatusAgain,
      wheelDiameter: FT_OPCOData.wheelDiameter,
      ...(FT_OPCOData.chainMaster && { chainMaster: FT_OPCOData.chainMaster }),
      ...(FT_OPCOData.remoteStatus && { remoteStatus: FT_OPCOData.remoteStatus }),
      ...(FT_OPCOData.mountStatus && { mountStatus: FT_OPCOData.mountStatus }),
      ...(FT_OPCOData.otherUnitStatus && { otherUnitStatus: FT_OPCOData.otherUnitStatus }),
      ...(FT_OPCOData.timerStatus && { timerStatus: FT_OPCOData.timerStatus }),
      ...(FT_OPCOData.electricStatus && { electricStatus: FT_OPCOData.electricStatus }),
      ...(FT_OPCOData.mightyLubeMonitoring && { mightyLubeMonitoring: FT_OPCOData.mightyLubeMonitoring }),
      ...(FT_OPCOData.preMountType && { preMountType: FT_OPCOData.preMountType }),
      ...(FT_OPCOData.otherPreMountType && { otherPreMountType: FT_OPCOData.otherPreMountType }),
      ...(FT_OPCOData.plcConnection && { plcConnection: FT_OPCOData.plcConnection }),
      ...(FT_OPCOData.otherControllerNotes && { otherControllerNotes: FT_OPCOData.otherControllerNotes }),
      ...(FT_OPCOData.ftUnitType && { ftUnitType: FT_OPCOData.ftUnitType }),
      ...(FT_OPCOData.ftTopG && { ftTopG: FT_OPCOData.ftTopG }),
      ...(FT_OPCOData.ftTopH && { ftTopH: FT_OPCOData.ftTopH }),
      ...(FT_OPCOData.ftTopA1 && { ftTopA1: FT_OPCOData.ftTopA1 }),
      ...(FT_OPCOData.ftTopB1 && { ftTopB1: FT_OPCOData.ftTopB1 }),
      ...(FT_OPCOData.ftTopH1 && { ftTopH1: FT_OPCOData.ftTopH1 }),
      ...(FT_OPCOData.ftTopJ1 && { ftTopJ1: FT_OPCOData.ftTopJ1 }),
      ...(FT_OPCOData.ftTopL1 && { ftTopL1: FT_OPCOData.ftTopL1 }),
      ...(FT_OPCOData.ftTopM1 && { ftTopM1: FT_OPCOData.ftTopM1 }),
      ...(FT_OPCOData.ftTopN1 && { ftTopN1: FT_OPCOData.ftTopN1 }),
      ...(FT_OPCOData.ftTopP1 && { ftTopP1: FT_OPCOData.ftTopP1 }),
      ...(FT_OPCOData.ftTopR1 && { ftTopR1: FT_OPCOData.ftTopR1 })
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FT_OPCO"
    });

    await req.user.save();
    return res.status(200).json({ message: "FT_OPCO entry added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
