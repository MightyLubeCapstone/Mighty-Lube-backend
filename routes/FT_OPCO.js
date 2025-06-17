const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_OPCO = require("../models/FT_OPCO");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FT_OPCO form
    try {
        const { FT_OPCOData, numRequested } = req.body;
        const order = new FT_OPCO({
            ...(FT_OPCOData.conveyorName && { conveyorName: FT_OPCOData.conveyorName }),
            ...(FT_OPCOData.chainSize && { chainSize: FT_OPCOData.chainSize }),
            industrialChainManufacturer: FT_OPCOData.industrialChainManufacturer,
            ...(FT_OPCOData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FT_OPCOData.otherIndustrialChainManufacturer }),
            wheelManufacturer: FT_OPCOData.wheelManufacturer,
            ...(FT_OPCOData.otherWheelManufacturer && { otherWheelManufacturer: FT_OPCOData.otherWheelManufacturer }),
            ...(FT_OPCOData.conveyorLength && { conveyorLength: FT_OPCOData.conveyorLength }),
            ...(FT_OPCOData.conveyorLengthUnit && { conveyorLengthUnit: FT_OPCOData.conveyorLengthUnit }),
            ...(FT_OPCOData.conveyorSpeed && { conveyorSpeed: FT_OPCOData.conveyorSpeed }),
            ...(FT_OPCOData.conveyorSpeedUnit && { conveyorSpeedUnit: FT_OPCOData.conveyorSpeedUnit }),
            ...(FT_OPCOData.conveyorIndex && { conveyorIndex: FT_OPCOData.conveyorIndex }),
            ...(FT_OPCOData.travelDirection && { travelDirection: FT_OPCOData.travelDirection }),
            appEnviroment: FT_OPCOData.appEnviroment,
            ...(FT_OPCOData.ovenStatus && { ovenStatus: FT_OPCOData.ovenStatus }),
            ...(FT_OPCOData.ovenTemp && { ovenTemp: FT_OPCOData.ovenTemp }),
            ...(FT_OPCOData.surroundingTemp && { surroundingTemp: FT_OPCOData.surroundingTemp }),
            ...(FT_OPCOData.conveyorLoaded && { conveyorLoaded: FT_OPCOData.conveyorLoaded }),
            ...(FT_OPCOData.conveyorSwing && { conveyorSwing: FT_OPCOData.conveyorSwing }),
            ...(FT_OPCOData.strandStatus && { strandStatus: FT_OPCOData.strandStatus }),
            ...(FT_OPCOData.plantLayout && { plantLayout: FT_OPCOData.plantLayout }),
            ...(FT_OPCOData.requiredPics && { requiredPics: FT_OPCOData.requiredPics }),
            
            // monitorData: new templateA({
            //     existingMonitor: FT_OPCOData.templateA.existingMonitor,
            //     newMonitor: FT_OPCOData.templateA.newMonitor,
            //     ...(FT_OPCOData.templateA.dcuStatus && { dcuStatus: FT_OPCOData.templateA.dcuStatus }),
            //     ...(FT_OPCOData.templateA.dcuNum && { dcuNum: FT_OPCOData.templateA.dcuNum }),
            //     ...(FT_OPCOData.templateA.existingWindows && { existingWindows: FT_OPCOData.templateA.existingWindows }),
            //     ...(FT_OPCOData.templateA.existingHeadUnit && { existingHeadUnit: FT_OPCOData.templateA.existingHeadUnit }),
            //     ...(FT_OPCOData.templateA.existingDCU && { existingDCU: FT_OPCOData.templateA.existingDCU }),
            //     ...(FT_OPCOData.templateA.existingPowerInterface && { existingPowerInterface: FT_OPCOData.templateA.existingPowerInterface }),
            //     ...(FT_OPCOData.templateA.newReservoir && { newReservoir: FT_OPCOData.templateA.newReservoir }),
            //     ...(FT_OPCOData.templateA.reservoirSize && { reservoirSize: FT_OPCOData.templateA.reservoirSize }),
            //     ...(FT_OPCOData.templateA.otherReservoirSize && { otherReservoirSize: FT_OPCOData.templateA.otherReservoirSize }),
            //     ...(FT_OPCOData.templateA.newReservoirNum && { newReservoirNum: FT_OPCOData.templateA.newReservoirNum }),
            //     ...(FT_OPCOData.templateA.typeMonitor && { typeMonitor: FT_OPCOData.templateA.typeMonitor }),
            //     ...(FT_OPCOData.templateA.driveMotorAmp && { driveMotorAmp: FT_OPCOData.templateA.driveMotorAmp }),
            //     ...(FT_OPCOData.templateA.driveMotorAmpNum && { driveMotorAmpNum: FT_OPCOData.templateA.driveMotorAmpNum }),
            //     ...(FT_OPCOData.templateA.driveTakeUpAir && { driveTakeUpAir: FT_OPCOData.templateA.driveTakeUpAir }),
            //     ...(FT_OPCOData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FT_OPCOData.templateA.driveTakeUpAirNum }),
            //     ...(FT_OPCOData.templateA.takeUpDistance && { takeUpDistance: FT_OPCOData.templateA.takeUpDistance }),
            //     ...(FT_OPCOData.templateA.takeUpDistanceNum && { takeUpDistanceNum: FT_OPCOData.templateA.takeUpDistanceNum }),
            //     ...(FT_OPCOData.templateA.driveTemp && { driveTemp: FT_OPCOData.templateA.driveTemp }),
            //     ...(FT_OPCOData.templateA.driveTempNum && { driveTempNum: FT_OPCOData.templateA.driveTempNum }),
            //     ...(FT_OPCOData.templateA.driveVibration && { driveVibration: FT_OPCOData.templateA.driveVibration }),
            //     ...(FT_OPCOData.templateA.driveVibrationNum && { driveVibrationNum: FT_OPCOData.templateA.driveVibrationNum }),
            //     ...(FT_OPCOData.templateA.dogPitch && { dogPitch: FT_OPCOData.templateA.dogPitch }),
            //     ...(FT_OPCOData.templateA.dogPitchNum && { dogPitchNum: FT_OPCOData.templateA.dogPitchNum }),
            //     ...(FT_OPCOData.templateA.paintMarker && { paintMarker: FT_OPCOData.templateA.paintMarker }),
            //     ...(FT_OPCOData.templateA.paintMarkerNum && { paintMarkerNum: FT_OPCOData.templateA.paintMarkerNum }),
            //     ...(FT_OPCOData.templateA.chainVision && { chainVision: FT_OPCOData.templateA.chainVision }),
            //     ...(FT_OPCOData.templateA.lubeVision && { lubeVision: FT_OPCOData.templateA.lubeVision }),
            //     ...(FT_OPCOData.templateA.trolleyVision && { trolleyVision: FT_OPCOData.templateA.trolleyVision }),
            //     ...(FT_OPCOData.templateA.trolleyDetect && { trolleyDetect: FT_OPCOData.templateA.trolleyDetect }),
            //     ...(FT_OPCOData.templateA.omniView && { omniView: FT_OPCOData.templateA.omniView }),
            //     ...(FT_OPCOData.templateA.dcuUpgradeNum && { dcuUpgradeNum: FT_OPCOData.templateA.dcuUpgradeNum }),
            //     ...(FT_OPCOData.templateA.itNameOne && { itNameOne: FT_OPCOData.templateA.itNameOne }),
            //     ...(FT_OPCOData.templateA.itIPOne && { itIPOne: FT_OPCOData.templateA.itIPOne }),
            //     ...(FT_OPCOData.templateA.itGatewayOne && { itGatewayOne: FT_OPCOData.templateA.itGatewayOne }),
            //     ...(FT_OPCOData.templateA.itSubnetOne && { itSubnetOne: FT_OPCOData.templateA.itSubnetOne }),
            //     ...(FT_OPCOData.templateA.itDNSOne && { itDNSOne: FT_OPCOData.templateA.itDNSOne }),
            //     ...(FT_OPCOData.templateA.itSMTPOne && { itSMTPOne: FT_OPCOData.templateA.itSMTPOne }),
            //     ...(FT_OPCOData.templateA.itNameTwo && { itNameTwo: FT_OPCOData.templateA.itNameTwo }),
            //     ...(FT_OPCOData.templateA.itIPTwo && { itIPTwo: FT_OPCOData.templateA.itIPTwo }),
            //     ...(FT_OPCOData.templateA.itGatewayTwo && { itGatewayTwo: FT_OPCOData.templateA.itGatewayTwo }),
            //     ...(FT_OPCOData.templateA.itSubnetTwo && { itSubnetTwo: FT_OPCOData.templateA.itSubnetTwo }),
            //     ...(FT_OPCOData.templateA.itDNSTwo && { itDNSTwo: FT_OPCOData.templateA.itDNSTwo }),
            //     ...(FT_OPCOData.templateA.itSMTPTwo && { itSMTPTwo: FT_OPCOData.templateA.itSMTPTwo }),
            //     ...(FT_OPCOData.templateA.itNameThree && { itNameThree: FT_OPCOData.templateA.itNameThree }),
            //     ...(FT_OPCOData.templateA.itIPThree && { itIPThree: FT_OPCOData.templateA.itIPThree }),
            //     ...(FT_OPCOData.templateA.itGatewayThree && { itGatewayThree: FT_OPCOData.templateA.itGatewayThree }),
            //     ...(FT_OPCOData.templateA.itSubnetThree && { itSubnetThree: FT_OPCOData.templateA.itSubnetThree }),
            //     ...(FT_OPCOData.templateA.itDNSThree && { itDNSThree: FT_OPCOData.templateA.itDNSThree }),
            //     ...(FT_OPCOData.templateA.itSMTPThree && { itSMTPThree: FT_OPCOData.templateA.itSMTPThree }),
            //     ...(FT_OPCOData.templateA.itAdditionalNotes && { itAdditionalNotes: FT_OPCOData.templateA.itAdditionalNotes }),
            //     ...(FT_OPCOData.templateA.piuDistance && { piuDistance: FT_OPCOData.templateA.piuDistance }),
            //     ...(FT_OPCOData.templateA.switchDistance && { switchDistance: FT_OPCOData.templateA.switchDistance }),
            //     ...(FT_OPCOData.templateA.ampPickup && { ampPickup: FT_OPCOData.templateA.ampPickup }),
            //     ...(FT_OPCOData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FT_OPCOData.templateA.fromAirTakeUpDistance }),
            //     ...(FT_OPCOData.templateA.specialControllerOptions && { specialControllerOptions: FT_OPCOData.templateA.specialControllerOptions })
            // }),
            ...(FT_OPCOData.wheelOpenType && { wheelOpenType: FT_OPCOData.wheelOpenType }),
            ...(FT_OPCOData.wheelClosedType && { wheelClosedType: FT_OPCOData.wheelClosedType }),
            ...(FT_OPCOData.openStatus && { openStatus: FT_OPCOData.openStatus }),
            ...(FT_OPCOData.freeWheelStatus && { freeWheelStatus: FT_OPCOData.freeWheelStatus }),
            ...(FT_OPCOData.guideRollerStatus && { guideRollerStatus: FT_OPCOData.guideRollerStatus }),
            ...(FT_OPCOData.openRaceStyleType && { openRaceStyleType: FT_OPCOData.openRaceStyleType }),
            ...(FT_OPCOData.closedRaceStyleType && { closedRaceStyleType: FT_OPCOData.closedRaceStyleType }),
            ...(FT_OPCOData.holeStatus && { holeStatus: FT_OPCOData.holeStatus }),
            ...(FT_OPCOData.rollerChainStatus && { rollerChainStatus: FT_OPCOData.rollerChainStatus }),
            ...(FT_OPCOData.brushStatus && { brushStatus: FT_OPCOData.brushStatus }),
            ...(FT_OPCOData.outboardStatus && { outboardStatus: FT_OPCOData.outboardStatus }),
            ...(FT_OPCOData.lubeBrand && { lubeBrand: FT_OPCOData.lubeBrand }),
            ...(FT_OPCOData.currentLube && { currentLube: FT_OPCOData.currentLube }),
            ...(FT_OPCOData.oilOrGrease && { oilOrGrease: FT_OPCOData.oilOrGrease }),
            ...(FT_OPCOData.lubeViscosity && { lubeViscosity: FT_OPCOData.lubeViscosity }),
            ...(FT_OPCOData.greaseNGLIGrade && { greaseNGLIGrade: FT_OPCOData.greaseNGLIGrade }),
            ...(FT_OPCOData.zerkDirection && { zerkDirection: FT_OPCOData.zerkDirection }),
            ...(FT_OPCOData.zerkLocationType && { zerkLocationType: FT_OPCOData.zerkLocationType }),
            ...(FT_OPCOData.chainMaster && { chainMaster: FT_OPCOData.chainMaster }),
            ...(FT_OPCOData.remoteStatus && { remoteStatus: FT_OPCOData.remoteStatus }),
            ...(FT_OPCOData.mountStatus && { mountStatus: FT_OPCOData.mountStatus }),
            ...(FT_OPCOData.otherUnitStatus && { otherUnitStatus: FT_OPCOData.otherUnitStatus }),
            ...(FT_OPCOData.timerStatus && { timerStatus: FT_OPCOData.timerStatus }),
            ...(FT_OPCOData.electricStatus && { electricStatus: FT_OPCOData.electricStatus }),
            ...(FT_OPCOData.mightyLubeMonitoring && { mightyLubeMonitoring: FT_OPCOData.mightyLubeMonitoring }),
            ...(FT_OPCOData.preMountType && { preMountType: FT_OPCOData.preMountType }),
            ...(FT_OPCOData.plcConnection && { plcConnection: FT_OPCOData.plcConnection }),
            ...(FT_OPCOData.otherControllerInfo && { otherControllerInfo: FT_OPCOData.otherControllerInfo }),
            ...(FT_OPCOData.ftUnitType && { ftUnitType: FT_OPCOData.ftUnitType }),
            ...(FT_OPCOData.ftTopF && { ftTopF: FT_OPCOData.ftTopF }),
            ...(FT_OPCOData.ftTopG && { ftTopG: FT_OPCOData.ftTopG }),
            ...(FT_OPCOData.ftTopH && { ftTopH: FT_OPCOData.ftTopH }),
            ...(FT_OPCOData.ftTopA1 && { ftTopA1: FT_OPCOData.ftTopA1 }),
            ...(FT_OPCOData.ftTopB1 && { ftTopB1: FT_OPCOData.ftTopB1 }),
            ...(FT_OPCOData.ftTopH1 && { ftTopH1: FT_OPCOData.ftTopH1 }),
            ...(FT_OPCOData.ftTopJ1 && { ftTopJ1: FT_OPCOData.ftTopJ1 }),
            ...(FT_OPCOData.ftTopK1 && { ftTopK1: FT_OPCOData.ftTopK1 }),
            ...(FT_OPCOData.ftTopL1 && { ftTopL1: FT_OPCOData.ftTopL1 }),
            ...(FT_OPCOData.ftTopM1 && { ftTopM1: FT_OPCOData.ftTopM1 }),
            ...(FT_OPCOData.ftTopN1 && { ftTopN1: FT_OPCOData.ftTopN1 }),
            ...(FT_OPCOData.ftTopP1 && { ftTopP1: FT_OPCOData.ftTopP1 }),
            ...(FT_OPCOData.ftTopR1 && { ftTopR1: FT_OPCOData.ftTopR1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FT_OPCO" });
        await req.user.save();

        return res.status(200).json({ message: "FT_OPCO entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;