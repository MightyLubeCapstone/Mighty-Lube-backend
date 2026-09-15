const mongoose = require("mongoose");

const OHCCSBRUSHSchema = new mongoose.Schema(
  {
    // =========================================================
    // GENERAL INFORMATION
    // =========================================================

    conveyorName: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    otherConveyorChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    chainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    otherChainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLength: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      default: "",
      trim: true,
    },

    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    otherApplicationEnvironment: {
      type: String,
      default: "",
      trim: true,
    },

    surroundingTemperatureOutsideRange: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // =========================================================

    measurementUnit: {
      type: String,
      default: "",
      trim: true,
    },

    chainDropA: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerMonoRailPowerRailG: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerMonoRailPowerRailH: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================================================
    // TECHNICIAN NOTE
    // =========================================================

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

const OH_CCS_BRUSH =
  mongoose.models.OH_CCS_BRUSH ||
  mongoose.model("OH_CCS_BRUSH", OHCCSBRUSHSchema);

module.exports = OH_CCS_BRUSH;