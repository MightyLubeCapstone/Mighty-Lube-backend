const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_9000PF = require("../models/PAF_9000PF");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_9000PFData, numRequested } = req.body;
        const order = new PAF_9000PF({
            conveyorName: PAF_9000PFData.conveyorName,
            chainSize: PAF_9000PFData.chainSize,
            ...(PAF_9000PFData.otherChainSize && { otherChainSize: PAF_9000PFData.otherChainSize }),
            industrialChainManufacturer: PAF_9000PFData.industrialChainManufacturer,
            ...(PAF_9000PFData.otherChainManufacturer && { otherChainManufacturer: PAF_9000PFData.otherChainManufacturer }),
            conveyorLength: PAF_9000PFData.conveyorLength,
            conveyorLengthUnit: PAF_9000PFData.conveyorLengthUnit,
            conveyorSpeed: PAF_9000PFData.conveyorSpeed,
            conveyorSpeedUnit: PAF_9000PFData.conveyorSpeedUnit,
            conveyorIndex: PAF_9000PFData.conveyorIndex,
            travelDirection: PAF_9000PFData.travelDirection,
            appEnviroment: PAF_9000PFData.appEnviroment,
            ...(PAF_9000PFData.ovenStatus && { ovenStatus: PAF_9000PFData.ovenStatus }),
            ...(PAF_9000PFData.ovenTemp && { ovenTemp: PAF_9000PFData.ovenTemp }),
            surroundingTemp: PAF_9000PFData.surroundingTemp,
            conveyorLoaded: PAF_9000PFData.conveyorLoaded,
            conveyorSwing: PAF_9000PFData.conveyorSwing,
            plantLayout: PAF_9000PFData.plantLayout,
            operatingVoltSingle: PAF_9000PFData.operatingVoltSingle,
            controlVoltSingle: PAF_9000PFData.controlVoltSingle,
            ...(PAF_9000PFData.monitorData && { monitorData: PAF_9000PFData.monitorData }),
            wheelOpenType: PAF_9000PFData.wheelOpenType,
            wheelClosedType: PAF_9000PFData.wheelClosedType,
            powerChainStatus: PAF_9000PFData.powerChainStatus,
            chainPinStatus: PAF_9000PFData.chainPinStatus,
            catDriveStatus: PAF_9000PFData.catDriveStatus,
            catDriveNum: PAF_9000PFData.catDriveNum,
            railLubeStatus: PAF_9000PFData.railLubeStatus,
            externalLubeStatus: PAF_9000PFData.externalLubeStatus,
            lubeBrand: PAF_9000PFData.lubeBrand,
            lubeType: PAF_9000PFData.lubeType,
            lubeViscosity: PAF_9000PFData.lubeViscosity,
            sideLubeStatus: PAF_9000PFData.sideLubeStatus,
            topLubeStatus: PAF_9000PFData.topLubeStatus,
            chainCleanStatus: PAF_9000PFData.chainCleanStatus,
            wireMeasurementUnitType: PAF_9000PFData.wireMeasurementUnitType,
            twoConductor: PAF_9000PFData.twoConductor,
            fourConductor: PAF_9000PFData.fourConductor,
            sevenConductor: PAF_9000PFData.sevenConductor,
            twelveConductor: PAF_9000PFData.twelveConductor,
            junctionBoxNum: PAF_9000PFData.junctionBoxNum,
            pfUnitType: PAF_9000PFData.pfUnitType,
            pfOverheadL: PAF_9000PFData.pfOverheadL,
            pfOverheadG: PAF_9000PFData.pfOverheadG,
            pfOverheadH: PAF_9000PFData.pfOverheadH,
            pfInvertedA: PAF_9000PFData.pfInvertedA,
            pfInvertedB: PAF_9000PFData.pfInvertedB,
            pfInvertedG: PAF_9000PFData.pfInvertedG,
            pfInvertedH: PAF_9000PFData.pfInvertedH,
            pfInvertedK2: PAF_9000PFData.pfInvertedK2,
            pfInvertedL2: PAF_9000PFData.pfInvertedL2,
            pfInvertedM2: PAF_9000PFData.pfInvertedM2,
            pfInvertedN2: PAF_9000PFData.pfInvertedN2
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_9000PF"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_9000PF entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;