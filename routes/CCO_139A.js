// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const CCO_139A = require("../models/CCO_139A");
// const templateA = require("../models/templateA");
// const templateB = require("../models/templateB");
// const templateC = require("../models/templateC");
// const templateD = require("../models/templateD.js");
// const templateF = require("../models/templateF.js");

// const router = express.Router();

// router.post("/", authenticate, async (req, res) => {
//     try {
//         const { CCO_139AData, numRequested } = req.body;
//         const order = new CCO_139A({

//             conveyorName: CCO_139AData.conveyorName,
//             chainSize: CCO_139AData.chainSize,
//             ...(CCO_139AData.otherChainSize && { otherChainSize: CCO_139AData.otherChainSize }),
//             industrialChainManufacturer: CCO_139AData.industrialChainManufacturer,
//             ...(CCO_139AData.otherChainManufacturer && { otherChainManufacturer: CCO_139AData.otherChainManufacturer }),
//             wheelManufacturer: CCO_139AData.wheelManufacturer,
//             ...(CCO_139AData.otherWheelManufacturer && { otherWheelManufacturer: CCO_139AData.otherWheelManufacturer }),
//             conveyorLength: CCO_139AData.conveyorLength,
//             conveyorLengthUnit: CCO_139AData.conveyorLengthUnit,
//             conveyorSpeed: CCO_139AData.conveyorSpeed,
//             conveyorSpeedUnit: CCO_139AData.conveyorSpeedUnit,
//             conveyorIndex: CCO_139AData.conveyorIndex,
//             ...(CCO_139AData.travelDirection && { travelDirection: CCO_139AData.travelDirection }),
//             appEnviroment: CCO_139AData.appEnviroment,
//             ...(CCO_139AData.ovenStatus && { ovenStatus: CCO_139AData.ovenStatus }),
//             ...(CCO_139AData.ovenTemp && { ovenTemp: CCO_139AData.ovenTemp }),
//             ...(CCO_139AData.otherAppEnviroment && { otherAppEnviroment: CCO_139AData.otherAppEnviroment }),
//             strandStatus: CCO_139AData.strandStatus,
//             pointsOfLube: CCO_139AData.pointsOfLube,
//             sensingMethod: CCO_139AData.sensingMethod,
//             ...(CCO_139AData.surroundingTemp && { surroundingTemp: CCO_139AData.surroundingTemp }),
//             ...(CCO_139AData.conveyorLoaded && { conveyorLoaded: CCO_139AData.conveyorLoaded }),
//             ...(CCO_139AData.conveyorSwing && { conveyorSwing: CCO_139AData.conveyorSwing }),
//             ...(CCO_139AData.compressedAir && { compressedAir: CCO_139AData.compressedAir }),
//             ...(CCO_139AData.airSupplyType && { airSupplyType: CCO_139AData.airSupplyType }),
//             operatingVoltSingle: CCO_139AData.operatingVoltSingle,
//             controlVoltSingle: CCO_139AData.controlVoltSingle,

//             monitorData: 
//             {
//                 existingMonitor: CCO_139AData.templateA.existingMonitor,
//                 newMonitor: CCO_139AData.templateA.newMonitor,		
//                 ...(CCO_139AData.templateA.dcuStatus && { dcuStatus: CCO_139AData.dcuStatus }),
//                 ...(CCO_139AData.templateA.dcuNum && { dcuNum: CCO_139AData.dcuNum }),
//                 ...(CCO_139AData.templateA.existingWindows && { existingWindows: CCO_139AData.existingWindows }),
//                 ...(CCO_139AData.templateA.existingHeadUnit && { existingHeadUnit: CCO_139AData.existingHeadUnit }),
//                 ...(CCO_139AData.templateA.existingDCU && { existingDCU: CCO_139AData.existingDCU }),
//                 ...(CCO_139AData.templateA.existingPowerInterface && { existingPowerInterface: CCO_139AData.existingPowerInterface }),
//                 ...(CCO_139AData.templateA.newReservoir && { newReservoir: CCO_139AData.newReservoir }),
//                 ...(CCO_139AData.templateA.reservoirSize && { reservoirSize: CCO_139AData.reservoirSize }),
//                 ...(CCO_139AData.templateA.otherReservoirSize && { otherReservoirSize: CCO_139AData.otherReservoirSize }),
//                 ...(CCO_139AData.templateA.newReservoirNum && { newReservoirNum: CCO_139AData.newReservoirNum }),
//                 ...(CCO_139AData.templateA.typeMonitor && { typeMonitor: CCO_139AData.typeMonitor }),
//                 ...(CCO_139AData.templateA.driveMotorAmp && { driveMotorAmp: CCO_139AData.driveMotorAmp }),
//                 ...(CCO_139AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_139AData.driveMotorAmpNum }),
//                 ...(CCO_139AData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_139AData.driveTakeUpAir }),
//                 ...(CCO_139AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_139AData.driveTakeUpAirNum }),
//                 ...(CCO_139AData.templateA.takeUpDistance && { takeUpDistance: CCO_139AData.takeUpDistance }),
//                 ...(CCO_139AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_139AData.takeUpDistanceNum }),
//                 ...(CCO_139AData.templateA.driveTemp && { driveTemp: CCO_139AData.driveTemp }),
//                 ...(CCO_139AData.templateA.driveTempNum && { driveTempNum: CCO_139AData.driveTempNum }),
//                 ...(CCO_139AData.templateA.driveVibration && { driveVibration: CCO_139AData.driveVibration }),
//                 ...(CCO_139AData.templateA.driveVibrationNum && { driveVibrationNum: CCO_139AData.driveVibrationNum }),
//                 ...(CCO_139AData.templateA.dogPitch && { dogPitch: CCO_139AData.dogPitch }),
//                 ...(CCO_139AData.templateA.dogPitchNum && { dogPitchNum: CCO_139AData.dogPitchNum }),
//                 ...(CCO_139AData.templateA.paintMarker && { paintMarker: CCO_139AData.paintMarker }),
//                 ...(CCO_139AData.templateA.paintMarkerNum && { paintMarkerNum: CCO_139AData.paintMarkerNum }),
//                 ...(CCO_139AData.templateA.chainVision && { chainVision: CCO_139AData.chainVision }),
//                 ...(CCO_139AData.templateA.lubeVision && { lubeVision: CCO_139AData.lubeVision }),
//                 ...(CCO_139AData.templateA.trolleyVision && { trolleyVision: CCO_139AData.trolleyVision }),
//                 ...(CCO_139AData.templateA.trolleyDetect && { trolleyDetect: CCO_139AData.trolleyDetect }),
//                 ...(CCO_139AData.templateA.omniView && { omniView: CCO_139AData.omniView }),
//                 ...(CCO_139AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_139AData.dcuUpgradeNum }),
//                 ...(CCO_139AData.templateA.piuDistance && { piuDistance: CCO_139AData.piuDistance }),
//                 ...(CCO_139AData.templateA.switchDistance && { switchDistance: CCO_139AData.switchDistance }),
//                 ...(CCO_139AData.templateA.ampPickup && { ampPickup: CCO_139AData.ampPickup }),
//                 ...(CCO_139AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_139AData.fromAirTakeUpDistance }),
//                 ...(CCO_139AData.templateA.specialControllerOptions && { specialControllerOptions: CCO_139AData.specialControllerOptions }),
//                 ...(CCO_139AData.templateA.operatingVoltage && { operatingVoltage: CCO_139AData.operatingVoltage })
//             },

//             addFreeCarrier: CCO_139AData.addFreeCarrier,

//             templateBData: 
//             {
                
//                 conveyorName: CCO_139AData.templateB.conveyorName,
//                 industrialChainManufacturer: CCO_139AData.templateB.industrialChainManufacturer,
//                 ...(CCO_139AData.templateB.otherChainManufacturer && { otherChainManufacturer: CCO_139AData.templateB.otherChainManufacturer }),
//                 wheelManufacturer: CCO_139AData.templateB.wheelManufacturer,
//                 ...(CCO_139AData.templateB.wheelManufacturer && { wheelManufacturer: CCO_139AData.templateB.wheelManufacturer}),
//                 conveyorSpeed: CCO_139AData.templateB.conveyorSpeed,
//                 conveyorSpeedUnit: CCO_139AData.templateB.conveyorSpeedUnit,
//                 conveyorIndex: CCO_139AData.templateB.conveyorIndex,
//                 ...(CCO_139AData.templateB.travelDirection && { travelDirection: CCO_139AData.templateB.travelDirection}),
//                 appEnviroment: CCO_139AData.templateB.appEnviroment,
//                 ...(CCO_139AData.templateB.otherAppEnviroment && { otherAppEnviroment: CCO_139AData.templateB.otherAppEnviroment}),
//                 surroundingTemp: CCO_139AData.templateB.surroundingTemp,
//                 orientationType: CCO_139AData.templateB.orientationType,
//                 operatingVoltage: CCO_139AData.templateB.operatingVoltage,
//                 controlVoltSingle: CCO_139AData.templateB.controlVoltSingle,
//                 compressedAir: CCO_139AData.templateB.compressedAir,
//                 ...(CCO_139AData.templateB.airSupplyType && { airSupplyType: CCO_139AData.templateB.airSupplyType}),

