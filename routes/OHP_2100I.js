const express = require("express");
const { authenticate } = require("./sessions");
const OHP_2100I = require("../models/OHP_2100I");

const router = express.Router();

/**
 * 2100L Series Self-Contained I-Beam Conveyor Lubricators
 *
 * Product ID: OHP_2100I
 * Request Body: OHP_2100IData
 */
router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_2100IData, numRequested } = req.body;

        const order = new OHP_2100I({

            // -------------------------------------------------
            // GENERAL INFORMATION
            // -------------------------------------------------

            ...(OHP_2100IData.conveyorName && {
                conveyorName: OHP_2100IData.conveyorName
            }),

            ...(OHP_2100IData.conveyorChainSize && {
                conveyorChainSize: OHP_2100IData.conveyorChainSize
            }),

            ...(OHP_2100IData.otherConveyorChainSize && {
                otherConveyorChainSize: OHP_2100IData.otherConveyorChainSize
            }),

            ...(OHP_2100IData.chainManufacturer && {
                chainManufacturer: OHP_2100IData.chainManufacturer
            }),

            ...(OHP_2100IData.otherChainManufacturer && {
                otherChainManufacturer: OHP_2100IData.otherChainManufacturer
            }),

            ...(OHP_2100IData.conveyorLength && {
                conveyorLength: OHP_2100IData.conveyorLength
            }),

            ...(OHP_2100IData.conveyorLengthUnit && {
                conveyorLengthUnit: OHP_2100IData.conveyorLengthUnit
            }),

            ...(OHP_2100IData.conveyorSpeed && {
                conveyorSpeed: OHP_2100IData.conveyorSpeed
            }),

            ...(OHP_2100IData.conveyorSpeedUnit && {
                conveyorSpeedUnit: OHP_2100IData.conveyorSpeedUnit
            }),

            ...(OHP_2100IData.indexingOrVariableSpeedConditions && {
                indexingOrVariableSpeedConditions:
                    OHP_2100IData.indexingOrVariableSpeedConditions
            }),

            ...(OHP_2100IData.directionOfTravel && {
                directionOfTravel: OHP_2100IData.directionOfTravel
            }),

            applicationEnvironment:
                OHP_2100IData.applicationEnvironment,

            ...(OHP_2100IData.surroundingTemperature && {
                surroundingTemperature:
                    OHP_2100IData.surroundingTemperature
            }),

            conveyorLoadedOrUnloaded:
                OHP_2100IData.conveyorLoadedOrUnloaded,

            conveyorMovement:
                OHP_2100IData.conveyorMovement,


            // -------------------------------------------------
            // CUSTOMER POWER UTILITIES
            // -------------------------------------------------

            operatingVoltageSinglePhase:
                OHP_2100IData.operatingVoltageSinglePhase,

            controlVoltage:
                OHP_2100IData.controlVoltage,


            // -------------------------------------------------
            // EXISTING MONITOR SYSTEMS
            // -------------------------------------------------

            ...(OHP_2100IData.connectingToExistingMonitoring && {
                connectingToExistingMonitoring:
                    OHP_2100IData.connectingToExistingMonitoring
            }),

            ...(OHP_2100IData.addNewMonitoringSystem && {
                addNewMonitoringSystem:
                    OHP_2100IData.addNewMonitoringSystem
            }),


            // -------------------------------------------------
            // CONVEYOR SPECIFICATIONS
            // -------------------------------------------------

            ...(OHP_2100IData.wheelOpenRaceStyle && {
                wheelOpenRaceStyle:
                    OHP_2100IData.wheelOpenRaceStyle
            }),

            ...(OHP_2100IData.wheelSealedStyle && {
                wheelSealedStyle:
                    OHP_2100IData.wheelSealedStyle
            }),

            ...(OHP_2100IData.powerChain && {
                powerChain: OHP_2100IData.powerChain
            }),

            ...(OHP_2100IData.chainPins && {
                chainPins: OHP_2100IData.chainPins
            }),

            ...(OHP_2100IData.caterpillarDrive && {
                caterpillarDrive:
                    OHP_2100IData.caterpillarDrive
            }),

            ...(OHP_2100IData.caterpillarDriveQuantity && {
                caterpillarDriveQuantity:
                    OHP_2100IData.caterpillarDriveQuantity
            }),

            ...(OHP_2100IData.railLubrication && {
                railLubrication:
                    OHP_2100IData.railLubrication
            }),

            ...(OHP_2100IData.externalLubrication && {
                externalLubrication:
                    OHP_2100IData.externalLubrication
            }),

            ...(OHP_2100IData.currentLubricationEquipmentBrand && {
                currentLubricationEquipmentBrand:
                    OHP_2100IData.currentLubricationEquipmentBrand
            }),

            ...(OHP_2100IData.currentLubricantType && {
                currentLubricantType:
                    OHP_2100IData.currentLubricantType
            }),

            ...(OHP_2100IData.currentLubricantViscosityGrade && {
                currentLubricantViscosityGrade:
                    OHP_2100IData.currentLubricantViscosityGrade
            }),

            ...(OHP_2100IData.lubricationFromSideOfChain && {
                lubricationFromSideOfChain:
                    OHP_2100IData.lubricationFromSideOfChain
            }),

            ...(OHP_2100IData.lubricationFromTopOfChain && {
                lubricationFromTopOfChain:
                    OHP_2100IData.lubricationFromTopOfChain
            }),

            ...(OHP_2100IData.conveyorChainClean && {
                conveyorChainClean:
                    OHP_2100IData.conveyorChainClean
            }),


            // -------------------------------------------------
            // WIRE
            // -------------------------------------------------

            ...(OHP_2100IData.wireMeasurementUnit && {
                wireMeasurementUnit:
                    OHP_2100IData.wireMeasurementUnit
            }),

            ...(OHP_2100IData.twoConductor && {
                twoConductor:
                    OHP_2100IData.twoConductor
            }),

            ...(OHP_2100IData.fourConductor && {
                fourConductor:
                    OHP_2100IData.fourConductor
            }),

            ...(OHP_2100IData.sevenConductor && {
                sevenConductor:
                    OHP_2100IData.sevenConductor
            }),

            ...(OHP_2100IData.twelveConductor && {
                twelveConductor:
                    OHP_2100IData.twelveConductor
            }),

            ...(OHP_2100IData.junctionBoxQuantity && {
                junctionBoxQuantity:
                    OHP_2100IData.junctionBoxQuantity
            }),


            // -------------------------------------------------
            // OVERHEAD POWER RAIL MEASUREMENTS
            // -------------------------------------------------

            ...(OHP_2100IData.measurementUnit && {
                measurementUnit:
                    OHP_2100IData.measurementUnit
            }),

            ...(OHP_2100IData.overheadPowerMonoRailPowerTrolleyWheelB && {
                overheadPowerMonoRailPowerTrolleyWheelB:
                    OHP_2100IData.overheadPowerMonoRailPowerTrolleyWheelB
            }),

            ...(OHP_2100IData.overheadPowerMonoRailPowerRailG && {
                overheadPowerMonoRailPowerRailG:
                    OHP_2100IData.overheadPowerMonoRailPowerRailG
            }),

            ...(OHP_2100IData.overheadPowerMonoRailPowerRailH && {
                overheadPowerMonoRailPowerRailH:
                    OHP_2100IData.overheadPowerMonoRailPowerRailH
            }),


            // -------------------------------------------------
            // TECHNICIAN NOTE
            // -------------------------------------------------

            technicianNote:
                OHP_2100IData.technicianNote
        });


        // -----------------------------------------------------
        // ADD PRODUCT TO USER CART
        // -----------------------------------------------------

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_2100I"
        });

        await req.user.save();

        return res.status(200).json({
            message: "OHP_2100I entry added"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router