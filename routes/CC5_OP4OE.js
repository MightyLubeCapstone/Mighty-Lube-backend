const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CC5_CL = require("../models/CC5_OP4OE");

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
            existingMonitor: CC5_OP4OEData.existingMonitor,
            // Ensure 'Connecting to an existing monitor' and 'New Monitor' are not both selected
            newMonitor: CC5_OP4OEData.newMonitor,
            ...(CC5_OP4OEData.dcuStatus && { dcuStatus: CC5_OP4OEData.dcuStatus }),
            ...(CC5_OP4OEData.dcuNum && { dcuNum: CC5_OP4OEData.dcuNum }),
            ...(CC5_OP4OEData.existingWindows && { existingWindows: CC5_OP4OEData.existingWindows }),
            ...(CC5_OP4OEData.existingHeadUnit && { existingHeadUnit: CC5_OP4OEData.existingHeadUnit }),
            ...(CC5_OP4OEData.existingDCU && { existingDCU: CC5_OP4OEData.existingDCU }),
            ...(CC5_OP4OEData.existingPowerInterface && { existingPowerInterface: CC5_OP4OEData.existingPowerInterface }),
            ...(CC5_OP4OEData.newReservoir && { newReservoir: CC5_OP4OEData.newReservoir }),
            ...(CC5_OP4OEData.reservoirSize && { reservoirSize: CC5_OP4OEData.reservoirSize }),
            ...(CC5_OP4OEData.otherReservoirSize && { otherReservoirSize: CC5_OP4OEData.otherReservoirSize }),
            ...(CC5_OP4OEData.newReservoirNum && { newReservoirNum: CC5_OP4OEData.newReservoirNum }),
            ...(CC5_OP4OEData.typeMonitor && { typeMonitor: CC5_OP4OEData.typeMonitor }),
            ...(CC5_OP4OEData.driveMotorAmp && { driveMotorAmp: CC5_OP4OEData.driveMotorAmp }),
            ...(CC5_OP4OEData.driveMotorAmpNum && { driveMotorAmpNum: CC5_OP4OEData.driveMotorAmpNum }),
            ...(CC5_OP4OEData.driveTakeUpAir && { driveTakeUpAir: CC5_OP4OEData.driveTakeUpAir }),
            ...(CC5_OP4OEData.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_OP4OEData.driveTakeUpAirNum }),
            ...(CC5_OP4OEData.takeUpDistance && { takeUpDistance: CC5_OP4OEData.takeUpDistance }),
            ...(CC5_OP4OEData.takeUpDistanceNum && { takeUpDistanceNum: CC5_OP4OEData.takeUpDistanceNum }),
            ...(CC5_OP4OEData.driveTemp && { driveTemp: CC5_OP4OEData.driveTemp }),
            ...(CC5_OP4OEData.driveTempNum && { driveTempNum: CC5_OP4OEData.driveTempNum }),
            ...(CC5_OP4OEData.driveVibration && { driveVibration: CC5_OP4OEData.driveVibration }),
            ...(CC5_OP4OEData.driveVibrationNum && { driveVibrationNum: CC5_OP4OEData.driveVibrationNum }),
            ...(CC5_OP4OEData.dogPitch && { dogPitch: CC5_OP4OEData.dogPitch }),
            ...(CC5_OP4OEData.dogPitchNum && { dogPitchNum: CC5_OP4OEData.dogPitchNum }),
            ...(CC5_OP4OEData.paintMarker && { paintMarker: CC5_OP4OEData.paintMarker }),
            ...(CC5_OP4OEData.paintMarkerNum && { paintMarkerNum: CC5_OP4OEData.paintMarkerNum }),
            ...(CC5_OP4OEData.chainVision && { chainVision: CC5_OP4OEData.chainVision }),
            ...(CC5_OP4OEData.lubeVision && { lubeVision: CC5_OP4OEData.lubeVision }),
            ...(CC5_OP4OEData.trolleyVision && { trolleyVision: CC5_OP4OEData.trolleyVision }),
            ...(CC5_OP4OEData.trolleyDetect && { trolleyDetect: CC5_OP4OEData.trolleyDetect }),
            ...(CC5_OP4OEData.omniView && { omniView: CC5_OP4OEData.omniView }),
            ...(CC5_OP4OEData.dcuUpgradeNum && { dcuUpgradeNum: CC5_OP4OEData.dcuUpgradeNum }),
            ...(CC5_OP4OEData.itNameOne && { itNameOne: CC5_OP4OEData.itNameOne }),
            ...(CC5_OP4OEData.itIPOne && { itIPOne: CC5_OP4OEData.itIPOne }),
            ...(CC5_OP4OEData.itGatewayOne && { itGatewayOne: CC5_OP4OEData.itGatewayOne }),
            ...(CC5_OP4OEData.itSubnetOne && { itSubnetOne: CC5_OP4OEData.itSubnetOne }),
            ...(CC5_OP4OEData.itDNSOne && { itDNSOne: CC5_OP4OEData.itDNSOne }),
            ...(CC5_OP4OEData.itSMTPOne && { itSMTPOne: CC5_OP4OEData.itSMTPOne }),
            ...(CC5_OP4OEData.itNameTwo && { itNameTwo: CC5_OP4OEData.itNameTwo }),
            ...(CC5_OP4OEData.itIPTwo && { itIPTwo: CC5_OP4OEData.itIPTwo }),
            ...(CC5_OP4OEData.itGatewayTwo && { itGatewayTwo: CC5_OP4OEData.itGatewayTwo }),
            ...(CC5_OP4OEData.itSubnetTwo && { itSubnetTwo: CC5_OP4OEData.itSubnetTwo }),
            ...(CC5_OP4OEData.itDNSTwo && { itDNSTwo: CC5_OP4OEData.itDNSTwo }),
            ...(CC5_OP4OEData.itSMTPTwo && { itSMTPTwo: CC5_OP4OEData.itSMTPTwo }),
            ...(CC5_OP4OEData.itNameThree && { itNameThree: CC5_OP4OEData.itNameThree }),
            ...(CC5_OP4OEData.itIPThree && { itIPThree: CC5_OP4OEData.itIPThree }),
            ...(CC5_OP4OEData.itGatewayThree && { itGatewayThree: CC5_OP4OEData.itGatewayThree }),
            ...(CC5_OP4OEData.itSubnetThree && { itSubnetThree: CC5_OP4OEData.itSubnetThree }),
            ...(CC5_OP4OEData.itDNSThree && { itDNSThree: CC5_OP4OEData.itDNSThree }),
            ...(CC5_OP4OEData.itSMTPThree && { itSMTPThree: CC5_OP4OEData.itSMTPThree }),
            ...(CC5_OP4OEData.itAdditionalNotes && { itAdditionalNotes: CC5_OP4OEData.itAdditionalNotes }),
            ...(CC5_OP4OEData.piuDistance && { piuDistance: CC5_OP4OEData.piuDistance }),
            ...(CC5_OP4OEData.switchDistance && { switchDistance: CC5_OP4OEData.switchDistance }),
            ...(CC5_OP4OEData.ampPickup && { ampPickup: CC5_OP4OEData.ampPickup }),
            ...(CC5_OP4OEData.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_OP4OEData.fromAirTakeUpDistance }),
            ...(CC5_OP4OEData.specialControllerOptions && { specialControllerOptions: CC5_OP4OEData.specialControllerOptions }),
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
        req.user.orders.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "CC5_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "CC5_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;