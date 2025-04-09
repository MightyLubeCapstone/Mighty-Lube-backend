const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP8 = require("../models/OHP_OP8");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP8Data, numRequested } = req.body;
        const order = new OHP_OP8({
            conveyorName: OHP_OP8Data.conveyorName,
            chainSize: OHP_OP8Data.chainSize,
            ...(OHP_OP8Data.otherChainSize && { otherChainSize: OHP_OP8Data.otherChainSize }),
            industrialChainManufacturer: OHP_OP8Data.industrialChainManufacturer,
            ...(OHP_OP8Data.otherChainManufacturer && { otherChainManufacturer: OHP_OP8Data.otherChainManufacturer }),
            conveyorLength: OHP_OP8Data.conveyorLength,
            measurementUnit: OHP_OP8Data.measurementUnit,
            travelDirection: OHP_OP8Data.travelDirection,
            appEnviroment: OHP_OP8Data.appEnviroment,
            ...(OHP_OP8Data.ovenStatus && { ovenStatus: OHP_OP8Data.ovenStatus }),
            ...(OHP_OP8Data.ovenTemp && { ovenTemp: OHP_OP8Data.ovenTemp }),
            surroundingTemp: OHP_OP8Data.surroundingTemp,
            conveyorLoaded: OHP_OP8Data.conveyorLoaded,
            operatingVoltTriple: OHP_OP8Data.operatingVoltTriple,
            controlVoltSingle: OHP_OP8Data.controlVoltSingle,
            opPowerStatus: OHP_OP8Data.opPowerStatus,
            brushMaterialType: OHP_OP8Data.brushMaterialType,
            clearanceStatus: OHP_OP8Data.clearanceStatus,
            washStatus: OHP_OP8Data.washStatus,
            foodIndustryStatus: OHP_OP8Data.foodIndustryStatus,
            powerPanelType: OHP_OP8Data.powerPanelType,
            threeStationType: OHP_OP8Data.threeStationType,
            shroudType: OHP_OP8Data.shroudType,
            ...(OHP_OP8Data.additionalInfo && { additionalInfo: OHP_OP8Data.additionalInfo }),
            ohpUnit: OHP_OP8Data.ohpUnit,
            ...(OHP_OP8Data.chainDrop && { chainDrop: OHP_OP8Data.chainDrop }),
            ohpDiameter: OHP_OP8Data.ohpDiameter,
            ohpWidth: OHP_OP8Data.ohpWidth,
            ohpHeight: OHP_OP8Data.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP8"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP8 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;