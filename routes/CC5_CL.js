const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CC5_CL = require("../models/CC5_CL");

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
            existingMonitor: CC5_CLData.existingMonitor,
            // Ensure 'Connecting to an existing monitor' and 'New Monitor' are not both selected
            newMonitor: CC5_CLData.newMonitor,
            ...(CC5_CLData.dcuStatus && { dcuStatus: CC5_CLData.dcuStatus }),
            ...(CC5_CLData.dcuNum && { dcuNum: CC5_CLData.dcuNum }),
            ...(CC5_CLData.existingWindows && { existingWindows: CC5_CLData.existingWindows }),
            ...(CC5_CLData.existingHeadUnit && { existingHeadUnit: CC5_CLData.existingHeadUnit }),
            ...(CC5_CLData.existingDCU && { existingDCU: CC5_CLData.existingDCU }),
            ...(CC5_CLData.existingPowerInterface && { existingPowerInterface: CC5_CLData.existingPowerInterface }),
            ...(CC5_CLData.newReservoir && { newReservoir: CC5_CLData.newReservoir }),
            ...(CC5_CLData.reservoirSize && { reservoirSize: CC5_CLData.reservoirSize }),
            ...(CC5_CLData.otherReservoirSize && { otherReservoirSize: CC5_CLData.otherReservoirSize }),
            ...(CC5_CLData.newReservoirNum && { newReservoirNum: CC5_CLData.newReservoirNum }),
            ...(CC5_CLData.typeMonitor && { typeMonitor: CC5_CLData.typeMonitor }),
            ...(CC5_CLData.driveMotorAmp && { driveMotorAmp: CC5_CLData.driveMotorAmp }),
            ...(CC5_CLData.driveMotorAmpNum && { driveMotorAmpNum: CC5_CLData.driveMotorAmpNum }),
            ...(CC5_CLData.driveTakeUpAir && { driveTakeUpAir: CC5_CLData.driveTakeUpAir }),
            ...(CC5_CLData.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_CLData.driveTakeUpAirNum }),
            ...(CC5_CLData.takeUpDistance && { takeUpDistance: CC5_CLData.takeUpDistance }),
            ...(CC5_CLData.takeUpDistanceNum && { takeUpDistanceNum: CC5_CLData.takeUpDistanceNum }),
            ...(CC5_CLData.driveTemp && { driveTemp: CC5_CLData.driveTemp }),
            ...(CC5_CLData.driveTempNum && { driveTempNum: CC5_CLData.driveTempNum }),
            ...(CC5_CLData.driveVibration && { driveVibration: CC5_CLData.driveVibration }),
            ...(CC5_CLData.driveVibrationNum && { driveVibrationNum: CC5_CLData.driveVibrationNum }),
            ...(CC5_CLData.dogPitch && { dogPitch: CC5_CLData.dogPitch }),
            ...(CC5_CLData.dogPitchNum && { dogPitchNum: CC5_CLData.dogPitchNum }),
            ...(CC5_CLData.paintMarker && { paintMarker: CC5_CLData.paintMarker }),
            ...(CC5_CLData.paintMarkerNum && { paintMarkerNum: CC5_CLData.paintMarkerNum }),
            ...(CC5_CLData.chainVision && { chainVision: CC5_CLData.chainVision }),
            ...(CC5_CLData.lubeVision && { lubeVision: CC5_CLData.lubeVision }),
            ...(CC5_CLData.trolleyVision && { trolleyVision: CC5_CLData.trolleyVision }),
            ...(CC5_CLData.trolleyDetect && { trolleyDetect: CC5_CLData.trolleyDetect }),
            ...(CC5_CLData.omniView && { omniView: CC5_CLData.omniView }),
            ...(CC5_CLData.dcuUpgradeNum && { dcuUpgradeNum: CC5_CLData.dcuUpgradeNum }),
            ...(CC5_CLData.itNameOne && { itNameOne: CC5_CLData.itNameOne }),
            ...(CC5_CLData.itIPOne && { itIPOne: CC5_CLData.itIPOne }),
            ...(CC5_CLData.itGatewayOne && { itGatewayOne: CC5_CLData.itGatewayOne }),
            ...(CC5_CLData.itSubnetOne && { itSubnetOne: CC5_CLData.itSubnetOne }),
            ...(CC5_CLData.itDNSOne && { itDNSOne: CC5_CLData.itDNSOne }),
            ...(CC5_CLData.itSMTPOne && { itSMTPOne: CC5_CLData.itSMTPOne }),
            ...(CC5_CLData.itNameTwo && { itNameTwo: CC5_CLData.itNameTwo }),
            ...(CC5_CLData.itIPTwo && { itIPTwo: CC5_CLData.itIPTwo }),
            ...(CC5_CLData.itGatewayTwo && { itGatewayTwo: CC5_CLData.itGatewayTwo }),
            ...(CC5_CLData.itSubnetTwo && { itSubnetTwo: CC5_CLData.itSubnetTwo }),
            ...(CC5_CLData.itDNSTwo && { itDNSTwo: CC5_CLData.itDNSTwo }),
            ...(CC5_CLData.itSMTPTwo && { itSMTPTwo: CC5_CLData.itSMTPTwo }),
            ...(CC5_CLData.itNameThree && { itNameThree: CC5_CLData.itNameThree }),
            ...(CC5_CLData.itIPThree && { itIPThree: CC5_CLData.itIPThree }),
            ...(CC5_CLData.itGatewayThree && { itGatewayThree: CC5_CLData.itGatewayThree }),
            ...(CC5_CLData.itSubnetThree && { itSubnetThree: CC5_CLData.itSubnetThree }),
            ...(CC5_CLData.itDNSThree && { itDNSThree: CC5_CLData.itDNSThree }),
            ...(CC5_CLData.itSMTPThree && { itSMTPThree: CC5_CLData.itSMTPThree }),
            ...(CC5_CLData.itAdditionalNotes && { itAdditionalNotes: CC5_CLData.itAdditionalNotes }),
            ...(CC5_CLData.piuDistance && { piuDistance: CC5_CLData.piuDistance }),
            ...(CC5_CLData.switchDistance && { switchDistance: CC5_CLData.switchDistance }),
            ...(CC5_CLData.ampPickup && { ampPickup: CC5_CLData.ampPickup }),
            ...(CC5_CLData.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_CLData.fromAirTakeUpDistance }),
            ...(CC5_CLData.specialControllerOptions && { specialControllerOptions: CC5_CLData.specialControllerOptions }),
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
        req.user.orders.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "CC5_CL" });
        await req.user.save();

        return res.status(200).json({ message: "CC5_CL entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;