const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_314 = require("../models/FRO_314");
const templateB = require("../models/templateB");

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

            // monitorData: new templateB({
            //     existingMonitor: FRO_314Data.templateB.existingMonitor,
            //     newMonitor: FRO_314Data.templateB.newMonitor,
            //     ...(FRO_314Data.templateB.dcuStatus && { dcuStatus: FRO_314Data.templateB.dcuStatus }),
            //     ...(FRO_314Data.templateB.dcuNum && { dcuNum: FRO_314Data.templateB.dcuNum }),
            //     ...(FRO_314Data.templateB.existingWindows && { existingWindows: FRO_314Data.templateB.existingWindows }),
            //     ...(FRO_314Data.templateB.existingHeadUnit && { existingHeadUnit: FRO_314Data.templateB.existingHeadUnit }),
            //     ...(FRO_314Data.templateB.existingDCU && { existingDCU: FRO_314Data.templateB.existingDCU }),
            //     ...(FRO_314Data.templateB.existingPowerInterface && { existingPowerInterface: FRO_314Data.templateB.existingPowerInterface }),
            //     ...(FRO_314Data.templateB.newReservoir && { newReservoir: FRO_314Data.templateB.newReservoir }),
            //     ...(FRO_314Data.templateB.reservoirSize && { reservoirSize: FRO_314Data.templateB.reservoirSize }),
            //     ...(FRO_314Data.templateB.otherReservoirSize && { otherReservoirSize: FRO_314Data.templateB.otherReservoirSize }),
            //     ...(FRO_314Data.templateB.newReservoirNum && { newReservoirNum: FRO_314Data.templateB.newReservoirNum }),
            //     ...(FRO_314Data.templateB.typeMonitor && { typeMonitor: FRO_314Data.templateB.typeMonitor }),
            //     ...(FRO_314Data.templateB.driveMotorAmp && { driveMotorAmp: FRO_314Data.templateB.driveMotorAmp }),
            //     ...(FRO_314Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: FRO_314Data.templateB.driveMotorAmpNum }),
            //     ...(FRO_314Data.templateB.driveTakeUpAir && { driveTakeUpAir: FRO_314Data.templateB.driveTakeUpAir }),
            //     ...(FRO_314Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: FRO_314Data.templateB.driveTakeUpAirNum }),
            //     ...(FRO_314Data.templateB.takeUpDistance && { takeUpDistance: FRO_314Data.templateB.takeUpDistance }),
            //     ...(FRO_314Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: FRO_314Data.templateB.takeUpDistanceNum }),
            //     ...(FRO_314Data.templateB.driveTemp && { driveTemp: FRO_314Data.templateB.driveTemp }),
            //     ...(FRO_314Data.templateB.driveTempNum && { driveTempNum: FRO_314Data.templateB.driveTempNum }),
            //     ...(FRO_314Data.templateB.driveVibration && { driveVibration: FRO_314Data.templateB.driveVibration }),
            //     ...(FRO_314Data.templateB.driveVibrationNum && { driveVibrationNum: FRO_314Data.templateB.driveVibrationNum }),
            //     ...(FRO_314Data.templateB.dogPitch && { dogPitch: FRO_314Data.templateB.dogPitch }),
            //     ...(FRO_314Data.templateB.dogPitchNum && { dogPitchNum: FRO_314Data.templateB.dogPitchNum }),
            //     ...(FRO_314Data.templateB.paintMarker && { paintMarker: FRO_314Data.templateB.paintMarker }),
            //     ...(FRO_314Data.templateB.paintMarkerNum && { paintMarkerNum: FRO_314Data.templateB.paintMarkerNum }),
            //     ...(FRO_314Data.templateB.chainVision && { chainVision: FRO_314Data.templateB.chainVision }),
            //     ...(FRO_314Data.templateB.lubeVision && { lubeVision: FRO_314Data.templateB.lubeVision }),
            //     ...(FRO_314Data.templateB.trolleyVision && { trolleyVision: FRO_314Data.templateB.trolleyVision }),
            //     ...(FRO_314Data.templateB.trolleyDetect && { trolleyDetect: FRO_314Data.templateB.trolleyDetect }),
            //     ...(FRO_314Data.templateB.omniView && { omniView: FRO_314Data.templateB.omniView }),
            //     ...(FRO_314Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: FRO_314Data.templateB.dcuUpgradeNum }),
            //     ...(FRO_314Data.templateB.itNameOne && { itNameOne: FRO_314Data.templateB.itNameOne }),
            //     ...(FRO_314Data.templateB.itIPOne && { itIPOne: FRO_314Data.templateB.itIPOne }),
            //     ...(FRO_314Data.templateB.itGatewayOne && { itGatewayOne: FRO_314Data.templateB.itGatewayOne }),
            //     ...(FRO_314Data.templateB.itSubnetOne && { itSubnetOne: FRO_314Data.templateB.itSubnetOne }),
            //     ...(FRO_314Data.templateB.itDNSOne && { itDNSOne: FRO_314Data.templateB.itDNSOne }),
            //     ...(FRO_314Data.templateB.itSMTPOne && { itSMTPOne: FRO_314Data.templateB.itSMTPOne }),
            //     ...(FRO_314Data.templateB.itNameTwo && { itNameTwo: FRO_314Data.templateB.itNameTwo }),
            //     ...(FRO_314Data.templateB.itIPTwo && { itIPTwo: FRO_314Data.templateB.itIPTwo }),
            //     ...(FRO_314Data.templateB.itGatewayTwo && { itGatewayTwo: FRO_314Data.templateB.itGatewayTwo }),
            //     ...(FRO_314Data.templateB.itSubnetTwo && { itSubnetTwo: FRO_314Data.templateB.itSubnetTwo }),
            //     ...(FRO_314Data.templateB.itDNSTwo && { itDNSTwo: FRO_314Data.templateB.itDNSTwo }),
            //     ...(FRO_314Data.templateB.itSMTPTwo && { itSMTPTwo: FRO_314Data.templateB.itSMTPTwo }),
            //     ...(FRO_314Data.templateB.itNameThree && { itNameThree: FRO_314Data.templateB.itNameThree }),
            //     ...(FRO_314Data.templateB.itIPThree && { itIPThree: FRO_314Data.templateB.itIPThree }),
            //     ...(FRO_314Data.templateB.itGatewayThree && { itGatewayThree: FRO_314Data.templateB.itGatewayThree }),
            //     ...(FRO_314Data.templateB.itSubnetThree && { itSubnetThree: FRO_314Data.templateB.itSubnetThree }),
            //     ...(FRO_314Data.templateB.itDNSThree && { itDNSThree: FRO_314Data.templateB.itDNSThree }),
            //     ...(FRO_314Data.templateB.itSMTPThree && { itSMTPThree: FRO_314Data.templateB.itSMTPThree }),
            //     ...(FRO_314Data.templateB.itAdditionalNotes && { itAdditionalNotes: FRO_314Data.templateB.itAdditionalNotes }),
            //     ...(FRO_314Data.templateB.piuDistance && { piuDistance: FRO_314Data.templateB.piuDistance }),
            //     ...(FRO_314Data.templateB.switchDistance && { switchDistance: FRO_314Data.templateB.switchDistance }),
            //     ...(FRO_314Data.templateB.ampPickup && { ampPickup: FRO_314Data.templateB.ampPickup }),
            //     ...(FRO_314Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: FRO_314Data.templateB.fromAirTakeUpDistance }),
            //     ...(FRO_314Data.templateB.specialControllerOptions && { specialControllerOptions: FRO_314Data.templateB.specialControllerOptions })
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