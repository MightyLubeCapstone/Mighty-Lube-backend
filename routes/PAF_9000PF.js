const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000PF = require("../models/PAF_9000PF");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_9000PFData, numRequested } = req.body;
        const order = new PAF_9000PF({
            conveyorName: PAF_9000PFData.conveyorName,
            chainSize: PAF_9000PFData.chainSize,
            ...(PAF_9000PFData.otherChainSize && { otherChainSize: PAF_9000PFData.otherChainSize }),
            industrialChainManufacturer: PAF_9000PFData.industrialChainManufacturer,
            ...(PAF_9000PFData.otherChainManufacturer && { otherChainManufacturer: PAF_9000PFData.otherChainManufacturer }),
            conveyorLength: PAF_9000PFData.conveyorLength,
            conveyorLengthUnit: PAF_9000PFData.conveyorLengthUnit,
            conveyorSpeed: PAF_9000PFData.conveyorSpeed,
            conveyorSpeedUnit: PAF_9000PFData.conveyorSpeedUnit,
            conveyorIndex: PAF_9000PFData.conveyorIndex,
            travelDirection: PAF_9000PFData.travelDirection,
            appEnviroment: PAF_9000PFData.appEnviroment,
            ...(PAF_9000PFData.ovenStatus && { ovenStatus: PAF_9000PFData.ovenStatus }),
            ...(PAF_9000PFData.ovenTemp && { ovenTemp: PAF_9000PFData.ovenTemp }),
            surroundingTemp: PAF_9000PFData.surroundingTemp,
            conveyorLoaded: PAF_9000PFData.conveyorLoaded,
            conveyorSwing: PAF_9000PFData.conveyorSwing,
            plantLayout: PAF_9000PFData.plantLayout,
            operatingVoltSingle: PAF_9000PFData.operatingVoltSingle,
            controlVoltSingle: PAF_9000PFData.controlVoltSingle,
            monitorData: new templateA({
                existingMonitor: PAF_9000PFData.templateA.existingMonitor,
                newMonitor: PAF_9000PFData.templateA.newMonitor,
                ...(PAF_9000PFData.templateA.dcuStatus && { dcuStatus: PAF_9000PFData.templateA.dcuStatus }),
                ...(PAF_9000PFData.templateA.dcuNum && { dcuNum: PAF_9000PFData.templateA.dcuNum }),
                ...(PAF_9000PFData.templateA.existingWindows && { existingWindows: PAF_9000PFData.templateA.existingWindows }),
                ...(PAF_9000PFData.templateA.existingHeadUnit && { existingHeadUnit: PAF_9000PFData.templateA.existingHeadUnit }),
                ...(PAF_9000PFData.templateA.existingDCU && { existingDCU: PAF_9000PFData.templateA.existingDCU }),
                ...(PAF_9000PFData.templateA.existingPowerInterface && { existingPowerInterface: PAF_9000PFData.templateA.existingPowerInterface }),
                ...(PAF_9000PFData.templateA.newReservoir && { newReservoir: PAF_9000PFData.templateA.newReservoir }),
                ...(PAF_9000PFData.templateA.reservoirSize && { reservoirSize: PAF_9000PFData.templateA.reservoirSize }),
                ...(PAF_9000PFData.templateA.otherReservoirSize && { otherReservoirSize: PAF_9000PFData.templateA.otherReservoirSize }),
                ...(PAF_9000PFData.templateA.newReservoirNum && { newReservoirNum: PAF_9000PFData.templateA.newReservoirNum }),
                ...(PAF_9000PFData.templateA.typeMonitor && { typeMonitor: PAF_9000PFData.templateA.typeMonitor }),
                ...(PAF_9000PFData.templateA.driveMotorAmp && { driveMotorAmp: PAF_9000PFData.templateA.driveMotorAmp }),
                ...(PAF_9000PFData.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000PFData.templateA.driveMotorAmpNum }),
                ...(PAF_9000PFData.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_9000PFData.templateA.driveTakeUpAir }),
                ...(PAF_9000PFData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000PFData.templateA.driveTakeUpAirNum }),
                ...(PAF_9000PFData.templateA.takeUpDistance && { takeUpDistance: PAF_9000PFData.templateA.takeUpDistance }),
                ...(PAF_9000PFData.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000PFData.templateA.takeUpDistanceNum }),
                ...(PAF_9000PFData.templateA.driveTemp && { driveTemp: PAF_9000PFData.templateA.driveTemp }),
                ...(PAF_9000PFData.templateA.driveTempNum && { driveTempNum: PAF_9000PFData.templateA.driveTempNum }),
                ...(PAF_9000PFData.templateA.driveVibration && { driveVibration: PAF_9000PFData.templateA.driveVibration }),
                ...(PAF_9000PFData.templateA.driveVibrationNum && { driveVibrationNum: PAF_9000PFData.templateA.driveVibrationNum }),
                ...(PAF_9000PFData.templateA.dogPitch && { dogPitch: PAF_9000PFData.templateA.dogPitch }),
                ...(PAF_9000PFData.templateA.dogPitchNum && { dogPitchNum: PAF_9000PFData.templateA.dogPitchNum }),
                ...(PAF_9000PFData.templateA.paintMarker && { paintMarker: PAF_9000PFData.templateA.paintMarker }),
                ...(PAF_9000PFData.templateA.paintMarkerNum && { paintMarkerNum: PAF_9000PFData.templateA.paintMarkerNum }),
                ...(PAF_9000PFData.templateA.chainVision && { chainVision: PAF_9000PFData.templateA.chainVision }),
                ...(PAF_9000PFData.templateA.lubeVision && { lubeVision: PAF_9000PFData.templateA.lubeVision }),
                ...(PAF_9000PFData.templateA.trolleyVision && { trolleyVision: PAF_9000PFData.templateA.trolleyVision }),
                ...(PAF_9000PFData.templateA.trolleyDetect && { trolleyDetect: PAF_9000PFData.templateA.trolleyDetect }),
                ...(PAF_9000PFData.templateA.omniView && { omniView: PAF_9000PFData.templateA.omniView }),
                ...(PAF_9000PFData.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000PFData.templateA.dcuUpgradeNum }),
                ...(PAF_9000PFData.templateA.itNameOne && { itNameOne: PAF_9000PFData.templateA.itNameOne }),
                ...(PAF_9000PFData.templateA.itIPOne && { itIPOne: PAF_9000PFData.templateA.itIPOne }),
                ...(PAF_9000PFData.templateA.itGatewayOne && { itGatewayOne: PAF_9000PFData.templateA.itGatewayOne }),
                ...(PAF_9000PFData.templateA.itSubnetOne && { itSubnetOne: PAF_9000PFData.templateA.itSubnetOne }),
                ...(PAF_9000PFData.templateA.itDNSOne && { itDNSOne: PAF_9000PFData.templateA.itDNSOne }),
                ...(PAF_9000PFData.templateA.itSMTPOne && { itSMTPOne: PAF_9000PFData.templateA.itSMTPOne }),
                ...(PAF_9000PFData.templateA.itNameTwo && { itNameTwo: PAF_9000PFData.templateA.itNameTwo }),
                ...(PAF_9000PFData.templateA.itIPTwo && { itIPTwo: PAF_9000PFData.templateA.itIPTwo }),
                ...(PAF_9000PFData.templateA.itGatewayTwo && { itGatewayTwo: PAF_9000PFData.templateA.itGatewayTwo }),
                ...(PAF_9000PFData.templateA.itSubnetTwo && { itSubnetTwo: PAF_9000PFData.templateA.itSubnetTwo }),
                ...(PAF_9000PFData.templateA.itDNSTwo && { itDNSTwo: PAF_9000PFData.templateA.itDNSTwo }),
                ...(PAF_9000PFData.templateA.itSMTPTwo && { itSMTPTwo: PAF_9000PFData.templateA.itSMTPTwo }),
                ...(PAF_9000PFData.templateA.itNameThree && { itNameThree: PAF_9000PFData.templateA.itNameThree }),
                ...(PAF_9000PFData.templateA.itIPThree && { itIPThree: PAF_9000PFData.templateA.itIPThree }),
                ...(PAF_9000PFData.templateA.itGatewayThree && { itGatewayThree: PAF_9000PFData.templateA.itGatewayThree }),
                ...(PAF_9000PFData.templateA.itSubnetThree && { itSubnetThree: PAF_9000PFData.templateA.itSubnetThree }),
                ...(PAF_9000PFData.templateA.itDNSThree && { itDNSThree: PAF_9000PFData.templateA.itDNSThree }),
                ...(PAF_9000PFData.templateA.itSMTPThree && { itSMTPThree: PAF_9000PFData.templateA.itSMTPThree }),
                ...(PAF_9000PFData.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_9000PFData.templateA.itAdditionalNotes }),
                ...(PAF_9000PFData.templateA.piuDistance && { piuDistance: PAF_9000PFData.templateA.piuDistance }),
                ...(PAF_9000PFData.templateA.switchDistance && { switchDistance: PAF_9000PFData.templateA.switchDistance }),
                ...(PAF_9000PFData.templateA.ampPickup && { ampPickup: PAF_9000PFData.templateA.ampPickup }),
                ...(PAF_9000PFData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000PFData.templateA.fromAirTakeUpDistance }),
                ...(PAF_9000PFData.templateA.specialControllerOptions && { specialControllerOptions: PAF_9000PFData.templateA.specialControllerOptions })
            }),
            wheelOpenType: PAF_9000PFData.wheelOpenType,
            wheelClosedType: PAF_9000PFData.wheelClosedType,
            powerChainStatus: PAF_9000PFData.powerChainStatus,
            chainPinStatus: PAF_9000PFData.chainPinStatus,
            catDriveStatus: PAF_9000PFData.catDriveStatus,
            catDriveNum: PAF_9000PFData.catDriveNum,
            railLubeStatus: PAF_9000PFData.railLubeStatus,
            externalLubeStatus: PAF_9000PFData.externalLubeStatus,
            lubeBrand: PAF_9000PFData.lubeBrand,
            lubeType: PAF_9000PFData.lubeType,
            lubeViscosity: PAF_9000PFData.lubeViscosity,
            sideLubeStatus: PAF_9000PFData.sideLubeStatus,
            topLubeStatus: PAF_9000PFData.topLubeStatus,
            chainCleanStatus: PAF_9000PFData.chainCleanStatus,
            wireMeasurementUnitType: PAF_9000PFData.wireMeasurementUnitType,
            twoConductor: PAF_9000PFData.twoConductor,
            fourConductor: PAF_9000PFData.fourConductor,
            sevenConductor: PAF_9000PFData.sevenConductor,
            twelveConductor: PAF_9000PFData.twelveConductor,
            junctionBoxNum: PAF_9000PFData.junctionBoxNum,
            pfUnitType: PAF_9000PFData.pfUnitType,
            pfOverheadL: PAF_9000PFData.pfOverheadL,
            pfOverheadG: PAF_9000PFData.pfOverheadG,
            pfOverheadH: PAF_9000PFData.pfOverheadH,
            pfInvertedA: PAF_9000PFData.pfInvertedA,
            pfInvertedB: PAF_9000PFData.pfInvertedB,
            pfInvertedG: PAF_9000PFData.pfInvertedG,
            pfInvertedH: PAF_9000PFData.pfInvertedH,
            pfInvertedK2: PAF_9000PFData.pfInvertedK2,
            pfInvertedL2: PAF_9000PFData.pfInvertedL2,
            pfInvertedM2: PAF_9000PFData.pfInvertedM2,
            pfInvertedN2: PAF_9000PFData.pfInvertedN2
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_9000PF"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_9000PF entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;