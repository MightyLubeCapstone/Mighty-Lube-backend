const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_CDL = require("../models/OHP_CDL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_CDLData, numRequested } = req.body;
        const order = new OHP_CDL({
            conveyorName: OHP_CDLData.conveyorName,
            chainSize: OHP_CDLData.chainSize,
            ...(OHP_CDLData.otherChainSize && { otherChainSize: OHP_CDLData.otherChainSize }),
            industrialChainManufacturer: OHP_CDLData.industrialChainManufacturer,
            ...(OHP_CDLData.otherChainManufacturer && { otherChainManufacturer: OHP_CDLData.otherChainManufacturer }),
            conveyorLength: OHP_CDLData.conveyorLength,
            conveyorLengthUnit: OHP_CDLData.conveyorLengthUnit,
            appEnviroment: OHP_CDLData.appEnviroment,
            ...(OHP_CDLData.ovenStatus && { ovenStatus: OHP_CDLData.ovenStatus }),
            ...(OHP_CDLData.ovenTemp && { ovenTemp: OHP_CDLData.ovenTemp }),
            controlVoltSingle: OHP_CDLData.controlVoltSingle,
            lubeBrand: OHP_CDLData.lubeBrand,
            lubeType: OHP_CDLData.lubeType,
            lubeViscosity: OHP_CDLData.lubeViscosity,
            sideLubeStatus: OHP_CDLData.sideLubeStatus,
            topLubeStatus: OHP_CDLData.topLubeStatus,
            specialControllerOption: OHP_CDLData.specialControllerOption,
            specialControllerInfo: OHP_CDLData.specialControllerInfo,
            wireMeasurementUnit: OHP_CDLData.wireMeasurementUnit,
            twoConductor: OHP_CDLData.twoConductor,
            fourConductor: OHP_CDLData.fourConductor,
            sevenConductor: OHP_CDLData.sevenConductor,
            twelveConductor: OHP_CDLData.twelveConductor,
            junctionBoxNum: OHP_CDLData.junctionBoxNum
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_CDL"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_CDL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;