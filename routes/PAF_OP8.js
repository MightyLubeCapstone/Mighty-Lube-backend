const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_OP8 = require("../models/PAF_OP8");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_OP8Data, numRequested } = req.body;
        const order = new PAF_OP8({
            conveyorName: PAF_OP8Data.conveyorName,
            chainSize: PAF_OP8Data.chainSize,
            ...(PAF_OP8Data.otherChainSize && { otherChainSize: PAF_OP8Data.otherChainSize }),
            industrialChainManufacturer: PAF_OP8Data.industrialChainManufacturer,
            ...(PAF_OP8Data.otherChainManufacturer && { otherChainManufacturer: PAF_OP8Data.otherChainManufacturer }),
            conveyorLength: PAF_OP8Data.conveyorLength,
            conveyorLengthUnit: PAF_OP8Data.conveyorLengthUnit,
            travelDirection: PAF_OP8Data.travelDirection,
            appEnviroment: PAF_OP8Data.appEnviroment,
            ...(PAF_OP8Data.ovenStatus && { ovenStatus: PAF_OP8Data.ovenStatus }),
            ...(PAF_OP8Data.ovenTemp && { ovenTemp: PAF_OP8Data.ovenTemp }),
            ...(PAF_OP8Data.monitorData && { monitorData: PAF_OP8Data.monitorData }),
            orientationType: PAF_OP8Data.orientationType,
            operatingVoltTriple: PAF_OP8Data.operatingVoltTriple,
            controlVoltSingle: PAF_OP8Data.controlVoltSingle,
            opPowerStatus: PAF_OP8Data.opPowerStatus,
            brushMaterialType: PAF_OP8Data.brushMaterialType,
            clearanceStatus: PAF_OP8Data.clearanceStatus,
            washStatus: PAF_OP8Data.washStatus,
            foodIndustryStatus: PAF_OP8Data.foodIndustryStatus,
            powerPanelType: PAF_OP8Data.powerPanelType,
            threeStationType: PAF_OP8Data.threeStationType,
            shroudType: PAF_OP8Data.shroudType,
            additionalInfo: PAF_OP8Data.additionalInfo,
            pfUnitType: PAF_OP8Data.pfUnitType,
            pfOverheadL: PAF_OP8Data.pfOverheadL,
            pfOverheadG: PAF_OP8Data.pfOverheadG,
            pfOverheadH: PAF_OP8Data.pfOverheadH,
            pfInvertedA: PAF_OP8Data.pfInvertedA,
            pfInvertedG: PAF_OP8Data.pfInvertedG,
            pfInvertedH: PAF_OP8Data.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_OP8"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_OP8 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;