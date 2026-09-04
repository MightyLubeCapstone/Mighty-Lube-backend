const express = require("express");
const { authenticate } = require("./sessions");
const IBR_RFC = require("../models/IBR_RFC");

const router = express.Router();

// ============================================================
// MIGHTY LUBE ROLLER FLIGHT CONVEYOR
// Product ID: IBR_RFC
// POST /api/ibr_rfc
// ============================================================

router.post("/", authenticate, async (req, res) => {
    try {
        const { IBR_RFCData, numRequested } = req.body;

        // ====================================================
        // BASIC REQUEST VALIDATION
        // ====================================================

        if (!IBR_RFCData) {
            return res.status(400).json({
                error: "IBR_RFCData is required",
            });
        }

        // ====================================================
        // CREATE PRODUCT CONFIGURATION
        //
        // Keys below match the new Flutter ProductDetailData
        // contract directly.
        // ====================================================

        const order = new IBR_RFC({
            // ==================================================
            // GENERAL INFORMATION
            // ==================================================

            conveyorName: IBR_RFCData.conveyorName,

            conveyorChainSize: IBR_RFCData.conveyorChainSize,

            otherConveyorChainSize:
                IBR_RFCData.otherConveyorChainSize,

            chainManufacturer:
                IBR_RFCData.chainManufacturer,

            otherChainManufacturer:
                IBR_RFCData.otherChainManufacturer,

            conveyorLength:
                IBR_RFCData.conveyorLength,

            conveyorLengthUnit:
                IBR_RFCData.conveyorLengthUnit,

            conveyorSpeed:
                IBR_RFCData.conveyorSpeed,

            conveyorSpeedUnit:
                IBR_RFCData.conveyorSpeedUnit,

            indexingVariableSpeedConditions:
                IBR_RFCData.indexingVariableSpeedConditions,

            travelDirection:
                IBR_RFCData.travelDirection,

            applicationEnvironment:
                IBR_RFCData.applicationEnvironment,

            otherApplicationEnvironment:
                IBR_RFCData.otherApplicationEnvironment,

            surroundingTemperature:
                IBR_RFCData.surroundingTemperature,

            conveyorLoadedStatus:
                IBR_RFCData.conveyorLoadedStatus,

            conveyorSwingStatus:
                IBR_RFCData.conveyorSwingStatus,

            conveyorStrand:
                IBR_RFCData.conveyorStrand,

            // ==================================================
            // CUSTOMER POWER UTILITIES
            // ==================================================

            operatingVoltage:
                IBR_RFCData.operatingVoltage,

            controlVoltage:
                IBR_RFCData.controlVoltage,

            // ==================================================
            // NEW / EXISTING MONITORING SYSTEM
            // ==================================================

            existingMonitoring:
                IBR_RFCData.existingMonitoring,

            newMonitoringSystem:
                IBR_RFCData.newMonitoringSystem,

            // ==================================================
            // CONVEYOR SPECIFICATIONS
            // ==================================================

            wheelOpenRaceStyle:
                IBR_RFCData.wheelOpenRaceStyle,

            wheelSealedStyle:
                IBR_RFCData.wheelSealedStyle,

            openInsideShieldedOutside:
                IBR_RFCData.openInsideShieldedOutside,

            powerChain:
                IBR_RFCData.powerChain,

            chainPins:
                IBR_RFCData.chainPins,

            sliderPlates:
                IBR_RFCData.sliderPlates,

            outboardWheels:
                IBR_RFCData.outboardWheels,

            caterpillarDrive:
                IBR_RFCData.caterpillarDrive,

            caterpillarDriveQuantity:
                IBR_RFCData.caterpillarDriveQuantity,

            railLubrication:
                IBR_RFCData.railLubrication,

            externalLubrication:
                IBR_RFCData.externalLubrication,

            currentLubricationEquipmentBrand:
                IBR_RFCData.currentLubricationEquipmentBrand,

            currentLubricantType:
                IBR_RFCData.currentLubricantType,

            currentLubricantViscosityGrade:
                IBR_RFCData.currentLubricantViscosityGrade,

            reservoirSize:
                IBR_RFCData.reservoirSize,

            reservoirSizeQuantity:
                IBR_RFCData.reservoirSizeQuantity,

            conveyorChainClean:
                IBR_RFCData.conveyorChainClean,

            // ==================================================
            // CONTROLLER
            // ==================================================

            specialControllerOptions:
                IBR_RFCData.specialControllerOptions,

            controllerSpecify:
                IBR_RFCData.controllerSpecify,

            // ==================================================
            // IN BOARD ROLLER CHAIN: MEASUREMENTS
            // ==================================================

            measurementUnit:
                IBR_RFCData.measurementUnit,

            inBoardRollerChainRollerWheelA1:
                IBR_RFCData.inBoardRollerChainRollerWheelA1,

            inBoardRollerChainRollerWheelB1:
                IBR_RFCData.inBoardRollerChainRollerWheelB1,

            inBoardRollerChainLinkC1:
                IBR_RFCData.inBoardRollerChainLinkC1,

            inBoardRollerChainLinkD1:
                IBR_RFCData.inBoardRollerChainLinkD1,

            inBoardRollerChainOuterLinkOffsetF1:
                IBR_RFCData.inBoardRollerChainOuterLinkOffsetF1,

            // ==================================================
            // TECHNICIAN NOTE
            // ==================================================

            technicianNote:
                IBR_RFCData.technicianNote,
        });

        // ====================================================
        // ADD CONFIGURATION TO USER CART
        // ====================================================

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "IBR_RFC",
        });

        await req.user.save();

        // ====================================================
        // SUCCESS RESPONSE
        // ====================================================

        return res.status(200).json({
            message: "IBR_RFC entry added",
        });

    } catch (error) {
        console.error("IBR_RFC route error:");
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router