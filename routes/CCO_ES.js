// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const CCO_ES = require("../models/CCO_ES");
// const templateA = require("../models/templateA");
// const templateB = require("../models/templateB");
// const templateC = require("../models/templateC");
// const templateD = require("../models/templateD.js");
// const templateF = require("../models/templateF.js");
 
// const router = express.Router();

// router.post("/", authenticate, async (req, res) => {
//     try {
//         const { CCO_ESData, numRequested } = req.body;
//         const order = new CCO_ES({
//             conveyorName: CCO_ESData.conveyorName,
//             chainSize: CCO_ESData.chainSize,
//             ...(CCO_ESData.otherChainSize && { otherChainSize: CCO_ESData.otherChainSize }),
//             industrialChainManufacturer: CCO_ESData.industrialChainManufacturer,
//             ...(CCO_ESData.otherChainManufacturer && { otherChainManufacturer: CCO_ESData.otherChainManufacturer }),
//             wheelManufacturer: CCO_ESData.wheelManufacturer,
//             ...(CCO_ESData.otherWheelManufacturer && { otherWheelManufacturer: CCO_ESData.otherWheelManufacturer }),
//             conveyorLength: CCO_ESData.conveyorLength,
//             conveyorLengthUnit: CCO_ESData.conveyorLengthUnit,
//             conveyorSpeed: CCO_ESData.conveyorSpeed,
//             conveyorSpeedUnit: CCO_ESData.conveyorSpeedUnit,
//             conveyorIndex: CCO_ESData.conveyorIndex,
//             ...(CCO_ESData.travelDirection && { travelDirection: CCO_ESData.travelDirection }),
//             appEnviroment: CCO_ESData.appEnviroment,
//             ...(CCO_ESData.ovenStatus && { ovenStatus: CCO_ESData.ovenStatus }),
//             ...(CCO_ESData.ovenTemp && { ovenTemp: CCO_ESData.ovenTemp }),
//             ...(CCO_ESData.otherAppEnviroment && { otherAppEnviroment: CCO_ESData.otherAppEnviroment }),
//             ...(CCO_ESData.surroundingTemp && { surroundingTemp: CCO_ESData.surroundingTemp }),
//             ...(CCO_ESData.conveyorLoaded && { conveyorLoaded: CCO_ESData.conveyorLoaded }),
//             ...(CCO_ESData.conveyorSwing && { conveyorSwing: CCO_ESData.conveyorSwing }),
//             strandStatus: CCO_ESData.strandStatus,
//             openBearings: CCO_ESData.openBearings,
//             lubeStatus: CCO_ESData.lubeStatus,
//             pointsOfLube: CCO_ESData.pointsOfLube,
//             m12Plugs: CCO_ESData.m12Plugs,
//             op201Controller: CCO_ESData.op201Controller,
//             op201Order: CCO_ESData.op201Order,
//             operatingVoltSingle: CCO_ESData.operatingVoltSingle,
//             controlVoltSingle: CCO_ESData.controlVoltSingle,
//             monitorData: 
//             {
//                 existingMonitor: CCO_ESData.templateA.existingMonitor,
//                 newMonitor: CCO_ESData.templateA.newMonitor,		
//                 ...(CCO_ESData.templateA.dcuStatus && { dcuStatus: CCO_ESData.templateA.dcuStatus }),
//                 ...(CCO_ESData.templateA.dcuNum && { dcuNum: CCO_ESData.templateA.dcuNum }),
//                 ...(CCO_ESData.templateA.existingWindows && { existingWindows: CCO_ESData.templateA.existingWindows }),
//                 ...(CCO_ESData.templateA.existingHeadUnit && { existingHeadUnit: CCO_ESData.templateA.existingHeadUnit }),
//                 ...(CCO_ESData.templateA.existingDCU && { existingDCU: CCO_ESData.templateA.existingDCU }),
//                 ...(CCO_ESData.templateA.existingPowerInterface && { existingPowerInterface: CCO_ESData.templateA.existingPowerInterface }),
//                 ...(CCO_ESData.templateA.newReservoir && { newReservoir: CCO_ESData.templateA.newReservoir }),
//                 ...(CCO_ESData.templateA.reservoirSize && { reservoirSize: CCO_ESData.templateA.reservoirSize }),
//                 ...(CCO_ESData.templateA.otherReservoirSize && { otherReservoirSize: CCO_ESData.templateA.otherReservoirSize }),
//                 ...(CCO_ESData.templateA.newReservoirNum && { newReservoirNum: CCO_ESData.templateA.newReservoirNum }),
//                 ...(CCO_ESData.templateA.typeMonitor && { typeMonitor: CCO_ESData.templateA.typeMonitor }),
//                 ...(CCO_ESData.templateA.driveMotorAmp && { driveMotorAmp: CCO_ESData.templateA.driveMotorAmp }),
//                 ...(CCO_ESData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_ESData.templateA.driveMotorAmpNum }),
//                 ...(CCO_ESData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_ESData.templateA.driveTakeUpAir }),
//                 ...(CCO_ESData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_ESData.templateA.driveTakeUpAirNum }),
//                 ...(CCO_ESData.templateA.takeUpDistance && { takeUpDistance: CCO_ESData.templateA.takeUpDistance }),
//                 ...(CCO_ESData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_ESData.templateA.takeUpDistanceNum }),
//                 ...(CCO_ESData.templateA.driveTemp && { driveTemp: CCO_ESData.templateA.driveTemp }),
//                 ...(CCO_ESData.templateA.driveTempNum && { driveTempNum: CCO_ESData.templateA.driveTempNum }),
//                 ...(CCO_ESData.templateA.driveVibration && { driveVibration: CCO_ESData.templateA.driveVibration }),
//                 ...(CCO_ESData.templateA.driveVibrationNum && { driveVibrationNum: CCO_ESData.templateA.driveVibrationNum }),
//                 ...(CCO_ESData.templateA.dogPitch && { dogPitch: CCO_ESData.templateA.dogPitch }),
//                 ...(CCO_ESData.templateA.dogPitchNum && { dogPitchNum: CCO_ESData.templateA.dogPitchNum }),
//                 ...(CCO_ESData.templateA.paintMarker && { paintMarker: CCO_ESData.templateA.paintMarker }),
//                 ...(CCO_ESData.templateA.paintMarkerNum && { paintMarkerNum: CCO_ESData.templateA.paintMarkerNum }),
//                 ...(CCO_ESData.templateA.chainVision && { chainVision: CCO_ESData.templateA.chainVision }),
//                 ...(CCO_ESData.templateA.lubeVision && { lubeVision: CCO_ESData.templateA.lubeVision }),
//                 ...(CCO_ESData.templateA.trolleyVision && { trolleyVision: CCO_ESData.templateA.trolleyVision }),
//                 ...(CCO_ESData.templateA.trolleyDetect && { trolleyDetect: CCO_ESData.templateA.trolleyDetect }),
//                 ...(CCO_ESData.templateA.omniView && { omniView: CCO_ESData.templateA.omniView }),
//                 ...(CCO_ESData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_ESData.templateA.dcuUpgradeNum }),
//                 ...(CCO_ESData.templateA.piuDistance && { piuDistance: CCO_ESData.templateA.piuDistance }),
//                 ...(CCO_ESData.templateA.switchDistance && { switchDistance: CCO_ESData.templateA.switchDistance }),
//                 ...(CCO_ESData.templateA.ampPickup && { ampPickup: CCO_ESData.templateA.ampPickup }),
//                 ...(CCO_ESData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_ESData.templateA.fromAirTakeUpDistance }),
//                 ...(CCO_ESData.templateA.specialControllerOptions && { specialControllerOptions: CCO_ESData.templateA.specialControllerOptions }),
//                 ...(CCO_ESData.templateA.operatingVoltage && { operatingVoltage: CCO_ESData.templateA.operatingVoltage })
//             },

