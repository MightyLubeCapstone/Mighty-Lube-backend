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
            monitorData: new templateA({
                existingMonitor: PAF_9000EData.templateA.existingMonitor,
                newMonitor: PAF_9000EData.templateA.newMonitor,
                ...(PAF_9000EData.templateA.dcuStatus && { dcuStatus: PAF_9000EData.templateA.dcuStatus }),
                ...(PAF_9000EData.templateA.dcuNum && { dcuNum: PAF_9000EData.templateA.dcuNum }),
                ...(PAF_9000EData.templateA.existingWindows && { existingWindows: PAF_9000EData.templateA.existingWindows }),
                ...(PAF_9000EData.templateA.existingHeadUnit && { existingHeadUnit: PAF_9000EData.templateA.existingHeadUnit }),
                ...(PAF_9000EData.templateA.existingDCU && { existingDCU: PAF_9000EData.templateA.existingDCU }),
                ...(PAF_9000EData.templateA.existingPowerInterface && { existingPowerInterface: PAF_9000EData.templateA.existingPowerInterface }),
                ...(PAF_9000EData.templateA.newReservoir && { newReservoir: PAF_9000EData.templateA.newReservoir }),
                ...(PAF_9000EData.templateA.reservoirSize && { reservoirSize: PAF_9000EData.templateA.reservoirSize }),
                ...(PAF_9000EData.templateA.otherReservoirSize && { otherReservoirSize: PAF_9000EData.templateA.otherReservoirSize }),
                ...(PAF_9000EData.templateA.newReservoirNum && { newReservoirNum: PAF_9000EData.templateA.newReservoirNum }),
                ...(PAF_9000EData.templateA.typeMonitor && { typeMonitor: PAF_9000EData.templateA.typeMonitor }),
                ...(PAF_9000EData.templateA.driveMotorAmp && { driveMotorAmp: PAF_9000EData.templateA.driveMotorAmp }),
                ...(PAF_9000EData.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000EData.templateA.driveMotorAmpNum }),
                ...(PAF_9000EData.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_9000EData.templateA.driveTakeUpAir }),
                ...(PAF_9000EData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000EData.templateA.driveTakeUpAirNum }),
                ...(PAF_9000EData.templateA.takeUpDistance && { takeUpDistance: PAF_9000EData.templateA.takeUpDistance }),
                ...(PAF_9000EData.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000EData.templateA.takeUpDistanceNum }),
                ...(PAF_9000EData.templateA.driveTemp && { driveTemp: PAF_9000EData.templateA.driveTemp }),
                ...(PAF_9000EData.templateA.driveTempNum && { driveTempNum: PAF_9000EData.templateA.driveTempNum }),
                ...(PAF_9000EData.templateA.driveVibration && { driveVibration: PAF_9000EData.templateA.driveVibration }),
                ...(PAF_9000EData.templateA.driveVibrationNum && { driveVibrationNum: PAF_9000EData.templateA.driveVibrationNum }),
                ...(PAF_9000EData.templateA.dogPitch && { dogPitch: PAF_9000EData.templateA.dogPitch }),
                ...(PAF_9000EData.templateA.dogPitchNum && { dogPitchNum: PAF_9000EData.templateA.dogPitchNum }),
                ...(PAF_9000EData.templateA.paintMarker && { paintMarker: PAF_9000EData.templateA.paintMarker }),
                ...(PAF_9000EData.templateA.paintMarkerNum && { paintMarkerNum: PAF_9000EData.templateA.paintMarkerNum }),
                ...(PAF_9000EData.templateA.chainVision && { chainVision: PAF_9000EData.templateA.chainVision }),
                ...(PAF_9000EData.templateA.lubeVision && { lubeVision: PAF_9000EData.templateA.lubeVision }),
                ...(PAF_9000EData.templateA.trolleyVision && { trolleyVision: PAF_9000EData.templateA.trolleyVision }),
                ...(PAF_9000EData.templateA.trolleyDetect && { trolleyDetect: PAF_9000EData.templateA.trolleyDetect }),
                ...(PAF_9000EData.templateA.omniView && { omniView: PAF_9000EData.templateA.omniView }),
                ...(PAF_9000EData.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000EData.templateA.dcuUpgradeNum }),
                ...(PAF_9000EData.templateA.itNameOne && { itNameOne: PAF_9000EData.templateA.itNameOne }),
                ...(PAF_9000EData.templateA.itIPOne && { itIPOne: PAF_9000EData.templateA.itIPOne }),
                ...(PAF_9000EData.templateA.itGatewayOne && { itGatewayOne: PAF_9000EData.templateA.itGatewayOne }),
                ...(PAF_9000EData.templateA.itSubnetOne && { itSubnetOne: PAF_9000EData.templateA.itSubnetOne }),
                ...(PAF_9000EData.templateA.itDNSOne && { itDNSOne: PAF_9000EData.templateA.itDNSOne }),
                ...(PAF_9000EData.templateA.itSMTPOne && { itSMTPOne: PAF_9000EData.templateA.itSMTPOne }),
                ...(PAF_9000EData.templateA.itNameTwo && { itNameTwo: PAF_9000EData.templateA.itNameTwo }),
                ...(PAF_9000EData.templateA.itIPTwo && { itIPTwo: PAF_9000EData.templateA.itIPTwo }),
                ...(PAF_9000EData.templateA.itGatewayTwo && { itGatewayTwo: PAF_9000EData.templateA.itGatewayTwo }),
                ...(PAF_9000EData.templateA.itSubnetTwo && { itSubnetTwo: PAF_9000EData.templateA.itSubnetTwo }),
                ...(PAF_9000EData.templateA.itDNSTwo && { itDNSTwo: PAF_9000EData.templateA.itDNSTwo }),
                ...(PAF_9000EData.templateA.itSMTPTwo && { itSMTPTwo: PAF_9000EData.templateA.itSMTPTwo }),
                ...(PAF_9000EData.templateA.itNameThree && { itNameThree: PAF_9000EData.templateA.itNameThree }),
                ...(PAF_9000EData.templateA.itIPThree && { itIPThree: PAF_9000EData.templateA.itIPThree }),
                ...(PAF_9000EData.templateA.itGatewayThree && { itGatewayThree: PAF_9000EData.templateA.itGatewayThree }),
                ...(PAF_9000EData.templateA.itSubnetThree && { itSubnetThree: PAF_9000EData.templateA.itSubnetThree }),
                ...(PAF_9000EData.templateA.itDNSThree && { itDNSThree: PAF_9000EData.templateA.itDNSThree }),
                ...(PAF_9000EData.templateA.itSMTPThree && { itSMTPThree: PAF_9000EData.templateA.itSMTPThree }),
                ...(PAF_9000EData.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_9000EData.templateA.itAdditionalNotes }),
                ...(PAF_9000EData.templateA.piuDistance && { piuDistance: PAF_9000EData.templateA.piuDistance }),
                ...(PAF_9000EData.templateA.switchDistance && { switchDistance: PAF_9000EData.templateA.switchDistance }),
                ...(PAF_9000EData.templateA.ampPickup && { ampPickup: PAF_9000EData.templateA.ampPickup }),
                ...(PAF_9000EData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000EData.templateA.fromAirTakeUpDistance }),
                ...(PAF_9000EData.templateA.specialControllerOptions && { specialControllerOptions: PAF_9000EData.templateA.specialControllerOptions })
            }),
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