const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP4A = require("../models/OHP_OP4A");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP4AData, numRequested } = req.body;
        const order = new OHP_OP4A({
            conveyorName: OHP_OP4AData.conveyorName,
            chainSize: OHP_OP4AData.chainSize,
            ...(OHP_OP4AData.otherChainSize && { otherChainSize: OHP_OP4AData.otherChainSize }),
            industrialChainManufacturer: OHP_OP4AData.industrialChainManufacturer,
            ...(OHP_OP4AData.otherChainManufacturer && { otherChainManufacturer: OHP_OP4AData.otherChainManufacturer }),
            conveyorLength: OHP_OP4AData.conveyorLength,
            conveyorLengthUnit: OHP_OP4AData.conveyorLengthUnit,
            conveyorSpeed: OHP_OP4AData.conveyorSpeed,
            conveyorSpeedUnit: OHP_OP4AData.conveyorSpeedUnit,
            conveyorIndex: OHP_OP4AData.conveyorIndex,
            travelDirection: OHP_OP4AData.travelDirection,
            appEnviroment: OHP_OP4AData.appEnviroment,
            ...(OHP_OP4AData.ovenStatus && { ovenStatus: OHP_OP4AData.ovenStatus }),
            ...(OHP_OP4AData.ovenTemp && { ovenTemp: OHP_OP4AData.ovenTemp }),
            surroundingTemp: OHP_OP4AData.surroundingTemp,
            conveyorLoaded: OHP_OP4AData.conveyorLoaded,
            conveyorSwing: OHP_OP4AData.conveyorSwing,
            controlVoltSingle: OHP_OP4AData.controlVoltSingle,
            compressedAir: OHP_OP4AData.compressedAir,
            airSupplyType: OHP_OP4AData.airSupplyType,
            monitorData: new templateA({
                existingMonitor: OHP_OP4AData.templateA.existingMonitor,
                newMonitor: OHP_OP4AData.templateA.newMonitor,
                ...(OHP_OP4AData.templateA.dcuStatus && { dcuStatus: OHP_OP4AData.templateA.dcuStatus }),
                ...(OHP_OP4AData.templateA.dcuNum && { dcuNum: OHP_OP4AData.templateA.dcuNum }),
                ...(OHP_OP4AData.templateA.existingWindows && { existingWindows: OHP_OP4AData.templateA.existingWindows }),
                ...(OHP_OP4AData.templateA.existingHeadUnit && { existingHeadUnit: OHP_OP4AData.templateA.existingHeadUnit }),
                ...(OHP_OP4AData.templateA.existingDCU && { existingDCU: OHP_OP4AData.templateA.existingDCU }),
                ...(OHP_OP4AData.templateA.existingPowerInterface && { existingPowerInterface: OHP_OP4AData.templateA.existingPowerInterface }),
                ...(OHP_OP4AData.templateA.newReservoir && { newReservoir: OHP_OP4AData.templateA.newReservoir }),
                ...(OHP_OP4AData.templateA.reservoirSize && { reservoirSize: OHP_OP4AData.templateA.reservoirSize }),
                ...(OHP_OP4AData.templateA.otherReservoirSize && { otherReservoirSize: OHP_OP4AData.templateA.otherReservoirSize }),
                ...(OHP_OP4AData.templateA.newReservoirNum && { newReservoirNum: OHP_OP4AData.templateA.newReservoirNum }),
                ...(OHP_OP4AData.templateA.typeMonitor && { typeMonitor: OHP_OP4AData.templateA.typeMonitor }),
                ...(OHP_OP4AData.templateA.driveMotorAmp && { driveMotorAmp: OHP_OP4AData.templateA.driveMotorAmp }),
                ...(OHP_OP4AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: OHP_OP4AData.templateA.driveMotorAmpNum }),
                ...(OHP_OP4AData.templateA.driveTakeUpAir && { driveTakeUpAir: OHP_OP4AData.templateA.driveTakeUpAir }),
                ...(OHP_OP4AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_OP4AData.templateA.driveTakeUpAirNum }),
                ...(OHP_OP4AData.templateA.takeUpDistance && { takeUpDistance: OHP_OP4AData.templateA.takeUpDistance }),
                ...(OHP_OP4AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: OHP_OP4AData.templateA.takeUpDistanceNum }),
                ...(OHP_OP4AData.templateA.driveTemp && { driveTemp: OHP_OP4AData.templateA.driveTemp }),
                ...(OHP_OP4AData.templateA.driveTempNum && { driveTempNum: OHP_OP4AData.templateA.driveTempNum }),
                ...(OHP_OP4AData.templateA.driveVibration && { driveVibration: OHP_OP4AData.templateA.driveVibration }),
                ...(OHP_OP4AData.templateA.driveVibrationNum && { driveVibrationNum: OHP_OP4AData.templateA.driveVibrationNum }),
                ...(OHP_OP4AData.templateA.dogPitch && { dogPitch: OHP_OP4AData.templateA.dogPitch }),
                ...(OHP_OP4AData.templateA.dogPitchNum && { dogPitchNum: OHP_OP4AData.templateA.dogPitchNum }),
                ...(OHP_OP4AData.templateA.paintMarker && { paintMarker: OHP_OP4AData.templateA.paintMarker }),
                ...(OHP_OP4AData.templateA.paintMarkerNum && { paintMarkerNum: OHP_OP4AData.templateA.paintMarkerNum }),
                ...(OHP_OP4AData.templateA.chainVision && { chainVision: OHP_OP4AData.templateA.chainVision }),
                ...(OHP_OP4AData.templateA.lubeVision && { lubeVision: OHP_OP4AData.templateA.lubeVision }),
                ...(OHP_OP4AData.templateA.trolleyVision && { trolleyVision: OHP_OP4AData.templateA.trolleyVision }),
                ...(OHP_OP4AData.templateA.trolleyDetect && { trolleyDetect: OHP_OP4AData.templateA.trolleyDetect }),
                ...(OHP_OP4AData.templateA.omniView && { omniView: OHP_OP4AData.templateA.omniView }),
                ...(OHP_OP4AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: OHP_OP4AData.templateA.dcuUpgradeNum }),
                ...(OHP_OP4AData.templateA.itNameOne && { itNameOne: OHP_OP4AData.templateA.itNameOne }),
                ...(OHP_OP4AData.templateA.itIPOne && { itIPOne: OHP_OP4AData.templateA.itIPOne }),
                ...(OHP_OP4AData.templateA.itGatewayOne && { itGatewayOne: OHP_OP4AData.templateA.itGatewayOne }),
                ...(OHP_OP4AData.templateA.itSubnetOne && { itSubnetOne: OHP_OP4AData.templateA.itSubnetOne }),
                ...(OHP_OP4AData.templateA.itDNSOne && { itDNSOne: OHP_OP4AData.templateA.itDNSOne }),
                ...(OHP_OP4AData.templateA.itSMTPOne && { itSMTPOne: OHP_OP4AData.templateA.itSMTPOne }),
                ...(OHP_OP4AData.templateA.itNameTwo && { itNameTwo: OHP_OP4AData.templateA.itNameTwo }),
                ...(OHP_OP4AData.templateA.itIPTwo && { itIPTwo: OHP_OP4AData.templateA.itIPTwo }),
                ...(OHP_OP4AData.templateA.itGatewayTwo && { itGatewayTwo: OHP_OP4AData.templateA.itGatewayTwo }),
                ...(OHP_OP4AData.templateA.itSubnetTwo && { itSubnetTwo: OHP_OP4AData.templateA.itSubnetTwo }),
                ...(OHP_OP4AData.templateA.itDNSTwo && { itDNSTwo: OHP_OP4AData.templateA.itDNSTwo }),
                ...(OHP_OP4AData.templateA.itSMTPTwo && { itSMTPTwo: OHP_OP4AData.templateA.itSMTPTwo }),
                ...(OHP_OP4AData.templateA.itNameThree && { itNameThree: OHP_OP4AData.templateA.itNameThree }),
                ...(OHP_OP4AData.templateA.itIPThree && { itIPThree: OHP_OP4AData.templateA.itIPThree }),
                ...(OHP_OP4AData.templateA.itGatewayThree && { itGatewayThree: OHP_OP4AData.templateA.itGatewayThree }),
                ...(OHP_OP4AData.templateA.itSubnetThree && { itSubnetThree: OHP_OP4AData.templateA.itSubnetThree }),
                ...(OHP_OP4AData.templateA.itDNSThree && { itDNSThree: OHP_OP4AData.templateA.itDNSThree }),
                ...(OHP_OP4AData.templateA.itSMTPThree && { itSMTPThree: OHP_OP4AData.templateA.itSMTPThree }),
                ...(OHP_OP4AData.templateA.itAdditionalNotes && { itAdditionalNotes: OHP_OP4AData.templateA.itAdditionalNotes }),
                ...(OHP_OP4AData.templateA.piuDistance && { piuDistance: OHP_OP4AData.templateA.piuDistance }),
                ...(OHP_OP4AData.templateA.switchDistance && { switchDistance: OHP_OP4AData.templateA.switchDistance }),
                ...(OHP_OP4AData.templateA.ampPickup && { ampPickup: OHP_OP4AData.templateA.ampPickup }),
                ...(OHP_OP4AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_OP4AData.templateA.fromAirTakeUpDistance }),
                ...(OHP_OP4AData.templateA.specialControllerOptions && { specialControllerOptions: OHP_OP4AData.templateA.specialControllerOptions })
            }),
            railLubeStatus: OHP_OP4AData.railLubeStatus,
            lubeBrand: OHP_OP4AData.lubeBrand,
            lubeType: OHP_OP4AData.lubeType,
            lubeViscosity: OHP_OP4AData.lubeViscosity,
            sideLubeStatus: OHP_OP4AData.sideLubeStatus,
            topLubeStatus: OHP_OP4AData.topLubeStatus,
            fiveGallonStatus: OHP_OP4AData.fiveGallonStatus,
            chainCleanStatus: OHP_OP4AData.chainCleanStatus,
            chainMaster: OHP_OP4AData.chainMaster,
            otherUnitStatus: OHP_OP4AData.otherUnitStatus,
            ...(OHP_OP4AData.timerStatus && { timerStatus: OHP_OP4AData.timerStatus }),
            electricStatus: OHP_OP4AData.electricStatus,
            pneumaticStatus: OHP_OP4AData.pneumaticStatus,
            mightyLubeMonitoring: OHP_OP4AData.mightyLubeMonitoring,
            plcConnection: OHP_OP4AData.plcConnection,
            otherControllerNotes: OHP_OP4AData.otherControllerNotes,
            ohpUnitType: OHP_OP4AData.ohpUnitType,
            chainDrop: OHP_OP4AData.chainDrop,
            ohpWidth: OHP_OP4AData.ohpWidth,
            ohpHeight: OHP_OP4AData.ohpHeight,
            radioButtonType: OHP_OP4AData.radioButtonType
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP4A"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP4A entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;