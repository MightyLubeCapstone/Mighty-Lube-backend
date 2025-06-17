const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_317 = require("../models/PAF_317");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_317Data, numRequested } = req.body;
        const order = new PAF_317({
            conveyorName: PAF_317Data.conveyorName,
            wheelManufacturer: PAF_317Data.wheelManufacturer,
            conveyorLength: PAF_317Data.conveyorLength,
            conveyorLengthUnit: PAF_317Data.conveyorLengthUnit,
            conveyorSpeed: PAF_317Data.conveyorSpeed,
            conveyorSpeedUnit: PAF_317Data.conveyorSpeedUnit,
            conveyorIndex: PAF_317Data.conveyorIndex,
            travelDirection: PAF_317Data.travelDirection,
            appEnviroment: PAF_317Data.appEnviroment,
            ...(PAF_317Data.ovenStatus && { ovenStatus: PAF_317Data.ovenStatus }),
            ...(PAF_317Data.ovenTemp && { ovenTemp: PAF_317Data.ovenTemp }),
            surroundingTemp: PAF_317Data.surroundingTemp,
            conveyorSwing: PAF_317Data.conveyorSwing,
            orientationType: PAF_317Data.orientationType,
            operatingVoltSingle: PAF_317Data.operatingVoltSingle,
            controlVoltSingle: PAF_317Data.controlVoltSingle,
            compressedAir: PAF_317Data.compressedAir,
            airSupplyType: PAF_317Data.airSupplyType,
            monitorData: new templateA({
                existingMonitor: PAF_317Data.templateA.existingMonitor,
                newMonitor: PAF_317Data.templateA.newMonitor,
                ...(PAF_317Data.templateA.dcuStatus && { dcuStatus: PAF_317Data.templateA.dcuStatus }),
                ...(PAF_317Data.templateA.dcuNum && { dcuNum: PAF_317Data.templateA.dcuNum }),
                ...(PAF_317Data.templateA.existingWindows && { existingWindows: PAF_317Data.templateA.existingWindows }),
                ...(PAF_317Data.templateA.existingHeadUnit && { existingHeadUnit: PAF_317Data.templateA.existingHeadUnit }),
                ...(PAF_317Data.templateA.existingDCU && { existingDCU: PAF_317Data.templateA.existingDCU }),
                ...(PAF_317Data.templateA.existingPowerInterface && { existingPowerInterface: PAF_317Data.templateA.existingPowerInterface }),
                ...(PAF_317Data.templateA.newReservoir && { newReservoir: PAF_317Data.templateA.newReservoir }),
                ...(PAF_317Data.templateA.reservoirSize && { reservoirSize: PAF_317Data.templateA.reservoirSize }),
                ...(PAF_317Data.templateA.otherReservoirSize && { otherReservoirSize: PAF_317Data.templateA.otherReservoirSize }),
                ...(PAF_317Data.templateA.newReservoirNum && { newReservoirNum: PAF_317Data.templateA.newReservoirNum }),
                ...(PAF_317Data.templateA.typeMonitor && { typeMonitor: PAF_317Data.templateA.typeMonitor }),
                ...(PAF_317Data.templateA.driveMotorAmp && { driveMotorAmp: PAF_317Data.templateA.driveMotorAmp }),
                ...(PAF_317Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_317Data.templateA.driveMotorAmpNum }),
                ...(PAF_317Data.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_317Data.templateA.driveTakeUpAir }),
                ...(PAF_317Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_317Data.templateA.driveTakeUpAirNum }),
                ...(PAF_317Data.templateA.takeUpDistance && { takeUpDistance: PAF_317Data.templateA.takeUpDistance }),
                ...(PAF_317Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_317Data.templateA.takeUpDistanceNum }),
                ...(PAF_317Data.templateA.driveTemp && { driveTemp: PAF_317Data.templateA.driveTemp }),
                ...(PAF_317Data.templateA.driveTempNum && { driveTempNum: PAF_317Data.templateA.driveTempNum }),
                ...(PAF_317Data.templateA.driveVibration && { driveVibration: PAF_317Data.templateA.driveVibration }),
                ...(PAF_317Data.templateA.driveVibrationNum && { driveVibrationNum: PAF_317Data.templateA.driveVibrationNum }),
                ...(PAF_317Data.templateA.dogPitch && { dogPitch: PAF_317Data.templateA.dogPitch }),
                ...(PAF_317Data.templateA.dogPitchNum && { dogPitchNum: PAF_317Data.templateA.dogPitchNum }),
                ...(PAF_317Data.templateA.paintMarker && { paintMarker: PAF_317Data.templateA.paintMarker }),
                ...(PAF_317Data.templateA.paintMarkerNum && { paintMarkerNum: PAF_317Data.templateA.paintMarkerNum }),
                ...(PAF_317Data.templateA.chainVision && { chainVision: PAF_317Data.templateA.chainVision }),
                ...(PAF_317Data.templateA.lubeVision && { lubeVision: PAF_317Data.templateA.lubeVision }),
                ...(PAF_317Data.templateA.trolleyVision && { trolleyVision: PAF_317Data.templateA.trolleyVision }),
                ...(PAF_317Data.templateA.trolleyDetect && { trolleyDetect: PAF_317Data.templateA.trolleyDetect }),
                ...(PAF_317Data.templateA.omniView && { omniView: PAF_317Data.templateA.omniView }),
                ...(PAF_317Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_317Data.templateA.dcuUpgradeNum }),
                ...(PAF_317Data.templateA.itNameOne && { itNameOne: PAF_317Data.templateA.itNameOne }),
                ...(PAF_317Data.templateA.itIPOne && { itIPOne: PAF_317Data.templateA.itIPOne }),
                ...(PAF_317Data.templateA.itGatewayOne && { itGatewayOne: PAF_317Data.templateA.itGatewayOne }),
                ...(PAF_317Data.templateA.itSubnetOne && { itSubnetOne: PAF_317Data.templateA.itSubnetOne }),
                ...(PAF_317Data.templateA.itDNSOne && { itDNSOne: PAF_317Data.templateA.itDNSOne }),
                ...(PAF_317Data.templateA.itSMTPOne && { itSMTPOne: PAF_317Data.templateA.itSMTPOne }),
                ...(PAF_317Data.templateA.itNameTwo && { itNameTwo: PAF_317Data.templateA.itNameTwo }),
                ...(PAF_317Data.templateA.itIPTwo && { itIPTwo: PAF_317Data.templateA.itIPTwo }),
                ...(PAF_317Data.templateA.itGatewayTwo && { itGatewayTwo: PAF_317Data.templateA.itGatewayTwo }),
                ...(PAF_317Data.templateA.itSubnetTwo && { itSubnetTwo: PAF_317Data.templateA.itSubnetTwo }),
                ...(PAF_317Data.templateA.itDNSTwo && { itDNSTwo: PAF_317Data.templateA.itDNSTwo }),
                ...(PAF_317Data.templateA.itSMTPTwo && { itSMTPTwo: PAF_317Data.templateA.itSMTPTwo }),
                ...(PAF_317Data.templateA.itNameThree && { itNameThree: PAF_317Data.templateA.itNameThree }),
                ...(PAF_317Data.templateA.itIPThree && { itIPThree: PAF_317Data.templateA.itIPThree }),
                ...(PAF_317Data.templateA.itGatewayThree && { itGatewayThree: PAF_317Data.templateA.itGatewayThree }),
                ...(PAF_317Data.templateA.itSubnetThree && { itSubnetThree: PAF_317Data.templateA.itSubnetThree }),
                ...(PAF_317Data.templateA.itDNSThree && { itDNSThree: PAF_317Data.templateA.itDNSThree }),
                ...(PAF_317Data.templateA.itSMTPThree && { itSMTPThree: PAF_317Data.templateA.itSMTPThree }),
                ...(PAF_317Data.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_317Data.templateA.itAdditionalNotes }),
                ...(PAF_317Data.templateA.piuDistance && { piuDistance: PAF_317Data.templateA.piuDistance }),
                ...(PAF_317Data.templateA.switchDistance && { switchDistance: PAF_317Data.templateA.switchDistance }),
                ...(PAF_317Data.templateA.ampPickup && { ampPickup: PAF_317Data.templateA.ampPickup }),
                ...(PAF_317Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_317Data.templateA.fromAirTakeUpDistance }),
                ...(PAF_317Data.templateA.specialControllerOptions && { specialControllerOptions: PAF_317Data.templateA.specialControllerOptions })
            }),
            freeWheelStatus: PAF_317Data.freeWheelStatus,
            guideRollerStatus: PAF_317Data.guideRollerStatus,
            openRaceStyleType: PAF_317Data.openRaceStyleType,
            closedRaceStyleType: PAF_317Data.closedRaceStyleType,
            holeStatus: PAF_317Data.holeStatus,
            lubeBrand: PAF_317Data.lubeBrand,
            lubeType: PAF_317Data.lubeType,
            lubeViscosity: PAF_317Data.lubeViscosity,
            currentGrease: PAF_317Data.currentGrease,
            currentGreaseGrade: PAF_317Data.currentGreaseGrade,
            zerkDirection: PAF_317Data.zerkDirection,
            zerkLocationType: PAF_317Data.zerkLocationType,
            chainMaster: PAF_317Data.chainMaster,
            remoteStatus: PAF_317Data.remoteStatus,
            mountStatus: PAF_317Data.mountStatus,
            otherUnitStatus: PAF_317Data.otherUnitStatus,
            timerStatus: PAF_317Data.timerStatus,
            electricStatus: PAF_317Data.electricStatus,
            mightyLubeMonitoring: PAF_317Data.mightyLubeMonitoring,
            preMountType: PAF_317Data.preMountType,
            plcConnection: PAF_317Data.plcConnection,
            otherControllerNotes: PAF_317Data.otherControllerNotes,
            pfUnitType: PAF_317Data.pfUnitType,
            pfInvertedA: PAF_317Data.pfInvertedA,
            pfInvertedB: PAF_317Data.pfInvertedB,
            pfInvertedE: PAF_317Data.pfInvertedE,
            pfInvertedS: PAF_317Data.pfInvertedS
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_317"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_317 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;