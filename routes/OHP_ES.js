const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_ES = require("../models/OHP_ES");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_ESData, numRequested } = req.body;
        const order = new OHP_ES({
            conveyorName: OHP_ESData.conveyorName,
            chainSize: OHP_ESData.chainSize,
            ...(OHP_ESData.otherChainSize && { otherChainSize: OHP_ESData.otherChainSize }),
            industrialChainManufacturer: OHP_ESData.industrialChainManufacturer,
            ...(OHP_ESData.otherChainManufacturer && { otherChainManufacturer: OHP_ESData.otherChainManufacturer }),
            conveyorLength: OHP_ESData.conveyorLength,
            conveyorLengthUnit: OHP_ESData.conveyorLengthUnit,
            conveyorSpeed: OHP_ESData.conveyorSpeed,
            conveyorSpeedUnit: OHP_ESData.conveyorSpeedUnit,
            conveyorIndex: OHP_ESData.conveyorIndex,
            travelDirection: OHP_ESData.travelDirection,
            appEnviroment: OHP_ESData.appEnviroment,
            ...(OHP_ESData.ovenStatus && { ovenStatus: OHP_ESData.ovenStatus }),
            ...(OHP_ESData.ovenTemp && { ovenTemp: OHP_ESData.ovenTemp }),
            newMonitorStatus: OHP_ESData.newMonitorStatus,
            conveyorLoaded: OHP_ESData.conveyorLoaded,
            conveyorSwing: OHP_ESData.conveyorSwing,
            operatingVoltSingle: OHP_ESData.operatingVoltSingle,
            controlVoltSingle: OHP_ESData.controlVoltSingle,
            monitorData: new templateA({
                existingMonitor: OHP_ESData.templateA.existingMonitor,
                newMonitor: OHP_ESData.templateA.newMonitor,
                ...(OHP_ESData.templateA.dcuStatus && { dcuStatus: OHP_ESData.templateA.dcuStatus }),
                ...(OHP_ESData.templateA.dcuNum && { dcuNum: OHP_ESData.templateA.dcuNum }),
                ...(OHP_ESData.templateA.existingWindows && { existingWindows: OHP_ESData.templateA.existingWindows }),
                ...(OHP_ESData.templateA.existingHeadUnit && { existingHeadUnit: OHP_ESData.templateA.existingHeadUnit }),
                ...(OHP_ESData.templateA.existingDCU && { existingDCU: OHP_ESData.templateA.existingDCU }),
                ...(OHP_ESData.templateA.existingPowerInterface && { existingPowerInterface: OHP_ESData.templateA.existingPowerInterface }),
                ...(OHP_ESData.templateA.newReservoir && { newReservoir: OHP_ESData.templateA.newReservoir }),
                ...(OHP_ESData.templateA.reservoirSize && { reservoirSize: OHP_ESData.templateA.reservoirSize }),
                ...(OHP_ESData.templateA.otherReservoirSize && { otherReservoirSize: OHP_ESData.templateA.otherReservoirSize }),
                ...(OHP_ESData.templateA.newReservoirNum && { newReservoirNum: OHP_ESData.templateA.newReservoirNum }),
                ...(OHP_ESData.templateA.typeMonitor && { typeMonitor: OHP_ESData.templateA.typeMonitor }),
                ...(OHP_ESData.templateA.driveMotorAmp && { driveMotorAmp: OHP_ESData.templateA.driveMotorAmp }),
                ...(OHP_ESData.templateA.driveMotorAmpNum && { driveMotorAmpNum: OHP_ESData.templateA.driveMotorAmpNum }),
                ...(OHP_ESData.templateA.driveTakeUpAir && { driveTakeUpAir: OHP_ESData.templateA.driveTakeUpAir }),
                ...(OHP_ESData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_ESData.templateA.driveTakeUpAirNum }),
                ...(OHP_ESData.templateA.takeUpDistance && { takeUpDistance: OHP_ESData.templateA.takeUpDistance }),
                ...(OHP_ESData.templateA.takeUpDistanceNum && { takeUpDistanceNum: OHP_ESData.templateA.takeUpDistanceNum }),
                ...(OHP_ESData.templateA.driveTemp && { driveTemp: OHP_ESData.templateA.driveTemp }),
                ...(OHP_ESData.templateA.driveTempNum && { driveTempNum: OHP_ESData.templateA.driveTempNum }),
                ...(OHP_ESData.templateA.driveVibration && { driveVibration: OHP_ESData.templateA.driveVibration }),
                ...(OHP_ESData.templateA.driveVibrationNum && { driveVibrationNum: OHP_ESData.templateA.driveVibrationNum }),
                ...(OHP_ESData.templateA.dogPitch && { dogPitch: OHP_ESData.templateA.dogPitch }),
                ...(OHP_ESData.templateA.dogPitchNum && { dogPitchNum: OHP_ESData.templateA.dogPitchNum }),
                ...(OHP_ESData.templateA.paintMarker && { paintMarker: OHP_ESData.templateA.paintMarker }),
                ...(OHP_ESData.templateA.paintMarkerNum && { paintMarkerNum: OHP_ESData.templateA.paintMarkerNum }),
                ...(OHP_ESData.templateA.chainVision && { chainVision: OHP_ESData.templateA.chainVision }),
                ...(OHP_ESData.templateA.lubeVision && { lubeVision: OHP_ESData.templateA.lubeVision }),
                ...(OHP_ESData.templateA.trolleyVision && { trolleyVision: OHP_ESData.templateA.trolleyVision }),
                ...(OHP_ESData.templateA.trolleyDetect && { trolleyDetect: OHP_ESData.templateA.trolleyDetect }),
                ...(OHP_ESData.templateA.omniView && { omniView: OHP_ESData.templateA.omniView }),
                ...(OHP_ESData.templateA.dcuUpgradeNum && { dcuUpgradeNum: OHP_ESData.templateA.dcuUpgradeNum }),
                ...(OHP_ESData.templateA.itNameOne && { itNameOne: OHP_ESData.templateA.itNameOne }),
                ...(OHP_ESData.templateA.itIPOne && { itIPOne: OHP_ESData.templateA.itIPOne }),
                ...(OHP_ESData.templateA.itGatewayOne && { itGatewayOne: OHP_ESData.templateA.itGatewayOne }),
                ...(OHP_ESData.templateA.itSubnetOne && { itSubnetOne: OHP_ESData.templateA.itSubnetOne }),
                ...(OHP_ESData.templateA.itDNSOne && { itDNSOne: OHP_ESData.templateA.itDNSOne }),
                ...(OHP_ESData.templateA.itSMTPOne && { itSMTPOne: OHP_ESData.templateA.itSMTPOne }),
                ...(OHP_ESData.templateA.itNameTwo && { itNameTwo: OHP_ESData.templateA.itNameTwo }),
                ...(OHP_ESData.templateA.itIPTwo && { itIPTwo: OHP_ESData.templateA.itIPTwo }),
                ...(OHP_ESData.templateA.itGatewayTwo && { itGatewayTwo: OHP_ESData.templateA.itGatewayTwo }),
                ...(OHP_ESData.templateA.itSubnetTwo && { itSubnetTwo: OHP_ESData.templateA.itSubnetTwo }),
                ...(OHP_ESData.templateA.itDNSTwo && { itDNSTwo: OHP_ESData.templateA.itDNSTwo }),
                ...(OHP_ESData.templateA.itSMTPTwo && { itSMTPTwo: OHP_ESData.templateA.itSMTPTwo }),
                ...(OHP_ESData.templateA.itNameThree && { itNameThree: OHP_ESData.templateA.itNameThree }),
                ...(OHP_ESData.templateA.itIPThree && { itIPThree: OHP_ESData.templateA.itIPThree }),
                ...(OHP_ESData.templateA.itGatewayThree && { itGatewayThree: OHP_ESData.templateA.itGatewayThree }),
                ...(OHP_ESData.templateA.itSubnetThree && { itSubnetThree: OHP_ESData.templateA.itSubnetThree }),
                ...(OHP_ESData.templateA.itDNSThree && { itDNSThree: OHP_ESData.templateA.itDNSThree }),
                ...(OHP_ESData.templateA.itSMTPThree && { itSMTPThree: OHP_ESData.templateA.itSMTPThree }),
                ...(OHP_ESData.templateA.itAdditionalNotes && { itAdditionalNotes: OHP_ESData.templateA.itAdditionalNotes }),
                ...(OHP_ESData.templateA.piuDistance && { piuDistance: OHP_ESData.templateA.piuDistance }),
                ...(OHP_ESData.templateA.switchDistance && { switchDistance: OHP_ESData.templateA.switchDistance }),
                ...(OHP_ESData.templateA.ampPickup && { ampPickup: OHP_ESData.templateA.ampPickup }),
                ...(OHP_ESData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_ESData.templateA.fromAirTakeUpDistance }),
                ...(OHP_ESData.templateA.specialControllerOptions && { specialControllerOptions: OHP_ESData.templateA.specialControllerOptions })
            }),
            wheelOpenType: OHP_ESData.wheelOpenType,
            wheelClosedType: OHP_ESData.wheelClosedType,
            openStatus: OHP_ESData.openStatus,
            freeWheelStatus: OHP_ESData.freeWheelStatus,
            guideRollerStatus: OHP_ESData.guideRollerStatus,
            openRaceStyleType: OHP_ESData.openRaceStyleType,
            closedRaceStyleType: OHP_ESData.closedRaceStyleType,
            holeStatus: OHP_ESData.holeStatus,
            actuatorStatus: OHP_ESData.actuatorStatus,
            pivotStatus: OHP_ESData.pivotStatus,
            kingPinStatus: OHP_ESData.kingPinStatus,
            railLubeStatus: OHP_ESData.railLubeStatus,
            externalLubeStatus: OHP_ESData.externalLubeStatus,
            lubeBrand: OHP_ESData.lubeBrand,
            lubeType: OHP_ESData.lubeType,
            lubeViscosity: OHP_ESData.lubeViscosity,
            sideLubeStatus: OHP_ESData.sideLubeStatus,
            topLubeStatus: OHP_ESData.topLubeStatus,
            chainMaster: OHP_ESData.chainMaster,
            ...(OHP_ESData.timerStatus && { timerStatus: OHP_ESData.timerStatus }),
            electricStatus: OHP_ESData.electricStatus,
            pneumaticStatus: OHP_ESData.pneumaticStatus,
            mightyLubeMonitoring: OHP_ESData.mightyLubeMonitoring,
            plcConnection: OHP_ESData.plcConnection,
            otherControllerNotes: OHP_ESData.otherControllerNotes,
            ohpUnitType: OHP_ESData.ohpUnitType,
            chainDrop: OHP_ESData.chainDrop,
            ohpDiameter: OHP_ESData.ohpDiameter,
            ohpWidth: OHP_ESData.ohpWidth,
            ohpHeight: OHP_ESData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_ES"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_ES entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;