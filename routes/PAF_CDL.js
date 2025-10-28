const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_CDL = require("../models/PAF_CDL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_CDLData, numRequested } = req.body;
        const order = new PAF_CDL({
            conveyorName: PAF_CDLData.conveyorName,
            chainSize: PAF_CDLData.chainSize,
            ...(PAF_CDLData.otherChainSize && { otherChainSize: PAF_CDLData.otherChainSize }),
            industrialChainManufacturer: PAF_CDLData.industrialChainManufacturer,
            ...(PAF_CDLData.otherChainManufacturer && { otherChainManufacturer: PAF_CDLData.otherChainManufacturer }),
            conveyorLength: PAF_CDLData.conveyorLength,
            conveyorLengthUnit: PAF_CDLData.conveyorLengthUnit,
            appEnviroment: PAF_CDLData.appEnviroment,
            ...(PAF_CDLData.ovenStatus && { ovenStatus: PAF_CDLData.ovenStatus }),
            ...(PAF_CDLData.ovenTemp && { ovenTemp: PAF_CDLData.ovenTemp }),
            controlVoltSingle: PAF_CDLData.controlVoltSingle,
            lubeBrand: PAF_CDLData.lubeBrand,
            lubeType: PAF_CDLData.lubeType,
            lubeViscosity: PAF_CDLData.lubeViscosity,
            sideLubeStatus: PAF_CDLData.sideLubeStatus,
            topLubeStatus: PAF_CDLData.topLubeStatus,
            specialControllerOption: PAF_CDLData.specialControllerOption,
            specialControllerInfo: PAF_CDLData.specialControllerInfo,
            wireMeasurementUnitType: PAF_CDLData.wireMeasurementUnitType,
            twoConductor: PAF_CDLData.twoConductor,
            fourConductor: PAF_CDLData.fourConductor,
            sevenConductor: PAF_CDLData.sevenConductor,
            twelveConductor: PAF_CDLData.twelveConductor,
            junctionBoxNum: PAF_CDLData.junctionBoxNum
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_CDL"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_CDL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;