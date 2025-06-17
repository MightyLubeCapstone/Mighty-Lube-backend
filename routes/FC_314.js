const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_314 = require("../models/FC_314");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_314Data, numRequested } = req.body;
        const order = new FC_314({
            ...(FC_314Data.conveyorName && { conveyorName: FC_314Data.conveyorName }),
            wheelManufacturer: FC_314Data.wheelManufacturer,
            ...(FC_314Data.otherWheelManufacturer && { otherWheelManufacturer: FC_314Data.otherWheelManufacturer }),
            ...(FC_314Data.conveyorLength && { conveyorLength: FC_314Data.conveyorLength }),
            ...(FC_314Data.conveyorLengthUnit && { conveyorLengthUnit: FC_314Data.conveyorLengthUnit }),
            ...(FC_314Data.conveyorSpeed && { conveyorSpeed: FC_314Data.conveyorSpeed }),
            ...(FC_314Data.conveyorSpeedUnit && { conveyorSpeedUnit: FC_314Data.conveyorSpeedUnit }),
            ...(FC_314Data.conveyorIndex && { conveyorIndex: FC_314Data.conveyorIndex }),
            ...(FC_314Data.travelDirection && { travelDirection: FC_314Data.travelDirection }),
            appEnviroment: FC_314Data.appEnviroment,
            ...(FC_314Data.ovenStatus && { ovenStatus: FC_314Data.ovenStatus }),
            ...(FC_314Data.ovenTemp && { ovenTemp: FC_314Data.ovenTemp }),
            ...(FC_314Data.surroundingTemp && { surroundingTemp: FC_314Data.surroundingTemp }),
            ...(FC_314Data.orientationType && { orientationType: FC_314Data.orientationType }),
            ...(FC_314Data.operatingVoltage && { operatingVoltage: FC_314Data.operatingVoltage }),
            ...(FC_314Data.controlVoltage && { controlVoltage: FC_314Data.controlVoltage }),
            ...(FC_314Data.compressedAir && { compressedAir: FC_314Data.compressedAir }),
            ...(FC_314Data.airSupplyType && { airSupplyType: FC_314Data.airSupplyType }),
            // monitorData: new templateA({
            //     existingMonitor: FC_314Data.templateA.existingMonitor,
            //     newMonitor: FC_314Data.templateA.newMonitor,
            //     ...(FC_314Data.templateA.dcuStatus && { dcuStatus: FC_314Data.templateA.dcuStatus }),
            //     ...(FC_314Data.templateA.dcuNum && { dcuNum: FC_314Data.templateA.dcuNum }),
            //     ...(FC_314Data.templateA.existingWindows && { existingWindows: FC_314Data.templateA.existingWindows }),
            //     ...(FC_314Data.templateA.existingHeadUnit && { existingHeadUnit: FC_314Data.templateA.existingHeadUnit }),
            //     ...(FC_314Data.templateA.existingDCU && { existingDCU: FC_314Data.templateA.existingDCU }),
            //     ...(FC_314Data.templateA.existingPowerInterface && { existingPowerInterface: FC_314Data.templateA.existingPowerInterface }),
            //     ...(FC_314Data.templateA.newReservoir && { newReservoir: FC_314Data.templateA.newReservoir }),
            //     ...(FC_314Data.templateA.reservoirSize && { reservoirSize: FC_314Data.templateA.reservoirSize }),
            //     ...(FC_314Data.templateA.otherReservoirSize && { otherReservoirSize: FC_314Data.templateA.otherReservoirSize }),
            //     ...(FC_314Data.templateA.newReservoirNum && { newReservoirNum: FC_314Data.templateA.newReservoirNum }),
            //     ...(FC_314Data.templateA.typeMonitor && { typeMonitor: FC_314Data.templateA.typeMonitor }),
            //     ...(FC_314Data.templateA.driveMotorAmp && { driveMotorAmp: FC_314Data.templateA.driveMotorAmp }),
            //     ...(FC_314Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: FC_314Data.templateA.driveMotorAmpNum }),
            //     ...(FC_314Data.templateA.driveTakeUpAir && { driveTakeUpAir: FC_314Data.templateA.driveTakeUpAir }),
            //     ...(FC_314Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FC_314Data.templateA.driveTakeUpAirNum }),
            //     ...(FC_314Data.templateA.takeUpDistance && { takeUpDistance: FC_314Data.templateA.takeUpDistance }),
            //     ...(FC_314Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: FC_314Data.templateA.takeUpDistanceNum }),
            //     ...(FC_314Data.templateA.driveTemp && { driveTemp: FC_314Data.templateA.driveTemp }),
            //     ...(FC_314Data.templateA.driveTempNum && { driveTempNum: FC_314Data.templateA.driveTempNum }),
            //     ...(FC_314Data.templateA.driveVibration && { driveVibration: FC_314Data.templateA.driveVibration }),
            //     ...(FC_314Data.templateA.driveVibrationNum && { driveVibrationNum: FC_314Data.templateA.driveVibrationNum }),
            //     ...(FC_314Data.templateA.dogPitch && { dogPitch: FC_314Data.templateA.dogPitch }),
            //     ...(FC_314Data.templateA.dogPitchNum && { dogPitchNum: FC_314Data.templateA.dogPitchNum }),
            //     ...(FC_314Data.templateA.paintMarker && { paintMarker: FC_314Data.templateA.paintMarker }),
            //     ...(FC_314Data.templateA.paintMarkerNum && { paintMarkerNum: FC_314Data.templateA.paintMarkerNum }),
            //     ...(FC_314Data.templateA.chainVision && { chainVision: FC_314Data.templateA.chainVision }),
            //     ...(FC_314Data.templateA.lubeVision && { lubeVision: FC_314Data.templateA.lubeVision }),
            //     ...(FC_314Data.templateA.trolleyVision && { trolleyVision: FC_314Data.templateA.trolleyVision }),
            //     ...(FC_314Data.templateA.trolleyDetect && { trolleyDetect: FC_314Data.templateA.trolleyDetect }),
            //     ...(FC_314Data.templateA.omniView && { omniView: FC_314Data.templateA.omniView }),
            //     ...(FC_314Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: FC_314Data.templateA.dcuUpgradeNum }),
            //     ...(FC_314Data.templateA.itNameOne && { itNameOne: FC_314Data.templateA.itNameOne }),
            //     ...(FC_314Data.templateA.itIPOne && { itIPOne: FC_314Data.templateA.itIPOne }),
            //     ...(FC_314Data.templateA.itGatewayOne && { itGatewayOne: FC_314Data.templateA.itGatewayOne }),
            //     ...(FC_314Data.templateA.itSubnetOne && { itSubnetOne: FC_314Data.templateA.itSubnetOne }),
            //     ...(FC_314Data.templateA.itDNSOne && { itDNSOne: FC_314Data.templateA.itDNSOne }),
            //     ...(FC_314Data.templateA.itSMTPOne && { itSMTPOne: FC_314Data.templateA.itSMTPOne }),
            //     ...(FC_314Data.templateA.itNameTwo && { itNameTwo: FC_314Data.templateA.itNameTwo }),
            //     ...(FC_314Data.templateA.itIPTwo && { itIPTwo: FC_314Data.templateA.itIPTwo }),
            //     ...(FC_314Data.templateA.itGatewayTwo && { itGatewayTwo: FC_314Data.templateA.itGatewayTwo }),
            //     ...(FC_314Data.templateA.itSubnetTwo && { itSubnetTwo: FC_314Data.templateA.itSubnetTwo }),
            //     ...(FC_314Data.templateA.itDNSTwo && { itDNSTwo: FC_314Data.templateA.itDNSTwo }),
            //     ...(FC_314Data.templateA.itSMTPTwo && { itSMTPTwo: FC_314Data.templateA.itSMTPTwo }),
            //     ...(FC_314Data.templateA.itNameThree && { itNameThree: FC_314Data.templateA.itNameThree }),
            //     ...(FC_314Data.templateA.itIPThree && { itIPThree: FC_314Data.templateA.itIPThree }),
            //     ...(FC_314Data.templateA.itGatewayThree && { itGatewayThree: FC_314Data.templateA.itGatewayThree }),
            //     ...(FC_314Data.templateA.itSubnetThree && { itSubnetThree: FC_314Data.templateA.itSubnetThree }),
            //     ...(FC_314Data.templateA.itDNSThree && { itDNSThree: FC_314Data.templateA.itDNSThree }),
            //     ...(FC_314Data.templateA.itSMTPThree && { itSMTPThree: FC_314Data.templateA.itSMTPThree }),
            //     ...(FC_314Data.templateA.itAdditionalNotes && { itAdditionalNotes: FC_314Data.templateA.itAdditionalNotes }),
            //     ...(FC_314Data.templateA.piuDistance && { piuDistance: FC_314Data.templateA.piuDistance }),
            //     ...(FC_314Data.templateA.switchDistance && { switchDistance: FC_314Data.templateA.switchDistance }),
            //     ...(FC_314Data.templateA.ampPickup && { ampPickup: FC_314Data.templateA.ampPickup }),
            //     ...(FC_314Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_314Data.templateA.fromAirTakeUpDistance }),
            //     ...(FC_314Data.templateA.specialControllerOptions && { specialControllerOptions: FC_314Data.templateA.specialControllerOptions })
            // }),
            ...(FC_314Data.carrierWheelStatus && { carrierWheelStatus: FC_314Data.carrierWheelStatus }),
            ...(FC_314Data.freeWheelStatus && { freeWheelStatus: FC_314Data.freeWheelStatus }),
            ...(FC_314Data.actuatorStatus && { actuatorStatus: FC_314Data.actuatorStatus }),
            ...(FC_314Data.pivotStatus && { pivotStatus: FC_314Data.pivotStatus }),
            ...(FC_314Data.kingPinStatus && { kingPinStatus: FC_314Data.kingPinStatus }),
            ...(FC_314Data.lubeBrand && { lubeBrand: FC_314Data.lubeBrand }),
            ...(FC_314Data.lubeType && { lubeType: FC_314Data.lubeType }),
            ...(FC_314Data.currentGrease && { currentGrease: FC_314Data.currentGrease }),
            ...(FC_314Data.currentGreaseGrade && { currentGreaseGrade: FC_314Data.currentGreaseGrade }),
            ...(FC_314Data.currentOil && { currentOil: FC_314Data.currentOil }),
            ...(FC_314Data.oilViscosity && { oilViscosity: FC_314Data.oilViscosity }),
            ...(FC_314Data.zerkDirection && { zerkDirection: FC_314Data.zerkDirection }),
            ...(FC_314Data.zerkLocationType && { zerkLocationType: FC_314Data.zerkLocationType }),
            ...(FC_314Data.chainMaster && { chainMaster: FC_314Data.chainMaster }),
            ...(FC_314Data.remoteStatus && { remoteStatus: FC_314Data.remoteStatus }),
            ...(FC_314Data.mountStatus && { mountStatus: FC_314Data.mountStatus }),
            ...(FC_314Data.otherUnitStatus && { otherUnitStatus: FC_314Data.otherUnitStatus }),
            ...(FC_314Data.timerStatus && { timerStatus: FC_314Data.timerStatus }),
            ...(FC_314Data.electricStatus && { electricStatus: FC_314Data.electricStatus }),
            ...(FC_314Data.mightyLubeMonitoring && { mightyLubeMonitoring: FC_314Data.mightyLubeMonitoring }),
            ...(FC_314Data.preMountType && { preMountType: FC_314Data.preMountType }),
            ...(FC_314Data.plcConnection && { plcConnection: FC_314Data.plcConnection }),
            ...(FC_314Data.otherControllerInfo && { otherControllerInfo: FC_314Data.otherControllerInfo }),
            ...(FC_314Data.fcUnitType && { fcUnitType: FC_314Data.fcUnitType }),
            ...(FC_314Data.fcGreaserE && { fcGreaserE: FC_314Data.fcGreaserE }),
            ...(FC_314Data.fcGreaserG && { fcGreaserG: FC_314Data.fcGreaserG }),
            ...(FC_314Data.fcGreaserH && { fcGreaserH: FC_314Data.fcGreaserH }),
            ...(FC_314Data.fcGreaserK && { fcGreaserK: FC_314Data.fcGreaserK }),
            ...(FC_314Data.fcGreaserT && { fcGreaserT: FC_314Data.fcGreaserT }),
            ...(FC_314Data.fcGreaserU && { fcGreaserU: FC_314Data.fcGreaserU }),
            ...(FC_314Data.fcGreaserV && { fcGreaserV: FC_314Data.fcGreaserV }),
            ...(FC_314Data.fcGreaserW && { fcGreaserW: FC_314Data.fcGreaserW })
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