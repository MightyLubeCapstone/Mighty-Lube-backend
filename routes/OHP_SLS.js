const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_SLS = require("../models/OHP_SLS");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_SLSData, numRequested } = req.body;
        const order = new OHP_SLS({
            conveyorName: OHP_SLSData.conveyorName,
            chainSize: OHP_SLSData.chainSize,
            ...(OHP_SLSData.otherChainSize && { otherChainSize: OHP_SLSData.otherChainSize }),
            industrialChainManufacturer: OHP_SLSData.industrialChainManufacturer,
            ...(OHP_SLSData.otherChainManufacturer && { otherChainManufacturer: OHP_SLSData.otherChainManufacturer }),
            conveyorLength: OHP_SLSData.conveyorLength,
            conveyorLengthUnit: OHP_SLSData.conveyorLengthUnit,
            conveyorSpeed: OHP_SLSData.conveyorSpeed,
            conveyorSpeedUnit: OHP_SLSData.conveyorSpeedUnit,
            conveyorIndex: OHP_SLSData.conveyorIndex,
            travelDirection: OHP_SLSData.travelDirection,
            appEnviroment: OHP_SLSData.appEnviroment,
            ...(OHP_SLSData.ovenStatus && { ovenStatus: OHP_SLSData.ovenStatus }),
            ...(OHP_SLSData.ovenTemp && { ovenTemp: OHP_SLSData.ovenTemp }),
            surroundingTemp: OHP_SLSData.surroundingTemp,
            conveyorLoaded: OHP_SLSData.conveyorLoaded,
            conveyorSwing: OHP_SLSData.conveyorSwing,
            operatingVoltSingle: OHP_SLSData.operatingVoltSingle,
            controlVoltSingle: OHP_SLSData.controlVoltSingle,
            paintMakerStatus: OHP_SLSData.paintMakerStatus,
            paintMarketNum: OHP_SLSData.paintMarketNum,
            chainCleanStatus: OHP_SLSData.chainCleanStatus,
            ohpUnitType: OHP_SLSData.ohpUnitType,
            chainDrop: OHP_SLSData.chainDrop,
            ohpDiameter: OHP_SLSData.ohpDiameter,
            ohpWidth: OHP_SLSData.ohpWidth,
            ohpHeight: OHP_SLSData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_SLS"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_SLS entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;