const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_OP48E = require("../models/ETO_OP48E");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETO_OP48EData, numRequested } = req.body;
        const order = new ETO_OP48E({
            ...(ETO_OP48EData.chainSize && { chainSize: ETO_OP48EData.chainSize }),
            industrialChainManufacturer: ETO_OP48EData.industrialChainManufacturer,
            ...(ETO_OP48EData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETO_OP48EData.otherIndustrialChainManufacturer }),
            ...(ETO_OP48EData.conveyorLength && { conveyorLength: ETO_OP48EData.conveyorLength }),
            ...(ETO_OP48EData.conveyorLengthUnit && { conveyorLengthUnit: ETO_OP48EData.conveyorLengthUnit }),
            ...(ETO_OP48EData.conveyorSpeed && { conveyorSpeed: ETO_OP48EData.conveyorSpeed }),
            ...(ETO_OP48EData.conveyorSpeedUnit && { conveyorSpeedUnit: ETO_OP48EData.conveyorSpeedUnit }),
            ...(ETO_OP48EData.conveyorIndex && { conveyorIndex: ETO_OP48EData.conveyorIndex }),
            ...(ETO_OP48EData.travelDirection && { travelDirection: ETO_OP48EData.travelDirection }),
            appEnviroment: ETO_OP48EData.appEnviroment,
            ...(ETO_OP48EData.ovenStatus && { ovenStatus: ETO_OP48EData.ovenStatus }),
            ...(ETO_OP48EData.ovenTemp && { ovenTemp: ETO_OP48EData.ovenTemp }),
            ...(ETO_OP48EData.newMonitorStatus && { newMonitorStatus: ETO_OP48EData.newMonitorStatus }),
            ...(ETO_OP48EData.conveyorLoaded && { conveyorLoaded: ETO_OP48EData.conveyorLoaded }),
            ...(ETO_OP48EData.conveyorSwing && { conveyorSwing: ETO_OP48EData.conveyorSwing }),
            ...(ETO_OP48EData.operatingVoltage && { operatingVoltage: ETO_OP48EData.operatingVoltage }),
            ...(ETO_OP48EData.monitorData && { monitorData: ETO_OP48EData.monitorData }),
            ...(ETO_OP48EData.freeCarrierSystem && { freeCarrierSystem: ETO_OP48EData.freeCarrierSystem }),
            ...(ETO_OP48EData.catDriveStatus && { catDriveStatus: ETO_OP48EData.catDriveStatus }),
            ...(ETO_OP48EData.catDriveNum && { catDriveNum: ETO_OP48EData.catDriveNum }),
            ...(ETO_OP48EData.lubeBrand && { lubeBrand: ETO_OP48EData.lubeBrand }),
            ...(ETO_OP48EData.lubeType && { lubeType: ETO_OP48EData.lubeType }),
            ...(ETO_OP48EData.lubeViscosity && { lubeViscosity: ETO_OP48EData.lubeViscosity }),
            ...(ETO_OP48EData.chainMaster && { chainMaster: ETO_OP48EData.chainMaster }),
            ...(ETO_OP48EData.timerStatus && { timerStatus: ETO_OP48EData.timerStatus }),
            ...(ETO_OP48EData.electricStatus && { electricStatus: ETO_OP48EData.electricStatus }),
            ...(ETO_OP48EData.pneumaticStatus && { pneumaticStatus: ETO_OP48EData.pneumaticStatus }),
            ...(ETO_OP48EData.mightyLubeMonitoring && { mightyLubeMonitoring: ETO_OP48EData.mightyLubeMonitoring }),
            ...(ETO_OP48EData.plcConnection && { plcConnection: ETO_OP48EData.plcConnection }),
            ...(ETO_OP48EData.otherControllerInfo && { otherControllerInfo: ETO_OP48EData.otherControllerInfo }),
            ...(ETO_OP48EData.etUnitType && { etUnitType: ETO_OP48EData.etUnitType }),
            ...(ETO_OP48EData.etOverheadB && { etOverheadB: ETO_OP48EData.etOverheadB }),
            ...(ETO_OP48EData.etOverheadG && { etOverheadG: ETO_OP48EData.etOverheadG }),
            ...(ETO_OP48EData.etOverheadH && { etOverheadH: ETO_OP48EData.etOverheadH }),
            ...(ETO_OP48EData.etOverheadS && { etOverheadS: ETO_OP48EData.etOverheadS }),
            ...(ETO_OP48EData.etOverheadK2 && { etOverheadK2: ETO_OP48EData.etOverheadK2 }),
            ...(ETO_OP48EData.etOverheadLS && { etOverheadLS: ETO_OP48EData.etOverheadLS }),
            ...(ETO_OP48EData.etOverheadM2 && { etOverheadM2: ETO_OP48EData.etOverheadM2 }),
            ...(ETO_OP48EData.etOverheadN2 && { etOverheadN2: ETO_OP48EData.etOverheadN2 }),
            ...(ETO_OP48EData.etOverheadS2 && { etOverheadS2: ETO_OP48EData.etOverheadS2 })
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETO_OP48E"
        });
        await req.user.save();
        return res.status(200).json({ message: "ETO_OP48E entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;