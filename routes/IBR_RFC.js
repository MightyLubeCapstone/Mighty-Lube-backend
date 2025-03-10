const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_RFC = require("../models/IBR_RFC");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_RFC form
    try {
        const { IBR_RFCData, numRequested } = req.body;
        const order = new IBR_RFC({
            ...(IBR_RFCData.conveyorName && { conveyorName: IBR_RFCData.conveyorName }),
            ...(IBR_RFCData.chainSize && { chainSize: IBR_RFCData.chainSize }),
            ...(IBR_RFCData.industrialChainManufacturer && {industrialChainManufacturer: IBR_RFCData.industrialChainManufacturer }),
            ...(IBR_RFCData.otherChainManufacturer && { otherChainManufacturer: IBR_RFCData.otherChainManufacturer }),
            ...(IBR_RFCData.conveyorLength && { conveyorLength: IBR_RFCData.conveyorLength }),
            ...(IBR_RFCData.measurementUnit && { measurementUnit: IBR_RFCData.measurementUnit }),
            ...(IBR_RFCData.conveyorSpeed && { conveyorSpeed: IBR_RFCData.conveyorSpeed }),
            ...(IBR_RFCData.speedUnit && { speedUnit: IBR_RFCData.speedUnit }),
            ...(IBR_RFCData.conveyorIndex && { conveyorIndex: IBR_RFCData.conveyorIndex }),
            ...(IBR_RFCData.travelDirection && { travelDirection: IBR_RFCData.travelDirection }),
            appEnviroment: IBR_RFCData.appEnviroment,
            ...(IBR_RFCData.ovenStatus && { ovenStatus: IBR_RFCData.ovenStatus }),
            ...(IBR_RFCData.ovenTemp && { ovenTemp: IBR_RFCData.ovenTemp }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(IBR_RFCData.surrondingTemp && { surrondingTemp: IBR_RFCData.surrondingTemp }),
            ...(IBR_RFCData.conveyorLoaded && { conveyorLoaded: IBR_RFCData.conveyorLoaded }),
            ...(IBR_RFCData.conveyorSwing && { conveyorSwing: IBR_RFCData.conveyorSwing }),
            ...(IBR_RFCData.strandStatus && { strandStatus: IBR_RFCData.strandStatus }),
            ...(IBR_RFCData.plantLayout && { plantLayout: IBR_RFCData.plantLayout }),
            ...(IBR_RFCData.requiredPics && { requiredPics: IBR_RFCData.requiredPics }),
            ...(IBR_RFCData.operatingVoltage && { operatingVoltage: IBR_RFCData.operatingVoltage }),
            ...(IBR_RFCData.controlVoltage && { controlVoltage: IBR_RFCData.controlVoltage }),
            ...(IBR_RFCData.wheelOpenType && { wheelOpenType: IBR_RFCData.wheelOpenType }),
            ...(IBR_RFCData.wheelClosedType && { wheelClosedType: IBR_RFCData.wheelClosedType }),
            ...(IBR_RFCData.openStatus && { openStatus: IBR_RFCData.openStatus }),
            ...(IBR_RFCData.powerChainStatus && { powerChainStatus: IBR_RFCData.powerChainStatus }),
            ...(IBR_RFCData.chainPinStatus && { chainPinStatus: IBR_RFCData.chainPinStatus }),
            ...(IBR_RFCData.catDriveStatus && { catDriveStatus: IBR_RFCData.catDriveStatus }),
            ...(IBR_RFCData.catDriveNum && { catDriveNum: IBR_RFCData.catDriveNum }),
            ...(IBR_RFCData.railLubeStatus && { railLubeStatus: IBR_RFCData.railLubeStatus }),
            ...(IBR_RFCData.externalLubeStatus && { externalLubeStatus: IBR_RFCData.externalLubeStatus }),
            ...(IBR_RFCData.lubeBrand && { lubeBrand: IBR_RFCData.lubeBrand }),
            ...(IBR_RFCData.lubeType && { lubeType: IBR_RFCData.lubeType }),
            ...(IBR_RFCData.lubeViscosity && { lubeViscosity: IBR_RFCData.lubeViscosity }),
            ...(IBR_RFCData.chainCleanStatus && { chainCleanStatus: IBR_RFCData.chainCleanStatus }),
            ...(IBR_RFCData.ibrUnitType && { ibrUnitType: IBR_RFCData.ibrUnitType }),
            ...(IBR_RFCData.ibrChainA1 && { ibrChainA1: IBR_RFCData.ibrChainA1 }),
            ...(IBR_RFCData.ibrChainB1 && { ibrChainB1: IBR_RFCData.ibrChainB1 }),
            ...(IBR_RFCData.ibrChainC1 && { ibrChainC1: IBR_RFCData.ibrChainC1 }),
            ...(IBR_RFCData.ibrChainD1 && { ibrChainD1: IBR_RFCData.ibrChainD1 }),
            ...(IBR_RFCData.ibrChainF1 && { ibrChainF1: IBR_RFCData.ibrChainF1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_OPCO300" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_OPCO300 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;