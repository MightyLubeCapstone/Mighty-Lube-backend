const mongoose = require("mongoose");

const COE_CDL_Schema = new mongoose.Schema(
  {
    // =======================================================
    // GENERAL INFORMATION
    // =======================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    chainSize: {
      type: String,
      required: true,
      trim: true,
    },

    chainManufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorLength: {
      type: String,
      required: true,
      trim: true,
    },

    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CUSTOMER POWER UTILITIES
    // =======================================================

    controlVoltSingle: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CONVEYOR SPECIFICATIONS
    // =======================================================

    lubeBrand: {
      type: String,
      required: true,
      trim: true,
    },

    lubeType: {
      type: String,
      required: true,
      trim: true,
    },

    lubeViscosity: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CONTROLLER
    // =======================================================

    specialControllerOptions: {
      type: String,
      required: true,
      trim: true,
    },

    specialControllerDetails: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // WIRE
    // =======================================================

    measurementUnit: {
      type: String,
      required: true,
      trim: true,
    },

    conductor2: {
      type: String,
      required: true,
      trim: true,
    },

    conductor4: {
      type: String,
      required: true,
      trim: true,
    },

    conductor7: {
      type: String,
      required: true,
      trim: true,
    },

    conductor12: {
      type: String,
      required: true,
      trim: true,
    },

    junctionBoxNum: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // TECHNICIAN NOTE
    //
    // Optional extra section added in mobile app.
    // =======================================================

    technicianNote: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const COE_CDL =
  mongoose.models.COE_CDL ||
  mongoose.model(
    "COE_CDL",
    COE_CDL_Schema,
  );

module.exports = COE_CDL