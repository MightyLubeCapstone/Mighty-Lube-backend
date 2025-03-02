const express = require("express");
const { authenticate } = require("./sessions");
const FGLM = require("../models/FGLM");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    // used for FGLM form
    try {
        const { fglmData, numRequested } = req.body;
        const order = new FGLM({
            conveyorName: fglmData.conveyorName,
            chainSize: fglmData.chainSizeType,
            chainManufacturerType: fglmData.chainManufacturerType,
            chainPinType: fglmData.chainPinType,
            conveyorLength: fglmData.conveyorLength,
            conveyorLengthUnit: fglmData.conveyorLengthUnit,
            conveyorSpeed: fglmData.conveyorSpeed,
            conveyorSpeedUnit: fglmData.conveyorSpeedUnit,
            conveyorIndex: fglmData.conveyorIndex,
            travelDirection: fglmData.travelDirection,
            metalType: fglmData.metalType,
            conveyorStyle: fglmData.conveyorStyle,
            trolleyColor: fglmData.trolleyColor,
            trolleyType: fglmData.trolleyType,
            surroundingTemp: fglmData.surroundingTemp,
            conveyorLoaded: fglmData.conveyorLoaded,
            conveyorSwing: fglmData.conveyorSwing,
            plantLayout: fglmData.plantLayout,
            requiredPics: fglmData.requiredPics,
            operatingVoltage: fglmData.operatingVoltage,
            existingMonitor: fglmData.existingMonitor,
            newMonitor: fglmData.newMonitor,
            motorAmp: fglmData.motorAmp,
            takeUpAir: fglmData.takeUpAir,
            takeUpDist: fglmData.takeUpDist,
            motorTemp: fglmData.motorTemp,
            motorVib: fglmData.motorVib,
            detectFaultyTrolley: fglmData.detectFaultyTrolley,
            sideLube: fglmData.sideLube,
            topLube: fglmData.topLube,
            cleanChain: fglmData.cleanChain,
            wireMeasurementUnit: fglmData.wireMeasurementUnit,
            conductor4: fglmData.conductor4,
            conductor7: fglmData.conductor7,
            conductor2: fglmData.conductor2
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FGLM" });
        await req.user.save();

        return res.status(200).json({ message: "FGLM entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;