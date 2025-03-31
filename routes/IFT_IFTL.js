// routes/IFT_IFTL.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IFT_IFTL = require("../models/IFT_IFTL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { IFT_IFTLData, numRequested } = req.body;

        const order = new IFT_IFTL({
            ...(IFT_IFTLData.conveyorName && { conveyorName: IFT_IFTLData.conveyorName }),
            ...(IFT_IFTLData.chainSize && { chainSize: IFT_IFTLData.chainSize }),
            ...(IFT_IFTLData.industrialChainManufacturer && { industrialChainManufacturer: IFT_IFTLData.industrialChainManufacturer }),
            ...(IFT_IFTLData.otherChainManufacturer && { otherChainManufacturer: IFT_IFTLData.otherChainManufacturer }),
            ...(IFT_IFTLData.speedUnit && { speedUnit: IFT_IFTLData.speedUnit }),
            ...(IFT_IFTLData.conveyorIndex && { conveyorIndex: IFT_IFTLData.conveyorIndex }),
            ...(IFT_IFTLData.travelDirection && { travelDirection: IFT_IFTLData.travelDirection }),
            // appEnviroment is required
            appEnviroment: IFT_IFTLData.appEnviroment,
            ...(IFT_IFTLData.ovenStatus && { ovenStatus: IFT_IFTLData.ovenStatus }),
            ...(IFT_IFTLData.ovenTemp && { ovenTemp: IFT_IFTLData.ovenTemp }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(IFT_IFTLData.surroundingTemp && { surroundingTemp: IFT_IFTLData.surroundingTemp }),
            ...(IFT_IFTLData.conveyorLoaded && { conveyorLoaded: IFT_IFTLData.conveyorLoaded }),
            ...(IFT_IFTLData.conveyorSwing && { conveyorSwing: IFT_IFTLData.conveyorSwing }),
            ...(IFT_IFTLData.strandStatus && { strandStatus: IFT_IFTLData.strandStatus }),
            ...(IFT_IFTLData.plantLayout && { plantLayout: IFT_IFTLData.plantLayout }),
            ...(IFT_IFTLData.requiredPics && { requiredPics: IFT_IFTLData.requiredPics }),
            ...(IFT_IFTLData.operatingVoltage && { operatingVoltage: IFT_IFTLData.operatingVoltage }),
            ...(IFT_IFTLData.wheelOpenType && { wheelOpenType: IFT_IFTLData.wheelOpenType }),
            ...(IFT_IFTLData.wheelClosedType && { wheelClosedType: IFT_IFTLData.wheelClosedType }),
            ...(IFT_IFTLData.sliderPlateStatus && { sliderPlateStatus: IFT_IFTLData.sliderPlateStatus }),
            ...(IFT_IFTLData.freeWheelStatus && { freeWheelStatus: IFT_IFTLData.freeWheelStatus }),
            ...(IFT_IFTLData.guideRollerStatus && { guideRollerStatus: IFT_IFTLData.guideRollerStatus }),
            ...(IFT_IFTLData.openRaceStyle && { openRaceStyle: IFT_IFTLData.openRaceStyle }),
            ...(IFT_IFTLData.closedRaceStyle && { closedRaceStyle: IFT_IFTLData.closedRaceStyle }),
            ...(IFT_IFTLData.actuatorStatus && { actuatorStatus: IFT_IFTLData.actuatorStatus }),
            ...(IFT_IFTLData.pivotStatus && { pivotStatus: IFT_IFTLData.pivotStatus }),
            ...(IFT_IFTLData.kingPinStatus && { kingPinStatus: IFT_IFTLData.kingPinStatus }),
            ...(IFT_IFTLData.rollerChainStatus && { rollerChainStatus: IFT_IFTLData.rollerChainStatus }),
            ...(IFT_IFTLData.brushingsStatus && { brushingsStatus: IFT_IFTLData.brushingsStatus }),
            ...(IFT_IFTLData.riderPlatesStatus && { riderPlatesStatus: IFT_IFTLData.riderPlatesStatus }),
            ...(IFT_IFTLData.outboardStatus && { outboardStatus: IFT_IFTLData.outboardStatus }),
            ...(IFT_IFTLData.catDriveStatus && { catDriveStatus: IFT_IFTLData.catDriveStatus }),
            ...(IFT_IFTLData.catDriveNum && { catDriveNum: IFT_IFTLData.catDriveNum }),
            ...(IFT_IFTLData.railLubeStatus && { railLubeStatus: IFT_IFTLData.railLubeStatus }),
            ...(IFT_IFTLData.externalLubeStatus && { externalLubeStatus: IFT_IFTLData.externalLubeStatus }),
            ...(IFT_IFTLData.lubeBrand && { lubeBrand: IFT_IFTLData.lubeBrand }),
            ...(IFT_IFTLData.lubeType && { lubeType: IFT_IFTLData.lubeType }),
            ...(IFT_IFTLData.lubeViscosity && { lubeViscosity: IFT_IFTLData.lubeViscosity }),
            ...(IFT_IFTLData.sideLubeStatus && { sideLubeStatus: IFT_IFTLData.sideLubeStatus }),
            ...(IFT_IFTLData.topLubeStatus && { topLubeStatus: IFT_IFTLData.topLubeStatus }),
            ...(IFT_IFTLData.chainCleanStatus && { chainCleanStatus: IFT_IFTLData.chainCleanStatus }),
            ...(IFT_IFTLData.washdownStatus && { washdownStatus: IFT_IFTLData.washdownStatus }),
            ...(IFT_IFTLData.iftUnitType && { iftUnitType: IFT_IFTLData.iftUnitType }),
            ...(IFT_IFTLData.iftPowerA && { iftPowerA: IFT_IFTLData.iftPowerA }),
            ...(IFT_IFTLData.iftPowerB && { iftPowerB: IFT_IFTLData.iftPowerB }),
            ...(IFT_IFTLData.iftPowerG && { iftPowerG: IFT_IFTLData.iftPowerG }),
            ...(IFT_IFTLData.iftPowerH && { iftPowerH: IFT_IFTLData.iftPowerH }),
            ...(IFT_IFTLData.iftPowerJ && { iftPowerJ: IFT_IFTLData.iftPowerJ }),
            ...(IFT_IFTLData.iftPowerS1 && { iftPowerS1: IFT_IFTLData.iftPowerS1 }),
            ...(IFT_IFTLData.iftPowerT1 && { iftPowerT1: IFT_IFTLData.iftPowerT1 }),
            ...(IFT_IFTLData.iftPowerU1 && { iftPowerU1: IFT_IFTLData.iftPowerU1 }),
            ...(IFT_IFTLData.iftPowerW1 && { iftPowerW1: IFT_IFTLData.iftPowerW1 }),
            ...(IFT_IFTLData.iftPowerX1 && { iftPowerX1: IFT_IFTLData.iftPowerX1 }),
        });

        req.user.cart.push({ 
            numRequested, 
            productConfigurationInfo: order, 
            productType: "IFT_IFTL" 
        });
        await req.user.save();

        return res.status(200).json({ message: "IFT_IFTL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
