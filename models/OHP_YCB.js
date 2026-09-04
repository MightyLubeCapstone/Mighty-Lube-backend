const mongoose = require("mongoose");

const OHCCSCleaningBrushSchema = new mongoose.Schema(
  {
    // =======================================================
    // GENERAL INFORMATION
    // =======================================================

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

    otherApplicationEnvironment: {
      type: String,
      required: function () {
        return this.applicationEnvironment === "Other";
      },
      trim: true,
    },

    // =======================================================
    // OVERHEAD POWER RAIL MEASUREMENTS
    // =======================================================

    measurementUnit: {
      type: String,
      required: false,
      trim: true,
    },

    overheadPowerRailYokeRailH1: {
      type: String,
      required: false,
      trim: true,
    },

    // =======================================================
    // TECHNICIAN NOTE
    // =======================================================

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

const OH_CCS_CLEANING_BRUSH = mongoose.model(
  "tblOH_CCS_CLEANING_BRUSH",
  OHCCSCleaningBrushSchema
);

module.exports = OH_CCS_CLEANING_BRUSH;