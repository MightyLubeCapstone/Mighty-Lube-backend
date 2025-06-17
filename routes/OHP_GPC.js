const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_GPC = require("../models/OHP_GPC");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_GPCData, numRequested } = req.body;
        const order = new OHP_GPC({
            conveyorName: OHP_GPCData.conveyorName,
            chainSize: OHP_GPCData.chainSize,
            ...(OHP_GPCData.otherChainSize && { otherChainSize: OHP_GPCData.otherChainSize }),
            industrialChainManufacturer: OHP_GPCData.industrialChainManufacturer,
            ...(OHP_GPCData.otherChainManufacturer && { otherChainManufacturer: OHP_GPCData.otherChainManufacturer }),
            wheelManufacturer: OHP_GPCData.wheelManufacturer,
            ...(OHP_GPCData.otherWheelManufacturer && { otherWheelManufacturer: OHP_GPCData.otherWheelManufacturer }),
            conveyorLength: OHP_GPCData.conveyorLength,
            conveyorLengthUnit: OHP_GPCData.conveyorLengthUnit,
            conveyorSpeed: OHP_GPCData.conveyorSpeed,
            conveyorSpeedUnit: OHP_GPCData.conveyorSpeedUnit,
            conveyorIndex: OHP_GPCData.conveyorIndex,
            travelDirection: OHP_GPCData.travelDirection,
            appEnviroment: OHP_GPCData.appEnviroment,
            ...(OHP_GPCData.ovenStatus && { ovenStatus: OHP_GPCData.ovenStatus }),
            ...(OHP_GPCData.ovenTemp && { ovenTemp: OHP_GPCData.ovenTemp }),
            surroundingTemp: OHP_GPCData.surroundingTemp,
            orientation: OHP_GPCData.orientation,
            conveyorLoaded: OHP_GPCData.conveyorLoaded,
            plantLayout: OHP_GPCData.plantLayout,
            operatingVoltSingle: OHP_GPCData.operatingVoltSingle,
            monitorData: new templateA({
                existingMonitor: OHP_GPCData.templateA.existingMonitor,
                newMonitor: OHP_GPCData.templateA.newMonitor,
                ...(OHP_GPCData.templateA.dcuStatus && { dcuStatus: OHP_GPCData.templateA.dcuStatus }),
                ...(OHP_GPCData.templateA.dcuNum && { dcuNum: OHP_GPCData.templateA.dcuNum }),
                ...(OHP_GPCData.templateA.existingWindows && { existingWindows: OHP_GPCData.templateA.existingWindows }),
                ...(OHP_GPCData.templateA.existingHeadUnit && { existingHeadUnit: OHP_GPCData.templateA.existingHeadUnit }),
                ...(OHP_GPCData.templateA.existingDCU && { existingDCU: OHP_GPCData.templateA.existingDCU }),
                ...(OHP_GPCData.templateA.existingPowerInterface && { existingPowerInterface: OHP_GPCData.templateA.existingPowerInterface }),
                ...(OHP_GPCData.templateA.newReservoir && { newReservoir: OHP_GPCData.templateA.newReservoir }),
                ...(OHP_GPCData.templateA.reservoirSize && { reservoirSize: OHP_GPCData.templateA.reservoirSize }),
                ...(OHP_GPCData.templateA.otherReservoirSize && { otherReservoirSize: OHP_GPCData.templateA.otherReservoirSize }),
                ...(OHP_GPCData.templateA.newReservoirNum && { newReservoirNum: OHP_GPCData.templateA.newReservoirNum }),
                ...(OHP_GPCData.templateA.typeMonitor && { typeMonitor: OHP_GPCData.templateA.typeMonitor }),
                ...(OHP_GPCData.templateA.driveMotorAmp && { driveMotorAmp: OHP_GPCData.templateA.driveMotorAmp }),
                ...(OHP_GPCData.templateA.driveMotorAmpNum && { driveMotorAmpNum: OHP_GPCData.templateA.driveMotorAmpNum }),
                ...(OHP_GPCData.templateA.driveTakeUpAir && { driveTakeUpAir: OHP_GPCData.templateA.driveTakeUpAir }),
                ...(OHP_GPCData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_GPCData.templateA.driveTakeUpAirNum }),
                ...(OHP_GPCData.templateA.takeUpDistance && { takeUpDistance: OHP_GPCData.templateA.takeUpDistance }),
                ...(OHP_GPCData.templateA.takeUpDistanceNum && { takeUpDistanceNum: OHP_GPCData.templateA.takeUpDistanceNum }),
                ...(OHP_GPCData.templateA.driveTemp && { driveTemp: OHP_GPCData.templateA.driveTemp }),
                ...(OHP_GPCData.templateA.driveTempNum && { driveTempNum: OHP_GPCData.templateA.driveTempNum }),
                ...(OHP_GPCData.templateA.driveVibration && { driveVibration: OHP_GPCData.templateA.driveVibration }),
                ...(OHP_GPCData.templateA.driveVibrationNum && { driveVibrationNum: OHP_GPCData.templateA.driveVibrationNum }),
                ...(OHP_GPCData.templateA.dogPitch && { dogPitch: OHP_GPCData.templateA.dogPitch }),
                ...(OHP_GPCData.templateA.dogPitchNum && { dogPitchNum: OHP_GPCData.templateA.dogPitchNum }),
                ...(OHP_GPCData.templateA.paintMarker && { paintMarker: OHP_GPCData.templateA.paintMarker }),
                ...(OHP_GPCData.templateA.paintMarkerNum && { paintMarkerNum: OHP_GPCData.templateA.paintMarkerNum }),
                ...(OHP_GPCData.templateA.chainVision && { chainVision: OHP_GPCData.templateA.chainVision }),
                ...(OHP_GPCData.templateA.lubeVision && { lubeVision: OHP_GPCData.templateA.lubeVision }),
                ...(OHP_GPCData.templateA.trolleyVision && { trolleyVision: OHP_GPCData.templateA.trolleyVision }),
                ...(OHP_GPCData.templateA.trolleyDetect && { trolleyDetect: OHP_GPCData.templateA.trolleyDetect }),
                ...(OHP_GPCData.templateA.omniView && { omniView: OHP_GPCData.templateA.omniView }),
                ...(OHP_GPCData.templateA.dcuUpgradeNum && { dcuUpgradeNum: OHP_GPCData.templateA.dcuUpgradeNum }),
                ...(OHP_GPCData.templateA.itNameOne && { itNameOne: OHP_GPCData.templateA.itNameOne }),
                ...(OHP_GPCData.templateA.itIPOne && { itIPOne: OHP_GPCData.templateA.itIPOne }),
                ...(OHP_GPCData.templateA.itGatewayOne && { itGatewayOne: OHP_GPCData.templateA.itGatewayOne }),
                ...(OHP_GPCData.templateA.itSubnetOne && { itSubnetOne: OHP_GPCData.templateA.itSubnetOne }),
                ...(OHP_GPCData.templateA.itDNSOne && { itDNSOne: OHP_GPCData.templateA.itDNSOne }),
                ...(OHP_GPCData.templateA.itSMTPOne && { itSMTPOne: OHP_GPCData.templateA.itSMTPOne }),
                ...(OHP_GPCData.templateA.itNameTwo && { itNameTwo: OHP_GPCData.templateA.itNameTwo }),
                ...(OHP_GPCData.templateA.itIPTwo && { itIPTwo: OHP_GPCData.templateA.itIPTwo }),
                ...(OHP_GPCData.templateA.itGatewayTwo && { itGatewayTwo: OHP_GPCData.templateA.itGatewayTwo }),
                ...(OHP_GPCData.templateA.itSubnetTwo && { itSubnetTwo: OHP_GPCData.templateA.itSubnetTwo }),
                ...(OHP_GPCData.templateA.itDNSTwo && { itDNSTwo: OHP_GPCData.templateA.itDNSTwo }),
                ...(OHP_GPCData.templateA.itSMTPTwo && { itSMTPTwo: OHP_GPCData.templateA.itSMTPTwo }),
                ...(OHP_GPCData.templateA.itNameThree && { itNameThree: OHP_GPCData.templateA.itNameThree }),
                ...(OHP_GPCData.templateA.itIPThree && { itIPThree: OHP_GPCData.templateA.itIPThree }),
                ...(OHP_GPCData.templateA.itGatewayThree && { itGatewayThree: OHP_GPCData.templateA.itGatewayThree }),
                ...(OHP_GPCData.templateA.itSubnetThree && { itSubnetThree: OHP_GPCData.templateA.itSubnetThree }),
                ...(OHP_GPCData.templateA.itDNSThree && { itDNSThree: OHP_GPCData.templateA.itDNSThree }),
                ...(OHP_GPCData.templateA.itSMTPThree && { itSMTPThree: OHP_GPCData.templateA.itSMTPThree }),
                ...(OHP_GPCData.templateA.itAdditionalNotes && { itAdditionalNotes: OHP_GPCData.templateA.itAdditionalNotes }),
                ...(OHP_GPCData.templateA.piuDistance && { piuDistance: OHP_GPCData.templateA.piuDistance }),
                ...(OHP_GPCData.templateA.switchDistance && { switchDistance: OHP_GPCData.templateA.switchDistance }),
                ...(OHP_GPCData.templateA.ampPickup && { ampPickup: OHP_GPCData.templateA.ampPickup }),
                ...(OHP_GPCData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_GPCData.templateA.fromAirTakeUpDistance }),
                ...(OHP_GPCData.templateA.specialControllerOptions && { specialControllerOptions: OHP_GPCData.templateA.specialControllerOptions })
            }),
            currentGrease: OHP_GPCData.currentGrease,
            currentGreaseGrade: OHP_GPCData.currentGreaseGrade,
            chainMaster: OHP_GPCData.chainMaster,
            remoteStatus: OHP_GPCData.remoteStatus,
            mountStatus: OHP_GPCData.mountStatus,
            otherUnitStatus: OHP_GPCData.otherUnitStatus,
            ...(OHP_GPCData.timerStatus && { timerStatus: OHP_GPCData.timerStatus }),
            mightyLubeMonitoring: OHP_GPCData.mightyLubeMonitoring,
            preMountType: OHP_GPCData.preMountType,
            otherControllerNotes: OHP_GPCData.otherControllerNotes,
            gpcUnitType: OHP_GPCData.gpcUnitType,
            chainDrop: OHP_GPCData.chainDrop,
            gpcDiameter: OHP_GPCData.gpcDiameter,
            gpcWheelC: OHP_GPCData.gpcWheelC,
            gpcWheelD: OHP_GPCData.gpcWheelD,
            gpcWheelE: OHP_GPCData.gpcWheelE,
            gpcWheelF: OHP_GPCData.gpcWheelF,
            gpcWheelG: OHP_GPCData.gpcWheelG,
            gpcWheelH: OHP_GPCData.gpcWheelH,
            gpcWheelS: OHP_GPCData.gpcWheelS
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_GPC"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_GPC entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;