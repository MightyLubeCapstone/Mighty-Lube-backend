const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_9000E = require("../models/ETO_9000E");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: ETO_9000EData.templateB.existingMonitor,
                newMonitor: ETO_9000EData.templateB.newMonitor,
                ...(ETO_9000EData.templateB.dcuStatus && { dcuStatus: ETO_9000EData.templateB.dcuStatus }),
                ...(ETO_9000EData.templateB.dcuNum && { dcuNum: ETO_9000EData.templateB.dcuNum }),
                ...(ETO_9000EData.templateB.existingWindows && { existingWindows: ETO_9000EData.templateB.existingWindows }),
                ...(ETO_9000EData.templateB.existingHeadUnit && { existingHeadUnit: ETO_9000EData.templateB.existingHeadUnit }),
                ...(ETO_9000EData.templateB.existingDCU && { existingDCU: ETO_9000EData.templateB.existingDCU }),
                ...(ETO_9000EData.templateB.existingPowerInterface && { existingPowerInterface: ETO_9000EData.templateB.existingPowerInterface }),
                ...(ETO_9000EData.templateB.newReservoir && { newReservoir: ETO_9000EData.templateB.newReservoir }),
                ...(ETO_9000EData.templateB.reservoirSize && { reservoirSize: ETO_9000EData.templateB.reservoirSize }),
                ...(ETO_9000EData.templateB.otherReservoirSize && { otherReservoirSize: ETO_9000EData.templateB.otherReservoirSize }),
                ...(ETO_9000EData.templateB.newReservoirNum && { newReservoirNum: ETO_9000EData.templateB.newReservoirNum }),
                ...(ETO_9000EData.templateB.typeMonitor && { typeMonitor: ETO_9000EData.templateB.typeMonitor }),
                ...(ETO_9000EData.templateB.driveMotorAmp && { driveMotorAmp: ETO_9000EData.templateB.driveMotorAmp }),
                ...(ETO_9000EData.templateB.driveMotorAmpNum && { driveMotorAmpNum: ETO_9000EData.templateB.driveMotorAmpNum }),
                ...(ETO_9000EData.templateB.driveTakeUpAir && { driveTakeUpAir: ETO_9000EData.templateB.driveTakeUpAir }),
                ...(ETO_9000EData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: ETO_9000EData.templateB.driveTakeUpAirNum }),
                ...(ETO_9000EData.templateB.takeUpDistance && { takeUpDistance: ETO_9000EData.templateB.takeUpDistance }),
                ...(ETO_9000EData.templateB.takeUpDistanceNum && { takeUpDistanceNum: ETO_9000EData.templateB.takeUpDistanceNum }),
                ...(ETO_9000EData.templateB.driveTemp && { driveTemp: ETO_9000EData.templateB.driveTemp }),
                ...(ETO_9000EData.templateB.driveTempNum && { driveTempNum: ETO_9000EData.templateB.driveTempNum }),
                ...(ETO_9000EData.templateB.driveVibration && { driveVibration: ETO_9000EData.templateB.driveVibration }),
                ...(ETO_9000EData.templateB.driveVibrationNum && { driveVibrationNum: ETO_9000EData.templateB.driveVibrationNum }),
                ...(ETO_9000EData.templateB.dogPitch && { dogPitch: ETO_9000EData.templateB.dogPitch }),
                ...(ETO_9000EData.templateB.dogPitchNum && { dogPitchNum: ETO_9000EData.templateB.dogPitchNum }),
                ...(ETO_9000EData.templateB.paintMarker && { paintMarker: ETO_9000EData.templateB.paintMarker }),
                ...(ETO_9000EData.templateB.paintMarkerNum && { paintMarkerNum: ETO_9000EData.templateB.paintMarkerNum }),
                ...(ETO_9000EData.templateB.chainVision && { chainVision: ETO_9000EData.templateB.chainVision }),
                ...(ETO_9000EData.templateB.lubeVision && { lubeVision: ETO_9000EData.templateB.lubeVision }),
                ...(ETO_9000EData.templateB.trolleyVision && { trolleyVision: ETO_9000EData.templateB.trolleyVision }),
                ...(ETO_9000EData.templateB.trolleyDetect && { trolleyDetect: ETO_9000EData.templateB.trolleyDetect }),
                ...(ETO_9000EData.templateB.omniView && { omniView: ETO_9000EData.templateB.omniView }),
                ...(ETO_9000EData.templateB.dcuUpgradeNum && { dcuUpgradeNum: ETO_9000EData.templateB.dcuUpgradeNum }),
                ...(ETO_9000EData.templateB.itNameOne && { itNameOne: ETO_9000EData.templateB.itNameOne }),
                ...(ETO_9000EData.templateB.itIPOne && { itIPOne: ETO_9000EData.templateB.itIPOne }),
                ...(ETO_9000EData.templateB.itGatewayOne && { itGatewayOne: ETO_9000EData.templateB.itGatewayOne }),
                ...(ETO_9000EData.templateB.itSubnetOne && { itSubnetOne: ETO_9000EData.templateB.itSubnetOne }),
                ...(ETO_9000EData.templateB.itDNSOne && { itDNSOne: ETO_9000EData.templateB.itDNSOne }),
                ...(ETO_9000EData.templateB.itSMTPOne && { itSMTPOne: ETO_9000EData.templateB.itSMTPOne }),
                ...(ETO_9000EData.templateB.itNameTwo && { itNameTwo: ETO_9000EData.templateB.itNameTwo }),
                ...(ETO_9000EData.templateB.itIPTwo && { itIPTwo: ETO_9000EData.templateB.itIPTwo }),
                ...(ETO_9000EData.templateB.itGatewayTwo && { itGatewayTwo: ETO_9000EData.templateB.itGatewayTwo }),
                ...(ETO_9000EData.templateB.itSubnetTwo && { itSubnetTwo: ETO_9000EData.templateB.itSubnetTwo }),
                ...(ETO_9000EData.templateB.itDNSTwo && { itDNSTwo: ETO_9000EData.templateB.itDNSTwo }),
                ...(ETO_9000EData.templateB.itSMTPTwo && { itSMTPTwo: ETO_9000EData.templateB.itSMTPTwo }),
                ...(ETO_9000EData.templateB.itNameThree && { itNameThree: ETO_9000EData.templateB.itNameThree }),
                ...(ETO_9000EData.templateB.itIPThree && { itIPThree: ETO_9000EData.templateB.itIPThree }),
                ...(ETO_9000EData.templateB.itGatewayThree && { itGatewayThree: ETO_9000EData.templateB.itGatewayThree }),
                ...(ETO_9000EData.templateB.itSubnetThree && { itSubnetThree: ETO_9000EData.templateB.itSubnetThree }),
                ...(ETO_9000EData.templateB.itDNSThree && { itDNSThree: ETO_9000EData.templateB.itDNSThree }),
                ...(ETO_9000EData.templateB.itSMTPThree && { itSMTPThree: ETO_9000EData.templateB.itSMTPThree }),
                ...(ETO_9000EData.templateB.itAdditionalNotes && { itAdditionalNotes: ETO_9000EData.templateB.itAdditionalNotes }),
                ...(ETO_9000EData.templateB.piuDistance && { piuDistance: ETO_9000EData.templateB.piuDistance }),
                ...(ETO_9000EData.templateB.switchDistance && { switchDistance: ETO_9000EData.templateB.switchDistance }),
                ...(ETO_9000EData.templateB.ampPickup && { ampPickup: ETO_9000EData.templateB.ampPickup }),
                ...(ETO_9000EData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETO_9000EData.templateB.fromAirTakeUpDistance }),
                ...(ETO_9000EData.templateB.specialControllerOptions && { specialControllerOptions: ETO_9000EData.templateB.specialControllerOptions })
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