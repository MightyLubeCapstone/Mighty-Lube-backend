const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_ES = require("../models/FRO_ES");
const templateB = require("../models/templateB");

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
            
            // monitorData: new templateB({
            //     existingMonitor: FRO_ESData.templateB.existingMonitor,
            //     newMonitor: FRO_ESData.templateB.newMonitor,
            //     ...(FRO_ESData.templateB.dcuStatus && { dcuStatus: FRO_ESData.templateB.dcuStatus }),
            //     ...(FRO_ESData.templateB.dcuNum && { dcuNum: FRO_ESData.templateB.dcuNum }),
            //     ...(FRO_ESData.templateB.existingWindows && { existingWindows: FRO_ESData.templateB.existingWindows }),
            //     ...(FRO_ESData.templateB.existingHeadUnit && { existingHeadUnit: FRO_ESData.templateB.existingHeadUnit }),
            //     ...(FRO_ESData.templateB.existingDCU && { existingDCU: FRO_ESData.templateB.existingDCU }),
            //     ...(FRO_ESData.templateB.existingPowerInterface && { existingPowerInterface: FRO_ESData.templateB.existingPowerInterface }),
            //     ...(FRO_ESData.templateB.newReservoir && { newReservoir: FRO_ESData.templateB.newReservoir }),
            //     ...(FRO_ESData.templateB.reservoirSize && { reservoirSize: FRO_ESData.templateB.reservoirSize }),
            //     ...(FRO_ESData.templateB.otherReservoirSize && { otherReservoirSize: FRO_ESData.templateB.otherReservoirSize }),
            //     ...(FRO_ESData.templateB.newReservoirNum && { newReservoirNum: FRO_ESData.templateB.newReservoirNum }),
            //     ...(FRO_ESData.templateB.typeMonitor && { typeMonitor: FRO_ESData.templateB.typeMonitor }),
            //     ...(FRO_ESData.templateB.driveMotorAmp && { driveMotorAmp: FRO_ESData.templateB.driveMotorAmp }),
            //     ...(FRO_ESData.templateB.driveMotorAmpNum && { driveMotorAmpNum: FRO_ESData.templateB.driveMotorAmpNum }),
            //     ...(FRO_ESData.templateB.driveTakeUpAir && { driveTakeUpAir: FRO_ESData.templateB.driveTakeUpAir }),
            //     ...(FRO_ESData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_ESData.templateB.driveTakeUpAirNum }),
            //     ...(FRO_ESData.templateB.takeUpDistance && { takeUpDistance: FRO_ESData.templateB.takeUpDistance }),
            //     ...(FRO_ESData.templateB.takeUpDistanceNum && { takeUpDistanceNum: FRO_ESData.templateB.takeUpDistanceNum }),
            //     ...(FRO_ESData.templateB.driveTemp && { driveTemp: FRO_ESData.templateB.driveTemp }),
            //     ...(FRO_ESData.templateB.driveTempNum && { driveTempNum: FRO_ESData.templateB.driveTempNum }),
            //     ...(FRO_ESData.templateB.driveVibration && { driveVibration: FRO_ESData.templateB.driveVibration }),
            //     ...(FRO_ESData.templateB.driveVibrationNum && { driveVibrationNum: FRO_ESData.templateB.driveVibrationNum }),
            //     ...(FRO_ESData.templateB.dogPitch && { dogPitch: FRO_ESData.templateB.dogPitch }),
            //     ...(FRO_ESData.templateB.dogPitchNum && { dogPitchNum: FRO_ESData.templateB.dogPitchNum }),
            //     ...(FRO_ESData.templateB.paintMarker && { paintMarker: FRO_ESData.templateB.paintMarker }),
            //     ...(FRO_ESData.templateB.paintMarkerNum && { paintMarkerNum: FRO_ESData.templateB.paintMarkerNum }),
            //     ...(FRO_ESData.templateB.chainVision && { chainVision: FRO_ESData.templateB.chainVision }),
            //     ...(FRO_ESData.templateB.lubeVision && { lubeVision: FRO_ESData.templateB.lubeVision }),
            //     ...(FRO_ESData.templateB.trolleyVision && { trolleyVision: FRO_ESData.templateB.trolleyVision }),
            //     ...(FRO_ESData.templateB.trolleyDetect && { trolleyDetect: FRO_ESData.templateB.trolleyDetect }),
            //     ...(FRO_ESData.templateB.omniView && { omniView: FRO_ESData.templateB.omniView }),
            //     ...(FRO_ESData.templateB.dcuUpgradeNum && { dcuUpgradeNum: FRO_ESData.templateB.dcuUpgradeNum }),
            //     ...(FRO_ESData.templateB.itNameOne && { itNameOne: FRO_ESData.templateB.itNameOne }),
            //     ...(FRO_ESData.templateB.itIPOne && { itIPOne: FRO_ESData.templateB.itIPOne }),
            //     ...(FRO_ESData.templateB.itGatewayOne && { itGatewayOne: FRO_ESData.templateB.itGatewayOne }),
            //     ...(FRO_ESData.templateB.itSubnetOne && { itSubnetOne: FRO_ESData.templateB.itSubnetOne }),
            //     ...(FRO_ESData.templateB.itDNSOne && { itDNSOne: FRO_ESData.templateB.itDNSOne }),
            //     ...(FRO_ESData.templateB.itSMTPOne && { itSMTPOne: FRO_ESData.templateB.itSMTPOne }),
            //     ...(FRO_ESData.templateB.itNameTwo && { itNameTwo: FRO_ESData.templateB.itNameTwo }),
            //     ...(FRO_ESData.templateB.itIPTwo && { itIPTwo: FRO_ESData.templateB.itIPTwo }),
            //     ...(FRO_ESData.templateB.itGatewayTwo && { itGatewayTwo: FRO_ESData.templateB.itGatewayTwo }),
            //     ...(FRO_ESData.templateB.itSubnetTwo && { itSubnetTwo: FRO_ESData.templateB.itSubnetTwo }),
            //     ...(FRO_ESData.templateB.itDNSTwo && { itDNSTwo: FRO_ESData.templateB.itDNSTwo }),
            //     ...(FRO_ESData.templateB.itSMTPTwo && { itSMTPTwo: FRO_ESData.templateB.itSMTPTwo }),
            //     ...(FRO_ESData.templateB.itNameThree && { itNameThree: FRO_ESData.templateB.itNameThree }),
            //     ...(FRO_ESData.templateB.itIPThree && { itIPThree: FRO_ESData.templateB.itIPThree }),
            //     ...(FRO_ESData.templateB.itGatewayThree && { itGatewayThree: FRO_ESData.templateB.itGatewayThree }),
            //     ...(FRO_ESData.templateB.itSubnetThree && { itSubnetThree: FRO_ESData.templateB.itSubnetThree }),
            //     ...(FRO_ESData.templateB.itDNSThree && { itDNSThree: FRO_ESData.templateB.itDNSThree }),
            //     ...(FRO_ESData.templateB.itSMTPThree && { itSMTPThree: FRO_ESData.templateB.itSMTPThree }),
            //     ...(FRO_ESData.templateB.itAdditionalNotes && { itAdditionalNotes: FRO_ESData.templateB.itAdditionalNotes }),
            //     ...(FRO_ESData.templateB.piuDistance && { piuDistance: FRO_ESData.templateB.piuDistance }),
            //     ...(FRO_ESData.templateB.switchDistance && { switchDistance: FRO_ESData.templateB.switchDistance }),
            //     ...(FRO_ESData.templateB.ampPickup && { ampPickup: FRO_ESData.templateB.ampPickup }),
            //     ...(FRO_ESData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_ESData.templateB.fromAirTakeUpDistance }),
            //     ...(FRO_ESData.templateB.specialControllerOptions && { specialControllerOptions: FRO_ESData.templateB.specialControllerOptions })
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