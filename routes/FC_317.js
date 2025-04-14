const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_317 = require("../models/FC_317");
const templateB = require("../models/templateB");

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
            // monitorData: new templateB({
            //     existingMonitor: FC_317Data.templateB.existingMonitor,
            //     newMonitor: FC_317Data.templateB.newMonitor,
            //     ...(FC_317Data.templateB.dcuStatus && { dcuStatus: FC_317Data.templateB.dcuStatus }),
            //     ...(FC_317Data.templateB.dcuNum && { dcuNum: FC_317Data.templateB.dcuNum }),
            //     ...(FC_317Data.templateB.existingWindows && { existingWindows: FC_317Data.templateB.existingWindows }),
            //     ...(FC_317Data.templateB.existingHeadUnit && { existingHeadUnit: FC_317Data.templateB.existingHeadUnit }),
            //     ...(FC_317Data.templateB.existingDCU && { existingDCU: FC_317Data.templateB.existingDCU }),
            //     ...(FC_317Data.templateB.existingPowerInterface && { existingPowerInterface: FC_317Data.templateB.existingPowerInterface }),
            //     ...(FC_317Data.templateB.newReservoir && { newReservoir: FC_317Data.templateB.newReservoir }),
            //     ...(FC_317Data.templateB.reservoirSize && { reservoirSize: FC_317Data.templateB.reservoirSize }),
            //     ...(FC_317Data.templateB.otherReservoirSize && { otherReservoirSize: FC_317Data.templateB.otherReservoirSize }),
            //     ...(FC_317Data.templateB.newReservoirNum && { newReservoirNum: FC_317Data.templateB.newReservoirNum }),
            //     ...(FC_317Data.templateB.typeMonitor && { typeMonitor: FC_317Data.templateB.typeMonitor }),
            //     ...(FC_317Data.templateB.driveMotorAmp && { driveMotorAmp: FC_317Data.templateB.driveMotorAmp }),
            //     ...(FC_317Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: FC_317Data.templateB.driveMotorAmpNum }),
            //     ...(FC_317Data.templateB.driveTakeUpAir && { driveTakeUpAir: FC_317Data.templateB.driveTakeUpAir }),
            //     ...(FC_317Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: FC_317Data.templateB.driveTakeUpAirNum }),
            //     ...(FC_317Data.templateB.takeUpDistance && { takeUpDistance: FC_317Data.templateB.takeUpDistance }),
            //     ...(FC_317Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: FC_317Data.templateB.takeUpDistanceNum }),
            //     ...(FC_317Data.templateB.driveTemp && { driveTemp: FC_317Data.templateB.driveTemp }),
            //     ...(FC_317Data.templateB.driveTempNum && { driveTempNum: FC_317Data.templateB.driveTempNum }),
            //     ...(FC_317Data.templateB.driveVibration && { driveVibration: FC_317Data.templateB.driveVibration }),
            //     ...(FC_317Data.templateB.driveVibrationNum && { driveVibrationNum: FC_317Data.templateB.driveVibrationNum }),
            //     ...(FC_317Data.templateB.dogPitch && { dogPitch: FC_317Data.templateB.dogPitch }),
            //     ...(FC_317Data.templateB.dogPitchNum && { dogPitchNum: FC_317Data.templateB.dogPitchNum }),
            //     ...(FC_317Data.templateB.paintMarker && { paintMarker: FC_317Data.templateB.paintMarker }),
            //     ...(FC_317Data.templateB.paintMarkerNum && { paintMarkerNum: FC_317Data.templateB.paintMarkerNum }),
            //     ...(FC_317Data.templateB.chainVision && { chainVision: FC_317Data.templateB.chainVision }),
            //     ...(FC_317Data.templateB.lubeVision && { lubeVision: FC_317Data.templateB.lubeVision }),
            //     ...(FC_317Data.templateB.trolleyVision && { trolleyVision: FC_317Data.templateB.trolleyVision }),
            //     ...(FC_317Data.templateB.trolleyDetect && { trolleyDetect: FC_317Data.templateB.trolleyDetect }),
            //     ...(FC_317Data.templateB.omniView && { omniView: FC_317Data.templateB.omniView }),
            //     ...(FC_317Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: FC_317Data.templateB.dcuUpgradeNum }),
            //     ...(FC_317Data.templateB.itNameOne && { itNameOne: FC_317Data.templateB.itNameOne }),
            //     ...(FC_317Data.templateB.itIPOne && { itIPOne: FC_317Data.templateB.itIPOne }),
            //     ...(FC_317Data.templateB.itGatewayOne && { itGatewayOne: FC_317Data.templateB.itGatewayOne }),
            //     ...(FC_317Data.templateB.itSubnetOne && { itSubnetOne: FC_317Data.templateB.itSubnetOne }),
            //     ...(FC_317Data.templateB.itDNSOne && { itDNSOne: FC_317Data.templateB.itDNSOne }),
            //     ...(FC_317Data.templateB.itSMTPOne && { itSMTPOne: FC_317Data.templateB.itSMTPOne }),
            //     ...(FC_317Data.templateB.itNameTwo && { itNameTwo: FC_317Data.templateB.itNameTwo }),
            //     ...(FC_317Data.templateB.itIPTwo && { itIPTwo: FC_317Data.templateB.itIPTwo }),
            //     ...(FC_317Data.templateB.itGatewayTwo && { itGatewayTwo: FC_317Data.templateB.itGatewayTwo }),
            //     ...(FC_317Data.templateB.itSubnetTwo && { itSubnetTwo: FC_317Data.templateB.itSubnetTwo }),
            //     ...(FC_317Data.templateB.itDNSTwo && { itDNSTwo: FC_317Data.templateB.itDNSTwo }),
            //     ...(FC_317Data.templateB.itSMTPTwo && { itSMTPTwo: FC_317Data.templateB.itSMTPTwo }),
            //     ...(FC_317Data.templateB.itNameThree && { itNameThree: FC_317Data.templateB.itNameThree }),
            //     ...(FC_317Data.templateB.itIPThree && { itIPThree: FC_317Data.templateB.itIPThree }),
            //     ...(FC_317Data.templateB.itGatewayThree && { itGatewayThree: FC_317Data.templateB.itGatewayThree }),
            //     ...(FC_317Data.templateB.itSubnetThree && { itSubnetThree: FC_317Data.templateB.itSubnetThree }),
            //     ...(FC_317Data.templateB.itDNSThree && { itDNSThree: FC_317Data.templateB.itDNSThree }),
            //     ...(FC_317Data.templateB.itSMTPThree && { itSMTPThree: FC_317Data.templateB.itSMTPThree }),
            //     ...(FC_317Data.templateB.itAdditionalNotes && { itAdditionalNotes: FC_317Data.templateB.itAdditionalNotes }),
            //     ...(FC_317Data.templateB.piuDistance && { piuDistance: FC_317Data.templateB.piuDistance }),
            //     ...(FC_317Data.templateB.switchDistance && { switchDistance: FC_317Data.templateB.switchDistance }),
            //     ...(FC_317Data.templateB.ampPickup && { ampPickup: FC_317Data.templateB.ampPickup }),
            //     ...(FC_317Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: FC_317Data.templateB.fromAirTakeUpDistance }),
            //     ...(FC_317Data.templateB.specialControllerOptions && { specialControllerOptions: FC_317Data.templateB.specialControllerOptions })
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