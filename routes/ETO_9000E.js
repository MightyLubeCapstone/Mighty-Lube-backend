const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_9000E = require("../models/ETO_9000E");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETO_9000EData, numRequested } = req.body;
        const order = new ETO_9000E({
            ...(ETO_9000EData.chainSize && { chainSize: ETO_9000EData.chainSize }),
            industrialChainManufacturer: ETO_9000EData.industrialChainManufacturer,
            ...(ETO_9000EData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETO_9000EData.otherIndustrialChainManufacturer }),
            ...(ETO_9000EData.conveyorLength && { conveyorLength: ETO_9000EData.conveyorLength }),
            ...(ETO_9000EData.conveyorLengthUnit && { conveyorLengthUnit: ETO_9000EData.conveyorLengthUnit }),
            ...(ETO_9000EData.conveyorSpeed && { conveyorSpeed: ETO_9000EData.conveyorSpeed }),
            ...(ETO_9000EData.conveyorSpeedUnit && { conveyorSpeedUnit: ETO_9000EData.conveyorSpeedUnit }),
            ...(ETO_9000EData.conveyorIndex && { conveyorIndex: ETO_9000EData.conveyorIndex }),
            ...(ETO_9000EData.travelDirection && { travelDirection: ETO_9000EData.travelDirection }),
            appEnviroment: ETO_9000EData.appEnviroment,
            ...(ETO_9000EData.ovenStatus && { ovenStatus: ETO_9000EData.ovenStatus }),
            ...(ETO_9000EData.ovenTemp && { ovenTemp: ETO_9000EData.ovenTemp }),
            ...(ETO_9000EData.surroundingTemp && { surroundingTemp: ETO_9000EData.surroundingTemp }),
            ...(ETO_9000EData.conveyorLoaded && { conveyorLoaded: ETO_9000EData.conveyorLoaded }),
            ...(ETO_9000EData.conveyorSwing && { conveyorSwing: ETO_9000EData.conveyorSwing }),
            ...(ETO_9000EData.operatingVoltage && { operatingVoltage: ETO_9000EData.operatingVoltage }),
            ...(ETO_9000EData.monitorData && { monitorData: ETO_9000EData.monitorData }),
            ...(ETO_9000EData.freeCarrierSystem && { freeCarrierSystem: ETO_9000EData.freeCarrierSystem }),
            ...(ETO_9000EData.catDriveStatus && { catDriveStatus: ETO_9000EData.catDriveStatus }),
            ...(ETO_9000EData.catDriveNum && { catDriveNum: ETO_9000EData.catDriveNum }),
            ...(ETO_9000EData.externalLubeStatus && { externalLubeStatus: ETO_9000EData.externalLubeStatus }),
            ...(ETO_9000EData.lubeBrand && { lubeBrand: ETO_9000EData.lubeBrand }),
            ...(ETO_9000EData.lubeType && { lubeType: ETO_9000EData.lubeType }),
            ...(ETO_9000EData.lubeViscosity && { lubeViscosity: ETO_9000EData.lubeViscosity }),
            ...(ETO_9000EData.chainMaster && { chainMaster: ETO_9000EData.chainMaster }),
            ...(ETO_9000EData.timerStatus && { timerStatus: ETO_9000EData.timerStatus }),
            ...(ETO_9000EData.electricStatus && { electricStatus: ETO_9000EData.electricStatus }),
            ...(ETO_9000EData.pneumaticStatus && { pneumaticStatus: ETO_9000EData.pneumaticStatus }),
            ...(ETO_9000EData.mightyLubeMonitoring && { mightyLubeMonitoring: ETO_9000EData.mightyLubeMonitoring }),
            ...(ETO_9000EData.plcConnection && { plcConnection: ETO_9000EData.plcConnection }),
            ...(ETO_9000EData.otherControllerInfo && { otherControllerInfo: ETO_9000EData.otherControllerInfo }),
            ...(ETO_9000EData.wireMeasurementUnit && { wireMeasurementUnit: ETO_9000EData.wireMeasurementUnit }),
            ...(ETO_9000EData.conductor2 && { conductor2: ETO_9000EData.conductor2 }),
            ...(ETO_9000EData.conductor4 && { conductor4: ETO_9000EData.conductor4 }),
            ...(ETO_9000EData.conductor7 && { conductor7: ETO_9000EData.conductor7 }),
            ...(ETO_9000EData.conductor12 && { conductor12: ETO_9000EData.conductor12 }),
            ...(ETO_9000EData.junctionBoxNum && { junctionBoxNum: ETO_9000EData.junctionBoxNum }),
            ...(ETO_9000EData.enclosedUnitType && { enclosedUnitType: ETO_9000EData.enclosedUnitType }),
            ...(ETO_9000EData.enclosedTrackB && { enclosedTrackB: ETO_9000EData.enclosedTrackB }),
            ...(ETO_9000EData.enclosedTrackG && { enclosedTrackG: ETO_9000EData.enclosedTrackG }),
            ...(ETO_9000EData.enclosedTrackH && { enclosedTrackH: ETO_9000EData.enclosedTrackH }),
            ...(ETO_9000EData.enclosedTrackS && { enclosedTrackS: ETO_9000EData.enclosedTrackS }),
            ...(ETO_9000EData.enclosedTrackK2 && { enclosedTrackK2: ETO_9000EData.enclosedTrackK2 }),
            ...(ETO_9000EData.enclosedTrackL2 && { enclosedTrackL2: ETO_9000EData.enclosedTrackL2 }),
            ...(ETO_9000EData.enclosedTrackM2 && { enclosedTrackM2: ETO_9000EData.enclosedTrackM2 }),
            ...(ETO_9000EData.enclosedTrackN2 && { enclosedTrackN2: ETO_9000EData.enclosedTrackN2 }),
            ...(ETO_9000EData.enclosedTrackS2 && { enclosedTrackS2: ETO_9000EData.enclosedTrackS2 })
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETO_9000E"
        });
        await req.user.save();
        return res.status(200).json({ message: "ETO_9000E entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;