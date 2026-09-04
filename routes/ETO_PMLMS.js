const express = require("express");
const { authenticate } = require("./sessions");
const ETO_PMLMS = require("../models/ETO_PMLMS");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { ETO_PMLMSData, numRequested } = req.body || {};

        if (!ETO_PMLMSData) {
            return res.status(400).json({
                error: "ETO_PMLMSData is required"
            });
        }

        const order = new ETO_PMLMS({
            // ====================================================
            // GENERAL INFORMATION
            // ====================================================

            conveyorName: ETO_PMLMSData.conveyorName,

            chainSize: ETO_PMLMSData.chainSize,

            otherChainSize: ETO_PMLMSData.otherChainSize,

            industrialChainManufacturer:
                ETO_PMLMSData.industrialChainManufacturer,

            otherIndustrialChainManufacturer:
                ETO_PMLMSData.otherIndustrialChainManufacturer,

            conveyorLength:
                ETO_PMLMSData.conveyorLength,

            conveyorLengthUnit:
                ETO_PMLMSData.conveyorLengthUnit,

            conveyorSpeed:
                ETO_PMLMSData.conveyorSpeed,

            conveyorSpeedUnit:
                ETO_PMLMSData.conveyorSpeedUnit,

            conveyorIndex:
                ETO_PMLMSData.conveyorIndex,

            travelDirection:
                ETO_PMLMSData.travelDirection,

            appEnviroment:
                ETO_PMLMSData.appEnviroment,

            otherAppEnviroment:
                ETO_PMLMSData.otherAppEnviroment,

            surroundingTemp:
                ETO_PMLMSData.surroundingTemp,

            conveyorLoaded:
                ETO_PMLMSData.conveyorLoaded,

            conveyorSwing:
                ETO_PMLMSData.conveyorSwing,


            // ====================================================
            // CUSTOMER POWER UTILITIES
            // ====================================================

            operatingVoltage:
                ETO_PMLMSData.operatingVoltage,


            // ====================================================
            // MONITORING FEATURES REQUESTED
            // ====================================================

            paintMarkerSystem:
                ETO_PMLMSData.paintMarkerSystem,


            // ====================================================
            // CONVEYOR SPECIFICATIONS
            // ====================================================

            chainCleanStatus:
                ETO_PMLMSData.chainCleanStatus,


            // ====================================================
            // MEASUREMENTS
            // ====================================================

            enclosedUnitType:
                ETO_PMLMSData.enclosedUnitType,

            enclosedTrackB:
                ETO_PMLMSData.enclosedTrackB,

            enclosedTrackG:
                ETO_PMLMSData.enclosedTrackG,

            enclosedTrackH:
                ETO_PMLMSData.enclosedTrackH,

            enclosedTrackS:
                ETO_PMLMSData.enclosedTrackS,

            enclosedTrackK2:
                ETO_PMLMSData.enclosedTrackK2,

            enclosedTrackL2:
                ETO_PMLMSData.enclosedTrackL2,

            enclosedTrackM2:
                ETO_PMLMSData.enclosedTrackM2,

            enclosedTrackN2:
                ETO_PMLMSData.enclosedTrackN2,

            enclosedTrackS2:
                ETO_PMLMSData.enclosedTrackS2
        });


        // ========================================================
        // ADD PRODUCT TO USER CART
        // ========================================================

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "ETO_PMLMS"
        });

        await req.user.save();

        return res.status(200).json({
            message: "ETO_PMLMS entry added"
        });

    } catch (error) {
        console.error("ETO_PMLMS Error:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;