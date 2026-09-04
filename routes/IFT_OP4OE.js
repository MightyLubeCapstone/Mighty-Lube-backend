const express = require("express");
const { authenticate } = require("./sessions");
const IFT_OP4OE = require("../models/IFT_OP4OE");

const router = express.Router();


// ============================================================
// OP-40E - IN FLOOR TOW LINE
// Product ID: IFT_OP4OE
// POST /
// Request Body:
// {
//   IFT_OP4OEData: {...},
//   numRequested: number
// }
// ============================================================

router.post("/", authenticate, async (req, res) => {
    try {
        const { IFT_OP4OEData, numRequested } = req.body;

        // ====================================================
        // BASIC REQUEST VALIDATION
        // ====================================================

        if (!IFT_OP4OEData) {
            return res.status(400).json({
                success: false,
                message: "IFT_OP4OEData is required",
            });
        }


        // ====================================================
        // CREATE PRODUCT CONFIGURATION
        // ====================================================

        const order = new IFT_OP4OE({

            // =================================================
            // GENERAL INFORMATION
            // =================================================

            conveyorName:
                IFT_OP4OEData.conveyorName,

            conveyorChainSize:
                IFT_OP4OEData.conveyorChainSize,

            otherConveyorChainSize:
                IFT_OP4OEData.otherConveyorChainSize,

            chainManufacturer:
                IFT_OP4OEData.chainManufacturer,

            otherChainManufacturer:
                IFT_OP4OEData.otherChainManufacturer,

            conveyorLength:
                IFT_OP4OEData.conveyorLength,

            conveyorLengthUnit:
                IFT_OP4OEData.conveyorLengthUnit,

            conveyorSpeed:
                IFT_OP4OEData.conveyorSpeed,

            conveyorSpeedUnit:
                IFT_OP4OEData.conveyorSpeedUnit,

            indexingVariableSpeedConditions:
                IFT_OP4OEData.indexingVariableSpeedConditions,

            travelDirection:
                IFT_OP4OEData.travelDirection,

            applicationEnvironment:
                IFT_OP4OEData.applicationEnvironment,

            otherApplicationEnvironment:
                IFT_OP4OEData.otherApplicationEnvironment,

            surroundingTemperature:
                IFT_OP4OEData.surroundingTemperature,

            conveyorLoadedStatus:
                IFT_OP4OEData.conveyorLoadedStatus,

            conveyorSwingStatus:
                IFT_OP4OEData.conveyorSwingStatus,

            conveyorStrand:
                IFT_OP4OEData.conveyorStrand,


            // =================================================
            // CUSTOMER POWER UTILITIES
            // =================================================

            operatingVoltage:
                IFT_OP4OEData.operatingVoltage,

            controlVoltage:
                IFT_OP4OEData.controlVoltage,


            // =================================================
            // NEW / EXISTING MONITORING SYSTEM
            // =================================================

            existingMonitoring:
                IFT_OP4OEData.existingMonitoring,

            newMonitoringSystem:
                IFT_OP4OEData.newMonitoringSystem,


            // =================================================
            // CONVEYOR SPECIFICATIONS
            // =================================================

            wheelOpenRaceStyle:
                IFT_OP4OEData.wheelOpenRaceStyle,

            wheelSealedStyle:
                IFT_OP4OEData.wheelSealedStyle,

            openInsideShieldedOutside:
                IFT_OP4OEData.openInsideShieldedOutside,

            freeTrolleyWheels:
                IFT_OP4OEData.freeTrolleyWheels,

            guideRollers:
                IFT_OP4OEData.guideRollers,

            guideRollersOpenRaceStyle:
                IFT_OP4OEData.guideRollersOpenRaceStyle,

            guideRollersSealedStyle:
                IFT_OP4OEData.guideRollersSealedStyle,

            openHole:
                IFT_OP4OEData.openHole,

            dogActuator:
                IFT_OP4OEData.dogActuator,

            pivotPoints:
                IFT_OP4OEData.pivotPoints,

            kingPin:
                IFT_OP4OEData.kingPin,

            outboardWheels:
                IFT_OP4OEData.outboardWheels,

            railLubrication:
                IFT_OP4OEData.railLubrication,

            currentLubricationEquipmentBrand:
                IFT_OP4OEData.currentLubricationEquipmentBrand,

            currentLubricantType:
                IFT_OP4OEData.currentLubricantType,

            currentLubricantViscosityGrade:
                IFT_OP4OEData.currentLubricantViscosityGrade,


            // =================================================
            // CONTROLLER
            // =================================================

            chainMasterController:
                IFT_OP4OEData.chainMasterController,

            timer:
                IFT_OP4OEData.timer,

            electricOnOff:
                IFT_OP4OEData.electricOnOff,

            pneumaticOnOff:
                IFT_OP4OEData.pneumaticOnOff,

            mightyLubeMonitoring:
                IFT_OP4OEData.mightyLubeMonitoring,

            plcConnection:
                IFT_OP4OEData.plcConnection,

            otherControllerDescription:
                IFT_OP4OEData.otherControllerDescription,

            specialControllerOptions:
                IFT_OP4OEData.specialControllerOptions,

            controllerSpecify:
                IFT_OP4OEData.controllerSpecify,


            // =================================================
            // IN FLOOR TOWLINE: MEASUREMENTS
            // =================================================

            measurementUnit:
                IFT_OP4OEData.measurementUnit,

            inFloorTowlineChainDropA:
                IFT_OP4OEData.inFloorTowlineChainDropA,

            inFloorTowlinePowerTrolleyWheelB:
                IFT_OP4OEData.inFloorTowlinePowerTrolleyWheelB,

            inFloorTowlinePowerRailG:
                IFT_OP4OEData.inFloorTowlinePowerRailG,

            inFloorTowlinePowerRailH:
                IFT_OP4OEData.inFloorTowlinePowerRailH,

            inFloorTowlineRailOffsetJ:
                IFT_OP4OEData.inFloorTowlineRailOffsetJ,

            inFloorTowlineConveyorHousingS1:
                IFT_OP4OEData.inFloorTowlineConveyorHousingS1,

            inFloorTowlineConveyorHousingT1:
                IFT_OP4OEData.inFloorTowlineConveyorHousingT1,

            inFloorTowlineConveyorHousingWallU1:
                IFT_OP4OEData.inFloorTowlineConveyorHousingWallU1,

            inFloorTowlineConveyorHousingFloorV1:
                IFT_OP4OEData.inFloorTowlineConveyorHousingFloorV1,

            inFloorTowlineConveyorHousingOffsetW1:
                IFT_OP4OEData.inFloorTowlineConveyorHousingOffsetW1,

            inFloorTowlineFloorX1:
                IFT_OP4OEData.inFloorTowlineFloorX1,


            // =================================================
            // TECHNICIAN NOTE
            // =================================================

            technicianNote:
                IFT_OP4OEData.technicianNote,
        });


        // ====================================================
        // ADD CONFIGURATION TO AUTHENTICATED USER CART
        // ====================================================

        req.user.cart.push({
            numRequested,
            productConfigurationInfo: order,
            productType: "IFT_OP4OE",
        });

        await req.user.save();


        // ====================================================
        // SUCCESS RESPONSE
        // ====================================================

        return res.status(200).json({
            message: "IFT_OP4OE entry added",
        });

    } catch (error) {
        console.error("IFT_OP4OE Error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
});


module.exports = router