const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETI_OP48E = require("../models/ETI_OP48E");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETI_OP48EData, numRequested } = req.body;
        const order = new ETI_OP48E({
            ...(ETI_OP48EData.chainSize && { chainSize: ETI_OP48EData.chainSize }),
            industrialChainManufacturer: ETI_OP48EData.industrialChainManufacturer,
            ...(ETI_OP48EData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_OP48EData.otherIndustrialChainManufacturer }),
            ...(ETI_OP48EData.conveyorLength && { conveyorLength: ETI_OP48EData.conveyorLength }),
            ...(ETI_OP48EData.conveyorLengthUnit && { conveyorLengthUnit: ETI_OP48EData.conveyorLengthUnit }),
            ...(ETI_OP48EData.conveyorSpeed && { conveyorSpeed: ETI_OP48EData.conveyorSpeed }),
            ...(ETI_OP48EData.conveyorSpeedUnit && { conveyorSpeedUnit: ETI_OP48EData.conveyorSpeedUnit }),
            ...(ETI_OP48EData.conveyorIndex && { conveyorIndex: ETI_OP48EData.conveyorIndex }),
            ...(ETI_OP48EData.travelDirection && { travelDirection: ETI_OP48EData.travelDirection }),
            appEnviroment: ETI_OP48EData.appEnviroment,
            ...(ETI_OP48EData.ovenStatus && { ovenStatus: ETI_OP48EData.ovenStatus }),
            ...(ETI_OP48EData.ovenTemp && { ovenTemp: ETI_OP48EData.ovenTemp }),
            ...(ETI_OP48EData.surroundingTemp && { surroundingTemp: ETI_OP48EData.surroundingTemp }),
            ...(ETI_OP48EData.conveyorLoaded && { conveyorLoaded: ETI_OP48EData.conveyorLoaded }),
            ...(ETI_OP48EData.conveyorSwing && { conveyorSwing: ETI_OP48EData.conveyorSwing }),
            ...(ETI_OP48EData.operatingVoltage && { operatingVoltage: ETI_OP48EData.operatingVoltage }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(ETI_OP48EData.freeCarrierSystem && { freeCarrierSystem: ETI_OP48EData.freeCarrierSystem }),
            ...(ETI_OP48EData.catDriveStatus && { catDriveStatus: ETI_OP48EData.catDriveStatus }),
            ...(ETI_OP48EData.catDriveNum && { catDriveNum: ETI_OP48EData.catDriveNum }),
            ...(ETI_OP48EData.externalLubeStatus && { externalLubeStatus: ETI_OP48EData.externalLubeStatus }),
            ...(ETI_OP48EData.lubeBrand && { lubeBrand: ETI_OP48EData.lubeBrand }),
            ...(ETI_OP48EData.lubeType && { lubeType: ETI_OP48EData.lubeType }),
            ...(ETI_OP48EData.lubeViscosity && { lubeViscosity: ETI_OP48EData.lubeViscosity }),
            ...(ETI_OP48EData.sideLubeStatus && { sideLubeStatus: ETI_OP48EData.sideLubeStatus }),
            ...(ETI_OP48EData.chainMaster && { chainMaster: ETI_OP48EData.chainMaster }),
            ...(ETI_OP48EData.timerStatus && { timerStatus: ETI_OP48EData.timerStatus }),
            ...(ETI_OP48EData.electricStatus && { electricStatus: ETI_OP48EData.electricStatus }),
            ...(ETI_OP48EData.pneumaticStatus && { pneumaticStatus: ETI_OP48EData.pneumaticStatus }),
            ...(ETI_OP48EData.mightyLubeMonitoring && { mightyLubeMonitoring: ETI_OP48EData.mightyLubeMonitoring }),
            ...(ETI_OP48EData.plcConnection && { plcConnection: ETI_OP48EData.plcConnection }),
            ...(ETI_OP48EData.otherControllerInfo && { otherControllerInfo: ETI_OP48EData.otherControllerInfo }),
            ...(ETI_OP48EData.enclosedUnitType && { enclosedUnitType: ETI_OP48EData.enclosedUnitType }),
            ...(ETI_OP48EData.enclosedTrackB && { enclosedTrackB: ETI_OP48EData.enclosedTrackB }),
            ...(ETI_OP48EData.enclosedTrackG && { enclosedTrackG: ETI_OP48EData.enclosedTrackG }),
            ...(ETI_OP48EData.enclosedTrackH && { enclosedTrackH: ETI_OP48EData.enclosedTrackH }),
            ...(ETI_OP48EData.enclosedTrackS && { enclosedTrackS: ETI_OP48EData.enclosedTrackS }),
            ...(ETI_OP48EData.enclosedTrackK2 && { enclosedTrackK2: ETI_OP48EData.enclosedTrackK2 }),
            ...(ETI_OP48EData.enclosedTrackL2 && { enclosedTrackL2: ETI_OP48EData.enclosedTrackL2 }),
            ...(ETI_OP48EData.enclosedTrackM2 && { enclosedTrackM2: ETI_OP48EData.enclosedTrackM2 }),
            ...(ETI_OP48EData.enclosedTrackN2 && { enclosedTrackN2: ETI_OP48EData.enclosedTrackN2 }),
            ...(ETI_OP48EData.enclosedTrackS2 && { enclosedTrackS2: ETI_OP48EData.enclosedTrackS2 })
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETI_OP48E"
        });
        await req.user.save();

        return res.status(200).json({ message: "ETI_OP48E entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
