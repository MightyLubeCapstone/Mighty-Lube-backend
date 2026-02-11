// // routes/COE_CEL.js
// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const COE_CEL = require("../models/COE_CEL");
// const templateA = require("../models/templateA");
// const templateD = require("../models/templateD");
// const templateE = require("../models/templateE");
 
// const router = express.Router();
 
// router.post("/", authenticate, async (req, res) => {
//     try {
//         const { COE_CELData, numRequested } = req.body;

//         const order = new COE_CEL({
//             conveyorName: COE_CELData.conveyorName,
//             chainSize: COE_CELData.chainSize,
//             ...(COE_CELData.otherChainSize && { otherChainSize: COE_CELData.otherChainSize }),
//             industrialChainManufacturer: COE_CELData.industrialChainManufacturer,
//             ...(COE_CELData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: COE_CELData.otherIndustrialChainManufacturer }),
//             conveyorLength: COE_CELData.conveyorLength,
//             conveyorLengthUnit: COE_CELData.conveyorLengthUnit,
//             conveyorSpeed: COE_CELData.conveyorSpeed,
//             conveyorSpeedUnit: COE_CELData.conveyorSpeedUnit,
//             ...(COE_CELData.conveyorIndex && { conveyorIndex: COE_CELData.conveyorIndex }),
//             ...(COE_CELData.travelDirection && { travelDirection: COE_CELData.travelDirection }),
//             appEnviroment: COE_CELData.appEnviroment,
//             ...(COE_CELData.ovenStatus && { ovenStatus: COE_CELData.ovenStatus }),
//             ...(COE_CELData.ovenTemp && { ovenTemp: COE_CELData.ovenTemp }),
//             ...(COE_CELData.otherAppEnviroment && { otherAppEnviroment: COE_CELData.otherAppEnviroment }),
//             ...(COE_CELData.surroundingTemp && { surroundingTemp: COE_CELData.surroundingTemp }),
//             ...(COE_CELData.conveyorLoaded && { conveyorLoaded: COE_CELData.conveyorLoaded }),
//             ...(COE_CELData.conveyorSwing && { conveyorSwing: COE_CELData.conveyorSwing }),
//             ...(COE_CELData.plantLayout && { plantLayout: COE_CELData.plantLayout }),
//             ...(COE_CELData.requiredPics && { requiredPics: COE_CELData.requiredPics }),
//             operatingVoltage: COE_CELData.operatingVoltage,

