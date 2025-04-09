const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_ES = require("../models/OHP_ES");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_ESData, numRequested } = req.body;
        const order = new OHP_ES({
            conveyorName: OHP_ESData.conveyorName,
            chainSize: OHP_ESData.chainSize,
            ...(OHP_ESData.otherChainSize && { otherChainSize: OHP_ESData.otherChainSize }),
            industrialChainManufacturer: OHP_ESData.industrialChainManufacturer,
            ...(OHP_ESData.otherChainManufacturer && { otherChainManufacturer: OHP_ESData.otherChainManufacturer }),
            conveyorLength: OHP_ESData.conveyorLength,
            conveyorLengthUnit: OHP_ESData.conveyorLengthUnit,
            conveyorSpeed: OHP_ESData.conveyorSpeed,
            conveyorSpeedUnit: OHP_ESData.conveyorSpeedUnit,
            conveyorIndex: OHP_ESData.conveyorIndex,
            travelDirection: OHP_ESData.travelDirection,
            appEnviroment: OHP_ESData.appEnviroment,
            ...(OHP_ESData.ovenStatus && { ovenStatus: OHP_ESData.ovenStatus }),
            ...(OHP_ESData.ovenTemp && { ovenTemp: OHP_ESData.ovenTemp }),
            newMonitorStatus: OHP_ESData.newMonitorStatus,
            conveyorLoaded: OHP_ESData.conveyorLoaded,
            conveyorSwing: OHP_ESData.conveyorSwing,
            operatingVoltSingle: OHP_ESData.operatingVoltSingle,
            controlVoltSingle: OHP_ESData.controlVoltSingle,
            ...(OHP_ESData.monitorData && { monitorData: OHP_ESData.monitorData }),
            wheelOpenType: OHP_ESData.wheelOpenType,
            wheelClosedType: OHP_ESData.wheelClosedType,
            openStatus: OHP_ESData.openStatus,
            freeWheelStatus: OHP_ESData.freeWheelStatus,
            guideRollerStatus: OHP_ESData.guideRollerStatus,
            openRaceStyleType: OHP_ESData.openRaceStyleType,
            closedRaceStyleType: OHP_ESData.closedRaceStyleType,
            holeStatus: OHP_ESData.holeStatus,
            actuatorStatus: OHP_ESData.actuatorStatus,
            pivotStatus: OHP_ESData.pivotStatus,
            kingPinStatus: OHP_ESData.kingPinStatus,
            railLubeStatus: OHP_ESData.railLubeStatus,
            externalLubeStatus: OHP_ESData.externalLubeStatus,
            lubeBrand: OHP_ESData.lubeBrand,
            lubeType: OHP_ESData.lubeType,
            lubeViscosity: OHP_ESData.lubeViscosity,
            sideLubeStatus: OHP_ESData.sideLubeStatus,
            topLubeStatus: OHP_ESData.topLubeStatus,
            chainMaster: OHP_ESData.chainMaster,
            ...(OHP_ESData.timerStatus && { timerStatus: OHP_ESData.timerStatus }),
            electricStatus: OHP_ESData.electricStatus,
            pneumaticStatus: OHP_ESData.pneumaticStatus,
            mightyLubeMonitoring: OHP_ESData.mightyLubeMonitoring,
            plcConnection: OHP_ESData.plcConnection,
            otherControllerNotes: OHP_ESData.otherControllerNotes,
            ohpUnitType: OHP_ESData.ohpUnitType,
            chainDrop: OHP_ESData.chainDrop,
            ohpDiameter: OHP_ESData.ohpDiameter,
            ohpWidth: OHP_ESData.ohpWidth,
            ohpHeight: OHP_ESData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_ES"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_ES entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;