//                 templateA_BData: {
                    
//                     existingMonitor: CCO_139AData.templateA.existingMonitor,
//                     newMonitor: CCO_139AData.templateA.newMonitor,		
//                     ...(CCO_139AData.templateA.dcuStatus && { dcuStatus: CCO_139AData.templateA.dcuStatus }),
//                     ...(CCO_139AData.templateA.dcuNum && { dcuNum: CCO_139AData.templateA.dcuNum }),
//                     ...(CCO_139AData.templateA.existingWindows && { existingWindows: CCO_139AData.templateA.existingWindows }),
//                     ...(CCO_139AData.templateA.existingHeadUnit && { existingHeadUnit: CCO_139AData.templateA.existingHeadUnit }),
//                     ...(CCO_139AData.templateA.existingDCU && { existingDCU: CCO_139AData.templateA.existingDCU }),
//                     ...(CCO_139AData.templateA.existingPowerInterface && { existingPowerInterface: CCO_139AData.templateA.existingPowerInterface }),
//                     ...(CCO_139AData.templateA.newReservoir && { newReservoir: CCO_139AData.templateA.newReservoir }),
//                     ...(CCO_139AData.templateA.reservoirSize && { reservoirSize: CCO_139AData.templateA.reservoirSize }),
//                     ...(CCO_139AData.templateA.otherReservoirSize && { otherReservoirSize: CCO_139AData.templateA.otherReservoirSize }),
//                     ...(CCO_139AData.templateA.newReservoirNum && { newReservoirNum: CCO_139AData.templateA.newReservoirNum }),
//                     ...(CCO_139AData.templateA.typeMonitor && { typeMonitor: CCO_139AData.templateA.typeMonitor }),
//                     ...(CCO_139AData.templateA.driveMotorAmp && { driveMotorAmp: CCO_139AData.templateA.driveMotorAmp }),
//                     ...(CCO_139AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_139AData.templateA.driveMotorAmpNum }),
//                     ...(CCO_139AData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_139AData.templateA.driveTakeUpAir }),
//                     ...(CCO_139AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_139AData.templateA.driveTakeUpAirNum }),
//                     ...(CCO_139AData.templateA.takeUpDistance && { takeUpDistance: CCO_139AData.templateA.takeUpDistance }),
//                     ...(CCO_139AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_139AData.templateA.takeUpDistanceNum }),
//                     ...(CCO_139AData.templateA.driveTemp && { driveTemp: CCO_139AData.templateA.driveTemp }),
//                     ...(CCO_139AData.templateA.driveTempNum && { driveTempNum: CCO_139AData.templateA.driveTempNum }),
//                     ...(CCO_139AData.templateA.driveVibration && { driveVibration: CCO_139AData.templateA.driveVibration }),
//                     ...(CCO_139AData.templateA.driveVibrationNum && { driveVibrationNum: CCO_139AData.templateA.driveVibrationNum }),
//                     ...(CCO_139AData.templateA.dogPitch && { dogPitch: CCO_139AData.templateA.dogPitch }),
//                     ...(CCO_139AData.templateA.dogPitchNum && { dogPitchNum: CCO_139AData.templateA.dogPitchNum }),
//                     ...(CCO_139AData.templateA.paintMarker && { paintMarker: CCO_139AData.templateA.paintMarker }),
//                     ...(CCO_139AData.templateA.paintMarkerNum && { paintMarkerNum: CCO_139AData.templateA.paintMarkerNum }),
//                     ...(CCO_139AData.templateA.chainVision && { chainVision: CCO_139AData.templateA.chainVision }),
//                     ...(CCO_139AData.templateA.lubeVision && { lubeVision: CCO_139AData.templateA.lubeVision }),
//                     ...(CCO_139AData.templateA.trolleyVision && { trolleyVision: CCO_139AData.templateA.trolleyVision }),
//                     ...(CCO_139AData.templateA.trolleyDetect && { trolleyDetect: CCO_139AData.templateA.trolleyDetect }),
//                     ...(CCO_139AData.templateA.omniView && { omniView: CCO_139AData.templateA.omniView }),
//                     ...(CCO_139AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_139AData.templateA.dcuUpgradeNum }),
//                     ...(CCO_139AData.templateA.piuDistance && { piuDistance: CCO_139AData.templateA.piuDistance }),
//                     ...(CCO_139AData.templateA.switchDistance && { switchDistance: CCO_139AData.templateA.switchDistance }),
//                     ...(CCO_139AData.templateA.ampPickup && { ampPickup: CCO_139AData.templateA.ampPickup }),
//                     ...(CCO_139AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_139AData.templateA.fromAirTakeUpDistance }),
//                     ...(CCO_139AData.templateA.specialControllerOptions && { specialControllerOptions: CCO_139AData.templateA.specialControllerOptions }),
//                     ...(CCO_139AData.templateA.operatingVoltage && { operatingVoltage: CCO_139AData.templateA.operatingVoltage })

//                 },

//                 freeWheelStatus: CCO_139AData.templateB.freeWheelStatus,
//                 actuatorStatus: CCO_139AData.templateB.actuatorStatus,
//                 ...(CCO_139AData.templateB.pivotStatus && { pivotStatus: CCO_139AData.templateB.pivotStatus}),
//                 kingPinStatus: CCO_139AData.templateB.kingPinStatus,
//                 lubeBrand: CCO_139AData.templateB.lubeBrand,
//                 lubeViscosity: CCO_139AData.templateB.lubeViscosity,
//                 ...(CCO_139AData.templateB.lubeType && { lubeType: CCO_139AData.templateB.lubeType}),
//                 currentGrease: CCO_139AData.templateB.currentGrease,
//                 currentGreaseGrade: CCO_139AData.templateB.currentGreaseGrade,
//                 zerkDirection: CCO_139AData.templateB.zerkDirection,
//                 zerkLocationType: CCO_139AData.templateB.zerkLocationType,
//                 wheelDiameter: CCO_139AData.templateB.wheelDiameter,
//                 conveyorSwing: CCO_139AData.templateB.conveyorSwing,
//                 ...(CCO_139AData.templateB.chainMaster && { chainMaster: CCO_139AData.templateB.chainMaster}),
//                 ...(CCO_139AData.templateB.remoteStatus && { remoteStatus: CCO_139AData.templateB.remoteStatus}),
//                 ...(CCO_139AData.templateB.mountStatus && { mountStatus: CCO_139AData.templateB.mountStatus}),
//                 ...(CCO_139AData.templateB.otherUnitStatus && { otherUnitStatus: CCO_139AData.templateB.otherUnitStatus}),
//                 ...(CCO_139AData.templateB.timerStatus && { timerStatus: CCO_139AData.templateB.timerStatus}),
//                 ...(CCO_139AData.templateB.electricStatus && { electricStatus: CCO_139AData.templateB.electricStatus}),
//                 ...(CCO_139AData.templateB.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_139AData.templateB.mightyLubeMonitoring}),
//                 ...(CCO_139AData.templateB.preMountType && { preMountType: CCO_139AData.templateB.preMountType}),
//                 ...(CCO_139AData.templateB.otherPreMountType && { otherPreMountType: CCO_139AData.templateB.otherPreMountType}),
//                 ...(CCO_139AData.templateB.plcConnection && { plcConnection: CCO_139AData.templateB.plcConnection}),
//                 ...(CCO_139AData.templateB.otherControllerNotes && { otherControllerNotes: CCO_139AData.templateB.otherControllerNotes}),
//                 ...(CCO_139AData.templateB.templateB_UnitType && { templateB_UnitType: CCO_139AData.templateB.templateB_UnitType}),
//                 ...(CCO_139AData.templateB.templateB_InvertedB && { templateB_InvertedB: CCO_139AData.templateB.templateB_InvertedB}),
//                 ...(CCO_139AData.templateB.templateB_InvertedE && { templateB_InvertedE: CCO_139AData.templateB.templateB_InvertedE}),
//                 ...(CCO_139AData.templateB.templateB_InvertedG && { templateB_InvertedG: CCO_139AData.templateB.templateB_InvertedG}),
//                 ...(CCO_139AData.templateB.templateB_InvertedH && { templateB_InvertedH: CCO_139AData.templateB.templateB_InvertedH}),
//                 ...(CCO_139AData.templateB.templateB_InvertedK && { templateB_InvertedK: CCO_139AData.templateB.templateB_InvertedK}),
//                 ...(CCO_139AData.templateB.templateB_InvertedT && { templateB_InvertedT: CCO_139AData.templateB.templateB_InvertedT}),
//                 ...(CCO_139AData.templateB.templateB_InvertedU && { templateB_InvertedU: CCO_139AData.templateB.templateB_InvertedU}),
//                 ...(CCO_139AData.templateB.templateB_InvertedV && { templateB_InvertedV: CCO_139AData.templateB.templateB_InvertedV}),
//                 ...(CCO_139AData.templateB.templateB_InvertedW && { templateB_InvertedW: CCO_139AData.templateB.templateB_InvertedW}),

//             },
            
//             templateCData: 
//             {
                