//             monitorData: 
//             {
//                 existingMonitor: COE_CELData.templateA.existingMonitor,
//                 newMonitor: COE_CELData.templateA.newMonitor,		
//                 ...(COE_CELData.templateA.dcuStatus && { dcuStatus: COE_CELData.templateA.dcuStatus }),
//                 ...(COE_CELData.templateA.dcuNum && { dcuNum: COE_CELData.templateA.dcuNum }),
//                 ...(COE_CELData.templateA.existingWindows && { existingWindows: COE_CELData.templateA.existingWindows }),
//                 ...(COE_CELData.templateA.existingHeadUnit && { existingHeadUnit: COE_CELData.templateA.existingHeadUnit }),
//                 ...(COE_CELData.templateA.existingDCU && { existingDCU: COE_CELData.templateA.existingDCU }),
//                 ...(COE_CELData.templateA.existingPowerInterface && { existingPowerInterface: COE_CELData.templateA.existingPowerInterface }),
//                 ...(COE_CELData.templateA.newReservoir && { newReservoir: COE_CELData.templateA.newReservoir }),
//                 ...(COE_CELData.templateA.reservoirSize && { reservoirSize: COE_CELData.templateA.reservoirSize }),
//                 ...(COE_CELData.templateA.otherReservoirSize && { otherReservoirSize: COE_CELData.templateA.otherReservoirSize }),
//                 ...(COE_CELData.templateA.newReservoirNum && { newReservoirNum: COE_CELData.templateA.newReservoirNum }),
//                 ...(COE_CELData.templateA.typeMonitor && { typeMonitor: COE_CELData.templateA.typeMonitor }),
//                 ...(COE_CELData.templateA.driveMotorAmp && { driveMotorAmp: COE_CELData.templateA.driveMotorAmp }),
//                 ...(COE_CELData.templateA.driveMotorAmpNum && { driveMotorAmpNum: COE_CELData.templateA.driveMotorAmpNum }),
//                 ...(COE_CELData.templateA.driveTakeUpAir && { driveTakeUpAir: COE_CELData.templateA.driveTakeUpAir }),
//                 ...(COE_CELData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: COE_CELData.templateA.driveTakeUpAirNum }),
//                 ...(COE_CELData.templateA.takeUpDistance && { takeUpDistance: COE_CELData.templateA.takeUpDistance }),
//                 ...(COE_CELData.templateA.takeUpDistanceNum && { takeUpDistanceNum: COE_CELData.templateA.takeUpDistanceNum }),
//                 ...(COE_CELData.templateA.driveTemp && { driveTemp: COE_CELData.templateA.driveTemp }),
//                 ...(COE_CELData.templateA.driveTempNum && { driveTempNum: COE_CELData.templateA.driveTempNum }),
//                 ...(COE_CELData.templateA.driveVibration && { driveVibration: COE_CELData.templateA.driveVibration }),
//                 ...(COE_CELData.templateA.driveVibrationNum && { driveVibrationNum: COE_CELData.templateA.driveVibrationNum }),
//                 ...(COE_CELData.templateA.dogPitch && { dogPitch: COE_CELData.templateA.dogPitch }),
//                 ...(COE_CELData.templateA.dogPitchNum && { dogPitchNum: COE_CELData.templateA.dogPitchNum }),
//                 ...(COE_CELData.templateA.paintMarker && { paintMarker: COE_CELData.templateA.paintMarker }),
//                 ...(COE_CELData.templateA.paintMarkerNum && { paintMarkerNum: COE_CELData.templateA.paintMarkerNum }),
//                 ...(COE_CELData.templateA.chainVision && { chainVision: COE_CELData.templateA.chainVision }),
//                 ...(COE_CELData.templateA.lubeVision && { lubeVision: COE_CELData.templateA.lubeVision }),
//                 ...(COE_CELData.templateA.trolleyVision && { trolleyVision: COE_CELData.templateA.trolleyVision }),
//                 ...(COE_CELData.templateA.trolleyDetect && { trolleyDetect: COE_CELData.templateA.trolleyDetect }),
//                 ...(COE_CELData.templateA.omniView && { omniView: COE_CELData.templateA.omniView }),
//                 ...(COE_CELData.templateA.dcuUpgradeNum && { dcuUpgradeNum: COE_CELData.templateA.dcuUpgradeNum }),
//                 ...(COE_CELData.templateA.piuDistance && { piuDistance: COE_CELData.templateA.piuDistance }),
//                 ...(COE_CELData.templateA.switchDistance && { switchDistance: COE_CELData.templateA.switchDistance }),
//                 ...(COE_CELData.templateA.ampPickup && { ampPickup: COE_CELData.templateA.ampPickup }),
//                 ...(COE_CELData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_CELData.templateA.fromAirTakeUpDistance }),
//                 ...(COE_CELData.templateA.specialControllerOptions && { specialControllerOptions: COE_CELData.templateA.specialControllerOptions }),
//                 ...(COE_CELData.templateA.operatingVoltage && { operatingVoltage: COE_CELData.templateA.operatingVoltage })
//             },


//             wheelSealedChain: COE_CELData.wheelSealedChain,

