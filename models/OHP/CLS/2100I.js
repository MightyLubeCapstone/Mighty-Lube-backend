const mongoose = require("mongoose");

// =========================================================
// PRODUCT
//
// Product Name: 2100L Series Self-Contained I-Beam
//               Conveyor Lubricators
// Product ID: OHP_2100I
// =========================================================

const OHP_2100ISchema = new mongoose.Schema(
  {
    // =====================================================
    // GENERAL INFORMATION
    // =====================================================

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

    conveyorSpeed: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed dropdown - no "Other".
    conveyorSpeedUnit: {
      type: String,
      required: true,
      enum: [
        "Feet / minute",
        "Meters / Minute",
      ],
    },

    indexingOrVariableSpeedConditions: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed dropdown - no "Other".
    directionOfTravel: {
      type: String,
      required: true,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
    },

    // "Other" option exists.
    // Custom string value is allowed.
    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    surroundingTemperature: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed dropdown - no "Other".
    conveyorLoadedOrUnloaded: {
      type: String,
      required: true,
      enum: [
        "Loaded",
        "Unloaded",
      ],
    },

    // Fixed Yes / No dropdown.
    conveyorMovement: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // =====================================================
    // CUSTOMER POWER UTILITIES
    // =====================================================

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

    // =====================================================
    // EXISTING MONITOR SYSTEMS
    // =====================================================

    // Fixed Yes / No dropdown.
    connectingToExistingMonitoring: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
    addNewMonitoringSystem: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // =====================================================
    // CONVEYOR SPECIFICATIONS
    // =====================================================

    // Fixed dropdown - no "Other".
    wheelOpenType: {
      type: String,
      required: true,
      enum: [
        "Not Applicable",
        "Open Inside",
        "Open Outside",
      ],
    },

    // Fixed dropdown - no "Other".
    wheelClosedType: {
      type: String,
      required: true,
      enum: [
        "Extended",
        "Flush",
        "Recessed",
      ],
    },

    // Fixed Yes / No dropdown.
    powerChain: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
    chainPins: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
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

    // Fixed Yes / No dropdown.
    railLubeStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
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

    // Fixed Yes / No dropdown.
    lubricationSideChainViscosity: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // IMPORTANT:
    // Frontend key contains a space:
    // key: 'lubricationSideTo Chain'
    //
    // Keeping exact frontend key so request data is not lost.
    "lubricationSideTo Chain": {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
    cleanChain: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // =====================================================
    // WIRE
    // =====================================================

    // Fixed dropdown - no "Other".
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

    junctionBoxQuantity: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // =====================================================

    // Fixed dropdown - no "Other".
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

    // =====================================================
    // TECHNICIAN NOTE
    //
    // Frontend required: false
    // =====================================================

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

// =========================================================
// MODEL
// =========================================================

const OHP_2100I =
  mongoose.models.OHP_2100I ||
  mongoose.model(
    "OHP_2100I",
    OHP_2100ISchema
  );

module.exports = OHP_2100I;