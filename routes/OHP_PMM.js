 const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_PMM = require("../models/OHP_PMM");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_PMMData, numRequested } = req.body;
        const order = new OHP_PMM({
            conveyorName: OHP_PMMData.conveyorName,
            chainSize: OHP_PMMData.chainSize,
            ...(OHP_PMMData.otherChainSize && { otherChainSize: OHP_PMMData.otherChainSize }),
            industrialChainManufacturer: OHP_PMMData.industrialChainManufacturer,
            ...(OHP_PMMData.otherChainManufacturer && { otherChainManufacturer: OHP_PMMData.otherChainManufacturer }),
            orientationType: OHP_PMMData.orientationType,
            markerToUnitDistance: OHP_PMMData.markerToUnitDistance,
            ...(OHP_PMMData.existingMonitor && { existingMonitor: OHP_PMMData.existingMonitor }),
            ...(OHP_PMMData.newMonitor && { newMonitor: OHP_PMMData.newMonitor }),
            monitorData: {
                ...(OHP_PMMData.dcuStatus && { dcuStatus: OHP_PMMData.dcuStatus }),
                ...(OHP_PMMData.dcuNum && { dcuNum: OHP_PMMData.dcuNum }),
                ...(OHP_PMMData.existingWindows && { existingWindows: OHP_PMMData.existingWindows }),
                ...(OHP_PMMData.existingHeadUnit && { existingHeadUnit: OHP_PMMData.existingHeadUnit }),
                ...(OHP_PMMData.existingDCU && { existingDCU: OHP_PMMData.existingDCU }),
                ...(OHP_PMMData.existingPowerInterface && { existingPowerInterface: OHP_PMMData.existingPowerInterface }),
                ...(OHP_PMMData.newReservoir && { newReservoir: OHP_PMMData.newReservoir }),
                ...(OHP_PMMData.reservoirSize && { reservoirSize: OHP_PMMData.reservoirSize }),
                ...(OHP_PMMData.otherReservoirSize && { otherReservoirSize: OHP_PMMData.otherReservoirSize }),
                ...(OHP_PMMData.newReservoirNum && { newReservoirNum: OHP_PMMData.newReservoirNum }),
                ...(OHP_PMMData.typeMonitor && { typeMonitor: OHP_PMMData.typeMonitor }),
                ...(OHP_PMMData.driveMotorAmp && { driveMotorAmp: OHP_PMMData.driveMotorAmp }),
                ...(OHP_PMMData.driveMotorAmpNum && { driveMotorAmpNum: OHP_PMMData.driveMotorAmpNum }),
                ...(OHP_PMMData.driveTakeUpAir && { driveTakeUpAir: OHP_PMMData.driveTakeUpAir }),
                ...(OHP_PMMData.driveTakeUpAirNum && { driveTakeUpAirNum: OHP_PMMData.driveTakeUpAirNum }),
                ...(OHP_PMMData.takeUpDistance && { takeUpDistance: OHP_PMMData.takeUpDistance }),
                ...(OHP_PMMData.takeUpDistanceNum && { takeUpDistanceNum: OHP_PMMData.takeUpDistanceNum }),
                ...(OHP_PMMData.driveTemp && { driveTemp: OHP_PMMData.driveTemp }),
                ...(OHP_PMMData.driveTempNum && { driveTempNum: OHP_PMMData.driveTempNum }),
                ...(OHP_PMMData.driveVibration && { driveVibration: OHP_PMMData.driveVibration }),
                ...(OHP_PMMData.driveVibrationNum && { driveVibrationNum: OHP_PMMData.driveVibrationNum }),
                ...(OHP_PMMData.dogPitch && { dogPitch: OHP_PMMData.dogPitch }),
                ...(OHP_PMMData.dogPitchNum && { dogPitchNum: OHP_PMMData.dogPitchNum }),
                ...(OHP_PMMData.paintMarker && { paintMarker: OHP_PMMData.paintMarker }),
                ...(OHP_PMMData.paintMarkerNum && { paintMarkerNum: OHP_PMMData.paintMarkerNum }),
                ...(OHP_PMMData.chainVision && { chainVision: OHP_PMMData.chainVision }),
                ...(OHP_PMMData.lubeVision && { lubeVision: OHP_PMMData.lubeVision }),
                ...(OHP_PMMData.trolleyVision && { trolleyVision: OHP_PMMData.trolleyVision }),
                ...(OHP_PMMData.trolleyDetect && { trolleyDetect: OHP_PMMData.trolleyDetect }),
                ...(OHP_PMMData.omniView && { omniView: OHP_PMMData.omniView }),
                ...(OHP_PMMData.dcuUpgradeNum && { dcuUpgradeNum: OHP_PMMData.dcuUpgradeNum }),
                ...(OHP_PMMData.itNameOne && { itNameOne: OHP_PMMData.itNameOne }),
                ...(OHP_PMMData.itIPOne && { itIPOne: OHP_PMMData.itIPOne }),
                ...(OHP_PMMData.itGatewayOne && { itGatewayOne: OHP_PMMData.itGatewayOne }),
                ...(OHP_PMMData.itSubnetOne && { itSubnetOne: OHP_PMMData.itSubnetOne }),
                ...(OHP_PMMData.itDNSOne && { itDNSOne: OHP_PMMData.itDNSOne }),
                ...(OHP_PMMData.itSMTPOne && { itSMTPOne: OHP_PMMData.itSMTPOne }),
                ...(OHP_PMMData.itNameTwo && { itNameTwo: OHP_PMMData.itNameTwo }),
                ...(OHP_PMMData.itIPTwo && { itIPTwo: OHP_PMMData.itIPTwo }),
                ...(OHP_PMMData.itGatewayTwo && { itGatewayTwo: OHP_PMMData.itGatewayTwo }),
                ...(OHP_PMMData.itSubnetTwo && { itSubnetTwo: OHP_PMMData.itSubnetTwo }),
                ...(OHP_PMMData.itDNSTwo && { itDNSTwo: OHP_PMMData.itDNSTwo }),
                ...(OHP_PMMData.itSMTPTwo && { itSMTPTwo: OHP_PMMData.itSMTPTwo }),
                ...(OHP_PMMData.itNameThree && { itNameThree: OHP_PMMData.itNameThree }),
                ...(OHP_PMMData.itIPThree && { itIPThree: OHP_PMMData.itIPThree }),
                ...(OHP_PMMData.itGatewayThree && { itGatewayThree: OHP_PMMData.itGatewayThree }),
                ...(OHP_PMMData.itSubnetThree && { itSubnetThree: OHP_PMMData.itSubnetThree }),
                ...(OHP_PMMData.itDNSThree && { itDNSThree: OHP_PMMData.itDNSThree }),
                ...(OHP_PMMData.itSMTPThree && { itSMTPThree: OHP_PMMData.itSMTPThree }),
                ...(OHP_PMMData.itAdditionalNotes && { itAdditionalNotes: OHP_PMMData.itAdditionalNotes }),
                ...(OHP_PMMData.piuDistance && { piuDistance: OHP_PMMData.piuDistance }),
                ...(OHP_PMMData.switchDistance && { switchDistance: OHP_PMMData.switchDistance }),
                ...(OHP_PMMData.ampPickup && { ampPickup: OHP_PMMData.ampPickup }),
                ...(OHP_PMMData.fromAirTakeUpDistance && { fromAirTakeUpDistance: OHP_PMMData.fromAirTakeUpDistance }),
                ...(OHP_PMMData.specialControllerOptions && { specialControllerOptions: OHP_PMMData.specialControllerOptions }),
                ...(OHP_PMMData.operatingVoltage && { operatingVoltage: OHP_PMMData.operatingVoltage })

            },

        ...(OHP_PMMData.dcuNum && { dcuNum: OHP_PMMData.dcuNum }),

        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_PMM"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_PMM entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;