const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_9000E = require("../models/ETO_9000E");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETO_9000EData, numRequested } = req.body;
        const order = new ETO_9000E({
            ...(ETO_9000EData.chainSize && { chainSize: ETO_9000EData.chainSize }),
            industrialChainManufacturer: ETO_9000EData.industrialChainManufacturer,
            ...(ETO_9000EData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETO_9000EData.otherIndustrialChainManufacturer }),
            ...(ETO_9000EData.conveyorLength && { conveyorLength: ETO_9000EData.conveyorLength }),
            ...(ETO_9000EData.conveyorLengthUnit && { conveyorLengthUnit: ETO_9000EData.conveyorLengthUnit }),
            ...(ETO_9000EData.conveyorSpeed && { conveyorSpeed: ETO_9000EData.conveyorSpeed }),
            ...(ETO_9000EData.conveyorSpeedUnit && { conveyorSpeedUnit: ETO_9000EData.conveyorSpeedUnit }),
            ...(ETO_9000EData.conveyorIndex && { conveyorIndex: ETO_9000EData.conveyorIndex }),
            ...(ETO_9000EData.travelDirection && { travelDirection: ETO_9000EData.travelDirection }),
            appEnviroment: ETO_9000EData.appEnviroment,
            ...(ETO_9000EData.ovenStatus && { ovenStatus: ETO_9000EData.ovenStatus }),
            ...(ETO_9000EData.ovenTemp && { ovenTemp: ETO_9000EData.ovenTemp }),
            ...(ETO_9000EData.surroundingTemp && { surroundingTemp: ETO_9000EData.surroundingTemp }),
            ...(ETO_9000EData.conveyorLoaded && { conveyorLoaded: ETO_9000EData.conveyorLoaded }),
            ...(ETO_9000EData.conveyorSwing && { conveyorSwing: ETO_9000EData.conveyorSwing }),
            ...(ETO_9000EData.operatingVoltage && { operatingVoltage: ETO_9000EData.operatingVoltage }),
            monitorData: new templateA({
                existingMonitor: ETO_9000EData.templateA.existingMonitor,
                newMonitor: ETO_9000EData.templateA.newMonitor,
                ...(ETO_9000EData.templateA.dcuStatus && { dcuStatus: ETO_9000EData.templateA.dcuStatus }),
                ...(ETO_9000EData.templateA.dcuNum && { dcuNum: ETO_9000EData.templateA.dcuNum }),
                ...(ETO_9000EData.templateA.existingWindows && { existingWindows: ETO_9000EData.templateA.existingWindows }),
                ...(ETO_9000EData.templateA.existingHeadUnit && { existingHeadUnit: ETO_9000EData.templateA.existingHeadUnit }),
                ...(ETO_9000EData.templateA.existingDCU && { existingDCU: ETO_9000EData.templateA.existingDCU }),
                ...(ETO_9000EData.templateA.existingPowerInterface && { existingPowerInterface: ETO_9000EData.templateA.existingPowerInterface }),
                ...(ETO_9000EData.templateA.newReservoir && { newReservoir: ETO_9000EData.templateA.newReservoir }),
                ...(ETO_9000EData.templateA.reservoirSize && { reservoirSize: ETO_9000EData.templateA.reservoirSize }),
                ...(ETO_9000EData.templateA.otherReservoirSize && { otherReservoirSize: ETO_9000EData.templateA.otherReservoirSize }),
                ...(ETO_9000EData.templateA.newReservoirNum && { newReservoirNum: ETO_9000EData.templateA.newReservoirNum }),
                ...(ETO_9000EData.templateA.typeMonitor && { typeMonitor: ETO_9000EData.templateA.typeMonitor }),
                ...(ETO_9000EData.templateA.driveMotorAmp && { driveMotorAmp: ETO_9000EData.templateA.driveMotorAmp }),
                ...(ETO_9000EData.templateA.driveMotorAmpNum && { driveMotorAmpNum: ETO_9000EData.templateA.driveMotorAmpNum }),
                ...(ETO_9000EData.templateA.driveTakeUpAir && { driveTakeUpAir: ETO_9000EData.templateA.driveTakeUpAir }),
                ...(ETO_9000EData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: ETO_9000EData.templateA.driveTakeUpAirNum }),
                ...(ETO_9000EData.templateA.takeUpDistance && { takeUpDistance: ETO_9000EData.templateA.takeUpDistance }),
                ...(ETO_9000EData.templateA.takeUpDistanceNum && { takeUpDistanceNum: ETO_9000EData.templateA.takeUpDistanceNum }),
                ...(ETO_9000EData.templateA.driveTemp && { driveTemp: ETO_9000EData.templateA.driveTemp }),
                ...(ETO_9000EData.templateA.driveTempNum && { driveTempNum: ETO_9000EData.templateA.driveTempNum }),
                ...(ETO_9000EData.templateA.driveVibration && { driveVibration: ETO_9000EData.templateA.driveVibration }),
                ...(ETO_9000EData.templateA.driveVibrationNum && { driveVibrationNum: ETO_9000EData.templateA.driveVibrationNum }),
                ...(ETO_9000EData.templateA.dogPitch && { dogPitch: ETO_9000EData.templateA.dogPitch }),
                ...(ETO_9000EData.templateA.dogPitchNum && { dogPitchNum: ETO_9000EData.templateA.dogPitchNum }),
                ...(ETO_9000EData.templateA.paintMarker && { paintMarker: ETO_9000EData.templateA.paintMarker }),
                ...(ETO_9000EData.templateA.paintMarkerNum && { paintMarkerNum: ETO_9000EData.templateA.paintMarkerNum }),
                ...(ETO_9000EData.templateA.chainVision && { chainVision: ETO_9000EData.templateA.chainVision }),
                ...(ETO_9000EData.templateA.lubeVision && { lubeVision: ETO_9000EData.templateA.lubeVision }),
                ...(ETO_9000EData.templateA.trolleyVision && { trolleyVision: ETO_9000EData.templateA.trolleyVision }),
                ...(ETO_9000EData.templateA.trolleyDetect && { trolleyDetect: ETO_9000EData.templateA.trolleyDetect }),
                ...(ETO_9000EData.templateA.omniView && { omniView: ETO_9000EData.templateA.omniView }),
                ...(ETO_9000EData.templateA.dcuUpgradeNum && { dcuUpgradeNum: ETO_9000EData.templateA.dcuUpgradeNum }),
                ...(ETO_9000EData.templateA.itNameOne && { itNameOne: ETO_9000EData.templateA.itNameOne }),
                ...(ETO_9000EData.templateA.itIPOne && { itIPOne: ETO_9000EData.templateA.itIPOne }),
                ...(ETO_9000EData.templateA.itGatewayOne && { itGatewayOne: ETO_9000EData.templateA.itGatewayOne }),
                ...(ETO_9000EData.templateA.itSubnetOne && { itSubnetOne: ETO_9000EData.templateA.itSubnetOne }),
                ...(ETO_9000EData.templateA.itDNSOne && { itDNSOne: ETO_9000EData.templateA.itDNSOne }),
                ...(ETO_9000EData.templateA.itSMTPOne && { itSMTPOne: ETO_9000EData.templateA.itSMTPOne }),
                ...(ETO_9000EData.templateA.itNameTwo && { itNameTwo: ETO_9000EData.templateA.itNameTwo }),
                ...(ETO_9000EData.templateA.itIPTwo && { itIPTwo: ETO_9000EData.templateA.itIPTwo }),
                ...(ETO_9000EData.templateA.itGatewayTwo && { itGatewayTwo: ETO_9000EData.templateA.itGatewayTwo }),
                ...(ETO_9000EData.templateA.itSubnetTwo && { itSubnetTwo: ETO_9000EData.templateA.itSubnetTwo }),
                ...(ETO_9000EData.templateA.itDNSTwo && { itDNSTwo: ETO_9000EData.templateA.itDNSTwo }),
                ...(ETO_9000EData.templateA.itSMTPTwo && { itSMTPTwo: ETO_9000EData.templateA.itSMTPTwo }),
                ...(ETO_9000EData.templateA.itNameThree && { itNameThree: ETO_9000EData.templateA.itNameThree }),
                ...(ETO_9000EData.templateA.itIPThree && { itIPThree: ETO_9000EData.templateA.itIPThree }),
                ...(ETO_9000EData.templateA.itGatewayThree && { itGatewayThree: ETO_9000EData.templateA.itGatewayThree }),
                ...(ETO_9000EData.templateA.itSubnetThree && { itSubnetThree: ETO_9000EData.templateA.itSubnetThree }),
                ...(ETO_9000EData.templateA.itDNSThree && { itDNSThree: ETO_9000EData.templateA.itDNSThree }),
                ...(ETO_9000EData.templateA.itSMTPThree && { itSMTPThree: ETO_9000EData.templateA.itSMTPThree }),
                ...(ETO_9000EData.templateA.itAdditionalNotes && { itAdditionalNotes: ETO_9000EData.templateA.itAdditionalNotes }),
                ...(ETO_9000EData.templateA.piuDistance && { piuDistance: ETO_9000EData.templateA.piuDistance }),
                ...(ETO_9000EData.templateA.switchDistance && { switchDistance: ETO_9000EData.templateA.switchDistance }),
                ...(ETO_9000EData.templateA.ampPickup && { ampPickup: ETO_9000EData.templateA.ampPickup }),
                ...(ETO_9000EData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETO_9000EData.templateA.fromAirTakeUpDistance }),
                ...(ETO_9000EData.templateA.specialControllerOptions && { specialControllerOptions: ETO_9000EData.templateA.specialControllerOptions })
            }),
            ...(ETO_9000EData.freeCarrierSystem && { freeCarrierSystem: ETO_9000EData.freeCarrierSystem }),
            ...(ETO_9000EData.catDriveStatus && { catDriveStatus: ETO_9000EData.catDriveStatus }),
            ...(ETO_9000EData.catDriveNum && { catDriveNum: ETO_9000EData.catDriveNum }),
            ...(ETO_9000EData.externalLubeStatus && { externalLubeStatus: ETO_9000EData.externalLubeStatus }),
            ...(ETO_9000EData.lubeBrand && { lubeBrand: ETO_9000EData.lubeBrand }),
            ...(ETO_9000EData.lubeType && { lubeType: ETO_9000EData.lubeType }),
            ...(ETO_9000EData.lubeViscosity && { lubeViscosity: ETO_9000EData.lubeViscosity }),
            ...(ETO_9000EData.chainMaster && { chainMaster: ETO_9000EData.chainMaster }),
            ...(ETO_9000EData.timerStatus && { timerStatus: ETO_9000EData.timerStatus }),
            ...(ETO_9000EData.electricStatus && { electricStatus: ETO_9000EData.electricStatus }),
            ...(ETO_9000EData.pneumaticStatus && { pneumaticStatus: ETO_9000EData.pneumaticStatus }),
            ...(ETO_9000EData.mightyLubeMonitoring && { mightyLubeMonitoring: ETO_9000EData.mightyLubeMonitoring }),
            ...(ETO_9000EData.plcConnection && { plcConnection: ETO_9000EData.plcConnection }),
            ...(ETO_9000EData.otherControllerInfo && { otherControllerInfo: ETO_9000EData.otherControllerInfo }),
            ...(ETO_9000EData.wireMeasurementUnit && { wireMeasurementUnit: ETO_9000EData.wireMeasurementUnit }),
            ...(ETO_9000EData.conductor2 && { conductor2: ETO_9000EData.conductor2 }),
            ...(ETO_9000EData.conductor4 && { conductor4: ETO_9000EData.conductor4 }),
            ...(ETO_9000EData.conductor7 && { conductor7: ETO_9000EData.conductor7 }),
            ...(ETO_9000EData.conductor12 && { conductor12: ETO_9000EData.conductor12 }),
            ...(ETO_9000EData.junctionBoxNum && { junctionBoxNum: ETO_9000EData.junctionBoxNum }),
            ...(ETO_9000EData.enclosedUnitType && { enclosedUnitType: ETO_9000EData.enclosedUnitType }),
            ...(ETO_9000EData.enclosedTrackB && { enclosedTrackB: ETO_9000EData.enclosedTrackB }),
            ...(ETO_9000EData.enclosedTrackG && { enclosedTrackG: ETO_9000EData.enclosedTrackG }),
            ...(ETO_9000EData.enclosedTrackH && { enclosedTrackH: ETO_9000EData.enclosedTrackH }),
            ...(ETO_9000EData.enclosedTrackS && { enclosedTrackS: ETO_9000EData.enclosedTrackS }),
            ...(ETO_9000EData.enclosedTrackK2 && { enclosedTrackK2: ETO_9000EData.enclosedTrackK2 }),
            ...(ETO_9000EData.enclosedTrackL2 && { enclosedTrackL2: ETO_9000EData.enclosedTrackL2 }),
            ...(ETO_9000EData.enclosedTrackM2 && { enclosedTrackM2: ETO_9000EData.enclosedTrackM2 }),
            ...(ETO_9000EData.enclosedTrackN2 && { enclosedTrackN2: ETO_9000EData.enclosedTrackN2 }),
            ...(ETO_9000EData.enclosedTrackS2 && { enclosedTrackS2: ETO_9000EData.enclosedTrackS2 })
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETO_9000E"
        });
        await req.user.save();
        return res.status(200).json({ message: "ETO_9000E entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;