const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_2100 = require("../models/ETO_2100");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETO_2100Data, numRequested } = req.body;
        const order = new ETO_2100({
            ...(ETO_2100Data.chainSize && { chainSize: ETO_2100Data.chainSize }),
            industrialChainManufacturer: ETO_2100Data.industrialChainManufacturer,
            ...(ETO_2100Data.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETO_2100Data.otherIndustrialChainManufacturer }),
            ...(ETO_2100Data.conveyorLength && { conveyorLength: ETO_2100Data.conveyorLength }),
            ...(ETO_2100Data.conveyorLengthUnit && { conveyorLengthUnit: ETO_2100Data.conveyorLengthUnit }),
            ...(ETO_2100Data.conveyorSpeed && { conveyorSpeed: ETO_2100Data.conveyorSpeed }),
            ...(ETO_2100Data.conveyorSpeedUnit && { conveyorSpeedUnit: ETO_2100Data.conveyorSpeedUnit }),
            ...(ETO_2100Data.conveyorIndex && { conveyorIndex: ETO_2100Data.conveyorIndex }),
            ...(ETO_2100Data.travelDirection && { travelDirection: ETO_2100Data.travelDirection }),
            appEnviroment: ETO_2100Data.appEnviroment,
            ...(ETO_2100Data.ovenStatus && { ovenStatus: ETO_2100Data.ovenStatus }),
            ...(ETO_2100Data.ovenTemp && { ovenTemp: ETO_2100Data.ovenTemp }),
            ...(ETO_2100Data.surroundingTemp && { surroundingTemp: ETO_2100Data.surroundingTemp }),
            ...(ETO_2100Data.conveyorLoaded && { conveyorLoaded: ETO_2100Data.conveyorLoaded }),
            ...(ETO_2100Data.conveyorSwing && { conveyorSwing: ETO_2100Data.conveyorSwing }),
            ...(ETO_2100Data.operatingVoltage && { operatingVoltage: ETO_2100Data.operatingVoltage }),

            monitorData: new templateA({
                existingMonitor: ETO_2100Data.templateA.existingMonitor,
                newMonitor: ETO_2100Data.templateA.newMonitor,
                ...(ETO_2100Data.templateA.dcuStatus && { dcuStatus: ETO_2100Data.templateA.dcuStatus }),
                ...(ETO_2100Data.templateA.dcuNum && { dcuNum: ETO_2100Data.templateA.dcuNum }),
                ...(ETO_2100Data.templateA.existingWindows && { existingWindows: ETO_2100Data.templateA.existingWindows }),
                ...(ETO_2100Data.templateA.existingHeadUnit && { existingHeadUnit: ETO_2100Data.templateA.existingHeadUnit }),
                ...(ETO_2100Data.templateA.existingDCU && { existingDCU: ETO_2100Data.templateA.existingDCU }),
                ...(ETO_2100Data.templateA.existingPowerInterface && { existingPowerInterface: ETO_2100Data.templateA.existingPowerInterface }),
                ...(ETO_2100Data.templateA.newReservoir && { newReservoir: ETO_2100Data.templateA.newReservoir }),
                ...(ETO_2100Data.templateA.reservoirSize && { reservoirSize: ETO_2100Data.templateA.reservoirSize }),
                ...(ETO_2100Data.templateA.otherReservoirSize && { otherReservoirSize: ETO_2100Data.templateA.otherReservoirSize }),
                ...(ETO_2100Data.templateA.newReservoirNum && { newReservoirNum: ETO_2100Data.templateA.newReservoirNum }),
                ...(ETO_2100Data.templateA.typeMonitor && { typeMonitor: ETO_2100Data.templateA.typeMonitor }),
                ...(ETO_2100Data.templateA.driveMotorAmp && { driveMotorAmp: ETO_2100Data.templateA.driveMotorAmp }),
                ...(ETO_2100Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: ETO_2100Data.templateA.driveMotorAmpNum }),
                ...(ETO_2100Data.templateA.driveTakeUpAir && { driveTakeUpAir: ETO_2100Data.templateA.driveTakeUpAir }),
                ...(ETO_2100Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: ETO_2100Data.templateA.driveTakeUpAirNum }),
                ...(ETO_2100Data.templateA.takeUpDistance && { takeUpDistance: ETO_2100Data.templateA.takeUpDistance }),
                ...(ETO_2100Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: ETO_2100Data.templateA.takeUpDistanceNum }),
                ...(ETO_2100Data.templateA.driveTemp && { driveTemp: ETO_2100Data.templateA.driveTemp }),
                ...(ETO_2100Data.templateA.driveTempNum && { driveTempNum: ETO_2100Data.templateA.driveTempNum }),
                ...(ETO_2100Data.templateA.driveVibration && { driveVibration: ETO_2100Data.templateA.driveVibration }),
                ...(ETO_2100Data.templateA.driveVibrationNum && { driveVibrationNum: ETO_2100Data.templateA.driveVibrationNum }),
                ...(ETO_2100Data.templateA.dogPitch && { dogPitch: ETO_2100Data.templateA.dogPitch }),
                ...(ETO_2100Data.templateA.dogPitchNum && { dogPitchNum: ETO_2100Data.templateA.dogPitchNum }),
                ...(ETO_2100Data.templateA.paintMarker && { paintMarker: ETO_2100Data.templateA.paintMarker }),
                ...(ETO_2100Data.templateA.paintMarkerNum && { paintMarkerNum: ETO_2100Data.templateA.paintMarkerNum }),
                ...(ETO_2100Data.templateA.chainVision && { chainVision: ETO_2100Data.templateA.chainVision }),
                ...(ETO_2100Data.templateA.lubeVision && { lubeVision: ETO_2100Data.templateA.lubeVision }),
                ...(ETO_2100Data.templateA.trolleyVision && { trolleyVision: ETO_2100Data.templateA.trolleyVision }),
                ...(ETO_2100Data.templateA.trolleyDetect && { trolleyDetect: ETO_2100Data.templateA.trolleyDetect }),
                ...(ETO_2100Data.templateA.omniView && { omniView: ETO_2100Data.templateA.omniView }),
                ...(ETO_2100Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: ETO_2100Data.templateA.dcuUpgradeNum }),
                ...(ETO_2100Data.templateA.itNameOne && { itNameOne: ETO_2100Data.templateA.itNameOne }),
                ...(ETO_2100Data.templateA.itIPOne && { itIPOne: ETO_2100Data.templateA.itIPOne }),
                ...(ETO_2100Data.templateA.itGatewayOne && { itGatewayOne: ETO_2100Data.templateA.itGatewayOne }),
                ...(ETO_2100Data.templateA.itSubnetOne && { itSubnetOne: ETO_2100Data.templateA.itSubnetOne }),
                ...(ETO_2100Data.templateA.itDNSOne && { itDNSOne: ETO_2100Data.templateA.itDNSOne }),
                ...(ETO_2100Data.templateA.itSMTPOne && { itSMTPOne: ETO_2100Data.templateA.itSMTPOne }),
                ...(ETO_2100Data.templateA.itNameTwo && { itNameTwo: ETO_2100Data.templateA.itNameTwo }),
                ...(ETO_2100Data.templateA.itIPTwo && { itIPTwo: ETO_2100Data.templateA.itIPTwo }),
                ...(ETO_2100Data.templateA.itGatewayTwo && { itGatewayTwo: ETO_2100Data.templateA.itGatewayTwo }),
                ...(ETO_2100Data.templateA.itSubnetTwo && { itSubnetTwo: ETO_2100Data.templateA.itSubnetTwo }),
                ...(ETO_2100Data.templateA.itDNSTwo && { itDNSTwo: ETO_2100Data.templateA.itDNSTwo }),
                ...(ETO_2100Data.templateA.itSMTPTwo && { itSMTPTwo: ETO_2100Data.templateA.itSMTPTwo }),
                ...(ETO_2100Data.templateA.itNameThree && { itNameThree: ETO_2100Data.templateA.itNameThree }),
                ...(ETO_2100Data.templateA.itIPThree && { itIPThree: ETO_2100Data.templateA.itIPThree }),
                ...(ETO_2100Data.templateA.itGatewayThree && { itGatewayThree: ETO_2100Data.templateA.itGatewayThree }),
                ...(ETO_2100Data.templateA.itSubnetThree && { itSubnetThree: ETO_2100Data.templateA.itSubnetThree }),
                ...(ETO_2100Data.templateA.itDNSThree && { itDNSThree: ETO_2100Data.templateA.itDNSThree }),
                ...(ETO_2100Data.templateA.itSMTPThree && { itSMTPThree: ETO_2100Data.templateA.itSMTPThree }),
                ...(ETO_2100Data.templateA.itAdditionalNotes && { itAdditionalNotes: ETO_2100Data.templateA.itAdditionalNotes }),
                ...(ETO_2100Data.templateA.piuDistance && { piuDistance: ETO_2100Data.templateA.piuDistance }),
                ...(ETO_2100Data.templateA.switchDistance && { switchDistance: ETO_2100Data.templateA.switchDistance }),
                ...(ETO_2100Data.templateA.ampPickup && { ampPickup: ETO_2100Data.templateA.ampPickup }),
                ...(ETO_2100Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETO_2100Data.templateA.fromAirTakeUpDistance }),
                ...(ETO_2100Data.templateA.specialControllerOptions && { specialControllerOptions: ETO_2100Data.templateA.specialControllerOptions })
            }),
            
            ...(ETO_2100Data.freeCarrierSystem && { freeCarrierSystem: ETO_2100Data.freeCarrierSystem }),
            ...(ETO_2100Data.catDriveStatus && { catDriveStatus: ETO_2100Data.catDriveStatus }),
            ...(ETO_2100Data.catDriveNum && { catDriveNum: ETO_2100Data.catDriveNum }),
            ...(ETO_2100Data.lubeBrand && { lubeBrand: ETO_2100Data.lubeBrand }),
            ...(ETO_2100Data.lubeType && { lubeType: ETO_2100Data.lubeType }),
            ...(ETO_2100Data.lubeViscosity && { lubeViscosity: ETO_2100Data.lubeViscosity }),
            ...(ETO_2100Data.chainCleanStatus && { chainCleanStatus: ETO_2100Data.chainCleanStatus }),
            ...(ETO_2100Data.wireMeasurementUnit && { wireMeasurementUnit: ETO_2100Data.wireMeasurementUnit }),
            ...(ETO_2100Data.conductor2 && { conductor2: ETO_2100Data.conductor2 }),
            ...(ETO_2100Data.conductor4 && { conductor4: ETO_2100Data.conductor4 }),
            ...(ETO_2100Data.conductor7 && { conductor7: ETO_2100Data.conductor7 }),
            ...(ETO_2100Data.conductor12 && { conductor12: ETO_2100Data.conductor12 }),
            ...(ETO_2100Data.junctionBoxNum && { junctionBoxNum: ETO_2100Data.junctionBoxNum }),
            ...(ETO_2100Data.etUnitType && { etUnitType: ETO_2100Data.etUnitType }),
            ...(ETO_2100Data.etOverheadB && { etOverheadB: ETO_2100Data.etOverheadB }),
            ...(ETO_2100Data.etOverheadG && { etOverheadG: ETO_2100Data.etOverheadG }),
            ...(ETO_2100Data.etOverheadH && { etOverheadH: ETO_2100Data.etOverheadH }),
            ...(ETO_2100Data.etOverheadS && { etOverheadS: ETO_2100Data.etOverheadS }),
            ...(ETO_2100Data.etOverheadK2 && { etOverheadK2: ETO_2100Data.etOverheadK2 }),
            ...(ETO_2100Data.etOverheadLS && { etOverheadLS: ETO_2100Data.etOverheadLS }),
            ...(ETO_2100Data.etOverheadM2 && { etOverheadM2: ETO_2100Data.etOverheadM2 }),
            ...(ETO_2100Data.etOverheadN2 && { etOverheadN2: ETO_2100Data.etOverheadN2 }),
            ...(ETO_2100Data.etOverheadS2 && { etOverheadS2: ETO_2100Data.etOverheadS2 })
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETO_2100"
        });
        await req.user.save();
        return res.status(200).json({ message: "ETO_2100 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
