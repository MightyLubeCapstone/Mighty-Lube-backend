const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_PML = require("../models/PAF_PML");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_PMLData, numRequested } = req.body;
        const order = new PAF_PML({
            conveyorName: PAF_PMLData.conveyorName,
            chainSize: PAF_PMLData.chainSize,
            ...(PAF_PMLData.otherChainSize && { otherChainSize: PAF_PMLData.otherChainSize }),
            industrialChainManufacturer: PAF_PMLData.industrialChainManufacturer,
            ...(PAF_PMLData.otherChainManufacturer && { otherChainManufacturer: PAF_PMLData.otherChainManufacturer }),
            conveyorLength: PAF_PMLData.conveyorLength,
            conveyorLengthUnit: PAF_PMLData.conveyorLengthUnit,
            conveyorSpeed: PAF_PMLData.conveyorSpeed,
            conveyorSpeedUnit: PAF_PMLData.conveyorSpeedUnit,
            conveyorIndex: PAF_PMLData.conveyorIndex,
            travelDirection: PAF_PMLData.travelDirection,
            appEnviroment: PAF_PMLData.appEnviroment,
            ...(PAF_PMLData.ovenStatus && { ovenStatus: PAF_PMLData.ovenStatus }),
            ...(PAF_PMLData.ovenTemp && { ovenTemp: PAF_PMLData.ovenTemp }),
            surroundingTemp: PAF_PMLData.surroundingTemp,
            conveyorLoaded: PAF_PMLData.conveyorLoaded,
            conveyorSwing: PAF_PMLData.conveyorSwing,
            orientationType: PAF_PMLData.orientationType,
            operatingVoltSingle: PAF_PMLData.operatingVoltSingle,
            paintMakerStatus: PAF_PMLData.paintMakerStatus,
            paintMarketNum: PAF_PMLData.paintMarketNum,
            cleanChain: PAF_PMLData.cleanChain,
            pfUnitType: PAF_PMLData.pfUnitType,
            pfInvertedA: PAF_PMLData.pfInvertedA,
            pfInvertedG: PAF_PMLData.pfInvertedG,
            pfInvertedH: PAF_PMLData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_PML"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_PML entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;