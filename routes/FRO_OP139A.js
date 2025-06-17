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

            // monitorData: new templateA({
            //     existingMonitor: FRO_OP139AData.templateA.existingMonitor,
            //     newMonitor: FRO_OP139AData.templateA.newMonitor,
            //     ...(FRO_OP139AData.templateA.dcuStatus && { dcuStatus: FRO_OP139AData.templateA.dcuStatus }),
            //     ...(FRO_OP139AData.templateA.dcuNum && { dcuNum: FRO_OP139AData.templateA.dcuNum }),
            //     ...(FRO_OP139AData.templateA.existingWindows && { existingWindows: FRO_OP139AData.templateA.existingWindows }),
            //     ...(FRO_OP139AData.templateA.existingHeadUnit && { existingHeadUnit: FRO_OP139AData.templateA.existingHeadUnit }),
            //     ...(FRO_OP139AData.templateA.existingDCU && { existingDCU: FRO_OP139AData.templateA.existingDCU }),
            //     ...(FRO_OP139AData.templateA.existingPowerInterface && { existingPowerInterface: FRO_OP139AData.templateA.existingPowerInterface }),
            //     ...(FRO_OP139AData.templateA.newReservoir && { newReservoir: FRO_OP139AData.templateA.newReservoir }),
            //     ...(FRO_OP139AData.templateA.reservoirSize && { reservoirSize: FRO_OP139AData.templateA.reservoirSize }),
            //     ...(FRO_OP139AData.templateA.otherReservoirSize && { otherReservoirSize: FRO_OP139AData.templateA.otherReservoirSize }),
            //     ...(FRO_OP139AData.templateA.newReservoirNum && { newReservoirNum: FRO_OP139AData.templateA.newReservoirNum }),
            //     ...(FRO_OP139AData.templateA.typeMonitor && { typeMonitor: FRO_OP139AData.templateA.typeMonitor }),
            //     ...(FRO_OP139AData.templateA.driveMotorAmp && { driveMotorAmp: FRO_OP139AData.templateA.driveMotorAmp }),
            //     ...(FRO_OP139AData.templateA.driveMotorAmpNum && { driveMotorAmpNum: FRO_OP139AData.templateA.driveMotorAmpNum }),
            //     ...(FRO_OP139AData.templateA.driveTakeUpAir && { driveTakeUpAir: FRO_OP139AData.templateA.driveTakeUpAir }),
            //     ...(FRO_OP139AData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_OP139AData.templateA.driveTakeUpAirNum }),
            //     ...(FRO_OP139AData.templateA.takeUpDistance && { takeUpDistance: FRO_OP139AData.templateA.takeUpDistance }),
            //     ...(FRO_OP139AData.templateA.takeUpDistanceNum && { takeUpDistanceNum: FRO_OP139AData.templateA.takeUpDistanceNum }),
            //     ...(FRO_OP139AData.templateA.driveTemp && { driveTemp: FRO_OP139AData.templateA.driveTemp }),
            //     ...(FRO_OP139AData.templateA.driveTempNum && { driveTempNum: FRO_OP139AData.templateA.driveTempNum }),
            //     ...(FRO_OP139AData.templateA.driveVibration && { driveVibration: FRO_OP139AData.templateA.driveVibration }),
            //     ...(FRO_OP139AData.templateA.driveVibrationNum && { driveVibrationNum: FRO_OP139AData.templateA.driveVibrationNum }),
            //     ...(FRO_OP139AData.templateA.dogPitch && { dogPitch: FRO_OP139AData.templateA.dogPitch }),
            //     ...(FRO_OP139AData.templateA.dogPitchNum && { dogPitchNum: FRO_OP139AData.templateA.dogPitchNum }),
            //     ...(FRO_OP139AData.templateA.paintMarker && { paintMarker: FRO_OP139AData.templateA.paintMarker }),
            //     ...(FRO_OP139AData.templateA.paintMarkerNum && { paintMarkerNum: FRO_OP139AData.templateA.paintMarkerNum }),
            //     ...(FRO_OP139AData.templateA.chainVision && { chainVision: FRO_OP139AData.templateA.chainVision }),
            //     ...(FRO_OP139AData.templateA.lubeVision && { lubeVision: FRO_OP139AData.templateA.lubeVision }),
            //     ...(FRO_OP139AData.templateA.trolleyVision && { trolleyVision: FRO_OP139AData.templateA.trolleyVision }),
            //     ...(FRO_OP139AData.templateA.trolleyDetect && { trolleyDetect: FRO_OP139AData.templateA.trolleyDetect }),
            //     ...(FRO_OP139AData.templateA.omniView && { omniView: FRO_OP139AData.templateA.omniView }),
            //     ...(FRO_OP139AData.templateA.dcuUpgradeNum && { dcuUpgradeNum: FRO_OP139AData.templateA.dcuUpgradeNum }),
            //     ...(FRO_OP139AData.templateA.itNameOne && { itNameOne: FRO_OP139AData.templateA.itNameOne }),
            //     ...(FRO_OP139AData.templateA.itIPOne && { itIPOne: FRO_OP139AData.templateA.itIPOne }),
            //     ...(FRO_OP139AData.templateA.itGatewayOne && { itGatewayOne: FRO_OP139AData.templateA.itGatewayOne }),
            //     ...(FRO_OP139AData.templateA.itSubnetOne && { itSubnetOne: FRO_OP139AData.templateA.itSubnetOne }),
            //     ...(FRO_OP139AData.templateA.itDNSOne && { itDNSOne: FRO_OP139AData.templateA.itDNSOne }),
            //     ...(FRO_OP139AData.templateA.itSMTPOne && { itSMTPOne: FRO_OP139AData.templateA.itSMTPOne }),
            //     ...(FRO_OP139AData.templateA.itNameTwo && { itNameTwo: FRO_OP139AData.templateA.itNameTwo }),
            //     ...(FRO_OP139AData.templateA.itIPTwo && { itIPTwo: FRO_OP139AData.templateA.itIPTwo }),
            //     ...(FRO_OP139AData.templateA.itGatewayTwo && { itGatewayTwo: FRO_OP139AData.templateA.itGatewayTwo }),
            //     ...(FRO_OP139AData.templateA.itSubnetTwo && { itSubnetTwo: FRO_OP139AData.templateA.itSubnetTwo }),
            //     ...(FRO_OP139AData.templateA.itDNSTwo && { itDNSTwo: FRO_OP139AData.templateA.itDNSTwo }),
            //     ...(FRO_OP139AData.templateA.itSMTPTwo && { itSMTPTwo: FRO_OP139AData.templateA.itSMTPTwo }),
            //     ...(FRO_OP139AData.templateA.itNameThree && { itNameThree: FRO_OP139AData.templateA.itNameThree }),
            //     ...(FRO_OP139AData.templateA.itIPThree && { itIPThree: FRO_OP139AData.templateA.itIPThree }),
            //     ...(FRO_OP139AData.templateA.itGatewayThree && { itGatewayThree: FRO_OP139AData.templateA.itGatewayThree }),
            //     ...(FRO_OP139AData.templateA.itSubnetThree && { itSubnetThree: FRO_OP139AData.templateA.itSubnetThree }),
            //     ...(FRO_OP139AData.templateA.itDNSThree && { itDNSThree: FRO_OP139AData.templateA.itDNSThree }),
            //     ...(FRO_OP139AData.templateA.itSMTPThree && { itSMTPThree: FRO_OP139AData.templateA.itSMTPThree }),
            //     ...(FRO_OP139AData.templateA.itAdditionalNotes && { itAdditionalNotes: FRO_OP139AData.templateA.itAdditionalNotes }),
            //     ...(FRO_OP139AData.templateA.piuDistance && { piuDistance: FRO_OP139AData.templateA.piuDistance }),
            //     ...(FRO_OP139AData.templateA.switchDistance && { switchDistance: FRO_OP139AData.templateA.switchDistance }),
            //     ...(FRO_OP139AData.templateA.ampPickup && { ampPickup: FRO_OP139AData.templateA.ampPickup }),
            //     ...(FRO_OP139AData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_OP139AData.templateA.fromAirTakeUpDistance }),
            //     ...(FRO_OP139AData.templateA.specialControllerOptions && { specialControllerOptions: FRO_OP139AData.templateA.specialControllerOptions })
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