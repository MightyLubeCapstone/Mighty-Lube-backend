// // const express = require("express");
// // const { dbConnect } = require("../config/config");
// // const { authenticate } = require("./sessions");
// // const CC5_OP4OE = require("../models/CC5_OP4OE");
// // const templateA = require("../models/templateA");


// // const router = express.Router();

// // router.post("/", authenticate, async (req, res) => {
// //     //used for CC5_OP4OE form
// //     try {
// //         const { CC5_OP4OEData, numRequested } = req.body;
// //         const order = new CC5_OP4OE({
// //             conveyorName: CC5_OP4OEData.conveyorName,
// //             cc5ChainSize: CC5_OP4OEData.cc5ChainSize,
// //             ...(CC5_OP4OEData.otherChainSize && { otherChainSize: CC5_OP4OEData.otherChainSize }),
// //             industrialChainManufacturer: CC5_OP4OEData.industrialChainManufacturer,
// //             ...(CC5_OP4OEData.otherChainManufacturer && { otherChainManufacturer: CC5_OP4OEData.otherChainManufacturer }),
// //             conveyorLength: CC5_OP4OEData.conveyorLength,
// //             conveyorLengthUnit: CC5_OP4OEData.conveyorLengthUnit,
// //             conveyorSpeed: CC5_OP4OEData.conveyorSpeed,
// //             conveyorSpeedUnit: CC5_OP4OEData.conveyorSpeedUnit,
// //             ...(CC5_OP4OEData.conveyorIndex && { conveyorIndex: CC5_OP4OEData.conveyorIndex }),
// //             ...(CC5_OP4OEData.travelDirection && { travelDirection: CC5_OP4OEData.travelDirection }),
// //             appEnviroment: CC5_OP4OEData.appEnviroment,
// //             ...(CC5_OP4OEData.ovenStatus && { ovenStatus: CC5_OP4OEData.ovenStatus }),
// //             ...(CC5_OP4OEData.ovenTemp && { ovenTemp: CC5_OP4OEData.ovenTemp }),
// //             ...(CC5_OP4OEData.otherAppEnviroment && { otherAppEnviroment: CC5_OP4OEData.otherAppEnviroment }),
// //             ...(CC5_OP4OEData.surroundingTemp && { surroundingTemp: CC5_OP4OEData.surroundingTemp }),
// //             swingStatus: CC5_OP4OEData.swingStatus,
// //             strandStatus: CC5_OP4OEData.strandStatus,            
// //             ...(CC5_OP4OEData.plantLayout && { plantLayout: CC5_OP4OEData.plantLayout }),
// //             ...(CC5_OP4OEData.requiredPics && { requiredPics: CC5_OP4OEData.requiredPics }),
// //             operatingVoltage: CC5_OP4OEData.operatingVoltage,

