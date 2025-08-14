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
        monitorData: 
        {
                existingMonitor: IBR_RFCData.templateA.existingMonitor,
                newMonitor: IBR_RFCData.templateA.newMonitor,		
                ...(IBR_RFCData.templateA.dcuStatus && { dcuStatus: IBR_RFCData.templateA.dcuStatus }),
                ...(IBR_RFCData.templateA.dcuNum && { dcuNum: IBR_RFCData.templateA.dcuNum }),
                ...(IBR_RFCData.templateA.existingWindows && { existingWindows: IBR_RFCData.templateA.existingWindows }),
                ...(IBR_RFCData.templateA.existingHeadUnit && { existingHeadUnit: IBR_RFCData.templateA.existingHeadUnit }),
                ...(IBR_RFCData.templateA.existingDCU && { existingDCU: IBR_RFCData.templateA.existingDCU }),
                ...(IBR_RFCData.templateA.existingPowerInterface && { existingPowerInterface: IBR_RFCData.templateA.existingPowerInterface }),
                ...(IBR_RFCData.templateA.newReservoir && { newReservoir: IBR_RFCData.templateA.newReservoir }),
                ...(IBR_RFCData.templateA.reservoirSize && { reservoirSize: IBR_RFCData.templateA.reservoirSize }),
                ...(IBR_RFCData.templateA.otherReservoirSize && { otherReservoirSize: IBR_RFCData.templateA.otherReservoirSize }),
                ...(IBR_RFCData.templateA.newReservoirNum && { newReservoirNum: IBR_RFCData.templateA.newReservoirNum }),
                ...(IBR_RFCData.templateA.typeMonitor && { typeMonitor: IBR_RFCData.templateA.typeMonitor }),
                ...(IBR_RFCData.templateA.driveMotorAmp && { driveMotorAmp: IBR_RFCData.templateA.driveMotorAmp }),
                ...(IBR_RFCData.templateA.driveMotorAmpNum && { driveMotorAmpNum: IBR_RFCData.templateA.driveMotorAmpNum }),
                ...(IBR_RFCData.templateA.driveTakeUpAir && { driveTakeUpAir: IBR_RFCData.templateA.driveTakeUpAir }),
                ...(IBR_RFCData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: IBR_RFCData.templateA.driveTakeUpAirNum }),
                ...(IBR_RFCData.templateA.takeUpDistance && { takeUpDistance: IBR_RFCData.templateA.takeUpDistance }),
                ...(IBR_RFCData.templateA.takeUpDistanceNum && { takeUpDistanceNum: IBR_RFCData.templateA.takeUpDistanceNum }),
                ...(IBR_RFCData.templateA.driveTemp && { driveTemp: IBR_RFCData.templateA.driveTemp }),
                ...(IBR_RFCData.templateA.driveTempNum && { driveTempNum: IBR_RFCData.templateA.driveTempNum }),
                ...(IBR_RFCData.templateA.driveVibration && { driveVibration: IBR_RFCData.templateA.driveVibration }),
                ...(IBR_RFCData.templateA.driveVibrationNum && { driveVibrationNum: IBR_RFCData.templateA.driveVibrationNum }),
                ...(IBR_RFCData.templateA.dogPitch && { dogPitch: IBR_RFCData.templateA.dogPitch }),
                ...(IBR_RFCData.templateA.dogPitchNum && { dogPitchNum: IBR_RFCData.templateA.dogPitchNum }),
                ...(IBR_RFCData.templateA.paintMarker && { paintMarker: IBR_RFCData.templateA.paintMarker }),
                ...(IBR_RFCData.templateA.paintMarkerNum && { paintMarkerNum: IBR_RFCData.templateA.paintMarkerNum }),
                ...(IBR_RFCData.templateA.chainVision && { chainVision: IBR_RFCData.templateA.chainVision }),
                ...(IBR_RFCData.templateA.lubeVision && { lubeVision: IBR_RFCData.templateA.lubeVision }),
                ...(IBR_RFCData.templateA.trolleyVision && { trolleyVision: IBR_RFCData.templateA.trolleyVision }),
                ...(IBR_RFCData.templateA.trolleyDetect && { trolleyDetect: IBR_RFCData.templateA.trolleyDetect }),
                ...(IBR_RFCData.templateA.omniView && { omniView: IBR_RFCData.templateA.omniView }),
                ...(IBR_RFCData.templateA.dcuUpgradeNum && { dcuUpgradeNum: IBR_RFCData.templateA.dcuUpgradeNum }),
                ...(IBR_RFCData.templateA.piuDistance && { piuDistance: IBR_RFCData.templateA.piuDistance }),
                ...(IBR_RFCData.templateA.switchDistance && { switchDistance: IBR_RFCData.templateA.switchDistance }),
                ...(IBR_RFCData.templateA.ampPickup && { ampPickup: IBR_RFCData.templateA.ampPickup }),
                ...(IBR_RFCData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: IBR_RFCData.templateA.fromAirTakeUpDistance }),
                ...(IBR_RFCData.templateA.specialControllerOptions && { specialControllerOptions: IBR_RFCData.templateA.specialControllerOptions }),
                ...(IBR_RFCData.templateA.operatingVoltage && { operatingVoltage: IBR_RFCData.templateA.operatingVoltage })
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