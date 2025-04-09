const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const PAF_317 = require("../models/PAF_317");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { PAF_317Data, numRequested } = req.body;
        const order = new PAF_317({
            conveyorName: PAF_317Data.conveyorName,
            wheelManufacturer: PAF_317Data.wheelManufacturer,
            conveyorLength: PAF_317Data.conveyorLength,
            conveyorLengthUnit: PAF_317Data.conveyorLengthUnit,
            conveyorSpeed: PAF_317Data.conveyorSpeed,
            conveyorSpeedUnit: PAF_317Data.conveyorSpeedUnit,
            conveyorIndex: PAF_317Data.conveyorIndex,
            travelDirection: PAF_317Data.travelDirection,
            appEnviroment: PAF_317Data.appEnviroment,
            ...(PAF_317Data.ovenStatus && { ovenStatus: PAF_317Data.ovenStatus }),
            ...(PAF_317Data.ovenTemp && { ovenTemp: PAF_317Data.ovenTemp }),
            surroundingTemp: PAF_317Data.surroundingTemp,
            conveyorSwing: PAF_317Data.conveyorSwing,
            orientationType: PAF_317Data.orientationType,
            operatingVoltSingle: PAF_317Data.operatingVoltSingle,
            controlVoltSingle: PAF_317Data.controlVoltSingle,
            compressedAir: PAF_317Data.compressedAir,
            airSupplyType: PAF_317Data.airSupplyType,
            ...(PAF_317Data.monitorData && { monitorData: PAF_317Data.monitorData }),
            freeWheelStatus: PAF_317Data.freeWheelStatus,
            guideRollerStatus: PAF_317Data.guideRollerStatus,
            openRaceStyleType: PAF_317Data.openRaceStyleType,
            closedRaceStyleType: PAF_317Data.closedRaceStyleType,
            holeStatus: PAF_317Data.holeStatus,
            lubeBrand: PAF_317Data.lubeBrand,
            lubeType: PAF_317Data.lubeType,
            lubeViscosity: PAF_317Data.lubeViscosity,
            currentGrease: PAF_317Data.currentGrease,
            currentGreaseGrade: PAF_317Data.currentGreaseGrade,
            zerkDirection: PAF_317Data.zerkDirection,
            zerkLocationType: PAF_317Data.zerkLocationType,
            chainMaster: PAF_317Data.chainMaster,
            remoteStatus: PAF_317Data.remoteStatus,
            mountStatus: PAF_317Data.mountStatus,
            otherUnitStatus: PAF_317Data.otherUnitStatus,
            timerStatus: PAF_317Data.timerStatus,
            electricStatus: PAF_317Data.electricStatus,
            mightyLubeMonitoring: PAF_317Data.mightyLubeMonitoring,
            preMountType: PAF_317Data.preMountType,
            plcConnection: PAF_317Data.plcConnection,
            otherControllerNotes: PAF_317Data.otherControllerNotes,
            pfUnitType: PAF_317Data.pfUnitType,
            pfInvertedA: PAF_317Data.pfInvertedA,
            pfInvertedB: PAF_317Data.pfInvertedB,
            pfInvertedE: PAF_317Data.pfInvertedE,
            pfInvertedS: PAF_317Data.pfInvertedS
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "PAF_317"
        });
        await req.user.save();
        return res.status(200).json({ message: "PAF_317 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;