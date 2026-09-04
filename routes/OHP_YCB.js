const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OH_CCS_CLEANING_BRUSH = require("../models/OH_CCS_CLEANING_BRUSH");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OH_CCS_CLEANING_BRUSHData, numRequested } = req.body;

        const order = new OH_CCS_CLEANING_BRUSH({
            ...(OH_CCS_CLEANING_BRUSHData.conveyorName && {
                conveyorName: OH_CCS_CLEANING_BRUSHData.conveyorName
            }),

            ...(OH_CCS_CLEANING_BRUSHData.conveyorChainSize && {
                conveyorChainSize: OH_CCS_CLEANING_BRUSHData.conveyorChainSize
            }),

            ...(OH_CCS_CLEANING_BRUSHData.otherConveyorChainSize && {
                otherConveyorChainSize: OH_CCS_CLEANING_BRUSHData.otherConveyorChainSize
            }),

            ...(OH_CCS_CLEANING_BRUSHData.chainManufacturer && {
                chainManufacturer: OH_CCS_CLEANING_BRUSHData.chainManufacturer
            }),

            ...(OH_CCS_CLEANING_BRUSHData.otherChainManufacturer && {
                otherChainManufacturer: OH_CCS_CLEANING_BRUSHData.otherChainManufacturer
            }),

            ...(OH_CCS_CLEANING_BRUSHData.conveyorLength && {
                conveyorLength: OH_CCS_CLEANING_BRUSHData.conveyorLength
            }),

            ...(OH_CCS_CLEANING_BRUSHData.conveyorLengthUnit && {
                conveyorLengthUnit: OH_CCS_CLEANING_BRUSHData.conveyorLengthUnit
            }),

            applicationEnvironment:
                OH_CCS_CLEANING_BRUSHData.applicationEnvironment,

            ...(OH_CCS_CLEANING_BRUSHData.otherApplicationEnvironment && {
                otherApplicationEnvironment:
                    OH_CCS_CLEANING_BRUSHData.otherApplicationEnvironment
            }),

            ...(OH_CCS_CLEANING_BRUSHData.measurementUnit && {
                measurementUnit: OH_CCS_CLEANING_BRUSHData.measurementUnit
            }),

            ...(OH_CCS_CLEANING_BRUSHData.overheadPowerRailYokeRailH1 && {
                overheadPowerRailYokeRailH1:
                    OH_CCS_CLEANING_BRUSHData.overheadPowerRailYokeRailH1
            }),

            technicianNote:
                OH_CCS_CLEANING_BRUSHData.technicianNote
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OH_CCS_CLEANING_BRUSH"
        });

        await req.user.save();

        return res.status(200).json({
            message: "OH_CCS_CLEANING_BRUSH entry added"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router