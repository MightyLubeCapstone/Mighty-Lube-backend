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
            ...(OHP_CDLData.conveyorLength && { conveyorLength: OHP_CDLData.conveyorLength }),
            ...(OHP_CDLData.conveyorLengthUnit && { conveyorLengthUnit: OHP_CDLData.conveyorLengthUnit }),
            ...(OHP_CDLData.appEnviroment && { appEnviroment: OHP_CDLData.appEnviroment }),
            ...(OHP_CDLData.ovenStatus && { ovenStatus: OHP_CDLData.ovenStatus }),
            ...(OHP_CDLData.ovenTemp && { ovenTemp: OHP_CDLData.ovenTemp }),
            ...(OHP_CDLData.otherAppEnviroment && { otherAppEnviroment: OHP_CDLData.otherAppEnviroment }),
            ...(OHP_CDLData.lubeBrand && { lubeBrand: OHP_CDLData.lubeBrand }),
            ...(OHP_CDLData.lubeType && { lubeType: OHP_CDLData.lubeType }),
            ...(OHP_CDLData.lubeViscosity && { lubeViscosity: OHP_CDLData.lubeViscosity }),
            ...(OHP_CDLData.sideLubeStatus && { sideLubeStatus: OHP_CDLData.sideLubeStatus }),
            ...(OHP_CDLData.topLubeStatus && { topLubeStatus: OHP_CDLData.topLubeStatus }),
            ...(OHP_CDLData.specialControllerOption && { specialControllerOption: OHP_CDLData.specialControllerOption }),
            ...(OHP_CDLData.specialControllerInfo && { specialControllerInfo: OHP_CDLData.specialControllerInfo }),
            ...(OHP_CDLData.wireMeasurementUnit && { wireMeasurementUnit: OHP_CDLData.wireMeasurementUnit }),
            ...(OHP_CDLData.twoConductor && { twoConductor: OHP_CDLData.twoConductor }),
            ...(OHP_CDLData.fourConductor && { fourConductor: OHP_CDLData.fourConductor }),
            ...(OHP_CDLData.sevenConductor && { sevenConductor: OHP_CDLData.sevenConductor }),
            ...(OHP_CDLData.twelveConductor && { twelveConductor: OHP_CDLData.twelveConductor }),
            ...(OHP_CDLData.junctionBoxNum && { junctionBoxNum: OHP_CDLData.junctionBoxNum }),

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