//             addFreeCarrier: CCO_ESData.addFreeCarrier,

//             templateBData: 
//             {
                
//                 conveyorName: CCO_ESData.templateB.conveyorName,
//                 industrialChainManufacturer: CCO_ESData.templateB.industrialChainManufacturer,
//                 ...(CCO_ESData.templateB.otherChainManufacturer && { otherChainManufacturer: CCO_ESData.templateB.otherChainManufacturer }),
//                 wheelManufacturer: CCO_ESData.templateB.wheelManufacturer,
//                 ...(CCO_ESData.templateB.wheelManufacturer && { wheelManufacturer: CCO_ESData.templateB.wheelManufacturer}),
//                 conveyorSpeed: CCO_ESData.templateB.conveyorSpeed,
//                 conveyorSpeedUnit: CCO_ESData.templateB.conveyorSpeedUnit,
//                 conveyorIndex: CCO_ESData.templateB.conveyorIndex,
//                 ...(CCO_ESData.templateB.travelDirection && { travelDirection: CCO_ESData.templateB.travelDirection}),
//                 appEnviroment: CCO_ESData.templateB.appEnviroment,
//                 ...(CCO_ESData.templateB.otherAppEnviroment && { otherAppEnviroment: CCO_ESData.templateB.otherAppEnviroment}),
//                 surroundingTemp: CCO_ESData.templateB.surroundingTemp,
//                 orientationType: CCO_ESData.templateB.orientationType,
//                 operatingVoltage: CCO_ESData.templateB.operatingVoltage,
//                 controlVoltSingle: CCO_ESData.templateB.controlVoltSingle,
//                 compressedAir: CCO_ESData.templateB.compressedAir,
//                 ...(CCO_ESData.templateB.airSupplyType && { airSupplyType: CCO_ESData.templateB.airSupplyType}),

//                 templateA_BData: {
                    
//                     existingMonitor: CCO_ESData.templateA.existingMonitor,
//                     newMonitor: CCO_ESData.templateA.newMonitor,		
//                     ...(CCO_ESData.templateA.dcuStatus && { dcuStatus: CCO_ESData.templateA.dcuStatus }),
//                     ...(CCO_ESData.templateA.dcuNum && { dcuNum: CCO_ESData.templateA.dcuNum }),
//                     ...(CCO_ESData.templateA.existingWindows && { existingWindows: CCO_ESData.templateA.existingWindows }),
//                     ...(CCO_ESData.templateA.existingHeadUnit && { existingHeadUnit: CCO_ESData.templateA.existingHeadUnit }),
//                     ...(CCO_ESData.templateA.existingDCU && { existingDCU: CCO_ESData.templateA.existingDCU }),
//                     ...(CCO_ESData.templateA.existingPowerInterface && { existingPowerInterface: CCO_ESData.templateA.existingPowerInterface }),
//                     ...(CCO_ESData.templateA.newReservoir && { newReservoir: CCO_ESData.templateA.newReservoir }),
//                     ...(CCO_ESData.templateA.reservoirSize && { reservoirSize: CCO_ESData.templateA.reservoirSize }),
//                     ...(CCO_ESData.templateA.otherReservoirSize && { otherReservoirSize: CCO_ESData.templateA.otherReservoirSize }),
//                     ...(CCO_ESData.templateA.newReservoirNum && { newReservoirNum: CCO_ESData.templateA.newReservoirNum }),
//                     ...(CCO_ESData.templateA.typeMonitor && { typeMonitor: CCO_ESData.templateA.typeMonitor }),
//                     ...(CCO_ESData.templateA.driveMotorAmp && { driveMotorAmp: CCO_ESData.templateA.driveMotorAmp }),
//                     ...(CCO_ESData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_ESData.templateA.driveMotorAmpNum }),
//                     ...(CCO_ESData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_ESData.templateA.driveTakeUpAir }),
//                     ...(CCO_ESData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_ESData.templateA.driveTakeUpAirNum }),
//                     ...(CCO_ESData.templateA.takeUpDistance && { takeUpDistance: CCO_ESData.templateA.takeUpDistance }),
//                     ...(CCO_ESData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_ESData.templateA.takeUpDistanceNum }),
//                     ...(CCO_ESData.templateA.driveTemp && { driveTemp: CCO_ESData.templateA.driveTemp }),
//                     ...(CCO_ESData.templateA.driveTempNum && { driveTempNum: CCO_ESData.templateA.driveTempNum }),
//                     ...(CCO_ESData.templateA.driveVibration && { driveVibration: CCO_ESData.templateA.driveVibration }),
//                     ...(CCO_ESData.templateA.driveVibrationNum && { driveVibrationNum: CCO_ESData.templateA.driveVibrationNum }),
//                     ...(CCO_ESData.templateA.dogPitch && { dogPitch: CCO_ESData.templateA.dogPitch }),
//                     ...(CCO_ESData.templateA.dogPitchNum && { dogPitchNum: CCO_ESData.templateA.dogPitchNum }),
//                     ...(CCO_ESData.templateA.paintMarker && { paintMarker: CCO_ESData.templateA.paintMarker }),
//                     ...(CCO_ESData.templateA.paintMarkerNum && { paintMarkerNum: CCO_ESData.templateA.paintMarkerNum }),
//                     ...(CCO_ESData.templateA.chainVision && { chainVision: CCO_ESData.templateA.chainVision }),
//                     ...(CCO_ESData.templateA.lubeVision && { lubeVision: CCO_ESData.templateA.lubeVision }),
//                     ...(CCO_ESData.templateA.trolleyVision && { trolleyVision: CCO_ESData.templateA.trolleyVision }),
//                     ...(CCO_ESData.templateA.trolleyDetect && { trolleyDetect: CCO_ESData.templateA.trolleyDetect }),
//                     ...(CCO_ESData.templateA.omniView && { omniView: CCO_ESData.templateA.omniView }),
//                     ...(CCO_ESData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_ESData.templateA.dcuUpgradeNum }),
//                     ...(CCO_ESData.templateA.piuDistance && { piuDistance: CCO_ESData.templateA.piuDistance }),
//                     ...(CCO_ESData.templateA.switchDistance && { switchDistance: CCO_ESData.templateA.switchDistance }),
//                     ...(CCO_ESData.templateA.ampPickup && { ampPickup: CCO_ESData.templateA.ampPickup }),
//                     ...(CCO_ESData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_ESData.templateA.fromAirTakeUpDistance }),
//                     ...(CCO_ESData.templateA.specialControllerOptions && { specialControllerOptions: CCO_ESData.templateA.specialControllerOptions }),
//                     ...(CCO_ESData.templateA.operatingVoltage && { operatingVoltage: CCO_ESData.templateA.operatingVoltage })

