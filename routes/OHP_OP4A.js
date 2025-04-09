const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_OP4A = require("../models/OHP_OP4A");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP4AData, numRequested } = req.body;
        const order = new OHP_OP4A({
            conveyorName: OHP_OP4AData.conveyorName,
            chainSize: OHP_OP4AData.chainSize,
            ...(OHP_OP4AData.otherChainSize && { otherChainSize: OHP_OP4AData.otherChainSize }),
            industrialChainManufacturer: OHP_OP4AData.industrialChainManufacturer,
            ...(OHP_OP4AData.otherChainManufacturer && { otherChainManufacturer: OHP_OP4AData.otherChainManufacturer }),
            conveyorLength: OHP_OP4AData.conveyorLength,
            conveyorLengthUnit: OHP_OP4AData.conveyorLengthUnit,
            conveyorSpeed: OHP_OP4AData.conveyorSpeed,
            conveyorSpeedUnit: OHP_OP4AData.conveyorSpeedUnit,
            conveyorIndex: OHP_OP4AData.conveyorIndex,
            travelDirection: OHP_OP4AData.travelDirection,
            appEnviroment: OHP_OP4AData.appEnviroment,
            ...(OHP_OP4AData.ovenStatus && { ovenStatus: OHP_OP4AData.ovenStatus }),
            ...(OHP_OP4AData.ovenTemp && { ovenTemp: OHP_OP4AData.ovenTemp }),
            surroundingTemp: OHP_OP4AData.surroundingTemp,
            conveyorLoaded: OHP_OP4AData.conveyorLoaded,
            conveyorSwing: OHP_OP4AData.conveyorSwing,
            controlVoltSingle: OHP_OP4AData.controlVoltSingle,
            compressedAir: OHP_OP4AData.compressedAir,
            airSupplyType: OHP_OP4AData.airSupplyType,
            ...(OHP_OP4AData.monitorData && { monitorData: OHP_OP4AData.monitorData }),
            railLubeStatus: OHP_OP4AData.railLubeStatus,
            lubeBrand: OHP_OP4AData.lubeBrand,
            lubeType: OHP_OP4AData.lubeType,
            lubeViscosity: OHP_OP4AData.lubeViscosity,
            sideLubeStatus: OHP_OP4AData.sideLubeStatus,
            topLubeStatus: OHP_OP4AData.topLubeStatus,
            fiveGallonStatus: OHP_OP4AData.fiveGallonStatus,
            chainCleanStatus: OHP_OP4AData.chainCleanStatus,
            chainMaster: OHP_OP4AData.chainMaster,
            otherUnitStatus: OHP_OP4AData.otherUnitStatus,
            ...(OHP_OP4AData.timerStatus && { timerStatus: OHP_OP4AData.timerStatus }),
            electricStatus: OHP_OP4AData.electricStatus,
            pneumaticStatus: OHP_OP4AData.pneumaticStatus,
            mightyLubeMonitoring: OHP_OP4AData.mightyLubeMonitoring,
            plcConnection: OHP_OP4AData.plcConnection,
            otherControllerNotes: OHP_OP4AData.otherControllerNotes,
            ohpUnitType: OHP_OP4AData.ohpUnitType,
            chainDrop: OHP_OP4AData.chainDrop,
            ohpWidth: OHP_OP4AData.ohpWidth,
            ohpHeight: OHP_OP4AData.ohpHeight,
            radioButtonType: OHP_OP4AData.radioButtonType
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP4A"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_OP4A entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;