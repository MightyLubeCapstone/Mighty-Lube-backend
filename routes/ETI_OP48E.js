const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_OP48E = require("../models/ETI_OP48E");
const templateB = require("../models/templateB");


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

            // monitorData: new templateB({
            //     existingMonitor: ETI_OP48EData.templateB.existingMonitor,
            //     newMonitor: ETI_OP48EData.templateB.newMonitor,
            //     ...(ETI_OP48EData.templateB.dcuStatus && { dcuStatus: ETI_OP48EData.templateB.dcuStatus }),
            //     ...(ETI_OP48EData.templateB.dcuNum && { dcuNum: ETI_OP48EData.templateB.dcuNum }),
            //     ...(ETI_OP48EData.templateB.existingWindows && { existingWindows: ETI_OP48EData.templateB.existingWindows }),
            //     ...(ETI_OP48EData.templateB.existingHeadUnit && { existingHeadUnit: ETI_OP48EData.templateB.existingHeadUnit }),
            //     ...(ETI_OP48EData.templateB.existingDCU && { existingDCU: ETI_OP48EData.templateB.existingDCU }),
            //     ...(ETI_OP48EData.templateB.existingPowerInterface && { existingPowerInterface: ETI_OP48EData.templateB.existingPowerInterface }),
            //     ...(ETI_OP48EData.templateB.newReservoir && { newReservoir: ETI_OP48EData.templateB.newReservoir }),
            //     ...(ETI_OP48EData.templateB.reservoirSize && { reservoirSize: ETI_OP48EData.templateB.reservoirSize }),
            //     ...(ETI_OP48EData.templateB.otherReservoirSize && { otherReservoirSize: ETI_OP48EData.templateB.otherReservoirSize }),
            //     ...(ETI_OP48EData.templateB.newReservoirNum && { newReservoirNum: ETI_OP48EData.templateB.newReservoirNum }),
            //     ...(ETI_OP48EData.templateB.typeMonitor && { typeMonitor: ETI_OP48EData.templateB.typeMonitor }),
            //     ...(ETI_OP48EData.templateB.driveMotorAmp && { driveMotorAmp: ETI_OP48EData.templateB.driveMotorAmp }),
            //     ...(ETI_OP48EData.templateB.driveMotorAmpNum && { driveMotorAmpNum: ETI_OP48EData.templateB.driveMotorAmpNum }),
            //     ...(ETI_OP48EData.templateB.driveTakeUpAir && { driveTakeUpAir: ETI_OP48EData.templateB.driveTakeUpAir }),
            //     ...(ETI_OP48EData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_OP48EData.templateB.driveTakeUpAirNum }),
            //     ...(ETI_OP48EData.templateB.takeUpDistance && { takeUpDistance: ETI_OP48EData.templateB.takeUpDistance }),
            //     ...(ETI_OP48EData.templateB.takeUpDistanceNum && { takeUpDistanceNum: ETI_OP48EData.templateB.takeUpDistanceNum }),
            //     ...(ETI_OP48EData.templateB.driveTemp && { driveTemp: ETI_OP48EData.templateB.driveTemp }),
            //     ...(ETI_OP48EData.templateB.driveTempNum && { driveTempNum: ETI_OP48EData.templateB.driveTempNum }),
            //     ...(ETI_OP48EData.templateB.driveVibration && { driveVibration: ETI_OP48EData.templateB.driveVibration }),
            //     ...(ETI_OP48EData.templateB.driveVibrationNum && { driveVibrationNum: ETI_OP48EData.templateB.driveVibrationNum }),
            //     ...(ETI_OP48EData.templateB.dogPitch && { dogPitch: ETI_OP48EData.templateB.dogPitch }),
            //     ...(ETI_OP48EData.templateB.dogPitchNum && { dogPitchNum: ETI_OP48EData.templateB.dogPitchNum }),
            //     ...(ETI_OP48EData.templateB.paintMarker && { paintMarker: ETI_OP48EData.templateB.paintMarker }),
            //     ...(ETI_OP48EData.templateB.paintMarkerNum && { paintMarkerNum: ETI_OP48EData.templateB.paintMarkerNum }),
            //     ...(ETI_OP48EData.templateB.chainVision && { chainVision: ETI_OP48EData.templateB.chainVision }),
            //     ...(ETI_OP48EData.templateB.lubeVision && { lubeVision: ETI_OP48EData.templateB.lubeVision }),
            //     ...(ETI_OP48EData.templateB.trolleyVision && { trolleyVision: ETI_OP48EData.templateB.trolleyVision }),
            //     ...(ETI_OP48EData.templateB.trolleyDetect && { trolleyDetect: ETI_OP48EData.templateB.trolleyDetect }),
            //     ...(ETI_OP48EData.templateB.omniView && { omniView: ETI_OP48EData.templateB.omniView }),
            //     ...(ETI_OP48EData.templateB.dcuUpgradeNum && { dcuUpgradeNum: ETI_OP48EData.templateB.dcuUpgradeNum }),
            //     ...(ETI_OP48EData.templateB.itNameOne && { itNameOne: ETI_OP48EData.templateB.itNameOne }),
            //     ...(ETI_OP48EData.templateB.itIPOne && { itIPOne: ETI_OP48EData.templateB.itIPOne }),
            //     ...(ETI_OP48EData.templateB.itGatewayOne && { itGatewayOne: ETI_OP48EData.templateB.itGatewayOne }),
            //     ...(ETI_OP48EData.templateB.itSubnetOne && { itSubnetOne: ETI_OP48EData.templateB.itSubnetOne }),
            //     ...(ETI_OP48EData.templateB.itDNSOne && { itDNSOne: ETI_OP48EData.templateB.itDNSOne }),
            //     ...(ETI_OP48EData.templateB.itSMTPOne && { itSMTPOne: ETI_OP48EData.templateB.itSMTPOne }),
            //     ...(ETI_OP48EData.templateB.itNameTwo && { itNameTwo: ETI_OP48EData.templateB.itNameTwo }),
            //     ...(ETI_OP48EData.templateB.itIPTwo && { itIPTwo: ETI_OP48EData.templateB.itIPTwo }),
            //     ...(ETI_OP48EData.templateB.itGatewayTwo && { itGatewayTwo: ETI_OP48EData.templateB.itGatewayTwo }),
            //     ...(ETI_OP48EData.templateB.itSubnetTwo && { itSubnetTwo: ETI_OP48EData.templateB.itSubnetTwo }),
            //     ...(ETI_OP48EData.templateB.itDNSTwo && { itDNSTwo: ETI_OP48EData.templateB.itDNSTwo }),
            //     ...(ETI_OP48EData.templateB.itSMTPTwo && { itSMTPTwo: ETI_OP48EData.templateB.itSMTPTwo }),
            //     ...(ETI_OP48EData.templateB.itNameThree && { itNameThree: ETI_OP48EData.templateB.itNameThree }),
            //     ...(ETI_OP48EData.templateB.itIPThree && { itIPThree: ETI_OP48EData.templateB.itIPThree }),
            //     ...(ETI_OP48EData.templateB.itGatewayThree && { itGatewayThree: ETI_OP48EData.templateB.itGatewayThree }),
            //     ...(ETI_OP48EData.templateB.itSubnetThree && { itSubnetThree: ETI_OP48EData.templateB.itSubnetThree }),
            //     ...(ETI_OP48EData.templateB.itDNSThree && { itDNSThree: ETI_OP48EData.templateB.itDNSThree }),
            //     ...(ETI_OP48EData.templateB.itSMTPThree && { itSMTPThree: ETI_OP48EData.templateB.itSMTPThree }),
            //     ...(ETI_OP48EData.templateB.itAdditionalNotes && { itAdditionalNotes: ETI_OP48EData.templateB.itAdditionalNotes }),
            //     ...(ETI_OP48EData.templateB.piuDistance && { piuDistance: ETI_OP48EData.templateB.piuDistance }),
            //     ...(ETI_OP48EData.templateB.switchDistance && { switchDistance: ETI_OP48EData.templateB.switchDistance }),
            //     ...(ETI_OP48EData.templateB.ampPickup && { ampPickup: ETI_OP48EData.templateB.ampPickup }),
            //     ...(ETI_OP48EData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_OP48EData.templateB.fromAirTakeUpDistance }),
            //     ...(ETI_OP48EData.templateB.specialControllerOptions && { specialControllerOptions: ETI_OP48EData.templateB.specialControllerOptions })
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