//             conveyorName: CCO_139AData.templateC.conveyorName,
//             industrialChainManufacturer: CCO_139AData.templateC.industrialChainManufacturer,
//             ...(CCO_139AData.templateC.otherChainManufacturer && { otherChainManufacturer: CCO_139AData.templateC.otherChainManufacturer }),
//             wheelManufacturer: CCO_139AData.templateC.wheelManufacturer,
//             ...(CCO_139AData.templateC.wheelManufacturer && { wheelManufacturer: CCO_139AData.templateC.wheelManufacturer}),
//             conveyorSpeed: CCO_139AData.templateC.conveyorSpeed,
//             conveyorSpeedUnit: CCO_139AData.templateC.conveyorSpeedUnit,
//             conveyorIndex: CCO_139AData.templateC.conveyorIndex,
//             ...(CCO_139AData.templateC.travelDirection && { travelDirection: CCO_139AData.templateC.travelDirection}),
//             appEnviroment: CCO_139AData.templateC.appEnviroment,
//             ...(CCO_139AData.templateC.otherAppEnviroment && { otherAppEnviroment: CCO_139AData.templateC.otherAppEnviroment}),
//             surroundingTemp: CCO_139AData.templateC.surroundingTemp,
//             orientationType: CCO_139AData.templateC.orientationType,
//             guideWheelsEven: CCO_139AData.templateC.guideWheelsEven,
//             operatingVoltage: CCO_139AData.templateC.operatingVoltage,
//             controlVoltSingle: CCO_139AData.templateC.controlVoltSingle,
//             compressedAir: CCO_139AData.templateC.compressedAir,
//             ...(CCO_139AData.templateC.airSupplyType && { airSupplyType: CCO_139AData.templateC.airSupplyType}),

//             templateA_CData: 
//             {
//                 existingMonitor: CCO_139AData.templateA.existingMonitor,
//                 newMonitor: CCO_139AData.templateA.newMonitor,		
//                 ...(CCO_139AData.templateA.dcuStatus && { dcuStatus: CCO_139AData.templateA.dcuStatus }),
//                 ...(CCO_139AData.templateA.dcuNum && { dcuNum: CCO_139AData.templateA.dcuNum }),
//                 ...(CCO_139AData.templateA.existingWindows && { existingWindows: CCO_139AData.templateA.existingWindows }),
//                 ...(CCO_139AData.templateA.existingHeadUnit && { existingHeadUnit: CCO_139AData.templateA.existingHeadUnit }),
//                 ...(CCO_139AData.templateA.existingDCU && { existingDCU: CCO_139AData.templateA.existingDCU }),
//                 ...(CCO_139AData.templateA.existingPowerInterface && { existingPowerInterface: CCO_139AData.templateA.existingPowerInterface }),
//                 ...(CCO_139AData.templateA.newReservoir && { newReservoir: CCO_139AData.templateA.newReservoir }),
//                 ...(CCO_139AData.templateA.reservoirSize && { reservoirSize: CCO_139AData.templateA.reservoirSize }),
//                 ...(CCO_139AData.templateA.otherReservoirSize && { otherReservoirSize: CCO_139AData.templateA.otherReservoirSize }),
//                 ...(CCO_139AData.templateA.newReservoirNum && { newReservoirNum: CCO_139AData.templateA.newReservoirNum }),
//                 ...(CCO_139AData.templateA.typeMonitor && { typeMonitor: CCO_139AData.templateA.typeMonitor }),
//                 ...(CCO_139AData.templateA.driveMotorAmp && { driveMotorAmp: CCO_139AData.templateA.driveMotorAmp }),
//                 ...(CCO_139AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_139AData.templateA.driveMotorAmpNum }),
//                 ...(CCO_139AData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_139AData.templateA.driveTakeUpAir }),
//                 ...(CCO_139AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_139AData.templateA.driveTakeUpAirNum }),
//                 ...(CCO_139AData.templateA.takeUpDistance && { takeUpDistance: CCO_139AData.templateA.takeUpDistance }),
//                 ...(CCO_139AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_139AData.templateA.takeUpDistanceNum }),
//                 ...(CCO_139AData.templateA.driveTemp && { driveTemp: CCO_139AData.templateA.driveTemp }),
//                 ...(CCO_139AData.templateA.driveTempNum && { driveTempNum: CCO_139AData.templateA.driveTempNum }),
//                 ...(CCO_139AData.templateA.driveVibration && { driveVibration: CCO_139AData.templateA.driveVibration }),
//                 ...(CCO_139AData.templateA.driveVibrationNum && { driveVibrationNum: CCO_139AData.templateA.driveVibrationNum }),
//                 ...(CCO_139AData.templateA.dogPitch && { dogPitch: CCO_139AData.templateA.dogPitch }),
//                 ...(CCO_139AData.templateA.dogPitchNum && { dogPitchNum: CCO_139AData.templateA.dogPitchNum }),
//                 ...(CCO_139AData.templateA.paintMarker && { paintMarker: CCO_139AData.templateA.paintMarker }),
//                 ...(CCO_139AData.templateA.paintMarkerNum && { paintMarkerNum: CCO_139AData.templateA.paintMarkerNum }),
//                 ...(CCO_139AData.templateA.chainVision && { chainVision: CCO_139AData.templateA.chainVision }),
//                 ...(CCO_139AData.templateA.lubeVision && { lubeVision: CCO_139AData.templateA.lubeVision }),
//                 ...(CCO_139AData.templateA.trolleyVision && { trolleyVision: CCO_139AData.templateA.trolleyVision }),
//                 ...(CCO_139AData.templateA.trolleyDetect && { trolleyDetect: CCO_139AData.templateA.trolleyDetect }),
//                 ...(CCO_139AData.templateA.omniView && { omniView: CCO_139AData.templateA.omniView }),
//                 ...(CCO_139AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_139AData.templateA.dcuUpgradeNum }),
//                 ...(CCO_139AData.templateA.piuDistance && { piuDistance: CCO_139AData.templateA.piuDistance }),
//                 ...(CCO_139AData.templateA.switchDistance && { switchDistance: CCO_139AData.templateA.switchDistance }),
//                 ...(CCO_139AData.templateA.ampPickup && { ampPickup: CCO_139AData.templateA.ampPickup }),
//                 ...(CCO_139AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_139AData.templateA.fromAirTakeUpDistance }),
//                 ...(CCO_139AData.templateA.specialControllerOptions && { specialControllerOptions: CCO_139AData.templateA.specialControllerOptions }),
//                 ...(CCO_139AData.templateA.operatingVoltage && { operatingVoltage: CCO_139AData.templateA.operatingVoltage })
//             },
            
//             freeWheelStatus: CCO_139AData.templateC.freeWheelStatus,
//             actuatorStatus: CCO_139AData.templateC.actuatorStatus,
//             ...(CCO_139AData.templateC.pivotStatus && { pivotStatus: CCO_139AData.templateC.pivotStatus}),
//             kingPinStatus: CCO_139AData.templateC.kingPinStatus,
//             lubeBrand: CCO_139AData.templateC.lubeBrand,
//             lubeViscosity: CCO_139AData.templateC.lubeViscosity,
//             ...(CCO_139AData.templateC.lubeType && { lubeType: CCO_139AData.templateC.lubeType}),
//             currentGrease: CCO_139AData.templateC.currentGrease,
//             currentGreaseGrade: CCO_139AData.templateC.currentGreaseGrade,
//             zerkDirection: CCO_139AData.templateC.zerkDirection,
//             zerkLocationType: CCO_139AData.templateC.zerkLocationType,
//             wheelDiameter: CCO_139AData.templateC.wheelDiameter,
//             conveyorSwing: CCO_139AData.templateC.conveyorSwing,
//             ...(CCO_139AData.templateC.chainMaster && { lubeType: CCO_139AData.templateC.chainMaster}),
//             ...(CCO_139AData.templateC.remoteStatus && { lubeType: CCO_139AData.templateC.remoteStatus}),
//             ...(CCO_139AData.templateC.mountStatus && { lubeType: CCO_139AData.templateC.mountStatus}),
//             ...(CCO_139AData.templateC.otherUnitStatus && { lubeType: CCO_139AData.templateC.otherUnitStatus}),
//             ...(CCO_139AData.templateC.timerStatus && { lubeType: CCO_139AData.templateC.timerStatus}),
//             ...(CCO_139AData.templateC.electricStatus && { lubeType: CCO_139AData.templateC.electricStatus}),
//             ...(CCO_139AData.templateC.mightyLubeMonitoring && { lubeType: CCO_139AData.templateC.mightyLubeMonitoring}),
//             ...(CCO_139AData.templateC.preMountType && { lubeType: CCO_139AData.templateC.preMountType}),
//             ...(CCO_139AData.templateC.otherPreMountType && { lubeType: CCO_139AData.templateC.otherPreMountType}),
//             ...(CCO_139AData.templateC.plcConnection && { lubeType: CCO_139AData.templateC.plcConnection}),
//             ...(CCO_139AData.templateC.otherControllerNotes && { lubeType: CCO_139AData.templateC.otherControllerNotes}),
//             ...(CCO_139AData.templateC.templateC_UnitType && { lubeType: CCO_139AData.templateC.templateC_UnitType}),
//             templateC_InvertedA: CCO_139AData.templateC.templateC_InvertedA,
//             templateC_InvertedB: CCO_139AData.templateC.templateC_InvertedB,
//             templateC_InvertedE: CCO_139AData.templateC.templateC_InvertedE,
//             templateC_InvertedS: CCO_139AData.templateC.templateC_InvertedS,
//         },

