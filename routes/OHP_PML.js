const express = require("express");
const { dbConnect } = require("../config/config"); // kept as existing
const { authenticate } = require("./sessions");
const OHP_PML = require("../models/OHP_PML");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_PMLData, numRequested } = req.body;

        const order = new OHP_PML({

            // ============================================================
            // GENERAL INFORMATION
            // ============================================================

            conveyorName: OHP_PMLData.conveyorName,

            conveyorChainSize: OHP_PMLData.conveyorChainSize,

            ...(OHP_PMLData.conveyorChainSize === "Other" &&
                OHP_PMLData.otherConveyorChainSize && {
                    otherConveyorChainSize:
                        OHP_PMLData.otherConveyorChainSize
                }),

            chainManufacturer: OHP_PMLData.chainManufacturer,

            ...(OHP_PMLData.chainManufacturer === "Other" &&
                OHP_PMLData.otherChainManufacturer && {
                    otherChainManufacturer:
                        OHP_PMLData.otherChainManufacturer
                }),

            conveyorLength: OHP_PMLData.conveyorLength,

            conveyorLengthUnit:
                OHP_PMLData.conveyorLengthUnit,

            conveyorSpeed:
                OHP_PMLData.conveyorSpeed,

            conveyorSpeedUnit:
                OHP_PMLData.conveyorSpeedUnit,

            indexingOrVariableSpeedConditions:
                OHP_PMLData.indexingOrVariableSpeedConditions,

            directionOfTravel:
                OHP_PMLData.directionOfTravel,

            applicationEnvironment:
                OHP_PMLData.applicationEnvironment,

            ...(OHP_PMLData.applicationEnvironment === "Other" &&
                OHP_PMLData.otherApplicationEnvironment && {
                    otherApplicationEnvironment:
                        OHP_PMLData.otherApplicationEnvironment
                }),

            surroundingAreaTemperature:
                OHP_PMLData.surroundingAreaTemperature,

            conveyorLoadedOrUnloaded:
                OHP_PMLData.conveyorLoadedOrUnloaded,

            conveyorSwingSwaySurge:
                OHP_PMLData.conveyorSwingSwaySurge,


            // ============================================================
            // CUSTOMER POWER UTILITIES
            // ============================================================

            operatingVoltageSinglePhase:
                OHP_PMLData.operatingVoltageSinglePhase,


            // ============================================================
            // MONITORING FEATURES REQUESTED
            // ============================================================

            paintMarkerSystem:
                OHP_PMLData.paintMarkerSystem,


            // ============================================================
            // CONVEYOR SPECIFICATIONS
            // ============================================================

            isConveyorClean:
                OHP_PMLData.isConveyorClean,


            // ============================================================
            // OVERHEAD POWER RAIL MEASUREMENTS
            // ============================================================

            measurementUnit:
                OHP_PMLData.measurementUnit,

            chainDrop:
                OHP_PMLData.chainDrop,

            powerTrolleyWheelDiameter:
                OHP_PMLData.powerTrolleyWheelDiameter,

            powerRailWidth:
                OHP_PMLData.powerRailWidth,

            powerRailHeight:
                OHP_PMLData.powerRailHeight,


            // ============================================================
            // TECHNICIAN NOTE
            // ============================================================

            technicianNote:
                OHP_PMLData.technicianNote
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_PML"
        });

        await req.user.save();

        return res.status(200).json({
            message: "OHP_PML entry added"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router