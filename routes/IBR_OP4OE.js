const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_OP4OE = require("../models/IBR_OP4OE");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_OP4OE form
    try {
        const { IBR_OP4OEData, numRequested } = req.body;
        const order = new IBR_OP4OE({
            ...(IBR_OP4OEData.conveyorName && { conveyorName: IBR_OP4OEData.conveyorName }),
            chainSize: IBR_OP4OEData.chainSize,
            ...(IBR_OP4OEData.otherChainSize && { otherChainSize: IBR_OP4OEData.otherChainSize }),
            industrialChainManufacturer: IBR_OP4OEData.industrialChainManufacturer,
            ...(IBR_OP4OEData.otherChainManufacturer && { otherChainManufacturer: IBR_OP4OEData.otherChainManufacturer }),
            conveyorLength: IBR_OP4OEData.conveyorLength,
            ...(IBR_OP4OEData.measurementUnit && { measurementUnit: IBR_OP4OEData.measurementUnit }),
            conveyorSpeed: IBR_OP4OEData.conveyorSpeed,
            ...(IBR_OP4OEData.speedUnit && { speedUnit: IBR_OP4OEData.speedUnit }),
            conveyorIndex: IBR_OP4OEData.conveyorIndex,
            ...(IBR_OP4OEData.travelDirection && { travelDirection: IBR_OP4OEData.travelDirection }),
            appEnviroment: IBR_RFCData.appEnviroment,
            ...(IBR_RFCData.ovenStatus && { ovenStatus: IBR_RFCData.ovenStatus }),
            ...(IBR_RFCData.ovenTemp && { ovenTemp: IBR_RFCData.ovenTemp }),
            ...(IBR_RFCData.otherAppEnviroment && { otherAppEnviroment: IBR_RFCData.otherAppEnviroment }),
            strandStatus: IBR_OP4OEData.strandStatus,
            pointsOfLube: IBR_OP4OEData.pointsOfLube,
            m12Plugs: IBR_OP4OEData.m12Plugs,
            ...(IBR_OP4OEData.surroundingTemp && { surroundingTemp: IBR_OP4OEData.surroundingTemp }),
            ...(IBR_OP4OEData.conveyorLoaded && { conveyorLoaded: IBR_OP4OEData.conveyorLoaded }),
            ...(IBR_OP4OEData.conveyorSwing && { conveyorSwing: IBR_OP4OEData.conveyorSwing }),
            ...(IBR_OP4OEData.plantLayout && { plantLayout: IBR_OP4OEData.plantLayout }),
            ...(IBR_OP4OEData.requiredPics && { requiredPics: IBR_OP4OEData.requiredPics }),
            ...(IBR_OP4OEData.operatingVoltage && { operatingVoltage: IBR_OP4OEData.operatingVoltage }),
            ...(IBR_OP4OEData.controlVoltage && { controlVoltage: IBR_OP4OEData.controlVoltage }),
            existingMonitor: IBR_RFCData.existingMonitor,
            newMonitor: IBR_RFCData.newMonitor,
            monitorData: {
                ...(IBR_RFCData.dcuStatus && { dcuStatus: IBR_RFCData.dcuStatus }),
                ...(IBR_RFCData.dcuNum && { dcuNum: IBR_RFCData.dcuNum }),
                ...(IBR_RFCData.existingWindows && { existingWindows: IBR_RFCData.existingWindows }),
                ...(IBR_RFCData.existingHeadUnit && { existingHeadUnit: IBR_RFCData.existingHeadUnit }),
                ...(IBR_RFCData.existingDCU && { existingDCU: IBR_RFCData.existingDCU }),
                ...(IBR_RFCData.existingPowerInterface && { existingPowerInterface: IBR_RFCData.existingPowerInterface }),
                ...(IBR_RFCData.newReservoir && { newReservoir: IBR_RFCData.newReservoir }),
                ...(IBR_RFCData.reservoirSize && { reservoirSize: IBR_RFCData.reservoirSize }),
                ...(IBR_RFCData.otherReservoirSize && { otherReservoirSize: IBR_RFCData.otherReservoirSize }),
                ...(IBR_RFCData.newReservoirNum && { newReservoirNum: IBR_RFCData.newReservoirNum }),
                ...(IBR_RFCData.typeMonitor && { typeMonitor: IBR_RFCData.typeMonitor }),
                ...(IBR_RFCData.driveMotorAmp && { driveMotorAmp: IBR_RFCData.driveMotorAmp }),
                ...(IBR_RFCData.driveMotorAmpNum && { driveMotorAmpNum: IBR_RFCData.driveMotorAmpNum }),
                ...(IBR_RFCData.driveTakeUpAir && { driveTakeUpAir: IBR_RFCData.driveTakeUpAir }),
                ...(IBR_RFCData.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_RFCData.driveTakeUpAirNum }),
                ...(IBR_RFCData.takeUpDistance && { takeUpDistance: IBR_RFCData.takeUpDistance }),
                ...(IBR_RFCData.takeUpDistanceNum && { takeUpDistanceNum: IBR_RFCData.takeUpDistanceNum }),
                ...(IBR_RFCData.driveTemp && { driveTemp: IBR_RFCData.driveTemp }),
                ...(IBR_RFCData.driveTempNum && { driveTempNum: IBR_RFCData.driveTempNum }),
                ...(IBR_RFCData.driveVibration && { driveVibration: IBR_RFCData.driveVibration }),
                ...(IBR_RFCData.driveVibrationNum && { driveVibrationNum: IBR_RFCData.driveVibrationNum }),
                ...(IBR_RFCData.dogPitch && { dogPitch: IBR_RFCData.dogPitch }),
                ...(IBR_RFCData.dogPitchNum && { dogPitchNum: IBR_RFCData.dogPitchNum }),
                ...(IBR_RFCData.paintMarker && { paintMarker: IBR_RFCData.paintMarker }),
                ...(IBR_RFCData.paintMarkerNum && { paintMarkerNum: IBR_RFCData.paintMarkerNum }),
                ...(IBR_RFCData.chainVision && { chainVision: IBR_RFCData.chainVision }),
                ...(IBR_RFCData.lubeVision && { lubeVision: IBR_RFCData.lubeVision }),
                ...(IBR_RFCData.trolleyVision && { trolleyVision: IBR_RFCData.trolleyVision }),
                ...(IBR_RFCData.trolleyDetect && { trolleyDetect: IBR_RFCData.trolleyDetect }),
                ...(IBR_RFCData.omniView && { omniView: IBR_RFCData.omniView }),
                ...(IBR_RFCData.dcuUpgradeNum && { dcuUpgradeNum: IBR_RFCData.dcuUpgradeNum }),
                ...(IBR_RFCData.itNameOne && { itNameOne: IBR_RFCData.itNameOne }),
                ...(IBR_RFCData.itIPOne && { itIPOne: IBR_RFCData.itIPOne }),
                ...(IBR_RFCData.itGatewayOne && { itGatewayOne: IBR_RFCData.itGatewayOne }),
                ...(IBR_RFCData.itSubnetOne && { itSubnetOne: IBR_RFCData.itSubnetOne }),
                ...(IBR_RFCData.itDNSOne && { itDNSOne: IBR_RFCData.itDNSOne }),
                ...(IBR_RFCData.itSMTPOne && { itSMTPOne: IBR_RFCData.itSMTPOne }),
                ...(IBR_RFCData.itNameTwo && { itNameTwo: IBR_RFCData.itNameTwo }),
                ...(IBR_RFCData.itIPTwo && { itIPTwo: IBR_RFCData.itIPTwo }),
                ...(IBR_RFCData.itGatewayTwo && { itGatewayTwo: IBR_RFCData.itGatewayTwo }),
                ...(IBR_RFCData.itSubnetTwo && { itSubnetTwo: IBR_RFCData.itSubnetTwo }),
                ...(IBR_RFCData.itDNSTwo && { itDNSTwo: IBR_RFCData.itDNSTwo }),
                ...(IBR_RFCData.itSMTPTwo && { itSMTPTwo: IBR_RFCData.itSMTPTwo }),
                ...(IBR_RFCData.itNameThree && { itNameThree: IBR_RFCData.itNameThree }),
                ...(IBR_RFCData.itIPThree && { itIPThree: IBR_RFCData.itIPThree }),
                ...(IBR_RFCData.itGatewayThree && { itGatewayThree: IBR_RFCData.itGatewayThree }),
                ...(IBR_RFCData.itSubnetThree && { itSubnetThree: IBR_RFCData.itSubnetThree }),
                ...(IBR_RFCData.itDNSThree && { itDNSThree: IBR_RFCData.itDNSThree }),
                ...(IBR_RFCData.itSMTPThree && { itSMTPThree: IBR_RFCData.itSMTPThree }),
                ...(IBR_RFCData.itAdditionalNotes && { itAdditionalNotes: IBR_RFCData.itAdditionalNotes }),
                ...(IBR_RFCData.piuDistance && { piuDistance: IBR_RFCData.piuDistance }),
                ...(IBR_RFCData.switchDistance && { switchDistance: IBR_RFCData.switchDistance }),
                ...(IBR_RFCData.ampPickup && { ampPickup: IBR_RFCData.ampPickup }),
                ...(IBR_RFCData.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_RFCData.fromAirTakeUpDistance }),
                ...(IBR_RFCData.specialControllerOptions && { specialControllerOptions: IBR_RFCData.specialControllerOptions }),
                ...(IBR_RFCData.operatingVoltage && { operatingVoltage: IBR_RFCData.operatingVoltage })

            },            
            ...(IBR_OP4OEData.wheelOpenType && { wheelOpenType: IBR_OP4OEData.wheelOpenType }),
            ...(IBR_OP4OEData.wheelClosedType && { wheelClosedType: IBR_OP4OEData.wheelClosedType }),
            ...(IBR_OP4OEData.openStatus && { openStatus: IBR_OP4OEData.openStatus }),
            ...(IBR_OP4OEData.freeWheelStatus && { freeWheelStatus: IBR_OP4OEData.freeWheelStatus }),
            ...(IBR_OP4OEData.guideRollerStatus && { guideRollerStatus: IBR_OP4OEData.guideRollerStatus }),
            ...(IBR_OP4OEData.openRaceStyle && { openRaceStyle: IBR_OP4OEData.openRaceStyle }),
            ...(IBR_OP4OEData.closedRaceStyle && { closedRaceStyle: IBR_OP4OEData.closedRaceStyle }),
            ...(IBR_OP4OEData.holeStatus && { holeStatus: IBR_OP4OEData.holeStatus }),
            ...(IBR_OP4OEData.actuatorStatus && { actuatorStatus: IBR_OP4OEData.actuatorStatus }),
            ...(IBR_OP4OEData.pivotStatus && { pivotStatus: IBR_OP4OEData.pivotStatus }),
            ...(IBR_OP4OEData.kingPinStatus && { kingPinStatus: IBR_OP4OEData.kingPinStatus }),
            ...(IBR_OP4OEData.outboardStatus && { outboardStatus: IBR_OP4OEData.outboardStatus }),
            ...(IBR_OP4OEData.railLubeStatus && { railLubeStatus: IBR_OP4OEData.railLubeStatus }),
            ...(IBR_OP4OEData.lubeBrand && { lubeBrand: IBR_OP4OEData.lubeBrand }),
            ...(IBR_OP4OEData.lubeType && { lubeType: IBR_OP4OEData.lubeType }),
            ...(IBR_OP4OEData.lubeViscosity && { lubeViscosity: IBR_OP4OEData.lubeViscosity }),
            ...(IBR_OP4OEData.chainMaster && { chainMaster: IBR_OP4OEData.chainMaster }),
            ...(IBR_OP4OEData.timerStatus && { timerStatus: IBR_OP4OEData.timerStatus }),
            ...(IBR_OP4OEData.electricStatus && { electricStatus: IBR_OP4OEData.electricStatus }),
            ...(IBR_OP4OEData.pneumaticStatus && { pneumaticStatus: IBR_OP4OEData.pneumaticStatus }),
            ...(IBR_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: IBR_OP4OEData.mightyLubeMonitoring }),
            ...(IBR_OP4OEData.plcConnection && { plcConnection: IBR_OP4OEData.plcConnection }),
            ...(IBR_OP4OEData.otherControllerInfo && { otherControllerInfo: IBR_OP4OEData.otherControllerInfo }),
            ...(IBR_OP4OEData.ibrUnitType && { ibrUnitType: IBR_OP4OEData.ibrUnitType }),
            ...(IBR_OP4OEData.ibrChainA1 && { ibrChainA1: IBR_OP4OEData.ibrChainA1 }),
            ...(IBR_OP4OEData.ibrChainB1 && { ibrChainB1: IBR_OP4OEData.ibrChainB1 }),
            ...(IBR_OP4OEData.ibrChainC1 && { ibrChainC1: IBR_OP4OEData.ibrChainC1 }),
            ...(IBR_OP4OEData.ibrChainD1 && { ibrChainD1: IBR_OP4OEData.ibrChainD1 }),
            ...(IBR_OP4OEData.ibrChainF1 && { ibrChainF1: IBR_OP4OEData.ibrChainF1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;