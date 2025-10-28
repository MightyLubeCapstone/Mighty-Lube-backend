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
            monitorData: {
                existingMonitor: PAF_9000IData.existingMonitor,
                newMonitor: PAF_9000IData.newMonitor,
                ...(PAF_9000IData.dcuStatus && { dcuStatus: PAF_9000IData.dcuStatus }),
                ...(PAF_9000IData.dcuNum && { dcuNum: PAF_9000IData.dcuNum }),
                ...(PAF_9000IData.existingWindows && { existingWindows: PAF_9000IData.existingWindows }),
                ...(PAF_9000IData.existingHeadUnit && { existingHeadUnit: PAF_9000IData.existingHeadUnit }),
                ...(PAF_9000IData.existingDCU && { existingDCU: PAF_9000IData.existingDCU }),
                ...(PAF_9000IData.existingPowerInterface && { existingPowerInterface: PAF_9000IData.existingPowerInterface }),
                ...(PAF_9000IData.newReservoir && { newReservoir: PAF_9000IData.newReservoir }),
                ...(PAF_9000IData.reservoirSize && { reservoirSize: PAF_9000IData.reservoirSize }),
                ...(PAF_9000IData.otherReservoirSize && { otherReservoirSize: PAF_9000IData.otherReservoirSize }),
                ...(PAF_9000IData.newReservoirNum && { newReservoirNum: PAF_9000IData.newReservoirNum }),
                ...(PAF_9000IData.typeMonitor && { typeMonitor: PAF_9000IData.typeMonitor }),
                ...(PAF_9000IData.driveMotorAmp && { driveMotorAmp: PAF_9000IData.driveMotorAmp }),
                ...(PAF_9000IData.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000IData.driveMotorAmpNum }),
                ...(PAF_9000IData.driveTakeUpAir && { driveTakeUpAir: PAF_9000IData.driveTakeUpAir }),
                ...(PAF_9000IData.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000IData.driveTakeUpAirNum }),
                ...(PAF_9000IData.takeUpDistance && { takeUpDistance: PAF_9000IData.takeUpDistance }),
                ...(PAF_9000IData.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000IData.takeUpDistanceNum }),
                ...(PAF_9000IData.driveTemp && { driveTemp: PAF_9000IData.driveTemp }),
                ...(PAF_9000IData.driveTempNum && { driveTempNum: PAF_9000IData.driveTempNum }),
                ...(PAF_9000IData.driveVibration && { driveVibration: PAF_9000IData.driveVibration }),
                ...(PAF_9000IData.driveVibrationNum && { driveVibrationNum: PAF_9000IData.driveVibrationNum }),
                ...(PAF_9000IData.dogPitch && { dogPitch: PAF_9000IData.dogPitch }),
                ...(PAF_9000IData.dogPitchNum && { dogPitchNum: PAF_9000IData.dogPitchNum }),
                ...(PAF_9000IData.paintMarker && { paintMarker: PAF_9000IData.paintMarker }),
                ...(PAF_9000IData.paintMarkerNum && { paintMarkerNum: PAF_9000IData.paintMarkerNum }),
                ...(PAF_9000IData.chainVision && { chainVision: PAF_9000IData.chainVision }),
                ...(PAF_9000IData.lubeVision && { lubeVision: PAF_9000IData.lubeVision }),
                ...(PAF_9000IData.trolleyVision && { trolleyVision: PAF_9000IData.trolleyVision }),
                ...(PAF_9000IData.trolleyDetect && { trolleyDetect: PAF_9000IData.trolleyDetect }),
                ...(PAF_9000IData.omniView && { omniView: PAF_9000IData.omniView }),
                ...(PAF_9000IData.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000IData.dcuUpgradeNum }),
                ...(PAF_9000IData.itNameOne && { itNameOne: PAF_9000IData.itNameOne }),
                ...(PAF_9000IData.itIPOne && { itIPOne: PAF_9000IData.itIPOne }),
                ...(PAF_9000IData.itGatewayOne && { itGatewayOne: PAF_9000IData.itGatewayOne }),
                ...(PAF_9000IData.itSubnetOne && { itSubnetOne: PAF_9000IData.itSubnetOne }),
                ...(PAF_9000IData.itDNSOne && { itDNSOne: PAF_9000IData.itDNSOne }),
                ...(PAF_9000IData.itSMTPOne && { itSMTPOne: PAF_9000IData.itSMTPOne }),
                ...(PAF_9000IData.itNameTwo && { itNameTwo: PAF_9000IData.itNameTwo }),
                ...(PAF_9000IData.itIPTwo && { itIPTwo: PAF_9000IData.itIPTwo }),
                ...(PAF_9000IData.itGatewayTwo && { itGatewayTwo: PAF_9000IData.itGatewayTwo }),
                ...(PAF_9000IData.itSubnetTwo && { itSubnetTwo: PAF_9000IData.itSubnetTwo }),
                ...(PAF_9000IData.itDNSTwo && { itDNSTwo: PAF_9000IData.itDNSTwo }),
                ...(PAF_9000IData.itSMTPTwo && { itSMTPTwo: PAF_9000IData.itSMTPTwo }),
                ...(PAF_9000IData.itNameThree && { itNameThree: PAF_9000IData.itNameThree }),
                ...(PAF_9000IData.itIPThree && { itIPThree: PAF_9000IData.itIPThree }),
                ...(PAF_9000IData.itGatewayThree && { itGatewayThree: PAF_9000IData.itGatewayThree }),
                ...(PAF_9000IData.itSubnetThree && { itSubnetThree: PAF_9000IData.itSubnetThree }),
                ...(PAF_9000IData.itDNSThree && { itDNSThree: PAF_9000IData.itDNSThree }),
                ...(PAF_9000IData.itSMTPThree && { itSMTPThree: PAF_9000IData.itSMTPThree }),
                ...(PAF_9000IData.itAdditionalNotes && { itAdditionalNotes: PAF_9000IData.itAdditionalNotes }),
                ...(PAF_9000IData.piuDistance && { piuDistance: PAF_9000IData.piuDistance }),
                ...(PAF_9000IData.switchDistance && { switchDistance: PAF_9000IData.switchDistance }),
                ...(PAF_9000IData.ampPickup && { ampPickup: PAF_9000IData.ampPickup }),
                ...(PAF_9000IData.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000IData.fromAirTakeUpDistance }),
                ...(PAF_9000IData.specialControllerOptions && { specialControllerOptions: PAF_9000IData.specialControllerOptions })
            },
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