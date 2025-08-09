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
            existingMonitor: IFT_IFTLData.existingMonitor,
            newMonitor: IFT_IFTLData.newMonitor,
            monitorData: {
                ...(IFT_IFTLData.dcuStatus && { dcuStatus: IFT_IFTLData.dcuStatus }),
                ...(IFT_IFTLData.dcuNum && { dcuNum: IFT_IFTLData.dcuNum }),
                ...(IFT_IFTLData.existingWindows && { existingWindows: IFT_IFTLData.existingWindows }),
                ...(IFT_IFTLData.existingHeadUnit && { existingHeadUnit: IFT_IFTLData.existingHeadUnit }),
                ...(IFT_IFTLData.existingDCU && { existingDCU: IFT_IFTLData.existingDCU }),
                ...(IFT_IFTLData.existingPowerInterface && { existingPowerInterface: IFT_IFTLData.existingPowerInterface }),
                ...(IFT_IFTLData.newReservoir && { newReservoir: IFT_IFTLData.newReservoir }),
                ...(IFT_IFTLData.reservoirSize && { reservoirSize: IFT_IFTLData.reservoirSize }),
                ...(IFT_IFTLData.otherReservoirSize && { otherReservoirSize: IFT_IFTLData.otherReservoirSize }),
                ...(IFT_IFTLData.newReservoirNum && { newReservoirNum: IFT_IFTLData.newReservoirNum }),
                ...(IFT_IFTLData.typeMonitor && { typeMonitor: IFT_IFTLData.typeMonitor }),
                ...(IFT_IFTLData.driveMotorAmp && { driveMotorAmp: IFT_IFTLData.driveMotorAmp }),
                ...(IFT_IFTLData.driveMotorAmpNum && { driveMotorAmpNum: IFT_IFTLData.driveMotorAmpNum }),
                ...(IFT_IFTLData.driveTakeUpAir && { driveTakeUpAir: IFT_IFTLData.driveTakeUpAir }),
                ...(IFT_IFTLData.driveTakeUpAirNum && { driveTakeUpAirNum: IFT_IFTLData.driveTakeUpAirNum }),
                ...(IFT_IFTLData.takeUpDistance && { takeUpDistance: IFT_IFTLData.takeUpDistance }),
                ...(IFT_IFTLData.takeUpDistanceNum && { takeUpDistanceNum: IFT_IFTLData.takeUpDistanceNum }),
                ...(IFT_IFTLData.driveTemp && { driveTemp: IFT_IFTLData.driveTemp }),
                ...(IFT_IFTLData.driveTempNum && { driveTempNum: IFT_IFTLData.driveTempNum }),
                ...(IFT_IFTLData.driveVibration && { driveVibration: IFT_IFTLData.driveVibration }),
                ...(IFT_IFTLData.driveVibrationNum && { driveVibrationNum: IFT_IFTLData.driveVibrationNum }),
                ...(IFT_IFTLData.dogPitch && { dogPitch: IFT_IFTLData.dogPitch }),
                ...(IFT_IFTLData.dogPitchNum && { dogPitchNum: IFT_IFTLData.dogPitchNum }),
                ...(IFT_IFTLData.paintMarker && { paintMarker: IFT_IFTLData.paintMarker }),
                ...(IFT_IFTLData.paintMarkerNum && { paintMarkerNum: IFT_IFTLData.paintMarkerNum }),
                ...(IFT_IFTLData.chainVision && { chainVision: IFT_IFTLData.chainVision }),
                ...(IFT_IFTLData.lubeVision && { lubeVision: IFT_IFTLData.lubeVision }),
                ...(IFT_IFTLData.trolleyVision && { trolleyVision: IFT_IFTLData.trolleyVision }),
                ...(IFT_IFTLData.trolleyDetect && { trolleyDetect: IFT_IFTLData.trolleyDetect }),
                ...(IFT_IFTLData.omniView && { omniView: IFT_IFTLData.omniView }),
                ...(IFT_IFTLData.dcuUpgradeNum && { dcuUpgradeNum: IFT_IFTLData.dcuUpgradeNum }),
                ...(IFT_IFTLData.itNameOne && { itNameOne: IFT_IFTLData.itNameOne }),
                ...(IFT_IFTLData.itIPOne && { itIPOne: IFT_IFTLData.itIPOne }),
                ...(IFT_IFTLData.itGatewayOne && { itGatewayOne: IFT_IFTLData.itGatewayOne }),
                ...(IFT_IFTLData.itSubnetOne && { itSubnetOne: IFT_IFTLData.itSubnetOne }),
                ...(IFT_IFTLData.itDNSOne && { itDNSOne: IFT_IFTLData.itDNSOne }),
                ...(IFT_IFTLData.itSMTPOne && { itSMTPOne: IFT_IFTLData.itSMTPOne }),
                ...(IFT_IFTLData.itNameTwo && { itNameTwo: IFT_IFTLData.itNameTwo }),
                ...(IFT_IFTLData.itIPTwo && { itIPTwo: IFT_IFTLData.itIPTwo }),
                ...(IFT_IFTLData.itGatewayTwo && { itGatewayTwo: IFT_IFTLData.itGatewayTwo }),
                ...(IFT_IFTLData.itSubnetTwo && { itSubnetTwo: IFT_IFTLData.itSubnetTwo }),
                ...(IFT_IFTLData.itDNSTwo && { itDNSTwo: IFT_IFTLData.itDNSTwo }),
                ...(IFT_IFTLData.itSMTPTwo && { itSMTPTwo: IFT_IFTLData.itSMTPTwo }),
                ...(IFT_IFTLData.itNameThree && { itNameThree: IFT_IFTLData.itNameThree }),
                ...(IFT_IFTLData.itIPThree && { itIPThree: IFT_IFTLData.itIPThree }),
                ...(IFT_IFTLData.itGatewayThree && { itGatewayThree: IFT_IFTLData.itGatewayThree }),
                ...(IFT_IFTLData.itSubnetThree && { itSubnetThree: IFT_IFTLData.itSubnetThree }),
                ...(IFT_IFTLData.itDNSThree && { itDNSThree: IFT_IFTLData.itDNSThree }),
                ...(IFT_IFTLData.itSMTPThree && { itSMTPThree: IFT_IFTLData.itSMTPThree }),
                ...(IFT_IFTLData.itAdditionalNotes && { itAdditionalNotes: IFT_IFTLData.itAdditionalNotes }),
                ...(IFT_IFTLData.piuDistance && { piuDistance: IFT_IFTLData.piuDistance }),
                ...(IFT_IFTLData.switchDistance && { switchDistance: IFT_IFTLData.switchDistance }),
                ...(IFT_IFTLData.ampPickup && { ampPickup: IFT_IFTLData.ampPickup }),
                ...(IFT_IFTLData.fromAirTakeUpDistance && { fromAirTakeUpDistance: IFT_IFTLData.fromAirTakeUpDistance }),
                ...(IFT_IFTLData.specialControllerOptions && { specialControllerOptions: IFT_IFTLData.specialControllerOptions }),
                ...(IFT_IFTLData.operatingVoltage && { operatingVoltage: IFT_IFTLData.operatingVoltage })

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
