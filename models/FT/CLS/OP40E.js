const mongoose = require("mongoose");

const FT_OP40E_Schema = new mongoose.Schema(
  {
    // =======================================================
    // GENERAL INFORMATION
    // =======================================================

    conveyorName: {
      type: String,
      default: "",
    },

    chainSize: {
      type: String,
      default: "",
    },

    otherChainSize: {
      type: String,
      default: "",
    },

    chainManufacturer: {
      type: String,
      default: "",
    },

    otherChainManufacturer: {
      type: String,
      default: "",
    },

    conveyorLength: {
      type: String,
      default: "",
    },

    conveyorLengthUnit: {
      type: String,
      default: "",
    },

    conveyorSpeed: {
      type: String,
      default: "",
    },

    conveyorSpeedUnit: {
      type: String,
      default: "",
    },

    indexingVariableSpeedConditions: {
      type: String,
      default: "",
    },

    travelDirection: {
      type: String,
      default: "",
    },

    applicationEnvironment: {
      type: String,
      required: true,
    },

    otherApplicationEnvironment: {
      type: String,
      default: "",
    },

    surroundingTemperature: {
      type: String,
      default: "",
    },

    conveyorLoadedStatus: {
      type: String,
      required: true,
    },

    conveyorSwingStatus: {
      type: String,
      required: true,
    },

    conveyorStrandType: {
      type: String,
      default: "",
    },

    // =======================================================
    // FILE UPLOAD REFERENCES
    //
    // Actual upload transport is handled separately.
    // These can hold uploaded file URL/path/reference later.
    // =======================================================

    plantLayoutFile: {
      type: String,
      default: "",
    },

    chainPicturesFile: {
      type: String,
      default: "",
    },

    // =======================================================
    // CUSTOMER POWER UTILITIES
    // =======================================================

    operatingVoltage: {
      type: String,
      required: true,
    },

    controlVoltage: {
      type: String,
      required: true,
    },

    // =======================================================
    // NEW / EXISTING MONITORING SYSTEM
    // =======================================================

    existingMonitoring: {
      type: String,
      default: "",
    },

    newMonitoringSystem: {
      type: String,
      default: "",
    },

    // =======================================================
    // CONVEYOR SPECIFICATIONS
    // =======================================================

    wheelOpenRaceStyle: {
      type: String,
      default: "",
    },

    wheelSealedStyle: {
      type: String,
      default: "",
    },

    openInsideShieldedOutside: {
      type: String,
      default: "",
    },

    freeTrolleyWheels: {
      type: String,
      default: "",
    },

    guideRollers: {
      type: String,
      default: "",
    },

    guideRollersOpenRaceStyle: {
      type: String,
      default: "",
    },

    guideRollersSealedStyle: {
      type: String,
      default: "",
    },

    openHole: {
      type: String,
      default: "",
    },

    dogActuator: {
      type: String,
      default: "",
    },

    pivotPoints: {
      type: String,
      default: "",
    },

    kingPin: {
      type: String,
      default: "",
    },

    outboardWheels: {
      type: String,
      default: "",
    },

    railLubrication: {
      type: String,
      default: "",
    },

    currentLubricationEquipmentBrand: {
      type: String,
      default: "",
    },

    currentLubricantType: {
      type: String,
      default: "",
    },

    currentLubricantViscosityGrade: {
      type: String,
      default: "",
    },

    // =======================================================
    // CONTROLLER
    // =======================================================

    chainMasterController: {
      type: String,
      default: "",
    },

    timer: {
      type: String,
      default: "",
    },

    electricOnOff: {
      type: String,
      default: "",
    },

    pneumaticOnOff: {
      type: String,
      default: "",
    },

    mightyLubeMonitoring: {
      type: String,
      default: "",
    },

    plcConnection: {
      type: String,
      default: "",
    },

    controllerOtherDescribe: {
      type: String,
      default: "",
    },

    specialControllerOptions: {
      type: String,
      default: "",
    },

    controllerPleaseSpecify: {
      type: String,
      default: "",
    },

    // =======================================================
    // FLAT TOP: MEASUREMENTS
    // =======================================================

    measurementUnit: {
      type: String,
      default: "",
    },

    flatTopPowerRailG: {
      type: String,
      default: "",
    },

    flatTopPowerRailH: {
      type: String,
      default: "",
    },

    flatTopRollerWheelA1: {
      type: String,
      default: "",
    },

    flatTopRollerWheelB1: {
      type: String,
      default: "",
    },

    flatTopRollerSleeveH1: {
      type: String,
      default: "",
    },

    flatTopRailJ1: {
      type: String,
      default: "",
    },

    flatTopDoubleChainPitchL1: {
      type: String,
      default: "",
    },

    flatTopRollerWheelPitchM1: {
      type: String,
      default: "",
    },

    flatTopMountingPlateN1: {
      type: String,
      default: "",
    },

    flatTopRailPitchP1: {
      type: String,
      default: "",
    },

    flatTopDoubleStrandPitchR1: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const FT_OP40E =
  mongoose.models.FT_OP40E ||
  mongoose.model("FT_OP40E", FT_OP40E_Schema);

module.exports = FT_OP40E;