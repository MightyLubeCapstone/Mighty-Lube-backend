// routes/ETI_91.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_91 = require("../models/ETI_91");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETI_91Data, numRequested } = req.body;

        const order = new ETI_91({
            conveyorName: ETI_91Data.conveyorName,
            industrialChainManufacturer: ETI_91Data.industrialChainManufacturer,
            ...(ETI_91Data.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_91Data.otherIndustrialChainManufacturer }),
            conveyorLength: ETI_91Data.conveyorLength,
            conveyorLengthUnit: ETI_91Data.conveyorLengthUnit,
        });

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "ETI_91" });
        await req.user.save();

        return res.status(200).json({ message: "ETI_91 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
