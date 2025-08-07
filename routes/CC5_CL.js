const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CC5_CL = require("../models/CC5_CL");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for CC5_CL form
    try {
        const { CC5_CLData, numRequested } = req.body;
        const order = new CC5_CL({
            conveyorName: CC5_CLData.conveyorName,
            cc5ChainSize: CC5_CLData.cc5ChainSize,
            ...(CC5_CLData.otherChainSize && { otherChainSize: CC5_CLData.otherChainSize }),
            industrialChainManufacturer: CC5_CLData.industrialChainManufacturer,
            ...(CC5_CLData.otherChainManufacturer && { otherChainManufacturer: CC5_CLData.otherChainManufacturer }),
            conveyorLength: CC5_CLData.conveyorLength,
            conveyorLengthUnit: CC5_CLData.conveyorLengthUnit,
            conveyorSpeed: CC5_CLData.conveyorSpeed,
            conveyorSpeedUnit: CC5_CLData.conveyorSpeedUnit,
            ...(CC5_CLData.conveyorIndex && { conveyorIndex: CC5_CLData.conveyorIndex }),
            ...(CC5_CLData.travelDirection && { travelDirection: CC5_CLData.travelDirection }),
            appEnviroment: CC5_CLData.appEnviroment,
            ...(CC5_CLData.otherAppEnviroment && { otherAppEnviroment: CC5_CLData.otherAppEnviroment }),
            ...(CC5_CLData.ovenStatus && { ovenStatus: CC5_CLData.ovenStatus }),
            ...(CC5_CLData.ovenTemp && { ovenTemp: CC5_CLData.ovenTemp }),
            ...(CC5_CLData.surroundingTemp && { surroundingTemp: CC5_CLData.surroundingTemp }),
            strandStatus: CC5_CLData.strandStatus,
            ...(CC5_CLData.plantLayout && { plantLayout: CC5_CLData.plantLayout }),
            ...(CC5_CLData.requiredPics && { requiredPics: CC5_CLData.requiredPics }),
            operatingVoltage: CC5_CLData.operatingVoltage,
            existingMonitor: CC5_CLData.existingMonitor,
            newMonitor: CC5_CLData.newMonitor,
            monitorData: {
                ...(CC5_CLData.templateA.dcuStatus && { dcuStatus: CC5_CLData.templateA.dcuStatus }),
                ...(CC5_CLData.templateA.dcuNum && { dcuNum: CC5_CLData.templateA.dcuNum }),
                ...(CC5_CLData.templateA.existingWindows && { existingWindows: CC5_CLData.templateA.existingWindows }),
                ...(CC5_CLData.templateA.existingHeadUnit && { existingHeadUnit: CC5_CLData.templateA.existingHeadUnit }),
                ...(CC5_CLData.templateA.existingDCU && { existingDCU: CC5_CLData.templateA.existingDCU }),
                ...(CC5_CLData.templateA.existingPowerInterface && { existingPowerInterface: CC5_CLData.templateA.existingPowerInterface }),
                ...(CC5_CLData.templateA.newReservoir && { newReservoir: CC5_CLData.templateA.newReservoir }),
                ...(CC5_CLData.templateA.reservoirSize && { reservoirSize: CC5_CLData.templateA.reservoirSize }),
                ...(CC5_CLData.templateA.otherReservoirSize && { otherReservoirSize: CC5_CLData.templateA.otherReservoirSize }),
                ...(CC5_CLData.templateA.newReservoirNum && { newReservoirNum: CC5_CLData.templateA.newReservoirNum }),
                ...(CC5_CLData.templateA.typeMonitor && { typeMonitor: CC5_CLData.templateA.typeMonitor }),
                ...(CC5_CLData.templateA.driveMotorAmp && { driveMotorAmp: CC5_CLData.templateA.driveMotorAmp }),
                ...(CC5_CLData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CC5_CLData.templateA.driveMotorAmpNum }),
                ...(CC5_CLData.templateA.driveTakeUpAir && { driveTakeUpAir: CC5_CLData.templateA.driveTakeUpAir }),
                ...(CC5_CLData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_CLData.templateA.driveTakeUpAirNum }),
                ...(CC5_CLData.templateA.takeUpDistance && { takeUpDistance: CC5_CLData.templateA.takeUpDistance }),
                ...(CC5_CLData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CC5_CLData.templateA.takeUpDistanceNum }),
                ...(CC5_CLData.templateA.driveTemp && { driveTemp: CC5_CLData.templateA.driveTemp }),
                ...(CC5_CLData.templateA.driveTempNum && { driveTempNum: CC5_CLData.templateA.driveTempNum }),
                ...(CC5_CLData.templateA.driveVibration && { driveVibration: CC5_CLData.templateA.driveVibration }),
                ...(CC5_CLData.templateA.driveVibrationNum && { driveVibrationNum: CC5_CLData.templateA.driveVibrationNum }),
                ...(CC5_CLData.templateA.dogPitch && { dogPitch: CC5_CLData.templateA.dogPitch }),
                ...(CC5_CLData.templateA.dogPitchNum && { dogPitchNum: CC5_CLData.templateA.dogPitchNum }),
                ...(CC5_CLData.templateA.paintMarker && { paintMarker: CC5_CLData.templateA.paintMarker }),
                ...(CC5_CLData.templateA.paintMarkerNum && { paintMarkerNum: CC5_CLData.templateA.paintMarkerNum }),
                ...(CC5_CLData.templateA.chainVision && { chainVision: CC5_CLData.templateA.chainVision }),
                ...(CC5_CLData.templateA.lubeVision && { lubeVision: CC5_CLData.templateA.lubeVision }),
                ...(CC5_CLData.templateA.trolleyVision && { trolleyVision: CC5_CLData.templateA.trolleyVision }),
                ...(CC5_CLData.templateA.trolleyDetect && { trolleyDetect: CC5_CLData.templateA.trolleyDetect }),
                ...(CC5_CLData.templateA.omniView && { omniView: CC5_CLData.templateA.omniView }),
                ...(CC5_CLData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CC5_CLData.templateA.dcuUpgradeNum }),
                ...(CC5_CLData.templateA.itNameOne && { itNameOne: CC5_CLData.templateA.itNameOne }),
                ...(CC5_CLData.templateA.itIPOne && { itIPOne: CC5_CLData.templateA.itIPOne }),
                ...(CC5_CLData.templateA.itGatewayOne && { itGatewayOne: CC5_CLData.templateA.itGatewayOne }),
                ...(CC5_CLData.templateA.itSubnetOne && { itSubnetOne: CC5_CLData.templateA.itSubnetOne }),
                ...(CC5_CLData.templateA.itDNSOne && { itDNSOne: CC5_CLData.templateA.itDNSOne }),
                ...(CC5_CLData.templateA.itSMTPOne && { itSMTPOne: CC5_CLData.templateA.itSMTPOne }),
                ...(CC5_CLData.templateA.itNameTwo && { itNameTwo: CC5_CLData.templateA.itNameTwo }),
                ...(CC5_CLData.templateA.itIPTwo && { itIPTwo: CC5_CLData.templateA.itIPTwo }),
                ...(CC5_CLData.templateA.itGatewayTwo && { itGatewayTwo: CC5_CLData.templateA.itGatewayTwo }),
                ...(CC5_CLData.templateA.itSubnetTwo && { itSubnetTwo: CC5_CLData.templateA.itSubnetTwo }),
                ...(CC5_CLData.templateA.itDNSTwo && { itDNSTwo: CC5_CLData.templateA.itDNSTwo }),
                ...(CC5_CLData.templateA.itSMTPTwo && { itSMTPTwo: CC5_CLData.templateA.itSMTPTwo }),
                ...(CC5_CLData.templateA.itNameThree && { itNameThree: CC5_CLData.templateA.itNameThree }),
                ...(CC5_CLData.templateA.itIPThree && { itIPThree: CC5_CLData.templateA.itIPThree }),
                ...(CC5_CLData.templateA.itGatewayThree && { itGatewayThree: CC5_CLData.templateA.itGatewayThree }),
                ...(CC5_CLData.templateA.itSubnetThree && { itSubnetThree: CC5_CLData.templateA.itSubnetThree }),
                ...(CC5_CLData.templateA.itDNSThree && { itDNSThree: CC5_CLData.templateA.itDNSThree }),
                ...(CC5_CLData.templateA.itSMTPThree && { itSMTPThree: CC5_CLData.templateA.itSMTPThree }),
                ...(CC5_CLData.templateA.itAdditionalNotes && { itAdditionalNotes: CC5_CLData.templateA.itAdditionalNotes }),
                ...(CC5_CLData.templateA.piuDistance && { piuDistance: CC5_CLData.templateA.piuDistance }),
                ...(CC5_CLData.templateA.switchDistance && { switchDistance: CC5_CLData.templateA.switchDistance }),
                ...(CC5_CLData.templateA.ampPickup && { ampPickup: CC5_CLData.templateA.ampPickup }),
                ...(CC5_CLData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_CLData.templateA.fromAirTakeUpDistance }),
                ...(CC5_CLData.templateA.specialControllerOptions && { specialControllerOptions: CC5_CLData.templateA.specialControllerOptions }),
                ...(CC5_CLData.templateA.operatingVoltage && { operatingVoltage: CC5_CLData.templateA.operatingVoltage })

            },
            outboardStatus: CC5_CLData.outboardStatus,
            highRollerStatus: CC5_CLData.highRollerStatus,
            ...(CC5_CLData.lubeBrand && { lubeBrand: CC5_CLData.lubeBrand }),
            ...(CC5_CLData.lubeType && { lubeType: CC5_CLData.lubeType }),
            ...(CC5_CLData.lubeViscosity && { lubeViscosity: CC5_CLData.lubeViscosity }),
            ...(CC5_CLData.cleanChain && { cleanChain: CC5_CLData.cleanChain }),
            ...(CC5_CLData.wireMeasurementUnit && { wireMeasurementUnit: CC5_CLData.wireMeasurementUnit }),
            ...(CC5_CLData.conductor2 && { conductor2: CC5_CLData.conductor2 }),
            ...(CC5_CLData.conductor4 && { conductor4: CC5_CLData.conductor4 }),
            ...(CC5_CLData.conductor7 && { conductor7: CC5_CLData.conductor7 }),
            ...(CC5_CLData.conductor12 && { conductor12: CC5_CLData.conductor12 }),
            ...(CC5_CLData.junctionBoxNum && { junctionBoxNum: CC5_CLData.junctionBoxNum }),
            ...(CC5_CLData.cc5UnitType && { cc5UnitType: CC5_CLData.cc5UnitType }),
            ...(CC5_CLData.powerRailWidth && { powerRailWidth: CC5_CLData.powerRailWidth }),
            ...(CC5_CLData.powerRailHeight && { powerRailHeight: CC5_CLData.powerRailHeight }),
            ...(CC5_CLData.rollerWheelA1 && { rollerWheelA1: CC5_CLData.rollerWheelA1 }),
            ...(CC5_CLData.rollerWheelB1 && { rollerWheelB1: CC5_CLData.rollerWheelB1 }),
            ...(CC5_CLData.linkD1 && { linkD1: CC5_CLData.linkD1 }),
            ...(CC5_CLData.wheelPitchM1 && { wheelPitchM1: CC5_CLData.wheelPitchM1 }),
            ...(CC5_CLData.rollerPinY1 && { rollerPinY1: CC5_CLData.rollerPinY1 }),
            ...(CC5_CLData.rollerPinZ1 && { rollerPinZ1: CC5_CLData.rollerPinZ1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "CC5_CL" });
        await req.user.save();

        return res.status(200).json({ message: "CC5_CL entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;