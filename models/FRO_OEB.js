const mongoose = require("mongoose");

const FRO_OEB_Schema = new mongoose.Schema(
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

    conveyorChainSize: {
      type: String,
      required: false,
      default: "",
    },

    chainManufacturer: {
      type: String,
      required: false,
      default: "",
    },

    conveyorLength: {
      type: String,
      required: false,
      default: "",
    },

    conveyorLengthUnit: {
      type: String,
      required: false,
      default: "",
    },

    applicationEnvironment: {
      type: String,
      required: true,
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
    },

    // =====================================================
    // FREE RAIL: MEASUREMENTS
    // =====================================================

    measurementUnit: {
      type: String,
      required: false,
      default: "",
    },

    overheadFreeRailChainDropA: {
      type: String,
      required: false,
      default: "",
    },

    overheadFreeRailPowerTrolleyWheelB: {
      type: String,
      required: false,
      default: "",
    },

    overheadFreeRailRailG: {
      type: String,
      required: false,
      default: "",
    },

    overheadFreeRailRailH: {
      type: String,
      required: false,
      default: "",
    },

    overheadFreeRailTrolleyWheelVerticalL: {
      type: String,
      required: false,
      default: "",
    },

    invertedPowerFreeChainDropA: {
      type: String,
      required: false,
      default: "",
    },

    invertedPowerFreePowerTrolleyWheelB: {
      type: String,
      required: false,
      default: "",
    },

    invertedPowerFreeRailG: {
      type: String,
      required: false,
      default: "",
    },

    invertedPowerFreeRailH: {
      type: String,
      required: false,
      default: "",
    },

    invertedPowerFreeTrolleyWheelPitchK: {
      type: String,
      required: false,
      default: "",
    },

    // =====================================================
    // TECHNICIAN NOTE
    // Retained from legacy flow
    // =====================================================

    technicianNote: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FRO_OEB =
  mongoose.models.FRO_OEB ||
  mongoose.model("FRO_OEB", FRO_OEB_Schema);

module.exports = FRO_OEB