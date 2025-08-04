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
            ...(OHP_OP13Data.industrialChainManufacturer && { industrialChainManufacturer: OHP_OP13Data.industrialChainManufacturer }),
            ...(OHP_OP13Data.otherChainManufacturer && { otherChainManufacturer: OHP_OP13Data.otherChainManufacturer }),
            ...(OHP_OP13Data.appEnviroment && { appEnviroment: OHP_OP13Data.appEnviroment }),
            ...(OHP_OP13Data.ovenStatus && { ovenStatus: OHP_OP13Data.ovenStatus }),
            ...(OHP_OP13Data.ovenTemp && { ovenTemp: OHP_OP13Data.ovenTemp }),
            ...(OHP_OP13Data.otherAppEnviroment && { otherAppEnviroment: OHP_OP13Data.otherAppEnviroment }),
            ...(OHP_OP13Data.conveyorLoaded && { conveyorLoaded: OHP_OP13Data.conveyorLoaded }),
            ...(OHP_OP13Data.operatingVoltTriple && { operatingVoltTriple: OHP_OP13Data.operatingVoltTriple }),
           ...(OHP_OP13Data.controlVoltSingle && { controlVoltSingle: OHP_OP13Data.controlVoltSingle }),
            sanitaryUnit: OHP_OP13Data.sanitaryUnit,
            sanitaryA: OHP_OP13Data.sanitaryA,
            ...(OHP_OP13Data.sanitaryC && { sanitaryC: OHP_OP13Data.sanitaryC }),
            ...(OHP_OP13Data.sanitaryA2 && { sanitaryA2: OHP_OP13Data.sanitaryA2 }),
            ...(OHP_OP13Data.sanitaryB2 && { sanitaryB2: OHP_OP13Data.sanitaryB2 }),
            ...(OHP_OP13Data.sanitaryC2 && { sanitaryC2: OHP_OP13Data.sanitaryC2 }),
            ...(OHP_OP13Data.sanitaryD2 && { sanitaryD2: OHP_OP13Data.sanitaryD2 }),
            ...(OHP_OP13Data.sanitaryE2 && { sanitaryE2: OHP_OP13Data.sanitaryE2 }),
            ...(OHP_OP13Data.sanitaryF2 && { sanitaryF2: OHP_OP13Data.sanitaryF2 }),
            ...(OHP_OP13Data.sanitaryG2 && { sanitaryG2: OHP_OP13Data.sanitaryG2 }),
            ...(OHP_OP13Data.sanitaryH2 && { sanitaryH2: OHP_OP13Data.sanitaryH2 }),
            ...(OHP_OP13Data.sanitaryJ2 && { sanitaryJ2: OHP_OP13Data.sanitaryJ2 }),
            ...(OHP_OP13Data.sanitaryL2 && { sanitaryL2: OHP_OP13Data.sanitaryL2 }),
            ...(OHP_OP13Data.sanitaryM2 && { sanitaryM2: OHP_OP13Data.sanitaryM2 }),
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