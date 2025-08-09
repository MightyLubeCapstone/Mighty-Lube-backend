const express = require("express");
const { authenticate } = require("./sessions");
const FGLM = require("../models/fglm");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    // used for FGLM form
    try {
        const { fglmData, numRequested } = req.body;
        const order = new FGLM({
            conveyorName: fglmData.conveyorName,
            chainSize: fglmData.chainSizeType,
            ...(fglmData.otherChainSize && { otherChainSize: fglmData.otherChainSize }),
            chainManufacturerType: fglmData.chainManufacturerType,
            ...(fglmData.otherChainManufacturer && { otherChainManufacturer: fglmData.otherChainManufacturer }),
            chainPinType: fglmData.chainPinType,
            wheelManufacturer: fglmData.wheelManufacturer,
            ...(fglmData.otherWheelManufacturer && { otherWheelManufacturer: fglmData.otherWheelManufacturer }),
            chainPinType: fglmData.chainPinType,
            conveyorLength: fglmData.conveyorLength,
            conveyorLengthUnit: fglmData.conveyorLengthUnit,
            conveyorSpeed: fglmData.conveyorSpeed,
            conveyorSpeedUnit: fglmData.conveyorSpeedUnit,
            conveyorIndex: fglmData.conveyorIndex,
            travelDirection: fglmData.travelDirection,
            metalType: fglmData.metalType,
            ...(fglmData.metalType && { metalType: fglmData.metalType }),
            conveyorStyle: fglmData.conveyorStyle,
            ...(fglmData.otherConveyorStyle && { otherConveyorStyle: fglmData.otherConveyorStyle }),
            trolleyColor: fglmData.trolleyColor,
            ...(fglmData.otherTrolleyColor && { otherTrolleyColor: fglmData.otherTrolleyColor }),
            trolleyType: fglmData.trolleyType,
            surroundingTemp: fglmData.surroundingTemp,
            conveyorLoaded: fglmData.conveyorLoaded,
            conveyorSwing: fglmData.conveyorSwing,
            plantLayout: fglmData.plantLayout,
            requiredPics: fglmData.requiredPics,
            operatingVoltage: fglmData.operatingVoltage,
            existingMonitor: fglmData.existingMonitor,
            newMonitor: fglmData.newMonitor,
            monitorData: {
                ...(fglmData.dcuStatus && { dcuStatus: fglmData.dcuStatus }),
                ...(fglmData.dcuNum && { dcuNum: fglmData.dcuNum }),
                ...(fglmData.existingWindows && { existingWindows: fglmData.existingWindows }),
                ...(fglmData.existingHeadUnit && { existingHeadUnit: fglmData.existingHeadUnit }),
                ...(fglmData.existingDCU && { existingDCU: fglmData.existingDCU }),
                ...(fglmData.existingPowerInterface && { existingPowerInterface: fglmData.existingPowerInterface }),
                ...(fglmData.newReservoir && { newReservoir: fglmData.newReservoir }),
                ...(fglmData.reservoirSize && { reservoirSize: fglmData.reservoirSize }),
                ...(fglmData.otherReservoirSize && { otherReservoirSize: fglmData.otherReservoirSize }),
                ...(fglmData.newReservoirNum && { newReservoirNum: fglmData.newReservoirNum }),
                ...(fglmData.typeMonitor && { typeMonitor: fglmData.typeMonitor }),
                ...(fglmData.driveMotorAmp && { driveMotorAmp: fglmData.driveMotorAmp }),
                ...(fglmData.driveMotorAmpNum && { driveMotorAmpNum: fglmData.driveMotorAmpNum }),
                ...(fglmData.driveTakeUpAir && { driveTakeUpAir: fglmData.driveTakeUpAir }),
                ...(fglmData.driveTakeUpAirNum && { driveTakeUpAirNum: fglmData.driveTakeUpAirNum }),
                ...(fglmData.takeUpDistance && { takeUpDistance: fglmData.takeUpDistance }),
                ...(fglmData.takeUpDistanceNum && { takeUpDistanceNum: fglmData.takeUpDistanceNum }),
                ...(fglmData.driveTemp && { driveTemp: fglmData.driveTemp }),
                ...(fglmData.driveTempNum && { driveTempNum: fglmData.driveTempNum }),
                ...(fglmData.driveVibration && { driveVibration: fglmData.driveVibration }),
                ...(fglmData.driveVibrationNum && { driveVibrationNum: fglmData.driveVibrationNum }),
                ...(fglmData.dogPitch && { dogPitch: fglmData.dogPitch }),
                ...(fglmData.dogPitchNum && { dogPitchNum: fglmData.dogPitchNum }),
                ...(fglmData.paintMarker && { paintMarker: fglmData.paintMarker }),
                ...(fglmData.paintMarkerNum && { paintMarkerNum: fglmData.paintMarkerNum }),
                ...(fglmData.chainVision && { chainVision: fglmData.chainVision }),
                ...(fglmData.lubeVision && { lubeVision: fglmData.lubeVision }),
                ...(fglmData.trolleyVision && { trolleyVision: fglmData.trolleyVision }),
                ...(fglmData.trolleyDetect && { trolleyDetect: fglmData.trolleyDetect }),
                ...(fglmData.omniView && { omniView: fglmData.omniView }),
                ...(fglmData.dcuUpgradeNum && { dcuUpgradeNum: fglmData.dcuUpgradeNum }),
                ...(fglmData.itNameOne && { itNameOne: fglmData.itNameOne }),
                ...(fglmData.itIPOne && { itIPOne: fglmData.itIPOne }),
                ...(fglmData.itGatewayOne && { itGatewayOne: fglmData.itGatewayOne }),
                ...(fglmData.itSubnetOne && { itSubnetOne: fglmData.itSubnetOne }),
                ...(fglmData.itDNSOne && { itDNSOne: fglmData.itDNSOne }),
                ...(fglmData.itSMTPOne && { itSMTPOne: fglmData.itSMTPOne }),
                ...(fglmData.itNameTwo && { itNameTwo: fglmData.itNameTwo }),
                ...(fglmData.itIPTwo && { itIPTwo: fglmData.itIPTwo }),
                ...(fglmData.itGatewayTwo && { itGatewayTwo: fglmData.itGatewayTwo }),
                ...(fglmData.itSubnetTwo && { itSubnetTwo: fglmData.itSubnetTwo }),
                ...(fglmData.itDNSTwo && { itDNSTwo: fglmData.itDNSTwo }),
                ...(fglmData.itSMTPTwo && { itSMTPTwo: fglmData.itSMTPTwo }),
                ...(fglmData.itNameThree && { itNameThree: fglmData.itNameThree }),
                ...(fglmData.itIPThree && { itIPThree: fglmData.itIPThree }),
                ...(fglmData.itGatewayThree && { itGatewayThree: fglmData.itGatewayThree }),
                ...(fglmData.itSubnetThree && { itSubnetThree: fglmData.itSubnetThree }),
                ...(fglmData.itDNSThree && { itDNSThree: fglmData.itDNSThree }),
                ...(fglmData.itSMTPThree && { itSMTPThree: fglmData.itSMTPThree }),
                ...(fglmData.itAdditionalNotes && { itAdditionalNotes: fglmData.itAdditionalNotes }),
                ...(fglmData.piuDistance && { piuDistance: fglmData.piuDistance }),
                ...(fglmData.switchDistance && { switchDistance: fglmData.switchDistance }),
                ...(fglmData.ampPickup && { ampPickup: fglmData.ampPickup }),
                ...(fglmData.fromAirTakeUpDistance && { fromAirTakeUpDistance: fglmData.fromAirTakeUpDistance }),
                ...(fglmData.specialControllerOptions && { specialControllerOptions: fglmData.specialControllerOptions }),
                ...(fglmData.operatingVoltage && { operatingVoltage: fglmData.operatingVoltage })

            },            
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