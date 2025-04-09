const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_OP8NP = require("../models/PAF_OP8NP");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_OP8NPData, numRequested } = req.body;
        const order = new PAF_OP8NP({
            conveyorName: PAF_OP8NPData.conveyorName,
            chainSize: PAF_OP8NPData.chainSize,
            ...(PAF_OP8NPData.otherChainSize && { otherChainSize: PAF_OP8NPData.otherChainSize }),
            industrialChainManufacturer: PAF_OP8NPData.industrialChainManufacturer,
            ...(PAF_OP8NPData.otherChainManufacturer && { otherChainManufacturer: PAF_OP8NPData.otherChainManufacturer }),
            conveyorLength: PAF_OP8NPData.conveyorLength,
            conveyorLengthUnit: PAF_OP8NPData.conveyorLengthUnit,
            conveyorSpeed: PAF_OP8NPData.conveyorSpeed,
            conveyorSpeedUnit: PAF_OP8NPData.conveyorSpeedUnit,
            appEnviroment: PAF_OP8NPData.appEnviroment,
            ...(PAF_OP8NPData.ovenStatus && { ovenStatus: PAF_OP8NPData.ovenStatus }),
            ...(PAF_OP8NPData.ovenTemp && { ovenTemp: PAF_OP8NPData.ovenTemp }),
            orientationType: PAF_OP8NPData.orientationType,
            pfUnitType: PAF_OP8NPData.pfUnitType,
            pfOverheadL: PAF_OP8NPData.pfOverheadL,
            pfOverheadG: PAF_OP8NPData.pfOverheadG,
            pfOverheadH: PAF_OP8NPData.pfOverheadH,
            pfInvertedA: PAF_OP8NPData.pfInvertedA,
            pfInvertedG: PAF_OP8NPData.pfInvertedG,
            pfInvertedH: PAF_OP8NPData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_OP8NP"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_OP8NP entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;