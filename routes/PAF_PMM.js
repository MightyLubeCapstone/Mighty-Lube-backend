const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_PMM = require("../models/PAF_PMM");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_PMMData, numRequested } = req.body;
        const order = new PAF_PMM({
            conveyorName: PAF_PMMData.conveyorName,
            chainSize: PAF_PMMData.chainSize,
            ...(PAF_PMMData.otherChainSize && { otherChainSize: PAF_PMMData.otherChainSize }),
            orientationType: PAF_PMMData.orientationType
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_PMM"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_PMM entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;