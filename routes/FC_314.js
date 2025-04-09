const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_314 = require("../models/FC_314");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: FC_314Data.templateB.existingMonitor,
                newMonitor: FC_314Data.templateB.newMonitor,
                ...(FC_314Data.templateB.dcuStatus && { dcuStatus: FC_314Data.templateB.dcuStatus }),
                ...(FC_314Data.templateB.dcuNum && { dcuNum: FC_314Data.templateB.dcuNum }),
                ...(FC_314Data.templateB.existingWindows && { existingWindows: FC_314Data.templateB.existingWindows }),
                ...(FC_314Data.templateB.existingHeadUnit && { existingHeadUnit: FC_314Data.templateB.existingHeadUnit }),
                ...(FC_314Data.templateB.existingDCU && { existingDCU: FC_314Data.templateB.existingDCU }),
                ...(FC_314Data.templateB.existingPowerInterface && { existingPowerInterface: FC_314Data.templateB.existingPowerInterface }),
                ...(FC_314Data.templateB.newReservoir && { newReservoir: FC_314Data.templateB.newReservoir }),
                ...(FC_314Data.templateB.reservoirSize && { reservoirSize: FC_314Data.templateB.reservoirSize }),
                ...(FC_314Data.templateB.otherReservoirSize && { otherReservoirSize: FC_314Data.templateB.otherReservoirSize }),
                ...(FC_314Data.templateB.newReservoirNum && { newReservoirNum: FC_314Data.templateB.newReservoirNum }),
                ...(FC_314Data.templateB.typeMonitor && { typeMonitor: FC_314Data.templateB.typeMonitor }),
                ...(FC_314Data.templateB.driveMotorAmp && { driveMotorAmp: FC_314Data.templateB.driveMotorAmp }),
                ...(FC_314Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: FC_314Data.templateB.driveMotorAmpNum }),
                ...(FC_314Data.templateB.driveTakeUpAir && { driveTakeUpAir: FC_314Data.templateB.driveTakeUpAir }),
                ...(FC_314Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: FC_314Data.templateB.driveTakeUpAirNum }),
                ...(FC_314Data.templateB.takeUpDistance && { takeUpDistance: FC_314Data.templateB.takeUpDistance }),
                ...(FC_314Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: FC_314Data.templateB.takeUpDistanceNum }),
                ...(FC_314Data.templateB.driveTemp && { driveTemp: FC_314Data.templateB.driveTemp }),
                ...(FC_314Data.templateB.driveTempNum && { driveTempNum: FC_314Data.templateB.driveTempNum }),
                ...(FC_314Data.templateB.driveVibration && { driveVibration: FC_314Data.templateB.driveVibration }),
                ...(FC_314Data.templateB.driveVibrationNum && { driveVibrationNum: FC_314Data.templateB.driveVibrationNum }),
                ...(FC_314Data.templateB.dogPitch && { dogPitch: FC_314Data.templateB.dogPitch }),
                ...(FC_314Data.templateB.dogPitchNum && { dogPitchNum: FC_314Data.templateB.dogPitchNum }),
                ...(FC_314Data.templateB.paintMarker && { paintMarker: FC_314Data.templateB.paintMarker }),
                ...(FC_314Data.templateB.paintMarkerNum && { paintMarkerNum: FC_314Data.templateB.paintMarkerNum }),
                ...(FC_314Data.templateB.chainVision && { chainVision: FC_314Data.templateB.chainVision }),
                ...(FC_314Data.templateB.lubeVision && { lubeVision: FC_314Data.templateB.lubeVision }),
                ...(FC_314Data.templateB.trolleyVision && { trolleyVision: FC_314Data.templateB.trolleyVision }),
                ...(FC_314Data.templateB.trolleyDetect && { trolleyDetect: FC_314Data.templateB.trolleyDetect }),
                ...(FC_314Data.templateB.omniView && { omniView: FC_314Data.templateB.omniView }),
                ...(FC_314Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: FC_314Data.templateB.dcuUpgradeNum }),
                ...(FC_314Data.templateB.itNameOne && { itNameOne: FC_314Data.templateB.itNameOne }),
                ...(FC_314Data.templateB.itIPOne && { itIPOne: FC_314Data.templateB.itIPOne }),
                ...(FC_314Data.templateB.itGatewayOne && { itGatewayOne: FC_314Data.templateB.itGatewayOne }),
                ...(FC_314Data.templateB.itSubnetOne && { itSubnetOne: FC_314Data.templateB.itSubnetOne }),
                ...(FC_314Data.templateB.itDNSOne && { itDNSOne: FC_314Data.templateB.itDNSOne }),
                ...(FC_314Data.templateB.itSMTPOne && { itSMTPOne: FC_314Data.templateB.itSMTPOne }),
                ...(FC_314Data.templateB.itNameTwo && { itNameTwo: FC_314Data.templateB.itNameTwo }),
                ...(FC_314Data.templateB.itIPTwo && { itIPTwo: FC_314Data.templateB.itIPTwo }),
                ...(FC_314Data.templateB.itGatewayTwo && { itGatewayTwo: FC_314Data.templateB.itGatewayTwo }),
                ...(FC_314Data.templateB.itSubnetTwo && { itSubnetTwo: FC_314Data.templateB.itSubnetTwo }),
                ...(FC_314Data.templateB.itDNSTwo && { itDNSTwo: FC_314Data.templateB.itDNSTwo }),
                ...(FC_314Data.templateB.itSMTPTwo && { itSMTPTwo: FC_314Data.templateB.itSMTPTwo }),
                ...(FC_314Data.templateB.itNameThree && { itNameThree: FC_314Data.templateB.itNameThree }),
                ...(FC_314Data.templateB.itIPThree && { itIPThree: FC_314Data.templateB.itIPThree }),
                ...(FC_314Data.templateB.itGatewayThree && { itGatewayThree: FC_314Data.templateB.itGatewayThree }),
                ...(FC_314Data.templateB.itSubnetThree && { itSubnetThree: FC_314Data.templateB.itSubnetThree }),
                ...(FC_314Data.templateB.itDNSThree && { itDNSThree: FC_314Data.templateB.itDNSThree }),
                ...(FC_314Data.templateB.itSMTPThree && { itSMTPThree: FC_314Data.templateB.itSMTPThree }),
                ...(FC_314Data.templateB.itAdditionalNotes && { itAdditionalNotes: FC_314Data.templateB.itAdditionalNotes }),
                ...(FC_314Data.templateB.piuDistance && { piuDistance: FC_314Data.templateB.piuDistance }),
                ...(FC_314Data.templateB.switchDistance && { switchDistance: FC_314Data.templateB.switchDistance }),
                ...(FC_314Data.templateB.ampPickup && { ampPickup: FC_314Data.templateB.ampPickup }),
                ...(FC_314Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_314Data.templateB.fromAirTakeUpDistance }),
                ...(FC_314Data.templateB.specialControllerOptions && { specialControllerOptions: FC_314Data.templateB.specialControllerOptions })
            }),
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