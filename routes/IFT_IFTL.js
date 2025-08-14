// routes/IFT_IFTL.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IFT_IFTL = require("../models/IFT_IFTL");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { IFT_IFTLData, numRequested } = req.body;

        const order = new IFT_IFTL({

            conveyorName: IFT_IFTLData.conveyorName,
            pitchBetweenRollers: IFT_IFTLData.pitchBetweenRollers,
            ...(IFT_IFTLData.otherPitchBetweenRollers && { otherPitchBetweenRollers: IFT_IFTLData.otherPitchBetweenRollers }),
            industrialChainManufacturer: IFT_IFTLData.industrialChainManufacturer,
            ...(IFT_IFTLData.otherChainManufacturer && { otherChainManufacturer: IFT_IFTLData.otherChainManufacturer }),
            conveyorSpeed: IFT_IFTLData.conveyorSpeed,
            ...(IFT_IFTLData.speedUnit && { speedUnit: IFT_IFTLData.speedUnit }),
            conveyorIndex: IFT_IFTLData.conveyorIndex,
            travelDirection: IFT_IFTLData.travelDirection,
            appEnviroment: IFT_IFTLData.appEnviroment,
            ...(IFT_IFTLData.ovenStatus && { ovenStatus: IFT_IFTLData.ovenStatus }),
            ...(IFT_IFTLData.ovenTemp && { ovenTemp: IFT_IFTLData.ovenTemp }),
            ...(IFT_IFTLData.otherAppEnviroment && { otherAppEnviroment: IFT_IFTLData.otherAppEnviroment }),
            surroundingTemp: IFT_IFTLData.surroundingTemp,
            conveyorLoaded: IFT_IFTLData.conveyorLoaded,
            conveyorSwing: IFT_IFTLData.conveyorSwing,
            strandStatus: IFT_IFTLData.strandStatus,
            plantLayout: IFT_IFTLData.plantLayout,
            requiredPics: IFT_IFTLData.requiredPics,
            operatingVoltage: IFT_IFTLData.operatingVoltage,
            monitorData: 
            {
                existingMonitor: IFT_IFTLData.templateA.existingMonitor,
                newMonitor: IFT_IFTLData.templateA.newMonitor,		
                ...(IFT_IFTLData.templateA.dcuStatus && { dcuStatus: IFT_IFTLData.templateA.dcuStatus }),
                ...(IFT_IFTLData.templateA.dcuNum && { dcuNum: IFT_IFTLData.templateA.dcuNum }),
                ...(IFT_IFTLData.templateA.existingWindows && { existingWindows: IFT_IFTLData.templateA.existingWindows }),
                ...(IFT_IFTLData.templateA.existingHeadUnit && { existingHeadUnit: IFT_IFTLData.templateA.existingHeadUnit }),
                ...(IFT_IFTLData.templateA.existingDCU && { existingDCU: IFT_IFTLData.templateA.existingDCU }),
                ...(IFT_IFTLData.templateA.existingPowerInterface && { existingPowerInterface: IFT_IFTLData.templateA.existingPowerInterface }),
                ...(IFT_IFTLData.templateA.newReservoir && { newReservoir: IFT_IFTLData.templateA.newReservoir }),
                ...(IFT_IFTLData.templateA.reservoirSize && { reservoirSize: IFT_IFTLData.templateA.reservoirSize }),
                ...(IFT_IFTLData.templateA.otherReservoirSize && { otherReservoirSize: IFT_IFTLData.templateA.otherReservoirSize }),
                ...(IFT_IFTLData.templateA.newReservoirNum && { newReservoirNum: IFT_IFTLData.templateA.newReservoirNum }),
                ...(IFT_IFTLData.templateA.typeMonitor && { typeMonitor: IFT_IFTLData.templateA.typeMonitor }),
                ...(IFT_IFTLData.templateA.driveMotorAmp && { driveMotorAmp: IFT_IFTLData.templateA.driveMotorAmp }),
                ...(IFT_IFTLData.templateA.driveMotorAmpNum && { driveMotorAmpNum: IFT_IFTLData.templateA.driveMotorAmpNum }),
                ...(IFT_IFTLData.templateA.driveTakeUpAir && { driveTakeUpAir: IFT_IFTLData.templateA.driveTakeUpAir }),
                ...(IFT_IFTLData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: IFT_IFTLData.templateA.driveTakeUpAirNum }),
                ...(IFT_IFTLData.templateA.takeUpDistance && { takeUpDistance: IFT_IFTLData.templateA.takeUpDistance }),
                ...(IFT_IFTLData.templateA.takeUpDistanceNum && { takeUpDistanceNum: IFT_IFTLData.templateA.takeUpDistanceNum }),
                ...(IFT_IFTLData.templateA.driveTemp && { driveTemp: IFT_IFTLData.templateA.driveTemp }),
                ...(IFT_IFTLData.templateA.driveTempNum && { driveTempNum: IFT_IFTLData.templateA.driveTempNum }),
                ...(IFT_IFTLData.templateA.driveVibration && { driveVibration: IFT_IFTLData.templateA.driveVibration }),
                ...(IFT_IFTLData.templateA.driveVibrationNum && { driveVibrationNum: IFT_IFTLData.templateA.driveVibrationNum }),
                ...(IFT_IFTLData.templateA.dogPitch && { dogPitch: IFT_IFTLData.templateA.dogPitch }),
                ...(IFT_IFTLData.templateA.dogPitchNum && { dogPitchNum: IFT_IFTLData.templateA.dogPitchNum }),
                ...(IFT_IFTLData.templateA.paintMarker && { paintMarker: IFT_IFTLData.templateA.paintMarker }),
                ...(IFT_IFTLData.templateA.paintMarkerNum && { paintMarkerNum: IFT_IFTLData.templateA.paintMarkerNum }),
                ...(IFT_IFTLData.templateA.chainVision && { chainVision: IFT_IFTLData.templateA.chainVision }),
                ...(IFT_IFTLData.templateA.lubeVision && { lubeVision: IFT_IFTLData.templateA.lubeVision }),
                ...(IFT_IFTLData.templateA.trolleyVision && { trolleyVision: IFT_IFTLData.templateA.trolleyVision }),
                ...(IFT_IFTLData.templateA.trolleyDetect && { trolleyDetect: IFT_IFTLData.templateA.trolleyDetect }),
                ...(IFT_IFTLData.templateA.omniView && { omniView: IFT_IFTLData.templateA.omniView }),
                ...(IFT_IFTLData.templateA.dcuUpgradeNum && { dcuUpgradeNum: IFT_IFTLData.templateA.dcuUpgradeNum }),
                ...(IFT_IFTLData.templateA.piuDistance && { piuDistance: IFT_IFTLData.templateA.piuDistance }),
                ...(IFT_IFTLData.templateA.switchDistance && { switchDistance: IFT_IFTLData.templateA.switchDistance }),
                ...(IFT_IFTLData.templateA.ampPickup && { ampPickup: IFT_IFTLData.templateA.ampPickup }),
                ...(IFT_IFTLData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: IFT_IFTLData.templateA.fromAirTakeUpDistance }),
                ...(IFT_IFTLData.templateA.specialControllerOptions && { specialControllerOptions: IFT_IFTLData.templateA.specialControllerOptions }),
                ...(IFT_IFTLData.templateA.operatingVoltage && { operatingVoltage: IFT_IFTLData.templateA.operatingVoltage })
            },          
            
            wheelOpenType: IFT_IFTLData.wheelOpenType,
            wheelClosedType: IFT_IFTLData.wheelClosedType,
            powerChainStatus: IFT_IFTLData.powerChainStatus,
            chainPinStatus: IFT_IFTLData.chainPinStatus,
            sliderPlateStatus: IFT_IFTLData.sliderPlateStatus,
            freeWheelStatus: IFT_IFTLData.freeWheelStatus,
            guideRollerStatus: IFT_IFTLData.guideRollerStatus,
            openRaceStyle: IFT_IFTLData.openRaceStyle,
            closedRaceStyle: IFT_IFTLData.closedRaceStyle,
            actuatorStatus: IFT_IFTLData.actuatorStatus,
            pivotStatus: IFT_IFTLData.pivotStatus,
            kingPinStatus: IFT_IFTLData.kingPinStatus,
            rollerChainStatus: IFT_IFTLData.rollerChainStatus,
            brushingsStatus: IFT_IFTLData.brushingsStatus,
            riderPlatesStatus: IFT_IFTLData.riderPlatesStatus,
            outboardStatus: IFT_IFTLData.outboardStatus,
            catDriveStatus: IFT_IFTLData.catDriveStatus,
            catDriveNum: IFT_IFTLData.catDriveNum,
            railLubeStatus: IFT_IFTLData.railLubeStatus,
            externalLubeStatus: IFT_IFTLData.externalLubeStatus,
            lubeBrand: IFT_IFTLData.lubeBrand,
            lubeType: IFT_IFTLData.lubeType,
            lubeViscosity: IFT_IFTLData.lubeViscosity,
            sideLubeStatus: IFT_IFTLData.sideLubeStatus,
            topLubeStatus: IFT_IFTLData.topLubeStatus,
            reservoirSize: IFT_IFTLData.reservoirSize,
            ...(IFT_IFTLData.otherReservoirSize && { otherReservoirSize: IFT_IFTLData.otherReservoirSize }),
            reservoirSizeNum: IFT_IFTLData.reservoirSizeNum,
            chainCleanStatus: IFT_IFTLData.chainCleanStatus,
            specialControllerOptions: IFT_IFTLData.specialControllerOptions,
            washdownStatus: IFT_IFTLData.washdownStatus,
            iftUnitType: IFT_IFTLData.iftUnitType,
            iftPowerA: IFT_IFTLData.iftPowerA,
            iftPowerB: IFT_IFTLData.iftPowerB,
            iftPowerG: IFT_IFTLData.iftPowerG,
            iftPowerH: IFT_IFTLData.iftPowerH,
            iftPowerJ: IFT_IFTLData.iftPowerJ,
            iftPowerS1: IFT_IFTLData.iftPowerS1,
            iftPowerT1: IFT_IFTLData.iftPowerT1,
            iftPowerU1: IFT_IFTLData.iftPowerU1,
            iftPowerW1: IFT_IFTLData.iftPowerW1,
            iftPowerX1: IFT_IFTLData.iftPowerX1,
        });

        req.user.cart.push({ 
            numRequested, 
            productConfigurationInfo: order, 
            productType: "IFT_IFTL" 
        });
        await req.user.save();

        return res.status(200).json({ message: "IFT_IFTL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