//             templateDData: 
//             {
//                 conveyorName: COE_CELData.templateD.conveyorName,
//                 wheelManufacturer: COE_CELData.templateD.wheelManufacturer,
//                 ...(COE_CELData.templateD.otherWheelManufacturer && { otherWheelManufacturer: COE_CELData.templateD.otherWheelManufacturer }),
//                 conveyorLength: COE_CELData.templateD.conveyorLength,
//                 conveyorLengthUnit: COE_CELData.templateD.conveyorLengthUnit,
//                 chainSize: COE_CELData.templateD.chainSize,
//                 ...(COE_CELData.templateD.otherChainSize && { otherChainSize: COE_CELData.templateD.otherChainSize }),
//                 industrialChainManufacturer: COE_CELData.templateD.industrialChainManufacturer,
//                 ...(COE_CELData.templateD.otherChainManufacturer && { otherChainManufacturer: COE_CELData.templateD.otherChainManufacturer }),
//                 conveyorSpeed: COE_CELData.templateD.conveyorSpeed,
//                 conveyorSpeedUnit: COE_CELData.templateD.conveyorSpeedUnit,
//                 conveyorIndex: COE_CELData.templateD.conveyorIndex,
//                 appEnviroment: COE_CELData.templateD.appEnviroment,
//                 ...(COE_CELData.templateD.otherAppEnviroment && { otherAppEnviroment: COE_CELData.templateD.otherAppEnviroment }),
//                 surroundingTemp: COE_CELData.templateD.surroundingTemp,
//                 orientationType: COE_CELData.templateD.orientationType,
//                 ...(COE_CELData.templateD.conveyorLoaded && { conveyorLoaded: COE_CELData.templateD.conveyorLoaded }),
//                 conveyorSwing: COE_CELData.templateD.conveyorSwing,
//                 operatingVoltage: COE_CELData.templateD.operatingVoltage,
//                 controlVoltSingle: COE_CELData.templateD.controlVoltSingle,
//                 compressedAir: COE_CELData.templateD.compressedAir,
//                 ...(COE_CELData.templateD.airSupplyType && { airSupplyType: COE_CELData.templateD.airSupplyType }),

//                 templateA_DData: 
//                 {
//                     existingMonitor: COE_CELData.templateA.existingMonitor,
//                     newMonitor: COE_CELData.templateA.newMonitor,		
//                     ...(COE_CELData.templateA.dcuStatus && { dcuStatus: COE_CELData.templateA.dcuStatus }),
//                     ...(COE_CELData.templateA.dcuNum && { dcuNum: COE_CELData.templateA.dcuNum }),
//                     ...(COE_CELData.templateA.existingWindows && { existingWindows: COE_CELData.templateA.existingWindows }),
//                     ...(COE_CELData.templateA.existingHeadUnit && { existingHeadUnit: COE_CELData.templateA.existingHeadUnit }),
//                     ...(COE_CELData.templateA.existingDCU && { existingDCU: COE_CELData.templateA.existingDCU }),
//                     ...(COE_CELData.templateA.existingPowerInterface && { existingPowerInterface: COE_CELData.templateA.existingPowerInterface }),
//                     ...(COE_CELData.templateA.newReservoir && { newReservoir: COE_CELData.templateA.newReservoir }),
//                     ...(COE_CELData.templateA.reservoirSize && { reservoirSize: COE_CELData.templateA.reservoirSize }),
//                     ...(COE_CELData.templateA.otherReservoirSize && { otherReservoirSize: COE_CELData.templateA.otherReservoirSize }),
//                     ...(COE_CELData.templateA.newReservoirNum && { newReservoirNum: COE_CELData.templateA.newReservoirNum }),
//                     ...(COE_CELData.templateA.typeMonitor && { typeMonitor: COE_CELData.templateA.typeMonitor }),
//                     ...(COE_CELData.templateA.driveMotorAmp && { driveMotorAmp: COE_CELData.templateA.driveMotorAmp }),
//                     ...(COE_CELData.templateA.driveMotorAmpNum && { driveMotorAmpNum: COE_CELData.templateA.driveMotorAmpNum }),
//                     ...(COE_CELData.templateA.driveTakeUpAir && { driveTakeUpAir: COE_CELData.templateA.driveTakeUpAir }),
//                     ...(COE_CELData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: COE_CELData.templateA.driveTakeUpAirNum }),
//                     ...(COE_CELData.templateA.takeUpDistance && { takeUpDistance: COE_CELData.templateA.takeUpDistance }),
//                     ...(COE_CELData.templateA.takeUpDistanceNum && { takeUpDistanceNum: COE_CELData.templateA.takeUpDistanceNum }),
//                     ...(COE_CELData.templateA.driveTemp && { driveTemp: COE_CELData.templateA.driveTemp }),
//                     ...(COE_CELData.templateA.driveTempNum && { driveTempNum: COE_CELData.templateA.driveTempNum }),
//                     ...(COE_CELData.templateA.driveVibration && { driveVibration: COE_CELData.templateA.driveVibration }),
//                     ...(COE_CELData.templateA.driveVibrationNum && { driveVibrationNum: COE_CELData.templateA.driveVibrationNum }),
//                     ...(COE_CELData.templateA.dogPitch && { dogPitch: COE_CELData.templateA.dogPitch }),
//                     ...(COE_CELData.templateA.dogPitchNum && { dogPitchNum: COE_CELData.templateA.dogPitchNum }),
//                     ...(COE_CELData.templateA.paintMarker && { paintMarker: COE_CELData.templateA.paintMarker }),
//                     ...(COE_CELData.templateA.paintMarkerNum && { paintMarkerNum: COE_CELData.templateA.paintMarkerNum }),
//                     ...(COE_CELData.templateA.chainVision && { chainVision: COE_CELData.templateA.chainVision }),
//                     ...(COE_CELData.templateA.lubeVision && { lubeVision: COE_CELData.templateA.lubeVision }),
//                     ...(COE_CELData.templateA.trolleyVision && { trolleyVision: COE_CELData.templateA.trolleyVision }),
//                     ...(COE_CELData.templateA.trolleyDetect && { trolleyDetect: COE_CELData.templateA.trolleyDetect }),
//                     ...(COE_CELData.templateA.omniView && { omniView: COE_CELData.templateA.omniView }),
//                     ...(COE_CELData.templateA.dcuUpgradeNum && { dcuUpgradeNum: COE_CELData.templateA.dcuUpgradeNum }),
//                     ...(COE_CELData.templateA.piuDistance && { piuDistance: COE_CELData.templateA.piuDistance }),
//                     ...(COE_CELData.templateA.switchDistance && { switchDistance: COE_CELData.templateA.switchDistance }),
//                     ...(COE_CELData.templateA.ampPickup && { ampPickup: COE_CELData.templateA.ampPickup }),
//                     ...(COE_CELData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_CELData.templateA.fromAirTakeUpDistance }),
//                     ...(COE_CELData.templateA.specialControllerOptions && { specialControllerOptions: COE_CELData.templateA.specialControllerOptions }),
//                     ...(COE_CELData.templateA.operatingVoltage && { operatingVoltage: COE_CELData.templateA.operatingVoltage })
//                 },

