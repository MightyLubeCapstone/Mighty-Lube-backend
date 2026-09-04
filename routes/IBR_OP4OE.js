const express = require("express");
const { authenticate } = require("./sessions");
const IBR_OP4OE = require("../models/IBR_OP4OE");

const router = express.Router();

// ============================================================
// OP-40E - IN-BOARD ROLLER CHAIN
//
// Product ID: IBR_OP4OE
// POST /api/ibr_op4oe
// Request Body:
// {
//   IBR_OP4OEData: {...},
//   numRequested: 1
// }
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { IBR_OP4OEData, numRequested } = req.body;

    if (!IBR_OP4OEData) {
      return res.status(400).json({
        error: "IBR_OP4OEData is required",
      });
    }

    const order = new IBR_OP4OE({
      // ======================================================
      // GENERAL INFORMATION
      // ======================================================

      conveyorName: IBR_OP4OEData.conveyorName,

      conveyorChainSize: IBR_OP4OEData.conveyorChainSize,

      otherConveyorChainSize:
        IBR_OP4OEData.otherConveyorChainSize,

      chainManufacturer:
        IBR_OP4OEData.chainManufacturer,

      otherChainManufacturer:
        IBR_OP4OEData.otherChainManufacturer,

      conveyorLength:
        IBR_OP4OEData.conveyorLength,

      conveyorLengthUnit:
        IBR_OP4OEData.conveyorLengthUnit,

      conveyorSpeed:
        IBR_OP4OEData.conveyorSpeed,

      conveyorSpeedUnit:
        IBR_OP4OEData.conveyorSpeedUnit,

      indexingVariableSpeedConditions:
        IBR_OP4OEData.indexingVariableSpeedConditions,

      travelDirection:
        IBR_OP4OEData.travelDirection,

      applicationEnvironment:
        IBR_OP4OEData.applicationEnvironment,

      otherApplicationEnvironment:
        IBR_OP4OEData.otherApplicationEnvironment,

      surroundingTemperature:
        IBR_OP4OEData.surroundingTemperature,

      conveyorLoadedStatus:
        IBR_OP4OEData.conveyorLoadedStatus,

      conveyorSwingStatus:
        IBR_OP4OEData.conveyorSwingStatus,

      conveyorStrand:
        IBR_OP4OEData.conveyorStrand,

      // ======================================================
      // CUSTOMER POWER UTILITIES
      // ======================================================

      operatingVoltage:
        IBR_OP4OEData.operatingVoltage,

      controlVoltage:
        IBR_OP4OEData.controlVoltage,

      // ======================================================
      // MONITORING SYSTEM
      // ======================================================

      existingMonitoring:
        IBR_OP4OEData.existingMonitoring,

      newMonitoringSystem:
        IBR_OP4OEData.newMonitoringSystem,

      // ======================================================
      // CONVEYOR SPECIFICATIONS
      // ======================================================

      wheelOpenRaceStyle:
        IBR_OP4OEData.wheelOpenRaceStyle,

      wheelSealedStyle:
        IBR_OP4OEData.wheelSealedStyle,

      openInsideShieldedOutside:
        IBR_OP4OEData.openInsideShieldedOutside,

      freeTrolleyWheels:
        IBR_OP4OEData.freeTrolleyWheels,

      guideRollers:
        IBR_OP4OEData.guideRollers,

      guideRollersOpenRaceStyle:
        IBR_OP4OEData.guideRollersOpenRaceStyle,

      guideRollersSealedStyle:
        IBR_OP4OEData.guideRollersSealedStyle,

      openHole:
        IBR_OP4OEData.openHole,

      dogActuator:
        IBR_OP4OEData.dogActuator,

      pivotPoints:
        IBR_OP4OEData.pivotPoints,

      kingPin:
        IBR_OP4OEData.kingPin,

      outboardWheels:
        IBR_OP4OEData.outboardWheels,

      railLubrication:
        IBR_OP4OEData.railLubrication,

      currentLubricationEquipmentBrand:
        IBR_OP4OEData.currentLubricationEquipmentBrand,

      currentLubricantType:
        IBR_OP4OEData.currentLubricantType,

      currentLubricantViscosityGrade:
        IBR_OP4OEData.currentLubricantViscosityGrade,

      // ======================================================
      // CONTROLLER
      // ======================================================

      chainMasterController:
        IBR_OP4OEData.chainMasterController,

      timer:
        IBR_OP4OEData.timer,

      electricOnOff:
        IBR_OP4OEData.electricOnOff,

      pneumaticOnOff:
        IBR_OP4OEData.pneumaticOnOff,

      mightyLubeMonitoring:
        IBR_OP4OEData.mightyLubeMonitoring,

      plcConnection:
        IBR_OP4OEData.plcConnection,

      otherControllerDescription:
        IBR_OP4OEData.otherControllerDescription,

      specialControllerOptions:
        IBR_OP4OEData.specialControllerOptions,

      controllerSpecify:
        IBR_OP4OEData.controllerSpecify,

      // ======================================================
      // IN BOARD ROLLER CHAIN: MEASUREMENTS
      // ======================================================

      measurementUnit:
        IBR_OP4OEData.measurementUnit,

      inBoardRollerChainRollerWheelA1:
        IBR_OP4OEData.inBoardRollerChainRollerWheelA1,

      inBoardRollerChainRollerWheelB1:
        IBR_OP4OEData.inBoardRollerChainRollerWheelB1,

      inBoardRollerChainLinkC1:
        IBR_OP4OEData.inBoardRollerChainLinkC1,

      inBoardRollerChainLinkD1:
        IBR_OP4OEData.inBoardRollerChainLinkD1,

      inBoardRollerChainOuterLinkOffsetF1:
        IBR_OP4OEData.inBoardRollerChainOuterLinkOffsetF1,

      // ======================================================
      // TECHNICIAN NOTE
      // ======================================================

      technicianNote:
        IBR_OP4OEData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "IBR_OP4OE",
    });

    await req.user.save();

    return res.status(200).json({
      message: "IBR_OP4OE entry added",
    });
  } catch (error) {
    console.error("IBR_OP4OE route error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router