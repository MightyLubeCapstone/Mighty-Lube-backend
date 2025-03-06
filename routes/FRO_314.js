const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FRO_314 = require("../models/FRO_314");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FRO_314 form
    try {
        const { FRO_314Data, numRequested } = req.body;
        const order = new FRO_314({
            ...(FRO_314Data.conveyorName && { conveyorName: FRO_314Data.conveyorName }),
            ...(FRO_314Data.wheelManufacturer && { wheelManufacturer: FRO_314Data.wheelManufacturer }),
            ...(FRO_314Data.otherWheelManufacturer && { otherWheelManufacturer: FRO_314Data.otherWheelManufacturer }),
            ...(FRO_314Data.conveyorLength && { conveyorLength: FRO_314Data.conveyorLength }),
            ...(FRO_314Data.conveyorLengthUnit && { conveyorLengthUnit: FRO_314Data.conveyorLengthUnit }),
            ...(FRO_314Data.conveyorSpeed && { conveyorSpeed: FRO_314Data.conveyorSpeed }),
            ...(FRO_314Data.conveyorSpeedUnit && { conveyorSpeedUnit: FRO_314Data.conveyorSpeedUnit }),
            ...(FRO_314Data.travelDirection && { travelDirection: FRO_314Data.travelDirection }),
            appEnviroment: FRO_314Data.appEnviroment,
            ...(FRO_314Data.ovenStatus && { ovenStatus: FRO_314Data.ovenStatus }),
            ...(FRO_314Data.ovenTemp && { ovenTemp: FRO_314Data.ovenTemp }),
            ...(FRO_314Data.surroundingTemp && { surroundingTemp: FRO_314Data.surroundingTemp }),
            ...(FRO_314Data.conveyorSwing && { conveyorSwing: FRO_314Data.conveyorSwing }),
            ...(FRO_314Data.orientation && { orientation: FRO_314Data.orientation }),
            ...(FRO_314Data.operatingVoltage && { operatingVoltage: FRO_314Data.operatingVoltage }),
            ...(FRO_314Data.controlVoltage && { controlVoltage: FRO_314Data.controlVoltage }),
            ...(FRO_314Data.compressedAir && { compressedAir: FRO_314Data.compressedAir }),
            ...(FRO_314Data.airSupply && { airSupply: FRO_314Data.airSupply }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(FRO_314Data.freeWheelStatus && { freeWheelStatus: FRO_314Data.freeWheelStatus }),
            ...(FRO_314Data.actuatorStatus && { actuatorStatus: FRO_314Data.actuatorStatus }),
            ...(FRO_314Data.pivotStatus && { pivotStatus: FRO_314Data.pivotStatus }),
            ...(FRO_314Data.kingPinStatus && { kingPinStatus: FRO_314Data.kingPinStatus }),
            ...(FRO_314Data.lubeBrand && { lubeBrand: FRO_314Data.lubeBrand }),
            ...(FRO_314Data.lubeType && { lubeType: FRO_314Data.lubeType }),
            ...(FRO_314Data.lubeViscosity && { lubeViscosity: FRO_314Data.lubeViscosity }),
            ...(FRO_314Data.currentGrease && { currentGrease: FRO_314Data.currentGrease }),
            ...(FRO_314Data.currentGreaseGrade && { currentGreaseGrade: FRO_314Data.currentGreaseGrade }),
            ...(FRO_314Data.zerkDirection && { zerkDirection: FRO_314Data.zerkDirection }),
            ...(FRO_314Data.zerkLocation && { zerkLocation: FRO_314Data.zerkLocation }),
            ...(FRO_314Data.chainMaster && { chainMaster: FRO_314Data.chainMaster }),
            ...(FRO_314Data.remoteStatus && { remoteStatus: FRO_314Data.remoteStatus }),
            ...(FRO_314Data.mountStatus && { mountStatus: FRO_314Data.mountStatus }),
            ...(FRO_314Data.otherUnitStatus && { otherUnitStatus: FRO_314Data.otherUnitStatus }),
            ...(FRO_314Data.timerStatus && { timerStatus: FRO_314Data.timerStatus }),
            ...(FRO_314Data.electricStatus && { electricStatus: FRO_314Data.electricStatus }),
            ...(FRO_314Data.mightyLubeMonitoring && { mightyLubeMonitoring: FRO_314Data.mightyLubeMonitoring }),
            ...(FRO_314Data.preMountType && { preMountType: FRO_314Data.preMountType }),
            ...(FRO_314Data.plcConnection && { plcConnection: FRO_314Data.plcConnection }),
            ...(FRO_314Data.otherControllerInfo && { otherControllerInfo: FRO_314Data.otherControllerInfo }),
            ...(FRO_314Data.frUnitType && { frUnitType: FRO_314Data.frUnitType }),
            ...(FRO_314Data.frInvertedB && { frInvertedB: FRO_314Data.frInvertedB }),
            ...(FRO_314Data.frInvertedE && { frInvertedE: FRO_314Data.frInvertedE }),
            ...(FRO_314Data.frInvertedG && { frInvertedG: FRO_314Data.frInvertedG }),
            ...(FRO_314Data.frInvertedH && { frInvertedH: FRO_314Data.frInvertedH }),
            ...(FRO_314Data.frInvertedK && { frInvertedK: FRO_314Data.frInvertedK }),
            ...(FRO_314Data.frInvertedT && { frInvertedT: FRO_314Data.frInvertedT }),
            ...(FRO_314Data.frInvertedU && { frInvertedU: FRO_314Data.frInvertedU }),
            ...(FRO_314Data.frInvertedV && { frInvertedV: FRO_314Data.frInvertedV }),
            ...(FRO_314Data.frInvertedW && { frInvertedW: FRO_314Data.frInvertedW }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FRO_314" });
        await req.user.save();

        return res.status(200).json({ message: "FRO_314 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;