const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000PF = require("../models/PAF_9000PF");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_9000PFData.templateB.existingMonitor,
                newMonitor: PAF_9000PFData.templateB.newMonitor,
                ...(PAF_9000PFData.templateB.dcuStatus && { dcuStatus: PAF_9000PFData.templateB.dcuStatus }),
                ...(PAF_9000PFData.templateB.dcuNum && { dcuNum: PAF_9000PFData.templateB.dcuNum }),
                ...(PAF_9000PFData.templateB.existingWindows && { existingWindows: PAF_9000PFData.templateB.existingWindows }),
                ...(PAF_9000PFData.templateB.existingHeadUnit && { existingHeadUnit: PAF_9000PFData.templateB.existingHeadUnit }),
                ...(PAF_9000PFData.templateB.existingDCU && { existingDCU: PAF_9000PFData.templateB.existingDCU }),
                ...(PAF_9000PFData.templateB.existingPowerInterface && { existingPowerInterface: PAF_9000PFData.templateB.existingPowerInterface }),
                ...(PAF_9000PFData.templateB.newReservoir && { newReservoir: PAF_9000PFData.templateB.newReservoir }),
                ...(PAF_9000PFData.templateB.reservoirSize && { reservoirSize: PAF_9000PFData.templateB.reservoirSize }),
                ...(PAF_9000PFData.templateB.otherReservoirSize && { otherReservoirSize: PAF_9000PFData.templateB.otherReservoirSize }),
                ...(PAF_9000PFData.templateB.newReservoirNum && { newReservoirNum: PAF_9000PFData.templateB.newReservoirNum }),
                ...(PAF_9000PFData.templateB.typeMonitor && { typeMonitor: PAF_9000PFData.templateB.typeMonitor }),
                ...(PAF_9000PFData.templateB.driveMotorAmp && { driveMotorAmp: PAF_9000PFData.templateB.driveMotorAmp }),
                ...(PAF_9000PFData.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_9000PFData.templateB.driveMotorAmpNum }),
                ...(PAF_9000PFData.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_9000PFData.templateB.driveTakeUpAir }),
                ...(PAF_9000PFData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_9000PFData.templateB.driveTakeUpAirNum }),
                ...(PAF_9000PFData.templateB.takeUpDistance && { takeUpDistance: PAF_9000PFData.templateB.takeUpDistance }),
                ...(PAF_9000PFData.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_9000PFData.templateB.takeUpDistanceNum }),
                ...(PAF_9000PFData.templateB.driveTemp && { driveTemp: PAF_9000PFData.templateB.driveTemp }),
                ...(PAF_9000PFData.templateB.driveTempNum && { driveTempNum: PAF_9000PFData.templateB.driveTempNum }),
                ...(PAF_9000PFData.templateB.driveVibration && { driveVibration: PAF_9000PFData.templateB.driveVibration }),
                ...(PAF_9000PFData.templateB.driveVibrationNum && { driveVibrationNum: PAF_9000PFData.templateB.driveVibrationNum }),
                ...(PAF_9000PFData.templateB.dogPitch && { dogPitch: PAF_9000PFData.templateB.dogPitch }),
                ...(PAF_9000PFData.templateB.dogPitchNum && { dogPitchNum: PAF_9000PFData.templateB.dogPitchNum }),
                ...(PAF_9000PFData.templateB.paintMarker && { paintMarker: PAF_9000PFData.templateB.paintMarker }),
                ...(PAF_9000PFData.templateB.paintMarkerNum && { paintMarkerNum: PAF_9000PFData.templateB.paintMarkerNum }),
                ...(PAF_9000PFData.templateB.chainVision && { chainVision: PAF_9000PFData.templateB.chainVision }),
                ...(PAF_9000PFData.templateB.lubeVision && { lubeVision: PAF_9000PFData.templateB.lubeVision }),
                ...(PAF_9000PFData.templateB.trolleyVision && { trolleyVision: PAF_9000PFData.templateB.trolleyVision }),
                ...(PAF_9000PFData.templateB.trolleyDetect && { trolleyDetect: PAF_9000PFData.templateB.trolleyDetect }),
                ...(PAF_9000PFData.templateB.omniView && { omniView: PAF_9000PFData.templateB.omniView }),
                ...(PAF_9000PFData.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_9000PFData.templateB.dcuUpgradeNum }),
                ...(PAF_9000PFData.templateB.itNameOne && { itNameOne: PAF_9000PFData.templateB.itNameOne }),
                ...(PAF_9000PFData.templateB.itIPOne && { itIPOne: PAF_9000PFData.templateB.itIPOne }),
                ...(PAF_9000PFData.templateB.itGatewayOne && { itGatewayOne: PAF_9000PFData.templateB.itGatewayOne }),
                ...(PAF_9000PFData.templateB.itSubnetOne && { itSubnetOne: PAF_9000PFData.templateB.itSubnetOne }),
                ...(PAF_9000PFData.templateB.itDNSOne && { itDNSOne: PAF_9000PFData.templateB.itDNSOne }),
                ...(PAF_9000PFData.templateB.itSMTPOne && { itSMTPOne: PAF_9000PFData.templateB.itSMTPOne }),
                ...(PAF_9000PFData.templateB.itNameTwo && { itNameTwo: PAF_9000PFData.templateB.itNameTwo }),
                ...(PAF_9000PFData.templateB.itIPTwo && { itIPTwo: PAF_9000PFData.templateB.itIPTwo }),
                ...(PAF_9000PFData.templateB.itGatewayTwo && { itGatewayTwo: PAF_9000PFData.templateB.itGatewayTwo }),
                ...(PAF_9000PFData.templateB.itSubnetTwo && { itSubnetTwo: PAF_9000PFData.templateB.itSubnetTwo }),
                ...(PAF_9000PFData.templateB.itDNSTwo && { itDNSTwo: PAF_9000PFData.templateB.itDNSTwo }),
                ...(PAF_9000PFData.templateB.itSMTPTwo && { itSMTPTwo: PAF_9000PFData.templateB.itSMTPTwo }),
                ...(PAF_9000PFData.templateB.itNameThree && { itNameThree: PAF_9000PFData.templateB.itNameThree }),
                ...(PAF_9000PFData.templateB.itIPThree && { itIPThree: PAF_9000PFData.templateB.itIPThree }),
                ...(PAF_9000PFData.templateB.itGatewayThree && { itGatewayThree: PAF_9000PFData.templateB.itGatewayThree }),
                ...(PAF_9000PFData.templateB.itSubnetThree && { itSubnetThree: PAF_9000PFData.templateB.itSubnetThree }),
                ...(PAF_9000PFData.templateB.itDNSThree && { itDNSThree: PAF_9000PFData.templateB.itDNSThree }),
                ...(PAF_9000PFData.templateB.itSMTPThree && { itSMTPThree: PAF_9000PFData.templateB.itSMTPThree }),
                ...(PAF_9000PFData.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_9000PFData.templateB.itAdditionalNotes }),
                ...(PAF_9000PFData.templateB.piuDistance && { piuDistance: PAF_9000PFData.templateB.piuDistance }),
                ...(PAF_9000PFData.templateB.switchDistance && { switchDistance: PAF_9000PFData.templateB.switchDistance }),
                ...(PAF_9000PFData.templateB.ampPickup && { ampPickup: PAF_9000PFData.templateB.ampPickup }),
                ...(PAF_9000PFData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_9000PFData.templateB.fromAirTakeUpDistance }),
                ...(PAF_9000PFData.templateB.specialControllerOptions && { specialControllerOptions: PAF_9000PFData.templateB.specialControllerOptions })
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