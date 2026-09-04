const mongoose = require("mongoose");

const FRO_317_Schema = new mongoose.Schema(
  {
    // =====================================================
    // GENERAL INFORMATION
    // =====================================================

    conveyorName: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    wheelManufacturer: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    otherWheelManufacturer: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorLength: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorSpeed: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorSpeedUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    indexingVariableSpeedConditions: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    travelDirection: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    applicationEnvironment: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    otherApplicationEnvironment: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    surroundingTemperature: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorSwingStatus: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorOrientation: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // CUSTOMER POWER UTILITIES
    // =====================================================

    operatingVoltage: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    controlVoltage: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    compressedAirSupply: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    compressedAirSupplyUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // NEW MONITORING SYSTEM OR ADDING TO EXISTING
    // =====================================================

    existingMonitoring: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    newMonitoringSystem: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // CONVEYOR SPECIFICATIONS
    // =====================================================

    freeTrolleyWheels: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    guideRollers: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    guideRollersOpenRaceStyle: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    guideRollersSealedStyle: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    openHole: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentLubricationEquipmentBrand: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentLubricantType: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentLubricantViscosityGrade: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentGreaseType: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentGreaseNlgiGrade: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    zerkFittingLocationSide: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    zerkFittingLocationOrientation: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // CONTROLLER
    // =====================================================

    chainMasterController: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    remote: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    mountedOnGreaser: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    controlsOtherUnits: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    timer: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    electricOnOff: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    mightyLubeMonitoring: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    preMountingRequirements: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    otherPreMountingRequirements: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    plcConnection: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    otherControllerInfo: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // INVERTED P&F: MEASUREMENTS
    // =====================================================

    measurementUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedChainDropA: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerTrolleyWheelB: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedZerkFittingVerticalE: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedRailG: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedRailH: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerTrolleyPitchS: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // TECHNICIAN NOTE
    // =====================================================

    technicianNote: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FRO_317 =
  mongoose.models.FRO_317 ||
  mongoose.model("FRO_317", FRO_317_Schema);

module.exports = FRO_317