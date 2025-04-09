const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP4A = require("../models/OHP_OP4A");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: OHP_OP4AData.templateB.existingMonitor,
                newMonitor: OHP_OP4AData.templateB.newMonitor,
                ...(OHP_OP4AData.templateB.dcuStatus && { dcuStatus: OHP_OP4AData.templateB.dcuStatus }),
                ...(OHP_OP4AData.templateB.dcuNum && { dcuNum: OHP_OP4AData.templateB.dcuNum }),
                ...(OHP_OP4AData.templateB.existingWindows && { existingWindows: OHP_OP4AData.templateB.existingWindows }),
                ...(OHP_OP4AData.templateB.existingHeadUnit && { existingHeadUnit: OHP_OP4AData.templateB.existingHeadUnit }),
                ...(OHP_OP4AData.templateB.existingDCU && { existingDCU: OHP_OP4AData.templateB.existingDCU }),
                ...(OHP_OP4AData.templateB.existingPowerInterface && { existingPowerInterface: OHP_OP4AData.templateB.existingPowerInterface }),
                ...(OHP_OP4AData.templateB.newReservoir && { newReservoir: OHP_OP4AData.templateB.newReservoir }),
                ...(OHP_OP4AData.templateB.reservoirSize && { reservoirSize: OHP_OP4AData.templateB.reservoirSize }),
                ...(OHP_OP4AData.templateB.otherReservoirSize && { otherReservoirSize: OHP_OP4AData.templateB.otherReservoirSize }),
                ...(OHP_OP4AData.templateB.newReservoirNum && { newReservoirNum: OHP_OP4AData.templateB.newReservoirNum }),
                ...(OHP_OP4AData.templateB.typeMonitor && { typeMonitor: OHP_OP4AData.templateB.typeMonitor }),
                ...(OHP_OP4AData.templateB.driveMotorAmp && { driveMotorAmp: OHP_OP4AData.templateB.driveMotorAmp }),
                ...(OHP_OP4AData.templateB.driveMotorAmpNum && { driveMotorAmpNum: OHP_OP4AData.templateB.driveMotorAmpNum }),
                ...(OHP_OP4AData.templateB.driveTakeUpAir && { driveTakeUpAir: OHP_OP4AData.templateB.driveTakeUpAir }),
                ...(OHP_OP4AData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_OP4AData.templateB.driveTakeUpAirNum }),
                ...(OHP_OP4AData.templateB.takeUpDistance && { takeUpDistance: OHP_OP4AData.templateB.takeUpDistance }),
                ...(OHP_OP4AData.templateB.takeUpDistanceNum && { takeUpDistanceNum: OHP_OP4AData.templateB.takeUpDistanceNum }),
                ...(OHP_OP4AData.templateB.driveTemp && { driveTemp: OHP_OP4AData.templateB.driveTemp }),
                ...(OHP_OP4AData.templateB.driveTempNum && { driveTempNum: OHP_OP4AData.templateB.driveTempNum }),
                ...(OHP_OP4AData.templateB.driveVibration && { driveVibration: OHP_OP4AData.templateB.driveVibration }),
                ...(OHP_OP4AData.templateB.driveVibrationNum && { driveVibrationNum: OHP_OP4AData.templateB.driveVibrationNum }),
                ...(OHP_OP4AData.templateB.dogPitch && { dogPitch: OHP_OP4AData.templateB.dogPitch }),
                ...(OHP_OP4AData.templateB.dogPitchNum && { dogPitchNum: OHP_OP4AData.templateB.dogPitchNum }),
                ...(OHP_OP4AData.templateB.paintMarker && { paintMarker: OHP_OP4AData.templateB.paintMarker }),
                ...(OHP_OP4AData.templateB.paintMarkerNum && { paintMarkerNum: OHP_OP4AData.templateB.paintMarkerNum }),
                ...(OHP_OP4AData.templateB.chainVision && { chainVision: OHP_OP4AData.templateB.chainVision }),
                ...(OHP_OP4AData.templateB.lubeVision && { lubeVision: OHP_OP4AData.templateB.lubeVision }),
                ...(OHP_OP4AData.templateB.trolleyVision && { trolleyVision: OHP_OP4AData.templateB.trolleyVision }),
                ...(OHP_OP4AData.templateB.trolleyDetect && { trolleyDetect: OHP_OP4AData.templateB.trolleyDetect }),
                ...(OHP_OP4AData.templateB.omniView && { omniView: OHP_OP4AData.templateB.omniView }),
                ...(OHP_OP4AData.templateB.dcuUpgradeNum && { dcuUpgradeNum: OHP_OP4AData.templateB.dcuUpgradeNum }),
                ...(OHP_OP4AData.templateB.itNameOne && { itNameOne: OHP_OP4AData.templateB.itNameOne }),
                ...(OHP_OP4AData.templateB.itIPOne && { itIPOne: OHP_OP4AData.templateB.itIPOne }),
                ...(OHP_OP4AData.templateB.itGatewayOne && { itGatewayOne: OHP_OP4AData.templateB.itGatewayOne }),
                ...(OHP_OP4AData.templateB.itSubnetOne && { itSubnetOne: OHP_OP4AData.templateB.itSubnetOne }),
                ...(OHP_OP4AData.templateB.itDNSOne && { itDNSOne: OHP_OP4AData.templateB.itDNSOne }),
                ...(OHP_OP4AData.templateB.itSMTPOne && { itSMTPOne: OHP_OP4AData.templateB.itSMTPOne }),
                ...(OHP_OP4AData.templateB.itNameTwo && { itNameTwo: OHP_OP4AData.templateB.itNameTwo }),
                ...(OHP_OP4AData.templateB.itIPTwo && { itIPTwo: OHP_OP4AData.templateB.itIPTwo }),
                ...(OHP_OP4AData.templateB.itGatewayTwo && { itGatewayTwo: OHP_OP4AData.templateB.itGatewayTwo }),
                ...(OHP_OP4AData.templateB.itSubnetTwo && { itSubnetTwo: OHP_OP4AData.templateB.itSubnetTwo }),
                ...(OHP_OP4AData.templateB.itDNSTwo && { itDNSTwo: OHP_OP4AData.templateB.itDNSTwo }),
                ...(OHP_OP4AData.templateB.itSMTPTwo && { itSMTPTwo: OHP_OP4AData.templateB.itSMTPTwo }),
                ...(OHP_OP4AData.templateB.itNameThree && { itNameThree: OHP_OP4AData.templateB.itNameThree }),
                ...(OHP_OP4AData.templateB.itIPThree && { itIPThree: OHP_OP4AData.templateB.itIPThree }),
                ...(OHP_OP4AData.templateB.itGatewayThree && { itGatewayThree: OHP_OP4AData.templateB.itGatewayThree }),
                ...(OHP_OP4AData.templateB.itSubnetThree && { itSubnetThree: OHP_OP4AData.templateB.itSubnetThree }),
                ...(OHP_OP4AData.templateB.itDNSThree && { itDNSThree: OHP_OP4AData.templateB.itDNSThree }),
                ...(OHP_OP4AData.templateB.itSMTPThree && { itSMTPThree: OHP_OP4AData.templateB.itSMTPThree }),
                ...(OHP_OP4AData.templateB.itAdditionalNotes && { itAdditionalNotes: OHP_OP4AData.templateB.itAdditionalNotes }),
                ...(OHP_OP4AData.templateB.piuDistance && { piuDistance: OHP_OP4AData.templateB.piuDistance }),
                ...(OHP_OP4AData.templateB.switchDistance && { switchDistance: OHP_OP4AData.templateB.switchDistance }),
                ...(OHP_OP4AData.templateB.ampPickup && { ampPickup: OHP_OP4AData.templateB.ampPickup }),
                ...(OHP_OP4AData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_OP4AData.templateB.fromAirTakeUpDistance }),
                ...(OHP_OP4AData.templateB.specialControllerOptions && { specialControllerOptions: OHP_OP4AData.templateB.specialControllerOptions })
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