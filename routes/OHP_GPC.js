const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_GPC = require("../models/OHP_GPC");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_GPCData, numRequested } = req.body;
        const order = new OHP_GPC({
            conveyorName: OHP_GPCData.conveyorName,
            chainSize: OHP_GPCData.chainSize,
            ...(OHP_GPCData.otherChainSize && { otherChainSize: OHP_GPCData.otherChainSize }),
            industrialChainManufacturer: OHP_GPCData.industrialChainManufacturer,
            ...(OHP_GPCData.otherChainManufacturer && { otherChainManufacturer: OHP_GPCData.otherChainManufacturer }),
            wheelManufacturer: OHP_GPCData.wheelManufacturer,
            ...(OHP_GPCData.otherWheelManufacturer && { otherWheelManufacturer: OHP_GPCData.otherWheelManufacturer }),
            conveyorLength: OHP_GPCData.conveyorLength,
            conveyorLengthUnit: OHP_GPCData.conveyorLengthUnit,
            conveyorSpeed: OHP_GPCData.conveyorSpeed,
            conveyorSpeedUnit: OHP_GPCData.conveyorSpeedUnit,
            conveyorIndex: OHP_GPCData.conveyorIndex,
            travelDirection: OHP_GPCData.travelDirection,
            appEnviroment: OHP_GPCData.appEnviroment,
            ...(OHP_GPCData.ovenStatus && { ovenStatus: OHP_GPCData.ovenStatus }),
            ...(OHP_GPCData.ovenTemp && { ovenTemp: OHP_GPCData.ovenTemp }),
            ...(OHP_ESData.otherAppEnviroment && { otherAppEnviroment: OHP_ESData.otherAppEnviroment }),
            surroundingTemp: OHP_GPCData.surroundingTemp,
            orientation: OHP_GPCData.orientation,
            swingStatus: OHP_GPCData.swingStatus,
            conveyorLoaded: OHP_GPCData.conveyorLoaded,
            plantLayout: OHP_GPCData.plantLayout,
            operatingVoltSingle: OHP_ESData.operatingVoltSingle,
            controlVoltSingle: OHP_ESData.controlVoltSingle,
            compressedAir: OHP_ESData.compressedAir,
        monitorData: 
        {
                existingMonitor: OHP_GPCData.templateA.existingMonitor,
                newMonitor: OHP_GPCData.templateA.newMonitor,		
                ...(OHP_GPCData.templateA.dcuStatus && { dcuStatus: OHP_GPCData.templateA.dcuStatus }),
                ...(OHP_GPCData.templateA.dcuNum && { dcuNum: OHP_GPCData.templateA.dcuNum }),
                ...(OHP_GPCData.templateA.existingWindows && { existingWindows: OHP_GPCData.templateA.existingWindows }),
                ...(OHP_GPCData.templateA.existingHeadUnit && { existingHeadUnit: OHP_GPCData.templateA.existingHeadUnit }),
                ...(OHP_GPCData.templateA.existingDCU && { existingDCU: OHP_GPCData.templateA.existingDCU }),
                ...(OHP_GPCData.templateA.existingPowerInterface && { existingPowerInterface: OHP_GPCData.templateA.existingPowerInterface }),
                ...(OHP_GPCData.templateA.newReservoir && { newReservoir: OHP_GPCData.templateA.newReservoir }),
                ...(OHP_GPCData.templateA.reservoirSize && { reservoirSize: OHP_GPCData.templateA.reservoirSize }),
                ...(OHP_GPCData.templateA.otherReservoirSize && { otherReservoirSize: OHP_GPCData.templateA.otherReservoirSize }),
                ...(OHP_GPCData.templateA.newReservoirNum && { newReservoirNum: OHP_GPCData.templateA.newReservoirNum }),
                ...(OHP_GPCData.templateA.typeMonitor && { typeMonitor: OHP_GPCData.templateA.typeMonitor }),
                ...(OHP_GPCData.templateA.driveMotorAmp && { driveMotorAmp: OHP_GPCData.templateA.driveMotorAmp }),
                ...(OHP_GPCData.templateA.driveMotorAmpNum && { driveMotorAmpNum: OHP_GPCData.templateA.driveMotorAmpNum }),
                ...(OHP_GPCData.templateA.driveTakeUpAir && { driveTakeUpAir: OHP_GPCData.templateA.driveTakeUpAir }),
                ...(OHP_GPCData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_GPCData.templateA.driveTakeUpAirNum }),
                ...(OHP_GPCData.templateA.takeUpDistance && { takeUpDistance: OHP_GPCData.templateA.takeUpDistance }),
                ...(OHP_GPCData.templateA.takeUpDistanceNum && { takeUpDistanceNum: OHP_GPCData.templateA.takeUpDistanceNum }),
                ...(OHP_GPCData.templateA.driveTemp && { driveTemp: OHP_GPCData.templateA.driveTemp }),
                ...(OHP_GPCData.templateA.driveTempNum && { driveTempNum: OHP_GPCData.templateA.driveTempNum }),
                ...(OHP_GPCData.templateA.driveVibration && { driveVibration: OHP_GPCData.templateA.driveVibration }),
                ...(OHP_GPCData.templateA.driveVibrationNum && { driveVibrationNum: OHP_GPCData.templateA.driveVibrationNum }),
                ...(OHP_GPCData.templateA.dogPitch && { dogPitch: OHP_GPCData.templateA.dogPitch }),
                ...(OHP_GPCData.templateA.dogPitchNum && { dogPitchNum: OHP_GPCData.templateA.dogPitchNum }),
                ...(OHP_GPCData.templateA.paintMarker && { paintMarker: OHP_GPCData.templateA.paintMarker }),
                ...(OHP_GPCData.templateA.paintMarkerNum && { paintMarkerNum: OHP_GPCData.templateA.paintMarkerNum }),
                ...(OHP_GPCData.templateA.chainVision && { chainVision: OHP_GPCData.templateA.chainVision }),
                ...(OHP_GPCData.templateA.lubeVision && { lubeVision: OHP_GPCData.templateA.lubeVision }),
                ...(OHP_GPCData.templateA.trolleyVision && { trolleyVision: OHP_GPCData.templateA.trolleyVision }),
                ...(OHP_GPCData.templateA.trolleyDetect && { trolleyDetect: OHP_GPCData.templateA.trolleyDetect }),
                ...(OHP_GPCData.templateA.omniView && { omniView: OHP_GPCData.templateA.omniView }),
                ...(OHP_GPCData.templateA.dcuUpgradeNum && { dcuUpgradeNum: OHP_GPCData.templateA.dcuUpgradeNum }),
                ...(OHP_GPCData.templateA.piuDistance && { piuDistance: OHP_GPCData.templateA.piuDistance }),
                ...(OHP_GPCData.templateA.switchDistance && { switchDistance: OHP_GPCData.templateA.switchDistance }),
                ...(OHP_GPCData.templateA.ampPickup && { ampPickup: OHP_GPCData.templateA.ampPickup }),
                ...(OHP_GPCData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_GPCData.templateA.fromAirTakeUpDistance }),
                ...(OHP_GPCData.templateA.specialControllerOptions && { specialControllerOptions: OHP_GPCData.templateA.specialControllerOptions }),
                ...(OHP_GPCData.templateA.operatingVoltage && { operatingVoltage: OHP_GPCData.templateA.operatingVoltage })
            },
            
            currentGrease: OHP_GPCData.currentGrease,
            currentGreaseGrade: OHP_GPCData.currentGreaseGrade,
            wheelDiameter: OHP_GPCData.wheelDiameter,
            lubeBrand: OHP_GPCData.lubeBrand,

            ...(OHP_GPCData.chainMaster && { chainMaster: OHP_GPCData.chainMaster }),
            ...(OHP_GPCData.remoteStatus && { remoteStatus: OHP_GPCData.remoteStatus }),
            ...(OHP_GPCData.mountStatus && { mountStatus: OHP_GPCData.mountStatus }),
            ...(OHP_GPCData.otherUnitStatus && { otherUnitStatus: OHP_GPCData.otherUnitStatus }),
            ...(OHP_GPCData.timerStatus && { timerStatus: OHP_GPCData.timerStatus }),
            ...(OHP_GPCData.mightyLubeMonitoring && { mightyLubeMonitoring: OHP_GPCData.mightyLubeMonitoring }),
            ...(OHP_GPCData.preMountType && { preMountType: OHP_GPCData.preMountType }),
            ...(OHP_GPCData.otherControllerNotes && { otherControllerNotes: OHP_GPCData.otherControllerNotes }),
            ...(OHP_GPCData.gpcUnitType && { gpcUnitType: OHP_GPCData.gpcUnitType }),
            ...(OHP_GPCData.chainDrop && { chainDrop: OHP_GPCData.chainDrop }),
            ...(OHP_GPCData.gpcDiameter && { gpcDiameter: OHP_GPCData.gpcDiameter }),
            ...(OHP_GPCData.gpcWheelC && { gpcWheelC: OHP_GPCData.gpcWheelC }),
            ...(OHP_GPCData.gpcWheelD && { gpcWheelD: OHP_GPCData.gpcWheelD }),
            ...(OHP_GPCData.gpcWheelE && { gpcWheelE: OHP_GPCData.gpcWheelE }),
            ...(OHP_GPCData.gpcWheelF && { gpcWheelF: OHP_GPCData.gpcWheelF }),
            ...(OHP_GPCData.gpcWheelG && { gpcWheelG: OHP_GPCData.gpcWheelG }),
            ...(OHP_GPCData.gpcWheelH && { gpcWheelH: OHP_GPCData.gpcWheelH }),
            ...(OHP_GPCData.gpcWheelS && { gpcWheelS: OHP_GPCData.gpcWheelS }),
    
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_GPC"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_GPC entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;