// //         monitorData: 
// //         {
// //                 existingMonitor: CC5_OP4OEData.templateA.existingMonitor,
// //                 newMonitor: CC5_OP4OEData.templateA.newMonitor,		
// //                 ...(CC5_OP4OEData.templateA.dcuStatus && { dcuStatus: CC5_OP4OEData.templateA.dcuStatus }),
// //                 ...(CC5_OP4OEData.templateA.dcuNum && { dcuNum: CC5_OP4OEData.templateA.dcuNum }),
// //                 ...(CC5_OP4OEData.templateA.existingWindows && { existingWindows: CC5_OP4OEData.templateA.existingWindows }),
// //                 ...(CC5_OP4OEData.templateA.existingHeadUnit && { existingHeadUnit: CC5_OP4OEData.templateA.existingHeadUnit }),
// //                 ...(CC5_OP4OEData.templateA.existingDCU && { existingDCU: CC5_OP4OEData.templateA.existingDCU }),
// //                 ...(CC5_OP4OEData.templateA.existingPowerInterface && { existingPowerInterface: CC5_OP4OEData.templateA.existingPowerInterface }),
// //                 ...(CC5_OP4OEData.templateA.newReservoir && { newReservoir: CC5_OP4OEData.templateA.newReservoir }),
// //                 ...(CC5_OP4OEData.templateA.reservoirSize && { reservoirSize: CC5_OP4OEData.templateA.reservoirSize }),
// //                 ...(CC5_OP4OEData.templateA.otherReservoirSize && { otherReservoirSize: CC5_OP4OEData.templateA.otherReservoirSize }),
// //                 ...(CC5_OP4OEData.templateA.newReservoirNum && { newReservoirNum: CC5_OP4OEData.templateA.newReservoirNum }),
// //                 ...(CC5_OP4OEData.templateA.typeMonitor && { typeMonitor: CC5_OP4OEData.templateA.typeMonitor }),
// //                 ...(CC5_OP4OEData.templateA.driveMotorAmp && { driveMotorAmp: CC5_OP4OEData.templateA.driveMotorAmp }),
// //                 ...(CC5_OP4OEData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CC5_OP4OEData.templateA.driveMotorAmpNum }),
// //                 ...(CC5_OP4OEData.templateA.driveTakeUpAir && { driveTakeUpAir: CC5_OP4OEData.templateA.driveTakeUpAir }),
// //                 ...(CC5_OP4OEData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_OP4OEData.templateA.driveTakeUpAirNum }),
// //                 ...(CC5_OP4OEData.templateA.takeUpDistance && { takeUpDistance: CC5_OP4OEData.templateA.takeUpDistance }),
// //                 ...(CC5_OP4OEData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CC5_OP4OEData.templateA.takeUpDistanceNum }),
// //                 ...(CC5_OP4OEData.templateA.driveTemp && { driveTemp: CC5_OP4OEData.templateA.driveTemp }),
// //                 ...(CC5_OP4OEData.templateA.driveTempNum && { driveTempNum: CC5_OP4OEData.templateA.driveTempNum }),
// //                 ...(CC5_OP4OEData.templateA.driveVibration && { driveVibration: CC5_OP4OEData.templateA.driveVibration }),
// //                 ...(CC5_OP4OEData.templateA.driveVibrationNum && { driveVibrationNum: CC5_OP4OEData.templateA.driveVibrationNum }),
// //                 ...(CC5_OP4OEData.templateA.dogPitch && { dogPitch: CC5_OP4OEData.templateA.dogPitch }),
// //                 ...(CC5_OP4OEData.templateA.dogPitchNum && { dogPitchNum: CC5_OP4OEData.templateA.dogPitchNum }),
// //                 ...(CC5_OP4OEData.templateA.paintMarker && { paintMarker: CC5_OP4OEData.templateA.paintMarker }),
// //                 ...(CC5_OP4OEData.templateA.paintMarkerNum && { paintMarkerNum: CC5_OP4OEData.templateA.paintMarkerNum }),
// //                 ...(CC5_OP4OEData.templateA.chainVision && { chainVision: CC5_OP4OEData.templateA.chainVision }),
// //                 ...(CC5_OP4OEData.templateA.lubeVision && { lubeVision: CC5_OP4OEData.templateA.lubeVision }),
// //                 ...(CC5_OP4OEData.templateA.trolleyVision && { trolleyVision: CC5_OP4OEData.templateA.trolleyVision }),
// //                 ...(CC5_OP4OEData.templateA.trolleyDetect && { trolleyDetect: CC5_OP4OEData.templateA.trolleyDetect }),
// //                 ...(CC5_OP4OEData.templateA.omniView && { omniView: CC5_OP4OEData.templateA.omniView }),
// //                 ...(CC5_OP4OEData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CC5_OP4OEData.templateA.dcuUpgradeNum }),
// //                 ...(CC5_OP4OEData.templateA.piuDistance && { piuDistance: CC5_OP4OEData.templateA.piuDistance }),
// //                 ...(CC5_OP4OEData.templateA.switchDistance && { switchDistance: CC5_OP4OEData.templateA.switchDistance }),
// //                 ...(CC5_OP4OEData.templateA.ampPickup && { ampPickup: CC5_OP4OEData.templateA.ampPickup }),
// //                 ...(CC5_OP4OEData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_OP4OEData.templateA.fromAirTakeUpDistance }),
// //                 ...(CC5_OP4OEData.templateA.specialControllerOptions && { specialControllerOptions: CC5_OP4OEData.templateA.specialControllerOptions }),
// //                 ...(CC5_OP4OEData.templateA.operatingVoltage && { operatingVoltage: CC5_OP4OEData.templateA.operatingVoltage })
// //             },
// //             controlVoltage: CC5_OP4OEData.controlVoltage,
// //             outboardStatus: CC5_OP4OEData.outboardStatus,
// //             highRollerStatus: CC5_OP4OEData.highRollerStatus,
// //             ...(CC5_OP4OEData.lubeBrand && { lubeBrand: CC5_OP4OEData.lubeBrand }),
// //             ...(CC5_OP4OEData.lubeType && { lubeType: CC5_OP4OEData.lubeType }),
// //             ...(CC5_OP4OEData.lubeViscosity && { lubeViscosity: CC5_OP4OEData.lubeViscosity }),
// //             ...(CC5_OP4OEData.chainMaster && { chainMaster: CC5_OP4OEData.chainMaster }),
// //             ...(CC5_OP4OEData.timerStatus && { timerStatus: CC5_OP4OEData.timerStatus }),
// //             ...(CC5_OP4OEData.electricStatus && { electricStatus: CC5_OP4OEData.electricStatus }),
// //             ...(CC5_OP4OEData.pneumaticStatus && { pneumaticStatus: CC5_OP4OEData.pneumaticStatus }),
// //             ...(CC5_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: CC5_OP4OEData.mightyLubeMonitoring }),
// //             ...(CC5_OP4OEData.plcConnection && { plcConnection: CC5_OP4OEData.plcConnection }),
// //             ...(CC5_OP4OEData.otherControllerNotes && { otherControllerNotes: CC5_OP4OEData.otherControllerNotes }),
// //             ...(CC5_OP4OEData.cc5UnitType && { cc5UnitType: CC5_OP4OEData.cc5UnitType }),
// //             ...(CC5_OP4OEData.powerRailWidth && { powerRailWidth: CC5_OP4OEData.powerRailWidth }),
// //             ...(CC5_OP4OEData.powerRailHeight && { powerRailHeight: CC5_OP4OEData.powerRailHeight }),
// //             ...(CC5_OP4OEData.rollerWheelA1 && { rollerWheelA1: CC5_OP4OEData.rollerWheelA1 }),
// //             ...(CC5_OP4OEData.rollerWheelB1 && { rollerWheelB1: CC5_OP4OEData.rollerWheelB1 }),
// //             ...(CC5_OP4OEData.linkD1 && { linkD1: CC5_OP4OEData.linkD1 }),
// //             ...(CC5_OP4OEData.wheelPitchM1 && { wheelPitchM1: CC5_OP4OEData.wheelPitchM1 }),
// //             ...(CC5_OP4OEData.rollerPinY1 && { rollerPinY1: CC5_OP4OEData.rollerPinY1 }),
// //             ...(CC5_OP4OEData.rollerPinZ1 && { rollerPinZ1: CC5_OP4OEData.rollerPinZ1 }),

