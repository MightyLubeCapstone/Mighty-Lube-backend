const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_OP139A = require("../models/FRO_OP139A");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_OP139A form
    try {
        const { FRO_OP139AData, numRequested } = req.body;
        const order = new FRO_OP139A({
            ...(FRO_OP139AData.conveyorName && { conveyorName: FRO_OP139AData.conveyorName }),
            ...(FRO_OP139AData.chainSize && { chainSize: FRO_OP139AData.chainSize }),
            industrialChainManufacturer: FRO_OP139AData.industrialChainManufacturer,
            ...(FRO_OP139AData.otherChainManufacturer && { otherChainManufacturer: FRO_OP139AData.otherChainManufacturer }),
            ...(FRO_OP139AData.conveyorLength && { conveyorLength: FRO_OP139AData.conveyorLength }),
            ...(FRO_OP139AData.conveyorLengthUnit && { conveyorLengthUnit: FRO_OP139AData.conveyorLengthUnit }),
            ...(FRO_OP139AData.conveyorSpeed && { conveyorSpeed: FRO_OP139AData.conveyorSpeed }),
            ...(FRO_OP139AData.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_OP139AData.conveyorSpeedUnit }),
            ...(FRO_OP139AData.travelDirection && { travelDirection: FRO_OP139AData.travelDirection }),
            appEnviroment: FRO_OP139AData.appEnviroment,
            ...(FRO_OP139AData.ovenStatus && { ovenStatus: FRO_OP139AData.ovenStatus }),
            ...(FRO_OP139AData.ovenTemp && { ovenTemp: FRO_OP139AData.ovenTemp }),

            // monitorData: {
            //     existingMonitor: FRO_OP139AData.existingMonitor,
            //     newMonitor: FRO_OP139AData.newMonitor,
            //     ...(FRO_OP139AData.dcuStatus && { dcuStatus: FRO_OP139AData.dcuStatus }),
            //     ...(FRO_OP139AData.dcuNum && { dcuNum: FRO_OP139AData.dcuNum }),
            //     ...(FRO_OP139AData.existingWindows && { existingWindows: FRO_OP139AData.existingWindows }),
            //     ...(FRO_OP139AData.existingHeadUnit && { existingHeadUnit: FRO_OP139AData.existingHeadUnit }),
            //     ...(FRO_OP139AData.existingDCU && { existingDCU: FRO_OP139AData.existingDCU }),
            //     ...(FRO_OP139AData.existingPowerInterface && { existingPowerInterface: FRO_OP139AData.existingPowerInterface }),
            //     ...(FRO_OP139AData.newReservoir && { newReservoir: FRO_OP139AData.newReservoir }),
            //     ...(FRO_OP139AData.reservoirSize && { reservoirSize: FRO_OP139AData.reservoirSize }),
            //     ...(FRO_OP139AData.otherReservoirSize && { otherReservoirSize: FRO_OP139AData.otherReservoirSize }),
            //     ...(FRO_OP139AData.newReservoirNum && { newReservoirNum: FRO_OP139AData.newReservoirNum }),
            //     ...(FRO_OP139AData.typeMonitor && { typeMonitor: FRO_OP139AData.typeMonitor }),
            //     ...(FRO_OP139AData.driveMotorAmp && { driveMotorAmp: FRO_OP139AData.driveMotorAmp }),
            //     ...(FRO_OP139AData.driveMotorAmpNum && { driveMotorAmpNum: FRO_OP139AData.driveMotorAmpNum }),
            //     ...(FRO_OP139AData.driveTakeUpAir && { driveTakeUpAir: FRO_OP139AData.driveTakeUpAir }),
            //     ...(FRO_OP139AData.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_OP139AData.driveTakeUpAirNum }),
            //     ...(FRO_OP139AData.takeUpDistance && { takeUpDistance: FRO_OP139AData.takeUpDistance }),
            //     ...(FRO_OP139AData.takeUpDistanceNum && { takeUpDistanceNum: FRO_OP139AData.takeUpDistanceNum }),
            //     ...(FRO_OP139AData.driveTemp && { driveTemp: FRO_OP139AData.driveTemp }),
            //     ...(FRO_OP139AData.driveTempNum && { driveTempNum: FRO_OP139AData.driveTempNum }),
            //     ...(FRO_OP139AData.driveVibration && { driveVibration: FRO_OP139AData.driveVibration }),
            //     ...(FRO_OP139AData.driveVibrationNum && { driveVibrationNum: FRO_OP139AData.driveVibrationNum }),
            //     ...(FRO_OP139AData.dogPitch && { dogPitch: FRO_OP139AData.dogPitch }),
            //     ...(FRO_OP139AData.dogPitchNum && { dogPitchNum: FRO_OP139AData.dogPitchNum }),
            //     ...(FRO_OP139AData.paintMarker && { paintMarker: FRO_OP139AData.paintMarker }),
            //     ...(FRO_OP139AData.paintMarkerNum && { paintMarkerNum: FRO_OP139AData.paintMarkerNum }),
            //     ...(FRO_OP139AData.chainVision && { chainVision: FRO_OP139AData.chainVision }),
            //     ...(FRO_OP139AData.lubeVision && { lubeVision: FRO_OP139AData.lubeVision }),
            //     ...(FRO_OP139AData.trolleyVision && { trolleyVision: FRO_OP139AData.trolleyVision }),
            //     ...(FRO_OP139AData.trolleyDetect && { trolleyDetect: FRO_OP139AData.trolleyDetect }),
            //     ...(FRO_OP139AData.omniView && { omniView: FRO_OP139AData.omniView }),
            //     ...(FRO_OP139AData.dcuUpgradeNum && { dcuUpgradeNum: FRO_OP139AData.dcuUpgradeNum }),
            //     ...(FRO_OP139AData.itNameOne && { itNameOne: FRO_OP139AData.itNameOne }),
            //     ...(FRO_OP139AData.itIPOne && { itIPOne: FRO_OP139AData.itIPOne }),
            //     ...(FRO_OP139AData.itGatewayOne && { itGatewayOne: FRO_OP139AData.itGatewayOne }),
            //     ...(FRO_OP139AData.itSubnetOne && { itSubnetOne: FRO_OP139AData.itSubnetOne }),
            //     ...(FRO_OP139AData.itDNSOne && { itDNSOne: FRO_OP139AData.itDNSOne }),
            //     ...(FRO_OP139AData.itSMTPOne && { itSMTPOne: FRO_OP139AData.itSMTPOne }),
            //     ...(FRO_OP139AData.itNameTwo && { itNameTwo: FRO_OP139AData.itNameTwo }),
            //     ...(FRO_OP139AData.itIPTwo && { itIPTwo: FRO_OP139AData.itIPTwo }),
            //     ...(FRO_OP139AData.itGatewayTwo && { itGatewayTwo: FRO_OP139AData.itGatewayTwo }),
            //     ...(FRO_OP139AData.itSubnetTwo && { itSubnetTwo: FRO_OP139AData.itSubnetTwo }),
            //     ...(FRO_OP139AData.itDNSTwo && { itDNSTwo: FRO_OP139AData.itDNSTwo }),
            //     ...(FRO_OP139AData.itSMTPTwo && { itSMTPTwo: FRO_OP139AData.itSMTPTwo }),
            //     ...(FRO_OP139AData.itNameThree && { itNameThree: FRO_OP139AData.itNameThree }),
            //     ...(FRO_OP139AData.itIPThree && { itIPThree: FRO_OP139AData.itIPThree }),
            //     ...(FRO_OP139AData.itGatewayThree && { itGatewayThree: FRO_OP139AData.itGatewayThree }),
            //     ...(FRO_OP139AData.itSubnetThree && { itSubnetThree: FRO_OP139AData.itSubnetThree }),
            //     ...(FRO_OP139AData.itDNSThree && { itDNSThree: FRO_OP139AData.itDNSThree }),
            //     ...(FRO_OP139AData.itSMTPThree && { itSMTPThree: FRO_OP139AData.itSMTPThree }),
            //     ...(FRO_OP139AData.itAdditionalNotes && { itAdditionalNotes: FRO_OP139AData.itAdditionalNotes }),
            //     ...(FRO_OP139AData.piuDistance && { piuDistance: FRO_OP139AData.piuDistance }),
            //     ...(FRO_OP139AData.switchDistance && { switchDistance: FRO_OP139AData.switchDistance }),
            //     ...(FRO_OP139AData.ampPickup && { ampPickup: FRO_OP139AData.ampPickup }),
            //     ...(FRO_OP139AData.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_OP139AData.fromAirTakeUpDistance }),
            //     ...(FRO_OP139AData.specialControllerOptions && { specialControllerOptions: FRO_OP139AData.specialControllerOptions })
            // }),            
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