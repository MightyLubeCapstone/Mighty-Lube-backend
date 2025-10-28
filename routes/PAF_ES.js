const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_ES = require("../models/PAF_ES");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_ESData, numRequested } = req.body;
        const order = new PAF_ES({
            conveyorName: PAF_ESData.conveyorName,
            chainSize: PAF_ESData.chainSize,
            ...(PAF_ESData.otherChainSize && { otherChainSize: PAF_ESData.otherChainSize }),
            industrialChainManufacturer: PAF_ESData.industrialChainManufacturer,
            ...(PAF_ESData.otherChainManufacturer && { otherChainManufacturer: PAF_ESData.otherChainManufacturer }),
            conveyorLength: PAF_ESData.conveyorLength,
            conveyorLengthUnit: PAF_ESData.conveyorLengthUnit,
            conveyorSpeed: PAF_ESData.conveyorSpeed,
            conveyorSpeedUnit: PAF_ESData.conveyorSpeedUnit,
            appEnviroment: PAF_ESData.appEnviroment,
            ...(PAF_ESData.ovenStatus && { ovenStatus: PAF_ESData.ovenStatus }),
            ...(PAF_ESData.ovenTemp && { ovenTemp: PAF_ESData.ovenTemp }),
            newMonitorStatus: PAF_ESData.newMonitorStatus,
            conveyorLoaded: PAF_ESData.conveyorLoaded,
            conveyorSwing: PAF_ESData.conveyorSwing,
            orientationType: PAF_ESData.orientationType,
            operatingVoltSingle: PAF_ESData.operatingVoltSingle,
            controlVoltSingle: PAF_ESData.controlVoltSingle,
            monitorData: {
                existingMonitor: wheelClosedType.existingMonitor,
                newMonitor: wheelClosedType.newMonitor,
                ...(wheelClosedType.dcuStatus && { dcuStatus: wheelClosedType.dcuStatus }),
                ...(wheelClosedType.dcuNum && { dcuNum: wheelClosedType.dcuNum }),
                ...(wheelClosedType.existingWindows && { existingWindows: wheelClosedType.existingWindows }),
                ...(wheelClosedType.existingHeadUnit && { existingHeadUnit: wheelClosedType.existingHeadUnit }),
                ...(wheelClosedType.existingDCU && { existingDCU: wheelClosedType.existingDCU }),
                ...(wheelClosedType.existingPowerInterface && { existingPowerInterface: wheelClosedType.existingPowerInterface }),
                ...(wheelClosedType.newReservoir && { newReservoir: wheelClosedType.newReservoir }),
                ...(wheelClosedType.reservoirSize && { reservoirSize: wheelClosedType.reservoirSize }),
                ...(wheelClosedType.otherReservoirSize && { otherReservoirSize: wheelClosedType.otherReservoirSize }),
                ...(wheelClosedType.newReservoirNum && { newReservoirNum: wheelClosedType.newReservoirNum }),
                ...(wheelClosedType.typeMonitor && { typeMonitor: wheelClosedType.typeMonitor }),
                ...(wheelClosedType.driveMotorAmp && { driveMotorAmp: wheelClosedType.driveMotorAmp }),
                ...(wheelClosedType.driveMotorAmpNum && { driveMotorAmpNum: wheelClosedType.driveMotorAmpNum }),
                ...(wheelClosedType.driveTakeUpAir && { driveTakeUpAir: wheelClosedType.driveTakeUpAir }),
                ...(wheelClosedType.driveTakeUpAirNum && { driveTakeUpAirNum: wheelClosedType.driveTakeUpAirNum }),
                ...(wheelClosedType.takeUpDistance && { takeUpDistance: wheelClosedType.takeUpDistance }),
                ...(wheelClosedType.takeUpDistanceNum && { takeUpDistanceNum: wheelClosedType.takeUpDistanceNum }),
                ...(wheelClosedType.driveTemp && { driveTemp: wheelClosedType.driveTemp }),
                ...(wheelClosedType.driveTempNum && { driveTempNum: wheelClosedType.driveTempNum }),
                ...(wheelClosedType.driveVibration && { driveVibration: wheelClosedType.driveVibration }),
                ...(wheelClosedType.driveVibrationNum && { driveVibrationNum: wheelClosedType.driveVibrationNum }),
                ...(wheelClosedType.dogPitch && { dogPitch: wheelClosedType.dogPitch }),
                ...(wheelClosedType.dogPitchNum && { dogPitchNum: wheelClosedType.dogPitchNum }),
                ...(wheelClosedType.paintMarker && { paintMarker: wheelClosedType.paintMarker }),
                ...(wheelClosedType.paintMarkerNum && { paintMarkerNum: wheelClosedType.paintMarkerNum }),
                ...(wheelClosedType.chainVision && { chainVision: wheelClosedType.chainVision }),
                ...(wheelClosedType.lubeVision && { lubeVision: wheelClosedType.lubeVision }),
                ...(wheelClosedType.trolleyVision && { trolleyVision: wheelClosedType.trolleyVision }),
                ...(wheelClosedType.trolleyDetect && { trolleyDetect: wheelClosedType.trolleyDetect }),
                ...(wheelClosedType.omniView && { omniView: wheelClosedType.omniView }),
                ...(wheelClosedType.dcuUpgradeNum && { dcuUpgradeNum: wheelClosedType.dcuUpgradeNum }),
                ...(wheelClosedType.itNameOne && { itNameOne: wheelClosedType.itNameOne }),
                ...(wheelClosedType.itIPOne && { itIPOne: wheelClosedType.itIPOne }),
                ...(wheelClosedType.itGatewayOne && { itGatewayOne: wheelClosedType.itGatewayOne }),
                ...(wheelClosedType.itSubnetOne && { itSubnetOne: wheelClosedType.itSubnetOne }),
                ...(wheelClosedType.itDNSOne && { itDNSOne: wheelClosedType.itDNSOne }),
                ...(wheelClosedType.itSMTPOne && { itSMTPOne: wheelClosedType.itSMTPOne }),
                ...(wheelClosedType.itNameTwo && { itNameTwo: wheelClosedType.itNameTwo }),
                ...(wheelClosedType.itIPTwo && { itIPTwo: wheelClosedType.itIPTwo }),
                ...(wheelClosedType.itGatewayTwo && { itGatewayTwo: wheelClosedType.itGatewayTwo }),
                ...(wheelClosedType.itSubnetTwo && { itSubnetTwo: wheelClosedType.itSubnetTwo }),
                ...(wheelClosedType.itDNSTwo && { itDNSTwo: wheelClosedType.itDNSTwo }),
                ...(wheelClosedType.itSMTPTwo && { itSMTPTwo: wheelClosedType.itSMTPTwo }),
                ...(wheelClosedType.itNameThree && { itNameThree: wheelClosedType.itNameThree }),
                ...(wheelClosedType.itIPThree && { itIPThree: wheelClosedType.itIPThree }),
                ...(wheelClosedType.itGatewayThree && { itGatewayThree: wheelClosedType.itGatewayThree }),
                ...(wheelClosedType.itSubnetThree && { itSubnetThree: wheelClosedType.itSubnetThree }),
                ...(wheelClosedType.itDNSThree && { itDNSThree: wheelClosedType.itDNSThree }),
                ...(wheelClosedType.itSMTPThree && { itSMTPThree: wheelClosedType.itSMTPThree }),
                ...(wheelClosedType.itAdditionalNotes && { itAdditionalNotes: wheelClosedType.itAdditionalNotes }),
                ...(wheelClosedType.piuDistance && { piuDistance: wheelClosedType.piuDistance }),
                ...(wheelClosedType.switchDistance && { switchDistance: wheelClosedType.switchDistance }),
                ...(wheelClosedType.ampPickup && { ampPickup: wheelClosedType.ampPickup }),
                ...(wheelClosedType.fromAirTakeUpDistance && { fromAirTakeUpDistance: wheelClosedType.fromAirTakeUpDistance }),
                ...(wheelClosedType.specialControllerOptions && { specialControllerOptions: wheelClosedType.specialControllerOptions })
            },            wheelOpenType: PAF_ESData.wheelOpenType,
            wheelClosedType: PAF_ESData.wheelClosedType,
            openStatus: PAF_ESData.openStatus,
            freeWheelStatus: PAF_ESData.freeWheelStatus,
            guideRollerStatus: PAF_ESData.guideRollerStatus,
            openRaceStyleType: PAF_ESData.openRaceStyleType,
            closedRaceStyleType: PAF_ESData.closedRaceStyleType,
            holeStatus: PAF_ESData.holeStatus,
            actuatorStatus: PAF_ESData.actuatorStatus,
            pivotStatus: PAF_ESData.pivotStatus,
            kingPinStatus: PAF_ESData.kingPinStatus,
            railLubeStatus: PAF_ESData.railLubeStatus,
            externalLubeStatus: PAF_ESData.externalLubeStatus,
            lubeBrand: PAF_ESData.lubeBrand,
            lubeType: PAF_ESData.lubeType,
            lubeViscosity: PAF_ESData.lubeViscosity,
            sideLubeStatus: PAF_ESData.sideLubeStatus,
            topLubeStatus: PAF_ESData.topLubeStatus,
            chainMaster: PAF_ESData.chainMaster,
            ...(PAF_ESData.timerStatus && { timerStatus: PAF_ESData.timerStatus }),
            electricStatus: PAF_ESData.electricStatus,
            pneumaticStatus: PAF_ESData.pneumaticStatus,
            mightyLubeMonitoring: PAF_ESData.mightyLubeMonitoring,
            plcConnection: PAF_ESData.plcConnection,
            otherControllerNotes: PAF_ESData.otherControllerNotes,
            pfUnitType: PAF_ESData.pfUnitType,
            pfOverheadL: PAF_ESData.pfOverheadL,
            pfOverheadG: PAF_ESData.pfOverheadG,
            pfOverheadH: PAF_ESData.pfOverheadH,
            pfInvertedB: PAF_ESData.pfInvertedB,
            pfInvertedG: PAF_ESData.pfInvertedG,
            pfInvertedH: PAF_ESData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_ES"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_ES entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;