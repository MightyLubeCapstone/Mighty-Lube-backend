const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_ES = require("../models/PAF_ES");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_ESData, numRequested } = req.body;
        const order = new PAF_ES({
            conveyorName: PAF_ESData.conveyorName,
            chainSize: PAF_ESData.chainSize,
            ...(PAF_ESData.otherChainSize && { otherChainSize: PAF_ESData.otherChainSize }),
            industrialChainManufacturer: PAF_ESData.industrialChainManufacturer,
            ...(PAF_ESData.otherChainManufacturer && { otherChainManufacturer: PAF_ESData.otherChainManufacturer }),
            conveyorLength: PAF_ESData.conveyorLength,
            conveyorLengthUnit: PAF_ESData.conveyorLengthUnit,
            conveyorSpeed: PAF_ESData.conveyorSpeed,
            conveyorSpeedUnit: PAF_ESData.conveyorSpeedUnit,
            appEnviroment: PAF_ESData.appEnviroment,
            ...(PAF_ESData.ovenStatus && { ovenStatus: PAF_ESData.ovenStatus }),
            ...(PAF_ESData.ovenTemp && { ovenTemp: PAF_ESData.ovenTemp }),
            newMonitorStatus: PAF_ESData.newMonitorStatus,
            conveyorLoaded: PAF_ESData.conveyorLoaded,
            conveyorSwing: PAF_ESData.conveyorSwing,
            orientationType: PAF_ESData.orientationType,
            operatingVoltSingle: PAF_ESData.operatingVoltSingle,
            controlVoltSingle: PAF_ESData.controlVoltSingle,
            ...(PAF_ESData.monitorData && { monitorData: PAF_ESData.monitorData }),
            wheelOpenType: PAF_ESData.wheelOpenType,
            wheelClosedType: PAF_ESData.wheelClosedType,
            openStatus: PAF_ESData.openStatus,
            freeWheelStatus: PAF_ESData.freeWheelStatus,
            guideRollerStatus: PAF_ESData.guideRollerStatus,
            openRaceStyleType: PAF_ESData.openRaceStyleType,
            closedRaceStyleType: PAF_ESData.closedRaceStyleType,
            holeStatus: PAF_ESData.holeStatus,
            actuatorStatus: PAF_ESData.actuatorStatus,
            pivotStatus: PAF_ESData.pivotStatus,
            kingPinStatus: PAF_ESData.kingPinStatus,
            railLubeStatus: PAF_ESData.railLubeStatus,
            externalLubeStatus: PAF_ESData.externalLubeStatus,
            lubeBrand: PAF_ESData.lubeBrand,
            lubeType: PAF_ESData.lubeType,
            lubeViscosity: PAF_ESData.lubeViscosity,
            sideLubeStatus: PAF_ESData.sideLubeStatus,
            topLubeStatus: PAF_ESData.topLubeStatus,
            chainMaster: PAF_ESData.chainMaster,
            ...(PAF_ESData.timerStatus && { timerStatus: PAF_ESData.timerStatus }),
            electricStatus: PAF_ESData.electricStatus,
            pneumaticStatus: PAF_ESData.pneumaticStatus,
            mightyLubeMonitoring: PAF_ESData.mightyLubeMonitoring,
            plcConnection: PAF_ESData.plcConnection,
            otherControllerNotes: PAF_ESData.otherControllerNotes,
            pfUnitType: PAF_ESData.pfUnitType,
            pfOverheadL: PAF_ESData.pfOverheadL,
            pfOverheadG: PAF_ESData.pfOverheadG,
            pfOverheadH: PAF_ESData.pfOverheadH,
            pfInvertedB: PAF_ESData.pfInvertedB,
            pfInvertedG: PAF_ESData.pfInvertedG,
            pfInvertedH: PAF_ESData.pfInvertedH
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_ES"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_ES entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;