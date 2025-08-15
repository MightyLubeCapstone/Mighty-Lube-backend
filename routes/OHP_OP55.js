const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP55 = require("../models/OHP_OP55");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP55Data, numRequested } = req.body;
        const order = new OHP_OP55({
            
            conveyorName: OHP_OP55Data.conveyorName,
            chainSize: OHP_OP55Data.chainSize,
            ...(OHP_OP55Data.otherChainSize && { otherChainSize: OHP_OP55Data.otherChainSize }),
            industrialChainManufacturer: OHP_OP55Data.industrialChainManufacturer,
            ...(OHP_OP55Data.otherChainManufacturer && { otherChainManufacturer: OHP_OP55Data.otherChainManufacturer }),
            ...(OHP_OP55Data.conveyorLength && { conveyorLength: OHP_OP55Data.conveyorLength }),
            ...(OHP_OP55Data.conveyorLengthUnit && { conveyorLengthUnit: OHP_OP55Data.conveyorLengthUnit }),
            ...(OHP_OP55Data.appEnviroment && { appEnviroment: OHP_OP55Data.appEnviroment }),
            ...(OHP_OP55Data.ovenStatus && { ovenStatus: OHP_OP55Data.ovenStatus }),
            ...(OHP_OP55Data.ovenTemp && { ovenTemp: OHP_OP55Data.ovenTemp }),
            ...(OHP_OP55Data.otherAppEnviroment && { otherAppEnviroment: OHP_OP55Data.otherAppEnviroment }),
            operatingVoltage: OHP_OP55Data.operatingVoltage,
            controlVoltSingle: OHP_OP55Data.controlVoltSingle,
            ...(OHP_OP55Data.lubeBrand && { lubeBrand: OHP_OP55Data.lubeBrand }),
            ...(OHP_OP55Data.lubeType && { lubeType: OHP_OP55Data.lubeType }),
            ...(OHP_OP55Data.lubeViscosity && { lubeViscosity: OHP_OP55Data.lubeViscosity }),
            ...(OHP_OP55Data.sideLubeStatus && { sideLubeStatus: OHP_OP55Data.sideLubeStatus }),
            ...(OHP_OP55Data.topLubeStatus && { topLubeStatus: OHP_OP55Data.topLubeStatus }),
            ...(OHP_OP55Data.chainMaster && { chainMaster: OHP_OP55Data.chainMaster }),
            ...(OHP_OP55Data.timerStatus && { timerStatus: OHP_OP55Data.timerStatus }),
            ...(OHP_OP55Data.electricStatus && { electricStatus: OHP_OP55Data.electricStatus }),
            ...(OHP_OP55Data.plcConnection && { plcConnection: OHP_OP55Data.plcConnection }),
            ...(OHP_OP55Data.otherControllerNotes && { otherControllerNotes: OHP_OP55Data.otherControllerNotes }),
            ...(OHP_OP55Data.specialControllerOption && { specialControllerOption: OHP_OP55Data.specialControllerOption }),
            ...(OHP_OP55Data.specialControllerInfo && { specialControllerInfo: OHP_OP55Data.specialControllerInfo }),
        }); 
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP55"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP55 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;