//                     lubeBrand: COE_CELData.templateD.lubeBrand,
//                     currentGrease: COE_CELData.templateD.currentGrease,
//                     currentGreaseGrade: COE_CELData.templateD.currentGreaseGrade,
//                     wheelDiameter: COE_CELData.templateD.wheelDiameter,
//                     ...(COE_CELData.templateD.chainMaster && { chainMaster: COE_CELData.templateD.chainMaster }),
//                     ...(COE_CELData.templateD.remoteStatus && { remoteStatus: COE_CELData.templateD.remoteStatus }),
//                     ...(COE_CELData.templateD.mountStatus && { mountStatus: COE_CELData.templateD.mountStatus }),
//                     ...(COE_CELData.templateD.otherUnitStatus && { otherUnitStatus: COE_CELData.templateD.otherUnitStatus }),
//                     ...(COE_CELData.templateD.timerStatus && { timerStatus: COE_CELData.templateD.timerStatus }),
//                     ...(COE_CELData.templateD.electricStatus && { electricStatus: COE_CELData.templateD.electricStatus }),
//                     ...(COE_CELData.templateD.mightyLubeMonitoring && { mightyLubeMonitoring: COE_CELData.templateD.mightyLubeMonitoring }),
//                     ...(COE_CELData.templateD.preMountType && { preMountType: COE_CELData.templateD.preMountType }),
//                     ...(COE_CELData.templateD.otherControllerNotes && { otherControllerNotes: COE_CELData.templateD.otherControllerNotes }),


//             },

