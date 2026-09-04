const express = require("express");
const { authenticate } = require("./sessions");
const OHP_OP4A = require("../models/OHP_OP4A");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OHP_OP4AData, numRequested } = req.body;

    const order = new OHP_OP4A({
      // ============================================================
      // GENERAL INFORMATION
      // ============================================================

      ...(OHP_OP4AData.conveyorName && {
        conveyorName: OHP_OP4AData.conveyorName,
      }),

      ...(OHP_OP4AData.conveyorChainSize && {
        conveyorChainSize: OHP_OP4AData.conveyorChainSize,
      }),

      ...(OHP_OP4AData.otherConveyorChainSize && {
        otherConveyorChainSize: OHP_OP4AData.otherConveyorChainSize,
      }),

      ...(OHP_OP4AData.chainManufacturer && {
        chainManufacturer: OHP_OP4AData.chainManufacturer,
      }),

      ...(OHP_OP4AData.otherChainManufacturer && {
        otherChainManufacturer: OHP_OP4AData.otherChainManufacturer,
      }),

      ...(OHP_OP4AData.conveyorLength && {
        conveyorLength: OHP_OP4AData.conveyorLength,
      }),

      ...(OHP_OP4AData.conveyorLengthUnit && {
        conveyorLengthUnit: OHP_OP4AData.conveyorLengthUnit,
      }),

      ...(OHP_OP4AData.conveyorSpeed && {
        conveyorSpeed: OHP_OP4AData.conveyorSpeed,
      }),

      ...(OHP_OP4AData.conveyorSpeedUnit && {
        conveyorSpeedUnit: OHP_OP4AData.conveyorSpeedUnit,
      }),

      ...(OHP_OP4AData.indexingOrVariableSpeedConditions && {
        indexingOrVariableSpeedConditions:
          OHP_OP4AData.indexingOrVariableSpeedConditions,
      }),

      ...(OHP_OP4AData.directionOfTravel && {
        directionOfTravel: OHP_OP4AData.directionOfTravel,
      }),

      applicationEnvironment: OHP_OP4AData.applicationEnvironment,

      ...(OHP_OP4AData.otherApplicationEnvironment && {
        otherApplicationEnvironment:
          OHP_OP4AData.otherApplicationEnvironment,
      }),

      ...(OHP_OP4AData.surroundingTemperatureOutsideRange && {
        surroundingTemperatureOutsideRange:
          OHP_OP4AData.surroundingTemperatureOutsideRange,
      }),

      conveyorLoadedOrUnloaded: OHP_OP4AData.conveyorLoadedOrUnloaded,

      conveyorMovement: OHP_OP4AData.conveyorMovement,

      // ============================================================
      // CUSTOMER POWER UTILITIES
      // ============================================================

      controlVoltage: OHP_OP4AData.controlVoltage,

      compressedAirSupply: OHP_OP4AData.compressedAirSupply,

      ...(OHP_OP4AData.compressedAirSupplyUnit && {
        compressedAirSupplyUnit: OHP_OP4AData.compressedAirSupplyUnit,
      }),

      // ============================================================
      // MONITORING SYSTEM
      // ============================================================

      ...(OHP_OP4AData.connectingToExistingMonitoring && {
        connectingToExistingMonitoring:
          OHP_OP4AData.connectingToExistingMonitoring,
      }),

      ...(OHP_OP4AData.addNewMonitoringSystem && {
        addNewMonitoringSystem: OHP_OP4AData.addNewMonitoringSystem,
      }),

      // ============================================================
      // CONVEYOR SPECIFICATIONS
      // ============================================================

      ...(OHP_OP4AData.railLubrication && {
        railLubrication: OHP_OP4AData.railLubrication,
      }),

      ...(OHP_OP4AData.currentLubricationEquipmentBrand && {
        currentLubricationEquipmentBrand:
          OHP_OP4AData.currentLubricationEquipmentBrand,
      }),

      ...(OHP_OP4AData.currentLubricantType && {
        currentLubricantType: OHP_OP4AData.currentLubricantType,
      }),

      ...(OHP_OP4AData.currentLubricantViscosityGrade && {
        currentLubricantViscosityGrade:
          OHP_OP4AData.currentLubricantViscosityGrade,
      }),

      ...(OHP_OP4AData.lubricationFromSideOfChain && {
        lubricationFromSideOfChain:
          OHP_OP4AData.lubricationFromSideOfChain,
      }),

      ...(OHP_OP4AData.lubricationFromTopOfChain && {
        lubricationFromTopOfChain:
          OHP_OP4AData.lubricationFromTopOfChain,
      }),

      ...(OHP_OP4AData.optionalFiveGallonReservoir && {
        optionalFiveGallonReservoir:
          OHP_OP4AData.optionalFiveGallonReservoir,
      }),

      ...(OHP_OP4AData.conveyorChainClean && {
        conveyorChainClean: OHP_OP4AData.conveyorChainClean,
      }),

      // ============================================================
      // CONTROLLER
      // ============================================================

      ...(OHP_OP4AData.chainMasterController && {
        chainMasterController: OHP_OP4AData.chainMasterController,
      }),

      ...(OHP_OP4AData.controlsOtherUnits && {
        controlsOtherUnits: OHP_OP4AData.controlsOtherUnits,
      }),

      ...(OHP_OP4AData.timer && {
        timer: OHP_OP4AData.timer,
      }),

      ...(OHP_OP4AData.electricOnOff && {
        electricOnOff: OHP_OP4AData.electricOnOff,
      }),

      ...(OHP_OP4AData.pneumaticOnOff && {
        pneumaticOnOff: OHP_OP4AData.pneumaticOnOff,
      }),

      ...(OHP_OP4AData.mightyLubeMonitoring && {
        mightyLubeMonitoring: OHP_OP4AData.mightyLubeMonitoring,
      }),

      ...(OHP_OP4AData.preMountingRequirements && {
        preMountingRequirements: OHP_OP4AData.preMountingRequirements,
      }),

      ...(OHP_OP4AData.plcConnection && {
        plcConnection: OHP_OP4AData.plcConnection,
      }),

      ...(OHP_OP4AData.otherControllerDescribe && {
        otherControllerDescribe: OHP_OP4AData.otherControllerDescribe,
      }),

      ...(OHP_OP4AData.controllerSpecialOptions && {
        controllerSpecialOptions: OHP_OP4AData.controllerSpecialOptions,
      }),

      ...(OHP_OP4AData.controllerPleaseSpecify && {
        controllerPleaseSpecify: OHP_OP4AData.controllerPleaseSpecify,
      }),

      // ============================================================
      // OVERHEAD POWER RAIL: MEASUREMENTS
      // ============================================================

      ...(OHP_OP4AData.measurementUnit && {
        measurementUnit: OHP_OP4AData.measurementUnit,
      }),

      ...(OHP_OP4AData.chainDropA && {
        chainDropA: OHP_OP4AData.chainDropA,
      }),

      ...(OHP_OP4AData.overheadPowerMonoRailPowerRailG && {
        overheadPowerMonoRailPowerRailG:
          OHP_OP4AData.overheadPowerMonoRailPowerRailG,
      }),

      ...(OHP_OP4AData.overheadPowerMonoRailPowerRailH && {
        overheadPowerMonoRailPowerRailH:
          OHP_OP4AData.overheadPowerMonoRailPowerRailH,
      }),

      ...(OHP_OP4AData.measurementDropdown && {
        measurementDropdown: OHP_OP4AData.measurementDropdown,
      }),

      // ============================================================
      // TECHNICIAN NOTE
      // ============================================================

      technicianNote: OHP_OP4AData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OHP_OP4A",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OHP_OP4A entry added",
    });
  } catch (error) {
    console.error("OHP_OP4A route error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router