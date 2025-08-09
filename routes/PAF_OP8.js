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
            monitorData: {
                existingMonitor: PAF_OP8Data.existingMonitor,
                newMonitor: PAF_OP8Data.newMonitor,
                ...(PAF_OP8Data.dcuStatus && { dcuStatus: PAF_OP8Data.dcuStatus }),
                ...(PAF_OP8Data.dcuNum && { dcuNum: PAF_OP8Data.dcuNum }),
                ...(PAF_OP8Data.existingWindows && { existingWindows: PAF_OP8Data.existingWindows }),
                ...(PAF_OP8Data.existingHeadUnit && { existingHeadUnit: PAF_OP8Data.existingHeadUnit }),
                ...(PAF_OP8Data.existingDCU && { existingDCU: PAF_OP8Data.existingDCU }),
                ...(PAF_OP8Data.existingPowerInterface && { existingPowerInterface: PAF_OP8Data.existingPowerInterface }),
                ...(PAF_OP8Data.newReservoir && { newReservoir: PAF_OP8Data.newReservoir }),
                ...(PAF_OP8Data.reservoirSize && { reservoirSize: PAF_OP8Data.reservoirSize }),
                ...(PAF_OP8Data.otherReservoirSize && { otherReservoirSize: PAF_OP8Data.otherReservoirSize }),
                ...(PAF_OP8Data.newReservoirNum && { newReservoirNum: PAF_OP8Data.newReservoirNum }),
                ...(PAF_OP8Data.typeMonitor && { typeMonitor: PAF_OP8Data.typeMonitor }),
                ...(PAF_OP8Data.driveMotorAmp && { driveMotorAmp: PAF_OP8Data.driveMotorAmp }),
                ...(PAF_OP8Data.driveMotorAmpNum && { driveMotorAmpNum: PAF_OP8Data.driveMotorAmpNum }),
                ...(PAF_OP8Data.driveTakeUpAir && { driveTakeUpAir: PAF_OP8Data.driveTakeUpAir }),
                ...(PAF_OP8Data.driveTakeUpAirNum && { driveTakeUpAirNum: PAF_OP8Data.driveTakeUpAirNum }),
                ...(PAF_OP8Data.takeUpDistance && { takeUpDistance: PAF_OP8Data.takeUpDistance }),
                ...(PAF_OP8Data.takeUpDistanceNum && { takeUpDistanceNum: PAF_OP8Data.takeUpDistanceNum }),
                ...(PAF_OP8Data.driveTemp && { driveTemp: PAF_OP8Data.driveTemp }),
                ...(PAF_OP8Data.driveTempNum && { driveTempNum: PAF_OP8Data.driveTempNum }),
                ...(PAF_OP8Data.driveVibration && { driveVibration: PAF_OP8Data.driveVibration }),
                ...(PAF_OP8Data.driveVibrationNum && { driveVibrationNum: PAF_OP8Data.driveVibrationNum }),
                ...(PAF_OP8Data.dogPitch && { dogPitch: PAF_OP8Data.dogPitch }),
                ...(PAF_OP8Data.dogPitchNum && { dogPitchNum: PAF_OP8Data.dogPitchNum }),
                ...(PAF_OP8Data.paintMarker && { paintMarker: PAF_OP8Data.paintMarker }),
                ...(PAF_OP8Data.paintMarkerNum && { paintMarkerNum: PAF_OP8Data.paintMarkerNum }),
                ...(PAF_OP8Data.chainVision && { chainVision: PAF_OP8Data.chainVision }),
                ...(PAF_OP8Data.lubeVision && { lubeVision: PAF_OP8Data.lubeVision }),
                ...(PAF_OP8Data.trolleyVision && { trolleyVision: PAF_OP8Data.trolleyVision }),
                ...(PAF_OP8Data.trolleyDetect && { trolleyDetect: PAF_OP8Data.trolleyDetect }),
                ...(PAF_OP8Data.omniView && { omniView: PAF_OP8Data.omniView }),
                ...(PAF_OP8Data.dcuUpgradeNum && { dcuUpgradeNum: PAF_OP8Data.dcuUpgradeNum }),
                ...(PAF_OP8Data.itNameOne && { itNameOne: PAF_OP8Data.itNameOne }),
                ...(PAF_OP8Data.itIPOne && { itIPOne: PAF_OP8Data.itIPOne }),
                ...(PAF_OP8Data.itGatewayOne && { itGatewayOne: PAF_OP8Data.itGatewayOne }),
                ...(PAF_OP8Data.itSubnetOne && { itSubnetOne: PAF_OP8Data.itSubnetOne }),
                ...(PAF_OP8Data.itDNSOne && { itDNSOne: PAF_OP8Data.itDNSOne }),
                ...(PAF_OP8Data.itSMTPOne && { itSMTPOne: PAF_OP8Data.itSMTPOne }),
                ...(PAF_OP8Data.itNameTwo && { itNameTwo: PAF_OP8Data.itNameTwo }),
                ...(PAF_OP8Data.itIPTwo && { itIPTwo: PAF_OP8Data.itIPTwo }),
                ...(PAF_OP8Data.itGatewayTwo && { itGatewayTwo: PAF_OP8Data.itGatewayTwo }),
                ...(PAF_OP8Data.itSubnetTwo && { itSubnetTwo: PAF_OP8Data.itSubnetTwo }),
                ...(PAF_OP8Data.itDNSTwo && { itDNSTwo: PAF_OP8Data.itDNSTwo }),
                ...(PAF_OP8Data.itSMTPTwo && { itSMTPTwo: PAF_OP8Data.itSMTPTwo }),
                ...(PAF_OP8Data.itNameThree && { itNameThree: PAF_OP8Data.itNameThree }),
                ...(PAF_OP8Data.itIPThree && { itIPThree: PAF_OP8Data.itIPThree }),
                ...(PAF_OP8Data.itGatewayThree && { itGatewayThree: PAF_OP8Data.itGatewayThree }),
                ...(PAF_OP8Data.itSubnetThree && { itSubnetThree: PAF_OP8Data.itSubnetThree }),
                ...(PAF_OP8Data.itDNSThree && { itDNSThree: PAF_OP8Data.itDNSThree }),
                ...(PAF_OP8Data.itSMTPThree && { itSMTPThree: PAF_OP8Data.itSMTPThree }),
                ...(PAF_OP8Data.itAdditionalNotes && { itAdditionalNotes: PAF_OP8Data.itAdditionalNotes }),
                ...(PAF_OP8Data.piuDistance && { piuDistance: PAF_OP8Data.piuDistance }),
                ...(PAF_OP8Data.switchDistance && { switchDistance: PAF_OP8Data.switchDistance }),
                ...(PAF_OP8Data.ampPickup && { ampPickup: PAF_OP8Data.ampPickup }),
                ...(PAF_OP8Data.fromAirTakeUpDistance && { fromAirTakeUpDistance: PAF_OP8Data.fromAirTakeUpDistance }),
                ...(PAF_OP8Data.specialControllerOptions && { specialControllerOptions: PAF_OP8Data.specialControllerOptions })
            },
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