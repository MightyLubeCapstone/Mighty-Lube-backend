const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_RFC = require("../models/IBR_RFC");
const templateA = require("../models/templateA");

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

            // monitorData: new templateA({
            //     existingMonitor: IBR_RFCData.templateA.existingMonitor,
            //     newMonitor: IBR_RFCData.templateA.newMonitor,
            //     ...(IBR_RFCData.templateA.dcuStatus && { dcuStatus: IBR_RFCData.templateA.dcuStatus }),
            //     ...(IBR_RFCData.templateA.dcuNum && { dcuNum: IBR_RFCData.templateA.dcuNum }),
            //     ...(IBR_RFCData.templateA.existingWindows && { existingWindows: IBR_RFCData.templateA.existingWindows }),
            //     ...(IBR_RFCData.templateA.existingHeadUnit && { existingHeadUnit: IBR_RFCData.templateA.existingHeadUnit }),
            //     ...(IBR_RFCData.templateA.existingDCU && { existingDCU: IBR_RFCData.templateA.existingDCU }),
            //     ...(IBR_RFCData.templateA.existingPowerInterface && { existingPowerInterface: IBR_RFCData.templateA.existingPowerInterface }),
            //     ...(IBR_RFCData.templateA.newReservoir && { newReservoir: IBR_RFCData.templateA.newReservoir }),
            //     ...(IBR_RFCData.templateA.reservoirSize && { reservoirSize: IBR_RFCData.templateA.reservoirSize }),
            //     ...(IBR_RFCData.templateA.otherReservoirSize && { otherReservoirSize: IBR_RFCData.templateA.otherReservoirSize }),
            //     ...(IBR_RFCData.templateA.newReservoirNum && { newReservoirNum: IBR_RFCData.templateA.newReservoirNum }),
            //     ...(IBR_RFCData.templateA.typeMonitor && { typeMonitor: IBR_RFCData.templateA.typeMonitor }),
            //     ...(IBR_RFCData.templateA.driveMotorAmp && { driveMotorAmp: IBR_RFCData.templateA.driveMotorAmp }),
            //     ...(IBR_RFCData.templateA.driveMotorAmpNum && { driveMotorAmpNum: IBR_RFCData.templateA.driveMotorAmpNum }),
            //     ...(IBR_RFCData.templateA.driveTakeUpAir && { driveTakeUpAir: IBR_RFCData.templateA.driveTakeUpAir }),
            //     ...(IBR_RFCData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_RFCData.templateA.driveTakeUpAirNum }),
            //     ...(IBR_RFCData.templateA.takeUpDistance && { takeUpDistance: IBR_RFCData.templateA.takeUpDistance }),
            //     ...(IBR_RFCData.templateA.takeUpDistanceNum && { takeUpDistanceNum: IBR_RFCData.templateA.takeUpDistanceNum }),
            //     ...(IBR_RFCData.templateA.driveTemp && { driveTemp: IBR_RFCData.templateA.driveTemp }),
            //     ...(IBR_RFCData.templateA.driveTempNum && { driveTempNum: IBR_RFCData.templateA.driveTempNum }),
            //     ...(IBR_RFCData.templateA.driveVibration && { driveVibration: IBR_RFCData.templateA.driveVibration }),
            //     ...(IBR_RFCData.templateA.driveVibrationNum && { driveVibrationNum: IBR_RFCData.templateA.driveVibrationNum }),
            //     ...(IBR_RFCData.templateA.dogPitch && { dogPitch: IBR_RFCData.templateA.dogPitch }),
            //     ...(IBR_RFCData.templateA.dogPitchNum && { dogPitchNum: IBR_RFCData.templateA.dogPitchNum }),
            //     ...(IBR_RFCData.templateA.paintMarker && { paintMarker: IBR_RFCData.templateA.paintMarker }),
            //     ...(IBR_RFCData.templateA.paintMarkerNum && { paintMarkerNum: IBR_RFCData.templateA.paintMarkerNum }),
            //     ...(IBR_RFCData.templateA.chainVision && { chainVision: IBR_RFCData.templateA.chainVision }),
            //     ...(IBR_RFCData.templateA.lubeVision && { lubeVision: IBR_RFCData.templateA.lubeVision }),
            //     ...(IBR_RFCData.templateA.trolleyVision && { trolleyVision: IBR_RFCData.templateA.trolleyVision }),
            //     ...(IBR_RFCData.templateA.trolleyDetect && { trolleyDetect: IBR_RFCData.templateA.trolleyDetect }),
            //     ...(IBR_RFCData.templateA.omniView && { omniView: IBR_RFCData.templateA.omniView }),
            //     ...(IBR_RFCData.templateA.dcuUpgradeNum && { dcuUpgradeNum: IBR_RFCData.templateA.dcuUpgradeNum }),
            //     ...(IBR_RFCData.templateA.itNameOne && { itNameOne: IBR_RFCData.templateA.itNameOne }),
            //     ...(IBR_RFCData.templateA.itIPOne && { itIPOne: IBR_RFCData.templateA.itIPOne }),
            //     ...(IBR_RFCData.templateA.itGatewayOne && { itGatewayOne: IBR_RFCData.templateA.itGatewayOne }),
            //     ...(IBR_RFCData.templateA.itSubnetOne && { itSubnetOne: IBR_RFCData.templateA.itSubnetOne }),
            //     ...(IBR_RFCData.templateA.itDNSOne && { itDNSOne: IBR_RFCData.templateA.itDNSOne }),
            //     ...(IBR_RFCData.templateA.itSMTPOne && { itSMTPOne: IBR_RFCData.templateA.itSMTPOne }),
            //     ...(IBR_RFCData.templateA.itNameTwo && { itNameTwo: IBR_RFCData.templateA.itNameTwo }),
            //     ...(IBR_RFCData.templateA.itIPTwo && { itIPTwo: IBR_RFCData.templateA.itIPTwo }),
            //     ...(IBR_RFCData.templateA.itGatewayTwo && { itGatewayTwo: IBR_RFCData.templateA.itGatewayTwo }),
            //     ...(IBR_RFCData.templateA.itSubnetTwo && { itSubnetTwo: IBR_RFCData.templateA.itSubnetTwo }),
            //     ...(IBR_RFCData.templateA.itDNSTwo && { itDNSTwo: IBR_RFCData.templateA.itDNSTwo }),
            //     ...(IBR_RFCData.templateA.itSMTPTwo && { itSMTPTwo: IBR_RFCData.templateA.itSMTPTwo }),
            //     ...(IBR_RFCData.templateA.itNameThree && { itNameThree: IBR_RFCData.templateA.itNameThree }),
            //     ...(IBR_RFCData.templateA.itIPThree && { itIPThree: IBR_RFCData.templateA.itIPThree }),
            //     ...(IBR_RFCData.templateA.itGatewayThree && { itGatewayThree: IBR_RFCData.templateA.itGatewayThree }),
            //     ...(IBR_RFCData.templateA.itSubnetThree && { itSubnetThree: IBR_RFCData.templateA.itSubnetThree }),
            //     ...(IBR_RFCData.templateA.itDNSThree && { itDNSThree: IBR_RFCData.templateA.itDNSThree }),
            //     ...(IBR_RFCData.templateA.itSMTPThree && { itSMTPThree: IBR_RFCData.templateA.itSMTPThree }),
            //     ...(IBR_RFCData.templateA.itAdditionalNotes && { itAdditionalNotes: IBR_RFCData.templateA.itAdditionalNotes }),
            //     ...(IBR_RFCData.templateA.piuDistance && { piuDistance: IBR_RFCData.templateA.piuDistance }),
            //     ...(IBR_RFCData.templateA.switchDistance && { switchDistance: IBR_RFCData.templateA.switchDistance }),
            //     ...(IBR_RFCData.templateA.ampPickup && { ampPickup: IBR_RFCData.templateA.ampPickup }),
            //     ...(IBR_RFCData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_RFCData.templateA.fromAirTakeUpDistance }),
            //     ...(IBR_RFCData.templateA.specialControllerOptions && { specialControllerOptions: IBR_RFCData.templateA.specialControllerOptions })
            // }),            
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