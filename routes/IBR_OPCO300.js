const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_OPCO300 = require("../models/IBR_OPCO300");
const templateA = require("../models/templateA");

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

            // monitorData: new templateA({
            //     existingMonitor: IBR_OPCO300Data.templateA.existingMonitor,
            //     newMonitor: IBR_OPCO300Data.templateA.newMonitor,
            //     ...(IBR_OPCO300Data.templateA.dcuStatus && { dcuStatus: IBR_OPCO300Data.templateA.dcuStatus }),
            //     ...(IBR_OPCO300Data.templateA.dcuNum && { dcuNum: IBR_OPCO300Data.templateA.dcuNum }),
            //     ...(IBR_OPCO300Data.templateA.existingWindows && { existingWindows: IBR_OPCO300Data.templateA.existingWindows }),
            //     ...(IBR_OPCO300Data.templateA.existingHeadUnit && { existingHeadUnit: IBR_OPCO300Data.templateA.existingHeadUnit }),
            //     ...(IBR_OPCO300Data.templateA.existingDCU && { existingDCU: IBR_OPCO300Data.templateA.existingDCU }),
            //     ...(IBR_OPCO300Data.templateA.existingPowerInterface && { existingPowerInterface: IBR_OPCO300Data.templateA.existingPowerInterface }),
            //     ...(IBR_OPCO300Data.templateA.newReservoir && { newReservoir: IBR_OPCO300Data.templateA.newReservoir }),
            //     ...(IBR_OPCO300Data.templateA.reservoirSize && { reservoirSize: IBR_OPCO300Data.templateA.reservoirSize }),
            //     ...(IBR_OPCO300Data.templateA.otherReservoirSize && { otherReservoirSize: IBR_OPCO300Data.templateA.otherReservoirSize }),
            //     ...(IBR_OPCO300Data.templateA.newReservoirNum && { newReservoirNum: IBR_OPCO300Data.templateA.newReservoirNum }),
            //     ...(IBR_OPCO300Data.templateA.typeMonitor && { typeMonitor: IBR_OPCO300Data.templateA.typeMonitor }),
            //     ...(IBR_OPCO300Data.templateA.driveMotorAmp && { driveMotorAmp: IBR_OPCO300Data.templateA.driveMotorAmp }),
            //     ...(IBR_OPCO300Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: IBR_OPCO300Data.templateA.driveMotorAmpNum }),
            //     ...(IBR_OPCO300Data.templateA.driveTakeUpAir && { driveTakeUpAir: IBR_OPCO300Data.templateA.driveTakeUpAir }),
            //     ...(IBR_OPCO300Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_OPCO300Data.templateA.driveTakeUpAirNum }),
            //     ...(IBR_OPCO300Data.templateA.takeUpDistance && { takeUpDistance: IBR_OPCO300Data.templateA.takeUpDistance }),
            //     ...(IBR_OPCO300Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: IBR_OPCO300Data.templateA.takeUpDistanceNum }),
            //     ...(IBR_OPCO300Data.templateA.driveTemp && { driveTemp: IBR_OPCO300Data.templateA.driveTemp }),
            //     ...(IBR_OPCO300Data.templateA.driveTempNum && { driveTempNum: IBR_OPCO300Data.templateA.driveTempNum }),
            //     ...(IBR_OPCO300Data.templateA.driveVibration && { driveVibration: IBR_OPCO300Data.templateA.driveVibration }),
            //     ...(IBR_OPCO300Data.templateA.driveVibrationNum && { driveVibrationNum: IBR_OPCO300Data.templateA.driveVibrationNum }),
            //     ...(IBR_OPCO300Data.templateA.dogPitch && { dogPitch: IBR_OPCO300Data.templateA.dogPitch }),
            //     ...(IBR_OPCO300Data.templateA.dogPitchNum && { dogPitchNum: IBR_OPCO300Data.templateA.dogPitchNum }),
            //     ...(IBR_OPCO300Data.templateA.paintMarker && { paintMarker: IBR_OPCO300Data.templateA.paintMarker }),
            //     ...(IBR_OPCO300Data.templateA.paintMarkerNum && { paintMarkerNum: IBR_OPCO300Data.templateA.paintMarkerNum }),
            //     ...(IBR_OPCO300Data.templateA.chainVision && { chainVision: IBR_OPCO300Data.templateA.chainVision }),
            //     ...(IBR_OPCO300Data.templateA.lubeVision && { lubeVision: IBR_OPCO300Data.templateA.lubeVision }),
            //     ...(IBR_OPCO300Data.templateA.trolleyVision && { trolleyVision: IBR_OPCO300Data.templateA.trolleyVision }),
            //     ...(IBR_OPCO300Data.templateA.trolleyDetect && { trolleyDetect: IBR_OPCO300Data.templateA.trolleyDetect }),
            //     ...(IBR_OPCO300Data.templateA.omniView && { omniView: IBR_OPCO300Data.templateA.omniView }),
            //     ...(IBR_OPCO300Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: IBR_OPCO300Data.templateA.dcuUpgradeNum }),
            //     ...(IBR_OPCO300Data.templateA.itNameOne && { itNameOne: IBR_OPCO300Data.templateA.itNameOne }),
            //     ...(IBR_OPCO300Data.templateA.itIPOne && { itIPOne: IBR_OPCO300Data.templateA.itIPOne }),
            //     ...(IBR_OPCO300Data.templateA.itGatewayOne && { itGatewayOne: IBR_OPCO300Data.templateA.itGatewayOne }),
            //     ...(IBR_OPCO300Data.templateA.itSubnetOne && { itSubnetOne: IBR_OPCO300Data.templateA.itSubnetOne }),
            //     ...(IBR_OPCO300Data.templateA.itDNSOne && { itDNSOne: IBR_OPCO300Data.templateA.itDNSOne }),
            //     ...(IBR_OPCO300Data.templateA.itSMTPOne && { itSMTPOne: IBR_OPCO300Data.templateA.itSMTPOne }),
            //     ...(IBR_OPCO300Data.templateA.itNameTwo && { itNameTwo: IBR_OPCO300Data.templateA.itNameTwo }),
            //     ...(IBR_OPCO300Data.templateA.itIPTwo && { itIPTwo: IBR_OPCO300Data.templateA.itIPTwo }),
            //     ...(IBR_OPCO300Data.templateA.itGatewayTwo && { itGatewayTwo: IBR_OPCO300Data.templateA.itGatewayTwo }),
            //     ...(IBR_OPCO300Data.templateA.itSubnetTwo && { itSubnetTwo: IBR_OPCO300Data.templateA.itSubnetTwo }),
            //     ...(IBR_OPCO300Data.templateA.itDNSTwo && { itDNSTwo: IBR_OPCO300Data.templateA.itDNSTwo }),
            //     ...(IBR_OPCO300Data.templateA.itSMTPTwo && { itSMTPTwo: IBR_OPCO300Data.templateA.itSMTPTwo }),
            //     ...(IBR_OPCO300Data.templateA.itNameThree && { itNameThree: IBR_OPCO300Data.templateA.itNameThree }),
            //     ...(IBR_OPCO300Data.templateA.itIPThree && { itIPThree: IBR_OPCO300Data.templateA.itIPThree }),
            //     ...(IBR_OPCO300Data.templateA.itGatewayThree && { itGatewayThree: IBR_OPCO300Data.templateA.itGatewayThree }),
            //     ...(IBR_OPCO300Data.templateA.itSubnetThree && { itSubnetThree: IBR_OPCO300Data.templateA.itSubnetThree }),
            //     ...(IBR_OPCO300Data.templateA.itDNSThree && { itDNSThree: IBR_OPCO300Data.templateA.itDNSThree }),
            //     ...(IBR_OPCO300Data.templateA.itSMTPThree && { itSMTPThree: IBR_OPCO300Data.templateA.itSMTPThree }),
            //     ...(IBR_OPCO300Data.templateA.itAdditionalNotes && { itAdditionalNotes: IBR_OPCO300Data.templateA.itAdditionalNotes }),
            //     ...(IBR_OPCO300Data.templateA.piuDistance && { piuDistance: IBR_OPCO300Data.templateA.piuDistance }),
            //     ...(IBR_OPCO300Data.templateA.switchDistance && { switchDistance: IBR_OPCO300Data.templateA.switchDistance }),
            //     ...(IBR_OPCO300Data.templateA.ampPickup && { ampPickup: IBR_OPCO300Data.templateA.ampPickup }),
            //     ...(IBR_OPCO300Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_OPCO300Data.templateA.fromAirTakeUpDistance }),
            //     ...(IBR_OPCO300Data.templateA.specialControllerOptions && { specialControllerOptions: IBR_OPCO300Data.templateA.specialControllerOptions })
            // }),            
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