//                 },

//                 freeWheelStatus: CCO_ESData.templateB.freeWheelStatus,
//                 actuatorStatus: CCO_ESData.templateB.actuatorStatus,
//                 ...(CCO_ESData.templateB.pivotStatus && { pivotStatus: CCO_ESData.templateB.pivotStatus}),
//                 kingPinStatus: CCO_ESData.templateB.kingPinStatus,
//                 lubeBrand: CCO_ESData.templateB.lubeBrand,
//                 lubeViscosity: CCO_ESData.templateB.lubeViscosity,
//                 ...(CCO_ESData.templateB.lubeType && { lubeType: CCO_ESData.templateB.lubeType}),
//                 currentGrease: CCO_ESData.templateB.currentGrease,
//                 currentGreaseGrade: CCO_ESData.templateB.currentGreaseGrade,
//                 zerkDirection: CCO_ESData.templateB.zerkDirection,
//                 zerkLocationType: CCO_ESData.templateB.zerkLocationType,
//                 wheelDiameter: CCO_ESData.templateB.wheelDiameter,
//                 conveyorSwing: CCO_ESData.templateB.conveyorSwing,
//                 ...(CCO_ESData.templateB.chainMaster && { chainMaster: CCO_ESData.templateB.chainMaster}),
//                 ...(CCO_ESData.templateB.remoteStatus && { remoteStatus: CCO_ESData.templateB.remoteStatus}),
//                 ...(CCO_ESData.templateB.mountStatus && { mountStatus: CCO_ESData.templateB.mountStatus}),
//                 ...(CCO_ESData.templateB.otherUnitStatus && { otherUnitStatus: CCO_ESData.templateB.otherUnitStatus}),
//                 ...(CCO_ESData.templateB.timerStatus && { timerStatus: CCO_ESData.templateB.timerStatus}),
//                 ...(CCO_ESData.templateB.electricStatus && { electricStatus: CCO_ESData.templateB.electricStatus}),
//                 ...(CCO_ESData.templateB.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_ESData.templateB.mightyLubeMonitoring}),
//                 ...(CCO_ESData.templateB.preMountType && { preMountType: CCO_ESData.templateB.preMountType}),
//                 ...(CCO_ESData.templateB.otherPreMountType && { otherPreMountType: CCO_ESData.templateB.otherPreMountType}),
//                 ...(CCO_ESData.templateB.plcConnection && { plcConnection: CCO_ESData.templateB.plcConnection}),
//                 ...(CCO_ESData.templateB.otherControllerNotes && { otherControllerNotes: CCO_ESData.templateB.otherControllerNotes}),
//                 ...(CCO_ESData.templateB.templateB_UnitType && { templateB_UnitType: CCO_ESData.templateB.templateB_UnitType}),
//                 ...(CCO_ESData.templateB.templateB_InvertedB && { templateB_InvertedB: CCO_ESData.templateB.templateB_InvertedB}),
//                 ...(CCO_ESData.templateB.templateB_InvertedE && { templateB_InvertedE: CCO_ESData.templateB.templateB_InvertedE}),
//                 ...(CCO_ESData.templateB.templateB_InvertedG && { templateB_InvertedG: CCO_ESData.templateB.templateB_InvertedG}),
//                 ...(CCO_ESData.templateB.templateB_InvertedH && { templateB_InvertedH: CCO_ESData.templateB.templateB_InvertedH}),
//                 ...(CCO_ESData.templateB.templateB_InvertedK && { templateB_InvertedK: CCO_ESData.templateB.templateB_InvertedK}),
//                 ...(CCO_ESData.templateB.templateB_InvertedT && { templateB_InvertedT: CCO_ESData.templateB.templateB_InvertedT}),
//                 ...(CCO_ESData.templateB.templateB_InvertedU && { templateB_InvertedU: CCO_ESData.templateB.templateB_InvertedU}),
//                 ...(CCO_ESData.templateB.templateB_InvertedV && { templateB_InvertedV: CCO_ESData.templateB.templateB_InvertedV}),
//                 ...(CCO_ESData.templateB.templateB_InvertedW && { templateB_InvertedW: CCO_ESData.templateB.templateB_InvertedW}),

//             },



//             templateCData: 
//             {
//             conveyorName: CCO_ESData.templateC.conveyorName,
//             industrialChainManufacturer: CCO_ESData.templateC.industrialChainManufacturer,
//             ...(CCO_ESData.templateC.otherChainManufacturer && { otherChainManufacturer: CCO_ESData.templateC.otherChainManufacturer }),
//             wheelManufacturer: CCO_ESData.templateC.wheelManufacturer,
//             ...(CCO_ESData.templateC.wheelManufacturer && { wheelManufacturer: CCO_ESData.templateC.wheelManufacturer}),
//             conveyorSpeed: CCO_ESData.templateC.conveyorSpeed,
//             conveyorSpeedUnit: CCO_ESData.templateC.conveyorSpeedUnit,
//             conveyorIndex: CCO_ESData.templateC.conveyorIndex,
//             ...(CCO_ESData.templateC.travelDirection && { travelDirection: CCO_ESData.templateC.travelDirection}),
//             appEnviroment: CCO_ESData.templateC.appEnviroment,
//             ...(CCO_ESData.templateC.otherAppEnviroment && { otherAppEnviroment: CCO_ESData.templateC.otherAppEnviroment}),
//             surroundingTemp: CCO_ESData.templateC.surroundingTemp,
//             orientationType: CCO_ESData.templateC.orientationType,
//             guideWheelsEven: CCO_ESData.templateC.guideWheelsEven,
//             operatingVoltage: CCO_ESData.templateC.operatingVoltage,
//             controlVoltSingle: CCO_ESData.templateC.controlVoltSingle,
//             compressedAir: CCO_ESData.templateC.compressedAir,
//             ...(CCO_ESData.templateC.airSupplyType && { airSupplyType: CCO_ESData.templateC.airSupplyType}),

