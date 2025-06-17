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
            monitorData: new templateA({
                existingMonitor: wheelClosedType.templateA.existingMonitor,
                newMonitor: wheelClosedType.templateA.newMonitor,
                ...(wheelClosedType.templateA.dcuStatus && { dcuStatus: wheelClosedType.templateA.dcuStatus }),
                ...(wheelClosedType.templateA.dcuNum && { dcuNum: wheelClosedType.templateA.dcuNum }),
                ...(wheelClosedType.templateA.existingWindows && { existingWindows: wheelClosedType.templateA.existingWindows }),
                ...(wheelClosedType.templateA.existingHeadUnit && { existingHeadUnit: wheelClosedType.templateA.existingHeadUnit }),
                ...(wheelClosedType.templateA.existingDCU && { existingDCU: wheelClosedType.templateA.existingDCU }),
                ...(wheelClosedType.templateA.existingPowerInterface && { existingPowerInterface: wheelClosedType.templateA.existingPowerInterface }),
                ...(wheelClosedType.templateA.newReservoir && { newReservoir: wheelClosedType.templateA.newReservoir }),
                ...(wheelClosedType.templateA.reservoirSize && { reservoirSize: wheelClosedType.templateA.reservoirSize }),
                ...(wheelClosedType.templateA.otherReservoirSize && { otherReservoirSize: wheelClosedType.templateA.otherReservoirSize }),
                ...(wheelClosedType.templateA.newReservoirNum && { newReservoirNum: wheelClosedType.templateA.newReservoirNum }),
                ...(wheelClosedType.templateA.typeMonitor && { typeMonitor: wheelClosedType.templateA.typeMonitor }),
                ...(wheelClosedType.templateA.driveMotorAmp && { driveMotorAmp: wheelClosedType.templateA.driveMotorAmp }),
                ...(wheelClosedType.templateA.driveMotorAmpNum && { driveMotorAmpNum: wheelClosedType.templateA.driveMotorAmpNum }),
                ...(wheelClosedType.templateA.driveTakeUpAir && { driveTakeUpAir: wheelClosedType.templateA.driveTakeUpAir }),
                ...(wheelClosedType.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: wheelClosedType.templateA.driveTakeUpAirNum }),
                ...(wheelClosedType.templateA.takeUpDistance && { takeUpDistance: wheelClosedType.templateA.takeUpDistance }),
                ...(wheelClosedType.templateA.takeUpDistanceNum && { takeUpDistanceNum: wheelClosedType.templateA.takeUpDistanceNum }),
                ...(wheelClosedType.templateA.driveTemp && { driveTemp: wheelClosedType.templateA.driveTemp }),
                ...(wheelClosedType.templateA.driveTempNum && { driveTempNum: wheelClosedType.templateA.driveTempNum }),
                ...(wheelClosedType.templateA.driveVibration && { driveVibration: wheelClosedType.templateA.driveVibration }),
                ...(wheelClosedType.templateA.driveVibrationNum && { driveVibrationNum: wheelClosedType.templateA.driveVibrationNum }),
                ...(wheelClosedType.templateA.dogPitch && { dogPitch: wheelClosedType.templateA.dogPitch }),
                ...(wheelClosedType.templateA.dogPitchNum && { dogPitchNum: wheelClosedType.templateA.dogPitchNum }),
                ...(wheelClosedType.templateA.paintMarker && { paintMarker: wheelClosedType.templateA.paintMarker }),
                ...(wheelClosedType.templateA.paintMarkerNum && { paintMarkerNum: wheelClosedType.templateA.paintMarkerNum }),
                ...(wheelClosedType.templateA.chainVision && { chainVision: wheelClosedType.templateA.chainVision }),
                ...(wheelClosedType.templateA.lubeVision && { lubeVision: wheelClosedType.templateA.lubeVision }),
                ...(wheelClosedType.templateA.trolleyVision && { trolleyVision: wheelClosedType.templateA.trolleyVision }),
                ...(wheelClosedType.templateA.trolleyDetect && { trolleyDetect: wheelClosedType.templateA.trolleyDetect }),
                ...(wheelClosedType.templateA.omniView && { omniView: wheelClosedType.templateA.omniView }),
                ...(wheelClosedType.templateA.dcuUpgradeNum && { dcuUpgradeNum: wheelClosedType.templateA.dcuUpgradeNum }),
                ...(wheelClosedType.templateA.itNameOne && { itNameOne: wheelClosedType.templateA.itNameOne }),
                ...(wheelClosedType.templateA.itIPOne && { itIPOne: wheelClosedType.templateA.itIPOne }),
                ...(wheelClosedType.templateA.itGatewayOne && { itGatewayOne: wheelClosedType.templateA.itGatewayOne }),
                ...(wheelClosedType.templateA.itSubnetOne && { itSubnetOne: wheelClosedType.templateA.itSubnetOne }),
                ...(wheelClosedType.templateA.itDNSOne && { itDNSOne: wheelClosedType.templateA.itDNSOne }),
                ...(wheelClosedType.templateA.itSMTPOne && { itSMTPOne: wheelClosedType.templateA.itSMTPOne }),
                ...(wheelClosedType.templateA.itNameTwo && { itNameTwo: wheelClosedType.templateA.itNameTwo }),
                ...(wheelClosedType.templateA.itIPTwo && { itIPTwo: wheelClosedType.templateA.itIPTwo }),
                ...(wheelClosedType.templateA.itGatewayTwo && { itGatewayTwo: wheelClosedType.templateA.itGatewayTwo }),
                ...(wheelClosedType.templateA.itSubnetTwo && { itSubnetTwo: wheelClosedType.templateA.itSubnetTwo }),
                ...(wheelClosedType.templateA.itDNSTwo && { itDNSTwo: wheelClosedType.templateA.itDNSTwo }),
                ...(wheelClosedType.templateA.itSMTPTwo && { itSMTPTwo: wheelClosedType.templateA.itSMTPTwo }),
                ...(wheelClosedType.templateA.itNameThree && { itNameThree: wheelClosedType.templateA.itNameThree }),
                ...(wheelClosedType.templateA.itIPThree && { itIPThree: wheelClosedType.templateA.itIPThree }),
                ...(wheelClosedType.templateA.itGatewayThree && { itGatewayThree: wheelClosedType.templateA.itGatewayThree }),
                ...(wheelClosedType.templateA.itSubnetThree && { itSubnetThree: wheelClosedType.templateA.itSubnetThree }),
                ...(wheelClosedType.templateA.itDNSThree && { itDNSThree: wheelClosedType.templateA.itDNSThree }),
                ...(wheelClosedType.templateA.itSMTPThree && { itSMTPThree: wheelClosedType.templateA.itSMTPThree }),
                ...(wheelClosedType.templateA.itAdditionalNotes && { itAdditionalNotes: wheelClosedType.templateA.itAdditionalNotes }),
                ...(wheelClosedType.templateA.piuDistance && { piuDistance: wheelClosedType.templateA.piuDistance }),
                ...(wheelClosedType.templateA.switchDistance && { switchDistance: wheelClosedType.templateA.switchDistance }),
                ...(wheelClosedType.templateA.ampPickup && { ampPickup: wheelClosedType.templateA.ampPickup }),
                ...(wheelClosedType.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: wheelClosedType.templateA.fromAirTakeUpDistance }),
                ...(wheelClosedType.templateA.specialControllerOptions && { specialControllerOptions: wheelClosedType.templateA.specialControllerOptions })
            }),            wheelOpenType: PAF_ESData.wheelOpenType,
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