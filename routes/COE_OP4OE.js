// // routes/COE_OP4OE.js
// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const COE_OP4OE = require("../models/COE_OP4OE");
// const templateA = require("../models/templateA");
// const templateD = require("../models/templateD");
// const templateF = require("../models/templateF");


// const router = express.Router();

// router.post("/", authenticate, async (req, res) => {
//     try {
//         const { COE_OP4OEData, numRequested } = req.body;

//         const order = new COE_OP4OE({
//             conveyorName: COE_OP4OEData.conveyorName,
//             chainSize: COE_OP4OEData.chainSize,
//             ...(COE_OP4OEData.otherChainSize && { otherChainSize: COE_OP4OEData.otherChainSize }),
//             industrialChainManufacturer: COE_OP4OEData.industrialChainManufacturer,
//             ...(COE_OP4OEData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: COE_OP4OEData.otherIndustrialChainManufacturer }),
//             conveyorLength: COE_OP4OEData.conveyorLength,
//             conveyorLengthUnit: COE_OP4OEData.conveyorLengthUnit,
//             conveyorSpeed: COE_OP4OEData.conveyorSpeed,
//             conveyorSpeedUnit: COE_OP4OEData.conveyorSpeedUnit,
//             ...(COE_OP4OEData.conveyorIndex && { conveyorIndex: COE_OP4OEData.conveyorIndex }),
//             ...(COE_OP4OEData.travelDirection && { travelDirection: COE_OP4OEData.travelDirection }),
//             appEnviroment: COE_OP4OEData.appEnviroment,
//             ...(COE_OP4OEData.ovenStatus && { ovenStatus: COE_OP4OEData.ovenStatus }),
//             ...(COE_OP4OEData.ovenTemp && { ovenTemp: COE_OP4OEData.ovenTemp }),
//             ...(COE_OP4OEData.otherAppEnviroment && { otherAppEnviroment: COE_OP4OEData.otherAppEnviroment }),
//             ...(COE_OP4OEData.surroundingTemp && { surroundingTemp: COE_OP4OEData.surroundingTemp }),
//             ...(COE_OP4OEData.conveyorLoaded && { conveyorLoaded: COE_OP4OEData.conveyorLoaded }),
//             ...(COE_OP4OEData.conveyorSwing && { conveyorSwing: COE_OP4OEData.conveyorSwing }),
//             ...(COE_OP4OEData.plantLayout && { plantLayout: COE_OP4OEData.plantLayout }),
//             ...(COE_OP4OEData.requiredPics && { requiredPics: COE_OP4OEData.requiredPics }),
//             operatingVoltage: COE_OP4OEData.operatingVoltage,
//             controlVoltage: COE_OP4OEData.controlVoltage,
//             monitorData: 
//             {
//                 existingMonitor: COE_OP4OEData.templateA.existingMonitor,
//                 newMonitor: COE_OP4OEData.templateA.newMonitor,		
//                 ...(COE_OP4OEData.templateA.dcuStatus && { dcuStatus: COE_OP4OEData.templateA.dcuStatus }),
//                 ...(COE_OP4OEData.templateA.dcuNum && { dcuNum: COE_OP4OEData.templateA.dcuNum }),
//                 ...(COE_OP4OEData.templateA.existingWindows && { existingWindows: COE_OP4OEData.templateA.existingWindows }),
//                 ...(COE_OP4OEData.templateA.existingHeadUnit && { existingHeadUnit: COE_OP4OEData.templateA.existingHeadUnit }),
//                 ...(COE_OP4OEData.templateA.existingDCU && { existingDCU: COE_OP4OEData.templateA.existingDCU }),
//                 ...(COE_OP4OEData.templateA.existingPowerInterface && { existingPowerInterface: COE_OP4OEData.templateA.existingPowerInterface }),
//                 ...(COE_OP4OEData.templateA.newReservoir && { newReservoir: COE_OP4OEData.templateA.newReservoir }),
//                 ...(COE_OP4OEData.templateA.reservoirSize && { reservoirSize: COE_OP4OEData.templateA.reservoirSize }),
//                 ...(COE_OP4OEData.templateA.otherReservoirSize && { otherReservoirSize: COE_OP4OEData.templateA.otherReservoirSize }),
//                 ...(COE_OP4OEData.templateA.newReservoirNum && { newReservoirNum: COE_OP4OEData.templateA.newReservoirNum }),
//                 ...(COE_OP4OEData.templateA.typeMonitor && { typeMonitor: COE_OP4OEData.templateA.typeMonitor }),
//                 ...(COE_OP4OEData.templateA.driveMotorAmp && { driveMotorAmp: COE_OP4OEData.templateA.driveMotorAmp }),
//                 ...(COE_OP4OEData.templateA.driveMotorAmpNum && { driveMotorAmpNum: COE_OP4OEData.templateA.driveMotorAmpNum }),
//                 ...(COE_OP4OEData.templateA.driveTakeUpAir && { driveTakeUpAir: COE_OP4OEData.templateA.driveTakeUpAir }),
//                 ...(COE_OP4OEData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: COE_OP4OEData.templateA.driveTakeUpAirNum }),
//                 ...(COE_OP4OEData.templateA.takeUpDistance && { takeUpDistance: COE_OP4OEData.templateA.takeUpDistance }),
//                 ...(COE_OP4OEData.templateA.takeUpDistanceNum && { takeUpDistanceNum: COE_OP4OEData.templateA.takeUpDistanceNum }),
//                 ...(COE_OP4OEData.templateA.driveTemp && { driveTemp: COE_OP4OEData.templateA.driveTemp }),
//                 ...(COE_OP4OEData.templateA.driveTempNum && { driveTempNum: COE_OP4OEData.templateA.driveTempNum }),
//                 ...(COE_OP4OEData.templateA.driveVibration && { driveVibration: COE_OP4OEData.templateA.driveVibration }),
//                 ...(COE_OP4OEData.templateA.driveVibrationNum && { driveVibrationNum: COE_OP4OEData.templateA.driveVibrationNum }),
//                 ...(COE_OP4OEData.templateA.dogPitch && { dogPitch: COE_OP4OEData.templateA.dogPitch }),
//                 ...(COE_OP4OEData.templateA.dogPitchNum && { dogPitchNum: COE_OP4OEData.templateA.dogPitchNum }),
//                 ...(COE_OP4OEData.templateA.paintMarker && { paintMarker: COE_OP4OEData.templateA.paintMarker }),
//                 ...(COE_OP4OEData.templateA.paintMarkerNum && { paintMarkerNum: COE_OP4OEData.templateA.paintMarkerNum }),
//                 ...(COE_OP4OEData.templateA.chainVision && { chainVision: COE_OP4OEData.templateA.chainVision }),
//                 ...(COE_OP4OEData.templateA.lubeVision && { lubeVision: COE_OP4OEData.templateA.lubeVision }),
//                 ...(COE_OP4OEData.templateA.trolleyVision && { trolleyVision: COE_OP4OEData.templateA.trolleyVision }),
//                 ...(COE_OP4OEData.templateA.trolleyDetect && { trolleyDetect: COE_OP4OEData.templateA.trolleyDetect }),
//                 ...(COE_OP4OEData.templateA.omniView && { omniView: COE_OP4OEData.templateA.omniView }),
//                 ...(COE_OP4OEData.templateA.dcuUpgradeNum && { dcuUpgradeNum: COE_OP4OEData.templateA.dcuUpgradeNum }),
//                 ...(COE_OP4OEData.templateA.piuDistance && { piuDistance: COE_OP4OEData.templateA.piuDistance }),
//                 ...(COE_OP4OEData.templateA.switchDistance && { switchDistance: COE_OP4OEData.templateA.switchDistance }),
//                 ...(COE_OP4OEData.templateA.ampPickup && { ampPickup: COE_OP4OEData.templateA.ampPickup }),
//                 ...(COE_OP4OEData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_OP4OEData.templateA.fromAirTakeUpDistance }),
//                 ...(COE_OP4OEData.templateA.specialControllerOptions && { specialControllerOptions: COE_OP4OEData.templateA.specialControllerOptions }),
//                 ...(COE_OP4OEData.templateA.operatingVoltage && { operatingVoltage: COE_OP4OEData.templateA.operatingVoltage })
//             },
//             wheelSealedChain: COE_OP4OEData.wheelSealedChain,

