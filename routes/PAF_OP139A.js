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
            monitorData: {
                existingMonitor: PAF_OP139AData.existingMonitor,
                newMonitor: PAF_OP139AData.newMonitor,
                ...(PAF_OP139AData.dcuStatus && { dcuStatus: PAF_OP139AData.dcuStatus }),
                ...(PAF_OP139AData.dcuNum && { dcuNum: PAF_OP139AData.dcuNum }),
                ...(PAF_OP139AData.existingWindows && { existingWindows: PAF_OP139AData.existingWindows }),
                ...(PAF_OP139AData.existingHeadUnit && { existingHeadUnit: PAF_OP139AData.existingHeadUnit }),
                ...(PAF_OP139AData.existingDCU && { existingDCU: PAF_OP139AData.existingDCU }),
                ...(PAF_OP139AData.existingPowerInterface && { existingPowerInterface: PAF_OP139AData.existingPowerInterface }),
                ...(PAF_OP139AData.newReservoir && { newReservoir: PAF_OP139AData.newReservoir }),
                ...(PAF_OP139AData.reservoirSize && { reservoirSize: PAF_OP139AData.reservoirSize }),
                ...(PAF_OP139AData.otherReservoirSize && { otherReservoirSize: PAF_OP139AData.otherReservoirSize }),
                ...(PAF_OP139AData.newReservoirNum && { newReservoirNum: PAF_OP139AData.newReservoirNum }),
                ...(PAF_OP139AData.typeMonitor && { typeMonitor: PAF_OP139AData.typeMonitor }),
                ...(PAF_OP139AData.driveMotorAmp && { driveMotorAmp: PAF_OP139AData.driveMotorAmp }),
                ...(PAF_OP139AData.driveMotorAmpNum && { driveMotorAmpNum: PAF_OP139AData.driveMotorAmpNum }),
                ...(PAF_OP139AData.driveTakeUpAir && { driveTakeUpAir: PAF_OP139AData.driveTakeUpAir }),
                ...(PAF_OP139AData.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_OP139AData.driveTakeUpAirNum }),
                ...(PAF_OP139AData.takeUpDistance && { takeUpDistance: PAF_OP139AData.takeUpDistance }),
                ...(PAF_OP139AData.takeUpDistanceNum && { takeUpDistanceNum: PAF_OP139AData.takeUpDistanceNum }),
                ...(PAF_OP139AData.driveTemp && { driveTemp: PAF_OP139AData.driveTemp }),
                ...(PAF_OP139AData.driveTempNum && { driveTempNum: PAF_OP139AData.driveTempNum }),
                ...(PAF_OP139AData.driveVibration && { driveVibration: PAF_OP139AData.driveVibration }),
                ...(PAF_OP139AData.driveVibrationNum && { driveVibrationNum: PAF_OP139AData.driveVibrationNum }),
                ...(PAF_OP139AData.dogPitch && { dogPitch: PAF_OP139AData.dogPitch }),
                ...(PAF_OP139AData.dogPitchNum && { dogPitchNum: PAF_OP139AData.dogPitchNum }),
                ...(PAF_OP139AData.paintMarker && { paintMarker: PAF_OP139AData.paintMarker }),
                ...(PAF_OP139AData.paintMarkerNum && { paintMarkerNum: PAF_OP139AData.paintMarkerNum }),
                ...(PAF_OP139AData.chainVision && { chainVision: PAF_OP139AData.chainVision }),
                ...(PAF_OP139AData.lubeVision && { lubeVision: PAF_OP139AData.lubeVision }),
                ...(PAF_OP139AData.trolleyVision && { trolleyVision: PAF_OP139AData.trolleyVision }),
                ...(PAF_OP139AData.trolleyDetect && { trolleyDetect: PAF_OP139AData.trolleyDetect }),
                ...(PAF_OP139AData.omniView && { omniView: PAF_OP139AData.omniView }),
                ...(PAF_OP139AData.dcuUpgradeNum && { dcuUpgradeNum: PAF_OP139AData.dcuUpgradeNum }),
                ...(PAF_OP139AData.itNameOne && { itNameOne: PAF_OP139AData.itNameOne }),
                ...(PAF_OP139AData.itIPOne && { itIPOne: PAF_OP139AData.itIPOne }),
                ...(PAF_OP139AData.itGatewayOne && { itGatewayOne: PAF_OP139AData.itGatewayOne }),
                ...(PAF_OP139AData.itSubnetOne && { itSubnetOne: PAF_OP139AData.itSubnetOne }),
                ...(PAF_OP139AData.itDNSOne && { itDNSOne: PAF_OP139AData.itDNSOne }),
                ...(PAF_OP139AData.itSMTPOne && { itSMTPOne: PAF_OP139AData.itSMTPOne }),
                ...(PAF_OP139AData.itNameTwo && { itNameTwo: PAF_OP139AData.itNameTwo }),
                ...(PAF_OP139AData.itIPTwo && { itIPTwo: PAF_OP139AData.itIPTwo }),
                ...(PAF_OP139AData.itGatewayTwo && { itGatewayTwo: PAF_OP139AData.itGatewayTwo }),
                ...(PAF_OP139AData.itSubnetTwo && { itSubnetTwo: PAF_OP139AData.itSubnetTwo }),
                ...(PAF_OP139AData.itDNSTwo && { itDNSTwo: PAF_OP139AData.itDNSTwo }),
                ...(PAF_OP139AData.itSMTPTwo && { itSMTPTwo: PAF_OP139AData.itSMTPTwo }),
                ...(PAF_OP139AData.itNameThree && { itNameThree: PAF_OP139AData.itNameThree }),
                ...(PAF_OP139AData.itIPThree && { itIPThree: PAF_OP139AData.itIPThree }),
                ...(PAF_OP139AData.itGatewayThree && { itGatewayThree: PAF_OP139AData.itGatewayThree }),
                ...(PAF_OP139AData.itSubnetThree && { itSubnetThree: PAF_OP139AData.itSubnetThree }),
                ...(PAF_OP139AData.itDNSThree && { itDNSThree: PAF_OP139AData.itDNSThree }),
                ...(PAF_OP139AData.itSMTPThree && { itSMTPThree: PAF_OP139AData.itSMTPThree }),
                ...(PAF_OP139AData.itAdditionalNotes && { itAdditionalNotes: PAF_OP139AData.itAdditionalNotes }),
                ...(PAF_OP139AData.piuDistance && { piuDistance: PAF_OP139AData.piuDistance }),
                ...(PAF_OP139AData.switchDistance && { switchDistance: PAF_OP139AData.switchDistance }),
                ...(PAF_OP139AData.ampPickup && { ampPickup: PAF_OP139AData.ampPickup }),
                ...(PAF_OP139AData.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_OP139AData.fromAirTakeUpDistance }),
                ...(PAF_OP139AData.specialControllerOptions && { specialControllerOptions: PAF_OP139AData.specialControllerOptions })
            },
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