//             templateA_CData: 
//             {
//                 existingMonitor: CCO_ESData.templateA.existingMonitor,
//                 newMonitor: CCO_ESData.templateA.newMonitor,		
//                 ...(CCO_ESData.templateA.dcuStatus && { dcuStatus: CCO_ESData.templateA.dcuStatus }),
//                 ...(CCO_ESData.templateA.dcuNum && { dcuNum: CCO_ESData.templateA.dcuNum }),
//                 ...(CCO_ESData.templateA.existingWindows && { existingWindows: CCO_ESData.templateA.existingWindows }),
//                 ...(CCO_ESData.templateA.existingHeadUnit && { existingHeadUnit: CCO_ESData.templateA.existingHeadUnit }),
//                 ...(CCO_ESData.templateA.existingDCU && { existingDCU: CCO_ESData.templateA.existingDCU }),
//                 ...(CCO_ESData.templateA.existingPowerInterface && { existingPowerInterface: CCO_ESData.templateA.existingPowerInterface }),
//                 ...(CCO_ESData.templateA.newReservoir && { newReservoir: CCO_ESData.templateA.newReservoir }),
//                 ...(CCO_ESData.templateA.reservoirSize && { reservoirSize: CCO_ESData.templateA.reservoirSize }),
//                 ...(CCO_ESData.templateA.otherReservoirSize && { otherReservoirSize: CCO_ESData.templateA.otherReservoirSize }),
//                 ...(CCO_ESData.templateA.newReservoirNum && { newReservoirNum: CCO_ESData.templateA.newReservoirNum }),
//                 ...(CCO_ESData.templateA.typeMonitor && { typeMonitor: CCO_ESData.templateA.typeMonitor }),
//                 ...(CCO_ESData.templateA.driveMotorAmp && { driveMotorAmp: CCO_ESData.templateA.driveMotorAmp }),
//                 ...(CCO_ESData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_ESData.templateA.driveMotorAmpNum }),
//                 ...(CCO_ESData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_ESData.templateA.driveTakeUpAir }),
//                 ...(CCO_ESData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_ESData.templateA.driveTakeUpAirNum }),
//                 ...(CCO_ESData.templateA.takeUpDistance && { takeUpDistance: CCO_ESData.templateA.takeUpDistance }),
//                 ...(CCO_ESData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_ESData.templateA.takeUpDistanceNum }),
//                 ...(CCO_ESData.templateA.driveTemp && { driveTemp: CCO_ESData.templateA.driveTemp }),
//                 ...(CCO_ESData.templateA.driveTempNum && { driveTempNum: CCO_ESData.templateA.driveTempNum }),
//                 ...(CCO_ESData.templateA.driveVibration && { driveVibration: CCO_ESData.templateA.driveVibration }),
//                 ...(CCO_ESData.templateA.driveVibrationNum && { driveVibrationNum: CCO_ESData.templateA.driveVibrationNum }),
//                 ...(CCO_ESData.templateA.dogPitch && { dogPitch: CCO_ESData.templateA.dogPitch }),
//                 ...(CCO_ESData.templateA.dogPitchNum && { dogPitchNum: CCO_ESData.templateA.dogPitchNum }),
//                 ...(CCO_ESData.templateA.paintMarker && { paintMarker: CCO_ESData.templateA.paintMarker }),
//                 ...(CCO_ESData.templateA.paintMarkerNum && { paintMarkerNum: CCO_ESData.templateA.paintMarkerNum }),
//                 ...(CCO_ESData.templateA.chainVision && { chainVision: CCO_ESData.templateA.chainVision }),
//                 ...(CCO_ESData.templateA.lubeVision && { lubeVision: CCO_ESData.templateA.lubeVision }),
//                 ...(CCO_ESData.templateA.trolleyVision && { trolleyVision: CCO_ESData.templateA.trolleyVision }),
//                 ...(CCO_ESData.templateA.trolleyDetect && { trolleyDetect: CCO_ESData.templateA.trolleyDetect }),
//                 ...(CCO_ESData.templateA.omniView && { omniView: CCO_ESData.templateA.omniView }),
//                 ...(CCO_ESData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_ESData.templateA.dcuUpgradeNum }),
//                 ...(CCO_ESData.templateA.piuDistance && { piuDistance: CCO_ESData.templateA.piuDistance }),
//                 ...(CCO_ESData.templateA.switchDistance && { switchDistance: CCO_ESData.templateA.switchDistance }),
//                 ...(CCO_ESData.templateA.ampPickup && { ampPickup: CCO_ESData.templateA.ampPickup }),
//                 ...(CCO_ESData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_ESData.templateA.fromAirTakeUpDistance }),
//                 ...(CCO_ESData.templateA.specialControllerOptions && { specialControllerOptions: CCO_ESData.templateA.specialControllerOptions }),
//                 ...(CCO_ESData.templateA.operatingVoltage && { operatingVoltage: CCO_ESData.templateA.operatingVoltage })
//             },
            
//             freeWheelStatus: CCO_ESData.templateC.freeWheelStatus,
//             actuatorStatus: CCO_ESData.templateC.actuatorStatus,
//             ...(CCO_ESData.templateC.pivotStatus && { pivotStatus: CCO_ESData.templateC.pivotStatus}),
//             kingPinStatus: CCO_ESData.templateC.kingPinStatus,
//             lubeBrand: CCO_ESData.templateC.lubeBrand,
//             lubeViscosity: CCO_ESData.templateC.lubeViscosity,
//             ...(CCO_ESData.templateC.lubeType && { lubeType: CCO_ESData.templateC.lubeType}),
//             currentGrease: CCO_ESData.templateC.currentGrease,
//             currentGreaseGrade: CCO_ESData.templateC.currentGreaseGrade,
//             zerkDirection: CCO_ESData.templateC.zerkDirection,
//             zerkLocationType: CCO_ESData.templateC.zerkLocationType,
//             wheelDiameter: CCO_ESData.templateC.wheelDiameter,
//             conveyorSwing: CCO_ESData.templateC.conveyorSwing,
//             ...(CCO_ESData.templateC.chainMaster && { lubeType: CCO_ESData.templateC.chainMaster}),
//             ...(CCO_ESData.templateC.remoteStatus && { lubeType: CCO_ESData.templateC.remoteStatus}),
//             ...(CCO_ESData.templateC.mountStatus && { lubeType: CCO_ESData.templateC.mountStatus}),
//             ...(CCO_ESData.templateC.otherUnitStatus && { lubeType: CCO_ESData.templateC.otherUnitStatus}),
//             ...(CCO_ESData.templateC.timerStatus && { lubeType: CCO_ESData.templateC.timerStatus}),
//             ...(CCO_ESData.templateC.electricStatus && { lubeType: CCO_ESData.templateC.electricStatus}),
//             ...(CCO_ESData.templateC.mightyLubeMonitoring && { lubeType: CCO_ESData.templateC.mightyLubeMonitoring}),
//             ...(CCO_ESData.templateC.preMountType && { lubeType: CCO_ESData.templateC.preMountType}),
//             ...(CCO_ESData.templateC.otherPreMountType && { lubeType: CCO_ESData.templateC.otherPreMountType}),
//             ...(CCO_ESData.templateC.plcConnection && { lubeType: CCO_ESData.templateC.plcConnection}),
//             ...(CCO_ESData.templateC.otherControllerNotes && { lubeType: CCO_ESData.templateC.otherControllerNotes}),
//             ...(CCO_ESData.templateC.templateC_UnitType && { lubeType: CCO_ESData.templateC.templateC_UnitType}),
//             templateC_InvertedA: CCO_ESData.templateC.templateC_InvertedA,
//             templateC_InvertedB: CCO_ESData.templateC.templateC_InvertedB,
//             templateC_InvertedE: CCO_ESData.templateC.templateC_InvertedE,
//             templateC_InvertedS: CCO_ESData.templateC.templateC_InvertedS,
//         },
        