//             templateDData: 
//             {
//                 conveyorName: COE_OP4OEData.templateD.conveyorName,
//                 wheelManufacturer: COE_OP4OEData.templateD.wheelManufacturer,
//                 ...(COE_OP4OEData.templateD.otherWheelManufacturer && { otherWheelManufacturer: COE_OP4OEData.templateD.otherWheelManufacturer }),
//                 conveyorLength: COE_OP4OEData.templateD.conveyorLength,
//                 conveyorLengthUnit: COE_OP4OEData.templateD.conveyorLengthUnit,
//                 chainSize: COE_OP4OEData.templateD.chainSize,
//                 ...(COE_OP4OEData.templateD.otherChainSize && { otherChainSize: COE_OP4OEData.templateD.otherChainSize }),
//                 industrialChainManufacturer: COE_OP4OEData.templateD.industrialChainManufacturer,
//                 ...(COE_OP4OEData.templateD.otherChainManufacturer && { otherChainManufacturer: COE_OP4OEData.templateD.otherChainManufacturer }),
//                 conveyorSpeed: COE_OP4OEData.templateD.conveyorSpeed,
//                 conveyorSpeedUnit: COE_OP4OEData.templateD.conveyorSpeedUnit,
//                 conveyorIndex: COE_OP4OEData.templateD.conveyorIndex,
//                 appEnviroment: COE_OP4OEData.templateD.appEnviroment,
//                 ...(COE_OP4OEData.templateD.otherAppEnviroment && { otherAppEnviroment: COE_OP4OEData.templateD.otherAppEnviroment }),
//                 surroundingTemp: COE_OP4OEData.templateD.surroundingTemp,
//                 orientationType: COE_OP4OEData.templateD.orientationType,
//                 ...(COE_OP4OEData.templateD.conveyorLoaded && { conveyorLoaded: COE_OP4OEData.templateD.conveyorLoaded }),
//                 conveyorSwing: COE_OP4OEData.templateD.conveyorSwing,
//                 operatingVoltage: COE_OP4OEData.templateD.operatingVoltage,
//                 controlVoltSingle: COE_OP4OEData.templateD.controlVoltSingle,
//                 compressedAir: COE_OP4OEData.templateD.compressedAir,
//                 ...(COE_OP4OEData.templateD.airSupplyType && { airSupplyType: COE_OP4OEData.templateD.airSupplyType }),

