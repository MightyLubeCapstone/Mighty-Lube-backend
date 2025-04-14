const express = require("express");
const { authenticate } = require("./sessions");
const FGCO = require("../models/fgco");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const { fgcoData, numRequested } = req.body;
        const order = new FGCO({
            conveyorName: fgcoData.conveyorSystemName,
            chainSize: fgcoData.conveyorChainSize,
            ...(fgcoData.otherChainSize && { otherChainSize: fgcoData.otherChainSize }),
            chainManufacturer: fgcoData.chainManufacturer,
            ...(fgcoData.otherManufacturerSize && { otherManufacturerSize: fgcoData.otherManufacturerSize }),
            conveyorLoaded: fgcoData.conveyorLoaded,
            ...(fgcoData.dripLine && { dripLineStatus: fgcoData.dripLine }),
            operatingVoltTriple: fgcoData.operatingVoltTriple,
            oppsSpecification: fgcoData.installationClearance,
            pushButtonSwitch: fgcoData.pushButton,
            ...(fgcoData.enclosedShroud && { enclosedShroud: fgcoData.enclosedShroud }),
            ...(fgcoData.additionalOtherInfo && { additionalOtherInfo: fgcoData.additionalOtherInfo }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FGCO" });
        await req.user.save();

        return res.status(200).json({ message: "FGCO entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = router;