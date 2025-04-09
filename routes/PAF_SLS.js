const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_SLS = require("../models/PAF_SLS");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_SLSData, numRequested } = req.body;
        const order = new PAF_SLS({
            conveyorName: PAF_SLSData.conveyorName,
            chainSize: PAF_SLSData.chainSize,
            ...(PAF_SLSData.otherChainSize && { otherChainSize: PAF_SLSData.otherChainSize }),
            industrialChainManufacturer: PAF_SLSData.industrialChainManufacturer,
            ...(PAF_SLSData.otherChainManufacturer && { otherChainManufacturer: PAF_SLSData.otherChainManufacturer }),
            conveyorLength: PAF_SLSData.conveyorLength,
            conveyorLengthUnit: PAF_SLSData.conveyorLengthUnit,
            conveyorSpeed: PAF_SLSData.conveyorSpeed,
            conveyorSpeedUnit: PAF_SLSData.conveyorSpeedUnit,
            conveyorIndex: PAF_SLSData.conveyorIndex,
            travelDirection: PAF_SLSData.travelDirection,
            appEnviroment: PAF_SLSData.appEnviroment,
            ...(PAF_SLSData.ovenStatus && { ovenStatus: PAF_SLSData.ovenStatus }),
            ...(PAF_SLSData.ovenTemp && { ovenTemp: PAF_SLSData.ovenTemp }),
            surroundingTemp: PAF_SLSData.surroundingTemp,
            conveyorLoaded: PAF_SLSData.conveyorLoaded,
            conveyorSwing: PAF_SLSData.conveyorSwing,
            orientationType: PAF_SLSData.orientationType,
            operatingVoltSingle: PAF_SLSData.operatingVoltSingle,
            controlVoltSingle: PAF_SLSData.controlVoltSingle,
            ...(PAF_SLSData.monitorData && { monitorData: PAF_SLSData.monitorData }),
            cleanChain: PAF_SLSData.cleanChain,
            pfUnitType: PAF_SLSData.pfUnitType,
            pfInvertedA: PAF_SLSData.pfInvertedA,
            pfInvertedG: PAF_SLSData.pfInvertedG,
            pfInvertedH: PAF_SLSData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_SLS"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_SLS entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;