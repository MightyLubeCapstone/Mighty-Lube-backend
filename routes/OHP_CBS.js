const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_CBS = require("../models/OHP_CBS");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_CBSData, numRequested } = req.body;
        const order = new OHP_CBS({
            conveyorName: OHP_CBSData.conveyorName,
            chainSize: OHP_CBSData.chainSize,
            ...(OHP_CBSData.otherChainSize && { otherChainSize: OHP_CBSData.otherChainSize }),
            industrialChainManufacturer: OHP_CBSData.industrialChainManufacturer,
            ...(OHP_CBSData.otherChainManufacturer && { otherChainManufacturer: OHP_CBSData.otherChainManufacturer }),
            conveyorLength: OHP_CBSData.conveyorLength,
            measurementUnit: OHP_CBSData.measurementUnit,
            appEnviroment: OHP_CBSData.appEnviroment,
            ...(OHP_CBSData.ovenStatus && { ovenStatus: OHP_CBSData.ovenStatus }),
            ...(OHP_CBSData.ovenTemp && { ovenTemp: OHP_CBSData.ovenTemp }),
            ohpUnit: OHP_CBSData.ohpUnit,
            ohpDiameter: OHP_CBSData.ohpDiameter,
            ohpHeight: OHP_CBSData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_CBS"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_CBS entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;