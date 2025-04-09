const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_2100I = require("../models/OHP_2100I");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_2100IData, numRequested } = req.body;
        const order = new OHP_2100I({
            conveyorName: OHP_2100IData.conveyorName,
            chainSize: OHP_2100IData.chainSize,
            ...(OHP_2100IData.otherChainSize && { otherChainSize: OHP_2100IData.otherChainSize }),
            industrialChainManufacturer: OHP_2100IData.industrialChainManufacturer,
            ...(OHP_2100IData.otherChainManufacturer && { otherChainManufacturer: OHP_2100IData.otherChainManufacturer }),
            conveyorLength: OHP_2100IData.conveyorLength,
            conveyorLengthUnit: OHP_2100IData.conveyorLengthUnit,
            conveyorSpeed: OHP_2100IData.conveyorSpeed,
            conveyorSpeedUnit: OHP_2100IData.conveyorSpeedUnit,
            conveyorIndex: OHP_2100IData.conveyorIndex,
            travelDirection: OHP_2100IData.travelDirection,
            appEnviroment: OHP_2100IData.appEnviroment,
            ...(OHP_2100IData.ovenStatus && { ovenStatus: OHP_2100IData.ovenStatus }),
            ...(OHP_2100IData.ovenTemp && { ovenTemp: OHP_2100IData.ovenTemp }),
            surroundingTemp: OHP_2100IData.surroundingTemp,
            orientation: OHP_2100IData.orientation,
            conveyorLoaded: OHP_2100IData.conveyorLoaded,
            plantLayout: OHP_2100IData.plantLayout,
            operatingVoltSingle: OHP_2100IData.operatingVoltSingle,
            controlVoltSingle: OHP_2100IData.controlVoltSingle,
            ...(OHP_2100IData.monitorData && { monitorData: OHP_2100IData.monitorData }),
            wheelOpenType: OHP_2100IData.wheelOpenType,
            wheelClosedType: OHP_2100IData.wheelClosedType,
            powerChainStatus: OHP_2100IData.powerChainStatus,
            chainPinStatus: OHP_2100IData.chainPinStatus,
            catDriveStatus: OHP_2100IData.catDriveStatus,
            catDriveNum: OHP_2100IData.catDriveNum,
            railLubeStatus: OHP_2100IData.railLubeStatus,
            externalLubeStatus: OHP_2100IData.externalLubeStatus,
            lubeBrand: OHP_2100IData.lubeBrand,
            lubeType: OHP_2100IData.lubeType,
            lubeViscosity: OHP_2100IData.lubeViscosity,
            sideLubeStatus: OHP_2100IData.sideLubeStatus,
            topLubeStatus: OHP_2100IData.topLubeStatus,
            chainCleanStatus: OHP_2100IData.chainCleanStatus,
            wireMeasurementUnit: OHP_2100IData.wireMeasurementUnit,
            twoConductor: OHP_2100IData.twoConductor,
            fourConductor: OHP_2100IData.fourConductor,
            sevenConductor: OHP_2100IData.sevenConductor,
            twelveConductor: OHP_2100IData.twelveConductor,
            junctionBoxNum: OHP_2100IData.junctionBoxNum,
            ohpUnitType: OHP_2100IData.ohpUnitType,
            ohpDiameter: OHP_2100IData.ohpDiameter,
            ohpWidth: OHP_2100IData.ohpWidth,
            ohpHeight: OHP_2100IData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_2100I"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_2100I entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;