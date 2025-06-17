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
            surroundingTemp: OHP_MLPData.surroundingTemp,
            conveyorLoaded: OHP_MLPData.conveyorLoaded,
            conveyorSwing: OHP_MLPData.conveyorSwing,
            operatingVoltSingle: OHP_MLPData.operatingVoltSingle,
            controlVoltSingle: OHP_MLPData.controlVoltSingle,
            monitorData: new templateA({
                existingMonitor: OHP_MLPData.templateA.existingMonitor,
                newMonitor: OHP_MLPData.templateA.newMonitor,
                ...(OHP_MLPData.templateA.dcuStatus && { dcuStatus: OHP_MLPData.templateA.dcuStatus }),
                ...(OHP_MLPData.templateA.dcuNum && { dcuNum: OHP_MLPData.templateA.dcuNum }),
                ...(OHP_MLPData.templateA.existingWindows && { existingWindows: OHP_MLPData.templateA.existingWindows }),
                ...(OHP_MLPData.templateA.existingHeadUnit && { existingHeadUnit: OHP_MLPData.templateA.existingHeadUnit }),
                ...(OHP_MLPData.templateA.existingDCU && { existingDCU: OHP_MLPData.templateA.existingDCU }),
                ...(OHP_MLPData.templateA.existingPowerInterface && { existingPowerInterface: OHP_MLPData.templateA.existingPowerInterface }),
                ...(OHP_MLPData.templateA.newReservoir && { newReservoir: OHP_MLPData.templateA.newReservoir }),
                ...(OHP_MLPData.templateA.reservoirSize && { reservoirSize: OHP_MLPData.templateA.reservoirSize }),
                ...(OHP_MLPData.templateA.otherReservoirSize && { otherReservoirSize: OHP_MLPData.templateA.otherReservoirSize }),
                ...(OHP_MLPData.templateA.newReservoirNum && { newReservoirNum: OHP_MLPData.templateA.newReservoirNum }),
                ...(OHP_MLPData.templateA.typeMonitor && { typeMonitor: OHP_MLPData.templateA.typeMonitor }),
                ...(OHP_MLPData.templateA.driveMotorAmp && { driveMotorAmp: OHP_MLPData.templateA.driveMotorAmp }),
                ...(OHP_MLPData.templateA.driveMotorAmpNum && { driveMotorAmpNum: OHP_MLPData.templateA.driveMotorAmpNum }),
                ...(OHP_MLPData.templateA.driveTakeUpAir && { driveTakeUpAir: OHP_MLPData.templateA.driveTakeUpAir }),
                ...(OHP_MLPData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_MLPData.templateA.driveTakeUpAirNum }),
                ...(OHP_MLPData.templateA.takeUpDistance && { takeUpDistance: OHP_MLPData.templateA.takeUpDistance }),
                ...(OHP_MLPData.templateA.takeUpDistanceNum && { takeUpDistanceNum: OHP_MLPData.templateA.takeUpDistanceNum }),
                ...(OHP_MLPData.templateA.driveTemp && { driveTemp: OHP_MLPData.templateA.driveTemp }),
                ...(OHP_MLPData.templateA.driveTempNum && { driveTempNum: OHP_MLPData.templateA.driveTempNum }),
                ...(OHP_MLPData.templateA.driveVibration && { driveVibration: OHP_MLPData.templateA.driveVibration }),
                ...(OHP_MLPData.templateA.driveVibrationNum && { driveVibrationNum: OHP_MLPData.templateA.driveVibrationNum }),
                ...(OHP_MLPData.templateA.dogPitch && { dogPitch: OHP_MLPData.templateA.dogPitch }),
                ...(OHP_MLPData.templateA.dogPitchNum && { dogPitchNum: OHP_MLPData.templateA.dogPitchNum }),
                ...(OHP_MLPData.templateA.paintMarker && { paintMarker: OHP_MLPData.templateA.paintMarker }),
                ...(OHP_MLPData.templateA.paintMarkerNum && { paintMarkerNum: OHP_MLPData.templateA.paintMarkerNum }),
                ...(OHP_MLPData.templateA.chainVision && { chainVision: OHP_MLPData.templateA.chainVision }),
                ...(OHP_MLPData.templateA.lubeVision && { lubeVision: OHP_MLPData.templateA.lubeVision }),
                ...(OHP_MLPData.templateA.trolleyVision && { trolleyVision: OHP_MLPData.templateA.trolleyVision }),
                ...(OHP_MLPData.templateA.trolleyDetect && { trolleyDetect: OHP_MLPData.templateA.trolleyDetect }),
                ...(OHP_MLPData.templateA.omniView && { omniView: OHP_MLPData.templateA.omniView }),
                ...(OHP_MLPData.templateA.dcuUpgradeNum && { dcuUpgradeNum: OHP_MLPData.templateA.dcuUpgradeNum }),
                ...(OHP_MLPData.templateA.itNameOne && { itNameOne: OHP_MLPData.templateA.itNameOne }),
                ...(OHP_MLPData.templateA.itIPOne && { itIPOne: OHP_MLPData.templateA.itIPOne }),
                ...(OHP_MLPData.templateA.itGatewayOne && { itGatewayOne: OHP_MLPData.templateA.itGatewayOne }),
                ...(OHP_MLPData.templateA.itSubnetOne && { itSubnetOne: OHP_MLPData.templateA.itSubnetOne }),
                ...(OHP_MLPData.templateA.itDNSOne && { itDNSOne: OHP_MLPData.templateA.itDNSOne }),
                ...(OHP_MLPData.templateA.itSMTPOne && { itSMTPOne: OHP_MLPData.templateA.itSMTPOne }),
                ...(OHP_MLPData.templateA.itNameTwo && { itNameTwo: OHP_MLPData.templateA.itNameTwo }),
                ...(OHP_MLPData.templateA.itIPTwo && { itIPTwo: OHP_MLPData.templateA.itIPTwo }),
                ...(OHP_MLPData.templateA.itGatewayTwo && { itGatewayTwo: OHP_MLPData.templateA.itGatewayTwo }),
                ...(OHP_MLPData.templateA.itSubnetTwo && { itSubnetTwo: OHP_MLPData.templateA.itSubnetTwo }),
                ...(OHP_MLPData.templateA.itDNSTwo && { itDNSTwo: OHP_MLPData.templateA.itDNSTwo }),
                ...(OHP_MLPData.templateA.itSMTPTwo && { itSMTPTwo: OHP_MLPData.templateA.itSMTPTwo }),
                ...(OHP_MLPData.templateA.itNameThree && { itNameThree: OHP_MLPData.templateA.itNameThree }),
                ...(OHP_MLPData.templateA.itIPThree && { itIPThree: OHP_MLPData.templateA.itIPThree }),
                ...(OHP_MLPData.templateA.itGatewayThree && { itGatewayThree: OHP_MLPData.templateA.itGatewayThree }),
                ...(OHP_MLPData.templateA.itSubnetThree && { itSubnetThree: OHP_MLPData.templateA.itSubnetThree }),
                ...(OHP_MLPData.templateA.itDNSThree && { itDNSThree: OHP_MLPData.templateA.itDNSThree }),
                ...(OHP_MLPData.templateA.itSMTPThree && { itSMTPThree: OHP_MLPData.templateA.itSMTPThree }),
                ...(OHP_MLPData.templateA.itAdditionalNotes && { itAdditionalNotes: OHP_MLPData.templateA.itAdditionalNotes }),
                ...(OHP_MLPData.templateA.piuDistance && { piuDistance: OHP_MLPData.templateA.piuDistance }),
                ...(OHP_MLPData.templateA.switchDistance && { switchDistance: OHP_MLPData.templateA.switchDistance }),
                ...(OHP_MLPData.templateA.ampPickup && { ampPickup: OHP_MLPData.templateA.ampPickup }),
                ...(OHP_MLPData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_MLPData.templateA.fromAirTakeUpDistance }),
                ...(OHP_MLPData.templateA.specialControllerOptions && { specialControllerOptions: OHP_MLPData.templateA.specialControllerOptions })
            }),
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
            chainCleanStatus: OHP_MLPData.chainCleanStatus,
            ohpUnitType: OHP_MLPData.ohpUnitType,
            chainDrop: OHP_MLPData.chainDrop,
            ohpDiameter: OHP_MLPData.ohpDiameter,
            ohpWidth: OHP_MLPData.ohpWidth,
            ohpHeight: OHP_MLPData.ohpHeight
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