const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_9000I = require("../models/OHP_9000I");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: ETI_OP48EData.templateB.existingMonitor,
                newMonitor: ETI_OP48EData.templateB.newMonitor,
                ...(ETI_OP48EData.templateB.dcuStatus && { dcuStatus: ETI_OP48EData.templateB.dcuStatus }),
                ...(ETI_OP48EData.templateB.dcuNum && { dcuNum: ETI_OP48EData.templateB.dcuNum }),
                ...(ETI_OP48EData.templateB.existingWindows && { existingWindows: ETI_OP48EData.templateB.existingWindows }),
                ...(ETI_OP48EData.templateB.existingHeadUnit && { existingHeadUnit: ETI_OP48EData.templateB.existingHeadUnit }),
                ...(ETI_OP48EData.templateB.existingDCU && { existingDCU: ETI_OP48EData.templateB.existingDCU }),
                ...(ETI_OP48EData.templateB.existingPowerInterface && { existingPowerInterface: ETI_OP48EData.templateB.existingPowerInterface }),
                ...(ETI_OP48EData.templateB.newReservoir && { newReservoir: ETI_OP48EData.templateB.newReservoir }),
                ...(ETI_OP48EData.templateB.reservoirSize && { reservoirSize: ETI_OP48EData.templateB.reservoirSize }),
                ...(ETI_OP48EData.templateB.otherReservoirSize && { otherReservoirSize: ETI_OP48EData.templateB.otherReservoirSize }),
                ...(ETI_OP48EData.templateB.newReservoirNum && { newReservoirNum: ETI_OP48EData.templateB.newReservoirNum }),
                ...(ETI_OP48EData.templateB.typeMonitor && { typeMonitor: ETI_OP48EData.templateB.typeMonitor }),
                ...(ETI_OP48EData.templateB.driveMotorAmp && { driveMotorAmp: ETI_OP48EData.templateB.driveMotorAmp }),
                ...(ETI_OP48EData.templateB.driveMotorAmpNum && { driveMotorAmpNum: ETI_OP48EData.templateB.driveMotorAmpNum }),
                ...(ETI_OP48EData.templateB.driveTakeUpAir && { driveTakeUpAir: ETI_OP48EData.templateB.driveTakeUpAir }),
                ...(ETI_OP48EData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_OP48EData.templateB.driveTakeUpAirNum }),
                ...(ETI_OP48EData.templateB.takeUpDistance && { takeUpDistance: ETI_OP48EData.templateB.takeUpDistance }),
                ...(ETI_OP48EData.templateB.takeUpDistanceNum && { takeUpDistanceNum: ETI_OP48EData.templateB.takeUpDistanceNum }),
                ...(ETI_OP48EData.templateB.driveTemp && { driveTemp: ETI_OP48EData.templateB.driveTemp }),
                ...(ETI_OP48EData.templateB.driveTempNum && { driveTempNum: ETI_OP48EData.templateB.driveTempNum }),
                ...(ETI_OP48EData.templateB.driveVibration && { driveVibration: ETI_OP48EData.templateB.driveVibration }),
                ...(ETI_OP48EData.templateB.driveVibrationNum && { driveVibrationNum: ETI_OP48EData.templateB.driveVibrationNum }),
                ...(ETI_OP48EData.templateB.dogPitch && { dogPitch: ETI_OP48EData.templateB.dogPitch }),
                ...(ETI_OP48EData.templateB.dogPitchNum && { dogPitchNum: ETI_OP48EData.templateB.dogPitchNum }),
                ...(ETI_OP48EData.templateB.paintMarker && { paintMarker: ETI_OP48EData.templateB.paintMarker }),
                ...(ETI_OP48EData.templateB.paintMarkerNum && { paintMarkerNum: ETI_OP48EData.templateB.paintMarkerNum }),
                ...(ETI_OP48EData.templateB.chainVision && { chainVision: ETI_OP48EData.templateB.chainVision }),
                ...(ETI_OP48EData.templateB.lubeVision && { lubeVision: ETI_OP48EData.templateB.lubeVision }),
                ...(ETI_OP48EData.templateB.trolleyVision && { trolleyVision: ETI_OP48EData.templateB.trolleyVision }),
                ...(ETI_OP48EData.templateB.trolleyDetect && { trolleyDetect: ETI_OP48EData.templateB.trolleyDetect }),
                ...(ETI_OP48EData.templateB.omniView && { omniView: ETI_OP48EData.templateB.omniView }),
                ...(ETI_OP48EData.templateB.dcuUpgradeNum && { dcuUpgradeNum: ETI_OP48EData.templateB.dcuUpgradeNum }),
                ...(ETI_OP48EData.templateB.itNameOne && { itNameOne: ETI_OP48EData.templateB.itNameOne }),
                ...(ETI_OP48EData.templateB.itIPOne && { itIPOne: ETI_OP48EData.templateB.itIPOne }),
                ...(ETI_OP48EData.templateB.itGatewayOne && { itGatewayOne: ETI_OP48EData.templateB.itGatewayOne }),
                ...(ETI_OP48EData.templateB.itSubnetOne && { itSubnetOne: ETI_OP48EData.templateB.itSubnetOne }),
                ...(ETI_OP48EData.templateB.itDNSOne && { itDNSOne: ETI_OP48EData.templateB.itDNSOne }),
                ...(ETI_OP48EData.templateB.itSMTPOne && { itSMTPOne: ETI_OP48EData.templateB.itSMTPOne }),
                ...(ETI_OP48EData.templateB.itNameTwo && { itNameTwo: ETI_OP48EData.templateB.itNameTwo }),
                ...(ETI_OP48EData.templateB.itIPTwo && { itIPTwo: ETI_OP48EData.templateB.itIPTwo }),
                ...(ETI_OP48EData.templateB.itGatewayTwo && { itGatewayTwo: ETI_OP48EData.templateB.itGatewayTwo }),
                ...(ETI_OP48EData.templateB.itSubnetTwo && { itSubnetTwo: ETI_OP48EData.templateB.itSubnetTwo }),
                ...(ETI_OP48EData.templateB.itDNSTwo && { itDNSTwo: ETI_OP48EData.templateB.itDNSTwo }),
                ...(ETI_OP48EData.templateB.itSMTPTwo && { itSMTPTwo: ETI_OP48EData.templateB.itSMTPTwo }),
                ...(ETI_OP48EData.templateB.itNameThree && { itNameThree: ETI_OP48EData.templateB.itNameThree }),
                ...(ETI_OP48EData.templateB.itIPThree && { itIPThree: ETI_OP48EData.templateB.itIPThree }),
                ...(ETI_OP48EData.templateB.itGatewayThree && { itGatewayThree: ETI_OP48EData.templateB.itGatewayThree }),
                ...(ETI_OP48EData.templateB.itSubnetThree && { itSubnetThree: ETI_OP48EData.templateB.itSubnetThree }),
                ...(ETI_OP48EData.templateB.itDNSThree && { itDNSThree: ETI_OP48EData.templateB.itDNSThree }),
                ...(ETI_OP48EData.templateB.itSMTPThree && { itSMTPThree: ETI_OP48EData.templateB.itSMTPThree }),
                ...(ETI_OP48EData.templateB.itAdditionalNotes && { itAdditionalNotes: ETI_OP48EData.templateB.itAdditionalNotes }),
                ...(ETI_OP48EData.templateB.piuDistance && { piuDistance: ETI_OP48EData.templateB.piuDistance }),
                ...(ETI_OP48EData.templateB.switchDistance && { switchDistance: ETI_OP48EData.templateB.switchDistance }),
                ...(ETI_OP48EData.templateB.ampPickup && { ampPickup: ETI_OP48EData.templateB.ampPickup }),
                ...(ETI_OP48EData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_OP48EData.templateB.fromAirTakeUpDistance }),
                ...(ETI_OP48EData.templateB.specialControllerOptions && { specialControllerOptions: ETI_OP48EData.templateB.specialControllerOptions })
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