//             templateEData: 
//             {
//                 conveyorName: COE_CELData.templateE.conveyorName,
//                 ...(COE_CELData.templateE.chainSize && { chainSize: COE_CELData.templateE.chainSize }),
//                 ...(COE_CELData.templateE.otherChainSize && { otherChainSize: COE_CELData.templateE.otherChainSize }),
//                 ...(COE_CELData.templateE.industrialChainManufacturer && { industrialChainManufacturer: COE_CELData.templateE.industrialChainManufacturer }),
//                 ...(COE_CELData.templateE.otherChainManufacturer && { otherChainManufacturer: COE_CELData.templateE.otherChainManufacturer }),
//                 ...(COE_CELData.templateE.conveyorLength && { conveyorLength: COE_CELData.templateE.conveyorLength }),
//                 ...(COE_CELData.templateE.conveyorLengthUnit && { conveyorLengthUnit: COE_CELData.templateE.conveyorLengthUnit }),
//                 ...(COE_CELData.templateE.appEnviroment && { appEnviroment: COE_CELData.templateE.appEnviroment }),
//                 ...(COE_CELData.templateE.otherAppEnviroment && { otherAppEnviroment: COE_CELData.templateE.otherAppEnviroment }),
//                 ...(COE_CELData.templateE.lubeBrand && { lubeBrand: COE_CELData.templateE.lubeBrand }),
//                 ...(COE_CELData.templateE.lubeType && { lubeType: COE_CELData.templateE.lubeType }),
//                 ...(COE_CELData.templateE.lubeViscosity && { lubeViscosity: COE_CELData.templateE.lubeViscosity }),
//                 ...(COE_CELData.templateE.specialControllerOptions && { specialControllerOptions: COE_CELData.templateE.specialControllerOptions }),
//                 ...(COE_CELData.templateE.wireMeasurementUnit && { wireMeasurementUnit: COE_CELData.templateE.wireMeasurementUnit }),
//                 ...(COE_CELData.templateE.conductor2 && { conductor2: COE_CELData.templateE.conductor2 }),
//                 ...(COE_CELData.templateE.conductor4 && { conductor4: COE_CELData.templateE.conductor4 }),
//                 ...(COE_CELData.templateE.conductor7 && { conductor7: COE_CELData.templateE.conductor7 }),
//                 ...(COE_CELData.templateE.conductor12 && { conductor12: COE_CELData.templateE.conductor12 }),
//                 ...(COE_CELData.templateE.junctionBoxNum && { junctionBoxNum: COE_CELData.templateE.junctionBoxNum }),

//             },

//             ...(COE_CELData.wheelOpenType && { wheelOpenType: COE_CELData.wheelOpenType }),
//             ...(COE_CELData.wheelClosedType && { wheelClosedType: COE_CELData.wheelClosedType }),
//             ...(COE_CELData.openStatus && { openStatus: COE_CELData.openStatus }),
//             ...(COE_CELData.catDriveStatus && { catDriveStatus: COE_CELData.catDriveStatus }),
//             ...(COE_CELData.railLubeStatus && { railLubeStatus: COE_CELData.railLubeStatus }),
//             ...(COE_CELData.externalLubeStatus && { externalLubeStatus: COE_CELData.externalLubeStatus }),
//             ...(COE_CELData.lubeBrand && { lubeBrand: COE_CELData.lubeBrand }),
//             ...(COE_CELData.lubeType && { lubeType: COE_CELData.lubeType }),
//             ...(COE_CELData.lubeViscosity && { lubeViscosity: COE_CELData.lubeViscosity }),
//             ...(COE_CELData.chainCleanStatus && { chainCleanStatus: COE_CELData.chainCleanStatus }),
//             ...(COE_CELData.wireMeasurementUnit && { wireMeasurementUnit: COE_CELData.wireMeasurementUnit }),
//             ...(COE_CELData.conductor2 && { conductor2: COE_CELData.conductor2 }),
//             ...(COE_CELData.conductor4 && { conductor4: COE_CELData.conductor4 }),
//             ...(COE_CELData.conductor7 && { conductor7: COE_CELData.conductor7 }),
//             ...(COE_CELData.conductor12 && { conductor12: COE_CELData.conductor12 }),
//             ...(COE_CELData.junctionBoxNum && { junctionBoxNum: COE_CELData.junctionBoxNum }),
//             ...(COE_CELData.coeUnitType && { coeUnitType: COE_CELData.coeUnitType }),
//             ...(COE_CELData.coeLineA && { coeLineA: COE_CELData.coeLineA }),
//             ...(COE_CELData.coeLineG && { coeLineG: COE_CELData.coeLineG }),
//             ...(COE_CELData.coeLineH && { coeLineH: COE_CELData.coeLineH }),
//             ...(COE_CELData.coeLineJ && { coeLineJ: COE_CELData.coeLineJ }),
//             ...(COE_CELData.coeLineX && { coeLineX: COE_CELData.coeLineX }),
//             ...(COE_CELData.coeLineY && { coeLineY: COE_CELData.coeLineY }),
//         });

