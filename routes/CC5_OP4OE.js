const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CC5_OP4OE = require("../models/CC5_OP4OE");
const templateA = require("../models/templateA");


const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for CC5_OP4OE form
    try {
        const { CC5_OP4OEData, numRequested } = req.body;
        const order = new CC5_OP4OE({
            conveyorName: CC5_OP4OEData.conveyorName,
            cc5ChainSize: CC5_OP4OEData.cc5ChainSize,
            ...(CC5_OP4OEData.otherChainSize && { otherChainSize: CC5_OP4OEData.otherChainSize }),
            industrialChainManufacturer: CC5_OP4OEData.industrialChainManufacturer,
            ...(CC5_OP4OEData.otherChainManufacturer && { otherChainManufacturer: CC5_OP4OEData.otherChainManufacturer }),
            conveyorLength: CC5_OP4OEData.conveyorLength,
            conveyorLengthUnit: CC5_OP4OEData.conveyorLengthUnit,
            conveyorSpeed: CC5_OP4OEData.conveyorSpeed,
            conveyorSpeedUnit: CC5_OP4OEData.conveyorSpeedUnit,
            ...(CC5_OP4OEData.conveyorIndex && { conveyorIndex: CC5_OP4OEData.conveyorIndex }),
            ...(CC5_OP4OEData.travelDirection && { travelDirection: CC5_OP4OEData.travelDirection }),
            appEnviroment: CC5_OP4OEData.appEnviroment,
            ...(CC5_OP4OEData.ovenStatus && { ovenStatus: CC5_OP4OEData.ovenStatus }),
            ...(CC5_OP4OEData.ovenTemp && { ovenTemp: CC5_OP4OEData.ovenTemp }),
            ...(CC5_OP4OEData.otherAppEnviroment && { otherAppEnviroment: CC5_OP4OEData.otherAppEnviroment }),
            ...(CC5_OP4OEData.surroundingTemp && { surroundingTemp: CC5_OP4OEData.surroundingTemp }),
            swingStatus: CC5_OP4OEData.swingStatus,
            strandStatus: CC5_OP4OEData.strandStatus,            
            ...(CC5_OP4OEData.plantLayout && { plantLayout: CC5_OP4OEData.plantLayout }),
            ...(CC5_OP4OEData.requiredPics && { requiredPics: CC5_OP4OEData.requiredPics }),
            operatingVoltage: CC5_OP4OEData.operatingVoltage,

        monitorData: 
        {
                existingMonitor: CC5_OP4OEData.templateA.existingMonitor,
                newMonitor: CC5_OP4OEData.templateA.newMonitor,		
                ...(CC5_OP4OEData.templateA.dcuStatus && { dcuStatus: CC5_OP4OEData.templateA.dcuStatus }),
                ...(CC5_OP4OEData.templateA.dcuNum && { dcuNum: CC5_OP4OEData.templateA.dcuNum }),
                ...(CC5_OP4OEData.templateA.existingWindows && { existingWindows: CC5_OP4OEData.templateA.existingWindows }),
                ...(CC5_OP4OEData.templateA.existingHeadUnit && { existingHeadUnit: CC5_OP4OEData.templateA.existingHeadUnit }),
                ...(CC5_OP4OEData.templateA.existingDCU && { existingDCU: CC5_OP4OEData.templateA.existingDCU }),
                ...(CC5_OP4OEData.templateA.existingPowerInterface && { existingPowerInterface: CC5_OP4OEData.templateA.existingPowerInterface }),
                ...(CC5_OP4OEData.templateA.newReservoir && { newReservoir: CC5_OP4OEData.templateA.newReservoir }),
                ...(CC5_OP4OEData.templateA.reservoirSize && { reservoirSize: CC5_OP4OEData.templateA.reservoirSize }),
                ...(CC5_OP4OEData.templateA.otherReservoirSize && { otherReservoirSize: CC5_OP4OEData.templateA.otherReservoirSize }),
                ...(CC5_OP4OEData.templateA.newReservoirNum && { newReservoirNum: CC5_OP4OEData.templateA.newReservoirNum }),
                ...(CC5_OP4OEData.templateA.typeMonitor && { typeMonitor: CC5_OP4OEData.templateA.typeMonitor }),
                ...(CC5_OP4OEData.templateA.driveMotorAmp && { driveMotorAmp: CC5_OP4OEData.templateA.driveMotorAmp }),
                ...(CC5_OP4OEData.templateA.driveMotorAmpNum && { driveMotorAmpNum: CC5_OP4OEData.templateA.driveMotorAmpNum }),
                ...(CC5_OP4OEData.templateA.driveTakeUpAir && { driveTakeUpAir: CC5_OP4OEData.templateA.driveTakeUpAir }),
                ...(CC5_OP4OEData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: CC5_OP4OEData.templateA.driveTakeUpAirNum }),
                ...(CC5_OP4OEData.templateA.takeUpDistance && { takeUpDistance: CC5_OP4OEData.templateA.takeUpDistance }),
                ...(CC5_OP4OEData.templateA.takeUpDistanceNum && { takeUpDistanceNum: CC5_OP4OEData.templateA.takeUpDistanceNum }),
                ...(CC5_OP4OEData.templateA.driveTemp && { driveTemp: CC5_OP4OEData.templateA.driveTemp }),
                ...(CC5_OP4OEData.templateA.driveTempNum && { driveTempNum: CC5_OP4OEData.templateA.driveTempNum }),
                ...(CC5_OP4OEData.templateA.driveVibration && { driveVibration: CC5_OP4OEData.templateA.driveVibration }),
                ...(CC5_OP4OEData.templateA.driveVibrationNum && { driveVibrationNum: CC5_OP4OEData.templateA.driveVibrationNum }),
                ...(CC5_OP4OEData.templateA.dogPitch && { dogPitch: CC5_OP4OEData.templateA.dogPitch }),
                ...(CC5_OP4OEData.templateA.dogPitchNum && { dogPitchNum: CC5_OP4OEData.templateA.dogPitchNum }),
                ...(CC5_OP4OEData.templateA.paintMarker && { paintMarker: CC5_OP4OEData.templateA.paintMarker }),
                ...(CC5_OP4OEData.templateA.paintMarkerNum && { paintMarkerNum: CC5_OP4OEData.templateA.paintMarkerNum }),
                ...(CC5_OP4OEData.templateA.chainVision && { chainVision: CC5_OP4OEData.templateA.chainVision }),
                ...(CC5_OP4OEData.templateA.lubeVision && { lubeVision: CC5_OP4OEData.templateA.lubeVision }),
                ...(CC5_OP4OEData.templateA.trolleyVision && { trolleyVision: CC5_OP4OEData.templateA.trolleyVision }),
                ...(CC5_OP4OEData.templateA.trolleyDetect && { trolleyDetect: CC5_OP4OEData.templateA.trolleyDetect }),
                ...(CC5_OP4OEData.templateA.omniView && { omniView: CC5_OP4OEData.templateA.omniView }),
                ...(CC5_OP4OEData.templateA.dcuUpgradeNum && { dcuUpgradeNum: CC5_OP4OEData.templateA.dcuUpgradeNum }),
                ...(CC5_OP4OEData.templateA.piuDistance && { piuDistance: CC5_OP4OEData.templateA.piuDistance }),
                ...(CC5_OP4OEData.templateA.switchDistance && { switchDistance: CC5_OP4OEData.templateA.switchDistance }),
                ...(CC5_OP4OEData.templateA.ampPickup && { ampPickup: CC5_OP4OEData.templateA.ampPickup }),
                ...(CC5_OP4OEData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: CC5_OP4OEData.templateA.fromAirTakeUpDistance }),
                ...(CC5_OP4OEData.templateA.specialControllerOptions && { specialControllerOptions: CC5_OP4OEData.templateA.specialControllerOptions }),
                ...(CC5_OP4OEData.templateA.operatingVoltage && { operatingVoltage: CC5_OP4OEData.templateA.operatingVoltage })
            },
            controlVoltage: CC5_OP4OEData.controlVoltage,
            outboardStatus: CC5_OP4OEData.outboardStatus,
            highRollerStatus: CC5_OP4OEData.highRollerStatus,
            ...(CC5_OP4OEData.lubeBrand && { lubeBrand: CC5_OP4OEData.lubeBrand }),
            ...(CC5_OP4OEData.lubeType && { lubeType: CC5_OP4OEData.lubeType }),
            ...(CC5_OP4OEData.lubeViscosity && { lubeViscosity: CC5_OP4OEData.lubeViscosity }),
            ...(CC5_OP4OEData.chainMaster && { chainMaster: CC5_OP4OEData.chainMaster }),
            ...(CC5_OP4OEData.timerStatus && { timerStatus: CC5_OP4OEData.timerStatus }),
            ...(CC5_OP4OEData.electricStatus && { electricStatus: CC5_OP4OEData.electricStatus }),
            ...(CC5_OP4OEData.pneumaticStatus && { pneumaticStatus: CC5_OP4OEData.pneumaticStatus }),
            ...(CC5_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: CC5_OP4OEData.mightyLubeMonitoring }),
            ...(CC5_OP4OEData.plcConnection && { plcConnection: CC5_OP4OEData.plcConnection }),
            ...(CC5_OP4OEData.otherControllerNotes && { otherControllerNotes: CC5_OP4OEData.otherControllerNotes }),
            ...(CC5_OP4OEData.cc5UnitType && { cc5UnitType: CC5_OP4OEData.cc5UnitType }),
            ...(CC5_OP4OEData.powerRailWidth && { powerRailWidth: CC5_OP4OEData.powerRailWidth }),
            ...(CC5_OP4OEData.powerRailHeight && { powerRailHeight: CC5_OP4OEData.powerRailHeight }),
            ...(CC5_OP4OEData.rollerWheelA1 && { rollerWheelA1: CC5_OP4OEData.rollerWheelA1 }),
            ...(CC5_OP4OEData.rollerWheelB1 && { rollerWheelB1: CC5_OP4OEData.rollerWheelB1 }),
            ...(CC5_OP4OEData.linkD1 && { linkD1: CC5_OP4OEData.linkD1 }),
            ...(CC5_OP4OEData.wheelPitchM1 && { wheelPitchM1: CC5_OP4OEData.wheelPitchM1 }),
            ...(CC5_OP4OEData.rollerPinY1 && { rollerPinY1: CC5_OP4OEData.rollerPinY1 }),
            ...(CC5_OP4OEData.rollerPinZ1 && { rollerPinZ1: CC5_OP4OEData.rollerPinZ1 }),

        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "CC5_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "CC5_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;