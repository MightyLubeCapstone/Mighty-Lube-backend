const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000E = require("../models/PAF_9000E");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_9000EData.templateB.existingMonitor,
                newMonitor: PAF_9000EData.templateB.newMonitor,
                ...(PAF_9000EData.templateB.dcuStatus && { dcuStatus: PAF_9000EData.templateB.dcuStatus }),
                ...(PAF_9000EData.templateB.dcuNum && { dcuNum: PAF_9000EData.templateB.dcuNum }),
                ...(PAF_9000EData.templateB.existingWindows && { existingWindows: PAF_9000EData.templateB.existingWindows }),
                ...(PAF_9000EData.templateB.existingHeadUnit && { existingHeadUnit: PAF_9000EData.templateB.existingHeadUnit }),
                ...(PAF_9000EData.templateB.existingDCU && { existingDCU: PAF_9000EData.templateB.existingDCU }),
                ...(PAF_9000EData.templateB.existingPowerInterface && { existingPowerInterface: PAF_9000EData.templateB.existingPowerInterface }),
                ...(PAF_9000EData.templateB.newReservoir && { newReservoir: PAF_9000EData.templateB.newReservoir }),
                ...(PAF_9000EData.templateB.reservoirSize && { reservoirSize: PAF_9000EData.templateB.reservoirSize }),
                ...(PAF_9000EData.templateB.otherReservoirSize && { otherReservoirSize: PAF_9000EData.templateB.otherReservoirSize }),
                ...(PAF_9000EData.templateB.newReservoirNum && { newReservoirNum: PAF_9000EData.templateB.newReservoirNum }),
                ...(PAF_9000EData.templateB.typeMonitor && { typeMonitor: PAF_9000EData.templateB.typeMonitor }),
                ...(PAF_9000EData.templateB.driveMotorAmp && { driveMotorAmp: PAF_9000EData.templateB.driveMotorAmp }),
                ...(PAF_9000EData.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000EData.templateB.driveMotorAmpNum }),
                ...(PAF_9000EData.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_9000EData.templateB.driveTakeUpAir }),
                ...(PAF_9000EData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000EData.templateB.driveTakeUpAirNum }),
                ...(PAF_9000EData.templateB.takeUpDistance && { takeUpDistance: PAF_9000EData.templateB.takeUpDistance }),
                ...(PAF_9000EData.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000EData.templateB.takeUpDistanceNum }),
                ...(PAF_9000EData.templateB.driveTemp && { driveTemp: PAF_9000EData.templateB.driveTemp }),
                ...(PAF_9000EData.templateB.driveTempNum && { driveTempNum: PAF_9000EData.templateB.driveTempNum }),
                ...(PAF_9000EData.templateB.driveVibration && { driveVibration: PAF_9000EData.templateB.driveVibration }),
                ...(PAF_9000EData.templateB.driveVibrationNum && { driveVibrationNum: PAF_9000EData.templateB.driveVibrationNum }),
                ...(PAF_9000EData.templateB.dogPitch && { dogPitch: PAF_9000EData.templateB.dogPitch }),
                ...(PAF_9000EData.templateB.dogPitchNum && { dogPitchNum: PAF_9000EData.templateB.dogPitchNum }),
                ...(PAF_9000EData.templateB.paintMarker && { paintMarker: PAF_9000EData.templateB.paintMarker }),
                ...(PAF_9000EData.templateB.paintMarkerNum && { paintMarkerNum: PAF_9000EData.templateB.paintMarkerNum }),
                ...(PAF_9000EData.templateB.chainVision && { chainVision: PAF_9000EData.templateB.chainVision }),
                ...(PAF_9000EData.templateB.lubeVision && { lubeVision: PAF_9000EData.templateB.lubeVision }),
                ...(PAF_9000EData.templateB.trolleyVision && { trolleyVision: PAF_9000EData.templateB.trolleyVision }),
                ...(PAF_9000EData.templateB.trolleyDetect && { trolleyDetect: PAF_9000EData.templateB.trolleyDetect }),
                ...(PAF_9000EData.templateB.omniView && { omniView: PAF_9000EData.templateB.omniView }),
                ...(PAF_9000EData.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000EData.templateB.dcuUpgradeNum }),
                ...(PAF_9000EData.templateB.itNameOne && { itNameOne: PAF_9000EData.templateB.itNameOne }),
                ...(PAF_9000EData.templateB.itIPOne && { itIPOne: PAF_9000EData.templateB.itIPOne }),
                ...(PAF_9000EData.templateB.itGatewayOne && { itGatewayOne: PAF_9000EData.templateB.itGatewayOne }),
                ...(PAF_9000EData.templateB.itSubnetOne && { itSubnetOne: PAF_9000EData.templateB.itSubnetOne }),
                ...(PAF_9000EData.templateB.itDNSOne && { itDNSOne: PAF_9000EData.templateB.itDNSOne }),
                ...(PAF_9000EData.templateB.itSMTPOne && { itSMTPOne: PAF_9000EData.templateB.itSMTPOne }),
                ...(PAF_9000EData.templateB.itNameTwo && { itNameTwo: PAF_9000EData.templateB.itNameTwo }),
                ...(PAF_9000EData.templateB.itIPTwo && { itIPTwo: PAF_9000EData.templateB.itIPTwo }),
                ...(PAF_9000EData.templateB.itGatewayTwo && { itGatewayTwo: PAF_9000EData.templateB.itGatewayTwo }),
                ...(PAF_9000EData.templateB.itSubnetTwo && { itSubnetTwo: PAF_9000EData.templateB.itSubnetTwo }),
                ...(PAF_9000EData.templateB.itDNSTwo && { itDNSTwo: PAF_9000EData.templateB.itDNSTwo }),
                ...(PAF_9000EData.templateB.itSMTPTwo && { itSMTPTwo: PAF_9000EData.templateB.itSMTPTwo }),
                ...(PAF_9000EData.templateB.itNameThree && { itNameThree: PAF_9000EData.templateB.itNameThree }),
                ...(PAF_9000EData.templateB.itIPThree && { itIPThree: PAF_9000EData.templateB.itIPThree }),
                ...(PAF_9000EData.templateB.itGatewayThree && { itGatewayThree: PAF_9000EData.templateB.itGatewayThree }),
                ...(PAF_9000EData.templateB.itSubnetThree && { itSubnetThree: PAF_9000EData.templateB.itSubnetThree }),
                ...(PAF_9000EData.templateB.itDNSThree && { itDNSThree: PAF_9000EData.templateB.itDNSThree }),
                ...(PAF_9000EData.templateB.itSMTPThree && { itSMTPThree: PAF_9000EData.templateB.itSMTPThree }),
                ...(PAF_9000EData.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_9000EData.templateB.itAdditionalNotes }),
                ...(PAF_9000EData.templateB.piuDistance && { piuDistance: PAF_9000EData.templateB.piuDistance }),
                ...(PAF_9000EData.templateB.switchDistance && { switchDistance: PAF_9000EData.templateB.switchDistance }),
                ...(PAF_9000EData.templateB.ampPickup && { ampPickup: PAF_9000EData.templateB.ampPickup }),
                ...(PAF_9000EData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000EData.templateB.fromAirTakeUpDistance }),
                ...(PAF_9000EData.templateB.specialControllerOptions && { specialControllerOptions: PAF_9000EData.templateB.specialControllerOptions })
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