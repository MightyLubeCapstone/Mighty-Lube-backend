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
            templateBData: 
            {
                
                conveyorName: FC_314Data.templateB.conveyorName,
                industrialChainManufacturer: FC_314Data.templateB.industrialChainManufacturer,
                ...(FC_314Data.templateB.otherChainManufacturer && { otherChainManufacturer: FC_314Data.templateB.otherChainManufacturer }),
                wheelManufacturer: FC_314Data.templateB.wheelManufacturer,
                ...(FC_314Data.templateB.wheelManufacturer && { wheelManufacturer: FC_314Data.templateB.wheelManufacturer}),
                conveyorSpeed: FC_314Data.templateB.conveyorSpeed,
                conveyorSpeedUnit: FC_314Data.templateB.conveyorSpeedUnit,
                conveyorIndex: FC_314Data.templateB.conveyorIndex,
                ...(FC_314Data.templateB.travelDirection && { travelDirection: FC_314Data.templateB.travelDirection}),
                appEnviroment: FC_314Data.templateB.appEnviroment,
                ...(FC_314Data.templateB.otherAppEnviroment && { otherAppEnviroment: FC_314Data.templateB.otherAppEnviroment}),
                surroundingTemp: FC_314Data.templateB.surroundingTemp,
                orientationType: FC_314Data.templateB.orientationType,
                operatingVoltage: FC_314Data.templateB.operatingVoltage,
                controlVoltSingle: FC_314Data.templateB.controlVoltSingle,
                compressedAir: FC_314Data.templateB.compressedAir,
                ...(FC_314Data.templateB.airSupplyType && { airSupplyType: FC_314Data.templateB.airSupplyType}),

                templateA_BData: {
                    
                    existingMonitor: FC_314Data.templateA.existingMonitor,
                    newMonitor: FC_314Data.templateA.newMonitor,		
                    ...(FC_314Data.templateA.dcuStatus && { dcuStatus: FC_314Data.templateA.dcuStatus }),
                    ...(FC_314Data.templateA.dcuNum && { dcuNum: FC_314Data.templateA.dcuNum }),
                    ...(FC_314Data.templateA.existingWindows && { existingWindows: FC_314Data.templateA.existingWindows }),
                    ...(FC_314Data.templateA.existingHeadUnit && { existingHeadUnit: FC_314Data.templateA.existingHeadUnit }),
                    ...(FC_314Data.templateA.existingDCU && { existingDCU: FC_314Data.templateA.existingDCU }),
                    ...(FC_314Data.templateA.existingPowerInterface && { existingPowerInterface: FC_314Data.templateA.existingPowerInterface }),
                    ...(FC_314Data.templateA.newReservoir && { newReservoir: FC_314Data.templateA.newReservoir }),
                    ...(FC_314Data.templateA.reservoirSize && { reservoirSize: FC_314Data.templateA.reservoirSize }),
                    ...(FC_314Data.templateA.otherReservoirSize && { otherReservoirSize: FC_314Data.templateA.otherReservoirSize }),
                    ...(FC_314Data.templateA.newReservoirNum && { newReservoirNum: FC_314Data.templateA.newReservoirNum }),
                    ...(FC_314Data.templateA.typeMonitor && { typeMonitor: FC_314Data.templateA.typeMonitor }),
                    ...(FC_314Data.templateA.driveMotorAmp && { driveMotorAmp: FC_314Data.templateA.driveMotorAmp }),
                    ...(FC_314Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: FC_314Data.templateA.driveMotorAmpNum }),
                    ...(FC_314Data.templateA.driveTakeUpAir && { driveTakeUpAir: FC_314Data.templateA.driveTakeUpAir }),
                    ...(FC_314Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FC_314Data.templateA.driveTakeUpAirNum }),
                    ...(FC_314Data.templateA.takeUpDistance && { takeUpDistance: FC_314Data.templateA.takeUpDistance }),
                    ...(FC_314Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: FC_314Data.templateA.takeUpDistanceNum }),
                    ...(FC_314Data.templateA.driveTemp && { driveTemp: FC_314Data.templateA.driveTemp }),
                    ...(FC_314Data.templateA.driveTempNum && { driveTempNum: FC_314Data.templateA.driveTempNum }),
                    ...(FC_314Data.templateA.driveVibration && { driveVibration: FC_314Data.templateA.driveVibration }),
                    ...(FC_314Data.templateA.driveVibrationNum && { driveVibrationNum: FC_314Data.templateA.driveVibrationNum }),
                    ...(FC_314Data.templateA.dogPitch && { dogPitch: FC_314Data.templateA.dogPitch }),
                    ...(FC_314Data.templateA.dogPitchNum && { dogPitchNum: FC_314Data.templateA.dogPitchNum }),
                    ...(FC_314Data.templateA.paintMarker && { paintMarker: FC_314Data.templateA.paintMarker }),
                    ...(FC_314Data.templateA.paintMarkerNum && { paintMarkerNum: FC_314Data.templateA.paintMarkerNum }),
                    ...(FC_314Data.templateA.chainVision && { chainVision: FC_314Data.templateA.chainVision }),
                    ...(FC_314Data.templateA.lubeVision && { lubeVision: FC_314Data.templateA.lubeVision }),
                    ...(FC_314Data.templateA.trolleyVision && { trolleyVision: FC_314Data.templateA.trolleyVision }),
                    ...(FC_314Data.templateA.trolleyDetect && { trolleyDetect: FC_314Data.templateA.trolleyDetect }),
                    ...(FC_314Data.templateA.omniView && { omniView: FC_314Data.templateA.omniView }),
                    ...(FC_314Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: FC_314Data.templateA.dcuUpgradeNum }),
                    ...(FC_314Data.templateA.piuDistance && { piuDistance: FC_314Data.templateA.piuDistance }),
                    ...(FC_314Data.templateA.switchDistance && { switchDistance: FC_314Data.templateA.switchDistance }),
                    ...(FC_314Data.templateA.ampPickup && { ampPickup: FC_314Data.templateA.ampPickup }),
                    ...(FC_314Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_314Data.templateA.fromAirTakeUpDistance }),
                    ...(FC_314Data.templateA.specialControllerOptions && { specialControllerOptions: FC_314Data.templateA.specialControllerOptions }),
                    ...(FC_314Data.templateA.operatingVoltage && { operatingVoltage: FC_314Data.templateA.operatingVoltage })

                },

                freeWheelStatus: FC_314Data.templateB.freeWheelStatus,
                actuatorStatus: FC_314Data.templateB.actuatorStatus,
                ...(FC_314Data.templateB.pivotStatus && { pivotStatus: FC_314Data.templateB.pivotStatus}),
                kingPinStatus: FC_314Data.templateB.kingPinStatus,
                lubeBrand: FC_314Data.templateB.lubeBrand,
                lubeViscosity: FC_314Data.templateB.lubeViscosity,
                ...(FC_314Data.templateB.lubeType && { lubeType: FC_314Data.templateB.lubeType}),
                currentGrease: FC_314Data.templateB.currentGrease,
                currentGreaseGrade: FC_314Data.templateB.currentGreaseGrade,
                zerkDirection: FC_314Data.templateB.zerkDirection,
                zerkLocationType: FC_314Data.templateB.zerkLocationType,
                wheelDiameter: FC_314Data.templateB.wheelDiameter,
                conveyorSwing: FC_314Data.templateB.conveyorSwing,
                ...(FC_314Data.templateB.chainMaster && { chainMaster: FC_314Data.templateB.chainMaster}),
                ...(FC_314Data.templateB.remoteStatus && { remoteStatus: FC_314Data.templateB.remoteStatus}),
                ...(FC_314Data.templateB.mountStatus && { mountStatus: FC_314Data.templateB.mountStatus}),
                ...(FC_314Data.templateB.otherUnitStatus && { otherUnitStatus: FC_314Data.templateB.otherUnitStatus}),
                ...(FC_314Data.templateB.timerStatus && { timerStatus: FC_314Data.templateB.timerStatus}),
                ...(FC_314Data.templateB.electricStatus && { electricStatus: FC_314Data.templateB.electricStatus}),
                ...(FC_314Data.templateB.mightyLubeMonitoring && { mightyLubeMonitoring: FC_314Data.templateB.mightyLubeMonitoring}),
                ...(FC_314Data.templateB.preMountType && { preMountType: FC_314Data.templateB.preMountType}),
                ...(FC_314Data.templateB.otherPreMountType && { otherPreMountType: FC_314Data.templateB.otherPreMountType}),
                ...(FC_314Data.templateB.plcConnection && { plcConnection: FC_314Data.templateB.plcConnection}),
                ...(FC_314Data.templateB.otherControllerNotes && { otherControllerNotes: FC_314Data.templateB.otherControllerNotes}),
                ...(FC_314Data.templateB.templateB_UnitType && { templateB_UnitType: FC_314Data.templateB.templateB_UnitType}),
                ...(FC_314Data.templateB.templateB_InvertedB && { templateB_InvertedB: FC_314Data.templateB.templateB_InvertedB}),
                ...(FC_314Data.templateB.templateB_InvertedE && { templateB_InvertedE: FC_314Data.templateB.templateB_InvertedE}),
                ...(FC_314Data.templateB.templateB_InvertedG && { templateB_InvertedG: FC_314Data.templateB.templateB_InvertedG}),
                ...(FC_314Data.templateB.templateB_InvertedH && { templateB_InvertedH: FC_314Data.templateB.templateB_InvertedH}),
                ...(FC_314Data.templateB.templateB_InvertedK && { templateB_InvertedK: FC_314Data.templateB.templateB_InvertedK}),
                ...(FC_314Data.templateB.templateB_InvertedT && { templateB_InvertedT: FC_314Data.templateB.templateB_InvertedT}),
                ...(FC_314Data.templateB.templateB_InvertedU && { templateB_InvertedU: FC_314Data.templateB.templateB_InvertedU}),
                ...(FC_314Data.templateB.templateB_InvertedV && { templateB_InvertedV: FC_314Data.templateB.templateB_InvertedV}),
                ...(FC_314Data.templateB.templateB_InvertedW && { templateB_InvertedW: FC_314Data.templateB.templateB_InvertedW}),

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