//             wheelsOnPowerChain: CCO_ESData.wheelsOnPowerChain,


//             templateDData: 
//             {
//                 conveyorName: CCO_ESData.templateD.conveyorName,
//                 wheelManufacturer: CCO_ESData.templateD.wheelManufacturer,
//                 ...(CCO_ESData.templateD.otherWheelManufacturer && { otherWheelManufacturer: CCO_ESData.templateD.otherWheelManufacturer }),
//                 conveyorLength: CCO_ESData.templateD.conveyorLength,
//                 conveyorLengthUnit: CCO_ESData.templateD.conveyorLengthUnit,
//                 chainSize: CCO_ESData.templateD.chainSize,
//                 ...(CCO_ESData.templateD.otherChainSize && { otherChainSize: CCO_ESData.templateD.otherChainSize }),
//                 industrialChainManufacturer: CCO_ESData.templateD.industrialChainManufacturer,
//                 ...(CCO_ESData.templateD.otherChainManufacturer && { otherChainManufacturer: CCO_ESData.templateD.otherChainManufacturer }),
//                 conveyorSpeed: CCO_ESData.templateD.conveyorSpeed,
//                 conveyorSpeedUnit: CCO_ESData.templateD.conveyorSpeedUnit,
//                 conveyorIndex: CCO_ESData.templateD.conveyorIndex,
//                 appEnviroment: CCO_ESData.templateD.appEnviroment,
//                 ...(CCO_ESData.templateD.otherAppEnviroment && { otherAppEnviroment: CCO_ESData.templateD.otherAppEnviroment }),
//                 surroundingTemp: CCO_ESData.templateD.surroundingTemp,
//                 orientationType: CCO_ESData.templateD.orientationType,
//                 ...(CCO_ESData.templateD.conveyorLoaded && { conveyorLoaded: CCO_ESData.templateD.conveyorLoaded }),
//                 conveyorSwing: CCO_ESData.templateD.conveyorSwing,
//                 operatingVoltage: CCO_ESData.templateD.operatingVoltage,
//                 controlVoltSingle: CCO_ESData.templateD.controlVoltSingle,
//                 compressedAir: CCO_ESData.templateD.compressedAir,
//                 ...(CCO_ESData.templateD.airSupplyType && { airSupplyType: CCO_ESData.templateD.airSupplyType }),

//                 templateA_DData: 
//                 {
//                     existingMonitor: CCO_ESData.templateA.existingMonitor,
//                     newMonitor: CCO_ESData.templateA.newMonitor,		
//                     ...(CCO_ESData.templateA.dcuStatus && { dcuStatus: CCO_ESData.templateA.dcuStatus }),
//                     ...(CCO_ESData.templateA.dcuNum && { dcuNum: CCO_ESData.templateA.dcuNum }),
//                     ...(CCO_ESData.templateA.existingWindows && { existingWindows: CCO_ESData.templateA.existingWindows }),
//                     ...(CCO_ESData.templateA.existingHeadUnit && { existingHeadUnit: CCO_ESData.templateA.existingHeadUnit }),
//                     ...(CCO_ESData.templateA.existingDCU && { existingDCU: CCO_ESData.templateA.existingDCU }),
//                     ...(CCO_ESData.templateA.existingPowerInterface && { existingPowerInterface: CCO_ESData.templateA.existingPowerInterface }),
//                     ...(CCO_ESData.templateA.newReservoir && { newReservoir: CCO_ESData.templateA.newReservoir }),
//                     ...(CCO_ESData.templateA.reservoirSize && { reservoirSize: CCO_ESData.templateA.reservoirSize }),
//                     ...(CCO_ESData.templateA.otherReservoirSize && { otherReservoirSize: CCO_ESData.templateA.otherReservoirSize }),
//                     ...(CCO_ESData.templateA.newReservoirNum && { newReservoirNum: CCO_ESData.templateA.newReservoirNum }),
//                     ...(CCO_ESData.templateA.typeMonitor && { typeMonitor: CCO_ESData.templateA.typeMonitor }),
//                     ...(CCO_ESData.templateA.driveMotorAmp && { driveMotorAmp: CCO_ESData.templateA.driveMotorAmp }),
//                     ...(CCO_ESData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CCO_ESData.templateA.driveMotorAmpNum }),
//                     ...(CCO_ESData.templateA.driveTakeUpAir && { driveTakeUpAir: CCO_ESData.templateA.driveTakeUpAir }),
//                     ...(CCO_ESData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CCO_ESData.templateA.driveTakeUpAirNum }),
//                     ...(CCO_ESData.templateA.takeUpDistance && { takeUpDistance: CCO_ESData.templateA.takeUpDistance }),
//                     ...(CCO_ESData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CCO_ESData.templateA.takeUpDistanceNum }),
//                     ...(CCO_ESData.templateA.driveTemp && { driveTemp: CCO_ESData.templateA.driveTemp }),
//                     ...(CCO_ESData.templateA.driveTempNum && { driveTempNum: CCO_ESData.templateA.driveTempNum }),
//                     ...(CCO_ESData.templateA.driveVibration && { driveVibration: CCO_ESData.templateA.driveVibration }),
//                     ...(CCO_ESData.templateA.driveVibrationNum && { driveVibrationNum: CCO_ESData.templateA.driveVibrationNum }),
//                     ...(CCO_ESData.templateA.dogPitch && { dogPitch: CCO_ESData.templateA.dogPitch }),
//                     ...(CCO_ESData.templateA.dogPitchNum && { dogPitchNum: CCO_ESData.templateA.dogPitchNum }),
//                     ...(CCO_ESData.templateA.paintMarker && { paintMarker: CCO_ESData.templateA.paintMarker }),
//                     ...(CCO_ESData.templateA.paintMarkerNum && { paintMarkerNum: CCO_ESData.templateA.paintMarkerNum }),
//                     ...(CCO_ESData.templateA.chainVision && { chainVision: CCO_ESData.templateA.chainVision }),
//                     ...(CCO_ESData.templateA.lubeVision && { lubeVision: CCO_ESData.templateA.lubeVision }),
//                     ...(CCO_ESData.templateA.trolleyVision && { trolleyVision: CCO_ESData.templateA.trolleyVision }),
//                     ...(CCO_ESData.templateA.trolleyDetect && { trolleyDetect: CCO_ESData.templateA.trolleyDetect }),
//                     ...(CCO_ESData.templateA.omniView && { omniView: CCO_ESData.templateA.omniView }),
//                     ...(CCO_ESData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CCO_ESData.templateA.dcuUpgradeNum }),
//                     ...(CCO_ESData.templateA.piuDistance && { piuDistance: CCO_ESData.templateA.piuDistance }),
//                     ...(CCO_ESData.templateA.switchDistance && { switchDistance: CCO_ESData.templateA.switchDistance }),
//                     ...(CCO_ESData.templateA.ampPickup && { ampPickup: CCO_ESData.templateA.ampPickup }),
//                     ...(CCO_ESData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CCO_ESData.templateA.fromAirTakeUpDistance }),
//                     ...(CCO_ESData.templateA.specialControllerOptions && { specialControllerOptions: CCO_ESData.templateA.specialControllerOptions }),
//                     ...(CCO_ESData.templateA.operatingVoltage && { operatingVoltage: CCO_ESData.templateA.operatingVoltage })
//                 },

