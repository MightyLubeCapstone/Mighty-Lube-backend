const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_317 = require("../models/FC_317");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_317Data, numRequested } = req.body;
        const order = new FC_317({
            ...(FC_317Data.conveyorName && { conveyorName: FC_317Data.conveyorName }),
            wheelManufacturer: FC_317Data.wheelManufacturer,
            ...(FC_317Data.otherWheelManufacturer && { otherWheelManufacturer: FC_317Data.otherWheelManufacturer }),
            ...(FC_317Data.conveyorSpeed && { conveyorSpeed: FC_317Data.conveyorSpeed }),
            ...(FC_317Data.conveyorSpeedUnit && { conveyorSpeedUnit: FC_317Data.conveyorSpeedUnit }),
            ...(FC_317Data.conveyorIndex && { conveyorIndex: FC_317Data.conveyorIndex }),
            ...(FC_317Data.travelDirection && { travelDirection: FC_317Data.travelDirection }),
            appEnviroment: FC_317Data.appEnviroment,
            ...(FC_317Data.ovenStatus && { ovenStatus: FC_317Data.ovenStatus }),
            ...(FC_317Data.ovenTemp && { ovenTemp: FC_317Data.ovenTemp }),
            ...(FC_317Data.surroundingTemp && { surroundingTemp: FC_317Data.surroundingTemp }),
            ...(FC_317Data.orientationType && { orientationType: FC_317Data.orientationType }),
            ...(FC_317Data.evenGuideWheelStatus && { evenGuideWheelStatus: FC_317Data.evenGuideWheelStatus }),
            ...(FC_317Data.operatingVoltage && { operatingVoltage: FC_317Data.operatingVoltage }),
            // monitorData: new templateA({
            //     existingMonitor: FC_317Data.templateA.existingMonitor,
            //     newMonitor: FC_317Data.templateA.newMonitor,
            //     ...(FC_317Data.templateA.dcuStatus && { dcuStatus: FC_317Data.templateA.dcuStatus }),
            //     ...(FC_317Data.templateA.dcuNum && { dcuNum: FC_317Data.templateA.dcuNum }),
            //     ...(FC_317Data.templateA.existingWindows && { existingWindows: FC_317Data.templateA.existingWindows }),
            //     ...(FC_317Data.templateA.existingHeadUnit && { existingHeadUnit: FC_317Data.templateA.existingHeadUnit }),
            //     ...(FC_317Data.templateA.existingDCU && { existingDCU: FC_317Data.templateA.existingDCU }),
            //     ...(FC_317Data.templateA.existingPowerInterface && { existingPowerInterface: FC_317Data.templateA.existingPowerInterface }),
            //     ...(FC_317Data.templateA.newReservoir && { newReservoir: FC_317Data.templateA.newReservoir }),
            //     ...(FC_317Data.templateA.reservoirSize && { reservoirSize: FC_317Data.templateA.reservoirSize }),
            //     ...(FC_317Data.templateA.otherReservoirSize && { otherReservoirSize: FC_317Data.templateA.otherReservoirSize }),
            //     ...(FC_317Data.templateA.newReservoirNum && { newReservoirNum: FC_317Data.templateA.newReservoirNum }),
            //     ...(FC_317Data.templateA.typeMonitor && { typeMonitor: FC_317Data.templateA.typeMonitor }),
            //     ...(FC_317Data.templateA.driveMotorAmp && { driveMotorAmp: FC_317Data.templateA.driveMotorAmp }),
            //     ...(FC_317Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: FC_317Data.templateA.driveMotorAmpNum }),
            //     ...(FC_317Data.templateA.driveTakeUpAir && { driveTakeUpAir: FC_317Data.templateA.driveTakeUpAir }),
            //     ...(FC_317Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: FC_317Data.templateA.driveTakeUpAirNum }),
            //     ...(FC_317Data.templateA.takeUpDistance && { takeUpDistance: FC_317Data.templateA.takeUpDistance }),
            //     ...(FC_317Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: FC_317Data.templateA.takeUpDistanceNum }),
            //     ...(FC_317Data.templateA.driveTemp && { driveTemp: FC_317Data.templateA.driveTemp }),
            //     ...(FC_317Data.templateA.driveTempNum && { driveTempNum: FC_317Data.templateA.driveTempNum }),
            //     ...(FC_317Data.templateA.driveVibration && { driveVibration: FC_317Data.templateA.driveVibration }),
            //     ...(FC_317Data.templateA.driveVibrationNum && { driveVibrationNum: FC_317Data.templateA.driveVibrationNum }),
            //     ...(FC_317Data.templateA.dogPitch && { dogPitch: FC_317Data.templateA.dogPitch }),
            //     ...(FC_317Data.templateA.dogPitchNum && { dogPitchNum: FC_317Data.templateA.dogPitchNum }),
            //     ...(FC_317Data.templateA.paintMarker && { paintMarker: FC_317Data.templateA.paintMarker }),
            //     ...(FC_317Data.templateA.paintMarkerNum && { paintMarkerNum: FC_317Data.templateA.paintMarkerNum }),
            //     ...(FC_317Data.templateA.chainVision && { chainVision: FC_317Data.templateA.chainVision }),
            //     ...(FC_317Data.templateA.lubeVision && { lubeVision: FC_317Data.templateA.lubeVision }),
            //     ...(FC_317Data.templateA.trolleyVision && { trolleyVision: FC_317Data.templateA.trolleyVision }),
            //     ...(FC_317Data.templateA.trolleyDetect && { trolleyDetect: FC_317Data.templateA.trolleyDetect }),
            //     ...(FC_317Data.templateA.omniView && { omniView: FC_317Data.templateA.omniView }),
            //     ...(FC_317Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: FC_317Data.templateA.dcuUpgradeNum }),
            //     ...(FC_317Data.templateA.itNameOne && { itNameOne: FC_317Data.templateA.itNameOne }),
            //     ...(FC_317Data.templateA.itIPOne && { itIPOne: FC_317Data.templateA.itIPOne }),
            //     ...(FC_317Data.templateA.itGatewayOne && { itGatewayOne: FC_317Data.templateA.itGatewayOne }),
            //     ...(FC_317Data.templateA.itSubnetOne && { itSubnetOne: FC_317Data.templateA.itSubnetOne }),
            //     ...(FC_317Data.templateA.itDNSOne && { itDNSOne: FC_317Data.templateA.itDNSOne }),
            //     ...(FC_317Data.templateA.itSMTPOne && { itSMTPOne: FC_317Data.templateA.itSMTPOne }),
            //     ...(FC_317Data.templateA.itNameTwo && { itNameTwo: FC_317Data.templateA.itNameTwo }),
            //     ...(FC_317Data.templateA.itIPTwo && { itIPTwo: FC_317Data.templateA.itIPTwo }),
            //     ...(FC_317Data.templateA.itGatewayTwo && { itGatewayTwo: FC_317Data.templateA.itGatewayTwo }),
            //     ...(FC_317Data.templateA.itSubnetTwo && { itSubnetTwo: FC_317Data.templateA.itSubnetTwo }),
            //     ...(FC_317Data.templateA.itDNSTwo && { itDNSTwo: FC_317Data.templateA.itDNSTwo }),
            //     ...(FC_317Data.templateA.itSMTPTwo && { itSMTPTwo: FC_317Data.templateA.itSMTPTwo }),
            //     ...(FC_317Data.templateA.itNameThree && { itNameThree: FC_317Data.templateA.itNameThree }),
            //     ...(FC_317Data.templateA.itIPThree && { itIPThree: FC_317Data.templateA.itIPThree }),
            //     ...(FC_317Data.templateA.itGatewayThree && { itGatewayThree: FC_317Data.templateA.itGatewayThree }),
            //     ...(FC_317Data.templateA.itSubnetThree && { itSubnetThree: FC_317Data.templateA.itSubnetThree }),
            //     ...(FC_317Data.templateA.itDNSThree && { itDNSThree: FC_317Data.templateA.itDNSThree }),
            //     ...(FC_317Data.templateA.itSMTPThree && { itSMTPThree: FC_317Data.templateA.itSMTPThree }),
            //     ...(FC_317Data.templateA.itAdditionalNotes && { itAdditionalNotes: FC_317Data.templateA.itAdditionalNotes }),
            //     ...(FC_317Data.templateA.piuDistance && { piuDistance: FC_317Data.templateA.piuDistance }),
            //     ...(FC_317Data.templateA.switchDistance && { switchDistance: FC_317Data.templateA.switchDistance }),
            //     ...(FC_317Data.templateA.ampPickup && { ampPickup: FC_317Data.templateA.ampPickup }),
            //     ...(FC_317Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_317Data.templateA.fromAirTakeUpDistance }),
            //     ...(FC_317Data.templateA.specialControllerOptions && { specialControllerOptions: FC_317Data.templateA.specialControllerOptions })
            // }),
            ...(FC_317Data.carrierWheelStatus && { carrierWheelStatus: FC_317Data.carrierWheelStatus }),
            ...(FC_317Data.kingPinStatus && { kingPinStatus: FC_317Data.kingPinStatus }),
            ...(FC_317Data.freeWheelStatus && { freeWheelStatus: FC_317Data.freeWheelStatus }),
            ...(FC_317Data.guideRollerStatus && { guideRollerStatus: FC_317Data.guideRollerStatus }),
            ...(FC_317Data.openRaceStyleType && { openRaceStyleType: FC_317Data.openRaceStyleType }),
            ...(FC_317Data.closedRaceStyleType && { closedRaceStyleType: FC_317Data.closedRaceStyleType }),
            ...(FC_317Data.holeStatus && { holeStatus: FC_317Data.holeStatus }),
            ...(FC_317Data.lubeBrand && { lubeBrand: FC_317Data.lubeBrand }),
            ...(FC_317Data.lubeType && { lubeType: FC_317Data.lubeType }),
            ...(FC_317Data.currentGrease && { currentGrease: FC_317Data.currentGrease }),
            ...(FC_317Data.currentGreaseGrade && { currentGreaseGrade: FC_317Data.currentGreaseGrade }),
            ...(FC_317Data.currentOil && { currentOil: FC_317Data.currentOil }),
            ...(FC_317Data.oilViscosity && { oilViscosity: FC_317Data.oilViscosity }),
            ...(FC_317Data.zerkDirection && { zerkDirection: FC_317Data.zerkDirection }),
            ...(FC_317Data.zerkLocationType && { zerkLocationType: FC_317Data.zerkLocationType }),
            ...(FC_317Data.chainMaster && { chainMaster: FC_317Data.chainMaster }),
            ...(FC_317Data.remoteStatus && { remoteStatus: FC_317Data.remoteStatus }),
            ...(FC_317Data.mountStatus && { mountStatus: FC_317Data.mountStatus }),
            ...(FC_317Data.otherUnitStatus && { otherUnitStatus: FC_317Data.otherUnitStatus }),
            ...(FC_317Data.timerStatus && { timerStatus: FC_317Data.timerStatus }),
            ...(FC_317Data.electricStatus && { electricStatus: FC_317Data.electricStatus }),
            ...(FC_317Data.mightyLubeMonitoring && { mightyLubeMonitoring: FC_317Data.mightyLubeMonitoring }),
            ...(FC_317Data.preMountType && { preMountType: FC_317Data.preMountType }),
            ...(FC_317Data.plcConnection && { plcConnection: FC_317Data.plcConnection }),
            ...(FC_317Data.otherControllerInfo && { otherControllerInfo: FC_317Data.otherControllerInfo }),
            ...(FC_317Data.fcUnitType && { fcUnitType: FC_317Data.fcUnitType }),
            ...(FC_317Data.fcGreaserE && { fcGreaserE: FC_317Data.fcGreaserE }),
            ...(FC_317Data.fcGreaserF && { fcGreaserF: FC_317Data.fcGreaserF }),
            ...(FC_317Data.fcGreaserG && { fcGreaserG: FC_317Data.fcGreaserG }),
            ...(FC_317Data.fcGreaserH && { fcGreaserH: FC_317Data.fcGreaserH })
        });
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