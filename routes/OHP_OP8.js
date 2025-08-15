const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP8 = require("../models/OHP_OP8");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        
        const { OHP_OP8Data, numRequested } = req.body;
        const order = new OHP_OP8({
            conveyorName: OHP_OP8Data.conveyorName,
            chainSize: OHP_OP8Data.chainSize,
            ...(OHP_OP8Data.otherChainSize && { otherChainSize: OHP_OP8Data.otherChainSize }),
            industrialChainManufacturer: OHP_OP8Data.industrialChainManufacturer,
            ...(OHP_OP8Data.otherChainManufacturer && { otherChainManufacturer: OHP_OP8Data.otherChainManufacturer }),
            ...(OHP_OP8Data.appEnviroment && { appEnviroment: OHP_OP8Data.appEnviroment }),
            ...(OHP_OP8Data.ovenStatus && { ovenStatus: OHP_OP8Data.ovenStatus }),
            ...(OHP_OP8Data.ovenTemp && { ovenTemp: OHP_OP8Data.ovenTemp }),
            ...(OHP_OP8Data.otherAppEnviroment && { otherAppEnviroment: OHP_OP8Data.otherAppEnviroment }),
            ...(OHP_OP8Data.surroundingTemp && { surroundingTemp: OHP_OP8Data.surroundingTemp }),
            ...(OHP_OP8Data.conveyorLoaded && { conveyorLoaded: OHP_OP8Data.conveyorLoaded }),
            ...(OHP_OP8Data.operatingVoltTriple && { operatingVoltTriple: OHP_OP8Data.operatingVoltTriple }),
            ...(OHP_OP8Data.opPowerStatus && { opPowerStatus: OHP_OP8Data.opPowerStatus }),
            brushStatus: OHP_OP8Data.brushStatus,
            ...(OHP_OP8Data.brushMaterialType && { brushMaterialType: OHP_OP8Data.brushMaterialType }),
            ...(OHP_OP8Data.otherBrushMaterialType && { otherBrushMaterialType: OHP_OP8Data.otherBrushMaterialType }),
            ...(OHP_OP8Data.clearanceStatus && { clearanceStatus: OHP_OP8Data.clearanceStatus }),
            ...(OHP_OP8Data.washStatus && { washStatus: OHP_OP8Data.washStatus }),
            ...(OHP_OP8Data.foodIndustryStatus && { foodIndustryStatus: OHP_OP8Data.foodIndustryStatus }),
            ...(OHP_OP8Data.powerPanelType && { powerPanelType: OHP_OP8Data.powerPanelType }),
            ...(OHP_OP8Data.threeStationType && { threeStationType: OHP_OP8Data.threeStationType }),
            shroudStatus: OHP_OP8Data.shroudStatus,
            ...(OHP_OP8Data.shroudType && { shroudType: OHP_OP8Data.shroudType }),
            ...(OHP_OP8Data.additionalInfo && { additionalInfo: OHP_OP8Data.additionalInfo }),
            ...(OHP_OP8Data.ohpUnit && { ohpUnit: OHP_OP8Data.ohpUnit }),
            ...(OHP_OP8Data.chainDrop && { chainDrop: OHP_OP8Data.chainDrop }),
            ...(OHP_OP8Data.ohpDiameter && { ohpDiameter: OHP_OP8Data.ohpDiameter }),
            ...(OHP_OP8Data.ohpWidth && { ohpWidth: OHP_OP8Data.ohpWidth }),
            ...(OHP_OP8Data.ohpHeight && { ohpHeight: OHP_OP8Data.ohpHeight }),
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP8"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP8 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;