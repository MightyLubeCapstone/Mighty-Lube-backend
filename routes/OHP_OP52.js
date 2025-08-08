const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP52 = require("../models/OHP_OP52");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP52Data, numRequested } = req.body;
        const order = new OHP_OP52({
            conveyorName: OHP_OP52Data.conveyorName,
            chainSize: OHP_OP52Data.chainSize,
            ...(OHP_OP52Data.otherChainSize && { otherChainSize: OHP_OP52Data.otherChainSize }),
            industrialChainManufacturer: OHP_OP52Data.industrialChainManufacturer,
            ...(OHP_OP52Data.otherChainManufacturer && { otherChainManufacturer: OHP_OP52Data.otherChainManufacturer }),
            wheelManufacturer: OHP_OP52Data.wheelManufacturer,
            ...(OHP_OP52Data.otherWheelManufacturer && { otherWheelManufacturer: OHP_OP52Data.otherWheelManufacturer }),
            conveyorLength: OHP_OP52Data.conveyorLength,
            ...(OHP_OP52Data.conveyorLengthUnit && { conveyorLengthUnit: OHP_OP52Data.conveyorLengthUnit }),
            ...(OHP_OP52Data.appEnviroment && { appEnviroment: OHP_OP52Data.appEnviroment }),
            ...(OHP_OP52Data.ovenStatus && { ovenStatus: OHP_OP52Data.ovenStatus }),
            ...(OHP_OP52Data.ovenTemp && { ovenTemp: OHP_OP52Data.ovenTemp }),
            ...(OHP_OP52Data.otherAppEnviroment && { otherAppEnviroment: OHP_OP52Data.otherAppEnviroment }),
            brushApplicators: OHP_OP52Data.brushApplicators,
            m12Plugs: OHP_OP52Data.m12Plugs,
            oilBackupCat: OHP_OP52Data.oilBackupCat,
           ...(OHP_OP52Data.controlVoltSingle && { controlVoltSingle: OHP_OP52Data.controlVoltSingle }),
            ...(OHP_OP52Data.lubeBrand && { lubeBrand: OHP_OP52Data.lubeBrand }),
            ...(OHP_OP52Data.lubeType && { lubeType: OHP_OP52Data.lubeType }),
            ...(OHP_OP52Data.lubeViscosity && { lubeViscosity: OHP_OP52Data.lubeViscosity }),
            ...(OHP_OP52Data.sideLubeStatus && { sideLubeStatus: OHP_OP52Data.sideLubeStatus }),
            ...(OHP_OP52Data.topLubeStatus && { topLubeStatus: OHP_OP52Data.topLubeStatus }),
            ...(OHP_OP52Data.chainMaster && { chainMaster: OHP_OP52Data.chainMaster }),
            ...(OHP_OP52Data.timerStatus && { timerStatus: OHP_OP52Data.timerStatus }),
            ...(OHP_OP52Data.electricStatus && { electricStatus: OHP_OP52Data.electricStatus }),
            ...(OHP_OP52Data.plcConnection && { plcConnection: OHP_OP52Data.plcConnection }),
            ...(OHP_OP52Data.otherControllerNotes && { otherControllerNotes: OHP_OP52Data.otherControllerNotes }),
            ...(OHP_OP52Data.specialControllerOption && { specialControllerOption: OHP_OP52Data.specialControllerOption }),
            ...(OHP_OP52Data.specialControllerInfo && { specialControllerInfo: OHP_OP52Data.specialControllerInfo }),
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP52"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP52 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;