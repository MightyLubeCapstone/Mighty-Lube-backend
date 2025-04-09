const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_MLP = require("../models/PAF_MLP");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_MLPData, numRequested } = req.body;
        const order = new PAF_MLP({
            conveyorName: PAF_MLPData.conveyorName,
            chainSize: PAF_MLPData.chainSize,
            ...(PAF_MLPData.otherChainSize && { otherChainSize: PAF_MLPData.otherChainSize }),
            industrialChainManufacturer: PAF_MLPData.industrialChainManufacturer,
            ...(PAF_MLPData.otherChainManufacturer && { otherChainManufacturer: PAF_MLPData.otherChainManufacturer }),
            conveyorLength: PAF_MLPData.conveyorLength,
            conveyorLengthUnit: PAF_MLPData.conveyorLengthUnit,
            conveyorSpeed: PAF_MLPData.conveyorSpeed,
            conveyorSpeedUnit: PAF_MLPData.conveyorSpeedUnit,
            appEnviroment: PAF_MLPData.appEnviroment,
            ...(PAF_MLPData.ovenStatus && { ovenStatus: PAF_MLPData.ovenStatus }),
            ...(PAF_MLPData.ovenTemp && { ovenTemp: PAF_MLPData.ovenTemp }),
            surroundingTemp: PAF_MLPData.surroundingTemp,
            conveyorLoaded: PAF_MLPData.conveyorLoaded,
            conveyorSwing: PAF_MLPData.conveyorSwing,
            orientationType: PAF_MLPData.orientationType,
            operatingVoltSingle: PAF_MLPData.operatingVoltSingle,
            controlVoltSingle: PAF_MLPData.controlVoltSingle,
            ...(PAF_MLPData.monitorData && { monitorData: PAF_MLPData.monitorData }),
            wheelOpenType: PAF_MLPData.wheelOpenType,
            wheelClosedType: PAF_MLPData.wheelClosedType,
            powerChainStatus: PAF_MLPData.powerChainStatus,
            chainPinStatus: PAF_MLPData.chainPinStatus,
            catDriveStatus: PAF_MLPData.catDriveStatus,
            catDriveNum: PAF_MLPData.catDriveNum,
            railLubeStatus: PAF_MLPData.railLubeStatus,
            externalLubeStatus: PAF_MLPData.externalLubeStatus,
            lubeBrand: PAF_MLPData.lubeBrand,
            lubeType: PAF_MLPData.lubeType,
            lubeViscosity: PAF_MLPData.lubeViscosity,
            sideLubeStatus: PAF_MLPData.sideLubeStatus,
            topLubeStatus: PAF_MLPData.topLubeStatus,
            chainCleanStatus: PAF_MLPData.chainCleanStatus,
            pfUnitType: PAF_MLPData.pfUnitType,
            pfOverheadL: PAF_MLPData.pfOverheadL,
            pfOverheadG: PAF_MLPData.pfOverheadG,
            pfOverheadH: PAF_MLPData.pfOverheadH,
            pfInvertedB: PAF_MLPData.pfInvertedB,
            pfInvertedG: PAF_MLPData.pfInvertedG,
            pfInvertedH: PAF_MLPData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_MLP"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_MLP entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;