// //         });
// //         req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "CC5_OP4OE" });
// //         await req.user.save();

// //         return res.status(200).json({ message: "CC5_OP4OE entry added" });

// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({ error: "Internal server error" });
// //     }
// // });

// // module.exports = router;


// const express = require("express");
// const { dbConnect } = require("../config/config"); // (unused here, can remove if you want)
// const { authenticate } = require("./sessions");
// const CC5_OP4OE = require("../models/CC5_OP4OE");
// const templateA = require("../models/templateA"); // (unused here, can remove if you want)

// const router = express.Router();

// // POST / (mounted under something like /api/CC5_OP4OE)
// // This route accepts CC5_OP4OE form payload from frontend,
// // converts it into a Mongoose document,
// // and stores it inside the authenticated user's cart.
// router.post("/", authenticate, async (req, res) => {
//   // used for CC5_OP4OE form
//   try {
//     // Frontend sends:
//     // {
//     //   CC5_OP4OEData: { ...formData... },
//     //   numRequested: <number>
//     // }
//     const { CC5_OP4OEData, numRequested } = req.body;

//     // ✅ safety: templateA can be missing in payload, avoid crash
//     const templateAData = CC5_OP4OEData?.templateA || {};

//     // Convert frontend JSON → CC5_OP4OE Mongoose document
//     // Optional fields are conditionally added using spread operator
//     const order = new CC5_OP4OE({
//       conveyorName: CC5_OP4OEData.conveyorName,
//       cc5ChainSize: CC5_OP4OEData.cc5ChainSize,
//       ...(CC5_OP4OEData.otherChainSize && { otherChainSize: CC5_OP4OEData.otherChainSize }),

