const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CC5_OP4OE = require("../models/CC5_OP4OE");
const templateB = require("../models/templateB");


const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for CC5_OP4OE form
    try {
        const { CC5_OP4OEData, numRequested } = req.body;
        const order = new CC5_OP4OE({
            conveyorName: CC5_OP4OEData.conveyorName,
            cc5ChainSize: CC5_OP4OEData.cc5ChainSize,
            ...(CC5_OP4OEData.otherChainSize && { otherChainSize: CC5_OP4OEData.otherChainSize }),
            industrialChainManufacturer: CC5_OP4OEData.industrialChainManufacturer,
            ...(CC5_OP4OEData.otherChainManufacturer && { otherChainManufacturer: CC5_OP4OEData.otherChainManufacturer }),
            conveyorLength: CC5_OP4OEData.conveyorLength,
            conveyorLengthUnit: CC5_OP4OEData.conveyorLengthUnit,
            conveyorSpeed: CC5_OP4OEData.conveyorSpeed,
            conveyorSpeedUnit: CC5_OP4OEData.conveyorSpeedUnit,
            ...(CC5_OP4OEData.conveyorIndex && { conveyorIndex: CC5_OP4OEData.conveyorIndex }),
            ...(CC5_OP4OEData.travelDirection && { travelDirection: CC5_OP4OEData.travelDirection }),
            appEnviroment: CC5_OP4OEData.appEnviroment,
            ...(CC5_OP4OEData.ovenStatus && { ovenStatus: CC5_OP4OEData.ovenStatus }),
            ...(CC5_OP4OEData.ovenTemp && { ovenTemp: CC5_OP4OEData.ovenTemp }),
            ...(CC5_OP4OEData.surroundingTemp && { surroundingTemp: CC5_OP4OEData.surroundingTemp }),
            strandStatus: CC5_OP4OEData.strandStatus,
            ...(CC5_OP4OEData.plantLayout && { plantLayout: CC5_OP4OEData.plantLayout }),
            ...(CC5_OP4OEData.requiredPics && { requiredPics: CC5_OP4OEData.requiredPics }),
            ...(CC5_OP4OEData.operatingVoltage && { operatingVoltage: CC5_OP4OEData.operatingVoltage }),
            monitorData: new templateB({
                existingMonitor: CC5_OP4OEData.templateB.existingMonitor,
                //newMonitor: CC5_OP4OEData.templateB.newMonitor,
                ...(CC5_OP4OEData.templateB.dcuStatus && { dcuStatus: CC5_OP4OEData.templateB.dcuStatus }),
                ...(CC5_OP4OEData.templateB.dcuNum && { dcuNum: CC5_OP4OEData.templateB.dcuNum }),
                ...(CC5_OP4OEData.templateB.existingWindows && { existingWindows: CC5_OP4OEData.templateB.existingWindows }),
                ...(CC5_OP4OEData.templateB.existingHeadUnit && { existingHeadUnit: CC5_OP4OEData.templateB.existingHeadUnit }),
                ...(CC5_OP4OEData.templateB.existingDCU && { existingDCU: CC5_OP4OEData.templateB.existingDCU }),
                ...(CC5_OP4OEData.templateB.existingPowerInterface && { existingPowerInterface: CC5_OP4OEData.templateB.existingPowerInterface }),
                ...(CC5_OP4OEData.templateB.newReservoir && { newReservoir: CC5_OP4OEData.templateB.newReservoir }),
                ...(CC5_OP4OEData.templateB.reservoirSize && { reservoirSize: CC5_OP4OEData.templateB.reservoirSize }),
                ...(CC5_OP4OEData.templateB.otherReservoirSize && { otherReservoirSize: CC5_OP4OEData.templateB.otherReservoirSize }),
                ...(CC5_OP4OEData.templateB.newReservoirNum && { newReservoirNum: CC5_OP4OEData.templateB.newReservoirNum }),
                ...(CC5_OP4OEData.templateB.typeMonitor && { typeMonitor: CC5_OP4OEData.templateB.typeMonitor }),
                ...(CC5_OP4OEData.templateB.driveMotorAmp && { driveMotorAmp: CC5_OP4OEData.templateB.driveMotorAmp }),
                ...(CC5_OP4OEData.templateB.driveMotorAmpNum && { driveMotorAmpNum: CC5_OP4OEData.templateB.driveMotorAmpNum }),
                ...(CC5_OP4OEData.templateB.driveTakeUpAir && { driveTakeUpAir: CC5_OP4OEData.templateB.driveTakeUpAir }),
                ...(CC5_OP4OEData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_OP4OEData.templateB.driveTakeUpAirNum }),
                ...(CC5_OP4OEData.templateB.takeUpDistance && { takeUpDistance: CC5_OP4OEData.templateB.takeUpDistance }),
                ...(CC5_OP4OEData.templateB.takeUpDistanceNum && { takeUpDistanceNum: CC5_OP4OEData.templateB.takeUpDistanceNum }),
                ...(CC5_OP4OEData.templateB.driveTemp && { driveTemp: CC5_OP4OEData.templateB.driveTemp }),
                ...(CC5_OP4OEData.templateB.driveTempNum && { driveTempNum: CC5_OP4OEData.templateB.driveTempNum }),
                ...(CC5_OP4OEData.templateB.driveVibration && { driveVibration: CC5_OP4OEData.templateB.driveVibration }),
                ...(CC5_OP4OEData.templateB.driveVibrationNum && { driveVibrationNum: CC5_OP4OEData.templateB.driveVibrationNum }),
                ...(CC5_OP4OEData.templateB.dogPitch && { dogPitch: CC5_OP4OEData.templateB.dogPitch }),
                ...(CC5_OP4OEData.templateB.dogPitchNum && { dogPitchNum: CC5_OP4OEData.templateB.dogPitchNum }),
                ...(CC5_OP4OEData.templateB.paintMarker && { paintMarker: CC5_OP4OEData.templateB.paintMarker }),
                ...(CC5_OP4OEData.templateB.paintMarkerNum && { paintMarkerNum: CC5_OP4OEData.templateB.paintMarkerNum }),
                ...(CC5_OP4OEData.templateB.chainVision && { chainVision: CC5_OP4OEData.templateB.chainVision }),
                ...(CC5_OP4OEData.templateB.lubeVision && { lubeVision: CC5_OP4OEData.templateB.lubeVision }),
                ...(CC5_OP4OEData.templateB.trolleyVision && { trolleyVision: CC5_OP4OEData.templateB.trolleyVision }),
                ...(CC5_OP4OEData.templateB.trolleyDetect && { trolleyDetect: CC5_OP4OEData.templateB.trolleyDetect }),
                ...(CC5_OP4OEData.templateB.omniView && { omniView: CC5_OP4OEData.templateB.omniView }),
                ...(CC5_OP4OEData.templateB.dcuUpgradeNum && { dcuUpgradeNum: CC5_OP4OEData.templateB.dcuUpgradeNum }),
                ...(CC5_OP4OEData.templateB.itNameOne && { itNameOne: CC5_OP4OEData.templateB.itNameOne }),
                ...(CC5_OP4OEData.templateB.itIPOne && { itIPOne: CC5_OP4OEData.templateB.itIPOne }),
                ...(CC5_OP4OEData.templateB.itGatewayOne && { itGatewayOne: CC5_OP4OEData.templateB.itGatewayOne }),
                ...(CC5_OP4OEData.templateB.itSubnetOne && { itSubnetOne: CC5_OP4OEData.templateB.itSubnetOne }),
                ...(CC5_OP4OEData.templateB.itDNSOne && { itDNSOne: CC5_OP4OEData.templateB.itDNSOne }),
                ...(CC5_OP4OEData.templateB.itSMTPOne && { itSMTPOne: CC5_OP4OEData.templateB.itSMTPOne }),
                ...(CC5_OP4OEData.templateB.itNameTwo && { itNameTwo: CC5_OP4OEData.templateB.itNameTwo }),
                ...(CC5_OP4OEData.templateB.itIPTwo && { itIPTwo: CC5_OP4OEData.templateB.itIPTwo }),
                ...(CC5_OP4OEData.templateB.itGatewayTwo && { itGatewayTwo: CC5_OP4OEData.templateB.itGatewayTwo }),
                ...(CC5_OP4OEData.templateB.itSubnetTwo && { itSubnetTwo: CC5_OP4OEData.templateB.itSubnetTwo }),
                ...(CC5_OP4OEData.templateB.itDNSTwo && { itDNSTwo: CC5_OP4OEData.templateB.itDNSTwo }),
                ...(CC5_OP4OEData.templateB.itSMTPTwo && { itSMTPTwo: CC5_OP4OEData.templateB.itSMTPTwo }),
                ...(CC5_OP4OEData.templateB.itNameThree && { itNameThree: CC5_OP4OEData.templateB.itNameThree }),
                ...(CC5_OP4OEData.templateB.itIPThree && { itIPThree: CC5_OP4OEData.templateB.itIPThree }),
                ...(CC5_OP4OEData.templateB.itGatewayThree && { itGatewayThree: CC5_OP4OEData.templateB.itGatewayThree }),
                ...(CC5_OP4OEData.templateB.itSubnetThree && { itSubnetThree: CC5_OP4OEData.templateB.itSubnetThree }),
                ...(CC5_OP4OEData.templateB.itDNSThree && { itDNSThree: CC5_OP4OEData.templateB.itDNSThree }),
                ...(CC5_OP4OEData.templateB.itSMTPThree && { itSMTPThree: CC5_OP4OEData.templateB.itSMTPThree }),
                ...(CC5_OP4OEData.templateB.itAdditionalNotes && { itAdditionalNotes: CC5_OP4OEData.templateB.itAdditionalNotes }),
                ...(CC5_OP4OEData.templateB.piuDistance && { piuDistance: CC5_OP4OEData.templateB.piuDistance }),
                ...(CC5_OP4OEData.templateB.switchDistance && { switchDistance: CC5_OP4OEData.templateB.switchDistance }),
                ...(CC5_OP4OEData.templateB.ampPickup && { ampPickup: CC5_OP4OEData.templateB.ampPickup }),
                ...(CC5_OP4OEData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_OP4OEData.templateB.fromAirTakeUpDistance }),
                ...(CC5_OP4OEData.templateB.specialControllerOptions && { specialControllerOptions: CC5_OP4OEData.templateB.specialControllerOptions })
            }),
            highRollerStatus: CC5_OP4OEData.highRollerStatus,
            outboardStatus: CC5_OP4OEData.outboardStatus,
            ...(CC5_OP4OEData.lubeBrand && { lubeBrand: CC5_OP4OEData.lubeBrand }),
            ...(CC5_OP4OEData.lubeType && { lubeType: CC5_OP4OEData.lubeType }),
            ...(CC5_OP4OEData.lubeViscosity && { lubeViscosity: CC5_OP4OEData.lubeViscosity }),
            ...(CC5_OP4OEData.cleanChain && { cleanChain: CC5_OP4OEData.cleanChain }),
            ...(CC5_OP4OEData.chainMaster && { chainMaster: CC5_OP4OEData.chainMaster }),
            ...(CC5_OP4OEData.timerStatus && { timerStatus: CC5_OP4OEData.timerStatus }),
            ...(CC5_OP4OEData.electricStatus && { electricStatus: CC5_OP4OEData.electricStatus }),
            ...(CC5_OP4OEData.pneumaticStatus && { pneumaticStatus: CC5_OP4OEData.pneumaticStatus }),
            ...(CC5_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: CC5_OP4OEData.mightyLubeMonitoring }),
            ...(CC5_OP4OEData.plcConnection && { plcConnection: CC5_OP4OEData.plcConnection }),
            ...(CC5_OP4OEData.otherControllerNotes && { otherControllerNotes: CC5_OP4OEData.otherControllerNotes }),
            ...(CC5_OP4OEData.powerRailWidth && { powerRailWidth: CC5_OP4OEData.powerRailWidth }),
            ...(CC5_OP4OEData.powerRailHeight && { powerRailHeight: CC5_OP4OEData.powerRailHeight }),
            ...(CC5_OP4OEData.rollerWheelA1 && { rollerWheelA1: CC5_OP4OEData.rollerWheelA1 }),
            ...(CC5_OP4OEData.rollerWheelB1 && { rollerWheelB1: CC5_OP4OEData.rollerWheelB1 }),
            ...(CC5_OP4OEData.linkD1 && { linkD1: CC5_OP4OEData.linkD1 }),
            ...(CC5_OP4OEData.wheelPitchM1 && { wheelPitchM1: CC5_OP4OEData.wheelPitchM1 }),
            ...(CC5_OP4OEData.rollerPinY1 && { rollerPinY1: CC5_OP4OEData.rollerPinY1 }),
            ...(CC5_OP4OEData.rollerPinZ1 && { rollerPinZ1: CC5_OP4OEData.rollerPinZ1 }),

        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "CC5_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "CC5_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;