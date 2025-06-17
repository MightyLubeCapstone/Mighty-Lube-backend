const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_ES = require("../models/FRO_ES");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_ES form
    try {
        const { FRO_ESData, numRequested } = req.body;
        const order = new FRO_ES({
            ...(FRO_ESData.conveyorName && { conveyorName: FRO_ESData.conveyorName }),
            ...(FRO_ESData.chainSize && { chainSize: FRO_ESData.chainSize }),
            ...(FRO_ESData.industrialChainManufacturer && { industrialChainManufacturer: FRO_ESData.industrialChainManufacturer }),
            ...(FRO_ESData.otherChainManufacturer && { otherChainManufacturer: FRO_ESData.otherChainManufacturer }),
            ...(FRO_ESData.conveyorLength && { conveyorLength: FRO_ESData.conveyorLength }),
            ...(FRO_ESData.conveyorLengthUnit && { conveyorLengthUnit: FRO_ESData.conveyorLengthUnit }),
            ...(FRO_ESData.conveyorSpeed && { conveyorSpeed: FRO_ESData.conveyorSpeed }),
            ...(FRO_ESData.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_ESData.conveyorSpeedUnit }),
            ...(FRO_ESData.travelDirection && { travelDirection: FRO_ESData.travelDirection }),
            appEnviroment: FRO_ESData.appEnviroment,
            ...(FRO_ESData.ovenStatus && { ovenStatus: FRO_ESData.ovenStatus }),
            ...(FRO_ESData.ovenTemp && { ovenTemp: FRO_ESData.ovenTemp }),
            
            // monitorData: new templateA({
            //     existingMonitor: FRO_ESData.templateA.existingMonitor,
            //     newMonitor: FRO_ESData.templateA.newMonitor,
            //     ...(FRO_ESData.templateA.dcuStatus && { dcuStatus: FRO_ESData.templateA.dcuStatus }),
            //     ...(FRO_ESData.templateA.dcuNum && { dcuNum: FRO_ESData.templateA.dcuNum }),
            //     ...(FRO_ESData.templateA.existingWindows && { existingWindows: FRO_ESData.templateA.existingWindows }),
            //     ...(FRO_ESData.templateA.existingHeadUnit && { existingHeadUnit: FRO_ESData.templateA.existingHeadUnit }),
            //     ...(FRO_ESData.templateA.existingDCU && { existingDCU: FRO_ESData.templateA.existingDCU }),
            //     ...(FRO_ESData.templateA.existingPowerInterface && { existingPowerInterface: FRO_ESData.templateA.existingPowerInterface }),
            //     ...(FRO_ESData.templateA.newReservoir && { newReservoir: FRO_ESData.templateA.newReservoir }),
            //     ...(FRO_ESData.templateA.reservoirSize && { reservoirSize: FRO_ESData.templateA.reservoirSize }),
            //     ...(FRO_ESData.templateA.otherReservoirSize && { otherReservoirSize: FRO_ESData.templateA.otherReservoirSize }),
            //     ...(FRO_ESData.templateA.newReservoirNum && { newReservoirNum: FRO_ESData.templateA.newReservoirNum }),
            //     ...(FRO_ESData.templateA.typeMonitor && { typeMonitor: FRO_ESData.templateA.typeMonitor }),
            //     ...(FRO_ESData.templateA.driveMotorAmp && { driveMotorAmp: FRO_ESData.templateA.driveMotorAmp }),
            //     ...(FRO_ESData.templateA.driveMotorAmpNum && { driveMotorAmpNum: FRO_ESData.templateA.driveMotorAmpNum }),
            //     ...(FRO_ESData.templateA.driveTakeUpAir && { driveTakeUpAir: FRO_ESData.templateA.driveTakeUpAir }),
            //     ...(FRO_ESData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_ESData.templateA.driveTakeUpAirNum }),
            //     ...(FRO_ESData.templateA.takeUpDistance && { takeUpDistance: FRO_ESData.templateA.takeUpDistance }),
            //     ...(FRO_ESData.templateA.takeUpDistanceNum && { takeUpDistanceNum: FRO_ESData.templateA.takeUpDistanceNum }),
            //     ...(FRO_ESData.templateA.driveTemp && { driveTemp: FRO_ESData.templateA.driveTemp }),
            //     ...(FRO_ESData.templateA.driveTempNum && { driveTempNum: FRO_ESData.templateA.driveTempNum }),
            //     ...(FRO_ESData.templateA.driveVibration && { driveVibration: FRO_ESData.templateA.driveVibration }),
            //     ...(FRO_ESData.templateA.driveVibrationNum && { driveVibrationNum: FRO_ESData.templateA.driveVibrationNum }),
            //     ...(FRO_ESData.templateA.dogPitch && { dogPitch: FRO_ESData.templateA.dogPitch }),
            //     ...(FRO_ESData.templateA.dogPitchNum && { dogPitchNum: FRO_ESData.templateA.dogPitchNum }),
            //     ...(FRO_ESData.templateA.paintMarker && { paintMarker: FRO_ESData.templateA.paintMarker }),
            //     ...(FRO_ESData.templateA.paintMarkerNum && { paintMarkerNum: FRO_ESData.templateA.paintMarkerNum }),
            //     ...(FRO_ESData.templateA.chainVision && { chainVision: FRO_ESData.templateA.chainVision }),
            //     ...(FRO_ESData.templateA.lubeVision && { lubeVision: FRO_ESData.templateA.lubeVision }),
            //     ...(FRO_ESData.templateA.trolleyVision && { trolleyVision: FRO_ESData.templateA.trolleyVision }),
            //     ...(FRO_ESData.templateA.trolleyDetect && { trolleyDetect: FRO_ESData.templateA.trolleyDetect }),
            //     ...(FRO_ESData.templateA.omniView && { omniView: FRO_ESData.templateA.omniView }),
            //     ...(FRO_ESData.templateA.dcuUpgradeNum && { dcuUpgradeNum: FRO_ESData.templateA.dcuUpgradeNum }),
            //     ...(FRO_ESData.templateA.itNameOne && { itNameOne: FRO_ESData.templateA.itNameOne }),
            //     ...(FRO_ESData.templateA.itIPOne && { itIPOne: FRO_ESData.templateA.itIPOne }),
            //     ...(FRO_ESData.templateA.itGatewayOne && { itGatewayOne: FRO_ESData.templateA.itGatewayOne }),
            //     ...(FRO_ESData.templateA.itSubnetOne && { itSubnetOne: FRO_ESData.templateA.itSubnetOne }),
            //     ...(FRO_ESData.templateA.itDNSOne && { itDNSOne: FRO_ESData.templateA.itDNSOne }),
            //     ...(FRO_ESData.templateA.itSMTPOne && { itSMTPOne: FRO_ESData.templateA.itSMTPOne }),
            //     ...(FRO_ESData.templateA.itNameTwo && { itNameTwo: FRO_ESData.templateA.itNameTwo }),
            //     ...(FRO_ESData.templateA.itIPTwo && { itIPTwo: FRO_ESData.templateA.itIPTwo }),
            //     ...(FRO_ESData.templateA.itGatewayTwo && { itGatewayTwo: FRO_ESData.templateA.itGatewayTwo }),
            //     ...(FRO_ESData.templateA.itSubnetTwo && { itSubnetTwo: FRO_ESData.templateA.itSubnetTwo }),
            //     ...(FRO_ESData.templateA.itDNSTwo && { itDNSTwo: FRO_ESData.templateA.itDNSTwo }),
            //     ...(FRO_ESData.templateA.itSMTPTwo && { itSMTPTwo: FRO_ESData.templateA.itSMTPTwo }),
            //     ...(FRO_ESData.templateA.itNameThree && { itNameThree: FRO_ESData.templateA.itNameThree }),
            //     ...(FRO_ESData.templateA.itIPThree && { itIPThree: FRO_ESData.templateA.itIPThree }),
            //     ...(FRO_ESData.templateA.itGatewayThree && { itGatewayThree: FRO_ESData.templateA.itGatewayThree }),
            //     ...(FRO_ESData.templateA.itSubnetThree && { itSubnetThree: FRO_ESData.templateA.itSubnetThree }),
            //     ...(FRO_ESData.templateA.itDNSThree && { itDNSThree: FRO_ESData.templateA.itDNSThree }),
            //     ...(FRO_ESData.templateA.itSMTPThree && { itSMTPThree: FRO_ESData.templateA.itSMTPThree }),
            //     ...(FRO_ESData.templateA.itAdditionalNotes && { itAdditionalNotes: FRO_ESData.templateA.itAdditionalNotes }),
            //     ...(FRO_ESData.templateA.piuDistance && { piuDistance: FRO_ESData.templateA.piuDistance }),
            //     ...(FRO_ESData.templateA.switchDistance && { switchDistance: FRO_ESData.templateA.switchDistance }),
            //     ...(FRO_ESData.templateA.ampPickup && { ampPickup: FRO_ESData.templateA.ampPickup }),
            //     ...(FRO_ESData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_ESData.templateA.fromAirTakeUpDistance }),
            //     ...(FRO_ESData.templateA.specialControllerOptions && { specialControllerOptions: FRO_ESData.templateA.specialControllerOptions })
            // }),            
            ...(FRO_ESData.conveyorLoaded && { conveyorLoaded: FRO_ESData.conveyorLoaded }),
            ...(FRO_ESData.conveyorSwing && { conveyorSwing: FRO_ESData.conveyorSwing }),
            ...(FRO_ESData.operatingVoltage && { operatingVoltage: FRO_ESData.operatingVoltage }),
            ...(FRO_ESData.controlVoltage && { controlVoltage: FRO_ESData.controlVoltage }),
            ...(FRO_ESData.wheelOpenType && { wheelOpenType: FRO_ESData.wheelOpenType }),
            ...(FRO_ESData.wheelClosedType && { wheelClosedType: FRO_ESData.wheelClosedType }),
            ...(FRO_ESData.openStatus && { openStatus: FRO_ESData.openStatus }),
            ...(FRO_ESData.freeWheelStatus && { freeWheelStatus: FRO_ESData.freeWheelStatus }),
            ...(FRO_ESData.guideRollerStatus && { guideRollerStatus: FRO_ESData.guideRollerStatus }),
            ...(FRO_ESData.openRaceStyle && { openRaceStyle: FRO_ESData.openRaceStyle }),
            ...(FRO_ESData.closedRaceStyle && { closedRaceStyle: FRO_ESData.closedRaceStyle }),
            ...(FRO_ESData.holeStatus && { holeStatus: FRO_ESData.holeStatus }),
            ...(FRO_ESData.freeWheelStatus && { freeWheelStatus: FRO_ESData.freeWheelStatus }),
            ...(FRO_ESData.actuatorStatus && { actuatorStatus: FRO_ESData.actuatorStatus }),
            ...(FRO_ESData.kingPinStatus && { kingPinStatus: FRO_ESData.kingPinStatus }),
            ...(FRO_ESData.railLubeStatus && { railLubeStatus: FRO_ESData.railLubeStatus }),
            ...(FRO_ESData.externalLubeStatus && { externalLubeStatus: FRO_ESData.externalLubeStatus }),
            ...(FRO_ESData.lubeBrand && { lubeBrand: FRO_ESData.lubeBrand }),
            ...(FRO_ESData.lubeType && { lubeType: FRO_ESData.lubeType }),
            ...(FRO_ESData.lubeViscosity && { lubeViscosity: FRO_ESData.lubeViscosity }),
            ...(FRO_ESData.sideLubeStatus && { sideLubeStatus: FRO_ESData.sideLubeStatus }),
            ...(FRO_ESData.topLubeStatus && { topLubeStatus: FRO_ESData.topLubeStatus }),
            ...(FRO_ESData.chainMaster && { chainMaster: FRO_ESData.chainMaster }),
            ...(FRO_ESData.timerStatus && { timerStatus: FRO_ESData.timerStatus }),
            ...(FRO_ESData.electricStatus && { electricStatus: FRO_ESData.electricStatus }),
            ...(FRO_ESData.pneumaticStatus && { pneumaticStatus: FRO_ESData.pneumaticStatus }),
            ...(FRO_ESData.mightyLubeMonitoring && { mightyLubeMonitoring: FRO_ESData.mightyLubeMonitoring }),
            ...(FRO_ESData.plcConnection && { plcConnection: FRO_ESData.plcConnection }),
            ...(FRO_ESData.otherControllerInfo && { otherControllerInfo: FRO_ESData.otherControllerInfo }),
            ...(FRO_ESData.frUnitType && { frUnitType: FRO_ESData.frUnitType }),
            ...(FRO_ESData.frOverheadG && { frOverheadG: FRO_ESData.frOverheadG }),
            ...(FRO_ESData.frOverheadH && { frOverheadH: FRO_ESData.frOverheadH }),
            ...(FRO_ESData.frOverheadK && { frOverheadK: FRO_ESData.frOverheadK }),
            ...(FRO_ESData.frInvertedA && { frInvertedA: FRO_ESData.frInvertedA }),
            ...(FRO_ESData.frInvertedB && { frInvertedB: FRO_ESData.frInvertedB }),
            ...(FRO_ESData.frInvertedG && { frInvertedG: FRO_ESData.frInvertedG }),
            ...(FRO_ESData.frInvertedH && { frInvertedH: FRO_ESData.frInvertedH }),
            ...(FRO_ESData.frInvertedK && { frInvertedK: FRO_ESData.frInvertedK }),
            ...(FRO_ESData.frInvertedL && { frInvertedL: FRO_ESData.frInvertedL }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_ES" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_ES entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;