const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP139A = require("../models/OHP_OP139A");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: OHP_OP139AData.templateB.existingMonitor,
                newMonitor: OHP_OP139AData.templateB.newMonitor,
                ...(OHP_OP139AData.templateB.dcuStatus && { dcuStatus: OHP_OP139AData.templateB.dcuStatus }),
                ...(OHP_OP139AData.templateB.dcuNum && { dcuNum: OHP_OP139AData.templateB.dcuNum }),
                ...(OHP_OP139AData.templateB.existingWindows && { existingWindows: OHP_OP139AData.templateB.existingWindows }),
                ...(OHP_OP139AData.templateB.existingHeadUnit && { existingHeadUnit: OHP_OP139AData.templateB.existingHeadUnit }),
                ...(OHP_OP139AData.templateB.existingDCU && { existingDCU: OHP_OP139AData.templateB.existingDCU }),
                ...(OHP_OP139AData.templateB.existingPowerInterface && { existingPowerInterface: OHP_OP139AData.templateB.existingPowerInterface }),
                ...(OHP_OP139AData.templateB.newReservoir && { newReservoir: OHP_OP139AData.templateB.newReservoir }),
                ...(OHP_OP139AData.templateB.reservoirSize && { reservoirSize: OHP_OP139AData.templateB.reservoirSize }),
                ...(OHP_OP139AData.templateB.otherReservoirSize && { otherReservoirSize: OHP_OP139AData.templateB.otherReservoirSize }),
                ...(OHP_OP139AData.templateB.newReservoirNum && { newReservoirNum: OHP_OP139AData.templateB.newReservoirNum }),
                ...(OHP_OP139AData.templateB.typeMonitor && { typeMonitor: OHP_OP139AData.templateB.typeMonitor }),
                ...(OHP_OP139AData.templateB.driveMotorAmp && { driveMotorAmp: OHP_OP139AData.templateB.driveMotorAmp }),
                ...(OHP_OP139AData.templateB.driveMotorAmpNum && { driveMotorAmpNum: OHP_OP139AData.templateB.driveMotorAmpNum }),
                ...(OHP_OP139AData.templateB.driveTakeUpAir && { driveTakeUpAir: OHP_OP139AData.templateB.driveTakeUpAir }),
                ...(OHP_OP139AData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_OP139AData.templateB.driveTakeUpAirNum }),
                ...(OHP_OP139AData.templateB.takeUpDistance && { takeUpDistance: OHP_OP139AData.templateB.takeUpDistance }),
                ...(OHP_OP139AData.templateB.takeUpDistanceNum && { takeUpDistanceNum: OHP_OP139AData.templateB.takeUpDistanceNum }),
                ...(OHP_OP139AData.templateB.driveTemp && { driveTemp: OHP_OP139AData.templateB.driveTemp }),
                ...(OHP_OP139AData.templateB.driveTempNum && { driveTempNum: OHP_OP139AData.templateB.driveTempNum }),
                ...(OHP_OP139AData.templateB.driveVibration && { driveVibration: OHP_OP139AData.templateB.driveVibration }),
                ...(OHP_OP139AData.templateB.driveVibrationNum && { driveVibrationNum: OHP_OP139AData.templateB.driveVibrationNum }),
                ...(OHP_OP139AData.templateB.dogPitch && { dogPitch: OHP_OP139AData.templateB.dogPitch }),
                ...(OHP_OP139AData.templateB.dogPitchNum && { dogPitchNum: OHP_OP139AData.templateB.dogPitchNum }),
                ...(OHP_OP139AData.templateB.paintMarker && { paintMarker: OHP_OP139AData.templateB.paintMarker }),
                ...(OHP_OP139AData.templateB.paintMarkerNum && { paintMarkerNum: OHP_OP139AData.templateB.paintMarkerNum }),
                ...(OHP_OP139AData.templateB.chainVision && { chainVision: OHP_OP139AData.templateB.chainVision }),
                ...(OHP_OP139AData.templateB.lubeVision && { lubeVision: OHP_OP139AData.templateB.lubeVision }),
                ...(OHP_OP139AData.templateB.trolleyVision && { trolleyVision: OHP_OP139AData.templateB.trolleyVision }),
                ...(OHP_OP139AData.templateB.trolleyDetect && { trolleyDetect: OHP_OP139AData.templateB.trolleyDetect }),
                ...(OHP_OP139AData.templateB.omniView && { omniView: OHP_OP139AData.templateB.omniView }),
                ...(OHP_OP139AData.templateB.dcuUpgradeNum && { dcuUpgradeNum: OHP_OP139AData.templateB.dcuUpgradeNum }),
                ...(OHP_OP139AData.templateB.itNameOne && { itNameOne: OHP_OP139AData.templateB.itNameOne }),
                ...(OHP_OP139AData.templateB.itIPOne && { itIPOne: OHP_OP139AData.templateB.itIPOne }),
                ...(OHP_OP139AData.templateB.itGatewayOne && { itGatewayOne: OHP_OP139AData.templateB.itGatewayOne }),
                ...(OHP_OP139AData.templateB.itSubnetOne && { itSubnetOne: OHP_OP139AData.templateB.itSubnetOne }),
                ...(OHP_OP139AData.templateB.itDNSOne && { itDNSOne: OHP_OP139AData.templateB.itDNSOne }),
                ...(OHP_OP139AData.templateB.itSMTPOne && { itSMTPOne: OHP_OP139AData.templateB.itSMTPOne }),
                ...(OHP_OP139AData.templateB.itNameTwo && { itNameTwo: OHP_OP139AData.templateB.itNameTwo }),
                ...(OHP_OP139AData.templateB.itIPTwo && { itIPTwo: OHP_OP139AData.templateB.itIPTwo }),
                ...(OHP_OP139AData.templateB.itGatewayTwo && { itGatewayTwo: OHP_OP139AData.templateB.itGatewayTwo }),
                ...(OHP_OP139AData.templateB.itSubnetTwo && { itSubnetTwo: OHP_OP139AData.templateB.itSubnetTwo }),
                ...(OHP_OP139AData.templateB.itDNSTwo && { itDNSTwo: OHP_OP139AData.templateB.itDNSTwo }),
                ...(OHP_OP139AData.templateB.itSMTPTwo && { itSMTPTwo: OHP_OP139AData.templateB.itSMTPTwo }),
                ...(OHP_OP139AData.templateB.itNameThree && { itNameThree: OHP_OP139AData.templateB.itNameThree }),
                ...(OHP_OP139AData.templateB.itIPThree && { itIPThree: OHP_OP139AData.templateB.itIPThree }),
                ...(OHP_OP139AData.templateB.itGatewayThree && { itGatewayThree: OHP_OP139AData.templateB.itGatewayThree }),
                ...(OHP_OP139AData.templateB.itSubnetThree && { itSubnetThree: OHP_OP139AData.templateB.itSubnetThree }),
                ...(OHP_OP139AData.templateB.itDNSThree && { itDNSThree: OHP_OP139AData.templateB.itDNSThree }),
                ...(OHP_OP139AData.templateB.itSMTPThree && { itSMTPThree: OHP_OP139AData.templateB.itSMTPThree }),
                ...(OHP_OP139AData.templateB.itAdditionalNotes && { itAdditionalNotes: OHP_OP139AData.templateB.itAdditionalNotes }),
                ...(OHP_OP139AData.templateB.piuDistance && { piuDistance: OHP_OP139AData.templateB.piuDistance }),
                ...(OHP_OP139AData.templateB.switchDistance && { switchDistance: OHP_OP139AData.templateB.switchDistance }),
                ...(OHP_OP139AData.templateB.ampPickup && { ampPickup: OHP_OP139AData.templateB.ampPickup }),
                ...(OHP_OP139AData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_OP139AData.templateB.fromAirTakeUpDistance }),
                ...(OHP_OP139AData.templateB.specialControllerOptions && { specialControllerOptions: OHP_OP139AData.templateB.specialControllerOptions })
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