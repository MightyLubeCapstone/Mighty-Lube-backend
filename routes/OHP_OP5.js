const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP5 = require("../models/OHP_OP5");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP5Data, numRequested } = req.body;
        const order = new OHP_OP5({
            conveyorName: OHP_OP5Data.conveyorName,
            chainSize: OHP_OP5Data.chainSize,
            ...(OHP_OP5Data.otherChainSize && { otherChainSize: OHP_OP5Data.otherChainSize }),
            industrialChainManufacturer: OHP_OP5Data.industrialChainManufacturer,
            ...(OHP_OP5Data.otherChainManufacturer && { otherChainManufacturer: OHP_OP5Data.otherChainManufacturer }),
            conveyorLength: OHP_OP5Data.conveyorLength,
            conveyorLengthUnit: OHP_OP5Data.conveyorLengthUnit,
            appEnviroment: OHP_OP5Data.appEnviroment,
            ...(OHP_OP5Data.ovenStatus && { ovenStatus: OHP_OP5Data.ovenStatus }),
            ...(OHP_OP5Data.ovenTemp && { ovenTemp: OHP_OP5Data.ovenTemp }),
            lubeBrand: OHP_OP5Data.lubeBrand,
            lubeType: OHP_OP5Data.lubeType,
            lubeViscosity: OHP_OP5Data.lubeViscosity,
            sideLubeStatus: OHP_OP5Data.sideLubeStatus,
            topLubeStatus: OHP_OP5Data.topLubeStatus,
            chainMaster: OHP_OP5Data.chainMaster,
            ...(OHP_OP5Data.timerStatus && { timerStatus: OHP_OP5Data.timerStatus }),
            electricStatus: OHP_OP5Data.electricStatus,
            plcConnection: OHP_OP5Data.plcConnection,
            otherControllerNotes: OHP_OP5Data.otherControllerNotes,
            specialControllerOption: OHP_OP5Data.specialControllerOption,
            specialControllerInfo: OHP_OP5Data.specialControllerInfo
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP5"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP5 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;