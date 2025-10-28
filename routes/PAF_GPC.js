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
            monitorData: {
                existingMonitor: PAF_GPCData.existingMonitor,
                newMonitor: PAF_GPCData.newMonitor,
                ...(PAF_GPCData.dcuStatus && { dcuStatus: PAF_GPCData.dcuStatus }),
                ...(PAF_GPCData.dcuNum && { dcuNum: PAF_GPCData.dcuNum }),
                ...(PAF_GPCData.existingWindows && { existingWindows: PAF_GPCData.existingWindows }),
                ...(PAF_GPCData.existingHeadUnit && { existingHeadUnit: PAF_GPCData.existingHeadUnit }),
                ...(PAF_GPCData.existingDCU && { existingDCU: PAF_GPCData.existingDCU }),
                ...(PAF_GPCData.existingPowerInterface && { existingPowerInterface: PAF_GPCData.existingPowerInterface }),
                ...(PAF_GPCData.newReservoir && { newReservoir: PAF_GPCData.newReservoir }),
                ...(PAF_GPCData.reservoirSize && { reservoirSize: PAF_GPCData.reservoirSize }),
                ...(PAF_GPCData.otherReservoirSize && { otherReservoirSize: PAF_GPCData.otherReservoirSize }),
                ...(PAF_GPCData.newReservoirNum && { newReservoirNum: PAF_GPCData.newReservoirNum }),
                ...(PAF_GPCData.typeMonitor && { typeMonitor: PAF_GPCData.typeMonitor }),
                ...(PAF_GPCData.driveMotorAmp && { driveMotorAmp: PAF_GPCData.driveMotorAmp }),
                ...(PAF_GPCData.driveMotorAmpNum && { driveMotorAmpNum: PAF_GPCData.driveMotorAmpNum }),
                ...(PAF_GPCData.driveTakeUpAir && { driveTakeUpAir: PAF_GPCData.driveTakeUpAir }),
                ...(PAF_GPCData.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_GPCData.driveTakeUpAirNum }),
                ...(PAF_GPCData.takeUpDistance && { takeUpDistance: PAF_GPCData.takeUpDistance }),
                ...(PAF_GPCData.takeUpDistanceNum && { takeUpDistanceNum: PAF_GPCData.takeUpDistanceNum }),
                ...(PAF_GPCData.driveTemp && { driveTemp: PAF_GPCData.driveTemp }),
                ...(PAF_GPCData.driveTempNum && { driveTempNum: PAF_GPCData.driveTempNum }),
                ...(PAF_GPCData.driveVibration && { driveVibration: PAF_GPCData.driveVibration }),
                ...(PAF_GPCData.driveVibrationNum && { driveVibrationNum: PAF_GPCData.driveVibrationNum }),
                ...(PAF_GPCData.dogPitch && { dogPitch: PAF_GPCData.dogPitch }),
                ...(PAF_GPCData.dogPitchNum && { dogPitchNum: PAF_GPCData.dogPitchNum }),
                ...(PAF_GPCData.paintMarker && { paintMarker: PAF_GPCData.paintMarker }),
                ...(PAF_GPCData.paintMarkerNum && { paintMarkerNum: PAF_GPCData.paintMarkerNum }),
                ...(PAF_GPCData.chainVision && { chainVision: PAF_GPCData.chainVision }),
                ...(PAF_GPCData.lubeVision && { lubeVision: PAF_GPCData.lubeVision }),
                ...(PAF_GPCData.trolleyVision && { trolleyVision: PAF_GPCData.trolleyVision }),
                ...(PAF_GPCData.trolleyDetect && { trolleyDetect: PAF_GPCData.trolleyDetect }),
                ...(PAF_GPCData.omniView && { omniView: PAF_GPCData.omniView }),
                ...(PAF_GPCData.dcuUpgradeNum && { dcuUpgradeNum: PAF_GPCData.dcuUpgradeNum }),
                ...(PAF_GPCData.itNameOne && { itNameOne: PAF_GPCData.itNameOne }),
                ...(PAF_GPCData.itIPOne && { itIPOne: PAF_GPCData.itIPOne }),
                ...(PAF_GPCData.itGatewayOne && { itGatewayOne: PAF_GPCData.itGatewayOne }),
                ...(PAF_GPCData.itSubnetOne && { itSubnetOne: PAF_GPCData.itSubnetOne }),
                ...(PAF_GPCData.itDNSOne && { itDNSOne: PAF_GPCData.itDNSOne }),
                ...(PAF_GPCData.itSMTPOne && { itSMTPOne: PAF_GPCData.itSMTPOne }),
                ...(PAF_GPCData.itNameTwo && { itNameTwo: PAF_GPCData.itNameTwo }),
                ...(PAF_GPCData.itIPTwo && { itIPTwo: PAF_GPCData.itIPTwo }),
                ...(PAF_GPCData.itGatewayTwo && { itGatewayTwo: PAF_GPCData.itGatewayTwo }),
                ...(PAF_GPCData.itSubnetTwo && { itSubnetTwo: PAF_GPCData.itSubnetTwo }),
                ...(PAF_GPCData.itDNSTwo && { itDNSTwo: PAF_GPCData.itDNSTwo }),
                ...(PAF_GPCData.itSMTPTwo && { itSMTPTwo: PAF_GPCData.itSMTPTwo }),
                ...(PAF_GPCData.itNameThree && { itNameThree: PAF_GPCData.itNameThree }),
                ...(PAF_GPCData.itIPThree && { itIPThree: PAF_GPCData.itIPThree }),
                ...(PAF_GPCData.itGatewayThree && { itGatewayThree: PAF_GPCData.itGatewayThree }),
                ...(PAF_GPCData.itSubnetThree && { itSubnetThree: PAF_GPCData.itSubnetThree }),
                ...(PAF_GPCData.itDNSThree && { itDNSThree: PAF_GPCData.itDNSThree }),
                ...(PAF_GPCData.itSMTPThree && { itSMTPThree: PAF_GPCData.itSMTPThree }),
                ...(PAF_GPCData.itAdditionalNotes && { itAdditionalNotes: PAF_GPCData.itAdditionalNotes }),
                ...(PAF_GPCData.piuDistance && { piuDistance: PAF_GPCData.piuDistance }),
                ...(PAF_GPCData.switchDistance && { switchDistance: PAF_GPCData.switchDistance }),
                ...(PAF_GPCData.ampPickup && { ampPickup: PAF_GPCData.ampPickup }),
                ...(PAF_GPCData.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_GPCData.fromAirTakeUpDistance }),
                ...(PAF_GPCData.specialControllerOptions && { specialControllerOptions: PAF_GPCData.specialControllerOptions })
            },
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