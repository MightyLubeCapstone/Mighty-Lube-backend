const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_GPC = require("../models/OHP_GPC");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: OHP_GPCData.templateB.existingMonitor,
                newMonitor: OHP_GPCData.templateB.newMonitor,
                ...(OHP_GPCData.templateB.dcuStatus && { dcuStatus: OHP_GPCData.templateB.dcuStatus }),
                ...(OHP_GPCData.templateB.dcuNum && { dcuNum: OHP_GPCData.templateB.dcuNum }),
                ...(OHP_GPCData.templateB.existingWindows && { existingWindows: OHP_GPCData.templateB.existingWindows }),
                ...(OHP_GPCData.templateB.existingHeadUnit && { existingHeadUnit: OHP_GPCData.templateB.existingHeadUnit }),
                ...(OHP_GPCData.templateB.existingDCU && { existingDCU: OHP_GPCData.templateB.existingDCU }),
                ...(OHP_GPCData.templateB.existingPowerInterface && { existingPowerInterface: OHP_GPCData.templateB.existingPowerInterface }),
                ...(OHP_GPCData.templateB.newReservoir && { newReservoir: OHP_GPCData.templateB.newReservoir }),
                ...(OHP_GPCData.templateB.reservoirSize && { reservoirSize: OHP_GPCData.templateB.reservoirSize }),
                ...(OHP_GPCData.templateB.otherReservoirSize && { otherReservoirSize: OHP_GPCData.templateB.otherReservoirSize }),
                ...(OHP_GPCData.templateB.newReservoirNum && { newReservoirNum: OHP_GPCData.templateB.newReservoirNum }),
                ...(OHP_GPCData.templateB.typeMonitor && { typeMonitor: OHP_GPCData.templateB.typeMonitor }),
                ...(OHP_GPCData.templateB.driveMotorAmp && { driveMotorAmp: OHP_GPCData.templateB.driveMotorAmp }),
                ...(OHP_GPCData.templateB.driveMotorAmpNum && { driveMotorAmpNum: OHP_GPCData.templateB.driveMotorAmpNum }),
                ...(OHP_GPCData.templateB.driveTakeUpAir && { driveTakeUpAir: OHP_GPCData.templateB.driveTakeUpAir }),
                ...(OHP_GPCData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_GPCData.templateB.driveTakeUpAirNum }),
                ...(OHP_GPCData.templateB.takeUpDistance && { takeUpDistance: OHP_GPCData.templateB.takeUpDistance }),
                ...(OHP_GPCData.templateB.takeUpDistanceNum && { takeUpDistanceNum: OHP_GPCData.templateB.takeUpDistanceNum }),
                ...(OHP_GPCData.templateB.driveTemp && { driveTemp: OHP_GPCData.templateB.driveTemp }),
                ...(OHP_GPCData.templateB.driveTempNum && { driveTempNum: OHP_GPCData.templateB.driveTempNum }),
                ...(OHP_GPCData.templateB.driveVibration && { driveVibration: OHP_GPCData.templateB.driveVibration }),
                ...(OHP_GPCData.templateB.driveVibrationNum && { driveVibrationNum: OHP_GPCData.templateB.driveVibrationNum }),
                ...(OHP_GPCData.templateB.dogPitch && { dogPitch: OHP_GPCData.templateB.dogPitch }),
                ...(OHP_GPCData.templateB.dogPitchNum && { dogPitchNum: OHP_GPCData.templateB.dogPitchNum }),
                ...(OHP_GPCData.templateB.paintMarker && { paintMarker: OHP_GPCData.templateB.paintMarker }),
                ...(OHP_GPCData.templateB.paintMarkerNum && { paintMarkerNum: OHP_GPCData.templateB.paintMarkerNum }),
                ...(OHP_GPCData.templateB.chainVision && { chainVision: OHP_GPCData.templateB.chainVision }),
                ...(OHP_GPCData.templateB.lubeVision && { lubeVision: OHP_GPCData.templateB.lubeVision }),
                ...(OHP_GPCData.templateB.trolleyVision && { trolleyVision: OHP_GPCData.templateB.trolleyVision }),
                ...(OHP_GPCData.templateB.trolleyDetect && { trolleyDetect: OHP_GPCData.templateB.trolleyDetect }),
                ...(OHP_GPCData.templateB.omniView && { omniView: OHP_GPCData.templateB.omniView }),
                ...(OHP_GPCData.templateB.dcuUpgradeNum && { dcuUpgradeNum: OHP_GPCData.templateB.dcuUpgradeNum }),
                ...(OHP_GPCData.templateB.itNameOne && { itNameOne: OHP_GPCData.templateB.itNameOne }),
                ...(OHP_GPCData.templateB.itIPOne && { itIPOne: OHP_GPCData.templateB.itIPOne }),
                ...(OHP_GPCData.templateB.itGatewayOne && { itGatewayOne: OHP_GPCData.templateB.itGatewayOne }),
                ...(OHP_GPCData.templateB.itSubnetOne && { itSubnetOne: OHP_GPCData.templateB.itSubnetOne }),
                ...(OHP_GPCData.templateB.itDNSOne && { itDNSOne: OHP_GPCData.templateB.itDNSOne }),
                ...(OHP_GPCData.templateB.itSMTPOne && { itSMTPOne: OHP_GPCData.templateB.itSMTPOne }),
                ...(OHP_GPCData.templateB.itNameTwo && { itNameTwo: OHP_GPCData.templateB.itNameTwo }),
                ...(OHP_GPCData.templateB.itIPTwo && { itIPTwo: OHP_GPCData.templateB.itIPTwo }),
                ...(OHP_GPCData.templateB.itGatewayTwo && { itGatewayTwo: OHP_GPCData.templateB.itGatewayTwo }),
                ...(OHP_GPCData.templateB.itSubnetTwo && { itSubnetTwo: OHP_GPCData.templateB.itSubnetTwo }),
                ...(OHP_GPCData.templateB.itDNSTwo && { itDNSTwo: OHP_GPCData.templateB.itDNSTwo }),
                ...(OHP_GPCData.templateB.itSMTPTwo && { itSMTPTwo: OHP_GPCData.templateB.itSMTPTwo }),
                ...(OHP_GPCData.templateB.itNameThree && { itNameThree: OHP_GPCData.templateB.itNameThree }),
                ...(OHP_GPCData.templateB.itIPThree && { itIPThree: OHP_GPCData.templateB.itIPThree }),
                ...(OHP_GPCData.templateB.itGatewayThree && { itGatewayThree: OHP_GPCData.templateB.itGatewayThree }),
                ...(OHP_GPCData.templateB.itSubnetThree && { itSubnetThree: OHP_GPCData.templateB.itSubnetThree }),
                ...(OHP_GPCData.templateB.itDNSThree && { itDNSThree: OHP_GPCData.templateB.itDNSThree }),
                ...(OHP_GPCData.templateB.itSMTPThree && { itSMTPThree: OHP_GPCData.templateB.itSMTPThree }),
                ...(OHP_GPCData.templateB.itAdditionalNotes && { itAdditionalNotes: OHP_GPCData.templateB.itAdditionalNotes }),
                ...(OHP_GPCData.templateB.piuDistance && { piuDistance: OHP_GPCData.templateB.piuDistance }),
                ...(OHP_GPCData.templateB.switchDistance && { switchDistance: OHP_GPCData.templateB.switchDistance }),
                ...(OHP_GPCData.templateB.ampPickup && { ampPickup: OHP_GPCData.templateB.ampPickup }),
                ...(OHP_GPCData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_GPCData.templateB.fromAirTakeUpDistance }),
                ...(OHP_GPCData.templateB.specialControllerOptions && { specialControllerOptions: OHP_GPCData.templateB.specialControllerOptions })
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