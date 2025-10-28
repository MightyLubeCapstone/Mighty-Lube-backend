// routes/COE_CEL.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const COE_CEL = require("../models/COE_CEL");
const templateA = require("../models/templateA");
const templateD = require("../models/templateD");
const templateE = require("../models/templateE");
 
const router = express.Router();
 
router.post("/", authenticate, async (req, res) => {
    try {
        const { COE_CELData, numRequested } = req.body;

        const order = new COE_CEL({
            conveyorName: COE_CELData.conveyorName,
            chainSize: COE_CELData.chainSize,
            ...(COE_CELData.otherChainSize && { otherChainSize: COE_CELData.otherChainSize }),
            industrialChainManufacturer: COE_CELData.industrialChainManufacturer,
            ...(COE_CELData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: COE_CELData.otherIndustrialChainManufacturer }),
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

            monitorData: 
            {
                existingMonitor: COE_CELData.templateA.existingMonitor,
                newMonitor: COE_CELData.templateA.newMonitor,		
                ...(COE_CELData.templateA.dcuStatus && { dcuStatus: COE_CELData.templateA.dcuStatus }),
                ...(COE_CELData.templateA.dcuNum && { dcuNum: COE_CELData.templateA.dcuNum }),
                ...(COE_CELData.templateA.existingWindows && { existingWindows: COE_CELData.templateA.existingWindows }),
                ...(COE_CELData.templateA.existingHeadUnit && { existingHeadUnit: COE_CELData.templateA.existingHeadUnit }),
                ...(COE_CELData.templateA.existingDCU && { existingDCU: COE_CELData.templateA.existingDCU }),
                ...(COE_CELData.templateA.existingPowerInterface && { existingPowerInterface: COE_CELData.templateA.existingPowerInterface }),
                ...(COE_CELData.templateA.newReservoir && { newReservoir: COE_CELData.templateA.newReservoir }),
                ...(COE_CELData.templateA.reservoirSize && { reservoirSize: COE_CELData.templateA.reservoirSize }),
                ...(COE_CELData.templateA.otherReservoirSize && { otherReservoirSize: COE_CELData.templateA.otherReservoirSize }),
                ...(COE_CELData.templateA.newReservoirNum && { newReservoirNum: COE_CELData.templateA.newReservoirNum }),
                ...(COE_CELData.templateA.typeMonitor && { typeMonitor: COE_CELData.templateA.typeMonitor }),
                ...(COE_CELData.templateA.driveMotorAmp && { driveMotorAmp: COE_CELData.templateA.driveMotorAmp }),
                ...(COE_CELData.templateA.driveMotorAmpNum && { driveMotorAmpNum: COE_CELData.templateA.driveMotorAmpNum }),
                ...(COE_CELData.templateA.driveTakeUpAir && { driveTakeUpAir: COE_CELData.templateA.driveTakeUpAir }),
                ...(COE_CELData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: COE_CELData.templateA.driveTakeUpAirNum }),
                ...(COE_CELData.templateA.takeUpDistance && { takeUpDistance: COE_CELData.templateA.takeUpDistance }),
                ...(COE_CELData.templateA.takeUpDistanceNum && { takeUpDistanceNum: COE_CELData.templateA.takeUpDistanceNum }),
                ...(COE_CELData.templateA.driveTemp && { driveTemp: COE_CELData.templateA.driveTemp }),
                ...(COE_CELData.templateA.driveTempNum && { driveTempNum: COE_CELData.templateA.driveTempNum }),
                ...(COE_CELData.templateA.driveVibration && { driveVibration: COE_CELData.templateA.driveVibration }),
                ...(COE_CELData.templateA.driveVibrationNum && { driveVibrationNum: COE_CELData.templateA.driveVibrationNum }),
                ...(COE_CELData.templateA.dogPitch && { dogPitch: COE_CELData.templateA.dogPitch }),
                ...(COE_CELData.templateA.dogPitchNum && { dogPitchNum: COE_CELData.templateA.dogPitchNum }),
                ...(COE_CELData.templateA.paintMarker && { paintMarker: COE_CELData.templateA.paintMarker }),
                ...(COE_CELData.templateA.paintMarkerNum && { paintMarkerNum: COE_CELData.templateA.paintMarkerNum }),
                ...(COE_CELData.templateA.chainVision && { chainVision: COE_CELData.templateA.chainVision }),
                ...(COE_CELData.templateA.lubeVision && { lubeVision: COE_CELData.templateA.lubeVision }),
                ...(COE_CELData.templateA.trolleyVision && { trolleyVision: COE_CELData.templateA.trolleyVision }),
                ...(COE_CELData.templateA.trolleyDetect && { trolleyDetect: COE_CELData.templateA.trolleyDetect }),
                ...(COE_CELData.templateA.omniView && { omniView: COE_CELData.templateA.omniView }),
                ...(COE_CELData.templateA.dcuUpgradeNum && { dcuUpgradeNum: COE_CELData.templateA.dcuUpgradeNum }),
                ...(COE_CELData.templateA.piuDistance && { piuDistance: COE_CELData.templateA.piuDistance }),
                ...(COE_CELData.templateA.switchDistance && { switchDistance: COE_CELData.templateA.switchDistance }),
                ...(COE_CELData.templateA.ampPickup && { ampPickup: COE_CELData.templateA.ampPickup }),
                ...(COE_CELData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_CELData.templateA.fromAirTakeUpDistance }),
                ...(COE_CELData.templateA.specialControllerOptions && { specialControllerOptions: COE_CELData.templateA.specialControllerOptions }),
                ...(COE_CELData.templateA.operatingVoltage && { operatingVoltage: COE_CELData.templateA.operatingVoltage })
            },


            wheelSealedChain: COE_CELData.wheelSealedChain,

            templateDData: 
            {
                conveyorName: COE_CELData.templateD.conveyorName,
                wheelManufacturer: COE_CELData.templateD.wheelManufacturer,
                ...(COE_CELData.templateD.otherWheelManufacturer && { otherWheelManufacturer: COE_CELData.templateD.otherWheelManufacturer }),
                conveyorLength: COE_CELData.templateD.conveyorLength,
                conveyorLengthUnit: COE_CELData.templateD.conveyorLengthUnit,
                chainSize: COE_CELData.templateD.chainSize,
                ...(COE_CELData.templateD.otherChainSize && { otherChainSize: COE_CELData.templateD.otherChainSize }),
                industrialChainManufacturer: COE_CELData.templateD.industrialChainManufacturer,
                ...(COE_CELData.templateD.otherChainManufacturer && { otherChainManufacturer: COE_CELData.templateD.otherChainManufacturer }),
                conveyorSpeed: COE_CELData.templateD.conveyorSpeed,
                conveyorSpeedUnit: COE_CELData.templateD.conveyorSpeedUnit,
                conveyorIndex: COE_CELData.templateD.conveyorIndex,
                appEnviroment: COE_CELData.templateD.appEnviroment,
                ...(COE_CELData.templateD.otherAppEnviroment && { otherAppEnviroment: COE_CELData.templateD.otherAppEnviroment }),
                surroundingTemp: COE_CELData.templateD.surroundingTemp,
                orientationType: COE_CELData.templateD.orientationType,
                ...(COE_CELData.templateD.conveyorLoaded && { conveyorLoaded: COE_CELData.templateD.conveyorLoaded }),
                conveyorSwing: COE_CELData.templateD.conveyorSwing,
                operatingVoltage: COE_CELData.templateD.operatingVoltage,
                controlVoltSingle: COE_CELData.templateD.controlVoltSingle,
                compressedAir: COE_CELData.templateD.compressedAir,
                ...(COE_CELData.templateD.airSupplyType && { airSupplyType: COE_CELData.templateD.airSupplyType }),

                templateA_DData: 
                {
                    existingMonitor: COE_CELData.templateA.existingMonitor,
                    newMonitor: COE_CELData.templateA.newMonitor,		
                    ...(COE_CELData.templateA.dcuStatus && { dcuStatus: COE_CELData.templateA.dcuStatus }),
                    ...(COE_CELData.templateA.dcuNum && { dcuNum: COE_CELData.templateA.dcuNum }),
                    ...(COE_CELData.templateA.existingWindows && { existingWindows: COE_CELData.templateA.existingWindows }),
                    ...(COE_CELData.templateA.existingHeadUnit && { existingHeadUnit: COE_CELData.templateA.existingHeadUnit }),
                    ...(COE_CELData.templateA.existingDCU && { existingDCU: COE_CELData.templateA.existingDCU }),
                    ...(COE_CELData.templateA.existingPowerInterface && { existingPowerInterface: COE_CELData.templateA.existingPowerInterface }),
                    ...(COE_CELData.templateA.newReservoir && { newReservoir: COE_CELData.templateA.newReservoir }),
                    ...(COE_CELData.templateA.reservoirSize && { reservoirSize: COE_CELData.templateA.reservoirSize }),
                    ...(COE_CELData.templateA.otherReservoirSize && { otherReservoirSize: COE_CELData.templateA.otherReservoirSize }),
                    ...(COE_CELData.templateA.newReservoirNum && { newReservoirNum: COE_CELData.templateA.newReservoirNum }),
                    ...(COE_CELData.templateA.typeMonitor && { typeMonitor: COE_CELData.templateA.typeMonitor }),
                    ...(COE_CELData.templateA.driveMotorAmp && { driveMotorAmp: COE_CELData.templateA.driveMotorAmp }),
                    ...(COE_CELData.templateA.driveMotorAmpNum && { driveMotorAmpNum: COE_CELData.templateA.driveMotorAmpNum }),
                    ...(COE_CELData.templateA.driveTakeUpAir && { driveTakeUpAir: COE_CELData.templateA.driveTakeUpAir }),
                    ...(COE_CELData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: COE_CELData.templateA.driveTakeUpAirNum }),
                    ...(COE_CELData.templateA.takeUpDistance && { takeUpDistance: COE_CELData.templateA.takeUpDistance }),
                    ...(COE_CELData.templateA.takeUpDistanceNum && { takeUpDistanceNum: COE_CELData.templateA.takeUpDistanceNum }),
                    ...(COE_CELData.templateA.driveTemp && { driveTemp: COE_CELData.templateA.driveTemp }),
                    ...(COE_CELData.templateA.driveTempNum && { driveTempNum: COE_CELData.templateA.driveTempNum }),
                    ...(COE_CELData.templateA.driveVibration && { driveVibration: COE_CELData.templateA.driveVibration }),
                    ...(COE_CELData.templateA.driveVibrationNum && { driveVibrationNum: COE_CELData.templateA.driveVibrationNum }),
                    ...(COE_CELData.templateA.dogPitch && { dogPitch: COE_CELData.templateA.dogPitch }),
                    ...(COE_CELData.templateA.dogPitchNum && { dogPitchNum: COE_CELData.templateA.dogPitchNum }),
                    ...(COE_CELData.templateA.paintMarker && { paintMarker: COE_CELData.templateA.paintMarker }),
                    ...(COE_CELData.templateA.paintMarkerNum && { paintMarkerNum: COE_CELData.templateA.paintMarkerNum }),
                    ...(COE_CELData.templateA.chainVision && { chainVision: COE_CELData.templateA.chainVision }),
                    ...(COE_CELData.templateA.lubeVision && { lubeVision: COE_CELData.templateA.lubeVision }),
                    ...(COE_CELData.templateA.trolleyVision && { trolleyVision: COE_CELData.templateA.trolleyVision }),
                    ...(COE_CELData.templateA.trolleyDetect && { trolleyDetect: COE_CELData.templateA.trolleyDetect }),
                    ...(COE_CELData.templateA.omniView && { omniView: COE_CELData.templateA.omniView }),
                    ...(COE_CELData.templateA.dcuUpgradeNum && { dcuUpgradeNum: COE_CELData.templateA.dcuUpgradeNum }),
                    ...(COE_CELData.templateA.piuDistance && { piuDistance: COE_CELData.templateA.piuDistance }),
                    ...(COE_CELData.templateA.switchDistance && { switchDistance: COE_CELData.templateA.switchDistance }),
                    ...(COE_CELData.templateA.ampPickup && { ampPickup: COE_CELData.templateA.ampPickup }),
                    ...(COE_CELData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_CELData.templateA.fromAirTakeUpDistance }),
                    ...(COE_CELData.templateA.specialControllerOptions && { specialControllerOptions: COE_CELData.templateA.specialControllerOptions }),
                    ...(COE_CELData.templateA.operatingVoltage && { operatingVoltage: COE_CELData.templateA.operatingVoltage })
                },

                    lubeBrand: COE_CELData.templateD.lubeBrand,
                    currentGrease: COE_CELData.templateD.currentGrease,
                    currentGreaseGrade: COE_CELData.templateD.currentGreaseGrade,
                    wheelDiameter: COE_CELData.templateD.wheelDiameter,
                    ...(COE_CELData.templateD.chainMaster && { chainMaster: COE_CELData.templateD.chainMaster }),
                    ...(COE_CELData.templateD.remoteStatus && { remoteStatus: COE_CELData.templateD.remoteStatus }),
                    ...(COE_CELData.templateD.mountStatus && { mountStatus: COE_CELData.templateD.mountStatus }),
                    ...(COE_CELData.templateD.otherUnitStatus && { otherUnitStatus: COE_CELData.templateD.otherUnitStatus }),
                    ...(COE_CELData.templateD.timerStatus && { timerStatus: COE_CELData.templateD.timerStatus }),
                    ...(COE_CELData.templateD.electricStatus && { electricStatus: COE_CELData.templateD.electricStatus }),
                    ...(COE_CELData.templateD.mightyLubeMonitoring && { mightyLubeMonitoring: COE_CELData.templateD.mightyLubeMonitoring }),
                    ...(COE_CELData.templateD.preMountType && { preMountType: COE_CELData.templateD.preMountType }),
                    ...(COE_CELData.templateD.otherControllerNotes && { otherControllerNotes: COE_CELData.templateD.otherControllerNotes }),


            },

            templateEData: 
            {
                conveyorName: COE_CELData.templateE.conveyorName,
                ...(COE_CELData.templateE.chainSize && { chainSize: COE_CELData.templateE.chainSize }),
                ...(COE_CELData.templateE.otherChainSize && { otherChainSize: COE_CELData.templateE.otherChainSize }),
                ...(COE_CELData.templateE.industrialChainManufacturer && { industrialChainManufacturer: COE_CELData.templateE.industrialChainManufacturer }),
                ...(COE_CELData.templateE.otherChainManufacturer && { otherChainManufacturer: COE_CELData.templateE.otherChainManufacturer }),
                ...(COE_CELData.templateE.conveyorLength && { conveyorLength: COE_CELData.templateE.conveyorLength }),
                ...(COE_CELData.templateE.conveyorLengthUnit && { conveyorLengthUnit: COE_CELData.templateE.conveyorLengthUnit }),
                ...(COE_CELData.templateE.appEnviroment && { appEnviroment: COE_CELData.templateE.appEnviroment }),
                ...(COE_CELData.templateE.otherAppEnviroment && { otherAppEnviroment: COE_CELData.templateE.otherAppEnviroment }),
                ...(COE_CELData.templateE.lubeBrand && { lubeBrand: COE_CELData.templateE.lubeBrand }),
                ...(COE_CELData.templateE.lubeType && { lubeType: COE_CELData.templateE.lubeType }),
                ...(COE_CELData.templateE.lubeViscosity && { lubeViscosity: COE_CELData.templateE.lubeViscosity }),
                ...(COE_CELData.templateE.specialControllerOptions && { specialControllerOptions: COE_CELData.templateE.specialControllerOptions }),
                ...(COE_CELData.templateE.wireMeasurementUnit && { wireMeasurementUnit: COE_CELData.templateE.wireMeasurementUnit }),
                ...(COE_CELData.templateE.conductor2 && { conductor2: COE_CELData.templateE.conductor2 }),
                ...(COE_CELData.templateE.conductor4 && { conductor4: COE_CELData.templateE.conductor4 }),
                ...(COE_CELData.templateE.conductor7 && { conductor7: COE_CELData.templateE.conductor7 }),
                ...(COE_CELData.templateE.conductor12 && { conductor12: COE_CELData.templateE.conductor12 }),
                ...(COE_CELData.templateE.junctionBoxNum && { junctionBoxNum: COE_CELData.templateE.junctionBoxNum }),

            },

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

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "COE_CEL" });
        await req.user.save();

        return res.status(200).json({ message: "COE_CEL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
