const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const CCO_OEB = require("../models/CCO_OEB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { CCO_OEBData, numRequested } = req.body;
        const order = new CCO_OEB({
            conveyorName: CCO_OEBData.conveyorName,
            chainSize: CCO_OEBData.chainSize,
            ...(CCO_OEBData.otherChainSize && { otherChainSize: CCO_OEBData.otherChainSize }),
            industrialChainManufacturer: CCO_OEBData.industrialChainManufacturer,
            ...(CCO_OEBData.otherChainManufacturer && { otherChainManufacturer: CCO_OEBData.otherChainManufacturer }),
            ...(CCO_OEBData.appEnviroment && { appEnviroment: CCO_OEBData.appEnviroment }),
            ...(CCO_OEBData.ovenStatus && { ovenStatus: CCO_OEBData.ovenStatus }),
            ...(CCO_OEBData.ovenTemp && { ovenTemp: CCO_OEBData.ovenTemp }),
            ...(CCO_OEBData.otherAppEnviroment && { otherAppEnviroment: CCO_OEBData.otherAppEnviroment }),
            ...(CCO_OEBData.surroundingTemp && { surroundingTemp: CCO_OEBData.surroundingTemp }),
            ...(CCO_OEBData.ohpUnitType && { ohpUnitType: CCO_OEBData.ohpUnitType }),
            chainDrop: CCO_OEBData.chainDrop,
            ...(CCO_OEBData.ohpDiameter && { ohpDiameter: CCO_OEBData.ohpDiameter }),
            ...(CCO_OEBData.ohpWidth && { ohpWidth: CCO_OEBData.ohpWidth }),
            ...(CCO_OEBData.ohpHeight && { ohpHeight: CCO_OEBData.ohpHeight }),

        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "CCO_OEB"
        });
        await req.user.save();
        return res.status(200).json({ message: "CCO_OEB entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;