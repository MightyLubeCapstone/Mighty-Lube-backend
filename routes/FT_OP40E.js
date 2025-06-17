const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_OP4OE = require("../models/FT_OP4OE");
const templateA = require("../models/templateA");

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
            
            // monitorData: new templateA({
            //     existingMonitor: FT_OP4OEData.templateA.existingMonitor,
            //     newMonitor: FT_OP4OEData.templateA.newMonitor,
            //     ...(FT_OP4OEData.templateA.dcuStatus && { dcuStatus: FT_OP4OEData.templateA.dcuStatus }),
            //     ...(FT_OP4OEData.templateA.dcuNum && { dcuNum: FT_OP4OEData.templateA.dcuNum }),
            //     ...(FT_OP4OEData.templateA.existingWindows && { existingWindows: FT_OP4OEData.templateA.existingWindows }),
            //     ...(FT_OP4OEData.templateA.existingHeadUnit && { existingHeadUnit: FT_OP4OEData.templateA.existingHeadUnit }),
            //     ...(FT_OP4OEData.templateA.existingDCU && { existingDCU: FT_OP4OEData.templateA.existingDCU }),
            //     ...(FT_OP4OEData.templateA.existingPowerInterface && { existingPowerInterface: FT_OP4OEData.templateA.existingPowerInterface }),
            //     ...(FT_OP4OEData.templateA.newReservoir && { newReservoir: FT_OP4OEData.templateA.newReservoir }),
            //     ...(FT_OP4OEData.templateA.reservoirSize && { reservoirSize: FT_OP4OEData.templateA.reservoirSize }),
            //     ...(FT_OP4OEData.templateA.otherReservoirSize && { otherReservoirSize: FT_OP4OEData.templateA.otherReservoirSize }),
            //     ...(FT_OP4OEData.templateA.newReservoirNum && { newReservoirNum: FT_OP4OEData.templateA.newReservoirNum }),
            //     ...(FT_OP4OEData.templateA.typeMonitor && { typeMonitor: FT_OP4OEData.templateA.typeMonitor }),
            //     ...(FT_OP4OEData.templateA.driveMotorAmp && { driveMotorAmp: FT_OP4OEData.templateA.driveMotorAmp }),
            //     ...(FT_OP4OEData.templateA.driveMotorAmpNum && { driveMotorAmpNum: FT_OP4OEData.templateA.driveMotorAmpNum }),
            //     ...(FT_OP4OEData.templateA.driveTakeUpAir && { driveTakeUpAir: FT_OP4OEData.templateA.driveTakeUpAir }),
            //     ...(FT_OP4OEData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FT_OP4OEData.templateA.driveTakeUpAirNum }),
            //     ...(FT_OP4OEData.templateA.takeUpDistance && { takeUpDistance: FT_OP4OEData.templateA.takeUpDistance }),
            //     ...(FT_OP4OEData.templateA.takeUpDistanceNum && { takeUpDistanceNum: FT_OP4OEData.templateA.takeUpDistanceNum }),
            //     ...(FT_OP4OEData.templateA.driveTemp && { driveTemp: FT_OP4OEData.templateA.driveTemp }),
            //     ...(FT_OP4OEData.templateA.driveTempNum && { driveTempNum: FT_OP4OEData.templateA.driveTempNum }),
            //     ...(FT_OP4OEData.templateA.driveVibration && { driveVibration: FT_OP4OEData.templateA.driveVibration }),
            //     ...(FT_OP4OEData.templateA.driveVibrationNum && { driveVibrationNum: FT_OP4OEData.templateA.driveVibrationNum }),
            //     ...(FT_OP4OEData.templateA.dogPitch && { dogPitch: FT_OP4OEData.templateA.dogPitch }),
            //     ...(FT_OP4OEData.templateA.dogPitchNum && { dogPitchNum: FT_OP4OEData.templateA.dogPitchNum }),
            //     ...(FT_OP4OEData.templateA.paintMarker && { paintMarker: FT_OP4OEData.templateA.paintMarker }),
            //     ...(FT_OP4OEData.templateA.paintMarkerNum && { paintMarkerNum: FT_OP4OEData.templateA.paintMarkerNum }),
            //     ...(FT_OP4OEData.templateA.chainVision && { chainVision: FT_OP4OEData.templateA.chainVision }),
            //     ...(FT_OP4OEData.templateA.lubeVision && { lubeVision: FT_OP4OEData.templateA.lubeVision }),
            //     ...(FT_OP4OEData.templateA.trolleyVision && { trolleyVision: FT_OP4OEData.templateA.trolleyVision }),
            //     ...(FT_OP4OEData.templateA.trolleyDetect && { trolleyDetect: FT_OP4OEData.templateA.trolleyDetect }),
            //     ...(FT_OP4OEData.templateA.omniView && { omniView: FT_OP4OEData.templateA.omniView }),
            //     ...(FT_OP4OEData.templateA.dcuUpgradeNum && { dcuUpgradeNum: FT_OP4OEData.templateA.dcuUpgradeNum }),
            //     ...(FT_OP4OEData.templateA.itNameOne && { itNameOne: FT_OP4OEData.templateA.itNameOne }),
            //     ...(FT_OP4OEData.templateA.itIPOne && { itIPOne: FT_OP4OEData.templateA.itIPOne }),
            //     ...(FT_OP4OEData.templateA.itGatewayOne && { itGatewayOne: FT_OP4OEData.templateA.itGatewayOne }),
            //     ...(FT_OP4OEData.templateA.itSubnetOne && { itSubnetOne: FT_OP4OEData.templateA.itSubnetOne }),
            //     ...(FT_OP4OEData.templateA.itDNSOne && { itDNSOne: FT_OP4OEData.templateA.itDNSOne }),
            //     ...(FT_OP4OEData.templateA.itSMTPOne && { itSMTPOne: FT_OP4OEData.templateA.itSMTPOne }),
            //     ...(FT_OP4OEData.templateA.itNameTwo && { itNameTwo: FT_OP4OEData.templateA.itNameTwo }),
            //     ...(FT_OP4OEData.templateA.itIPTwo && { itIPTwo: FT_OP4OEData.templateA.itIPTwo }),
            //     ...(FT_OP4OEData.templateA.itGatewayTwo && { itGatewayTwo: FT_OP4OEData.templateA.itGatewayTwo }),
            //     ...(FT_OP4OEData.templateA.itSubnetTwo && { itSubnetTwo: FT_OP4OEData.templateA.itSubnetTwo }),
            //     ...(FT_OP4OEData.templateA.itDNSTwo && { itDNSTwo: FT_OP4OEData.templateA.itDNSTwo }),
            //     ...(FT_OP4OEData.templateA.itSMTPTwo && { itSMTPTwo: FT_OP4OEData.templateA.itSMTPTwo }),
            //     ...(FT_OP4OEData.templateA.itNameThree && { itNameThree: FT_OP4OEData.templateA.itNameThree }),
            //     ...(FT_OP4OEData.templateA.itIPThree && { itIPThree: FT_OP4OEData.templateA.itIPThree }),
            //     ...(FT_OP4OEData.templateA.itGatewayThree && { itGatewayThree: FT_OP4OEData.templateA.itGatewayThree }),
            //     ...(FT_OP4OEData.templateA.itSubnetThree && { itSubnetThree: FT_OP4OEData.templateA.itSubnetThree }),
            //     ...(FT_OP4OEData.templateA.itDNSThree && { itDNSThree: FT_OP4OEData.templateA.itDNSThree }),
            //     ...(FT_OP4OEData.templateA.itSMTPThree && { itSMTPThree: FT_OP4OEData.templateA.itSMTPThree }),
            //     ...(FT_OP4OEData.templateA.itAdditionalNotes && { itAdditionalNotes: FT_OP4OEData.templateA.itAdditionalNotes }),
            //     ...(FT_OP4OEData.templateA.piuDistance && { piuDistance: FT_OP4OEData.templateA.piuDistance }),
            //     ...(FT_OP4OEData.templateA.switchDistance && { switchDistance: FT_OP4OEData.templateA.switchDistance }),
            //     ...(FT_OP4OEData.templateA.ampPickup && { ampPickup: FT_OP4OEData.templateA.ampPickup }),
            //     ...(FT_OP4OEData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FT_OP4OEData.templateA.fromAirTakeUpDistance }),
            //     ...(FT_OP4OEData.templateA.specialControllerOptions && { specialControllerOptions: FT_OP4OEData.templateA.specialControllerOptions })
            // }),
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