//                 templateA_DData: 
//                 {
//                     existingMonitor: COE_OP4OEData.templateA.existingMonitor,
//                     newMonitor: COE_OP4OEData.templateA.newMonitor,		
//                     ...(COE_OP4OEData.templateA.dcuStatus && { dcuStatus: COE_OP4OEData.templateA.dcuStatus }),
//                     ...(COE_OP4OEData.templateA.dcuNum && { dcuNum: COE_OP4OEData.templateA.dcuNum }),
//                     ...(COE_OP4OEData.templateA.existingWindows && { existingWindows: COE_OP4OEData.templateA.existingWindows }),
//                     ...(COE_OP4OEData.templateA.existingHeadUnit && { existingHeadUnit: COE_OP4OEData.templateA.existingHeadUnit }),
//                     ...(COE_OP4OEData.templateA.existingDCU && { existingDCU: COE_OP4OEData.templateA.existingDCU }),
//                     ...(COE_OP4OEData.templateA.existingPowerInterface && { existingPowerInterface: COE_OP4OEData.templateA.existingPowerInterface }),
//                     ...(COE_OP4OEData.templateA.newReservoir && { newReservoir: COE_OP4OEData.templateA.newReservoir }),
//                     ...(COE_OP4OEData.templateA.reservoirSize && { reservoirSize: COE_OP4OEData.templateA.reservoirSize }),
//                     ...(COE_OP4OEData.templateA.otherReservoirSize && { otherReservoirSize: COE_OP4OEData.templateA.otherReservoirSize }),
//                     ...(COE_OP4OEData.templateA.newReservoirNum && { newReservoirNum: COE_OP4OEData.templateA.newReservoirNum }),
//                     ...(COE_OP4OEData.templateA.typeMonitor && { typeMonitor: COE_OP4OEData.templateA.typeMonitor }),
//                     ...(COE_OP4OEData.templateA.driveMotorAmp && { driveMotorAmp: COE_OP4OEData.templateA.driveMotorAmp }),
//                     ...(COE_OP4OEData.templateA.driveMotorAmpNum && { driveMotorAmpNum: COE_OP4OEData.templateA.driveMotorAmpNum }),
//                     ...(COE_OP4OEData.templateA.driveTakeUpAir && { driveTakeUpAir: COE_OP4OEData.templateA.driveTakeUpAir }),
//                     ...(COE_OP4OEData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: COE_OP4OEData.templateA.driveTakeUpAirNum }),
//                     ...(COE_OP4OEData.templateA.takeUpDistance && { takeUpDistance: COE_OP4OEData.templateA.takeUpDistance }),
//                     ...(COE_OP4OEData.templateA.takeUpDistanceNum && { takeUpDistanceNum: COE_OP4OEData.templateA.takeUpDistanceNum }),
//                     ...(COE_OP4OEData.templateA.driveTemp && { driveTemp: COE_OP4OEData.templateA.driveTemp }),
//                     ...(COE_OP4OEData.templateA.driveTempNum && { driveTempNum: COE_OP4OEData.templateA.driveTempNum }),
//                     ...(COE_OP4OEData.templateA.driveVibration && { driveVibration: COE_OP4OEData.templateA.driveVibration }),
//                     ...(COE_OP4OEData.templateA.driveVibrationNum && { driveVibrationNum: COE_OP4OEData.templateA.driveVibrationNum }),
//                     ...(COE_OP4OEData.templateA.dogPitch && { dogPitch: COE_OP4OEData.templateA.dogPitch }),
//                     ...(COE_OP4OEData.templateA.dogPitchNum && { dogPitchNum: COE_OP4OEData.templateA.dogPitchNum }),
//                     ...(COE_OP4OEData.templateA.paintMarker && { paintMarker: COE_OP4OEData.templateA.paintMarker }),
//                     ...(COE_OP4OEData.templateA.paintMarkerNum && { paintMarkerNum: COE_OP4OEData.templateA.paintMarkerNum }),
//                     ...(COE_OP4OEData.templateA.chainVision && { chainVision: COE_OP4OEData.templateA.chainVision }),
//                     ...(COE_OP4OEData.templateA.lubeVision && { lubeVision: COE_OP4OEData.templateA.lubeVision }),
//                     ...(COE_OP4OEData.templateA.trolleyVision && { trolleyVision: COE_OP4OEData.templateA.trolleyVision }),
//                     ...(COE_OP4OEData.templateA.trolleyDetect && { trolleyDetect: COE_OP4OEData.templateA.trolleyDetect }),
//                     ...(COE_OP4OEData.templateA.omniView && { omniView: COE_OP4OEData.templateA.omniView }),
//                     ...(COE_OP4OEData.templateA.dcuUpgradeNum && { dcuUpgradeNum: COE_OP4OEData.templateA.dcuUpgradeNum }),
//                     ...(COE_OP4OEData.templateA.piuDistance && { piuDistance: COE_OP4OEData.templateA.piuDistance }),
//                     ...(COE_OP4OEData.templateA.switchDistance && { switchDistance: COE_OP4OEData.templateA.switchDistance }),
//                     ...(COE_OP4OEData.templateA.ampPickup && { ampPickup: COE_OP4OEData.templateA.ampPickup }),
//                     ...(COE_OP4OEData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_OP4OEData.templateA.fromAirTakeUpDistance }),
//                     ...(COE_OP4OEData.templateA.specialControllerOptions && { specialControllerOptions: COE_OP4OEData.templateA.specialControllerOptions }),
//                     ...(COE_OP4OEData.templateA.operatingVoltage && { operatingVoltage: COE_OP4OEData.templateA.operatingVoltage })
//                 },

