const express = require("express");
const { authenticate } = require("./sessions");
const OHP_ES = require("../models/OHP_ES");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OHP_ESData, numRequested } = req.body;

    const order = new OHP_ES({

      // ============================================================
      // GENERAL INFORMATION
      // ============================================================

      ...(OHP_ESData.conveyorName && {
        conveyorName: OHP_ESData.conveyorName,
      }),

      ...(OHP_ESData.conveyorChainSize && {
        conveyorChainSize: OHP_ESData.conveyorChainSize,
      }),

      ...(OHP_ESData.chainManufacturer && {
        chainManufacturer: OHP_ESData.chainManufacturer,
      }),

      ...(OHP_ESData.conveyorLength && {
        conveyorLength: OHP_ESData.conveyorLength,
      }),

      ...(OHP_ESData.conveyorLengthUnit && {
        conveyorLengthUnit: OHP_ESData.conveyorLengthUnit,
      }),

      ...(OHP_ESData.conveyorSpeed && {
        conveyorSpeed: OHP_ESData.conveyorSpeed,
      }),

      ...(OHP_ESData.conveyorSpeedUnit && {
        conveyorSpeedUnit: OHP_ESData.conveyorSpeedUnit,
      }),

      ...(OHP_ESData.indexingOrVariableSpeedConditions && {
        indexingOrVariableSpeedConditions:
          OHP_ESData.indexingOrVariableSpeedConditions,
      }),

      ...(OHP_ESData.directionOfTravel && {
        directionOfTravel: OHP_ESData.directionOfTravel,
      }),

      applicationEnvironment: OHP_ESData.applicationEnvironment,

      ...(OHP_ESData.otherApplicationEnvironment && {
        otherApplicationEnvironment:
          OHP_ESData.otherApplicationEnvironment,
      }),

      ...(OHP_ESData.requiresMonitoringCapabilities && {
        requiresMonitoringCapabilities:
          OHP_ESData.requiresMonitoringCapabilities,
      }),

      conveyorLoadedOrUnloaded:
        OHP_ESData.conveyorLoadedOrUnloaded,

      conveyorMovement:
        OHP_ESData.conveyorMovement,


      // ============================================================
      // CUSTOMER POWER UTILITIES
      // ============================================================

      operatingVoltageSinglePhase:
        OHP_ESData.operatingVoltageSinglePhase,

      controlVoltage:
        OHP_ESData.controlVoltage,


      // ============================================================
      // NEW MONITORING SYSTEM / EXISTING MONITORING SYSTEM
      // ============================================================

      ...(OHP_ESData.connectingToExistingMonitoring && {
        connectingToExistingMonitoring:
          OHP_ESData.connectingToExistingMonitoring,
      }),

      ...(OHP_ESData.addNewMonitoringSystem && {
        addNewMonitoringSystem:
          OHP_ESData.addNewMonitoringSystem,
      }),


      // ============================================================
      // CONVEYOR SPECIFICATIONS
      // ============================================================

      ...(OHP_ESData.wheelOpenRaceStyle && {
        wheelOpenRaceStyle:
          OHP_ESData.wheelOpenRaceStyle,
      }),

      ...(OHP_ESData.wheelSealedStyle && {
        wheelSealedStyle:
          OHP_ESData.wheelSealedStyle,
      }),

      ...(OHP_ESData.openInsideShieldedOutside && {
        openInsideShieldedOutside:
          OHP_ESData.openInsideShieldedOutside,
      }),

      ...(OHP_ESData.freeTrolleyWheels && {
        freeTrolleyWheels:
          OHP_ESData.freeTrolleyWheels,
      }),

      ...(OHP_ESData.guideRollers && {
        guideRollers:
          OHP_ESData.guideRollers,
      }),

      ...(OHP_ESData.guideRollersOpenRaceStyle && {
        guideRollersOpenRaceStyle:
          OHP_ESData.guideRollersOpenRaceStyle,
      }),

      ...(OHP_ESData.guideRollersSealedStyle && {
        guideRollersSealedStyle:
          OHP_ESData.guideRollersSealedStyle,
      }),

      ...(OHP_ESData.openHole && {
        openHole:
          OHP_ESData.openHole,
      }),

      ...(OHP_ESData.dogActuator && {
        dogActuator:
          OHP_ESData.dogActuator,
      }),

      ...(OHP_ESData.pivotPoints && {
        pivotPoints:
          OHP_ESData.pivotPoints,
      }),

      ...(OHP_ESData.kingPin && {
        kingPin:
          OHP_ESData.kingPin,
      }),

      ...(OHP_ESData.railLubrication && {
        railLubrication:
          OHP_ESData.railLubrication,
      }),

      ...(OHP_ESData.currentLubricationEquipmentBrand && {
        currentLubricationEquipmentBrand:
          OHP_ESData.currentLubricationEquipmentBrand,
      }),

      ...(OHP_ESData.currentLubricantType && {
        currentLubricantType:
          OHP_ESData.currentLubricantType,
      }),

      ...(OHP_ESData.currentLubricantViscosityGrade && {
        currentLubricantViscosityGrade:
          OHP_ESData.currentLubricantViscosityGrade,
      }),

      ...(OHP_ESData.lubricationFromSideOfChain && {
        lubricationFromSideOfChain:
          OHP_ESData.lubricationFromSideOfChain,
      }),

      ...(OHP_ESData.lubricationFromTopOfChain && {
        lubricationFromTopOfChain:
          OHP_ESData.lubricationFromTopOfChain,
      }),


      // ============================================================
      // CONTROLLER
      // ============================================================

      ...(OHP_ESData.chainMasterController && {
        chainMasterController:
          OHP_ESData.chainMasterController,
      }),

      ...(OHP_ESData.timer && {
        timer:
          OHP_ESData.timer,
      }),

      ...(OHP_ESData.electricOnOff && {
        electricOnOff:
          OHP_ESData.electricOnOff,
      }),

      ...(OHP_ESData.pneumaticOnOff && {
        pneumaticOnOff:
          OHP_ESData.pneumaticOnOff,
      }),

      ...(OHP_ESData.mightyLubeMonitoring && {
        mightyLubeMonitoring:
          OHP_ESData.mightyLubeMonitoring,
      }),

      ...(OHP_ESData.plcConnection && {
        plcConnection:
          OHP_ESData.plcConnection,
      }),

      ...(OHP_ESData.otherControllerDescribe && {
        otherControllerDescribe:
          OHP_ESData.otherControllerDescribe,
      }),

      ...(OHP_ESData.controllerSpecialOptions && {
        controllerSpecialOptions:
          OHP_ESData.controllerSpecialOptions,
      }),

      ...(OHP_ESData.controllerPleaseSpecify && {
        controllerPleaseSpecify:
          OHP_ESData.controllerPleaseSpecify,
      }),


      // ============================================================
      // OVERHEAD POWER RAIL: MEASUREMENTS
      // ============================================================

      ...(OHP_ESData.measurementUnit && {
        measurementUnit:
          OHP_ESData.measurementUnit,
      }),

      ...(OHP_ESData.chainDropA && {
        chainDropA:
          OHP_ESData.chainDropA,
      }),

      ...(OHP_ESData.overheadPowerMonoRailPowerTrolleyWheelB && {
        overheadPowerMonoRailPowerTrolleyWheelB:
          OHP_ESData.overheadPowerMonoRailPowerTrolleyWheelB,
      }),

      ...(OHP_ESData.overheadPowerMonoRailPowerRailG && {
        overheadPowerMonoRailPowerRailG:
          OHP_ESData.overheadPowerMonoRailPowerRailG,
      }),

      ...(OHP_ESData.overheadPowerMonoRailPowerRailH && {
        overheadPowerMonoRailPowerRailH:
          OHP_ESData.overheadPowerMonoRailPowerRailH,
      }),

      ...(OHP_ESData.measurementText && {
        measurementText:
          OHP_ESData.measurementText,
      }),


      // ============================================================
      // TECHNICIAN NOTE
      // ============================================================

      technicianNote:
        OHP_ESData.technicianNote,
    });


    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OHP_ES",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OHP_ES entry added",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router