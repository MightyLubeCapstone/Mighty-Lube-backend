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
            monitorData: {
                existingMonitor: PAF_SLSData.existingMonitor,
                newMonitor: PAF_SLSData.newMonitor,
                ...(PAF_SLSData.dcuStatus && { dcuStatus: PAF_SLSData.dcuStatus }),
                ...(PAF_SLSData.dcuNum && { dcuNum: PAF_SLSData.dcuNum }),
                ...(PAF_SLSData.existingWindows && { existingWindows: PAF_SLSData.existingWindows }),
                ...(PAF_SLSData.existingHeadUnit && { existingHeadUnit: PAF_SLSData.existingHeadUnit }),
                ...(PAF_SLSData.existingDCU && { existingDCU: PAF_SLSData.existingDCU }),
                ...(PAF_SLSData.existingPowerInterface && { existingPowerInterface: PAF_SLSData.existingPowerInterface }),
                ...(PAF_SLSData.newReservoir && { newReservoir: PAF_SLSData.newReservoir }),
                ...(PAF_SLSData.reservoirSize && { reservoirSize: PAF_SLSData.reservoirSize }),
                ...(PAF_SLSData.otherReservoirSize && { otherReservoirSize: PAF_SLSData.otherReservoirSize }),
                ...(PAF_SLSData.newReservoirNum && { newReservoirNum: PAF_SLSData.newReservoirNum }),
                ...(PAF_SLSData.typeMonitor && { typeMonitor: PAF_SLSData.typeMonitor }),
                ...(PAF_SLSData.driveMotorAmp && { driveMotorAmp: PAF_SLSData.driveMotorAmp }),
                ...(PAF_SLSData.driveMotorAmpNum && { driveMotorAmpNum: PAF_SLSData.driveMotorAmpNum }),
                ...(PAF_SLSData.driveTakeUpAir && { driveTakeUpAir: PAF_SLSData.driveTakeUpAir }),
                ...(PAF_SLSData.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_SLSData.driveTakeUpAirNum }),
                ...(PAF_SLSData.takeUpDistance && { takeUpDistance: PAF_SLSData.takeUpDistance }),
                ...(PAF_SLSData.takeUpDistanceNum && { takeUpDistanceNum: PAF_SLSData.takeUpDistanceNum }),
                ...(PAF_SLSData.driveTemp && { driveTemp: PAF_SLSData.driveTemp }),
                ...(PAF_SLSData.driveTempNum && { driveTempNum: PAF_SLSData.driveTempNum }),
                ...(PAF_SLSData.driveVibration && { driveVibration: PAF_SLSData.driveVibration }),
                ...(PAF_SLSData.driveVibrationNum && { driveVibrationNum: PAF_SLSData.driveVibrationNum }),
                ...(PAF_SLSData.dogPitch && { dogPitch: PAF_SLSData.dogPitch }),
                ...(PAF_SLSData.dogPitchNum && { dogPitchNum: PAF_SLSData.dogPitchNum }),
                ...(PAF_SLSData.paintMarker && { paintMarker: PAF_SLSData.paintMarker }),
                ...(PAF_SLSData.paintMarkerNum && { paintMarkerNum: PAF_SLSData.paintMarkerNum }),
                ...(PAF_SLSData.chainVision && { chainVision: PAF_SLSData.chainVision }),
                ...(PAF_SLSData.lubeVision && { lubeVision: PAF_SLSData.lubeVision }),
                ...(PAF_SLSData.trolleyVision && { trolleyVision: PAF_SLSData.trolleyVision }),
                ...(PAF_SLSData.trolleyDetect && { trolleyDetect: PAF_SLSData.trolleyDetect }),
                ...(PAF_SLSData.omniView && { omniView: PAF_SLSData.omniView }),
                ...(PAF_SLSData.dcuUpgradeNum && { dcuUpgradeNum: PAF_SLSData.dcuUpgradeNum }),
                ...(PAF_SLSData.itNameOne && { itNameOne: PAF_SLSData.itNameOne }),
                ...(PAF_SLSData.itIPOne && { itIPOne: PAF_SLSData.itIPOne }),
                ...(PAF_SLSData.itGatewayOne && { itGatewayOne: PAF_SLSData.itGatewayOne }),
                ...(PAF_SLSData.itSubnetOne && { itSubnetOne: PAF_SLSData.itSubnetOne }),
                ...(PAF_SLSData.itDNSOne && { itDNSOne: PAF_SLSData.itDNSOne }),
                ...(PAF_SLSData.itSMTPOne && { itSMTPOne: PAF_SLSData.itSMTPOne }),
                ...(PAF_SLSData.itNameTwo && { itNameTwo: PAF_SLSData.itNameTwo }),
                ...(PAF_SLSData.itIPTwo && { itIPTwo: PAF_SLSData.itIPTwo }),
                ...(PAF_SLSData.itGatewayTwo && { itGatewayTwo: PAF_SLSData.itGatewayTwo }),
                ...(PAF_SLSData.itSubnetTwo && { itSubnetTwo: PAF_SLSData.itSubnetTwo }),
                ...(PAF_SLSData.itDNSTwo && { itDNSTwo: PAF_SLSData.itDNSTwo }),
                ...(PAF_SLSData.itSMTPTwo && { itSMTPTwo: PAF_SLSData.itSMTPTwo }),
                ...(PAF_SLSData.itNameThree && { itNameThree: PAF_SLSData.itNameThree }),
                ...(PAF_SLSData.itIPThree && { itIPThree: PAF_SLSData.itIPThree }),
                ...(PAF_SLSData.itGatewayThree && { itGatewayThree: PAF_SLSData.itGatewayThree }),
                ...(PAF_SLSData.itSubnetThree && { itSubnetThree: PAF_SLSData.itSubnetThree }),
                ...(PAF_SLSData.itDNSThree && { itDNSThree: PAF_SLSData.itDNSThree }),
                ...(PAF_SLSData.itSMTPThree && { itSMTPThree: PAF_SLSData.itSMTPThree }),
                ...(PAF_SLSData.itAdditionalNotes && { itAdditionalNotes: PAF_SLSData.itAdditionalNotes }),
                ...(PAF_SLSData.piuDistance && { piuDistance: PAF_SLSData.piuDistance }),
                ...(PAF_SLSData.switchDistance && { switchDistance: PAF_SLSData.switchDistance }),
                ...(PAF_SLSData.ampPickup && { ampPickup: PAF_SLSData.ampPickup }),
                ...(PAF_SLSData.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_SLSData.fromAirTakeUpDistance }),
                ...(PAF_SLSData.specialControllerOptions && { specialControllerOptions: PAF_SLSData.specialControllerOptions })
            },
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