const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_OP139A = require("../models/PAF_OP139A");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_OP139AData, numRequested } = req.body;
        const order = new PAF_OP139A({
            conveyorName: PAF_OP139AData.conveyorName,
            chainSize: PAF_OP139AData.chainSize,
            ...(PAF_OP139AData.otherChainSize && { otherChainSize: PAF_OP139AData.otherChainSize }),
            industrialChainManufacturer: PAF_OP139AData.industrialChainManufacturer,
            ...(PAF_OP139AData.otherChainManufacturer && { otherChainManufacturer: PAF_OP139AData.otherChainManufacturer }),
            conveyorLength: PAF_OP139AData.conveyorLength,
            conveyorLengthUnit: PAF_OP139AData.conveyorLengthUnit,
            conveyorSpeed: PAF_OP139AData.conveyorSpeed,
            conveyorSpeedUnit: PAF_OP139AData.conveyorSpeedUnit,
            appEnviroment: PAF_OP139AData.appEnviroment,
            ...(PAF_OP139AData.ovenStatus && { ovenStatus: PAF_OP139AData.ovenStatus }),
            ...(PAF_OP139AData.ovenTemp && { ovenTemp: PAF_OP139AData.ovenTemp }),
            newMonitorStatus: PAF_OP139AData.newMonitorStatus,
            conveyorLoaded: PAF_OP139AData.conveyorLoaded,
            conveyorSwing: PAF_OP139AData.conveyorSwing,
            orientationType: PAF_OP139AData.orientationType,
            controlVoltSingle: PAF_OP139AData.controlVoltSingle,
            compressedAir: PAF_OP139AData.compressedAir,
            airSupplyType: PAF_OP139AData.airSupplyType,
            monitorData: new templateA({
                existingMonitor: PAF_OP139AData.templateA.existingMonitor,
                newMonitor: PAF_OP139AData.templateA.newMonitor,
                ...(PAF_OP139AData.templateA.dcuStatus && { dcuStatus: PAF_OP139AData.templateA.dcuStatus }),
                ...(PAF_OP139AData.templateA.dcuNum && { dcuNum: PAF_OP139AData.templateA.dcuNum }),
                ...(PAF_OP139AData.templateA.existingWindows && { existingWindows: PAF_OP139AData.templateA.existingWindows }),
                ...(PAF_OP139AData.templateA.existingHeadUnit && { existingHeadUnit: PAF_OP139AData.templateA.existingHeadUnit }),
                ...(PAF_OP139AData.templateA.existingDCU && { existingDCU: PAF_OP139AData.templateA.existingDCU }),
                ...(PAF_OP139AData.templateA.existingPowerInterface && { existingPowerInterface: PAF_OP139AData.templateA.existingPowerInterface }),
                ...(PAF_OP139AData.templateA.newReservoir && { newReservoir: PAF_OP139AData.templateA.newReservoir }),
                ...(PAF_OP139AData.templateA.reservoirSize && { reservoirSize: PAF_OP139AData.templateA.reservoirSize }),
                ...(PAF_OP139AData.templateA.otherReservoirSize && { otherReservoirSize: PAF_OP139AData.templateA.otherReservoirSize }),
                ...(PAF_OP139AData.templateA.newReservoirNum && { newReservoirNum: PAF_OP139AData.templateA.newReservoirNum }),
                ...(PAF_OP139AData.templateA.typeMonitor && { typeMonitor: PAF_OP139AData.templateA.typeMonitor }),
                ...(PAF_OP139AData.templateA.driveMotorAmp && { driveMotorAmp: PAF_OP139AData.templateA.driveMotorAmp }),
                ...(PAF_OP139AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_OP139AData.templateA.driveMotorAmpNum }),
                ...(PAF_OP139AData.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_OP139AData.templateA.driveTakeUpAir }),
                ...(PAF_OP139AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_OP139AData.templateA.driveTakeUpAirNum }),
                ...(PAF_OP139AData.templateA.takeUpDistance && { takeUpDistance: PAF_OP139AData.templateA.takeUpDistance }),
                ...(PAF_OP139AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_OP139AData.templateA.takeUpDistanceNum }),
                ...(PAF_OP139AData.templateA.driveTemp && { driveTemp: PAF_OP139AData.templateA.driveTemp }),
                ...(PAF_OP139AData.templateA.driveTempNum && { driveTempNum: PAF_OP139AData.templateA.driveTempNum }),
                ...(PAF_OP139AData.templateA.driveVibration && { driveVibration: PAF_OP139AData.templateA.driveVibration }),
                ...(PAF_OP139AData.templateA.driveVibrationNum && { driveVibrationNum: PAF_OP139AData.templateA.driveVibrationNum }),
                ...(PAF_OP139AData.templateA.dogPitch && { dogPitch: PAF_OP139AData.templateA.dogPitch }),
                ...(PAF_OP139AData.templateA.dogPitchNum && { dogPitchNum: PAF_OP139AData.templateA.dogPitchNum }),
                ...(PAF_OP139AData.templateA.paintMarker && { paintMarker: PAF_OP139AData.templateA.paintMarker }),
                ...(PAF_OP139AData.templateA.paintMarkerNum && { paintMarkerNum: PAF_OP139AData.templateA.paintMarkerNum }),
                ...(PAF_OP139AData.templateA.chainVision && { chainVision: PAF_OP139AData.templateA.chainVision }),
                ...(PAF_OP139AData.templateA.lubeVision && { lubeVision: PAF_OP139AData.templateA.lubeVision }),
                ...(PAF_OP139AData.templateA.trolleyVision && { trolleyVision: PAF_OP139AData.templateA.trolleyVision }),
                ...(PAF_OP139AData.templateA.trolleyDetect && { trolleyDetect: PAF_OP139AData.templateA.trolleyDetect }),
                ...(PAF_OP139AData.templateA.omniView && { omniView: PAF_OP139AData.templateA.omniView }),
                ...(PAF_OP139AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_OP139AData.templateA.dcuUpgradeNum }),
                ...(PAF_OP139AData.templateA.itNameOne && { itNameOne: PAF_OP139AData.templateA.itNameOne }),
                ...(PAF_OP139AData.templateA.itIPOne && { itIPOne: PAF_OP139AData.templateA.itIPOne }),
                ...(PAF_OP139AData.templateA.itGatewayOne && { itGatewayOne: PAF_OP139AData.templateA.itGatewayOne }),
                ...(PAF_OP139AData.templateA.itSubnetOne && { itSubnetOne: PAF_OP139AData.templateA.itSubnetOne }),
                ...(PAF_OP139AData.templateA.itDNSOne && { itDNSOne: PAF_OP139AData.templateA.itDNSOne }),
                ...(PAF_OP139AData.templateA.itSMTPOne && { itSMTPOne: PAF_OP139AData.templateA.itSMTPOne }),
                ...(PAF_OP139AData.templateA.itNameTwo && { itNameTwo: PAF_OP139AData.templateA.itNameTwo }),
                ...(PAF_OP139AData.templateA.itIPTwo && { itIPTwo: PAF_OP139AData.templateA.itIPTwo }),
                ...(PAF_OP139AData.templateA.itGatewayTwo && { itGatewayTwo: PAF_OP139AData.templateA.itGatewayTwo }),
                ...(PAF_OP139AData.templateA.itSubnetTwo && { itSubnetTwo: PAF_OP139AData.templateA.itSubnetTwo }),
                ...(PAF_OP139AData.templateA.itDNSTwo && { itDNSTwo: PAF_OP139AData.templateA.itDNSTwo }),
                ...(PAF_OP139AData.templateA.itSMTPTwo && { itSMTPTwo: PAF_OP139AData.templateA.itSMTPTwo }),
                ...(PAF_OP139AData.templateA.itNameThree && { itNameThree: PAF_OP139AData.templateA.itNameThree }),
                ...(PAF_OP139AData.templateA.itIPThree && { itIPThree: PAF_OP139AData.templateA.itIPThree }),
                ...(PAF_OP139AData.templateA.itGatewayThree && { itGatewayThree: PAF_OP139AData.templateA.itGatewayThree }),
                ...(PAF_OP139AData.templateA.itSubnetThree && { itSubnetThree: PAF_OP139AData.templateA.itSubnetThree }),
                ...(PAF_OP139AData.templateA.itDNSThree && { itDNSThree: PAF_OP139AData.templateA.itDNSThree }),
                ...(PAF_OP139AData.templateA.itSMTPThree && { itSMTPThree: PAF_OP139AData.templateA.itSMTPThree }),
                ...(PAF_OP139AData.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_OP139AData.templateA.itAdditionalNotes }),
                ...(PAF_OP139AData.templateA.piuDistance && { piuDistance: PAF_OP139AData.templateA.piuDistance }),
                ...(PAF_OP139AData.templateA.switchDistance && { switchDistance: PAF_OP139AData.templateA.switchDistance }),
                ...(PAF_OP139AData.templateA.ampPickup && { ampPickup: PAF_OP139AData.templateA.ampPickup }),
                ...(PAF_OP139AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_OP139AData.templateA.fromAirTakeUpDistance }),
                ...(PAF_OP139AData.templateA.specialControllerOptions && { specialControllerOptions: PAF_OP139AData.templateA.specialControllerOptions })
            }),
            railLubeStatus: PAF_OP139AData.railLubeStatus,
            lubeBrand: PAF_OP139AData.lubeBrand,
            lubeType: PAF_OP139AData.lubeType,
            lubeViscosity: PAF_OP139AData.lubeViscosity,
            sideLubeStatus: PAF_OP139AData.sideLubeStatus,
            topLubeStatus: PAF_OP139AData.topLubeStatus,
            chainCleanStatus: PAF_OP139AData.chainCleanStatus,
            chainMaster: PAF_OP139AData.chainMaster,
            otherUnitStatus: PAF_OP139AData.otherUnitStatus,
            ...(PAF_OP139AData.timerStatus && { timerStatus: PAF_OP139AData.timerStatus }),
            electricStatus: PAF_OP139AData.electricStatus,
            pneumaticStatus: PAF_OP139AData.pneumaticStatus,
            mightyLubeMonitoring: PAF_OP139AData.mightyLubeMonitoring,
            preMountType: PAF_OP139AData.preMountType,
            plcConnection: PAF_OP139AData.plcConnection,
            otherControllerNotes: PAF_OP139AData.otherControllerNotes,
            pfUnitType: PAF_OP139AData.pfUnitType,
            pfOverheadL: PAF_OP139AData.pfOverheadL,
            pfOverheadG: PAF_OP139AData.pfOverheadG,
            pfOverheadH: PAF_OP139AData.pfOverheadH,
            pfInvertedA: PAF_OP139AData.pfInvertedA,
            pfInvertedB: PAF_OP139AData.pfInvertedB,
            pfInvertedG: PAF_OP139AData.pfInvertedG,
            pfInvertedH: PAF_OP139AData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_OP139A"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_OP139A entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;