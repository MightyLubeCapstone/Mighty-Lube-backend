const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_9000INVL = require("../models/ETI_9000INVL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETI_9000INVLData, numRequested } = req.body;

        const order = new ETI_9000INVL({
            ...(ETI_9000INVLData.conveyorName && { conveyorName: ETI_9000INVLData.conveyorName }),
            industrialChainManufacturer: ETI_9000INVLData.industrialChainManufacturer,
            ...(ETI_9000INVLData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_9000INVLData.otherIndustrialChainManufacturer }),
            ...(ETI_9000INVLData.conveyorLength && { conveyorLength: ETI_9000INVLData.conveyorLength }),
            ...(ETI_9000INVLData.conveyorLengthUnit && { conveyorLengthUnit: ETI_9000INVLData.conveyorLengthUnit }),
            ...(ETI_9000INVLData.conveyorSpeed && { conveyorSpeed: ETI_9000INVLData.conveyorSpeed }),
            ...(ETI_9000INVLData.conveyorSpeedUnit && { conveyorSpeedUnit: ETI_9000INVLData.conveyorSpeedUnit }),
            ...(ETI_9000INVLData.conveyorIndex && { conveyorIndex: ETI_9000INVLData.conveyorIndex }),
            ...(ETI_9000INVLData.travelDirection && { travelDirection: ETI_9000INVLData.travelDirection }),
            appEnviroment: ETI_9000INVLData.appEnviroment,
            ...(ETI_9000INVLData.ovenStatus && { ovenStatus: ETI_9000INVLData.ovenStatus }),
            ...(ETI_9000INVLData.ovenTemp && { ovenTemp: ETI_9000INVLData.ovenTemp }),
            ...(ETI_9000INVLData.surroundingTemp && { surroundingTemp: ETI_9000INVLData.surroundingTemp }),
            ...(ETI_9000INVLData.conveyorLoaded && { conveyorLoaded: ETI_9000INVLData.conveyorLoaded }),
            ...(ETI_9000INVLData.conveyorSwing && { conveyorSwing: ETI_9000INVLData.conveyorSwing }),
            ...(ETI_9000INVLData.operatingVoltage && { operatingVoltage: ETI_9000INVLData.operatingVoltage }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(ETI_9000INVLData.freeCarrierSystem && { freeCarrierSystem: ETI_9000INVLData.freeCarrierSystem }),
            ...(ETI_9000INVLData.catDriveStatus && { catDriveStatus: ETI_9000INVLData.catDriveStatus }),
            ...(ETI_9000INVLData.catDriveNum && { catDriveNum: ETI_9000INVLData.catDriveNum }),
            ...(ETI_9000INVLData.externalLubeStatus && { externalLubeStatus: ETI_9000INVLData.externalLubeStatus }),
            ...(ETI_9000INVLData.lubeBrand && { lubeBrand: ETI_9000INVLData.lubeBrand }),
            ...(ETI_9000INVLData.lubeType && { lubeType: ETI_9000INVLData.lubeType }),
            ...(ETI_9000INVLData.lubeViscosity && { lubeViscosity: ETI_9000INVLData.lubeViscosity }),
            ...(ETI_9000INVLData.sideLubeStatus && { sideLubeStatus: ETI_9000INVLData.sideLubeStatus }),
            ...(ETI_9000INVLData.chainCleanStatus && { chainCleanStatus: ETI_9000INVLData.chainCleanStatus }),
            ...(ETI_9000INVLData.mightyLubeMonitoring && { mightyLubeMonitoring: ETI_9000INVLData.mightyLubeMonitoring }),
            ...(ETI_9000INVLData.ctrStatus && { ctrStatus: ETI_9000INVLData.ctrStatus }),
            ...(ETI_9000INVLData.plcConnection && { plcConnection: ETI_9000INVLData.plcConnection }),
            ...(ETI_9000INVLData.monitorControlStatus && { monitorControlStatus: ETI_9000INVLData.monitorControlStatus }),
            ...(ETI_9000INVLData.otherControllerInfo && { otherControllerInfo: ETI_9000INVLData.otherControllerInfo }),
            ...(ETI_9000INVLData.wireMeasurementUnit && { wireMeasurementUnit: ETI_9000INVLData.wireMeasurementUnit }),
            ...(ETI_9000INVLData.conductor2 && { conductor2: ETI_9000INVLData.conductor2 }),
            ...(ETI_9000INVLData.conductor4 && { conductor4: ETI_9000INVLData.conductor4 }),
            ...(ETI_9000INVLData.conductor7 && { conductor7: ETI_9000INVLData.conductor7 }),
            ...(ETI_9000INVLData.conductor12 && { conductor12: ETI_9000INVLData.conductor12 }),
            ...(ETI_9000INVLData.junctionBoxNum && { junctionBoxNum: ETI_9000INVLData.junctionBoxNum }),
            ...(ETI_9000INVLData.enclosedUnitType && { enclosedUnitType: ETI_9000INVLData.enclosedUnitType }),
            ...(ETI_9000INVLData.enclosedTrackB && { enclosedTrackB: ETI_9000INVLData.enclosedTrackB }),
            ...(ETI_9000INVLData.enclosedTrackG && { enclosedTrackG: ETI_9000INVLData.enclosedTrackG }),
            ...(ETI_9000INVLData.enclosedTrackH && { enclosedTrackH: ETI_9000INVLData.enclosedTrackH }),
            ...(ETI_9000INVLData.enclosedTrackS && { enclosedTrackS: ETI_9000INVLData.enclosedTrackS }),
            ...(ETI_9000INVLData.enclosedTrackK2 && { enclosedTrackK2: ETI_9000INVLData.enclosedTrackK2 }),
            ...(ETI_9000INVLData.enclosedTrackL2 && { enclosedTrackL2: ETI_9000INVLData.enclosedTrackL2 }),
            ...(ETI_9000INVLData.enclosedTrackM2 && { enclosedTrackM2: ETI_9000INVLData.enclosedTrackM2 }),
            ...(ETI_9000INVLData.enclosedTrackN2 && { enclosedTrackN2: ETI_9000INVLData.enclosedTrackN2 }),
            ...(ETI_9000INVLData.enclosedTrackS2 && { enclosedTrackS2: ETI_9000INVLData.enclosedTrackS2 }),
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETI_9000INVL"
        });
        await req.user.save();

        return res.status(200).json({ message: "ETI_9000INVL entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
