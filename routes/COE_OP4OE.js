// routes/COE_OP4OE.js
const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const COE_OP4OE = require("../models/COE_OP4OE");
const templateB = require("../models/templateB");


const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { COE_OP4OEData, numRequested } = req.body;

        const order = new COE_OP4OE({
            conveyorName: COE_OP4OEData.conveyorName,
            chainSize: COE_OP4OEData.chainSize,
            industrialChainManufacturer: COE_OP4OEData.industrialChainManufacturer,
            ...(COE_OP4OEData.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: COE_OP4OEData.otherIndustrialChainManufacturer }),
            conveyorLength: COE_OP4OEData.conveyorLength,
            conveyorLengthUnit: COE_OP4OEData.conveyorLengthUnit,
            conveyorSpeed: COE_OP4OEData.conveyorSpeed,
            conveyorSpeedUnit: COE_OP4OEData.conveyorSpeedUnit,
            ...(COE_OP4OEData.conveyorIndex && { conveyorIndex: COE_OP4OEData.conveyorIndex }),
            ...(COE_OP4OEData.travelDirection && { travelDirection: COE_OP4OEData.travelDirection }),
            appEnviroment: COE_OP4OEData.appEnviroment,
            ...(COE_OP4OEData.ovenStatus && { ovenStatus: COE_OP4OEData.ovenStatus }),
            ...(COE_OP4OEData.ovenTemp && { ovenTemp: COE_OP4OEData.ovenTemp }),
            ...(COE_OP4OEData.surroundingTemp && { surroundingTemp: COE_OP4OEData.surroundingTemp }),
            ...(COE_OP4OEData.conveyorLoaded && { conveyorLoaded: COE_OP4OEData.conveyorLoaded }),
            ...(COE_OP4OEData.conveyorSwing && { conveyorSwing: COE_OP4OEData.conveyorSwing }),
            ...(COE_OP4OEData.plantLayout && { plantLayout: COE_OP4OEData.plantLayout }),
            ...(COE_OP4OEData.requiredPics && { requiredPics: COE_OP4OEData.requiredPics }),
            operatingVoltage: COE_OP4OEData.operatingVoltage,

            monitorData: new templateB({
                existingMonitor: COE_OP4OEData.templateB.existingMonitor,
                newMonitor: COE_OP4OEData.templateB.newMonitor,
                ...(COE_OP4OEData.templateB.dcuStatus && { dcuStatus: COE_OP4OEData.templateB.dcuStatus }),
                ...(COE_OP4OEData.templateB.dcuNum && { dcuNum: COE_OP4OEData.templateB.dcuNum }),
                ...(COE_OP4OEData.templateB.existingWindows && { existingWindows: COE_OP4OEData.templateB.existingWindows }),
                ...(COE_OP4OEData.templateB.existingHeadUnit && { existingHeadUnit: COE_OP4OEData.templateB.existingHeadUnit }),
                ...(COE_OP4OEData.templateB.existingDCU && { existingDCU: COE_OP4OEData.templateB.existingDCU }),
                ...(COE_OP4OEData.templateB.existingPowerInterface && { existingPowerInterface: COE_OP4OEData.templateB.existingPowerInterface }),
                ...(COE_OP4OEData.templateB.newReservoir && { newReservoir: COE_OP4OEData.templateB.newReservoir }),
                ...(COE_OP4OEData.templateB.reservoirSize && { reservoirSize: COE_OP4OEData.templateB.reservoirSize }),
                ...(COE_OP4OEData.templateB.otherReservoirSize && { otherReservoirSize: COE_OP4OEData.templateB.otherReservoirSize }),
                ...(COE_OP4OEData.templateB.newReservoirNum && { newReservoirNum: COE_OP4OEData.templateB.newReservoirNum }),
                ...(COE_OP4OEData.templateB.typeMonitor && { typeMonitor: COE_OP4OEData.templateB.typeMonitor }),
                ...(COE_OP4OEData.templateB.driveMotorAmp && { driveMotorAmp: COE_OP4OEData.templateB.driveMotorAmp }),
                ...(COE_OP4OEData.templateB.driveMotorAmpNum && { driveMotorAmpNum: COE_OP4OEData.templateB.driveMotorAmpNum }),
                ...(COE_OP4OEData.templateB.driveTakeUpAir && { driveTakeUpAir: COE_OP4OEData.templateB.driveTakeUpAir }),
                ...(COE_OP4OEData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: COE_OP4OEData.templateB.driveTakeUpAirNum }),
                ...(COE_OP4OEData.templateB.takeUpDistance && { takeUpDistance: COE_OP4OEData.templateB.takeUpDistance }),
                ...(COE_OP4OEData.templateB.takeUpDistanceNum && { takeUpDistanceNum: COE_OP4OEData.templateB.takeUpDistanceNum }),
                ...(COE_OP4OEData.templateB.driveTemp && { driveTemp: COE_OP4OEData.templateB.driveTemp }),
                ...(COE_OP4OEData.templateB.driveTempNum && { driveTempNum: COE_OP4OEData.templateB.driveTempNum }),
                ...(COE_OP4OEData.templateB.driveVibration && { driveVibration: COE_OP4OEData.templateB.driveVibration }),
                ...(COE_OP4OEData.templateB.driveVibrationNum && { driveVibrationNum: COE_OP4OEData.templateB.driveVibrationNum }),
                ...(COE_OP4OEData.templateB.dogPitch && { dogPitch: COE_OP4OEData.templateB.dogPitch }),
                ...(COE_OP4OEData.templateB.dogPitchNum && { dogPitchNum: COE_OP4OEData.templateB.dogPitchNum }),
                ...(COE_OP4OEData.templateB.paintMarker && { paintMarker: COE_OP4OEData.templateB.paintMarker }),
                ...(COE_OP4OEData.templateB.paintMarkerNum && { paintMarkerNum: COE_OP4OEData.templateB.paintMarkerNum }),
                ...(COE_OP4OEData.templateB.chainVision && { chainVision: COE_OP4OEData.templateB.chainVision }),
                ...(COE_OP4OEData.templateB.lubeVision && { lubeVision: COE_OP4OEData.templateB.lubeVision }),
                ...(COE_OP4OEData.templateB.trolleyVision && { trolleyVision: COE_OP4OEData.templateB.trolleyVision }),
                ...(COE_OP4OEData.templateB.trolleyDetect && { trolleyDetect: COE_OP4OEData.templateB.trolleyDetect }),
                ...(COE_OP4OEData.templateB.omniView && { omniView: COE_OP4OEData.templateB.omniView }),
                ...(COE_OP4OEData.templateB.dcuUpgradeNum && { dcuUpgradeNum: COE_OP4OEData.templateB.dcuUpgradeNum }),
                ...(COE_OP4OEData.templateB.itNameOne && { itNameOne: COE_OP4OEData.templateB.itNameOne }),
                ...(COE_OP4OEData.templateB.itIPOne && { itIPOne: COE_OP4OEData.templateB.itIPOne }),
                ...(COE_OP4OEData.templateB.itGatewayOne && { itGatewayOne: COE_OP4OEData.templateB.itGatewayOne }),
                ...(COE_OP4OEData.templateB.itSubnetOne && { itSubnetOne: COE_OP4OEData.templateB.itSubnetOne }),
                ...(COE_OP4OEData.templateB.itDNSOne && { itDNSOne: COE_OP4OEData.templateB.itDNSOne }),
                ...(COE_OP4OEData.templateB.itSMTPOne && { itSMTPOne: COE_OP4OEData.templateB.itSMTPOne }),
                ...(COE_OP4OEData.templateB.itNameTwo && { itNameTwo: COE_OP4OEData.templateB.itNameTwo }),
                ...(COE_OP4OEData.templateB.itIPTwo && { itIPTwo: COE_OP4OEData.templateB.itIPTwo }),
                ...(COE_OP4OEData.templateB.itGatewayTwo && { itGatewayTwo: COE_OP4OEData.templateB.itGatewayTwo }),
                ...(COE_OP4OEData.templateB.itSubnetTwo && { itSubnetTwo: COE_OP4OEData.templateB.itSubnetTwo }),
                ...(COE_OP4OEData.templateB.itDNSTwo && { itDNSTwo: COE_OP4OEData.templateB.itDNSTwo }),
                ...(COE_OP4OEData.templateB.itSMTPTwo && { itSMTPTwo: COE_OP4OEData.templateB.itSMTPTwo }),
                ...(COE_OP4OEData.templateB.itNameThree && { itNameThree: COE_OP4OEData.templateB.itNameThree }),
                ...(COE_OP4OEData.templateB.itIPThree && { itIPThree: COE_OP4OEData.templateB.itIPThree }),
                ...(COE_OP4OEData.templateB.itGatewayThree && { itGatewayThree: COE_OP4OEData.templateB.itGatewayThree }),
                ...(COE_OP4OEData.templateB.itSubnetThree && { itSubnetThree: COE_OP4OEData.templateB.itSubnetThree }),
                ...(COE_OP4OEData.templateB.itDNSThree && { itDNSThree: COE_OP4OEData.templateB.itDNSThree }),
                ...(COE_OP4OEData.templateB.itSMTPThree && { itSMTPThree: COE_OP4OEData.templateB.itSMTPThree }),
                ...(COE_OP4OEData.templateB.itAdditionalNotes && { itAdditionalNotes: COE_OP4OEData.templateB.itAdditionalNotes }),
                ...(COE_OP4OEData.templateB.piuDistance && { piuDistance: COE_OP4OEData.templateB.piuDistance }),
                ...(COE_OP4OEData.templateB.switchDistance && { switchDistance: COE_OP4OEData.templateB.switchDistance }),
                ...(COE_OP4OEData.templateB.ampPickup && { ampPickup: COE_OP4OEData.templateB.ampPickup }),
                ...(COE_OP4OEData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: COE_OP4OEData.templateB.fromAirTakeUpDistance }),
                ...(COE_OP4OEData.templateB.specialControllerOptions && { specialControllerOptions: COE_OP4OEData.templateB.specialControllerOptions })
            }),
            
            catDriveStatus: COE_OP4OEData.catDriveStatus,
            
            // TODO: Implement template C when updated on frontend

            ...(COE_OP4OEData.wheelOpenType && { wheelOpenType: COE_OP4OEData.wheelOpenType }),
            ...(COE_OP4OEData.wheelClosedType && { wheelClosedType: COE_OP4OEData.wheelClosedType }),
            ...(COE_OP4OEData.openStatus && { openStatus: COE_OP4OEData.openStatus }),
            ...(COE_OP4OEData.holeStatus && { holeStatus: COE_OP4OEData.holeStatus }),
            ...(COE_OP4OEData.railLubeStatus && { railLubeStatus: COE_OP4OEData.railLubeStatus }),
            ...(COE_OP4OEData.lubeBrand && { lubeBrand: COE_OP4OEData.lubeBrand }),
            ...(COE_OP4OEData.lubeType && { lubeType: COE_OP4OEData.lubeType }),
            ...(COE_OP4OEData.lubeViscosity && { lubeViscosity: COE_OP4OEData.lubeViscosity }),
            ...(COE_OP4OEData.chainMaster && { chainMaster: COE_OP4OEData.chainMaster }),
            ...(COE_OP4OEData.timerStatus && { timerStatus: COE_OP4OEData.timerStatus }),
            ...(COE_OP4OEData.electricStatus && { electricStatus: COE_OP4OEData.electricStatus }),
            ...(COE_OP4OEData.pneumaticStatus && { pneumaticStatus: COE_OP4OEData.pneumaticStatus }),
            ...(COE_OP4OEData.mightyLubeMonitoring && { mightyLubeMonitoring: COE_OP4OEData.mightyLubeMonitoring }),
            ...(COE_OP4OEData.plcConnection && { plcConnection: COE_OP4OEData.plcConnection }),
            ...(COE_OP4OEData.otherControllerInfo && { otherControllerInfo: COE_OP4OEData.otherControllerInfo }),
            ...(COE_OP4OEData.coeUnitType && { coeUnitType: COE_OP4OEData.coeUnitType }),
            ...(COE_OP4OEData.coeLineA && { coeLineA: COE_OP4OEData.coeLineA }),
            ...(COE_OP4OEData.coeLineG && { coeLineG: COE_OP4OEData.coeLineG }),
            ...(COE_OP4OEData.coeLineH && { coeLineH: COE_OP4OEData.coeLineH }),
            ...(COE_OP4OEData.coeLineJ && { coeLineJ: COE_OP4OEData.coeLineJ }),
            ...(COE_OP4OEData.coeLineX && { coeLineX: COE_OP4OEData.coeLineX }),
            ...(COE_OP4OEData.coeLineY && { coeLineY: COE_OP4OEData.coeLineY }),
            ...(COE_OP4OEData.coeLineZ && { coeLineZ: COE_OP4OEData.coeLineZ })
        });

        req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "COE_OP4OE" });
        await req.user.save();

        return res.status(200).json({ message: "COE_OP4OE entry added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
