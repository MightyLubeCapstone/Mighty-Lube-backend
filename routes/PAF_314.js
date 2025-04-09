const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_314 = require("../models/PAF_314");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_314Data, numRequested } = req.body;
        const order = new PAF_314({
            conveyorName: PAF_314Data.conveyorName,
            wheelManufacturer: PAF_314Data.wheelManufacturer,
            conveyorLength: PAF_314Data.conveyorLength,
            conveyorLengthUnit: PAF_314Data.conveyorLengthUnit,
            conveyorSpeed: PAF_314Data.conveyorSpeed,
            conveyorSpeedUnit: PAF_314Data.conveyorSpeedUnit,
            conveyorIndex: PAF_314Data.conveyorIndex,
            travelDirection: PAF_314Data.travelDirection,
            appEnviroment: PAF_314Data.appEnviroment,
            ...(PAF_314Data.ovenStatus && { ovenStatus: PAF_314Data.ovenStatus }),
            ...(PAF_314Data.ovenTemp && { ovenTemp: PAF_314Data.ovenTemp }),
            surroundingTemp: PAF_314Data.surroundingTemp,
            conveyorSwing: PAF_314Data.conveyorSwing,
            orientationType: PAF_314Data.orientationType,
            operatingVoltSingle: PAF_314Data.operatingVoltSingle,
            controlVoltSingle: PAF_314Data.controlVoltSingle,
            compressedAir: PAF_314Data.compressedAir,
            airSupplyType: PAF_314Data.airSupplyType,
            ...(PAF_314Data.monitorData && { monitorData: PAF_314Data.monitorData }),
            freeWheelStatus: PAF_314Data.freeWheelStatus,
            actuatorStatus: PAF_314Data.actuatorStatus,
            pivotStatus: PAF_314Data.pivotStatus,
            kingPinStatus: PAF_314Data.kingPinStatus,
            lubeBrand: PAF_314Data.lubeBrand,
            lubeType: PAF_314Data.lubeType,
            lubeViscosity: PAF_314Data.lubeViscosity,
            currentGrease: PAF_314Data.currentGrease,
            currentGreaseGrade: PAF_314Data.currentGreaseGrade,
            zerkDirection: PAF_314Data.zerkDirection,
            zerkLocationType: PAF_314Data.zerkLocationType,
            chainMaster: PAF_314Data.chainMaster,
            remoteStatus: PAF_314Data.remoteStatus,
            mountStatus: PAF_314Data.mountStatus,
            otherUnitStatus: PAF_314Data.otherUnitStatus,
            timerStatus: PAF_314Data.timerStatus,
            electricStatus: PAF_314Data.electricStatus,
            mightyLubeMonitoring: PAF_314Data.mightyLubeMonitoring,
            preMountType: PAF_314Data.preMountType,
            plcConnection: PAF_314Data.plcConnection,
            otherControllerNotes: PAF_314Data.otherControllerNotes,
            pfUnitType: PAF_314Data.pfUnitType,
            pfInvertedB: PAF_314Data.pfInvertedB,
            pfInvertedE: PAF_314Data.pfInvertedE,
            pfInvertedG: PAF_314Data.pfInvertedG,
            pfInvertedH: PAF_314Data.pfInvertedH,
            pfInvertedK: PAF_314Data.pfInvertedK,
            pfInvertedT: PAF_314Data.pfInvertedT,
            pfInvertedU: PAF_314Data.pfInvertedU,
            pfInvertedV: PAF_314Data.pfInvertedV,
            pfInvertedW: PAF_314Data.pfInvertedW
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_314"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_314 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;