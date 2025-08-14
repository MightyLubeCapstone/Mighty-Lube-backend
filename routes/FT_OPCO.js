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
      ...(FT_OPCOData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FT_OPCOData.otherIndustrialChainManufacturer }),
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
          ...(FT_OPCOData.templateA.dcuStatus && { dcuStatus: CC5_CLData.dcuStatus }),
          ...(FT_OPCOData.templateA.dcuNum && { dcuNum: CC5_CLData.dcuNum }),
          ...(FT_OPCOData.templateA.existingWindows && { existingWindows: CC5_CLData.existingWindows }),
          ...(FT_OPCOData.templateA.existingHeadUnit && { existingHeadUnit: CC5_CLData.existingHeadUnit }),
          ...(FT_OPCOData.templateA.existingDCU && { existingDCU: CC5_CLData.existingDCU }),
          ...(FT_OPCOData.templateA.existingPowerInterface && { existingPowerInterface: CC5_CLData.existingPowerInterface }),
          ...(FT_OPCOData.templateA.newReservoir && { newReservoir: CC5_CLData.newReservoir }),
          ...(FT_OPCOData.templateA.reservoirSize && { reservoirSize: CC5_CLData.reservoirSize }),
          ...(FT_OPCOData.templateA.otherReservoirSize && { otherReservoirSize: CC5_CLData.otherReservoirSize }),
          ...(FT_OPCOData.templateA.newReservoirNum && { newReservoirNum: CC5_CLData.newReservoirNum }),
          ...(FT_OPCOData.templateA.typeMonitor && { typeMonitor: CC5_CLData.typeMonitor }),
          ...(FT_OPCOData.templateA.driveMotorAmp && { driveMotorAmp: CC5_CLData.driveMotorAmp }),
          ...(FT_OPCOData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CC5_CLData.driveMotorAmpNum }),
          ...(FT_OPCOData.templateA.driveTakeUpAir && { driveTakeUpAir: CC5_CLData.driveTakeUpAir }),
          ...(FT_OPCOData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_CLData.driveTakeUpAirNum }),
          ...(FT_OPCOData.templateA.takeUpDistance && { takeUpDistance: CC5_CLData.takeUpDistance }),
          ...(FT_OPCOData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CC5_CLData.takeUpDistanceNum }),
          ...(FT_OPCOData.templateA.driveTemp && { driveTemp: CC5_CLData.driveTemp }),
          ...(FT_OPCOData.templateA.driveTempNum && { driveTempNum: CC5_CLData.driveTempNum }),
          ...(FT_OPCOData.templateA.driveVibration && { driveVibration: CC5_CLData.driveVibration }),
          ...(FT_OPCOData.templateA.driveVibrationNum && { driveVibrationNum: CC5_CLData.driveVibrationNum }),
          ...(FT_OPCOData.templateA.dogPitch && { dogPitch: CC5_CLData.dogPitch }),
          ...(FT_OPCOData.templateA.dogPitchNum && { dogPitchNum: CC5_CLData.dogPitchNum }),
          ...(FT_OPCOData.templateA.paintMarker && { paintMarker: CC5_CLData.paintMarker }),
          ...(FT_OPCOData.templateA.paintMarkerNum && { paintMarkerNum: CC5_CLData.paintMarkerNum }),
          ...(FT_OPCOData.templateA.chainVision && { chainVision: CC5_CLData.chainVision }),
          ...(FT_OPCOData.templateA.lubeVision && { lubeVision: CC5_CLData.lubeVision }),
          ...(FT_OPCOData.templateA.trolleyVision && { trolleyVision: CC5_CLData.trolleyVision }),
          ...(FT_OPCOData.templateA.trolleyDetect && { trolleyDetect: CC5_CLData.trolleyDetect }),
          ...(FT_OPCOData.templateA.omniView && { omniView: CC5_CLData.omniView }),
          ...(FT_OPCOData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CC5_CLData.dcuUpgradeNum }),
          ...(FT_OPCOData.templateA.piuDistance && { piuDistance: CC5_CLData.piuDistance }),
          ...(FT_OPCOData.templateA.switchDistance && { switchDistance: CC5_CLData.switchDistance }),
          ...(FT_OPCOData.templateA.ampPickup && { ampPickup: CC5_CLData.ampPickup }),
          ...(FT_OPCOData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_CLData.fromAirTakeUpDistance }),
          ...(FT_OPCOData.templateA.specialControllerOptions && { specialControllerOptions: CC5_CLData.specialControllerOptions }),
          ...(FT_OPCOData.templateA.operatingVoltage && { operatingVoltage: CC5_CLData.operatingVoltage })
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
      ...(FT_OPCOData.ftTopF && { ftTopF: FT_OPCOData.ftTopF }),
      ...(FT_OPCOData.ftTopG && { ftTopG: FT_OPCOData.ftTopG }),
      ...(FT_OPCOData.ftTopH && { ftTopH: FT_OPCOData.ftTopH }),
      ...(FT_OPCOData.ftTopA1 && { ftTopA1: FT_OPCOData.ftTopA1 }),
      ...(FT_OPCOData.ftTopB1 && { ftTopB1: FT_OPCOData.ftTopB1 }),
      ...(FT_OPCOData.ftTopH1 && { ftTopH1: FT_OPCOData.ftTopH1 }),
      ...(FT_OPCOData.ftTopJ1 && { ftTopJ1: FT_OPCOData.ftTopJ1 }),
      ...(FT_OPCOData.ftTopK1 && { ftTopK1: FT_OPCOData.ftTopK1 }),
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
