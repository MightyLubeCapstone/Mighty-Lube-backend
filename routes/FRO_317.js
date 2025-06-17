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

            // monitorData: new templateA({
            //     existingMonitor: ETI_OP48EData.templateA.existingMonitor,
            //     newMonitor: ETI_OP48EData.templateA.newMonitor,
            //     ...(ETI_OP48EData.templateA.dcuStatus && { dcuStatus: ETI_OP48EData.templateA.dcuStatus }),
            //     ...(ETI_OP48EData.templateA.dcuNum && { dcuNum: ETI_OP48EData.templateA.dcuNum }),
            //     ...(ETI_OP48EData.templateA.existingWindows && { existingWindows: ETI_OP48EData.templateA.existingWindows }),
            //     ...(ETI_OP48EData.templateA.existingHeadUnit && { existingHeadUnit: ETI_OP48EData.templateA.existingHeadUnit }),
            //     ...(ETI_OP48EData.templateA.existingDCU && { existingDCU: ETI_OP48EData.templateA.existingDCU }),
            //     ...(ETI_OP48EData.templateA.existingPowerInterface && { existingPowerInterface: ETI_OP48EData.templateA.existingPowerInterface }),
            //     ...(ETI_OP48EData.templateA.newReservoir && { newReservoir: ETI_OP48EData.templateA.newReservoir }),
            //     ...(ETI_OP48EData.templateA.reservoirSize && { reservoirSize: ETI_OP48EData.templateA.reservoirSize }),
            //     ...(ETI_OP48EData.templateA.otherReservoirSize && { otherReservoirSize: ETI_OP48EData.templateA.otherReservoirSize }),
            //     ...(ETI_OP48EData.templateA.newReservoirNum && { newReservoirNum: ETI_OP48EData.templateA.newReservoirNum }),
            //     ...(ETI_OP48EData.templateA.typeMonitor && { typeMonitor: ETI_OP48EData.templateA.typeMonitor }),
            //     ...(ETI_OP48EData.templateA.driveMotorAmp && { driveMotorAmp: ETI_OP48EData.templateA.driveMotorAmp }),
            //     ...(ETI_OP48EData.templateA.driveMotorAmpNum && { driveMotorAmpNum: ETI_OP48EData.templateA.driveMotorAmpNum }),
            //     ...(ETI_OP48EData.templateA.driveTakeUpAir && { driveTakeUpAir: ETI_OP48EData.templateA.driveTakeUpAir }),
            //     ...(ETI_OP48EData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_OP48EData.templateA.driveTakeUpAirNum }),
            //     ...(ETI_OP48EData.templateA.takeUpDistance && { takeUpDistance: ETI_OP48EData.templateA.takeUpDistance }),
            //     ...(ETI_OP48EData.templateA.takeUpDistanceNum && { takeUpDistanceNum: ETI_OP48EData.templateA.takeUpDistanceNum }),
            //     ...(ETI_OP48EData.templateA.driveTemp && { driveTemp: ETI_OP48EData.templateA.driveTemp }),
            //     ...(ETI_OP48EData.templateA.driveTempNum && { driveTempNum: ETI_OP48EData.templateA.driveTempNum }),
            //     ...(ETI_OP48EData.templateA.driveVibration && { driveVibration: ETI_OP48EData.templateA.driveVibration }),
            //     ...(ETI_OP48EData.templateA.driveVibrationNum && { driveVibrationNum: ETI_OP48EData.templateA.driveVibrationNum }),
            //     ...(ETI_OP48EData.templateA.dogPitch && { dogPitch: ETI_OP48EData.templateA.dogPitch }),
            //     ...(ETI_OP48EData.templateA.dogPitchNum && { dogPitchNum: ETI_OP48EData.templateA.dogPitchNum }),
            //     ...(ETI_OP48EData.templateA.paintMarker && { paintMarker: ETI_OP48EData.templateA.paintMarker }),
            //     ...(ETI_OP48EData.templateA.paintMarkerNum && { paintMarkerNum: ETI_OP48EData.templateA.paintMarkerNum }),
            //     ...(ETI_OP48EData.templateA.chainVision && { chainVision: ETI_OP48EData.templateA.chainVision }),
            //     ...(ETI_OP48EData.templateA.lubeVision && { lubeVision: ETI_OP48EData.templateA.lubeVision }),
            //     ...(ETI_OP48EData.templateA.trolleyVision && { trolleyVision: ETI_OP48EData.templateA.trolleyVision }),
            //     ...(ETI_OP48EData.templateA.trolleyDetect && { trolleyDetect: ETI_OP48EData.templateA.trolleyDetect }),
            //     ...(ETI_OP48EData.templateA.omniView && { omniView: ETI_OP48EData.templateA.omniView }),
            //     ...(ETI_OP48EData.templateA.dcuUpgradeNum && { dcuUpgradeNum: ETI_OP48EData.templateA.dcuUpgradeNum }),
            //     ...(ETI_OP48EData.templateA.itNameOne && { itNameOne: ETI_OP48EData.templateA.itNameOne }),
            //     ...(ETI_OP48EData.templateA.itIPOne && { itIPOne: ETI_OP48EData.templateA.itIPOne }),
            //     ...(ETI_OP48EData.templateA.itGatewayOne && { itGatewayOne: ETI_OP48EData.templateA.itGatewayOne }),
            //     ...(ETI_OP48EData.templateA.itSubnetOne && { itSubnetOne: ETI_OP48EData.templateA.itSubnetOne }),
            //     ...(ETI_OP48EData.templateA.itDNSOne && { itDNSOne: ETI_OP48EData.templateA.itDNSOne }),
            //     ...(ETI_OP48EData.templateA.itSMTPOne && { itSMTPOne: ETI_OP48EData.templateA.itSMTPOne }),
            //     ...(ETI_OP48EData.templateA.itNameTwo && { itNameTwo: ETI_OP48EData.templateA.itNameTwo }),
            //     ...(ETI_OP48EData.templateA.itIPTwo && { itIPTwo: ETI_OP48EData.templateA.itIPTwo }),
            //     ...(ETI_OP48EData.templateA.itGatewayTwo && { itGatewayTwo: ETI_OP48EData.templateA.itGatewayTwo }),
            //     ...(ETI_OP48EData.templateA.itSubnetTwo && { itSubnetTwo: ETI_OP48EData.templateA.itSubnetTwo }),
            //     ...(ETI_OP48EData.templateA.itDNSTwo && { itDNSTwo: ETI_OP48EData.templateA.itDNSTwo }),
            //     ...(ETI_OP48EData.templateA.itSMTPTwo && { itSMTPTwo: ETI_OP48EData.templateA.itSMTPTwo }),
            //     ...(ETI_OP48EData.templateA.itNameThree && { itNameThree: ETI_OP48EData.templateA.itNameThree }),
            //     ...(ETI_OP48EData.templateA.itIPThree && { itIPThree: ETI_OP48EData.templateA.itIPThree }),
            //     ...(ETI_OP48EData.templateA.itGatewayThree && { itGatewayThree: ETI_OP48EData.templateA.itGatewayThree }),
            //     ...(ETI_OP48EData.templateA.itSubnetThree && { itSubnetThree: ETI_OP48EData.templateA.itSubnetThree }),
            //     ...(ETI_OP48EData.templateA.itDNSThree && { itDNSThree: ETI_OP48EData.templateA.itDNSThree }),
            //     ...(ETI_OP48EData.templateA.itSMTPThree && { itSMTPThree: ETI_OP48EData.templateA.itSMTPThree }),
            //     ...(ETI_OP48EData.templateA.itAdditionalNotes && { itAdditionalNotes: ETI_OP48EData.templateA.itAdditionalNotes }),
            //     ...(ETI_OP48EData.templateA.piuDistance && { piuDistance: ETI_OP48EData.templateA.piuDistance }),
            //     ...(ETI_OP48EData.templateA.switchDistance && { switchDistance: ETI_OP48EData.templateA.switchDistance }),
            //     ...(ETI_OP48EData.templateA.ampPickup && { ampPickup: ETI_OP48EData.templateA.ampPickup }),
            //     ...(ETI_OP48EData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_OP48EData.templateA.fromAirTakeUpDistance }),
            //     ...(ETI_OP48EData.templateA.specialControllerOptions && { specialControllerOptions: ETI_OP48EData.templateA.specialControllerOptions })
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