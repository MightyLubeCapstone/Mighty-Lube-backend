const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP8NP = require("../models/OHP_OP8NP");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP8NPData, numRequested } = req.body;
        const order = new OHP_OP8NP({
            conveyorName: OHP_OP8NPData.conveyorName,
            chainSize: OHP_OP8NPData.chainSize,
            ...(OHP_OP8NPData.otherChainSize && { otherChainSize: OHP_OP8NPData.otherChainSize }),
            industrialChainManufacturer: OHP_OP8NPData.industrialChainManufacturer,
            ...(OHP_OP8NPData.otherChainManufacturer && { otherChainManufacturer: OHP_OP8NPData.otherChainManufacturer }),
            conveyorLength: OHP_OP8NPData.conveyorLength,
            measurementUnit: OHP_OP8NPData.measurementUnit,
            appEnviroment: OHP_OP8NPData.appEnviroment,
            ...(OHP_OP8NPData.ovenStatus && { ovenStatus: OHP_OP8NPData.ovenStatus }),
            ...(OHP_OP8NPData.ovenTemp && { ovenTemp: OHP_OP8NPData.ovenTemp }),
            conveyorLoaded: OHP_OP8NPData.conveyorLoaded,
            ohpUnit: OHP_OP8NPData.ohpUnit,
            ...(OHP_OP8NPData.chainDrop && { chainDrop: OHP_OP8NPData.chainDrop }),
            ohpDiameter: OHP_OP8NPData.ohpDiameter,
            ohpWidth: OHP_OP8NPData.ohpWidth,
            ohpHeight: OHP_OP8NPData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP8NP"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP8NP entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;