const express = require("express");
const { authenticate } = require("./sessions");
const OHP_9000I = require("../models/OHP_9000I");

const router = express.Router();

/**
 * ============================================================
 * 9000L SERIES CENTRAL SYSTEM I-BEAM CONVEYOR LUBRICATORS
 * ============================================================
 *
 * Product ID: OHP_9000I
 * Request Body: OHP_9000IData
 *
 * - Receives OHP_9000IData + numRequested
 * - Creates OHP_9000I configuration
 * - Pushes configuration into authenticated user's cart
 * - Uses the current website / Flutter configuration contract
 *
 * Legacy templateA / templateB / templateC mappings are no
 * longer used by the current product configurator.
 */
router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_9000IData, numRequested } = req.body;

        const order = new OHP_9000I({

            // ============================================================
            // GENERAL INFORMATION
            // ============================================================

            ...(OHP_9000IData.conveyorName && {
                conveyorName: OHP_9000IData.conveyorName
            }),

            ...(OHP_9000IData.conveyorChainSize && {
                conveyorChainSize: OHP_9000IData.conveyorChainSize
            }),

            ...(OHP_9000IData.otherConveyorChainSize && {
                otherConveyorChainSize:
                    OHP_9000IData.otherConveyorChainSize
            }),

            ...(OHP_9000IData.chainManufacturer && {
                chainManufacturer: OHP_9000IData.chainManufacturer
            }),

            ...(OHP_9000IData.otherChainManufacturer && {
                otherChainManufacturer:
                    OHP_9000IData.otherChainManufacturer
            }),

            ...(OHP_9000IData.conveyorLength && {
                conveyorLength: OHP_9000IData.conveyorLength
            }),

            ...(OHP_9000IData.conveyorLengthUnit && {
                conveyorLengthUnit: OHP_9000IData.conveyorLengthUnit
            }),

            ...(OHP_9000IData.conveyorSpeed && {
                conveyorSpeed: OHP_9000IData.conveyorSpeed
            }),

            ...(OHP_9000IData.conveyorSpeedUnit && {
                conveyorSpeedUnit: OHP_9000IData.conveyorSpeedUnit
            }),

            ...(OHP_9000IData.indexingOrVariableSpeedConditions && {
                indexingOrVariableSpeedConditions:
                    OHP_9000IData.indexingOrVariableSpeedConditions
            }),

            ...(OHP_9000IData.directionOfTravel && {
                directionOfTravel: OHP_9000IData.directionOfTravel
            }),

            // Website required field
            applicationEnvironment:
                OHP_9000IData.applicationEnvironment,

            ...(OHP_9000IData.otherApplicationEnvironment && {
                otherApplicationEnvironment:
                    OHP_9000IData.otherApplicationEnvironment
            }),

            ...(OHP_9000IData.surroundingTemperature && {
                surroundingTemperature:
                    OHP_9000IData.surroundingTemperature
            }),

            // Website required field
            conveyorLoadedOrUnloaded:
                OHP_9000IData.conveyorLoadedOrUnloaded,

            // Website required field
            conveyorMovement:
                OHP_9000IData.conveyorMovement,


            // ============================================================
            // CUSTOMER POWER UTILITIES
            // ============================================================

            // Website required field
            operatingVoltageSinglePhase:
                OHP_9000IData.operatingVoltageSinglePhase,

            // Website required field
            controlVoltage:
                OHP_9000IData.controlVoltage,


            // ============================================================
            // NEW MONITORING SYSTEM OR ADDING TO EXISTING MONITORING SYSTEM
            // ============================================================

            ...(OHP_9000IData.connectingToExistingMonitoring && {
                connectingToExistingMonitoring:
                    OHP_9000IData.connectingToExistingMonitoring
            }),

            ...(OHP_9000IData.addNewMonitoringSystem && {
                addNewMonitoringSystem:
                    OHP_9000IData.addNewMonitoringSystem
            }),


            // ============================================================
            // CONVEYOR SPECIFICATIONS
            // ============================================================

            ...(OHP_9000IData.wheelOpenRaceStyle && {
                wheelOpenRaceStyle:
                    OHP_9000IData.wheelOpenRaceStyle
            }),

            ...(OHP_9000IData.wheelSealedStyle && {
                wheelSealedStyle:
                    OHP_9000IData.wheelSealedStyle
            }),

            ...(OHP_9000IData.powerChain && {
                powerChain: OHP_9000IData.powerChain
            }),

            ...(OHP_9000IData.chainPins && {
                chainPins: OHP_9000IData.chainPins
            }),

            ...(OHP_9000IData.caterpillarDrive && {
                caterpillarDrive:
                    OHP_9000IData.caterpillarDrive
            }),

            ...(OHP_9000IData.caterpillarDriveQuantity && {
                caterpillarDriveQuantity:
                    OHP_9000IData.caterpillarDriveQuantity
            }),

            ...(OHP_9000IData.railLubrication && {
                railLubrication:
                    OHP_9000IData.railLubrication
            }),

            ...(OHP_9000IData.externalLubrication && {
                externalLubrication:
                    OHP_9000IData.externalLubrication
            }),

            ...(OHP_9000IData.currentLubricationEquipmentBrand && {
                currentLubricationEquipmentBrand:
                    OHP_9000IData.currentLubricationEquipmentBrand
            }),

            ...(OHP_9000IData.currentLubricantType && {
                currentLubricantType:
                    OHP_9000IData.currentLubricantType
            }),

            ...(OHP_9000IData.currentLubricantViscosityGrade && {
                currentLubricantViscosityGrade:
                    OHP_9000IData.currentLubricantViscosityGrade
            }),

            ...(OHP_9000IData.lubricationFromSideOfChain && {
                lubricationFromSideOfChain:
                    OHP_9000IData.lubricationFromSideOfChain
            }),

            ...(OHP_9000IData.lubricationFromTopOfChain && {
                lubricationFromTopOfChain:
                    OHP_9000IData.lubricationFromTopOfChain
            }),

            ...(OHP_9000IData.reservoirSize && {
                reservoirSize:
                    OHP_9000IData.reservoirSize
            }),

            ...(OHP_9000IData.reservoirSizeQuantity && {
                reservoirSizeQuantity:
                    OHP_9000IData.reservoirSizeQuantity
            }),


            // ============================================================
            // CONTROLLER
            // ============================================================

            ...(OHP_9000IData.controllerSpecialOptions && {
                controllerSpecialOptions:
                    OHP_9000IData.controllerSpecialOptions
            }),

            ...(OHP_9000IData.controllerPleaseSpecify && {
                controllerPleaseSpecify:
                    OHP_9000IData.controllerPleaseSpecify
            }),


            // ============================================================
            // WIRE
            // ============================================================

            ...(OHP_9000IData.wireMeasurementUnit && {
                wireMeasurementUnit:
                    OHP_9000IData.wireMeasurementUnit
            }),

            ...(OHP_9000IData.twoConductor && {
                twoConductor:
                    OHP_9000IData.twoConductor
            }),

            ...(OHP_9000IData.fourConductor && {
                fourConductor:
                    OHP_9000IData.fourConductor
            }),

            ...(OHP_9000IData.sevenConductor && {
                sevenConductor:
                    OHP_9000IData.sevenConductor
            }),

            ...(OHP_9000IData.twelveConductor && {
                twelveConductor:
                    OHP_9000IData.twelveConductor
            }),

            ...(OHP_9000IData.junctionBoxQuantities && {
                junctionBoxQuantities:
                    OHP_9000IData.junctionBoxQuantities
            }),


            // ============================================================
            // OVERHEAD POWER RAIL: MEASUREMENTS
            // ============================================================

            ...(OHP_9000IData.measurementUnit && {
                measurementUnit:
                    OHP_9000IData.measurementUnit
            }),

            ...(OHP_9000IData.overheadPowerMonoRailPowerTrolleyWheelB && {
                overheadPowerMonoRailPowerTrolleyWheelB:
                    OHP_9000IData.overheadPowerMonoRailPowerTrolleyWheelB
            }),

            ...(OHP_9000IData.overheadPowerMonoRailPowerRailG && {
                overheadPowerMonoRailPowerRailG:
                    OHP_9000IData.overheadPowerMonoRailPowerRailG
            }),

            ...(OHP_9000IData.overheadPowerMonoRailPowerRailH && {
                overheadPowerMonoRailPowerRailH:
                    OHP_9000IData.overheadPowerMonoRailPowerRailH
            }),


            // ============================================================
            // TECHNICIAN NOTE
            // Required as part of current product workflow.
            // ============================================================

            technicianNote:
                OHP_9000IData.technicianNote
        });


        // ============================================================
        // ADD PRODUCT CONFIGURATION TO USER CART
        // ============================================================

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_9000I"
        });

        await req.user.save();


        // ============================================================
        // SUCCESS RESPONSE
        // ============================================================

        return res.status(200).json({
            message: "OHP_9000I entry added"
        });

    } catch (error) {

        // ============================================================
        // ERROR RESPONSE
        // ============================================================

        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router