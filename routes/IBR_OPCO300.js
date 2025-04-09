const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_OPCO300 = require("../models/IBR_OPCO300");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_OPCO300 form
    try {
        const { IBR_OPCO300Data, numRequested } = req.body;
        const order = new IBR_OPCO300({
            ...(IBR_OPCO300Data.conveyorName && { conveyorName: IBR_OPCO300Data.conveyorName }),
            ...(IBR_OPCO300Data.chainSize && { chainSize: IBR_OPCO300Data.chainSize }),
            ...(IBR_OPCO300Data.industrialChainManufacturer && { industrialChainManufacturer: IBR_OPCO300Data.industrialChainManufacturer }),
            ...(IBR_OPCO300Data.otherChainManufacturer && { otherChainManufacturer: IBR_OPCO300Data.otherChainManufacturer }),
            ...(IBR_OPCO300Data.wheelManufacturer && { wheelManufacturer: IBR_OPCO300Data.wheelManufacturer }),
            ...(IBR_OPCO300Data.conveyorLength && { conveyorLength: IBR_OPCO300Data.conveyorLength }),
            ...(IBR_OPCO300Data.measurementUnit && { measurementUnit: IBR_OPCO300Data.measurementUnit }),
            ...(IBR_OPCO300Data.conveyorSpeed && { conveyorSpeed: IBR_OPCO300Data.conveyorSpeed }),
            ...(IBR_OPCO300Data.speedUnit && { speedUnit: IBR_OPCO300Data.speedUnit }),
            ...(IBR_OPCO300Data.conveyorIndex && { conveyorIndex: IBR_OPCO300Data.conveyorIndex }),
            ...(IBR_OPCO300Data.travelDirection && { travelDirection: IBR_OPCO300Data.travelDirection }),
            appEnviroment: IBR_OPCO300Data.appEnviroment,
            ...(IBR_OPCO300Data.ovenStatus && { ovenStatus: IBR_OPCO300Data.ovenStatus }),
            ...(IBR_OPCO300Data.ovenTemp && { ovenTemp: IBR_OPCO300Data.ovenTemp }),

            monitorData: new templateB({
                existingMonitor: IBR_OPCO300Data.templateB.existingMonitor,
                newMonitor: IBR_OPCO300Data.templateB.newMonitor,
                ...(IBR_OPCO300Data.templateB.dcuStatus && { dcuStatus: IBR_OPCO300Data.templateB.dcuStatus }),
                ...(IBR_OPCO300Data.templateB.dcuNum && { dcuNum: IBR_OPCO300Data.templateB.dcuNum }),
                ...(IBR_OPCO300Data.templateB.existingWindows && { existingWindows: IBR_OPCO300Data.templateB.existingWindows }),
                ...(IBR_OPCO300Data.templateB.existingHeadUnit && { existingHeadUnit: IBR_OPCO300Data.templateB.existingHeadUnit }),
                ...(IBR_OPCO300Data.templateB.existingDCU && { existingDCU: IBR_OPCO300Data.templateB.existingDCU }),
                ...(IBR_OPCO300Data.templateB.existingPowerInterface && { existingPowerInterface: IBR_OPCO300Data.templateB.existingPowerInterface }),
                ...(IBR_OPCO300Data.templateB.newReservoir && { newReservoir: IBR_OPCO300Data.templateB.newReservoir }),
                ...(IBR_OPCO300Data.templateB.reservoirSize && { reservoirSize: IBR_OPCO300Data.templateB.reservoirSize }),
                ...(IBR_OPCO300Data.templateB.otherReservoirSize && { otherReservoirSize: IBR_OPCO300Data.templateB.otherReservoirSize }),
                ...(IBR_OPCO300Data.templateB.newReservoirNum && { newReservoirNum: IBR_OPCO300Data.templateB.newReservoirNum }),
                ...(IBR_OPCO300Data.templateB.typeMonitor && { typeMonitor: IBR_OPCO300Data.templateB.typeMonitor }),
                ...(IBR_OPCO300Data.templateB.driveMotorAmp && { driveMotorAmp: IBR_OPCO300Data.templateB.driveMotorAmp }),
                ...(IBR_OPCO300Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: IBR_OPCO300Data.templateB.driveMotorAmpNum }),
                ...(IBR_OPCO300Data.templateB.driveTakeUpAir && { driveTakeUpAir: IBR_OPCO300Data.templateB.driveTakeUpAir }),
                ...(IBR_OPCO300Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_OPCO300Data.templateB.driveTakeUpAirNum }),
                ...(IBR_OPCO300Data.templateB.takeUpDistance && { takeUpDistance: IBR_OPCO300Data.templateB.takeUpDistance }),
                ...(IBR_OPCO300Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: IBR_OPCO300Data.templateB.takeUpDistanceNum }),
                ...(IBR_OPCO300Data.templateB.driveTemp && { driveTemp: IBR_OPCO300Data.templateB.driveTemp }),
                ...(IBR_OPCO300Data.templateB.driveTempNum && { driveTempNum: IBR_OPCO300Data.templateB.driveTempNum }),
                ...(IBR_OPCO300Data.templateB.driveVibration && { driveVibration: IBR_OPCO300Data.templateB.driveVibration }),
                ...(IBR_OPCO300Data.templateB.driveVibrationNum && { driveVibrationNum: IBR_OPCO300Data.templateB.driveVibrationNum }),
                ...(IBR_OPCO300Data.templateB.dogPitch && { dogPitch: IBR_OPCO300Data.templateB.dogPitch }),
                ...(IBR_OPCO300Data.templateB.dogPitchNum && { dogPitchNum: IBR_OPCO300Data.templateB.dogPitchNum }),
                ...(IBR_OPCO300Data.templateB.paintMarker && { paintMarker: IBR_OPCO300Data.templateB.paintMarker }),
                ...(IBR_OPCO300Data.templateB.paintMarkerNum && { paintMarkerNum: IBR_OPCO300Data.templateB.paintMarkerNum }),
                ...(IBR_OPCO300Data.templateB.chainVision && { chainVision: IBR_OPCO300Data.templateB.chainVision }),
                ...(IBR_OPCO300Data.templateB.lubeVision && { lubeVision: IBR_OPCO300Data.templateB.lubeVision }),
                ...(IBR_OPCO300Data.templateB.trolleyVision && { trolleyVision: IBR_OPCO300Data.templateB.trolleyVision }),
                ...(IBR_OPCO300Data.templateB.trolleyDetect && { trolleyDetect: IBR_OPCO300Data.templateB.trolleyDetect }),
                ...(IBR_OPCO300Data.templateB.omniView && { omniView: IBR_OPCO300Data.templateB.omniView }),
                ...(IBR_OPCO300Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: IBR_OPCO300Data.templateB.dcuUpgradeNum }),
                ...(IBR_OPCO300Data.templateB.itNameOne && { itNameOne: IBR_OPCO300Data.templateB.itNameOne }),
                ...(IBR_OPCO300Data.templateB.itIPOne && { itIPOne: IBR_OPCO300Data.templateB.itIPOne }),
                ...(IBR_OPCO300Data.templateB.itGatewayOne && { itGatewayOne: IBR_OPCO300Data.templateB.itGatewayOne }),
                ...(IBR_OPCO300Data.templateB.itSubnetOne && { itSubnetOne: IBR_OPCO300Data.templateB.itSubnetOne }),
                ...(IBR_OPCO300Data.templateB.itDNSOne && { itDNSOne: IBR_OPCO300Data.templateB.itDNSOne }),
                ...(IBR_OPCO300Data.templateB.itSMTPOne && { itSMTPOne: IBR_OPCO300Data.templateB.itSMTPOne }),
                ...(IBR_OPCO300Data.templateB.itNameTwo && { itNameTwo: IBR_OPCO300Data.templateB.itNameTwo }),
                ...(IBR_OPCO300Data.templateB.itIPTwo && { itIPTwo: IBR_OPCO300Data.templateB.itIPTwo }),
                ...(IBR_OPCO300Data.templateB.itGatewayTwo && { itGatewayTwo: IBR_OPCO300Data.templateB.itGatewayTwo }),
                ...(IBR_OPCO300Data.templateB.itSubnetTwo && { itSubnetTwo: IBR_OPCO300Data.templateB.itSubnetTwo }),
                ...(IBR_OPCO300Data.templateB.itDNSTwo && { itDNSTwo: IBR_OPCO300Data.templateB.itDNSTwo }),
                ...(IBR_OPCO300Data.templateB.itSMTPTwo && { itSMTPTwo: IBR_OPCO300Data.templateB.itSMTPTwo }),
                ...(IBR_OPCO300Data.templateB.itNameThree && { itNameThree: IBR_OPCO300Data.templateB.itNameThree }),
                ...(IBR_OPCO300Data.templateB.itIPThree && { itIPThree: IBR_OPCO300Data.templateB.itIPThree }),
                ...(IBR_OPCO300Data.templateB.itGatewayThree && { itGatewayThree: IBR_OPCO300Data.templateB.itGatewayThree }),
                ...(IBR_OPCO300Data.templateB.itSubnetThree && { itSubnetThree: IBR_OPCO300Data.templateB.itSubnetThree }),
                ...(IBR_OPCO300Data.templateB.itDNSThree && { itDNSThree: IBR_OPCO300Data.templateB.itDNSThree }),
                ...(IBR_OPCO300Data.templateB.itSMTPThree && { itSMTPThree: IBR_OPCO300Data.templateB.itSMTPThree }),
                ...(IBR_OPCO300Data.templateB.itAdditionalNotes && { itAdditionalNotes: IBR_OPCO300Data.templateB.itAdditionalNotes }),
                ...(IBR_OPCO300Data.templateB.piuDistance && { piuDistance: IBR_OPCO300Data.templateB.piuDistance }),
                ...(IBR_OPCO300Data.templateB.switchDistance && { switchDistance: IBR_OPCO300Data.templateB.switchDistance }),
                ...(IBR_OPCO300Data.templateB.ampPickup && { ampPickup: IBR_OPCO300Data.templateB.ampPickup }),
                ...(IBR_OPCO300Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_OPCO300Data.templateB.fromAirTakeUpDistance }),
                ...(IBR_OPCO300Data.templateB.specialControllerOptions && { specialControllerOptions: IBR_OPCO300Data.templateB.specialControllerOptions })
            }),            
            ...(IBR_OPCO300Data.surrondingTemp && { surrondingTemp: IBR_OPCO300Data.surrondingTemp }),
            ...(IBR_OPCO300Data.conveyorLoaded && { conveyorLoaded: IBR_OPCO300Data.conveyorLoaded }),
            ...(IBR_OPCO300Data.conveyorSwing && { conveyorSwing: IBR_OPCO300Data.conveyorSwing }),
            ...(IBR_OPCO300Data.strandStatus && { strandStatus: IBR_OPCO300Data.strandStatus }),
            ...(IBR_OPCO300Data.plantLayout && { plantLayout: IBR_OPCO300Data.plantLayout }),
            ...(IBR_OPCO300Data.requiredPics && { requiredPics: IBR_OPCO300Data.requiredPics }),
            ...(IBR_OPCO300Data.operatingVoltage && { operatingVoltage: IBR_OPCO300Data.operatingVoltage }),
            ...(IBR_OPCO300Data.controlVoltage && { controlVoltage: IBR_OPCO300Data.controlVoltage }),
            ...(IBR_OPCO300Data.compressedAir && { compressedAir: IBR_OPCO300Data.compressedAir }),
            ...(IBR_OPCO300Data.airSupplyType && { airSupplyType: IBR_OPCO300Data.airSupplyType }),
            ...(IBR_OPCO300Data.wheelOpenType && { wheelOpenType: IBR_OPCO300Data.wheelOpenType }),
            ...(IBR_OPCO300Data.wheelClosedType && { wheelClosedType: IBR_OPCO300Data.wheelClosedType }),
            ...(IBR_OPCO300Data.openStatus && { openStatus: IBR_OPCO300Data.openStatus }),
            ...(IBR_OPCO300Data.freeWheelStatus && { freeWheelStatus: IBR_OPCO300Data.freeWheelStatus }),
            ...(IBR_OPCO300Data.guideRollerStatus && { guideRollerStatus: IBR_OPCO300Data.guideRollerStatus }),
            ...(IBR_OPCO300Data.openRaceStyle && { openRaceStyle: IBR_OPCO300Data.openRaceStyle }),
            ...(IBR_OPCO300Data.closedRaceStyle && { closedRaceStyle: IBR_OPCO300Data.closedRaceStyle }),
            ...(IBR_OPCO300Data.holeStatus && { holeStatus: IBR_OPCO300Data.holeStatus }),
            ...(IBR_OPCO300Data.rollerChainStatus && { rollerChainStatus: IBR_OPCO300Data.rollerChainStatus }),
            ...(IBR_OPCO300Data.brushStatus && { brushStatus: IBR_OPCO300Data.brushStatus }),
            ...(IBR_OPCO300Data.outboardStatus && { outboardStatus: IBR_OPCO300Data.outboardStatus }),
            ...(IBR_OPCO300Data.lubeBrand && { lubeBrand: IBR_OPCO300Data.lubeBrand }),
            ...(IBR_OPCO300Data.lubeType && { lubeType: IBR_OPCO300Data.lubeType }),
            ...(IBR_OPCO300Data.lubeViscosity && { lubeViscosity: IBR_OPCO300Data.lubeViscosity }),
            ...(IBR_OPCO300Data.currentGreaseGrade && { currentGreaseGrade: IBR_OPCO300Data.currentGreaseGrade }),
            ...(IBR_OPCO300Data.zerkDirection && { zerkDirection: IBR_OPCO300Data.zerkDirection }),
            ...(IBR_OPCO300Data.zerkLocationType && { zerkLocationType: IBR_OPCO300Data.zerkLocationType }),
            ...(IBR_OPCO300Data.chainMaster && { chainMaster: IBR_OPCO300Data.chainMaster }),
            ...(IBR_OPCO300Data.remoteStatus && { remoteStatus: IBR_OPCO300Data.remoteStatus }),
            ...(IBR_OPCO300Data.mountStatus && { mountStatus: IBR_OPCO300Data.mountStatus }),
            ...(IBR_OPCO300Data.otherUnitStatus && { otherUnitStatus: IBR_OPCO300Data.otherUnitStatus }),
            ...(IBR_OPCO300Data.timerStatus && { timerStatus: IBR_OPCO300Data.timerStatus }),
            ...(IBR_OPCO300Data.electricStatus && { electricStatus: IBR_OPCO300Data.electricStatus }),
            ...(IBR_OPCO300Data.mightyLubeMonitoring && { mightyLubeMonitoring: IBR_OPCO300Data.mightyLubeMonitoring }),
            ...(IBR_OPCO300Data.preMountType && { preMountType: IBR_OPCO300Data.preMountType }),
            ...(IBR_OPCO300Data.plcConnection && { plcConnection: IBR_OPCO300Data.plcConnection }),
            ...(IBR_OPCO300Data.otherControllerInfo && { otherControllerInfo: IBR_OPCO300Data.otherControllerInfo }),
            ...(IBR_OPCO300Data.ibrUnitType && { ibrUnitType: IBR_OPCO300Data.ibrUnitType }),
            ...(IBR_OPCO300Data.ibrChainA1 && { ibrChainA1: IBR_OPCO300Data.ibrChainA1 }),
            ...(IBR_OPCO300Data.ibrChainB1 && { ibrChainB1: IBR_OPCO300Data.ibrChainB1 }),
            ...(IBR_OPCO300Data.ibrChainC1 && { ibrChainC1: IBR_OPCO300Data.ibrChainC1 }),
            ...(IBR_OPCO300Data.ibrChainD1 && { ibrChainD1: IBR_OPCO300Data.ibrChainD1 }),
            ...(IBR_OPCO300Data.ibrChainE1 && { ibrChainE1: IBR_OPCO300Data.ibrChainE1 }),
            ...(IBR_OPCO300Data.ibrChainF1 && { ibrChainF1: IBR_OPCO300Data.ibrChainF1 }),
            ...(IBR_OPCO300Data.ibrChainG1 && { ibrChainG1: IBR_OPCO300Data.ibrChainG1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_OPCO300" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_OPCO300 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;