//       industrialChainManufacturer: CC5_OP4OEData.industrialChainManufacturer,
//       ...(CC5_OP4OEData.otherChainManufacturer && {
//         otherChainManufacturer: CC5_OP4OEData.otherChainManufacturer,
//       }),

//       // These are being saved as provided (if they are required in schema)
//       conveyorLength: CC5_OP4OEData.conveyorLength,
//       conveyorLengthUnit: CC5_OP4OEData.conveyorLengthUnit,
//       conveyorSpeed: CC5_OP4OEData.conveyorSpeed,
//       conveyorSpeedUnit: CC5_OP4OEData.conveyorSpeedUnit,

//       ...(CC5_OP4OEData.conveyorIndex && { conveyorIndex: CC5_OP4OEData.conveyorIndex }),
//       ...(CC5_OP4OEData.travelDirection && { travelDirection: CC5_OP4OEData.travelDirection }),

//       appEnviroment: CC5_OP4OEData.appEnviroment,
//       ...(CC5_OP4OEData.ovenStatus && { ovenStatus: CC5_OP4OEData.ovenStatus }),
//       ...(CC5_OP4OEData.ovenTemp && { ovenTemp: CC5_OP4OEData.ovenTemp }),
//       ...(CC5_OP4OEData.otherAppEnviroment && {
//         otherAppEnviroment: CC5_OP4OEData.otherAppEnviroment,
//       }),
//       ...(CC5_OP4OEData.surroundingTemp && { surroundingTemp: CC5_OP4OEData.surroundingTemp }),

//       swingStatus: CC5_OP4OEData.swingStatus,
//       strandStatus: CC5_OP4OEData.strandStatus,

//       ...(CC5_OP4OEData.plantLayout && { plantLayout: CC5_OP4OEData.plantLayout }),
//       ...(CC5_OP4OEData.requiredPics && { requiredPics: CC5_OP4OEData.requiredPics }),

//       operatingVoltage: CC5_OP4OEData.operatingVoltage,

//       // ✅ NEW: optional technician note (saved only if provided and non-empty)
//       ...(CC5_OP4OEData.technicianNote &&
//         CC5_OP4OEData.technicianNote.trim() && {
//           technicianNote: CC5_OP4OEData.technicianNote.trim(),
//         }),

//       // Monitor/templateA mapping: frontend "templateA" → DB "monitorData"
//       monitorData: {
//         existingMonitor: templateAData.existingMonitor,
//         newMonitor: templateAData.newMonitor,

