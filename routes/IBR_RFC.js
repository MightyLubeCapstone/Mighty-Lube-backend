const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_RFC = require("../models/IBR_RFC");
const templateA = require("../models/templateA");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_RFC form
    try {
        const { IBR_RFCData, numRequested } = req.body;
        const order = new IBR_RFC({
            conveyorName: IBR_RFCData.conveyorName ,
            chainSize: IBR_RFCData.chainSize ,
            ...(IBR_RFCData.otherChainSize && { otherChainSize: IBR_RFCData.otherChainSize }),
            industrialChainManufacturer: IBR_RFCData.industrialChainManufacturer,
            ...(IBR_RFCData.otherChainManufacturer && { otherChainManufacturer: IBR_RFCData.otherChainManufacturer }),
            conveyorLength: IBR_RFCData.conveyorLength ,
            conveyorLengthUnit: IBR_RFCData.conveyorLengthUnit,
            conveyorSpeed: IBR_RFCData.conveyorSpeed ,
            speedUnit: IBR_RFCData.speedUnit,
            conveyorIndex: IBR_RFCData.conveyorIndex ,
            travelDirection: IBR_RFCData.travelDirection,
            appEnviroment: IBR_RFCData.appEnviroment,
            ...(IBR_RFCData.ovenStatus && { ovenStatus: IBR_RFCData.ovenStatus }),
            ...(IBR_RFCData.ovenTemp && { ovenTemp: IBR_RFCData.ovenTemp }),
            ...(IBR_RFCData.otherAppEnviroment && { otherAppEnviroment: IBR_RFCData.otherAppEnviroment }),
            surroundingTemp: IBR_RFCData.surroundingTemp,
            conveyorLoaded: IBR_RFCData.conveyorLoaded,
            strandStatus: IBR_RFCData.strandStatus,
            plantLayout: IBR_RFCData.plantLayout,
            requiredPics: IBR_RFCData.requiredPics,
            operatingVoltage: IBR_RFCData.operatingVoltage,
            existingMonitor: IBR_RFCData.existingMonitor,
            newMonitor: IBR_RFCData.newMonitor,
            monitorData: {
                ...(IBR_RFCData.dcuStatus && { dcuStatus: IBR_RFCData.dcuStatus }),
                ...(IBR_RFCData.dcuNum && { dcuNum: IBR_RFCData.dcuNum }),
                ...(IBR_RFCData.existingWindows && { existingWindows: IBR_RFCData.existingWindows }),
                ...(IBR_RFCData.existingHeadUnit && { existingHeadUnit: IBR_RFCData.existingHeadUnit }),
                ...(IBR_RFCData.existingDCU && { existingDCU: IBR_RFCData.existingDCU }),
                ...(IBR_RFCData.existingPowerInterface && { existingPowerInterface: IBR_RFCData.existingPowerInterface }),
                ...(IBR_RFCData.newReservoir && { newReservoir: IBR_RFCData.newReservoir }),
                ...(IBR_RFCData.reservoirSize && { reservoirSize: IBR_RFCData.reservoirSize }),
                ...(IBR_RFCData.otherReservoirSize && { otherReservoirSize: IBR_RFCData.otherReservoirSize }),
                ...(IBR_RFCData.newReservoirNum && { newReservoirNum: IBR_RFCData.newReservoirNum }),
                ...(IBR_RFCData.typeMonitor && { typeMonitor: IBR_RFCData.typeMonitor }),
                ...(IBR_RFCData.driveMotorAmp && { driveMotorAmp: IBR_RFCData.driveMotorAmp }),
                ...(IBR_RFCData.driveMotorAmpNum && { driveMotorAmpNum: IBR_RFCData.driveMotorAmpNum }),
                ...(IBR_RFCData.driveTakeUpAir && { driveTakeUpAir: IBR_RFCData.driveTakeUpAir }),
                ...(IBR_RFCData.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_RFCData.driveTakeUpAirNum }),
                ...(IBR_RFCData.takeUpDistance && { takeUpDistance: IBR_RFCData.takeUpDistance }),
                ...(IBR_RFCData.takeUpDistanceNum && { takeUpDistanceNum: IBR_RFCData.takeUpDistanceNum }),
                ...(IBR_RFCData.driveTemp && { driveTemp: IBR_RFCData.driveTemp }),
                ...(IBR_RFCData.driveTempNum && { driveTempNum: IBR_RFCData.driveTempNum }),
                ...(IBR_RFCData.driveVibration && { driveVibration: IBR_RFCData.driveVibration }),
                ...(IBR_RFCData.driveVibrationNum && { driveVibrationNum: IBR_RFCData.driveVibrationNum }),
                ...(IBR_RFCData.dogPitch && { dogPitch: IBR_RFCData.dogPitch }),
                ...(IBR_RFCData.dogPitchNum && { dogPitchNum: IBR_RFCData.dogPitchNum }),
                ...(IBR_RFCData.paintMarker && { paintMarker: IBR_RFCData.paintMarker }),
                ...(IBR_RFCData.paintMarkerNum && { paintMarkerNum: IBR_RFCData.paintMarkerNum }),
                ...(IBR_RFCData.chainVision && { chainVision: IBR_RFCData.chainVision }),
                ...(IBR_RFCData.lubeVision && { lubeVision: IBR_RFCData.lubeVision }),
                ...(IBR_RFCData.trolleyVision && { trolleyVision: IBR_RFCData.trolleyVision }),
                ...(IBR_RFCData.trolleyDetect && { trolleyDetect: IBR_RFCData.trolleyDetect }),
                ...(IBR_RFCData.omniView && { omniView: IBR_RFCData.omniView }),
                ...(IBR_RFCData.dcuUpgradeNum && { dcuUpgradeNum: IBR_RFCData.dcuUpgradeNum }),
                ...(IBR_RFCData.itNameOne && { itNameOne: IBR_RFCData.itNameOne }),
                ...(IBR_RFCData.itIPOne && { itIPOne: IBR_RFCData.itIPOne }),
                ...(IBR_RFCData.itGatewayOne && { itGatewayOne: IBR_RFCData.itGatewayOne }),
                ...(IBR_RFCData.itSubnetOne && { itSubnetOne: IBR_RFCData.itSubnetOne }),
                ...(IBR_RFCData.itDNSOne && { itDNSOne: IBR_RFCData.itDNSOne }),
                ...(IBR_RFCData.itSMTPOne && { itSMTPOne: IBR_RFCData.itSMTPOne }),
                ...(IBR_RFCData.itNameTwo && { itNameTwo: IBR_RFCData.itNameTwo }),
                ...(IBR_RFCData.itIPTwo && { itIPTwo: IBR_RFCData.itIPTwo }),
                ...(IBR_RFCData.itGatewayTwo && { itGatewayTwo: IBR_RFCData.itGatewayTwo }),
                ...(IBR_RFCData.itSubnetTwo && { itSubnetTwo: IBR_RFCData.itSubnetTwo }),
                ...(IBR_RFCData.itDNSTwo && { itDNSTwo: IBR_RFCData.itDNSTwo }),
                ...(IBR_RFCData.itSMTPTwo && { itSMTPTwo: IBR_RFCData.itSMTPTwo }),
                ...(IBR_RFCData.itNameThree && { itNameThree: IBR_RFCData.itNameThree }),
                ...(IBR_RFCData.itIPThree && { itIPThree: IBR_RFCData.itIPThree }),
                ...(IBR_RFCData.itGatewayThree && { itGatewayThree: IBR_RFCData.itGatewayThree }),
                ...(IBR_RFCData.itSubnetThree && { itSubnetThree: IBR_RFCData.itSubnetThree }),
                ...(IBR_RFCData.itDNSThree && { itDNSThree: IBR_RFCData.itDNSThree }),
                ...(IBR_RFCData.itSMTPThree && { itSMTPThree: IBR_RFCData.itSMTPThree }),
                ...(IBR_RFCData.itAdditionalNotes && { itAdditionalNotes: IBR_RFCData.itAdditionalNotes }),
                ...(IBR_RFCData.piuDistance && { piuDistance: IBR_RFCData.piuDistance }),
                ...(IBR_RFCData.switchDistance && { switchDistance: IBR_RFCData.switchDistance }),
                ...(IBR_RFCData.ampPickup && { ampPickup: IBR_RFCData.ampPickup }),
                ...(IBR_RFCData.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_RFCData.fromAirTakeUpDistance }),
                ...(IBR_RFCData.specialControllerOptions && { specialControllerOptions: IBR_RFCData.specialControllerOptions }),
                ...(IBR_RFCData.operatingVoltage && { operatingVoltage: IBR_RFCData.operatingVoltage })

            },

            wheelOpenType: IBR_RFCData.wheelOpenType,
            wheelClosedType: IBR_RFCData.wheelClosedType,
            openStatus: IBR_RFCData.openStatus,
            powerChainStatus: IBR_RFCData.powerChainStatus,
            chainPinStatus: IBR_RFCData.chainPinStatus,
            sliderPlateStatus: IBR_RFCData.sliderPlateStatus,
            outBoardStatus: IBR_RFCData.outBoardStatus,
            railLubeStatus: IBR_RFCData.railLubeStatus,
            externalLubeStatus: IBR_RFCData.externalLubeStatus,
            lubeBrand: IBR_RFCData.lubeBrand,
            lubeType: IBR_RFCData.lubeType,
            lubeViscosity: IBR_RFCData.lubeViscosity,
            reservoirSize: IBR_RFCData.reservoirSize,
            ...(IBR_RFCData.otherReservoirSize && { otherReservoirSize: IBR_RFCData.otherReservoirSize }),
            reservoirSizeNum: IBR_RFCData.reservoirSizeNum,
            chainCleanStatus: IBR_RFCData.chainCleanStatus,
            mightyLubeMonitoring: IBR_RFCData.mightyLubeMonitoring,
            ctrController: IBR_RFCData.ctrController,
            plcConnection: IBR_RFCData.plcConnection,
            monitoringController: IBR_RFCData.monitoringController,
            otherControllerInfo: IBR_RFCData.otherControllerInfo,
            specialControllerOptions: IBR_RFCData.specialControllerOptions,
            measurementUnitType: IBR_RFCData.measurementUnitType,
            powerRailG: IBR_RFCData.powerRailG,
            powerRailH: IBR_RFCData.powerRailH,
            powerRailA1: IBR_RFCData.powerRailA1,
            powerRailB1: IBR_RFCData.powerRailB1,
            powerRailH1: IBR_RFCData.powerRailH1,
            powerRailJ1: IBR_RFCData.powerRailJ1,
            powerRailL1: IBR_RFCData.powerRailL1,
            powerRailM1: IBR_RFCData.powerRailM1,
            powerRailN1: IBR_RFCData.powerRailN1,
            powerRailP1: IBR_RFCData.powerRailP1,
            powerRailR1: IBR_RFCData.powerRailR1,
            wireMeasurementUnit: IBR_RFCData.wireMeasurementUnit,
            conductor2: IBR_RFCData.conductor2,
            conductor4: IBR_RFCData.conductor4,
            conductor7: IBR_RFCData.conductor7,
            conductor12: IBR_RFCData.conductor12,
            junctionBoxNum: IBR_RFCData.junctionBoxNum,


        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_RFC" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_RFC entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;