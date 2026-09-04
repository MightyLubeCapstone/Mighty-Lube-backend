const express = require("express");
const { authenticate } = require("./sessions");
const OHP_OP52 = require("../models/OHP_OP52");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_OP52Data, numRequested } = req.body;

        const order = new OHP_OP52({
            // ============================================================
            // GENERAL INFORMATION
            // ============================================================

            conveyorName: OHP_OP52Data.conveyorName,

            conveyorChainSize: OHP_OP52Data.conveyorChainSize,

            ...(OHP_OP52Data.otherConveyorChainSize && {
                otherConveyorChainSize: OHP_OP52Data.otherConveyorChainSize
            }),

            chainManufacturer: OHP_OP52Data.chainManufacturer,

            ...(OHP_OP52Data.otherChainManufacturer && {
                otherChainManufacturer: OHP_OP52Data.otherChainManufacturer
            }),

            conveyorLength: OHP_OP52Data.conveyorLength,

            conveyorLengthUnit: OHP_OP52Data.conveyorLengthUnit,

            applicationEnvironment: OHP_OP52Data.applicationEnvironment,

            ...(OHP_OP52Data.otherApplicationEnvironment && {
                otherApplicationEnvironment:
                    OHP_OP52Data.otherApplicationEnvironment
            }),


            // ============================================================
            // CUSTOMER POWER UTILITIES
            // ============================================================

            controlVoltage: OHP_OP52Data.controlVoltage,


            // ============================================================
            // CONVEYOR SPECIFICATIONS
            // ============================================================

            currentLubricationEquipmentBrand:
                OHP_OP52Data.currentLubricationEquipmentBrand,

            currentLubricantType:
                OHP_OP52Data.currentLubricantType,

            currentLubricantViscosityGrade:
                OHP_OP52Data.currentLubricantViscosityGrade,

            lubricationFromSideOfChain:
                OHP_OP52Data.lubricationFromSideOfChain,

            lubricationFromTopOfChain:
                OHP_OP52Data.lubricationFromTopOfChain,


            // ============================================================
            // CONTROLLER
            // ============================================================

            chainMasterController:
                OHP_OP52Data.chainMasterController,

            timer:
                OHP_OP52Data.timer,

            electricOnOff:
                OHP_OP52Data.electricOnOff,

            plcConnection:
                OHP_OP52Data.plcConnection,

            otherControllerDescribe:
                OHP_OP52Data.otherControllerDescribe,

            controllerText:
                OHP_OP52Data.controllerText,

            controllerSpecialOptions:
                OHP_OP52Data.controllerSpecialOptions,

            controllerPleaseSpecify:
                OHP_OP52Data.controllerPleaseSpecify,


            // ============================================================
            // TECHNICIAN NOTE
            // ============================================================

            technicianNote:
                OHP_OP52Data.technicianNote,
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_OP52",
        });

        await req.user.save();

        return res.status(200).json({
            message: "OHP_OP52 entry added",
        });

    } catch (error) {
        console.error("OHP_OP52 route error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router