//             wheelsOnPowerChain: CCO_139AData.wheelsOnPowerChain,


//             templateDData: 
//             {
//                 conveyorName: CCO_139AData.templateD.conveyorName,
//                 wheelManufacturer: CCO_139AData.templateD.wheelManufacturer,
//                 ...(CCO_139AData.templateD.otherWheelManufacturer && { otherWheelManufacturer: CCO_139AData.templateD.otherWheelManufacturer }),
//                 conveyorLength: CCO_139AData.templateD.conveyorLength,
//                 conveyorLengthUnit: CCO_139AData.templateD.conveyorLengthUnit,
//                 chainSize: CCO_139AData.templateD.chainSize,
//                 ...(CCO_139AData.templateD.otherChainSize && { otherChainSize: CCO_139AData.templateD.otherChainSize }),
//                 industrialChainManufacturer: CCO_139AData.templateD.industrialChainManufacturer,
//                 ...(CCO_139AData.templateD.otherChainManufacturer && { otherChainManufacturer: CCO_139AData.templateD.otherChainManufacturer }),
//                 conveyorSpeed: CCO_139AData.templateD.conveyorSpeed,
//                 conveyorSpeedUnit: CCO_139AData.templateD.conveyorSpeedUnit,
//                 conveyorIndex: CCO_139AData.templateD.conveyorIndex,
//                 appEnviroment: CCO_139AData.templateD.appEnviroment,
//                 ...(CCO_139AData.templateD.otherAppEnviroment && { otherAppEnviroment: CCO_139AData.templateD.otherAppEnviroment }),
//                 surroundingTemp: CCO_139AData.templateD.surroundingTemp,
//                 orientationType: CCO_139AData.templateD.orientationType,
//                 ...(CCO_139AData.templateD.conveyorLoaded && { conveyorLoaded: CCO_139AData.templateD.conveyorLoaded }),
//                 conveyorSwing: CCO_139AData.templateD.conveyorSwing,
//                 operatingVoltage: CCO_139AData.templateD.operatingVoltage,
//                 controlVoltSingle: CCO_139AData.templateD.controlVoltSingle,
//                 compressedAir: CCO_139AData.templateD.compressedAir,
//                 ...(CCO_139AData.templateD.airSupplyType && { airSupplyType: CCO_139AData.templateD.airSupplyType }),

//                 templateA_DData: 
//                 {
//                     existingMonitor: CCO_139AData.templateA.existingMonitor,
//                     newMonitor: CCO_139AData.templateA.newMonitor,		
//                     ...(CCO_139AData.templateA.dcuStatus && { dcuStatus: CCO_139AData.templateA.dcuStatus }),
//                     ...(CCO_139AData.templateA.dcuNum && { dcuNum: CCO_139AData.templateA.dcuNum }),
//                     ...(CCO_139AData.templateA.existingWindows && { existingWindows: CCO_139AData.templateA.existingWindows }),
//                     ...(CCO_139AData.templateA.existingHeadUnit && { existingHeadUnit: CCO_139AData.templateA.existingHeadUnit }),
//                     ...(CCO_139AData.templateA.existingDCU && { existingDCU: CCO_139AData.templateA.existingDCU }),
//                     ...(CCO_139AData.templateA.existingPowerInterface && { existingPowerInterface: CCO_139AData.templateA.existingPowerInterface }),
//                     ...(CCO_139AData.templateA.newReservoir && { newReservoir: CCO_139AData.templateA.newReservoir }),
//                     ...(CCO_139AData.templateA.reservoirSize && { reservoirSize: CCO_139AData.templateA.reservoirSize }),
//                     ...(CCO_139AData.templateA.otherReservoirSize && { otherReservoirSize: CCO_139AData.templateA.otherReservoirSize }),
//                     ...(CCO_139AData.templateA.newReservoirNum && { newReservoirNum: CCO_139AData.templateA.newReservoirNum }),
//                     ...(CCO_139AData.templateA.typeMonitor && { typeMonitor: CCO_139AData.templateA.typeMonitor }),
//                     ...(CCO_139AData.templateA.driveMotorAmp && { driveMotorAmp: CCO_139AData.templateA.driveMotorAmp }),
//                     ...(CCO_139AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_139AData.templateA.driveMotorAmpNum }),
//                     ...(CCO_139AData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_139AData.templateA.driveTakeUpAir }),
//                     ...(CCO_139AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_139AData.templateA.driveTakeUpAirNum }),
//                     ...(CCO_139AData.templateA.takeUpDistance && { takeUpDistance: CCO_139AData.templateA.takeUpDistance }),
//                     ...(CCO_139AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_139AData.templateA.takeUpDistanceNum }),
//                     ...(CCO_139AData.templateA.driveTemp && { driveTemp: CCO_139AData.templateA.driveTemp }),
//                     ...(CCO_139AData.templateA.driveTempNum && { driveTempNum: CCO_139AData.templateA.driveTempNum }),
//                     ...(CCO_139AData.templateA.driveVibration && { driveVibration: CCO_139AData.templateA.driveVibration }),
//                     ...(CCO_139AData.templateA.driveVibrationNum && { driveVibrationNum: CCO_139AData.templateA.driveVibrationNum }),
//                     ...(CCO_139AData.templateA.dogPitch && { dogPitch: CCO_139AData.templateA.dogPitch }),
//                     ...(CCO_139AData.templateA.dogPitchNum && { dogPitchNum: CCO_139AData.templateA.dogPitchNum }),
//                     ...(CCO_139AData.templateA.paintMarker && { paintMarker: CCO_139AData.templateA.paintMarker }),
//                     ...(CCO_139AData.templateA.paintMarkerNum && { paintMarkerNum: CCO_139AData.templateA.paintMarkerNum }),
//                     ...(CCO_139AData.templateA.chainVision && { chainVision: CCO_139AData.templateA.chainVision }),
//                     ...(CCO_139AData.templateA.lubeVision && { lubeVision: CCO_139AData.templateA.lubeVision }),
//                     ...(CCO_139AData.templateA.trolleyVision && { trolleyVision: CCO_139AData.templateA.trolleyVision }),
//                     ...(CCO_139AData.templateA.trolleyDetect && { trolleyDetect: CCO_139AData.templateA.trolleyDetect }),
//                     ...(CCO_139AData.templateA.omniView && { omniView: CCO_139AData.templateA.omniView }),
//                     ...(CCO_139AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_139AData.templateA.dcuUpgradeNum }),
//                     ...(CCO_139AData.templateA.piuDistance && { piuDistance: CCO_139AData.templateA.piuDistance }),
//                     ...(CCO_139AData.templateA.switchDistance && { switchDistance: CCO_139AData.templateA.switchDistance }),
//                     ...(CCO_139AData.templateA.ampPickup && { ampPickup: CCO_139AData.templateA.ampPickup }),
//                     ...(CCO_139AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_139AData.templateA.fromAirTakeUpDistance }),
//                     ...(CCO_139AData.templateA.specialControllerOptions && { specialControllerOptions: CCO_139AData.templateA.specialControllerOptions }),
//                     ...(CCO_139AData.templateA.operatingVoltage && { operatingVoltage: CCO_139AData.templateA.operatingVoltage })
//                 },

//                     lubeBrand: CCO_139AData.templateD.lubeBrand,
//                     currentGrease: CCO_139AData.templateD.currentGrease,
//                     currentGreaseGrade: CCO_139AData.templateD.currentGreaseGrade,
//                     wheelDiameter: CCO_139AData.templateD.wheelDiameter,
//                     ...(CCO_139AData.templateD.chainMaster && { chainMaster: CCO_139AData.templateD.chainMaster }),
//                     ...(CCO_139AData.templateD.remoteStatus && { remoteStatus: CCO_139AData.templateD.remoteStatus }),
//                     ...(CCO_139AData.templateD.mountStatus && { mountStatus: CCO_139AData.templateD.mountStatus }),
//                     ...(CCO_139AData.templateD.otherUnitStatus && { otherUnitStatus: CCO_139AData.templateD.otherUnitStatus }),
//                     ...(CCO_139AData.templateD.timerStatus && { timerStatus: CCO_139AData.templateD.timerStatus }),
//                     ...(CCO_139AData.templateD.electricStatus && { electricStatus: CCO_139AData.templateD.electricStatus }),
//                     ...(CCO_139AData.templateD.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_139AData.templateD.mightyLubeMonitoring }),
//                     ...(CCO_139AData.templateD.preMountType && { preMountType: CCO_139AData.templateD.preMountType }),
//                     ...(CCO_139AData.templateD.otherControllerNotes && { otherControllerNotes: CCO_139AData.templateD.otherControllerNotes }),


//             },


