const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_9000I = require("../models/OHP_9000I");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_9000IData, numRequested } = req.body;
        const order = new OHP_9000I({
            conveyorName: OHP_9000IData.conveyorName,
            chainSize: OHP_9000IData.chainSize,
            ...(OHP_9000IData.otherChainSize && { otherChainSize: OHP_9000IData.otherChainSize }),
            industrialChainManufacturer: OHP_9000IData.industrialChainManufacturer,
            ...(OHP_9000IData.otherChainManufacturer && { otherChainManufacturer: OHP_9000IData.otherChainManufacturer }),
            conveyorLength: OHP_9000IData.conveyorLength,
            conveyorLengthUnit: OHP_9000IData.conveyorLengthUnit,
            conveyorSpeed: OHP_9000IData.conveyorSpeed,
            conveyorSpeedUnit: OHP_9000IData.conveyorSpeedUnit,
            conveyorIndex: OHP_9000IData.conveyorIndex,
            travelDirection: OHP_9000IData.travelDirection,
            appEnviroment: OHP_9000IData.appEnviroment,
            ...(OHP_9000IData.ovenStatus && { ovenStatus: OHP_9000IData.ovenStatus }),
            ...(OHP_9000IData.ovenTemp && { ovenTemp: OHP_9000IData.ovenTemp }),
            surroundingTemp: OHP_9000IData.surroundingTemp,
            conveyorLoaded: OHP_9000IData.conveyorLoaded,
            conveyorSwing: OHP_9000IData.conveyorSwing,
            operatingVoltSingle: OHP_9000IData.operatingVoltSingle,
            controlVoltSingle: OHP_9000IData.controlVoltSingle,
            ...(OHP_9000IData.monitorData && { monitorData: OHP_9000IData.monitorData }),
            wheelOpenType: OHP_9000IData.wheelOpenType,
            wheelClosedType: OHP_9000IData.wheelClosedType,
            powerChainStatus: OHP_9000IData.powerChainStatus,
            chainPinStatus: OHP_9000IData.chainPinStatus,
            catDriveStatus: OHP_9000IData.catDriveStatus,
            catDriveNum: OHP_9000IData.catDriveNum,
            railLubeStatus: OHP_9000IData.railLubeStatus,
            externalLubeStatus: OHP_9000IData.externalLubeStatus,
            lubeBrand: OHP_9000IData.lubeBrand,
            lubeType: OHP_9000IData.lubeType,
            lubeViscosity: OHP_9000IData.lubeViscosity,
            sideLubeStatus: OHP_9000IData.sideLubeStatus,
            topLubeStatus: OHP_9000IData.topLubeStatus,
            chainCleanStatus: OHP_9000IData.chainCleanStatus,
            wireMeasurementUnit: OHP_9000IData.wireMeasurementUnit,
            twoConductor: OHP_9000IData.twoConductor,
            fourConductor: OHP_9000IData.fourConductor,
            sevenConductor: OHP_9000IData.sevenConductor,
            twelveConductor: OHP_9000IData.twelveConductor,
            junctionBoxNum: OHP_9000IData.junctionBoxNum,
            ohpUnitType: OHP_9000IData.ohpUnitType,
            ohpDiameter: OHP_9000IData.ohpDiameter,
            ohpWidth: OHP_9000IData.ohpWidth,
            ohpHeight: OHP_9000IData.ohpHeight
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_9000I"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_9000I entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;