const mongoose = require("mongoose");

const OH_CCS_OP8NPSchema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists.
    // Custom string value is allowed.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists.
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

    // Fixed dropdown - no "Other".
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

    // "Other" option exists.
    // Custom string value is allowed.
    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed Yes / No dropdown.
    conveyorLoadedStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ========================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // ========================================================

    // Fixed dropdown - no "Other".
    freeRailMeasurementUnit: {
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

const OH_CCS_OP8NP =
  mongoose.models.OH_CCS_OP8NP ||
  mongoose.model(
    "OH_CCS_OP8NP",
    OH_CCS_OP8NPSchema
  );

module.exports = OH_CCS_OP8NP;