const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_SLS = require("../models/PAF_SLS");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_SLSData.templateB.existingMonitor,
                newMonitor: PAF_SLSData.templateB.newMonitor,
                ...(PAF_SLSData.templateB.dcuStatus && { dcuStatus: PAF_SLSData.templateB.dcuStatus }),
                ...(PAF_SLSData.templateB.dcuNum && { dcuNum: PAF_SLSData.templateB.dcuNum }),
                ...(PAF_SLSData.templateB.existingWindows && { existingWindows: PAF_SLSData.templateB.existingWindows }),
                ...(PAF_SLSData.templateB.existingHeadUnit && { existingHeadUnit: PAF_SLSData.templateB.existingHeadUnit }),
                ...(PAF_SLSData.templateB.existingDCU && { existingDCU: PAF_SLSData.templateB.existingDCU }),
                ...(PAF_SLSData.templateB.existingPowerInterface && { existingPowerInterface: PAF_SLSData.templateB.existingPowerInterface }),
                ...(PAF_SLSData.templateB.newReservoir && { newReservoir: PAF_SLSData.templateB.newReservoir }),
                ...(PAF_SLSData.templateB.reservoirSize && { reservoirSize: PAF_SLSData.templateB.reservoirSize }),
                ...(PAF_SLSData.templateB.otherReservoirSize && { otherReservoirSize: PAF_SLSData.templateB.otherReservoirSize }),
                ...(PAF_SLSData.templateB.newReservoirNum && { newReservoirNum: PAF_SLSData.templateB.newReservoirNum }),
                ...(PAF_SLSData.templateB.typeMonitor && { typeMonitor: PAF_SLSData.templateB.typeMonitor }),
                ...(PAF_SLSData.templateB.driveMotorAmp && { driveMotorAmp: PAF_SLSData.templateB.driveMotorAmp }),
                ...(PAF_SLSData.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_SLSData.templateB.driveMotorAmpNum }),
                ...(PAF_SLSData.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_SLSData.templateB.driveTakeUpAir }),
                ...(PAF_SLSData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_SLSData.templateB.driveTakeUpAirNum }),
                ...(PAF_SLSData.templateB.takeUpDistance && { takeUpDistance: PAF_SLSData.templateB.takeUpDistance }),
                ...(PAF_SLSData.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_SLSData.templateB.takeUpDistanceNum }),
                ...(PAF_SLSData.templateB.driveTemp && { driveTemp: PAF_SLSData.templateB.driveTemp }),
                ...(PAF_SLSData.templateB.driveTempNum && { driveTempNum: PAF_SLSData.templateB.driveTempNum }),
                ...(PAF_SLSData.templateB.driveVibration && { driveVibration: PAF_SLSData.templateB.driveVibration }),
                ...(PAF_SLSData.templateB.driveVibrationNum && { driveVibrationNum: PAF_SLSData.templateB.driveVibrationNum }),
                ...(PAF_SLSData.templateB.dogPitch && { dogPitch: PAF_SLSData.templateB.dogPitch }),
                ...(PAF_SLSData.templateB.dogPitchNum && { dogPitchNum: PAF_SLSData.templateB.dogPitchNum }),
                ...(PAF_SLSData.templateB.paintMarker && { paintMarker: PAF_SLSData.templateB.paintMarker }),
                ...(PAF_SLSData.templateB.paintMarkerNum && { paintMarkerNum: PAF_SLSData.templateB.paintMarkerNum }),
                ...(PAF_SLSData.templateB.chainVision && { chainVision: PAF_SLSData.templateB.chainVision }),
                ...(PAF_SLSData.templateB.lubeVision && { lubeVision: PAF_SLSData.templateB.lubeVision }),
                ...(PAF_SLSData.templateB.trolleyVision && { trolleyVision: PAF_SLSData.templateB.trolleyVision }),
                ...(PAF_SLSData.templateB.trolleyDetect && { trolleyDetect: PAF_SLSData.templateB.trolleyDetect }),
                ...(PAF_SLSData.templateB.omniView && { omniView: PAF_SLSData.templateB.omniView }),
                ...(PAF_SLSData.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_SLSData.templateB.dcuUpgradeNum }),
                ...(PAF_SLSData.templateB.itNameOne && { itNameOne: PAF_SLSData.templateB.itNameOne }),
                ...(PAF_SLSData.templateB.itIPOne && { itIPOne: PAF_SLSData.templateB.itIPOne }),
                ...(PAF_SLSData.templateB.itGatewayOne && { itGatewayOne: PAF_SLSData.templateB.itGatewayOne }),
                ...(PAF_SLSData.templateB.itSubnetOne && { itSubnetOne: PAF_SLSData.templateB.itSubnetOne }),
                ...(PAF_SLSData.templateB.itDNSOne && { itDNSOne: PAF_SLSData.templateB.itDNSOne }),
                ...(PAF_SLSData.templateB.itSMTPOne && { itSMTPOne: PAF_SLSData.templateB.itSMTPOne }),
                ...(PAF_SLSData.templateB.itNameTwo && { itNameTwo: PAF_SLSData.templateB.itNameTwo }),
                ...(PAF_SLSData.templateB.itIPTwo && { itIPTwo: PAF_SLSData.templateB.itIPTwo }),
                ...(PAF_SLSData.templateB.itGatewayTwo && { itGatewayTwo: PAF_SLSData.templateB.itGatewayTwo }),
                ...(PAF_SLSData.templateB.itSubnetTwo && { itSubnetTwo: PAF_SLSData.templateB.itSubnetTwo }),
                ...(PAF_SLSData.templateB.itDNSTwo && { itDNSTwo: PAF_SLSData.templateB.itDNSTwo }),
                ...(PAF_SLSData.templateB.itSMTPTwo && { itSMTPTwo: PAF_SLSData.templateB.itSMTPTwo }),
                ...(PAF_SLSData.templateB.itNameThree && { itNameThree: PAF_SLSData.templateB.itNameThree }),
                ...(PAF_SLSData.templateB.itIPThree && { itIPThree: PAF_SLSData.templateB.itIPThree }),
                ...(PAF_SLSData.templateB.itGatewayThree && { itGatewayThree: PAF_SLSData.templateB.itGatewayThree }),
                ...(PAF_SLSData.templateB.itSubnetThree && { itSubnetThree: PAF_SLSData.templateB.itSubnetThree }),
                ...(PAF_SLSData.templateB.itDNSThree && { itDNSThree: PAF_SLSData.templateB.itDNSThree }),
                ...(PAF_SLSData.templateB.itSMTPThree && { itSMTPThree: PAF_SLSData.templateB.itSMTPThree }),
                ...(PAF_SLSData.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_SLSData.templateB.itAdditionalNotes }),
                ...(PAF_SLSData.templateB.piuDistance && { piuDistance: PAF_SLSData.templateB.piuDistance }),
                ...(PAF_SLSData.templateB.switchDistance && { switchDistance: PAF_SLSData.templateB.switchDistance }),
                ...(PAF_SLSData.templateB.ampPickup && { ampPickup: PAF_SLSData.templateB.ampPickup }),
                ...(PAF_SLSData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_SLSData.templateB.fromAirTakeUpDistance }),
                ...(PAF_SLSData.templateB.specialControllerOptions && { specialControllerOptions: PAF_SLSData.templateB.specialControllerOptions })
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