//                     lubeBrand: CCO_ESData.templateD.lubeBrand,
//                     currentGrease: CCO_ESData.templateD.currentGrease,
//                     currentGreaseGrade: CCO_ESData.templateD.currentGreaseGrade,
//                     wheelDiameter: CCO_ESData.templateD.wheelDiameter,
//                     ...(CCO_ESData.templateD.chainMaster && { chainMaster: CCO_ESData.templateD.chainMaster }),
//                     ...(CCO_ESData.templateD.remoteStatus && { remoteStatus: CCO_ESData.templateD.remoteStatus }),
//                     ...(CCO_ESData.templateD.mountStatus && { mountStatus: CCO_ESData.templateD.mountStatus }),
//                     ...(CCO_ESData.templateD.otherUnitStatus && { otherUnitStatus: CCO_ESData.templateD.otherUnitStatus }),
//                     ...(CCO_ESData.templateD.timerStatus && { timerStatus: CCO_ESData.templateD.timerStatus }),
//                     ...(CCO_ESData.templateD.electricStatus && { electricStatus: CCO_ESData.templateD.electricStatus }),
//                     ...(CCO_ESData.templateD.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_ESData.templateD.mightyLubeMonitoring }),
//                     ...(CCO_ESData.templateD.preMountType && { preMountType: CCO_ESData.templateD.preMountType }),
//                     ...(CCO_ESData.templateD.otherControllerNotes && { otherControllerNotes: CCO_ESData.templateD.otherControllerNotes }),


//             },


//             templateFData: 
//             {
//                 conveyorName: CCO_ESData.templateF.conveyorName,
//                 chainSize: CCO_ESData.templateF.chainSize,
//                 ...(CCO_ESData.templateF.otherChainSize && { otherChainSize: CCO_ESData.templateF.otherChainSize }),
//                 industrialChainManufacturer: CCO_ESData.templateF.industrialChainManufacturer,
//                 ...(CCO_ESData.templateF.otherChainManufacturer && { otherChainManufacturer: CCO_ESData.templateF.otherChainManufacturer }),
//                 wheelManufacturer: CCO_ESData.templateF.wheelManufacturer,
//                 ...(CCO_ESData.templateF.otherWheelManufacturer && { otherWheelManufacturer: CCO_ESData.templateF.otherWheelManufacturer }),
//                 conveyorLength: CCO_ESData.templateF.conveyorLength,
//                 conveyorLengthUnit: CCO_ESData.templateF.conveyorLengthUnit,
//                 brushApplicators: CCO_ESData.templateF.brushApplicators,
//                 m12Plugs: CCO_ESData.templateF.m12Plugs,
//                 oilStatus: CCO_ESData.templateF.oilStatus,
//                 operatingVoltage: CCO_ESData.templateF.operatingVoltage,
//                 controlVoltSingle: CCO_ESData.templateF.controlVoltSingle,
//             },
            

//             ...(CCO_ESData.wheelOpenType && { wheelOpenType: CCO_ESData.wheelOpenType }),
//             ...(CCO_ESData.wheelClosedType && { wheelClosedType: CCO_ESData.wheelClosedType }),
//             ...(CCO_ESData.openStatus && { openStatus: CCO_ESData.openStatus }),
//             ...(CCO_ESData.freeWheelStatus && { freeWheelStatus: CCO_ESData.freeWheelStatus }),
//             ...(CCO_ESData.guideRollerStatus && { guideRollerStatus: CCO_ESData.guideRollerStatus }),
//             ...(CCO_ESData.openRaceStyleType && { openRaceStyleType: CCO_ESData.openRaceStyleType }),
//             ...(CCO_ESData.closedRaceStyleType && { closedRaceStyleType: CCO_ESData.closedRaceStyleType }),
//             ...(CCO_ESData.holeStatus && { holeStatus: CCO_ESData.holeStatus }),
//             ...(CCO_ESData.actuatorStatus && { actuatorStatus: CCO_ESData.actuatorStatus }),
//             ...(CCO_ESData.pivotStatus && { pivotStatus: CCO_ESData.pivotStatus }),
//             ...(CCO_ESData.kingPinStatus && { kingPinStatus: CCO_ESData.kingPinStatus }),
//             ...(CCO_ESData.railLubeStatus && { railLubeStatus: CCO_ESData.railLubeStatus }),
//             ...(CCO_ESData.externalLubeStatus && { externalLubeStatus: CCO_ESData.externalLubeStatus }),
//             ...(CCO_ESData.lubeBrand && { lubeBrand: CCO_ESData.lubeBrand }),
//             ...(CCO_ESData.lubeType && { lubeType: CCO_ESData.lubeType }),
//             ...(CCO_ESData.lubeViscosity && { lubeViscosity: CCO_ESData.lubeViscosity }),
//             ...(CCO_ESData.sideLubeStatus && { sideLubeStatus: CCO_ESData.sideLubeStatus }),
//             ...(CCO_ESData.topLubeStatus && { topLubeStatus: CCO_ESData.topLubeStatus }),
//             ...(CCO_ESData.chainMaster && { chainMaster: CCO_ESData.chainMaster }),
//             ...(CCO_ESData.timerStatus && { timerStatus: CCO_ESData.timerStatus }),
//             ...(CCO_ESData.electricStatus && { electricStatus: CCO_ESData.electricStatus }),
//             ...(CCO_ESData.pneumaticStatus && { pneumaticStatus: CCO_ESData.pneumaticStatus }),
//             ...(CCO_ESData.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_ESData.mightyLubeMonitoring }),
//             ...(CCO_ESData.plcConnection && { plcConnection: CCO_ESData.plcConnection }),
//             ...(CCO_ESData.otherControllerNotes && { otherControllerNotes: CCO_ESData.otherControllerNotes }),
//             ...(CCO_ESData.ohpUnitType && { ohpUnitType: CCO_ESData.ohpUnitType }),
//             ...(CCO_ESData.ccoG && { ccoG: CCO_ESData.ccoG }),
//             ...(CCO_ESData.ccoH && { ccoH: CCO_ESData.ccoH }),
//             ...(CCO_ESData.ccoK && { ccoK: CCO_ESData.ccoK }),
//             ...(CCO_ESData.ccoA && { ccoA: CCO_ESData.ccoA }),
//             ...(CCO_ESData.ccoB && { ccoB: CCO_ESData.ccoB }),
//             ...(CCO_ESData.ccoIG && { ccoIG: CCO_ESData.ccoIG }),
//             ...(CCO_ESData.ccoIH && { ccoIH: CCO_ESData.ccoIH }),
//             ...(CCO_ESData.ccoIK && { ccoIK: CCO_ESData.ccoIK }),
//             ...(CCO_ESData.ccoL && { ccoL: CCO_ESData.ccoL }),

