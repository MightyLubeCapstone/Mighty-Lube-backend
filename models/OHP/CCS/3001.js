const mongoose = require("mongoose");

const OH_CCS_3000Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists in frontend.
    // Custom string value is allowed.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists in frontend.
    // Custom string value is allowed.
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

    // Fixed dropdown - no "Other" option.
    conveyorLengthUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
    },

    conveyorSpeed: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed dropdown - no "Other" option.
    conveyorSpeedUnit: {
      type: String,
      required: true,
      enum: [
        "Feet / minute",
        "Meters / minute",
      ],
    },

    // "Other" option exists in frontend.
    // Custom string value is allowed.
    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed dropdown - no "Other" option.
    surroundingTemperatureOutsideRange: {
      type: String,
      required: true,
      enum: [
        "No",
        "yes",
      ],
    },

    // ========================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // ========================================================

    // Fixed dropdown - no "Other" option.
    measurementUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
    },

    chainDropA: {
      type: String,
      required: true,
      trim: true,
    },

    overheadPowerMonoRailPowerTrolleyWheelB: {
      type: String,
      required: true,
      trim: true,
    },

    overheadPowerMonoRailPowerRailG: {
      type: String,
      required: true,
      trim: true,
    },

    overheadPowerMonoRailPowerRailH: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // TECHNICIAN NOTE
    //
    // Frontend required: false
    // ========================================================

    technicianNote: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================================
// MODEL
// ==========================================================

const OH_CCS_3000 =
  mongoose.models.OH_CCS_3000 ||
  mongoose.model(
    "OH_CCS_3000",
    OH_CCS_3000Schema
  );

module.exports = OH_CCS_3000;