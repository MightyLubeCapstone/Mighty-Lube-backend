const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FT_OPCO = require("../models/FT_OPCO");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FT_OPCO form
    try {
        const { FT_OPCOData, numRequested } = req.body;
        const order = new FT_OPCO({
            ...(FT_OPCOData.conveyorName && { conveyorName: FT_OPCOData.conveyorName }),
            ...(FT_OPCOData.chainSize && { chainSize: FT_OPCOData.chainSize }),
            industrialChainManufacturer: FT_OPCOData.industrialChainManufacturer,
            ...(FT_OPCOData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: FT_OPCOData.otherIndustrialChainManufacturer }),
            wheelManufacturer: FT_OPCOData.wheelManufacturer,
            ...(FT_OPCOData.otherWheelManufacturer && { otherWheelManufacturer: FT_OPCOData.otherWheelManufacturer }),
            ...(FT_OPCOData.conveyorLength && { conveyorLength: FT_OPCOData.conveyorLength }),
            ...(FT_OPCOData.conveyorLengthUnit && { conveyorLengthUnit: FT_OPCOData.conveyorLengthUnit }),
            ...(FT_OPCOData.conveyorSpeed && { conveyorSpeed: FT_OPCOData.conveyorSpeed }),
            ...(FT_OPCOData.conveyorSpeedUnit && { conveyorSpeedUnit: FT_OPCOData.conveyorSpeedUnit }),
            ...(FT_OPCOData.conveyorIndex && { conveyorIndex: FT_OPCOData.conveyorIndex }),
            ...(FT_OPCOData.travelDirection && { travelDirection: FT_OPCOData.travelDirection }),
            appEnviroment: FT_OPCOData.appEnviroment,
            ...(FT_OPCOData.ovenStatus && { ovenStatus: FT_OPCOData.ovenStatus }),
            ...(FT_OPCOData.ovenTemp && { ovenTemp: FT_OPCOData.ovenTemp }),
            ...(FT_OPCOData.surroundingTemp && { surroundingTemp: FT_OPCOData.surroundingTemp }),
            ...(FT_OPCOData.conveyorLoaded && { conveyorLoaded: FT_OPCOData.conveyorLoaded }),
            ...(FT_OPCOData.conveyorSwing && { conveyorSwing: FT_OPCOData.conveyorSwing }),
            ...(FT_OPCOData.strandStatus && { strandStatus: FT_OPCOData.strandStatus }),
            ...(FT_OPCOData.plantLayout && { plantLayout: FT_OPCOData.plantLayout }),
            ...(FT_OPCOData.requiredPics && { requiredPics: FT_OPCOData.requiredPics }),
            
            // TODO: Implement monitorData: templateB when complete on frontend

            ...(FT_OPCOData.wheelOpenType && { wheelOpenType: FT_OPCOData.wheelOpenType }),
            ...(FT_OPCOData.wheelClosedType && { wheelClosedType: FT_OPCOData.wheelClosedType }),
            ...(FT_OPCOData.openStatus && { openStatus: FT_OPCOData.openStatus }),
            ...(FT_OPCOData.freeWheelStatus && { freeWheelStatus: FT_OPCOData.freeWheelStatus }),
            ...(FT_OPCOData.guideRollerStatus && { guideRollerStatus: FT_OPCOData.guideRollerStatus }),
            ...(FT_OPCOData.openRaceStyleType && { openRaceStyleType: FT_OPCOData.openRaceStyleType }),
            ...(FT_OPCOData.closedRaceStyleType && { closedRaceStyleType: FT_OPCOData.closedRaceStyleType }),
            ...(FT_OPCOData.holeStatus && { holeStatus: FT_OPCOData.holeStatus }),
            ...(FT_OPCOData.rollerChainStatus && { rollerChainStatus: FT_OPCOData.rollerChainStatus }),
            ...(FT_OPCOData.brushStatus && { brushStatus: FT_OPCOData.brushStatus }),
            ...(FT_OPCOData.outboardStatus && { outboardStatus: FT_OPCOData.outboardStatus }),
            ...(FT_OPCOData.lubeBrand && { lubeBrand: FT_OPCOData.lubeBrand }),
            ...(FT_OPCOData.currentLube && { currentLube: FT_OPCOData.currentLube }),
            ...(FT_OPCOData.oilOrGrease && { oilOrGrease: FT_OPCOData.oilOrGrease }),
            ...(FT_OPCOData.lubeViscosity && { lubeViscosity: FT_OPCOData.lubeViscosity }),
            ...(FT_OPCOData.greaseNGLIGrade && { greaseNGLIGrade: FT_OPCOData.greaseNGLIGrade }),
            ...(FT_OPCOData.zerkDirection && { zerkDirection: FT_OPCOData.zerkDirection }),
            ...(FT_OPCOData.zerkLocationType && { zerkLocationType: FT_OPCOData.zerkLocationType }),
            ...(FT_OPCOData.chainMaster && { chainMaster: FT_OPCOData.chainMaster }),
            ...(FT_OPCOData.remoteStatus && { remoteStatus: FT_OPCOData.remoteStatus }),
            ...(FT_OPCOData.mountStatus && { mountStatus: FT_OPCOData.mountStatus }),
            ...(FT_OPCOData.otherUnitStatus && { otherUnitStatus: FT_OPCOData.otherUnitStatus }),
            ...(FT_OPCOData.timerStatus && { timerStatus: FT_OPCOData.timerStatus }),
            ...(FT_OPCOData.electricStatus && { electricStatus: FT_OPCOData.electricStatus }),
            ...(FT_OPCOData.mightyLubeMonitoring && { mightyLubeMonitoring: FT_OPCOData.mightyLubeMonitoring }),
            ...(FT_OPCOData.preMountType && { preMountType: FT_OPCOData.preMountType }),
            ...(FT_OPCOData.plcConnection && { plcConnection: FT_OPCOData.plcConnection }),
            ...(FT_OPCOData.otherControllerInfo && { otherControllerInfo: FT_OPCOData.otherControllerInfo }),
            ...(FT_OPCOData.ftUnitType && { ftUnitType: FT_OPCOData.ftUnitType }),
            ...(FT_OPCOData.ftTopF && { ftTopF: FT_OPCOData.ftTopF }),
            ...(FT_OPCOData.ftTopG && { ftTopG: FT_OPCOData.ftTopG }),
            ...(FT_OPCOData.ftTopH && { ftTopH: FT_OPCOData.ftTopH }),
            ...(FT_OPCOData.ftTopA1 && { ftTopA1: FT_OPCOData.ftTopA1 }),
            ...(FT_OPCOData.ftTopB1 && { ftTopB1: FT_OPCOData.ftTopB1 }),
            ...(FT_OPCOData.ftTopH1 && { ftTopH1: FT_OPCOData.ftTopH1 }),
            ...(FT_OPCOData.ftTopJ1 && { ftTopJ1: FT_OPCOData.ftTopJ1 }),
            ...(FT_OPCOData.ftTopK1 && { ftTopK1: FT_OPCOData.ftTopK1 }),
            ...(FT_OPCOData.ftTopL1 && { ftTopL1: FT_OPCOData.ftTopL1 }),
            ...(FT_OPCOData.ftTopM1 && { ftTopM1: FT_OPCOData.ftTopM1 }),
            ...(FT_OPCOData.ftTopN1 && { ftTopN1: FT_OPCOData.ftTopN1 }),
            ...(FT_OPCOData.ftTopP1 && { ftTopP1: FT_OPCOData.ftTopP1 }),
            ...(FT_OPCOData.ftTopR1 && { ftTopR1: FT_OPCOData.ftTopR1 }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FT_OPCO" });
        await req.user.save();

        return res.status(200).json({ message: "FT_OPCO entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;