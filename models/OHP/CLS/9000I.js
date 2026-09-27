const mongoose = require("mongoose");

const OHP_9000ISchema = new mongoose.Schema(
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
        "Feet / Minute",
        "Meters / Minute",
      ],
    },

    conveyorIndex: {
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

    // IMPORTANT:
    // Exact frontend spelling is "appEnviroment".
    // "Other" exists -> custom value allowed.
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

    conveyorLoaded: {
      type: String,
      required: true,
      enum: [
        "Loaded",
        "Unloaded",
      ],
    },

    conveyorSwing: {
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
    // MONITORING SYSTEM
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

    sideLubeStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    topLubeStatus: {
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

    controllerSpecialOptions: {
      type: String,
      required: true,
      trim: true,
    },

    // Frontend does NOT mark this field required.
    controllerPleaseSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================================
    // WIRE
    // ============================================================

    wireMeasurementUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
    },

    twoConductor: {
      type: String,
      required: true,
      trim: true,
    },

    fourConductor: {
      type: String,
      required: true,
      trim: true,
    },

    sevenConductor: {
      type: String,
      required: true,
      trim: true,
    },

    twelveConductor: {
      type: String,
      required: true,
      trim: true,
    },

    junctionBoxQuantities: {
      type: String,
      required: true,
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
        "Meter",
        "Millimeter",
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

// Keep existing model/collection mapping unchanged.
const OHP_9000I =
  mongoose.models.tblOHP_9000I ||
  mongoose.model("tblOHP_9000I", OHP_9000ISchema);

module.exports = OHP_9000I;