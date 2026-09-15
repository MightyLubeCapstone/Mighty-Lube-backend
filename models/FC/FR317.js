const mongoose = require("mongoose");

const FC_317_Schema = new mongoose.Schema(
  {
    // =======================================================
    // GENERAL INFORMATION
    // =======================================================

    conveyorName: {
      type: String,
      default: "",
    },

    wheelManufacturer: {
      type: String,
      default: "",
    },

    otherWheelManufacturer: {
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

    conveyorSwingStatus: {
      type: String,
      required: true,
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

    compressedAirSupply: {
      type: String,
      required: true,
    },

    compressedAirSupplyUnit: {
      type: String,
      default: "",
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

    currentGreaseType: {
      type: String,
      default: "",
    },

    currentGreaseNlgiGrade: {
      type: String,
      default: "",
    },

    zerkFittingLocationSide: {
      type: String,
      default: "",
    },

    zerkFittingLocationOrientation: {
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

    remote: {
      type: String,
      default: "",
    },

    mountedOnGreaser: {
      type: String,
      default: "",
    },

    controlsOtherUnits: {
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

    mightyLubeMonitoring: {
      type: String,
      default: "",
    },

    preMountingRequirements: {
      type: String,
      default: "",
    },

    plcConnection: {
      type: String,
      default: "",
    },

    otherControllerInfo: {
      type: String,
      default: "",
    },

    // =======================================================
    // GREASER - FREE CARRIER
    // =======================================================

    measurementUnit: {
      type: String,
      default: "",
    },

    freeCarrierZerkFittingE: {
      type: String,
      default: "",
    },

    freeCarrierZerkFittingF: {
      type: String,
      default: "",
    },

    freeCarrierRailG: {
      type: String,
      default: "",
    },

    freeCarrierRailH: {
      type: String,
      default: "",
    },

    // =======================================================
    // TECHNICIAN NOTE
    // =======================================================

    technicianNote: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FC_317 =
  mongoose.models.FC_317 ||
  mongoose.model("FC_317", FC_317_Schema);

module.exports = FC_317