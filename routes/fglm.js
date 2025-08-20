const express = require("express");
const { authenticate } = require("./sessions");
const FGLM = require("../models/fglm");

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
            monitorData: 
            {
                existingMonitor: fglmData.templateA.existingMonitor,
                newMonitor: fglmData.templateA.newMonitor,		
                ...(fglmData.templateA.dcuStatus && { dcuStatus: fglmData.templateA.dcuStatus }),
                ...(fglmData.templateA.dcuNum && { dcuNum: fglmData.templateA.dcuNum }),
                ...(fglmData.templateA.existingWindows && { existingWindows: fglmData.templateA.existingWindows }),
                ...(fglmData.templateA.existingHeadUnit && { existingHeadUnit: fglmData.templateA.existingHeadUnit }),
                ...(fglmData.templateA.existingDCU && { existingDCU: fglmData.templateA.existingDCU }),
                ...(fglmData.templateA.existingPowerInterface && { existingPowerInterface: fglmData.templateA.existingPowerInterface }),
                ...(fglmData.templateA.newReservoir && { newReservoir: fglmData.templateA.newReservoir }),
                ...(fglmData.templateA.reservoirSize && { reservoirSize: fglmData.templateA.reservoirSize }),
                ...(fglmData.templateA.otherReservoirSize && { otherReservoirSize: fglmData.templateA.otherReservoirSize }),
                ...(fglmData.templateA.newReservoirNum && { newReservoirNum: fglmData.templateA.newReservoirNum }),
                ...(fglmData.templateA.typeMonitor && { typeMonitor: fglmData.templateA.typeMonitor }),
                ...(fglmData.templateA.driveMotorAmp && { driveMotorAmp: fglmData.templateA.driveMotorAmp }),
                ...(fglmData.templateA.driveMotorAmpNum && { driveMotorAmpNum: fglmData.templateA.driveMotorAmpNum }),
                ...(fglmData.templateA.driveTakeUpAir && { driveTakeUpAir: fglmData.templateA.driveTakeUpAir }),
                ...(fglmData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: fglmData.templateA.driveTakeUpAirNum }),
                ...(fglmData.templateA.takeUpDistance && { takeUpDistance: fglmData.templateA.takeUpDistance }),
                ...(fglmData.templateA.takeUpDistanceNum && { takeUpDistanceNum: fglmData.templateA.takeUpDistanceNum }),
                ...(fglmData.templateA.driveTemp && { driveTemp: fglmData.templateA.driveTemp }),
                ...(fglmData.templateA.driveTempNum && { driveTempNum: fglmData.templateA.driveTempNum }),
                ...(fglmData.templateA.driveVibration && { driveVibration: fglmData.templateA.driveVibration }),
                ...(fglmData.templateA.driveVibrationNum && { driveVibrationNum: fglmData.templateA.driveVibrationNum }),
                ...(fglmData.templateA.dogPitch && { dogPitch: fglmData.templateA.dogPitch }),
                ...(fglmData.templateA.dogPitchNum && { dogPitchNum: fglmData.templateA.dogPitchNum }),
                ...(fglmData.templateA.paintMarker && { paintMarker: fglmData.templateA.paintMarker }),
                ...(fglmData.templateA.paintMarkerNum && { paintMarkerNum: fglmData.templateA.paintMarkerNum }),
                ...(fglmData.templateA.chainVision && { chainVision: fglmData.templateA.chainVision }),
                ...(fglmData.templateA.lubeVision && { lubeVision: fglmData.templateA.lubeVision }),
                ...(fglmData.templateA.trolleyVision && { trolleyVision: fglmData.templateA.trolleyVision }),
                ...(fglmData.templateA.trolleyDetect && { trolleyDetect: fglmData.templateA.trolleyDetect }),
                ...(fglmData.templateA.omniView && { omniView: fglmData.templateA.omniView }),
                ...(fglmData.templateA.dcuUpgradeNum && { dcuUpgradeNum: fglmData.templateA.dcuUpgradeNum }),
                ...(fglmData.templateA.piuDistance && { piuDistance: fglmData.templateA.piuDistance }),
                ...(fglmData.templateA.switchDistance && { switchDistance: fglmData.templateA.switchDistance }),
                ...(fglmData.templateA.ampPickup && { ampPickup: fglmData.templateA.ampPickup }),
                ...(fglmData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: fglmData.templateA.fromAirTakeUpDistance }),
                ...(fglmData.templateA.specialControllerOptions && { specialControllerOptions: fglmData.templateA.specialControllerOptions }),
                ...(fglmData.templateA.operatingVoltage && { operatingVoltage: fglmData.templateA.operatingVoltage })
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