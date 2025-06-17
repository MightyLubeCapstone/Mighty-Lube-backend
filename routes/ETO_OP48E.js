const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const ETO_OP48E = require("../models/ETO_OP48E");
const templateA = require("../models/templateA");

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
            monitorData: new templateA({
                existingMonitor: ETO_OP48EData.templateA.existingMonitor,
                newMonitor: ETO_OP48EData.templateA.newMonitor,
                ...(ETO_OP48EData.templateA.dcuStatus && { dcuStatus: ETO_OP48EData.templateA.dcuStatus }),
                ...(ETO_OP48EData.templateA.dcuNum && { dcuNum: ETO_OP48EData.templateA.dcuNum }),
                ...(ETO_OP48EData.templateA.existingWindows && { existingWindows: ETO_OP48EData.templateA.existingWindows }),
                ...(ETO_OP48EData.templateA.existingHeadUnit && { existingHeadUnit: ETO_OP48EData.templateA.existingHeadUnit }),
                ...(ETO_OP48EData.templateA.existingDCU && { existingDCU: ETO_OP48EData.templateA.existingDCU }),
                ...(ETO_OP48EData.templateA.existingPowerInterface && { existingPowerInterface: ETO_OP48EData.templateA.existingPowerInterface }),
                ...(ETO_OP48EData.templateA.newReservoir && { newReservoir: ETO_OP48EData.templateA.newReservoir }),
                ...(ETO_OP48EData.templateA.reservoirSize && { reservoirSize: ETO_OP48EData.templateA.reservoirSize }),
                ...(ETO_OP48EData.templateA.otherReservoirSize && { otherReservoirSize: ETO_OP48EData.templateA.otherReservoirSize }),
                ...(ETO_OP48EData.templateA.newReservoirNum && { newReservoirNum: ETO_OP48EData.templateA.newReservoirNum }),
                ...(ETO_OP48EData.templateA.typeMonitor && { typeMonitor: ETO_OP48EData.templateA.typeMonitor }),
                ...(ETO_OP48EData.templateA.driveMotorAmp && { driveMotorAmp: ETO_OP48EData.templateA.driveMotorAmp }),
                ...(ETO_OP48EData.templateA.driveMotorAmpNum && { driveMotorAmpNum: ETO_OP48EData.templateA.driveMotorAmpNum }),
                ...(ETO_OP48EData.templateA.driveTakeUpAir && { driveTakeUpAir: ETO_OP48EData.templateA.driveTakeUpAir }),
                ...(ETO_OP48EData.templateA.driveTakeUpAirNum && { driveTakeUpAirNum: ETO_OP48EData.templateA.driveTakeUpAirNum }),
                ...(ETO_OP48EData.templateA.takeUpDistance && { takeUpDistance: ETO_OP48EData.templateA.takeUpDistance }),
                ...(ETO_OP48EData.templateA.takeUpDistanceNum && { takeUpDistanceNum: ETO_OP48EData.templateA.takeUpDistanceNum }),
                ...(ETO_OP48EData.templateA.driveTemp && { driveTemp: ETO_OP48EData.templateA.driveTemp }),
                ...(ETO_OP48EData.templateA.driveTempNum && { driveTempNum: ETO_OP48EData.templateA.driveTempNum }),
                ...(ETO_OP48EData.templateA.driveVibration && { driveVibration: ETO_OP48EData.templateA.driveVibration }),
                ...(ETO_OP48EData.templateA.driveVibrationNum && { driveVibrationNum: ETO_OP48EData.templateA.driveVibrationNum }),
                ...(ETO_OP48EData.templateA.dogPitch && { dogPitch: ETO_OP48EData.templateA.dogPitch }),
                ...(ETO_OP48EData.templateA.dogPitchNum && { dogPitchNum: ETO_OP48EData.templateA.dogPitchNum }),
                ...(ETO_OP48EData.templateA.paintMarker && { paintMarker: ETO_OP48EData.templateA.paintMarker }),
                ...(ETO_OP48EData.templateA.paintMarkerNum && { paintMarkerNum: ETO_OP48EData.templateA.paintMarkerNum }),
                ...(ETO_OP48EData.templateA.chainVision && { chainVision: ETO_OP48EData.templateA.chainVision }),
                ...(ETO_OP48EData.templateA.lubeVision && { lubeVision: ETO_OP48EData.templateA.lubeVision }),
                ...(ETO_OP48EData.templateA.trolleyVision && { trolleyVision: ETO_OP48EData.templateA.trolleyVision }),
                ...(ETO_OP48EData.templateA.trolleyDetect && { trolleyDetect: ETO_OP48EData.templateA.trolleyDetect }),
                ...(ETO_OP48EData.templateA.omniView && { omniView: ETO_OP48EData.templateA.omniView }),
                ...(ETO_OP48EData.templateA.dcuUpgradeNum && { dcuUpgradeNum: ETO_OP48EData.templateA.dcuUpgradeNum }),
                ...(ETO_OP48EData.templateA.itNameOne && { itNameOne: ETO_OP48EData.templateA.itNameOne }),
                ...(ETO_OP48EData.templateA.itIPOne && { itIPOne: ETO_OP48EData.templateA.itIPOne }),
                ...(ETO_OP48EData.templateA.itGatewayOne && { itGatewayOne: ETO_OP48EData.templateA.itGatewayOne }),
                ...(ETO_OP48EData.templateA.itSubnetOne && { itSubnetOne: ETO_OP48EData.templateA.itSubnetOne }),
                ...(ETO_OP48EData.templateA.itDNSOne && { itDNSOne: ETO_OP48EData.templateA.itDNSOne }),
                ...(ETO_OP48EData.templateA.itSMTPOne && { itSMTPOne: ETO_OP48EData.templateA.itSMTPOne }),
                ...(ETO_OP48EData.templateA.itNameTwo && { itNameTwo: ETO_OP48EData.templateA.itNameTwo }),
                ...(ETO_OP48EData.templateA.itIPTwo && { itIPTwo: ETO_OP48EData.templateA.itIPTwo }),
                ...(ETO_OP48EData.templateA.itGatewayTwo && { itGatewayTwo: ETO_OP48EData.templateA.itGatewayTwo }),
                ...(ETO_OP48EData.templateA.itSubnetTwo && { itSubnetTwo: ETO_OP48EData.templateA.itSubnetTwo }),
                ...(ETO_OP48EData.templateA.itDNSTwo && { itDNSTwo: ETO_OP48EData.templateA.itDNSTwo }),
                ...(ETO_OP48EData.templateA.itSMTPTwo && { itSMTPTwo: ETO_OP48EData.templateA.itSMTPTwo }),
                ...(ETO_OP48EData.templateA.itNameThree && { itNameThree: ETO_OP48EData.templateA.itNameThree }),
                ...(ETO_OP48EData.templateA.itIPThree && { itIPThree: ETO_OP48EData.templateA.itIPThree }),
                ...(ETO_OP48EData.templateA.itGatewayThree && { itGatewayThree: ETO_OP48EData.templateA.itGatewayThree }),
                ...(ETO_OP48EData.templateA.itSubnetThree && { itSubnetThree: ETO_OP48EData.templateA.itSubnetThree }),
                ...(ETO_OP48EData.templateA.itDNSThree && { itDNSThree: ETO_OP48EData.templateA.itDNSThree }),
                ...(ETO_OP48EData.templateA.itSMTPThree && { itSMTPThree: ETO_OP48EData.templateA.itSMTPThree }),
                ...(ETO_OP48EData.templateA.itAdditionalNotes && { itAdditionalNotes: ETO_OP48EData.templateA.itAdditionalNotes }),
                ...(ETO_OP48EData.templateA.piuDistance && { piuDistance: ETO_OP48EData.templateA.piuDistance }),
                ...(ETO_OP48EData.templateA.switchDistance && { switchDistance: ETO_OP48EData.templateA.switchDistance }),
                ...(ETO_OP48EData.templateA.ampPickup && { ampPickup: ETO_OP48EData.templateA.ampPickup }),
                ...(ETO_OP48EData.templateA.fromAirTakeUpDistance && { fromAirTakeUpDistance: ETO_OP48EData.templateA.fromAirTakeUpDistance }),
                ...(ETO_OP48EData.templateA.specialControllerOptions && { specialControllerOptions: ETO_OP48EData.templateA.specialControllerOptions })
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