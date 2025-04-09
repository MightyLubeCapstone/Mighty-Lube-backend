const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FC_314 = require("../models/FC_314");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { FC_314Data, numRequested } = req.body;
        const order = new FC_314({
            ...(FC_314Data.conveyorName && { conveyorName: FC_314Data.conveyorName }),
            wheelManufacturer: FC_314Data.wheelManufacturer,
            ...(FC_314Data.otherWheelManufacturer && { otherWheelManufacturer: FC_314Data.otherWheelManufacturer }),
            ...(FC_314Data.conveyorLength && { conveyorLength: FC_314Data.conveyorLength }),
            ...(FC_314Data.conveyorLengthUnit && { conveyorLengthUnit: FC_314Data.conveyorLengthUnit }),
            ...(FC_314Data.conveyorSpeed && { conveyorSpeed: FC_314Data.conveyorSpeed }),
            ...(FC_314Data.conveyorSpeedUnit && { conveyorSpeedUnit: FC_314Data.conveyorSpeedUnit }),
            ...(FC_314Data.conveyorIndex && { conveyorIndex: FC_314Data.conveyorIndex }),
            ...(FC_314Data.travelDirection && { travelDirection: FC_314Data.travelDirection }),
            appEnviroment: FC_314Data.appEnviroment,
            ...(FC_314Data.ovenStatus && { ovenStatus: FC_314Data.ovenStatus }),
            ...(FC_314Data.ovenTemp && { ovenTemp: FC_314Data.ovenTemp }),
            ...(FC_314Data.surroundingTemp && { surroundingTemp: FC_314Data.surroundingTemp }),
            ...(FC_314Data.orientationType && { orientationType: FC_314Data.orientationType }),
            ...(FC_314Data.operatingVoltage && { operatingVoltage: FC_314Data.operatingVoltage }),
            ...(FC_314Data.controlVoltage && { controlVoltage: FC_314Data.controlVoltage }),
            ...(FC_314Data.compressedAir && { compressedAir: FC_314Data.compressedAir }),
            ...(FC_314Data.airSupplyType && { airSupplyType: FC_314Data.airSupplyType }),
            ...(FC_314Data.monitorData && { monitorData: FC_314Data.monitorData }),
            ...(FC_314Data.carrierWheelStatus && { carrierWheelStatus: FC_314Data.carrierWheelStatus }),
            ...(FC_314Data.freeWheelStatus && { freeWheelStatus: FC_314Data.freeWheelStatus }),
            ...(FC_314Data.actuatorStatus && { actuatorStatus: FC_314Data.actuatorStatus }),
            ...(FC_314Data.pivotStatus && { pivotStatus: FC_314Data.pivotStatus }),
            ...(FC_314Data.kingPinStatus && { kingPinStatus: FC_314Data.kingPinStatus }),
            ...(FC_314Data.lubeBrand && { lubeBrand: FC_314Data.lubeBrand }),
            ...(FC_314Data.lubeType && { lubeType: FC_314Data.lubeType }),
            ...(FC_314Data.currentGrease && { currentGrease: FC_314Data.currentGrease }),
            ...(FC_314Data.currentGreaseGrade && { currentGreaseGrade: FC_314Data.currentGreaseGrade }),
            ...(FC_314Data.currentOil && { currentOil: FC_314Data.currentOil }),
            ...(FC_314Data.oilViscosity && { oilViscosity: FC_314Data.oilViscosity }),
            ...(FC_314Data.zerkDirection && { zerkDirection: FC_314Data.zerkDirection }),
            ...(FC_314Data.zerkLocationType && { zerkLocationType: FC_314Data.zerkLocationType }),
            ...(FC_314Data.chainMaster && { chainMaster: FC_314Data.chainMaster }),
            ...(FC_314Data.remoteStatus && { remoteStatus: FC_314Data.remoteStatus }),
            ...(FC_314Data.mountStatus && { mountStatus: FC_314Data.mountStatus }),
            ...(FC_314Data.otherUnitStatus && { otherUnitStatus: FC_314Data.otherUnitStatus }),
            ...(FC_314Data.timerStatus && { timerStatus: FC_314Data.timerStatus }),
            ...(FC_314Data.electricStatus && { electricStatus: FC_314Data.electricStatus }),
            ...(FC_314Data.mightyLubeMonitoring && { mightyLubeMonitoring: FC_314Data.mightyLubeMonitoring }),
            ...(FC_314Data.preMountType && { preMountType: FC_314Data.preMountType }),
            ...(FC_314Data.plcConnection && { plcConnection: FC_314Data.plcConnection }),
            ...(FC_314Data.otherControllerInfo && { otherControllerInfo: FC_314Data.otherControllerInfo }),
            ...(FC_314Data.fcUnitType && { fcUnitType: FC_314Data.fcUnitType }),
            ...(FC_314Data.fcGreaserE && { fcGreaserE: FC_314Data.fcGreaserE }),
            ...(FC_314Data.fcGreaserG && { fcGreaserG: FC_314Data.fcGreaserG }),
            ...(FC_314Data.fcGreaserH && { fcGreaserH: FC_314Data.fcGreaserH }),
            ...(FC_314Data.fcGreaserK && { fcGreaserK: FC_314Data.fcGreaserK }),
            ...(FC_314Data.fcGreaserT && { fcGreaserT: FC_314Data.fcGreaserT }),
            ...(FC_314Data.fcGreaserU && { fcGreaserU: FC_314Data.fcGreaserU }),
            ...(FC_314Data.fcGreaserV && { fcGreaserV: FC_314Data.fcGreaserV }),
            ...(FC_314Data.fcGreaserW && { fcGreaserW: FC_314Data.fcGreaserW })
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "FC_314"
        });
        await req.user.save();
        return res.status(200).json({ message: "FC_314 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;