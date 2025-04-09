const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_GPC = require("../models/PAF_GPC");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_GPCData.templateB.existingMonitor,
                newMonitor: PAF_GPCData.templateB.newMonitor,
                ...(PAF_GPCData.templateB.dcuStatus && { dcuStatus: PAF_GPCData.templateB.dcuStatus }),
                ...(PAF_GPCData.templateB.dcuNum && { dcuNum: PAF_GPCData.templateB.dcuNum }),
                ...(PAF_GPCData.templateB.existingWindows && { existingWindows: PAF_GPCData.templateB.existingWindows }),
                ...(PAF_GPCData.templateB.existingHeadUnit && { existingHeadUnit: PAF_GPCData.templateB.existingHeadUnit }),
                ...(PAF_GPCData.templateB.existingDCU && { existingDCU: PAF_GPCData.templateB.existingDCU }),
                ...(PAF_GPCData.templateB.existingPowerInterface && { existingPowerInterface: PAF_GPCData.templateB.existingPowerInterface }),
                ...(PAF_GPCData.templateB.newReservoir && { newReservoir: PAF_GPCData.templateB.newReservoir }),
                ...(PAF_GPCData.templateB.reservoirSize && { reservoirSize: PAF_GPCData.templateB.reservoirSize }),
                ...(PAF_GPCData.templateB.otherReservoirSize && { otherReservoirSize: PAF_GPCData.templateB.otherReservoirSize }),
                ...(PAF_GPCData.templateB.newReservoirNum && { newReservoirNum: PAF_GPCData.templateB.newReservoirNum }),
                ...(PAF_GPCData.templateB.typeMonitor && { typeMonitor: PAF_GPCData.templateB.typeMonitor }),
                ...(PAF_GPCData.templateB.driveMotorAmp && { driveMotorAmp: PAF_GPCData.templateB.driveMotorAmp }),
                ...(PAF_GPCData.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_GPCData.templateB.driveMotorAmpNum }),
                ...(PAF_GPCData.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_GPCData.templateB.driveTakeUpAir }),
                ...(PAF_GPCData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_GPCData.templateB.driveTakeUpAirNum }),
                ...(PAF_GPCData.templateB.takeUpDistance && { takeUpDistance: PAF_GPCData.templateB.takeUpDistance }),
                ...(PAF_GPCData.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_GPCData.templateB.takeUpDistanceNum }),
                ...(PAF_GPCData.templateB.driveTemp && { driveTemp: PAF_GPCData.templateB.driveTemp }),
                ...(PAF_GPCData.templateB.driveTempNum && { driveTempNum: PAF_GPCData.templateB.driveTempNum }),
                ...(PAF_GPCData.templateB.driveVibration && { driveVibration: PAF_GPCData.templateB.driveVibration }),
                ...(PAF_GPCData.templateB.driveVibrationNum && { driveVibrationNum: PAF_GPCData.templateB.driveVibrationNum }),
                ...(PAF_GPCData.templateB.dogPitch && { dogPitch: PAF_GPCData.templateB.dogPitch }),
                ...(PAF_GPCData.templateB.dogPitchNum && { dogPitchNum: PAF_GPCData.templateB.dogPitchNum }),
                ...(PAF_GPCData.templateB.paintMarker && { paintMarker: PAF_GPCData.templateB.paintMarker }),
                ...(PAF_GPCData.templateB.paintMarkerNum && { paintMarkerNum: PAF_GPCData.templateB.paintMarkerNum }),
                ...(PAF_GPCData.templateB.chainVision && { chainVision: PAF_GPCData.templateB.chainVision }),
                ...(PAF_GPCData.templateB.lubeVision && { lubeVision: PAF_GPCData.templateB.lubeVision }),
                ...(PAF_GPCData.templateB.trolleyVision && { trolleyVision: PAF_GPCData.templateB.trolleyVision }),
                ...(PAF_GPCData.templateB.trolleyDetect && { trolleyDetect: PAF_GPCData.templateB.trolleyDetect }),
                ...(PAF_GPCData.templateB.omniView && { omniView: PAF_GPCData.templateB.omniView }),
                ...(PAF_GPCData.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_GPCData.templateB.dcuUpgradeNum }),
                ...(PAF_GPCData.templateB.itNameOne && { itNameOne: PAF_GPCData.templateB.itNameOne }),
                ...(PAF_GPCData.templateB.itIPOne && { itIPOne: PAF_GPCData.templateB.itIPOne }),
                ...(PAF_GPCData.templateB.itGatewayOne && { itGatewayOne: PAF_GPCData.templateB.itGatewayOne }),
                ...(PAF_GPCData.templateB.itSubnetOne && { itSubnetOne: PAF_GPCData.templateB.itSubnetOne }),
                ...(PAF_GPCData.templateB.itDNSOne && { itDNSOne: PAF_GPCData.templateB.itDNSOne }),
                ...(PAF_GPCData.templateB.itSMTPOne && { itSMTPOne: PAF_GPCData.templateB.itSMTPOne }),
                ...(PAF_GPCData.templateB.itNameTwo && { itNameTwo: PAF_GPCData.templateB.itNameTwo }),
                ...(PAF_GPCData.templateB.itIPTwo && { itIPTwo: PAF_GPCData.templateB.itIPTwo }),
                ...(PAF_GPCData.templateB.itGatewayTwo && { itGatewayTwo: PAF_GPCData.templateB.itGatewayTwo }),
                ...(PAF_GPCData.templateB.itSubnetTwo && { itSubnetTwo: PAF_GPCData.templateB.itSubnetTwo }),
                ...(PAF_GPCData.templateB.itDNSTwo && { itDNSTwo: PAF_GPCData.templateB.itDNSTwo }),
                ...(PAF_GPCData.templateB.itSMTPTwo && { itSMTPTwo: PAF_GPCData.templateB.itSMTPTwo }),
                ...(PAF_GPCData.templateB.itNameThree && { itNameThree: PAF_GPCData.templateB.itNameThree }),
                ...(PAF_GPCData.templateB.itIPThree && { itIPThree: PAF_GPCData.templateB.itIPThree }),
                ...(PAF_GPCData.templateB.itGatewayThree && { itGatewayThree: PAF_GPCData.templateB.itGatewayThree }),
                ...(PAF_GPCData.templateB.itSubnetThree && { itSubnetThree: PAF_GPCData.templateB.itSubnetThree }),
                ...(PAF_GPCData.templateB.itDNSThree && { itDNSThree: PAF_GPCData.templateB.itDNSThree }),
                ...(PAF_GPCData.templateB.itSMTPThree && { itSMTPThree: PAF_GPCData.templateB.itSMTPThree }),
                ...(PAF_GPCData.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_GPCData.templateB.itAdditionalNotes }),
                ...(PAF_GPCData.templateB.piuDistance && { piuDistance: PAF_GPCData.templateB.piuDistance }),
                ...(PAF_GPCData.templateB.switchDistance && { switchDistance: PAF_GPCData.templateB.switchDistance }),
                ...(PAF_GPCData.templateB.ampPickup && { ampPickup: PAF_GPCData.templateB.ampPickup }),
                ...(PAF_GPCData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_GPCData.templateB.fromAirTakeUpDistance }),
                ...(PAF_GPCData.templateB.specialControllerOptions && { specialControllerOptions: PAF_GPCData.templateB.specialControllerOptions })
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