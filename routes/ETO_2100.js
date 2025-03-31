const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_2100 = require("../models/ETO_2100");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETO_2100Data, numRequested } = req.body;
        const order = new ETO_2100({
            ...(ETO_2100Data.chainSize && { chainSize: ETO_2100Data.chainSize }),
            industrialChainManufacturer: ETO_2100Data.industrialChainManufacturer,
            ...(ETO_2100Data.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETO_2100Data.otherIndustrialChainManufacturer }),
            ...(ETO_2100Data.conveyorLength && { conveyorLength: ETO_2100Data.conveyorLength }),
            ...(ETO_2100Data.conveyorLengthUnit && { conveyorLengthUnit: ETO_2100Data.conveyorLengthUnit }),
            ...(ETO_2100Data.conveyorSpeed && { conveyorSpeed: ETO_2100Data.conveyorSpeed }),
            ...(ETO_2100Data.conveyorSpeedUnit && { conveyorSpeedUnit: ETO_2100Data.conveyorSpeedUnit }),
            ...(ETO_2100Data.conveyorIndex && { conveyorIndex: ETO_2100Data.conveyorIndex }),
            ...(ETO_2100Data.travelDirection && { travelDirection: ETO_2100Data.travelDirection }),
            appEnviroment: ETO_2100Data.appEnviroment,
            ...(ETO_2100Data.ovenStatus && { ovenStatus: ETO_2100Data.ovenStatus }),
            ...(ETO_2100Data.ovenTemp && { ovenTemp: ETO_2100Data.ovenTemp }),
            ...(ETO_2100Data.surroundingTemp && { surroundingTemp: ETO_2100Data.surroundingTemp }),
            ...(ETO_2100Data.conveyorLoaded && { conveyorLoaded: ETO_2100Data.conveyorLoaded }),
            ...(ETO_2100Data.conveyorSwing && { conveyorSwing: ETO_2100Data.conveyorSwing }),
            ...(ETO_2100Data.operatingVoltage && { operatingVoltage: ETO_2100Data.operatingVoltage }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(ETO_2100Data.freeCarrierSystem && { freeCarrierSystem: ETO_2100Data.freeCarrierSystem }),
            ...(ETO_2100Data.catDriveStatus && { catDriveStatus: ETO_2100Data.catDriveStatus }),
            ...(ETO_2100Data.catDriveNum && { catDriveNum: ETO_2100Data.catDriveNum }),
            ...(ETO_2100Data.lubeBrand && { lubeBrand: ETO_2100Data.lubeBrand }),
            ...(ETO_2100Data.lubeType && { lubeType: ETO_2100Data.lubeType }),
            ...(ETO_2100Data.lubeViscosity && { lubeViscosity: ETO_2100Data.lubeViscosity }),
            ...(ETO_2100Data.chainCleanStatus && { chainCleanStatus: ETO_2100Data.chainCleanStatus }),
            ...(ETO_2100Data.wireMeasurementUnit && { wireMeasurementUnit: ETO_2100Data.wireMeasurementUnit }),
            ...(ETO_2100Data.conductor2 && { conductor2: ETO_2100Data.conductor2 }),
            ...(ETO_2100Data.conductor4 && { conductor4: ETO_2100Data.conductor4 }),
            ...(ETO_2100Data.conductor7 && { conductor7: ETO_2100Data.conductor7 }),
            ...(ETO_2100Data.conductor12 && { conductor12: ETO_2100Data.conductor12 }),
            ...(ETO_2100Data.junctionBoxNum && { junctionBoxNum: ETO_2100Data.junctionBoxNum }),
            ...(ETO_2100Data.etUnitType && { etUnitType: ETO_2100Data.etUnitType }),
            ...(ETO_2100Data.etOverheadB && { etOverheadB: ETO_2100Data.etOverheadB }),
            ...(ETO_2100Data.etOverheadG && { etOverheadG: ETO_2100Data.etOverheadG }),
            ...(ETO_2100Data.etOverheadH && { etOverheadH: ETO_2100Data.etOverheadH }),
            ...(ETO_2100Data.etOverheadS && { etOverheadS: ETO_2100Data.etOverheadS }),
            ...(ETO_2100Data.etOverheadK2 && { etOverheadK2: ETO_2100Data.etOverheadK2 }),
            ...(ETO_2100Data.etOverheadLS && { etOverheadLS: ETO_2100Data.etOverheadLS }),
            ...(ETO_2100Data.etOverheadM2 && { etOverheadM2: ETO_2100Data.etOverheadM2 }),
            ...(ETO_2100Data.etOverheadN2 && { etOverheadN2: ETO_2100Data.etOverheadN2 }),
            ...(ETO_2100Data.etOverheadS2 && { etOverheadS2: ETO_2100Data.etOverheadS2 })
        });
        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETO_2100"
        });
        await req.user.save();
        return res.status(200).json({ message: "ETO_2100 entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
