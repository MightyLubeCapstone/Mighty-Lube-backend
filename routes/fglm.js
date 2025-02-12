const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FGLM = require("../models/fglm.js");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    // used for FGLM form
    try {
        const { fglmData } = req.body;
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
            measureUnit: fglmData.measureUnit,
            conductor4: fglmData.conductor4,
            conductor7: fglmData.conductor7,
            conductor2: fglmData.conductor2
        });
        req.user.orders.push({ productConfigurationInfo: order }); // should grab the req.user we set in auth...
        await req.user.save(); // idk if this will even work

        return res.status(200).json({ message: "FGLM entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/", authenticate, async (req, res) => {
    try {
        const user = req.user;
        ///
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/", authenticate, async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/", authenticate, async (req, res) => {
    try {
        const { orderID } = req.body;
        ///
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;