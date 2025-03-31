// routes/COE_CEL.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const COE_CEL = require("../models/COE_CEL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { COE_CELData, numRequested } = req.body;

        const order = new COE_CEL({
            ...(COE_CELData.conveyorName && { conveyorName: COE_CELData.conveyorName }),
            chainSize: COE_CELData.chainSize,
            industrialChainManufacturer: COE_CELData.industrialChainManufacturer,
            ...(COE_CELData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: COE_CELData.otherIndustrialChainManufacturer }),
            conveyorLength: COE_CELData.conveyorLength,
            conveyorLengthUnit: COE_CELData.conveyorLengthUnit,
            conveyorSpeed: COE_CELData.conveyorSpeed,
            conveyorSpeedUnit: COE_CELData.conveyorSpeedUnit,
            ...(COE_CELData.conveyorIndex && { conveyorIndex: COE_CELData.conveyorIndex }),
            ...(COE_CELData.travelDirection && { travelDirection: COE_CELData.travelDirection }),
            appEnviroment: COE_CELData.appEnviroment,
            ...(COE_CELData.ovenStatus && { ovenStatus: COE_CELData.ovenStatus }),
            ...(COE_CELData.ovenTemp && { ovenTemp: COE_CELData.ovenTemp }),
            ...(COE_CELData.surroundingTemp && { surroundingTemp: COE_CELData.surroundingTemp }),
            ...(COE_CELData.conveyorLoaded && { conveyorLoaded: COE_CELData.conveyorLoaded }),
            ...(COE_CELData.conveyorSwing && { conveyorSwing: COE_CELData.conveyorSwing }),
            ...(COE_CELData.plantLayout && { plantLayout: COE_CELData.plantLayout }),
            ...(COE_CELData.requiredPics && { requiredPics: COE_CELData.requiredPics }),
            operatingVoltage: COE_CELData.operatingVoltage,

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(COE_CELData.wheelOpenType && { wheelOpenType: COE_CELData.wheelOpenType }),
            ...(COE_CELData.wheelClosedType && { wheelClosedType: COE_CELData.wheelClosedType }),
            ...(COE_CELData.openStatus && { openStatus: COE_CELData.openStatus }),
            catDriveStatus: COE_CELData.catDriveStatus,

            // TODO: Implement template C when updated on frontend

            ...(COE_CELData.railLubeStatus && { railLubeStatus: COE_CELData.railLubeStatus }),
            ...(COE_CELData.externalLubeStatus && { externalLubeStatus: COE_CELData.externalLubeStatus }),
            ...(COE_CELData.lubeBrand && { lubeBrand: COE_CELData.lubeBrand }),
            ...(COE_CELData.lubeType && { lubeType: COE_CELData.lubeType }),
            ...(COE_CELData.lubeViscosity && { lubeViscosity: COE_CELData.lubeViscosity }),
            ...(COE_CELData.chainCleanStatus && { chainCleanStatus: COE_CELData.chainCleanStatus }),
            ...(COE_CELData.wireMeasurementUnit && { wireMeasurementUnit: COE_CELData.wireMeasurementUnit }),
            ...(COE_CELData.conductor2 && { conductor2: COE_CELData.conductor2 }),
            ...(COE_CELData.conductor4 && { conductor4: COE_CELData.conductor4 }),
            ...(COE_CELData.conductor7 && { conductor7: COE_CELData.conductor7 }),
            ...(COE_CELData.conductor12 && { conductor12: COE_CELData.conductor12 }),
            ...(COE_CELData.junctionBoxNum && { junctionBoxNum: COE_CELData.junctionBoxNum }),
            ...(COE_CELData.coeUnitType && { coeUnitType: COE_CELData.coeUnitType }),
            ...(COE_CELData.coeLineA && { coeLineA: COE_CELData.coeLineA }),
            ...(COE_CELData.coeLineG && { coeLineG: COE_CELData.coeLineG }),
            ...(COE_CELData.coeLineH && { coeLineH: COE_CELData.coeLineH }),
            ...(COE_CELData.coeLineJ && { coeLineJ: COE_CELData.coeLineJ }),
            ...(COE_CELData.coeLineX && { coeLineX: COE_CELData.coeLineX }),
            ...(COE_CELData.coeLineY && { coeLineY: COE_CELData.coeLineY }),
        });

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "COE_CEL" });
        await req.user.save();

        return res.status(200).json({ message: "COE_CEL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
