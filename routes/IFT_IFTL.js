// routes/IFT_IFTL.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IFT_IFTL = require("../models/IFT_IFTL");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { IFT_IFTLData, numRequested } = req.body;

        const order = new IFT_IFTL({
            ...(IFT_IFTLData.conveyorName && { conveyorName: IFT_IFTLData.conveyorName }),
            ...(IFT_IFTLData.chainSize && { chainSize: IFT_IFTLData.chainSize }),
            ...(IFT_IFTLData.industrialChainManufacturer && { industrialChainManufacturer: IFT_IFTLData.industrialChainManufacturer }),
            ...(IFT_IFTLData.otherChainManufacturer && { otherChainManufacturer: IFT_IFTLData.otherChainManufacturer }),
            ...(IFT_IFTLData.speedUnit && { speedUnit: IFT_IFTLData.speedUnit }),
            ...(IFT_IFTLData.conveyorIndex && { conveyorIndex: IFT_IFTLData.conveyorIndex }),
            ...(IFT_IFTLData.travelDirection && { travelDirection: IFT_IFTLData.travelDirection }),
            // appEnviroment is required
            appEnviroment: IFT_IFTLData.appEnviroment,
            ...(IFT_IFTLData.ovenStatus && { ovenStatus: IFT_IFTLData.ovenStatus }),
            ...(IFT_IFTLData.ovenTemp && { ovenTemp: IFT_IFTLData.ovenTemp }),

            // monitorData: new templateA({
            //     existingMonitor: IFT_IFTLData.templateA.existingMonitor,
            //     newMonitor: IFT_IFTLData.templateA.newMonitor,
            //     ...(IFT_IFTLData.templateA.dcuStatus && { dcuStatus: IFT_IFTLData.templateA.dcuStatus }),
            //     ...(IFT_IFTLData.templateA.dcuNum && { dcuNum: IFT_IFTLData.templateA.dcuNum }),
            //     ...(IFT_IFTLData.templateA.existingWindows && { existingWindows: IFT_IFTLData.templateA.existingWindows }),
            //     ...(IFT_IFTLData.templateA.existingHeadUnit && { existingHeadUnit: IFT_IFTLData.templateA.existingHeadUnit }),
            //     ...(IFT_IFTLData.templateA.existingDCU && { existingDCU: IFT_IFTLData.templateA.existingDCU }),
            //     ...(IFT_IFTLData.templateA.existingPowerInterface && { existingPowerInterface: IFT_IFTLData.templateA.existingPowerInterface }),
            //     ...(IFT_IFTLData.templateA.newReservoir && { newReservoir: IFT_IFTLData.templateA.newReservoir }),
            //     ...(IFT_IFTLData.templateA.reservoirSize && { reservoirSize: IFT_IFTLData.templateA.reservoirSize }),
            //     ...(IFT_IFTLData.templateA.otherReservoirSize && { otherReservoirSize: IFT_IFTLData.templateA.otherReservoirSize }),
            //     ...(IFT_IFTLData.templateA.newReservoirNum && { newReservoirNum: IFT_IFTLData.templateA.newReservoirNum }),
            //     ...(IFT_IFTLData.templateA.typeMonitor && { typeMonitor: IFT_IFTLData.templateA.typeMonitor }),
            //     ...(IFT_IFTLData.templateA.driveMotorAmp && { driveMotorAmp: IFT_IFTLData.templateA.driveMotorAmp }),
            //     ...(IFT_IFTLData.templateA.driveMotorAmpNum && { driveMotorAmpNum: IFT_IFTLData.templateA.driveMotorAmpNum }),
            //     ...(IFT_IFTLData.templateA.driveTakeUpAir && { driveTakeUpAir: IFT_IFTLData.templateA.driveTakeUpAir }),
            //     ...(IFT_IFTLData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: IFT_IFTLData.templateA.driveTakeUpAirNum }),
            //     ...(IFT_IFTLData.templateA.takeUpDistance && { takeUpDistance: IFT_IFTLData.templateA.takeUpDistance }),
            //     ...(IFT_IFTLData.templateA.takeUpDistanceNum && { takeUpDistanceNum: IFT_IFTLData.templateA.takeUpDistanceNum }),
            //     ...(IFT_IFTLData.templateA.driveTemp && { driveTemp: IFT_IFTLData.templateA.driveTemp }),
            //     ...(IFT_IFTLData.templateA.driveTempNum && { driveTempNum: IFT_IFTLData.templateA.driveTempNum }),
            //     ...(IFT_IFTLData.templateA.driveVibration && { driveVibration: IFT_IFTLData.templateA.driveVibration }),
            //     ...(IFT_IFTLData.templateA.driveVibrationNum && { driveVibrationNum: IFT_IFTLData.templateA.driveVibrationNum }),
            //     ...(IFT_IFTLData.templateA.dogPitch && { dogPitch: IFT_IFTLData.templateA.dogPitch }),
            //     ...(IFT_IFTLData.templateA.dogPitchNum && { dogPitchNum: IFT_IFTLData.templateA.dogPitchNum }),
            //     ...(IFT_IFTLData.templateA.paintMarker && { paintMarker: IFT_IFTLData.templateA.paintMarker }),
            //     ...(IFT_IFTLData.templateA.paintMarkerNum && { paintMarkerNum: IFT_IFTLData.templateA.paintMarkerNum }),
            //     ...(IFT_IFTLData.templateA.chainVision && { chainVision: IFT_IFTLData.templateA.chainVision }),
            //     ...(IFT_IFTLData.templateA.lubeVision && { lubeVision: IFT_IFTLData.templateA.lubeVision }),
            //     ...(IFT_IFTLData.templateA.trolleyVision && { trolleyVision: IFT_IFTLData.templateA.trolleyVision }),
            //     ...(IFT_IFTLData.templateA.trolleyDetect && { trolleyDetect: IFT_IFTLData.templateA.trolleyDetect }),
            //     ...(IFT_IFTLData.templateA.omniView && { omniView: IFT_IFTLData.templateA.omniView }),
            //     ...(IFT_IFTLData.templateA.dcuUpgradeNum && { dcuUpgradeNum: IFT_IFTLData.templateA.dcuUpgradeNum }),
            //     ...(IFT_IFTLData.templateA.itNameOne && { itNameOne: IFT_IFTLData.templateA.itNameOne }),
            //     ...(IFT_IFTLData.templateA.itIPOne && { itIPOne: IFT_IFTLData.templateA.itIPOne }),
            //     ...(IFT_IFTLData.templateA.itGatewayOne && { itGatewayOne: IFT_IFTLData.templateA.itGatewayOne }),
            //     ...(IFT_IFTLData.templateA.itSubnetOne && { itSubnetOne: IFT_IFTLData.templateA.itSubnetOne }),
            //     ...(IFT_IFTLData.templateA.itDNSOne && { itDNSOne: IFT_IFTLData.templateA.itDNSOne }),
            //     ...(IFT_IFTLData.templateA.itSMTPOne && { itSMTPOne: IFT_IFTLData.templateA.itSMTPOne }),
            //     ...(IFT_IFTLData.templateA.itNameTwo && { itNameTwo: IFT_IFTLData.templateA.itNameTwo }),
            //     ...(IFT_IFTLData.templateA.itIPTwo && { itIPTwo: IFT_IFTLData.templateA.itIPTwo }),
            //     ...(IFT_IFTLData.templateA.itGatewayTwo && { itGatewayTwo: IFT_IFTLData.templateA.itGatewayTwo }),
            //     ...(IFT_IFTLData.templateA.itSubnetTwo && { itSubnetTwo: IFT_IFTLData.templateA.itSubnetTwo }),
            //     ...(IFT_IFTLData.templateA.itDNSTwo && { itDNSTwo: IFT_IFTLData.templateA.itDNSTwo }),
            //     ...(IFT_IFTLData.templateA.itSMTPTwo && { itSMTPTwo: IFT_IFTLData.templateA.itSMTPTwo }),
            //     ...(IFT_IFTLData.templateA.itNameThree && { itNameThree: IFT_IFTLData.templateA.itNameThree }),
            //     ...(IFT_IFTLData.templateA.itIPThree && { itIPThree: IFT_IFTLData.templateA.itIPThree }),
            //     ...(IFT_IFTLData.templateA.itGatewayThree && { itGatewayThree: IFT_IFTLData.templateA.itGatewayThree }),
            //     ...(IFT_IFTLData.templateA.itSubnetThree && { itSubnetThree: IFT_IFTLData.templateA.itSubnetThree }),
            //     ...(IFT_IFTLData.templateA.itDNSThree && { itDNSThree: IFT_IFTLData.templateA.itDNSThree }),
            //     ...(IFT_IFTLData.templateA.itSMTPThree && { itSMTPThree: IFT_IFTLData.templateA.itSMTPThree }),
            //     ...(IFT_IFTLData.templateA.itAdditionalNotes && { itAdditionalNotes: IFT_IFTLData.templateA.itAdditionalNotes }),
            //     ...(IFT_IFTLData.templateA.piuDistance && { piuDistance: IFT_IFTLData.templateA.piuDistance }),
            //     ...(IFT_IFTLData.templateA.switchDistance && { switchDistance: IFT_IFTLData.templateA.switchDistance }),
            //     ...(IFT_IFTLData.templateA.ampPickup && { ampPickup: IFT_IFTLData.templateA.ampPickup }),
            //     ...(IFT_IFTLData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: IFT_IFTLData.templateA.fromAirTakeUpDistance }),
            //     ...(IFT_IFTLData.templateA.specialControllerOptions && { specialControllerOptions: IFT_IFTLData.templateA.specialControllerOptions })
            // }),            
            ...(IFT_IFTLData.surroundingTemp && { surroundingTemp: IFT_IFTLData.surroundingTemp }),
            ...(IFT_IFTLData.conveyorLoaded && { conveyorLoaded: IFT_IFTLData.conveyorLoaded }),
            ...(IFT_IFTLData.conveyorSwing && { conveyorSwing: IFT_IFTLData.conveyorSwing }),
            ...(IFT_IFTLData.strandStatus && { strandStatus: IFT_IFTLData.strandStatus }),
            ...(IFT_IFTLData.plantLayout && { plantLayout: IFT_IFTLData.plantLayout }),
            ...(IFT_IFTLData.requiredPics && { requiredPics: IFT_IFTLData.requiredPics }),
            ...(IFT_IFTLData.operatingVoltage && { operatingVoltage: IFT_IFTLData.operatingVoltage }),
            ...(IFT_IFTLData.wheelOpenType && { wheelOpenType: IFT_IFTLData.wheelOpenType }),
            ...(IFT_IFTLData.wheelClosedType && { wheelClosedType: IFT_IFTLData.wheelClosedType }),
            ...(IFT_IFTLData.sliderPlateStatus && { sliderPlateStatus: IFT_IFTLData.sliderPlateStatus }),
            ...(IFT_IFTLData.freeWheelStatus && { freeWheelStatus: IFT_IFTLData.freeWheelStatus }),
            ...(IFT_IFTLData.guideRollerStatus && { guideRollerStatus: IFT_IFTLData.guideRollerStatus }),
            ...(IFT_IFTLData.openRaceStyle && { openRaceStyle: IFT_IFTLData.openRaceStyle }),
            ...(IFT_IFTLData.closedRaceStyle && { closedRaceStyle: IFT_IFTLData.closedRaceStyle }),
            ...(IFT_IFTLData.actuatorStatus && { actuatorStatus: IFT_IFTLData.actuatorStatus }),
            ...(IFT_IFTLData.pivotStatus && { pivotStatus: IFT_IFTLData.pivotStatus }),
            ...(IFT_IFTLData.kingPinStatus && { kingPinStatus: IFT_IFTLData.kingPinStatus }),
            ...(IFT_IFTLData.rollerChainStatus && { rollerChainStatus: IFT_IFTLData.rollerChainStatus }),
            ...(IFT_IFTLData.brushingsStatus && { brushingsStatus: IFT_IFTLData.brushingsStatus }),
            ...(IFT_IFTLData.riderPlatesStatus && { riderPlatesStatus: IFT_IFTLData.riderPlatesStatus }),
            ...(IFT_IFTLData.outboardStatus && { outboardStatus: IFT_IFTLData.outboardStatus }),
            ...(IFT_IFTLData.catDriveStatus && { catDriveStatus: IFT_IFTLData.catDriveStatus }),
            ...(IFT_IFTLData.catDriveNum && { catDriveNum: IFT_IFTLData.catDriveNum }),
            ...(IFT_IFTLData.railLubeStatus && { railLubeStatus: IFT_IFTLData.railLubeStatus }),
            ...(IFT_IFTLData.externalLubeStatus && { externalLubeStatus: IFT_IFTLData.externalLubeStatus }),
            ...(IFT_IFTLData.lubeBrand && { lubeBrand: IFT_IFTLData.lubeBrand }),
            ...(IFT_IFTLData.lubeType && { lubeType: IFT_IFTLData.lubeType }),
            ...(IFT_IFTLData.lubeViscosity && { lubeViscosity: IFT_IFTLData.lubeViscosity }),
            ...(IFT_IFTLData.sideLubeStatus && { sideLubeStatus: IFT_IFTLData.sideLubeStatus }),
            ...(IFT_IFTLData.topLubeStatus && { topLubeStatus: IFT_IFTLData.topLubeStatus }),
            ...(IFT_IFTLData.chainCleanStatus && { chainCleanStatus: IFT_IFTLData.chainCleanStatus }),
            ...(IFT_IFTLData.washdownStatus && { washdownStatus: IFT_IFTLData.washdownStatus }),
            ...(IFT_IFTLData.iftUnitType && { iftUnitType: IFT_IFTLData.iftUnitType }),
            ...(IFT_IFTLData.iftPowerA && { iftPowerA: IFT_IFTLData.iftPowerA }),
            ...(IFT_IFTLData.iftPowerB && { iftPowerB: IFT_IFTLData.iftPowerB }),
            ...(IFT_IFTLData.iftPowerG && { iftPowerG: IFT_IFTLData.iftPowerG }),
            ...(IFT_IFTLData.iftPowerH && { iftPowerH: IFT_IFTLData.iftPowerH }),
            ...(IFT_IFTLData.iftPowerJ && { iftPowerJ: IFT_IFTLData.iftPowerJ }),
            ...(IFT_IFTLData.iftPowerS1 && { iftPowerS1: IFT_IFTLData.iftPowerS1 }),
            ...(IFT_IFTLData.iftPowerT1 && { iftPowerT1: IFT_IFTLData.iftPowerT1 }),
            ...(IFT_IFTLData.iftPowerU1 && { iftPowerU1: IFT_IFTLData.iftPowerU1 }),
            ...(IFT_IFTLData.iftPowerW1 && { iftPowerW1: IFT_IFTLData.iftPowerW1 }),
            ...(IFT_IFTLData.iftPowerX1 && { iftPowerX1: IFT_IFTLData.iftPowerX1 }),
        });

        req.user.cart.push({ 
            numRequested, 
            productConfigurationInfo: order, 
            productType: "IFT_IFTL" 
        });
        await req.user.save();

        return res.status(200).json({ message: "IFT_IFTL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