//         req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "COE_CEL" });
//         await req.user.save();

//         return res.status(200).json({ message: "COE_CEL entry added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;



/**
 * routes/COE_CEL.js
 * -----------------
 * ✅ Update done:
 * 1) Added optional technicianNote (trim + save only if non-empty)
 * 2) Added safe guards so API doesn't crash if COE_CELData / template objects are missing
 * 3) Added detailed comments (same style as earlier)
 *
 * NOTE:
 * - Ensure your COE_CEL mongoose schema includes:
 *   technicianNote: { type: String, required: false }
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (unused in this route, safe to remove)
const { authenticate } = require("./sessions");
const COE_CEL = require("../models/COE_CEL");

// These imports seem unused in this route file (you are not instantiating template models directly).
// Keeping them is harmless, but you can remove them to clean up warnings.
const templateA = require("../models/templateA");
const templateD = require("../models/templateD");
const templateE = require("../models/templateE");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    // ✅ Read request body safely
    const { COE_CELData, numRequested } = req.body || {};

    // ✅ Guard: avoid crash if payload missing
    if (!COE_CELData) {
      return res.status(400).json({ error: "COE_CELData is required" });
    }

    // ✅ Guard: templates might be missing in payload; use empty objects instead of crashing
    const tA = COE_CELData.templateA || {};
    const tD = COE_CELData.templateD || {};
    const tE = COE_CELData.templateE || {};

    // ✅ Create a Mongoose document with received configuration
    const order = new COE_CEL({
      // -------------------------
      // Main / top-level fields
      // -------------------------
      conveyorName: COE_CELData.conveyorName,
      chainSize: COE_CELData.chainSize,
      ...(COE_CELData.otherChainSize && { otherChainSize: COE_CELData.otherChainSize }),

      industrialChainManufacturer: COE_CELData.industrialChainManufacturer,
      ...(COE_CELData.otherIndustrialChainManufacturer && {
        otherIndustrialChainManufacturer: COE_CELData.otherIndustrialChainManufacturer,
      }),

      conveyorLength: COE_CELData.conveyorLength,
      conveyorLengthUnit: COE_CELData.conveyorLengthUnit,
      conveyorSpeed: COE_CELData.conveyorSpeed,
      conveyorSpeedUnit: COE_CELData.conveyorSpeedUnit,

      ...(COE_CELData.conveyorIndex && { conveyorIndex: COE_CELData.conveyorIndex }),
      ...(COE_CELData.travelDirection && { travelDirection: COE_CELData.travelDirection }),

      appEnviroment: COE_CELData.appEnviroment,
      ...(COE_CELData.ovenStatus && { ovenStatus: COE_CELData.ovenStatus }),
      ...(COE_CELData.ovenTemp && { ovenTemp: COE_CELData.ovenTemp }),
      ...(COE_CELData.otherAppEnviroment && { otherAppEnviroment: COE_CELData.otherAppEnviroment }),

      ...(COE_CELData.surroundingTemp && { surroundingTemp: COE_CELData.surroundingTemp }),
      ...(COE_CELData.conveyorLoaded && { conveyorLoaded: COE_CELData.conveyorLoaded }),
      ...(COE_CELData.conveyorSwing && { conveyorSwing: COE_CELData.conveyorSwing }),

      ...(COE_CELData.plantLayout && { plantLayout: COE_CELData.plantLayout }),
      ...(COE_CELData.requiredPics && { requiredPics: COE_CELData.requiredPics }),

      operatingVoltage: COE_CELData.operatingVoltage,

      /**
       * ✅ NEW: technicianNote (optional)
       * Frontend should send: COE_CELData.technicianNote
       */
      ...(COE_CELData.technicianNote &&
        COE_CELData.technicianNote.trim() && {
          technicianNote: COE_CELData.technicianNote.trim(),
        }),

      // -------------------------
      // Monitor Data (Template A)
      // -------------------------
      monitorData: {
        // Required / expected keys
        existingMonitor: tA.existingMonitor,
        newMonitor: tA.newMonitor,

        // Optional keys
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
      wheelSealedChain: COE_CELData.wheelSealedChain,

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
      // Template E Data (nested)
      // -------------------------
      templateEData: {
        conveyorName: tE.conveyorName,
        ...(tE.chainSize && { chainSize: tE.chainSize }),
        ...(tE.otherChainSize && { otherChainSize: tE.otherChainSize }),
        ...(tE.industrialChainManufacturer && { industrialChainManufacturer: tE.industrialChainManufacturer }),
        ...(tE.otherChainManufacturer && { otherChainManufacturer: tE.otherChainManufacturer }),
        ...(tE.conveyorLength && { conveyorLength: tE.conveyorLength }),
        ...(tE.conveyorLengthUnit && { conveyorLengthUnit: tE.conveyorLengthUnit }),
        ...(tE.appEnviroment && { appEnviroment: tE.appEnviroment }),
        ...(tE.otherAppEnviroment && { otherAppEnviroment: tE.otherAppEnviroment }),
        ...(tE.lubeBrand && { lubeBrand: tE.lubeBrand }),
        ...(tE.lubeType && { lubeType: tE.lubeType }),
        ...(tE.lubeViscosity && { lubeViscosity: tE.lubeViscosity }),
        ...(tE.specialControllerOptions && { specialControllerOptions: tE.specialControllerOptions }),
        ...(tE.wireMeasurementUnit && { wireMeasurementUnit: tE.wireMeasurementUnit }),
        ...(tE.conductor2 && { conductor2: tE.conductor2 }),
        ...(tE.conductor4 && { conductor4: tE.conductor4 }),
        ...(tE.conductor7 && { conductor7: tE.conductor7 }),
        ...(tE.conductor12 && { conductor12: tE.conductor12 }),
        ...(tE.junctionBoxNum && { junctionBoxNum: tE.junctionBoxNum }),
      },

      // -------------------------
      // Additional optional fields (top-level)
      // -------------------------
      ...(COE_CELData.wheelOpenType && { wheelOpenType: COE_CELData.wheelOpenType }),
      ...(COE_CELData.wheelClosedType && { wheelClosedType: COE_CELData.wheelClosedType }),
      ...(COE_CELData.openStatus && { openStatus: COE_CELData.openStatus }),
      ...(COE_CELData.catDriveStatus && { catDriveStatus: COE_CELData.catDriveStatus }),
      ...(COE_CELData.railLubeStatus && { railLubeStatus: COE_CELData.railLubeStatus }),
      ...(COE_CELData.externalLubeStatus && { externalLubeStatus: COE_CELData.externalLubeStatus }),
      ...(COE_CELData.lubeBrand && { lubeBrand: COE_CELData.lubeBrand }),
      ...(COE_CELData.lubeType && { lubeType: COE_CELData.lubeType }),
      ...(COE_CELData.lubeViscosity && { lubeViscosity: COE_CELData.lubeViscosity }),
      ...(COE_CELData.chainCleanStatus && { chainCleanStatus: COE_CELData.chainCleanStatus }),

      ...(COE_CELData.wireMeasurementUnit && { wireMeasurementUnit: COE_CELData.wireMeasurementUnit }),
      ...(COE_CELData.conductor2 && { conductor2: COE_CELData.conductor2 }),
      ...(COE_CELData.conductor4 && { conductor4: COE_CELData.conductor4 }),
      ...(COE_CELData.conductor7 && { conductor7: COE_CELData.conductor7 }),
      ...(COE_CELData.conductor12 && { conductor12: COE_CELData.conductor12 }),
      ...(COE_CELData.junctionBoxNum && { junctionBoxNum: COE_CELData.junctionBoxNum }),

      ...(COE_CELData.coeUnitType && { coeUnitType: COE_CELData.coeUnitType }),
      ...(COE_CELData.coeLineA && { coeLineA: COE_CELData.coeLineA }),
      ...(COE_CELData.coeLineG && { coeLineG: COE_CELData.coeLineG }),
      ...(COE_CELData.coeLineH && { coeLineH: COE_CELData.coeLineH }),
      ...(COE_CELData.coeLineJ && { coeLineJ: COE_CELData.coeLineJ }),
      ...(COE_CELData.coeLineX && { coeLineX: COE_CELData.coeLineX }),
      ...(COE_CELData.coeLineY && { coeLineY: COE_CELData.coeLineY }),
    });

    // ✅ Push into authenticated user's cart
    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "COE_CEL",
    });

    // ✅ Save cart changes
    await req.user.save();

    return res.status(200).json({ message: "COE_CEL entry added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
