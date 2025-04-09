const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_OP139A = require("../models/PAF_OP139A");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_OP139AData, numRequested } = req.body;
        const order = new PAF_OP139A({
            conveyorName: PAF_OP139AData.conveyorName,
            chainSize: PAF_OP139AData.chainSize,
            ...(PAF_OP139AData.otherChainSize && { otherChainSize: PAF_OP139AData.otherChainSize }),
            industrialChainManufacturer: PAF_OP139AData.industrialChainManufacturer,
            ...(PAF_OP139AData.otherChainManufacturer && { otherChainManufacturer: PAF_OP139AData.otherChainManufacturer }),
            conveyorLength: PAF_OP139AData.conveyorLength,
            conveyorLengthUnit: PAF_OP139AData.conveyorLengthUnit,
            conveyorSpeed: PAF_OP139AData.conveyorSpeed,
            conveyorSpeedUnit: PAF_OP139AData.conveyorSpeedUnit,
            appEnviroment: PAF_OP139AData.appEnviroment,
            ...(PAF_OP139AData.ovenStatus && { ovenStatus: PAF_OP139AData.ovenStatus }),
            ...(PAF_OP139AData.ovenTemp && { ovenTemp: PAF_OP139AData.ovenTemp }),
            newMonitorStatus: PAF_OP139AData.newMonitorStatus,
            conveyorLoaded: PAF_OP139AData.conveyorLoaded,
            conveyorSwing: PAF_OP139AData.conveyorSwing,
            orientationType: PAF_OP139AData.orientationType,
            controlVoltSingle: PAF_OP139AData.controlVoltSingle,
            compressedAir: PAF_OP139AData.compressedAir,
            airSupplyType: PAF_OP139AData.airSupplyType,
            ...(PAF_OP139AData.monitorData && { monitorData: PAF_OP139AData.monitorData }),
            railLubeStatus: PAF_OP139AData.railLubeStatus,
            lubeBrand: PAF_OP139AData.lubeBrand,
            lubeType: PAF_OP139AData.lubeType,
            lubeViscosity: PAF_OP139AData.lubeViscosity,
            sideLubeStatus: PAF_OP139AData.sideLubeStatus,
            topLubeStatus: PAF_OP139AData.topLubeStatus,
            chainCleanStatus: PAF_OP139AData.chainCleanStatus,
            chainMaster: PAF_OP139AData.chainMaster,
            otherUnitStatus: PAF_OP139AData.otherUnitStatus,
            ...(PAF_OP139AData.timerStatus && { timerStatus: PAF_OP139AData.timerStatus }),
            electricStatus: PAF_OP139AData.electricStatus,
            pneumaticStatus: PAF_OP139AData.pneumaticStatus,
            mightyLubeMonitoring: PAF_OP139AData.mightyLubeMonitoring,
            preMountType: PAF_OP139AData.preMountType,
            plcConnection: PAF_OP139AData.plcConnection,
            otherControllerNotes: PAF_OP139AData.otherControllerNotes,
            pfUnitType: PAF_OP139AData.pfUnitType,
            pfOverheadL: PAF_OP139AData.pfOverheadL,
            pfOverheadG: PAF_OP139AData.pfOverheadG,
            pfOverheadH: PAF_OP139AData.pfOverheadH,
            pfInvertedA: PAF_OP139AData.pfInvertedA,
            pfInvertedB: PAF_OP139AData.pfInvertedB,
            pfInvertedG: PAF_OP139AData.pfInvertedG,
            pfInvertedH: PAF_OP139AData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_OP139A"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_OP139A entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;