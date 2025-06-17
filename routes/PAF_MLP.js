const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_MLP = require("../models/PAF_MLP");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_MLPData, numRequested } = req.body;
        const order = new PAF_MLP({
            conveyorName: PAF_MLPData.conveyorName,
            chainSize: PAF_MLPData.chainSize,
            ...(PAF_MLPData.otherChainSize && { otherChainSize: PAF_MLPData.otherChainSize }),
            industrialChainManufacturer: PAF_MLPData.industrialChainManufacturer,
            ...(PAF_MLPData.otherChainManufacturer && { otherChainManufacturer: PAF_MLPData.otherChainManufacturer }),
            conveyorLength: PAF_MLPData.conveyorLength,
            conveyorLengthUnit: PAF_MLPData.conveyorLengthUnit,
            conveyorSpeed: PAF_MLPData.conveyorSpeed,
            conveyorSpeedUnit: PAF_MLPData.conveyorSpeedUnit,
            appEnviroment: PAF_MLPData.appEnviroment,
            ...(PAF_MLPData.ovenStatus && { ovenStatus: PAF_MLPData.ovenStatus }),
            ...(PAF_MLPData.ovenTemp && { ovenTemp: PAF_MLPData.ovenTemp }),
            surroundingTemp: PAF_MLPData.surroundingTemp,
            conveyorLoaded: PAF_MLPData.conveyorLoaded,
            conveyorSwing: PAF_MLPData.conveyorSwing,
            orientationType: PAF_MLPData.orientationType,
            operatingVoltSingle: PAF_MLPData.operatingVoltSingle,
            controlVoltSingle: PAF_MLPData.controlVoltSingle,
            monitorData: new templateA({
                existingMonitor: PAF_MLPData.templateA.existingMonitor,
                newMonitor: PAF_MLPData.templateA.newMonitor,
                ...(PAF_MLPData.templateA.dcuStatus && { dcuStatus: PAF_MLPData.templateA.dcuStatus }),
                ...(PAF_MLPData.templateA.dcuNum && { dcuNum: PAF_MLPData.templateA.dcuNum }),
                ...(PAF_MLPData.templateA.existingWindows && { existingWindows: PAF_MLPData.templateA.existingWindows }),
                ...(PAF_MLPData.templateA.existingHeadUnit && { existingHeadUnit: PAF_MLPData.templateA.existingHeadUnit }),
                ...(PAF_MLPData.templateA.existingDCU && { existingDCU: PAF_MLPData.templateA.existingDCU }),
                ...(PAF_MLPData.templateA.existingPowerInterface && { existingPowerInterface: PAF_MLPData.templateA.existingPowerInterface }),
                ...(PAF_MLPData.templateA.newReservoir && { newReservoir: PAF_MLPData.templateA.newReservoir }),
                ...(PAF_MLPData.templateA.reservoirSize && { reservoirSize: PAF_MLPData.templateA.reservoirSize }),
                ...(PAF_MLPData.templateA.otherReservoirSize && { otherReservoirSize: PAF_MLPData.templateA.otherReservoirSize }),
                ...(PAF_MLPData.templateA.newReservoirNum && { newReservoirNum: PAF_MLPData.templateA.newReservoirNum }),
                ...(PAF_MLPData.templateA.typeMonitor && { typeMonitor: PAF_MLPData.templateA.typeMonitor }),
                ...(PAF_MLPData.templateA.driveMotorAmp && { driveMotorAmp: PAF_MLPData.templateA.driveMotorAmp }),
                ...(PAF_MLPData.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_MLPData.templateA.driveMotorAmpNum }),
                ...(PAF_MLPData.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_MLPData.templateA.driveTakeUpAir }),
                ...(PAF_MLPData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_MLPData.templateA.driveTakeUpAirNum }),
                ...(PAF_MLPData.templateA.takeUpDistance && { takeUpDistance: PAF_MLPData.templateA.takeUpDistance }),
                ...(PAF_MLPData.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_MLPData.templateA.takeUpDistanceNum }),
                ...(PAF_MLPData.templateA.driveTemp && { driveTemp: PAF_MLPData.templateA.driveTemp }),
                ...(PAF_MLPData.templateA.driveTempNum && { driveTempNum: PAF_MLPData.templateA.driveTempNum }),
                ...(PAF_MLPData.templateA.driveVibration && { driveVibration: PAF_MLPData.templateA.driveVibration }),
                ...(PAF_MLPData.templateA.driveVibrationNum && { driveVibrationNum: PAF_MLPData.templateA.driveVibrationNum }),
                ...(PAF_MLPData.templateA.dogPitch && { dogPitch: PAF_MLPData.templateA.dogPitch }),
                ...(PAF_MLPData.templateA.dogPitchNum && { dogPitchNum: PAF_MLPData.templateA.dogPitchNum }),
                ...(PAF_MLPData.templateA.paintMarker && { paintMarker: PAF_MLPData.templateA.paintMarker }),
                ...(PAF_MLPData.templateA.paintMarkerNum && { paintMarkerNum: PAF_MLPData.templateA.paintMarkerNum }),
                ...(PAF_MLPData.templateA.chainVision && { chainVision: PAF_MLPData.templateA.chainVision }),
                ...(PAF_MLPData.templateA.lubeVision && { lubeVision: PAF_MLPData.templateA.lubeVision }),
                ...(PAF_MLPData.templateA.trolleyVision && { trolleyVision: PAF_MLPData.templateA.trolleyVision }),
                ...(PAF_MLPData.templateA.trolleyDetect && { trolleyDetect: PAF_MLPData.templateA.trolleyDetect }),
                ...(PAF_MLPData.templateA.omniView && { omniView: PAF_MLPData.templateA.omniView }),
                ...(PAF_MLPData.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_MLPData.templateA.dcuUpgradeNum }),
                ...(PAF_MLPData.templateA.itNameOne && { itNameOne: PAF_MLPData.templateA.itNameOne }),
                ...(PAF_MLPData.templateA.itIPOne && { itIPOne: PAF_MLPData.templateA.itIPOne }),
                ...(PAF_MLPData.templateA.itGatewayOne && { itGatewayOne: PAF_MLPData.templateA.itGatewayOne }),
                ...(PAF_MLPData.templateA.itSubnetOne && { itSubnetOne: PAF_MLPData.templateA.itSubnetOne }),
                ...(PAF_MLPData.templateA.itDNSOne && { itDNSOne: PAF_MLPData.templateA.itDNSOne }),
                ...(PAF_MLPData.templateA.itSMTPOne && { itSMTPOne: PAF_MLPData.templateA.itSMTPOne }),
                ...(PAF_MLPData.templateA.itNameTwo && { itNameTwo: PAF_MLPData.templateA.itNameTwo }),
                ...(PAF_MLPData.templateA.itIPTwo && { itIPTwo: PAF_MLPData.templateA.itIPTwo }),
                ...(PAF_MLPData.templateA.itGatewayTwo && { itGatewayTwo: PAF_MLPData.templateA.itGatewayTwo }),
                ...(PAF_MLPData.templateA.itSubnetTwo && { itSubnetTwo: PAF_MLPData.templateA.itSubnetTwo }),
                ...(PAF_MLPData.templateA.itDNSTwo && { itDNSTwo: PAF_MLPData.templateA.itDNSTwo }),
                ...(PAF_MLPData.templateA.itSMTPTwo && { itSMTPTwo: PAF_MLPData.templateA.itSMTPTwo }),
                ...(PAF_MLPData.templateA.itNameThree && { itNameThree: PAF_MLPData.templateA.itNameThree }),
                ...(PAF_MLPData.templateA.itIPThree && { itIPThree: PAF_MLPData.templateA.itIPThree }),
                ...(PAF_MLPData.templateA.itGatewayThree && { itGatewayThree: PAF_MLPData.templateA.itGatewayThree }),
                ...(PAF_MLPData.templateA.itSubnetThree && { itSubnetThree: PAF_MLPData.templateA.itSubnetThree }),
                ...(PAF_MLPData.templateA.itDNSThree && { itDNSThree: PAF_MLPData.templateA.itDNSThree }),
                ...(PAF_MLPData.templateA.itSMTPThree && { itSMTPThree: PAF_MLPData.templateA.itSMTPThree }),
                ...(PAF_MLPData.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_MLPData.templateA.itAdditionalNotes }),
                ...(PAF_MLPData.templateA.piuDistance && { piuDistance: PAF_MLPData.templateA.piuDistance }),
                ...(PAF_MLPData.templateA.switchDistance && { switchDistance: PAF_MLPData.templateA.switchDistance }),
                ...(PAF_MLPData.templateA.ampPickup && { ampPickup: PAF_MLPData.templateA.ampPickup }),
                ...(PAF_MLPData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_MLPData.templateA.fromAirTakeUpDistance }),
                ...(PAF_MLPData.templateA.specialControllerOptions && { specialControllerOptions: PAF_MLPData.templateA.specialControllerOptions })
            }),
            wheelOpenType: PAF_MLPData.wheelOpenType,
            wheelClosedType: PAF_MLPData.wheelClosedType,
            powerChainStatus: PAF_MLPData.powerChainStatus,
            chainPinStatus: PAF_MLPData.chainPinStatus,
            catDriveStatus: PAF_MLPData.catDriveStatus,
            catDriveNum: PAF_MLPData.catDriveNum,
            railLubeStatus: PAF_MLPData.railLubeStatus,
            externalLubeStatus: PAF_MLPData.externalLubeStatus,
            lubeBrand: PAF_MLPData.lubeBrand,
            lubeType: PAF_MLPData.lubeType,
            lubeViscosity: PAF_MLPData.lubeViscosity,
            sideLubeStatus: PAF_MLPData.sideLubeStatus,
            topLubeStatus: PAF_MLPData.topLubeStatus,
            chainCleanStatus: PAF_MLPData.chainCleanStatus,
            pfUnitType: PAF_MLPData.pfUnitType,
            pfOverheadL: PAF_MLPData.pfOverheadL,
            pfOverheadG: PAF_MLPData.pfOverheadG,
            pfOverheadH: PAF_MLPData.pfOverheadH,
            pfInvertedB: PAF_MLPData.pfInvertedB,
            pfInvertedG: PAF_MLPData.pfInvertedG,
            pfInvertedH: PAF_MLPData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_MLP"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_MLP entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;