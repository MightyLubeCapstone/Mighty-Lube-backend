const express = require("express");
const { authenticate } = require("./sessions");
const FGLM = require("../models/FGLM");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    // used for FGLM form
    try {
        const { fglmData, numRequested } = req.body;
        const order = new FGLM({
            conveyorName: fglmData.conveyorName,
            chainSize: fglmData.chainSizeType,
            chainManufacturerType: fglmData.chainManufacturerType,
            chainPinType: fglmData.chainPinType,
            conveyorLength: fglmData.conveyorLength,
            conveyorLengthUnit: fglmData.conveyorLengthUnit,
            conveyorSpeed: fglmData.conveyorSpeed,
            conveyorSpeedUnit: fglmData.conveyorSpeedUnit,
            conveyorIndex: fglmData.conveyorIndex,
            travelDirection: fglmData.travelDirection,
            metalType: fglmData.metalType,
            conveyorStyle: fglmData.conveyorStyle,
            trolleyColor: fglmData.trolleyColor,
            trolleyType: fglmData.trolleyType,
            surroundingTemp: fglmData.surroundingTemp,
            conveyorLoaded: fglmData.conveyorLoaded,
            conveyorSwing: fglmData.conveyorSwing,
            plantLayout: fglmData.plantLayout,
            requiredPics: fglmData.requiredPics,
            operatingVoltage: fglmData.operatingVoltage,
            monitorData: new templateB({
                existingMonitor: fglmData.templateB.existingMonitor,
                newMonitor: fglmData.templateB.newMonitor,
                ...(fglmData.templateB.dcuStatus && { dcuStatus: fglmData.templateB.dcuStatus }),
                ...(fglmData.templateB.dcuNum && { dcuNum: fglmData.templateB.dcuNum }),
                ...(fglmData.templateB.existingWindows && { existingWindows: fglmData.templateB.existingWindows }),
                ...(fglmData.templateB.existingHeadUnit && { existingHeadUnit: fglmData.templateB.existingHeadUnit }),
                ...(fglmData.templateB.existingDCU && { existingDCU: fglmData.templateB.existingDCU }),
                ...(fglmData.templateB.existingPowerInterface && { existingPowerInterface: fglmData.templateB.existingPowerInterface }),
                ...(fglmData.templateB.newReservoir && { newReservoir: fglmData.templateB.newReservoir }),
                ...(fglmData.templateB.reservoirSize && { reservoirSize: fglmData.templateB.reservoirSize }),
                ...(fglmData.templateB.otherReservoirSize && { otherReservoirSize: fglmData.templateB.otherReservoirSize }),
                ...(fglmData.templateB.newReservoirNum && { newReservoirNum: fglmData.templateB.newReservoirNum }),
                ...(fglmData.templateB.typeMonitor && { typeMonitor: fglmData.templateB.typeMonitor }),
                ...(fglmData.templateB.driveMotorAmp && { driveMotorAmp: fglmData.templateB.driveMotorAmp }),
                ...(fglmData.templateB.driveMotorAmpNum && { driveMotorAmpNum: fglmData.templateB.driveMotorAmpNum }),
                ...(fglmData.templateB.driveTakeUpAir && { driveTakeUpAir: fglmData.templateB.driveTakeUpAir }),
                ...(fglmData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: fglmData.templateB.driveTakeUpAirNum }),
                ...(fglmData.templateB.takeUpDistance && { takeUpDistance: fglmData.templateB.takeUpDistance }),
                ...(fglmData.templateB.takeUpDistanceNum && { takeUpDistanceNum: fglmData.templateB.takeUpDistanceNum }),
                ...(fglmData.templateB.driveTemp && { driveTemp: fglmData.templateB.driveTemp }),
                ...(fglmData.templateB.driveTempNum && { driveTempNum: fglmData.templateB.driveTempNum }),
                ...(fglmData.templateB.driveVibration && { driveVibration: fglmData.templateB.driveVibration }),
                ...(fglmData.templateB.driveVibrationNum && { driveVibrationNum: fglmData.templateB.driveVibrationNum }),
                ...(fglmData.templateB.dogPitch && { dogPitch: fglmData.templateB.dogPitch }),
                ...(fglmData.templateB.dogPitchNum && { dogPitchNum: fglmData.templateB.dogPitchNum }),
                ...(fglmData.templateB.paintMarker && { paintMarker: fglmData.templateB.paintMarker }),
                ...(fglmData.templateB.paintMarkerNum && { paintMarkerNum: fglmData.templateB.paintMarkerNum }),
                ...(fglmData.templateB.chainVision && { chainVision: fglmData.templateB.chainVision }),
                ...(fglmData.templateB.lubeVision && { lubeVision: fglmData.templateB.lubeVision }),
                ...(fglmData.templateB.trolleyVision && { trolleyVision: fglmData.templateB.trolleyVision }),
                ...(fglmData.templateB.trolleyDetect && { trolleyDetect: fglmData.templateB.trolleyDetect }),
                ...(fglmData.templateB.omniView && { omniView: fglmData.templateB.omniView }),
                ...(fglmData.templateB.dcuUpgradeNum && { dcuUpgradeNum: fglmData.templateB.dcuUpgradeNum }),
                ...(fglmData.templateB.itNameOne && { itNameOne: fglmData.templateB.itNameOne }),
                ...(fglmData.templateB.itIPOne && { itIPOne: fglmData.templateB.itIPOne }),
                ...(fglmData.templateB.itGatewayOne && { itGatewayOne: fglmData.templateB.itGatewayOne }),
                ...(fglmData.templateB.itSubnetOne && { itSubnetOne: fglmData.templateB.itSubnetOne }),
                ...(fglmData.templateB.itDNSOne && { itDNSOne: fglmData.templateB.itDNSOne }),
                ...(fglmData.templateB.itSMTPOne && { itSMTPOne: fglmData.templateB.itSMTPOne }),
                ...(fglmData.templateB.itNameTwo && { itNameTwo: fglmData.templateB.itNameTwo }),
                ...(fglmData.templateB.itIPTwo && { itIPTwo: fglmData.templateB.itIPTwo }),
                ...(fglmData.templateB.itGatewayTwo && { itGatewayTwo: fglmData.templateB.itGatewayTwo }),
                ...(fglmData.templateB.itSubnetTwo && { itSubnetTwo: fglmData.templateB.itSubnetTwo }),
                ...(fglmData.templateB.itDNSTwo && { itDNSTwo: fglmData.templateB.itDNSTwo }),
                ...(fglmData.templateB.itSMTPTwo && { itSMTPTwo: fglmData.templateB.itSMTPTwo }),
                ...(fglmData.templateB.itNameThree && { itNameThree: fglmData.templateB.itNameThree }),
                ...(fglmData.templateB.itIPThree && { itIPThree: fglmData.templateB.itIPThree }),
                ...(fglmData.templateB.itGatewayThree && { itGatewayThree: fglmData.templateB.itGatewayThree }),
                ...(fglmData.templateB.itSubnetThree && { itSubnetThree: fglmData.templateB.itSubnetThree }),
                ...(fglmData.templateB.itDNSThree && { itDNSThree: fglmData.templateB.itDNSThree }),
                ...(fglmData.templateB.itSMTPThree && { itSMTPThree: fglmData.templateB.itSMTPThree }),
                ...(fglmData.templateB.itAdditionalNotes && { itAdditionalNotes: fglmData.templateB.itAdditionalNotes }),
                ...(fglmData.templateB.piuDistance && { piuDistance: fglmData.templateB.piuDistance }),
                ...(fglmData.templateB.switchDistance && { switchDistance: fglmData.templateB.switchDistance }),
                ...(fglmData.templateB.ampPickup && { ampPickup: fglmData.templateB.ampPickup }),
                ...(fglmData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: fglmData.templateB.fromAirTakeUpDistance }),
                ...(fglmData.templateB.specialControllerOptions && { specialControllerOptions: fglmData.templateB.specialControllerOptions })
            }),
            sideLube: fglmData.sideLube,
            topLube: fglmData.topLube,
            cleanChain: fglmData.cleanChain,
            wireMeasurementUnit: fglmData.wireMeasurementUnit,
            conductor4: fglmData.conductor4,
            conductor7: fglmData.conductor7,
            conductor2: fglmData.conductor2
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FGLM" });
        await req.user.save();

        return res.status(200).json({ message: "FGLM entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;