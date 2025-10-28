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
            monitorData: {
                existingMonitor: PAF_MLPData.existingMonitor,
                newMonitor: PAF_MLPData.newMonitor,
                ...(PAF_MLPData.dcuStatus && { dcuStatus: PAF_MLPData.dcuStatus }),
                ...(PAF_MLPData.dcuNum && { dcuNum: PAF_MLPData.dcuNum }),
                ...(PAF_MLPData.existingWindows && { existingWindows: PAF_MLPData.existingWindows }),
                ...(PAF_MLPData.existingHeadUnit && { existingHeadUnit: PAF_MLPData.existingHeadUnit }),
                ...(PAF_MLPData.existingDCU && { existingDCU: PAF_MLPData.existingDCU }),
                ...(PAF_MLPData.existingPowerInterface && { existingPowerInterface: PAF_MLPData.existingPowerInterface }),
                ...(PAF_MLPData.newReservoir && { newReservoir: PAF_MLPData.newReservoir }),
                ...(PAF_MLPData.reservoirSize && { reservoirSize: PAF_MLPData.reservoirSize }),
                ...(PAF_MLPData.otherReservoirSize && { otherReservoirSize: PAF_MLPData.otherReservoirSize }),
                ...(PAF_MLPData.newReservoirNum && { newReservoirNum: PAF_MLPData.newReservoirNum }),
                ...(PAF_MLPData.typeMonitor && { typeMonitor: PAF_MLPData.typeMonitor }),
                ...(PAF_MLPData.driveMotorAmp && { driveMotorAmp: PAF_MLPData.driveMotorAmp }),
                ...(PAF_MLPData.driveMotorAmpNum && { driveMotorAmpNum: PAF_MLPData.driveMotorAmpNum }),
                ...(PAF_MLPData.driveTakeUpAir && { driveTakeUpAir: PAF_MLPData.driveTakeUpAir }),
                ...(PAF_MLPData.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_MLPData.driveTakeUpAirNum }),
                ...(PAF_MLPData.takeUpDistance && { takeUpDistance: PAF_MLPData.takeUpDistance }),
                ...(PAF_MLPData.takeUpDistanceNum && { takeUpDistanceNum: PAF_MLPData.takeUpDistanceNum }),
                ...(PAF_MLPData.driveTemp && { driveTemp: PAF_MLPData.driveTemp }),
                ...(PAF_MLPData.driveTempNum && { driveTempNum: PAF_MLPData.driveTempNum }),
                ...(PAF_MLPData.driveVibration && { driveVibration: PAF_MLPData.driveVibration }),
                ...(PAF_MLPData.driveVibrationNum && { driveVibrationNum: PAF_MLPData.driveVibrationNum }),
                ...(PAF_MLPData.dogPitch && { dogPitch: PAF_MLPData.dogPitch }),
                ...(PAF_MLPData.dogPitchNum && { dogPitchNum: PAF_MLPData.dogPitchNum }),
                ...(PAF_MLPData.paintMarker && { paintMarker: PAF_MLPData.paintMarker }),
                ...(PAF_MLPData.paintMarkerNum && { paintMarkerNum: PAF_MLPData.paintMarkerNum }),
                ...(PAF_MLPData.chainVision && { chainVision: PAF_MLPData.chainVision }),
                ...(PAF_MLPData.lubeVision && { lubeVision: PAF_MLPData.lubeVision }),
                ...(PAF_MLPData.trolleyVision && { trolleyVision: PAF_MLPData.trolleyVision }),
                ...(PAF_MLPData.trolleyDetect && { trolleyDetect: PAF_MLPData.trolleyDetect }),
                ...(PAF_MLPData.omniView && { omniView: PAF_MLPData.omniView }),
                ...(PAF_MLPData.dcuUpgradeNum && { dcuUpgradeNum: PAF_MLPData.dcuUpgradeNum }),
                ...(PAF_MLPData.itNameOne && { itNameOne: PAF_MLPData.itNameOne }),
                ...(PAF_MLPData.itIPOne && { itIPOne: PAF_MLPData.itIPOne }),
                ...(PAF_MLPData.itGatewayOne && { itGatewayOne: PAF_MLPData.itGatewayOne }),
                ...(PAF_MLPData.itSubnetOne && { itSubnetOne: PAF_MLPData.itSubnetOne }),
                ...(PAF_MLPData.itDNSOne && { itDNSOne: PAF_MLPData.itDNSOne }),
                ...(PAF_MLPData.itSMTPOne && { itSMTPOne: PAF_MLPData.itSMTPOne }),
                ...(PAF_MLPData.itNameTwo && { itNameTwo: PAF_MLPData.itNameTwo }),
                ...(PAF_MLPData.itIPTwo && { itIPTwo: PAF_MLPData.itIPTwo }),
                ...(PAF_MLPData.itGatewayTwo && { itGatewayTwo: PAF_MLPData.itGatewayTwo }),
                ...(PAF_MLPData.itSubnetTwo && { itSubnetTwo: PAF_MLPData.itSubnetTwo }),
                ...(PAF_MLPData.itDNSTwo && { itDNSTwo: PAF_MLPData.itDNSTwo }),
                ...(PAF_MLPData.itSMTPTwo && { itSMTPTwo: PAF_MLPData.itSMTPTwo }),
                ...(PAF_MLPData.itNameThree && { itNameThree: PAF_MLPData.itNameThree }),
                ...(PAF_MLPData.itIPThree && { itIPThree: PAF_MLPData.itIPThree }),
                ...(PAF_MLPData.itGatewayThree && { itGatewayThree: PAF_MLPData.itGatewayThree }),
                ...(PAF_MLPData.itSubnetThree && { itSubnetThree: PAF_MLPData.itSubnetThree }),
                ...(PAF_MLPData.itDNSThree && { itDNSThree: PAF_MLPData.itDNSThree }),
                ...(PAF_MLPData.itSMTPThree && { itSMTPThree: PAF_MLPData.itSMTPThree }),
                ...(PAF_MLPData.itAdditionalNotes && { itAdditionalNotes: PAF_MLPData.itAdditionalNotes }),
                ...(PAF_MLPData.piuDistance && { piuDistance: PAF_MLPData.piuDistance }),
                ...(PAF_MLPData.switchDistance && { switchDistance: PAF_MLPData.switchDistance }),
                ...(PAF_MLPData.ampPickup && { ampPickup: PAF_MLPData.ampPickup }),
                ...(PAF_MLPData.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_MLPData.fromAirTakeUpDistance }),
                ...(PAF_MLPData.specialControllerOptions && { specialControllerOptions: PAF_MLPData.specialControllerOptions })
            },
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