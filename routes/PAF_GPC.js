const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_GPC = require("../models/PAF_GPC");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_GPCData, numRequested } = req.body;
        const order = new PAF_GPC({
            conveyorName: PAF_GPCData.conveyorName,
            chainSize: PAF_GPCData.chainSize,
            ...(PAF_GPCData.otherChainSize && { otherChainSize: PAF_GPCData.otherChainSize }),
            industrialChainManufacturer: PAF_GPCData.industrialChainManufacturer,
            ...(PAF_GPCData.otherChainManufacturer && { otherChainManufacturer: PAF_GPCData.otherChainManufacturer }),
            wheelManufacturer: PAF_GPCData.wheelManufacturer,
            conveyorLength: PAF_GPCData.conveyorLength,
            conveyorLengthUnit: PAF_GPCData.conveyorLengthUnit,
            conveyorSpeed: PAF_GPCData.conveyorSpeed,
            conveyorSpeedUnit: PAF_GPCData.conveyorSpeedUnit,
            conveyorIndex: PAF_GPCData.conveyorIndex,
            travelDirection: PAF_GPCData.travelDirection,
            appEnviroment: PAF_GPCData.appEnviroment,
            ...(PAF_GPCData.ovenStatus && { ovenStatus: PAF_GPCData.ovenStatus }),
            ...(PAF_GPCData.ovenTemp && { ovenTemp: PAF_GPCData.ovenTemp }),
            surroundingTemp: PAF_GPCData.surroundingTemp,
            conveyorLoaded: PAF_GPCData.conveyorLoaded,
            conveyorSwing: PAF_GPCData.conveyorSwing,
            plantLayout: PAF_GPCData.plantLayout,
            operatingVoltSingle: PAF_GPCData.operatingVoltSingle,
            controlVoltSingle: PAF_GPCData.controlVoltSingle,
            compressedAir: PAF_GPCData.compressedAir,
            airSupplyType: PAF_GPCData.airSupplyType,
            ...(PAF_GPCData.monitorData && { monitorData: PAF_GPCData.monitorData }),
            currentGrease: PAF_GPCData.currentGrease,
            currentGreaseGrade: PAF_GPCData.currentGreaseGrade,
            chainMaster: PAF_GPCData.chainMaster,
            remoteStatus: PAF_GPCData.remoteStatus,
            mountStatus: PAF_GPCData.mountStatus,
            otherUnitStatus: PAF_GPCData.otherUnitStatus,
            timerStatus: PAF_GPCData.timerStatus,
            electricStatus: PAF_GPCData.electricStatus,
            mightyLubeMonitoring: PAF_GPCData.mightyLubeMonitoring,
            preMountType: PAF_GPCData.preMountType,
            otherControllerNotes: PAF_GPCData.otherControllerNotes,
            gpcUnitType: PAF_GPCData.gpcUnitType,
            chainDrop: PAF_GPCData.chainDrop,
            gpcDiameter: PAF_GPCData.gpcDiameter,
            gpcWheelC: PAF_GPCData.gpcWheelC,
            gpcWheelD: PAF_GPCData.gpcWheelD,
            gpcWheelE: PAF_GPCData.gpcWheelE,
            gpcWheelF: PAF_GPCData.gpcWheelF,
            gpcWheelG: PAF_GPCData.gpcWheelG,
            gpcWheelH: PAF_GPCData.gpcWheelH,
            gpcWheelS: PAF_GPCData.gpcWheelS
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_GPC"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_GPC entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;