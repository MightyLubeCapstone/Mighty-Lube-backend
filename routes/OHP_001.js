const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_001 = require("../models/OHP_001");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {

        const { OHP_001Data, numRequested } = req.body;
        const order = new OHP_001({
            conveyorName: OHP_001Data.conveyorName,
            chainSize: OHP_001Data.chainSize,
            ...(OHP_001Data.otherChainSize && { otherChainSize: OHP_001Data.otherChainSize }),
            industrialChainManufacturer: OHP_001Data.industrialChainManufacturer,
            ...(OHP_001Data.otherChainManufacturer && { otherChainManufacturer: OHP_001Data.otherChainManufacturer }),
            railSize: OHP_001Data.railSize,
            ...(OHP_001Data.appEnviroment && { appEnviroment: OHP_001Data.appEnviroment }),
            ...(OHP_001Data.ovenStatus && { ovenStatus: OHP_001Data.ovenStatus }),
            ...(OHP_001Data.ovenTemp && { ovenTemp: OHP_001Data.ovenTemp }),
            ...(OHP_001Data.otherAppEnviroment && { otherAppEnviroment: OHP_001Data.otherAppEnviroment }),
            operatingVoltage: OHP_001Data.operatingVoltage,
            ...(OHP_001Data.surroundingTemp && { surroundingTemp: OHP_001Data.surroundingTemp }),
            ...(OHP_001Data.ohpUnit && { ohpUnit: OHP_001Data.ohpUnit }),
            ...(OHP_001Data.chainDrop && { chainDrop: OHP_001Data.chainDrop }),
            ohpDiameter: OHP_001Data.ohpDiameter,
            ohpWidth: OHP_001Data.ohpWidth,
            ohpHeight: OHP_001Data.ohpHeight,
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_001"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_001 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;