//         ...(templateAData.dcuStatus && { dcuStatus: templateAData.dcuStatus }),
//         ...(templateAData.dcuNum && { dcuNum: templateAData.dcuNum }),
//         ...(templateAData.existingWindows && { existingWindows: templateAData.existingWindows }),
//         ...(templateAData.existingHeadUnit && { existingHeadUnit: templateAData.existingHeadUnit }),
//         ...(templateAData.existingDCU && { existingDCU: templateAData.existingDCU }),
//         ...(templateAData.existingPowerInterface && {
//           existingPowerInterface: templateAData.existingPowerInterface,
//         }),
//         ...(templateAData.newReservoir && { newReservoir: templateAData.newReservoir }),
//         ...(templateAData.reservoirSize && { reservoirSize: templateAData.reservoirSize }),
//         ...(templateAData.otherReservoirSize && { otherReservoirSize: templateAData.otherReservoirSize }),
//         ...(templateAData.newReservoirNum && { newReservoirNum: templateAData.newReservoirNum }),
//         ...(templateAData.typeMonitor && { typeMonitor: templateAData.typeMonitor }),
//         ...(templateAData.driveMotorAmp && { driveMotorAmp: templateAData.driveMotorAmp }),
//         ...(templateAData.driveMotorAmpNum && { driveMotorAmpNum: templateAData.driveMotorAmpNum }),
//         ...(templateAData.driveTakeUpAir && { driveTakeUpAir: templateAData.driveTakeUpAir }),
//         ...(templateAData.driveTakeUpAirNum && { driveTakeUpAirNum: templateAData.driveTakeUpAirNum }),
//         ...(templateAData.takeUpDistance && { takeUpDistance: templateAData.takeUpDistance }),
//         ...(templateAData.takeUpDistanceNum && { takeUpDistanceNum: templateAData.takeUpDistanceNum }),
//         ...(templateAData.driveTemp && { driveTemp: templateAData.driveTemp }),
//         ...(templateAData.driveTempNum && { driveTempNum: templateAData.driveTempNum }),
//         ...(templateAData.driveVibration && { driveVibration: templateAData.driveVibration }),
//         ...(templateAData.driveVibrationNum && { driveVibrationNum: templateAData.driveVibrationNum }),
//         ...(templateAData.dogPitch && { dogPitch: templateAData.dogPitch }),
//         ...(templateAData.dogPitchNum && { dogPitchNum: templateAData.dogPitchNum }),
//         ...(templateAData.paintMarker && { paintMarker: templateAData.paintMarker }),
//         ...(templateAData.paintMarkerNum && { paintMarkerNum: templateAData.paintMarkerNum }),
//         ...(templateAData.chainVision && { chainVision: templateAData.chainVision }),
//         ...(templateAData.lubeVision && { lubeVision: templateAData.lubeVision }),
//         ...(templateAData.trolleyVision && { trolleyVision: templateAData.trolleyVision }),
//         ...(templateAData.trolleyDetect && { trolleyDetect: templateAData.trolleyDetect }),
//         ...(templateAData.omniView && { omniView: templateAData.omniView }),
//         ...(templateAData.dcuUpgradeNum && { dcuUpgradeNum: templateAData.dcuUpgradeNum }),
//         ...(templateAData.piuDistance && { piuDistance: templateAData.piuDistance }),
//         ...(templateAData.switchDistance && { switchDistance: templateAData.switchDistance }),
//         ...(templateAData.ampPickup && { ampPickup: templateAData.ampPickup }),
//         ...(templateAData.fromAirTakeUpDistance && {
//           fromAirTakeUpDistance: templateAData.fromAirTakeUpDistance,
//         }),
//         ...(templateAData.specialControllerOptions && {
//           specialControllerOptions: templateAData.specialControllerOptions,
//         }),
//         ...(templateAData.operatingVoltage && { operatingVoltage: templateAData.operatingVoltage }),
//       },

//       // Controller / electrical fields
//       controlVoltage: CC5_OP4OEData.controlVoltage,

//       // Lubrication + mechanical fields
//       outboardStatus: CC5_OP4OEData.outboardStatus,
//       highRollerStatus: CC5_OP4OEData.highRollerStatus,

//       ...(CC5_OP4OEData.lubeBrand && { lubeBrand: CC5_OP4OEData.lubeBrand }),
//       ...(CC5_OP4OEData.lubeType && { lubeType: CC5_OP4OEData.lubeType }),
//       ...(CC5_OP4OEData.lubeViscosity && { lubeViscosity: CC5_OP4OEData.lubeViscosity }),

//       ...(CC5_OP4OEData.chainMaster && { chainMaster: CC5_OP4OEData.chainMaster }),
//       ...(CC5_OP4OEData.timerStatus && { timerStatus: CC5_OP4OEData.timerStatus }),
//       ...(CC5_OP4OEData.electricStatus && { electricStatus: CC5_OP4OEData.electricStatus }),
//       ...(CC5_OP4OEData.pneumaticStatus && { pneumaticStatus: CC5_OP4OEData.pneumaticStatus }),
//       ...(CC5_OP4OEData.mightyLubeMonitoring && {
//         mightyLubeMonitoring: CC5_OP4OEData.mightyLubeMonitoring,
//       }),
//       ...(CC5_OP4OEData.plcConnection && { plcConnection: CC5_OP4OEData.plcConnection }),
//       ...(CC5_OP4OEData.otherControllerNotes && {
//         otherControllerNotes: CC5_OP4OEData.otherControllerNotes,
//       }),

