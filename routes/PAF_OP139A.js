const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_OP139A = require("../models/PAF_OP139A");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_OP139AData.templateB.existingMonitor,
                newMonitor: PAF_OP139AData.templateB.newMonitor,
                ...(PAF_OP139AData.templateB.dcuStatus && { dcuStatus: PAF_OP139AData.templateB.dcuStatus }),
                ...(PAF_OP139AData.templateB.dcuNum && { dcuNum: PAF_OP139AData.templateB.dcuNum }),
                ...(PAF_OP139AData.templateB.existingWindows && { existingWindows: PAF_OP139AData.templateB.existingWindows }),
                ...(PAF_OP139AData.templateB.existingHeadUnit && { existingHeadUnit: PAF_OP139AData.templateB.existingHeadUnit }),
                ...(PAF_OP139AData.templateB.existingDCU && { existingDCU: PAF_OP139AData.templateB.existingDCU }),
                ...(PAF_OP139AData.templateB.existingPowerInterface && { existingPowerInterface: PAF_OP139AData.templateB.existingPowerInterface }),
                ...(PAF_OP139AData.templateB.newReservoir && { newReservoir: PAF_OP139AData.templateB.newReservoir }),
                ...(PAF_OP139AData.templateB.reservoirSize && { reservoirSize: PAF_OP139AData.templateB.reservoirSize }),
                ...(PAF_OP139AData.templateB.otherReservoirSize && { otherReservoirSize: PAF_OP139AData.templateB.otherReservoirSize }),
                ...(PAF_OP139AData.templateB.newReservoirNum && { newReservoirNum: PAF_OP139AData.templateB.newReservoirNum }),
                ...(PAF_OP139AData.templateB.typeMonitor && { typeMonitor: PAF_OP139AData.templateB.typeMonitor }),
                ...(PAF_OP139AData.templateB.driveMotorAmp && { driveMotorAmp: PAF_OP139AData.templateB.driveMotorAmp }),
                ...(PAF_OP139AData.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_OP139AData.templateB.driveMotorAmpNum }),
                ...(PAF_OP139AData.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_OP139AData.templateB.driveTakeUpAir }),
                ...(PAF_OP139AData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_OP139AData.templateB.driveTakeUpAirNum }),
                ...(PAF_OP139AData.templateB.takeUpDistance && { takeUpDistance: PAF_OP139AData.templateB.takeUpDistance }),
                ...(PAF_OP139AData.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_OP139AData.templateB.takeUpDistanceNum }),
                ...(PAF_OP139AData.templateB.driveTemp && { driveTemp: PAF_OP139AData.templateB.driveTemp }),
                ...(PAF_OP139AData.templateB.driveTempNum && { driveTempNum: PAF_OP139AData.templateB.driveTempNum }),
                ...(PAF_OP139AData.templateB.driveVibration && { driveVibration: PAF_OP139AData.templateB.driveVibration }),
                ...(PAF_OP139AData.templateB.driveVibrationNum && { driveVibrationNum: PAF_OP139AData.templateB.driveVibrationNum }),
                ...(PAF_OP139AData.templateB.dogPitch && { dogPitch: PAF_OP139AData.templateB.dogPitch }),
                ...(PAF_OP139AData.templateB.dogPitchNum && { dogPitchNum: PAF_OP139AData.templateB.dogPitchNum }),
                ...(PAF_OP139AData.templateB.paintMarker && { paintMarker: PAF_OP139AData.templateB.paintMarker }),
                ...(PAF_OP139AData.templateB.paintMarkerNum && { paintMarkerNum: PAF_OP139AData.templateB.paintMarkerNum }),
                ...(PAF_OP139AData.templateB.chainVision && { chainVision: PAF_OP139AData.templateB.chainVision }),
                ...(PAF_OP139AData.templateB.lubeVision && { lubeVision: PAF_OP139AData.templateB.lubeVision }),
                ...(PAF_OP139AData.templateB.trolleyVision && { trolleyVision: PAF_OP139AData.templateB.trolleyVision }),
                ...(PAF_OP139AData.templateB.trolleyDetect && { trolleyDetect: PAF_OP139AData.templateB.trolleyDetect }),
                ...(PAF_OP139AData.templateB.omniView && { omniView: PAF_OP139AData.templateB.omniView }),
                ...(PAF_OP139AData.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_OP139AData.templateB.dcuUpgradeNum }),
                ...(PAF_OP139AData.templateB.itNameOne && { itNameOne: PAF_OP139AData.templateB.itNameOne }),
                ...(PAF_OP139AData.templateB.itIPOne && { itIPOne: PAF_OP139AData.templateB.itIPOne }),
                ...(PAF_OP139AData.templateB.itGatewayOne && { itGatewayOne: PAF_OP139AData.templateB.itGatewayOne }),
                ...(PAF_OP139AData.templateB.itSubnetOne && { itSubnetOne: PAF_OP139AData.templateB.itSubnetOne }),
                ...(PAF_OP139AData.templateB.itDNSOne && { itDNSOne: PAF_OP139AData.templateB.itDNSOne }),
                ...(PAF_OP139AData.templateB.itSMTPOne && { itSMTPOne: PAF_OP139AData.templateB.itSMTPOne }),
                ...(PAF_OP139AData.templateB.itNameTwo && { itNameTwo: PAF_OP139AData.templateB.itNameTwo }),
                ...(PAF_OP139AData.templateB.itIPTwo && { itIPTwo: PAF_OP139AData.templateB.itIPTwo }),
                ...(PAF_OP139AData.templateB.itGatewayTwo && { itGatewayTwo: PAF_OP139AData.templateB.itGatewayTwo }),
                ...(PAF_OP139AData.templateB.itSubnetTwo && { itSubnetTwo: PAF_OP139AData.templateB.itSubnetTwo }),
                ...(PAF_OP139AData.templateB.itDNSTwo && { itDNSTwo: PAF_OP139AData.templateB.itDNSTwo }),
                ...(PAF_OP139AData.templateB.itSMTPTwo && { itSMTPTwo: PAF_OP139AData.templateB.itSMTPTwo }),
                ...(PAF_OP139AData.templateB.itNameThree && { itNameThree: PAF_OP139AData.templateB.itNameThree }),
                ...(PAF_OP139AData.templateB.itIPThree && { itIPThree: PAF_OP139AData.templateB.itIPThree }),
                ...(PAF_OP139AData.templateB.itGatewayThree && { itGatewayThree: PAF_OP139AData.templateB.itGatewayThree }),
                ...(PAF_OP139AData.templateB.itSubnetThree && { itSubnetThree: PAF_OP139AData.templateB.itSubnetThree }),
                ...(PAF_OP139AData.templateB.itDNSThree && { itDNSThree: PAF_OP139AData.templateB.itDNSThree }),
                ...(PAF_OP139AData.templateB.itSMTPThree && { itSMTPThree: PAF_OP139AData.templateB.itSMTPThree }),
                ...(PAF_OP139AData.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_OP139AData.templateB.itAdditionalNotes }),
                ...(PAF_OP139AData.templateB.piuDistance && { piuDistance: PAF_OP139AData.templateB.piuDistance }),
                ...(PAF_OP139AData.templateB.switchDistance && { switchDistance: PAF_OP139AData.templateB.switchDistance }),
                ...(PAF_OP139AData.templateB.ampPickup && { ampPickup: PAF_OP139AData.templateB.ampPickup }),
                ...(PAF_OP139AData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_OP139AData.templateB.fromAirTakeUpDistance }),
                ...(PAF_OP139AData.templateB.specialControllerOptions && { specialControllerOptions: PAF_OP139AData.templateB.specialControllerOptions })
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