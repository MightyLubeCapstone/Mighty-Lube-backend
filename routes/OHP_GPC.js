const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_GPC = require("../models/OHP_GPC");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_GPCData, numRequested } = req.body;
        const order = new OHP_GPC({
            conveyorName: OHP_GPCData.conveyorName,
            chainSize: OHP_GPCData.chainSize,
            ...(OHP_GPCData.otherChainSize && { otherChainSize: OHP_GPCData.otherChainSize }),
            industrialChainManufacturer: OHP_GPCData.industrialChainManufacturer,
            ...(OHP_GPCData.otherChainManufacturer && { otherChainManufacturer: OHP_GPCData.otherChainManufacturer }),
            wheelManufacturer: OHP_GPCData.wheelManufacturer,
            ...(OHP_GPCData.otherWheelManufacturer && { otherWheelManufacturer: OHP_GPCData.otherWheelManufacturer }),
            conveyorLength: OHP_GPCData.conveyorLength,
            conveyorLengthUnit: OHP_GPCData.conveyorLengthUnit,
            conveyorSpeed: OHP_GPCData.conveyorSpeed,
            conveyorSpeedUnit: OHP_GPCData.conveyorSpeedUnit,
            conveyorIndex: OHP_GPCData.conveyorIndex,
            travelDirection: OHP_GPCData.travelDirection,
            appEnviroment: OHP_GPCData.appEnviroment,
            ...(OHP_GPCData.ovenStatus && { ovenStatus: OHP_GPCData.ovenStatus }),
            ...(OHP_GPCData.ovenTemp && { ovenTemp: OHP_GPCData.ovenTemp }),
            surroundingTemp: OHP_GPCData.surroundingTemp,
            orientation: OHP_GPCData.orientation,
            conveyorLoaded: OHP_GPCData.conveyorLoaded,
            plantLayout: OHP_GPCData.plantLayout,
            operatingVoltSingle: OHP_GPCData.operatingVoltSingle,
            ...(OHP_GPCData.monitorData && { monitorData: OHP_GPCData.monitorData }),
            currentGrease: OHP_GPCData.currentGrease,
            currentGreaseGrade: OHP_GPCData.currentGreaseGrade,
            chainMaster: OHP_GPCData.chainMaster,
            remoteStatus: OHP_GPCData.remoteStatus,
            mountStatus: OHP_GPCData.mountStatus,
            otherUnitStatus: OHP_GPCData.otherUnitStatus,
            ...(OHP_GPCData.timerStatus && { timerStatus: OHP_GPCData.timerStatus }),
            mightyLubeMonitoring: OHP_GPCData.mightyLubeMonitoring,
            preMountType: OHP_GPCData.preMountType,
            otherControllerNotes: OHP_GPCData.otherControllerNotes,
            gpcUnitType: OHP_GPCData.gpcUnitType,
            chainDrop: OHP_GPCData.chainDrop,
            gpcDiameter: OHP_GPCData.gpcDiameter,
            gpcWheelC: OHP_GPCData.gpcWheelC,
            gpcWheelD: OHP_GPCData.gpcWheelD,
            gpcWheelE: OHP_GPCData.gpcWheelE,
            gpcWheelF: OHP_GPCData.gpcWheelF,
            gpcWheelG: OHP_GPCData.gpcWheelG,
            gpcWheelH: OHP_GPCData.gpcWheelH,
            gpcWheelS: OHP_GPCData.gpcWheelS
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_GPC"
        });
        await req.user.save();
        return res.status(200).json({ message: "OHP_GPC entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;