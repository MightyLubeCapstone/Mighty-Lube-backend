const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_PML = require("../models/OHP_PML");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_PMLData, numRequested } = req.body;
        const order = new OHP_PML({
            conveyorName: OHP_PMLData.conveyorName,
            chainSize: OHP_PMLData.chainSize,
            ...(OHP_PMLData.otherChainSize && { otherChainSize: OHP_PMLData.otherChainSize }),
            industrialChainManufacturer: OHP_PMLData.industrialChainManufacturer,
            ...(OHP_PMLData.otherChainManufacturer && { otherChainManufacturer: OHP_PMLData.otherChainManufacturer }),
            conveyorLength: OHP_PMLData.conveyorLength,
            conveyorLengthUnit: OHP_PMLData.conveyorLengthUnit,
            conveyorSpeed: OHP_PMLData.conveyorSpeed,
            conveyorSpeedUnit: OHP_PMLData.conveyorSpeedUnit,
            conveyorIndex: OHP_PMLData.conveyorIndex,
            travelDirection: OHP_PMLData.travelDirection,
            appEnviroment: OHP_PMLData.appEnviroment,
            ...(OHP_PMLData.ovenStatus && { ovenStatus: OHP_PMLData.ovenStatus }),
            ...(OHP_PMLData.ovenTemp && { ovenTemp: OHP_PMLData.ovenTemp }),
            ...(OHP_PMLData.otherAppEnviroment && { otherAppEnviroment: OHP_PMLData.otherAppEnviroment }),
            surroundingTemp: OHP_PMLData.surroundingTemp,
            conveyorLoaded: OHP_PMLData.conveyorLoaded,
            conveyorSwing: OHP_PMLData.conveyorSwing,
            orientationType: OHP_PMLData.orientationType,
            paintMakerStatus: OHP_PMLData.paintMakerStatus,
            ...(OHP_PMLData.paintMarketNum && { paintMarketNum: OHP_PMLData.paintMarketNum }),
            chainCleanStatus: OHP_PMLData.chainCleanStatus,
            ohpUnitType: OHP_PMLData.ohpUnitType,
            chainDrop: OHP_PMLData.chainDrop,
            ...(OHP_PMLData.ohpDiameter && { ohpDiameter: OHP_PMLData.ohpDiameter }),
            ohpWidth: OHP_PMLData.ohpWidth,
            ohpHeight: OHP_PMLData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_PML"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_PML entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;