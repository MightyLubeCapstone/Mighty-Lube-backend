const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_001 = require("../models/PAF_001");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_001Data, numRequested } = req.body;
        const order = new PAF_001({
            conveyorName: PAF_001Data.conveyorName,
            chainSize: PAF_001Data.chainSize,
            ...(PAF_001Data.otherChainSize && { otherChainSize: PAF_001Data.otherChainSize }),
            industrialChainManufacturer: PAF_001Data.industrialChainManufacturer,
            ...(PAF_001Data.otherChainManufacturer && { otherChainManufacturer: PAF_001Data.otherChainManufacturer }),
            conveyorLength: PAF_001Data.conveyorLength,
            conveyorLengthUnit: PAF_001Data.conveyorLengthUnit,
            conveyorSpeed: PAF_001Data.conveyorSpeed,
            conveyorSpeedUnit: PAF_001Data.conveyorSpeedUnit,
            appEnviroment: PAF_001Data.appEnviroment,
            ...(PAF_001Data.ovenStatus && { ovenStatus: PAF_001Data.ovenStatus }),
            ...(PAF_001Data.ovenTemp && { ovenTemp: PAF_001Data.ovenTemp }),
            orientationType: PAF_001Data.orientationType
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_001"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_001 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;