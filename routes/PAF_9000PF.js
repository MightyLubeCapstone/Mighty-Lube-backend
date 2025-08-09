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
            monitorData: {
                existingMonitor: PAF_9000PFData.existingMonitor,
                newMonitor: PAF_9000PFData.newMonitor,
                ...(PAF_9000PFData.dcuStatus && { dcuStatus: PAF_9000PFData.dcuStatus }),
                ...(PAF_9000PFData.dcuNum && { dcuNum: PAF_9000PFData.dcuNum }),
                ...(PAF_9000PFData.existingWindows && { existingWindows: PAF_9000PFData.existingWindows }),
                ...(PAF_9000PFData.existingHeadUnit && { existingHeadUnit: PAF_9000PFData.existingHeadUnit }),
                ...(PAF_9000PFData.existingDCU && { existingDCU: PAF_9000PFData.existingDCU }),
                ...(PAF_9000PFData.existingPowerInterface && { existingPowerInterface: PAF_9000PFData.existingPowerInterface }),
                ...(PAF_9000PFData.newReservoir && { newReservoir: PAF_9000PFData.newReservoir }),
                ...(PAF_9000PFData.reservoirSize && { reservoirSize: PAF_9000PFData.reservoirSize }),
                ...(PAF_9000PFData.otherReservoirSize && { otherReservoirSize: PAF_9000PFData.otherReservoirSize }),
                ...(PAF_9000PFData.newReservoirNum && { newReservoirNum: PAF_9000PFData.newReservoirNum }),
                ...(PAF_9000PFData.typeMonitor && { typeMonitor: PAF_9000PFData.typeMonitor }),
                ...(PAF_9000PFData.driveMotorAmp && { driveMotorAmp: PAF_9000PFData.driveMotorAmp }),
                ...(PAF_9000PFData.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000PFData.driveMotorAmpNum }),
                ...(PAF_9000PFData.driveTakeUpAir && { driveTakeUpAir: PAF_9000PFData.driveTakeUpAir }),
                ...(PAF_9000PFData.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000PFData.driveTakeUpAirNum }),
                ...(PAF_9000PFData.takeUpDistance && { takeUpDistance: PAF_9000PFData.takeUpDistance }),
                ...(PAF_9000PFData.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000PFData.takeUpDistanceNum }),
                ...(PAF_9000PFData.driveTemp && { driveTemp: PAF_9000PFData.driveTemp }),
                ...(PAF_9000PFData.driveTempNum && { driveTempNum: PAF_9000PFData.driveTempNum }),
                ...(PAF_9000PFData.driveVibration && { driveVibration: PAF_9000PFData.driveVibration }),
                ...(PAF_9000PFData.driveVibrationNum && { driveVibrationNum: PAF_9000PFData.driveVibrationNum }),
                ...(PAF_9000PFData.dogPitch && { dogPitch: PAF_9000PFData.dogPitch }),
                ...(PAF_9000PFData.dogPitchNum && { dogPitchNum: PAF_9000PFData.dogPitchNum }),
                ...(PAF_9000PFData.paintMarker && { paintMarker: PAF_9000PFData.paintMarker }),
                ...(PAF_9000PFData.paintMarkerNum && { paintMarkerNum: PAF_9000PFData.paintMarkerNum }),
                ...(PAF_9000PFData.chainVision && { chainVision: PAF_9000PFData.chainVision }),
                ...(PAF_9000PFData.lubeVision && { lubeVision: PAF_9000PFData.lubeVision }),
                ...(PAF_9000PFData.trolleyVision && { trolleyVision: PAF_9000PFData.trolleyVision }),
                ...(PAF_9000PFData.trolleyDetect && { trolleyDetect: PAF_9000PFData.trolleyDetect }),
                ...(PAF_9000PFData.omniView && { omniView: PAF_9000PFData.omniView }),
                ...(PAF_9000PFData.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000PFData.dcuUpgradeNum }),
                ...(PAF_9000PFData.itNameOne && { itNameOne: PAF_9000PFData.itNameOne }),
                ...(PAF_9000PFData.itIPOne && { itIPOne: PAF_9000PFData.itIPOne }),
                ...(PAF_9000PFData.itGatewayOne && { itGatewayOne: PAF_9000PFData.itGatewayOne }),
                ...(PAF_9000PFData.itSubnetOne && { itSubnetOne: PAF_9000PFData.itSubnetOne }),
                ...(PAF_9000PFData.itDNSOne && { itDNSOne: PAF_9000PFData.itDNSOne }),
                ...(PAF_9000PFData.itSMTPOne && { itSMTPOne: PAF_9000PFData.itSMTPOne }),
                ...(PAF_9000PFData.itNameTwo && { itNameTwo: PAF_9000PFData.itNameTwo }),
                ...(PAF_9000PFData.itIPTwo && { itIPTwo: PAF_9000PFData.itIPTwo }),
                ...(PAF_9000PFData.itGatewayTwo && { itGatewayTwo: PAF_9000PFData.itGatewayTwo }),
                ...(PAF_9000PFData.itSubnetTwo && { itSubnetTwo: PAF_9000PFData.itSubnetTwo }),
                ...(PAF_9000PFData.itDNSTwo && { itDNSTwo: PAF_9000PFData.itDNSTwo }),
                ...(PAF_9000PFData.itSMTPTwo && { itSMTPTwo: PAF_9000PFData.itSMTPTwo }),
                ...(PAF_9000PFData.itNameThree && { itNameThree: PAF_9000PFData.itNameThree }),
                ...(PAF_9000PFData.itIPThree && { itIPThree: PAF_9000PFData.itIPThree }),
                ...(PAF_9000PFData.itGatewayThree && { itGatewayThree: PAF_9000PFData.itGatewayThree }),
                ...(PAF_9000PFData.itSubnetThree && { itSubnetThree: PAF_9000PFData.itSubnetThree }),
                ...(PAF_9000PFData.itDNSThree && { itDNSThree: PAF_9000PFData.itDNSThree }),
                ...(PAF_9000PFData.itSMTPThree && { itSMTPThree: PAF_9000PFData.itSMTPThree }),
                ...(PAF_9000PFData.itAdditionalNotes && { itAdditionalNotes: PAF_9000PFData.itAdditionalNotes }),
                ...(PAF_9000PFData.piuDistance && { piuDistance: PAF_9000PFData.piuDistance }),
                ...(PAF_9000PFData.switchDistance && { switchDistance: PAF_9000PFData.switchDistance }),
                ...(PAF_9000PFData.ampPickup && { ampPickup: PAF_9000PFData.ampPickup }),
                ...(PAF_9000PFData.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000PFData.fromAirTakeUpDistance }),
                ...(PAF_9000PFData.specialControllerOptions && { specialControllerOptions: PAF_9000PFData.specialControllerOptions })
            },
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