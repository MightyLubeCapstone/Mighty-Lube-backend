// routes/COE_CEL.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const COE_CEL = require("../models/COE_CEL");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { COE_CELData, numRequested } = req.body;

        const order = new COE_CEL({
            ...(COE_CELData.conveyorName && { conveyorName: COE_CELData.conveyorName }),
            chainSize: COE_CELData.chainSize,
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
            ...(COE_CELData.surroundingTemp && { surroundingTemp: COE_CELData.surroundingTemp }),
            ...(COE_CELData.conveyorLoaded && { conveyorLoaded: COE_CELData.conveyorLoaded }),
            ...(COE_CELData.conveyorSwing && { conveyorSwing: COE_CELData.conveyorSwing }),
            ...(COE_CELData.plantLayout && { plantLayout: COE_CELData.plantLayout }),
            ...(COE_CELData.requiredPics && { requiredPics: COE_CELData.requiredPics }),
            operatingVoltage: COE_CELData.operatingVoltage,
            monitorData: new templateB({
                existingMonitor: COE_CELData.templateB.existingMonitor,
                newMonitor: COE_CELData.templateB.newMonitor,
                ...(COE_CELData.templateB.dcuStatus && { dcuStatus: COE_CELData.templateB.dcuStatus }),
                ...(COE_CELData.templateB.dcuNum && { dcuNum: COE_CELData.templateB.dcuNum }),
                ...(COE_CELData.templateB.existingWindows && { existingWindows: COE_CELData.templateB.existingWindows }),
                ...(COE_CELData.templateB.existingHeadUnit && { existingHeadUnit: COE_CELData.templateB.existingHeadUnit }),
                ...(COE_CELData.templateB.existingDCU && { existingDCU: COE_CELData.templateB.existingDCU }),
                ...(COE_CELData.templateB.existingPowerInterface && { existingPowerInterface: COE_CELData.templateB.existingPowerInterface }),
                ...(COE_CELData.templateB.newReservoir && { newReservoir: COE_CELData.templateB.newReservoir }),
                ...(COE_CELData.templateB.reservoirSize && { reservoirSize: COE_CELData.templateB.reservoirSize }),
                ...(COE_CELData.templateB.otherReservoirSize && { otherReservoirSize: COE_CELData.templateB.otherReservoirSize }),
                ...(COE_CELData.templateB.newReservoirNum && { newReservoirNum: COE_CELData.templateB.newReservoirNum }),
                ...(COE_CELData.templateB.typeMonitor && { typeMonitor: COE_CELData.templateB.typeMonitor }),
                ...(COE_CELData.templateB.driveMotorAmp && { driveMotorAmp: COE_CELData.templateB.driveMotorAmp }),
                ...(COE_CELData.templateB.driveMotorAmpNum && { driveMotorAmpNum: COE_CELData.templateB.driveMotorAmpNum }),
                ...(COE_CELData.templateB.driveTakeUpAir && { driveTakeUpAir: COE_CELData.templateB.driveTakeUpAir }),
                ...(COE_CELData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: COE_CELData.templateB.driveTakeUpAirNum }),
                ...(COE_CELData.templateB.takeUpDistance && { takeUpDistance: COE_CELData.templateB.takeUpDistance }),
                ...(COE_CELData.templateB.takeUpDistanceNum && { takeUpDistanceNum: COE_CELData.templateB.takeUpDistanceNum }),
                ...(COE_CELData.templateB.driveTemp && { driveTemp: COE_CELData.templateB.driveTemp }),
                ...(COE_CELData.templateB.driveTempNum && { driveTempNum: COE_CELData.templateB.driveTempNum }),
                ...(COE_CELData.templateB.driveVibration && { driveVibration: COE_CELData.templateB.driveVibration }),
                ...(COE_CELData.templateB.driveVibrationNum && { driveVibrationNum: COE_CELData.templateB.driveVibrationNum }),
                ...(COE_CELData.templateB.dogPitch && { dogPitch: COE_CELData.templateB.dogPitch }),
                ...(COE_CELData.templateB.dogPitchNum && { dogPitchNum: COE_CELData.templateB.dogPitchNum }),
                ...(COE_CELData.templateB.paintMarker && { paintMarker: COE_CELData.templateB.paintMarker }),
                ...(COE_CELData.templateB.paintMarkerNum && { paintMarkerNum: COE_CELData.templateB.paintMarkerNum }),
                ...(COE_CELData.templateB.chainVision && { chainVision: COE_CELData.templateB.chainVision }),
                ...(COE_CELData.templateB.lubeVision && { lubeVision: COE_CELData.templateB.lubeVision }),
                ...(COE_CELData.templateB.trolleyVision && { trolleyVision: COE_CELData.templateB.trolleyVision }),
                ...(COE_CELData.templateB.trolleyDetect && { trolleyDetect: COE_CELData.templateB.trolleyDetect }),
                ...(COE_CELData.templateB.omniView && { omniView: COE_CELData.templateB.omniView }),
                ...(COE_CELData.templateB.dcuUpgradeNum && { dcuUpgradeNum: COE_CELData.templateB.dcuUpgradeNum }),
                ...(COE_CELData.templateB.itNameOne && { itNameOne: COE_CELData.templateB.itNameOne }),
                ...(COE_CELData.templateB.itIPOne && { itIPOne: COE_CELData.templateB.itIPOne }),
                ...(COE_CELData.templateB.itGatewayOne && { itGatewayOne: COE_CELData.templateB.itGatewayOne }),
                ...(COE_CELData.templateB.itSubnetOne && { itSubnetOne: COE_CELData.templateB.itSubnetOne }),
                ...(COE_CELData.templateB.itDNSOne && { itDNSOne: COE_CELData.templateB.itDNSOne }),
                ...(COE_CELData.templateB.itSMTPOne && { itSMTPOne: COE_CELData.templateB.itSMTPOne }),
                ...(COE_CELData.templateB.itNameTwo && { itNameTwo: COE_CELData.templateB.itNameTwo }),
                ...(COE_CELData.templateB.itIPTwo && { itIPTwo: COE_CELData.templateB.itIPTwo }),
                ...(COE_CELData.templateB.itGatewayTwo && { itGatewayTwo: COE_CELData.templateB.itGatewayTwo }),
                ...(COE_CELData.templateB.itSubnetTwo && { itSubnetTwo: COE_CELData.templateB.itSubnetTwo }),
                ...(COE_CELData.templateB.itDNSTwo && { itDNSTwo: COE_CELData.templateB.itDNSTwo }),
                ...(COE_CELData.templateB.itSMTPTwo && { itSMTPTwo: COE_CELData.templateB.itSMTPTwo }),
                ...(COE_CELData.templateB.itNameThree && { itNameThree: COE_CELData.templateB.itNameThree }),
                ...(COE_CELData.templateB.itIPThree && { itIPThree: COE_CELData.templateB.itIPThree }),
                ...(COE_CELData.templateB.itGatewayThree && { itGatewayThree: COE_CELData.templateB.itGatewayThree }),
                ...(COE_CELData.templateB.itSubnetThree && { itSubnetThree: COE_CELData.templateB.itSubnetThree }),
                ...(COE_CELData.templateB.itDNSThree && { itDNSThree: COE_CELData.templateB.itDNSThree }),
                ...(COE_CELData.templateB.itSMTPThree && { itSMTPThree: COE_CELData.templateB.itSMTPThree }),
                ...(COE_CELData.templateB.itAdditionalNotes && { itAdditionalNotes: COE_CELData.templateB.itAdditionalNotes }),
                ...(COE_CELData.templateB.piuDistance && { piuDistance: COE_CELData.templateB.piuDistance }),
                ...(COE_CELData.templateB.switchDistance && { switchDistance: COE_CELData.templateB.switchDistance }),
                ...(COE_CELData.templateB.ampPickup && { ampPickup: COE_CELData.templateB.ampPickup }),
                ...(COE_CELData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_CELData.templateB.fromAirTakeUpDistance }),
                ...(COE_CELData.templateB.specialControllerOptions && { specialControllerOptions: COE_CELData.templateB.specialControllerOptions })
            }),
            
            ...(COE_CELData.wheelOpenType && { wheelOpenType: COE_CELData.wheelOpenType }),
            ...(COE_CELData.wheelClosedType && { wheelClosedType: COE_CELData.wheelClosedType }),
            ...(COE_CELData.openStatus && { openStatus: COE_CELData.openStatus }),
            catDriveStatus: COE_CELData.catDriveStatus,

            // TODO: Implement template C when updated on frontend

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
