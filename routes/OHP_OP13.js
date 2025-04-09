const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP13 = require("../models/OHP_OP13");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP13Data, numRequested } = req.body;
        const order = new OHP_OP13({
            conveyorName: OHP_OP13Data.conveyorName,
            chainSize: OHP_OP13Data.chainSize,
            ...(OHP_OP13Data.otherChainSize && { otherChainSize: OHP_OP13Data.otherChainSize }),
            industrialChainManufacturer: OHP_OP13Data.industrialChainManufacturer,
            ...(OHP_OP13Data.otherChainManufacturer && { otherChainManufacturer: OHP_OP13Data.otherChainManufacturer }),
            appEnviroment: OHP_OP13Data.appEnviroment,
            ...(OHP_OP13Data.ovenStatus && { ovenStatus: OHP_OP13Data.ovenStatus }),
            ...(OHP_OP13Data.ovenTemp && { ovenTemp: OHP_OP13Data.ovenTemp }),
            conveyorLoaded: OHP_OP13Data.conveyorLoaded,
            plantLayout: OHP_OP13Data.plantLayout,
            requiredPics: OHP_OP13Data.requiredPics,
            operatingVoltTriple: OHP_OP13Data.operatingVoltTriple,
            controlVoltSingle: OHP_OP13Data.controlVoltSingle,
            sanitaryUnit: OHP_OP13Data.sanitaryUnit,
            sanitaryA: OHP_OP13Data.sanitaryA,
            sanitaryC: OHP_OP13Data.sanitaryC,
            sanitaryA2: OHP_OP13Data.sanitaryA2,
            sanitaryB2: OHP_OP13Data.sanitaryB2,
            sanitaryC2: OHP_OP13Data.sanitaryC2,
            sanitaryD2: OHP_OP13Data.sanitaryD2,
            sanitaryE2: OHP_OP13Data.sanitaryE2,
            sanitaryF2: OHP_OP13Data.sanitaryF2,
            sanitaryG2: OHP_OP13Data.sanitaryG2,
            sanitaryH2: OHP_OP13Data.sanitaryH2,
            sanitaryJ2: OHP_OP13Data.sanitaryJ2,
            sanitaryL2: OHP_OP13Data.sanitaryL2,
            sanitaryM2: OHP_OP13Data.sanitaryM2
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP13"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP13 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;