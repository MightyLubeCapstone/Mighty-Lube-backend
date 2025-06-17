const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000I = require("../models/PAF_9000I");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_9000IData, numRequested } = req.body;
        const order = new PAF_9000I({
            conveyorName: PAF_9000IData.conveyorName,
            chainSize: PAF_9000IData.chainSize,
            ...(PAF_9000IData.otherChainSize && { otherChainSize: PAF_9000IData.otherChainSize }),
            industrialChainManufacturer: PAF_9000IData.industrialChainManufacturer,
            ...(PAF_9000IData.otherChainManufacturer && { otherChainManufacturer: PAF_9000IData.otherChainManufacturer }),
            conveyorLength: PAF_9000IData.conveyorLength,
            conveyorLengthUnit: PAF_9000IData.conveyorLengthUnit,
            conveyorSpeed: PAF_9000IData.conveyorSpeed,
            conveyorSpeedUnit: PAF_9000IData.conveyorSpeedUnit,
            conveyorIndex: PAF_9000IData.conveyorIndex,
            travelDirection: PAF_9000IData.travelDirection,
            appEnviroment: PAF_9000IData.appEnviroment,
            ...(PAF_9000IData.ovenStatus && { ovenStatus: PAF_9000IData.ovenStatus }),
            ...(PAF_9000IData.ovenTemp && { ovenTemp: PAF_9000IData.ovenTemp }),
            surroundingTemp: PAF_9000IData.surroundingTemp,
            conveyorLoaded: PAF_9000IData.conveyorLoaded,
            conveyorSwing: PAF_9000IData.conveyorSwing,
            plantLayout: PAF_9000IData.plantLayout,
            operatingVoltSingle: PAF_9000IData.operatingVoltSingle,
            controlVoltSingle: PAF_9000IData.controlVoltSingle,
            monitorData: new templateA({
                existingMonitor: PAF_9000IData.templateA.existingMonitor,
                newMonitor: PAF_9000IData.templateA.newMonitor,
                ...(PAF_9000IData.templateA.dcuStatus && { dcuStatus: PAF_9000IData.templateA.dcuStatus }),
                ...(PAF_9000IData.templateA.dcuNum && { dcuNum: PAF_9000IData.templateA.dcuNum }),
                ...(PAF_9000IData.templateA.existingWindows && { existingWindows: PAF_9000IData.templateA.existingWindows }),
                ...(PAF_9000IData.templateA.existingHeadUnit && { existingHeadUnit: PAF_9000IData.templateA.existingHeadUnit }),
                ...(PAF_9000IData.templateA.existingDCU && { existingDCU: PAF_9000IData.templateA.existingDCU }),
                ...(PAF_9000IData.templateA.existingPowerInterface && { existingPowerInterface: PAF_9000IData.templateA.existingPowerInterface }),
                ...(PAF_9000IData.templateA.newReservoir && { newReservoir: PAF_9000IData.templateA.newReservoir }),
                ...(PAF_9000IData.templateA.reservoirSize && { reservoirSize: PAF_9000IData.templateA.reservoirSize }),
                ...(PAF_9000IData.templateA.otherReservoirSize && { otherReservoirSize: PAF_9000IData.templateA.otherReservoirSize }),
                ...(PAF_9000IData.templateA.newReservoirNum && { newReservoirNum: PAF_9000IData.templateA.newReservoirNum }),
                ...(PAF_9000IData.templateA.typeMonitor && { typeMonitor: PAF_9000IData.templateA.typeMonitor }),
                ...(PAF_9000IData.templateA.driveMotorAmp && { driveMotorAmp: PAF_9000IData.templateA.driveMotorAmp }),
                ...(PAF_9000IData.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000IData.templateA.driveMotorAmpNum }),
                ...(PAF_9000IData.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_9000IData.templateA.driveTakeUpAir }),
                ...(PAF_9000IData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000IData.templateA.driveTakeUpAirNum }),
                ...(PAF_9000IData.templateA.takeUpDistance && { takeUpDistance: PAF_9000IData.templateA.takeUpDistance }),
                ...(PAF_9000IData.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000IData.templateA.takeUpDistanceNum }),
                ...(PAF_9000IData.templateA.driveTemp && { driveTemp: PAF_9000IData.templateA.driveTemp }),
                ...(PAF_9000IData.templateA.driveTempNum && { driveTempNum: PAF_9000IData.templateA.driveTempNum }),
                ...(PAF_9000IData.templateA.driveVibration && { driveVibration: PAF_9000IData.templateA.driveVibration }),
                ...(PAF_9000IData.templateA.driveVibrationNum && { driveVibrationNum: PAF_9000IData.templateA.driveVibrationNum }),
                ...(PAF_9000IData.templateA.dogPitch && { dogPitch: PAF_9000IData.templateA.dogPitch }),
                ...(PAF_9000IData.templateA.dogPitchNum && { dogPitchNum: PAF_9000IData.templateA.dogPitchNum }),
                ...(PAF_9000IData.templateA.paintMarker && { paintMarker: PAF_9000IData.templateA.paintMarker }),
                ...(PAF_9000IData.templateA.paintMarkerNum && { paintMarkerNum: PAF_9000IData.templateA.paintMarkerNum }),
                ...(PAF_9000IData.templateA.chainVision && { chainVision: PAF_9000IData.templateA.chainVision }),
                ...(PAF_9000IData.templateA.lubeVision && { lubeVision: PAF_9000IData.templateA.lubeVision }),
                ...(PAF_9000IData.templateA.trolleyVision && { trolleyVision: PAF_9000IData.templateA.trolleyVision }),
                ...(PAF_9000IData.templateA.trolleyDetect && { trolleyDetect: PAF_9000IData.templateA.trolleyDetect }),
                ...(PAF_9000IData.templateA.omniView && { omniView: PAF_9000IData.templateA.omniView }),
                ...(PAF_9000IData.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000IData.templateA.dcuUpgradeNum }),
                ...(PAF_9000IData.templateA.itNameOne && { itNameOne: PAF_9000IData.templateA.itNameOne }),
                ...(PAF_9000IData.templateA.itIPOne && { itIPOne: PAF_9000IData.templateA.itIPOne }),
                ...(PAF_9000IData.templateA.itGatewayOne && { itGatewayOne: PAF_9000IData.templateA.itGatewayOne }),
                ...(PAF_9000IData.templateA.itSubnetOne && { itSubnetOne: PAF_9000IData.templateA.itSubnetOne }),
                ...(PAF_9000IData.templateA.itDNSOne && { itDNSOne: PAF_9000IData.templateA.itDNSOne }),
                ...(PAF_9000IData.templateA.itSMTPOne && { itSMTPOne: PAF_9000IData.templateA.itSMTPOne }),
                ...(PAF_9000IData.templateA.itNameTwo && { itNameTwo: PAF_9000IData.templateA.itNameTwo }),
                ...(PAF_9000IData.templateA.itIPTwo && { itIPTwo: PAF_9000IData.templateA.itIPTwo }),
                ...(PAF_9000IData.templateA.itGatewayTwo && { itGatewayTwo: PAF_9000IData.templateA.itGatewayTwo }),
                ...(PAF_9000IData.templateA.itSubnetTwo && { itSubnetTwo: PAF_9000IData.templateA.itSubnetTwo }),
                ...(PAF_9000IData.templateA.itDNSTwo && { itDNSTwo: PAF_9000IData.templateA.itDNSTwo }),
                ...(PAF_9000IData.templateA.itSMTPTwo && { itSMTPTwo: PAF_9000IData.templateA.itSMTPTwo }),
                ...(PAF_9000IData.templateA.itNameThree && { itNameThree: PAF_9000IData.templateA.itNameThree }),
                ...(PAF_9000IData.templateA.itIPThree && { itIPThree: PAF_9000IData.templateA.itIPThree }),
                ...(PAF_9000IData.templateA.itGatewayThree && { itGatewayThree: PAF_9000IData.templateA.itGatewayThree }),
                ...(PAF_9000IData.templateA.itSubnetThree && { itSubnetThree: PAF_9000IData.templateA.itSubnetThree }),
                ...(PAF_9000IData.templateA.itDNSThree && { itDNSThree: PAF_9000IData.templateA.itDNSThree }),
                ...(PAF_9000IData.templateA.itSMTPThree && { itSMTPThree: PAF_9000IData.templateA.itSMTPThree }),
                ...(PAF_9000IData.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_9000IData.templateA.itAdditionalNotes }),
                ...(PAF_9000IData.templateA.piuDistance && { piuDistance: PAF_9000IData.templateA.piuDistance }),
                ...(PAF_9000IData.templateA.switchDistance && { switchDistance: PAF_9000IData.templateA.switchDistance }),
                ...(PAF_9000IData.templateA.ampPickup && { ampPickup: PAF_9000IData.templateA.ampPickup }),
                ...(PAF_9000IData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000IData.templateA.fromAirTakeUpDistance }),
                ...(PAF_9000IData.templateA.specialControllerOptions && { specialControllerOptions: PAF_9000IData.templateA.specialControllerOptions })
            }),
            wheelOpenType: PAF_9000IData.wheelOpenType,
            wheelClosedType: PAF_9000IData.wheelClosedType,
            powerChainStatus: PAF_9000IData.powerChainStatus,
            chainPinStatus: PAF_9000IData.chainPinStatus,
            catDriveStatus: PAF_9000IData.catDriveStatus,
            catDriveNum: PAF_9000IData.catDriveNum,
            railLubeStatus: PAF_9000IData.railLubeStatus,
            externalLubeStatus: PAF_9000IData.externalLubeStatus,
            lubeBrand: PAF_9000IData.lubeBrand,
            lubeType: PAF_9000IData.lubeType,
            lubeViscosity: PAF_9000IData.lubeViscosity,
            sideLubeStatus: PAF_9000IData.sideLubeStatus,
            topLubeStatus: PAF_9000IData.topLubeStatus,
            chainCleanStatus: PAF_9000IData.chainCleanStatus,
            wireMeasurementUnitType: PAF_9000IData.wireMeasurementUnitType,
            twoConductor: PAF_9000IData.twoConductor,
            fourConductor: PAF_9000IData.fourConductor,
            sevenConductor: PAF_9000IData.sevenConductor,
            twelveConductor: PAF_9000IData.twelveConductor,
            junctionBoxNum: PAF_9000IData.junctionBoxNum,
            pfUnitType: PAF_9000IData.pfUnitType,
            pfOverheadL: PAF_9000IData.pfOverheadL,
            pfOverheadG: PAF_9000IData.pfOverheadG,
            pfOverheadH: PAF_9000IData.pfOverheadH,
            pfInvertedB: PAF_9000IData.pfInvertedB,
            pfInvertedG: PAF_9000IData.pfInvertedG,
            pfInvertedH: PAF_9000IData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_9000I"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_9000I entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;