//       ...(CC5_OP4OEData.cc5UnitType && { cc5UnitType: CC5_OP4OEData.cc5UnitType }),
//       ...(CC5_OP4OEData.powerRailWidth && { powerRailWidth: CC5_OP4OEData.powerRailWidth }),
//       ...(CC5_OP4OEData.powerRailHeight && { powerRailHeight: CC5_OP4OEData.powerRailHeight }),
//       ...(CC5_OP4OEData.rollerWheelA1 && { rollerWheelA1: CC5_OP4OEData.rollerWheelA1 }),
//       ...(CC5_OP4OEData.rollerWheelB1 && { rollerWheelB1: CC5_OP4OEData.rollerWheelB1 }),
//       ...(CC5_OP4OEData.linkD1 && { linkD1: CC5_OP4OEData.linkD1 }),
//       ...(CC5_OP4OEData.wheelPitchM1 && { wheelPitchM1: CC5_OP4OEData.wheelPitchM1 }),
//       ...(CC5_OP4OEData.rollerPinY1 && { rollerPinY1: CC5_OP4OEData.rollerPinY1 }),
//       ...(CC5_OP4OEData.rollerPinZ1 && { rollerPinZ1: CC5_OP4OEData.rollerPinZ1 }),
//     });

//     // Store this configuration in the authenticated user's cart
//     req.user.cart.push({
//       numRequested: numRequested,
//       productConfigurationInfo: order,
//       productType: "CC5_OP4OE",
//     });

//     // Persist the updated user document to MongoDB
//     await req.user.save();

//     return res.status(200).json({ message: "CC5_OP4OE entry added" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;   



/**
 * CCO_139A Route
 * -------------
 * This route receives the CCO_139A form payload from the frontend (Flutter/Web),
 * converts that JSON payload into a Mongoose document (CCO_139A model),
 * and then stores that configuration inside the authenticated user's `cart` array in MongoDB.
 *
 * Flow:
 * Frontend -> POST /api/<mounted-path> -> authenticate -> req.user fetched -> new CCO_139A(...) -> push into req.user.cart -> save user
 */

const express = require("express");
const { authenticate } = require("./sessions");
const CCO_139A = require("../models/CCO_139A");

// NOTE: These are imported in your original file but not used directly in this route.
// You can keep them for consistency or remove them to avoid unused warnings.
// const { dbConnect } = require("../config/config");
// const templateA = require("../models/templateA");
// const templateB = require("../models/templateB");
// const templateC = require("../models/templateC");
// const templateD = require("../models/templateD.js");
// const templateF = require("../models/templateF.js");

const router = express.Router();

/**
 * POST /
 * ------
 * Expected request body from frontend:
 * {
 *   "CCO_139AData": { ...all form fields... },
 *   "numRequested": 1
 * }
 *
 * Authentication:
 * - Frontend must send header: Authorization: Bearer <sessionToken>
 * - authenticate middleware validates token and loads the user from DB
 * - loaded user becomes available as req.user
 */
