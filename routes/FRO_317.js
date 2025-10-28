const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_317 = require("../models/FRO_317");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_317 form
    try {
        const { FRO_317Data, numRequested } = req.body;
        const order = new FRO_317({
            ...(FRO_317Data.conveyorName && { conveyorName: FRO_317Data.conveyorName }),
            ...(FRO_317Data.wheelManufacturer && { wheelManufacturer: FRO_317Data.wheelManufacturer }),
            ...(FRO_317Data.otherWheelManufacturer && { otherWheelManufacturer: FRO_317Data.otherWheelManufacturer }),
            ...(FRO_317Data.conveyorLength && { conveyorLength: FRO_317Data.conveyorLength }),
            ...(FRO_317Data.conveyorLengthUnit && { conveyorLengthUnit: FRO_317Data.conveyorLengthUnit }),
            ...(FRO_317Data.conveyorSpeed && { conveyorSpeed: FRO_317Data.conveyorSpeed }),
            ...(FRO_317Data.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_317Data.conveyorSpeedUnit }),
            ...(FRO_317Data.travelDirection && { travelDirection: FRO_317Data.travelDirection }),
            appEnviroment: FRO_317Data.appEnviroment,
            ...(FRO_317Data.ovenStatus && { ovenStatus: FRO_317Data.ovenStatus }),
            ...(FRO_317Data.ovenTemp && { ovenTemp: FRO_317Data.ovenTemp }),
            ...(FRO_317Data.surroundingTemp && { surroundingTemp: FRO_317Data.surroundingTemp }),
            ...(FRO_317Data.conveyorSwing && { conveyorSwing: FRO_317Data.conveyorSwing }),
            ...(FRO_317Data.orientation && { orientation: FRO_317Data.orientation }),
            ...(FRO_317Data.operatingVoltage && { operatingVoltage: FRO_317Data.operatingVoltage }),
            ...(FRO_317Data.controlVoltage && { controlVoltage: FRO_317Data.controlVoltage }),
            ...(FRO_317Data.compressedAir && { compressedAir: FRO_317Data.compressedAir }),
            ...(FRO_317Data.airSupply && { airSupply: FRO_317Data.airSupply }),

            // monitorData: {
            //     existingMonitor: ETI_OP48EData.existingMonitor,
            //     newMonitor: ETI_OP48EData.newMonitor,
            //     ...(ETI_OP48EData.dcuStatus && { dcuStatus: ETI_OP48EData.dcuStatus }),
            //     ...(ETI_OP48EData.dcuNum && { dcuNum: ETI_OP48EData.dcuNum }),
            //     ...(ETI_OP48EData.existingWindows && { existingWindows: ETI_OP48EData.existingWindows }),
            //     ...(ETI_OP48EData.existingHeadUnit && { existingHeadUnit: ETI_OP48EData.existingHeadUnit }),
            //     ...(ETI_OP48EData.existingDCU && { existingDCU: ETI_OP48EData.existingDCU }),
            //     ...(ETI_OP48EData.existingPowerInterface && { existingPowerInterface: ETI_OP48EData.existingPowerInterface }),
            //     ...(ETI_OP48EData.newReservoir && { newReservoir: ETI_OP48EData.newReservoir }),
            //     ...(ETI_OP48EData.reservoirSize && { reservoirSize: ETI_OP48EData.reservoirSize }),
            //     ...(ETI_OP48EData.otherReservoirSize && { otherReservoirSize: ETI_OP48EData.otherReservoirSize }),
            //     ...(ETI_OP48EData.newReservoirNum && { newReservoirNum: ETI_OP48EData.newReservoirNum }),
            //     ...(ETI_OP48EData.typeMonitor && { typeMonitor: ETI_OP48EData.typeMonitor }),
            //     ...(ETI_OP48EData.driveMotorAmp && { driveMotorAmp: ETI_OP48EData.driveMotorAmp }),
            //     ...(ETI_OP48EData.driveMotorAmpNum && { driveMotorAmpNum: ETI_OP48EData.driveMotorAmpNum }),
            //     ...(ETI_OP48EData.driveTakeUpAir && { driveTakeUpAir: ETI_OP48EData.driveTakeUpAir }),
            //     ...(ETI_OP48EData.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_OP48EData.driveTakeUpAirNum }),
            //     ...(ETI_OP48EData.takeUpDistance && { takeUpDistance: ETI_OP48EData.takeUpDistance }),
            //     ...(ETI_OP48EData.takeUpDistanceNum && { takeUpDistanceNum: ETI_OP48EData.takeUpDistanceNum }),
            //     ...(ETI_OP48EData.driveTemp && { driveTemp: ETI_OP48EData.driveTemp }),
            //     ...(ETI_OP48EData.driveTempNum && { driveTempNum: ETI_OP48EData.driveTempNum }),
            //     ...(ETI_OP48EData.driveVibration && { driveVibration: ETI_OP48EData.driveVibration }),
            //     ...(ETI_OP48EData.driveVibrationNum && { driveVibrationNum: ETI_OP48EData.driveVibrationNum }),
            //     ...(ETI_OP48EData.dogPitch && { dogPitch: ETI_OP48EData.dogPitch }),
            //     ...(ETI_OP48EData.dogPitchNum && { dogPitchNum: ETI_OP48EData.dogPitchNum }),
            //     ...(ETI_OP48EData.paintMarker && { paintMarker: ETI_OP48EData.paintMarker }),
            //     ...(ETI_OP48EData.paintMarkerNum && { paintMarkerNum: ETI_OP48EData.paintMarkerNum }),
            //     ...(ETI_OP48EData.chainVision && { chainVision: ETI_OP48EData.chainVision }),
            //     ...(ETI_OP48EData.lubeVision && { lubeVision: ETI_OP48EData.lubeVision }),
            //     ...(ETI_OP48EData.trolleyVision && { trolleyVision: ETI_OP48EData.trolleyVision }),
            //     ...(ETI_OP48EData.trolleyDetect && { trolleyDetect: ETI_OP48EData.trolleyDetect }),
            //     ...(ETI_OP48EData.omniView && { omniView: ETI_OP48EData.omniView }),
            //     ...(ETI_OP48EData.dcuUpgradeNum && { dcuUpgradeNum: ETI_OP48EData.dcuUpgradeNum }),
            //     ...(ETI_OP48EData.itNameOne && { itNameOne: ETI_OP48EData.itNameOne }),
            //     ...(ETI_OP48EData.itIPOne && { itIPOne: ETI_OP48EData.itIPOne }),
            //     ...(ETI_OP48EData.itGatewayOne && { itGatewayOne: ETI_OP48EData.itGatewayOne }),
            //     ...(ETI_OP48EData.itSubnetOne && { itSubnetOne: ETI_OP48EData.itSubnetOne }),
            //     ...(ETI_OP48EData.itDNSOne && { itDNSOne: ETI_OP48EData.itDNSOne }),
            //     ...(ETI_OP48EData.itSMTPOne && { itSMTPOne: ETI_OP48EData.itSMTPOne }),
            //     ...(ETI_OP48EData.itNameTwo && { itNameTwo: ETI_OP48EData.itNameTwo }),
            //     ...(ETI_OP48EData.itIPTwo && { itIPTwo: ETI_OP48EData.itIPTwo }),
            //     ...(ETI_OP48EData.itGatewayTwo && { itGatewayTwo: ETI_OP48EData.itGatewayTwo }),
            //     ...(ETI_OP48EData.itSubnetTwo && { itSubnetTwo: ETI_OP48EData.itSubnetTwo }),
            //     ...(ETI_OP48EData.itDNSTwo && { itDNSTwo: ETI_OP48EData.itDNSTwo }),
            //     ...(ETI_OP48EData.itSMTPTwo && { itSMTPTwo: ETI_OP48EData.itSMTPTwo }),
            //     ...(ETI_OP48EData.itNameThree && { itNameThree: ETI_OP48EData.itNameThree }),
            //     ...(ETI_OP48EData.itIPThree && { itIPThree: ETI_OP48EData.itIPThree }),
            //     ...(ETI_OP48EData.itGatewayThree && { itGatewayThree: ETI_OP48EData.itGatewayThree }),
            //     ...(ETI_OP48EData.itSubnetThree && { itSubnetThree: ETI_OP48EData.itSubnetThree }),
            //     ...(ETI_OP48EData.itDNSThree && { itDNSThree: ETI_OP48EData.itDNSThree }),
            //     ...(ETI_OP48EData.itSMTPThree && { itSMTPThree: ETI_OP48EData.itSMTPThree }),
            //     ...(ETI_OP48EData.itAdditionalNotes && { itAdditionalNotes: ETI_OP48EData.itAdditionalNotes }),
            //     ...(ETI_OP48EData.piuDistance && { piuDistance: ETI_OP48EData.piuDistance }),
            //     ...(ETI_OP48EData.switchDistance && { switchDistance: ETI_OP48EData.switchDistance }),
            //     ...(ETI_OP48EData.ampPickup && { ampPickup: ETI_OP48EData.ampPickup }),
            //     ...(ETI_OP48EData.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_OP48EData.fromAirTakeUpDistance }),
            //     ...(ETI_OP48EData.specialControllerOptions && { specialControllerOptions: ETI_OP48EData.specialControllerOptions })
            // }),            
            ...(FRO_317Data.freeWheelStatus && { freeWheelStatus: FRO_317Data.freeWheelStatus }),
            ...(FRO_317Data.guideRollerStatus && { guideRollerStatus: FRO_317Data.guideRollerStatus }),
            ...(FRO_317Data.openRaceStyle && { openRaceStyle: FRO_317Data.openRaceStyle }),
            ...(FRO_317Data.closedRaceStyle && { closedRaceStyle: FRO_317Data.closedRaceStyle }),
            ...(FRO_317Data.openStatus && { openStatus: FRO_317Data.openStatus }),
            ...(FRO_317Data.lubeBrand && { lubeBrand: FRO_317Data.lubeBrand }),
            ...(FRO_317Data.lubeType && { lubeType: FRO_317Data.lubeType }),
            ...(FRO_317Data.lubeViscosity && { lubeViscosity: FRO_317Data.lubeViscosity }),
            ...(FRO_317Data.currentGrease && { currentGrease: FRO_317Data.currentGrease }),
            ...(FRO_317Data.currentGreaseGrade && { currentGreaseGrade: FRO_317Data.currentGreaseGrade }),
            ...(FRO_317Data.zerkDirection && { zerkDirection: FRO_317Data.zerkDirection }),
            ...(FRO_317Data.zerkLocation && { zerkLocation: FRO_317Data.zerkLocation }),
            ...(FRO_317Data.chainMaster && { chainMaster: FRO_317Data.chainMaster }),
            ...(FRO_317Data.remoteStatus && { remoteStatus: FRO_317Data.remoteStatus }),
            ...(FRO_317Data.mountStatus && { mountStatus: FRO_317Data.mountStatus }),
            ...(FRO_317Data.otherUnitStatus && { otherUnitStatus: FRO_317Data.otherUnitStatus }),
            ...(FRO_317Data.timerStatus && { timerStatus: FRO_317Data.timerStatus }),
            ...(FRO_317Data.electricStatus && { electricStatus: FRO_317Data.electricStatus }),
            ...(FRO_317Data.mightyLubeMonitoring && { mightyLubeMonitoring: FRO_317Data.mightyLubeMonitoring }),
            ...(FRO_317Data.preMountType && { preMountType: FRO_317Data.preMountType }),
            ...(FRO_317Data.plcConnection && { plcConnection: FRO_317Data.plcConnection }),
            ...(FRO_317Data.otherControllerInfo && { otherControllerInfo: FRO_317Data.otherControllerInfo }),
            ...(FRO_317Data.frUnitType && { frUnitType: FRO_317Data.frUnitType }),
            ...(FRO_317Data.frInvertedA && { frInvertedA: FRO_317Data.frInvertedA }),
            ...(FRO_317Data.frInvertedB && { frInvertedB: FRO_317Data.frInvertedB }),
            ...(FRO_317Data.frInvertedE && { frInvertedE: FRO_317Data.frInvertedE }),
            ...(FRO_317Data.frInvertedG && { frInvertedG: FRO_317Data.frInvertedG }),
            ...(FRO_317Data.frInvertedH && { frInvertedH: FRO_317Data.frInvertedH }),
            ...(FRO_317Data.frInvertedS && { frInvertedS: FRO_317Data.frInvertedS }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_317" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_317 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;