const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_OP4OE = require("../models/IBR_OP4OE");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_OP4OE form
    try {
        const { IBR_OP4OEData, numRequested } = req.body;
        const order = new IBR_OP4OE({
            ...(IBR_OP4OEData.conveyorName && { conveyorName: IBR_OP4OEData.conveyorName }),
            ...(IBR_OP4OEData.chainSize && { chainSize: IBR_OP4OEData.chainSize }),
            ...(IBR_OP4OEData.industrialChainManufacturer && { industrialChainManufacturer: IBR_OP4OEData.industrialChainManufacturer }),
            ...(IBR_OP4OEData.otherChainManufacturer && { otherChainManufacturer: IBR_OP4OEData.otherChainManufacturer }),
            ...(IBR_OP4OEData.conveyorLength && { conveyorLength: IBR_OP4OEData.conveyorLength }),
            ...(IBR_OP4OEData.measurementUnit && { measurementUnit: IBR_OP4OEData.measurementUnit }),
            ...(IBR_OP4OEData.conveyorSpeed && { conveyorSpeed: IBR_OP4OEData.conveyorSpeed }),
            ...(IBR_OP4OEData.speedUnit && { speedUnit: IBR_OP4OEData.speedUnit }),
            ...(IBR_OP4OEData.conveyorIndex && { conveyorIndex: IBR_OP4OEData.conveyorIndex }),
            ...(IBR_OP4OEData.travelDirection && { travelDirection: IBR_OP4OEData.travelDirection }),
            appEnviroment: IBR_OP4OEData.appEnviroment,
            ...(IBR_OP4OEData.ovenStatus && { ovenStatus: IBR_OP4OEData.ovenStatus }),
            ...(IBR_OP4OEData.ovenTemp && { ovenTemp: IBR_OP4OEData.ovenTemp }),

            // monitorData: new templateB({
            //     existingMonitor: IBR_OP4OEData.templateB.existingMonitor,
            //     newMonitor: IBR_OP4OEData.templateB.newMonitor,
            //     ...(IBR_OP4OEData.templateB.dcuStatus && { dcuStatus: IBR_OP4OEData.templateB.dcuStatus }),
            //     ...(IBR_OP4OEData.templateB.dcuNum && { dcuNum: IBR_OP4OEData.templateB.dcuNum }),
            //     ...(IBR_OP4OEData.templateB.existingWindows && { existingWindows: IBR_OP4OEData.templateB.existingWindows }),
            //     ...(IBR_OP4OEData.templateB.existingHeadUnit && { existingHeadUnit: IBR_OP4OEData.templateB.existingHeadUnit }),
            //     ...(IBR_OP4OEData.templateB.existingDCU && { existingDCU: IBR_OP4OEData.templateB.existingDCU }),
            //     ...(IBR_OP4OEData.templateB.existingPowerInterface && { existingPowerInterface: IBR_OP4OEData.templateB.existingPowerInterface }),
            //     ...(IBR_OP4OEData.templateB.newReservoir && { newReservoir: IBR_OP4OEData.templateB.newReservoir }),
            //     ...(IBR_OP4OEData.templateB.reservoirSize && { reservoirSize: IBR_OP4OEData.templateB.reservoirSize }),
            //     ...(IBR_OP4OEData.templateB.otherReservoirSize && { otherReservoirSize: IBR_OP4OEData.templateB.otherReservoirSize }),
            //     ...(IBR_OP4OEData.templateB.newReservoirNum && { newReservoirNum: IBR_OP4OEData.templateB.newReservoirNum }),
            //     ...(IBR_OP4OEData.templateB.typeMonitor && { typeMonitor: IBR_OP4OEData.templateB.typeMonitor }),
            //     ...(IBR_OP4OEData.templateB.driveMotorAmp && { driveMotorAmp: IBR_OP4OEData.templateB.driveMotorAmp }),
            //     ...(IBR_OP4OEData.templateB.driveMotorAmpNum && { driveMotorAmpNum: IBR_OP4OEData.templateB.driveMotorAmpNum }),
            //     ...(IBR_OP4OEData.templateB.driveTakeUpAir && { driveTakeUpAir: IBR_OP4OEData.templateB.driveTakeUpAir }),
            //     ...(IBR_OP4OEData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_OP4OEData.templateB.driveTakeUpAirNum }),
            //     ...(IBR_OP4OEData.templateB.takeUpDistance && { takeUpDistance: IBR_OP4OEData.templateB.takeUpDistance }),
            //     ...(IBR_OP4OEData.templateB.takeUpDistanceNum && { takeUpDistanceNum: IBR_OP4OEData.templateB.takeUpDistanceNum }),
            //     ...(IBR_OP4OEData.templateB.driveTemp && { driveTemp: IBR_OP4OEData.templateB.driveTemp }),
            //     ...(IBR_OP4OEData.templateB.driveTempNum && { driveTempNum: IBR_OP4OEData.templateB.driveTempNum }),
            //     ...(IBR_OP4OEData.templateB.driveVibration && { driveVibration: IBR_OP4OEData.templateB.driveVibration }),
            //     ...(IBR_OP4OEData.templateB.driveVibrationNum && { driveVibrationNum: IBR_OP4OEData.templateB.driveVibrationNum }),
            //     ...(IBR_OP4OEData.templateB.dogPitch && { dogPitch: IBR_OP4OEData.templateB.dogPitch }),
            //     ...(IBR_OP4OEData.templateB.dogPitchNum && { dogPitchNum: IBR_OP4OEData.templateB.dogPitchNum }),
            //     ...(IBR_OP4OEData.templateB.paintMarker && { paintMarker: IBR_OP4OEData.templateB.paintMarker }),
            //     ...(IBR_OP4OEData.templateB.paintMarkerNum && { paintMarkerNum: IBR_OP4OEData.templateB.paintMarkerNum }),
            //     ...(IBR_OP4OEData.templateB.chainVision && { chainVision: IBR_OP4OEData.templateB.chainVision }),
            //     ...(IBR_OP4OEData.templateB.lubeVision && { lubeVision: IBR_OP4OEData.templateB.lubeVision }),
            //     ...(IBR_OP4OEData.templateB.trolleyVision && { trolleyVision: IBR_OP4OEData.templateB.trolleyVision }),
            //     ...(IBR_OP4OEData.templateB.trolleyDetect && { trolleyDetect: IBR_OP4OEData.templateB.trolleyDetect }),
            //     ...(IBR_OP4OEData.templateB.omniView && { omniView: IBR_OP4OEData.templateB.omniView }),
            //     ...(IBR_OP4OEData.templateB.dcuUpgradeNum && { dcuUpgradeNum: IBR_OP4OEData.templateB.dcuUpgradeNum }),
            //     ...(IBR_OP4OEData.templateB.itNameOne && { itNameOne: IBR_OP4OEData.templateB.itNameOne }),
            //     ...(IBR_OP4OEData.templateB.itIPOne && { itIPOne: IBR_OP4OEData.templateB.itIPOne }),
            //     ...(IBR_OP4OEData.templateB.itGatewayOne && { itGatewayOne: IBR_OP4OEData.templateB.itGatewayOne }),
            //     ...(IBR_OP4OEData.templateB.itSubnetOne && { itSubnetOne: IBR_OP4OEData.templateB.itSubnetOne }),
            //     ...(IBR_OP4OEData.templateB.itDNSOne && { itDNSOne: IBR_OP4OEData.templateB.itDNSOne }),
            //     ...(IBR_OP4OEData.templateB.itSMTPOne && { itSMTPOne: IBR_OP4OEData.templateB.itSMTPOne }),
            //     ...(IBR_OP4OEData.templateB.itNameTwo && { itNameTwo: IBR_OP4OEData.templateB.itNameTwo }),
            //     ...(IBR_OP4OEData.templateB.itIPTwo && { itIPTwo: IBR_OP4OEData.templateB.itIPTwo }),
            //     ...(IBR_OP4OEData.templateB.itGatewayTwo && { itGatewayTwo: IBR_OP4OEData.templateB.itGatewayTwo }),
            //     ...(IBR_OP4OEData.templateB.itSubnetTwo && { itSubnetTwo: IBR_OP4OEData.templateB.itSubnetTwo }),
            //     ...(IBR_OP4OEData.templateB.itDNSTwo && { itDNSTwo: IBR_OP4OEData.templateB.itDNSTwo }),
            //     ...(IBR_OP4OEData.templateB.itSMTPTwo && { itSMTPTwo: IBR_OP4OEData.templateB.itSMTPTwo }),
            //     ...(IBR_OP4OEData.templateB.itNameThree && { itNameThree: IBR_OP4OEData.templateB.itNameThree }),
            //     ...(IBR_OP4OEData.templateB.itIPThree && { itIPThree: IBR_OP4OEData.templateB.itIPThree }),
            //     ...(IBR_OP4OEData.templateB.itGatewayThree && { itGatewayThree: IBR_OP4OEData.templateB.itGatewayThree }),
            //     ...(IBR_OP4OEData.templateB.itSubnetThree && { itSubnetThree: IBR_OP4OEData.templateB.itSubnetThree }),
            //     ...(IBR_OP4OEData.templateB.itDNSThree && { itDNSThree: IBR_OP4OEData.templateB.itDNSThree }),
            //     ...(IBR_OP4OEData.templateB.itSMTPThree && { itSMTPThree: IBR_OP4OEData.templateB.itSMTPThree }),
            //     ...(IBR_OP4OEData.templateB.itAdditionalNotes && { itAdditionalNotes: IBR_OP4OEData.templateB.itAdditionalNotes }),
            //     ...(IBR_OP4OEData.templateB.piuDistance && { piuDistance: IBR_OP4OEData.templateB.piuDistance }),
            //     ...(IBR_OP4OEData.templateB.switchDistance && { switchDistance: IBR_OP4OEData.templateB.switchDistance }),
            //     ...(IBR_OP4OEData.templateB.ampPickup && { ampPickup: IBR_OP4OEData.templateB.ampPickup }),
            //     ...(IBR_OP4OEData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_OP4OEData.templateB.fromAirTakeUpDistance }),
            //     ...(IBR_OP4OEData.templateB.specialControllerOptions && { specialControllerOptions: IBR_OP4OEData.templateB.specialControllerOptions })
            // }),            
            ...(IBR_OP4OEData.surrondingTemp && { surrondingTemp: IBR_OP4OEData.surrondingTemp }),
            ...(IBR_OP4OEData.conveyorLoaded && { conveyorLoaded: IBR_OP4OEData.conveyorLoaded }),
            ...(IBR_OP4OEData.conveyorSwing && { conveyorSwing: IBR_OP4OEData.conveyorSwing }),
            ...(IBR_OP4OEData.strandStatus && { strandStatus: IBR_OP4OEData.strandStatus }),
            ...(IBR_OP4OEData.plantLayout && { plantLayout: IBR_OP4OEData.plantLayout }),
            ...(IBR_OP4OEData.requiredPics && { requiredPics: IBR_OP4OEData.requiredPics }),
            ...(IBR_OP4OEData.operatingVoltage && { operatingVoltage: IBR_OP4OEData.operatingVoltage }),
            ...(IBR_OP4OEData.controlVoltage && { controlVoltage: IBR_OP4OEData.controlVoltage }),
            ...(IBR_OP4OEData.wheelOpenType && { wheelOpenType: IBR_OP4OEData.wheelOpenType }),
            ...(IBR_OP4OEData.wheelClosedType && { wheelClosedType: IBR_OP4OEData.wheelClosedType }),
            ...(IBR_OP4OEData.openStatus && { openStatus: IBR_OP4OEData.openStatus }),
            ...(IBR_OP4OEData.freeWheelStatus && { freeWheelStatus: IBR_OP4OEData.freeWheelStatus }),
            ...(IBR_OP4OEData.guideRollerStatus && { guideRollerStatus: IBR_OP4OEData.guideRollerStatus }),
            ...(IBR_OP4OEData.openRaceStyle && { openRaceStyle: IBR_OP4OEData.openRaceStyle }),
            ...(IBR_OP4OEData.closedRaceStyle && { closedRaceStyle: IBR_OP4OEData.closedRaceStyle }),
            ...(IBR_OP4OEData.holeStatus && { holeStatus: IBR_OP4OEData.holeStatus }),
            ...(IBR_OP4OEData.actuatorStatus && { actuatorStatus: IBR_OP4OEData.actuatorStatus }),
            ...(IBR_OP4OEData.pivotStatus && { pivotStatus: IBR_OP4OEData.pivotStatus }),
            ...(IBR_OP4OEData.kingPinStatus && { kingPinStatus: IBR_OP4OEData.kingPinStatus }),
            ...(IBR_OP4OEData.outboardStatus && { outboardStatus: IBR_OP4OEData.outboardStatus }),
            ...(IBR_OP4OEData.railLubeStatus && { railLubeStatus: IBR_OP4OEData.railLubeStatus }),
            ...(IBR_OP4OEData.lubeBrand && { lubeBrand: IBR_OP4OEData.lubeBrand }),
            ...(IBR_OP4OEData.lubeType && { lubeType: IBR_OP4OEData.lubeType }),
            ...(IBR_OP4OEData.lubeViscosity && { lubeViscosity: IBR_OP4OEData.lubeViscosity }),
            ...(IBR_OP4OEData.chainMaster && { chainMaster: IBR_OP4OEData.chainMaster }),
            ...(IBR_OP4OEData.timerStatus && { timerStatus: IBR_OP4OEData.timerStatus }),
            ...(IBR_OP4OEData.electricStatus && { electricStatus: IBR_OP4OEData.electricStatus }),
            ...(IBR_OP4OEData.pneumaticStatus && { pneumaticStatus: IBR_OP4OEData.pneumaticStatus }),
            ...(IBR_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: IBR_OP4OEData.mightyLubeMonitoring }),
            ...(IBR_OP4OEData.plcConnection && { plcConnection: IBR_OP4OEData.plcConnection }),
            ...(IBR_OP4OEData.otherControllerInfo && { otherControllerInfo: IBR_OP4OEData.otherControllerInfo }),
            ...(IBR_OP4OEData.ibrUnitType && { ibrUnitType: IBR_OP4OEData.ibrUnitType }),
            ...(IBR_OP4OEData.ibrChainA1 && { ibrChainA1: IBR_OP4OEData.ibrChainA1 }),
            ...(IBR_OP4OEData.ibrChainB1 && { ibrChainB1: IBR_OP4OEData.ibrChainB1 }),
            ...(IBR_OP4OEData.ibrChainC1 && { ibrChainC1: IBR_OP4OEData.ibrChainC1 }),
            ...(IBR_OP4OEData.ibrChainD1 && { ibrChainD1: IBR_OP4OEData.ibrChainD1 }),
            ...(IBR_OP4OEData.ibrChainF1 && { ibrChainF1: IBR_OP4OEData.ibrChainF1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;