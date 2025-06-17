const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP139A = require("../models/OHP_OP139A");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP139AData, numRequested } = req.body;
        const order = new OHP_OP139A({
            conveyorName: OHP_OP139AData.conveyorName,
            chainSize: OHP_OP139AData.chainSize,
            ...(OHP_OP139AData.otherChainSize && { otherChainSize: OHP_OP139AData.otherChainSize }),
            industrialChainManufacturer: OHP_OP139AData.industrialChainManufacturer,
            ...(OHP_OP139AData.otherChainManufacturer && { otherChainManufacturer: OHP_OP139AData.otherChainManufacturer }),
            conveyorLength: OHP_OP139AData.conveyorLength,
            conveyorLengthUnit: OHP_OP139AData.conveyorLengthUnit,
            conveyorSpeed: OHP_OP139AData.conveyorSpeed,
            conveyorSpeedUnit: OHP_OP139AData.conveyorSpeedUnit,
            conveyorIndex: OHP_OP139AData.conveyorIndex,
            travelDirection: OHP_OP139AData.travelDirection,
            appEnviroment: OHP_OP139AData.appEnviroment,
            ...(OHP_OP139AData.ovenStatus && { ovenStatus: OHP_OP139AData.ovenStatus }),
            ...(OHP_OP139AData.ovenTemp && { ovenTemp: OHP_OP139AData.ovenTemp }),
            surroundingTemp: OHP_OP139AData.surroundingTemp,
            conveyorLoaded: OHP_OP139AData.conveyorLoaded,
            conveyorSwing: OHP_OP139AData.conveyorSwing,
            controlVoltSingle: OHP_OP139AData.controlVoltSingle,
            compressedAir: OHP_OP139AData.compressedAir,
            airSupplyType: OHP_OP139AData.airSupplyType,
            monitorData: new templateA({
                existingMonitor: OHP_OP139AData.templateA.existingMonitor,
                newMonitor: OHP_OP139AData.templateA.newMonitor,
                ...(OHP_OP139AData.templateA.dcuStatus && { dcuStatus: OHP_OP139AData.templateA.dcuStatus }),
                ...(OHP_OP139AData.templateA.dcuNum && { dcuNum: OHP_OP139AData.templateA.dcuNum }),
                ...(OHP_OP139AData.templateA.existingWindows && { existingWindows: OHP_OP139AData.templateA.existingWindows }),
                ...(OHP_OP139AData.templateA.existingHeadUnit && { existingHeadUnit: OHP_OP139AData.templateA.existingHeadUnit }),
                ...(OHP_OP139AData.templateA.existingDCU && { existingDCU: OHP_OP139AData.templateA.existingDCU }),
                ...(OHP_OP139AData.templateA.existingPowerInterface && { existingPowerInterface: OHP_OP139AData.templateA.existingPowerInterface }),
                ...(OHP_OP139AData.templateA.newReservoir && { newReservoir: OHP_OP139AData.templateA.newReservoir }),
                ...(OHP_OP139AData.templateA.reservoirSize && { reservoirSize: OHP_OP139AData.templateA.reservoirSize }),
                ...(OHP_OP139AData.templateA.otherReservoirSize && { otherReservoirSize: OHP_OP139AData.templateA.otherReservoirSize }),
                ...(OHP_OP139AData.templateA.newReservoirNum && { newReservoirNum: OHP_OP139AData.templateA.newReservoirNum }),
                ...(OHP_OP139AData.templateA.typeMonitor && { typeMonitor: OHP_OP139AData.templateA.typeMonitor }),
                ...(OHP_OP139AData.templateA.driveMotorAmp && { driveMotorAmp: OHP_OP139AData.templateA.driveMotorAmp }),
                ...(OHP_OP139AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: OHP_OP139AData.templateA.driveMotorAmpNum }),
                ...(OHP_OP139AData.templateA.driveTakeUpAir && { driveTakeUpAir: OHP_OP139AData.templateA.driveTakeUpAir }),
                ...(OHP_OP139AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_OP139AData.templateA.driveTakeUpAirNum }),
                ...(OHP_OP139AData.templateA.takeUpDistance && { takeUpDistance: OHP_OP139AData.templateA.takeUpDistance }),
                ...(OHP_OP139AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: OHP_OP139AData.templateA.takeUpDistanceNum }),
                ...(OHP_OP139AData.templateA.driveTemp && { driveTemp: OHP_OP139AData.templateA.driveTemp }),
                ...(OHP_OP139AData.templateA.driveTempNum && { driveTempNum: OHP_OP139AData.templateA.driveTempNum }),
                ...(OHP_OP139AData.templateA.driveVibration && { driveVibration: OHP_OP139AData.templateA.driveVibration }),
                ...(OHP_OP139AData.templateA.driveVibrationNum && { driveVibrationNum: OHP_OP139AData.templateA.driveVibrationNum }),
                ...(OHP_OP139AData.templateA.dogPitch && { dogPitch: OHP_OP139AData.templateA.dogPitch }),
                ...(OHP_OP139AData.templateA.dogPitchNum && { dogPitchNum: OHP_OP139AData.templateA.dogPitchNum }),
                ...(OHP_OP139AData.templateA.paintMarker && { paintMarker: OHP_OP139AData.templateA.paintMarker }),
                ...(OHP_OP139AData.templateA.paintMarkerNum && { paintMarkerNum: OHP_OP139AData.templateA.paintMarkerNum }),
                ...(OHP_OP139AData.templateA.chainVision && { chainVision: OHP_OP139AData.templateA.chainVision }),
                ...(OHP_OP139AData.templateA.lubeVision && { lubeVision: OHP_OP139AData.templateA.lubeVision }),
                ...(OHP_OP139AData.templateA.trolleyVision && { trolleyVision: OHP_OP139AData.templateA.trolleyVision }),
                ...(OHP_OP139AData.templateA.trolleyDetect && { trolleyDetect: OHP_OP139AData.templateA.trolleyDetect }),
                ...(OHP_OP139AData.templateA.omniView && { omniView: OHP_OP139AData.templateA.omniView }),
                ...(OHP_OP139AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: OHP_OP139AData.templateA.dcuUpgradeNum }),
                ...(OHP_OP139AData.templateA.itNameOne && { itNameOne: OHP_OP139AData.templateA.itNameOne }),
                ...(OHP_OP139AData.templateA.itIPOne && { itIPOne: OHP_OP139AData.templateA.itIPOne }),
                ...(OHP_OP139AData.templateA.itGatewayOne && { itGatewayOne: OHP_OP139AData.templateA.itGatewayOne }),
                ...(OHP_OP139AData.templateA.itSubnetOne && { itSubnetOne: OHP_OP139AData.templateA.itSubnetOne }),
                ...(OHP_OP139AData.templateA.itDNSOne && { itDNSOne: OHP_OP139AData.templateA.itDNSOne }),
                ...(OHP_OP139AData.templateA.itSMTPOne && { itSMTPOne: OHP_OP139AData.templateA.itSMTPOne }),
                ...(OHP_OP139AData.templateA.itNameTwo && { itNameTwo: OHP_OP139AData.templateA.itNameTwo }),
                ...(OHP_OP139AData.templateA.itIPTwo && { itIPTwo: OHP_OP139AData.templateA.itIPTwo }),
                ...(OHP_OP139AData.templateA.itGatewayTwo && { itGatewayTwo: OHP_OP139AData.templateA.itGatewayTwo }),
                ...(OHP_OP139AData.templateA.itSubnetTwo && { itSubnetTwo: OHP_OP139AData.templateA.itSubnetTwo }),
                ...(OHP_OP139AData.templateA.itDNSTwo && { itDNSTwo: OHP_OP139AData.templateA.itDNSTwo }),
                ...(OHP_OP139AData.templateA.itSMTPTwo && { itSMTPTwo: OHP_OP139AData.templateA.itSMTPTwo }),
                ...(OHP_OP139AData.templateA.itNameThree && { itNameThree: OHP_OP139AData.templateA.itNameThree }),
                ...(OHP_OP139AData.templateA.itIPThree && { itIPThree: OHP_OP139AData.templateA.itIPThree }),
                ...(OHP_OP139AData.templateA.itGatewayThree && { itGatewayThree: OHP_OP139AData.templateA.itGatewayThree }),
                ...(OHP_OP139AData.templateA.itSubnetThree && { itSubnetThree: OHP_OP139AData.templateA.itSubnetThree }),
                ...(OHP_OP139AData.templateA.itDNSThree && { itDNSThree: OHP_OP139AData.templateA.itDNSThree }),
                ...(OHP_OP139AData.templateA.itSMTPThree && { itSMTPThree: OHP_OP139AData.templateA.itSMTPThree }),
                ...(OHP_OP139AData.templateA.itAdditionalNotes && { itAdditionalNotes: OHP_OP139AData.templateA.itAdditionalNotes }),
                ...(OHP_OP139AData.templateA.piuDistance && { piuDistance: OHP_OP139AData.templateA.piuDistance }),
                ...(OHP_OP139AData.templateA.switchDistance && { switchDistance: OHP_OP139AData.templateA.switchDistance }),
                ...(OHP_OP139AData.templateA.ampPickup && { ampPickup: OHP_OP139AData.templateA.ampPickup }),
                ...(OHP_OP139AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_OP139AData.templateA.fromAirTakeUpDistance }),
                ...(OHP_OP139AData.templateA.specialControllerOptions && { specialControllerOptions: OHP_OP139AData.templateA.specialControllerOptions })
            }),
            railLubeStatus: OHP_OP139AData.railLubeStatus,
            lubeBrand: OHP_OP139AData.lubeBrand,
            lubeType: OHP_OP139AData.lubeType,
            lubeViscosity: OHP_OP139AData.lubeViscosity,
            sideLubeStatus: OHP_OP139AData.sideLubeStatus,
            topLubeStatus: OHP_OP139AData.topLubeStatus,
            chainCleanStatus: OHP_OP139AData.chainCleanStatus,
            chainMaster: OHP_OP139AData.chainMaster,
            otherUnitStatus: OHP_OP139AData.otherUnitStatus,
            ...(OHP_OP139AData.timerStatus && { timerStatus: OHP_OP139AData.timerStatus }),
            electricStatus: OHP_OP139AData.electricStatus,
            pneumaticStatus: OHP_OP139AData.pneumaticStatus,
            mightyLubeMonitoring: OHP_OP139AData.mightyLubeMonitoring,
            plcConnection: OHP_OP139AData.plcConnection,
            otherControllerNotes: OHP_OP139AData.otherControllerNotes,
            ohpUnitType: OHP_OP139AData.ohpUnitType,
            chainDrop: OHP_OP139AData.chainDrop,
            ohpDiameter: OHP_OP139AData.ohpDiameter,
            ohpWidth: OHP_OP139AData.ohpWidth,
            ohpHeight: OHP_OP139AData.ohpHeight,
            radioButtonType: OHP_OP139AData.radioButtonType
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP139A"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP139A entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;