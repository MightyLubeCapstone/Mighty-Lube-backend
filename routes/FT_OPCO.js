const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_OPCO = require("../models/FT_OPCO");
const templateB = require("../models/templateB");

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
            
            monitorData: new templateB({
                existingMonitor: FT_OPCOData.templateB.existingMonitor,
                newMonitor: FT_OPCOData.templateB.newMonitor,
                ...(FT_OPCOData.templateB.dcuStatus && { dcuStatus: FT_OPCOData.templateB.dcuStatus }),
                ...(FT_OPCOData.templateB.dcuNum && { dcuNum: FT_OPCOData.templateB.dcuNum }),
                ...(FT_OPCOData.templateB.existingWindows && { existingWindows: FT_OPCOData.templateB.existingWindows }),
                ...(FT_OPCOData.templateB.existingHeadUnit && { existingHeadUnit: FT_OPCOData.templateB.existingHeadUnit }),
                ...(FT_OPCOData.templateB.existingDCU && { existingDCU: FT_OPCOData.templateB.existingDCU }),
                ...(FT_OPCOData.templateB.existingPowerInterface && { existingPowerInterface: FT_OPCOData.templateB.existingPowerInterface }),
                ...(FT_OPCOData.templateB.newReservoir && { newReservoir: FT_OPCOData.templateB.newReservoir }),
                ...(FT_OPCOData.templateB.reservoirSize && { reservoirSize: FT_OPCOData.templateB.reservoirSize }),
                ...(FT_OPCOData.templateB.otherReservoirSize && { otherReservoirSize: FT_OPCOData.templateB.otherReservoirSize }),
                ...(FT_OPCOData.templateB.newReservoirNum && { newReservoirNum: FT_OPCOData.templateB.newReservoirNum }),
                ...(FT_OPCOData.templateB.typeMonitor && { typeMonitor: FT_OPCOData.templateB.typeMonitor }),
                ...(FT_OPCOData.templateB.driveMotorAmp && { driveMotorAmp: FT_OPCOData.templateB.driveMotorAmp }),
                ...(FT_OPCOData.templateB.driveMotorAmpNum && { driveMotorAmpNum: FT_OPCOData.templateB.driveMotorAmpNum }),
                ...(FT_OPCOData.templateB.driveTakeUpAir && { driveTakeUpAir: FT_OPCOData.templateB.driveTakeUpAir }),
                ...(FT_OPCOData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: FT_OPCOData.templateB.driveTakeUpAirNum }),
                ...(FT_OPCOData.templateB.takeUpDistance && { takeUpDistance: FT_OPCOData.templateB.takeUpDistance }),
                ...(FT_OPCOData.templateB.takeUpDistanceNum && { takeUpDistanceNum: FT_OPCOData.templateB.takeUpDistanceNum }),
                ...(FT_OPCOData.templateB.driveTemp && { driveTemp: FT_OPCOData.templateB.driveTemp }),
                ...(FT_OPCOData.templateB.driveTempNum && { driveTempNum: FT_OPCOData.templateB.driveTempNum }),
                ...(FT_OPCOData.templateB.driveVibration && { driveVibration: FT_OPCOData.templateB.driveVibration }),
                ...(FT_OPCOData.templateB.driveVibrationNum && { driveVibrationNum: FT_OPCOData.templateB.driveVibrationNum }),
                ...(FT_OPCOData.templateB.dogPitch && { dogPitch: FT_OPCOData.templateB.dogPitch }),
                ...(FT_OPCOData.templateB.dogPitchNum && { dogPitchNum: FT_OPCOData.templateB.dogPitchNum }),
                ...(FT_OPCOData.templateB.paintMarker && { paintMarker: FT_OPCOData.templateB.paintMarker }),
                ...(FT_OPCOData.templateB.paintMarkerNum && { paintMarkerNum: FT_OPCOData.templateB.paintMarkerNum }),
                ...(FT_OPCOData.templateB.chainVision && { chainVision: FT_OPCOData.templateB.chainVision }),
                ...(FT_OPCOData.templateB.lubeVision && { lubeVision: FT_OPCOData.templateB.lubeVision }),
                ...(FT_OPCOData.templateB.trolleyVision && { trolleyVision: FT_OPCOData.templateB.trolleyVision }),
                ...(FT_OPCOData.templateB.trolleyDetect && { trolleyDetect: FT_OPCOData.templateB.trolleyDetect }),
                ...(FT_OPCOData.templateB.omniView && { omniView: FT_OPCOData.templateB.omniView }),
                ...(FT_OPCOData.templateB.dcuUpgradeNum && { dcuUpgradeNum: FT_OPCOData.templateB.dcuUpgradeNum }),
                ...(FT_OPCOData.templateB.itNameOne && { itNameOne: FT_OPCOData.templateB.itNameOne }),
                ...(FT_OPCOData.templateB.itIPOne && { itIPOne: FT_OPCOData.templateB.itIPOne }),
                ...(FT_OPCOData.templateB.itGatewayOne && { itGatewayOne: FT_OPCOData.templateB.itGatewayOne }),
                ...(FT_OPCOData.templateB.itSubnetOne && { itSubnetOne: FT_OPCOData.templateB.itSubnetOne }),
                ...(FT_OPCOData.templateB.itDNSOne && { itDNSOne: FT_OPCOData.templateB.itDNSOne }),
                ...(FT_OPCOData.templateB.itSMTPOne && { itSMTPOne: FT_OPCOData.templateB.itSMTPOne }),
                ...(FT_OPCOData.templateB.itNameTwo && { itNameTwo: FT_OPCOData.templateB.itNameTwo }),
                ...(FT_OPCOData.templateB.itIPTwo && { itIPTwo: FT_OPCOData.templateB.itIPTwo }),
                ...(FT_OPCOData.templateB.itGatewayTwo && { itGatewayTwo: FT_OPCOData.templateB.itGatewayTwo }),
                ...(FT_OPCOData.templateB.itSubnetTwo && { itSubnetTwo: FT_OPCOData.templateB.itSubnetTwo }),
                ...(FT_OPCOData.templateB.itDNSTwo && { itDNSTwo: FT_OPCOData.templateB.itDNSTwo }),
                ...(FT_OPCOData.templateB.itSMTPTwo && { itSMTPTwo: FT_OPCOData.templateB.itSMTPTwo }),
                ...(FT_OPCOData.templateB.itNameThree && { itNameThree: FT_OPCOData.templateB.itNameThree }),
                ...(FT_OPCOData.templateB.itIPThree && { itIPThree: FT_OPCOData.templateB.itIPThree }),
                ...(FT_OPCOData.templateB.itGatewayThree && { itGatewayThree: FT_OPCOData.templateB.itGatewayThree }),
                ...(FT_OPCOData.templateB.itSubnetThree && { itSubnetThree: FT_OPCOData.templateB.itSubnetThree }),
                ...(FT_OPCOData.templateB.itDNSThree && { itDNSThree: FT_OPCOData.templateB.itDNSThree }),
                ...(FT_OPCOData.templateB.itSMTPThree && { itSMTPThree: FT_OPCOData.templateB.itSMTPThree }),
                ...(FT_OPCOData.templateB.itAdditionalNotes && { itAdditionalNotes: FT_OPCOData.templateB.itAdditionalNotes }),
                ...(FT_OPCOData.templateB.piuDistance && { piuDistance: FT_OPCOData.templateB.piuDistance }),
                ...(FT_OPCOData.templateB.switchDistance && { switchDistance: FT_OPCOData.templateB.switchDistance }),
                ...(FT_OPCOData.templateB.ampPickup && { ampPickup: FT_OPCOData.templateB.ampPickup }),
                ...(FT_OPCOData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: FT_OPCOData.templateB.fromAirTakeUpDistance }),
                ...(FT_OPCOData.templateB.specialControllerOptions && { specialControllerOptions: FT_OPCOData.templateB.specialControllerOptions })
            }),
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