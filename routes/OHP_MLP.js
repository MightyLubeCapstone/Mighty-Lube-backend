const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_MLP = require("../models/OHP_MLP");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_MLPData, numRequested } = req.body;
        const order = new OHP_MLP({
            conveyorName: OHP_MLPData.conveyorName,
            chainSize: OHP_MLPData.chainSize,
            ...(OHP_MLPData.otherChainSize && { otherChainSize: OHP_MLPData.otherChainSize }),
            industrialChainManufacturer: OHP_MLPData.industrialChainManufacturer,
            ...(OHP_MLPData.otherChainManufacturer && { otherChainManufacturer: OHP_MLPData.otherChainManufacturer }),
            conveyorLength: OHP_MLPData.conveyorLength,
            conveyorLengthUnit: OHP_MLPData.conveyorLengthUnit,
            conveyorSpeed: OHP_MLPData.conveyorSpeed,
            conveyorSpeedUnit: OHP_MLPData.conveyorSpeedUnit,
            conveyorIndex: OHP_MLPData.conveyorIndex,
            travelDirection: OHP_MLPData.travelDirection,
            appEnviroment: OHP_MLPData.appEnviroment,
            ...(OHP_MLPData.ovenStatus && { ovenStatus: OHP_MLPData.ovenStatus }),
            ...(OHP_MLPData.ovenTemp && { ovenTemp: OHP_MLPData.ovenTemp }),
            ...(OHP_MLPData.otherAppEnviroment && { otherAppEnviroment: OHP_MLPData.otherAppEnviroment }),
            surroundingTemp: OHP_MLPData.surroundingTemp,
            conveyorLoaded: OHP_MLPData.conveyorLoaded,
            conveyorSwing: OHP_MLPData.conveyorSwing,
            orientationType: OHP_MLPData.orientationType,
            operatingVoltSingle: OHP_MLPData.operatingVoltSingle,
            controlVoltSingle: OHP_MLPData.controlVoltSingle,
            existingMonitor: OHP_MLPData.existingMonitor,
            newMonitor: OHP_MLPData.newMonitor,
            monitorData: {
                ...(OHP_MLPData.dcuStatus && { dcuStatus: OHP_MLPData.dcuStatus }),
                ...(OHP_MLPData.dcuNum && { dcuNum: OHP_MLPData.dcuNum }),
                ...(OHP_MLPData.existingWindows && { existingWindows: OHP_MLPData.existingWindows }),
                ...(OHP_MLPData.existingHeadUnit && { existingHeadUnit: OHP_MLPData.existingHeadUnit }),
                ...(OHP_MLPData.existingDCU && { existingDCU: OHP_MLPData.existingDCU }),
                ...(OHP_MLPData.existingPowerInterface && { existingPowerInterface: OHP_MLPData.existingPowerInterface }),
                ...(OHP_MLPData.newReservoir && { newReservoir: OHP_MLPData.newReservoir }),
                ...(OHP_MLPData.reservoirSize && { reservoirSize: OHP_MLPData.reservoirSize }),
                ...(OHP_MLPData.otherReservoirSize && { otherReservoirSize: OHP_MLPData.otherReservoirSize }),
                ...(OHP_MLPData.newReservoirNum && { newReservoirNum: OHP_MLPData.newReservoirNum }),
                ...(OHP_MLPData.typeMonitor && { typeMonitor: OHP_MLPData.typeMonitor }),
                ...(OHP_MLPData.driveMotorAmp && { driveMotorAmp: OHP_MLPData.driveMotorAmp }),
                ...(OHP_MLPData.driveMotorAmpNum && { driveMotorAmpNum: OHP_MLPData.driveMotorAmpNum }),
                ...(OHP_MLPData.driveTakeUpAir && { driveTakeUpAir: OHP_MLPData.driveTakeUpAir }),
                ...(OHP_MLPData.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_MLPData.driveTakeUpAirNum }),
                ...(OHP_MLPData.takeUpDistance && { takeUpDistance: OHP_MLPData.takeUpDistance }),
                ...(OHP_MLPData.takeUpDistanceNum && { takeUpDistanceNum: OHP_MLPData.takeUpDistanceNum }),
                ...(OHP_MLPData.driveTemp && { driveTemp: OHP_MLPData.driveTemp }),
                ...(OHP_MLPData.driveTempNum && { driveTempNum: OHP_MLPData.driveTempNum }),
                ...(OHP_MLPData.driveVibration && { driveVibration: OHP_MLPData.driveVibration }),
                ...(OHP_MLPData.driveVibrationNum && { driveVibrationNum: OHP_MLPData.driveVibrationNum }),
                ...(OHP_MLPData.dogPitch && { dogPitch: OHP_MLPData.dogPitch }),
                ...(OHP_MLPData.dogPitchNum && { dogPitchNum: OHP_MLPData.dogPitchNum }),
                ...(OHP_MLPData.paintMarker && { paintMarker: OHP_MLPData.paintMarker }),
                ...(OHP_MLPData.paintMarkerNum && { paintMarkerNum: OHP_MLPData.paintMarkerNum }),
                ...(OHP_MLPData.chainVision && { chainVision: OHP_MLPData.chainVision }),
                ...(OHP_MLPData.lubeVision && { lubeVision: OHP_MLPData.lubeVision }),
                ...(OHP_MLPData.trolleyVision && { trolleyVision: OHP_MLPData.trolleyVision }),
                ...(OHP_MLPData.trolleyDetect && { trolleyDetect: OHP_MLPData.trolleyDetect }),
                ...(OHP_MLPData.omniView && { omniView: OHP_MLPData.omniView }),
                ...(OHP_MLPData.dcuUpgradeNum && { dcuUpgradeNum: OHP_MLPData.dcuUpgradeNum }),
                ...(OHP_MLPData.itNameOne && { itNameOne: OHP_MLPData.itNameOne }),
                ...(OHP_MLPData.itIPOne && { itIPOne: OHP_MLPData.itIPOne }),
                ...(OHP_MLPData.itGatewayOne && { itGatewayOne: OHP_MLPData.itGatewayOne }),
                ...(OHP_MLPData.itSubnetOne && { itSubnetOne: OHP_MLPData.itSubnetOne }),
                ...(OHP_MLPData.itDNSOne && { itDNSOne: OHP_MLPData.itDNSOne }),
                ...(OHP_MLPData.itSMTPOne && { itSMTPOne: OHP_MLPData.itSMTPOne }),
                ...(OHP_MLPData.itNameTwo && { itNameTwo: OHP_MLPData.itNameTwo }),
                ...(OHP_MLPData.itIPTwo && { itIPTwo: OHP_MLPData.itIPTwo }),
                ...(OHP_MLPData.itGatewayTwo && { itGatewayTwo: OHP_MLPData.itGatewayTwo }),
                ...(OHP_MLPData.itSubnetTwo && { itSubnetTwo: OHP_MLPData.itSubnetTwo }),
                ...(OHP_MLPData.itDNSTwo && { itDNSTwo: OHP_MLPData.itDNSTwo }),
                ...(OHP_MLPData.itSMTPTwo && { itSMTPTwo: OHP_MLPData.itSMTPTwo }),
                ...(OHP_MLPData.itNameThree && { itNameThree: OHP_MLPData.itNameThree }),
                ...(OHP_MLPData.itIPThree && { itIPThree: OHP_MLPData.itIPThree }),
                ...(OHP_MLPData.itGatewayThree && { itGatewayThree: OHP_MLPData.itGatewayThree }),
                ...(OHP_MLPData.itSubnetThree && { itSubnetThree: OHP_MLPData.itSubnetThree }),
                ...(OHP_MLPData.itDNSThree && { itDNSThree: OHP_MLPData.itDNSThree }),
                ...(OHP_MLPData.itSMTPThree && { itSMTPThree: OHP_MLPData.itSMTPThree }),
                ...(OHP_MLPData.itAdditionalNotes && { itAdditionalNotes: OHP_MLPData.itAdditionalNotes }),
                ...(OHP_MLPData.piuDistance && { piuDistance: OHP_MLPData.piuDistance }),
                ...(OHP_MLPData.switchDistance && { switchDistance: OHP_MLPData.switchDistance }),
                ...(OHP_MLPData.ampPickup && { ampPickup: OHP_MLPData.ampPickup }),
                ...(OHP_MLPData.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_MLPData.fromAirTakeUpDistance }),
                ...(OHP_MLPData.specialControllerOptions && { specialControllerOptions: OHP_MLPData.specialControllerOptions }),
                ...(OHP_MLPData.operatingVoltage && { operatingVoltage: OHP_MLPData.operatingVoltage })

            },
            wheelOpenType: OHP_MLPData.wheelOpenType,
            wheelClosedType: OHP_MLPData.wheelClosedType,
            powerChainStatus: OHP_MLPData.powerChainStatus,
            chainPinStatus: OHP_MLPData.chainPinStatus,
            catDriveStatus: OHP_MLPData.catDriveStatus,
            catDriveNum: OHP_MLPData.catDriveNum,
            railLubeStatus: OHP_MLPData.railLubeStatus,
            externalLubeStatus: OHP_MLPData.externalLubeStatus,
            lubeBrand: OHP_MLPData.lubeBrand,
            lubeType: OHP_MLPData.lubeType,
            lubeViscosity: OHP_MLPData.lubeViscosity,
            sideLubeStatus: OHP_MLPData.sideLubeStatus,
            topLubeStatus: OHP_MLPData.topLubeStatus,
            reservoirSize: OHP_MLPData.reservoirSize,
            ...(OHP_MLPData.otherReservoirSize && { otherReservoirSize: OHP_MLPData.otherReservoirSize }),
            reservoirSizeNum: OHP_MLPData.reservoirSizeNum,
            chainCleanStatus: OHP_MLPData.chainCleanStatus,
            specialControllerOptions: OHP_MLPData.specialControllerOptions,
            ohpUnitType: OHP_MLPData.ohpUnitType,
            ohpVertical: OHP_MLPData.ohpVertical,
            ohpWidth: OHP_MLPData.ohpWidth,
            ohpHeight: OHP_MLPData.ohpHeight,
            ohpDiameter: OHP_MLPData.ohpDiameter,
            ohpWidthInverted: OHP_MLPData.ohpWidthInverted,
            distanceFromReservouir: OHP_MLPData.distanceFromReservouir,
            overSprayBrushStatus: OHP_MLPData.overSprayBrushStatus,

        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_MLP"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_MLP entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;