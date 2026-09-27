const mongoose = require("mongoose");

const OHCCSIBEAMSchema = new mongoose.Schema(
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

    // =========================================================
    // OVERHEAD POWER RAIL MEASUREMENTS
    // =========================================================

    measurementUnit: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerRailChannelTrolleyWheelB: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerRailG: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerRailH: {
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

const OH_CCS_IBEAM =
  mongoose.models.OH_CCS_IBEAM ||
  mongoose.model("OH_CCS_IBEAM", OHCCSIBEAMSchema);

module.exports = OH_CCS_IBEAM;