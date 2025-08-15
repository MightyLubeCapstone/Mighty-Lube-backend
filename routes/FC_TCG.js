const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_TCG = require("../models/FC_TCG");
const templateA = require("../models/templateA");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_TCGData, numRequested } = req.body;
        const order = new FC_TCG({

            conveyorName: FC_TCGData.conveyorName,
            industrialChainManufacturer: FC_TCGData.industrialChainManufacturer,
            ...(FC_TCGData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FC_TCGData.otherIndustrialChainManufacturer }),
            wheelManufacturer: FC_TCGData.wheelManufacturer,
            ...(FC_TCGData.otherWheelManufacturer && { otherWheelManufacturer: FC_TCGData.otherWheelManufacturer }),
            conveyorSpeed: FC_TCGData.conveyorSpeed,
            conveyorSpeedUnit: FC_TCGData.conveyorSpeedUnit,
            conveyorIndex: FC_TCGData.conveyorIndex,
            appEnviroment: FC_TCGData.appEnviroment,
            ...(FC_TCGData.otherAppEnviroment && { otherAppEnviroment: FC_TCGData.otherAppEnviroment }),
            surroundingTemp: FC_TCGData.surroundingTemp,
            orientationType: FC_TCGData.orientationType,
            operatingVoltage: FC_TCGData.operatingVoltage,
            controlVoltSingle: FC_TCGData.controlVoltSingle,
            monitorData: 
            {
                existingMonitor: FC_TCGData.templateA.existingMonitor,
                newMonitor: FC_TCGData.templateA.newMonitor,		
                ...(FC_TCGData.templateA.dcuStatus && { dcuStatus: FC_TCGData.templateA.dcuStatus }),
                ...(FC_TCGData.templateA.dcuNum && { dcuNum: FC_TCGData.templateA.dcuNum }),
                ...(FC_TCGData.templateA.existingWindows && { existingWindows: FC_TCGData.templateA.existingWindows }),
                ...(FC_TCGData.templateA.existingHeadUnit && { existingHeadUnit: FC_TCGData.templateA.existingHeadUnit }),
                ...(FC_TCGData.templateA.existingDCU && { existingDCU: FC_TCGData.templateA.existingDCU }),
                ...(FC_TCGData.templateA.existingPowerInterface && { existingPowerInterface: FC_TCGData.templateA.existingPowerInterface }),
                ...(FC_TCGData.templateA.newReservoir && { newReservoir: FC_TCGData.templateA.newReservoir }),
                ...(FC_TCGData.templateA.reservoirSize && { reservoirSize: FC_TCGData.templateA.reservoirSize }),
                ...(FC_TCGData.templateA.otherReservoirSize && { otherReservoirSize: FC_TCGData.templateA.otherReservoirSize }),
                ...(FC_TCGData.templateA.newReservoirNum && { newReservoirNum: FC_TCGData.templateA.newReservoirNum }),
                ...(FC_TCGData.templateA.typeMonitor && { typeMonitor: FC_TCGData.templateA.typeMonitor }),
                ...(FC_TCGData.templateA.driveMotorAmp && { driveMotorAmp: FC_TCGData.templateA.driveMotorAmp }),
                ...(FC_TCGData.templateA.driveMotorAmpNum && { driveMotorAmpNum: FC_TCGData.templateA.driveMotorAmpNum }),
                ...(FC_TCGData.templateA.driveTakeUpAir && { driveTakeUpAir: FC_TCGData.templateA.driveTakeUpAir }),
                ...(FC_TCGData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FC_TCGData.templateA.driveTakeUpAirNum }),
                ...(FC_TCGData.templateA.takeUpDistance && { takeUpDistance: FC_TCGData.templateA.takeUpDistance }),
                ...(FC_TCGData.templateA.takeUpDistanceNum && { takeUpDistanceNum: FC_TCGData.templateA.takeUpDistanceNum }),
                ...(FC_TCGData.templateA.driveTemp && { driveTemp: FC_TCGData.templateA.driveTemp }),
                ...(FC_TCGData.templateA.driveTempNum && { driveTempNum: FC_TCGData.templateA.driveTempNum }),
                ...(FC_TCGData.templateA.driveVibration && { driveVibration: FC_TCGData.templateA.driveVibration }),
                ...(FC_TCGData.templateA.driveVibrationNum && { driveVibrationNum: FC_TCGData.templateA.driveVibrationNum }),
                ...(FC_TCGData.templateA.dogPitch && { dogPitch: FC_TCGData.templateA.dogPitch }),
                ...(FC_TCGData.templateA.dogPitchNum && { dogPitchNum: FC_TCGData.templateA.dogPitchNum }),
                ...(FC_TCGData.templateA.paintMarker && { paintMarker: FC_TCGData.templateA.paintMarker }),
                ...(FC_TCGData.templateA.paintMarkerNum && { paintMarkerNum: FC_TCGData.templateA.paintMarkerNum }),
                ...(FC_TCGData.templateA.chainVision && { chainVision: FC_TCGData.templateA.chainVision }),
                ...(FC_TCGData.templateA.lubeVision && { lubeVision: FC_TCGData.templateA.lubeVision }),
                ...(FC_TCGData.templateA.trolleyVision && { trolleyVision: FC_TCGData.templateA.trolleyVision }),
                ...(FC_TCGData.templateA.trolleyDetect && { trolleyDetect: FC_TCGData.templateA.trolleyDetect }),
                ...(FC_TCGData.templateA.omniView && { omniView: FC_TCGData.templateA.omniView }),
                ...(FC_TCGData.templateA.dcuUpgradeNum && { dcuUpgradeNum: FC_TCGData.templateA.dcuUpgradeNum }),
                ...(FC_TCGData.templateA.piuDistance && { piuDistance: FC_TCGData.templateA.piuDistance }),
                ...(FC_TCGData.templateA.switchDistance && { switchDistance: FC_TCGData.templateA.switchDistance }),
                ...(FC_TCGData.templateA.ampPickup && { ampPickup: FC_TCGData.templateA.ampPickup }),
                ...(FC_TCGData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_TCGData.templateA.fromAirTakeUpDistance }),
                ...(FC_TCGData.templateA.specialControllerOptions && { specialControllerOptions: FC_TCGData.templateA.specialControllerOptions }),
                ...(FC_TCGData.templateA.operatingVoltage && { operatingVoltage: FC_TCGData.templateA.operatingVoltage })
            },
            
            lubeType: FC_TCGData.lubeType,
            carrierWheels: FC_TCGData.carrierWheels,
            kingPinStatus: FC_TCGData.kingPinStatus,
            lubeBrand: FC_TCGData.lubeBrand,
            greaseStatus: FC_TCGData.greaseStatus,
            ...(FC_TCGData.currentGrease && { currentGrease: FC_TCGData.currentGrease }),
            ...(FC_TCGData.currentGreaseGrade && { currentGreaseGrade: FC_TCGData.currentGreaseGrade }),
            oilStatus: FC_TCGData.oilStatus,
            ...(FC_TCGData.currentOil && { currentOil: FC_TCGData.currentOil }),
            ...(FC_TCGData.oilViscosity && { oilViscosity: FC_TCGData.oilViscosity }),
            zerkDirection: FC_TCGData.zerkDirection,
            zerkLocationType: FC_TCGData.zerkLocationType,
            conveyorSwing: FC_TCGData.conveyorSwing,
            ...(FC_TCGData.chainMaster && { chainMaster: FC_TCGData.chainMaster }),
            ...(FC_TCGData.remoteStatus && { remoteStatus: FC_TCGData.remoteStatus }),
            ...(FC_TCGData.mountStatus && { mountStatus: FC_TCGData.mountStatus }),
            ...(FC_TCGData.otherUnitStatus && { otherUnitStatus: FC_TCGData.otherUnitStatus }),
            ...(FC_TCGData.timerStatus && { timerStatus: FC_TCGData.timerStatus }),
            ...(FC_TCGData.electricStatus && { electricStatus: FC_TCGData.electricStatus }),
            ...(FC_TCGData.mightyLubeMonitoring && { mightyLubeMonitoring: FC_TCGData.mightyLubeMonitoring }),
            ...(FC_TCGData.preMountType && { preMountType: FC_TCGData.preMountType }),
            ...(FC_TCGData.otherPreMountType && { otherPreMountType: FC_TCGData.otherPreMountType }),
            ...(FC_TCGData.plcConnection && { plcConnection: FC_TCGData.plcConnection }),
            ...(FC_TCGData.otherControllerNotes && { otherControllerNotes: FC_TCGData.otherControllerNotes }),

        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "FC_TCG"
        });
        await req.user.save();
        return res.status(200).json({ message: "FC_TCG entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;