//                     lubeBrand: COE_OP4OEData.templateD.lubeBrand,
//                     currentGrease: COE_OP4OEData.templateD.currentGrease,
//                     currentGreaseGrade: COE_OP4OEData.templateD.currentGreaseGrade,
//                     wheelDiameter: COE_OP4OEData.templateD.wheelDiameter,
//                     ...(COE_OP4OEData.templateD.chainMaster && { chainMaster: COE_OP4OEData.templateD.chainMaster }),
//                     ...(COE_OP4OEData.templateD.remoteStatus && { remoteStatus: COE_OP4OEData.templateD.remoteStatus }),
//                     ...(COE_OP4OEData.templateD.mountStatus && { mountStatus: COE_OP4OEData.templateD.mountStatus }),
//                     ...(COE_OP4OEData.templateD.otherUnitStatus && { otherUnitStatus: COE_OP4OEData.templateD.otherUnitStatus }),
//                     ...(COE_OP4OEData.templateD.timerStatus && { timerStatus: COE_OP4OEData.templateD.timerStatus }),
//                     ...(COE_OP4OEData.templateD.electricStatus && { electricStatus: COE_OP4OEData.templateD.electricStatus }),
//                     ...(COE_OP4OEData.templateD.mightyLubeMonitoring && { mightyLubeMonitoring: COE_OP4OEData.templateD.mightyLubeMonitoring }),
//                     ...(COE_OP4OEData.templateD.preMountType && { preMountType: COE_OP4OEData.templateD.preMountType }),
//                     ...(COE_OP4OEData.templateD.otherControllerNotes && { otherControllerNotes: COE_OP4OEData.templateD.otherControllerNotes }),


