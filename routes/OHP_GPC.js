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
            ...(OHP_ESData.otherAppEnviroment && { otherAppEnviroment: OHP_ESData.otherAppEnviroment }),
            surroundingTemp: OHP_GPCData.surroundingTemp,
            orientation: OHP_GPCData.orientation,
            swingStatus: OHP_GPCData.swingStatus,
            conveyorLoaded: OHP_GPCData.conveyorLoaded,
            plantLayout: OHP_GPCData.plantLayout,
            operatingVoltSingle: OHP_ESData.operatingVoltSingle,
            controlVoltSingle: OHP_ESData.controlVoltSingle,
            compressedAir: OHP_ESData.compressedAir,
            existingMonitor: OHP_ESData.existingMonitor,
            newMonitor: OHP_ESData.newMonitor,
            monitorData: {
                ...(OHP_ESData.dcuStatus && { dcuStatus: OHP_ESData.dcuStatus }),
                ...(OHP_ESData.dcuNum && { dcuNum: OHP_ESData.dcuNum }),
                ...(OHP_ESData.existingWindows && { existingWindows: OHP_ESData.existingWindows }),
                ...(OHP_ESData.existingHeadUnit && { existingHeadUnit: OHP_ESData.existingHeadUnit }),
                ...(OHP_ESData.existingDCU && { existingDCU: OHP_ESData.existingDCU }),
                ...(OHP_ESData.existingPowerInterface && { existingPowerInterface: OHP_ESData.existingPowerInterface }),
                ...(OHP_ESData.newReservoir && { newReservoir: OHP_ESData.newReservoir }),
                ...(OHP_ESData.reservoirSize && { reservoirSize: OHP_ESData.reservoirSize }),
                ...(OHP_ESData.otherReservoirSize && { otherReservoirSize: OHP_ESData.otherReservoirSize }),
                ...(OHP_ESData.newReservoirNum && { newReservoirNum: OHP_ESData.newReservoirNum }),
                ...(OHP_ESData.typeMonitor && { typeMonitor: OHP_ESData.typeMonitor }),
                ...(OHP_ESData.driveMotorAmp && { driveMotorAmp: OHP_ESData.driveMotorAmp }),
                ...(OHP_ESData.driveMotorAmpNum && { driveMotorAmpNum: OHP_ESData.driveMotorAmpNum }),
                ...(OHP_ESData.driveTakeUpAir && { driveTakeUpAir: OHP_ESData.driveTakeUpAir }),
                ...(OHP_ESData.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_ESData.driveTakeUpAirNum }),
                ...(OHP_ESData.takeUpDistance && { takeUpDistance: OHP_ESData.takeUpDistance }),
                ...(OHP_ESData.takeUpDistanceNum && { takeUpDistanceNum: OHP_ESData.takeUpDistanceNum }),
                ...(OHP_ESData.driveTemp && { driveTemp: OHP_ESData.driveTemp }),
                ...(OHP_ESData.driveTempNum && { driveTempNum: OHP_ESData.driveTempNum }),
                ...(OHP_ESData.driveVibration && { driveVibration: OHP_ESData.driveVibration }),
                ...(OHP_ESData.driveVibrationNum && { driveVibrationNum: OHP_ESData.driveVibrationNum }),
                ...(OHP_ESData.dogPitch && { dogPitch: OHP_ESData.dogPitch }), 
                ...(OHP_ESData.dogPitchNum && { dogPitchNum: OHP_ESData.dogPitchNum }),
                ...(OHP_ESData.paintMarker && { paintMarker: OHP_ESData.paintMarker }),
                ...(OHP_ESData.paintMarkerNum && { paintMarkerNum: OHP_ESData.paintMarkerNum }),
                ...(OHP_ESData.chainVision && { chainVision: OHP_ESData.chainVision }),
                ...(OHP_ESData.lubeVision && { lubeVision: OHP_ESData.lubeVision }),
                ...(OHP_ESData.trolleyVision && { trolleyVision: OHP_ESData.trolleyVision }),
                ...(OHP_ESData.trolleyDetect && { trolleyDetect: OHP_ESData.trolleyDetect }),
                ...(OHP_ESData.omniView && { omniView: OHP_ESData.omniView }),
                ...(OHP_ESData.dcuUpgradeNum && { dcuUpgradeNum: OHP_ESData.dcuUpgradeNum }),
                ...(OHP_ESData.itNameOne && { itNameOne: OHP_ESData.itNameOne }),
                ...(OHP_ESData.itIPOne && { itIPOne: OHP_ESData.itIPOne }),
                ...(OHP_ESData.itGatewayOne && { itGatewayOne: OHP_ESData.itGatewayOne }),
                ...(OHP_ESData.itSubnetOne && { itSubnetOne: OHP_ESData.itSubnetOne }),
                ...(OHP_ESData.itDNSOne && { itDNSOne: OHP_ESData.itDNSOne }),
                ...(OHP_ESData.itSMTPOne && { itSMTPOne: OHP_ESData.itSMTPOne }),
                ...(OHP_ESData.itNameTwo && { itNameTwo: OHP_ESData.itNameTwo }),
                ...(OHP_ESData.itIPTwo && { itIPTwo: OHP_ESData.itIPTwo }),
                ...(OHP_ESData.itGatewayTwo && { itGatewayTwo: OHP_ESData.itGatewayTwo }),
                ...(OHP_ESData.itSubnetTwo && { itSubnetTwo: OHP_ESData.itSubnetTwo }),
                ...(OHP_ESData.itDNSTwo && { itDNSTwo: OHP_ESData.itDNSTwo }),
                ...(OHP_ESData.itSMTPTwo && { itSMTPTwo: OHP_ESData.itSMTPTwo }),
                ...(OHP_ESData.itNameThree && { itNameThree: OHP_ESData.itNameThree }),
                ...(OHP_ESData.itIPThree && { itIPThree: OHP_ESData.itIPThree }),
                ...(OHP_ESData.itGatewayThree && { itGatewayThree: OHP_ESData.itGatewayThree }),
                ...(OHP_ESData.itSubnetThree && { itSubnetThree: OHP_ESData.itSubnetThree }),
                ...(OHP_ESData.itDNSThree && { itDNSThree: OHP_ESData.itDNSThree }),
                ...(OHP_ESData.itSMTPThree && { itSMTPThree: OHP_ESData.itSMTPThree }),
                ...(OHP_ESData.itAdditionalNotes && { itAdditionalNotes: OHP_ESData.itAdditionalNotes }),
                ...(OHP_ESData.piuDistance && { piuDistance: OHP_ESData.piuDistance }),
                ...(OHP_ESData.switchDistance && { switchDistance: OHP_ESData.switchDistance }),
                ...(OHP_ESData.ampPickup && { ampPickup: OHP_ESData.ampPickup }),
                ...(OHP_ESData.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_ESData.fromAirTakeUpDistance }),
                ...(OHP_ESData.specialControllerOptions && { specialControllerOptions: OHP_ESData.specialControllerOptions })
            },
            
            currentGrease: OHP_GPCData.currentGrease,
            currentGreaseGrade: OHP_GPCData.currentGreaseGrade,
            wheelDiameter: OHP_GPCData.wheelDiameter,
            lubeBrand: OHP_GPCData.lubeBrand,

            ...(OHP_GPCData.chainMaster && { chainMaster: OHP_GPCData.chainMaster }),
            ...(OHP_GPCData.remoteStatus && { remoteStatus: OHP_GPCData.remoteStatus }),
            ...(OHP_GPCData.mountStatus && { mountStatus: OHP_GPCData.mountStatus }),
            ...(OHP_GPCData.otherUnitStatus && { otherUnitStatus: OHP_GPCData.otherUnitStatus }),
            ...(OHP_GPCData.timerStatus && { timerStatus: OHP_GPCData.timerStatus }),
            ...(OHP_GPCData.mightyLubeMonitoring && { mightyLubeMonitoring: OHP_GPCData.mightyLubeMonitoring }),
            ...(OHP_GPCData.preMountType && { preMountType: OHP_GPCData.preMountType }),
            ...(OHP_GPCData.otherControllerNotes && { otherControllerNotes: OHP_GPCData.otherControllerNotes }),
            ...(OHP_GPCData.gpcUnitType && { gpcUnitType: OHP_GPCData.gpcUnitType }),
            ...(OHP_GPCData.chainDrop && { chainDrop: OHP_GPCData.chainDrop }),
            ...(OHP_GPCData.gpcDiameter && { gpcDiameter: OHP_GPCData.gpcDiameter }),
            ...(OHP_GPCData.gpcWheelC && { gpcWheelC: OHP_GPCData.gpcWheelC }),
            ...(OHP_GPCData.gpcWheelD && { gpcWheelD: OHP_GPCData.gpcWheelD }),
            ...(OHP_GPCData.gpcWheelE && { gpcWheelE: OHP_GPCData.gpcWheelE }),
            ...(OHP_GPCData.gpcWheelF && { gpcWheelF: OHP_GPCData.gpcWheelF }),
            ...(OHP_GPCData.gpcWheelG && { gpcWheelG: OHP_GPCData.gpcWheelG }),
            ...(OHP_GPCData.gpcWheelH && { gpcWheelH: OHP_GPCData.gpcWheelH }),
            ...(OHP_GPCData.gpcWheelS && { gpcWheelS: OHP_GPCData.gpcWheelS }),
    
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