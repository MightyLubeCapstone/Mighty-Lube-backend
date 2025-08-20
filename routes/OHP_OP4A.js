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
            operatingVoltage: OHP_OP4AData.operatingVoltage,
            controlVoltSingle: OHP_OP4AData.controlVoltSingle,
            ...(OHP_OP4AData.compressedAir && { compressedAir: OHP_OP4AData.compressedAir }),
            ...(OHP_OP4AData.airSupplyType && { airSupplyType: OHP_OP4AData.airSupplyType }),
        monitorData: 
        {
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
                ...(OHP_OP4AData.templateA.piuDistance && { piuDistance: OHP_OP4AData.templateA.piuDistance }),
                ...(OHP_OP4AData.templateA.switchDistance && { switchDistance: OHP_OP4AData.templateA.switchDistance }),
                ...(OHP_OP4AData.templateA.ampPickup && { ampPickup: OHP_OP4AData.templateA.ampPickup }),
                ...(OHP_OP4AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_OP4AData.templateA.fromAirTakeUpDistance }),
                ...(OHP_OP4AData.templateA.specialControllerOptions && { specialControllerOptions: OHP_OP4AData.templateA.specialControllerOptions }),
                ...(OHP_OP4AData.templateA.operatingVoltage && { operatingVoltage: OHP_OP4AData.templateA.operatingVoltage })
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