//             templateFData: 
//             {
//                 conveyorName: CCO_139AData.templateF.conveyorName,
//                 chainSize: CCO_139AData.templateF.chainSize,
//                 ...(CCO_139AData.templateF.otherChainSize && { otherChainSize: CCO_139AData.templateF.otherChainSize }),
//                 industrialChainManufacturer: CCO_139AData.templateF.industrialChainManufacturer,
//                 ...(CCO_139AData.templateF.otherChainManufacturer && { otherChainManufacturer: CCO_139AData.templateF.otherChainManufacturer }),
//                 wheelManufacturer: CCO_139AData.templateF.wheelManufacturer,
//                 ...(CCO_139AData.templateF.otherWheelManufacturer && { otherWheelManufacturer: CCO_139AData.templateF.otherWheelManufacturer }),
//                 conveyorLength: CCO_139AData.templateF.conveyorLength,
//                 conveyorLengthUnit: CCO_139AData.templateF.conveyorLengthUnit,
//                 brushApplicators: CCO_139AData.templateF.brushApplicators,
//                 m12Plugs: CCO_139AData.templateF.m12Plugs,
//                 oilStatus: CCO_139AData.templateF.oilStatus,
//                 operatingVoltage: CCO_139AData.templateF.operatingVoltage,
//                 controlVoltSingle: CCO_139AData.templateF.controlVoltSingle,
//             },
 
//             ...(CCO_139AData.railLubeStatus && { railLubeStatus: CCO_139AData.railLubeStatus }),
//             ...(CCO_139AData.lubeBrand && { lubeBrand: CCO_139AData.lubeBrand }),
//             ...(CCO_139AData.lubeType && { lubeType: CCO_139AData.lubeType }),
//             ...(CCO_139AData.lubeViscosity && { lubeViscosity: CCO_139AData.lubeViscosity }),
//             ...(CCO_139AData.sideLubeStatus && { sideLubeStatus: CCO_139AData.sideLubeStatus }),
//             ...(CCO_139AData.topLubeStatus && { topLubeStatus: CCO_139AData.topLubeStatus }),
//             ...(CCO_139AData.chainCleanStatus && { chainCleanStatus: CCO_139AData.chainCleanStatus }),
//             ...(CCO_139AData.chainMaster && { chainMaster: CCO_139AData.chainMaster }),
//             ...(CCO_139AData.otherUnitStatus && { otherUnitStatus: CCO_139AData.otherUnitStatus }),
//             ...(CCO_139AData.timerStatus && { timerStatus: CCO_139AData.timerStatus }),
//                 electricStatus: CCO_139AData.electricStatus,
//             ...(CCO_139AData.pneumaticStatus && { pneumaticStatus: CCO_139AData.pneumaticStatus }),
//             ...(CCO_139AData.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_139AData.mightyLubeMonitoring }),
//             ...(CCO_139AData.plcConnection && { plcConnection: CCO_139AData.plcConnection }),
//             ...(CCO_139AData.otherControllerNotes && { otherControllerNotes: CCO_139AData.otherControllerNotes }),
//             ...(CCO_139AData.ohpUnitType && { ohpUnitType: CCO_139AData.ohpUnitType }),
//             ...(CCO_139AData.ccoG && { ccoG: CCO_139AData.ccoG }),
//             ...(CCO_139AData.ccoH && { ccoH: CCO_139AData.ccoH }),
//             ...(CCO_139AData.ccoK && { ccoK: CCO_139AData.ccoK }),
//             ...(CCO_139AData.ccoA && { ccoA: CCO_139AData.ccoA }),
//             ...(CCO_139AData.ccoB && { ccoB: CCO_139AData.ccoB }),
//             ...(CCO_139AData.ccoIG && { ccoIG: CCO_139AData.ccoIG }),
//             ...(CCO_139AData.ccoIH && { ccoIH: CCO_139AData.ccoIH }),
//             ...(CCO_139AData.ccoIK && { ccoIK: CCO_139AData.ccoIK }),
//             ...(CCO_139AData.ccoL && { ccoL: CCO_139AData.ccoL }),
//         });
//         req.user.cart.push({
//             numRequested,
//             productConfigurationInfo: order,
//             productType: "CCO_139A"
//         });
//         await req.user.save();
//         return res.status(200).json({ message: "CCO_139A entry added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;


