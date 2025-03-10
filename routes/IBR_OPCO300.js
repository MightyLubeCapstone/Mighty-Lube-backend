const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const IBR_OPCO300 = require("../models/IBR_OPCO300");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for IBR_OPCO300 form
    try {
        const { IBR_OPCO300Data, numRequested } = req.body;
        const order = new IBR_OPCO300({
            ...(IBR_OPCO300Data.conveyorName && { conveyorName: IBR_OPCO300Data.conveyorName }),
            ...(IBR_OPCO300Data.chainSize && { chainSize: IBR_OPCO300Data.chainSize }),
            ...(IBR_OPCO300Data.industrialChainManufacturer && { industrialChainManufacturer: IBR_OPCO300Data.industrialChainManufacturer }),
            ...(IBR_OPCO300Data.otherChainManufacturer && { otherChainManufacturer: IBR_OPCO300Data.otherChainManufacturer }),
            ...(IBR_OPCO300Data.wheelManufacturer && { wheelManufacturer: IBR_OPCO300Data.wheelManufacturer }),
            ...(IBR_OPCO300Data.conveyorLength && { conveyorLength: IBR_OPCO300Data.conveyorLength }),
            ...(IBR_OPCO300Data.measurementUnit && { measurementUnit: IBR_OPCO300Data.measurementUnit }),
            ...(IBR_OPCO300Data.conveyorSpeed && { conveyorSpeed: IBR_OPCO300Data.conveyorSpeed }),
            ...(IBR_OPCO300Data.speedUnit && { speedUnit: IBR_OPCO300Data.speedUnit }),
            ...(IBR_OPCO300Data.conveyorIndex && { conveyorIndex: IBR_OPCO300Data.conveyorIndex }),
            ...(IBR_OPCO300Data.travelDirection && { travelDirection: IBR_OPCO300Data.travelDirection }),
            appEnviroment: IBR_OPCO300Data.appEnviroment,
            ...(IBR_OPCO300Data.ovenStatus && { ovenStatus: IBR_OPCO300Data.ovenStatus }),
            ...(IBR_OPCO300Data.ovenTemp && { ovenTemp: IBR_OPCO300Data.ovenTemp }),

            // TODO: Implement monitorData: templateB when complete on frontend
            
            ...(IBR_OPCO300Data.surrondingTemp && { surrondingTemp: IBR_OPCO300Data.surrondingTemp }),
            ...(IBR_OPCO300Data.conveyorLoaded && { conveyorLoaded: IBR_OPCO300Data.conveyorLoaded }),
            ...(IBR_OPCO300Data.conveyorSwing && { conveyorSwing: IBR_OPCO300Data.conveyorSwing }),
            ...(IBR_OPCO300Data.strandStatus && { strandStatus: IBR_OPCO300Data.strandStatus }),
            ...(IBR_OPCO300Data.plantLayout && { plantLayout: IBR_OPCO300Data.plantLayout }),
            ...(IBR_OPCO300Data.requiredPics && { requiredPics: IBR_OPCO300Data.requiredPics }),
            ...(IBR_OPCO300Data.operatingVoltage && { operatingVoltage: IBR_OPCO300Data.operatingVoltage }),
            ...(IBR_OPCO300Data.controlVoltage && { controlVoltage: IBR_OPCO300Data.controlVoltage }),
            ...(IBR_OPCO300Data.compressedAir && { compressedAir: IBR_OPCO300Data.compressedAir }),
            ...(IBR_OPCO300Data.airSupplyType && { airSupplyType: IBR_OPCO300Data.airSupplyType }),
            ...(IBR_OPCO300Data.wheelOpenType && { wheelOpenType: IBR_OPCO300Data.wheelOpenType }),
            ...(IBR_OPCO300Data.wheelClosedType && { wheelClosedType: IBR_OPCO300Data.wheelClosedType }),
            ...(IBR_OPCO300Data.openStatus && { openStatus: IBR_OPCO300Data.openStatus }),
            ...(IBR_OPCO300Data.freeWheelStatus && { freeWheelStatus: IBR_OPCO300Data.freeWheelStatus }),
            ...(IBR_OPCO300Data.guideRollerStatus && { guideRollerStatus: IBR_OPCO300Data.guideRollerStatus }),
            ...(IBR_OPCO300Data.openRaceStyle && { openRaceStyle: IBR_OPCO300Data.openRaceStyle }),
            ...(IBR_OPCO300Data.closedRaceStyle && { closedRaceStyle: IBR_OPCO300Data.closedRaceStyle }),
            ...(IBR_OPCO300Data.holeStatus && { holeStatus: IBR_OPCO300Data.holeStatus }),
            ...(IBR_OPCO300Data.rollerChainStatus && { rollerChainStatus: IBR_OPCO300Data.rollerChainStatus }),
            ...(IBR_OPCO300Data.brushStatus && { brushStatus: IBR_OPCO300Data.brushStatus }),
            ...(IBR_OPCO300Data.outboardStatus && { outboardStatus: IBR_OPCO300Data.outboardStatus }),
            ...(IBR_OPCO300Data.lubeBrand && { lubeBrand: IBR_OPCO300Data.lubeBrand }),
            ...(IBR_OPCO300Data.lubeType && { lubeType: IBR_OPCO300Data.lubeType }),
            ...(IBR_OPCO300Data.lubeViscosity && { lubeViscosity: IBR_OPCO300Data.lubeViscosity }),
            ...(IBR_OPCO300Data.currentGreaseGrade && { currentGreaseGrade: IBR_OPCO300Data.currentGreaseGrade }),
            ...(IBR_OPCO300Data.zerkDirection && { zerkDirection: IBR_OPCO300Data.zerkDirection }),
            ...(IBR_OPCO300Data.zerkLocationType && { zerkLocationType: IBR_OPCO300Data.zerkLocationType }),
            ...(IBR_OPCO300Data.chainMaster && { chainMaster: IBR_OPCO300Data.chainMaster }),
            ...(IBR_OPCO300Data.remoteStatus && { remoteStatus: IBR_OPCO300Data.remoteStatus }),
            ...(IBR_OPCO300Data.mountStatus && { mountStatus: IBR_OPCO300Data.mountStatus }),
            ...(IBR_OPCO300Data.otherUnitStatus && { otherUnitStatus: IBR_OPCO300Data.otherUnitStatus }),
            ...(IBR_OPCO300Data.timerStatus && { timerStatus: IBR_OPCO300Data.timerStatus }),
            ...(IBR_OPCO300Data.electricStatus && { electricStatus: IBR_OPCO300Data.electricStatus }),
            ...(IBR_OPCO300Data.mightyLubeMonitoring && { mightyLubeMonitoring: IBR_OPCO300Data.mightyLubeMonitoring }),
            ...(IBR_OPCO300Data.preMountType && { preMountType: IBR_OPCO300Data.preMountType }),
            ...(IBR_OPCO300Data.plcConnection && { plcConnection: IBR_OPCO300Data.plcConnection }),
            ...(IBR_OPCO300Data.otherControllerInfo && { otherControllerInfo: IBR_OPCO300Data.otherControllerInfo }),
            ...(IBR_OPCO300Data.ibrUnitType && { ibrUnitType: IBR_OPCO300Data.ibrUnitType }),
            ...(IBR_OPCO300Data.ibrChainA1 && { ibrChainA1: IBR_OPCO300Data.ibrChainA1 }),
            ...(IBR_OPCO300Data.ibrChainB1 && { ibrChainB1: IBR_OPCO300Data.ibrChainB1 }),
            ...(IBR_OPCO300Data.ibrChainC1 && { ibrChainC1: IBR_OPCO300Data.ibrChainC1 }),
            ...(IBR_OPCO300Data.ibrChainD1 && { ibrChainD1: IBR_OPCO300Data.ibrChainD1 }),
            ...(IBR_OPCO300Data.ibrChainE1 && { ibrChainE1: IBR_OPCO300Data.ibrChainE1 }),
            ...(IBR_OPCO300Data.ibrChainF1 && { ibrChainF1: IBR_OPCO300Data.ibrChainF1 }),
            ...(IBR_OPCO300Data.ibrChainG1 && { ibrChainG1: IBR_OPCO300Data.ibrChainG1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "IBR_OPCO300" });
        await req.user.save();

        return res.status(200).json({ message: "IBR_OPCO300 entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;