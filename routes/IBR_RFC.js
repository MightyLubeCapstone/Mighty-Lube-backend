const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_RFC = require("../models/IBR_RFC");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_RFC form
    try {
        const { IBR_RFCData, numRequested } = req.body;
        const order = new IBR_RFC({
            ...(IBR_RFCData.conveyorName && { conveyorName: IBR_RFCData.conveyorName }),
            ...(IBR_RFCData.chainSize && { chainSize: IBR_RFCData.chainSize }),
            ...(IBR_RFCData.industrialChainManufacturer && {industrialChainManufacturer: IBR_RFCData.industrialChainManufacturer }),
            ...(IBR_RFCData.otherChainManufacturer && { otherChainManufacturer: IBR_RFCData.otherChainManufacturer }),
            ...(IBR_RFCData.conveyorLength && { conveyorLength: IBR_RFCData.conveyorLength }),
            ...(IBR_RFCData.measurementUnit && { measurementUnit: IBR_RFCData.measurementUnit }),
            ...(IBR_RFCData.conveyorSpeed && { conveyorSpeed: IBR_RFCData.conveyorSpeed }),
            ...(IBR_RFCData.speedUnit && { speedUnit: IBR_RFCData.speedUnit }),
            ...(IBR_RFCData.conveyorIndex && { conveyorIndex: IBR_RFCData.conveyorIndex }),
            ...(IBR_RFCData.travelDirection && { travelDirection: IBR_RFCData.travelDirection }),
            appEnviroment: IBR_RFCData.appEnviroment,
            ...(IBR_RFCData.ovenStatus && { ovenStatus: IBR_RFCData.ovenStatus }),
            ...(IBR_RFCData.ovenTemp && { ovenTemp: IBR_RFCData.ovenTemp }),

            monitorData: new templateB({
                existingMonitor: IBR_RFCData.templateB.existingMonitor,
                newMonitor: IBR_RFCData.templateB.newMonitor,
                ...(IBR_RFCData.templateB.dcuStatus && { dcuStatus: IBR_RFCData.templateB.dcuStatus }),
                ...(IBR_RFCData.templateB.dcuNum && { dcuNum: IBR_RFCData.templateB.dcuNum }),
                ...(IBR_RFCData.templateB.existingWindows && { existingWindows: IBR_RFCData.templateB.existingWindows }),
                ...(IBR_RFCData.templateB.existingHeadUnit && { existingHeadUnit: IBR_RFCData.templateB.existingHeadUnit }),
                ...(IBR_RFCData.templateB.existingDCU && { existingDCU: IBR_RFCData.templateB.existingDCU }),
                ...(IBR_RFCData.templateB.existingPowerInterface && { existingPowerInterface: IBR_RFCData.templateB.existingPowerInterface }),
                ...(IBR_RFCData.templateB.newReservoir && { newReservoir: IBR_RFCData.templateB.newReservoir }),
                ...(IBR_RFCData.templateB.reservoirSize && { reservoirSize: IBR_RFCData.templateB.reservoirSize }),
                ...(IBR_RFCData.templateB.otherReservoirSize && { otherReservoirSize: IBR_RFCData.templateB.otherReservoirSize }),
                ...(IBR_RFCData.templateB.newReservoirNum && { newReservoirNum: IBR_RFCData.templateB.newReservoirNum }),
                ...(IBR_RFCData.templateB.typeMonitor && { typeMonitor: IBR_RFCData.templateB.typeMonitor }),
                ...(IBR_RFCData.templateB.driveMotorAmp && { driveMotorAmp: IBR_RFCData.templateB.driveMotorAmp }),
                ...(IBR_RFCData.templateB.driveMotorAmpNum && { driveMotorAmpNum: IBR_RFCData.templateB.driveMotorAmpNum }),
                ...(IBR_RFCData.templateB.driveTakeUpAir && { driveTakeUpAir: IBR_RFCData.templateB.driveTakeUpAir }),
                ...(IBR_RFCData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_RFCData.templateB.driveTakeUpAirNum }),
                ...(IBR_RFCData.templateB.takeUpDistance && { takeUpDistance: IBR_RFCData.templateB.takeUpDistance }),
                ...(IBR_RFCData.templateB.takeUpDistanceNum && { takeUpDistanceNum: IBR_RFCData.templateB.takeUpDistanceNum }),
                ...(IBR_RFCData.templateB.driveTemp && { driveTemp: IBR_RFCData.templateB.driveTemp }),
                ...(IBR_RFCData.templateB.driveTempNum && { driveTempNum: IBR_RFCData.templateB.driveTempNum }),
                ...(IBR_RFCData.templateB.driveVibration && { driveVibration: IBR_RFCData.templateB.driveVibration }),
                ...(IBR_RFCData.templateB.driveVibrationNum && { driveVibrationNum: IBR_RFCData.templateB.driveVibrationNum }),
                ...(IBR_RFCData.templateB.dogPitch && { dogPitch: IBR_RFCData.templateB.dogPitch }),
                ...(IBR_RFCData.templateB.dogPitchNum && { dogPitchNum: IBR_RFCData.templateB.dogPitchNum }),
                ...(IBR_RFCData.templateB.paintMarker && { paintMarker: IBR_RFCData.templateB.paintMarker }),
                ...(IBR_RFCData.templateB.paintMarkerNum && { paintMarkerNum: IBR_RFCData.templateB.paintMarkerNum }),
                ...(IBR_RFCData.templateB.chainVision && { chainVision: IBR_RFCData.templateB.chainVision }),
                ...(IBR_RFCData.templateB.lubeVision && { lubeVision: IBR_RFCData.templateB.lubeVision }),
                ...(IBR_RFCData.templateB.trolleyVision && { trolleyVision: IBR_RFCData.templateB.trolleyVision }),
                ...(IBR_RFCData.templateB.trolleyDetect && { trolleyDetect: IBR_RFCData.templateB.trolleyDetect }),
                ...(IBR_RFCData.templateB.omniView && { omniView: IBR_RFCData.templateB.omniView }),
                ...(IBR_RFCData.templateB.dcuUpgradeNum && { dcuUpgradeNum: IBR_RFCData.templateB.dcuUpgradeNum }),
                ...(IBR_RFCData.templateB.itNameOne && { itNameOne: IBR_RFCData.templateB.itNameOne }),
                ...(IBR_RFCData.templateB.itIPOne && { itIPOne: IBR_RFCData.templateB.itIPOne }),
                ...(IBR_RFCData.templateB.itGatewayOne && { itGatewayOne: IBR_RFCData.templateB.itGatewayOne }),
                ...(IBR_RFCData.templateB.itSubnetOne && { itSubnetOne: IBR_RFCData.templateB.itSubnetOne }),
                ...(IBR_RFCData.templateB.itDNSOne && { itDNSOne: IBR_RFCData.templateB.itDNSOne }),
                ...(IBR_RFCData.templateB.itSMTPOne && { itSMTPOne: IBR_RFCData.templateB.itSMTPOne }),
                ...(IBR_RFCData.templateB.itNameTwo && { itNameTwo: IBR_RFCData.templateB.itNameTwo }),
                ...(IBR_RFCData.templateB.itIPTwo && { itIPTwo: IBR_RFCData.templateB.itIPTwo }),
                ...(IBR_RFCData.templateB.itGatewayTwo && { itGatewayTwo: IBR_RFCData.templateB.itGatewayTwo }),
                ...(IBR_RFCData.templateB.itSubnetTwo && { itSubnetTwo: IBR_RFCData.templateB.itSubnetTwo }),
                ...(IBR_RFCData.templateB.itDNSTwo && { itDNSTwo: IBR_RFCData.templateB.itDNSTwo }),
                ...(IBR_RFCData.templateB.itSMTPTwo && { itSMTPTwo: IBR_RFCData.templateB.itSMTPTwo }),
                ...(IBR_RFCData.templateB.itNameThree && { itNameThree: IBR_RFCData.templateB.itNameThree }),
                ...(IBR_RFCData.templateB.itIPThree && { itIPThree: IBR_RFCData.templateB.itIPThree }),
                ...(IBR_RFCData.templateB.itGatewayThree && { itGatewayThree: IBR_RFCData.templateB.itGatewayThree }),
                ...(IBR_RFCData.templateB.itSubnetThree && { itSubnetThree: IBR_RFCData.templateB.itSubnetThree }),
                ...(IBR_RFCData.templateB.itDNSThree && { itDNSThree: IBR_RFCData.templateB.itDNSThree }),
                ...(IBR_RFCData.templateB.itSMTPThree && { itSMTPThree: IBR_RFCData.templateB.itSMTPThree }),
                ...(IBR_RFCData.templateB.itAdditionalNotes && { itAdditionalNotes: IBR_RFCData.templateB.itAdditionalNotes }),
                ...(IBR_RFCData.templateB.piuDistance && { piuDistance: IBR_RFCData.templateB.piuDistance }),
                ...(IBR_RFCData.templateB.switchDistance && { switchDistance: IBR_RFCData.templateB.switchDistance }),
                ...(IBR_RFCData.templateB.ampPickup && { ampPickup: IBR_RFCData.templateB.ampPickup }),
                ...(IBR_RFCData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_RFCData.templateB.fromAirTakeUpDistance }),
                ...(IBR_RFCData.templateB.specialControllerOptions && { specialControllerOptions: IBR_RFCData.templateB.specialControllerOptions })
            }),            
            ...(IBR_RFCData.surrondingTemp && { surrondingTemp: IBR_RFCData.surrondingTemp }),
            ...(IBR_RFCData.conveyorLoaded && { conveyorLoaded: IBR_RFCData.conveyorLoaded }),
            ...(IBR_RFCData.conveyorSwing && { conveyorSwing: IBR_RFCData.conveyorSwing }),
            ...(IBR_RFCData.strandStatus && { strandStatus: IBR_RFCData.strandStatus }),
            ...(IBR_RFCData.plantLayout && { plantLayout: IBR_RFCData.plantLayout }),
            ...(IBR_RFCData.requiredPics && { requiredPics: IBR_RFCData.requiredPics }),
            ...(IBR_RFCData.operatingVoltage && { operatingVoltage: IBR_RFCData.operatingVoltage }),
            ...(IBR_RFCData.controlVoltage && { controlVoltage: IBR_RFCData.controlVoltage }),
            ...(IBR_RFCData.wheelOpenType && { wheelOpenType: IBR_RFCData.wheelOpenType }),
            ...(IBR_RFCData.wheelClosedType && { wheelClosedType: IBR_RFCData.wheelClosedType }),
            ...(IBR_RFCData.openStatus && { openStatus: IBR_RFCData.openStatus }),
            ...(IBR_RFCData.powerChainStatus && { powerChainStatus: IBR_RFCData.powerChainStatus }),
            ...(IBR_RFCData.chainPinStatus && { chainPinStatus: IBR_RFCData.chainPinStatus }),
            ...(IBR_RFCData.catDriveStatus && { catDriveStatus: IBR_RFCData.catDriveStatus }),
            ...(IBR_RFCData.catDriveNum && { catDriveNum: IBR_RFCData.catDriveNum }),
            ...(IBR_RFCData.railLubeStatus && { railLubeStatus: IBR_RFCData.railLubeStatus }),
            ...(IBR_RFCData.externalLubeStatus && { externalLubeStatus: IBR_RFCData.externalLubeStatus }),
            ...(IBR_RFCData.lubeBrand && { lubeBrand: IBR_RFCData.lubeBrand }),
            ...(IBR_RFCData.lubeType && { lubeType: IBR_RFCData.lubeType }),
            ...(IBR_RFCData.lubeViscosity && { lubeViscosity: IBR_RFCData.lubeViscosity }),
            ...(IBR_RFCData.chainCleanStatus && { chainCleanStatus: IBR_RFCData.chainCleanStatus }),
            ...(IBR_RFCData.ibrUnitType && { ibrUnitType: IBR_RFCData.ibrUnitType }),
            ...(IBR_RFCData.ibrChainA1 && { ibrChainA1: IBR_RFCData.ibrChainA1 }),
            ...(IBR_RFCData.ibrChainB1 && { ibrChainB1: IBR_RFCData.ibrChainB1 }),
            ...(IBR_RFCData.ibrChainC1 && { ibrChainC1: IBR_RFCData.ibrChainC1 }),
            ...(IBR_RFCData.ibrChainD1 && { ibrChainD1: IBR_RFCData.ibrChainD1 }),
            ...(IBR_RFCData.ibrChainF1 && { ibrChainF1: IBR_RFCData.ibrChainF1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_OPCO300" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_OPCO300 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;