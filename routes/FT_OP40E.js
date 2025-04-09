const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_OP4OE = require("../models/FT_OP4OE");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FT_OP4OE form
    try {
        const { FT_OP4OEData, numRequested } = req.body;
        const order = new FT_OP4OE({
            ...(FT_OP4OEData.conveyorName && { conveyorName: FT_OP4OEData.conveyorName }),
            ...(FT_OP4OEData.chainSize && { chainSize: FT_OP4OEData.chainSize }),
            industrialChainManufacturer: FT_OP4OEData.industrialChainManufacturer,
            ...(FT_OP4OEData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FT_OP4OEData.otherIndustrialChainManufacturer }),
            wheelManufacturer: FT_OP4OEData.wheelManufacturer,
            ...(FT_OP4OEData.otherWheelManufacturer && { otherWheelManufacturer: FT_OP4OEData.otherWheelManufacturer }),
            ...(FT_OP4OEData.conveyorLength && { conveyorLength: FT_OP4OEData.conveyorLength }),
            ...(FT_OP4OEData.conveyorLengthUnit && { conveyorLengthUnit: FT_OP4OEData.conveyorLengthUnit }),
            ...(FT_OP4OEData.conveyorSpeed && { conveyorSpeed: FT_OP4OEData.conveyorSpeed }),
            ...(FT_OP4OEData.conveyorSpeedUnit && { conveyorSpeedUnit: FT_OP4OEData.conveyorSpeedUnit }),
            ...(FT_OP4OEData.conveyorIndex && { conveyorIndex: FT_OP4OEData.conveyorIndex }),
            ...(FT_OP4OEData.travelDirection && { travelDirection: FT_OP4OEData.travelDirection }),
            appEnviroment: FT_OP4OEData.appEnviroment,
            ...(FT_OP4OEData.ovenStatus && { ovenStatus: FT_OP4OEData.ovenStatus }),
            ...(FT_OP4OEData.ovenTemp && { ovenTemp: FT_OP4OEData.ovenTemp }),
            ...(FT_OP4OEData.surroundingTemp && { surroundingTemp: FT_OP4OEData.surroundingTemp }),
            ...(FT_OP4OEData.conveyorLoaded && { conveyorLoaded: FT_OP4OEData.conveyorLoaded }),
            ...(FT_OP4OEData.conveyorSwing && { conveyorSwing: FT_OP4OEData.conveyorSwing }),
            ...(FT_OP4OEData.strandStatus && { strandStatus: FT_OP4OEData.strandStatus }),
            ...(FT_OP4OEData.plantLayout && { plantLayout: FT_OP4OEData.plantLayout }),
            ...(FT_OP4OEData.requiredPics && { requiredPics: FT_OP4OEData.requiredPics }),
            ...(FT_OP4OEData.operatingVoltage && { operatingVoltage: FT_OP4OEData.operatingVoltage }),
            
            monitorData: new templateB({
                existingMonitor: FT_OP4OEData.templateB.existingMonitor,
                newMonitor: FT_OP4OEData.templateB.newMonitor,
                ...(FT_OP4OEData.templateB.dcuStatus && { dcuStatus: FT_OP4OEData.templateB.dcuStatus }),
                ...(FT_OP4OEData.templateB.dcuNum && { dcuNum: FT_OP4OEData.templateB.dcuNum }),
                ...(FT_OP4OEData.templateB.existingWindows && { existingWindows: FT_OP4OEData.templateB.existingWindows }),
                ...(FT_OP4OEData.templateB.existingHeadUnit && { existingHeadUnit: FT_OP4OEData.templateB.existingHeadUnit }),
                ...(FT_OP4OEData.templateB.existingDCU && { existingDCU: FT_OP4OEData.templateB.existingDCU }),
                ...(FT_OP4OEData.templateB.existingPowerInterface && { existingPowerInterface: FT_OP4OEData.templateB.existingPowerInterface }),
                ...(FT_OP4OEData.templateB.newReservoir && { newReservoir: FT_OP4OEData.templateB.newReservoir }),
                ...(FT_OP4OEData.templateB.reservoirSize && { reservoirSize: FT_OP4OEData.templateB.reservoirSize }),
                ...(FT_OP4OEData.templateB.otherReservoirSize && { otherReservoirSize: FT_OP4OEData.templateB.otherReservoirSize }),
                ...(FT_OP4OEData.templateB.newReservoirNum && { newReservoirNum: FT_OP4OEData.templateB.newReservoirNum }),
                ...(FT_OP4OEData.templateB.typeMonitor && { typeMonitor: FT_OP4OEData.templateB.typeMonitor }),
                ...(FT_OP4OEData.templateB.driveMotorAmp && { driveMotorAmp: FT_OP4OEData.templateB.driveMotorAmp }),
                ...(FT_OP4OEData.templateB.driveMotorAmpNum && { driveMotorAmpNum: FT_OP4OEData.templateB.driveMotorAmpNum }),
                ...(FT_OP4OEData.templateB.driveTakeUpAir && { driveTakeUpAir: FT_OP4OEData.templateB.driveTakeUpAir }),
                ...(FT_OP4OEData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: FT_OP4OEData.templateB.driveTakeUpAirNum }),
                ...(FT_OP4OEData.templateB.takeUpDistance && { takeUpDistance: FT_OP4OEData.templateB.takeUpDistance }),
                ...(FT_OP4OEData.templateB.takeUpDistanceNum && { takeUpDistanceNum: FT_OP4OEData.templateB.takeUpDistanceNum }),
                ...(FT_OP4OEData.templateB.driveTemp && { driveTemp: FT_OP4OEData.templateB.driveTemp }),
                ...(FT_OP4OEData.templateB.driveTempNum && { driveTempNum: FT_OP4OEData.templateB.driveTempNum }),
                ...(FT_OP4OEData.templateB.driveVibration && { driveVibration: FT_OP4OEData.templateB.driveVibration }),
                ...(FT_OP4OEData.templateB.driveVibrationNum && { driveVibrationNum: FT_OP4OEData.templateB.driveVibrationNum }),
                ...(FT_OP4OEData.templateB.dogPitch && { dogPitch: FT_OP4OEData.templateB.dogPitch }),
                ...(FT_OP4OEData.templateB.dogPitchNum && { dogPitchNum: FT_OP4OEData.templateB.dogPitchNum }),
                ...(FT_OP4OEData.templateB.paintMarker && { paintMarker: FT_OP4OEData.templateB.paintMarker }),
                ...(FT_OP4OEData.templateB.paintMarkerNum && { paintMarkerNum: FT_OP4OEData.templateB.paintMarkerNum }),
                ...(FT_OP4OEData.templateB.chainVision && { chainVision: FT_OP4OEData.templateB.chainVision }),
                ...(FT_OP4OEData.templateB.lubeVision && { lubeVision: FT_OP4OEData.templateB.lubeVision }),
                ...(FT_OP4OEData.templateB.trolleyVision && { trolleyVision: FT_OP4OEData.templateB.trolleyVision }),
                ...(FT_OP4OEData.templateB.trolleyDetect && { trolleyDetect: FT_OP4OEData.templateB.trolleyDetect }),
                ...(FT_OP4OEData.templateB.omniView && { omniView: FT_OP4OEData.templateB.omniView }),
                ...(FT_OP4OEData.templateB.dcuUpgradeNum && { dcuUpgradeNum: FT_OP4OEData.templateB.dcuUpgradeNum }),
                ...(FT_OP4OEData.templateB.itNameOne && { itNameOne: FT_OP4OEData.templateB.itNameOne }),
                ...(FT_OP4OEData.templateB.itIPOne && { itIPOne: FT_OP4OEData.templateB.itIPOne }),
                ...(FT_OP4OEData.templateB.itGatewayOne && { itGatewayOne: FT_OP4OEData.templateB.itGatewayOne }),
                ...(FT_OP4OEData.templateB.itSubnetOne && { itSubnetOne: FT_OP4OEData.templateB.itSubnetOne }),
                ...(FT_OP4OEData.templateB.itDNSOne && { itDNSOne: FT_OP4OEData.templateB.itDNSOne }),
                ...(FT_OP4OEData.templateB.itSMTPOne && { itSMTPOne: FT_OP4OEData.templateB.itSMTPOne }),
                ...(FT_OP4OEData.templateB.itNameTwo && { itNameTwo: FT_OP4OEData.templateB.itNameTwo }),
                ...(FT_OP4OEData.templateB.itIPTwo && { itIPTwo: FT_OP4OEData.templateB.itIPTwo }),
                ...(FT_OP4OEData.templateB.itGatewayTwo && { itGatewayTwo: FT_OP4OEData.templateB.itGatewayTwo }),
                ...(FT_OP4OEData.templateB.itSubnetTwo && { itSubnetTwo: FT_OP4OEData.templateB.itSubnetTwo }),
                ...(FT_OP4OEData.templateB.itDNSTwo && { itDNSTwo: FT_OP4OEData.templateB.itDNSTwo }),
                ...(FT_OP4OEData.templateB.itSMTPTwo && { itSMTPTwo: FT_OP4OEData.templateB.itSMTPTwo }),
                ...(FT_OP4OEData.templateB.itNameThree && { itNameThree: FT_OP4OEData.templateB.itNameThree }),
                ...(FT_OP4OEData.templateB.itIPThree && { itIPThree: FT_OP4OEData.templateB.itIPThree }),
                ...(FT_OP4OEData.templateB.itGatewayThree && { itGatewayThree: FT_OP4OEData.templateB.itGatewayThree }),
                ...(FT_OP4OEData.templateB.itSubnetThree && { itSubnetThree: FT_OP4OEData.templateB.itSubnetThree }),
                ...(FT_OP4OEData.templateB.itDNSThree && { itDNSThree: FT_OP4OEData.templateB.itDNSThree }),
                ...(FT_OP4OEData.templateB.itSMTPThree && { itSMTPThree: FT_OP4OEData.templateB.itSMTPThree }),
                ...(FT_OP4OEData.templateB.itAdditionalNotes && { itAdditionalNotes: FT_OP4OEData.templateB.itAdditionalNotes }),
                ...(FT_OP4OEData.templateB.piuDistance && { piuDistance: FT_OP4OEData.templateB.piuDistance }),
                ...(FT_OP4OEData.templateB.switchDistance && { switchDistance: FT_OP4OEData.templateB.switchDistance }),
                ...(FT_OP4OEData.templateB.ampPickup && { ampPickup: FT_OP4OEData.templateB.ampPickup }),
                ...(FT_OP4OEData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: FT_OP4OEData.templateB.fromAirTakeUpDistance }),
                ...(FT_OP4OEData.templateB.specialControllerOptions && { specialControllerOptions: FT_OP4OEData.templateB.specialControllerOptions })
            }),
            ...(FT_OP4OEData.wheelOpenType && { wheelOpenType: FT_OP4OEData.wheelOpenType }),
            ...(FT_OP4OEData.wheelClosedType && { wheelClosedType: FT_OP4OEData.wheelClosedType }),
            ...(FT_OP4OEData.openStatus && { openStatus: FT_OP4OEData.openStatus }),
            ...(FT_OP4OEData.freeWheelStatus && { freeWheelStatus: FT_OP4OEData.freeWheelStatus }),
            ...(FT_OP4OEData.guideRollerStatus && { guideRollerStatus: FT_OP4OEData.guideRollerStatus }),
            ...(FT_OP4OEData.openRaceStyleType && { openRaceStyleType: FT_OP4OEData.openRaceStyleType }),
            ...(FT_OP4OEData.closedRaceStyleType && { closedRaceStyleType: FT_OP4OEData.closedRaceStyleType }),
            ...(FT_OP4OEData.holeStatus && { holeStatus: FT_OP4OEData.holeStatus }),
            ...(FT_OP4OEData.actuatorStatus && { actuatorStatus: FT_OP4OEData.actuatorStatus }),
            ...(FT_OP4OEData.pivotStatus && { pivotStatus: FT_OP4OEData.pivotStatus }),
            ...(FT_OP4OEData.kingPinStatus && { kingPinStatus: FT_OP4OEData.kingPinStatus }),
            ...(FT_OP4OEData.outboardStatus && { outboardStatus: FT_OP4OEData.outboardStatus }),
            ...(FT_OP4OEData.lubeBrand && { lubeBrand: FT_OP4OEData.lubeBrand }),
            ...(FT_OP4OEData.lubeType && { lubeType: FT_OP4OEData.lubeType }),
            ...(FT_OP4OEData.lubeViscosity && { lubeViscosity: FT_OP4OEData.lubeViscosity }),
            ...(FT_OP4OEData.chainMaster && { chainMaster: FT_OP4OEData.chainMaster }),
            ...(FT_OP4OEData.timerStatus && { timerStatus: FT_OP4OEData.timerStatus }),
            ...(FT_OP4OEData.electricStatus && { electricStatus: FT_OP4OEData.electricStatus }),
            ...(FT_OP4OEData.pneumaticStatus && { pneumaticStatus: FT_OP4OEData.pneumaticStatus }),
            ...(FT_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: FT_OP4OEData.mightyLubeMonitoring }),
            ...(FT_OP4OEData.plcConnection && { plcConnection: FT_OP4OEData.plcConnection }),
            ...(FT_OP4OEData.otherControllerInfo && { otherControllerInfo: FT_OP4OEData.otherControllerInfo }),
            ...(FT_OP4OEData.ftUnitType && { ftUnitType: FT_OP4OEData.ftUnitType }),
            ...(FT_OP4OEData.ftTopG && { ftTopG: FT_OP4OEData.ftTopG }),
            ...(FT_OP4OEData.ftTopH && { ftTopH: FT_OP4OEData.ftTopH }),
            ...(FT_OP4OEData.ftTopA1 && { ftTopA1: FT_OP4OEData.ftTopA1 }),
            ...(FT_OP4OEData.ftTopB1 && { ftTopB1: FT_OP4OEData.ftTopB1 }),
            ...(FT_OP4OEData.ftTopH1 && { ftTopH1: FT_OP4OEData.ftTopH1 }),
            ...(FT_OP4OEData.ftTopJ1 && { ftTopJ1: FT_OP4OEData.ftTopJ1 }),
            ...(FT_OP4OEData.ftTopL1 && { ftTopL1: FT_OP4OEData.ftTopL1 }),
            ...(FT_OP4OEData.ftTopM1 && { ftTopM1: FT_OP4OEData.ftTopM1 }),
            ...(FT_OP4OEData.ftTopN1 && { ftTopN1: FT_OP4OEData.ftTopN1 }),
            ...(FT_OP4OEData.ftTopP1 && { ftTopP1: FT_OP4OEData.ftTopP1 }),
            ...(FT_OP4OEData.ftTopR1 && { ftTopR1: FT_OP4OEData.ftTopR1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FT_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "FT_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;