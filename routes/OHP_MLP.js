const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_MLP = require("../models/OHP_MLP");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: OHP_MLPData.templateB.existingMonitor,
                newMonitor: OHP_MLPData.templateB.newMonitor,
                ...(OHP_MLPData.templateB.dcuStatus && { dcuStatus: OHP_MLPData.templateB.dcuStatus }),
                ...(OHP_MLPData.templateB.dcuNum && { dcuNum: OHP_MLPData.templateB.dcuNum }),
                ...(OHP_MLPData.templateB.existingWindows && { existingWindows: OHP_MLPData.templateB.existingWindows }),
                ...(OHP_MLPData.templateB.existingHeadUnit && { existingHeadUnit: OHP_MLPData.templateB.existingHeadUnit }),
                ...(OHP_MLPData.templateB.existingDCU && { existingDCU: OHP_MLPData.templateB.existingDCU }),
                ...(OHP_MLPData.templateB.existingPowerInterface && { existingPowerInterface: OHP_MLPData.templateB.existingPowerInterface }),
                ...(OHP_MLPData.templateB.newReservoir && { newReservoir: OHP_MLPData.templateB.newReservoir }),
                ...(OHP_MLPData.templateB.reservoirSize && { reservoirSize: OHP_MLPData.templateB.reservoirSize }),
                ...(OHP_MLPData.templateB.otherReservoirSize && { otherReservoirSize: OHP_MLPData.templateB.otherReservoirSize }),
                ...(OHP_MLPData.templateB.newReservoirNum && { newReservoirNum: OHP_MLPData.templateB.newReservoirNum }),
                ...(OHP_MLPData.templateB.typeMonitor && { typeMonitor: OHP_MLPData.templateB.typeMonitor }),
                ...(OHP_MLPData.templateB.driveMotorAmp && { driveMotorAmp: OHP_MLPData.templateB.driveMotorAmp }),
                ...(OHP_MLPData.templateB.driveMotorAmpNum && { driveMotorAmpNum: OHP_MLPData.templateB.driveMotorAmpNum }),
                ...(OHP_MLPData.templateB.driveTakeUpAir && { driveTakeUpAir: OHP_MLPData.templateB.driveTakeUpAir }),
                ...(OHP_MLPData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_MLPData.templateB.driveTakeUpAirNum }),
                ...(OHP_MLPData.templateB.takeUpDistance && { takeUpDistance: OHP_MLPData.templateB.takeUpDistance }),
                ...(OHP_MLPData.templateB.takeUpDistanceNum && { takeUpDistanceNum: OHP_MLPData.templateB.takeUpDistanceNum }),
                ...(OHP_MLPData.templateB.driveTemp && { driveTemp: OHP_MLPData.templateB.driveTemp }),
                ...(OHP_MLPData.templateB.driveTempNum && { driveTempNum: OHP_MLPData.templateB.driveTempNum }),
                ...(OHP_MLPData.templateB.driveVibration && { driveVibration: OHP_MLPData.templateB.driveVibration }),
                ...(OHP_MLPData.templateB.driveVibrationNum && { driveVibrationNum: OHP_MLPData.templateB.driveVibrationNum }),
                ...(OHP_MLPData.templateB.dogPitch && { dogPitch: OHP_MLPData.templateB.dogPitch }),
                ...(OHP_MLPData.templateB.dogPitchNum && { dogPitchNum: OHP_MLPData.templateB.dogPitchNum }),
                ...(OHP_MLPData.templateB.paintMarker && { paintMarker: OHP_MLPData.templateB.paintMarker }),
                ...(OHP_MLPData.templateB.paintMarkerNum && { paintMarkerNum: OHP_MLPData.templateB.paintMarkerNum }),
                ...(OHP_MLPData.templateB.chainVision && { chainVision: OHP_MLPData.templateB.chainVision }),
                ...(OHP_MLPData.templateB.lubeVision && { lubeVision: OHP_MLPData.templateB.lubeVision }),
                ...(OHP_MLPData.templateB.trolleyVision && { trolleyVision: OHP_MLPData.templateB.trolleyVision }),
                ...(OHP_MLPData.templateB.trolleyDetect && { trolleyDetect: OHP_MLPData.templateB.trolleyDetect }),
                ...(OHP_MLPData.templateB.omniView && { omniView: OHP_MLPData.templateB.omniView }),
                ...(OHP_MLPData.templateB.dcuUpgradeNum && { dcuUpgradeNum: OHP_MLPData.templateB.dcuUpgradeNum }),
                ...(OHP_MLPData.templateB.itNameOne && { itNameOne: OHP_MLPData.templateB.itNameOne }),
                ...(OHP_MLPData.templateB.itIPOne && { itIPOne: OHP_MLPData.templateB.itIPOne }),
                ...(OHP_MLPData.templateB.itGatewayOne && { itGatewayOne: OHP_MLPData.templateB.itGatewayOne }),
                ...(OHP_MLPData.templateB.itSubnetOne && { itSubnetOne: OHP_MLPData.templateB.itSubnetOne }),
                ...(OHP_MLPData.templateB.itDNSOne && { itDNSOne: OHP_MLPData.templateB.itDNSOne }),
                ...(OHP_MLPData.templateB.itSMTPOne && { itSMTPOne: OHP_MLPData.templateB.itSMTPOne }),
                ...(OHP_MLPData.templateB.itNameTwo && { itNameTwo: OHP_MLPData.templateB.itNameTwo }),
                ...(OHP_MLPData.templateB.itIPTwo && { itIPTwo: OHP_MLPData.templateB.itIPTwo }),
                ...(OHP_MLPData.templateB.itGatewayTwo && { itGatewayTwo: OHP_MLPData.templateB.itGatewayTwo }),
                ...(OHP_MLPData.templateB.itSubnetTwo && { itSubnetTwo: OHP_MLPData.templateB.itSubnetTwo }),
                ...(OHP_MLPData.templateB.itDNSTwo && { itDNSTwo: OHP_MLPData.templateB.itDNSTwo }),
                ...(OHP_MLPData.templateB.itSMTPTwo && { itSMTPTwo: OHP_MLPData.templateB.itSMTPTwo }),
                ...(OHP_MLPData.templateB.itNameThree && { itNameThree: OHP_MLPData.templateB.itNameThree }),
                ...(OHP_MLPData.templateB.itIPThree && { itIPThree: OHP_MLPData.templateB.itIPThree }),
                ...(OHP_MLPData.templateB.itGatewayThree && { itGatewayThree: OHP_MLPData.templateB.itGatewayThree }),
                ...(OHP_MLPData.templateB.itSubnetThree && { itSubnetThree: OHP_MLPData.templateB.itSubnetThree }),
                ...(OHP_MLPData.templateB.itDNSThree && { itDNSThree: OHP_MLPData.templateB.itDNSThree }),
                ...(OHP_MLPData.templateB.itSMTPThree && { itSMTPThree: OHP_MLPData.templateB.itSMTPThree }),
                ...(OHP_MLPData.templateB.itAdditionalNotes && { itAdditionalNotes: OHP_MLPData.templateB.itAdditionalNotes }),
                ...(OHP_MLPData.templateB.piuDistance && { piuDistance: OHP_MLPData.templateB.piuDistance }),
                ...(OHP_MLPData.templateB.switchDistance && { switchDistance: OHP_MLPData.templateB.switchDistance }),
                ...(OHP_MLPData.templateB.ampPickup && { ampPickup: OHP_MLPData.templateB.ampPickup }),
                ...(OHP_MLPData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_MLPData.templateB.fromAirTakeUpDistance }),
                ...(OHP_MLPData.templateB.specialControllerOptions && { specialControllerOptions: OHP_MLPData.templateB.specialControllerOptions })
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