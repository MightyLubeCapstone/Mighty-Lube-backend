const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000I = require("../models/PAF_9000I");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_9000IData.templateB.existingMonitor,
                newMonitor: PAF_9000IData.templateB.newMonitor,
                ...(PAF_9000IData.templateB.dcuStatus && { dcuStatus: PAF_9000IData.templateB.dcuStatus }),
                ...(PAF_9000IData.templateB.dcuNum && { dcuNum: PAF_9000IData.templateB.dcuNum }),
                ...(PAF_9000IData.templateB.existingWindows && { existingWindows: PAF_9000IData.templateB.existingWindows }),
                ...(PAF_9000IData.templateB.existingHeadUnit && { existingHeadUnit: PAF_9000IData.templateB.existingHeadUnit }),
                ...(PAF_9000IData.templateB.existingDCU && { existingDCU: PAF_9000IData.templateB.existingDCU }),
                ...(PAF_9000IData.templateB.existingPowerInterface && { existingPowerInterface: PAF_9000IData.templateB.existingPowerInterface }),
                ...(PAF_9000IData.templateB.newReservoir && { newReservoir: PAF_9000IData.templateB.newReservoir }),
                ...(PAF_9000IData.templateB.reservoirSize && { reservoirSize: PAF_9000IData.templateB.reservoirSize }),
                ...(PAF_9000IData.templateB.otherReservoirSize && { otherReservoirSize: PAF_9000IData.templateB.otherReservoirSize }),
                ...(PAF_9000IData.templateB.newReservoirNum && { newReservoirNum: PAF_9000IData.templateB.newReservoirNum }),
                ...(PAF_9000IData.templateB.typeMonitor && { typeMonitor: PAF_9000IData.templateB.typeMonitor }),
                ...(PAF_9000IData.templateB.driveMotorAmp && { driveMotorAmp: PAF_9000IData.templateB.driveMotorAmp }),
                ...(PAF_9000IData.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000IData.templateB.driveMotorAmpNum }),
                ...(PAF_9000IData.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_9000IData.templateB.driveTakeUpAir }),
                ...(PAF_9000IData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000IData.templateB.driveTakeUpAirNum }),
                ...(PAF_9000IData.templateB.takeUpDistance && { takeUpDistance: PAF_9000IData.templateB.takeUpDistance }),
                ...(PAF_9000IData.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000IData.templateB.takeUpDistanceNum }),
                ...(PAF_9000IData.templateB.driveTemp && { driveTemp: PAF_9000IData.templateB.driveTemp }),
                ...(PAF_9000IData.templateB.driveTempNum && { driveTempNum: PAF_9000IData.templateB.driveTempNum }),
                ...(PAF_9000IData.templateB.driveVibration && { driveVibration: PAF_9000IData.templateB.driveVibration }),
                ...(PAF_9000IData.templateB.driveVibrationNum && { driveVibrationNum: PAF_9000IData.templateB.driveVibrationNum }),
                ...(PAF_9000IData.templateB.dogPitch && { dogPitch: PAF_9000IData.templateB.dogPitch }),
                ...(PAF_9000IData.templateB.dogPitchNum && { dogPitchNum: PAF_9000IData.templateB.dogPitchNum }),
                ...(PAF_9000IData.templateB.paintMarker && { paintMarker: PAF_9000IData.templateB.paintMarker }),
                ...(PAF_9000IData.templateB.paintMarkerNum && { paintMarkerNum: PAF_9000IData.templateB.paintMarkerNum }),
                ...(PAF_9000IData.templateB.chainVision && { chainVision: PAF_9000IData.templateB.chainVision }),
                ...(PAF_9000IData.templateB.lubeVision && { lubeVision: PAF_9000IData.templateB.lubeVision }),
                ...(PAF_9000IData.templateB.trolleyVision && { trolleyVision: PAF_9000IData.templateB.trolleyVision }),
                ...(PAF_9000IData.templateB.trolleyDetect && { trolleyDetect: PAF_9000IData.templateB.trolleyDetect }),
                ...(PAF_9000IData.templateB.omniView && { omniView: PAF_9000IData.templateB.omniView }),
                ...(PAF_9000IData.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000IData.templateB.dcuUpgradeNum }),
                ...(PAF_9000IData.templateB.itNameOne && { itNameOne: PAF_9000IData.templateB.itNameOne }),
                ...(PAF_9000IData.templateB.itIPOne && { itIPOne: PAF_9000IData.templateB.itIPOne }),
                ...(PAF_9000IData.templateB.itGatewayOne && { itGatewayOne: PAF_9000IData.templateB.itGatewayOne }),
                ...(PAF_9000IData.templateB.itSubnetOne && { itSubnetOne: PAF_9000IData.templateB.itSubnetOne }),
                ...(PAF_9000IData.templateB.itDNSOne && { itDNSOne: PAF_9000IData.templateB.itDNSOne }),
                ...(PAF_9000IData.templateB.itSMTPOne && { itSMTPOne: PAF_9000IData.templateB.itSMTPOne }),
                ...(PAF_9000IData.templateB.itNameTwo && { itNameTwo: PAF_9000IData.templateB.itNameTwo }),
                ...(PAF_9000IData.templateB.itIPTwo && { itIPTwo: PAF_9000IData.templateB.itIPTwo }),
                ...(PAF_9000IData.templateB.itGatewayTwo && { itGatewayTwo: PAF_9000IData.templateB.itGatewayTwo }),
                ...(PAF_9000IData.templateB.itSubnetTwo && { itSubnetTwo: PAF_9000IData.templateB.itSubnetTwo }),
                ...(PAF_9000IData.templateB.itDNSTwo && { itDNSTwo: PAF_9000IData.templateB.itDNSTwo }),
                ...(PAF_9000IData.templateB.itSMTPTwo && { itSMTPTwo: PAF_9000IData.templateB.itSMTPTwo }),
                ...(PAF_9000IData.templateB.itNameThree && { itNameThree: PAF_9000IData.templateB.itNameThree }),
                ...(PAF_9000IData.templateB.itIPThree && { itIPThree: PAF_9000IData.templateB.itIPThree }),
                ...(PAF_9000IData.templateB.itGatewayThree && { itGatewayThree: PAF_9000IData.templateB.itGatewayThree }),
                ...(PAF_9000IData.templateB.itSubnetThree && { itSubnetThree: PAF_9000IData.templateB.itSubnetThree }),
                ...(PAF_9000IData.templateB.itDNSThree && { itDNSThree: PAF_9000IData.templateB.itDNSThree }),
                ...(PAF_9000IData.templateB.itSMTPThree && { itSMTPThree: PAF_9000IData.templateB.itSMTPThree }),
                ...(PAF_9000IData.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_9000IData.templateB.itAdditionalNotes }),
                ...(PAF_9000IData.templateB.piuDistance && { piuDistance: PAF_9000IData.templateB.piuDistance }),
                ...(PAF_9000IData.templateB.switchDistance && { switchDistance: PAF_9000IData.templateB.switchDistance }),
                ...(PAF_9000IData.templateB.ampPickup && { ampPickup: PAF_9000IData.templateB.ampPickup }),
                ...(PAF_9000IData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000IData.templateB.fromAirTakeUpDistance }),
                ...(PAF_9000IData.templateB.specialControllerOptions && { specialControllerOptions: PAF_9000IData.templateB.specialControllerOptions })
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