//             },

//             templateFData: 
//             {
//                 conveyorName: COE_OP4OEData.templateF.conveyorName,
//                 chainSize: COE_OP4OEData.templateF.chainSize,
//                 ...(COE_OP4OEData.templateF.otherChainSize && { otherChainSize: COE_OP4OEData.templateF.otherChainSize }),
//                 industrialChainManufacturer: COE_OP4OEData.templateF.industrialChainManufacturer,
//                 ...(COE_OP4OEData.templateF.otherChainManufacturer && { otherChainManufacturer: COE_OP4OEData.templateF.otherChainManufacturer }),
//                 wheelManufacturer: COE_OP4OEData.templateF.wheelManufacturer,
//                 ...(COE_OP4OEData.templateF.otherWheelManufacturer && { otherWheelManufacturer: COE_OP4OEData.templateF.otherWheelManufacturer }),
//                 conveyorLength: COE_OP4OEData.templateF.conveyorLength,
//                 conveyorLengthUnit: COE_OP4OEData.templateF.conveyorLengthUnit,
//                 brushApplicators: COE_OP4OEData.templateF.brushApplicators,
//                 m12Plugs: COE_OP4OEData.templateF.m12Plugs,
//                 oilStatus: COE_OP4OEData.templateF.oilStatus,
//                 operatingVoltage: COE_OP4OEData.templateF.operatingVoltage,
//                 controlVoltSingle: COE_OP4OEData.templateF.controlVoltSingle,
//             },
    
//             ...(COE_OP4OEData.catDriveStatus && { catDriveStatus: COE_OP4OEData.catDriveStatus }),
//             ...(COE_OP4OEData.wheelOpenType && { wheelOpenType: COE_OP4OEData.wheelOpenType }),
//             ...(COE_OP4OEData.wheelClosedType && { wheelClosedType: COE_OP4OEData.wheelClosedType }),
//             ...(COE_OP4OEData.openStatus && { openStatus: COE_OP4OEData.openStatus }),
//             ...(COE_OP4OEData.holeStatus && { holeStatus: COE_OP4OEData.holeStatus }),
//             ...(COE_OP4OEData.railLubeStatus && { railLubeStatus: COE_OP4OEData.railLubeStatus }),
//             ...(COE_OP4OEData.lubeBrand && { lubeBrand: COE_OP4OEData.lubeBrand }),
//             ...(COE_OP4OEData.lubeType && { lubeType: COE_OP4OEData.lubeType }),
//             ...(COE_OP4OEData.lubeViscosity && { lubeViscosity: COE_OP4OEData.lubeViscosity }),
//             chainMaster: COE_OP4OEData.chainMaster,
//             timerStatus: COE_OP4OEData.timerStatus,
//             electricStatus: COE_OP4OEData.electricStatus,
//             pneumaticStatus: COE_OP4OEData.pneumaticStatus,
//             mightyLubeMonitoring: COE_OP4OEData.mightyLubeMonitoring,
//             plcConnection: COE_OP4OEData.plcConnection,
//             otherControllerInfo: COE_OP4OEData.otherControllerInfo,
//             ...(COE_OP4OEData.coeUnitType && { coeUnitType: COE_OP4OEData.coeUnitType }),
//             ...(COE_OP4OEData.coeLineA && { coeLineA: COE_OP4OEData.coeLineA }),
//             ...(COE_OP4OEData.coeLineG && { coeLineG: COE_OP4OEData.coeLineG }),
//             ...(COE_OP4OEData.coeLineH && { coeLineH: COE_OP4OEData.coeLineH }),
//             ...(COE_OP4OEData.coeLineJ && { coeLineJ: COE_OP4OEData.coeLineJ }),
//             ...(COE_OP4OEData.coeLineX && { coeLineX: COE_OP4OEData.coeLineX }),
//             ...(COE_OP4OEData.coeLineY && { coeLineY: COE_OP4OEData.coeLineY }),
//             ...(COE_OP4OEData.coeLineZ && { coeLineZ: COE_OP4OEData.coeLineZ }),
//         });

