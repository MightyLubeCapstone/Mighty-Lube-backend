const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_317 = require("../models/FRO_317");
const templateB = require("../models/templateB");

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

            // monitorData: new templateB({
            //     existingMonitor: ETI_OP48EData.templateB.existingMonitor,
            //     newMonitor: ETI_OP48EData.templateB.newMonitor,
            //     ...(ETI_OP48EData.templateB.dcuStatus && { dcuStatus: ETI_OP48EData.templateB.dcuStatus }),
            //     ...(ETI_OP48EData.templateB.dcuNum && { dcuNum: ETI_OP48EData.templateB.dcuNum }),
            //     ...(ETI_OP48EData.templateB.existingWindows && { existingWindows: ETI_OP48EData.templateB.existingWindows }),
            //     ...(ETI_OP48EData.templateB.existingHeadUnit && { existingHeadUnit: ETI_OP48EData.templateB.existingHeadUnit }),
            //     ...(ETI_OP48EData.templateB.existingDCU && { existingDCU: ETI_OP48EData.templateB.existingDCU }),
            //     ...(ETI_OP48EData.templateB.existingPowerInterface && { existingPowerInterface: ETI_OP48EData.templateB.existingPowerInterface }),
            //     ...(ETI_OP48EData.templateB.newReservoir && { newReservoir: ETI_OP48EData.templateB.newReservoir }),
            //     ...(ETI_OP48EData.templateB.reservoirSize && { reservoirSize: ETI_OP48EData.templateB.reservoirSize }),
            //     ...(ETI_OP48EData.templateB.otherReservoirSize && { otherReservoirSize: ETI_OP48EData.templateB.otherReservoirSize }),
            //     ...(ETI_OP48EData.templateB.newReservoirNum && { newReservoirNum: ETI_OP48EData.templateB.newReservoirNum }),
            //     ...(ETI_OP48EData.templateB.typeMonitor && { typeMonitor: ETI_OP48EData.templateB.typeMonitor }),
            //     ...(ETI_OP48EData.templateB.driveMotorAmp && { driveMotorAmp: ETI_OP48EData.templateB.driveMotorAmp }),
            //     ...(ETI_OP48EData.templateB.driveMotorAmpNum && { driveMotorAmpNum: ETI_OP48EData.templateB.driveMotorAmpNum }),
            //     ...(ETI_OP48EData.templateB.driveTakeUpAir && { driveTakeUpAir: ETI_OP48EData.templateB.driveTakeUpAir }),
            //     ...(ETI_OP48EData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: ETI_OP48EData.templateB.driveTakeUpAirNum }),
            //     ...(ETI_OP48EData.templateB.takeUpDistance && { takeUpDistance: ETI_OP48EData.templateB.takeUpDistance }),
            //     ...(ETI_OP48EData.templateB.takeUpDistanceNum && { takeUpDistanceNum: ETI_OP48EData.templateB.takeUpDistanceNum }),
            //     ...(ETI_OP48EData.templateB.driveTemp && { driveTemp: ETI_OP48EData.templateB.driveTemp }),
            //     ...(ETI_OP48EData.templateB.driveTempNum && { driveTempNum: ETI_OP48EData.templateB.driveTempNum }),
            //     ...(ETI_OP48EData.templateB.driveVibration && { driveVibration: ETI_OP48EData.templateB.driveVibration }),
            //     ...(ETI_OP48EData.templateB.driveVibrationNum && { driveVibrationNum: ETI_OP48EData.templateB.driveVibrationNum }),
            //     ...(ETI_OP48EData.templateB.dogPitch && { dogPitch: ETI_OP48EData.templateB.dogPitch }),
            //     ...(ETI_OP48EData.templateB.dogPitchNum && { dogPitchNum: ETI_OP48EData.templateB.dogPitchNum }),
            //     ...(ETI_OP48EData.templateB.paintMarker && { paintMarker: ETI_OP48EData.templateB.paintMarker }),
            //     ...(ETI_OP48EData.templateB.paintMarkerNum && { paintMarkerNum: ETI_OP48EData.templateB.paintMarkerNum }),
            //     ...(ETI_OP48EData.templateB.chainVision && { chainVision: ETI_OP48EData.templateB.chainVision }),
            //     ...(ETI_OP48EData.templateB.lubeVision && { lubeVision: ETI_OP48EData.templateB.lubeVision }),
            //     ...(ETI_OP48EData.templateB.trolleyVision && { trolleyVision: ETI_OP48EData.templateB.trolleyVision }),
            //     ...(ETI_OP48EData.templateB.trolleyDetect && { trolleyDetect: ETI_OP48EData.templateB.trolleyDetect }),
            //     ...(ETI_OP48EData.templateB.omniView && { omniView: ETI_OP48EData.templateB.omniView }),
            //     ...(ETI_OP48EData.templateB.dcuUpgradeNum && { dcuUpgradeNum: ETI_OP48EData.templateB.dcuUpgradeNum }),
            //     ...(ETI_OP48EData.templateB.itNameOne && { itNameOne: ETI_OP48EData.templateB.itNameOne }),
            //     ...(ETI_OP48EData.templateB.itIPOne && { itIPOne: ETI_OP48EData.templateB.itIPOne }),
            //     ...(ETI_OP48EData.templateB.itGatewayOne && { itGatewayOne: ETI_OP48EData.templateB.itGatewayOne }),
            //     ...(ETI_OP48EData.templateB.itSubnetOne && { itSubnetOne: ETI_OP48EData.templateB.itSubnetOne }),
            //     ...(ETI_OP48EData.templateB.itDNSOne && { itDNSOne: ETI_OP48EData.templateB.itDNSOne }),
            //     ...(ETI_OP48EData.templateB.itSMTPOne && { itSMTPOne: ETI_OP48EData.templateB.itSMTPOne }),
            //     ...(ETI_OP48EData.templateB.itNameTwo && { itNameTwo: ETI_OP48EData.templateB.itNameTwo }),
            //     ...(ETI_OP48EData.templateB.itIPTwo && { itIPTwo: ETI_OP48EData.templateB.itIPTwo }),
            //     ...(ETI_OP48EData.templateB.itGatewayTwo && { itGatewayTwo: ETI_OP48EData.templateB.itGatewayTwo }),
            //     ...(ETI_OP48EData.templateB.itSubnetTwo && { itSubnetTwo: ETI_OP48EData.templateB.itSubnetTwo }),
            //     ...(ETI_OP48EData.templateB.itDNSTwo && { itDNSTwo: ETI_OP48EData.templateB.itDNSTwo }),
            //     ...(ETI_OP48EData.templateB.itSMTPTwo && { itSMTPTwo: ETI_OP48EData.templateB.itSMTPTwo }),
            //     ...(ETI_OP48EData.templateB.itNameThree && { itNameThree: ETI_OP48EData.templateB.itNameThree }),
            //     ...(ETI_OP48EData.templateB.itIPThree && { itIPThree: ETI_OP48EData.templateB.itIPThree }),
            //     ...(ETI_OP48EData.templateB.itGatewayThree && { itGatewayThree: ETI_OP48EData.templateB.itGatewayThree }),
            //     ...(ETI_OP48EData.templateB.itSubnetThree && { itSubnetThree: ETI_OP48EData.templateB.itSubnetThree }),
            //     ...(ETI_OP48EData.templateB.itDNSThree && { itDNSThree: ETI_OP48EData.templateB.itDNSThree }),
            //     ...(ETI_OP48EData.templateB.itSMTPThree && { itSMTPThree: ETI_OP48EData.templateB.itSMTPThree }),
            //     ...(ETI_OP48EData.templateB.itAdditionalNotes && { itAdditionalNotes: ETI_OP48EData.templateB.itAdditionalNotes }),
            //     ...(ETI_OP48EData.templateB.piuDistance && { piuDistance: ETI_OP48EData.templateB.piuDistance }),
            //     ...(ETI_OP48EData.templateB.switchDistance && { switchDistance: ETI_OP48EData.templateB.switchDistance }),
            //     ...(ETI_OP48EData.templateB.ampPickup && { ampPickup: ETI_OP48EData.templateB.ampPickup }),
            //     ...(ETI_OP48EData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETI_OP48EData.templateB.fromAirTakeUpDistance }),
            //     ...(ETI_OP48EData.templateB.specialControllerOptions && { specialControllerOptions: ETI_OP48EData.templateB.specialControllerOptions })
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