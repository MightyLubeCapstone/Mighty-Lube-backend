const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000I = require("../models/PAF_9000I");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_9000IData, numRequested } = req.body;
        const order = new PAF_9000I({
            conveyorName: PAF_9000IData.conveyorName,
            chainSize: PAF_9000IData.chainSize,
            ...(PAF_9000IData.otherChainSize && { otherChainSize: PAF_9000IData.otherChainSize }),
            industrialChainManufacturer: PAF_9000IData.industrialChainManufacturer,
            ...(PAF_9000IData.otherChainManufacturer && { otherChainManufacturer: PAF_9000IData.otherChainManufacturer }),
            conveyorLength: PAF_9000IData.conveyorLength,
            conveyorLengthUnit: PAF_9000IData.conveyorLengthUnit,
            conveyorSpeed: PAF_9000IData.conveyorSpeed,
            conveyorSpeedUnit: PAF_9000IData.conveyorSpeedUnit,
            conveyorIndex: PAF_9000IData.conveyorIndex,
            travelDirection: PAF_9000IData.travelDirection,
            appEnviroment: PAF_9000IData.appEnviroment,
            ...(PAF_9000IData.ovenStatus && { ovenStatus: PAF_9000IData.ovenStatus }),
            ...(PAF_9000IData.ovenTemp && { ovenTemp: PAF_9000IData.ovenTemp }),
            surroundingTemp: PAF_9000IData.surroundingTemp,
            conveyorLoaded: PAF_9000IData.conveyorLoaded,
            conveyorSwing: PAF_9000IData.conveyorSwing,
            plantLayout: PAF_9000IData.plantLayout,
            operatingVoltSingle: PAF_9000IData.operatingVoltSingle,
            controlVoltSingle: PAF_9000IData.controlVoltSingle,
            ...(PAF_9000IData.monitorData && { monitorData: PAF_9000IData.monitorData }),
            wheelOpenType: PAF_9000IData.wheelOpenType,
            wheelClosedType: PAF_9000IData.wheelClosedType,
            powerChainStatus: PAF_9000IData.powerChainStatus,
            chainPinStatus: PAF_9000IData.chainPinStatus,
            catDriveStatus: PAF_9000IData.catDriveStatus,
            catDriveNum: PAF_9000IData.catDriveNum,
            railLubeStatus: PAF_9000IData.railLubeStatus,
            externalLubeStatus: PAF_9000IData.externalLubeStatus,
            lubeBrand: PAF_9000IData.lubeBrand,
            lubeType: PAF_9000IData.lubeType,
            lubeViscosity: PAF_9000IData.lubeViscosity,
            sideLubeStatus: PAF_9000IData.sideLubeStatus,
            topLubeStatus: PAF_9000IData.topLubeStatus,
            chainCleanStatus: PAF_9000IData.chainCleanStatus,
            wireMeasurementUnitType: PAF_9000IData.wireMeasurementUnitType,
            twoConductor: PAF_9000IData.twoConductor,
            fourConductor: PAF_9000IData.fourConductor,
            sevenConductor: PAF_9000IData.sevenConductor,
            twelveConductor: PAF_9000IData.twelveConductor,
            junctionBoxNum: PAF_9000IData.junctionBoxNum,
            pfUnitType: PAF_9000IData.pfUnitType,
            pfOverheadL: PAF_9000IData.pfOverheadL,
            pfOverheadG: PAF_9000IData.pfOverheadG,
            pfOverheadH: PAF_9000IData.pfOverheadH,
            pfInvertedB: PAF_9000IData.pfInvertedB,
            pfInvertedG: PAF_9000IData.pfInvertedG,
            pfInvertedH: PAF_9000IData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_9000I"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_9000I entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;