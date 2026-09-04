const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_001 = require("../models/OHP_001");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_001Data, numRequested } = req.body;

        const order = new OHP_001({

            // ============================================================
            // GENERAL INFORMATION
            // ============================================================

            conveyorName: OHP_001Data.conveyorName,

            conveyorChainSize: OHP_001Data.conveyorChainSize,

            ...(OHP_001Data.conveyorChainSize === "Other" &&
                OHP_001Data.otherConveyorChainSize && {
                    otherConveyorChainSize:
                        OHP_001Data.otherConveyorChainSize
                }),

            chainManufacturer: OHP_001Data.chainManufacturer,

            ...(OHP_001Data.chainManufacturer === "Other" &&
                OHP_001Data.otherChainManufacturer && {
                    otherChainManufacturer:
                        OHP_001Data.otherChainManufacturer
                }),

            conveyorLength:
                OHP_001Data.conveyorLength,

            conveyorLengthUnit:
                OHP_001Data.conveyorLengthUnit,

            conveyorSpeed:
                OHP_001Data.conveyorSpeed,

            conveyorSpeedUnit:
                OHP_001Data.conveyorSpeedUnit,

            indexingOrVariableSpeedConditions:
                OHP_001Data.indexingOrVariableSpeedConditions,

            directionOfTravel:
                OHP_001Data.directionOfTravel,

            applicationEnvironment:
                OHP_001Data.applicationEnvironment,

            ...(OHP_001Data.applicationEnvironment === "Other" &&
                OHP_001Data.otherApplicationEnvironment && {
                    otherApplicationEnvironment:
                        OHP_001Data.otherApplicationEnvironment
                }),

            surroundingAreaTemperature:
                OHP_001Data.surroundingAreaTemperature,

            conveyorLoadedOrUnloaded:
                OHP_001Data.conveyorLoadedOrUnloaded,

            conveyorSwingSwaySurge:
                OHP_001Data.conveyorSwingSwaySurge,


            // ============================================================
            // CUSTOMER POWER UTILITIES
            // ============================================================

            operatingVoltageSinglePhase:
                OHP_001Data.operatingVoltageSinglePhase,

            controlVoltage:
                OHP_001Data.controlVoltage,


            // ============================================================
            // MONITORING FEATURES REQUESTED
            // ============================================================

            paintMarkerSystem:
                OHP_001Data.paintMarkerSystem,


            // ============================================================
            // CONVEYOR SPECIFICATIONS
            // ============================================================

            isConveyorChainClean:
                OHP_001Data.isConveyorChainClean,


            // ============================================================
            // OVERHEAD POWER RAIL MEASUREMENTS
            // ============================================================

            measurementUnit:
                OHP_001Data.measurementUnit,

            powerTrolleyWheelDiameter:
                OHP_001Data.powerTrolleyWheelDiameter,

            powerRailWidth:
                OHP_001Data.powerRailWidth,

            powerRailHeight:
                OHP_001Data.powerRailHeight,


            // ============================================================
            // TECHNICIAN NOTE
            // ============================================================

            technicianNote:
                OHP_001Data.technicianNote
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_001"
        });

        await req.user.save();

        return res.status(200).json({
            message: "OHP_001 entry added"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router