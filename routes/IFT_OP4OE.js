const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IFT_OP4OE = require("../models/IFT_OP4OE");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { IFT_OP4OEData, numRequested } = req.body;

        const order = new IFT_OP4OE({
            ...(IFT_OP4OEData.conveyorName && { conveyorName: IFT_OP4OEData.conveyorName }),
            chainSize: IFT_OP4OEData.chainSize,
            ...(IFT_OP4OEData.otherChainSize && { otherChainSize: IFT_OP4OEData.otherChainSize }),
            industrialChainManufacturer: IFT_OP4OEData.industrialChainManufacturer,
            ...(IFT_OP4OEData.otherChainManufacturer && { otherChainManufacturer: IFT_OP4OEData.otherChainManufacturer }),
           wheelManufacturer: IFT_OP4OEData.wheelManufacturer,
            ...(IFT_OP4OEData.otherWheelManufacturer && { otherWheelManufacturer: IFT_OP4OEData.otherWheelManufacturer }),
          conveyorLength: IFT_OP4OEData.conveyorLength ,
            ...(IFT_OP4OEData.measurementUnit && { measurementUnit: IFT_OP4OEData.measurementUnit }),
            conveyorSpeed: IFT_OP4OEData.conveyorSpeed,
            ...(IFT_OP4OEData.speedUnit && { speedUnit: IFT_OP4OEData.speedUnit }),
            conveyorIndex: IFT_OP4OEData.conveyorIndex,
            ...(IFT_OP4OEData.travelDirection && { travelDirection: IFT_OP4OEData.travelDirection }),
            appEnviroment: IFT_OP4OEData.appEnviroment,
            ...(IFT_OP4OEData.ovenStatus && { ovenStatus: IFT_OP4OEData.ovenStatus }),
            ...(IFT_OP4OEData.ovenTemp && { ovenTemp: IFT_OP4OEData.ovenTemp }),
            ...(IFT_OP4OEData.otherAppEnviroment && { otherAppEnviroment: IFT_OP4OEData.otherAppEnviroment }),
            ...(IFT_OP4OEData.surroundingTemp && { surroundingTemp: IFT_OP4OEData.surroundingTemp }),
            ...(IFT_OP4OEData.conveyorLoaded && { conveyorLoaded: IFT_OP4OEData.conveyorLoaded }),
            ...(IFT_OP4OEData.conveyorSwing && { conveyorSwing: IFT_OP4OEData.conveyorSwing }),
            strandStatus: IFT_OP4OEData.strandStatus,
            ...(IFT_OP4OEData.plantLayout && { plantLayout: IFT_OP4OEData.plantLayout }),
            ...(IFT_OP4OEData.requiredPics && { requiredPics: IFT_OP4OEData.requiredPics }),
            pointsOfLube: IFT_OP4OEData.pointsOfLube ,
            m12Plugs: IFT_OP4OEData.m12Plugs ,
            operatingVoltage: IFT_OP4OEData.operatingVoltage ,
            controlVoltage: IFT_OP4OEData.controlVoltage,
            existingMonitor: IFT_OP4OEData.existingMonitor,
            newMonitor: IFT_OP4OEData.newMonitor,
            monitorData: {
                ...(IFT_OP4OEData.dcuStatus && { dcuStatus: IFT_OP4OEData.dcuStatus }),
                ...(IFT_OP4OEData.dcuNum && { dcuNum: IFT_OP4OEData.dcuNum }),
                ...(IFT_OP4OEData.existingWindows && { existingWindows: IFT_OP4OEData.existingWindows }),
                ...(IFT_OP4OEData.existingHeadUnit && { existingHeadUnit: IFT_OP4OEData.existingHeadUnit }),
                ...(IFT_OP4OEData.existingDCU && { existingDCU: IFT_OP4OEData.existingDCU }),
                ...(IFT_OP4OEData.existingPowerInterface && { existingPowerInterface: IFT_OP4OEData.existingPowerInterface }),
                ...(IFT_OP4OEData.newReservoir && { newReservoir: IFT_OP4OEData.newReservoir }),
                ...(IFT_OP4OEData.reservoirSize && { reservoirSize: IFT_OP4OEData.reservoirSize }),
                ...(IFT_OP4OEData.otherReservoirSize && { otherReservoirSize: IFT_OP4OEData.otherReservoirSize }),
                ...(IFT_OP4OEData.newReservoirNum && { newReservoirNum: IFT_OP4OEData.newReservoirNum }),
                ...(IFT_OP4OEData.typeMonitor && { typeMonitor: IFT_OP4OEData.typeMonitor }),
                ...(IFT_OP4OEData.driveMotorAmp && { driveMotorAmp: IFT_OP4OEData.driveMotorAmp }),
                ...(IFT_OP4OEData.driveMotorAmpNum && { driveMotorAmpNum: IFT_OP4OEData.driveMotorAmpNum }),
                ...(IFT_OP4OEData.driveTakeUpAir && { driveTakeUpAir: IFT_OP4OEData.driveTakeUpAir }),
                ...(IFT_OP4OEData.driveTakeUpAirNum && { driveTakeUpAirNum: IFT_OP4OEData.driveTakeUpAirNum }),
                ...(IFT_OP4OEData.takeUpDistance && { takeUpDistance: IFT_OP4OEData.takeUpDistance }),
                ...(IFT_OP4OEData.takeUpDistanceNum && { takeUpDistanceNum: IFT_OP4OEData.takeUpDistanceNum }),
                ...(IFT_OP4OEData.driveTemp && { driveTemp: IFT_OP4OEData.driveTemp }),
                ...(IFT_OP4OEData.driveTempNum && { driveTempNum: IFT_OP4OEData.driveTempNum }),
                ...(IFT_OP4OEData.driveVibration && { driveVibration: IFT_OP4OEData.driveVibration }),
                ...(IFT_OP4OEData.driveVibrationNum && { driveVibrationNum: IFT_OP4OEData.driveVibrationNum }),
                ...(IFT_OP4OEData.dogPitch && { dogPitch: IFT_OP4OEData.dogPitch }),
                ...(IFT_OP4OEData.dogPitchNum && { dogPitchNum: IFT_OP4OEData.dogPitchNum }),
                ...(IFT_OP4OEData.paintMarker && { paintMarker: IFT_OP4OEData.paintMarker }),
                ...(IFT_OP4OEData.paintMarkerNum && { paintMarkerNum: IFT_OP4OEData.paintMarkerNum }),
                ...(IFT_OP4OEData.chainVision && { chainVision: IFT_OP4OEData.chainVision }),
                ...(IFT_OP4OEData.lubeVision && { lubeVision: IFT_OP4OEData.lubeVision }),
                ...(IFT_OP4OEData.trolleyVision && { trolleyVision: IFT_OP4OEData.trolleyVision }),
                ...(IFT_OP4OEData.trolleyDetect && { trolleyDetect: IFT_OP4OEData.trolleyDetect }),
                ...(IFT_OP4OEData.omniView && { omniView: IFT_OP4OEData.omniView }),
                ...(IFT_OP4OEData.dcuUpgradeNum && { dcuUpgradeNum: IFT_OP4OEData.dcuUpgradeNum }),
                ...(IFT_OP4OEData.itNameOne && { itNameOne: IFT_OP4OEData.itNameOne }),
                ...(IFT_OP4OEData.itIPOne && { itIPOne: IFT_OP4OEData.itIPOne }),
                ...(IFT_OP4OEData.itGatewayOne && { itGatewayOne: IFT_OP4OEData.itGatewayOne }),
                ...(IFT_OP4OEData.itSubnetOne && { itSubnetOne: IFT_OP4OEData.itSubnetOne }),
                ...(IFT_OP4OEData.itDNSOne && { itDNSOne: IFT_OP4OEData.itDNSOne }),
                ...(IFT_OP4OEData.itSMTPOne && { itSMTPOne: IFT_OP4OEData.itSMTPOne }),
                ...(IFT_OP4OEData.itNameTwo && { itNameTwo: IFT_OP4OEData.itNameTwo }),
                ...(IFT_OP4OEData.itIPTwo && { itIPTwo: IFT_OP4OEData.itIPTwo }),
                ...(IFT_OP4OEData.itGatewayTwo && { itGatewayTwo: IFT_OP4OEData.itGatewayTwo }),
                ...(IFT_OP4OEData.itSubnetTwo && { itSubnetTwo: IFT_OP4OEData.itSubnetTwo }),
                ...(IFT_OP4OEData.itDNSTwo && { itDNSTwo: IFT_OP4OEData.itDNSTwo }),
                ...(IFT_OP4OEData.itSMTPTwo && { itSMTPTwo: IFT_OP4OEData.itSMTPTwo }),
                ...(IFT_OP4OEData.itNameThree && { itNameThree: IFT_OP4OEData.itNameThree }),
                ...(IFT_OP4OEData.itIPThree && { itIPThree: IFT_OP4OEData.itIPThree }),
                ...(IFT_OP4OEData.itGatewayThree && { itGatewayThree: IFT_OP4OEData.itGatewayThree }),
                ...(IFT_OP4OEData.itSubnetThree && { itSubnetThree: IFT_OP4OEData.itSubnetThree }),
                ...(IFT_OP4OEData.itDNSThree && { itDNSThree: IFT_OP4OEData.itDNSThree }),
                ...(IFT_OP4OEData.itSMTPThree && { itSMTPThree: IFT_OP4OEData.itSMTPThree }),
                ...(IFT_OP4OEData.itAdditionalNotes && { itAdditionalNotes: IFT_OP4OEData.itAdditionalNotes }),
                ...(IFT_OP4OEData.piuDistance && { piuDistance: IFT_OP4OEData.piuDistance }),
                ...(IFT_OP4OEData.switchDistance && { switchDistance: IFT_OP4OEData.switchDistance }),
                ...(IFT_OP4OEData.ampPickup && { ampPickup: IFT_OP4OEData.ampPickup }),
                ...(IFT_OP4OEData.fromAirTakeUpDistance && { fromAirTakeUpDistance: IFT_OP4OEData.fromAirTakeUpDistance }),
                ...(IFT_OP4OEData.specialControllerOptions && { specialControllerOptions: IFT_OP4OEData.specialControllerOptions }),
                ...(IFT_OP4OEData.operatingVoltage && { operatingVoltage: IFT_OP4OEData.operatingVoltage })

            },            
            ...(IFT_OP4OEData.wheelOpenType && { wheelOpenType: IFT_OP4OEData.wheelOpenType }),
            ...(IFT_OP4OEData.wheelClosedType && { wheelClosedType: IFT_OP4OEData.wheelClosedType }),
            ...(IFT_OP4OEData.openStatus && { openStatus: IFT_OP4OEData.openStatus }),
            ...(IFT_OP4OEData.freeWheelStatus && { freeWheelStatus: IFT_OP4OEData.freeWheelStatus }),
            ...(IFT_OP4OEData.guideRollerStatus && { guideRollerStatus: IFT_OP4OEData.guideRollerStatus }),
            ...(IFT_OP4OEData.openRaceStyle && { openRaceStyle: IFT_OP4OEData.openRaceStyle }),
            ...(IFT_OP4OEData.closedRaceStyle && { closedRaceStyle: IFT_OP4OEData.closedRaceStyle }),
            ...(IFT_OP4OEData.holeStatus && { holeStatus: IFT_OP4OEData.holeStatus }),
            ...(IFT_OP4OEData.actuatorStatus && { actuatorStatus: IFT_OP4OEData.actuatorStatus }),
            ...(IFT_OP4OEData.pivotStatus && { pivotStatus: IFT_OP4OEData.pivotStatus }),
            ...(IFT_OP4OEData.kingPinStatus && { kingPinStatus: IFT_OP4OEData.kingPinStatus }),
            ...(IFT_OP4OEData.outboardStatus && { outboardStatus: IFT_OP4OEData.outboardStatus }),
            ...(IFT_OP4OEData.railLubeStatus && { railLubeStatus: IFT_OP4OEData.railLubeStatus }),
            ...(IFT_OP4OEData.lubeBrand && { lubeBrand: IFT_OP4OEData.lubeBrand }),
            ...(IFT_OP4OEData.lubeType && { lubeType: IFT_OP4OEData.lubeType }),
            ...(IFT_OP4OEData.lubeViscosity && { lubeViscosity: IFT_OP4OEData.lubeViscosity }),
            ...(IFT_OP4OEData.chainMaster && { chainMaster: IFT_OP4OEData.chainMaster }),
            ...(IFT_OP4OEData.timerStatus && { timerStatus: IFT_OP4OEData.timerStatus }),
            ...(IFT_OP4OEData.electricStatus && { electricStatus: IFT_OP4OEData.electricStatus }),
            ...(IFT_OP4OEData.pneumaticStatus && { pneumaticStatus: IFT_OP4OEData.pneumaticStatus }),
            ...(IFT_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: IFT_OP4OEData.mightyLubeMonitoring }),
            ...(IFT_OP4OEData.plcConnection && { plcConnection: IFT_OP4OEData.plcConnection }),
            ...(IFT_OP4OEData.otherControllerInfo && { otherControllerInfo: IFT_OP4OEData.otherControllerInfo }),
            ...(IFT_OP4OEData.iftUnitType && { iftUnitType: IFT_OP4OEData.iftUnitType }),
            ...(IFT_OP4OEData.iftPowerA && { iftPowerA: IFT_OP4OEData.iftPowerA }),
            ...(IFT_OP4OEData.iftPowerB && { iftPowerB: IFT_OP4OEData.iftPowerB }),
            ...(IFT_OP4OEData.iftPowerG && { iftPowerG: IFT_OP4OEData.iftPowerG }),
            ...(IFT_OP4OEData.iftPowerH && { iftPowerH: IFT_OP4OEData.iftPowerH }),
            ...(IFT_OP4OEData.iftPowerJ && { iftPowerJ: IFT_OP4OEData.iftPowerJ }),
            ...(IFT_OP4OEData.iftPowerS1 && { iftPowerS1: IFT_OP4OEData.iftPowerS1 }),
            ...(IFT_OP4OEData.iftPowerT1 && { iftPowerT1: IFT_OP4OEData.iftPowerT1 }),
            ...(IFT_OP4OEData.iftPowerU1 && { iftPowerU1: IFT_OP4OEData.iftPowerU1 }),
            ...(IFT_OP4OEData.iftPowerV1 && { iftPowerV1: IFT_OP4OEData.iftPowerV1 }),
            ...(IFT_OP4OEData.iftPowerW1 && { iftPowerW1: IFT_OP4OEData.iftPowerW1 }),
            ...(IFT_OP4OEData.iftPowerX1 && { iftPowerX1: IFT_OP4OEData.iftPowerX1 }),
        });

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "IFT_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "IFT_OP4OE entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
