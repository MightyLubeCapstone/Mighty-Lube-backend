const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000E = require("../models/PAF_9000E");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_9000EData, numRequested } = req.body;
        const order = new PAF_9000E({
            conveyorName: PAF_9000EData.conveyorName,
            chainSize: PAF_9000EData.chainSize,
            ...(PAF_9000EData.otherChainSize && { otherChainSize: PAF_9000EData.otherChainSize }),
            industrialChainManufacturer: PAF_9000EData.industrialChainManufacturer,
            ...(PAF_9000EData.otherChainManufacturer && { otherChainManufacturer: PAF_9000EData.otherChainManufacturer }),
            conveyorLength: PAF_9000EData.conveyorLength,
            conveyorLengthUnit: PAF_9000EData.conveyorLengthUnit,
            conveyorSpeed: PAF_9000EData.conveyorSpeed,
            conveyorSpeedUnit: PAF_9000EData.conveyorSpeedUnit,
            conveyorIndex: PAF_9000EData.conveyorIndex,
            travelDirection: PAF_9000EData.travelDirection,
            appEnviroment: PAF_9000EData.appEnviroment,
            ...(PAF_9000EData.ovenStatus && { ovenStatus: PAF_9000EData.ovenStatus }),
            ...(PAF_9000EData.ovenTemp && { ovenTemp: PAF_9000EData.ovenTemp }),
            surroundingTemp: PAF_9000EData.surroundingTemp,
            conveyorLoaded: PAF_9000EData.conveyorLoaded,
            conveyorSwing: PAF_9000EData.conveyorSwing,
            plantLayout: PAF_9000EData.plantLayout,
            operatingVoltSingle: PAF_9000EData.operatingVoltSingle,
            controlVoltSingle: PAF_9000EData.controlVoltSingle,
            monitorData: {
                existingMonitor: PAF_9000EData.existingMonitor,
                newMonitor: PAF_9000EData.newMonitor,
                ...(PAF_9000EData.dcuStatus && { dcuStatus: PAF_9000EData.dcuStatus }),
                ...(PAF_9000EData.dcuNum && { dcuNum: PAF_9000EData.dcuNum }),
                ...(PAF_9000EData.existingWindows && { existingWindows: PAF_9000EData.existingWindows }),
                ...(PAF_9000EData.existingHeadUnit && { existingHeadUnit: PAF_9000EData.existingHeadUnit }),
                ...(PAF_9000EData.existingDCU && { existingDCU: PAF_9000EData.existingDCU }),
                ...(PAF_9000EData.existingPowerInterface && { existingPowerInterface: PAF_9000EData.existingPowerInterface }),
                ...(PAF_9000EData.newReservoir && { newReservoir: PAF_9000EData.newReservoir }),
                ...(PAF_9000EData.reservoirSize && { reservoirSize: PAF_9000EData.reservoirSize }),
                ...(PAF_9000EData.otherReservoirSize && { otherReservoirSize: PAF_9000EData.otherReservoirSize }),
                ...(PAF_9000EData.newReservoirNum && { newReservoirNum: PAF_9000EData.newReservoirNum }),
                ...(PAF_9000EData.typeMonitor && { typeMonitor: PAF_9000EData.typeMonitor }),
                ...(PAF_9000EData.driveMotorAmp && { driveMotorAmp: PAF_9000EData.driveMotorAmp }),
                ...(PAF_9000EData.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000EData.driveMotorAmpNum }),
                ...(PAF_9000EData.driveTakeUpAir && { driveTakeUpAir: PAF_9000EData.driveTakeUpAir }),
                ...(PAF_9000EData.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000EData.driveTakeUpAirNum }),
                ...(PAF_9000EData.takeUpDistance && { takeUpDistance: PAF_9000EData.takeUpDistance }),
                ...(PAF_9000EData.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000EData.takeUpDistanceNum }),
                ...(PAF_9000EData.driveTemp && { driveTemp: PAF_9000EData.driveTemp }),
                ...(PAF_9000EData.driveTempNum && { driveTempNum: PAF_9000EData.driveTempNum }),
                ...(PAF_9000EData.driveVibration && { driveVibration: PAF_9000EData.driveVibration }),
                ...(PAF_9000EData.driveVibrationNum && { driveVibrationNum: PAF_9000EData.driveVibrationNum }),
                ...(PAF_9000EData.dogPitch && { dogPitch: PAF_9000EData.dogPitch }),
                ...(PAF_9000EData.dogPitchNum && { dogPitchNum: PAF_9000EData.dogPitchNum }),
                ...(PAF_9000EData.paintMarker && { paintMarker: PAF_9000EData.paintMarker }),
                ...(PAF_9000EData.paintMarkerNum && { paintMarkerNum: PAF_9000EData.paintMarkerNum }),
                ...(PAF_9000EData.chainVision && { chainVision: PAF_9000EData.chainVision }),
                ...(PAF_9000EData.lubeVision && { lubeVision: PAF_9000EData.lubeVision }),
                ...(PAF_9000EData.trolleyVision && { trolleyVision: PAF_9000EData.trolleyVision }),
                ...(PAF_9000EData.trolleyDetect && { trolleyDetect: PAF_9000EData.trolleyDetect }),
                ...(PAF_9000EData.omniView && { omniView: PAF_9000EData.omniView }),
                ...(PAF_9000EData.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000EData.dcuUpgradeNum }),
                ...(PAF_9000EData.itNameOne && { itNameOne: PAF_9000EData.itNameOne }),
                ...(PAF_9000EData.itIPOne && { itIPOne: PAF_9000EData.itIPOne }),
                ...(PAF_9000EData.itGatewayOne && { itGatewayOne: PAF_9000EData.itGatewayOne }),
                ...(PAF_9000EData.itSubnetOne && { itSubnetOne: PAF_9000EData.itSubnetOne }),
                ...(PAF_9000EData.itDNSOne && { itDNSOne: PAF_9000EData.itDNSOne }),
                ...(PAF_9000EData.itSMTPOne && { itSMTPOne: PAF_9000EData.itSMTPOne }),
                ...(PAF_9000EData.itNameTwo && { itNameTwo: PAF_9000EData.itNameTwo }),
                ...(PAF_9000EData.itIPTwo && { itIPTwo: PAF_9000EData.itIPTwo }),
                ...(PAF_9000EData.itGatewayTwo && { itGatewayTwo: PAF_9000EData.itGatewayTwo }),
                ...(PAF_9000EData.itSubnetTwo && { itSubnetTwo: PAF_9000EData.itSubnetTwo }),
                ...(PAF_9000EData.itDNSTwo && { itDNSTwo: PAF_9000EData.itDNSTwo }),
                ...(PAF_9000EData.itSMTPTwo && { itSMTPTwo: PAF_9000EData.itSMTPTwo }),
                ...(PAF_9000EData.itNameThree && { itNameThree: PAF_9000EData.itNameThree }),
                ...(PAF_9000EData.itIPThree && { itIPThree: PAF_9000EData.itIPThree }),
                ...(PAF_9000EData.itGatewayThree && { itGatewayThree: PAF_9000EData.itGatewayThree }),
                ...(PAF_9000EData.itSubnetThree && { itSubnetThree: PAF_9000EData.itSubnetThree }),
                ...(PAF_9000EData.itDNSThree && { itDNSThree: PAF_9000EData.itDNSThree }),
                ...(PAF_9000EData.itSMTPThree && { itSMTPThree: PAF_9000EData.itSMTPThree }),
                ...(PAF_9000EData.itAdditionalNotes && { itAdditionalNotes: PAF_9000EData.itAdditionalNotes }),
                ...(PAF_9000EData.piuDistance && { piuDistance: PAF_9000EData.piuDistance }),
                ...(PAF_9000EData.switchDistance && { switchDistance: PAF_9000EData.switchDistance }),
                ...(PAF_9000EData.ampPickup && { ampPickup: PAF_9000EData.ampPickup }),
                ...(PAF_9000EData.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000EData.fromAirTakeUpDistance }),
                ...(PAF_9000EData.specialControllerOptions && { specialControllerOptions: PAF_9000EData.specialControllerOptions })
            },
            wheelOpenType: PAF_9000EData.wheelOpenType,
            wheelClosedType: PAF_9000EData.wheelClosedType,
            powerChainStatus: PAF_9000EData.powerChainStatus,
            chainPinStatus: PAF_9000EData.chainPinStatus,
            catDriveStatus: PAF_9000EData.catDriveStatus,
            catDriveNum: PAF_9000EData.catDriveNum,
            railLubeStatus: PAF_9000EData.railLubeStatus,
            externalLubeStatus: PAF_9000EData.externalLubeStatus,
            lubeBrand: PAF_9000EData.lubeBrand,
            lubeType: PAF_9000EData.lubeType,
            lubeViscosity: PAF_9000EData.lubeViscosity,
            sideLubeStatus: PAF_9000EData.sideLubeStatus,
            topLubeStatus: PAF_9000EData.topLubeStatus,
            chainCleanStatus: PAF_9000EData.chainCleanStatus,
            wireMeasurementUnitType: PAF_9000EData.wireMeasurementUnitType,
            twoConductor: PAF_9000EData.twoConductor,
            fourConductor: PAF_9000EData.fourConductor,
            sevenConductor: PAF_9000EData.sevenConductor,
            twelveConductor: PAF_9000EData.twelveConductor,
            junctionBoxNum: PAF_9000EData.junctionBoxNum,
            pfUnitType: PAF_9000EData.pfUnitType,
            pfOverheadL: PAF_9000EData.pfOverheadL,
            pfOverheadG: PAF_9000EData.pfOverheadG,
            pfOverheadH: PAF_9000EData.pfOverheadH,
            pfInvertedB: PAF_9000EData.pfInvertedB,
            pfInvertedG: PAF_9000EData.pfInvertedG,
            pfInvertedH: PAF_9000EData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_9000E"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_9000E entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;