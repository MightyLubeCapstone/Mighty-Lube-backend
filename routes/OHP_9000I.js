const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_9000I = require("../models/OHP_9000I");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_9000IData, numRequested } = req.body;
        const order = new OHP_9000I({
            conveyorName: OHP_9000IData.conveyorName,
            chainSize: OHP_9000IData.chainSize,
            ...(OHP_9000IData.otherChainSize && { otherChainSize: OHP_9000IData.otherChainSize }),
            industrialChainManufacturer: OHP_9000IData.industrialChainManufacturer,
            ...(OHP_9000IData.otherChainManufacturer && { otherChainManufacturer: OHP_9000IData.otherChainManufacturer }),
            conveyorLength: OHP_9000IData.conveyorLength,
            conveyorLengthUnit: OHP_9000IData.conveyorLengthUnit,
            conveyorSpeed: OHP_9000IData.conveyorSpeed,
            conveyorSpeedUnit: OHP_9000IData.conveyorSpeedUnit,
            conveyorIndex: OHP_9000IData.conveyorIndex,
            travelDirection: OHP_9000IData.travelDirection,
            appEnviroment: OHP_9000IData.appEnviroment,
            ...(OHP_9000IData.ovenStatus && { ovenStatus: OHP_9000IData.ovenStatus }),
            ...(OHP_9000IData.ovenTemp && { ovenTemp: OHP_9000IData.ovenTemp }),
            surroundingTemp: OHP_9000IData.surroundingTemp,
            conveyorLoaded: OHP_9000IData.conveyorLoaded,
            conveyorSwing: OHP_9000IData.conveyorSwing,
            operatingVoltSingle: OHP_9000IData.operatingVoltSingle,
            controlVoltSingle: OHP_9000IData.controlVoltSingle,
            monitorData: new templateA({
                existingMonitor: ETI_OP48EData.templateA.existingMonitor,
                newMonitor: ETI_OP48EData.templateA.newMonitor,
                ...(ETI_OP48EData.templateA.dcuStatus && { dcuStatus: ETI_OP48EData.templateA.dcuStatus }),
                ...(ETI_OP48EData.templateA.dcuNum && { dcuNum: ETI_OP48EData.templateA.dcuNum }),
                ...(ETI_OP48EData.templateA.existingWindows && { existingWindows: ETI_OP48EData.templateA.existingWindows }),
                ...(ETI_OP48EData.templateA.existingHeadUnit && { existingHeadUnit: ETI_OP48EData.templateA.existingHeadUnit }),
                ...(ETI_OP48EData.templateA.existingDCU && { existingDCU: ETI_OP48EData.templateA.existingDCU }),
                ...(ETI_OP48EData.templateA.existingPowerInterface && { existingPowerInterface: ETI_OP48EData.templateA.existingPowerInterface }),
                ...(ETI_OP48EData.templateA.newReservoir && { newReservoir: ETI_OP48EData.templateA.newReservoir }),
                ...(ETI_OP48EData.templateA.reservoirSize && { reservoirSize: ETI_OP48EData.templateA.reservoirSize }),
                ...(ETI_OP48EData.templateA.otherReservoirSize && { otherReservoirSize: ETI_OP48EData.templateA.otherReservoirSize }),
                ...(ETI_OP48EData.templateA.newReservoirNum && { newReservoirNum: ETI_OP48EData.templateA.newReservoirNum }),
                ...(ETI_OP48EData.templateA.typeMonitor && { typeMonitor: ETI_OP48EData.templateA.typeMonitor }),
                ...(ETI_OP48EData.templateA.driveMotorAmp && { driveMotorAmp: ETI_OP48EData.templateA.driveMotorAmp }),
                ...(ETI_OP48EData.templateA.driveMotorAmpNum && { driveMotorAmpNum: ETI_OP48EData.templateA.driveMotorAmpNum }),
                ...(ETI_OP48EData.templateA.driveTakeUpAir && { driveTakeUpAir: ETI_OP48EData.templateA.driveTakeUpAir }),
                ...(ETI_OP48EData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_OP48EData.templateA.driveTakeUpAirNum }),
                ...(ETI_OP48EData.templateA.takeUpDistance && { takeUpDistance: ETI_OP48EData.templateA.takeUpDistance }),
                ...(ETI_OP48EData.templateA.takeUpDistanceNum && { takeUpDistanceNum: ETI_OP48EData.templateA.takeUpDistanceNum }),
                ...(ETI_OP48EData.templateA.driveTemp && { driveTemp: ETI_OP48EData.templateA.driveTemp }),
                ...(ETI_OP48EData.templateA.driveTempNum && { driveTempNum: ETI_OP48EData.templateA.driveTempNum }),
                ...(ETI_OP48EData.templateA.driveVibration && { driveVibration: ETI_OP48EData.templateA.driveVibration }),
                ...(ETI_OP48EData.templateA.driveVibrationNum && { driveVibrationNum: ETI_OP48EData.templateA.driveVibrationNum }),
                ...(ETI_OP48EData.templateA.dogPitch && { dogPitch: ETI_OP48EData.templateA.dogPitch }),
                ...(ETI_OP48EData.templateA.dogPitchNum && { dogPitchNum: ETI_OP48EData.templateA.dogPitchNum }),
                ...(ETI_OP48EData.templateA.paintMarker && { paintMarker: ETI_OP48EData.templateA.paintMarker }),
                ...(ETI_OP48EData.templateA.paintMarkerNum && { paintMarkerNum: ETI_OP48EData.templateA.paintMarkerNum }),
                ...(ETI_OP48EData.templateA.chainVision && { chainVision: ETI_OP48EData.templateA.chainVision }),
                ...(ETI_OP48EData.templateA.lubeVision && { lubeVision: ETI_OP48EData.templateA.lubeVision }),
                ...(ETI_OP48EData.templateA.trolleyVision && { trolleyVision: ETI_OP48EData.templateA.trolleyVision }),
                ...(ETI_OP48EData.templateA.trolleyDetect && { trolleyDetect: ETI_OP48EData.templateA.trolleyDetect }),
                ...(ETI_OP48EData.templateA.omniView && { omniView: ETI_OP48EData.templateA.omniView }),
                ...(ETI_OP48EData.templateA.dcuUpgradeNum && { dcuUpgradeNum: ETI_OP48EData.templateA.dcuUpgradeNum }),
                ...(ETI_OP48EData.templateA.itNameOne && { itNameOne: ETI_OP48EData.templateA.itNameOne }),
                ...(ETI_OP48EData.templateA.itIPOne && { itIPOne: ETI_OP48EData.templateA.itIPOne }),
                ...(ETI_OP48EData.templateA.itGatewayOne && { itGatewayOne: ETI_OP48EData.templateA.itGatewayOne }),
                ...(ETI_OP48EData.templateA.itSubnetOne && { itSubnetOne: ETI_OP48EData.templateA.itSubnetOne }),
                ...(ETI_OP48EData.templateA.itDNSOne && { itDNSOne: ETI_OP48EData.templateA.itDNSOne }),
                ...(ETI_OP48EData.templateA.itSMTPOne && { itSMTPOne: ETI_OP48EData.templateA.itSMTPOne }),
                ...(ETI_OP48EData.templateA.itNameTwo && { itNameTwo: ETI_OP48EData.templateA.itNameTwo }),
                ...(ETI_OP48EData.templateA.itIPTwo && { itIPTwo: ETI_OP48EData.templateA.itIPTwo }),
                ...(ETI_OP48EData.templateA.itGatewayTwo && { itGatewayTwo: ETI_OP48EData.templateA.itGatewayTwo }),
                ...(ETI_OP48EData.templateA.itSubnetTwo && { itSubnetTwo: ETI_OP48EData.templateA.itSubnetTwo }),
                ...(ETI_OP48EData.templateA.itDNSTwo && { itDNSTwo: ETI_OP48EData.templateA.itDNSTwo }),
                ...(ETI_OP48EData.templateA.itSMTPTwo && { itSMTPTwo: ETI_OP48EData.templateA.itSMTPTwo }),
                ...(ETI_OP48EData.templateA.itNameThree && { itNameThree: ETI_OP48EData.templateA.itNameThree }),
                ...(ETI_OP48EData.templateA.itIPThree && { itIPThree: ETI_OP48EData.templateA.itIPThree }),
                ...(ETI_OP48EData.templateA.itGatewayThree && { itGatewayThree: ETI_OP48EData.templateA.itGatewayThree }),
                ...(ETI_OP48EData.templateA.itSubnetThree && { itSubnetThree: ETI_OP48EData.templateA.itSubnetThree }),
                ...(ETI_OP48EData.templateA.itDNSThree && { itDNSThree: ETI_OP48EData.templateA.itDNSThree }),
                ...(ETI_OP48EData.templateA.itSMTPThree && { itSMTPThree: ETI_OP48EData.templateA.itSMTPThree }),
                ...(ETI_OP48EData.templateA.itAdditionalNotes && { itAdditionalNotes: ETI_OP48EData.templateA.itAdditionalNotes }),
                ...(ETI_OP48EData.templateA.piuDistance && { piuDistance: ETI_OP48EData.templateA.piuDistance }),
                ...(ETI_OP48EData.templateA.switchDistance && { switchDistance: ETI_OP48EData.templateA.switchDistance }),
                ...(ETI_OP48EData.templateA.ampPickup && { ampPickup: ETI_OP48EData.templateA.ampPickup }),
                ...(ETI_OP48EData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_OP48EData.templateA.fromAirTakeUpDistance }),
                ...(ETI_OP48EData.templateA.specialControllerOptions && { specialControllerOptions: ETI_OP48EData.templateA.specialControllerOptions })
            }),
            wheelOpenType: OHP_9000IData.wheelOpenType,
            wheelClosedType: OHP_9000IData.wheelClosedType,
            powerChainStatus: OHP_9000IData.powerChainStatus,
            chainPinStatus: OHP_9000IData.chainPinStatus,
            catDriveStatus: OHP_9000IData.catDriveStatus,
            catDriveNum: OHP_9000IData.catDriveNum,
            railLubeStatus: OHP_9000IData.railLubeStatus,
            externalLubeStatus: OHP_9000IData.externalLubeStatus,
            lubeBrand: OHP_9000IData.lubeBrand,
            lubeType: OHP_9000IData.lubeType,
            lubeViscosity: OHP_9000IData.lubeViscosity,
            sideLubeStatus: OHP_9000IData.sideLubeStatus,
            topLubeStatus: OHP_9000IData.topLubeStatus,
            chainCleanStatus: OHP_9000IData.chainCleanStatus,
            wireMeasurementUnit: OHP_9000IData.wireMeasurementUnit,
            twoConductor: OHP_9000IData.twoConductor,
            fourConductor: OHP_9000IData.fourConductor,
            sevenConductor: OHP_9000IData.sevenConductor,
            twelveConductor: OHP_9000IData.twelveConductor,
            junctionBoxNum: OHP_9000IData.junctionBoxNum,
            ohpUnitType: OHP_9000IData.ohpUnitType,
            ohpDiameter: OHP_9000IData.ohpDiameter,
            ohpWidth: OHP_9000IData.ohpWidth,
            ohpHeight: OHP_9000IData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_9000I"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_9000I entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;