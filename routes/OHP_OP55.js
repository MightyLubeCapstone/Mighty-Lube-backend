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
            conveyorLength: OHP_OP55Data.conveyorLength,
            measurementUnit: OHP_OP55Data.measurementUnit,
            travelDirection: OHP_OP55Data.travelDirection,
            appEnviroment: OHP_OP55Data.appEnviroment,
            ...(OHP_OP55Data.ovenStatus && { ovenStatus: OHP_OP55Data.ovenStatus }),
            ...(OHP_OP55Data.ovenTemp && { ovenTemp: OHP_OP55Data.ovenTemp }),
            surroundingTemp: OHP_OP55Data.surroundingTemp,
            conveyorLoaded: OHP_OP55Data.conveyorLoaded,
            orientation: OHP_OP55Data.orientation,
            controlVoltSingle: OHP_OP55Data.controlVoltSingle,
            compressedAir: OHP_OP55Data.compressedAir,
            airSupply: OHP_OP55Data.airSupply,
            chainMaster: OHP_OP55Data.chainMaster,
            timerStatus: OHP_OP55Data.timerStatus,
            electricStatus: OHP_OP55Data.electricStatus,
            pneumaticStatus: OHP_OP55Data.pneumaticStatus,
            ...(OHP_OP55Data.otherControllerNotes && { otherControllerNotes: OHP_OP55Data.otherControllerNotes }),
            ohpUnit: OHP_OP55Data.ohpUnit,
            ...(OHP_OP55Data.chainDrop && { chainDrop: OHP_OP55Data.chainDrop }),
            ohpWidth: OHP_OP55Data.ohpWidth,
            ohpHeight: OHP_OP55Data.ohpHeight
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