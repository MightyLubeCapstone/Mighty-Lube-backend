const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000E = require("../models/PAF_9000E");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_9000EData, numRequested } = req.body;
        const order = new PAF_9000E({
            conveyorName: PAF_9000EData.conveyorName,
            chainSize: PAF_9000EData.chainSize,
            ...(PAF_9000EData.otherChainSize && { otherChainSize: PAF_9000EData.otherChainSize }),
            industrialChainManufacturer: PAF_9000EData.industrialChainManufacturer,
            ...(PAF_9000EData.otherChainManufacturer && { otherChainManufacturer: PAF_9000EData.otherChainManufacturer }),
            conveyorLength: PAF_9000EData.conveyorLength,
            conveyorLengthUnit: PAF_9000EData.conveyorLengthUnit,
            conveyorSpeed: PAF_9000EData.conveyorSpeed,
            conveyorSpeedUnit: PAF_9000EData.conveyorSpeedUnit,
            conveyorIndex: PAF_9000EData.conveyorIndex,
            travelDirection: PAF_9000EData.travelDirection,
            appEnviroment: PAF_9000EData.appEnviroment,
            ...(PAF_9000EData.ovenStatus && { ovenStatus: PAF_9000EData.ovenStatus }),
            ...(PAF_9000EData.ovenTemp && { ovenTemp: PAF_9000EData.ovenTemp }),
            surroundingTemp: PAF_9000EData.surroundingTemp,
            conveyorLoaded: PAF_9000EData.conveyorLoaded,
            conveyorSwing: PAF_9000EData.conveyorSwing,
            plantLayout: PAF_9000EData.plantLayout,
            operatingVoltSingle: PAF_9000EData.operatingVoltSingle,
            controlVoltSingle: PAF_9000EData.controlVoltSingle,
            ...(PAF_9000EData.monitorData && { monitorData: PAF_9000EData.monitorData }),
            wheelOpenType: PAF_9000EData.wheelOpenType,
            wheelClosedType: PAF_9000EData.wheelClosedType,
            powerChainStatus: PAF_9000EData.powerChainStatus,
            chainPinStatus: PAF_9000EData.chainPinStatus,
            catDriveStatus: PAF_9000EData.catDriveStatus,
            catDriveNum: PAF_9000EData.catDriveNum,
            railLubeStatus: PAF_9000EData.railLubeStatus,
            externalLubeStatus: PAF_9000EData.externalLubeStatus,
            lubeBrand: PAF_9000EData.lubeBrand,
            lubeType: PAF_9000EData.lubeType,
            lubeViscosity: PAF_9000EData.lubeViscosity,
            sideLubeStatus: PAF_9000EData.sideLubeStatus,
            topLubeStatus: PAF_9000EData.topLubeStatus,
            chainCleanStatus: PAF_9000EData.chainCleanStatus,
            wireMeasurementUnitType: PAF_9000EData.wireMeasurementUnitType,
            twoConductor: PAF_9000EData.twoConductor,
            fourConductor: PAF_9000EData.fourConductor,
            sevenConductor: PAF_9000EData.sevenConductor,
            twelveConductor: PAF_9000EData.twelveConductor,
            junctionBoxNum: PAF_9000EData.junctionBoxNum,
            pfUnitType: PAF_9000EData.pfUnitType,
            pfOverheadL: PAF_9000EData.pfOverheadL,
            pfOverheadG: PAF_9000EData.pfOverheadG,
            pfOverheadH: PAF_9000EData.pfOverheadH,
            pfInvertedB: PAF_9000EData.pfInvertedB,
            pfInvertedG: PAF_9000EData.pfInvertedG,
            pfInvertedH: PAF_9000EData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_9000E"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_9000E entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;