const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_OEB = require("../models/FRO_OEB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_OEB form
    try {
        const { FRO_OEBData, numRequested } = req.body;
        const order = new FRO_OEB({
            ...(FRO_OEBData.conveyorName && { conveyorName: FRO_OEBData.conveyorName }),
            ...(FRO_OEBData.chainSize && { chainSize: FRO_OEBData.chainSize }),
            ...(FRO_OEBData.otherChainSize && { otherChainSize: FRO_OEBData.otherChainSize }),
            ...(FRO_OEBData.industrialChainManufacturer && { industrialChainManufacturer: FRO_OEBData.industrialChainManufacturer }),
            otherChainManufacturer: FRO_OEBData.otherChainManufacturer,
            ...(FRO_OEBData.conveyorLength && { conveyorLength: FRO_OEBData.conveyorLength }),
            ...(FRO_OEBData.conveyorLengthUnit && { conveyorLengthUnit: FRO_OEBData.conveyorLengthUnit }),
            appEnviroment: FRO_OEBData.appEnviroment,
            ...(FRO_OEBData.ovenStatus && { ovenStatus: FRO_OEBData.ovenStatus }),
            ...(FRO_OEBData.ovenTemp && { ovenTemp: FRO_OEBData.ovenTemp }),
            ...(FRO_OEBData.surroundingTemp && { surroundingTemp: FRO_OEBData.surroundingTemp }),
            ...(FRO_OEBData.frUnitType && { frUnitType: FRO_OEBData.frUnitType }),
            ...(FRO_OEBData.frOverheadA && { frOverheadA: FRO_OEBData.frOverheadA }),
            ...(FRO_OEBData.frOverheadB && { frOverheadB: FRO_OEBData.frOverheadB }),
            ...(FRO_OEBData.frOverheadG && { frOverheadG: FRO_OEBData.frOverheadG }),
            ...(FRO_OEBData.frOverheadH && { frOverheadH: FRO_OEBData.frOverheadH }),
            ...(FRO_OEBData.frOverheadL && { frOverheadL: FRO_OEBData.frOverheadL }),
            ...(FRO_OEBData.frInvertedA && { frInvertedA: FRO_OEBData.frInvertedA }),
            ...(FRO_OEBData.frInvertedB && { frInvertedB: FRO_OEBData.frInvertedB }),
            ...(FRO_OEBData.frInvertedG && { frInvertedG: FRO_OEBData.frInvertedG }),
            ...(FRO_OEBData.frInvertedH && { frInvertedH: FRO_OEBData.frInvertedH }),
            ...(FRO_OEBData.frInvertedK && { frInvertedK: FRO_OEBData.frInvertedK }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_OEB" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_OEB entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;