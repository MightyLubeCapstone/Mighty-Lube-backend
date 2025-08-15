const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const COE_CDL = require("../models/COE_CDL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for COE_CDL form
    try {
        const { COE_CDLData, numRequested } = req.body;
        const order = new COE_CDL({
            ...(COE_CDLData.conveyorName && { conveyorName: COE_CDLData.conveyorName }),
            ...(COE_CDLData.chainSize && { chainSize: COE_CDLData.chainSize }),
            ...(COE_CDLData.otherChainSize && { otherChainSize: COE_CDLData.otherChainSize }),
            ...(COE_CDLData.appEnviroment && { appEnviroment: COE_CDLData.appEnviroment }),
            ...(COE_CDLData.ovenStatus && { ovenStatus: COE_CDLData.ovenStatus }),
            ...(COE_CDLData.ovenTemp && { ovenTemp: COE_CDLData.ovenTemp }),
            ...(COE_CDLData.otherAppEnviroment && { otherAppEnviroment: COE_CDLData.otherAppEnviroment }),
            ...(COE_CDLData.controlVoltSingle && { controlVoltSingle: COE_CDLData.controlVoltSingle }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "COE_CDL" });
        await req.user.save();

        return res.status(200).json({ message: "COE_CDL entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;