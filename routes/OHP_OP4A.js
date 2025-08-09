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
            wheelManufacturer: OHP_OP4AData.wheelManufacturer,
            ...(OHP_OP4AData.otherWheelManufacturer && { otherWheelManufacturer: OHP_OP4AData.otherWheelManufacturer }),
            conveyorLength: OHP_OP4AData.conveyorLength,
            ...(OHP_OP4AData.conveyorLengthUnit && { conveyorLengthUnit: OHP_OP4AData.conveyorLengthUnit }),
            conveyorSpeed: OHP_OP4AData.conveyorSpeed,
            ...(OHP_OP4AData.conveyorSpeedUnit && { conveyorSpeedUnit: OHP_OP4AData.conveyorSpeedUnit }),
            conveyorIndex: OHP_OP4AData.conveyorIndex,
            ...(OHP_OP4AData.travelDirection && { travelDirection: OHP_OP4AData.travelDirection }),
            appEnviroment: OHP_OP4AData.appEnviroment,
            ...(OHP_OP4AData.ovenStatus && { ovenStatus: OHP_OP4AData.ovenStatus }),
            ...(OHP_OP4AData.ovenTemp && { ovenTemp: OHP_OP4AData.ovenTemp }),
            ...(OHP_OP4AData.otherAppEnviroment && { otherAppEnviroment: OHP_OP4AData.otherAppEnviroment }),
            airOrElectric: OHP_OP4AData.airOrElectric,



            ...(OHP_OP4AData.surroundingTemp && { surroundingTemp: OHP_OP4AData.surroundingTemp }),
            ...(OHP_OP4AData.conveyorLoaded && { conveyorLoaded: OHP_OP4AData.conveyorLoaded }),
            ...(OHP_OP4AData.conveyorSwing && { conveyorSwing: OHP_OP4AData.conveyorSwing }),
            ...(OHP_OP4AData.operatingVoltage && { operatingVoltage: OHP_OP4AData.operatingVoltage }),
            ...(OHP_OP4AData.controlVoltSingle && { controlVoltSingle: OHP_OP4AData.controlVoltSingle }),
            ...(OHP_OP4AData.compressedAir && { compressedAir: OHP_OP4AData.compressedAir }),
            ...(OHP_OP4AData.airSupplyType && { airSupplyType: OHP_OP4AData.airSupplyType }),
            existingMonitor: OHP_OP4AData.existingMonitor,
            newMonitor: OHP_OP4AData.newMonitor,
            monitorData: {
                ...(OHP_OP4AData.dcuStatus && { dcuStatus: OHP_OP4AData.dcuStatus }),
                ...(OHP_OP4AData.dcuNum && { dcuNum: OHP_OP4AData.dcuNum }),
                ...(OHP_OP4AData.existingWindows && { existingWindows: OHP_OP4AData.existingWindows }),
                ...(OHP_OP4AData.existingHeadUnit && { existingHeadUnit: OHP_OP4AData.existingHeadUnit }),
                ...(OHP_OP4AData.existingDCU && { existingDCU: OHP_OP4AData.existingDCU }),
                ...(OHP_OP4AData.existingPowerInterface && { existingPowerInterface: OHP_OP4AData.existingPowerInterface }),
                ...(OHP_OP4AData.newReservoir && { newReservoir: OHP_OP4AData.newReservoir }),
                ...(OHP_OP4AData.reservoirSize && { reservoirSize: OHP_OP4AData.reservoirSize }),
                ...(OHP_OP4AData.otherReservoirSize && { otherReservoirSize: OHP_OP4AData.otherReservoirSize }),
                ...(OHP_OP4AData.newReservoirNum && { newReservoirNum: OHP_OP4AData.newReservoirNum }),
                ...(OHP_OP4AData.typeMonitor && { typeMonitor: OHP_OP4AData.typeMonitor }),
                ...(OHP_OP4AData.driveMotorAmp && { driveMotorAmp: OHP_OP4AData.driveMotorAmp }),
                ...(OHP_OP4AData.driveMotorAmpNum && { driveMotorAmpNum: OHP_OP4AData.driveMotorAmpNum }),
                ...(OHP_OP4AData.driveTakeUpAir && { driveTakeUpAir: OHP_OP4AData.driveTakeUpAir }),
                ...(OHP_OP4AData.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_OP4AData.driveTakeUpAirNum }),
                ...(OHP_OP4AData.takeUpDistance && { takeUpDistance: OHP_OP4AData.takeUpDistance }),
                ...(OHP_OP4AData.takeUpDistanceNum && { takeUpDistanceNum: OHP_OP4AData.takeUpDistanceNum }),
                ...(OHP_OP4AData.driveTemp && { driveTemp: OHP_OP4AData.driveTemp }),
                ...(OHP_OP4AData.driveTempNum && { driveTempNum: OHP_OP4AData.driveTempNum }),
                ...(OHP_OP4AData.driveVibration && { driveVibration: OHP_OP4AData.driveVibration }),
                ...(OHP_OP4AData.driveVibrationNum && { driveVibrationNum: OHP_OP4AData.driveVibrationNum }),
                ...(OHP_OP4AData.dogPitch && { dogPitch: OHP_OP4AData.dogPitch }),
                ...(OHP_OP4AData.dogPitchNum && { dogPitchNum: OHP_OP4AData.dogPitchNum }),
                ...(OHP_OP4AData.paintMarker && { paintMarker: OHP_OP4AData.paintMarker }),
                ...(OHP_OP4AData.paintMarkerNum && { paintMarkerNum: OHP_OP4AData.paintMarkerNum }),
                ...(OHP_OP4AData.chainVision && { chainVision: OHP_OP4AData.chainVision }),
                ...(OHP_OP4AData.lubeVision && { lubeVision: OHP_OP4AData.lubeVision }),
                ...(OHP_OP4AData.trolleyVision && { trolleyVision: OHP_OP4AData.trolleyVision }),
                ...(OHP_OP4AData.trolleyDetect && { trolleyDetect: OHP_OP4AData.trolleyDetect }),
                ...(OHP_OP4AData.omniView && { omniView: OHP_OP4AData.omniView }),
                ...(OHP_OP4AData.dcuUpgradeNum && { dcuUpgradeNum: OHP_OP4AData.dcuUpgradeNum }),
                ...(OHP_OP4AData.itNameOne && { itNameOne: OHP_OP4AData.itNameOne }),
                ...(OHP_OP4AData.itIPOne && { itIPOne: OHP_OP4AData.itIPOne }),
                ...(OHP_OP4AData.itGatewayOne && { itGatewayOne: OHP_OP4AData.itGatewayOne }),
                ...(OHP_OP4AData.itSubnetOne && { itSubnetOne: OHP_OP4AData.itSubnetOne }),
                ...(OHP_OP4AData.itDNSOne && { itDNSOne: OHP_OP4AData.itDNSOne }),
                ...(OHP_OP4AData.itSMTPOne && { itSMTPOne: OHP_OP4AData.itSMTPOne }),
                ...(OHP_OP4AData.itNameTwo && { itNameTwo: OHP_OP4AData.itNameTwo }),
                ...(OHP_OP4AData.itIPTwo && { itIPTwo: OHP_OP4AData.itIPTwo }),
                ...(OHP_OP4AData.itGatewayTwo && { itGatewayTwo: OHP_OP4AData.itGatewayTwo }),
                ...(OHP_OP4AData.itSubnetTwo && { itSubnetTwo: OHP_OP4AData.itSubnetTwo }),
                ...(OHP_OP4AData.itDNSTwo && { itDNSTwo: OHP_OP4AData.itDNSTwo }),
                ...(OHP_OP4AData.itSMTPTwo && { itSMTPTwo: OHP_OP4AData.itSMTPTwo }),
                ...(OHP_OP4AData.itNameThree && { itNameThree: OHP_OP4AData.itNameThree }),
                ...(OHP_OP4AData.itIPThree && { itIPThree: OHP_OP4AData.itIPThree }),
                ...(OHP_OP4AData.itGatewayThree && { itGatewayThree: OHP_OP4AData.itGatewayThree }),
                ...(OHP_OP4AData.itSubnetThree && { itSubnetThree: OHP_OP4AData.itSubnetThree }),
                ...(OHP_OP4AData.itDNSThree && { itDNSThree: OHP_OP4AData.itDNSThree }),
                ...(OHP_OP4AData.itSMTPThree && { itSMTPThree: OHP_OP4AData.itSMTPThree }),
                ...(OHP_OP4AData.itAdditionalNotes && { itAdditionalNotes: OHP_OP4AData.itAdditionalNotes }),
                ...(OHP_OP4AData.piuDistance && { piuDistance: OHP_OP4AData.piuDistance }),
                ...(OHP_OP4AData.switchDistance && { switchDistance: OHP_OP4AData.switchDistance }),
                ...(OHP_OP4AData.ampPickup && { ampPickup: OHP_OP4AData.ampPickup }),
                ...(OHP_OP4AData.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_OP4AData.fromAirTakeUpDistance }),
                ...(OHP_OP4AData.specialControllerOptions && { specialControllerOptions: OHP_OP4AData.specialControllerOptions }),
                ...(OHP_OP4AData.operatingVoltage && { operatingVoltage: OHP_OP4AData.operatingVoltage })

            },

            ...(OHP_OP4AData.railLubeStatus && { railLubeStatus: OHP_OP4AData.railLubeStatus }),
            ...(OHP_OP4AData.lubeBrand && { lubeBrand: OHP_OP4AData.lubeBrand }),
            ...(OHP_OP4AData.lubeType && { lubeType: OHP_OP4AData.lubeType }),
            ...(OHP_OP4AData.lubeViscosity && { lubeViscosity: OHP_OP4AData.lubeViscosity }),
            ...(OHP_OP4AData.sideLubeStatus && { sideLubeStatus: OHP_OP4AData.sideLubeStatus }),
            ...(OHP_OP4AData.topLubeStatus && { topLubeStatus: OHP_OP4AData.topLubeStatus }),
            ...(OHP_OP4AData.fiveGallonStatus && { fiveGallonStatus: OHP_OP4AData.fiveGallonStatus }),
            ...(OHP_OP4AData.chainCleanStatus && { chainCleanStatus: OHP_OP4AData.chainCleanStatus }),
            ...(OHP_OP4AData.chainMaster && { chainMaster: OHP_OP4AData.chainMaster }),
            ...(OHP_OP4AData.otherUnitStatus && { otherUnitStatus: OHP_OP4AData.otherUnitStatus }),
            ...(OHP_OP4AData.timerStatus && { timerStatus: OHP_OP4AData.timerStatus }),
            electricStatus: OHP_OP4AData.electricStatus,
            ...(OHP_OP4AData.pneumaticStatus && { pneumaticStatus: OHP_OP4AData.pneumaticStatus }),
            ...(OHP_OP4AData.mightyLubeMonitoring && { mightyLubeMonitoring: OHP_OP4AData.mightyLubeMonitoring }),
            ...(OHP_OP4AData.plcConnection && { plcConnection: OHP_OP4AData.plcConnection }),
            ...(OHP_OP4AData.otherControllerNotes && { otherControllerNotes: OHP_OP4AData.otherControllerNotes }),
            ...(OHP_OP4AData.ohpUnitType && { ohpUnitType: OHP_OP4AData.ohpUnitType }),
            ...(OHP_OP4AData.chainDrop && { chainDrop: OHP_OP4AData.chainDrop }),
            ...(OHP_OP4AData.ohpWidth && { ohpWidth: OHP_OP4AData.ohpWidth }),
            ...(OHP_OP4AData.ohpHeight && { ohpHeight: OHP_OP4AData.ohpHeight }),
            ...(OHP_OP4AData.radioButtonType && { radioButtonType: OHP_OP4AData.radioButtonType }),
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