// routes/COE_OP4OE.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const COE_OP4OE = require("../models/COE_OP4OE");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { COE_OP4OEData, numRequested } = req.body;

        const order = new COE_OP4OE({
            conveyorName: COE_OP4OEData.conveyorName,
            chainSize: COE_OP4OEData.chainSize,
            industrialChainManufacturer: COE_OP4OEData.industrialChainManufacturer,
            ...(COE_OP4OEData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: COE_OP4OEData.otherIndustrialChainManufacturer }),
            conveyorLength: COE_OP4OEData.conveyorLength,
            conveyorLengthUnit: COE_OP4OEData.conveyorLengthUnit,
            conveyorSpeed: COE_OP4OEData.conveyorSpeed,
            conveyorSpeedUnit: COE_OP4OEData.conveyorSpeedUnit,
            ...(COE_OP4OEData.conveyorIndex && { conveyorIndex: COE_OP4OEData.conveyorIndex }),
            ...(COE_OP4OEData.travelDirection && { travelDirection: COE_OP4OEData.travelDirection }),
            appEnviroment: COE_OP4OEData.appEnviroment,
            ...(COE_OP4OEData.ovenStatus && { ovenStatus: COE_OP4OEData.ovenStatus }),
            ...(COE_OP4OEData.ovenTemp && { ovenTemp: COE_OP4OEData.ovenTemp }),
            ...(COE_OP4OEData.surroundingTemp && { surroundingTemp: COE_OP4OEData.surroundingTemp }),
            ...(COE_OP4OEData.conveyorLoaded && { conveyorLoaded: COE_OP4OEData.conveyorLoaded }),
            ...(COE_OP4OEData.conveyorSwing && { conveyorSwing: COE_OP4OEData.conveyorSwing }),
            ...(COE_OP4OEData.plantLayout && { plantLayout: COE_OP4OEData.plantLayout }),
            ...(COE_OP4OEData.requiredPics && { requiredPics: COE_OP4OEData.requiredPics }),
            operatingVoltage: COE_OP4OEData.operatingVoltage,

            // TODO: Implement monitorData: templateB when complete on frontend
            
            catDriveStatus: COE_OP4OEData.catDriveStatus,
            
            // TODO: Implement template C when updated on frontend

            ...(COE_OP4OEData.wheelOpenType && { wheelOpenType: COE_OP4OEData.wheelOpenType }),
            ...(COE_OP4OEData.wheelClosedType && { wheelClosedType: COE_OP4OEData.wheelClosedType }),
            ...(COE_OP4OEData.openStatus && { openStatus: COE_OP4OEData.openStatus }),
            ...(COE_OP4OEData.holeStatus && { holeStatus: COE_OP4OEData.holeStatus }),
            ...(COE_OP4OEData.railLubeStatus && { railLubeStatus: COE_OP4OEData.railLubeStatus }),
            ...(COE_OP4OEData.lubeBrand && { lubeBrand: COE_OP4OEData.lubeBrand }),
            ...(COE_OP4OEData.lubeType && { lubeType: COE_OP4OEData.lubeType }),
            ...(COE_OP4OEData.lubeViscosity && { lubeViscosity: COE_OP4OEData.lubeViscosity }),
            ...(COE_OP4OEData.chainMaster && { chainMaster: COE_OP4OEData.chainMaster }),
            ...(COE_OP4OEData.timerStatus && { timerStatus: COE_OP4OEData.timerStatus }),
            ...(COE_OP4OEData.electricStatus && { electricStatus: COE_OP4OEData.electricStatus }),
            ...(COE_OP4OEData.pneumaticStatus && { pneumaticStatus: COE_OP4OEData.pneumaticStatus }),
            ...(COE_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: COE_OP4OEData.mightyLubeMonitoring }),
            ...(COE_OP4OEData.plcConnection && { plcConnection: COE_OP4OEData.plcConnection }),
            ...(COE_OP4OEData.otherControllerInfo && { otherControllerInfo: COE_OP4OEData.otherControllerInfo }),
            ...(COE_OP4OEData.coeUnitType && { coeUnitType: COE_OP4OEData.coeUnitType }),
            ...(COE_OP4OEData.coeLineA && { coeLineA: COE_OP4OEData.coeLineA }),
            ...(COE_OP4OEData.coeLineG && { coeLineG: COE_OP4OEData.coeLineG }),
            ...(COE_OP4OEData.coeLineH && { coeLineH: COE_OP4OEData.coeLineH }),
            ...(COE_OP4OEData.coeLineJ && { coeLineJ: COE_OP4OEData.coeLineJ }),
            ...(COE_OP4OEData.coeLineX && { coeLineX: COE_OP4OEData.coeLineX }),
            ...(COE_OP4OEData.coeLineY && { coeLineY: COE_OP4OEData.coeLineY }),
            ...(COE_OP4OEData.coeLineZ && { coeLineZ: COE_OP4OEData.coeLineZ })
        });

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "COE_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "COE_OP4OE entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
