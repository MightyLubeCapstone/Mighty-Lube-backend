const mongoose = require("mongoose");

const FT_CDL_Schema = new mongoose.Schema(
  {
    // =========================================================
    // GENERAL INFORMATION
    // =========================================================

    conveyorName: {
      type: String,
      required: false,
      trim: true,
    },

    chainSize: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    chainManufacturer: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorLength: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorLengthUnit: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    appEnviroment: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    singleDoubleConveyor: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // CUSTOMER POWER UTILITIES
    // =========================================================

    controlVoltSingle: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // CONVEYOR SPECIFICATIONS
    // =========================================================

    lubeBrand: {
      type: String,
      required: false,
      trim: true,
    },

    lubeType: {
      type: String,
      required: false,
      trim: true,
    },

    lubeViscosity: {
      type: String,
      required: false,
      trim: true,
    },

    // =========================================================
    // CONTROLLER
    // =========================================================

    specialControllerOptions: {
      type: String,
      required: false,
      trim: true,
    },

    specialControllerDetails: {
      type: String,
      required: false,
      trim: true,
    },

    // =========================================================
    // WIRE
    // =========================================================

    measurementUnit: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor4: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor7: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor12: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    junctionBoxNum: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // TECHNICIAN NOTE
    // =========================================================

    technicianNote: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const FT_CDL =
  mongoose.models.FT_CDL ||
  mongoose.model("FT_CDL", FT_CDL_Schema);

module.exports = FT_CDL;