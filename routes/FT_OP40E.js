const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_OP4OE = require("../models/FT_OP4OE");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FT_OP4OE form
    try {
        const { FT_OP4OEData, numRequested } = req.body;
        const order = new FT_OP4OE({
            ...(FT_OP4OEData.conveyorName && { conveyorName: FT_OP4OEData.conveyorName }),
            ...(FT_OP4OEData.chainSize && { chainSize: FT_OP4OEData.chainSize }),
            industrialChainManufacturer: FT_OP4OEData.industrialChainManufacturer,
            ...(FT_OP4OEData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FT_OP4OEData.otherIndustrialChainManufacturer }),
            wheelManufacturer: FT_OP4OEData.wheelManufacturer,
            ...(FT_OP4OEData.otherWheelManufacturer && { otherWheelManufacturer: FT_OP4OEData.otherWheelManufacturer }),
            ...(FT_OP4OEData.conveyorLength && { conveyorLength: FT_OP4OEData.conveyorLength }),
            ...(FT_OP4OEData.conveyorLengthUnit && { conveyorLengthUnit: FT_OP4OEData.conveyorLengthUnit }),
            ...(FT_OP4OEData.conveyorSpeed && { conveyorSpeed: FT_OP4OEData.conveyorSpeed }),
            ...(FT_OP4OEData.conveyorSpeedUnit && { conveyorSpeedUnit: FT_OP4OEData.conveyorSpeedUnit }),
            ...(FT_OP4OEData.conveyorIndex && { conveyorIndex: FT_OP4OEData.conveyorIndex }),
            ...(FT_OP4OEData.travelDirection && { travelDirection: FT_OP4OEData.travelDirection }),
            appEnviroment: FT_OP4OEData.appEnviroment,
            ...(FT_OP4OEData.ovenStatus && { ovenStatus: FT_OP4OEData.ovenStatus }),
            ...(FT_OP4OEData.ovenTemp && { ovenTemp: FT_OP4OEData.ovenTemp }),
            ...(FT_OP4OEData.surroundingTemp && { surroundingTemp: FT_OP4OEData.surroundingTemp }),
            ...(FT_OP4OEData.conveyorLoaded && { conveyorLoaded: FT_OP4OEData.conveyorLoaded }),
            ...(FT_OP4OEData.conveyorSwing && { conveyorSwing: FT_OP4OEData.conveyorSwing }),
            ...(FT_OP4OEData.strandStatus && { strandStatus: FT_OP4OEData.strandStatus }),
            ...(FT_OP4OEData.plantLayout && { plantLayout: FT_OP4OEData.plantLayout }),
            ...(FT_OP4OEData.requiredPics && { requiredPics: FT_OP4OEData.requiredPics }),
            ...(FT_OP4OEData.operatingVoltage && { operatingVoltage: FT_OP4OEData.operatingVoltage }),
            
            // TODO: Implement monitorData: templateB when complete on frontend

            ...(FT_OP4OEData.wheelOpenType && { wheelOpenType: FT_OP4OEData.wheelOpenType }),
            ...(FT_OP4OEData.wheelClosedType && { wheelClosedType: FT_OP4OEData.wheelClosedType }),
            ...(FT_OP4OEData.openStatus && { openStatus: FT_OP4OEData.openStatus }),
            ...(FT_OP4OEData.freeWheelStatus && { freeWheelStatus: FT_OP4OEData.freeWheelStatus }),
            ...(FT_OP4OEData.guideRollerStatus && { guideRollerStatus: FT_OP4OEData.guideRollerStatus }),
            ...(FT_OP4OEData.openRaceStyleType && { openRaceStyleType: FT_OP4OEData.openRaceStyleType }),
            ...(FT_OP4OEData.closedRaceStyleType && { closedRaceStyleType: FT_OP4OEData.closedRaceStyleType }),
            ...(FT_OP4OEData.holeStatus && { holeStatus: FT_OP4OEData.holeStatus }),
            ...(FT_OP4OEData.actuatorStatus && { actuatorStatus: FT_OP4OEData.actuatorStatus }),
            ...(FT_OP4OEData.pivotStatus && { pivotStatus: FT_OP4OEData.pivotStatus }),
            ...(FT_OP4OEData.kingPinStatus && { kingPinStatus: FT_OP4OEData.kingPinStatus }),
            ...(FT_OP4OEData.outboardStatus && { outboardStatus: FT_OP4OEData.outboardStatus }),
            ...(FT_OP4OEData.lubeBrand && { lubeBrand: FT_OP4OEData.lubeBrand }),
            ...(FT_OP4OEData.lubeType && { lubeType: FT_OP4OEData.lubeType }),
            ...(FT_OP4OEData.lubeViscosity && { lubeViscosity: FT_OP4OEData.lubeViscosity }),
            ...(FT_OP4OEData.chainMaster && { chainMaster: FT_OP4OEData.chainMaster }),
            ...(FT_OP4OEData.timerStatus && { timerStatus: FT_OP4OEData.timerStatus }),
            ...(FT_OP4OEData.electricStatus && { electricStatus: FT_OP4OEData.electricStatus }),
            ...(FT_OP4OEData.pneumaticStatus && { pneumaticStatus: FT_OP4OEData.pneumaticStatus }),
            ...(FT_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: FT_OP4OEData.mightyLubeMonitoring }),
            ...(FT_OP4OEData.plcConnection && { plcConnection: FT_OP4OEData.plcConnection }),
            ...(FT_OP4OEData.otherControllerInfo && { otherControllerInfo: FT_OP4OEData.otherControllerInfo }),
            ...(FT_OP4OEData.ftUnitType && { ftUnitType: FT_OP4OEData.ftUnitType }),
            ...(FT_OP4OEData.ftTopG && { ftTopG: FT_OP4OEData.ftTopG }),
            ...(FT_OP4OEData.ftTopH && { ftTopH: FT_OP4OEData.ftTopH }),
            ...(FT_OP4OEData.ftTopA1 && { ftTopA1: FT_OP4OEData.ftTopA1 }),
            ...(FT_OP4OEData.ftTopB1 && { ftTopB1: FT_OP4OEData.ftTopB1 }),
            ...(FT_OP4OEData.ftTopH1 && { ftTopH1: FT_OP4OEData.ftTopH1 }),
            ...(FT_OP4OEData.ftTopJ1 && { ftTopJ1: FT_OP4OEData.ftTopJ1 }),
            ...(FT_OP4OEData.ftTopL1 && { ftTopL1: FT_OP4OEData.ftTopL1 }),
            ...(FT_OP4OEData.ftTopM1 && { ftTopM1: FT_OP4OEData.ftTopM1 }),
            ...(FT_OP4OEData.ftTopN1 && { ftTopN1: FT_OP4OEData.ftTopN1 }),
            ...(FT_OP4OEData.ftTopP1 && { ftTopP1: FT_OP4OEData.ftTopP1 }),
            ...(FT_OP4OEData.ftTopR1 && { ftTopR1: FT_OP4OEData.ftTopR1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FT_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "FT_OP4OE entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;