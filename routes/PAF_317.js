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
            monitorData: {
                existingMonitor: PAF_317Data.existingMonitor,
                newMonitor: PAF_317Data.newMonitor,
                ...(PAF_317Data.dcuStatus && { dcuStatus: PAF_317Data.dcuStatus }),
                ...(PAF_317Data.dcuNum && { dcuNum: PAF_317Data.dcuNum }),
                ...(PAF_317Data.existingWindows && { existingWindows: PAF_317Data.existingWindows }),
                ...(PAF_317Data.existingHeadUnit && { existingHeadUnit: PAF_317Data.existingHeadUnit }),
                ...(PAF_317Data.existingDCU && { existingDCU: PAF_317Data.existingDCU }),
                ...(PAF_317Data.existingPowerInterface && { existingPowerInterface: PAF_317Data.existingPowerInterface }),
                ...(PAF_317Data.newReservoir && { newReservoir: PAF_317Data.newReservoir }),
                ...(PAF_317Data.reservoirSize && { reservoirSize: PAF_317Data.reservoirSize }),
                ...(PAF_317Data.otherReservoirSize && { otherReservoirSize: PAF_317Data.otherReservoirSize }),
                ...(PAF_317Data.newReservoirNum && { newReservoirNum: PAF_317Data.newReservoirNum }),
                ...(PAF_317Data.typeMonitor && { typeMonitor: PAF_317Data.typeMonitor }),
                ...(PAF_317Data.driveMotorAmp && { driveMotorAmp: PAF_317Data.driveMotorAmp }),
                ...(PAF_317Data.driveMotorAmpNum && { driveMotorAmpNum: PAF_317Data.driveMotorAmpNum }),
                ...(PAF_317Data.driveTakeUpAir && { driveTakeUpAir: PAF_317Data.driveTakeUpAir }),
                ...(PAF_317Data.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_317Data.driveTakeUpAirNum }),
                ...(PAF_317Data.takeUpDistance && { takeUpDistance: PAF_317Data.takeUpDistance }),
                ...(PAF_317Data.takeUpDistanceNum && { takeUpDistanceNum: PAF_317Data.takeUpDistanceNum }),
                ...(PAF_317Data.driveTemp && { driveTemp: PAF_317Data.driveTemp }),
                ...(PAF_317Data.driveTempNum && { driveTempNum: PAF_317Data.driveTempNum }),
                ...(PAF_317Data.driveVibration && { driveVibration: PAF_317Data.driveVibration }),
                ...(PAF_317Data.driveVibrationNum && { driveVibrationNum: PAF_317Data.driveVibrationNum }),
                ...(PAF_317Data.dogPitch && { dogPitch: PAF_317Data.dogPitch }),
                ...(PAF_317Data.dogPitchNum && { dogPitchNum: PAF_317Data.dogPitchNum }),
                ...(PAF_317Data.paintMarker && { paintMarker: PAF_317Data.paintMarker }),
                ...(PAF_317Data.paintMarkerNum && { paintMarkerNum: PAF_317Data.paintMarkerNum }),
                ...(PAF_317Data.chainVision && { chainVision: PAF_317Data.chainVision }),
                ...(PAF_317Data.lubeVision && { lubeVision: PAF_317Data.lubeVision }),
                ...(PAF_317Data.trolleyVision && { trolleyVision: PAF_317Data.trolleyVision }),
                ...(PAF_317Data.trolleyDetect && { trolleyDetect: PAF_317Data.trolleyDetect }),
                ...(PAF_317Data.omniView && { omniView: PAF_317Data.omniView }),
                ...(PAF_317Data.dcuUpgradeNum && { dcuUpgradeNum: PAF_317Data.dcuUpgradeNum }),
                ...(PAF_317Data.itNameOne && { itNameOne: PAF_317Data.itNameOne }),
                ...(PAF_317Data.itIPOne && { itIPOne: PAF_317Data.itIPOne }),
                ...(PAF_317Data.itGatewayOne && { itGatewayOne: PAF_317Data.itGatewayOne }),
                ...(PAF_317Data.itSubnetOne && { itSubnetOne: PAF_317Data.itSubnetOne }),
                ...(PAF_317Data.itDNSOne && { itDNSOne: PAF_317Data.itDNSOne }),
                ...(PAF_317Data.itSMTPOne && { itSMTPOne: PAF_317Data.itSMTPOne }),
                ...(PAF_317Data.itNameTwo && { itNameTwo: PAF_317Data.itNameTwo }),
                ...(PAF_317Data.itIPTwo && { itIPTwo: PAF_317Data.itIPTwo }),
                ...(PAF_317Data.itGatewayTwo && { itGatewayTwo: PAF_317Data.itGatewayTwo }),
                ...(PAF_317Data.itSubnetTwo && { itSubnetTwo: PAF_317Data.itSubnetTwo }),
                ...(PAF_317Data.itDNSTwo && { itDNSTwo: PAF_317Data.itDNSTwo }),
                ...(PAF_317Data.itSMTPTwo && { itSMTPTwo: PAF_317Data.itSMTPTwo }),
                ...(PAF_317Data.itNameThree && { itNameThree: PAF_317Data.itNameThree }),
                ...(PAF_317Data.itIPThree && { itIPThree: PAF_317Data.itIPThree }),
                ...(PAF_317Data.itGatewayThree && { itGatewayThree: PAF_317Data.itGatewayThree }),
                ...(PAF_317Data.itSubnetThree && { itSubnetThree: PAF_317Data.itSubnetThree }),
                ...(PAF_317Data.itDNSThree && { itDNSThree: PAF_317Data.itDNSThree }),
                ...(PAF_317Data.itSMTPThree && { itSMTPThree: PAF_317Data.itSMTPThree }),
                ...(PAF_317Data.itAdditionalNotes && { itAdditionalNotes: PAF_317Data.itAdditionalNotes }),
                ...(PAF_317Data.piuDistance && { piuDistance: PAF_317Data.piuDistance }),
                ...(PAF_317Data.switchDistance && { switchDistance: PAF_317Data.switchDistance }),
                ...(PAF_317Data.ampPickup && { ampPickup: PAF_317Data.ampPickup }),
                ...(PAF_317Data.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_317Data.fromAirTakeUpDistance }),
                ...(PAF_317Data.specialControllerOptions && { specialControllerOptions: PAF_317Data.specialControllerOptions })
            },
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