const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_314 = require("../models/PAF_314");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_314Data.templateB.existingMonitor,
                newMonitor: PAF_314Data.templateB.newMonitor,
                ...(PAF_314Data.templateB.dcuStatus && { dcuStatus: PAF_314Data.templateB.dcuStatus }),
                ...(PAF_314Data.templateB.dcuNum && { dcuNum: PAF_314Data.templateB.dcuNum }),
                ...(PAF_314Data.templateB.existingWindows && { existingWindows: PAF_314Data.templateB.existingWindows }),
                ...(PAF_314Data.templateB.existingHeadUnit && { existingHeadUnit: PAF_314Data.templateB.existingHeadUnit }),
                ...(PAF_314Data.templateB.existingDCU && { existingDCU: PAF_314Data.templateB.existingDCU }),
                ...(PAF_314Data.templateB.existingPowerInterface && { existingPowerInterface: PAF_314Data.templateB.existingPowerInterface }),
                ...(PAF_314Data.templateB.newReservoir && { newReservoir: PAF_314Data.templateB.newReservoir }),
                ...(PAF_314Data.templateB.reservoirSize && { reservoirSize: PAF_314Data.templateB.reservoirSize }),
                ...(PAF_314Data.templateB.otherReservoirSize && { otherReservoirSize: PAF_314Data.templateB.otherReservoirSize }),
                ...(PAF_314Data.templateB.newReservoirNum && { newReservoirNum: PAF_314Data.templateB.newReservoirNum }),
                ...(PAF_314Data.templateB.typeMonitor && { typeMonitor: PAF_314Data.templateB.typeMonitor }),
                ...(PAF_314Data.templateB.driveMotorAmp && { driveMotorAmp: PAF_314Data.templateB.driveMotorAmp }),
                ...(PAF_314Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_314Data.templateB.driveMotorAmpNum }),
                ...(PAF_314Data.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_314Data.templateB.driveTakeUpAir }),
                ...(PAF_314Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_314Data.templateB.driveTakeUpAirNum }),
                ...(PAF_314Data.templateB.takeUpDistance && { takeUpDistance: PAF_314Data.templateB.takeUpDistance }),
                ...(PAF_314Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_314Data.templateB.takeUpDistanceNum }),
                ...(PAF_314Data.templateB.driveTemp && { driveTemp: PAF_314Data.templateB.driveTemp }),
                ...(PAF_314Data.templateB.driveTempNum && { driveTempNum: PAF_314Data.templateB.driveTempNum }),
                ...(PAF_314Data.templateB.driveVibration && { driveVibration: PAF_314Data.templateB.driveVibration }),
                ...(PAF_314Data.templateB.driveVibrationNum && { driveVibrationNum: PAF_314Data.templateB.driveVibrationNum }),
                ...(PAF_314Data.templateB.dogPitch && { dogPitch: PAF_314Data.templateB.dogPitch }),
                ...(PAF_314Data.templateB.dogPitchNum && { dogPitchNum: PAF_314Data.templateB.dogPitchNum }),
                ...(PAF_314Data.templateB.paintMarker && { paintMarker: PAF_314Data.templateB.paintMarker }),
                ...(PAF_314Data.templateB.paintMarkerNum && { paintMarkerNum: PAF_314Data.templateB.paintMarkerNum }),
                ...(PAF_314Data.templateB.chainVision && { chainVision: PAF_314Data.templateB.chainVision }),
                ...(PAF_314Data.templateB.lubeVision && { lubeVision: PAF_314Data.templateB.lubeVision }),
                ...(PAF_314Data.templateB.trolleyVision && { trolleyVision: PAF_314Data.templateB.trolleyVision }),
                ...(PAF_314Data.templateB.trolleyDetect && { trolleyDetect: PAF_314Data.templateB.trolleyDetect }),
                ...(PAF_314Data.templateB.omniView && { omniView: PAF_314Data.templateB.omniView }),
                ...(PAF_314Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_314Data.templateB.dcuUpgradeNum }),
                ...(PAF_314Data.templateB.itNameOne && { itNameOne: PAF_314Data.templateB.itNameOne }),
                ...(PAF_314Data.templateB.itIPOne && { itIPOne: PAF_314Data.templateB.itIPOne }),
                ...(PAF_314Data.templateB.itGatewayOne && { itGatewayOne: PAF_314Data.templateB.itGatewayOne }),
                ...(PAF_314Data.templateB.itSubnetOne && { itSubnetOne: PAF_314Data.templateB.itSubnetOne }),
                ...(PAF_314Data.templateB.itDNSOne && { itDNSOne: PAF_314Data.templateB.itDNSOne }),
                ...(PAF_314Data.templateB.itSMTPOne && { itSMTPOne: PAF_314Data.templateB.itSMTPOne }),
                ...(PAF_314Data.templateB.itNameTwo && { itNameTwo: PAF_314Data.templateB.itNameTwo }),
                ...(PAF_314Data.templateB.itIPTwo && { itIPTwo: PAF_314Data.templateB.itIPTwo }),
                ...(PAF_314Data.templateB.itGatewayTwo && { itGatewayTwo: PAF_314Data.templateB.itGatewayTwo }),
                ...(PAF_314Data.templateB.itSubnetTwo && { itSubnetTwo: PAF_314Data.templateB.itSubnetTwo }),
                ...(PAF_314Data.templateB.itDNSTwo && { itDNSTwo: PAF_314Data.templateB.itDNSTwo }),
                ...(PAF_314Data.templateB.itSMTPTwo && { itSMTPTwo: PAF_314Data.templateB.itSMTPTwo }),
                ...(PAF_314Data.templateB.itNameThree && { itNameThree: PAF_314Data.templateB.itNameThree }),
                ...(PAF_314Data.templateB.itIPThree && { itIPThree: PAF_314Data.templateB.itIPThree }),
                ...(PAF_314Data.templateB.itGatewayThree && { itGatewayThree: PAF_314Data.templateB.itGatewayThree }),
                ...(PAF_314Data.templateB.itSubnetThree && { itSubnetThree: PAF_314Data.templateB.itSubnetThree }),
                ...(PAF_314Data.templateB.itDNSThree && { itDNSThree: PAF_314Data.templateB.itDNSThree }),
                ...(PAF_314Data.templateB.itSMTPThree && { itSMTPThree: PAF_314Data.templateB.itSMTPThree }),
                ...(PAF_314Data.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_314Data.templateB.itAdditionalNotes }),
                ...(PAF_314Data.templateB.piuDistance && { piuDistance: PAF_314Data.templateB.piuDistance }),
                ...(PAF_314Data.templateB.switchDistance && { switchDistance: PAF_314Data.templateB.switchDistance }),
                ...(PAF_314Data.templateB.ampPickup && { ampPickup: PAF_314Data.templateB.ampPickup }),
                ...(PAF_314Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_314Data.templateB.fromAirTakeUpDistance }),
                ...(PAF_314Data.templateB.specialControllerOptions && { specialControllerOptions: PAF_314Data.templateB.specialControllerOptions })
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