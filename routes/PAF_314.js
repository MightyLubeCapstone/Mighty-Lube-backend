const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_314 = require("../models/PAF_314");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_314Data, numRequested } = req.body;
        const order = new PAF_314({
            conveyorName: PAF_314Data.conveyorName,
            wheelManufacturer: PAF_314Data.wheelManufacturer,
            conveyorLength: PAF_314Data.conveyorLength,
            conveyorLengthUnit: PAF_314Data.conveyorLengthUnit,
            conveyorSpeed: PAF_314Data.conveyorSpeed,
            conveyorSpeedUnit: PAF_314Data.conveyorSpeedUnit,
            conveyorIndex: PAF_314Data.conveyorIndex,
            travelDirection: PAF_314Data.travelDirection,
            appEnviroment: PAF_314Data.appEnviroment,
            ...(PAF_314Data.ovenStatus && { ovenStatus: PAF_314Data.ovenStatus }),
            ...(PAF_314Data.ovenTemp && { ovenTemp: PAF_314Data.ovenTemp }),
            surroundingTemp: PAF_314Data.surroundingTemp,
            conveyorSwing: PAF_314Data.conveyorSwing,
            orientationType: PAF_314Data.orientationType,
            operatingVoltSingle: PAF_314Data.operatingVoltSingle,
            controlVoltSingle: PAF_314Data.controlVoltSingle,
            compressedAir: PAF_314Data.compressedAir,
            airSupplyType: PAF_314Data.airSupplyType,
            monitorData: new templateA({
                existingMonitor: PAF_314Data.templateA.existingMonitor,
                newMonitor: PAF_314Data.templateA.newMonitor,
                ...(PAF_314Data.templateA.dcuStatus && { dcuStatus: PAF_314Data.templateA.dcuStatus }),
                ...(PAF_314Data.templateA.dcuNum && { dcuNum: PAF_314Data.templateA.dcuNum }),
                ...(PAF_314Data.templateA.existingWindows && { existingWindows: PAF_314Data.templateA.existingWindows }),
                ...(PAF_314Data.templateA.existingHeadUnit && { existingHeadUnit: PAF_314Data.templateA.existingHeadUnit }),
                ...(PAF_314Data.templateA.existingDCU && { existingDCU: PAF_314Data.templateA.existingDCU }),
                ...(PAF_314Data.templateA.existingPowerInterface && { existingPowerInterface: PAF_314Data.templateA.existingPowerInterface }),
                ...(PAF_314Data.templateA.newReservoir && { newReservoir: PAF_314Data.templateA.newReservoir }),
                ...(PAF_314Data.templateA.reservoirSize && { reservoirSize: PAF_314Data.templateA.reservoirSize }),
                ...(PAF_314Data.templateA.otherReservoirSize && { otherReservoirSize: PAF_314Data.templateA.otherReservoirSize }),
                ...(PAF_314Data.templateA.newReservoirNum && { newReservoirNum: PAF_314Data.templateA.newReservoirNum }),
                ...(PAF_314Data.templateA.typeMonitor && { typeMonitor: PAF_314Data.templateA.typeMonitor }),
                ...(PAF_314Data.templateA.driveMotorAmp && { driveMotorAmp: PAF_314Data.templateA.driveMotorAmp }),
                ...(PAF_314Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_314Data.templateA.driveMotorAmpNum }),
                ...(PAF_314Data.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_314Data.templateA.driveTakeUpAir }),
                ...(PAF_314Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_314Data.templateA.driveTakeUpAirNum }),
                ...(PAF_314Data.templateA.takeUpDistance && { takeUpDistance: PAF_314Data.templateA.takeUpDistance }),
                ...(PAF_314Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_314Data.templateA.takeUpDistanceNum }),
                ...(PAF_314Data.templateA.driveTemp && { driveTemp: PAF_314Data.templateA.driveTemp }),
                ...(PAF_314Data.templateA.driveTempNum && { driveTempNum: PAF_314Data.templateA.driveTempNum }),
                ...(PAF_314Data.templateA.driveVibration && { driveVibration: PAF_314Data.templateA.driveVibration }),
                ...(PAF_314Data.templateA.driveVibrationNum && { driveVibrationNum: PAF_314Data.templateA.driveVibrationNum }),
                ...(PAF_314Data.templateA.dogPitch && { dogPitch: PAF_314Data.templateA.dogPitch }),
                ...(PAF_314Data.templateA.dogPitchNum && { dogPitchNum: PAF_314Data.templateA.dogPitchNum }),
                ...(PAF_314Data.templateA.paintMarker && { paintMarker: PAF_314Data.templateA.paintMarker }),
                ...(PAF_314Data.templateA.paintMarkerNum && { paintMarkerNum: PAF_314Data.templateA.paintMarkerNum }),
                ...(PAF_314Data.templateA.chainVision && { chainVision: PAF_314Data.templateA.chainVision }),
                ...(PAF_314Data.templateA.lubeVision && { lubeVision: PAF_314Data.templateA.lubeVision }),
                ...(PAF_314Data.templateA.trolleyVision && { trolleyVision: PAF_314Data.templateA.trolleyVision }),
                ...(PAF_314Data.templateA.trolleyDetect && { trolleyDetect: PAF_314Data.templateA.trolleyDetect }),
                ...(PAF_314Data.templateA.omniView && { omniView: PAF_314Data.templateA.omniView }),
                ...(PAF_314Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_314Data.templateA.dcuUpgradeNum }),
                ...(PAF_314Data.templateA.itNameOne && { itNameOne: PAF_314Data.templateA.itNameOne }),
                ...(PAF_314Data.templateA.itIPOne && { itIPOne: PAF_314Data.templateA.itIPOne }),
                ...(PAF_314Data.templateA.itGatewayOne && { itGatewayOne: PAF_314Data.templateA.itGatewayOne }),
                ...(PAF_314Data.templateA.itSubnetOne && { itSubnetOne: PAF_314Data.templateA.itSubnetOne }),
                ...(PAF_314Data.templateA.itDNSOne && { itDNSOne: PAF_314Data.templateA.itDNSOne }),
                ...(PAF_314Data.templateA.itSMTPOne && { itSMTPOne: PAF_314Data.templateA.itSMTPOne }),
                ...(PAF_314Data.templateA.itNameTwo && { itNameTwo: PAF_314Data.templateA.itNameTwo }),
                ...(PAF_314Data.templateA.itIPTwo && { itIPTwo: PAF_314Data.templateA.itIPTwo }),
                ...(PAF_314Data.templateA.itGatewayTwo && { itGatewayTwo: PAF_314Data.templateA.itGatewayTwo }),
                ...(PAF_314Data.templateA.itSubnetTwo && { itSubnetTwo: PAF_314Data.templateA.itSubnetTwo }),
                ...(PAF_314Data.templateA.itDNSTwo && { itDNSTwo: PAF_314Data.templateA.itDNSTwo }),
                ...(PAF_314Data.templateA.itSMTPTwo && { itSMTPTwo: PAF_314Data.templateA.itSMTPTwo }),
                ...(PAF_314Data.templateA.itNameThree && { itNameThree: PAF_314Data.templateA.itNameThree }),
                ...(PAF_314Data.templateA.itIPThree && { itIPThree: PAF_314Data.templateA.itIPThree }),
                ...(PAF_314Data.templateA.itGatewayThree && { itGatewayThree: PAF_314Data.templateA.itGatewayThree }),
                ...(PAF_314Data.templateA.itSubnetThree && { itSubnetThree: PAF_314Data.templateA.itSubnetThree }),
                ...(PAF_314Data.templateA.itDNSThree && { itDNSThree: PAF_314Data.templateA.itDNSThree }),
                ...(PAF_314Data.templateA.itSMTPThree && { itSMTPThree: PAF_314Data.templateA.itSMTPThree }),
                ...(PAF_314Data.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_314Data.templateA.itAdditionalNotes }),
                ...(PAF_314Data.templateA.piuDistance && { piuDistance: PAF_314Data.templateA.piuDistance }),
                ...(PAF_314Data.templateA.switchDistance && { switchDistance: PAF_314Data.templateA.switchDistance }),
                ...(PAF_314Data.templateA.ampPickup && { ampPickup: PAF_314Data.templateA.ampPickup }),
                ...(PAF_314Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_314Data.templateA.fromAirTakeUpDistance }),
                ...(PAF_314Data.templateA.specialControllerOptions && { specialControllerOptions: PAF_314Data.templateA.specialControllerOptions })
            }),            freeWheelStatus: PAF_314Data.freeWheelStatus,
            actuatorStatus: PAF_314Data.actuatorStatus,
            pivotStatus: PAF_314Data.pivotStatus,
            kingPinStatus: PAF_314Data.kingPinStatus,
            lubeBrand: PAF_314Data.lubeBrand,
            lubeType: PAF_314Data.lubeType,
            lubeViscosity: PAF_314Data.lubeViscosity,
            currentGrease: PAF_314Data.currentGrease,
            currentGreaseGrade: PAF_314Data.currentGreaseGrade,
            zerkDirection: PAF_314Data.zerkDirection,
            zerkLocationType: PAF_314Data.zerkLocationType,
            chainMaster: PAF_314Data.chainMaster,
            remoteStatus: PAF_314Data.remoteStatus,
            mountStatus: PAF_314Data.mountStatus,
            otherUnitStatus: PAF_314Data.otherUnitStatus,
            timerStatus: PAF_314Data.timerStatus,
            electricStatus: PAF_314Data.electricStatus,
            mightyLubeMonitoring: PAF_314Data.mightyLubeMonitoring,
            preMountType: PAF_314Data.preMountType,
            plcConnection: PAF_314Data.plcConnection,
            otherControllerNotes: PAF_314Data.otherControllerNotes,
            pfUnitType: PAF_314Data.pfUnitType,
            pfInvertedB: PAF_314Data.pfInvertedB,
            pfInvertedE: PAF_314Data.pfInvertedE,
            pfInvertedG: PAF_314Data.pfInvertedG,
            pfInvertedH: PAF_314Data.pfInvertedH,
            pfInvertedK: PAF_314Data.pfInvertedK,
            pfInvertedT: PAF_314Data.pfInvertedT,
            pfInvertedU: PAF_314Data.pfInvertedU,
            pfInvertedV: PAF_314Data.pfInvertedV,
            pfInvertedW: PAF_314Data.pfInvertedW
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_314"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_314 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;