// routes/ETI_807.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_807 = require("../models/ETI_807");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETI_807Data, numRequested } = req.body;

        const order = new ETI_807({
            conveyorName: ETI_807Data.conveyorName,
            industrialChainManufacturer: ETI_807Data.industrialChainManufacturer,
            ...(ETI_807Data.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_807Data.otherIndustrialChainManufacturer }),
            ...(ETI_807Data.conveyorLength && { conveyorLength: ETI_807Data.conveyorLength }),
            ...(ETI_807Data.conveyorLengthUnit && { conveyorLengthUnit: ETI_807Data.conveyorLengthUnit }),
        });

        req.user.cart.push({ 
            numRequested, 
            productConfigurationInfo: order, 
            productType: "ETI_807" 
        });
        await req.user.save();

        return res.status(200).json({ message: "ETI_807 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
