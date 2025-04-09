const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OEB = require("../models/OHP_OEB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OEBData, numRequested } = req.body;
        const order = new OHP_OEB({
            conveyorName: OHP_OEBData.conveyorName,
            chainSize: OHP_OEBData.chainSize,
            ...(OHP_OEBData.otherChainSize && { otherChainSize: OHP_OEBData.otherChainSize }),
            industrialChainManufacturer: OHP_OEBData.industrialChainManufacturer,
            ...(OHP_OEBData.otherChainManufacturer && { otherChainManufacturer: OHP_OEBData.otherChainManufacturer }),
            conveyorLength: OHP_OEBData.conveyorLength,
            conveyorLengthUnit: OHP_OEBData.conveyorLengthUnit,
            appEnviroment: OHP_OEBData.appEnviroment,
            ...(OHP_OEBData.ovenStatus && { ovenStatus: OHP_OEBData.ovenStatus }),
            ...(OHP_OEBData.ovenTemp && { ovenTemp: OHP_OEBData.ovenTemp }),
            surroundingTemp: OHP_OEBData.surroundingTemp,
            ohpUnitType: OHP_OEBData.ohpUnitType,
            chainDrop: OHP_OEBData.chainDrop,
            ohpDiameter: OHP_OEBData.ohpDiameter,
            ohpWidth: OHP_OEBData.ohpWidth,
            ohpHeight: OHP_OEBData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OEB"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OEB entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;