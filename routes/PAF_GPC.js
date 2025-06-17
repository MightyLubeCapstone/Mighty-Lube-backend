const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_GPC = require("../models/PAF_GPC");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_GPCData, numRequested } = req.body;
        const order = new PAF_GPC({
            conveyorName: PAF_GPCData.conveyorName,
            chainSize: PAF_GPCData.chainSize,
            ...(PAF_GPCData.otherChainSize && { otherChainSize: PAF_GPCData.otherChainSize }),
            industrialChainManufacturer: PAF_GPCData.industrialChainManufacturer,
            ...(PAF_GPCData.otherChainManufacturer && { otherChainManufacturer: PAF_GPCData.otherChainManufacturer }),
            wheelManufacturer: PAF_GPCData.wheelManufacturer,
            conveyorLength: PAF_GPCData.conveyorLength,
            conveyorLengthUnit: PAF_GPCData.conveyorLengthUnit,
            conveyorSpeed: PAF_GPCData.conveyorSpeed,
            conveyorSpeedUnit: PAF_GPCData.conveyorSpeedUnit,
            conveyorIndex: PAF_GPCData.conveyorIndex,
            travelDirection: PAF_GPCData.travelDirection,
            appEnviroment: PAF_GPCData.appEnviroment,
            ...(PAF_GPCData.ovenStatus && { ovenStatus: PAF_GPCData.ovenStatus }),
            ...(PAF_GPCData.ovenTemp && { ovenTemp: PAF_GPCData.ovenTemp }),
            surroundingTemp: PAF_GPCData.surroundingTemp,
            conveyorLoaded: PAF_GPCData.conveyorLoaded,
            conveyorSwing: PAF_GPCData.conveyorSwing,
            plantLayout: PAF_GPCData.plantLayout,
            operatingVoltSingle: PAF_GPCData.operatingVoltSingle,
            controlVoltSingle: PAF_GPCData.controlVoltSingle,
            compressedAir: PAF_GPCData.compressedAir,
            airSupplyType: PAF_GPCData.airSupplyType,
            monitorData: new templateA({
                existingMonitor: PAF_GPCData.templateA.existingMonitor,
                newMonitor: PAF_GPCData.templateA.newMonitor,
                ...(PAF_GPCData.templateA.dcuStatus && { dcuStatus: PAF_GPCData.templateA.dcuStatus }),
                ...(PAF_GPCData.templateA.dcuNum && { dcuNum: PAF_GPCData.templateA.dcuNum }),
                ...(PAF_GPCData.templateA.existingWindows && { existingWindows: PAF_GPCData.templateA.existingWindows }),
                ...(PAF_GPCData.templateA.existingHeadUnit && { existingHeadUnit: PAF_GPCData.templateA.existingHeadUnit }),
                ...(PAF_GPCData.templateA.existingDCU && { existingDCU: PAF_GPCData.templateA.existingDCU }),
                ...(PAF_GPCData.templateA.existingPowerInterface && { existingPowerInterface: PAF_GPCData.templateA.existingPowerInterface }),
                ...(PAF_GPCData.templateA.newReservoir && { newReservoir: PAF_GPCData.templateA.newReservoir }),
                ...(PAF_GPCData.templateA.reservoirSize && { reservoirSize: PAF_GPCData.templateA.reservoirSize }),
                ...(PAF_GPCData.templateA.otherReservoirSize && { otherReservoirSize: PAF_GPCData.templateA.otherReservoirSize }),
                ...(PAF_GPCData.templateA.newReservoirNum && { newReservoirNum: PAF_GPCData.templateA.newReservoirNum }),
                ...(PAF_GPCData.templateA.typeMonitor && { typeMonitor: PAF_GPCData.templateA.typeMonitor }),
                ...(PAF_GPCData.templateA.driveMotorAmp && { driveMotorAmp: PAF_GPCData.templateA.driveMotorAmp }),
                ...(PAF_GPCData.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_GPCData.templateA.driveMotorAmpNum }),
                ...(PAF_GPCData.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_GPCData.templateA.driveTakeUpAir }),
                ...(PAF_GPCData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_GPCData.templateA.driveTakeUpAirNum }),
                ...(PAF_GPCData.templateA.takeUpDistance && { takeUpDistance: PAF_GPCData.templateA.takeUpDistance }),
                ...(PAF_GPCData.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_GPCData.templateA.takeUpDistanceNum }),
                ...(PAF_GPCData.templateA.driveTemp && { driveTemp: PAF_GPCData.templateA.driveTemp }),
                ...(PAF_GPCData.templateA.driveTempNum && { driveTempNum: PAF_GPCData.templateA.driveTempNum }),
                ...(PAF_GPCData.templateA.driveVibration && { driveVibration: PAF_GPCData.templateA.driveVibration }),
                ...(PAF_GPCData.templateA.driveVibrationNum && { driveVibrationNum: PAF_GPCData.templateA.driveVibrationNum }),
                ...(PAF_GPCData.templateA.dogPitch && { dogPitch: PAF_GPCData.templateA.dogPitch }),
                ...(PAF_GPCData.templateA.dogPitchNum && { dogPitchNum: PAF_GPCData.templateA.dogPitchNum }),
                ...(PAF_GPCData.templateA.paintMarker && { paintMarker: PAF_GPCData.templateA.paintMarker }),
                ...(PAF_GPCData.templateA.paintMarkerNum && { paintMarkerNum: PAF_GPCData.templateA.paintMarkerNum }),
                ...(PAF_GPCData.templateA.chainVision && { chainVision: PAF_GPCData.templateA.chainVision }),
                ...(PAF_GPCData.templateA.lubeVision && { lubeVision: PAF_GPCData.templateA.lubeVision }),
                ...(PAF_GPCData.templateA.trolleyVision && { trolleyVision: PAF_GPCData.templateA.trolleyVision }),
                ...(PAF_GPCData.templateA.trolleyDetect && { trolleyDetect: PAF_GPCData.templateA.trolleyDetect }),
                ...(PAF_GPCData.templateA.omniView && { omniView: PAF_GPCData.templateA.omniView }),
                ...(PAF_GPCData.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_GPCData.templateA.dcuUpgradeNum }),
                ...(PAF_GPCData.templateA.itNameOne && { itNameOne: PAF_GPCData.templateA.itNameOne }),
                ...(PAF_GPCData.templateA.itIPOne && { itIPOne: PAF_GPCData.templateA.itIPOne }),
                ...(PAF_GPCData.templateA.itGatewayOne && { itGatewayOne: PAF_GPCData.templateA.itGatewayOne }),
                ...(PAF_GPCData.templateA.itSubnetOne && { itSubnetOne: PAF_GPCData.templateA.itSubnetOne }),
                ...(PAF_GPCData.templateA.itDNSOne && { itDNSOne: PAF_GPCData.templateA.itDNSOne }),
                ...(PAF_GPCData.templateA.itSMTPOne && { itSMTPOne: PAF_GPCData.templateA.itSMTPOne }),
                ...(PAF_GPCData.templateA.itNameTwo && { itNameTwo: PAF_GPCData.templateA.itNameTwo }),
                ...(PAF_GPCData.templateA.itIPTwo && { itIPTwo: PAF_GPCData.templateA.itIPTwo }),
                ...(PAF_GPCData.templateA.itGatewayTwo && { itGatewayTwo: PAF_GPCData.templateA.itGatewayTwo }),
                ...(PAF_GPCData.templateA.itSubnetTwo && { itSubnetTwo: PAF_GPCData.templateA.itSubnetTwo }),
                ...(PAF_GPCData.templateA.itDNSTwo && { itDNSTwo: PAF_GPCData.templateA.itDNSTwo }),
                ...(PAF_GPCData.templateA.itSMTPTwo && { itSMTPTwo: PAF_GPCData.templateA.itSMTPTwo }),
                ...(PAF_GPCData.templateA.itNameThree && { itNameThree: PAF_GPCData.templateA.itNameThree }),
                ...(PAF_GPCData.templateA.itIPThree && { itIPThree: PAF_GPCData.templateA.itIPThree }),
                ...(PAF_GPCData.templateA.itGatewayThree && { itGatewayThree: PAF_GPCData.templateA.itGatewayThree }),
                ...(PAF_GPCData.templateA.itSubnetThree && { itSubnetThree: PAF_GPCData.templateA.itSubnetThree }),
                ...(PAF_GPCData.templateA.itDNSThree && { itDNSThree: PAF_GPCData.templateA.itDNSThree }),
                ...(PAF_GPCData.templateA.itSMTPThree && { itSMTPThree: PAF_GPCData.templateA.itSMTPThree }),
                ...(PAF_GPCData.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_GPCData.templateA.itAdditionalNotes }),
                ...(PAF_GPCData.templateA.piuDistance && { piuDistance: PAF_GPCData.templateA.piuDistance }),
                ...(PAF_GPCData.templateA.switchDistance && { switchDistance: PAF_GPCData.templateA.switchDistance }),
                ...(PAF_GPCData.templateA.ampPickup && { ampPickup: PAF_GPCData.templateA.ampPickup }),
                ...(PAF_GPCData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_GPCData.templateA.fromAirTakeUpDistance }),
                ...(PAF_GPCData.templateA.specialControllerOptions && { specialControllerOptions: PAF_GPCData.templateA.specialControllerOptions })
            }),
            currentGrease: PAF_GPCData.currentGrease,
            currentGreaseGrade: PAF_GPCData.currentGreaseGrade,
            chainMaster: PAF_GPCData.chainMaster,
            remoteStatus: PAF_GPCData.remoteStatus,
            mountStatus: PAF_GPCData.mountStatus,
            otherUnitStatus: PAF_GPCData.otherUnitStatus,
            timerStatus: PAF_GPCData.timerStatus,
            electricStatus: PAF_GPCData.electricStatus,
            mightyLubeMonitoring: PAF_GPCData.mightyLubeMonitoring,
            preMountType: PAF_GPCData.preMountType,
            otherControllerNotes: PAF_GPCData.otherControllerNotes,
            gpcUnitType: PAF_GPCData.gpcUnitType,
            chainDrop: PAF_GPCData.chainDrop,
            gpcDiameter: PAF_GPCData.gpcDiameter,
            gpcWheelC: PAF_GPCData.gpcWheelC,
            gpcWheelD: PAF_GPCData.gpcWheelD,
            gpcWheelE: PAF_GPCData.gpcWheelE,
            gpcWheelF: PAF_GPCData.gpcWheelF,
            gpcWheelG: PAF_GPCData.gpcWheelG,
            gpcWheelH: PAF_GPCData.gpcWheelH,
            gpcWheelS: PAF_GPCData.gpcWheelS
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_GPC"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_GPC entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;