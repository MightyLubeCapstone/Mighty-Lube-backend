const mongoose = require("mongoose");

const OHP_MLPSchema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value allowed.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value allowed.
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

    // "Other" exists -> custom value stored in same field.
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

    controlVoltage: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================================
    // NEW / EXISTING MONITORING SYSTEM
    // ============================================================

    connectingToExistingMonitoring: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    addNewMonitoringSystem: {
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

    wheelOpenType: {
      type: String,
      required: true,
      enum: [
        "Not Applicable",
        "Open Inside",
        "Open Outside",
      ],
    },

    wheelClosedType: {
      type: String,
      required: true,
      enum: [
        "Extended",
        "Flush",
        "Recessed",
      ],
    },

    powerChain: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    chainPins: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    catDriveStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    caterpillarDriveQuantity: {
      type: String,
      required: true,
      trim: true,
    },

    railLubeStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    externalLubeStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

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

    lubricationSideChain: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    lubricationTopChain: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    reservoirSize: {
      type: String,
      required: true,
      enum: [
        "10 Gallon",
        "65 Gallon",
      ],
    },

    reservoirSizeQuantity: {
      type: String,
      required: true,
      trim: true,
    },

    chainCleanStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ============================================================
    // CONTROLLER
    // ============================================================

    specialControllerOptions: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional in frontend.
    controllerSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
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
const OHP_MLP =
  mongoose.models.tblOHP_MLP ||
  mongoose.model("tblOHP_MLP", OHP_MLPSchema);

module.exports = OHP_MLP;