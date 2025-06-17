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

            // monitorData: new templateA({
            //     existingMonitor: FRO_314Data.templateA.existingMonitor,
            //     newMonitor: FRO_314Data.templateA.newMonitor,
            //     ...(FRO_314Data.templateA.dcuStatus && { dcuStatus: FRO_314Data.templateA.dcuStatus }),
            //     ...(FRO_314Data.templateA.dcuNum && { dcuNum: FRO_314Data.templateA.dcuNum }),
            //     ...(FRO_314Data.templateA.existingWindows && { existingWindows: FRO_314Data.templateA.existingWindows }),
            //     ...(FRO_314Data.templateA.existingHeadUnit && { existingHeadUnit: FRO_314Data.templateA.existingHeadUnit }),
            //     ...(FRO_314Data.templateA.existingDCU && { existingDCU: FRO_314Data.templateA.existingDCU }),
            //     ...(FRO_314Data.templateA.existingPowerInterface && { existingPowerInterface: FRO_314Data.templateA.existingPowerInterface }),
            //     ...(FRO_314Data.templateA.newReservoir && { newReservoir: FRO_314Data.templateA.newReservoir }),
            //     ...(FRO_314Data.templateA.reservoirSize && { reservoirSize: FRO_314Data.templateA.reservoirSize }),
            //     ...(FRO_314Data.templateA.otherReservoirSize && { otherReservoirSize: FRO_314Data.templateA.otherReservoirSize }),
            //     ...(FRO_314Data.templateA.newReservoirNum && { newReservoirNum: FRO_314Data.templateA.newReservoirNum }),
            //     ...(FRO_314Data.templateA.typeMonitor && { typeMonitor: FRO_314Data.templateA.typeMonitor }),
            //     ...(FRO_314Data.templateA.driveMotorAmp && { driveMotorAmp: FRO_314Data.templateA.driveMotorAmp }),
            //     ...(FRO_314Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: FRO_314Data.templateA.driveMotorAmpNum }),
            //     ...(FRO_314Data.templateA.driveTakeUpAir && { driveTakeUpAir: FRO_314Data.templateA.driveTakeUpAir }),
            //     ...(FRO_314Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_314Data.templateA.driveTakeUpAirNum }),
            //     ...(FRO_314Data.templateA.takeUpDistance && { takeUpDistance: FRO_314Data.templateA.takeUpDistance }),
            //     ...(FRO_314Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: FRO_314Data.templateA.takeUpDistanceNum }),
            //     ...(FRO_314Data.templateA.driveTemp && { driveTemp: FRO_314Data.templateA.driveTemp }),
            //     ...(FRO_314Data.templateA.driveTempNum && { driveTempNum: FRO_314Data.templateA.driveTempNum }),
            //     ...(FRO_314Data.templateA.driveVibration && { driveVibration: FRO_314Data.templateA.driveVibration }),
            //     ...(FRO_314Data.templateA.driveVibrationNum && { driveVibrationNum: FRO_314Data.templateA.driveVibrationNum }),
            //     ...(FRO_314Data.templateA.dogPitch && { dogPitch: FRO_314Data.templateA.dogPitch }),
            //     ...(FRO_314Data.templateA.dogPitchNum && { dogPitchNum: FRO_314Data.templateA.dogPitchNum }),
            //     ...(FRO_314Data.templateA.paintMarker && { paintMarker: FRO_314Data.templateA.paintMarker }),
            //     ...(FRO_314Data.templateA.paintMarkerNum && { paintMarkerNum: FRO_314Data.templateA.paintMarkerNum }),
            //     ...(FRO_314Data.templateA.chainVision && { chainVision: FRO_314Data.templateA.chainVision }),
            //     ...(FRO_314Data.templateA.lubeVision && { lubeVision: FRO_314Data.templateA.lubeVision }),
            //     ...(FRO_314Data.templateA.trolleyVision && { trolleyVision: FRO_314Data.templateA.trolleyVision }),
            //     ...(FRO_314Data.templateA.trolleyDetect && { trolleyDetect: FRO_314Data.templateA.trolleyDetect }),
            //     ...(FRO_314Data.templateA.omniView && { omniView: FRO_314Data.templateA.omniView }),
            //     ...(FRO_314Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: FRO_314Data.templateA.dcuUpgradeNum }),
            //     ...(FRO_314Data.templateA.itNameOne && { itNameOne: FRO_314Data.templateA.itNameOne }),
            //     ...(FRO_314Data.templateA.itIPOne && { itIPOne: FRO_314Data.templateA.itIPOne }),
            //     ...(FRO_314Data.templateA.itGatewayOne && { itGatewayOne: FRO_314Data.templateA.itGatewayOne }),
            //     ...(FRO_314Data.templateA.itSubnetOne && { itSubnetOne: FRO_314Data.templateA.itSubnetOne }),
            //     ...(FRO_314Data.templateA.itDNSOne && { itDNSOne: FRO_314Data.templateA.itDNSOne }),
            //     ...(FRO_314Data.templateA.itSMTPOne && { itSMTPOne: FRO_314Data.templateA.itSMTPOne }),
            //     ...(FRO_314Data.templateA.itNameTwo && { itNameTwo: FRO_314Data.templateA.itNameTwo }),
            //     ...(FRO_314Data.templateA.itIPTwo && { itIPTwo: FRO_314Data.templateA.itIPTwo }),
            //     ...(FRO_314Data.templateA.itGatewayTwo && { itGatewayTwo: FRO_314Data.templateA.itGatewayTwo }),
            //     ...(FRO_314Data.templateA.itSubnetTwo && { itSubnetTwo: FRO_314Data.templateA.itSubnetTwo }),
            //     ...(FRO_314Data.templateA.itDNSTwo && { itDNSTwo: FRO_314Data.templateA.itDNSTwo }),
            //     ...(FRO_314Data.templateA.itSMTPTwo && { itSMTPTwo: FRO_314Data.templateA.itSMTPTwo }),
            //     ...(FRO_314Data.templateA.itNameThree && { itNameThree: FRO_314Data.templateA.itNameThree }),
            //     ...(FRO_314Data.templateA.itIPThree && { itIPThree: FRO_314Data.templateA.itIPThree }),
            //     ...(FRO_314Data.templateA.itGatewayThree && { itGatewayThree: FRO_314Data.templateA.itGatewayThree }),
            //     ...(FRO_314Data.templateA.itSubnetThree && { itSubnetThree: FRO_314Data.templateA.itSubnetThree }),
            //     ...(FRO_314Data.templateA.itDNSThree && { itDNSThree: FRO_314Data.templateA.itDNSThree }),
            //     ...(FRO_314Data.templateA.itSMTPThree && { itSMTPThree: FRO_314Data.templateA.itSMTPThree }),
            //     ...(FRO_314Data.templateA.itAdditionalNotes && { itAdditionalNotes: FRO_314Data.templateA.itAdditionalNotes }),
            //     ...(FRO_314Data.templateA.piuDistance && { piuDistance: FRO_314Data.templateA.piuDistance }),
            //     ...(FRO_314Data.templateA.switchDistance && { switchDistance: FRO_314Data.templateA.switchDistance }),
            //     ...(FRO_314Data.templateA.ampPickup && { ampPickup: FRO_314Data.templateA.ampPickup }),
            //     ...(FRO_314Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_314Data.templateA.fromAirTakeUpDistance }),
            //     ...(FRO_314Data.templateA.specialControllerOptions && { specialControllerOptions: FRO_314Data.templateA.specialControllerOptions })
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