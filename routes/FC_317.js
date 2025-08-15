const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_317 = require("../models/FC_317");
const templateA = require("../models/templateA");
const templateC = require("../models/templateC");

const router = express.Router();
 
router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_317Data, numRequested } = req.body;
        const order = new FC_317({
            templateCData: 
            {
            conveyorName: FC_317Data.templateC.conveyorName,
            industrialChainManufacturer: FC_317Data.templateC.industrialChainManufacturer,
            ...(FC_317Data.templateC.otherChainManufacturer && { otherChainManufacturer: FC_317Data.templateC.otherChainManufacturer }),
            wheelManufacturer: FC_317Data.templateC.wheelManufacturer,
            ...(FC_317Data.templateC.wheelManufacturer && { wheelManufacturer: FC_317Data.templateC.wheelManufacturer}),
            conveyorSpeed: FC_317Data.templateC.conveyorSpeed,
            conveyorSpeedUnit: FC_317Data.templateC.conveyorSpeedUnit,
            conveyorIndex: FC_317Data.templateC.conveyorIndex,
            ...(FC_317Data.templateC.travelDirection && { travelDirection: FC_317Data.templateC.travelDirection}),
            appEnviroment: FC_317Data.templateC.appEnviroment,
            ...(FC_317Data.templateC.otherAppEnviroment && { otherAppEnviroment: FC_317Data.templateC.otherAppEnviroment}),
            surroundingTemp: FC_317Data.templateC.surroundingTemp,
            orientationType: FC_317Data.templateC.orientationType,
            guideWheelsEven: FC_317Data.templateC.guideWheelsEven,
            operatingVoltage: FC_317Data.templateC.operatingVoltage,
            controlVoltSingle: FC_317Data.templateC.controlVoltSingle,
            compressedAir: FC_317Data.templateC.compressedAir,
            ...(FC_317Data.templateC.airSupplyType && { airSupplyType: FC_317Data.templateC.airSupplyType}),
 
            templateA_CData: 
            {
                existingMonitor: FC_317Data.templateA.existingMonitor,
                newMonitor: FC_317Data.templateA.newMonitor,		
                ...(FC_317Data.templateA.dcuStatus && { dcuStatus: FC_317Data.templateA.dcuStatus }),
                ...(FC_317Data.templateA.dcuNum && { dcuNum: FC_317Data.templateA.dcuNum }),
                ...(FC_317Data.templateA.existingWindows && { existingWindows: FC_317Data.templateA.existingWindows }),
                ...(FC_317Data.templateA.existingHeadUnit && { existingHeadUnit: FC_317Data.templateA.existingHeadUnit }),
                ...(FC_317Data.templateA.existingDCU && { existingDCU: FC_317Data.templateA.existingDCU }),
                ...(FC_317Data.templateA.existingPowerInterface && { existingPowerInterface: FC_317Data.templateA.existingPowerInterface }),
                ...(FC_317Data.templateA.newReservoir && { newReservoir: FC_317Data.templateA.newReservoir }),
                ...(FC_317Data.templateA.reservoirSize && { reservoirSize: FC_317Data.templateA.reservoirSize }),
                ...(FC_317Data.templateA.otherReservoirSize && { otherReservoirSize: FC_317Data.templateA.otherReservoirSize }),
                ...(FC_317Data.templateA.newReservoirNum && { newReservoirNum: FC_317Data.templateA.newReservoirNum }),
                ...(FC_317Data.templateA.typeMonitor && { typeMonitor: FC_317Data.templateA.typeMonitor }),
                ...(FC_317Data.templateA.driveMotorAmp && { driveMotorAmp: FC_317Data.templateA.driveMotorAmp }),
                ...(FC_317Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: FC_317Data.templateA.driveMotorAmpNum }),
                ...(FC_317Data.templateA.driveTakeUpAir && { driveTakeUpAir: FC_317Data.templateA.driveTakeUpAir }),
                ...(FC_317Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FC_317Data.templateA.driveTakeUpAirNum }),
                ...(FC_317Data.templateA.takeUpDistance && { takeUpDistance: FC_317Data.templateA.takeUpDistance }),
                ...(FC_317Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: FC_317Data.templateA.takeUpDistanceNum }),
                ...(FC_317Data.templateA.driveTemp && { driveTemp: FC_317Data.templateA.driveTemp }),
                ...(FC_317Data.templateA.driveTempNum && { driveTempNum: FC_317Data.templateA.driveTempNum }),
                ...(FC_317Data.templateA.driveVibration && { driveVibration: FC_317Data.templateA.driveVibration }),
                ...(FC_317Data.templateA.driveVibrationNum && { driveVibrationNum: FC_317Data.templateA.driveVibrationNum }),
                ...(FC_317Data.templateA.dogPitch && { dogPitch: FC_317Data.templateA.dogPitch }),
                ...(FC_317Data.templateA.dogPitchNum && { dogPitchNum: FC_317Data.templateA.dogPitchNum }),
                ...(FC_317Data.templateA.paintMarker && { paintMarker: FC_317Data.templateA.paintMarker }),
                ...(FC_317Data.templateA.paintMarkerNum && { paintMarkerNum: FC_317Data.templateA.paintMarkerNum }),
                ...(FC_317Data.templateA.chainVision && { chainVision: FC_317Data.templateA.chainVision }),
                ...(FC_317Data.templateA.lubeVision && { lubeVision: FC_317Data.templateA.lubeVision }),
                ...(FC_317Data.templateA.trolleyVision && { trolleyVision: FC_317Data.templateA.trolleyVision }),
                ...(FC_317Data.templateA.trolleyDetect && { trolleyDetect: FC_317Data.templateA.trolleyDetect }),
                ...(FC_317Data.templateA.omniView && { omniView: FC_317Data.templateA.omniView }),
                ...(FC_317Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: FC_317Data.templateA.dcuUpgradeNum }),
                ...(FC_317Data.templateA.piuDistance && { piuDistance: FC_317Data.templateA.piuDistance }),
                ...(FC_317Data.templateA.switchDistance && { switchDistance: FC_317Data.templateA.switchDistance }),
                ...(FC_317Data.templateA.ampPickup && { ampPickup: FC_317Data.templateA.ampPickup }),
                ...(FC_317Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_317Data.templateA.fromAirTakeUpDistance }),
                ...(FC_317Data.templateA.specialControllerOptions && { specialControllerOptions: FC_317Data.templateA.specialControllerOptions }),
                ...(FC_317Data.templateA.operatingVoltage && { operatingVoltage: FC_317Data.templateA.operatingVoltage })
            },
            
            freeWheelStatus: FC_317Data.templateC.freeWheelStatus,
            actuatorStatus: FC_317Data.templateC.actuatorStatus,
            ...(FC_317Data.templateC.pivotStatus && { pivotStatus: FC_317Data.templateC.pivotStatus}),
            kingPinStatus: FC_317Data.templateC.kingPinStatus,
            lubeBrand: FC_317Data.templateC.lubeBrand,
            lubeViscosity: FC_317Data.templateC.lubeViscosity,
            ...(FC_317Data.templateC.lubeType && { lubeType: FC_317Data.templateC.lubeType}),
            currentGrease: FC_317Data.templateC.currentGrease,
            currentGreaseGrade: FC_317Data.templateC.currentGreaseGrade,
            zerkDirection: FC_317Data.templateC.zerkDirection,
            zerkLocationType: FC_317Data.templateC.zerkLocationType,
            wheelDiameter: FC_317Data.templateC.wheelDiameter,
            conveyorSwing: FC_317Data.templateC.conveyorSwing,
            ...(FC_317Data.templateC.chainMaster && { lubeType: FC_317Data.templateC.chainMaster}),
            ...(FC_317Data.templateC.remoteStatus && { lubeType: FC_317Data.templateC.remoteStatus}),
            ...(FC_317Data.templateC.mountStatus && { lubeType: FC_317Data.templateC.mountStatus}),
            ...(FC_317Data.templateC.otherUnitStatus && { lubeType: FC_317Data.templateC.otherUnitStatus}),
            ...(FC_317Data.templateC.timerStatus && { lubeType: FC_317Data.templateC.timerStatus}),
            ...(FC_317Data.templateC.electricStatus && { lubeType: FC_317Data.templateC.electricStatus}),
            ...(FC_317Data.templateC.mightyLubeMonitoring && { lubeType: FC_317Data.templateC.mightyLubeMonitoring}),
            ...(FC_317Data.templateC.preMountType && { lubeType: FC_317Data.templateC.preMountType}),
            ...(FC_317Data.templateC.otherPreMountType && { lubeType: FC_317Data.templateC.otherPreMountType}),
            ...(FC_317Data.templateC.plcConnection && { lubeType: FC_317Data.templateC.plcConnection}),
            ...(FC_317Data.templateC.otherControllerNotes && { lubeType: FC_317Data.templateC.otherControllerNotes}),
            ...(FC_317Data.templateC.templateC_UnitType && { lubeType: FC_317Data.templateC.templateC_UnitType}),
            templateC_InvertedA: FC_317Data.templateC.templateC_InvertedA,
            templateC_InvertedB: FC_317Data.templateC.templateC_InvertedB,
            templateC_InvertedE: FC_317Data.templateC.templateC_InvertedE,
            templateC_InvertedS: FC_317Data.templateC.templateC_InvertedS,
        },
        
           });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "FC_317"
        });
        await req.user.save();
        return res.status(200).json({ message: "FC_317 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;