//         });
//         req.user.cart.push({
//             numRequested,
//             productConfigurationInfo: order,
//             productType: "CCO_ES"
//         });
//         await req.user.save();
//         return res.status(200).json({ message: "CCO_ES entry added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;


/**
 * CCO_ES Route (POST)
 * -------------------
 * ✅ Update done:
 * 1) Added optional technicianNote (trim + save only if non-empty)
 * 2) Added safe template fallbacks (so route won't crash if templateA/B/C/D/F missing)
 * 3) Fixed wrong mappings in templateCData where you were assigning many fields into `lubeType` by mistake
 *
 * NOTE:
 * - Ensure your CCO_ES mongoose schema includes:
 *   technicianNote: { type: String, required: false }
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (unused here, safe to remove)
const { authenticate } = require("./sessions");
const CCO_ES = require("../models/CCO_ES");
const templateA = require("../models/templateA"); // (unused here, safe to remove)
const templateB = require("../models/templateB"); // (unused here, safe to remove)
const templateC = require("../models/templateC"); // (unused here, safe to remove)
const templateD = require("../models/templateD.js"); // (unused here, safe to remove)
const templateF = require("../models/templateF.js"); // (unused here, safe to remove)

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    // ✅ Frontend payload
    const { CCO_ESData, numRequested } = req.body;

    // ✅ Safety: avoid "Cannot read properties of undefined"
    const tA = CCO_ESData?.templateA || {};
    const tB = CCO_ESData?.templateB || {};
    const tC = CCO_ESData?.templateC || {};
    const tD = CCO_ESData?.templateD || {};
    const tF = CCO_ESData?.templateF || {};

    // ✅ Create order (Mongoose doc)
    const order = new CCO_ES({
      // -------------------------
      // Main CCO_ES fields
      // -------------------------
      conveyorName: CCO_ESData.conveyorName,

      chainSize: CCO_ESData.chainSize,
      ...(CCO_ESData.otherChainSize && { otherChainSize: CCO_ESData.otherChainSize }),

      industrialChainManufacturer: CCO_ESData.industrialChainManufacturer,
      ...(CCO_ESData.otherChainManufacturer && {
        otherChainManufacturer: CCO_ESData.otherChainManufacturer,
      }),

      wheelManufacturer: CCO_ESData.wheelManufacturer,
      ...(CCO_ESData.otherWheelManufacturer && {
        otherWheelManufacturer: CCO_ESData.otherWheelManufacturer,
      }),

      conveyorLength: CCO_ESData.conveyorLength,
      conveyorLengthUnit: CCO_ESData.conveyorLengthUnit,
      conveyorSpeed: CCO_ESData.conveyorSpeed,
      conveyorSpeedUnit: CCO_ESData.conveyorSpeedUnit,
      conveyorIndex: CCO_ESData.conveyorIndex,

      ...(CCO_ESData.travelDirection && { travelDirection: CCO_ESData.travelDirection }),

      appEnviroment: CCO_ESData.appEnviroment,
      ...(CCO_ESData.ovenStatus && { ovenStatus: CCO_ESData.ovenStatus }),
      ...(CCO_ESData.ovenTemp && { ovenTemp: CCO_ESData.ovenTemp }),
      ...(CCO_ESData.otherAppEnviroment && { otherAppEnviroment: CCO_ESData.otherAppEnviroment }),

      ...(CCO_ESData.surroundingTemp && { surroundingTemp: CCO_ESData.surroundingTemp }),
      ...(CCO_ESData.conveyorLoaded && { conveyorLoaded: CCO_ESData.conveyorLoaded }),
      ...(CCO_ESData.conveyorSwing && { conveyorSwing: CCO_ESData.conveyorSwing }),

      strandStatus: CCO_ESData.strandStatus,
      openBearings: CCO_ESData.openBearings,
      lubeStatus: CCO_ESData.lubeStatus,
      pointsOfLube: CCO_ESData.pointsOfLube,

      m12Plugs: CCO_ESData.m12Plugs,
      op201Controller: CCO_ESData.op201Controller,
      op201Order: CCO_ESData.op201Order,

      operatingVoltSingle: CCO_ESData.operatingVoltSingle,
      controlVoltSingle: CCO_ESData.controlVoltSingle,

      /**
       * ✅ NEW: technicianNote (optional)
       * Frontend should send: CCO_ESData.technicianNote
       */
      ...(CCO_ESData.technicianNote &&
        CCO_ESData.technicianNote.trim() && {
          technicianNote: CCO_ESData.technicianNote.trim(),
        }),

      // -------------------------
      // Template A (monitorData)
      // -------------------------
      monitorData: {
        existingMonitor: tA.existingMonitor,
        newMonitor: tA.newMonitor,

        ...(tA.dcuStatus && { dcuStatus: tA.dcuStatus }),
        ...(tA.dcuNum && { dcuNum: tA.dcuNum }),
        ...(tA.existingWindows && { existingWindows: tA.existingWindows }),
        ...(tA.existingHeadUnit && { existingHeadUnit: tA.existingHeadUnit }),
        ...(tA.existingDCU && { existingDCU: tA.existingDCU }),
        ...(tA.existingPowerInterface && { existingPowerInterface: tA.existingPowerInterface }),
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
        ...(tA.fromAirTakeUpDistance && { fromAirTakeUpDistance: tA.fromAirTakeUpDistance }),
        ...(tA.specialControllerOptions && { specialControllerOptions: tA.specialControllerOptions }),
        ...(tA.operatingVoltage && { operatingVoltage: tA.operatingVoltage }),
      },

      addFreeCarrier: CCO_ESData.addFreeCarrier,

      // =========================
      // Template B
      // =========================
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

        templateA_BData: {
          existingMonitor: tA.existingMonitor,
          newMonitor: tA.newMonitor,

          ...(tA.dcuStatus && { dcuStatus: tA.dcuStatus }),
          ...(tA.dcuNum && { dcuNum: tA.dcuNum }),
          ...(tA.existingWindows && { existingWindows: tA.existingWindows }),
          ...(tA.existingHeadUnit && { existingHeadUnit: tA.existingHeadUnit }),
          ...(tA.existingDCU && { existingDCU: tA.existingDCU }),
          ...(tA.existingPowerInterface && { existingPowerInterface: tA.existingPowerInterface }),
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
          ...(tA.fromAirTakeUpDistance && { fromAirTakeUpDistance: tA.fromAirTakeUpDistance }),
          ...(tA.specialControllerOptions && { specialControllerOptions: tA.specialControllerOptions }),
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

      // =========================
      // Template C
      // =========================
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
          ...(tA.existingPowerInterface && { existingPowerInterface: tA.existingPowerInterface }),
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
          ...(tA.fromAirTakeUpDistance && { fromAirTakeUpDistance: tA.fromAirTakeUpDistance }),
          ...(tA.specialControllerOptions && { specialControllerOptions: tA.specialControllerOptions }),
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

        /**
         * ✅ FIX:
         * Your original code had this bug:
         * ...(templateC.chainMaster && { lubeType: templateC.chainMaster })
         * That overwrites lubeType with wrong values.
         * Correct mapping should keep original key names.
         */
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

      wheelsOnPowerChain: CCO_ESData.wheelsOnPowerChain,

      // =========================
      // Template D
      // =========================
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
          ...(tA.existingPowerInterface && { existingPowerInterface: tA.existingPowerInterface }),
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
          ...(tA.fromAirTakeUpDistance && { fromAirTakeUpDistance: tA.fromAirTakeUpDistance }),
          ...(tA.specialControllerOptions && { specialControllerOptions: tA.specialControllerOptions }),
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

      // =========================
      // Template F
      // =========================
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
      // Remaining CCO_ES options
      // -------------------------
      ...(CCO_ESData.wheelOpenType && { wheelOpenType: CCO_ESData.wheelOpenType }),
      ...(CCO_ESData.wheelClosedType && { wheelClosedType: CCO_ESData.wheelClosedType }),
      ...(CCO_ESData.openStatus && { openStatus: CCO_ESData.openStatus }),
      ...(CCO_ESData.freeWheelStatus && { freeWheelStatus: CCO_ESData.freeWheelStatus }),
      ...(CCO_ESData.guideRollerStatus && { guideRollerStatus: CCO_ESData.guideRollerStatus }),
      ...(CCO_ESData.openRaceStyleType && { openRaceStyleType: CCO_ESData.openRaceStyleType }),
      ...(CCO_ESData.closedRaceStyleType && { closedRaceStyleType: CCO_ESData.closedRaceStyleType }),
      ...(CCO_ESData.holeStatus && { holeStatus: CCO_ESData.holeStatus }),
      ...(CCO_ESData.actuatorStatus && { actuatorStatus: CCO_ESData.actuatorStatus }),
      ...(CCO_ESData.pivotStatus && { pivotStatus: CCO_ESData.pivotStatus }),
      ...(CCO_ESData.kingPinStatus && { kingPinStatus: CCO_ESData.kingPinStatus }),
      ...(CCO_ESData.railLubeStatus && { railLubeStatus: CCO_ESData.railLubeStatus }),
      ...(CCO_ESData.externalLubeStatus && { externalLubeStatus: CCO_ESData.externalLubeStatus }),
      ...(CCO_ESData.lubeBrand && { lubeBrand: CCO_ESData.lubeBrand }),
      ...(CCO_ESData.lubeType && { lubeType: CCO_ESData.lubeType }),
      ...(CCO_ESData.lubeViscosity && { lubeViscosity: CCO_ESData.lubeViscosity }),
      ...(CCO_ESData.sideLubeStatus && { sideLubeStatus: CCO_ESData.sideLubeStatus }),
      ...(CCO_ESData.topLubeStatus && { topLubeStatus: CCO_ESData.topLubeStatus }),
      ...(CCO_ESData.chainMaster && { chainMaster: CCO_ESData.chainMaster }),
      ...(CCO_ESData.timerStatus && { timerStatus: CCO_ESData.timerStatus }),
      ...(CCO_ESData.electricStatus && { electricStatus: CCO_ESData.electricStatus }),
      ...(CCO_ESData.pneumaticStatus && { pneumaticStatus: CCO_ESData.pneumaticStatus }),
      ...(CCO_ESData.mightyLubeMonitoring && { mightyLubeMonitoring: CCO_ESData.mightyLubeMonitoring }),
      ...(CCO_ESData.plcConnection && { plcConnection: CCO_ESData.plcConnection }),
      ...(CCO_ESData.otherControllerNotes && { otherControllerNotes: CCO_ESData.otherControllerNotes }),
      ...(CCO_ESData.ohpUnitType && { ohpUnitType: CCO_ESData.ohpUnitType }),
      ...(CCO_ESData.ccoG && { ccoG: CCO_ESData.ccoG }),
      ...(CCO_ESData.ccoH && { ccoH: CCO_ESData.ccoH }),
      ...(CCO_ESData.ccoK && { ccoK: CCO_ESData.ccoK }),
      ...(CCO_ESData.ccoA && { ccoA: CCO_ESData.ccoA }),
      ...(CCO_ESData.ccoB && { ccoB: CCO_ESData.ccoB }),
      ...(CCO_ESData.ccoIG && { ccoIG: CCO_ESData.ccoIG }),
      ...(CCO_ESData.ccoIH && { ccoIH: CCO_ESData.ccoIH }),
      ...(CCO_ESData.ccoIK && { ccoIK: CCO_ESData.ccoIK }),
      ...(CCO_ESData.ccoL && { ccoL: CCO_ESData.ccoL }),
    });

    // ✅ Add order into user's cart
    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "CCO_ES",
    });

    // ✅ Save user (cart persists in MongoDB)
    await req.user.save();

    return res.status(200).json({ message: "CCO_ES entry added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
