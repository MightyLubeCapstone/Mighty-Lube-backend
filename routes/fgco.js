const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FGCO = require("../models/fgco");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const { fgcoData, numRequested } = req.body;
        const order = new FGCO({
            conveyorName: fgcoData.conveyorSystemName,
            chainSizeType: fgcoData.conveyorChainSize,
            ...(fgcoData.otherChainSize && { otherChainSize: fgcoData.otherChainSize }),
            chainManufacturerType: fgcoData.chainManufacturer,
            ...(fgcoData.otherManufacturerSize && { otherManufacturerSize: fgcoData.otherManufacturerSize }),
            loadedStatus: fgcoData.conveyorLoaded,
            dripLineStatus: fgcoData.dripLine,
            operatingVoltTriple: fgcoData.operatingVoltTriple,
            oppsSpecification: fgcoData.installationClearance,
            pushButtonSwitch: fgcoData.pushButton,
            ...(fgcoData.enclosedShroud && { enclosedShroud: fgcoData.enclosedShroud }),
            ...(fgcoData.additionalOtherInfo && { additionalOtherInfo: fgcoData.additionalOtherInfo }),
        });
        req.user.orders.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FGCO" });
        await req.user.save();

        return res.status(200).json({ message: "FGCO entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;