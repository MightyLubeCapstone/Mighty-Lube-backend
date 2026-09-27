const mongoose = require("mongoose");

const PFO_CCS_300ISchema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" can be replaced by a custom frontend value,
    // therefore no enum restriction.
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" can be replaced by a custom frontend value,
    // therefore no enum restriction.
    chainManufacturer: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorLength: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorLengthUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },

    conveyorSpeed: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorSpeedUnit: {
      type: String,
      enum: [
        "Feet / minute",
        "Meters / minute",
      ],
      required: true,
    },

    // "Other" can be replaced by a custom frontend value,
    // therefore no enum restriction.
    applicationEnvironment: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorOrientation: {
      type: String,
      enum: [
        "Overhead",
        "Inverted",
        "Inverted/Inverted",
      ],
      required: true,
    },

    // ============================================================
    // TECHNICIAN NOTE
    // ============================================================

    technicianNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const PFO_CCS_300I =
  mongoose.models.PFO_CCS_300I ||
  mongoose.model(
    "PFO_CCS_300I",
    PFO_CCS_300ISchema
  );

module.exports = PFO_CCS_300I;