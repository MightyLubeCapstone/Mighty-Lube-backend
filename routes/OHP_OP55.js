const express = require("express");
const { dbConnect } = require("../config/config"); // kept as-is
const { authenticate } = require("./sessions");
const OH_CCS_O55 = require("../models/OH_CCS_O55");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OH_CCS_O55Data, numRequested } = req.body;

        const order = new OH_CCS_O55({
            // =====================================================
            // GENERAL INFORMATION
            // =====================================================

            ...(OH_CCS_O55Data.conveyorName && {
                conveyorName: OH_CCS_O55Data.conveyorName,
            }),

            ...(OH_CCS_O55Data.conveyorChainSize && {
                conveyorChainSize: OH_CCS_O55Data.conveyorChainSize,
            }),

            ...(OH_CCS_O55Data.chainManufacturer && {
                chainManufacturer: OH_CCS_O55Data.chainManufacturer,
            }),

            ...(OH_CCS_O55Data.conveyorLength && {
                conveyorLength: OH_CCS_O55Data.conveyorLength,
            }),

            ...(OH_CCS_O55Data.conveyorLengthUnit && {
                conveyorLengthUnit: OH_CCS_O55Data.conveyorLengthUnit,
            }),

            ...(OH_CCS_O55Data.directionOfTravel && {
                directionOfTravel: OH_CCS_O55Data.directionOfTravel,
            }),

            applicationEnvironment:
                OH_CCS_O55Data.applicationEnvironment,

            ...(OH_CCS_O55Data.surroundingTemperatureOutsideRange && {
                surroundingTemperatureOutsideRange:
                    OH_CCS_O55Data.surroundingTemperatureOutsideRange,
            }),

            conveyorLoadState:
                OH_CCS_O55Data.conveyorLoadState,

            ...(OH_CCS_O55Data.conveyorOrientation && {
                conveyorOrientation:
                    OH_CCS_O55Data.conveyorOrientation,
            }),

            // =====================================================
            // CUSTOMER POWER UTILITIES
            // =====================================================

            controlVoltage:
                OH_CCS_O55Data.controlVoltage,

            compressedAirSupply:
                OH_CCS_O55Data.compressedAirSupply,

            ...(OH_CCS_O55Data.compressedAirSupplyUnit && {
                compressedAirSupplyUnit:
                    OH_CCS_O55Data.compressedAirSupplyUnit,
            }),

            // =====================================================
            // CONTROLLER
            // =====================================================

            ...(OH_CCS_O55Data.chainMasterController && {
                chainMasterController:
                    OH_CCS_O55Data.chainMasterController,
            }),

            ...(OH_CCS_O55Data.timer && {
                timer: OH_CCS_O55Data.timer,
            }),

            ...(OH_CCS_O55Data.electricOnOff && {
                electricOnOff: OH_CCS_O55Data.electricOnOff,
            }),

            ...(OH_CCS_O55Data.pneumaticOnOff && {
                pneumaticOnOff: OH_CCS_O55Data.pneumaticOnOff,
            }),

            ...(OH_CCS_O55Data.otherDescribe && {
                otherDescribe: OH_CCS_O55Data.otherDescribe,
            }),

            // =====================================================
            // OVERHEAD POWER RAIL: MEASUREMENTS
            // =====================================================

            ...(OH_CCS_O55Data.measurementUnit && {
                measurementUnit: OH_CCS_O55Data.measurementUnit,
            }),

            ...(OH_CCS_O55Data.chainDropA && {
                chainDropA: OH_CCS_O55Data.chainDropA,
            }),

            ...(OH_CCS_O55Data.overheadPowerMonoRailPowerRailG && {
                overheadPowerMonoRailPowerRailG:
                    OH_CCS_O55Data.overheadPowerMonoRailPowerRailG,
            }),

            ...(OH_CCS_O55Data.overheadPowerMonoRailPowerRailH && {
                overheadPowerMonoRailPowerRailH:
                    OH_CCS_O55Data.overheadPowerMonoRailPowerRailH,
            }),

            // =====================================================
            // TECHNICIAN NOTE
            // =====================================================

            technicianNote:
                OH_CCS_O55Data.technicianNote,
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OH_CCS_O55",
        });

        await req.user.save();

        return res.status(200).json({
            message: "OH_CCS_O55 entry added",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router