//         req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "COE_OP4OE" });
//         await req.user.save();

//         return res.status(200).json({ message: "COE_OP4OE entry added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;


/**
 * routes/COE_OP4OE.js
 * -------------------
 * ✅ Update done:
 * 1) Added optional technicianNote (trim + save only if non-empty)
 * 2) Added safe guards so API doesn't crash if COE_OP4OEData / template objects are missing
 * 3) Added detailed comments
 *
 * NOTE:
 * - Ensure your COE_OP4OE mongoose schema includes:
 *   technicianNote: { type: String, required: false }
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (unused in this route, safe to remove)
const { authenticate } = require("./sessions");
const COE_OP4OE = require("../models/COE_OP4OE");

// These imports are not used directly in this file (you only use template data from request).
// Keeping them is harmless, but you can remove them to reduce warnings.
const templateA = require("../models/templateA");
const templateD = require("../models/templateD");
const templateF = require("../models/templateF");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    // ✅ Read request body safely
    const { COE_OP4OEData, numRequested } = req.body || {};

    // ✅ Guard: avoid crash if payload missing
    if (!COE_OP4OEData) {
      return res.status(400).json({ error: "COE_OP4OEData is required" });
    }

    // ✅ Guard: templates might be missing in payload; use empty objects instead of crashing
    const tA = COE_OP4OEData.templateA || {};
    const tD = COE_OP4OEData.templateD || {};
    const tF = COE_OP4OEData.templateF || {};

    // ✅ Create a new Mongoose document for this product configuration
    const order = new COE_OP4OE({
      // -------------------------
      // Main / top-level fields
      // -------------------------
      conveyorName: COE_OP4OEData.conveyorName,
      chainSize: COE_OP4OEData.chainSize,
      ...(COE_OP4OEData.otherChainSize && { otherChainSize: COE_OP4OEData.otherChainSize }),

      industrialChainManufacturer: COE_OP4OEData.industrialChainManufacturer,
      ...(COE_OP4OEData.otherIndustrialChainManufacturer && {
        otherIndustrialChainManufacturer: COE_OP4OEData.otherIndustrialChainManufacturer,
      }),

      conveyorLength: COE_OP4OEData.conveyorLength,
      conveyorLengthUnit: COE_OP4OEData.conveyorLengthUnit,
      conveyorSpeed: COE_OP4OEData.conveyorSpeed,
      conveyorSpeedUnit: COE_OP4OEData.conveyorSpeedUnit,

      ...(COE_OP4OEData.conveyorIndex && { conveyorIndex: COE_OP4OEData.conveyorIndex }),
      ...(COE_OP4OEData.travelDirection && { travelDirection: COE_OP4OEData.travelDirection }),

      appEnviroment: COE_OP4OEData.appEnviroment,
      ...(COE_OP4OEData.ovenStatus && { ovenStatus: COE_OP4OEData.ovenStatus }),
      ...(COE_OP4OEData.ovenTemp && { ovenTemp: COE_OP4OEData.ovenTemp }),
      ...(COE_OP4OEData.otherAppEnviroment && { otherAppEnviroment: COE_OP4OEData.otherAppEnviroment }),

      ...(COE_OP4OEData.surroundingTemp && { surroundingTemp: COE_OP4OEData.surroundingTemp }),
      ...(COE_OP4OEData.conveyorLoaded && { conveyorLoaded: COE_OP4OEData.conveyorLoaded }),
      ...(COE_OP4OEData.conveyorSwing && { conveyorSwing: COE_OP4OEData.conveyorSwing }),

      ...(COE_OP4OEData.plantLayout && { plantLayout: COE_OP4OEData.plantLayout }),
      ...(COE_OP4OEData.requiredPics && { requiredPics: COE_OP4OEData.requiredPics }),

      operatingVoltage: COE_OP4OEData.operatingVoltage,
      controlVoltage: COE_OP4OEData.controlVoltage,

      /**
       * ✅ NEW: technicianNote (optional)
       * Frontend should send: COE_OP4OEData.technicianNote
       */
      ...(COE_OP4OEData.technicianNote &&
        COE_OP4OEData.technicianNote.trim() && {
          technicianNote: COE_OP4OEData.technicianNote.trim(),
        }),

      // -------------------------
      // Monitor Data (Template A)
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

      // -------------------------
      // Additional top-level fields
      // -------------------------
      wheelSealedChain: COE_OP4OEData.wheelSealedChain,

      // -------------------------
      // Template D Data (nested)
      // -------------------------
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

        // Template A inside Template D (re-using tA)
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

        // Remaining Template D fields
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

      // -------------------------
      // Template F Data (nested)
      // -------------------------
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
      // Remaining optional + required flags (top-level)
      // -------------------------
      ...(COE_OP4OEData.catDriveStatus && { catDriveStatus: COE_OP4OEData.catDriveStatus }),
      ...(COE_OP4OEData.wheelOpenType && { wheelOpenType: COE_OP4OEData.wheelOpenType }),
      ...(COE_OP4OEData.wheelClosedType && { wheelClosedType: COE_OP4OEData.wheelClosedType }),
      ...(COE_OP4OEData.openStatus && { openStatus: COE_OP4OEData.openStatus }),
      ...(COE_OP4OEData.holeStatus && { holeStatus: COE_OP4OEData.holeStatus }),
      ...(COE_OP4OEData.railLubeStatus && { railLubeStatus: COE_OP4OEData.railLubeStatus }),
      ...(COE_OP4OEData.lubeBrand && { lubeBrand: COE_OP4OEData.lubeBrand }),
      ...(COE_OP4OEData.lubeType && { lubeType: COE_OP4OEData.lubeType }),
      ...(COE_OP4OEData.lubeViscosity && { lubeViscosity: COE_OP4OEData.lubeViscosity }),

      // These were not optional in your original code, so keeping as direct assignments:
      chainMaster: COE_OP4OEData.chainMaster,
      timerStatus: COE_OP4OEData.timerStatus,
      electricStatus: COE_OP4OEData.electricStatus,
      pneumaticStatus: COE_OP4OEData.pneumaticStatus,
      mightyLubeMonitoring: COE_OP4OEData.mightyLubeMonitoring,
      plcConnection: COE_OP4OEData.plcConnection,
      otherControllerInfo: COE_OP4OEData.otherControllerInfo,

      ...(COE_OP4OEData.coeUnitType && { coeUnitType: COE_OP4OEData.coeUnitType }),
      ...(COE_OP4OEData.coeLineA && { coeLineA: COE_OP4OEData.coeLineA }),
      ...(COE_OP4OEData.coeLineG && { coeLineG: COE_OP4OEData.coeLineG }),
      ...(COE_OP4OEData.coeLineH && { coeLineH: COE_OP4OEData.coeLineH }),
      ...(COE_OP4OEData.coeLineJ && { coeLineJ: COE_OP4OEData.coeLineJ }),
      ...(COE_OP4OEData.coeLineX && { coeLineX: COE_OP4OEData.coeLineX }),
      ...(COE_OP4OEData.coeLineY && { coeLineY: COE_OP4OEData.coeLineY }),
      ...(COE_OP4OEData.coeLineZ && { coeLineZ: COE_OP4OEData.coeLineZ }),
    });

    // ✅ Push configuration into authenticated user's cart
    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "COE_OP4OE",
    });

    // ✅ Persist cart updates
    await req.user.save();

    return res.status(200).json({ message: "COE_OP4OE entry added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
