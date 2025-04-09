const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_2100 = require("../models/ETO_2100");
const templateB = require("../models/templateB");

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

            monitorData: new templateB({
                existingMonitor: ETO_2100Data.templateB.existingMonitor,
                newMonitor: ETO_2100Data.templateB.newMonitor,
                ...(ETO_2100Data.templateB.dcuStatus && { dcuStatus: ETO_2100Data.templateB.dcuStatus }),
                ...(ETO_2100Data.templateB.dcuNum && { dcuNum: ETO_2100Data.templateB.dcuNum }),
                ...(ETO_2100Data.templateB.existingWindows && { existingWindows: ETO_2100Data.templateB.existingWindows }),
                ...(ETO_2100Data.templateB.existingHeadUnit && { existingHeadUnit: ETO_2100Data.templateB.existingHeadUnit }),
                ...(ETO_2100Data.templateB.existingDCU && { existingDCU: ETO_2100Data.templateB.existingDCU }),
                ...(ETO_2100Data.templateB.existingPowerInterface && { existingPowerInterface: ETO_2100Data.templateB.existingPowerInterface }),
                ...(ETO_2100Data.templateB.newReservoir && { newReservoir: ETO_2100Data.templateB.newReservoir }),
                ...(ETO_2100Data.templateB.reservoirSize && { reservoirSize: ETO_2100Data.templateB.reservoirSize }),
                ...(ETO_2100Data.templateB.otherReservoirSize && { otherReservoirSize: ETO_2100Data.templateB.otherReservoirSize }),
                ...(ETO_2100Data.templateB.newReservoirNum && { newReservoirNum: ETO_2100Data.templateB.newReservoirNum }),
                ...(ETO_2100Data.templateB.typeMonitor && { typeMonitor: ETO_2100Data.templateB.typeMonitor }),
                ...(ETO_2100Data.templateB.driveMotorAmp && { driveMotorAmp: ETO_2100Data.templateB.driveMotorAmp }),
                ...(ETO_2100Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: ETO_2100Data.templateB.driveMotorAmpNum }),
                ...(ETO_2100Data.templateB.driveTakeUpAir && { driveTakeUpAir: ETO_2100Data.templateB.driveTakeUpAir }),
                ...(ETO_2100Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: ETO_2100Data.templateB.driveTakeUpAirNum }),
                ...(ETO_2100Data.templateB.takeUpDistance && { takeUpDistance: ETO_2100Data.templateB.takeUpDistance }),
                ...(ETO_2100Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: ETO_2100Data.templateB.takeUpDistanceNum }),
                ...(ETO_2100Data.templateB.driveTemp && { driveTemp: ETO_2100Data.templateB.driveTemp }),
                ...(ETO_2100Data.templateB.driveTempNum && { driveTempNum: ETO_2100Data.templateB.driveTempNum }),
                ...(ETO_2100Data.templateB.driveVibration && { driveVibration: ETO_2100Data.templateB.driveVibration }),
                ...(ETO_2100Data.templateB.driveVibrationNum && { driveVibrationNum: ETO_2100Data.templateB.driveVibrationNum }),
                ...(ETO_2100Data.templateB.dogPitch && { dogPitch: ETO_2100Data.templateB.dogPitch }),
                ...(ETO_2100Data.templateB.dogPitchNum && { dogPitchNum: ETO_2100Data.templateB.dogPitchNum }),
                ...(ETO_2100Data.templateB.paintMarker && { paintMarker: ETO_2100Data.templateB.paintMarker }),
                ...(ETO_2100Data.templateB.paintMarkerNum && { paintMarkerNum: ETO_2100Data.templateB.paintMarkerNum }),
                ...(ETO_2100Data.templateB.chainVision && { chainVision: ETO_2100Data.templateB.chainVision }),
                ...(ETO_2100Data.templateB.lubeVision && { lubeVision: ETO_2100Data.templateB.lubeVision }),
                ...(ETO_2100Data.templateB.trolleyVision && { trolleyVision: ETO_2100Data.templateB.trolleyVision }),
                ...(ETO_2100Data.templateB.trolleyDetect && { trolleyDetect: ETO_2100Data.templateB.trolleyDetect }),
                ...(ETO_2100Data.templateB.omniView && { omniView: ETO_2100Data.templateB.omniView }),
                ...(ETO_2100Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: ETO_2100Data.templateB.dcuUpgradeNum }),
                ...(ETO_2100Data.templateB.itNameOne && { itNameOne: ETO_2100Data.templateB.itNameOne }),
                ...(ETO_2100Data.templateB.itIPOne && { itIPOne: ETO_2100Data.templateB.itIPOne }),
                ...(ETO_2100Data.templateB.itGatewayOne && { itGatewayOne: ETO_2100Data.templateB.itGatewayOne }),
                ...(ETO_2100Data.templateB.itSubnetOne && { itSubnetOne: ETO_2100Data.templateB.itSubnetOne }),
                ...(ETO_2100Data.templateB.itDNSOne && { itDNSOne: ETO_2100Data.templateB.itDNSOne }),
                ...(ETO_2100Data.templateB.itSMTPOne && { itSMTPOne: ETO_2100Data.templateB.itSMTPOne }),
                ...(ETO_2100Data.templateB.itNameTwo && { itNameTwo: ETO_2100Data.templateB.itNameTwo }),
                ...(ETO_2100Data.templateB.itIPTwo && { itIPTwo: ETO_2100Data.templateB.itIPTwo }),
                ...(ETO_2100Data.templateB.itGatewayTwo && { itGatewayTwo: ETO_2100Data.templateB.itGatewayTwo }),
                ...(ETO_2100Data.templateB.itSubnetTwo && { itSubnetTwo: ETO_2100Data.templateB.itSubnetTwo }),
                ...(ETO_2100Data.templateB.itDNSTwo && { itDNSTwo: ETO_2100Data.templateB.itDNSTwo }),
                ...(ETO_2100Data.templateB.itSMTPTwo && { itSMTPTwo: ETO_2100Data.templateB.itSMTPTwo }),
                ...(ETO_2100Data.templateB.itNameThree && { itNameThree: ETO_2100Data.templateB.itNameThree }),
                ...(ETO_2100Data.templateB.itIPThree && { itIPThree: ETO_2100Data.templateB.itIPThree }),
                ...(ETO_2100Data.templateB.itGatewayThree && { itGatewayThree: ETO_2100Data.templateB.itGatewayThree }),
                ...(ETO_2100Data.templateB.itSubnetThree && { itSubnetThree: ETO_2100Data.templateB.itSubnetThree }),
                ...(ETO_2100Data.templateB.itDNSThree && { itDNSThree: ETO_2100Data.templateB.itDNSThree }),
                ...(ETO_2100Data.templateB.itSMTPThree && { itSMTPThree: ETO_2100Data.templateB.itSMTPThree }),
                ...(ETO_2100Data.templateB.itAdditionalNotes && { itAdditionalNotes: ETO_2100Data.templateB.itAdditionalNotes }),
                ...(ETO_2100Data.templateB.piuDistance && { piuDistance: ETO_2100Data.templateB.piuDistance }),
                ...(ETO_2100Data.templateB.switchDistance && { switchDistance: ETO_2100Data.templateB.switchDistance }),
                ...(ETO_2100Data.templateB.ampPickup && { ampPickup: ETO_2100Data.templateB.ampPickup }),
                ...(ETO_2100Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETO_2100Data.templateB.fromAirTakeUpDistance }),
                ...(ETO_2100Data.templateB.specialControllerOptions && { specialControllerOptions: ETO_2100Data.templateB.specialControllerOptions })
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
