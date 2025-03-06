const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_317 = require("../models/FRO_317");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_317 form
    try {
        const { FRO_317Data, numRequested } = req.body;
        const order = new FRO_317({
            ...(FRO_317Data.conveyorName && { conveyorName: FRO_317Data.conveyorName }),
            ...(FRO_317Data.wheelManufacturer && { wheelManufacturer: FRO_317Data.wheelManufacturer }),
            ...(FRO_317Data.otherWheelManufacturer && { otherWheelManufacturer: FRO_317Data.otherWheelManufacturer }),
            ...(FRO_317Data.conveyorLength && { conveyorLength: FRO_317Data.conveyorLength }),
            ...(FRO_317Data.conveyorLengthUnit && { conveyorLengthUnit: FRO_317Data.conveyorLengthUnit }),
            ...(FRO_317Data.conveyorSpeed && { conveyorSpeed: FRO_317Data.conveyorSpeed }),
            ...(FRO_317Data.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_317Data.conveyorSpeedUnit }),
            ...(FRO_317Data.travelDirection && { travelDirection: FRO_317Data.travelDirection }),
            appEnviroment: FRO_317Data.appEnviroment,
            ...(FRO_317Data.ovenStatus && { ovenStatus: FRO_317Data.ovenStatus }),
            ...(FRO_317Data.ovenTemp && { ovenTemp: FRO_317Data.ovenTemp }),
            ...(FRO_317Data.surroundingTemp && { surroundingTemp: FRO_317Data.surroundingTemp }),
            ...(FRO_317Data.conveyorSwing && { conveyorSwing: FRO_317Data.conveyorSwing }),
            ...(FRO_317Data.orientation && { orientation: FRO_317Data.orientation }),
            ...(FRO_317Data.operatingVoltage && { operatingVoltage: FRO_317Data.operatingVoltage }),
            ...(FRO_317Data.controlVoltage && { controlVoltage: FRO_317Data.controlVoltage }),
            ...(FRO_317Data.compressedAir && { compressedAir: FRO_317Data.compressedAir }),
            ...(FRO_317Data.airSupply && { airSupply: FRO_317Data.airSupply }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(FRO_317Data.freeWheelStatus && { freeWheelStatus: FRO_317Data.freeWheelStatus }),
            ...(FRO_317Data.guideRollerStatus && { guideRollerStatus: FRO_317Data.guideRollerStatus }),
            ...(FRO_317Data.openRaceStyle && { openRaceStyle: FRO_317Data.openRaceStyle }),
            ...(FRO_317Data.closedRaceStyle && { closedRaceStyle: FRO_317Data.closedRaceStyle }),
            ...(FRO_317Data.openStatus && { openStatus: FRO_317Data.openStatus }),
            ...(FRO_317Data.lubeBrand && { lubeBrand: FRO_317Data.lubeBrand }),
            ...(FRO_317Data.lubeType && { lubeType: FRO_317Data.lubeType }),
            ...(FRO_317Data.lubeViscosity && { lubeViscosity: FRO_317Data.lubeViscosity }),
            ...(FRO_317Data.currentGrease && { currentGrease: FRO_317Data.currentGrease }),
            ...(FRO_317Data.currentGreaseGrade && { currentGreaseGrade: FRO_317Data.currentGreaseGrade }),
            ...(FRO_317Data.zerkDirection && { zerkDirection: FRO_317Data.zerkDirection }),
            ...(FRO_317Data.zerkLocation && { zerkLocation: FRO_317Data.zerkLocation }),
            ...(FRO_317Data.chainMaster && { chainMaster: FRO_317Data.chainMaster }),
            ...(FRO_317Data.remoteStatus && { remoteStatus: FRO_317Data.remoteStatus }),
            ...(FRO_317Data.mountStatus && { mountStatus: FRO_317Data.mountStatus }),
            ...(FRO_317Data.otherUnitStatus && { otherUnitStatus: FRO_317Data.otherUnitStatus }),
            ...(FRO_317Data.timerStatus && { timerStatus: FRO_317Data.timerStatus }),
            ...(FRO_317Data.electricStatus && { electricStatus: FRO_317Data.electricStatus }),
            ...(FRO_317Data.mightyLubeMonitoring && { mightyLubeMonitoring: FRO_317Data.mightyLubeMonitoring }),
            ...(FRO_317Data.preMountType && { preMountType: FRO_317Data.preMountType }),
            ...(FRO_317Data.plcConnection && { plcConnection: FRO_317Data.plcConnection }),
            ...(FRO_317Data.otherControllerInfo && { otherControllerInfo: FRO_317Data.otherControllerInfo }),
            ...(FRO_317Data.frUnitType && { frUnitType: FRO_317Data.frUnitType }),
            ...(FRO_317Data.frInvertedA && { frInvertedA: FRO_317Data.frInvertedA }),
            ...(FRO_317Data.frInvertedB && { frInvertedB: FRO_317Data.frInvertedB }),
            ...(FRO_317Data.frInvertedE && { frInvertedE: FRO_317Data.frInvertedE }),
            ...(FRO_317Data.frInvertedG && { frInvertedG: FRO_317Data.frInvertedG }),
            ...(FRO_317Data.frInvertedH && { frInvertedH: FRO_317Data.frInvertedH }),
            ...(FRO_317Data.frInvertedS && { frInvertedS: FRO_317Data.frInvertedS }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_317" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_317 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;