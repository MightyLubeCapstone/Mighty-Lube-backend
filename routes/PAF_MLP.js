const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_MLP = require("../models/PAF_MLP");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_MLPData.templateB.existingMonitor,
                newMonitor: PAF_MLPData.templateB.newMonitor,
                ...(PAF_MLPData.templateB.dcuStatus && { dcuStatus: PAF_MLPData.templateB.dcuStatus }),
                ...(PAF_MLPData.templateB.dcuNum && { dcuNum: PAF_MLPData.templateB.dcuNum }),
                ...(PAF_MLPData.templateB.existingWindows && { existingWindows: PAF_MLPData.templateB.existingWindows }),
                ...(PAF_MLPData.templateB.existingHeadUnit && { existingHeadUnit: PAF_MLPData.templateB.existingHeadUnit }),
                ...(PAF_MLPData.templateB.existingDCU && { existingDCU: PAF_MLPData.templateB.existingDCU }),
                ...(PAF_MLPData.templateB.existingPowerInterface && { existingPowerInterface: PAF_MLPData.templateB.existingPowerInterface }),
                ...(PAF_MLPData.templateB.newReservoir && { newReservoir: PAF_MLPData.templateB.newReservoir }),
                ...(PAF_MLPData.templateB.reservoirSize && { reservoirSize: PAF_MLPData.templateB.reservoirSize }),
                ...(PAF_MLPData.templateB.otherReservoirSize && { otherReservoirSize: PAF_MLPData.templateB.otherReservoirSize }),
                ...(PAF_MLPData.templateB.newReservoirNum && { newReservoirNum: PAF_MLPData.templateB.newReservoirNum }),
                ...(PAF_MLPData.templateB.typeMonitor && { typeMonitor: PAF_MLPData.templateB.typeMonitor }),
                ...(PAF_MLPData.templateB.driveMotorAmp && { driveMotorAmp: PAF_MLPData.templateB.driveMotorAmp }),
                ...(PAF_MLPData.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_MLPData.templateB.driveMotorAmpNum }),
                ...(PAF_MLPData.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_MLPData.templateB.driveTakeUpAir }),
                ...(PAF_MLPData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_MLPData.templateB.driveTakeUpAirNum }),
                ...(PAF_MLPData.templateB.takeUpDistance && { takeUpDistance: PAF_MLPData.templateB.takeUpDistance }),
                ...(PAF_MLPData.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_MLPData.templateB.takeUpDistanceNum }),
                ...(PAF_MLPData.templateB.driveTemp && { driveTemp: PAF_MLPData.templateB.driveTemp }),
                ...(PAF_MLPData.templateB.driveTempNum && { driveTempNum: PAF_MLPData.templateB.driveTempNum }),
                ...(PAF_MLPData.templateB.driveVibration && { driveVibration: PAF_MLPData.templateB.driveVibration }),
                ...(PAF_MLPData.templateB.driveVibrationNum && { driveVibrationNum: PAF_MLPData.templateB.driveVibrationNum }),
                ...(PAF_MLPData.templateB.dogPitch && { dogPitch: PAF_MLPData.templateB.dogPitch }),
                ...(PAF_MLPData.templateB.dogPitchNum && { dogPitchNum: PAF_MLPData.templateB.dogPitchNum }),
                ...(PAF_MLPData.templateB.paintMarker && { paintMarker: PAF_MLPData.templateB.paintMarker }),
                ...(PAF_MLPData.templateB.paintMarkerNum && { paintMarkerNum: PAF_MLPData.templateB.paintMarkerNum }),
                ...(PAF_MLPData.templateB.chainVision && { chainVision: PAF_MLPData.templateB.chainVision }),
                ...(PAF_MLPData.templateB.lubeVision && { lubeVision: PAF_MLPData.templateB.lubeVision }),
                ...(PAF_MLPData.templateB.trolleyVision && { trolleyVision: PAF_MLPData.templateB.trolleyVision }),
                ...(PAF_MLPData.templateB.trolleyDetect && { trolleyDetect: PAF_MLPData.templateB.trolleyDetect }),
                ...(PAF_MLPData.templateB.omniView && { omniView: PAF_MLPData.templateB.omniView }),
                ...(PAF_MLPData.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_MLPData.templateB.dcuUpgradeNum }),
                ...(PAF_MLPData.templateB.itNameOne && { itNameOne: PAF_MLPData.templateB.itNameOne }),
                ...(PAF_MLPData.templateB.itIPOne && { itIPOne: PAF_MLPData.templateB.itIPOne }),
                ...(PAF_MLPData.templateB.itGatewayOne && { itGatewayOne: PAF_MLPData.templateB.itGatewayOne }),
                ...(PAF_MLPData.templateB.itSubnetOne && { itSubnetOne: PAF_MLPData.templateB.itSubnetOne }),
                ...(PAF_MLPData.templateB.itDNSOne && { itDNSOne: PAF_MLPData.templateB.itDNSOne }),
                ...(PAF_MLPData.templateB.itSMTPOne && { itSMTPOne: PAF_MLPData.templateB.itSMTPOne }),
                ...(PAF_MLPData.templateB.itNameTwo && { itNameTwo: PAF_MLPData.templateB.itNameTwo }),
                ...(PAF_MLPData.templateB.itIPTwo && { itIPTwo: PAF_MLPData.templateB.itIPTwo }),
                ...(PAF_MLPData.templateB.itGatewayTwo && { itGatewayTwo: PAF_MLPData.templateB.itGatewayTwo }),
                ...(PAF_MLPData.templateB.itSubnetTwo && { itSubnetTwo: PAF_MLPData.templateB.itSubnetTwo }),
                ...(PAF_MLPData.templateB.itDNSTwo && { itDNSTwo: PAF_MLPData.templateB.itDNSTwo }),
                ...(PAF_MLPData.templateB.itSMTPTwo && { itSMTPTwo: PAF_MLPData.templateB.itSMTPTwo }),
                ...(PAF_MLPData.templateB.itNameThree && { itNameThree: PAF_MLPData.templateB.itNameThree }),
                ...(PAF_MLPData.templateB.itIPThree && { itIPThree: PAF_MLPData.templateB.itIPThree }),
                ...(PAF_MLPData.templateB.itGatewayThree && { itGatewayThree: PAF_MLPData.templateB.itGatewayThree }),
                ...(PAF_MLPData.templateB.itSubnetThree && { itSubnetThree: PAF_MLPData.templateB.itSubnetThree }),
                ...(PAF_MLPData.templateB.itDNSThree && { itDNSThree: PAF_MLPData.templateB.itDNSThree }),
                ...(PAF_MLPData.templateB.itSMTPThree && { itSMTPThree: PAF_MLPData.templateB.itSMTPThree }),
                ...(PAF_MLPData.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_MLPData.templateB.itAdditionalNotes }),
                ...(PAF_MLPData.templateB.piuDistance && { piuDistance: PAF_MLPData.templateB.piuDistance }),
                ...(PAF_MLPData.templateB.switchDistance && { switchDistance: PAF_MLPData.templateB.switchDistance }),
                ...(PAF_MLPData.templateB.ampPickup && { ampPickup: PAF_MLPData.templateB.ampPickup }),
                ...(PAF_MLPData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_MLPData.templateB.fromAirTakeUpDistance }),
                ...(PAF_MLPData.templateB.specialControllerOptions && { specialControllerOptions: PAF_MLPData.templateB.specialControllerOptions })
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