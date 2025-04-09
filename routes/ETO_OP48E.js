const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_OP48E = require("../models/ETO_OP48E");
const templateB = require("../models/templateB");

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
            monitorData: new templateB({
                existingMonitor: ETO_OP48EData.templateB.existingMonitor,
                newMonitor: ETO_OP48EData.templateB.newMonitor,
                ...(ETO_OP48EData.templateB.dcuStatus && { dcuStatus: ETO_OP48EData.templateB.dcuStatus }),
                ...(ETO_OP48EData.templateB.dcuNum && { dcuNum: ETO_OP48EData.templateB.dcuNum }),
                ...(ETO_OP48EData.templateB.existingWindows && { existingWindows: ETO_OP48EData.templateB.existingWindows }),
                ...(ETO_OP48EData.templateB.existingHeadUnit && { existingHeadUnit: ETO_OP48EData.templateB.existingHeadUnit }),
                ...(ETO_OP48EData.templateB.existingDCU && { existingDCU: ETO_OP48EData.templateB.existingDCU }),
                ...(ETO_OP48EData.templateB.existingPowerInterface && { existingPowerInterface: ETO_OP48EData.templateB.existingPowerInterface }),
                ...(ETO_OP48EData.templateB.newReservoir && { newReservoir: ETO_OP48EData.templateB.newReservoir }),
                ...(ETO_OP48EData.templateB.reservoirSize && { reservoirSize: ETO_OP48EData.templateB.reservoirSize }),
                ...(ETO_OP48EData.templateB.otherReservoirSize && { otherReservoirSize: ETO_OP48EData.templateB.otherReservoirSize }),
                ...(ETO_OP48EData.templateB.newReservoirNum && { newReservoirNum: ETO_OP48EData.templateB.newReservoirNum }),
                ...(ETO_OP48EData.templateB.typeMonitor && { typeMonitor: ETO_OP48EData.templateB.typeMonitor }),
                ...(ETO_OP48EData.templateB.driveMotorAmp && { driveMotorAmp: ETO_OP48EData.templateB.driveMotorAmp }),
                ...(ETO_OP48EData.templateB.driveMotorAmpNum && { driveMotorAmpNum: ETO_OP48EData.templateB.driveMotorAmpNum }),
                ...(ETO_OP48EData.templateB.driveTakeUpAir && { driveTakeUpAir: ETO_OP48EData.templateB.driveTakeUpAir }),
                ...(ETO_OP48EData.templateB.driveTakeUpAirNum && { driveTakeUpAirNum: ETO_OP48EData.templateB.driveTakeUpAirNum }),
                ...(ETO_OP48EData.templateB.takeUpDistance && { takeUpDistance: ETO_OP48EData.templateB.takeUpDistance }),
                ...(ETO_OP48EData.templateB.takeUpDistanceNum && { takeUpDistanceNum: ETO_OP48EData.templateB.takeUpDistanceNum }),
                ...(ETO_OP48EData.templateB.driveTemp && { driveTemp: ETO_OP48EData.templateB.driveTemp }),
                ...(ETO_OP48EData.templateB.driveTempNum && { driveTempNum: ETO_OP48EData.templateB.driveTempNum }),
                ...(ETO_OP48EData.templateB.driveVibration && { driveVibration: ETO_OP48EData.templateB.driveVibration }),
                ...(ETO_OP48EData.templateB.driveVibrationNum && { driveVibrationNum: ETO_OP48EData.templateB.driveVibrationNum }),
                ...(ETO_OP48EData.templateB.dogPitch && { dogPitch: ETO_OP48EData.templateB.dogPitch }),
                ...(ETO_OP48EData.templateB.dogPitchNum && { dogPitchNum: ETO_OP48EData.templateB.dogPitchNum }),
                ...(ETO_OP48EData.templateB.paintMarker && { paintMarker: ETO_OP48EData.templateB.paintMarker }),
                ...(ETO_OP48EData.templateB.paintMarkerNum && { paintMarkerNum: ETO_OP48EData.templateB.paintMarkerNum }),
                ...(ETO_OP48EData.templateB.chainVision && { chainVision: ETO_OP48EData.templateB.chainVision }),
                ...(ETO_OP48EData.templateB.lubeVision && { lubeVision: ETO_OP48EData.templateB.lubeVision }),
                ...(ETO_OP48EData.templateB.trolleyVision && { trolleyVision: ETO_OP48EData.templateB.trolleyVision }),
                ...(ETO_OP48EData.templateB.trolleyDetect && { trolleyDetect: ETO_OP48EData.templateB.trolleyDetect }),
                ...(ETO_OP48EData.templateB.omniView && { omniView: ETO_OP48EData.templateB.omniView }),
                ...(ETO_OP48EData.templateB.dcuUpgradeNum && { dcuUpgradeNum: ETO_OP48EData.templateB.dcuUpgradeNum }),
                ...(ETO_OP48EData.templateB.itNameOne && { itNameOne: ETO_OP48EData.templateB.itNameOne }),
                ...(ETO_OP48EData.templateB.itIPOne && { itIPOne: ETO_OP48EData.templateB.itIPOne }),
                ...(ETO_OP48EData.templateB.itGatewayOne && { itGatewayOne: ETO_OP48EData.templateB.itGatewayOne }),
                ...(ETO_OP48EData.templateB.itSubnetOne && { itSubnetOne: ETO_OP48EData.templateB.itSubnetOne }),
                ...(ETO_OP48EData.templateB.itDNSOne && { itDNSOne: ETO_OP48EData.templateB.itDNSOne }),
                ...(ETO_OP48EData.templateB.itSMTPOne && { itSMTPOne: ETO_OP48EData.templateB.itSMTPOne }),
                ...(ETO_OP48EData.templateB.itNameTwo && { itNameTwo: ETO_OP48EData.templateB.itNameTwo }),
                ...(ETO_OP48EData.templateB.itIPTwo && { itIPTwo: ETO_OP48EData.templateB.itIPTwo }),
                ...(ETO_OP48EData.templateB.itGatewayTwo && { itGatewayTwo: ETO_OP48EData.templateB.itGatewayTwo }),
                ...(ETO_OP48EData.templateB.itSubnetTwo && { itSubnetTwo: ETO_OP48EData.templateB.itSubnetTwo }),
                ...(ETO_OP48EData.templateB.itDNSTwo && { itDNSTwo: ETO_OP48EData.templateB.itDNSTwo }),
                ...(ETO_OP48EData.templateB.itSMTPTwo && { itSMTPTwo: ETO_OP48EData.templateB.itSMTPTwo }),
                ...(ETO_OP48EData.templateB.itNameThree && { itNameThree: ETO_OP48EData.templateB.itNameThree }),
                ...(ETO_OP48EData.templateB.itIPThree && { itIPThree: ETO_OP48EData.templateB.itIPThree }),
                ...(ETO_OP48EData.templateB.itGatewayThree && { itGatewayThree: ETO_OP48EData.templateB.itGatewayThree }),
                ...(ETO_OP48EData.templateB.itSubnetThree && { itSubnetThree: ETO_OP48EData.templateB.itSubnetThree }),
                ...(ETO_OP48EData.templateB.itDNSThree && { itDNSThree: ETO_OP48EData.templateB.itDNSThree }),
                ...(ETO_OP48EData.templateB.itSMTPThree && { itSMTPThree: ETO_OP48EData.templateB.itSMTPThree }),
                ...(ETO_OP48EData.templateB.itAdditionalNotes && { itAdditionalNotes: ETO_OP48EData.templateB.itAdditionalNotes }),
                ...(ETO_OP48EData.templateB.piuDistance && { piuDistance: ETO_OP48EData.templateB.piuDistance }),
                ...(ETO_OP48EData.templateB.switchDistance && { switchDistance: ETO_OP48EData.templateB.switchDistance }),
                ...(ETO_OP48EData.templateB.ampPickup && { ampPickup: ETO_OP48EData.templateB.ampPickup }),
                ...(ETO_OP48EData.templateB.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETO_OP48EData.templateB.fromAirTakeUpDistance }),
                ...(ETO_OP48EData.templateB.specialControllerOptions && { specialControllerOptions: ETO_OP48EData.templateB.specialControllerOptions })
            }),
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