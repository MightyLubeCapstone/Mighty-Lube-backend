const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_MLP = require("../models/OHP_MLP");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_MLPData, numRequested } = req.body;
        const order = new OHP_MLP({
            conveyorName: OHP_MLPData.conveyorName,
            chainSize: OHP_MLPData.chainSize,
            ...(OHP_MLPData.otherChainSize && { otherChainSize: OHP_MLPData.otherChainSize }),
            industrialChainManufacturer: OHP_MLPData.industrialChainManufacturer,
            ...(OHP_MLPData.otherChainManufacturer && { otherChainManufacturer: OHP_MLPData.otherChainManufacturer }),
            conveyorLength: OHP_MLPData.conveyorLength,
            conveyorLengthUnit: OHP_MLPData.conveyorLengthUnit,
            conveyorSpeed: OHP_MLPData.conveyorSpeed,
            conveyorSpeedUnit: OHP_MLPData.conveyorSpeedUnit,
            conveyorIndex: OHP_MLPData.conveyorIndex,
            travelDirection: OHP_MLPData.travelDirection,
            appEnviroment: OHP_MLPData.appEnviroment,
            ...(OHP_MLPData.ovenStatus && { ovenStatus: OHP_MLPData.ovenStatus }),
            ...(OHP_MLPData.ovenTemp && { ovenTemp: OHP_MLPData.ovenTemp }),
            surroundingTemp: OHP_MLPData.surroundingTemp,
            conveyorLoaded: OHP_MLPData.conveyorLoaded,
            conveyorSwing: OHP_MLPData.conveyorSwing,
            operatingVoltSingle: OHP_MLPData.operatingVoltSingle,
            controlVoltSingle: OHP_MLPData.controlVoltSingle,
            ...(OHP_MLPData.monitorData && { monitorData: OHP_MLPData.monitorData }),
            wheelOpenType: OHP_MLPData.wheelOpenType,
            wheelClosedType: OHP_MLPData.wheelClosedType,
            powerChainStatus: OHP_MLPData.powerChainStatus,
            chainPinStatus: OHP_MLPData.chainPinStatus,
            catDriveStatus: OHP_MLPData.catDriveStatus,
            catDriveNum: OHP_MLPData.catDriveNum,
            railLubeStatus: OHP_MLPData.railLubeStatus,
            externalLubeStatus: OHP_MLPData.externalLubeStatus,
            lubeBrand: OHP_MLPData.lubeBrand,
            lubeType: OHP_MLPData.lubeType,
            lubeViscosity: OHP_MLPData.lubeViscosity,
            sideLubeStatus: OHP_MLPData.sideLubeStatus,
            topLubeStatus: OHP_MLPData.topLubeStatus,
            chainCleanStatus: OHP_MLPData.chainCleanStatus,
            ohpUnitType: OHP_MLPData.ohpUnitType,
            chainDrop: OHP_MLPData.chainDrop,
            ohpDiameter: OHP_MLPData.ohpDiameter,
            ohpWidth: OHP_MLPData.ohpWidth,
            ohpHeight: OHP_MLPData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_MLP"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_MLP entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;