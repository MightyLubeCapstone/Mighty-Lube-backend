const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_317 = require("../models/PAF_317");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_317Data.templateB.existingMonitor,
                newMonitor: PAF_317Data.templateB.newMonitor,
                ...(PAF_317Data.templateB.dcuStatus && { dcuStatus: PAF_317Data.templateB.dcuStatus }),
                ...(PAF_317Data.templateB.dcuNum && { dcuNum: PAF_317Data.templateB.dcuNum }),
                ...(PAF_317Data.templateB.existingWindows && { existingWindows: PAF_317Data.templateB.existingWindows }),
                ...(PAF_317Data.templateB.existingHeadUnit && { existingHeadUnit: PAF_317Data.templateB.existingHeadUnit }),
                ...(PAF_317Data.templateB.existingDCU && { existingDCU: PAF_317Data.templateB.existingDCU }),
                ...(PAF_317Data.templateB.existingPowerInterface && { existingPowerInterface: PAF_317Data.templateB.existingPowerInterface }),
                ...(PAF_317Data.templateB.newReservoir && { newReservoir: PAF_317Data.templateB.newReservoir }),
                ...(PAF_317Data.templateB.reservoirSize && { reservoirSize: PAF_317Data.templateB.reservoirSize }),
                ...(PAF_317Data.templateB.otherReservoirSize && { otherReservoirSize: PAF_317Data.templateB.otherReservoirSize }),
                ...(PAF_317Data.templateB.newReservoirNum && { newReservoirNum: PAF_317Data.templateB.newReservoirNum }),
                ...(PAF_317Data.templateB.typeMonitor && { typeMonitor: PAF_317Data.templateB.typeMonitor }),
                ...(PAF_317Data.templateB.driveMotorAmp && { driveMotorAmp: PAF_317Data.templateB.driveMotorAmp }),
                ...(PAF_317Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_317Data.templateB.driveMotorAmpNum }),
                ...(PAF_317Data.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_317Data.templateB.driveTakeUpAir }),
                ...(PAF_317Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_317Data.templateB.driveTakeUpAirNum }),
                ...(PAF_317Data.templateB.takeUpDistance && { takeUpDistance: PAF_317Data.templateB.takeUpDistance }),
                ...(PAF_317Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_317Data.templateB.takeUpDistanceNum }),
                ...(PAF_317Data.templateB.driveTemp && { driveTemp: PAF_317Data.templateB.driveTemp }),
                ...(PAF_317Data.templateB.driveTempNum && { driveTempNum: PAF_317Data.templateB.driveTempNum }),
                ...(PAF_317Data.templateB.driveVibration && { driveVibration: PAF_317Data.templateB.driveVibration }),
                ...(PAF_317Data.templateB.driveVibrationNum && { driveVibrationNum: PAF_317Data.templateB.driveVibrationNum }),
                ...(PAF_317Data.templateB.dogPitch && { dogPitch: PAF_317Data.templateB.dogPitch }),
                ...(PAF_317Data.templateB.dogPitchNum && { dogPitchNum: PAF_317Data.templateB.dogPitchNum }),
                ...(PAF_317Data.templateB.paintMarker && { paintMarker: PAF_317Data.templateB.paintMarker }),
                ...(PAF_317Data.templateB.paintMarkerNum && { paintMarkerNum: PAF_317Data.templateB.paintMarkerNum }),
                ...(PAF_317Data.templateB.chainVision && { chainVision: PAF_317Data.templateB.chainVision }),
                ...(PAF_317Data.templateB.lubeVision && { lubeVision: PAF_317Data.templateB.lubeVision }),
                ...(PAF_317Data.templateB.trolleyVision && { trolleyVision: PAF_317Data.templateB.trolleyVision }),
                ...(PAF_317Data.templateB.trolleyDetect && { trolleyDetect: PAF_317Data.templateB.trolleyDetect }),
                ...(PAF_317Data.templateB.omniView && { omniView: PAF_317Data.templateB.omniView }),
                ...(PAF_317Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_317Data.templateB.dcuUpgradeNum }),
                ...(PAF_317Data.templateB.itNameOne && { itNameOne: PAF_317Data.templateB.itNameOne }),
                ...(PAF_317Data.templateB.itIPOne && { itIPOne: PAF_317Data.templateB.itIPOne }),
                ...(PAF_317Data.templateB.itGatewayOne && { itGatewayOne: PAF_317Data.templateB.itGatewayOne }),
                ...(PAF_317Data.templateB.itSubnetOne && { itSubnetOne: PAF_317Data.templateB.itSubnetOne }),
                ...(PAF_317Data.templateB.itDNSOne && { itDNSOne: PAF_317Data.templateB.itDNSOne }),
                ...(PAF_317Data.templateB.itSMTPOne && { itSMTPOne: PAF_317Data.templateB.itSMTPOne }),
                ...(PAF_317Data.templateB.itNameTwo && { itNameTwo: PAF_317Data.templateB.itNameTwo }),
                ...(PAF_317Data.templateB.itIPTwo && { itIPTwo: PAF_317Data.templateB.itIPTwo }),
                ...(PAF_317Data.templateB.itGatewayTwo && { itGatewayTwo: PAF_317Data.templateB.itGatewayTwo }),
                ...(PAF_317Data.templateB.itSubnetTwo && { itSubnetTwo: PAF_317Data.templateB.itSubnetTwo }),
                ...(PAF_317Data.templateB.itDNSTwo && { itDNSTwo: PAF_317Data.templateB.itDNSTwo }),
                ...(PAF_317Data.templateB.itSMTPTwo && { itSMTPTwo: PAF_317Data.templateB.itSMTPTwo }),
                ...(PAF_317Data.templateB.itNameThree && { itNameThree: PAF_317Data.templateB.itNameThree }),
                ...(PAF_317Data.templateB.itIPThree && { itIPThree: PAF_317Data.templateB.itIPThree }),
                ...(PAF_317Data.templateB.itGatewayThree && { itGatewayThree: PAF_317Data.templateB.itGatewayThree }),
                ...(PAF_317Data.templateB.itSubnetThree && { itSubnetThree: PAF_317Data.templateB.itSubnetThree }),
                ...(PAF_317Data.templateB.itDNSThree && { itDNSThree: PAF_317Data.templateB.itDNSThree }),
                ...(PAF_317Data.templateB.itSMTPThree && { itSMTPThree: PAF_317Data.templateB.itSMTPThree }),
                ...(PAF_317Data.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_317Data.templateB.itAdditionalNotes }),
                ...(PAF_317Data.templateB.piuDistance && { piuDistance: PAF_317Data.templateB.piuDistance }),
                ...(PAF_317Data.templateB.switchDistance && { switchDistance: PAF_317Data.templateB.switchDistance }),
                ...(PAF_317Data.templateB.ampPickup && { ampPickup: PAF_317Data.templateB.ampPickup }),
                ...(PAF_317Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_317Data.templateB.fromAirTakeUpDistance }),
                ...(PAF_317Data.templateB.specialControllerOptions && { specialControllerOptions: PAF_317Data.templateB.specialControllerOptions })
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