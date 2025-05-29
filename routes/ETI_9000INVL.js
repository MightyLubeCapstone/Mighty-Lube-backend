const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_9000INVL = require("../models/ETI_9000INVL");
const templateB = require("../models/templateB");


const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETI_9000INVLData, numRequested } = req.body;

        const order = new ETI_9000INVL({
            ...(ETI_9000INVLData.conveyorName && { conveyorName: ETI_9000INVLData.conveyorName }),
            industrialChainManufacturer: ETI_9000INVLData.industrialChainManufacturer,
            ...(ETI_9000INVLData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_9000INVLData.otherIndustrialChainManufacturer }),
            ...(ETI_9000INVLData.conveyorLength && { conveyorLength: ETI_9000INVLData.conveyorLength }),
            ...(ETI_9000INVLData.conveyorLengthUnit && { conveyorLengthUnit: ETI_9000INVLData.conveyorLengthUnit }),
            ...(ETI_9000INVLData.conveyorSpeed && { conveyorSpeed: ETI_9000INVLData.conveyorSpeed }),
            ...(ETI_9000INVLData.conveyorSpeedUnit && { conveyorSpeedUnit: ETI_9000INVLData.conveyorSpeedUnit }),
            ...(ETI_9000INVLData.conveyorIndex && { conveyorIndex: ETI_9000INVLData.conveyorIndex }),
            ...(ETI_9000INVLData.travelDirection && { travelDirection: ETI_9000INVLData.travelDirection }),
            appEnviroment: ETI_9000INVLData.appEnviroment,
            ...(ETI_9000INVLData.ovenStatus && { ovenStatus: ETI_9000INVLData.ovenStatus }),
            ...(ETI_9000INVLData.ovenTemp && { ovenTemp: ETI_9000INVLData.ovenTemp }),
            ...(ETI_9000INVLData.surroundingTemp && { surroundingTemp: ETI_9000INVLData.surroundingTemp }),
            ...(ETI_9000INVLData.conveyorLoaded && { conveyorLoaded: ETI_9000INVLData.conveyorLoaded }),
            ...(ETI_9000INVLData.conveyorSwing && { conveyorSwing: ETI_9000INVLData.conveyorSwing }),
            ...(ETI_9000INVLData.operatingVoltage && { operatingVoltage: ETI_9000INVLData.operatingVoltage }),

            // monitorData: new templateB({
            //     existingMonitor: ETI_9000INVLData.templateB.existingMonitor,
            //     newMonitor: ETI_9000INVLData.templateB.newMonitor,
            //     ...(ETI_9000INVLData.templateB.dcuStatus && { dcuStatus: ETI_9000INVLData.templateB.dcuStatus }),
            //     ...(ETI_9000INVLData.templateB.dcuNum && { dcuNum: ETI_9000INVLData.templateB.dcuNum }),
            //     ...(ETI_9000INVLData.templateB.existingWindows && { existingWindows: ETI_9000INVLData.templateB.existingWindows }),
            //     ...(ETI_9000INVLData.templateB.existingHeadUnit && { existingHeadUnit: ETI_9000INVLData.templateB.existingHeadUnit }),
            //     ...(ETI_9000INVLData.templateB.existingDCU && { existingDCU: ETI_9000INVLData.templateB.existingDCU }),
            //     ...(ETI_9000INVLData.templateB.existingPowerInterface && { existingPowerInterface: ETI_9000INVLData.templateB.existingPowerInterface }),
            //     ...(ETI_9000INVLData.templateB.newReservoir && { newReservoir: ETI_9000INVLData.templateB.newReservoir }),
            //     ...(ETI_9000INVLData.templateB.reservoirSize && { reservoirSize: ETI_9000INVLData.templateB.reservoirSize }),
            //     ...(ETI_9000INVLData.templateB.otherReservoirSize && { otherReservoirSize: ETI_9000INVLData.templateB.otherReservoirSize }),
            //     ...(ETI_9000INVLData.templateB.newReservoirNum && { newReservoirNum: ETI_9000INVLData.templateB.newReservoirNum }),
            //     ...(ETI_9000INVLData.templateB.typeMonitor && { typeMonitor: ETI_9000INVLData.templateB.typeMonitor }),
            //     ...(ETI_9000INVLData.templateB.driveMotorAmp && { driveMotorAmp: ETI_9000INVLData.templateB.driveMotorAmp }),
            //     ...(ETI_9000INVLData.templateB.driveMotorAmpNum && { driveMotorAmpNum: ETI_9000INVLData.templateB.driveMotorAmpNum }),
            //     ...(ETI_9000INVLData.templateB.driveTakeUpAir && { driveTakeUpAir: ETI_9000INVLData.templateB.driveTakeUpAir }),
            //     ...(ETI_9000INVLData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_9000INVLData.templateB.driveTakeUpAirNum }),
            //     ...(ETI_9000INVLData.templateB.takeUpDistance && { takeUpDistance: ETI_9000INVLData.templateB.takeUpDistance }),
            //     ...(ETI_9000INVLData.templateB.takeUpDistanceNum && { takeUpDistanceNum: ETI_9000INVLData.templateB.takeUpDistanceNum }),
            //     ...(ETI_9000INVLData.templateB.driveTemp && { driveTemp: ETI_9000INVLData.templateB.driveTemp }),
            //     ...(ETI_9000INVLData.templateB.driveTempNum && { driveTempNum: ETI_9000INVLData.templateB.driveTempNum }),
            //     ...(ETI_9000INVLData.templateB.driveVibration && { driveVibration: ETI_9000INVLData.templateB.driveVibration }),
            //     ...(ETI_9000INVLData.templateB.driveVibrationNum && { driveVibrationNum: ETI_9000INVLData.templateB.driveVibrationNum }),
            //     ...(ETI_9000INVLData.templateB.dogPitch && { dogPitch: ETI_9000INVLData.templateB.dogPitch }),
            //     ...(ETI_9000INVLData.templateB.dogPitchNum && { dogPitchNum: ETI_9000INVLData.templateB.dogPitchNum }),
            //     ...(ETI_9000INVLData.templateB.paintMarker && { paintMarker: ETI_9000INVLData.templateB.paintMarker }),
            //     ...(ETI_9000INVLData.templateB.paintMarkerNum && { paintMarkerNum: ETI_9000INVLData.templateB.paintMarkerNum }),
            //     ...(ETI_9000INVLData.templateB.chainVision && { chainVision: ETI_9000INVLData.templateB.chainVision }),
            //     ...(ETI_9000INVLData.templateB.lubeVision && { lubeVision: ETI_9000INVLData.templateB.lubeVision }),
            //     ...(ETI_9000INVLData.templateB.trolleyVision && { trolleyVision: ETI_9000INVLData.templateB.trolleyVision }),
            //     ...(ETI_9000INVLData.templateB.trolleyDetect && { trolleyDetect: ETI_9000INVLData.templateB.trolleyDetect }),
            //     ...(ETI_9000INVLData.templateB.omniView && { omniView: ETI_9000INVLData.templateB.omniView }),
            //     ...(ETI_9000INVLData.templateB.dcuUpgradeNum && { dcuUpgradeNum: ETI_9000INVLData.templateB.dcuUpgradeNum }),
            //     ...(ETI_9000INVLData.templateB.itNameOne && { itNameOne: ETI_9000INVLData.templateB.itNameOne }),
            //     ...(ETI_9000INVLData.templateB.itIPOne && { itIPOne: ETI_9000INVLData.templateB.itIPOne }),
            //     ...(ETI_9000INVLData.templateB.itGatewayOne && { itGatewayOne: ETI_9000INVLData.templateB.itGatewayOne }),
            //     ...(ETI_9000INVLData.templateB.itSubnetOne && { itSubnetOne: ETI_9000INVLData.templateB.itSubnetOne }),
            //     ...(ETI_9000INVLData.templateB.itDNSOne && { itDNSOne: ETI_9000INVLData.templateB.itDNSOne }),
            //     ...(ETI_9000INVLData.templateB.itSMTPOne && { itSMTPOne: ETI_9000INVLData.templateB.itSMTPOne }),
            //     ...(ETI_9000INVLData.templateB.itNameTwo && { itNameTwo: ETI_9000INVLData.templateB.itNameTwo }),
            //     ...(ETI_9000INVLData.templateB.itIPTwo && { itIPTwo: ETI_9000INVLData.templateB.itIPTwo }),
            //     ...(ETI_9000INVLData.templateB.itGatewayTwo && { itGatewayTwo: ETI_9000INVLData.templateB.itGatewayTwo }),
            //     ...(ETI_9000INVLData.templateB.itSubnetTwo && { itSubnetTwo: ETI_9000INVLData.templateB.itSubnetTwo }),
            //     ...(ETI_9000INVLData.templateB.itDNSTwo && { itDNSTwo: ETI_9000INVLData.templateB.itDNSTwo }),
            //     ...(ETI_9000INVLData.templateB.itSMTPTwo && { itSMTPTwo: ETI_9000INVLData.templateB.itSMTPTwo }),
            //     ...(ETI_9000INVLData.templateB.itNameThree && { itNameThree: ETI_9000INVLData.templateB.itNameThree }),
            //     ...(ETI_9000INVLData.templateB.itIPThree && { itIPThree: ETI_9000INVLData.templateB.itIPThree }),
            //     ...(ETI_9000INVLData.templateB.itGatewayThree && { itGatewayThree: ETI_9000INVLData.templateB.itGatewayThree }),
            //     ...(ETI_9000INVLData.templateB.itSubnetThree && { itSubnetThree: ETI_9000INVLData.templateB.itSubnetThree }),
            //     ...(ETI_9000INVLData.templateB.itDNSThree && { itDNSThree: ETI_9000INVLData.templateB.itDNSThree }),
            //     ...(ETI_9000INVLData.templateB.itSMTPThree && { itSMTPThree: ETI_9000INVLData.templateB.itSMTPThree }),
            //     ...(ETI_9000INVLData.templateB.itAdditionalNotes && { itAdditionalNotes: ETI_9000INVLData.templateB.itAdditionalNotes }),
            //     ...(ETI_9000INVLData.templateB.piuDistance && { piuDistance: ETI_9000INVLData.templateB.piuDistance }),
            //     ...(ETI_9000INVLData.templateB.switchDistance && { switchDistance: ETI_9000INVLData.templateB.switchDistance }),
            //     ...(ETI_9000INVLData.templateB.ampPickup && { ampPickup: ETI_9000INVLData.templateB.ampPickup }),
            //     ...(ETI_9000INVLData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_9000INVLData.templateB.fromAirTakeUpDistance }),
            //     ...(ETI_9000INVLData.templateB.specialControllerOptions && { specialControllerOptions: ETI_9000INVLData.templateB.specialControllerOptions })
            // }),
            
            ...(ETI_9000INVLData.freeCarrierSystem && { freeCarrierSystem: ETI_9000INVLData.freeCarrierSystem }),
            ...(ETI_9000INVLData.catDriveStatus && { catDriveStatus: ETI_9000INVLData.catDriveStatus }),
            ...(ETI_9000INVLData.catDriveNum && { catDriveNum: ETI_9000INVLData.catDriveNum }),
            ...(ETI_9000INVLData.externalLubeStatus && { externalLubeStatus: ETI_9000INVLData.externalLubeStatus }),
            ...(ETI_9000INVLData.lubeBrand && { lubeBrand: ETI_9000INVLData.lubeBrand }),
            ...(ETI_9000INVLData.lubeType && { lubeType: ETI_9000INVLData.lubeType }),
            ...(ETI_9000INVLData.lubeViscosity && { lubeViscosity: ETI_9000INVLData.lubeViscosity }),
            ...(ETI_9000INVLData.sideLubeStatus && { sideLubeStatus: ETI_9000INVLData.sideLubeStatus }),
            ...(ETI_9000INVLData.chainCleanStatus && { chainCleanStatus: ETI_9000INVLData.chainCleanStatus }),
            ...(ETI_9000INVLData.mightyLubeMonitoring && { mightyLubeMonitoring: ETI_9000INVLData.mightyLubeMonitoring }),
            ...(ETI_9000INVLData.ctrStatus && { ctrStatus: ETI_9000INVLData.ctrStatus }),
            ...(ETI_9000INVLData.plcConnection && { plcConnection: ETI_9000INVLData.plcConnection }),
            ...(ETI_9000INVLData.monitorControlStatus && { monitorControlStatus: ETI_9000INVLData.monitorControlStatus }),
            ...(ETI_9000INVLData.otherControllerInfo && { otherControllerInfo: ETI_9000INVLData.otherControllerInfo }),
            ...(ETI_9000INVLData.wireMeasurementUnit && { wireMeasurementUnit: ETI_9000INVLData.wireMeasurementUnit }),
            ...(ETI_9000INVLData.conductor2 && { conductor2: ETI_9000INVLData.conductor2 }),
            ...(ETI_9000INVLData.conductor4 && { conductor4: ETI_9000INVLData.conductor4 }),
            ...(ETI_9000INVLData.conductor7 && { conductor7: ETI_9000INVLData.conductor7 }),
            ...(ETI_9000INVLData.conductor12 && { conductor12: ETI_9000INVLData.conductor12 }),
            ...(ETI_9000INVLData.junctionBoxNum && { junctionBoxNum: ETI_9000INVLData.junctionBoxNum }),
            ...(ETI_9000INVLData.enclosedUnitType && { enclosedUnitType: ETI_9000INVLData.enclosedUnitType }),
            ...(ETI_9000INVLData.enclosedTrackB && { enclosedTrackB: ETI_9000INVLData.enclosedTrackB }),
            ...(ETI_9000INVLData.enclosedTrackG && { enclosedTrackG: ETI_9000INVLData.enclosedTrackG }),
            ...(ETI_9000INVLData.enclosedTrackH && { enclosedTrackH: ETI_9000INVLData.enclosedTrackH }),
            ...(ETI_9000INVLData.enclosedTrackS && { enclosedTrackS: ETI_9000INVLData.enclosedTrackS }),
            ...(ETI_9000INVLData.enclosedTrackK2 && { enclosedTrackK2: ETI_9000INVLData.enclosedTrackK2 }),
            ...(ETI_9000INVLData.enclosedTrackL2 && { enclosedTrackL2: ETI_9000INVLData.enclosedTrackL2 }),
            ...(ETI_9000INVLData.enclosedTrackM2 && { enclosedTrackM2: ETI_9000INVLData.enclosedTrackM2 }),
            ...(ETI_9000INVLData.enclosedTrackN2 && { enclosedTrackN2: ETI_9000INVLData.enclosedTrackN2 }),
            ...(ETI_9000INVLData.enclosedTrackS2 && { enclosedTrackS2: ETI_9000INVLData.enclosedTrackS2 }),
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETI_9000INVL"
        });
        await req.user.save();

        return res.status(200).json({ message: "ETI_9000INVL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
