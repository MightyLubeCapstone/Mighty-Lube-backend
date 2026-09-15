const mongoose = require("mongoose");

const OHCCSOP8NPSchema = new mongoose.Schema(
  {
    // =========================================================
    // GENERAL INFORMATION
    // =========================================================

    conveyorName: {
      type: String,
      required: false,
      trim: true,
    },

    conveyorChainSize: {
      type: String,
      required: false,
      trim: true,
    },

    otherConveyorChainSize: {
      type: String,
      required: function () {
        return this.conveyorChainSize === "Other";
      },
      trim: true,
    },

    chainManufacturer: {
      type: String,
      required: false,
      trim: true,
    },

    otherChainManufacturer: {
      type: String,
      required: function () {
        return this.chainManufacturer === "Other";
      },
      trim: true,
    },

    conveyorLength: {
      type: String,
      required: false,
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      required: false,
      trim: true,
    },

    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorLoadState: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // =========================================================

    measurementUnit: {
      type: String,
      required: false,
      trim: true,
    },

    chainDropA: {
      type: String,
      required: false,
      trim: true,
    },

    overheadPowerMonoRailPowerTrolleyWheelB: {
      type: String,
      required: false,
      trim: true,
    },

    overheadPowerMonoRailPowerRailG: {
      type: String,
      required: false,
      trim: true,
    },

    overheadPowerMonoRailPowerRailH: {
      type: String,
      required: false,
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

const OH_CCS_OP8NP =
  mongoose.models.OH_CCS_OP8NP ||
  mongoose.model("OH_CCS_OP8NP", OHCCSOP8NPSchema);

module.exports = OH_CCS_OP8NP;