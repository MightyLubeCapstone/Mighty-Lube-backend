const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_317 = require("../models/FC_317");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_317Data, numRequested } = req.body;
        const order = new FC_317({
            ...(FC_317Data.conveyorName && { conveyorName: FC_317Data.conveyorName }),
            wheelManufacturer: FC_317Data.wheelManufacturer,
            ...(FC_317Data.otherWheelManufacturer && { otherWheelManufacturer: FC_317Data.otherWheelManufacturer }),
            ...(FC_317Data.conveyorSpeed && { conveyorSpeed: FC_317Data.conveyorSpeed }),
            ...(FC_317Data.conveyorSpeedUnit && { conveyorSpeedUnit: FC_317Data.conveyorSpeedUnit }),
            ...(FC_317Data.conveyorIndex && { conveyorIndex: FC_317Data.conveyorIndex }),
            ...(FC_317Data.travelDirection && { travelDirection: FC_317Data.travelDirection }),
            appEnviroment: FC_317Data.appEnviroment,
            ...(FC_317Data.ovenStatus && { ovenStatus: FC_317Data.ovenStatus }),
            ...(FC_317Data.ovenTemp && { ovenTemp: FC_317Data.ovenTemp }),
            ...(FC_317Data.surroundingTemp && { surroundingTemp: FC_317Data.surroundingTemp }),
            ...(FC_317Data.orientationType && { orientationType: FC_317Data.orientationType }),
            ...(FC_317Data.evenGuideWheelStatus && { evenGuideWheelStatus: FC_317Data.evenGuideWheelStatus }),
            ...(FC_317Data.operatingVoltage && { operatingVoltage: FC_317Data.operatingVoltage }),
            ...(FC_317Data.monitorData && { monitorData: FC_317Data.monitorData }),
            ...(FC_317Data.carrierWheelStatus && { carrierWheelStatus: FC_317Data.carrierWheelStatus }),
            ...(FC_317Data.kingPinStatus && { kingPinStatus: FC_317Data.kingPinStatus }),
            ...(FC_317Data.freeWheelStatus && { freeWheelStatus: FC_317Data.freeWheelStatus }),
            ...(FC_317Data.guideRollerStatus && { guideRollerStatus: FC_317Data.guideRollerStatus }),
            ...(FC_317Data.openRaceStyleType && { openRaceStyleType: FC_317Data.openRaceStyleType }),
            ...(FC_317Data.closedRaceStyleType && { closedRaceStyleType: FC_317Data.closedRaceStyleType }),
            ...(FC_317Data.holeStatus && { holeStatus: FC_317Data.holeStatus }),
            ...(FC_317Data.lubeBrand && { lubeBrand: FC_317Data.lubeBrand }),
            ...(FC_317Data.lubeType && { lubeType: FC_317Data.lubeType }),
            ...(FC_317Data.currentGrease && { currentGrease: FC_317Data.currentGrease }),
            ...(FC_317Data.currentGreaseGrade && { currentGreaseGrade: FC_317Data.currentGreaseGrade }),
            ...(FC_317Data.currentOil && { currentOil: FC_317Data.currentOil }),
            ...(FC_317Data.oilViscosity && { oilViscosity: FC_317Data.oilViscosity }),
            ...(FC_317Data.zerkDirection && { zerkDirection: FC_317Data.zerkDirection }),
            ...(FC_317Data.zerkLocationType && { zerkLocationType: FC_317Data.zerkLocationType }),
            ...(FC_317Data.chainMaster && { chainMaster: FC_317Data.chainMaster }),
            ...(FC_317Data.remoteStatus && { remoteStatus: FC_317Data.remoteStatus }),
            ...(FC_317Data.mountStatus && { mountStatus: FC_317Data.mountStatus }),
            ...(FC_317Data.otherUnitStatus && { otherUnitStatus: FC_317Data.otherUnitStatus }),
            ...(FC_317Data.timerStatus && { timerStatus: FC_317Data.timerStatus }),
            ...(FC_317Data.electricStatus && { electricStatus: FC_317Data.electricStatus }),
            ...(FC_317Data.mightyLubeMonitoring && { mightyLubeMonitoring: FC_317Data.mightyLubeMonitoring }),
            ...(FC_317Data.preMountType && { preMountType: FC_317Data.preMountType }),
            ...(FC_317Data.plcConnection && { plcConnection: FC_317Data.plcConnection }),
            ...(FC_317Data.otherControllerInfo && { otherControllerInfo: FC_317Data.otherControllerInfo }),
            ...(FC_317Data.fcUnitType && { fcUnitType: FC_317Data.fcUnitType }),
            ...(FC_317Data.fcGreaserE && { fcGreaserE: FC_317Data.fcGreaserE }),
            ...(FC_317Data.fcGreaserF && { fcGreaserF: FC_317Data.fcGreaserF }),
            ...(FC_317Data.fcGreaserG && { fcGreaserG: FC_317Data.fcGreaserG }),
            ...(FC_317Data.fcGreaserH && { fcGreaserH: FC_317Data.fcGreaserH })
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "FC_317"
        });
        await req.user.save();
        return res.status(200).json({ message: "FC_317 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;