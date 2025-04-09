const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_OP8 = require("../models/PAF_OP8");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: PAF_OP8Data.templateB.existingMonitor,
                newMonitor: PAF_OP8Data.templateB.newMonitor,
                ...(PAF_OP8Data.templateB.dcuStatus && { dcuStatus: PAF_OP8Data.templateB.dcuStatus }),
                ...(PAF_OP8Data.templateB.dcuNum && { dcuNum: PAF_OP8Data.templateB.dcuNum }),
                ...(PAF_OP8Data.templateB.existingWindows && { existingWindows: PAF_OP8Data.templateB.existingWindows }),
                ...(PAF_OP8Data.templateB.existingHeadUnit && { existingHeadUnit: PAF_OP8Data.templateB.existingHeadUnit }),
                ...(PAF_OP8Data.templateB.existingDCU && { existingDCU: PAF_OP8Data.templateB.existingDCU }),
                ...(PAF_OP8Data.templateB.existingPowerInterface && { existingPowerInterface: PAF_OP8Data.templateB.existingPowerInterface }),
                ...(PAF_OP8Data.templateB.newReservoir && { newReservoir: PAF_OP8Data.templateB.newReservoir }),
                ...(PAF_OP8Data.templateB.reservoirSize && { reservoirSize: PAF_OP8Data.templateB.reservoirSize }),
                ...(PAF_OP8Data.templateB.otherReservoirSize && { otherReservoirSize: PAF_OP8Data.templateB.otherReservoirSize }),
                ...(PAF_OP8Data.templateB.newReservoirNum && { newReservoirNum: PAF_OP8Data.templateB.newReservoirNum }),
                ...(PAF_OP8Data.templateB.typeMonitor && { typeMonitor: PAF_OP8Data.templateB.typeMonitor }),
                ...(PAF_OP8Data.templateB.driveMotorAmp && { driveMotorAmp: PAF_OP8Data.templateB.driveMotorAmp }),
                ...(PAF_OP8Data.templateB.driveMotorAmpNum && { driveMotorAmpNum: PAF_OP8Data.templateB.driveMotorAmpNum }),
                ...(PAF_OP8Data.templateB.driveTakeUpAir && { driveTakeUpAir: PAF_OP8Data.templateB.driveTakeUpAir }),
                ...(PAF_OP8Data.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_OP8Data.templateB.driveTakeUpAirNum }),
                ...(PAF_OP8Data.templateB.takeUpDistance && { takeUpDistance: PAF_OP8Data.templateB.takeUpDistance }),
                ...(PAF_OP8Data.templateB.takeUpDistanceNum && { takeUpDistanceNum: PAF_OP8Data.templateB.takeUpDistanceNum }),
                ...(PAF_OP8Data.templateB.driveTemp && { driveTemp: PAF_OP8Data.templateB.driveTemp }),
                ...(PAF_OP8Data.templateB.driveTempNum && { driveTempNum: PAF_OP8Data.templateB.driveTempNum }),
                ...(PAF_OP8Data.templateB.driveVibration && { driveVibration: PAF_OP8Data.templateB.driveVibration }),
                ...(PAF_OP8Data.templateB.driveVibrationNum && { driveVibrationNum: PAF_OP8Data.templateB.driveVibrationNum }),
                ...(PAF_OP8Data.templateB.dogPitch && { dogPitch: PAF_OP8Data.templateB.dogPitch }),
                ...(PAF_OP8Data.templateB.dogPitchNum && { dogPitchNum: PAF_OP8Data.templateB.dogPitchNum }),
                ...(PAF_OP8Data.templateB.paintMarker && { paintMarker: PAF_OP8Data.templateB.paintMarker }),
                ...(PAF_OP8Data.templateB.paintMarkerNum && { paintMarkerNum: PAF_OP8Data.templateB.paintMarkerNum }),
                ...(PAF_OP8Data.templateB.chainVision && { chainVision: PAF_OP8Data.templateB.chainVision }),
                ...(PAF_OP8Data.templateB.lubeVision && { lubeVision: PAF_OP8Data.templateB.lubeVision }),
                ...(PAF_OP8Data.templateB.trolleyVision && { trolleyVision: PAF_OP8Data.templateB.trolleyVision }),
                ...(PAF_OP8Data.templateB.trolleyDetect && { trolleyDetect: PAF_OP8Data.templateB.trolleyDetect }),
                ...(PAF_OP8Data.templateB.omniView && { omniView: PAF_OP8Data.templateB.omniView }),
                ...(PAF_OP8Data.templateB.dcuUpgradeNum && { dcuUpgradeNum: PAF_OP8Data.templateB.dcuUpgradeNum }),
                ...(PAF_OP8Data.templateB.itNameOne && { itNameOne: PAF_OP8Data.templateB.itNameOne }),
                ...(PAF_OP8Data.templateB.itIPOne && { itIPOne: PAF_OP8Data.templateB.itIPOne }),
                ...(PAF_OP8Data.templateB.itGatewayOne && { itGatewayOne: PAF_OP8Data.templateB.itGatewayOne }),
                ...(PAF_OP8Data.templateB.itSubnetOne && { itSubnetOne: PAF_OP8Data.templateB.itSubnetOne }),
                ...(PAF_OP8Data.templateB.itDNSOne && { itDNSOne: PAF_OP8Data.templateB.itDNSOne }),
                ...(PAF_OP8Data.templateB.itSMTPOne && { itSMTPOne: PAF_OP8Data.templateB.itSMTPOne }),
                ...(PAF_OP8Data.templateB.itNameTwo && { itNameTwo: PAF_OP8Data.templateB.itNameTwo }),
                ...(PAF_OP8Data.templateB.itIPTwo && { itIPTwo: PAF_OP8Data.templateB.itIPTwo }),
                ...(PAF_OP8Data.templateB.itGatewayTwo && { itGatewayTwo: PAF_OP8Data.templateB.itGatewayTwo }),
                ...(PAF_OP8Data.templateB.itSubnetTwo && { itSubnetTwo: PAF_OP8Data.templateB.itSubnetTwo }),
                ...(PAF_OP8Data.templateB.itDNSTwo && { itDNSTwo: PAF_OP8Data.templateB.itDNSTwo }),
                ...(PAF_OP8Data.templateB.itSMTPTwo && { itSMTPTwo: PAF_OP8Data.templateB.itSMTPTwo }),
                ...(PAF_OP8Data.templateB.itNameThree && { itNameThree: PAF_OP8Data.templateB.itNameThree }),
                ...(PAF_OP8Data.templateB.itIPThree && { itIPThree: PAF_OP8Data.templateB.itIPThree }),
                ...(PAF_OP8Data.templateB.itGatewayThree && { itGatewayThree: PAF_OP8Data.templateB.itGatewayThree }),
                ...(PAF_OP8Data.templateB.itSubnetThree && { itSubnetThree: PAF_OP8Data.templateB.itSubnetThree }),
                ...(PAF_OP8Data.templateB.itDNSThree && { itDNSThree: PAF_OP8Data.templateB.itDNSThree }),
                ...(PAF_OP8Data.templateB.itSMTPThree && { itSMTPThree: PAF_OP8Data.templateB.itSMTPThree }),
                ...(PAF_OP8Data.templateB.itAdditionalNotes && { itAdditionalNotes: PAF_OP8Data.templateB.itAdditionalNotes }),
                ...(PAF_OP8Data.templateB.piuDistance && { piuDistance: PAF_OP8Data.templateB.piuDistance }),
                ...(PAF_OP8Data.templateB.switchDistance && { switchDistance: PAF_OP8Data.templateB.switchDistance }),
                ...(PAF_OP8Data.templateB.ampPickup && { ampPickup: PAF_OP8Data.templateB.ampPickup }),
                ...(PAF_OP8Data.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_OP8Data.templateB.fromAirTakeUpDistance }),
                ...(PAF_OP8Data.templateB.specialControllerOptions && { specialControllerOptions: PAF_OP8Data.templateB.specialControllerOptions })
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