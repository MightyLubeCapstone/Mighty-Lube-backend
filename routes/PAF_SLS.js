const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_SLS = require("../models/PAF_SLS");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_SLSData, numRequested } = req.body;
        const order = new PAF_SLS({
            conveyorName: PAF_SLSData.conveyorName,
            chainSize: PAF_SLSData.chainSize,
            ...(PAF_SLSData.otherChainSize && { otherChainSize: PAF_SLSData.otherChainSize }),
            industrialChainManufacturer: PAF_SLSData.industrialChainManufacturer,
            ...(PAF_SLSData.otherChainManufacturer && { otherChainManufacturer: PAF_SLSData.otherChainManufacturer }),
            conveyorLength: PAF_SLSData.conveyorLength,
            conveyorLengthUnit: PAF_SLSData.conveyorLengthUnit,
            conveyorSpeed: PAF_SLSData.conveyorSpeed,
            conveyorSpeedUnit: PAF_SLSData.conveyorSpeedUnit,
            conveyorIndex: PAF_SLSData.conveyorIndex,
            travelDirection: PAF_SLSData.travelDirection,
            appEnviroment: PAF_SLSData.appEnviroment,
            ...(PAF_SLSData.ovenStatus && { ovenStatus: PAF_SLSData.ovenStatus }),
            ...(PAF_SLSData.ovenTemp && { ovenTemp: PAF_SLSData.ovenTemp }),
            surroundingTemp: PAF_SLSData.surroundingTemp,
            conveyorLoaded: PAF_SLSData.conveyorLoaded,
            conveyorSwing: PAF_SLSData.conveyorSwing,
            orientationType: PAF_SLSData.orientationType,
            operatingVoltSingle: PAF_SLSData.operatingVoltSingle,
            controlVoltSingle: PAF_SLSData.controlVoltSingle,
            monitorData: new templateA({
                existingMonitor: PAF_SLSData.templateA.existingMonitor,
                newMonitor: PAF_SLSData.templateA.newMonitor,
                ...(PAF_SLSData.templateA.dcuStatus && { dcuStatus: PAF_SLSData.templateA.dcuStatus }),
                ...(PAF_SLSData.templateA.dcuNum && { dcuNum: PAF_SLSData.templateA.dcuNum }),
                ...(PAF_SLSData.templateA.existingWindows && { existingWindows: PAF_SLSData.templateA.existingWindows }),
                ...(PAF_SLSData.templateA.existingHeadUnit && { existingHeadUnit: PAF_SLSData.templateA.existingHeadUnit }),
                ...(PAF_SLSData.templateA.existingDCU && { existingDCU: PAF_SLSData.templateA.existingDCU }),
                ...(PAF_SLSData.templateA.existingPowerInterface && { existingPowerInterface: PAF_SLSData.templateA.existingPowerInterface }),
                ...(PAF_SLSData.templateA.newReservoir && { newReservoir: PAF_SLSData.templateA.newReservoir }),
                ...(PAF_SLSData.templateA.reservoirSize && { reservoirSize: PAF_SLSData.templateA.reservoirSize }),
                ...(PAF_SLSData.templateA.otherReservoirSize && { otherReservoirSize: PAF_SLSData.templateA.otherReservoirSize }),
                ...(PAF_SLSData.templateA.newReservoirNum && { newReservoirNum: PAF_SLSData.templateA.newReservoirNum }),
                ...(PAF_SLSData.templateA.typeMonitor && { typeMonitor: PAF_SLSData.templateA.typeMonitor }),
                ...(PAF_SLSData.templateA.driveMotorAmp && { driveMotorAmp: PAF_SLSData.templateA.driveMotorAmp }),
                ...(PAF_SLSData.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_SLSData.templateA.driveMotorAmpNum }),
                ...(PAF_SLSData.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_SLSData.templateA.driveTakeUpAir }),
                ...(PAF_SLSData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_SLSData.templateA.driveTakeUpAirNum }),
                ...(PAF_SLSData.templateA.takeUpDistance && { takeUpDistance: PAF_SLSData.templateA.takeUpDistance }),
                ...(PAF_SLSData.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_SLSData.templateA.takeUpDistanceNum }),
                ...(PAF_SLSData.templateA.driveTemp && { driveTemp: PAF_SLSData.templateA.driveTemp }),
                ...(PAF_SLSData.templateA.driveTempNum && { driveTempNum: PAF_SLSData.templateA.driveTempNum }),
                ...(PAF_SLSData.templateA.driveVibration && { driveVibration: PAF_SLSData.templateA.driveVibration }),
                ...(PAF_SLSData.templateA.driveVibrationNum && { driveVibrationNum: PAF_SLSData.templateA.driveVibrationNum }),
                ...(PAF_SLSData.templateA.dogPitch && { dogPitch: PAF_SLSData.templateA.dogPitch }),
                ...(PAF_SLSData.templateA.dogPitchNum && { dogPitchNum: PAF_SLSData.templateA.dogPitchNum }),
                ...(PAF_SLSData.templateA.paintMarker && { paintMarker: PAF_SLSData.templateA.paintMarker }),
                ...(PAF_SLSData.templateA.paintMarkerNum && { paintMarkerNum: PAF_SLSData.templateA.paintMarkerNum }),
                ...(PAF_SLSData.templateA.chainVision && { chainVision: PAF_SLSData.templateA.chainVision }),
                ...(PAF_SLSData.templateA.lubeVision && { lubeVision: PAF_SLSData.templateA.lubeVision }),
                ...(PAF_SLSData.templateA.trolleyVision && { trolleyVision: PAF_SLSData.templateA.trolleyVision }),
                ...(PAF_SLSData.templateA.trolleyDetect && { trolleyDetect: PAF_SLSData.templateA.trolleyDetect }),
                ...(PAF_SLSData.templateA.omniView && { omniView: PAF_SLSData.templateA.omniView }),
                ...(PAF_SLSData.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_SLSData.templateA.dcuUpgradeNum }),
                ...(PAF_SLSData.templateA.itNameOne && { itNameOne: PAF_SLSData.templateA.itNameOne }),
                ...(PAF_SLSData.templateA.itIPOne && { itIPOne: PAF_SLSData.templateA.itIPOne }),
                ...(PAF_SLSData.templateA.itGatewayOne && { itGatewayOne: PAF_SLSData.templateA.itGatewayOne }),
                ...(PAF_SLSData.templateA.itSubnetOne && { itSubnetOne: PAF_SLSData.templateA.itSubnetOne }),
                ...(PAF_SLSData.templateA.itDNSOne && { itDNSOne: PAF_SLSData.templateA.itDNSOne }),
                ...(PAF_SLSData.templateA.itSMTPOne && { itSMTPOne: PAF_SLSData.templateA.itSMTPOne }),
                ...(PAF_SLSData.templateA.itNameTwo && { itNameTwo: PAF_SLSData.templateA.itNameTwo }),
                ...(PAF_SLSData.templateA.itIPTwo && { itIPTwo: PAF_SLSData.templateA.itIPTwo }),
                ...(PAF_SLSData.templateA.itGatewayTwo && { itGatewayTwo: PAF_SLSData.templateA.itGatewayTwo }),
                ...(PAF_SLSData.templateA.itSubnetTwo && { itSubnetTwo: PAF_SLSData.templateA.itSubnetTwo }),
                ...(PAF_SLSData.templateA.itDNSTwo && { itDNSTwo: PAF_SLSData.templateA.itDNSTwo }),
                ...(PAF_SLSData.templateA.itSMTPTwo && { itSMTPTwo: PAF_SLSData.templateA.itSMTPTwo }),
                ...(PAF_SLSData.templateA.itNameThree && { itNameThree: PAF_SLSData.templateA.itNameThree }),
                ...(PAF_SLSData.templateA.itIPThree && { itIPThree: PAF_SLSData.templateA.itIPThree }),
                ...(PAF_SLSData.templateA.itGatewayThree && { itGatewayThree: PAF_SLSData.templateA.itGatewayThree }),
                ...(PAF_SLSData.templateA.itSubnetThree && { itSubnetThree: PAF_SLSData.templateA.itSubnetThree }),
                ...(PAF_SLSData.templateA.itDNSThree && { itDNSThree: PAF_SLSData.templateA.itDNSThree }),
                ...(PAF_SLSData.templateA.itSMTPThree && { itSMTPThree: PAF_SLSData.templateA.itSMTPThree }),
                ...(PAF_SLSData.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_SLSData.templateA.itAdditionalNotes }),
                ...(PAF_SLSData.templateA.piuDistance && { piuDistance: PAF_SLSData.templateA.piuDistance }),
                ...(PAF_SLSData.templateA.switchDistance && { switchDistance: PAF_SLSData.templateA.switchDistance }),
                ...(PAF_SLSData.templateA.ampPickup && { ampPickup: PAF_SLSData.templateA.ampPickup }),
                ...(PAF_SLSData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_SLSData.templateA.fromAirTakeUpDistance }),
                ...(PAF_SLSData.templateA.specialControllerOptions && { specialControllerOptions: PAF_SLSData.templateA.specialControllerOptions })
            }),
            cleanChain: PAF_SLSData.cleanChain,
            pfUnitType: PAF_SLSData.pfUnitType,
            pfInvertedA: PAF_SLSData.pfInvertedA,
            pfInvertedG: PAF_SLSData.pfInvertedG,
            pfInvertedH: PAF_SLSData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_SLS"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_SLS entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;