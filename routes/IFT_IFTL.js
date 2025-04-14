// routes/IFT_IFTL.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IFT_IFTL = require("../models/IFT_IFTL");
const templateB = require("../models/templateB");

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

            // monitorData: new templateB({
            //     existingMonitor: IFT_IFTLData.templateB.existingMonitor,
            //     newMonitor: IFT_IFTLData.templateB.newMonitor,
            //     ...(IFT_IFTLData.templateB.dcuStatus && { dcuStatus: IFT_IFTLData.templateB.dcuStatus }),
            //     ...(IFT_IFTLData.templateB.dcuNum && { dcuNum: IFT_IFTLData.templateB.dcuNum }),
            //     ...(IFT_IFTLData.templateB.existingWindows && { existingWindows: IFT_IFTLData.templateB.existingWindows }),
            //     ...(IFT_IFTLData.templateB.existingHeadUnit && { existingHeadUnit: IFT_IFTLData.templateB.existingHeadUnit }),
            //     ...(IFT_IFTLData.templateB.existingDCU && { existingDCU: IFT_IFTLData.templateB.existingDCU }),
            //     ...(IFT_IFTLData.templateB.existingPowerInterface && { existingPowerInterface: IFT_IFTLData.templateB.existingPowerInterface }),
            //     ...(IFT_IFTLData.templateB.newReservoir && { newReservoir: IFT_IFTLData.templateB.newReservoir }),
            //     ...(IFT_IFTLData.templateB.reservoirSize && { reservoirSize: IFT_IFTLData.templateB.reservoirSize }),
            //     ...(IFT_IFTLData.templateB.otherReservoirSize && { otherReservoirSize: IFT_IFTLData.templateB.otherReservoirSize }),
            //     ...(IFT_IFTLData.templateB.newReservoirNum && { newReservoirNum: IFT_IFTLData.templateB.newReservoirNum }),
            //     ...(IFT_IFTLData.templateB.typeMonitor && { typeMonitor: IFT_IFTLData.templateB.typeMonitor }),
            //     ...(IFT_IFTLData.templateB.driveMotorAmp && { driveMotorAmp: IFT_IFTLData.templateB.driveMotorAmp }),
            //     ...(IFT_IFTLData.templateB.driveMotorAmpNum && { driveMotorAmpNum: IFT_IFTLData.templateB.driveMotorAmpNum }),
            //     ...(IFT_IFTLData.templateB.driveTakeUpAir && { driveTakeUpAir: IFT_IFTLData.templateB.driveTakeUpAir }),
            //     ...(IFT_IFTLData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: IFT_IFTLData.templateB.driveTakeUpAirNum }),
            //     ...(IFT_IFTLData.templateB.takeUpDistance && { takeUpDistance: IFT_IFTLData.templateB.takeUpDistance }),
            //     ...(IFT_IFTLData.templateB.takeUpDistanceNum && { takeUpDistanceNum: IFT_IFTLData.templateB.takeUpDistanceNum }),
            //     ...(IFT_IFTLData.templateB.driveTemp && { driveTemp: IFT_IFTLData.templateB.driveTemp }),
            //     ...(IFT_IFTLData.templateB.driveTempNum && { driveTempNum: IFT_IFTLData.templateB.driveTempNum }),
            //     ...(IFT_IFTLData.templateB.driveVibration && { driveVibration: IFT_IFTLData.templateB.driveVibration }),
            //     ...(IFT_IFTLData.templateB.driveVibrationNum && { driveVibrationNum: IFT_IFTLData.templateB.driveVibrationNum }),
            //     ...(IFT_IFTLData.templateB.dogPitch && { dogPitch: IFT_IFTLData.templateB.dogPitch }),
            //     ...(IFT_IFTLData.templateB.dogPitchNum && { dogPitchNum: IFT_IFTLData.templateB.dogPitchNum }),
            //     ...(IFT_IFTLData.templateB.paintMarker && { paintMarker: IFT_IFTLData.templateB.paintMarker }),
            //     ...(IFT_IFTLData.templateB.paintMarkerNum && { paintMarkerNum: IFT_IFTLData.templateB.paintMarkerNum }),
            //     ...(IFT_IFTLData.templateB.chainVision && { chainVision: IFT_IFTLData.templateB.chainVision }),
            //     ...(IFT_IFTLData.templateB.lubeVision && { lubeVision: IFT_IFTLData.templateB.lubeVision }),
            //     ...(IFT_IFTLData.templateB.trolleyVision && { trolleyVision: IFT_IFTLData.templateB.trolleyVision }),
            //     ...(IFT_IFTLData.templateB.trolleyDetect && { trolleyDetect: IFT_IFTLData.templateB.trolleyDetect }),
            //     ...(IFT_IFTLData.templateB.omniView && { omniView: IFT_IFTLData.templateB.omniView }),
            //     ...(IFT_IFTLData.templateB.dcuUpgradeNum && { dcuUpgradeNum: IFT_IFTLData.templateB.dcuUpgradeNum }),
            //     ...(IFT_IFTLData.templateB.itNameOne && { itNameOne: IFT_IFTLData.templateB.itNameOne }),
            //     ...(IFT_IFTLData.templateB.itIPOne && { itIPOne: IFT_IFTLData.templateB.itIPOne }),
            //     ...(IFT_IFTLData.templateB.itGatewayOne && { itGatewayOne: IFT_IFTLData.templateB.itGatewayOne }),
            //     ...(IFT_IFTLData.templateB.itSubnetOne && { itSubnetOne: IFT_IFTLData.templateB.itSubnetOne }),
            //     ...(IFT_IFTLData.templateB.itDNSOne && { itDNSOne: IFT_IFTLData.templateB.itDNSOne }),
            //     ...(IFT_IFTLData.templateB.itSMTPOne && { itSMTPOne: IFT_IFTLData.templateB.itSMTPOne }),
            //     ...(IFT_IFTLData.templateB.itNameTwo && { itNameTwo: IFT_IFTLData.templateB.itNameTwo }),
            //     ...(IFT_IFTLData.templateB.itIPTwo && { itIPTwo: IFT_IFTLData.templateB.itIPTwo }),
            //     ...(IFT_IFTLData.templateB.itGatewayTwo && { itGatewayTwo: IFT_IFTLData.templateB.itGatewayTwo }),
            //     ...(IFT_IFTLData.templateB.itSubnetTwo && { itSubnetTwo: IFT_IFTLData.templateB.itSubnetTwo }),
            //     ...(IFT_IFTLData.templateB.itDNSTwo && { itDNSTwo: IFT_IFTLData.templateB.itDNSTwo }),
            //     ...(IFT_IFTLData.templateB.itSMTPTwo && { itSMTPTwo: IFT_IFTLData.templateB.itSMTPTwo }),
            //     ...(IFT_IFTLData.templateB.itNameThree && { itNameThree: IFT_IFTLData.templateB.itNameThree }),
            //     ...(IFT_IFTLData.templateB.itIPThree && { itIPThree: IFT_IFTLData.templateB.itIPThree }),
            //     ...(IFT_IFTLData.templateB.itGatewayThree && { itGatewayThree: IFT_IFTLData.templateB.itGatewayThree }),
            //     ...(IFT_IFTLData.templateB.itSubnetThree && { itSubnetThree: IFT_IFTLData.templateB.itSubnetThree }),
            //     ...(IFT_IFTLData.templateB.itDNSThree && { itDNSThree: IFT_IFTLData.templateB.itDNSThree }),
            //     ...(IFT_IFTLData.templateB.itSMTPThree && { itSMTPThree: IFT_IFTLData.templateB.itSMTPThree }),
            //     ...(IFT_IFTLData.templateB.itAdditionalNotes && { itAdditionalNotes: IFT_IFTLData.templateB.itAdditionalNotes }),
            //     ...(IFT_IFTLData.templateB.piuDistance && { piuDistance: IFT_IFTLData.templateB.piuDistance }),
            //     ...(IFT_IFTLData.templateB.switchDistance && { switchDistance: IFT_IFTLData.templateB.switchDistance }),
            //     ...(IFT_IFTLData.templateB.ampPickup && { ampPickup: IFT_IFTLData.templateB.ampPickup }),
            //     ...(IFT_IFTLData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: IFT_IFTLData.templateB.fromAirTakeUpDistance }),
            //     ...(IFT_IFTLData.templateB.specialControllerOptions && { specialControllerOptions: IFT_IFTLData.templateB.specialControllerOptions })
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
