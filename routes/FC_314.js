const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_314 = require("../models/FC_314");
const templateA = require("../models/templateA");
const templateB = require("../models/templateB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_314Data, numRequested } = req.body;
        const order = new FC_314({
                        templateBData: {
                conveyorName: FC_314Data.conveyorName,
                industrialChainManufacturer: FC_314Data.industrialChainManufacturer,
                ...(FC_314Data.otherChainManufacturer && { otherChainManufacturer: FC_314Data.otherChainManufacturer }),
                wheelManufacturer: FC_314Data.wheelManufacturer,
                ...(FC_314Data.wheelManufacturer && { wheelManufacturer: FC_314Data.wheelManufacturer}),
                conveyorSpeed: FC_314Data.conveyorSpeed,
                conveyorSpeedUnit: FC_314Data.conveyorSpeedUnit,
                conveyorIndex: FC_314Data.conveyorIndex,
                ...(FC_314Data.travelDirection && { travelDirection: FC_314Data.travelDirection}),
                appEnviroment: FC_314Data.appEnviroment,
                ...(FC_314Data.otherAppEnviroment && { otherAppEnviroment: FC_314Data.otherAppEnviroment}),
                surroundingTemp: FC_314Data.surroundingTemp,
                orientationType: FC_314Data.orientationType,
                operatingVoltage: FC_314Data.operatingVoltage,
                controlVoltSingle: FC_314Data.controlVoltSingle,
                compressedAir: FC_314Data.compressedAir,
                ...(FC_314Data.airSupplyType && { airSupplyType: FC_314Data.airSupplyType}),
                existingMonitor: FC_314Data.existingMonitor,
                newMonitor: FC_314Data.newMonitor,
                templateA_BData: {
                ...(FC_314Data.dcuStatus && { dcuStatus: FC_314Data.dcuStatus }),
                ...(FC_314Data.dcuNum && { dcuNum: FC_314Data.dcuNum }),
                ...(FC_314Data.existingWindows && { existingWindows: FC_314Data.existingWindows }),
                ...(FC_314Data.existingHeadUnit && { existingHeadUnit: FC_314Data.existingHeadUnit }),
                ...(FC_314Data.existingDCU && { existingDCU: FC_314Data.existingDCU }),
                ...(FC_314Data.existingPowerInterface && { existingPowerInterface: FC_314Data.existingPowerInterface }),
                ...(FC_314Data.newReservoir && { newReservoir: FC_314Data.newReservoir }),
                ...(FC_314Data.reservoirSize && { reservoirSize: FC_314Data.reservoirSize }),
                ...(FC_314Data.otherReservoirSize && { otherReservoirSize: FC_314Data.otherReservoirSize }),
                ...(FC_314Data.newReservoirNum && { newReservoirNum: FC_314Data.newReservoirNum }),
                ...(FC_314Data.typeMonitor && { typeMonitor: FC_314Data.typeMonitor }),
                ...(FC_314Data.driveMotorAmp && { driveMotorAmp: FC_314Data.driveMotorAmp }),
                ...(FC_314Data.driveMotorAmpNum && { driveMotorAmpNum: FC_314Data.driveMotorAmpNum }),
                ...(FC_314Data.driveTakeUpAir && { driveTakeUpAir: FC_314Data.driveTakeUpAir }),
                ...(FC_314Data.driveTakeUpAirNum && { driveTakeUpAirNum: FC_314Data.driveTakeUpAirNum }),
                ...(FC_314Data.takeUpDistance && { takeUpDistance: FC_314Data.takeUpDistance }),
                ...(FC_314Data.takeUpDistanceNum && { takeUpDistanceNum: FC_314Data.takeUpDistanceNum }),
                ...(FC_314Data.driveTemp && { driveTemp: FC_314Data.driveTemp }),
                ...(FC_314Data.driveTempNum && { driveTempNum: FC_314Data.driveTempNum }),
                ...(FC_314Data.driveVibration && { driveVibration: FC_314Data.driveVibration }),
                ...(FC_314Data.driveVibrationNum && { driveVibrationNum: FC_314Data.driveVibrationNum }),
                ...(FC_314Data.dogPitch && { dogPitch: FC_314Data.dogPitch }),
                ...(FC_314Data.dogPitchNum && { dogPitchNum: FC_314Data.dogPitchNum }),
                ...(FC_314Data.paintMarker && { paintMarker: FC_314Data.paintMarker }),
                ...(FC_314Data.paintMarkerNum && { paintMarkerNum: FC_314Data.paintMarkerNum }),
                ...(FC_314Data.chainVision && { chainVision: FC_314Data.chainVision }),
                ...(FC_314Data.lubeVision && { lubeVision: FC_314Data.lubeVision }),
                ...(FC_314Data.trolleyVision && { trolleyVision: FC_314Data.trolleyVision }),
                ...(FC_314Data.trolleyDetect && { trolleyDetect: FC_314Data.trolleyDetect }),
                ...(FC_314Data.omniView && { omniView: FC_314Data.omniView }),
                ...(FC_314Data.dcuUpgradeNum && { dcuUpgradeNum: FC_314Data.dcuUpgradeNum }),
                ...(FC_314Data.itNameOne && { itNameOne: FC_314Data.itNameOne }),
                ...(FC_314Data.itIPOne && { itIPOne: FC_314Data.itIPOne }),
                ...(FC_314Data.itGatewayOne && { itGatewayOne: FC_314Data.itGatewayOne }),
                ...(FC_314Data.itSubnetOne && { itSubnetOne: FC_314Data.itSubnetOne }),
                ...(FC_314Data.itDNSOne && { itDNSOne: FC_314Data.itDNSOne }),
                ...(FC_314Data.itSMTPOne && { itSMTPOne: FC_314Data.itSMTPOne }),
                ...(FC_314Data.itNameTwo && { itNameTwo: FC_314Data.itNameTwo }),
                ...(FC_314Data.itIPTwo && { itIPTwo: FC_314Data.itIPTwo }),
                ...(FC_314Data.itGatewayTwo && { itGatewayTwo: FC_314Data.itGatewayTwo }),
                ...(FC_314Data.itSubnetTwo && { itSubnetTwo: FC_314Data.itSubnetTwo }),
                ...(FC_314Data.itDNSTwo && { itDNSTwo: FC_314Data.itDNSTwo }),
                ...(FC_314Data.itSMTPTwo && { itSMTPTwo: FC_314Data.itSMTPTwo }),
                ...(FC_314Data.itNameThree && { itNameThree: FC_314Data.itNameThree }),
                ...(FC_314Data.itIPThree && { itIPThree: FC_314Data.itIPThree }),
                ...(FC_314Data.itGatewayThree && { itGatewayThree: FC_314Data.itGatewayThree }),
                ...(FC_314Data.itSubnetThree && { itSubnetThree: FC_314Data.itSubnetThree }),
                ...(FC_314Data.itDNSThree && { itDNSThree: FC_314Data.itDNSThree }),
                ...(FC_314Data.itSMTPThree && { itSMTPThree: FC_314Data.itSMTPThree }),
                ...(FC_314Data.itAdditionalNotes && { itAdditionalNotes: FC_314Data.itAdditionalNotes }),
                ...(FC_314Data.piuDistance && { piuDistance: FC_314Data.piuDistance }),
                ...(FC_314Data.switchDistance && { switchDistance: FC_314Data.switchDistance }),
                ...(FC_314Data.ampPickup && { ampPickup: FC_314Data.ampPickup }),
                ...(FC_314Data.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_314Data.fromAirTakeUpDistance }),
                ...(FC_314Data.specialControllerOptions && { specialControllerOptions: FC_314Data.specialControllerOptions }),
                ...(FC_314Data.operatingVoltage && { operatingVoltage: FC_314Data.operatingVoltage })

                },
                freeWheelStatus: FC_314Data.freeWheelStatus,
                actuatorStatus: FC_314Data.actuatorStatus,
                ...(FC_314Data.pivotStatus && { pivotStatus: FC_314Data.pivotStatus}),
                kingPinStatus: FC_314Data.kingPinStatus,
                lubeBrand: FC_314Data.lubeBrand,
                lubeViscosity: FC_314Data.lubeViscosity,
                ...(FC_314Data.lubeType && { lubeType: FC_314Data.lubeType}),
                currentGrease: FC_314Data.currentGrease,
                currentGreaseGrade: FC_314Data.currentGreaseGrade,
                zerkDirection: FC_314Data.zerkDirection,
                zerkLocationType: FC_314Data.zerkLocationType,
                wheelDiameter: FC_314Data.wheelDiameter,
                conveyorSwing: FC_314Data.conveyorSwing,
                ...(FC_314Data.chainMaster && { lubeType: FC_314Data.chainMaster}),
                ...(FC_314Data.remoteStatus && { lubeType: FC_314Data.remoteStatus}),
                ...(FC_314Data.mountStatus && { lubeType: FC_314Data.mountStatus}),
                ...(FC_314Data.otherUnitStatus && { lubeType: FC_314Data.otherUnitStatus}),
                ...(FC_314Data.timerStatus && { lubeType: FC_314Data.timerStatus}),
                ...(FC_314Data.electricStatus && { lubeType: FC_314Data.electricStatus}),
                ...(FC_314Data.mightyLubeMonitoring && { lubeType: FC_314Data.mightyLubeMonitoring}),
                ...(FC_314Data.preMountType && { lubeType: FC_314Data.preMountType}),
                ...(FC_314Data.otherPreMountType && { lubeType: FC_314Data.otherPreMountType}),
                ...(FC_314Data.plcConnection && { lubeType: FC_314Data.plcConnection}),
                ...(FC_314Data.otherControllerNotes && { lubeType: FC_314Data.otherControllerNotes}),
                ...(FC_314Data.templateB_UnitType && { lubeType: FC_314Data.templateB_UnitType}),
                ...(FC_314Data.templateB_InvertedB && { lubeType: FC_314Data.templateB_InvertedB}),
                ...(FC_314Data.templateB_InvertedE && { lubeType: FC_314Data.templateB_InvertedE}),
                ...(FC_314Data.templateB_InvertedG && { lubeType: FC_314Data.templateB_InvertedG}),
                ...(FC_314Data.templateB_InvertedH && { lubeType: FC_314Data.templateB_InvertedH}),
                ...(FC_314Data.templateB_InvertedK && { lubeType: FC_314Data.templateB_InvertedK}),
                ...(FC_314Data.templateB_InvertedT && { lubeType: FC_314Data.templateB_InvertedT}),
                ...(FC_314Data.templateB_InvertedU && { lubeType: FC_314Data.templateB_InvertedU}),
                ...(FC_314Data.templateB_InvertedV && { lubeType: FC_314Data.templateB_InvertedV}),
                ...(FC_314Data.templateB_InvertedW && { lubeType: FC_314Data.templateB_InvertedW}),

            },
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "FC_314"
        });
        await req.user.save();
        return res.status(200).json({ message: "FC_314 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;