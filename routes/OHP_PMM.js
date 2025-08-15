 const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_PMM = require("../models/OHP_PMM");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_PMMData, numRequested } = req.body;
        const order = new OHP_PMM({
            conveyorName: OHP_PMMData.conveyorName,
            chainSize: OHP_PMMData.chainSize,
            ...(OHP_PMMData.otherChainSize && { otherChainSize: OHP_PMMData.otherChainSize }),
            industrialChainManufacturer: OHP_PMMData.industrialChainManufacturer,
            ...(OHP_PMMData.otherChainManufacturer && { otherChainManufacturer: OHP_PMMData.otherChainManufacturer }),
            orientationType: OHP_PMMData.orientationType,
            markerToUnitDistance: OHP_PMMData.markerToUnitDistance,
        monitorData: 
        {
                existingMonitor: OHP_PMMData.templateA.existingMonitor,
                newMonitor: OHP_PMMData.templateA.newMonitor,		
                ...(OHP_PMMData.templateA.dcuStatus && { dcuStatus: OHP_PMMData.templateA.dcuStatus }),
                ...(OHP_PMMData.templateA.dcuNum && { dcuNum: OHP_PMMData.templateA.dcuNum }),
                ...(OHP_PMMData.templateA.existingWindows && { existingWindows: OHP_PMMData.templateA.existingWindows }),
                ...(OHP_PMMData.templateA.existingHeadUnit && { existingHeadUnit: OHP_PMMData.templateA.existingHeadUnit }),
                ...(OHP_PMMData.templateA.existingDCU && { existingDCU: OHP_PMMData.templateA.existingDCU }),
                ...(OHP_PMMData.templateA.existingPowerInterface && { existingPowerInterface: OHP_PMMData.templateA.existingPowerInterface }),
                ...(OHP_PMMData.templateA.newReservoir && { newReservoir: OHP_PMMData.templateA.newReservoir }),
                ...(OHP_PMMData.templateA.reservoirSize && { reservoirSize: OHP_PMMData.templateA.reservoirSize }),
                ...(OHP_PMMData.templateA.otherReservoirSize && { otherReservoirSize: OHP_PMMData.templateA.otherReservoirSize }),
                ...(OHP_PMMData.templateA.newReservoirNum && { newReservoirNum: OHP_PMMData.templateA.newReservoirNum }),
                ...(OHP_PMMData.templateA.typeMonitor && { typeMonitor: OHP_PMMData.templateA.typeMonitor }),
                ...(OHP_PMMData.templateA.driveMotorAmp && { driveMotorAmp: OHP_PMMData.templateA.driveMotorAmp }),
                ...(OHP_PMMData.templateA.driveMotorAmpNum && { driveMotorAmpNum: OHP_PMMData.templateA.driveMotorAmpNum }),
                ...(OHP_PMMData.templateA.driveTakeUpAir && { driveTakeUpAir: OHP_PMMData.templateA.driveTakeUpAir }),
                ...(OHP_PMMData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_PMMData.templateA.driveTakeUpAirNum }),
                ...(OHP_PMMData.templateA.takeUpDistance && { takeUpDistance: OHP_PMMData.templateA.takeUpDistance }),
                ...(OHP_PMMData.templateA.takeUpDistanceNum && { takeUpDistanceNum: OHP_PMMData.templateA.takeUpDistanceNum }),
                ...(OHP_PMMData.templateA.driveTemp && { driveTemp: OHP_PMMData.templateA.driveTemp }),
                ...(OHP_PMMData.templateA.driveTempNum && { driveTempNum: OHP_PMMData.templateA.driveTempNum }),
                ...(OHP_PMMData.templateA.driveVibration && { driveVibration: OHP_PMMData.templateA.driveVibration }),
                ...(OHP_PMMData.templateA.driveVibrationNum && { driveVibrationNum: OHP_PMMData.templateA.driveVibrationNum }),
                ...(OHP_PMMData.templateA.dogPitch && { dogPitch: OHP_PMMData.templateA.dogPitch }),
                ...(OHP_PMMData.templateA.dogPitchNum && { dogPitchNum: OHP_PMMData.templateA.dogPitchNum }),
                ...(OHP_PMMData.templateA.paintMarker && { paintMarker: OHP_PMMData.templateA.paintMarker }),
                ...(OHP_PMMData.templateA.paintMarkerNum && { paintMarkerNum: OHP_PMMData.templateA.paintMarkerNum }),
                ...(OHP_PMMData.templateA.chainVision && { chainVision: OHP_PMMData.templateA.chainVision }),
                ...(OHP_PMMData.templateA.lubeVision && { lubeVision: OHP_PMMData.templateA.lubeVision }),
                ...(OHP_PMMData.templateA.trolleyVision && { trolleyVision: OHP_PMMData.templateA.trolleyVision }),
                ...(OHP_PMMData.templateA.trolleyDetect && { trolleyDetect: OHP_PMMData.templateA.trolleyDetect }),
                ...(OHP_PMMData.templateA.omniView && { omniView: OHP_PMMData.templateA.omniView }),
                ...(OHP_PMMData.templateA.dcuUpgradeNum && { dcuUpgradeNum: OHP_PMMData.templateA.dcuUpgradeNum }),
                ...(OHP_PMMData.templateA.piuDistance && { piuDistance: OHP_PMMData.templateA.piuDistance }),
                ...(OHP_PMMData.templateA.switchDistance && { switchDistance: OHP_PMMData.templateA.switchDistance }),
                ...(OHP_PMMData.templateA.ampPickup && { ampPickup: OHP_PMMData.templateA.ampPickup }),
                ...(OHP_PMMData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_PMMData.templateA.fromAirTakeUpDistance }),
                ...(OHP_PMMData.templateA.specialControllerOptions && { specialControllerOptions: OHP_PMMData.templateA.specialControllerOptions }),
                ...(OHP_PMMData.templateA.operatingVoltage && { operatingVoltage: OHP_PMMData.templateA.operatingVoltage })
            },

        ...(OHP_PMMData.dcuNum && { dcuNum: OHP_PMMData.dcuNum }),

        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_PMM"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_PMM entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;