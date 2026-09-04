const express = require("express");
const { authenticate } = require("./sessions");
const OHP_MLP = require("../models/OHP_MLP");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OHP_MLPData, numRequested } = req.body;

    const order = new OHP_MLP({

      // ============================================================
      // GENERAL INFORMATION
      // ============================================================

      conveyorName: OHP_MLPData.conveyorName,

      conveyorChainSize: OHP_MLPData.conveyorChainSize,

      ...(OHP_MLPData.conveyorChainSize === "Other" &&
        OHP_MLPData.otherConveyorChainSize && {
          otherConveyorChainSize:
            OHP_MLPData.otherConveyorChainSize,
        }),

      chainManufacturer: OHP_MLPData.chainManufacturer,

      ...(OHP_MLPData.chainManufacturer === "Other" &&
        OHP_MLPData.otherChainManufacturer && {
          otherChainManufacturer:
            OHP_MLPData.otherChainManufacturer,
        }),

      conveyorLength: OHP_MLPData.conveyorLength,

      conveyorLengthUnit:
        OHP_MLPData.conveyorLengthUnit,

      conveyorSpeed: OHP_MLPData.conveyorSpeed,

      conveyorSpeedUnit:
        OHP_MLPData.conveyorSpeedUnit,

      indexingOrVariableSpeedConditions:
        OHP_MLPData.indexingOrVariableSpeedConditions,

      directionOfTravel:
        OHP_MLPData.directionOfTravel,

      applicationEnvironment:
        OHP_MLPData.applicationEnvironment,

      ...(OHP_MLPData.applicationEnvironment === "Other" &&
        OHP_MLPData.otherApplicationEnvironment && {
          otherApplicationEnvironment:
            OHP_MLPData.otherApplicationEnvironment,
        }),

      surroundingAreaTemperature:
        OHP_MLPData.surroundingAreaTemperature,

      conveyorLoadedOrUnloaded:
        OHP_MLPData.conveyorLoadedOrUnloaded,

      conveyorSwingSwaySurge:
        OHP_MLPData.conveyorSwingSwaySurge,


      // ============================================================
      // CUSTOMER POWER UTILITIES
      // ============================================================

      operatingVoltageSinglePhase:
        OHP_MLPData.operatingVoltageSinglePhase,

      controlVoltage:
        OHP_MLPData.controlVoltage,

      compressedAirSupply:
        OHP_MLPData.compressedAirSupply,

      compressedAirSupplyUnit:
        OHP_MLPData.compressedAirSupplyUnit,


      // ============================================================
      // NEW MONITORING SYSTEM OR ADDING TO EXISTING MONITORING SYSTEM
      // ============================================================

      connectingToExistingMonitoring:
        OHP_MLPData.connectingToExistingMonitoring,

      addNewMonitoringSystem:
        OHP_MLPData.addNewMonitoringSystem,


      // ============================================================
      // CONVEYOR SPECIFICATIONS
      // ============================================================

      powerRail:
        OHP_MLPData.powerRail,

      powerChain:
        OHP_MLPData.powerChain,

      currentLubricationEquipmentBrand:
        OHP_MLPData.currentLubricationEquipmentBrand,

      currentLubricantType:
        OHP_MLPData.currentLubricantType,

      currentLubricantViscosityGrade:
        OHP_MLPData.currentLubricantViscosityGrade,

      lubricationFromSideOfChain:
        OHP_MLPData.lubricationFromSideOfChain,

      lubricationFromTopOfChain:
        OHP_MLPData.lubricationFromTopOfChain,

      isConveyorChainClean:
        OHP_MLPData.isConveyorChainClean,


      // ============================================================
      // CONTROLLER
      // ============================================================

      chainMasterController:
        OHP_MLPData.chainMasterController,

      remote:
        OHP_MLPData.remote,

      mountedOnGreaser:
        OHP_MLPData.mountedOnGreaser,

      controlsOtherUnits:
        OHP_MLPData.controlsOtherUnits,

      timer:
        OHP_MLPData.timer,

      electricOnOff:
        OHP_MLPData.electricOnOff,

      pneumaticOnOff:
        OHP_MLPData.pneumaticOnOff,

      mightyLubeMonitoring:
        OHP_MLPData.mightyLubeMonitoring,

      preMountingRequirements:
        OHP_MLPData.preMountingRequirements,

      plcConnection:
        OHP_MLPData.plcConnection,

      otherControllerDescribe:
        OHP_MLPData.otherControllerDescribe,


      // ============================================================
      // SPECIAL OPTIONS
      // ============================================================

      specialControllerOptions:
        OHP_MLPData.specialControllerOptions,

      specialOptionsPleaseSpecify:
        OHP_MLPData.specialOptionsPleaseSpecify,


      // ============================================================
      // COMMENTS / ADDITIONAL INFORMATION
      // ============================================================

      commentsDescription:
        OHP_MLPData.commentsDescription,


      // ============================================================
      // TECHNICIAN NOTE
      // ============================================================

      technicianNote:
        OHP_MLPData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OHP_MLP",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OHP_MLP entry added",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router