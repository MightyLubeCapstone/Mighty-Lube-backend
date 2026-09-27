const mongoose = require("mongoose");

const OHP_PMLSchema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value can be stored in same field.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value can be stored in same field.
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

    conveyorLengthUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "Meter",
        "Millimeter",
      ],
    },

    conveyorSpeed: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorSpeedUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
    },

    indexingOrVariableSpeedConditions: {
      type: String,
      required: true,
      trim: true,
    },

    travelDirection: {
      type: String,
      required: true,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
    },

    // "Other" exists -> custom value can be stored in same field.
    // Exact frontend spelling preserved.
    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

    surroundingTemp: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    conveyorLoadedOrUnloaded: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    conveyorMovement: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ============================================================
    // CUSTOMER POWER UTILITIES
    // ============================================================

    operatingVoltageSinglePhase: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================================
    // MONITORING FEATURES REQUESTED
    // ============================================================

    paintMarkerSystem: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ============================================================
    // CONVEYOR SPECIFICATIONS
    // ============================================================

    isConveyorClean: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ============================================================
    // OVERHEAD POWER RAIL MEASUREMENTS
    // ============================================================

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

    // These fields are NOT required in the frontend.
    chainDrop: {
      type: String,
      default: "",
      trim: true,
    },

    powerTrolleyWheelDiameter: {
      type: String,
      default: "",
      trim: true,
    },

    powerRailWidth: {
      type: String,
      default: "",
      trim: true,
    },

    powerRailHeight: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================================
    // TECHNICIAN NOTE
    // ============================================================

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

// Existing Mongo model mapping preserved.
const OHP_PML =
  mongoose.models.tblOHP_PML ||
  mongoose.model("tblOHP_PML", OHP_PMLSchema);

module.exports = OHP_PML;