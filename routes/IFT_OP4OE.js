// routes/IFT_OP4OE.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IFT_OP4OE = require("../models/IFT_OP4OE");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    // Used for IFT_OP4OE form submissions
    try {
        const { IFT_OP4OEData, numRequested } = req.body;

        const order = new IFT_OP4OE({
            ...(IFT_OP4OEData.conveyorName && { conveyorName: IFT_OP4OEData.conveyorName }),
            ...(IFT_OP4OEData.chainSize && { chainSize: IFT_OP4OEData.chainSize }),
            ...(IFT_OP4OEData.industrialChainManufacturer && { industrialChainManufacturer: IFT_OP4OEData.industrialChainManufacturer }),
            ...(IFT_OP4OEData.otherChainManufacturer && { otherChainManufacturer: IFT_OP4OEData.otherChainManufacturer }),
            ...(IFT_OP4OEData.wheelManufacturer && { wheelManufacturer: IFT_OP4OEData.wheelManufacturer }),
            ...(IFT_OP4OEData.conveyorLength && { conveyorLength: IFT_OP4OEData.conveyorLength }),
            ...(IFT_OP4OEData.measurementUnit && { measurementUnit: IFT_OP4OEData.measurementUnit }),
            ...(IFT_OP4OEData.conveyorSpeed && { conveyorSpeed: IFT_OP4OEData.conveyorSpeed }),
            ...(IFT_OP4OEData.speedUnit && { speedUnit: IFT_OP4OEData.speedUnit }),
            ...(IFT_OP4OEData.conveyorIndex && { conveyorIndex: IFT_OP4OEData.conveyorIndex }),
            ...(IFT_OP4OEData.travelDirection && { travelDirection: IFT_OP4OEData.travelDirection }),
            // appEnviroment is required
            appEnviroment: IFT_OP4OEData.appEnviroment,
            ...(IFT_OP4OEData.ovenStatus && { ovenStatus: IFT_OP4OEData.ovenStatus }),
            ...(IFT_OP4OEData.ovenTemp && { ovenTemp: IFT_OP4OEData.ovenTemp }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(IFT_OP4OEData.surroundingTemp && { surroundingTemp: IFT_OP4OEData.surroundingTemp }),
            ...(IFT_OP4OEData.conveyorLoaded && { conveyorLoaded: IFT_OP4OEData.conveyorLoaded }),
            ...(IFT_OP4OEData.conveyorSwing && { conveyorSwing: IFT_OP4OEData.conveyorSwing }),
            ...(IFT_OP4OEData.strandStatus && { strandStatus: IFT_OP4OEData.strandStatus }),
            ...(IFT_OP4OEData.plantLayout && { plantLayout: IFT_OP4OEData.plantLayout }),
            ...(IFT_OP4OEData.requiredPics && { requiredPics: IFT_OP4OEData.requiredPics }),
            ...(IFT_OP4OEData.operatingVoltage && { operatingVoltage: IFT_OP4OEData.operatingVoltage }),
            ...(IFT_OP4OEData.controlVoltage && { controlVoltage: IFT_OP4OEData.controlVoltage }),
            ...(IFT_OP4OEData.wheelOpenType && { wheelOpenType: IFT_OP4OEData.wheelOpenType }),
            ...(IFT_OP4OEData.wheelClosedType && { wheelClosedType: IFT_OP4OEData.wheelClosedType }),
            ...(IFT_OP4OEData.openStatus && { openStatus: IFT_OP4OEData.openStatus }),
            ...(IFT_OP4OEData.freeWheelStatus && { freeWheelStatus: IFT_OP4OEData.freeWheelStatus }),
            ...(IFT_OP4OEData.guideRollerStatus && { guideRollerStatus: IFT_OP4OEData.guideRollerStatus }),
            ...(IFT_OP4OEData.openRaceStyle && { openRaceStyle: IFT_OP4OEData.openRaceStyle }),
            ...(IFT_OP4OEData.closedRaceStyle && { closedRaceStyle: IFT_OP4OEData.closedRaceStyle }),
            ...(IFT_OP4OEData.holeStatus && { holeStatus: IFT_OP4OEData.holeStatus }),
            ...(IFT_OP4OEData.actuatorStatus && { actuatorStatus: IFT_OP4OEData.actuatorStatus }),
            ...(IFT_OP4OEData.pivotStatus && { pivotStatus: IFT_OP4OEData.pivotStatus }),
            ...(IFT_OP4OEData.kingPinStatus && { kingPinStatus: IFT_OP4OEData.kingPinStatus }),
            ...(IFT_OP4OEData.outboardStatus && { outboardStatus: IFT_OP4OEData.outboardStatus }),
            ...(IFT_OP4OEData.railLubeStatus && { railLubeStatus: IFT_OP4OEData.railLubeStatus }),
            ...(IFT_OP4OEData.lubeBrand && { lubeBrand: IFT_OP4OEData.lubeBrand }),
            ...(IFT_OP4OEData.lubeType && { lubeType: IFT_OP4OEData.lubeType }),
            ...(IFT_OP4OEData.lubeViscosity && { lubeViscosity: IFT_OP4OEData.lubeViscosity }),
            ...(IFT_OP4OEData.chainMaster && { chainMaster: IFT_OP4OEData.chainMaster }),
            ...(IFT_OP4OEData.timerStatus && { timerStatus: IFT_OP4OEData.timerStatus }),
            ...(IFT_OP4OEData.electricStatus && { electricStatus: IFT_OP4OEData.electricStatus }),
            ...(IFT_OP4OEData.pneumaticStatus && { pneumaticStatus: IFT_OP4OEData.pneumaticStatus }),
            ...(IFT_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: IFT_OP4OEData.mightyLubeMonitoring }),
            ...(IFT_OP4OEData.plcConnection && { plcConnection: IFT_OP4OEData.plcConnection }),
            ...(IFT_OP4OEData.otherControllerInfo && { otherControllerInfo: IFT_OP4OEData.otherControllerInfo }),
            ...(IFT_OP4OEData.iftUnitType && { iftUnitType: IFT_OP4OEData.iftUnitType }),
            ...(IFT_OP4OEData.iftPowerA && { iftPowerA: IFT_OP4OEData.iftPowerA }),
            ...(IFT_OP4OEData.iftPowerB && { iftPowerB: IFT_OP4OEData.iftPowerB }),
            ...(IFT_OP4OEData.iftPowerG && { iftPowerG: IFT_OP4OEData.iftPowerG }),
            ...(IFT_OP4OEData.iftPowerH && { iftPowerH: IFT_OP4OEData.iftPowerH }),
            ...(IFT_OP4OEData.iftPowerJ && { iftPowerJ: IFT_OP4OEData.iftPowerJ }),
            ...(IFT_OP4OEData.iftPowerS1 && { iftPowerS1: IFT_OP4OEData.iftPowerS1 }),
            ...(IFT_OP4OEData.iftPowerT1 && { iftPowerT1: IFT_OP4OEData.iftPowerT1 }),
            ...(IFT_OP4OEData.iftPowerU1 && { iftPowerU1: IFT_OP4OEData.iftPowerU1 }),
            ...(IFT_OP4OEData.iftPowerV1 && { iftPowerV1: IFT_OP4OEData.iftPowerV1 }),
            ...(IFT_OP4OEData.iftPowerW1 && { iftPowerW1: IFT_OP4OEData.iftPowerW1 }),
            ...(IFT_OP4OEData.iftPowerX1 && { iftPowerX1: IFT_OP4OEData.iftPowerX1 }),
        });

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "IFT_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "IFT_OP4OE entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
