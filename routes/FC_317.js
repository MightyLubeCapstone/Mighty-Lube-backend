const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_317 = require("../models/FC_317");
const templateA = require("../models/templateA");
const templateC = require("../models/templateC");

const router = express.Router();
 
router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_317Data, numRequested } = req.body;
        const order = new FC_317({
templateCData: {
                conveyorName: FC_317Data.conveyorName,
                industrialChainManufacturer: FC_317Data.industrialChainManufacturer,
                ...(FC_317Data.otherChainManufacturer && { otherChainManufacturer: FC_317Data.otherChainManufacturer }),
                wheelManufacturer: FC_317Data.wheelManufacturer,
                ...(FC_317Data.wheelManufacturer && { wheelManufacturer: FC_317Data.wheelManufacturer}),
                conveyorSpeed: FC_317Data.conveyorSpeed,
                conveyorSpeedUnit: FC_317Data.conveyorSpeedUnit,
                conveyorIndex: FC_317Data.conveyorIndex,
                ...(FC_317Data.travelDirection && { travelDirection: FC_317Data.travelDirection}),
                appEnviroment: FC_317Data.appEnviroment,
                ...(FC_317Data.otherAppEnviroment && { otherAppEnviroment: FC_317Data.otherAppEnviroment}),
                surroundingTemp: FC_317Data.surroundingTemp,
                orientationType: FC_317Data.orientationType,
                guideWheelsEven: FC_317Data.guideWheelsEven,
                operatingVoltage: FC_317Data.operatingVoltage,
                controlVoltSingle: FC_317Data.controlVoltSingle,
                compressedAir: FC_317Data.compressedAir,
                ...(FC_317Data.airSupplyType && { airSupplyType: FC_317Data.airSupplyType}),
                existingMonitor: FC_317Data.existingMonitor,
                newMonitor: FC_317Data.newMonitor,
                templateA_CData: {
                ...(FC_317Data.dcuStatus && { dcuStatus: FC_317Data.dcuStatus }),
                ...(FC_317Data.dcuNum && { dcuNum: FC_317Data.dcuNum }),
                ...(FC_317Data.existingWindows && { existingWindows: FC_317Data.existingWindows }),
                ...(FC_317Data.existingHeadUnit && { existingHeadUnit: FC_317Data.existingHeadUnit }),
                ...(FC_317Data.existingDCU && { existingDCU: FC_317Data.existingDCU }),
                ...(FC_317Data.existingPowerInterface && { existingPowerInterface: FC_317Data.existingPowerInterface }),
                ...(FC_317Data.newReservoir && { newReservoir: FC_317Data.newReservoir }),
                ...(FC_317Data.reservoirSize && { reservoirSize: FC_317Data.reservoirSize }),
                ...(FC_317Data.otherReservoirSize && { otherReservoirSize: FC_317Data.otherReservoirSize }),
                ...(FC_317Data.newReservoirNum && { newReservoirNum: FC_317Data.newReservoirNum }),
                ...(FC_317Data.typeMonitor && { typeMonitor: FC_317Data.typeMonitor }),
                ...(FC_317Data.driveMotorAmp && { driveMotorAmp: FC_317Data.driveMotorAmp }),
                ...(FC_317Data.driveMotorAmpNum && { driveMotorAmpNum: FC_317Data.driveMotorAmpNum }),
                ...(FC_317Data.driveTakeUpAir && { driveTakeUpAir: FC_317Data.driveTakeUpAir }),
                ...(FC_317Data.driveTakeUpAirNum && { driveTakeUpAirNum: FC_317Data.driveTakeUpAirNum }),
                ...(FC_317Data.takeUpDistance && { takeUpDistance: FC_317Data.takeUpDistance }),
                ...(FC_317Data.takeUpDistanceNum && { takeUpDistanceNum: FC_317Data.takeUpDistanceNum }),
                ...(FC_317Data.driveTemp && { driveTemp: FC_317Data.driveTemp }),
                ...(FC_317Data.driveTempNum && { driveTempNum: FC_317Data.driveTempNum }),
                ...(FC_317Data.driveVibration && { driveVibration: FC_317Data.driveVibration }),
                ...(FC_317Data.driveVibrationNum && { driveVibrationNum: FC_317Data.driveVibrationNum }),
                ...(FC_317Data.dogPitch && { dogPitch: FC_317Data.dogPitch }),
                ...(FC_317Data.dogPitchNum && { dogPitchNum: FC_317Data.dogPitchNum }),
                ...(FC_317Data.paintMarker && { paintMarker: FC_317Data.paintMarker }),
                ...(FC_317Data.paintMarkerNum && { paintMarkerNum: FC_317Data.paintMarkerNum }),
                ...(FC_317Data.chainVision && { chainVision: FC_317Data.chainVision }),
                ...(FC_317Data.lubeVision && { lubeVision: FC_317Data.lubeVision }),
                ...(FC_317Data.trolleyVision && { trolleyVision: FC_317Data.trolleyVision }),
                ...(FC_317Data.trolleyDetect && { trolleyDetect: FC_317Data.trolleyDetect }),
                ...(FC_317Data.omniView && { omniView: FC_317Data.omniView }),
                ...(FC_317Data.dcuUpgradeNum && { dcuUpgradeNum: FC_317Data.dcuUpgradeNum }),
                ...(FC_317Data.itNameOne && { itNameOne: FC_317Data.itNameOne }),
                ...(FC_317Data.itIPOne && { itIPOne: FC_317Data.itIPOne }),
                ...(FC_317Data.itGatewayOne && { itGatewayOne: FC_317Data.itGatewayOne }),
                ...(FC_317Data.itSubnetOne && { itSubnetOne: FC_317Data.itSubnetOne }),
                ...(FC_317Data.itDNSOne && { itDNSOne: FC_317Data.itDNSOne }),
                ...(FC_317Data.itSMTPOne && { itSMTPOne: FC_317Data.itSMTPOne }),
                ...(FC_317Data.itNameTwo && { itNameTwo: FC_317Data.itNameTwo }),
                ...(FC_317Data.itIPTwo && { itIPTwo: FC_317Data.itIPTwo }),
                ...(FC_317Data.itGatewayTwo && { itGatewayTwo: FC_317Data.itGatewayTwo }),
                ...(FC_317Data.itSubnetTwo && { itSubnetTwo: FC_317Data.itSubnetTwo }),
                ...(FC_317Data.itDNSTwo && { itDNSTwo: FC_317Data.itDNSTwo }),
                ...(FC_317Data.itSMTPTwo && { itSMTPTwo: FC_317Data.itSMTPTwo }),
                ...(FC_317Data.itNameThree && { itNameThree: FC_317Data.itNameThree }),
                ...(FC_317Data.itIPThree && { itIPThree: FC_317Data.itIPThree }),
                ...(FC_317Data.itGatewayThree && { itGatewayThree: FC_317Data.itGatewayThree }),
                ...(FC_317Data.itSubnetThree && { itSubnetThree: FC_317Data.itSubnetThree }),
                ...(FC_317Data.itDNSThree && { itDNSThree: FC_317Data.itDNSThree }),
                ...(FC_317Data.itSMTPThree && { itSMTPThree: FC_317Data.itSMTPThree }),
                ...(FC_317Data.itAdditionalNotes && { itAdditionalNotes: FC_317Data.itAdditionalNotes }),
                ...(FC_317Data.piuDistance && { piuDistance: FC_317Data.piuDistance }),
                ...(FC_317Data.switchDistance && { switchDistance: FC_317Data.switchDistance }),
                ...(FC_317Data.ampPickup && { ampPickup: FC_317Data.ampPickup }),
                ...(FC_317Data.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_317Data.fromAirTakeUpDistance }),
                ...(FC_317Data.specialControllerOptions && { specialControllerOptions: FC_317Data.specialControllerOptions }),
                ...(FC_317Data.operatingVoltage && { operatingVoltage: FC_317Data.operatingVoltage })

                },
                freeWheelStatus: FC_317Data.freeWheelStatus,
                actuatorStatus: FC_317Data.actuatorStatus,
                ...(FC_317Data.pivotStatus && { pivotStatus: FC_317Data.pivotStatus}),
                kingPinStatus: FC_317Data.kingPinStatus,
                lubeBrand: FC_317Data.lubeBrand,
                lubeViscosity: FC_317Data.lubeViscosity,
                ...(FC_317Data.lubeType && { lubeType: FC_317Data.lubeType}),
                currentGrease: FC_317Data.currentGrease,
                currentGreaseGrade: FC_317Data.currentGreaseGrade,
                zerkDirection: FC_317Data.zerkDirection,
                zerkLocationType: FC_317Data.zerkLocationType,
                wheelDiameter: FC_317Data.wheelDiameter,
                conveyorSwing: FC_317Data.conveyorSwing,
                ...(FC_317Data.chainMaster && { lubeType: FC_317Data.chainMaster}),
                ...(FC_317Data.remoteStatus && { lubeType: FC_317Data.remoteStatus}),
                ...(FC_317Data.mountStatus && { lubeType: FC_317Data.mountStatus}),
                ...(FC_317Data.otherUnitStatus && { lubeType: FC_317Data.otherUnitStatus}),
                ...(FC_317Data.timerStatus && { lubeType: FC_317Data.timerStatus}),
                ...(FC_317Data.electricStatus && { lubeType: FC_317Data.electricStatus}),
                ...(FC_317Data.mightyLubeMonitoring && { lubeType: FC_317Data.mightyLubeMonitoring}),
                ...(FC_317Data.preMountType && { lubeType: FC_317Data.preMountType}),
                ...(FC_317Data.otherPreMountType && { lubeType: FC_317Data.otherPreMountType}),
                ...(FC_317Data.plcConnection && { lubeType: FC_317Data.plcConnection}),
                ...(FC_317Data.otherControllerNotes && { lubeType: FC_317Data.otherControllerNotes}),
                ...(FC_317Data.templateC_UnitType && { lubeType: FC_317Data.templateC_UnitType}),
                templateC_InvertedA: FC_317Data.templateC_InvertedA,
                templateC_InvertedB: FC_317Data.templateC_InvertedB,
                templateC_InvertedE: FC_317Data.templateC_InvertedE,
                templateC_InvertedS: FC_317Data.templateC_InvertedS,
            },        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "FC_317"
        });
        await req.user.save();
        return res.status(200).json({ message: "FC_317 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;