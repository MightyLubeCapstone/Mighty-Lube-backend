const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_OP139A = require("../models/FRO_OP139A");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_OP139A form
    try {
        const { FRO_OP139AData, numRequested } = req.body;
        const order = new FRO_OP139A({
            ...(FRO_OP139AData.conveyorName && { conveyorName: FRO_OP139AData.conveyorName }),
            ...(FRO_OP139AData.chainSize && { chainSize: FRO_OP139AData.chainSize }),
            ...(FRO_OP139AData.industrialChainManufacturer && { industrialChainManufacturer: FRO_OP139AData.industrialChainManufacturer }),
            otherChainManufacturer: FRO_OP139AData.otherChainManufacturer,
            ...(FRO_OP139AData.conveyorLength && { conveyorLength: FRO_OP139AData.conveyorLength }),
            ...(FRO_OP139AData.conveyorLengthUnit && { conveyorLengthUnit: FRO_OP139AData.conveyorLengthUnit }),
            ...(FRO_OP139AData.conveyorSpeed && { conveyorSpeed: FRO_OP139AData.conveyorSpeed }),
            ...(FRO_OP139AData.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_OP139AData.conveyorSpeedUnit }),
            ...(FRO_OP139AData.travelDirection && { travelDirection: FRO_OP139AData.travelDirection }),
            appEnviroment: FRO_OP139AData.appEnviroment,
            ...(FRO_OP139AData.ovenStatus && { ovenStatus: FRO_OP139AData.ovenStatus }),
            ...(FRO_OP139AData.ovenTemp && { ovenTemp: FRO_OP139AData.ovenTemp }),
            
            monitorData: new templateB({
                existingMonitor: FRO_OP139AData.templateB.existingMonitor,
                newMonitor: FRO_OP139AData.templateB.newMonitor,
                ...(FRO_OP139AData.templateB.dcuStatus && { dcuStatus: FRO_OP139AData.templateB.dcuStatus }),
                ...(FRO_OP139AData.templateB.dcuNum && { dcuNum: FRO_OP139AData.templateB.dcuNum }),
                ...(FRO_OP139AData.templateB.existingWindows && { existingWindows: FRO_OP139AData.templateB.existingWindows }),
                ...(FRO_OP139AData.templateB.existingHeadUnit && { existingHeadUnit: FRO_OP139AData.templateB.existingHeadUnit }),
                ...(FRO_OP139AData.templateB.existingDCU && { existingDCU: FRO_OP139AData.templateB.existingDCU }),
                ...(FRO_OP139AData.templateB.existingPowerInterface && { existingPowerInterface: FRO_OP139AData.templateB.existingPowerInterface }),
                ...(FRO_OP139AData.templateB.newReservoir && { newReservoir: FRO_OP139AData.templateB.newReservoir }),
                ...(FRO_OP139AData.templateB.reservoirSize && { reservoirSize: FRO_OP139AData.templateB.reservoirSize }),
                ...(FRO_OP139AData.templateB.otherReservoirSize && { otherReservoirSize: FRO_OP139AData.templateB.otherReservoirSize }),
                ...(FRO_OP139AData.templateB.newReservoirNum && { newReservoirNum: FRO_OP139AData.templateB.newReservoirNum }),
                ...(FRO_OP139AData.templateB.typeMonitor && { typeMonitor: FRO_OP139AData.templateB.typeMonitor }),
                ...(FRO_OP139AData.templateB.driveMotorAmp && { driveMotorAmp: FRO_OP139AData.templateB.driveMotorAmp }),
                ...(FRO_OP139AData.templateB.driveMotorAmpNum && { driveMotorAmpNum: FRO_OP139AData.templateB.driveMotorAmpNum }),
                ...(FRO_OP139AData.templateB.driveTakeUpAir && { driveTakeUpAir: FRO_OP139AData.templateB.driveTakeUpAir }),
                ...(FRO_OP139AData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_OP139AData.templateB.driveTakeUpAirNum }),
                ...(FRO_OP139AData.templateB.takeUpDistance && { takeUpDistance: FRO_OP139AData.templateB.takeUpDistance }),
                ...(FRO_OP139AData.templateB.takeUpDistanceNum && { takeUpDistanceNum: FRO_OP139AData.templateB.takeUpDistanceNum }),
                ...(FRO_OP139AData.templateB.driveTemp && { driveTemp: FRO_OP139AData.templateB.driveTemp }),
                ...(FRO_OP139AData.templateB.driveTempNum && { driveTempNum: FRO_OP139AData.templateB.driveTempNum }),
                ...(FRO_OP139AData.templateB.driveVibration && { driveVibration: FRO_OP139AData.templateB.driveVibration }),
                ...(FRO_OP139AData.templateB.driveVibrationNum && { driveVibrationNum: FRO_OP139AData.templateB.driveVibrationNum }),
                ...(FRO_OP139AData.templateB.dogPitch && { dogPitch: FRO_OP139AData.templateB.dogPitch }),
                ...(FRO_OP139AData.templateB.dogPitchNum && { dogPitchNum: FRO_OP139AData.templateB.dogPitchNum }),
                ...(FRO_OP139AData.templateB.paintMarker && { paintMarker: FRO_OP139AData.templateB.paintMarker }),
                ...(FRO_OP139AData.templateB.paintMarkerNum && { paintMarkerNum: FRO_OP139AData.templateB.paintMarkerNum }),
                ...(FRO_OP139AData.templateB.chainVision && { chainVision: FRO_OP139AData.templateB.chainVision }),
                ...(FRO_OP139AData.templateB.lubeVision && { lubeVision: FRO_OP139AData.templateB.lubeVision }),
                ...(FRO_OP139AData.templateB.trolleyVision && { trolleyVision: FRO_OP139AData.templateB.trolleyVision }),
                ...(FRO_OP139AData.templateB.trolleyDetect && { trolleyDetect: FRO_OP139AData.templateB.trolleyDetect }),
                ...(FRO_OP139AData.templateB.omniView && { omniView: FRO_OP139AData.templateB.omniView }),
                ...(FRO_OP139AData.templateB.dcuUpgradeNum && { dcuUpgradeNum: FRO_OP139AData.templateB.dcuUpgradeNum }),
                ...(FRO_OP139AData.templateB.itNameOne && { itNameOne: FRO_OP139AData.templateB.itNameOne }),
                ...(FRO_OP139AData.templateB.itIPOne && { itIPOne: FRO_OP139AData.templateB.itIPOne }),
                ...(FRO_OP139AData.templateB.itGatewayOne && { itGatewayOne: FRO_OP139AData.templateB.itGatewayOne }),
                ...(FRO_OP139AData.templateB.itSubnetOne && { itSubnetOne: FRO_OP139AData.templateB.itSubnetOne }),
                ...(FRO_OP139AData.templateB.itDNSOne && { itDNSOne: FRO_OP139AData.templateB.itDNSOne }),
                ...(FRO_OP139AData.templateB.itSMTPOne && { itSMTPOne: FRO_OP139AData.templateB.itSMTPOne }),
                ...(FRO_OP139AData.templateB.itNameTwo && { itNameTwo: FRO_OP139AData.templateB.itNameTwo }),
                ...(FRO_OP139AData.templateB.itIPTwo && { itIPTwo: FRO_OP139AData.templateB.itIPTwo }),
                ...(FRO_OP139AData.templateB.itGatewayTwo && { itGatewayTwo: FRO_OP139AData.templateB.itGatewayTwo }),
                ...(FRO_OP139AData.templateB.itSubnetTwo && { itSubnetTwo: FRO_OP139AData.templateB.itSubnetTwo }),
                ...(FRO_OP139AData.templateB.itDNSTwo && { itDNSTwo: FRO_OP139AData.templateB.itDNSTwo }),
                ...(FRO_OP139AData.templateB.itSMTPTwo && { itSMTPTwo: FRO_OP139AData.templateB.itSMTPTwo }),
                ...(FRO_OP139AData.templateB.itNameThree && { itNameThree: FRO_OP139AData.templateB.itNameThree }),
                ...(FRO_OP139AData.templateB.itIPThree && { itIPThree: FRO_OP139AData.templateB.itIPThree }),
                ...(FRO_OP139AData.templateB.itGatewayThree && { itGatewayThree: FRO_OP139AData.templateB.itGatewayThree }),
                ...(FRO_OP139AData.templateB.itSubnetThree && { itSubnetThree: FRO_OP139AData.templateB.itSubnetThree }),
                ...(FRO_OP139AData.templateB.itDNSThree && { itDNSThree: FRO_OP139AData.templateB.itDNSThree }),
                ...(FRO_OP139AData.templateB.itSMTPThree && { itSMTPThree: FRO_OP139AData.templateB.itSMTPThree }),
                ...(FRO_OP139AData.templateB.itAdditionalNotes && { itAdditionalNotes: FRO_OP139AData.templateB.itAdditionalNotes }),
                ...(FRO_OP139AData.templateB.piuDistance && { piuDistance: FRO_OP139AData.templateB.piuDistance }),
                ...(FRO_OP139AData.templateB.switchDistance && { switchDistance: FRO_OP139AData.templateB.switchDistance }),
                ...(FRO_OP139AData.templateB.ampPickup && { ampPickup: FRO_OP139AData.templateB.ampPickup }),
                ...(FRO_OP139AData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_OP139AData.templateB.fromAirTakeUpDistance }),
                ...(FRO_OP139AData.templateB.specialControllerOptions && { specialControllerOptions: FRO_OP139AData.templateB.specialControllerOptions })
            }),            
            ...(FRO_OP139AData.surroundingTemp && { surroundingTemp: FRO_OP139AData.surroundingTemp }),
            ...(FRO_OP139AData.conveyorLoaded && { conveyorLoaded: FRO_OP139AData.conveyorLoaded }),
            ...(FRO_OP139AData.conveyorSwing && { conveyorSwing: FRO_OP139AData.conveyorSwing }),
            ...(FRO_OP139AData.orientationType && { orientationType: FRO_OP139AData.orientationType }),
            ...(FRO_OP139AData.controlVoltage && { controlVoltage: FRO_OP139AData.controlVoltage }),
            ...(FRO_OP139AData.compressedAir && { compressedAir: FRO_OP139AData.compressedAir }),
            ...(FRO_OP139AData.airSupplyType && { airSupplyType: FRO_OP139AData.airSupplyType }),
            ...(FRO_OP139AData.wheelOpenType && { wheelOpenType: FRO_OP139AData.wheelOpenType }),
            ...(FRO_OP139AData.wheelClosedType && { wheelClosedType: FRO_OP139AData.wheelClosedType }),
            ...(FRO_OP139AData.openStatus && { openStatus: FRO_OP139AData.openStatus }),
            ...(FRO_OP139AData.freeWheelStatus && { freeWheelStatus: FRO_OP139AData.freeWheelStatus }),
            ...(FRO_OP139AData.guideRollerStatus && { guideRollerStatus: FRO_OP139AData.guideRollerStatus }),
            ...(FRO_OP139AData.openRaceStyle && { openRaceStyle: FRO_OP139AData.openRaceStyle }),
            ...(FRO_OP139AData.closedRaceStyle && { closedRaceStyle: FRO_OP139AData.closedRaceStyle }),
            ...(FRO_OP139AData.holeStatus && { holeStatus: FRO_OP139AData.holeStatus }),
            ...(FRO_OP139AData.actuatorStatus && { actuatorStatus: FRO_OP139AData.actuatorStatus }),
            ...(FRO_OP139AData.pivotStatus && { pivotStatus: FRO_OP139AData.pivotStatus }),
            ...(FRO_OP139AData.kingPinStatus && { kingPinStatus: FRO_OP139AData.kingPinStatus }),
            ...(FRO_OP139AData.railLubeStatus && { railLubeStatus: FRO_OP139AData.railLubeStatus }),
            ...(FRO_OP139AData.externalLubeStatus && { externalLubeStatus: FRO_OP139AData.externalLubeStatus }),
            ...(FRO_OP139AData.lubeBrand && { lubeBrand: FRO_OP139AData.lubeBrand }),
            ...(FRO_OP139AData.lubeType && { lubeType: FRO_OP139AData.lubeType }),
            ...(FRO_OP139AData.lubeViscosity && { lubeViscosity: FRO_OP139AData.lubeViscosity }),
            ...(FRO_OP139AData.sideLubeStatus && { sideLubeStatus: FRO_OP139AData.sideLubeStatus }),
            ...(FRO_OP139AData.topLubeStatus && { topLubeStatus: FRO_OP139AData.topLubeStatus }),
            ...(FRO_OP139AData.chainMaster && { chainMaster: FRO_OP139AData.chainMaster }),
            ...(FRO_OP139AData.timerStatus && { timerStatus: FRO_OP139AData.timerStatus }),
            ...(FRO_OP139AData.electricStatus && { electricStatus: FRO_OP139AData.electricStatus }),
            ...(FRO_OP139AData.pneumaticStatus && { pneumaticStatus: FRO_OP139AData.pneumaticStatus }),
            ...(FRO_OP139AData.mightyLubeMonitoring && { mightyLubeMonitoring: FRO_OP139AData.mightyLubeMonitoring }),
            ...(FRO_OP139AData.plcConnection && { plcConnection: FRO_OP139AData.plcConnection }),
            ...(FRO_OP139AData.otherControllerInfo && { otherControllerInfo: FRO_OP139AData.otherControllerInfo }),
            ...(FRO_OP139AData.frUnitType && { frUnitType: FRO_OP139AData.frUnitType }),
            ...(FRO_OP139AData.frOverheadG && { frOverheadG: FRO_OP139AData.frOverheadG }),
            ...(FRO_OP139AData.frOverheadH && { frOverheadH: FRO_OP139AData.frOverheadH }),
            ...(FRO_OP139AData.frOverheadK && { frOverheadK: FRO_OP139AData.frOverheadK }),
            ...(FRO_OP139AData.frOverheadK2 && { frOverheadK2: FRO_OP139AData.frOverheadK2 }),
            ...(FRO_OP139AData.frInvertedA && { frInvertedA: FRO_OP139AData.frInvertedA }),
            ...(FRO_OP139AData.frInvertedB && { frInvertedB: FRO_OP139AData.frInvertedB }),
            ...(FRO_OP139AData.frInvertedG && { frInvertedG: FRO_OP139AData.frInvertedG }),
            ...(FRO_OP139AData.frInvertedH && { frInvertedH: FRO_OP139AData.frInvertedH }),
            ...(FRO_OP139AData.frInvertedK && { frInvertedK: FRO_OP139AData.frInvertedK }),
            ...(FRO_OP139AData.frInvertedL && { frInvertedL: FRO_OP139AData.frInvertedL }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_OP139A" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_OP139A entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;