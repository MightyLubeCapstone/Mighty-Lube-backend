const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_ES = require("../models/PAF_ES");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: wheelClosedType.templateB.existingMonitor,
                newMonitor: wheelClosedType.templateB.newMonitor,
                ...(wheelClosedType.templateB.dcuStatus && { dcuStatus: wheelClosedType.templateB.dcuStatus }),
                ...(wheelClosedType.templateB.dcuNum && { dcuNum: wheelClosedType.templateB.dcuNum }),
                ...(wheelClosedType.templateB.existingWindows && { existingWindows: wheelClosedType.templateB.existingWindows }),
                ...(wheelClosedType.templateB.existingHeadUnit && { existingHeadUnit: wheelClosedType.templateB.existingHeadUnit }),
                ...(wheelClosedType.templateB.existingDCU && { existingDCU: wheelClosedType.templateB.existingDCU }),
                ...(wheelClosedType.templateB.existingPowerInterface && { existingPowerInterface: wheelClosedType.templateB.existingPowerInterface }),
                ...(wheelClosedType.templateB.newReservoir && { newReservoir: wheelClosedType.templateB.newReservoir }),
                ...(wheelClosedType.templateB.reservoirSize && { reservoirSize: wheelClosedType.templateB.reservoirSize }),
                ...(wheelClosedType.templateB.otherReservoirSize && { otherReservoirSize: wheelClosedType.templateB.otherReservoirSize }),
                ...(wheelClosedType.templateB.newReservoirNum && { newReservoirNum: wheelClosedType.templateB.newReservoirNum }),
                ...(wheelClosedType.templateB.typeMonitor && { typeMonitor: wheelClosedType.templateB.typeMonitor }),
                ...(wheelClosedType.templateB.driveMotorAmp && { driveMotorAmp: wheelClosedType.templateB.driveMotorAmp }),
                ...(wheelClosedType.templateB.driveMotorAmpNum && { driveMotorAmpNum: wheelClosedType.templateB.driveMotorAmpNum }),
                ...(wheelClosedType.templateB.driveTakeUpAir && { driveTakeUpAir: wheelClosedType.templateB.driveTakeUpAir }),
                ...(wheelClosedType.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: wheelClosedType.templateB.driveTakeUpAirNum }),
                ...(wheelClosedType.templateB.takeUpDistance && { takeUpDistance: wheelClosedType.templateB.takeUpDistance }),
                ...(wheelClosedType.templateB.takeUpDistanceNum && { takeUpDistanceNum: wheelClosedType.templateB.takeUpDistanceNum }),
                ...(wheelClosedType.templateB.driveTemp && { driveTemp: wheelClosedType.templateB.driveTemp }),
                ...(wheelClosedType.templateB.driveTempNum && { driveTempNum: wheelClosedType.templateB.driveTempNum }),
                ...(wheelClosedType.templateB.driveVibration && { driveVibration: wheelClosedType.templateB.driveVibration }),
                ...(wheelClosedType.templateB.driveVibrationNum && { driveVibrationNum: wheelClosedType.templateB.driveVibrationNum }),
                ...(wheelClosedType.templateB.dogPitch && { dogPitch: wheelClosedType.templateB.dogPitch }),
                ...(wheelClosedType.templateB.dogPitchNum && { dogPitchNum: wheelClosedType.templateB.dogPitchNum }),
                ...(wheelClosedType.templateB.paintMarker && { paintMarker: wheelClosedType.templateB.paintMarker }),
                ...(wheelClosedType.templateB.paintMarkerNum && { paintMarkerNum: wheelClosedType.templateB.paintMarkerNum }),
                ...(wheelClosedType.templateB.chainVision && { chainVision: wheelClosedType.templateB.chainVision }),
                ...(wheelClosedType.templateB.lubeVision && { lubeVision: wheelClosedType.templateB.lubeVision }),
                ...(wheelClosedType.templateB.trolleyVision && { trolleyVision: wheelClosedType.templateB.trolleyVision }),
                ...(wheelClosedType.templateB.trolleyDetect && { trolleyDetect: wheelClosedType.templateB.trolleyDetect }),
                ...(wheelClosedType.templateB.omniView && { omniView: wheelClosedType.templateB.omniView }),
                ...(wheelClosedType.templateB.dcuUpgradeNum && { dcuUpgradeNum: wheelClosedType.templateB.dcuUpgradeNum }),
                ...(wheelClosedType.templateB.itNameOne && { itNameOne: wheelClosedType.templateB.itNameOne }),
                ...(wheelClosedType.templateB.itIPOne && { itIPOne: wheelClosedType.templateB.itIPOne }),
                ...(wheelClosedType.templateB.itGatewayOne && { itGatewayOne: wheelClosedType.templateB.itGatewayOne }),
                ...(wheelClosedType.templateB.itSubnetOne && { itSubnetOne: wheelClosedType.templateB.itSubnetOne }),
                ...(wheelClosedType.templateB.itDNSOne && { itDNSOne: wheelClosedType.templateB.itDNSOne }),
                ...(wheelClosedType.templateB.itSMTPOne && { itSMTPOne: wheelClosedType.templateB.itSMTPOne }),
                ...(wheelClosedType.templateB.itNameTwo && { itNameTwo: wheelClosedType.templateB.itNameTwo }),
                ...(wheelClosedType.templateB.itIPTwo && { itIPTwo: wheelClosedType.templateB.itIPTwo }),
                ...(wheelClosedType.templateB.itGatewayTwo && { itGatewayTwo: wheelClosedType.templateB.itGatewayTwo }),
                ...(wheelClosedType.templateB.itSubnetTwo && { itSubnetTwo: wheelClosedType.templateB.itSubnetTwo }),
                ...(wheelClosedType.templateB.itDNSTwo && { itDNSTwo: wheelClosedType.templateB.itDNSTwo }),
                ...(wheelClosedType.templateB.itSMTPTwo && { itSMTPTwo: wheelClosedType.templateB.itSMTPTwo }),
                ...(wheelClosedType.templateB.itNameThree && { itNameThree: wheelClosedType.templateB.itNameThree }),
                ...(wheelClosedType.templateB.itIPThree && { itIPThree: wheelClosedType.templateB.itIPThree }),
                ...(wheelClosedType.templateB.itGatewayThree && { itGatewayThree: wheelClosedType.templateB.itGatewayThree }),
                ...(wheelClosedType.templateB.itSubnetThree && { itSubnetThree: wheelClosedType.templateB.itSubnetThree }),
                ...(wheelClosedType.templateB.itDNSThree && { itDNSThree: wheelClosedType.templateB.itDNSThree }),
                ...(wheelClosedType.templateB.itSMTPThree && { itSMTPThree: wheelClosedType.templateB.itSMTPThree }),
                ...(wheelClosedType.templateB.itAdditionalNotes && { itAdditionalNotes: wheelClosedType.templateB.itAdditionalNotes }),
                ...(wheelClosedType.templateB.piuDistance && { piuDistance: wheelClosedType.templateB.piuDistance }),
                ...(wheelClosedType.templateB.switchDistance && { switchDistance: wheelClosedType.templateB.switchDistance }),
                ...(wheelClosedType.templateB.ampPickup && { ampPickup: wheelClosedType.templateB.ampPickup }),
                ...(wheelClosedType.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: wheelClosedType.templateB.fromAirTakeUpDistance }),
                ...(wheelClosedType.templateB.specialControllerOptions && { specialControllerOptions: wheelClosedType.templateB.specialControllerOptions })
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