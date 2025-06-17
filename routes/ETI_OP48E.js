const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_OP48E = require("../models/ETI_OP48E");
const templateA = require("../models/templateA");


const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETI_OP48EData, numRequested } = req.body;
        const order = new ETI_OP48E({
            ...(ETI_OP48EData.chainSize && { chainSize: ETI_OP48EData.chainSize }),
            industrialChainManufacturer: ETI_OP48EData.industrialChainManufacturer,
            ...(ETI_OP48EData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_OP48EData.otherIndustrialChainManufacturer }),
            ...(ETI_OP48EData.conveyorLength && { conveyorLength: ETI_OP48EData.conveyorLength }),
            ...(ETI_OP48EData.conveyorLengthUnit && { conveyorLengthUnit: ETI_OP48EData.conveyorLengthUnit }),
            ...(ETI_OP48EData.conveyorSpeed && { conveyorSpeed: ETI_OP48EData.conveyorSpeed }),
            ...(ETI_OP48EData.conveyorSpeedUnit && { conveyorSpeedUnit: ETI_OP48EData.conveyorSpeedUnit }),
            ...(ETI_OP48EData.conveyorIndex && { conveyorIndex: ETI_OP48EData.conveyorIndex }),
            ...(ETI_OP48EData.travelDirection && { travelDirection: ETI_OP48EData.travelDirection }),
            appEnviroment: ETI_OP48EData.appEnviroment,
            ...(ETI_OP48EData.ovenStatus && { ovenStatus: ETI_OP48EData.ovenStatus }),
            ...(ETI_OP48EData.ovenTemp && { ovenTemp: ETI_OP48EData.ovenTemp }),
            ...(ETI_OP48EData.surroundingTemp && { surroundingTemp: ETI_OP48EData.surroundingTemp }),
            ...(ETI_OP48EData.conveyorLoaded && { conveyorLoaded: ETI_OP48EData.conveyorLoaded }),
            ...(ETI_OP48EData.conveyorSwing && { conveyorSwing: ETI_OP48EData.conveyorSwing }),
            ...(ETI_OP48EData.operatingVoltage && { operatingVoltage: ETI_OP48EData.operatingVoltage }),

            // monitorData: new templateA({
            //     existingMonitor: ETI_OP48EData.templateA.existingMonitor,
            //     newMonitor: ETI_OP48EData.templateA.newMonitor,
            //     ...(ETI_OP48EData.templateA.dcuStatus && { dcuStatus: ETI_OP48EData.templateA.dcuStatus }),
            //     ...(ETI_OP48EData.templateA.dcuNum && { dcuNum: ETI_OP48EData.templateA.dcuNum }),
            //     ...(ETI_OP48EData.templateA.existingWindows && { existingWindows: ETI_OP48EData.templateA.existingWindows }),
            //     ...(ETI_OP48EData.templateA.existingHeadUnit && { existingHeadUnit: ETI_OP48EData.templateA.existingHeadUnit }),
            //     ...(ETI_OP48EData.templateA.existingDCU && { existingDCU: ETI_OP48EData.templateA.existingDCU }),
            //     ...(ETI_OP48EData.templateA.existingPowerInterface && { existingPowerInterface: ETI_OP48EData.templateA.existingPowerInterface }),
            //     ...(ETI_OP48EData.templateA.newReservoir && { newReservoir: ETI_OP48EData.templateA.newReservoir }),
            //     ...(ETI_OP48EData.templateA.reservoirSize && { reservoirSize: ETI_OP48EData.templateA.reservoirSize }),
            //     ...(ETI_OP48EData.templateA.otherReservoirSize && { otherReservoirSize: ETI_OP48EData.templateA.otherReservoirSize }),
            //     ...(ETI_OP48EData.templateA.newReservoirNum && { newReservoirNum: ETI_OP48EData.templateA.newReservoirNum }),
            //     ...(ETI_OP48EData.templateA.typeMonitor && { typeMonitor: ETI_OP48EData.templateA.typeMonitor }),
            //     ...(ETI_OP48EData.templateA.driveMotorAmp && { driveMotorAmp: ETI_OP48EData.templateA.driveMotorAmp }),
            //     ...(ETI_OP48EData.templateA.driveMotorAmpNum && { driveMotorAmpNum: ETI_OP48EData.templateA.driveMotorAmpNum }),
            //     ...(ETI_OP48EData.templateA.driveTakeUpAir && { driveTakeUpAir: ETI_OP48EData.templateA.driveTakeUpAir }),
            //     ...(ETI_OP48EData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_OP48EData.templateA.driveTakeUpAirNum }),
            //     ...(ETI_OP48EData.templateA.takeUpDistance && { takeUpDistance: ETI_OP48EData.templateA.takeUpDistance }),
            //     ...(ETI_OP48EData.templateA.takeUpDistanceNum && { takeUpDistanceNum: ETI_OP48EData.templateA.takeUpDistanceNum }),
            //     ...(ETI_OP48EData.templateA.driveTemp && { driveTemp: ETI_OP48EData.templateA.driveTemp }),
            //     ...(ETI_OP48EData.templateA.driveTempNum && { driveTempNum: ETI_OP48EData.templateA.driveTempNum }),
            //     ...(ETI_OP48EData.templateA.driveVibration && { driveVibration: ETI_OP48EData.templateA.driveVibration }),
            //     ...(ETI_OP48EData.templateA.driveVibrationNum && { driveVibrationNum: ETI_OP48EData.templateA.driveVibrationNum }),
            //     ...(ETI_OP48EData.templateA.dogPitch && { dogPitch: ETI_OP48EData.templateA.dogPitch }),
            //     ...(ETI_OP48EData.templateA.dogPitchNum && { dogPitchNum: ETI_OP48EData.templateA.dogPitchNum }),
            //     ...(ETI_OP48EData.templateA.paintMarker && { paintMarker: ETI_OP48EData.templateA.paintMarker }),
            //     ...(ETI_OP48EData.templateA.paintMarkerNum && { paintMarkerNum: ETI_OP48EData.templateA.paintMarkerNum }),
            //     ...(ETI_OP48EData.templateA.chainVision && { chainVision: ETI_OP48EData.templateA.chainVision }),
            //     ...(ETI_OP48EData.templateA.lubeVision && { lubeVision: ETI_OP48EData.templateA.lubeVision }),
            //     ...(ETI_OP48EData.templateA.trolleyVision && { trolleyVision: ETI_OP48EData.templateA.trolleyVision }),
            //     ...(ETI_OP48EData.templateA.trolleyDetect && { trolleyDetect: ETI_OP48EData.templateA.trolleyDetect }),
            //     ...(ETI_OP48EData.templateA.omniView && { omniView: ETI_OP48EData.templateA.omniView }),
            //     ...(ETI_OP48EData.templateA.dcuUpgradeNum && { dcuUpgradeNum: ETI_OP48EData.templateA.dcuUpgradeNum }),
            //     ...(ETI_OP48EData.templateA.itNameOne && { itNameOne: ETI_OP48EData.templateA.itNameOne }),
            //     ...(ETI_OP48EData.templateA.itIPOne && { itIPOne: ETI_OP48EData.templateA.itIPOne }),
            //     ...(ETI_OP48EData.templateA.itGatewayOne && { itGatewayOne: ETI_OP48EData.templateA.itGatewayOne }),
            //     ...(ETI_OP48EData.templateA.itSubnetOne && { itSubnetOne: ETI_OP48EData.templateA.itSubnetOne }),
            //     ...(ETI_OP48EData.templateA.itDNSOne && { itDNSOne: ETI_OP48EData.templateA.itDNSOne }),
            //     ...(ETI_OP48EData.templateA.itSMTPOne && { itSMTPOne: ETI_OP48EData.templateA.itSMTPOne }),
            //     ...(ETI_OP48EData.templateA.itNameTwo && { itNameTwo: ETI_OP48EData.templateA.itNameTwo }),
            //     ...(ETI_OP48EData.templateA.itIPTwo && { itIPTwo: ETI_OP48EData.templateA.itIPTwo }),
            //     ...(ETI_OP48EData.templateA.itGatewayTwo && { itGatewayTwo: ETI_OP48EData.templateA.itGatewayTwo }),
            //     ...(ETI_OP48EData.templateA.itSubnetTwo && { itSubnetTwo: ETI_OP48EData.templateA.itSubnetTwo }),
            //     ...(ETI_OP48EData.templateA.itDNSTwo && { itDNSTwo: ETI_OP48EData.templateA.itDNSTwo }),
            //     ...(ETI_OP48EData.templateA.itSMTPTwo && { itSMTPTwo: ETI_OP48EData.templateA.itSMTPTwo }),
            //     ...(ETI_OP48EData.templateA.itNameThree && { itNameThree: ETI_OP48EData.templateA.itNameThree }),
            //     ...(ETI_OP48EData.templateA.itIPThree && { itIPThree: ETI_OP48EData.templateA.itIPThree }),
            //     ...(ETI_OP48EData.templateA.itGatewayThree && { itGatewayThree: ETI_OP48EData.templateA.itGatewayThree }),
            //     ...(ETI_OP48EData.templateA.itSubnetThree && { itSubnetThree: ETI_OP48EData.templateA.itSubnetThree }),
            //     ...(ETI_OP48EData.templateA.itDNSThree && { itDNSThree: ETI_OP48EData.templateA.itDNSThree }),
            //     ...(ETI_OP48EData.templateA.itSMTPThree && { itSMTPThree: ETI_OP48EData.templateA.itSMTPThree }),
            //     ...(ETI_OP48EData.templateA.itAdditionalNotes && { itAdditionalNotes: ETI_OP48EData.templateA.itAdditionalNotes }),
            //     ...(ETI_OP48EData.templateA.piuDistance && { piuDistance: ETI_OP48EData.templateA.piuDistance }),
            //     ...(ETI_OP48EData.templateA.switchDistance && { switchDistance: ETI_OP48EData.templateA.switchDistance }),
            //     ...(ETI_OP48EData.templateA.ampPickup && { ampPickup: ETI_OP48EData.templateA.ampPickup }),
            //     ...(ETI_OP48EData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_OP48EData.templateA.fromAirTakeUpDistance }),
            //     ...(ETI_OP48EData.templateA.specialControllerOptions && { specialControllerOptions: ETI_OP48EData.templateA.specialControllerOptions })
            // }),
            
            ...(ETI_OP48EData.freeCarrierSystem && { freeCarrierSystem: ETI_OP48EData.freeCarrierSystem }),
            ...(ETI_OP48EData.catDriveStatus && { catDriveStatus: ETI_OP48EData.catDriveStatus }),
            ...(ETI_OP48EData.catDriveNum && { catDriveNum: ETI_OP48EData.catDriveNum }),
            ...(ETI_OP48EData.externalLubeStatus && { externalLubeStatus: ETI_OP48EData.externalLubeStatus }),
            ...(ETI_OP48EData.lubeBrand && { lubeBrand: ETI_OP48EData.lubeBrand }),
            ...(ETI_OP48EData.lubeType && { lubeType: ETI_OP48EData.lubeType }),
            ...(ETI_OP48EData.lubeViscosity && { lubeViscosity: ETI_OP48EData.lubeViscosity }),
            ...(ETI_OP48EData.sideLubeStatus && { sideLubeStatus: ETI_OP48EData.sideLubeStatus }),
            ...(ETI_OP48EData.chainMaster && { chainMaster: ETI_OP48EData.chainMaster }),
            ...(ETI_OP48EData.timerStatus && { timerStatus: ETI_OP48EData.timerStatus }),
            ...(ETI_OP48EData.electricStatus && { electricStatus: ETI_OP48EData.electricStatus }),
            ...(ETI_OP48EData.pneumaticStatus && { pneumaticStatus: ETI_OP48EData.pneumaticStatus }),
            ...(ETI_OP48EData.mightyLubeMonitoring && { mightyLubeMonitoring: ETI_OP48EData.mightyLubeMonitoring }),
            ...(ETI_OP48EData.plcConnection && { plcConnection: ETI_OP48EData.plcConnection }),
            ...(ETI_OP48EData.otherControllerInfo && { otherControllerInfo: ETI_OP48EData.otherControllerInfo }),
            ...(ETI_OP48EData.enclosedUnitType && { enclosedUnitType: ETI_OP48EData.enclosedUnitType }),
            ...(ETI_OP48EData.enclosedTrackB && { enclosedTrackB: ETI_OP48EData.enclosedTrackB }),
            ...(ETI_OP48EData.enclosedTrackG && { enclosedTrackG: ETI_OP48EData.enclosedTrackG }),
            ...(ETI_OP48EData.enclosedTrackH && { enclosedTrackH: ETI_OP48EData.enclosedTrackH }),
            ...(ETI_OP48EData.enclosedTrackS && { enclosedTrackS: ETI_OP48EData.enclosedTrackS }),
            ...(ETI_OP48EData.enclosedTrackK2 && { enclosedTrackK2: ETI_OP48EData.enclosedTrackK2 }),
            ...(ETI_OP48EData.enclosedTrackL2 && { enclosedTrackL2: ETI_OP48EData.enclosedTrackL2 }),
            ...(ETI_OP48EData.enclosedTrackM2 && { enclosedTrackM2: ETI_OP48EData.enclosedTrackM2 }),
            ...(ETI_OP48EData.enclosedTrackN2 && { enclosedTrackN2: ETI_OP48EData.enclosedTrackN2 }),
            ...(ETI_OP48EData.enclosedTrackS2 && { enclosedTrackS2: ETI_OP48EData.enclosedTrackS2 })
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETI_OP48E"
        });
        await req.user.save();

        return res.status(200).json({ message: "ETI_OP48E entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