/**
 * CCO_139A Route (POST)
 * --------------------
 * Frontend sends payload like:
 * {
 *   "CCO_139AData": { ...form data... },
 *   "numRequested": 1
 * }
 *
 * authenticate middleware:
 * - validates Bearer token
 * - loads user from DB
 * - attaches user to req.user
 *
 * Flow:
 * 1) Read req.body.CCO_139AData (JSON from frontend)
 * 2) Convert JSON -> Mongoose document: new CCO_139A({...})
 * 3) Push that document in req.user.cart (embedded)
 * 4) Save user => MongoDB write happens
 *
 * ✅ Update done here:
 * - Added optional technicianNote (trim + save only if non-empty)
 * - Added safe fallbacks for template objects (avoid crash if templateA/B/C/D/F missing)
 * - Fixed few WRONG mappings in monitorData (your code was using CCO_139AData.dcuStatus etc by mistake)
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (unused here, safe to remove)
const { authenticate } = require("./sessions");
const CCO_139A = require("../models/CCO_139A");
const templateA = require("../models/templateA"); // (unused here, safe to remove)
const templateB = require("../models/templateB"); // (unused here, safe to remove)
const templateC = require("../models/templateC"); // (unused here, safe to remove)
const templateD = require("../models/templateD.js"); // (unused here, safe to remove)
const templateF = require("../models/templateF.js"); // (unused here, safe to remove)

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    // ✅ Frontend request body
    const { CCO_139AData, numRequested } = req.body;

    // ✅ Safety: prevent "Cannot read properties of undefined"
    const tA = CCO_139AData?.templateA || {};
    const tB = CCO_139AData?.templateB || {};
    const tC = CCO_139AData?.templateC || {};
    const tD = CCO_139AData?.templateD || {};
    const tF = CCO_139AData?.templateF || {};

    // ✅ Convert frontend JSON -> Mongoose document
    const order = new CCO_139A({
      // -------------------------
      // Main CCO_139A fields
      // -------------------------
      conveyorName: CCO_139AData.conveyorName,

      chainSize: CCO_139AData.chainSize,
      ...(CCO_139AData.otherChainSize && {
        otherChainSize: CCO_139AData.otherChainSize,
      }),

      industrialChainManufacturer: CCO_139AData.industrialChainManufacturer,
      ...(CCO_139AData.otherChainManufacturer && {
        otherChainManufacturer: CCO_139AData.otherChainManufacturer,
      }),

      wheelManufacturer: CCO_139AData.wheelManufacturer,
      ...(CCO_139AData.otherWheelManufacturer && {
        otherWheelManufacturer: CCO_139AData.otherWheelManufacturer,
      }),

      conveyorLength: CCO_139AData.conveyorLength,
      conveyorLengthUnit: CCO_139AData.conveyorLengthUnit,
      conveyorSpeed: CCO_139AData.conveyorSpeed,
      conveyorSpeedUnit: CCO_139AData.conveyorSpeedUnit,
      conveyorIndex: CCO_139AData.conveyorIndex,

      ...(CCO_139AData.travelDirection && {
        travelDirection: CCO_139AData.travelDirection,
      }),

      appEnviroment: CCO_139AData.appEnviroment,
      ...(CCO_139AData.ovenStatus && { ovenStatus: CCO_139AData.ovenStatus }),
      ...(CCO_139AData.ovenTemp && { ovenTemp: CCO_139AData.ovenTemp }),
      ...(CCO_139AData.otherAppEnviroment && {
        otherAppEnviroment: CCO_139AData.otherAppEnviroment,
      }),

      strandStatus: CCO_139AData.strandStatus,
      pointsOfLube: CCO_139AData.pointsOfLube,
      sensingMethod: CCO_139AData.sensingMethod,

      ...(CCO_139AData.surroundingTemp && {
        surroundingTemp: CCO_139AData.surroundingTemp,
      }),
      ...(CCO_139AData.conveyorLoaded && {
        conveyorLoaded: CCO_139AData.conveyorLoaded,
      }),
      ...(CCO_139AData.conveyorSwing && {
        conveyorSwing: CCO_139AData.conveyorSwing,
      }),
      ...(CCO_139AData.compressedAir && {
        compressedAir: CCO_139AData.compressedAir,
      }),
      ...(CCO_139AData.airSupplyType && {
        airSupplyType: CCO_139AData.airSupplyType,
      }),

      operatingVoltSingle: CCO_139AData.operatingVoltSingle,
      controlVoltSingle: CCO_139AData.controlVoltSingle,

      /**
       * ✅ NEW: technicianNote (optional)
       * Frontend should send: CCO_139AData.technicianNote
       * We store only if non-empty after trim.
       */
      ...(CCO_139AData.technicianNote &&
        CCO_139AData.technicianNote.trim() && {
          technicianNote: CCO_139AData.technicianNote.trim(),
        }),

      // -------------------------
      // Template A (monitorData)
      // -------------------------
      // IMPORTANT FIX:
      // In your original code you were accidentally mapping some fields like:
      // { dcuStatus: CCO_139AData.dcuStatus } ❌
      // It must be:
      // { dcuStatus: CCO_139AData.templateA.dcuStatus } ✅
      monitorData: {
        existingMonitor: tA.existingMonitor,
        newMonitor: tA.newMonitor,

        ...(tA.dcuStatus && { dcuStatus: tA.dcuStatus }),
        ...(tA.dcuNum && { dcuNum: tA.dcuNum }),
        ...(tA.existingWindows && { existingWindows: tA.existingWindows }),
        ...(tA.existingHeadUnit && { existingHeadUnit: tA.existingHeadUnit }),
        ...(tA.existingDCU && { existingDCU: tA.existingDCU }),
        ...(tA.existingPowerInterface && {
          existingPowerInterface: tA.existingPowerInterface,
        }),
        ...(tA.newReservoir && { newReservoir: tA.newReservoir }),
        ...(tA.reservoirSize && { reservoirSize: tA.reservoirSize }),
        ...(tA.otherReservoirSize && { otherReservoirSize: tA.otherReservoirSize }),
        ...(tA.newReservoirNum && { newReservoirNum: tA.newReservoirNum }),
        ...(tA.typeMonitor && { typeMonitor: tA.typeMonitor }),
        ...(tA.driveMotorAmp && { driveMotorAmp: tA.driveMotorAmp }),
        ...(tA.driveMotorAmpNum && { driveMotorAmpNum: tA.driveMotorAmpNum }),
        ...(tA.driveTakeUpAir && { driveTakeUpAir: tA.driveTakeUpAir }),
        ...(tA.driveTakeUpAirNum && { driveTakeUpAirNum: tA.driveTakeUpAirNum }),
        ...(tA.takeUpDistance && { takeUpDistance: tA.takeUpDistance }),
        ...(tA.takeUpDistanceNum && { takeUpDistanceNum: tA.takeUpDistanceNum }),
        ...(tA.driveTemp && { driveTemp: tA.driveTemp }),
        ...(tA.driveTempNum && { driveTempNum: tA.driveTempNum }),
        ...(tA.driveVibration && { driveVibration: tA.driveVibration }),
        ...(tA.driveVibrationNum && { driveVibrationNum: tA.driveVibrationNum }),
        ...(tA.dogPitch && { dogPitch: tA.dogPitch }),
        ...(tA.dogPitchNum && { dogPitchNum: tA.dogPitchNum }),
        ...(tA.paintMarker && { paintMarker: tA.paintMarker }),
        ...(tA.paintMarkerNum && { paintMarkerNum: tA.paintMarkerNum }),
        ...(tA.chainVision && { chainVision: tA.chainVision }),
        ...(tA.lubeVision && { lubeVision: tA.lubeVision }),
        ...(tA.trolleyVision && { trolleyVision: tA.trolleyVision }),
        ...(tA.trolleyDetect && { trolleyDetect: tA.trolleyDetect }),
        ...(tA.omniView && { omniView: tA.omniView }),
        ...(tA.dcuUpgradeNum && { dcuUpgradeNum: tA.dcuUpgradeNum }),
        ...(tA.piuDistance && { piuDistance: tA.piuDistance }),
        ...(tA.switchDistance && { switchDistance: tA.switchDistance }),
        ...(tA.ampPickup && { ampPickup: tA.ampPickup }),
        ...(tA.fromAirTakeUpDistance && {
          fromAirTakeUpDistance: tA.fromAirTakeUpDistance,
        }),
        ...(tA.specialControllerOptions && {
          specialControllerOptions: tA.specialControllerOptions,
        }),
        ...(tA.operatingVoltage && { operatingVoltage: tA.operatingVoltage }),
      },

      // -------------------------
      // Remaining original fields
      // -------------------------
      addFreeCarrier: CCO_139AData.addFreeCarrier,

      // ========= Template B =========
      templateBData: {
        conveyorName: tB.conveyorName,
        industrialChainManufacturer: tB.industrialChainManufacturer,
        ...(tB.otherChainManufacturer && { otherChainManufacturer: tB.otherChainManufacturer }),

        wheelManufacturer: tB.wheelManufacturer,

        conveyorSpeed: tB.conveyorSpeed,
        conveyorSpeedUnit: tB.conveyorSpeedUnit,
        conveyorIndex: tB.conveyorIndex,
        ...(tB.travelDirection && { travelDirection: tB.travelDirection }),

        appEnviroment: tB.appEnviroment,
        ...(tB.otherAppEnviroment && { otherAppEnviroment: tB.otherAppEnviroment }),

        surroundingTemp: tB.surroundingTemp,
        orientationType: tB.orientationType,
        operatingVoltage: tB.operatingVoltage,
        controlVoltSingle: tB.controlVoltSingle,

        compressedAir: tB.compressedAir,
        ...(tB.airSupplyType && { airSupplyType: tB.airSupplyType }),

        // Reuse templateA inside B
        templateA_BData: {
          existingMonitor: tA.existingMonitor,
          newMonitor: tA.newMonitor,

          ...(tA.dcuStatus && { dcuStatus: tA.dcuStatus }),
          ...(tA.dcuNum && { dcuNum: tA.dcuNum }),
          ...(tA.existingWindows && { existingWindows: tA.existingWindows }),
          ...(tA.existingHeadUnit && { existingHeadUnit: tA.existingHeadUnit }),
          ...(tA.existingDCU && { existingDCU: tA.existingDCU }),
          ...(tA.existingPowerInterface && {
            existingPowerInterface: tA.existingPowerInterface,
          }),
          ...(tA.newReservoir && { newReservoir: tA.newReservoir }),
          ...(tA.reservoirSize && { reservoirSize: tA.reservoirSize }),
          ...(tA.otherReservoirSize && { otherReservoirSize: tA.otherReservoirSize }),
          ...(tA.newReservoirNum && { newReservoirNum: tA.newReservoirNum }),
          ...(tA.typeMonitor && { typeMonitor: tA.typeMonitor }),
          ...(tA.driveMotorAmp && { driveMotorAmp: tA.driveMotorAmp }),
          ...(tA.driveMotorAmpNum && { driveMotorAmpNum: tA.driveMotorAmpNum }),
          ...(tA.driveTakeUpAir && { driveTakeUpAir: tA.driveTakeUpAir }),
          ...(tA.driveTakeUpAirNum && { driveTakeUpAirNum: tA.driveTakeUpAirNum }),
          ...(tA.takeUpDistance && { takeUpDistance: tA.takeUpDistance }),
          ...(tA.takeUpDistanceNum && { takeUpDistanceNum: tA.takeUpDistanceNum }),
          ...(tA.driveTemp && { driveTemp: tA.driveTemp }),
          ...(tA.driveTempNum && { driveTempNum: tA.driveTempNum }),
          ...(tA.driveVibration && { driveVibration: tA.driveVibration }),
          ...(tA.driveVibrationNum && { driveVibrationNum: tA.driveVibrationNum }),
          ...(tA.dogPitch && { dogPitch: tA.dogPitch }),
          ...(tA.dogPitchNum && { dogPitchNum: tA.dogPitchNum }),
          ...(tA.paintMarker && { paintMarker: tA.paintMarker }),
          ...(tA.paintMarkerNum && { paintMarkerNum: tA.paintMarkerNum }),
          ...(tA.chainVision && { chainVision: tA.chainVision }),
          ...(tA.lubeVision && { lubeVision: tA.lubeVision }),
          ...(tA.trolleyVision && { trolleyVision: tA.trolleyVision }),
          ...(tA.trolleyDetect && { trolleyDetect: tA.trolleyDetect }),
          ...(tA.omniView && { omniView: tA.omniView }),
          ...(tA.dcuUpgradeNum && { dcuUpgradeNum: tA.dcuUpgradeNum }),
          ...(tA.piuDistance && { piuDistance: tA.piuDistance }),
          ...(tA.switchDistance && { switchDistance: tA.switchDistance }),
          ...(tA.ampPickup && { ampPickup: tA.ampPickup }),
          ...(tA.fromAirTakeUpDistance && {
            fromAirTakeUpDistance: tA.fromAirTakeUpDistance,
          }),
          ...(tA.specialControllerOptions && {
            specialControllerOptions: tA.specialControllerOptions,
          }),
          ...(tA.operatingVoltage && { operatingVoltage: tA.operatingVoltage }),
        },

        freeWheelStatus: tB.freeWheelStatus,
        actuatorStatus: tB.actuatorStatus,
        ...(tB.pivotStatus && { pivotStatus: tB.pivotStatus }),
        kingPinStatus: tB.kingPinStatus,
        lubeBrand: tB.lubeBrand,
        lubeViscosity: tB.lubeViscosity,
        ...(tB.lubeType && { lubeType: tB.lubeType }),
        currentGrease: tB.currentGrease,
        currentGreaseGrade: tB.currentGreaseGrade,
        zerkDirection: tB.zerkDirection,
        zerkLocationType: tB.zerkLocationType,
        wheelDiameter: tB.wheelDiameter,
        conveyorSwing: tB.conveyorSwing,

        ...(tB.chainMaster && { chainMaster: tB.chainMaster }),
        ...(tB.remoteStatus && { remoteStatus: tB.remoteStatus }),
        ...(tB.mountStatus && { mountStatus: tB.mountStatus }),
        ...(tB.otherUnitStatus && { otherUnitStatus: tB.otherUnitStatus }),
        ...(tB.timerStatus && { timerStatus: tB.timerStatus }),
        ...(tB.electricStatus && { electricStatus: tB.electricStatus }),
        ...(tB.mightyLubeMonitoring && { mightyLubeMonitoring: tB.mightyLubeMonitoring }),
        ...(tB.preMountType && { preMountType: tB.preMountType }),
        ...(tB.otherPreMountType && { otherPreMountType: tB.otherPreMountType }),
        ...(tB.plcConnection && { plcConnection: tB.plcConnection }),
        ...(tB.otherControllerNotes && { otherControllerNotes: tB.otherControllerNotes }),

        ...(tB.templateB_UnitType && { templateB_UnitType: tB.templateB_UnitType }),
        ...(tB.templateB_InvertedB && { templateB_InvertedB: tB.templateB_InvertedB }),
        ...(tB.templateB_InvertedE && { templateB_InvertedE: tB.templateB_InvertedE }),
        ...(tB.templateB_InvertedG && { templateB_InvertedG: tB.templateB_InvertedG }),
        ...(tB.templateB_InvertedH && { templateB_InvertedH: tB.templateB_InvertedH }),
        ...(tB.templateB_InvertedK && { templateB_InvertedK: tB.templateB_InvertedK }),
        ...(tB.templateB_InvertedT && { templateB_InvertedT: tB.templateB_InvertedT }),
        ...(tB.templateB_InvertedU && { templateB_InvertedU: tB.templateB_InvertedU }),
        ...(tB.templateB_InvertedV && { templateB_InvertedV: tB.templateB_InvertedV }),
        ...(tB.templateB_InvertedW && { templateB_InvertedW: tB.templateB_InvertedW }),
      },

      // ========= Template C =========
      templateCData: {
        conveyorName: tC.conveyorName,
        industrialChainManufacturer: tC.industrialChainManufacturer,
        ...(tC.otherChainManufacturer && { otherChainManufacturer: tC.otherChainManufacturer }),

        wheelManufacturer: tC.wheelManufacturer,
        conveyorSpeed: tC.conveyorSpeed,
        conveyorSpeedUnit: tC.conveyorSpeedUnit,
        conveyorIndex: tC.conveyorIndex,
        ...(tC.travelDirection && { travelDirection: tC.travelDirection }),

        appEnviroment: tC.appEnviroment,
        ...(tC.otherAppEnviroment && { otherAppEnviroment: tC.otherAppEnviroment }),

        surroundingTemp: tC.surroundingTemp,
        orientationType: tC.orientationType,
        guideWheelsEven: tC.guideWheelsEven,
        operatingVoltage: tC.operatingVoltage,
        controlVoltSingle: tC.controlVoltSingle,

        compressedAir: tC.compressedAir,
        ...(tC.airSupplyType && { airSupplyType: tC.airSupplyType }),

        templateA_CData: {
          existingMonitor: tA.existingMonitor,
          newMonitor: tA.newMonitor,
          ...(tA.dcuStatus && { dcuStatus: tA.dcuStatus }),
          ...(tA.dcuNum && { dcuNum: tA.dcuNum }),
          ...(tA.existingWindows && { existingWindows: tA.existingWindows }),
          ...(tA.existingHeadUnit && { existingHeadUnit: tA.existingHeadUnit }),
          ...(tA.existingDCU && { existingDCU: tA.existingDCU }),
          ...(tA.existingPowerInterface && {
            existingPowerInterface: tA.existingPowerInterface,
          }),
          ...(tA.newReservoir && { newReservoir: tA.newReservoir }),
          ...(tA.reservoirSize && { reservoirSize: tA.reservoirSize }),
          ...(tA.otherReservoirSize && { otherReservoirSize: tA.otherReservoirSize }),
          ...(tA.newReservoirNum && { newReservoirNum: tA.newReservoirNum }),
          ...(tA.typeMonitor && { typeMonitor: tA.typeMonitor }),
          ...(tA.driveMotorAmp && { driveMotorAmp: tA.driveMotorAmp }),
          ...(tA.driveMotorAmpNum && { driveMotorAmpNum: tA.driveMotorAmpNum }),
          ...(tA.driveTakeUpAir && { driveTakeUpAir: tA.driveTakeUpAir }),
          ...(tA.driveTakeUpAirNum && { driveTakeUpAirNum: tA.driveTakeUpAirNum }),
          ...(tA.takeUpDistance && { takeUpDistance: tA.takeUpDistance }),
          ...(tA.takeUpDistanceNum && { takeUpDistanceNum: tA.takeUpDistanceNum }),
          ...(tA.driveTemp && { driveTemp: tA.driveTemp }),
          ...(tA.driveTempNum && { driveTempNum: tA.driveTempNum }),
          ...(tA.driveVibration && { driveVibration: tA.driveVibration }),
          ...(tA.driveVibrationNum && { driveVibrationNum: tA.driveVibrationNum }),
          ...(tA.dogPitch && { dogPitch: tA.dogPitch }),
          ...(tA.dogPitchNum && { dogPitchNum: tA.dogPitchNum }),
          ...(tA.paintMarker && { paintMarker: tA.paintMarker }),
          ...(tA.paintMarkerNum && { paintMarkerNum: tA.paintMarkerNum }),
          ...(tA.chainVision && { chainVision: tA.chainVision }),
          ...(tA.lubeVision && { lubeVision: tA.lubeVision }),
          ...(tA.trolleyVision && { trolleyVision: tA.trolleyVision }),
          ...(tA.trolleyDetect && { trolleyDetect: tA.trolleyDetect }),
          ...(tA.omniView && { omniView: tA.omniView }),
          ...(tA.dcuUpgradeNum && { dcuUpgradeNum: tA.dcuUpgradeNum }),
          ...(tA.piuDistance && { piuDistance: tA.piuDistance }),
          ...(tA.switchDistance && { switchDistance: tA.switchDistance }),
          ...(tA.ampPickup && { ampPickup: tA.ampPickup }),
          ...(tA.fromAirTakeUpDistance && {
            fromAirTakeUpDistance: tA.fromAirTakeUpDistance,
          }),
          ...(tA.specialControllerOptions && {
            specialControllerOptions: tA.specialControllerOptions,
          }),
          ...(tA.operatingVoltage && { operatingVoltage: tA.operatingVoltage }),
        },

        freeWheelStatus: tC.freeWheelStatus,
        actuatorStatus: tC.actuatorStatus,
        ...(tC.pivotStatus && { pivotStatus: tC.pivotStatus }),
        kingPinStatus: tC.kingPinStatus,
        lubeBrand: tC.lubeBrand,
        lubeViscosity: tC.lubeViscosity,
        ...(tC.lubeType && { lubeType: tC.lubeType }),
        currentGrease: tC.currentGrease,
        currentGreaseGrade: tC.currentGreaseGrade,
        zerkDirection: tC.zerkDirection,
        zerkLocationType: tC.zerkLocationType,
        wheelDiameter: tC.wheelDiameter,
        conveyorSwing: tC.conveyorSwing,

        // NOTE: Your original code had MANY wrong mappings like:
        // ...(tC.chainMaster && { lubeType: tC.chainMaster })
        // That looks like a bug. I kept your "intent" but corrected keys below.
        ...(tC.chainMaster && { chainMaster: tC.chainMaster }),
        ...(tC.remoteStatus && { remoteStatus: tC.remoteStatus }),
        ...(tC.mountStatus && { mountStatus: tC.mountStatus }),
        ...(tC.otherUnitStatus && { otherUnitStatus: tC.otherUnitStatus }),
        ...(tC.timerStatus && { timerStatus: tC.timerStatus }),
        ...(tC.electricStatus && { electricStatus: tC.electricStatus }),
        ...(tC.mightyLubeMonitoring && { mightyLubeMonitoring: tC.mightyLubeMonitoring }),
        ...(tC.preMountType && { preMountType: tC.preMountType }),
        ...(tC.otherPreMountType && { otherPreMountType: tC.otherPreMountType }),
        ...(tC.plcConnection && { plcConnection: tC.plcConnection }),
        ...(tC.otherControllerNotes && { otherControllerNotes: tC.otherControllerNotes }),
        ...(tC.templateC_UnitType && { templateC_UnitType: tC.templateC_UnitType }),

        templateC_InvertedA: tC.templateC_InvertedA,
        templateC_InvertedB: tC.templateC_InvertedB,
        templateC_InvertedE: tC.templateC_InvertedE,
        templateC_InvertedS: tC.templateC_InvertedS,
      },

      wheelsOnPowerChain: CCO_139AData.wheelsOnPowerChain,

      // ========= Template D =========
      templateDData: {
        conveyorName: tD.conveyorName,
        wheelManufacturer: tD.wheelManufacturer,
        ...(tD.otherWheelManufacturer && { otherWheelManufacturer: tD.otherWheelManufacturer }),

        conveyorLength: tD.conveyorLength,
        conveyorLengthUnit: tD.conveyorLengthUnit,

        chainSize: tD.chainSize,
        ...(tD.otherChainSize && { otherChainSize: tD.otherChainSize }),

        industrialChainManufacturer: tD.industrialChainManufacturer,
        ...(tD.otherChainManufacturer && { otherChainManufacturer: tD.otherChainManufacturer }),

        conveyorSpeed: tD.conveyorSpeed,
        conveyorSpeedUnit: tD.conveyorSpeedUnit,
        conveyorIndex: tD.conveyorIndex,

        appEnviroment: tD.appEnviroment,
        ...(tD.otherAppEnviroment && { otherAppEnviroment: tD.otherAppEnviroment }),

        surroundingTemp: tD.surroundingTemp,
        orientationType: tD.orientationType,

        ...(tD.conveyorLoaded && { conveyorLoaded: tD.conveyorLoaded }),
        conveyorSwing: tD.conveyorSwing,

        operatingVoltage: tD.operatingVoltage,
        controlVoltSingle: tD.controlVoltSingle,

        compressedAir: tD.compressedAir,
        ...(tD.airSupplyType && { airSupplyType: tD.airSupplyType }),

        templateA_DData: {
          existingMonitor: tA.existingMonitor,
          newMonitor: tA.newMonitor,
          ...(tA.dcuStatus && { dcuStatus: tA.dcuStatus }),
          ...(tA.dcuNum && { dcuNum: tA.dcuNum }),
          ...(tA.existingWindows && { existingWindows: tA.existingWindows }),
          ...(tA.existingHeadUnit && { existingHeadUnit: tA.existingHeadUnit }),
          ...(tA.existingDCU && { existingDCU: tA.existingDCU }),
          ...(tA.existingPowerInterface && {
            existingPowerInterface: tA.existingPowerInterface,
          }),
          ...(tA.newReservoir && { newReservoir: tA.newReservoir }),
          ...(tA.reservoirSize && { reservoirSize: tA.reservoirSize }),
          ...(tA.otherReservoirSize && { otherReservoirSize: tA.otherReservoirSize }),
          ...(tA.newReservoirNum && { newReservoirNum: tA.newReservoirNum }),
          ...(tA.typeMonitor && { typeMonitor: tA.typeMonitor }),
          ...(tA.driveMotorAmp && { driveMotorAmp: tA.driveMotorAmp }),
          ...(tA.driveMotorAmpNum && { driveMotorAmpNum: tA.driveMotorAmpNum }),
          ...(tA.driveTakeUpAir && { driveTakeUpAir: tA.driveTakeUpAir }),
          ...(tA.driveTakeUpAirNum && { driveTakeUpAirNum: tA.driveTakeUpAirNum }),
          ...(tA.takeUpDistance && { takeUpDistance: tA.takeUpDistance }),
          ...(tA.takeUpDistanceNum && { takeUpDistanceNum: tA.takeUpDistanceNum }),
          ...(tA.driveTemp && { driveTemp: tA.driveTemp }),
          ...(tA.driveTempNum && { driveTempNum: tA.driveTempNum }),
          ...(tA.driveVibration && { driveVibration: tA.driveVibration }),
          ...(tA.driveVibrationNum && { driveVibrationNum: tA.driveVibrationNum }),
          ...(tA.dogPitch && { dogPitch: tA.dogPitch }),
          ...(tA.dogPitchNum && { dogPitchNum: tA.dogPitchNum }),
          ...(tA.paintMarker && { paintMarker: tA.paintMarker }),
          ...(tA.paintMarkerNum && { paintMarkerNum: tA.paintMarkerNum }),
          ...(tA.chainVision && { chainVision: tA.chainVision }),
          ...(tA.lubeVision && { lubeVision: tA.lubeVision }),
          ...(tA.trolleyVision && { trolleyVision: tA.trolleyVision }),
          ...(tA.trolleyDetect && { trolleyDetect: tA.trolleyDetect }),
          ...(tA.omniView && { omniView: tA.omniView }),
          ...(tA.dcuUpgradeNum && { dcuUpgradeNum: tA.dcuUpgradeNum }),
          ...(tA.piuDistance && { piuDistance: tA.piuDistance }),
          ...(tA.switchDistance && { switchDistance: tA.switchDistance }),
          ...(tA.ampPickup && { ampPickup: tA.ampPickup }),
          ...(tA.fromAirTakeUpDistance && {
            fromAirTakeUpDistance: tA.fromAirTakeUpDistance,
          }),
          ...(tA.specialControllerOptions && {
            specialControllerOptions: tA.specialControllerOptions,
          }),
          ...(tA.operatingVoltage && { operatingVoltage: tA.operatingVoltage }),
        },

        lubeBrand: tD.lubeBrand,
        currentGrease: tD.currentGrease,
        currentGreaseGrade: tD.currentGreaseGrade,
        wheelDiameter: tD.wheelDiameter,

        ...(tD.chainMaster && { chainMaster: tD.chainMaster }),
        ...(tD.remoteStatus && { remoteStatus: tD.remoteStatus }),
        ...(tD.mountStatus && { mountStatus: tD.mountStatus }),
        ...(tD.otherUnitStatus && { otherUnitStatus: tD.otherUnitStatus }),
        ...(tD.timerStatus && { timerStatus: tD.timerStatus }),
        ...(tD.electricStatus && { electricStatus: tD.electricStatus }),
        ...(tD.mightyLubeMonitoring && { mightyLubeMonitoring: tD.mightyLubeMonitoring }),
        ...(tD.preMountType && { preMountType: tD.preMountType }),
        ...(tD.otherControllerNotes && { otherControllerNotes: tD.otherControllerNotes }),
      },

      // ========= Template F =========
      templateFData: {
        conveyorName: tF.conveyorName,

        chainSize: tF.chainSize,
        ...(tF.otherChainSize && { otherChainSize: tF.otherChainSize }),

        industrialChainManufacturer: tF.industrialChainManufacturer,
        ...(tF.otherChainManufacturer && { otherChainManufacturer: tF.otherChainManufacturer }),

        wheelManufacturer: tF.wheelManufacturer,
        ...(tF.otherWheelManufacturer && { otherWheelManufacturer: tF.otherWheelManufacturer }),

        conveyorLength: tF.conveyorLength,
        conveyorLengthUnit: tF.conveyorLengthUnit,

        brushApplicators: tF.brushApplicators,
        m12Plugs: tF.m12Plugs,
        oilStatus: tF.oilStatus,

        operatingVoltage: tF.operatingVoltage,
        controlVoltSingle: tF.controlVoltSingle,
      },

      // -------------------------
      // Remaining original fields
      // -------------------------
      ...(CCO_139AData.railLubeStatus && { railLubeStatus: CCO_139AData.railLubeStatus }),
      ...(CCO_139AData.lubeBrand && { lubeBrand: CCO_139AData.lubeBrand }),
      ...(CCO_139AData.lubeType && { lubeType: CCO_139AData.lubeType }),
      ...(CCO_139AData.lubeViscosity && { lubeViscosity: CCO_139AData.lubeViscosity }),
      ...(CCO_139AData.sideLubeStatus && { sideLubeStatus: CCO_139AData.sideLubeStatus }),
      ...(CCO_139AData.topLubeStatus && { topLubeStatus: CCO_139AData.topLubeStatus }),
      ...(CCO_139AData.chainCleanStatus && { chainCleanStatus: CCO_139AData.chainCleanStatus }),
      ...(CCO_139AData.chainMaster && { chainMaster: CCO_139AData.chainMaster }),
      ...(CCO_139AData.otherUnitStatus && { otherUnitStatus: CCO_139AData.otherUnitStatus }),
      ...(CCO_139AData.timerStatus && { timerStatus: CCO_139AData.timerStatus }),

      // electricStatus is not optional in your original code
      electricStatus: CCO_139AData.electricStatus,

      ...(CCO_139AData.pneumaticStatus && { pneumaticStatus: CCO_139AData.pneumaticStatus }),
      ...(CCO_139AData.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_139AData.mightyLubeMonitoring }),
      ...(CCO_139AData.plcConnection && { plcConnection: CCO_139AData.plcConnection }),
      ...(CCO_139AData.otherControllerNotes && { otherControllerNotes: CCO_139AData.otherControllerNotes }),
      ...(CCO_139AData.ohpUnitType && { ohpUnitType: CCO_139AData.ohpUnitType }),
      ...(CCO_139AData.ccoG && { ccoG: CCO_139AData.ccoG }),
      ...(CCO_139AData.ccoH && { ccoH: CCO_139AData.ccoH }),
      ...(CCO_139AData.ccoK && { ccoK: CCO_139AData.ccoK }),
      ...(CCO_139AData.ccoA && { ccoA: CCO_139AData.ccoA }),
      ...(CCO_139AData.ccoB && { ccoB: CCO_139AData.ccoB }),
      ...(CCO_139AData.ccoIG && { ccoIG: CCO_139AData.ccoIG }),
      ...(CCO_139AData.ccoIH && { ccoIH: CCO_139AData.ccoIH }),
      ...(CCO_139AData.ccoIK && { ccoIK: CCO_139AData.ccoIK }),
      ...(CCO_139AData.ccoL && { ccoL: CCO_139AData.ccoL }),
    });

    // ✅ Save inside authenticated user's cart
    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "CCO_139A",
    });

    // ✅ Persist to MongoDB
    await req.user.save();

    return res.status(200).json({ message: "CCO_139A entry added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
