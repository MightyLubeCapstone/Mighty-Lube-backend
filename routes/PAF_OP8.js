const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_OP8 = require("../models/PAF_OP8");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_OP8Data, numRequested } = req.body;
        const order = new PAF_OP8({
            conveyorName: PAF_OP8Data.conveyorName,
            chainSize: PAF_OP8Data.chainSize,
            ...(PAF_OP8Data.otherChainSize && { otherChainSize: PAF_OP8Data.otherChainSize }),
            industrialChainManufacturer: PAF_OP8Data.industrialChainManufacturer,
            ...(PAF_OP8Data.otherChainManufacturer && { otherChainManufacturer: PAF_OP8Data.otherChainManufacturer }),
            conveyorLength: PAF_OP8Data.conveyorLength,
            conveyorLengthUnit: PAF_OP8Data.conveyorLengthUnit,
            travelDirection: PAF_OP8Data.travelDirection,
            appEnviroment: PAF_OP8Data.appEnviroment,
            ...(PAF_OP8Data.ovenStatus && { ovenStatus: PAF_OP8Data.ovenStatus }),
            ...(PAF_OP8Data.ovenTemp && { ovenTemp: PAF_OP8Data.ovenTemp }),
            monitorData: new templateA({
                existingMonitor: PAF_OP8Data.templateA.existingMonitor,
                newMonitor: PAF_OP8Data.templateA.newMonitor,
                ...(PAF_OP8Data.templateA.dcuStatus && { dcuStatus: PAF_OP8Data.templateA.dcuStatus }),
                ...(PAF_OP8Data.templateA.dcuNum && { dcuNum: PAF_OP8Data.templateA.dcuNum }),
                ...(PAF_OP8Data.templateA.existingWindows && { existingWindows: PAF_OP8Data.templateA.existingWindows }),
                ...(PAF_OP8Data.templateA.existingHeadUnit && { existingHeadUnit: PAF_OP8Data.templateA.existingHeadUnit }),
                ...(PAF_OP8Data.templateA.existingDCU && { existingDCU: PAF_OP8Data.templateA.existingDCU }),
                ...(PAF_OP8Data.templateA.existingPowerInterface && { existingPowerInterface: PAF_OP8Data.templateA.existingPowerInterface }),
                ...(PAF_OP8Data.templateA.newReservoir && { newReservoir: PAF_OP8Data.templateA.newReservoir }),
                ...(PAF_OP8Data.templateA.reservoirSize && { reservoirSize: PAF_OP8Data.templateA.reservoirSize }),
                ...(PAF_OP8Data.templateA.otherReservoirSize && { otherReservoirSize: PAF_OP8Data.templateA.otherReservoirSize }),
                ...(PAF_OP8Data.templateA.newReservoirNum && { newReservoirNum: PAF_OP8Data.templateA.newReservoirNum }),
                ...(PAF_OP8Data.templateA.typeMonitor && { typeMonitor: PAF_OP8Data.templateA.typeMonitor }),
                ...(PAF_OP8Data.templateA.driveMotorAmp && { driveMotorAmp: PAF_OP8Data.templateA.driveMotorAmp }),
                ...(PAF_OP8Data.templateA.driveMotorAmpNum && { driveMotorAmpNum: PAF_OP8Data.templateA.driveMotorAmpNum }),
                ...(PAF_OP8Data.templateA.driveTakeUpAir && { driveTakeUpAir: PAF_OP8Data.templateA.driveTakeUpAir }),
                ...(PAF_OP8Data.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_OP8Data.templateA.driveTakeUpAirNum }),
                ...(PAF_OP8Data.templateA.takeUpDistance && { takeUpDistance: PAF_OP8Data.templateA.takeUpDistance }),
                ...(PAF_OP8Data.templateA.takeUpDistanceNum && { takeUpDistanceNum: PAF_OP8Data.templateA.takeUpDistanceNum }),
                ...(PAF_OP8Data.templateA.driveTemp && { driveTemp: PAF_OP8Data.templateA.driveTemp }),
                ...(PAF_OP8Data.templateA.driveTempNum && { driveTempNum: PAF_OP8Data.templateA.driveTempNum }),
                ...(PAF_OP8Data.templateA.driveVibration && { driveVibration: PAF_OP8Data.templateA.driveVibration }),
                ...(PAF_OP8Data.templateA.driveVibrationNum && { driveVibrationNum: PAF_OP8Data.templateA.driveVibrationNum }),
                ...(PAF_OP8Data.templateA.dogPitch && { dogPitch: PAF_OP8Data.templateA.dogPitch }),
                ...(PAF_OP8Data.templateA.dogPitchNum && { dogPitchNum: PAF_OP8Data.templateA.dogPitchNum }),
                ...(PAF_OP8Data.templateA.paintMarker && { paintMarker: PAF_OP8Data.templateA.paintMarker }),
                ...(PAF_OP8Data.templateA.paintMarkerNum && { paintMarkerNum: PAF_OP8Data.templateA.paintMarkerNum }),
                ...(PAF_OP8Data.templateA.chainVision && { chainVision: PAF_OP8Data.templateA.chainVision }),
                ...(PAF_OP8Data.templateA.lubeVision && { lubeVision: PAF_OP8Data.templateA.lubeVision }),
                ...(PAF_OP8Data.templateA.trolleyVision && { trolleyVision: PAF_OP8Data.templateA.trolleyVision }),
                ...(PAF_OP8Data.templateA.trolleyDetect && { trolleyDetect: PAF_OP8Data.templateA.trolleyDetect }),
                ...(PAF_OP8Data.templateA.omniView && { omniView: PAF_OP8Data.templateA.omniView }),
                ...(PAF_OP8Data.templateA.dcuUpgradeNum && { dcuUpgradeNum: PAF_OP8Data.templateA.dcuUpgradeNum }),
                ...(PAF_OP8Data.templateA.itNameOne && { itNameOne: PAF_OP8Data.templateA.itNameOne }),
                ...(PAF_OP8Data.templateA.itIPOne && { itIPOne: PAF_OP8Data.templateA.itIPOne }),
                ...(PAF_OP8Data.templateA.itGatewayOne && { itGatewayOne: PAF_OP8Data.templateA.itGatewayOne }),
                ...(PAF_OP8Data.templateA.itSubnetOne && { itSubnetOne: PAF_OP8Data.templateA.itSubnetOne }),
                ...(PAF_OP8Data.templateA.itDNSOne && { itDNSOne: PAF_OP8Data.templateA.itDNSOne }),
                ...(PAF_OP8Data.templateA.itSMTPOne && { itSMTPOne: PAF_OP8Data.templateA.itSMTPOne }),
                ...(PAF_OP8Data.templateA.itNameTwo && { itNameTwo: PAF_OP8Data.templateA.itNameTwo }),
                ...(PAF_OP8Data.templateA.itIPTwo && { itIPTwo: PAF_OP8Data.templateA.itIPTwo }),
                ...(PAF_OP8Data.templateA.itGatewayTwo && { itGatewayTwo: PAF_OP8Data.templateA.itGatewayTwo }),
                ...(PAF_OP8Data.templateA.itSubnetTwo && { itSubnetTwo: PAF_OP8Data.templateA.itSubnetTwo }),
                ...(PAF_OP8Data.templateA.itDNSTwo && { itDNSTwo: PAF_OP8Data.templateA.itDNSTwo }),
                ...(PAF_OP8Data.templateA.itSMTPTwo && { itSMTPTwo: PAF_OP8Data.templateA.itSMTPTwo }),
                ...(PAF_OP8Data.templateA.itNameThree && { itNameThree: PAF_OP8Data.templateA.itNameThree }),
                ...(PAF_OP8Data.templateA.itIPThree && { itIPThree: PAF_OP8Data.templateA.itIPThree }),
                ...(PAF_OP8Data.templateA.itGatewayThree && { itGatewayThree: PAF_OP8Data.templateA.itGatewayThree }),
                ...(PAF_OP8Data.templateA.itSubnetThree && { itSubnetThree: PAF_OP8Data.templateA.itSubnetThree }),
                ...(PAF_OP8Data.templateA.itDNSThree && { itDNSThree: PAF_OP8Data.templateA.itDNSThree }),
                ...(PAF_OP8Data.templateA.itSMTPThree && { itSMTPThree: PAF_OP8Data.templateA.itSMTPThree }),
                ...(PAF_OP8Data.templateA.itAdditionalNotes && { itAdditionalNotes: PAF_OP8Data.templateA.itAdditionalNotes }),
                ...(PAF_OP8Data.templateA.piuDistance && { piuDistance: PAF_OP8Data.templateA.piuDistance }),
                ...(PAF_OP8Data.templateA.switchDistance && { switchDistance: PAF_OP8Data.templateA.switchDistance }),
                ...(PAF_OP8Data.templateA.ampPickup && { ampPickup: PAF_OP8Data.templateA.ampPickup }),
                ...(PAF_OP8Data.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_OP8Data.templateA.fromAirTakeUpDistance }),
                ...(PAF_OP8Data.templateA.specialControllerOptions && { specialControllerOptions: PAF_OP8Data.templateA.specialControllerOptions })
            }),
            orientationType: PAF_OP8Data.orientationType,
            operatingVoltTriple: PAF_OP8Data.operatingVoltTriple,
            controlVoltSingle: PAF_OP8Data.controlVoltSingle,
            opPowerStatus: PAF_OP8Data.opPowerStatus,
            brushMaterialType: PAF_OP8Data.brushMaterialType,
            clearanceStatus: PAF_OP8Data.clearanceStatus,
            washStatus: PAF_OP8Data.washStatus,
            foodIndustryStatus: PAF_OP8Data.foodIndustryStatus,
            powerPanelType: PAF_OP8Data.powerPanelType,
            threeStationType: PAF_OP8Data.threeStationType,
            shroudType: PAF_OP8Data.shroudType,
            additionalInfo: PAF_OP8Data.additionalInfo,
            pfUnitType: PAF_OP8Data.pfUnitType,
            pfOverheadL: PAF_OP8Data.pfOverheadL,
            pfOverheadG: PAF_OP8Data.pfOverheadG,
            pfOverheadH: PAF_OP8Data.pfOverheadH,
            pfInvertedA: PAF_OP8Data.pfInvertedA,
            pfInvertedG: PAF_OP8Data.pfInvertedG,
            pfInvertedH: PAF_OP8Data.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_OP8"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_OP8 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;