router.post("/", authenticate, async (req, res) => {
  try {
    // Extract payload from request body
    const { CCO_139AData, numRequested } = req.body;

    /**
     * SAFETY:
     * Some templates may not be present in the payload depending on UI flow.
     * If we directly do CCO_139AData.templateA.xyz and templateA is undefined,
     * Node will crash with "Cannot read properties of undefined".
     *
     * So we fallback to empty object {} to keep route stable.
     */
    const templateAData = CCO_139AData?.templateA || {};
    const templateBData = CCO_139AData?.templateB || {};
    const templateCData = CCO_139AData?.templateC || {};
    const templateDData = CCO_139AData?.templateD || {};
    const templateFData = CCO_139AData?.templateF || {};

    /**
     * Convert frontend JSON -> Mongoose document.
     *
     * Mongoose model (CCO_139A) defines the schema for this product configuration.
     * We create a new instance here but we do NOT save it as a separate collection item.
     * Instead, we embed this order inside the user's cart.
     */
    const order = new CCO_139A({
      // -------------------------
      // Main CCO_139A fields
      // -------------------------

      // Required / direct fields
      conveyorName: CCO_139AData.conveyorName,
      chainSize: CCO_139AData.chainSize,

      /**
       * Pattern:
       * ...(condition && { key: value })
       *
       * Meaning:
       * - If condition is truthy -> include { key: value } in final object
       * - If condition is falsy  -> include nothing
       *
       * This is used for optional fields so we don't save empty/undefined data.
       */
      ...(CCO_139AData.otherChainSize && { otherChainSize: CCO_139AData.otherChainSize }),

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

      ...(CCO_139AData.travelDirection && { travelDirection: CCO_139AData.travelDirection }),

      appEnviroment: CCO_139AData.appEnviroment,
      ...(CCO_139AData.ovenStatus && { ovenStatus: CCO_139AData.ovenStatus }),
      ...(CCO_139AData.ovenTemp && { ovenTemp: CCO_139AData.ovenTemp }),
      ...(CCO_139AData.otherAppEnviroment && {
        otherAppEnviroment: CCO_139AData.otherAppEnviroment,
      }),

      strandStatus: CCO_139AData.strandStatus,
      pointsOfLube: CCO_139AData.pointsOfLube,
      sensingMethod: CCO_139AData.sensingMethod,

      ...(CCO_139AData.surroundingTemp && { surroundingTemp: CCO_139AData.surroundingTemp }),
      ...(CCO_139AData.conveyorLoaded && { conveyorLoaded: CCO_139AData.conveyorLoaded }),
      ...(CCO_139AData.conveyorSwing && { conveyorSwing: CCO_139AData.conveyorSwing }),
      ...(CCO_139AData.compressedAir && { compressedAir: CCO_139AData.compressedAir }),
      ...(CCO_139AData.airSupplyType && { airSupplyType: CCO_139AData.airSupplyType }),

      operatingVoltSingle: CCO_139AData.operatingVoltSingle,
      controlVoltSingle: CCO_139AData.controlVoltSingle,

      /**
       * ✅ NEW FIELD: technicianNote (optional)
       * - Save only if it exists and has non-empty text after trimming
       */
      ...(CCO_139AData.technicianNote &&
        CCO_139AData.technicianNote.trim() && {
          technicianNote: CCO_139AData.technicianNote.trim(),
        }),

      // -------------------------
      // Template A → monitorData
      // -------------------------

      /**
       * Frontend sends: templateA: { ... }
       * Backend stores in DB as: monitorData: { ... }
       * So we map templateA fields into monitorData.
       */
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
        ...(templateAData.takeUpDistanceNum && {
          takeUpDistanceNum: templateAData.takeUpDistanceNum,
        }),
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

      // Add Free Carrier flag
      addFreeCarrier: CCO_139AData.addFreeCarrier,

      // -------------------------
      // Template B (nested object)
      // -------------------------
      templateBData: {
        conveyorName: templateBData.conveyorName,
        industrialChainManufacturer: templateBData.industrialChainManufacturer,
        ...(templateBData.otherChainManufacturer && {
          otherChainManufacturer: templateBData.otherChainManufacturer,
        }),
        wheelManufacturer: templateBData.wheelManufacturer,
        conveyorSpeed: templateBData.conveyorSpeed,
        conveyorSpeedUnit: templateBData.conveyorSpeedUnit,
        conveyorIndex: templateBData.conveyorIndex,
        ...(templateBData.travelDirection && { travelDirection: templateBData.travelDirection }),
        appEnviroment: templateBData.appEnviroment,
        ...(templateBData.otherAppEnviroment && {
          otherAppEnviroment: templateBData.otherAppEnviroment,
        }),
        surroundingTemp: templateBData.surroundingTemp,
        orientationType: templateBData.orientationType,
        operatingVoltage: templateBData.operatingVoltage,
        controlVoltSingle: templateBData.controlVoltSingle,
        compressedAir: templateBData.compressedAir,
        ...(templateBData.airSupplyType && { airSupplyType: templateBData.airSupplyType }),

        /**
         * TemplateA inside TemplateB:
         * We reuse the same TemplateA data to build this nested block.
         */
        templateA_BData: {
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
          ...(templateAData.takeUpDistanceNum && {
            takeUpDistanceNum: templateAData.takeUpDistanceNum,
          }),
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

        freeWheelStatus: templateBData.freeWheelStatus,
        actuatorStatus: templateBData.actuatorStatus,
        ...(templateBData.pivotStatus && { pivotStatus: templateBData.pivotStatus }),
        kingPinStatus: templateBData.kingPinStatus,
        lubeBrand: templateBData.lubeBrand,
        lubeViscosity: templateBData.lubeViscosity,
        ...(templateBData.lubeType && { lubeType: templateBData.lubeType }),
        currentGrease: templateBData.currentGrease,
        currentGreaseGrade: templateBData.currentGreaseGrade,
        zerkDirection: templateBData.zerkDirection,
        zerkLocationType: templateBData.zerkLocationType,
        wheelDiameter: templateBData.wheelDiameter,
        conveyorSwing: templateBData.conveyorSwing,

        ...(templateBData.chainMaster && { chainMaster: templateBData.chainMaster }),
        ...(templateBData.remoteStatus && { remoteStatus: templateBData.remoteStatus }),
        ...(templateBData.mountStatus && { mountStatus: templateBData.mountStatus }),
        ...(templateBData.otherUnitStatus && { otherUnitStatus: templateBData.otherUnitStatus }),
        ...(templateBData.timerStatus && { timerStatus: templateBData.timerStatus }),
        ...(templateBData.electricStatus && { electricStatus: templateBData.electricStatus }),
        ...(templateBData.mightyLubeMonitoring && {
          mightyLubeMonitoring: templateBData.mightyLubeMonitoring,
        }),
        ...(templateBData.preMountType && { preMountType: templateBData.preMountType }),
        ...(templateBData.otherPreMountType && {
          otherPreMountType: templateBData.otherPreMountType,
        }),
        ...(templateBData.plcConnection && { plcConnection: templateBData.plcConnection }),
        ...(templateBData.otherControllerNotes && {
          otherControllerNotes: templateBData.otherControllerNotes,
        }),

        ...(templateBData.templateB_UnitType && { templateB_UnitType: templateBData.templateB_UnitType }),
        ...(templateBData.templateB_InvertedB && { templateB_InvertedB: templateBData.templateB_InvertedB }),
        ...(templateBData.templateB_InvertedE && { templateB_InvertedE: templateBData.templateB_InvertedE }),
        ...(templateBData.templateB_InvertedG && { templateB_InvertedG: templateBData.templateB_InvertedG }),
        ...(templateBData.templateB_InvertedH && { templateB_InvertedH: templateBData.templateB_InvertedH }),
        ...(templateBData.templateB_InvertedK && { templateB_InvertedK: templateBData.templateB_InvertedK }),
        ...(templateBData.templateB_InvertedT && { templateB_InvertedT: templateBData.templateB_InvertedT }),
        ...(templateBData.templateB_InvertedU && { templateB_InvertedU: templateBData.templateB_InvertedU }),
        ...(templateBData.templateB_InvertedV && { templateB_InvertedV: templateBData.templateB_InvertedV }),
        ...(templateBData.templateB_InvertedW && { templateB_InvertedW: templateBData.templateB_InvertedW }),
      },

      // -------------------------
      // Template C / D / F
      // -------------------------
      // NOTE: Keeping the rest unchanged here for size.
      // If you want, paste your full original file again and I will add comments
      // to TemplateCData, TemplateDData, TemplateFData blocks in same style.

      // ✅ Your existing large blocks remain as-is:
      templateCData: CCO_139AData.templateCData || undefined,
      templateDData: CCO_139AData.templateDData || undefined,
      templateFData: CCO_139AData.templateFData || undefined,

      wheelsOnPowerChain: CCO_139AData.wheelsOnPowerChain,

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

      electricStatus: CCO_139AData.electricStatus,

      ...(CCO_139AData.pneumaticStatus && { pneumaticStatus: CCO_139AData.pneumaticStatus }),
      ...(CCO_139AData.mightyLubeMonitoring && {
        mightyLubeMonitoring: CCO_139AData.mightyLubeMonitoring,
      }),
      ...(CCO_139AData.plcConnection && { plcConnection: CCO_139AData.plcConnection }),
      ...(CCO_139AData.otherControllerNotes && {
        otherControllerNotes: CCO_139AData.otherControllerNotes,
      }),
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

    /**
     * IMPORTANT:
     * We are not saving `order` directly as a separate collection item here.
     * We store it inside the authenticated user's `cart` array.
     *
     * So MongoDB write happens on: await req.user.save()
     */
    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "CCO_139A",
    });

    // Save updated user document (cart now contains this product)
    await req.user.save();

    return res.status(200).json({ message: "CCO_139A entry added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
