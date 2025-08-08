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
            monitorData: {
                existingMonitor: PAF_314Data.existingMonitor,
                newMonitor: PAF_314Data.newMonitor,
                ...(PAF_314Data.dcuStatus && { dcuStatus: PAF_314Data.dcuStatus }),
                ...(PAF_314Data.dcuNum && { dcuNum: PAF_314Data.dcuNum }),
                ...(PAF_314Data.existingWindows && { existingWindows: PAF_314Data.existingWindows }),
                ...(PAF_314Data.existingHeadUnit && { existingHeadUnit: PAF_314Data.existingHeadUnit }),
                ...(PAF_314Data.existingDCU && { existingDCU: PAF_314Data.existingDCU }),
                ...(PAF_314Data.existingPowerInterface && { existingPowerInterface: PAF_314Data.existingPowerInterface }),
                ...(PAF_314Data.newReservoir && { newReservoir: PAF_314Data.newReservoir }),
                ...(PAF_314Data.reservoirSize && { reservoirSize: PAF_314Data.reservoirSize }),
                ...(PAF_314Data.otherReservoirSize && { otherReservoirSize: PAF_314Data.otherReservoirSize }),
                ...(PAF_314Data.newReservoirNum && { newReservoirNum: PAF_314Data.newReservoirNum }),
                ...(PAF_314Data.typeMonitor && { typeMonitor: PAF_314Data.typeMonitor }),
                ...(PAF_314Data.driveMotorAmp && { driveMotorAmp: PAF_314Data.driveMotorAmp }),
                ...(PAF_314Data.driveMotorAmpNum && { driveMotorAmpNum: PAF_314Data.driveMotorAmpNum }),
                ...(PAF_314Data.driveTakeUpAir && { driveTakeUpAir: PAF_314Data.driveTakeUpAir }),
                ...(PAF_314Data.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_314Data.driveTakeUpAirNum }),
                ...(PAF_314Data.takeUpDistance && { takeUpDistance: PAF_314Data.takeUpDistance }),
                ...(PAF_314Data.takeUpDistanceNum && { takeUpDistanceNum: PAF_314Data.takeUpDistanceNum }),
                ...(PAF_314Data.driveTemp && { driveTemp: PAF_314Data.driveTemp }),
                ...(PAF_314Data.driveTempNum && { driveTempNum: PAF_314Data.driveTempNum }),
                ...(PAF_314Data.driveVibration && { driveVibration: PAF_314Data.driveVibration }),
                ...(PAF_314Data.driveVibrationNum && { driveVibrationNum: PAF_314Data.driveVibrationNum }),
                ...(PAF_314Data.dogPitch && { dogPitch: PAF_314Data.dogPitch }),
                ...(PAF_314Data.dogPitchNum && { dogPitchNum: PAF_314Data.dogPitchNum }),
                ...(PAF_314Data.paintMarker && { paintMarker: PAF_314Data.paintMarker }),
                ...(PAF_314Data.paintMarkerNum && { paintMarkerNum: PAF_314Data.paintMarkerNum }),
                ...(PAF_314Data.chainVision && { chainVision: PAF_314Data.chainVision }),
                ...(PAF_314Data.lubeVision && { lubeVision: PAF_314Data.lubeVision }),
                ...(PAF_314Data.trolleyVision && { trolleyVision: PAF_314Data.trolleyVision }),
                ...(PAF_314Data.trolleyDetect && { trolleyDetect: PAF_314Data.trolleyDetect }),
                ...(PAF_314Data.omniView && { omniView: PAF_314Data.omniView }),
                ...(PAF_314Data.dcuUpgradeNum && { dcuUpgradeNum: PAF_314Data.dcuUpgradeNum }),
                ...(PAF_314Data.itNameOne && { itNameOne: PAF_314Data.itNameOne }),
                ...(PAF_314Data.itIPOne && { itIPOne: PAF_314Data.itIPOne }),
                ...(PAF_314Data.itGatewayOne && { itGatewayOne: PAF_314Data.itGatewayOne }),
                ...(PAF_314Data.itSubnetOne && { itSubnetOne: PAF_314Data.itSubnetOne }),
                ...(PAF_314Data.itDNSOne && { itDNSOne: PAF_314Data.itDNSOne }),
                ...(PAF_314Data.itSMTPOne && { itSMTPOne: PAF_314Data.itSMTPOne }),
                ...(PAF_314Data.itNameTwo && { itNameTwo: PAF_314Data.itNameTwo }),
                ...(PAF_314Data.itIPTwo && { itIPTwo: PAF_314Data.itIPTwo }),
                ...(PAF_314Data.itGatewayTwo && { itGatewayTwo: PAF_314Data.itGatewayTwo }),
                ...(PAF_314Data.itSubnetTwo && { itSubnetTwo: PAF_314Data.itSubnetTwo }),
                ...(PAF_314Data.itDNSTwo && { itDNSTwo: PAF_314Data.itDNSTwo }),
                ...(PAF_314Data.itSMTPTwo && { itSMTPTwo: PAF_314Data.itSMTPTwo }),
                ...(PAF_314Data.itNameThree && { itNameThree: PAF_314Data.itNameThree }),
                ...(PAF_314Data.itIPThree && { itIPThree: PAF_314Data.itIPThree }),
                ...(PAF_314Data.itGatewayThree && { itGatewayThree: PAF_314Data.itGatewayThree }),
                ...(PAF_314Data.itSubnetThree && { itSubnetThree: PAF_314Data.itSubnetThree }),
                ...(PAF_314Data.itDNSThree && { itDNSThree: PAF_314Data.itDNSThree }),
                ...(PAF_314Data.itSMTPThree && { itSMTPThree: PAF_314Data.itSMTPThree }),
                ...(PAF_314Data.itAdditionalNotes && { itAdditionalNotes: PAF_314Data.itAdditionalNotes }),
                ...(PAF_314Data.piuDistance && { piuDistance: PAF_314Data.piuDistance }),
                ...(PAF_314Data.switchDistance && { switchDistance: PAF_314Data.switchDistance }),
                ...(PAF_314Data.ampPickup && { ampPickup: PAF_314Data.ampPickup }),
                ...(PAF_314Data.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_314Data.fromAirTakeUpDistance }),
                ...(PAF_314Data.specialControllerOptions && { specialControllerOptions: PAF_314Data.specialControllerOptions })
            },            freeWheelStatus: PAF_314Data.freeWheelStatus,
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