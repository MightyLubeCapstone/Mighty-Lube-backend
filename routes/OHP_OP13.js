const express = require("express");
const { authenticate } = require("./sessions");
const OH_CCS_OP13 = require("../models/OH_CCS_OP13");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OH_CCS_OP13Data, numRequested } = req.body;

        if (!OH_CCS_OP13Data) {
            return res.status(400).json({
                error: "OH_CCS_OP13Data is required",
            });
        }

        const order = new OH_CCS_OP13({
            // =====================================================
            // GENERAL INFORMATION
            // =====================================================

            conveyorName:
                OH_CCS_OP13Data.conveyorName,

            conveyorChainSize:
                OH_CCS_OP13Data.conveyorChainSize,

            otherConveyorChainSize:
                OH_CCS_OP13Data.otherConveyorChainSize,

            chainManufacturer:
                OH_CCS_OP13Data.chainManufacturer,

            otherChainManufacturer:
                OH_CCS_OP13Data.otherChainManufacturer,

            applicationEnvironment:
                OH_CCS_OP13Data.applicationEnvironment,

            otherApplicationEnvironment:
                OH_CCS_OP13Data.otherApplicationEnvironment,

            conveyorLoadStatus:
                OH_CCS_OP13Data.conveyorLoadStatus,

            hasPlantLayout:
                OH_CCS_OP13Data.hasPlantLayout,

            plantLayoutAttachment:
                OH_CCS_OP13Data.plantLayoutAttachment,

            hasRequiredPictures:
                OH_CCS_OP13Data.hasRequiredPictures,

            requiredPicturesAttachment:
                OH_CCS_OP13Data.requiredPicturesAttachment,

            // =====================================================
            // CUSTOMER POWER UTILITIES
            // =====================================================

            operatingVoltage:
                OH_CCS_OP13Data.operatingVoltage,

            controlVoltage:
                OH_CCS_OP13Data.controlVoltage,

            // =====================================================
            // SANITARY MEASUREMENTS
            // =====================================================

            measurementUnit:
                OH_CCS_OP13Data.measurementUnit,

            sanitaryChainDropA:
                OH_CCS_OP13Data.sanitaryChainDropA,

            sanitaryTrolleyWheelDiameterB:
                OH_CCS_OP13Data.sanitaryTrolleyWheelDiameterB,

            sanitaryWheelDropD:
                OH_CCS_OP13Data.sanitaryWheelDropD,

            sanitaryTrolleyWheelBottomWidthE:
                OH_CCS_OP13Data.sanitaryTrolleyWheelBottomWidthE,

            sanitaryTrolleyWheelTopWidthF:
                OH_CCS_OP13Data.sanitaryTrolleyWheelTopWidthF,

            sanitaryCenterSupportWidthG:
                OH_CCS_OP13Data.sanitaryCenterSupportWidthG,

            sanitaryCenterSupportHeightH:
                OH_CCS_OP13Data.sanitaryCenterSupportHeightH,

            sanitaryHookRadiusL1:
                OH_CCS_OP13Data.sanitaryHookRadiusL1,

            sanitaryHookRadiusL2:
                OH_CCS_OP13Data.sanitaryHookRadiusL2,

            sanitaryCHookSupportDiameterL3:
                OH_CCS_OP13Data.sanitaryCHookSupportDiameterL3,

            sanitaryCHookSupportHeightL4:
                OH_CCS_OP13Data.sanitaryCHookSupportHeightL4,

            sanitaryHookRadiusL5:
                OH_CCS_OP13Data.sanitaryHookRadiusL5,

            sanitaryHookRadiusL6:
                OH_CCS_OP13Data.sanitaryHookRadiusL6,

            // =====================================================
            // TECHNICIAN NOTE
            // =====================================================

            technicianNote:
                OH_CCS_OP13Data.technicianNote,
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OH_CCS_OP13",
        });

        await req.user.save();

        return res.status(200).json({
            message: "OH_CCS_OP13 entry added",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router