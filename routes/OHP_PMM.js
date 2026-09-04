const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const OHP_PMM = require("../models/OHP_PMM");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { OHP_PMMData, numRequested } = req.body;

        const order = new OHP_PMM({

            // ============================================================
            // GENERAL INFORMATION
            // ============================================================

            conveyorChainSize:
                OHP_PMMData.conveyorChainSize,

            ...(OHP_PMMData.conveyorChainSize === "Other" &&
                OHP_PMMData.otherConveyorChainSize && {
                    otherConveyorChainSize:
                        OHP_PMMData.otherConveyorChainSize
                }),

            chainManufacturer:
                OHP_PMMData.chainManufacturer,

            ...(OHP_PMMData.chainManufacturer === "Other" &&
                OHP_PMMData.otherChainManufacturer && {
                    otherChainManufacturer:
                        OHP_PMMData.otherChainManufacturer
                }),


            // ============================================================
            // NEW / EXISTING MONITORING SYSTEM
            // ============================================================

            connectingToExistingMonitoring:
                OHP_PMMData.connectingToExistingMonitoring,

            addNewMonitoringSystem:
                OHP_PMMData.addNewMonitoringSystem,


            // ============================================================
            // CONFIGURATION
            // ============================================================

            dcuQuantity:
                OHP_PMMData.dcuQuantity,


            // ============================================================
            // TECHNICIAN NOTE
            // ============================================================

            technicianNote:
                OHP_PMMData.technicianNote
        });

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "OHP_PMM"
        });

        await req.user.save();

        return res.status(200).json({
            message: "OHP_PMM entry added"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router