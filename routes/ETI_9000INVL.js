const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_9000INVL = require("../models/ETI_9000INVL");
const templateA = require("../models/templateA");


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

            // monitorData: new templateA({
            //     existingMonitor: ETI_9000INVLData.templateA.existingMonitor,
            //     newMonitor: ETI_9000INVLData.templateA.newMonitor,
            //     ...(ETI_9000INVLData.templateA.dcuStatus && { dcuStatus: ETI_9000INVLData.templateA.dcuStatus }),
            //     ...(ETI_9000INVLData.templateA.dcuNum && { dcuNum: ETI_9000INVLData.templateA.dcuNum }),
            //     ...(ETI_9000INVLData.templateA.existingWindows && { existingWindows: ETI_9000INVLData.templateA.existingWindows }),
            //     ...(ETI_9000INVLData.templateA.existingHeadUnit && { existingHeadUnit: ETI_9000INVLData.templateA.existingHeadUnit }),
            //     ...(ETI_9000INVLData.templateA.existingDCU && { existingDCU: ETI_9000INVLData.templateA.existingDCU }),
            //     ...(ETI_9000INVLData.templateA.existingPowerInterface && { existingPowerInterface: ETI_9000INVLData.templateA.existingPowerInterface }),
            //     ...(ETI_9000INVLData.templateA.newReservoir && { newReservoir: ETI_9000INVLData.templateA.newReservoir }),
            //     ...(ETI_9000INVLData.templateA.reservoirSize && { reservoirSize: ETI_9000INVLData.templateA.reservoirSize }),
            //     ...(ETI_9000INVLData.templateA.otherReservoirSize && { otherReservoirSize: ETI_9000INVLData.templateA.otherReservoirSize }),
            //     ...(ETI_9000INVLData.templateA.newReservoirNum && { newReservoirNum: ETI_9000INVLData.templateA.newReservoirNum }),
            //     ...(ETI_9000INVLData.templateA.typeMonitor && { typeMonitor: ETI_9000INVLData.templateA.typeMonitor }),
            //     ...(ETI_9000INVLData.templateA.driveMotorAmp && { driveMotorAmp: ETI_9000INVLData.templateA.driveMotorAmp }),
            //     ...(ETI_9000INVLData.templateA.driveMotorAmpNum && { driveMotorAmpNum: ETI_9000INVLData.templateA.driveMotorAmpNum }),
            //     ...(ETI_9000INVLData.templateA.driveTakeUpAir && { driveTakeUpAir: ETI_9000INVLData.templateA.driveTakeUpAir }),
            //     ...(ETI_9000INVLData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_9000INVLData.templateA.driveTakeUpAirNum }),
            //     ...(ETI_9000INVLData.templateA.takeUpDistance && { takeUpDistance: ETI_9000INVLData.templateA.takeUpDistance }),
            //     ...(ETI_9000INVLData.templateA.takeUpDistanceNum && { takeUpDistanceNum: ETI_9000INVLData.templateA.takeUpDistanceNum }),
            //     ...(ETI_9000INVLData.templateA.driveTemp && { driveTemp: ETI_9000INVLData.templateA.driveTemp }),
            //     ...(ETI_9000INVLData.templateA.driveTempNum && { driveTempNum: ETI_9000INVLData.templateA.driveTempNum }),
            //     ...(ETI_9000INVLData.templateA.driveVibration && { driveVibration: ETI_9000INVLData.templateA.driveVibration }),
            //     ...(ETI_9000INVLData.templateA.driveVibrationNum && { driveVibrationNum: ETI_9000INVLData.templateA.driveVibrationNum }),
            //     ...(ETI_9000INVLData.templateA.dogPitch && { dogPitch: ETI_9000INVLData.templateA.dogPitch }),
            //     ...(ETI_9000INVLData.templateA.dogPitchNum && { dogPitchNum: ETI_9000INVLData.templateA.dogPitchNum }),
            //     ...(ETI_9000INVLData.templateA.paintMarker && { paintMarker: ETI_9000INVLData.templateA.paintMarker }),
            //     ...(ETI_9000INVLData.templateA.paintMarkerNum && { paintMarkerNum: ETI_9000INVLData.templateA.paintMarkerNum }),
            //     ...(ETI_9000INVLData.templateA.chainVision && { chainVision: ETI_9000INVLData.templateA.chainVision }),
            //     ...(ETI_9000INVLData.templateA.lubeVision && { lubeVision: ETI_9000INVLData.templateA.lubeVision }),
            //     ...(ETI_9000INVLData.templateA.trolleyVision && { trolleyVision: ETI_9000INVLData.templateA.trolleyVision }),
            //     ...(ETI_9000INVLData.templateA.trolleyDetect && { trolleyDetect: ETI_9000INVLData.templateA.trolleyDetect }),
            //     ...(ETI_9000INVLData.templateA.omniView && { omniView: ETI_9000INVLData.templateA.omniView }),
            //     ...(ETI_9000INVLData.templateA.dcuUpgradeNum && { dcuUpgradeNum: ETI_9000INVLData.templateA.dcuUpgradeNum }),
            //     ...(ETI_9000INVLData.templateA.itNameOne && { itNameOne: ETI_9000INVLData.templateA.itNameOne }),
            //     ...(ETI_9000INVLData.templateA.itIPOne && { itIPOne: ETI_9000INVLData.templateA.itIPOne }),
            //     ...(ETI_9000INVLData.templateA.itGatewayOne && { itGatewayOne: ETI_9000INVLData.templateA.itGatewayOne }),
            //     ...(ETI_9000INVLData.templateA.itSubnetOne && { itSubnetOne: ETI_9000INVLData.templateA.itSubnetOne }),
            //     ...(ETI_9000INVLData.templateA.itDNSOne && { itDNSOne: ETI_9000INVLData.templateA.itDNSOne }),
            //     ...(ETI_9000INVLData.templateA.itSMTPOne && { itSMTPOne: ETI_9000INVLData.templateA.itSMTPOne }),
            //     ...(ETI_9000INVLData.templateA.itNameTwo && { itNameTwo: ETI_9000INVLData.templateA.itNameTwo }),
            //     ...(ETI_9000INVLData.templateA.itIPTwo && { itIPTwo: ETI_9000INVLData.templateA.itIPTwo }),
            //     ...(ETI_9000INVLData.templateA.itGatewayTwo && { itGatewayTwo: ETI_9000INVLData.templateA.itGatewayTwo }),
            //     ...(ETI_9000INVLData.templateA.itSubnetTwo && { itSubnetTwo: ETI_9000INVLData.templateA.itSubnetTwo }),
            //     ...(ETI_9000INVLData.templateA.itDNSTwo && { itDNSTwo: ETI_9000INVLData.templateA.itDNSTwo }),
            //     ...(ETI_9000INVLData.templateA.itSMTPTwo && { itSMTPTwo: ETI_9000INVLData.templateA.itSMTPTwo }),
            //     ...(ETI_9000INVLData.templateA.itNameThree && { itNameThree: ETI_9000INVLData.templateA.itNameThree }),
            //     ...(ETI_9000INVLData.templateA.itIPThree && { itIPThree: ETI_9000INVLData.templateA.itIPThree }),
            //     ...(ETI_9000INVLData.templateA.itGatewayThree && { itGatewayThree: ETI_9000INVLData.templateA.itGatewayThree }),
            //     ...(ETI_9000INVLData.templateA.itSubnetThree && { itSubnetThree: ETI_9000INVLData.templateA.itSubnetThree }),
            //     ...(ETI_9000INVLData.templateA.itDNSThree && { itDNSThree: ETI_9000INVLData.templateA.itDNSThree }),
            //     ...(ETI_9000INVLData.templateA.itSMTPThree && { itSMTPThree: ETI_9000INVLData.templateA.itSMTPThree }),
            //     ...(ETI_9000INVLData.templateA.itAdditionalNotes && { itAdditionalNotes: ETI_9000INVLData.templateA.itAdditionalNotes }),
            //     ...(ETI_9000INVLData.templateA.piuDistance && { piuDistance: ETI_9000INVLData.templateA.piuDistance }),
            //     ...(ETI_9000INVLData.templateA.switchDistance && { switchDistance: ETI_9000INVLData.templateA.switchDistance }),
            //     ...(ETI_9000INVLData.templateA.ampPickup && { ampPickup: ETI_9000INVLData.templateA.ampPickup }),
            //     ...(ETI_9000INVLData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_9000INVLData.templateA.fromAirTakeUpDistance }),
            //     ...(ETI_9000INVLData.templateA.specialControllerOptions && { specialControllerOptions: ETI_9000INVLData.templateA.specialControllerOptions })
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
