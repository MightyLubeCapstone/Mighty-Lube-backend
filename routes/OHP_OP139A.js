const express = require("express");
const { authenticate } = require("./sessions");
const OHP_OP139A = require("../models/OHP_OP139A");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP139AData, numRequested } = req.body;

        const order = new OHP_OP139A({

            // ============================================================
            // GENERAL INFORMATION
            // ============================================================

            conveyorName: OHP_OP139AData.conveyorName,

            conveyorChainSize: OHP_OP139AData.conveyorChainSize,

            ...(OHP_OP139AData.conveyorChainSize === "Other" &&
                OHP_OP139AData.otherConveyorChainSize && {
                    otherConveyorChainSize:
                        OHP_OP139AData.otherConveyorChainSize
                }),

            chainManufacturer: OHP_OP139AData.chainManufacturer,

            ...(OHP_OP139AData.chainManufacturer === "Other" &&
                OHP_OP139AData.otherChainManufacturer && {
                    otherChainManufacturer:
                        OHP_OP139AData.otherChainManufacturer
                }),

            conveyorLength: OHP_OP139AData.conveyorLength,

            conveyorLengthUnit:
                OHP_OP139AData.conveyorLengthUnit,

            conveyorSpeed:
                OHP_OP139AData.conveyorSpeed,

            conveyorSpeedUnit:
                OHP_OP139AData.conveyorSpeedUnit,

            indexingOrVariableSpeedConditions:
                OHP_OP139AData.indexingOrVariableSpeedConditions,

            directionOfTravel:
                OHP_OP139AData.directionOfTravel,

            applicationEnvironment:
                OHP_OP139AData.applicationEnvironment,

            surroundingAreaTemperature:
                OHP_OP139AData.surroundingAreaTemperature,

            conveyorLoadedOrUnloaded:
                OHP_OP139AData.conveyorLoadedOrUnloaded,

            conveyorSwingSwaySurge:
                OHP_OP139AData.conveyorSwingSwaySurge,


            // ============================================================
            // CUSTOMER POWER UTILITIES
            // ============================================================

            operatingVoltageSinglePhase:
                OHP_OP139AData.operatingVoltageSinglePhase,

            controlVoltage:
                OHP_OP139AData.controlVoltage,

            compressedAirSupply:
                OHP_OP139AData.compressedAirSupply,

            compressedAirSupplyUnit:
                OHP_OP139AData.compressedAirSupplyUnit,


            // ============================================================
            // MONITORING SYSTEM
            // ============================================================

            connectingToExistingMonitoring:
                OHP_OP139AData.connectingToExistingMonitoring,

            addNewMonitoringSystem:
                OHP_OP139AData.addNewMonitoringSystem,


            // ============================================================
            // CONVEYOR SPECIFICATIONS
            // ============================================================

            railLubrication:
                OHP_OP139AData.railLubrication,

            currentLubricationEquipmentBrand:
                OHP_OP139AData.currentLubricationEquipmentBrand,

            currentLubricantType:
                OHP_OP139AData.currentLubricantType,

            currentLubricantViscosityGrade:
                OHP_OP139AData.currentLubricantViscosityGrade,

            lubricationFromSideOfChain:
                OHP_OP139AData.lubricationFromSideOfChain,

            lubricationFromTopOfChain:
                OHP_OP139AData.lubricationFromTopOfChain,

            isConveyorChainClean:
                OHP_OP139AData.isConveyorChainClean,


            // ============================================================
            // CONTROLLER
            // ============================================================

            chainMasterController:
                OHP_OP139AData.chainMasterController,

            controlsOtherUnits:
                OHP_OP139AData.controlsOtherUnits,

            timer:
                OHP_OP139AData.timer,

            electricOnOff:
                OHP_OP139AData.electricOnOff,

            pneumaticOnOff:
                OHP_OP139AData.pneumaticOnOff,

            mightyLubeMonitoring:
                OHP_OP139AData.mightyLubeMonitoring,

            preMountingRequirements:
                OHP_OP139AData.preMountingRequirements,

            plcConnection:
                OHP_OP139AData.plcConnection,

            otherControllerDescribe:
                OHP_OP139AData.otherControllerDescribe,


            // ============================================================
            // OVERHEAD POWER RAIL MEASUREMENTS
            // ============================================================

            measurementUnit:
                OHP_OP139AData.measurementUnit,

            chainDrop:
                OHP_OP139AData.chainDrop,

            powerTrolleyWheelDiameter:
                OHP_OP139AData.powerTrolleyWheelDiameter,

            powerRailWidth:
                OHP_OP139AData.powerRailWidth,

            powerRailHeight:
                OHP_OP139AData.powerRailHeight,


            // ============================================================
            // TECHNICIAN NOTE
            // ============================================================

            technicianNote:
                OHP_OP139AData.technicianNote
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP139A"
        });

        await req.user.save();

        return res.status(200).json({
            message: "OHP_OP139A entry added"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router