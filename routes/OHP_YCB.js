const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_YCB = require("../models/OHP_YCB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_YCBData, numRequested } = req.body;
        const order = new OHP_YCB({
            conveyorName: OHP_YCBData.conveyorName,
            chainSize: OHP_YCBData.chainSize,
            ...(OHP_YCBData.otherChainSize && { otherChainSize: OHP_YCBData.otherChainSize }),
            industrialChainManufacturer: OHP_YCBData.industrialChainManufacturer,
            ...(OHP_YCBData.otherChainManufacturer && { otherChainManufacturer: OHP_YCBData.otherChainManufacturer }),
            conveyorLength: OHP_YCBData.conveyorLength,
            conveyorLengthUnit: OHP_YCBData.conveyorLengthUnit,
            appEnviroment: OHP_YCBData.appEnviroment,
            ...(OHP_YCBData.ovenStatus && { ovenStatus: OHP_YCBData.ovenStatus }),
            ...(OHP_YCBData.ovenTemp && { ovenTemp: OHP_YCBData.ovenTemp }),
            ohpUnitType: OHP_YCBData.ohpUnitType,
            ohpHeight: OHP_YCBData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_YCB"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_YCB entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;