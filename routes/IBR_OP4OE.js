const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_OP4OE = require("../models/IBR_OP4OE");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_OP4OE form
    try {
        const { IBR_OP4OEData, numRequested } = req.body;
        const order = new IBR_OP4OE({
            ...(IBR_OP4OEData.conveyorName && { conveyorName: IBR_OP4OEData.conveyorName }),
            chainSize: IBR_OP4OEData.chainSize,
            ...(IBR_OP4OEData.otherChainSize && { otherChainSize: IBR_OP4OEData.otherChainSize }),
            industrialChainManufacturer: IBR_OP4OEData.industrialChainManufacturer,
            ...(IBR_OP4OEData.otherChainManufacturer && { otherChainManufacturer: IBR_OP4OEData.otherChainManufacturer }),
            conveyorLength: IBR_OP4OEData.conveyorLength,
            ...(IBR_OP4OEData.measurementUnit && { measurementUnit: IBR_OP4OEData.measurementUnit }),
            conveyorSpeed: IBR_OP4OEData.conveyorSpeed,
            ...(IBR_OP4OEData.speedUnit && { speedUnit: IBR_OP4OEData.speedUnit }),
            conveyorIndex: IBR_OP4OEData.conveyorIndex,
            ...(IBR_OP4OEData.travelDirection && { travelDirection: IBR_OP4OEData.travelDirection }),
            appEnviroment: IBR_OP4OEData.appEnviroment,
            ...(IBR_OP4OEData.ovenStatus && { ovenStatus: IBR_OP4OEData.ovenStatus }),
            ...(IBR_OP4OEData.ovenTemp && { ovenTemp: IBR_OP4OEData.ovenTemp }),
            ...(IBR_OP4OEData.otherAppEnviroment && { otherAppEnviroment: IBR_OP4OEData.otherAppEnviroment }),
            strandStatus: IBR_OP4OEData.strandStatus,
            pointsOfLube: IBR_OP4OEData.pointsOfLube,
            m12Plugs: IBR_OP4OEData.m12Plugs,
            ...(IBR_OP4OEData.surroundingTemp && { surroundingTemp: IBR_OP4OEData.surroundingTemp }),
            ...(IBR_OP4OEData.conveyorLoaded && { conveyorLoaded: IBR_OP4OEData.conveyorLoaded }),
            ...(IBR_OP4OEData.conveyorSwing && { conveyorSwing: IBR_OP4OEData.conveyorSwing }),
            ...(IBR_OP4OEData.plantLayout && { plantLayout: IBR_OP4OEData.plantLayout }),
            ...(IBR_OP4OEData.requiredPics && { requiredPics: IBR_OP4OEData.requiredPics }),
            ...(IBR_OP4OEData.operatingVoltage && { operatingVoltage: IBR_OP4OEData.operatingVoltage }),
            ...(IBR_OP4OEData.controlVoltage && { controlVoltage: IBR_OP4OEData.controlVoltage }),
            monitorData: 
            {
                existingMonitor: IBR_OP4OEData.templateA.existingMonitor,
                newMonitor: IBR_OP4OEData.templateA.newMonitor,		
                ...(IBR_OP4OEData.templateA.dcuStatus && { dcuStatus: IBR_OP4OEData.templateA.dcuStatus }),
                ...(IBR_OP4OEData.templateA.dcuNum && { dcuNum: IBR_OP4OEData.templateA.dcuNum }),
                ...(IBR_OP4OEData.templateA.existingWindows && { existingWindows: IBR_OP4OEData.templateA.existingWindows }),
                ...(IBR_OP4OEData.templateA.existingHeadUnit && { existingHeadUnit: IBR_OP4OEData.templateA.existingHeadUnit }),
                ...(IBR_OP4OEData.templateA.existingDCU && { existingDCU: IBR_OP4OEData.templateA.existingDCU }),
                ...(IBR_OP4OEData.templateA.existingPowerInterface && { existingPowerInterface: IBR_OP4OEData.templateA.existingPowerInterface }),
                ...(IBR_OP4OEData.templateA.newReservoir && { newReservoir: IBR_OP4OEData.templateA.newReservoir }),
                ...(IBR_OP4OEData.templateA.reservoirSize && { reservoirSize: IBR_OP4OEData.templateA.reservoirSize }),
                ...(IBR_OP4OEData.templateA.otherReservoirSize && { otherReservoirSize: IBR_OP4OEData.templateA.otherReservoirSize }),
                ...(IBR_OP4OEData.templateA.newReservoirNum && { newReservoirNum: IBR_OP4OEData.templateA.newReservoirNum }),
                ...(IBR_OP4OEData.templateA.typeMonitor && { typeMonitor: IBR_OP4OEData.templateA.typeMonitor }),
                ...(IBR_OP4OEData.templateA.driveMotorAmp && { driveMotorAmp: IBR_OP4OEData.templateA.driveMotorAmp }),
                ...(IBR_OP4OEData.templateA.driveMotorAmpNum && { driveMotorAmpNum: IBR_OP4OEData.templateA.driveMotorAmpNum }),
                ...(IBR_OP4OEData.templateA.driveTakeUpAir && { driveTakeUpAir: IBR_OP4OEData.templateA.driveTakeUpAir }),
                ...(IBR_OP4OEData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_OP4OEData.templateA.driveTakeUpAirNum }),
                ...(IBR_OP4OEData.templateA.takeUpDistance && { takeUpDistance: IBR_OP4OEData.templateA.takeUpDistance }),
                ...(IBR_OP4OEData.templateA.takeUpDistanceNum && { takeUpDistanceNum: IBR_OP4OEData.templateA.takeUpDistanceNum }),
                ...(IBR_OP4OEData.templateA.driveTemp && { driveTemp: IBR_OP4OEData.templateA.driveTemp }),
                ...(IBR_OP4OEData.templateA.driveTempNum && { driveTempNum: IBR_OP4OEData.templateA.driveTempNum }),
                ...(IBR_OP4OEData.templateA.driveVibration && { driveVibration: IBR_OP4OEData.templateA.driveVibration }),
                ...(IBR_OP4OEData.templateA.driveVibrationNum && { driveVibrationNum: IBR_OP4OEData.templateA.driveVibrationNum }),
                ...(IBR_OP4OEData.templateA.dogPitch && { dogPitch: IBR_OP4OEData.templateA.dogPitch }),
                ...(IBR_OP4OEData.templateA.dogPitchNum && { dogPitchNum: IBR_OP4OEData.templateA.dogPitchNum }),
                ...(IBR_OP4OEData.templateA.paintMarker && { paintMarker: IBR_OP4OEData.templateA.paintMarker }),
                ...(IBR_OP4OEData.templateA.paintMarkerNum && { paintMarkerNum: IBR_OP4OEData.templateA.paintMarkerNum }),
                ...(IBR_OP4OEData.templateA.chainVision && { chainVision: IBR_OP4OEData.templateA.chainVision }),
                ...(IBR_OP4OEData.templateA.lubeVision && { lubeVision: IBR_OP4OEData.templateA.lubeVision }),
                ...(IBR_OP4OEData.templateA.trolleyVision && { trolleyVision: IBR_OP4OEData.templateA.trolleyVision }),
                ...(IBR_OP4OEData.templateA.trolleyDetect && { trolleyDetect: IBR_OP4OEData.templateA.trolleyDetect }),
                ...(IBR_OP4OEData.templateA.omniView && { omniView: IBR_OP4OEData.templateA.omniView }),
                ...(IBR_OP4OEData.templateA.dcuUpgradeNum && { dcuUpgradeNum: IBR_OP4OEData.templateA.dcuUpgradeNum }),
                ...(IBR_OP4OEData.templateA.piuDistance && { piuDistance: IBR_OP4OEData.templateA.piuDistance }),
                ...(IBR_OP4OEData.templateA.switchDistance && { switchDistance: IBR_OP4OEData.templateA.switchDistance }),
                ...(IBR_OP4OEData.templateA.ampPickup && { ampPickup: IBR_OP4OEData.templateA.ampPickup }),
                ...(IBR_OP4OEData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_OP4OEData.templateA.fromAirTakeUpDistance }),
                ...(IBR_OP4OEData.templateA.specialControllerOptions && { specialControllerOptions: IBR_OP4OEData.templateA.specialControllerOptions }),
                ...(IBR_OP4OEData.templateA.operatingVoltage && { operatingVoltage: IBR_OP4OEData.templateA.operatingVoltage })
            },
            
            ...(IBR_OP4OEData.wheelOpenType && { wheelOpenType: IBR_OP4OEData.wheelOpenType }),
            ...(IBR_OP4OEData.wheelClosedType && { wheelClosedType: IBR_OP4OEData.wheelClosedType }),
            ...(IBR_OP4OEData.openStatus && { openStatus: IBR_OP4OEData.openStatus }),
            ...(IBR_OP4OEData.freeWheelStatus && { freeWheelStatus: IBR_OP4OEData.freeWheelStatus }),
            ...(IBR_OP4OEData.guideRollerStatus && { guideRollerStatus: IBR_OP4OEData.guideRollerStatus }),
            ...(IBR_OP4OEData.openRaceStyle && { openRaceStyle: IBR_OP4OEData.openRaceStyle }),
            ...(IBR_OP4OEData.closedRaceStyle && { closedRaceStyle: IBR_OP4OEData.closedRaceStyle }),
            ...(IBR_OP4OEData.holeStatus && { holeStatus: IBR_OP4OEData.holeStatus }),
            ...(IBR_OP4OEData.actuatorStatus && { actuatorStatus: IBR_OP4OEData.actuatorStatus }),
            ...(IBR_OP4OEData.pivotStatus && { pivotStatus: IBR_OP4OEData.pivotStatus }),
            ...(IBR_OP4OEData.kingPinStatus && { kingPinStatus: IBR_OP4OEData.kingPinStatus }),
            ...(IBR_OP4OEData.outboardStatus && { outboardStatus: IBR_OP4OEData.outboardStatus }),
            ...(IBR_OP4OEData.railLubeStatus && { railLubeStatus: IBR_OP4OEData.railLubeStatus }),
            ...(IBR_OP4OEData.lubeBrand && { lubeBrand: IBR_OP4OEData.lubeBrand }),
            ...(IBR_OP4OEData.lubeType && { lubeType: IBR_OP4OEData.lubeType }),
            ...(IBR_OP4OEData.lubeViscosity && { lubeViscosity: IBR_OP4OEData.lubeViscosity }),
            ...(IBR_OP4OEData.chainMaster && { chainMaster: IBR_OP4OEData.chainMaster }),
            ...(IBR_OP4OEData.timerStatus && { timerStatus: IBR_OP4OEData.timerStatus }),
            ...(IBR_OP4OEData.electricStatus && { electricStatus: IBR_OP4OEData.electricStatus }),
            ...(IBR_OP4OEData.pneumaticStatus && { pneumaticStatus: IBR_OP4OEData.pneumaticStatus }),
            ...(IBR_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: IBR_OP4OEData.mightyLubeMonitoring }),
            ...(IBR_OP4OEData.plcConnection && { plcConnection: IBR_OP4OEData.plcConnection }),
            ...(IBR_OP4OEData.otherControllerInfo && { otherControllerInfo: IBR_OP4OEData.otherControllerInfo }),
            ...(IBR_OP4OEData.ibrUnitType && { ibrUnitType: IBR_OP4OEData.ibrUnitType }),
            ...(IBR_OP4OEData.ibrChainA1 && { ibrChainA1: IBR_OP4OEData.ibrChainA1 }),
            ...(IBR_OP4OEData.ibrChainB1 && { ibrChainB1: IBR_OP4OEData.ibrChainB1 }),
            ...(IBR_OP4OEData.ibrChainC1 && { ibrChainC1: IBR_OP4OEData.ibrChainC1 }),
            ...(IBR_OP4OEData.ibrChainD1 && { ibrChainD1: IBR_OP4OEData.ibrChainD1 }),
            ...(IBR_OP4OEData.ibrChainF1 && { ibrChainF1: IBR_OP4OEData.ibrChainF1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;