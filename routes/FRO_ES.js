const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_ES = require("../models/FRO_ES");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_ES form
    try {
        const { FRO_ESData, numRequested } = req.body;
        const order = new FRO_ES({
            ...(FRO_ESData.conveyorName && { conveyorName: FRO_ESData.conveyorName }),
            ...(FRO_ESData.chainSize && { chainSize: FRO_ESData.chainSize }),
            ...(FRO_ESData.industrialChainManufacturer && { industrialChainManufacturer: FRO_ESData.industrialChainManufacturer }),
            ...(FRO_ESData.otherChainManufacturer && { otherChainManufacturer: FRO_ESData.otherChainManufacturer }),
            ...(FRO_ESData.conveyorLength && { conveyorLength: FRO_ESData.conveyorLength }),
            ...(FRO_ESData.conveyorLengthUnit && { conveyorLengthUnit: FRO_ESData.conveyorLengthUnit }),
            ...(FRO_ESData.conveyorSpeed && { conveyorSpeed: FRO_ESData.conveyorSpeed }),
            ...(FRO_ESData.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_ESData.conveyorSpeedUnit }),
            ...(FRO_ESData.travelDirection && { travelDirection: FRO_ESData.travelDirection }),
            appEnviroment: FRO_ESData.appEnviroment,
            ...(FRO_ESData.ovenStatus && { ovenStatus: FRO_ESData.ovenStatus }),
            ...(FRO_ESData.ovenTemp && { ovenTemp: FRO_ESData.ovenTemp }),
            
            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(FRO_ESData.conveyorLoaded && { conveyorLoaded: FRO_ESData.conveyorLoaded }),
            ...(FRO_ESData.conveyorSwing && { conveyorSwing: FRO_ESData.conveyorSwing }),
            ...(FRO_ESData.operatingVoltage && { operatingVoltage: FRO_ESData.operatingVoltage }),
            ...(FRO_ESData.controlVoltage && { controlVoltage: FRO_ESData.controlVoltage }),
            ...(FRO_ESData.wheelOpenType && { wheelOpenType: FRO_ESData.wheelOpenType }),
            ...(FRO_ESData.wheelClosedType && { wheelClosedType: FRO_ESData.wheelClosedType }),
            ...(FRO_ESData.openStatus && { openStatus: FRO_ESData.openStatus }),
            ...(FRO_ESData.freeWheelStatus && { freeWheelStatus: FRO_ESData.freeWheelStatus }),
            ...(FRO_ESData.guideRollerStatus && { guideRollerStatus: FRO_ESData.guideRollerStatus }),
            ...(FRO_ESData.openRaceStyle && { openRaceStyle: FRO_ESData.openRaceStyle }),
            ...(FRO_ESData.closedRaceStyle && { closedRaceStyle: FRO_ESData.closedRaceStyle }),
            ...(FRO_ESData.holeStatus && { holeStatus: FRO_ESData.holeStatus }),
            ...(FRO_ESData.freeWheelStatus && { freeWheelStatus: FRO_ESData.freeWheelStatus }),
            ...(FRO_ESData.actuatorStatus && { actuatorStatus: FRO_ESData.actuatorStatus }),
            ...(FRO_ESData.kingPinStatus && { kingPinStatus: FRO_ESData.kingPinStatus }),
            ...(FRO_ESData.railLubeStatus && { railLubeStatus: FRO_ESData.railLubeStatus }),
            ...(FRO_ESData.externalLubeStatus && { externalLubeStatus: FRO_ESData.externalLubeStatus }),
            ...(FRO_ESData.lubeBrand && { lubeBrand: FRO_ESData.lubeBrand }),
            ...(FRO_ESData.lubeType && { lubeType: FRO_ESData.lubeType }),
            ...(FRO_ESData.lubeViscosity && { lubeViscosity: FRO_ESData.lubeViscosity }),
            ...(FRO_ESData.sideLubeStatus && { sideLubeStatus: FRO_ESData.sideLubeStatus }),
            ...(FRO_ESData.topLubeStatus && { topLubeStatus: FRO_ESData.topLubeStatus }),
            ...(FRO_ESData.chainMaster && { chainMaster: FRO_ESData.chainMaster }),
            ...(FRO_ESData.timerStatus && { timerStatus: FRO_ESData.timerStatus }),
            ...(FRO_ESData.electricStatus && { electricStatus: FRO_ESData.electricStatus }),
            ...(FRO_ESData.pneumaticStatus && { pneumaticStatus: FRO_ESData.pneumaticStatus }),
            ...(FRO_ESData.mightyLubeMonitoring && { mightyLubeMonitoring: FRO_ESData.mightyLubeMonitoring }),
            ...(FRO_ESData.plcConnection && { plcConnection: FRO_ESData.plcConnection }),
            ...(FRO_ESData.otherControllerInfo && { otherControllerInfo: FRO_ESData.otherControllerInfo }),
            ...(FRO_ESData.frUnitType && { frUnitType: FRO_ESData.frUnitType }),
            ...(FRO_ESData.frOverheadG && { frOverheadG: FRO_ESData.frOverheadG }),
            ...(FRO_ESData.frOverheadH && { frOverheadH: FRO_ESData.frOverheadH }),
            ...(FRO_ESData.frOverheadK && { frOverheadK: FRO_ESData.frOverheadK }),
            ...(FRO_ESData.frInvertedA && { frInvertedA: FRO_ESData.frInvertedA }),
            ...(FRO_ESData.frInvertedB && { frInvertedB: FRO_ESData.frInvertedB }),
            ...(FRO_ESData.frInvertedG && { frInvertedG: FRO_ESData.frInvertedG }),
            ...(FRO_ESData.frInvertedH && { frInvertedH: FRO_ESData.frInvertedH }),
            ...(FRO_ESData.frInvertedK && { frInvertedK: FRO_ESData.frInvertedK }),
            ...(FRO_ESData.frInvertedL && { frInvertedL: FRO_ESData.frInvertedL }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_ES" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_ES entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;