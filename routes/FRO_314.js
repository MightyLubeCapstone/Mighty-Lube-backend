const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_314 = require("../models/FRO_314");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_314 form
    try {
        const { FRO_314Data, numRequested } = req.body;
        const order = new FRO_314({
            ...(FRO_314Data.conveyorName && { conveyorName: FRO_314Data.conveyorName }),
            ...(FRO_314Data.wheelManufacturer && { wheelManufacturer: FRO_314Data.wheelManufacturer }),
            ...(FRO_314Data.otherWheelManufacturer && { otherWheelManufacturer: FRO_314Data.otherWheelManufacturer }),
            ...(FRO_314Data.conveyorLength && { conveyorLength: FRO_314Data.conveyorLength }),
            ...(FRO_314Data.conveyorLengthUnit && { conveyorLengthUnit: FRO_314Data.conveyorLengthUnit }),
            ...(FRO_314Data.conveyorSpeed && { conveyorSpeed: FRO_314Data.conveyorSpeed }),
            ...(FRO_314Data.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_314Data.conveyorSpeedUnit }),
            ...(FRO_314Data.travelDirection && { travelDirection: FRO_314Data.travelDirection }),
            appEnviroment: FRO_314Data.appEnviroment,
            ...(FRO_314Data.ovenStatus && { ovenStatus: FRO_314Data.ovenStatus }),
            ...(FRO_314Data.ovenTemp && { ovenTemp: FRO_314Data.ovenTemp }),
            ...(FRO_314Data.surroundingTemp && { surroundingTemp: FRO_314Data.surroundingTemp }),
            ...(FRO_314Data.conveyorSwing && { conveyorSwing: FRO_314Data.conveyorSwing }),
            ...(FRO_314Data.orientation && { orientation: FRO_314Data.orientation }),
            ...(FRO_314Data.operatingVoltage && { operatingVoltage: FRO_314Data.operatingVoltage }),
            ...(FRO_314Data.controlVoltage && { controlVoltage: FRO_314Data.controlVoltage }),
            ...(FRO_314Data.compressedAir && { compressedAir: FRO_314Data.compressedAir }),
            ...(FRO_314Data.airSupply && { airSupply: FRO_314Data.airSupply }),

            // monitorData: {
            //     existingMonitor: FRO_314Data.existingMonitor,
            //     newMonitor: FRO_314Data.newMonitor,
            //     ...(FRO_314Data.dcuStatus && { dcuStatus: FRO_314Data.dcuStatus }),
            //     ...(FRO_314Data.dcuNum && { dcuNum: FRO_314Data.dcuNum }),
            //     ...(FRO_314Data.existingWindows && { existingWindows: FRO_314Data.existingWindows }),
            //     ...(FRO_314Data.existingHeadUnit && { existingHeadUnit: FRO_314Data.existingHeadUnit }),
            //     ...(FRO_314Data.existingDCU && { existingDCU: FRO_314Data.existingDCU }),
            //     ...(FRO_314Data.existingPowerInterface && { existingPowerInterface: FRO_314Data.existingPowerInterface }),
            //     ...(FRO_314Data.newReservoir && { newReservoir: FRO_314Data.newReservoir }),
            //     ...(FRO_314Data.reservoirSize && { reservoirSize: FRO_314Data.reservoirSize }),
            //     ...(FRO_314Data.otherReservoirSize && { otherReservoirSize: FRO_314Data.otherReservoirSize }),
            //     ...(FRO_314Data.newReservoirNum && { newReservoirNum: FRO_314Data.newReservoirNum }),
            //     ...(FRO_314Data.typeMonitor && { typeMonitor: FRO_314Data.typeMonitor }),
            //     ...(FRO_314Data.driveMotorAmp && { driveMotorAmp: FRO_314Data.driveMotorAmp }),
            //     ...(FRO_314Data.driveMotorAmpNum && { driveMotorAmpNum: FRO_314Data.driveMotorAmpNum }),
            //     ...(FRO_314Data.driveTakeUpAir && { driveTakeUpAir: FRO_314Data.driveTakeUpAir }),
            //     ...(FRO_314Data.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_314Data.driveTakeUpAirNum }),
            //     ...(FRO_314Data.takeUpDistance && { takeUpDistance: FRO_314Data.takeUpDistance }),
            //     ...(FRO_314Data.takeUpDistanceNum && { takeUpDistanceNum: FRO_314Data.takeUpDistanceNum }),
            //     ...(FRO_314Data.driveTemp && { driveTemp: FRO_314Data.driveTemp }),
            //     ...(FRO_314Data.driveTempNum && { driveTempNum: FRO_314Data.driveTempNum }),
            //     ...(FRO_314Data.driveVibration && { driveVibration: FRO_314Data.driveVibration }),
            //     ...(FRO_314Data.driveVibrationNum && { driveVibrationNum: FRO_314Data.driveVibrationNum }),
            //     ...(FRO_314Data.dogPitch && { dogPitch: FRO_314Data.dogPitch }),
            //     ...(FRO_314Data.dogPitchNum && { dogPitchNum: FRO_314Data.dogPitchNum }),
            //     ...(FRO_314Data.paintMarker && { paintMarker: FRO_314Data.paintMarker }),
            //     ...(FRO_314Data.paintMarkerNum && { paintMarkerNum: FRO_314Data.paintMarkerNum }),
            //     ...(FRO_314Data.chainVision && { chainVision: FRO_314Data.chainVision }),
            //     ...(FRO_314Data.lubeVision && { lubeVision: FRO_314Data.lubeVision }),
            //     ...(FRO_314Data.trolleyVision && { trolleyVision: FRO_314Data.trolleyVision }),
            //     ...(FRO_314Data.trolleyDetect && { trolleyDetect: FRO_314Data.trolleyDetect }),
            //     ...(FRO_314Data.omniView && { omniView: FRO_314Data.omniView }),
            //     ...(FRO_314Data.dcuUpgradeNum && { dcuUpgradeNum: FRO_314Data.dcuUpgradeNum }),
            //     ...(FRO_314Data.itNameOne && { itNameOne: FRO_314Data.itNameOne }),
            //     ...(FRO_314Data.itIPOne && { itIPOne: FRO_314Data.itIPOne }),
            //     ...(FRO_314Data.itGatewayOne && { itGatewayOne: FRO_314Data.itGatewayOne }),
            //     ...(FRO_314Data.itSubnetOne && { itSubnetOne: FRO_314Data.itSubnetOne }),
            //     ...(FRO_314Data.itDNSOne && { itDNSOne: FRO_314Data.itDNSOne }),
            //     ...(FRO_314Data.itSMTPOne && { itSMTPOne: FRO_314Data.itSMTPOne }),
            //     ...(FRO_314Data.itNameTwo && { itNameTwo: FRO_314Data.itNameTwo }),
            //     ...(FRO_314Data.itIPTwo && { itIPTwo: FRO_314Data.itIPTwo }),
            //     ...(FRO_314Data.itGatewayTwo && { itGatewayTwo: FRO_314Data.itGatewayTwo }),
            //     ...(FRO_314Data.itSubnetTwo && { itSubnetTwo: FRO_314Data.itSubnetTwo }),
            //     ...(FRO_314Data.itDNSTwo && { itDNSTwo: FRO_314Data.itDNSTwo }),
            //     ...(FRO_314Data.itSMTPTwo && { itSMTPTwo: FRO_314Data.itSMTPTwo }),
            //     ...(FRO_314Data.itNameThree && { itNameThree: FRO_314Data.itNameThree }),
            //     ...(FRO_314Data.itIPThree && { itIPThree: FRO_314Data.itIPThree }),
            //     ...(FRO_314Data.itGatewayThree && { itGatewayThree: FRO_314Data.itGatewayThree }),
            //     ...(FRO_314Data.itSubnetThree && { itSubnetThree: FRO_314Data.itSubnetThree }),
            //     ...(FRO_314Data.itDNSThree && { itDNSThree: FRO_314Data.itDNSThree }),
            //     ...(FRO_314Data.itSMTPThree && { itSMTPThree: FRO_314Data.itSMTPThree }),
            //     ...(FRO_314Data.itAdditionalNotes && { itAdditionalNotes: FRO_314Data.itAdditionalNotes }),
            //     ...(FRO_314Data.piuDistance && { piuDistance: FRO_314Data.piuDistance }),
            //     ...(FRO_314Data.switchDistance && { switchDistance: FRO_314Data.switchDistance }),
            //     ...(FRO_314Data.ampPickup && { ampPickup: FRO_314Data.ampPickup }),
            //     ...(FRO_314Data.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_314Data.fromAirTakeUpDistance }),
            //     ...(FRO_314Data.specialControllerOptions && { specialControllerOptions: FRO_314Data.specialControllerOptions })
            // }),            
            ...(FRO_314Data.freeWheelStatus && { freeWheelStatus: FRO_314Data.freeWheelStatus }),
            ...(FRO_314Data.actuatorStatus && { actuatorStatus: FRO_314Data.actuatorStatus }),
            ...(FRO_314Data.pivotStatus && { pivotStatus: FRO_314Data.pivotStatus }),
            ...(FRO_314Data.kingPinStatus && { kingPinStatus: FRO_314Data.kingPinStatus }),
            ...(FRO_314Data.lubeBrand && { lubeBrand: FRO_314Data.lubeBrand }),
            ...(FRO_314Data.lubeType && { lubeType: FRO_314Data.lubeType }),
            ...(FRO_314Data.lubeViscosity && { lubeViscosity: FRO_314Data.lubeViscosity }),
            ...(FRO_314Data.currentGrease && { currentGrease: FRO_314Data.currentGrease }),
            ...(FRO_314Data.currentGreaseGrade && { currentGreaseGrade: FRO_314Data.currentGreaseGrade }),
            ...(FRO_314Data.zerkDirection && { zerkDirection: FRO_314Data.zerkDirection }),
            ...(FRO_314Data.zerkLocation && { zerkLocation: FRO_314Data.zerkLocation }),
            ...(FRO_314Data.chainMaster && { chainMaster: FRO_314Data.chainMaster }),
            ...(FRO_314Data.remoteStatus && { remoteStatus: FRO_314Data.remoteStatus }),
            ...(FRO_314Data.mountStatus && { mountStatus: FRO_314Data.mountStatus }),
            ...(FRO_314Data.otherUnitStatus && { otherUnitStatus: FRO_314Data.otherUnitStatus }),
            ...(FRO_314Data.timerStatus && { timerStatus: FRO_314Data.timerStatus }),
            ...(FRO_314Data.electricStatus && { electricStatus: FRO_314Data.electricStatus }),
            ...(FRO_314Data.mightyLubeMonitoring && { mightyLubeMonitoring: FRO_314Data.mightyLubeMonitoring }),
            ...(FRO_314Data.preMountType && { preMountType: FRO_314Data.preMountType }),
            ...(FRO_314Data.plcConnection && { plcConnection: FRO_314Data.plcConnection }),
            ...(FRO_314Data.otherControllerInfo && { otherControllerInfo: FRO_314Data.otherControllerInfo }),
            ...(FRO_314Data.frUnitType && { frUnitType: FRO_314Data.frUnitType }),
            ...(FRO_314Data.frInvertedB && { frInvertedB: FRO_314Data.frInvertedB }),
            ...(FRO_314Data.frInvertedE && { frInvertedE: FRO_314Data.frInvertedE }),
            ...(FRO_314Data.frInvertedG && { frInvertedG: FRO_314Data.frInvertedG }),
            ...(FRO_314Data.frInvertedH && { frInvertedH: FRO_314Data.frInvertedH }),
            ...(FRO_314Data.frInvertedK && { frInvertedK: FRO_314Data.frInvertedK }),
            ...(FRO_314Data.frInvertedT && { frInvertedT: FRO_314Data.frInvertedT }),
            ...(FRO_314Data.frInvertedU && { frInvertedU: FRO_314Data.frInvertedU }),
            ...(FRO_314Data.frInvertedV && { frInvertedV: FRO_314Data.frInvertedV }),
            ...(FRO_314Data.frInvertedW && { frInvertedW: FRO_314Data.frInvertedW }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_314" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_314 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;