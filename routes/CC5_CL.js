const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CC5_CL = require("../models/CC5_CL");
const templateB = require("../models/templateB");

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
            ...(CC5_CLData.ovenStatus && { ovenStatus: CC5_CLData.ovenStatus }),
            ...(CC5_CLData.ovenTemp && { ovenTemp: CC5_CLData.ovenTemp }),
            ...(CC5_CLData.surroundingTemp && { surroundingTemp: CC5_CLData.surroundingTemp }),
            strandStatus: CC5_CLData.strandStatus,
            ...(CC5_CLData.plantLayout && { plantLayout: CC5_CLData.plantLayout }),
            ...(CC5_CLData.requiredPics && { requiredPics: CC5_CLData.requiredPics }),
            operatingVoltage: CC5_CLData.operatingVoltage,
            monitorData: new templateB({
                existingMonitor: CC5_CLData.templateB.existingMonitor,
                //newMonitor: CC5_CLData.templateB.newMonitor,
                ...(CC5_CLData.templateB.dcuStatus && { dcuStatus: CC5_CLData.templateB.dcuStatus }),
                ...(CC5_CLData.templateB.dcuNum && { dcuNum: CC5_CLData.templateB.dcuNum }),
                ...(CC5_CLData.templateB.existingWindows && { existingWindows: CC5_CLData.templateB.existingWindows }),
                ...(CC5_CLData.templateB.existingHeadUnit && { existingHeadUnit: CC5_CLData.templateB.existingHeadUnit }),
                ...(CC5_CLData.templateB.existingDCU && { existingDCU: CC5_CLData.templateB.existingDCU }),
                ...(CC5_CLData.templateB.existingPowerInterface && { existingPowerInterface: CC5_CLData.templateB.existingPowerInterface }),
                ...(CC5_CLData.templateB.newReservoir && { newReservoir: CC5_CLData.templateB.newReservoir }),
                ...(CC5_CLData.templateB.reservoirSize && { reservoirSize: CC5_CLData.templateB.reservoirSize }),
                ...(CC5_CLData.templateB.otherReservoirSize && { otherReservoirSize: CC5_CLData.templateB.otherReservoirSize }),
                ...(CC5_CLData.templateB.newReservoirNum && { newReservoirNum: CC5_CLData.templateB.newReservoirNum }),
                ...(CC5_CLData.templateB.typeMonitor && { typeMonitor: CC5_CLData.templateB.typeMonitor }),
                ...(CC5_CLData.templateB.driveMotorAmp && { driveMotorAmp: CC5_CLData.templateB.driveMotorAmp }),
                ...(CC5_CLData.templateB.driveMotorAmpNum && { driveMotorAmpNum: CC5_CLData.templateB.driveMotorAmpNum }),
                ...(CC5_CLData.templateB.driveTakeUpAir && { driveTakeUpAir: CC5_CLData.templateB.driveTakeUpAir }),
                ...(CC5_CLData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_CLData.templateB.driveTakeUpAirNum }),
                ...(CC5_CLData.templateB.takeUpDistance && { takeUpDistance: CC5_CLData.templateB.takeUpDistance }),
                ...(CC5_CLData.templateB.takeUpDistanceNum && { takeUpDistanceNum: CC5_CLData.templateB.takeUpDistanceNum }),
                ...(CC5_CLData.templateB.driveTemp && { driveTemp: CC5_CLData.templateB.driveTemp }),
                ...(CC5_CLData.templateB.driveTempNum && { driveTempNum: CC5_CLData.templateB.driveTempNum }),
                ...(CC5_CLData.templateB.driveVibration && { driveVibration: CC5_CLData.templateB.driveVibration }),
                ...(CC5_CLData.templateB.driveVibrationNum && { driveVibrationNum: CC5_CLData.templateB.driveVibrationNum }),
                ...(CC5_CLData.templateB.dogPitch && { dogPitch: CC5_CLData.templateB.dogPitch }),
                ...(CC5_CLData.templateB.dogPitchNum && { dogPitchNum: CC5_CLData.templateB.dogPitchNum }),
                ...(CC5_CLData.templateB.paintMarker && { paintMarker: CC5_CLData.templateB.paintMarker }),
                ...(CC5_CLData.templateB.paintMarkerNum && { paintMarkerNum: CC5_CLData.templateB.paintMarkerNum }),
                ...(CC5_CLData.templateB.chainVision && { chainVision: CC5_CLData.templateB.chainVision }),
                ...(CC5_CLData.templateB.lubeVision && { lubeVision: CC5_CLData.templateB.lubeVision }),
                ...(CC5_CLData.templateB.trolleyVision && { trolleyVision: CC5_CLData.templateB.trolleyVision }),
                ...(CC5_CLData.templateB.trolleyDetect && { trolleyDetect: CC5_CLData.templateB.trolleyDetect }),
                ...(CC5_CLData.templateB.omniView && { omniView: CC5_CLData.templateB.omniView }),
                ...(CC5_CLData.templateB.dcuUpgradeNum && { dcuUpgradeNum: CC5_CLData.templateB.dcuUpgradeNum }),
                ...(CC5_CLData.templateB.itNameOne && { itNameOne: CC5_CLData.templateB.itNameOne }),
                ...(CC5_CLData.templateB.itIPOne && { itIPOne: CC5_CLData.templateB.itIPOne }),
                ...(CC5_CLData.templateB.itGatewayOne && { itGatewayOne: CC5_CLData.templateB.itGatewayOne }),
                ...(CC5_CLData.templateB.itSubnetOne && { itSubnetOne: CC5_CLData.templateB.itSubnetOne }),
                ...(CC5_CLData.templateB.itDNSOne && { itDNSOne: CC5_CLData.templateB.itDNSOne }),
                ...(CC5_CLData.templateB.itSMTPOne && { itSMTPOne: CC5_CLData.templateB.itSMTPOne }),
                ...(CC5_CLData.templateB.itNameTwo && { itNameTwo: CC5_CLData.templateB.itNameTwo }),
                ...(CC5_CLData.templateB.itIPTwo && { itIPTwo: CC5_CLData.templateB.itIPTwo }),
                ...(CC5_CLData.templateB.itGatewayTwo && { itGatewayTwo: CC5_CLData.templateB.itGatewayTwo }),
                ...(CC5_CLData.templateB.itSubnetTwo && { itSubnetTwo: CC5_CLData.templateB.itSubnetTwo }),
                ...(CC5_CLData.templateB.itDNSTwo && { itDNSTwo: CC5_CLData.templateB.itDNSTwo }),
                ...(CC5_CLData.templateB.itSMTPTwo && { itSMTPTwo: CC5_CLData.templateB.itSMTPTwo }),
                ...(CC5_CLData.templateB.itNameThree && { itNameThree: CC5_CLData.templateB.itNameThree }),
                ...(CC5_CLData.templateB.itIPThree && { itIPThree: CC5_CLData.templateB.itIPThree }),
                ...(CC5_CLData.templateB.itGatewayThree && { itGatewayThree: CC5_CLData.templateB.itGatewayThree }),
                ...(CC5_CLData.templateB.itSubnetThree && { itSubnetThree: CC5_CLData.templateB.itSubnetThree }),
                ...(CC5_CLData.templateB.itDNSThree && { itDNSThree: CC5_CLData.templateB.itDNSThree }),
                ...(CC5_CLData.templateB.itSMTPThree && { itSMTPThree: CC5_CLData.templateB.itSMTPThree }),
                ...(CC5_CLData.templateB.itAdditionalNotes && { itAdditionalNotes: CC5_CLData.templateB.itAdditionalNotes }),
                ...(CC5_CLData.templateB.piuDistance && { piuDistance: CC5_CLData.templateB.piuDistance }),
                ...(CC5_CLData.templateB.switchDistance && { switchDistance: CC5_CLData.templateB.switchDistance }),
                ...(CC5_CLData.templateB.ampPickup && { ampPickup: CC5_CLData.templateB.ampPickup }),
                ...(CC5_CLData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_CLData.templateB.fromAirTakeUpDistance }),
                ...(CC5_CLData.templateB.specialControllerOptions && { specialControllerOptions: CC5_CLData.templateB.specialControllerOptions })
            }),
            highRollerStatus: CC5_CLData.highRollerStatus,
            outboardStatus: CC5_CLData.outboardStatus,
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