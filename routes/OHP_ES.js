const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_ES = require("../models/OHP_ES");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: OHP_ESData.templateB.existingMonitor,
                newMonitor: OHP_ESData.templateB.newMonitor,
                ...(OHP_ESData.templateB.dcuStatus && { dcuStatus: OHP_ESData.templateB.dcuStatus }),
                ...(OHP_ESData.templateB.dcuNum && { dcuNum: OHP_ESData.templateB.dcuNum }),
                ...(OHP_ESData.templateB.existingWindows && { existingWindows: OHP_ESData.templateB.existingWindows }),
                ...(OHP_ESData.templateB.existingHeadUnit && { existingHeadUnit: OHP_ESData.templateB.existingHeadUnit }),
                ...(OHP_ESData.templateB.existingDCU && { existingDCU: OHP_ESData.templateB.existingDCU }),
                ...(OHP_ESData.templateB.existingPowerInterface && { existingPowerInterface: OHP_ESData.templateB.existingPowerInterface }),
                ...(OHP_ESData.templateB.newReservoir && { newReservoir: OHP_ESData.templateB.newReservoir }),
                ...(OHP_ESData.templateB.reservoirSize && { reservoirSize: OHP_ESData.templateB.reservoirSize }),
                ...(OHP_ESData.templateB.otherReservoirSize && { otherReservoirSize: OHP_ESData.templateB.otherReservoirSize }),
                ...(OHP_ESData.templateB.newReservoirNum && { newReservoirNum: OHP_ESData.templateB.newReservoirNum }),
                ...(OHP_ESData.templateB.typeMonitor && { typeMonitor: OHP_ESData.templateB.typeMonitor }),
                ...(OHP_ESData.templateB.driveMotorAmp && { driveMotorAmp: OHP_ESData.templateB.driveMotorAmp }),
                ...(OHP_ESData.templateB.driveMotorAmpNum && { driveMotorAmpNum: OHP_ESData.templateB.driveMotorAmpNum }),
                ...(OHP_ESData.templateB.driveTakeUpAir && { driveTakeUpAir: OHP_ESData.templateB.driveTakeUpAir }),
                ...(OHP_ESData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_ESData.templateB.driveTakeUpAirNum }),
                ...(OHP_ESData.templateB.takeUpDistance && { takeUpDistance: OHP_ESData.templateB.takeUpDistance }),
                ...(OHP_ESData.templateB.takeUpDistanceNum && { takeUpDistanceNum: OHP_ESData.templateB.takeUpDistanceNum }),
                ...(OHP_ESData.templateB.driveTemp && { driveTemp: OHP_ESData.templateB.driveTemp }),
                ...(OHP_ESData.templateB.driveTempNum && { driveTempNum: OHP_ESData.templateB.driveTempNum }),
                ...(OHP_ESData.templateB.driveVibration && { driveVibration: OHP_ESData.templateB.driveVibration }),
                ...(OHP_ESData.templateB.driveVibrationNum && { driveVibrationNum: OHP_ESData.templateB.driveVibrationNum }),
                ...(OHP_ESData.templateB.dogPitch && { dogPitch: OHP_ESData.templateB.dogPitch }),
                ...(OHP_ESData.templateB.dogPitchNum && { dogPitchNum: OHP_ESData.templateB.dogPitchNum }),
                ...(OHP_ESData.templateB.paintMarker && { paintMarker: OHP_ESData.templateB.paintMarker }),
                ...(OHP_ESData.templateB.paintMarkerNum && { paintMarkerNum: OHP_ESData.templateB.paintMarkerNum }),
                ...(OHP_ESData.templateB.chainVision && { chainVision: OHP_ESData.templateB.chainVision }),
                ...(OHP_ESData.templateB.lubeVision && { lubeVision: OHP_ESData.templateB.lubeVision }),
                ...(OHP_ESData.templateB.trolleyVision && { trolleyVision: OHP_ESData.templateB.trolleyVision }),
                ...(OHP_ESData.templateB.trolleyDetect && { trolleyDetect: OHP_ESData.templateB.trolleyDetect }),
                ...(OHP_ESData.templateB.omniView && { omniView: OHP_ESData.templateB.omniView }),
                ...(OHP_ESData.templateB.dcuUpgradeNum && { dcuUpgradeNum: OHP_ESData.templateB.dcuUpgradeNum }),
                ...(OHP_ESData.templateB.itNameOne && { itNameOne: OHP_ESData.templateB.itNameOne }),
                ...(OHP_ESData.templateB.itIPOne && { itIPOne: OHP_ESData.templateB.itIPOne }),
                ...(OHP_ESData.templateB.itGatewayOne && { itGatewayOne: OHP_ESData.templateB.itGatewayOne }),
                ...(OHP_ESData.templateB.itSubnetOne && { itSubnetOne: OHP_ESData.templateB.itSubnetOne }),
                ...(OHP_ESData.templateB.itDNSOne && { itDNSOne: OHP_ESData.templateB.itDNSOne }),
                ...(OHP_ESData.templateB.itSMTPOne && { itSMTPOne: OHP_ESData.templateB.itSMTPOne }),
                ...(OHP_ESData.templateB.itNameTwo && { itNameTwo: OHP_ESData.templateB.itNameTwo }),
                ...(OHP_ESData.templateB.itIPTwo && { itIPTwo: OHP_ESData.templateB.itIPTwo }),
                ...(OHP_ESData.templateB.itGatewayTwo && { itGatewayTwo: OHP_ESData.templateB.itGatewayTwo }),
                ...(OHP_ESData.templateB.itSubnetTwo && { itSubnetTwo: OHP_ESData.templateB.itSubnetTwo }),
                ...(OHP_ESData.templateB.itDNSTwo && { itDNSTwo: OHP_ESData.templateB.itDNSTwo }),
                ...(OHP_ESData.templateB.itSMTPTwo && { itSMTPTwo: OHP_ESData.templateB.itSMTPTwo }),
                ...(OHP_ESData.templateB.itNameThree && { itNameThree: OHP_ESData.templateB.itNameThree }),
                ...(OHP_ESData.templateB.itIPThree && { itIPThree: OHP_ESData.templateB.itIPThree }),
                ...(OHP_ESData.templateB.itGatewayThree && { itGatewayThree: OHP_ESData.templateB.itGatewayThree }),
                ...(OHP_ESData.templateB.itSubnetThree && { itSubnetThree: OHP_ESData.templateB.itSubnetThree }),
                ...(OHP_ESData.templateB.itDNSThree && { itDNSThree: OHP_ESData.templateB.itDNSThree }),
                ...(OHP_ESData.templateB.itSMTPThree && { itSMTPThree: OHP_ESData.templateB.itSMTPThree }),
                ...(OHP_ESData.templateB.itAdditionalNotes && { itAdditionalNotes: OHP_ESData.templateB.itAdditionalNotes }),
                ...(OHP_ESData.templateB.piuDistance && { piuDistance: OHP_ESData.templateB.piuDistance }),
                ...(OHP_ESData.templateB.switchDistance && { switchDistance: OHP_ESData.templateB.switchDistance }),
                ...(OHP_ESData.templateB.ampPickup && { ampPickup: OHP_ESData.templateB.ampPickup }),
                ...(OHP_ESData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_ESData.templateB.fromAirTakeUpDistance }),
                ...(OHP_ESData.templateB.specialControllerOptions && { specialControllerOptions: OHP_ESData.templateB.specialControllerOptions })
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