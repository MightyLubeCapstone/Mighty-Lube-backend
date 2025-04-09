const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP139A = require("../models/OHP_OP139A");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP139AData, numRequested } = req.body;
        const order = new OHP_OP139A({
            conveyorName: OHP_OP139AData.conveyorName,
            chainSize: OHP_OP139AData.chainSize,
            ...(OHP_OP139AData.otherChainSize && { otherChainSize: OHP_OP139AData.otherChainSize }),
            industrialChainManufacturer: OHP_OP139AData.industrialChainManufacturer,
            ...(OHP_OP139AData.otherChainManufacturer && { otherChainManufacturer: OHP_OP139AData.otherChainManufacturer }),
            conveyorLength: OHP_OP139AData.conveyorLength,
            conveyorLengthUnit: OHP_OP139AData.conveyorLengthUnit,
            conveyorSpeed: OHP_OP139AData.conveyorSpeed,
            conveyorSpeedUnit: OHP_OP139AData.conveyorSpeedUnit,
            conveyorIndex: OHP_OP139AData.conveyorIndex,
            travelDirection: OHP_OP139AData.travelDirection,
            appEnviroment: OHP_OP139AData.appEnviroment,
            ...(OHP_OP139AData.ovenStatus && { ovenStatus: OHP_OP139AData.ovenStatus }),
            ...(OHP_OP139AData.ovenTemp && { ovenTemp: OHP_OP139AData.ovenTemp }),
            surroundingTemp: OHP_OP139AData.surroundingTemp,
            conveyorLoaded: OHP_OP139AData.conveyorLoaded,
            conveyorSwing: OHP_OP139AData.conveyorSwing,
            controlVoltSingle: OHP_OP139AData.controlVoltSingle,
            compressedAir: OHP_OP139AData.compressedAir,
            airSupplyType: OHP_OP139AData.airSupplyType,
            ...(OHP_OP139AData.monitorData && { monitorData: OHP_OP139AData.monitorData }),
            railLubeStatus: OHP_OP139AData.railLubeStatus,
            lubeBrand: OHP_OP139AData.lubeBrand,
            lubeType: OHP_OP139AData.lubeType,
            lubeViscosity: OHP_OP139AData.lubeViscosity,
            sideLubeStatus: OHP_OP139AData.sideLubeStatus,
            topLubeStatus: OHP_OP139AData.topLubeStatus,
            chainCleanStatus: OHP_OP139AData.chainCleanStatus,
            chainMaster: OHP_OP139AData.chainMaster,
            otherUnitStatus: OHP_OP139AData.otherUnitStatus,
            ...(OHP_OP139AData.timerStatus && { timerStatus: OHP_OP139AData.timerStatus }),
            electricStatus: OHP_OP139AData.electricStatus,
            pneumaticStatus: OHP_OP139AData.pneumaticStatus,
            mightyLubeMonitoring: OHP_OP139AData.mightyLubeMonitoring,
            plcConnection: OHP_OP139AData.plcConnection,
            otherControllerNotes: OHP_OP139AData.otherControllerNotes,
            ohpUnitType: OHP_OP139AData.ohpUnitType,
            chainDrop: OHP_OP139AData.chainDrop,
            ohpDiameter: OHP_OP139AData.ohpDiameter,
            ohpWidth: OHP_OP139AData.ohpWidth,
            ohpHeight: OHP_OP139AData.ohpHeight,
            radioButtonType: OHP_OP139AData.radioButtonType
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP139A"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP139A entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;