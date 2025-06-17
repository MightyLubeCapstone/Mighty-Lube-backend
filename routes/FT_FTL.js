const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_FTL = require("../models/FT_FTL");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FT_FTL form
    try {
        const { FT_FTLData, numRequested } = req.body;
        const order = new FT_FTL({
            ...(FT_FTLData.conveyorName && { conveyorName: FT_FTLData.conveyorName }),
            ...(FT_FTLData.chainSize && { chainSize: FT_FTLData.chainSize }),
            industrialChainManufacturer: FT_FTLData.industrialChainManufacturer,
            ...(FT_FTLData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FT_FTLData.otherIndustrialChainManufacturer }),
            ...(FT_FTLData.conveyorLength && { conveyorLength: FT_FTLData.conveyorLength }),
            ...(FT_FTLData.conveyorLengthUnit && { conveyorLengthUnit: FT_FTLData.conveyorLengthUnit }),
            ...(FT_FTLData.conveyorSpeed && { conveyorSpeed: FT_FTLData.conveyorSpeed }),
            ...(FT_FTLData.conveyorSpeedUnit && { conveyorSpeedUnit: FT_FTLData.conveyorSpeedUnit }),
            ...(FT_FTLData.conveyorIndex && { conveyorIndex: FT_FTLData.conveyorIndex }),
            ...(FT_FTLData.travelDirection && { travelDirection: FT_FTLData.travelDirection }),
            appEnviroment: FT_FTLData.appEnviroment,
            ...(FT_FTLData.ovenStatus && { ovenStatus: FT_FTLData.ovenStatus }),
            ...(FT_FTLData.ovenTemp && { ovenTemp: FT_FTLData.ovenTemp }),
            ...(FT_FTLData.surroundingTemp && { surroundingTemp: FT_FTLData.surroundingTemp }),
            ...(FT_FTLData.strandStatus && { strandStatus: FT_FTLData.strandStatus }),
            ...(FT_FTLData.plantLayout && { plantLayout: FT_FTLData.plantLayout }),
            ...(FT_FTLData.requiredPics && { requiredPics: FT_FTLData.requiredPics }),
            ...(FT_FTLData.operatingVoltage && { operatingVoltage: FT_FTLData.operatingVoltage }),

            // monitorData: new templateA({
            //     existingMonitor: FT_FTLData.templateA.existingMonitor,
            //     newMonitor: FT_FTLData.templateA.newMonitor,
            //     ...(FT_FTLData.templateA.dcuStatus && { dcuStatus: FT_FTLData.templateA.dcuStatus }),
            //     ...(FT_FTLData.templateA.dcuNum && { dcuNum: FT_FTLData.templateA.dcuNum }),
            //     ...(FT_FTLData.templateA.existingWindows && { existingWindows: FT_FTLData.templateA.existingWindows }),
            //     ...(FT_FTLData.templateA.existingHeadUnit && { existingHeadUnit: FT_FTLData.templateA.existingHeadUnit }),
            //     ...(FT_FTLData.templateA.existingDCU && { existingDCU: FT_FTLData.templateA.existingDCU }),
            //     ...(FT_FTLData.templateA.existingPowerInterface && { existingPowerInterface: FT_FTLData.templateA.existingPowerInterface }),
            //     ...(FT_FTLData.templateA.newReservoir && { newReservoir: FT_FTLData.templateA.newReservoir }),
            //     ...(FT_FTLData.templateA.reservoirSize && { reservoirSize: FT_FTLData.templateA.reservoirSize }),
            //     ...(FT_FTLData.templateA.otherReservoirSize && { otherReservoirSize: FT_FTLData.templateA.otherReservoirSize }),
            //     ...(FT_FTLData.templateA.newReservoirNum && { newReservoirNum: FT_FTLData.templateA.newReservoirNum }),
            //     ...(FT_FTLData.templateA.typeMonitor && { typeMonitor: FT_FTLData.templateA.typeMonitor }),
            //     ...(FT_FTLData.templateA.driveMotorAmp && { driveMotorAmp: FT_FTLData.templateA.driveMotorAmp }),
            //     ...(FT_FTLData.templateA.driveMotorAmpNum && { driveMotorAmpNum: FT_FTLData.templateA.driveMotorAmpNum }),
            //     ...(FT_FTLData.templateA.driveTakeUpAir && { driveTakeUpAir: FT_FTLData.templateA.driveTakeUpAir }),
            //     ...(FT_FTLData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FT_FTLData.templateA.driveTakeUpAirNum }),
            //     ...(FT_FTLData.templateA.takeUpDistance && { takeUpDistance: FT_FTLData.templateA.takeUpDistance }),
            //     ...(FT_FTLData.templateA.takeUpDistanceNum && { takeUpDistanceNum: FT_FTLData.templateA.takeUpDistanceNum }),
            //     ...(FT_FTLData.templateA.driveTemp && { driveTemp: FT_FTLData.templateA.driveTemp }),
            //     ...(FT_FTLData.templateA.driveTempNum && { driveTempNum: FT_FTLData.templateA.driveTempNum }),
            //     ...(FT_FTLData.templateA.driveVibration && { driveVibration: FT_FTLData.templateA.driveVibration }),
            //     ...(FT_FTLData.templateA.driveVibrationNum && { driveVibrationNum: FT_FTLData.templateA.driveVibrationNum }),
            //     ...(FT_FTLData.templateA.dogPitch && { dogPitch: FT_FTLData.templateA.dogPitch }),
            //     ...(FT_FTLData.templateA.dogPitchNum && { dogPitchNum: FT_FTLData.templateA.dogPitchNum }),
            //     ...(FT_FTLData.templateA.paintMarker && { paintMarker: FT_FTLData.templateA.paintMarker }),
            //     ...(FT_FTLData.templateA.paintMarkerNum && { paintMarkerNum: FT_FTLData.templateA.paintMarkerNum }),
            //     ...(FT_FTLData.templateA.chainVision && { chainVision: FT_FTLData.templateA.chainVision }),
            //     ...(FT_FTLData.templateA.lubeVision && { lubeVision: FT_FTLData.templateA.lubeVision }),
            //     ...(FT_FTLData.templateA.trolleyVision && { trolleyVision: FT_FTLData.templateA.trolleyVision }),
            //     ...(FT_FTLData.templateA.trolleyDetect && { trolleyDetect: FT_FTLData.templateA.trolleyDetect }),
            //     ...(FT_FTLData.templateA.omniView && { omniView: FT_FTLData.templateA.omniView }),
            //     ...(FT_FTLData.templateA.dcuUpgradeNum && { dcuUpgradeNum: FT_FTLData.templateA.dcuUpgradeNum }),
            //     ...(FT_FTLData.templateA.itNameOne && { itNameOne: FT_FTLData.templateA.itNameOne }),
            //     ...(FT_FTLData.templateA.itIPOne && { itIPOne: FT_FTLData.templateA.itIPOne }),
            //     ...(FT_FTLData.templateA.itGatewayOne && { itGatewayOne: FT_FTLData.templateA.itGatewayOne }),
            //     ...(FT_FTLData.templateA.itSubnetOne && { itSubnetOne: FT_FTLData.templateA.itSubnetOne }),
            //     ...(FT_FTLData.templateA.itDNSOne && { itDNSOne: FT_FTLData.templateA.itDNSOne }),
            //     ...(FT_FTLData.templateA.itSMTPOne && { itSMTPOne: FT_FTLData.templateA.itSMTPOne }),
            //     ...(FT_FTLData.templateA.itNameTwo && { itNameTwo: FT_FTLData.templateA.itNameTwo }),
            //     ...(FT_FTLData.templateA.itIPTwo && { itIPTwo: FT_FTLData.templateA.itIPTwo }),
            //     ...(FT_FTLData.templateA.itGatewayTwo && { itGatewayTwo: FT_FTLData.templateA.itGatewayTwo }),
            //     ...(FT_FTLData.templateA.itSubnetTwo && { itSubnetTwo: FT_FTLData.templateA.itSubnetTwo }),
            //     ...(FT_FTLData.templateA.itDNSTwo && { itDNSTwo: FT_FTLData.templateA.itDNSTwo }),
            //     ...(FT_FTLData.templateA.itSMTPTwo && { itSMTPTwo: FT_FTLData.templateA.itSMTPTwo }),
            //     ...(FT_FTLData.templateA.itNameThree && { itNameThree: FT_FTLData.templateA.itNameThree }),
            //     ...(FT_FTLData.templateA.itIPThree && { itIPThree: FT_FTLData.templateA.itIPThree }),
            //     ...(FT_FTLData.templateA.itGatewayThree && { itGatewayThree: FT_FTLData.templateA.itGatewayThree }),
            //     ...(FT_FTLData.templateA.itSubnetThree && { itSubnetThree: FT_FTLData.templateA.itSubnetThree }),
            //     ...(FT_FTLData.templateA.itDNSThree && { itDNSThree: FT_FTLData.templateA.itDNSThree }),
            //     ...(FT_FTLData.templateA.itSMTPThree && { itSMTPThree: FT_FTLData.templateA.itSMTPThree }),
            //     ...(FT_FTLData.templateA.itAdditionalNotes && { itAdditionalNotes: FT_FTLData.templateA.itAdditionalNotes }),
            //     ...(FT_FTLData.templateA.piuDistance && { piuDistance: FT_FTLData.templateA.piuDistance }),
            //     ...(FT_FTLData.templateA.switchDistance && { switchDistance: FT_FTLData.templateA.switchDistance }),
            //     ...(FT_FTLData.templateA.ampPickup && { ampPickup: FT_FTLData.templateA.ampPickup }),
            //     ...(FT_FTLData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FT_FTLData.templateA.fromAirTakeUpDistance }),
            //     ...(FT_FTLData.templateA.specialControllerOptions && { specialControllerOptions: FT_FTLData.templateA.specialControllerOptions })
            // }),
            ...(FT_FTLData.wheelOpenType && { wheelOpenType: FT_FTLData.wheelOpenType }),
            ...(FT_FTLData.wheelClosedType && { wheelClosedType: FT_FTLData.wheelClosedType }),
            ...(FT_FTLData.openStatus && { openStatus: FT_FTLData.openStatus }),
            ...(FT_FTLData.outboardStatus && { outboardStatus: FT_FTLData.outboardStatus }),
            ...(FT_FTLData.catDriveStatus && { catDriveStatus: FT_FTLData.catDriveStatus }),
            ...(FT_FTLData.catDriveNum && { catDriveNum: FT_FTLData.catDriveNum }),
            ...(FT_FTLData.externalLubeStatus && { externalLubeStatus: FT_FTLData.externalLubeStatus }),
            ...(FT_FTLData.lubeBrand && { lubeBrand: FT_FTLData.lubeBrand }),
            ...(FT_FTLData.lubeType && { lubeType: FT_FTLData.lubeType }),
            ...(FT_FTLData.lubeViscosity && { lubeViscosity: FT_FTLData.lubeViscosity }),
            ...(FT_FTLData.chainCleanStatus && { chainCleanStatus: FT_FTLData.chainCleanStatus }),
            ...(FT_FTLData.mightyLubeMonitoring && { mightyLubeMonitoring: FT_FTLData.mightyLubeMonitoring }),
            ...(FT_FTLData.ctrStatus && { ctrStatus: FT_FTLData.ctrStatus }),
            ...(FT_FTLData.plcConnection && { plcConnection: FT_FTLData.plcConnection }),
            ...(FT_FTLData.monitorControllerStatus && { monitorControllerStatus: FT_FTLData.monitorControllerStatus }),
            ...(FT_FTLData.otherControllerStatus && { otherControllerStatus: FT_FTLData.otherControllerStatus }),
            ...(FT_FTLData.ftUnitType && { ftUnitType: FT_FTLData.ftUnitType }),
            ...(FT_FTLData.ftTopG && { ftTopG: FT_FTLData.ftTopG }),
            ...(FT_FTLData.ftTopH && { ftTopH: FT_FTLData.ftTopH }),
            ...(FT_FTLData.ftTopA1 && { ftTopA1: FT_FTLData.ftTopA1 }),
            ...(FT_FTLData.ftTopB1 && { ftTopB1: FT_FTLData.ftTopB1 }),
            ...(FT_FTLData.ftTopH1 && { ftTopH1: FT_FTLData.ftTopH1 }),
            ...(FT_FTLData.ftTopJ1 && { ftTopJ1: FT_FTLData.ftTopJ1 }),
            ...(FT_FTLData.ftTopL1 && { ftTopL1: FT_FTLData.ftTopL1 }),
            ...(FT_FTLData.ftTopM1 && { ftTopM1: FT_FTLData.ftTopM1 }),
            ...(FT_FTLData.ftTopN1 && { ftTopN1: FT_FTLData.ftTopN1 }),
            ...(FT_FTLData.ftTopP1 && { ftTopP1: FT_FTLData.ftTopP1 }),
            ...(FT_FTLData.ftTopR1 && { ftTopR1: FT_FTLData.ftTopR1 }),
            ...(FT_FTLData.wireMeasurementUnit && { wireMeasurementUnit: FT_FTLData.wireMeasurementUnit }),
            ...(FT_FTLData.conductor2 && { conductor2: FT_FTLData.conductor2 }),
            ...(FT_FTLData.conductor4 && { conductor4: FT_FTLData.conductor4 }),
            ...(FT_FTLData.conductor7 && { conductor7: FT_FTLData.conductor7 }),
            ...(FT_FTLData.conductor12 && { conductor12: FT_FTLData.conductor12 }),
            ...(FT_FTLData.junctionBoxNum && { junctionBoxNum: FT_FTLData.junctionBoxNum }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FT_FTL" });
        await req.user.save();

        return res.status(200).json({ message: "FT_FTL entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;