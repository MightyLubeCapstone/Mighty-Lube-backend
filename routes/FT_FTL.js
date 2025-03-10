const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_FTL = require("../models/FT_FTL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FT_FTL form
    try {
        const { FT_FTLData, numRequested } = req.body;
        const order = new FT_FTL({
            ...(FT_FTLData.conveyorName && { conveyorName: FT_FTLData.conveyorName }),
            ...(FT_FTLData.chainSize && { chainSize: FT_FTLData.chainSize }),
            industrialChainManufacturer: FT_FTLData.industrialChainManufacturer,
            ...(FT_FTLData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FT_FTLData.otherIndustrialChainManufacturer }),
            ...(FT_FTLData.conveyorLength && { conveyorLength: FT_FTLData.conveyorLength }),
            ...(FT_FTLData.conveyorLengthUnit && { conveyorLengthUnit: FT_FTLData.conveyorLengthUnit }),
            ...(FT_FTLData.conveyorSpeed && { conveyorSpeed: FT_FTLData.conveyorSpeed }),
            ...(FT_FTLData.conveyorSpeedUnit && { conveyorSpeedUnit: FT_FTLData.conveyorSpeedUnit }),
            ...(FT_FTLData.conveyorIndex && { conveyorIndex: FT_FTLData.conveyorIndex }),
            ...(FT_FTLData.travelDirection && { travelDirection: FT_FTLData.travelDirection }),
            appEnviroment: FT_FTLData.appEnviroment,
            ...(FT_FTLData.ovenStatus && { ovenStatus: FT_FTLData.ovenStatus }),
            ...(FT_FTLData.ovenTemp && { ovenTemp: FT_FTLData.ovenTemp }),
            ...(FT_FTLData.surroundingTemp && { surroundingTemp: FT_FTLData.surroundingTemp }),
            ...(FT_FTLData.strandStatus && { strandStatus: FT_FTLData.strandStatus }),
            ...(FT_FTLData.plantLayout && { plantLayout: FT_FTLData.plantLayout }),
            ...(FT_FTLData.requiredPics && { requiredPics: FT_FTLData.requiredPics }),
            ...(FT_FTLData.operatingVoltage && { operatingVoltage: FT_FTLData.operatingVoltage }),

            // TODO: Implement monitorData: templateB when complete on frontend

            ...(FT_FTLData.wheelOpenType && { wheelOpenType: FT_FTLData.wheelOpenType }),
            ...(FT_FTLData.wheelClosedType && { wheelClosedType: FT_FTLData.wheelClosedType }),
            ...(FT_FTLData.openStatus && { openStatus: FT_FTLData.openStatus }),
            ...(FT_FTLData.outboardStatus && { outboardStatus: FT_FTLData.outboardStatus }),
            ...(FT_FTLData.catDriveStatus && { catDriveStatus: FT_FTLData.catDriveStatus }),
            ...(FT_FTLData.catDriveNum && { catDriveNum: FT_FTLData.catDriveNum }),
            ...(FT_FTLData.externalLubeStatus && { externalLubeStatus: FT_FTLData.externalLubeStatus }),
            ...(FT_FTLData.lubeBrand && { lubeBrand: FT_FTLData.lubeBrand }),
            ...(FT_FTLData.lubeType && { lubeType: FT_FTLData.lubeType }),
            ...(FT_FTLData.lubeViscosity && { lubeViscosity: FT_FTLData.lubeViscosity }),
            ...(FT_FTLData.chainCleanStatus && { chainCleanStatus: FT_FTLData.chainCleanStatus }),
            ...(FT_FTLData.mightyLubeMonitoring && { mightyLubeMonitoring: FT_FTLData.mightyLubeMonitoring }),
            ...(FT_FTLData.ctrStatus && { ctrStatus: FT_FTLData.ctrStatus }),
            ...(FT_FTLData.plcConnection && { plcConnection: FT_FTLData.plcConnection }),
            ...(FT_FTLData.monitorControllerStatus && { monitorControllerStatus: FT_FTLData.monitorControllerStatus }),
            ...(FT_FTLData.otherControllerStatus && { otherControllerStatus: FT_FTLData.otherControllerStatus }),
            ...(FT_FTLData.ftUnitType && { ftUnitType: FT_FTLData.ftUnitType }),
            ...(FT_FTLData.ftTopG && { ftTopG: FT_FTLData.ftTopG }),
            ...(FT_FTLData.ftTopH && { ftTopH: FT_FTLData.ftTopH }),
            ...(FT_FTLData.ftTopA1 && { ftTopA1: FT_FTLData.ftTopA1 }),
            ...(FT_FTLData.ftTopB1 && { ftTopB1: FT_FTLData.ftTopB1 }),
            ...(FT_FTLData.ftTopH1 && { ftTopH1: FT_FTLData.ftTopH1 }),
            ...(FT_FTLData.ftTopJ1 && { ftTopJ1: FT_FTLData.ftTopJ1 }),
            ...(FT_FTLData.ftTopL1 && { ftTopL1: FT_FTLData.ftTopL1 }),
            ...(FT_FTLData.ftTopM1 && { ftTopM1: FT_FTLData.ftTopM1 }),
            ...(FT_FTLData.ftTopN1 && { ftTopN1: FT_FTLData.ftTopN1 }),
            ...(FT_FTLData.ftTopP1 && { ftTopP1: FT_FTLData.ftTopP1 }),
            ...(FT_FTLData.ftTopR1 && { ftTopR1: FT_FTLData.ftTopR1 }),
            ...(FT_FTLData.wireMeasurementUnit && { wireMeasurementUnit: FT_FTLData.wireMeasurementUnit }),
            ...(FT_FTLData.conductor2 && { conductor2: FT_FTLData.conductor2 }),
            ...(FT_FTLData.conductor4 && { conductor4: FT_FTLData.conductor4 }),
            ...(FT_FTLData.conductor7 && { conductor7: FT_FTLData.conductor7 }),
            ...(FT_FTLData.conductor12 && { conductor12: FT_FTLData.conductor12 }),
            ...(FT_FTLData.junctionBoxNum && { junctionBoxNum: FT_FTLData.junctionBoxNum }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FT_FTL" });
        await req.user.save();

        return res.status(200).json({ message: "FT_FTL entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;