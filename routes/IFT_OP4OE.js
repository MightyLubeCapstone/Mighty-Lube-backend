const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IFT_OP4OE = require("../models/IFT_OP4OE");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { IFT_OP4OEData, numRequested } = req.body;

        const order = new IFT_OP4OE({
            ...(IFT_OP4OEData.conveyorName && { conveyorName: IFT_OP4OEData.conveyorName }),
            chainSize: IFT_OP4OEData.chainSize,
            ...(IFT_OP4OEData.otherChainSize && { otherChainSize: IFT_OP4OEData.otherChainSize }),
            industrialChainManufacturer: IFT_OP4OEData.industrialChainManufacturer,
            ...(IFT_OP4OEData.otherChainManufacturer && { otherChainManufacturer: IFT_OP4OEData.otherChainManufacturer }),
           wheelManufacturer: IFT_OP4OEData.wheelManufacturer,
            ...(IFT_OP4OEData.otherWheelManufacturer && { otherWheelManufacturer: IFT_OP4OEData.otherWheelManufacturer }),
          conveyorLength: IFT_OP4OEData.conveyorLength ,
            ...(IFT_OP4OEData.measurementUnit && { measurementUnit: IFT_OP4OEData.measurementUnit }),
            conveyorSpeed: IFT_OP4OEData.conveyorSpeed,
            ...(IFT_OP4OEData.speedUnit && { speedUnit: IFT_OP4OEData.speedUnit }),
            conveyorIndex: IFT_OP4OEData.conveyorIndex,
            ...(IFT_OP4OEData.travelDirection && { travelDirection: IFT_OP4OEData.travelDirection }),
            appEnviroment: IFT_OP4OEData.appEnviroment,
            ...(IFT_OP4OEData.ovenStatus && { ovenStatus: IFT_OP4OEData.ovenStatus }),
            ...(IFT_OP4OEData.ovenTemp && { ovenTemp: IFT_OP4OEData.ovenTemp }),
            ...(IFT_OP4OEData.otherAppEnviroment && { otherAppEnviroment: IFT_OP4OEData.otherAppEnviroment }),
            ...(IFT_OP4OEData.surroundingTemp && { surroundingTemp: IFT_OP4OEData.surroundingTemp }),
            ...(IFT_OP4OEData.conveyorLoaded && { conveyorLoaded: IFT_OP4OEData.conveyorLoaded }),
            ...(IFT_OP4OEData.conveyorSwing && { conveyorSwing: IFT_OP4OEData.conveyorSwing }),
            strandStatus: IFT_OP4OEData.strandStatus,
            ...(IFT_OP4OEData.plantLayout && { plantLayout: IFT_OP4OEData.plantLayout }),
            ...(IFT_OP4OEData.requiredPics && { requiredPics: IFT_OP4OEData.requiredPics }),
            pointsOfLube: IFT_OP4OEData.pointsOfLube ,
            m12Plugs: IFT_OP4OEData.m12Plugs ,
            operatingVoltage: IFT_OP4OEData.operatingVoltage ,
            controlVoltage: IFT_OP4OEData.controlVoltage,
            monitorData: 
            {
                existingMonitor: IFT_OP4OEData.templateA.existingMonitor,
                newMonitor: IFT_OP4OEData.templateA.newMonitor,		
                ...(IFT_OP4OEData.templateA.dcuStatus && { dcuStatus: IFT_OP4OEData.templateA.dcuStatus }),
                ...(IFT_OP4OEData.templateA.dcuNum && { dcuNum: IFT_OP4OEData.templateA.dcuNum }),
                ...(IFT_OP4OEData.templateA.existingWindows && { existingWindows: IFT_OP4OEData.templateA.existingWindows }),
                ...(IFT_OP4OEData.templateA.existingHeadUnit && { existingHeadUnit: IFT_OP4OEData.templateA.existingHeadUnit }),
                ...(IFT_OP4OEData.templateA.existingDCU && { existingDCU: IFT_OP4OEData.templateA.existingDCU }),
                ...(IFT_OP4OEData.templateA.existingPowerInterface && { existingPowerInterface: IFT_OP4OEData.templateA.existingPowerInterface }),
                ...(IFT_OP4OEData.templateA.newReservoir && { newReservoir: IFT_OP4OEData.templateA.newReservoir }),
                ...(IFT_OP4OEData.templateA.reservoirSize && { reservoirSize: IFT_OP4OEData.templateA.reservoirSize }),
                ...(IFT_OP4OEData.templateA.otherReservoirSize && { otherReservoirSize: IFT_OP4OEData.templateA.otherReservoirSize }),
                ...(IFT_OP4OEData.templateA.newReservoirNum && { newReservoirNum: IFT_OP4OEData.templateA.newReservoirNum }),
                ...(IFT_OP4OEData.templateA.typeMonitor && { typeMonitor: IFT_OP4OEData.templateA.typeMonitor }),
                ...(IFT_OP4OEData.templateA.driveMotorAmp && { driveMotorAmp: IFT_OP4OEData.templateA.driveMotorAmp }),
                ...(IFT_OP4OEData.templateA.driveMotorAmpNum && { driveMotorAmpNum: IFT_OP4OEData.templateA.driveMotorAmpNum }),
                ...(IFT_OP4OEData.templateA.driveTakeUpAir && { driveTakeUpAir: IFT_OP4OEData.templateA.driveTakeUpAir }),
                ...(IFT_OP4OEData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: IFT_OP4OEData.templateA.driveTakeUpAirNum }),
                ...(IFT_OP4OEData.templateA.takeUpDistance && { takeUpDistance: IFT_OP4OEData.templateA.takeUpDistance }),
                ...(IFT_OP4OEData.templateA.takeUpDistanceNum && { takeUpDistanceNum: IFT_OP4OEData.templateA.takeUpDistanceNum }),
                ...(IFT_OP4OEData.templateA.driveTemp && { driveTemp: IFT_OP4OEData.templateA.driveTemp }),
                ...(IFT_OP4OEData.templateA.driveTempNum && { driveTempNum: IFT_OP4OEData.templateA.driveTempNum }),
                ...(IFT_OP4OEData.templateA.driveVibration && { driveVibration: IFT_OP4OEData.templateA.driveVibration }),
                ...(IFT_OP4OEData.templateA.driveVibrationNum && { driveVibrationNum: IFT_OP4OEData.templateA.driveVibrationNum }),
                ...(IFT_OP4OEData.templateA.dogPitch && { dogPitch: IFT_OP4OEData.templateA.dogPitch }),
                ...(IFT_OP4OEData.templateA.dogPitchNum && { dogPitchNum: IFT_OP4OEData.templateA.dogPitchNum }),
                ...(IFT_OP4OEData.templateA.paintMarker && { paintMarker: IFT_OP4OEData.templateA.paintMarker }),
                ...(IFT_OP4OEData.templateA.paintMarkerNum && { paintMarkerNum: IFT_OP4OEData.templateA.paintMarkerNum }),
                ...(IFT_OP4OEData.templateA.chainVision && { chainVision: IFT_OP4OEData.templateA.chainVision }),
                ...(IFT_OP4OEData.templateA.lubeVision && { lubeVision: IFT_OP4OEData.templateA.lubeVision }),
                ...(IFT_OP4OEData.templateA.trolleyVision && { trolleyVision: IFT_OP4OEData.templateA.trolleyVision }),
                ...(IFT_OP4OEData.templateA.trolleyDetect && { trolleyDetect: IFT_OP4OEData.templateA.trolleyDetect }),
                ...(IFT_OP4OEData.templateA.omniView && { omniView: IFT_OP4OEData.templateA.omniView }),
                ...(IFT_OP4OEData.templateA.dcuUpgradeNum && { dcuUpgradeNum: IFT_OP4OEData.templateA.dcuUpgradeNum }),
                ...(IFT_OP4OEData.templateA.piuDistance && { piuDistance: IFT_OP4OEData.templateA.piuDistance }),
                ...(IFT_OP4OEData.templateA.switchDistance && { switchDistance: IFT_OP4OEData.templateA.switchDistance }),
                ...(IFT_OP4OEData.templateA.ampPickup && { ampPickup: IFT_OP4OEData.templateA.ampPickup }),
                ...(IFT_OP4OEData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: IFT_OP4OEData.templateA.fromAirTakeUpDistance }),
                ...(IFT_OP4OEData.templateA.specialControllerOptions && { specialControllerOptions: IFT_OP4OEData.templateA.specialControllerOptions }),
                ...(IFT_OP4OEData.templateA.operatingVoltage && { operatingVoltage: IFT_OP4OEData.templateA.operatingVoltage })
            },          
            ...(IFT_OP4OEData.wheelOpenType && { wheelOpenType: IFT_OP4OEData.wheelOpenType }),
            ...(IFT_OP4OEData.wheelClosedType && { wheelClosedType: IFT_OP4OEData.wheelClosedType }),
            ...(IFT_OP4OEData.openStatus && { openStatus: IFT_OP4OEData.openStatus }),
            ...(IFT_OP4OEData.freeWheelStatus && { freeWheelStatus: IFT_OP4OEData.freeWheelStatus }),
            ...(IFT_OP4OEData.guideRollerStatus && { guideRollerStatus: IFT_OP4OEData.guideRollerStatus }),
            ...(IFT_OP4OEData.openRaceStyle && { openRaceStyle: IFT_OP4OEData.openRaceStyle }),
            ...(IFT_OP4OEData.closedRaceStyle && { closedRaceStyle: IFT_OP4OEData.closedRaceStyle }),
            ...(IFT_OP4OEData.holeStatus && { holeStatus: IFT_OP4OEData.holeStatus }),
            ...(IFT_OP4OEData.actuatorStatus && { actuatorStatus: IFT_OP4OEData.actuatorStatus }),
            ...(IFT_OP4OEData.pivotStatus && { pivotStatus: IFT_OP4OEData.pivotStatus }),
            ...(IFT_OP4OEData.kingPinStatus && { kingPinStatus: IFT_OP4OEData.kingPinStatus }),
            ...(IFT_OP4OEData.outboardStatus && { outboardStatus: IFT_OP4OEData.outboardStatus }),
            ...(IFT_OP4OEData.railLubeStatus && { railLubeStatus: IFT_OP4OEData.railLubeStatus }),
            ...(IFT_OP4OEData.lubeBrand && { lubeBrand: IFT_OP4OEData.lubeBrand }),
            ...(IFT_OP4OEData.lubeType && { lubeType: IFT_OP4OEData.lubeType }),
            ...(IFT_OP4OEData.lubeViscosity && { lubeViscosity: IFT_OP4OEData.lubeViscosity }),
            ...(IFT_OP4OEData.chainMaster && { chainMaster: IFT_OP4OEData.chainMaster }),
            ...(IFT_OP4OEData.timerStatus && { timerStatus: IFT_OP4OEData.timerStatus }),
            ...(IFT_OP4OEData.electricStatus && { electricStatus: IFT_OP4OEData.electricStatus }),
            ...(IFT_OP4OEData.pneumaticStatus && { pneumaticStatus: IFT_OP4OEData.pneumaticStatus }),
            ...(IFT_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: IFT_OP4OEData.mightyLubeMonitoring }),
            ...(IFT_OP4OEData.plcConnection && { plcConnection: IFT_OP4OEData.plcConnection }),
            ...(IFT_OP4OEData.otherControllerInfo && { otherControllerInfo: IFT_OP4OEData.otherControllerInfo }),
            ...(IFT_OP4OEData.iftUnitType && { iftUnitType: IFT_OP4OEData.iftUnitType }),
            ...(IFT_OP4OEData.iftPowerA && { iftPowerA: IFT_OP4OEData.iftPowerA }),
            ...(IFT_OP4OEData.iftPowerB && { iftPowerB: IFT_OP4OEData.iftPowerB }),
            ...(IFT_OP4OEData.iftPowerG && { iftPowerG: IFT_OP4OEData.iftPowerG }),
            ...(IFT_OP4OEData.iftPowerH && { iftPowerH: IFT_OP4OEData.iftPowerH }),
            ...(IFT_OP4OEData.iftPowerJ && { iftPowerJ: IFT_OP4OEData.iftPowerJ }),
            ...(IFT_OP4OEData.iftPowerS1 && { iftPowerS1: IFT_OP4OEData.iftPowerS1 }),
            ...(IFT_OP4OEData.iftPowerT1 && { iftPowerT1: IFT_OP4OEData.iftPowerT1 }),
            ...(IFT_OP4OEData.iftPowerU1 && { iftPowerU1: IFT_OP4OEData.iftPowerU1 }),
            ...(IFT_OP4OEData.iftPowerV1 && { iftPowerV1: IFT_OP4OEData.iftPowerV1 }),
            ...(IFT_OP4OEData.iftPowerW1 && { iftPowerW1: IFT_OP4OEData.iftPowerW1 }),
            ...(IFT_OP4OEData.iftPowerX1 && { iftPowerX1: IFT_OP4OEData.iftPowerX1 }),
        });

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "IFT_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "IFT_OP4OE entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
