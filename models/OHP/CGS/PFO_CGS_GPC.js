const mongoose = require("mongoose");

// =========================================================
// PRODUCT
//
// Product Name: Greaser Power Chain
// Product ID: OHP_GPC
// =========================================================

const OHP_GPCSchema = new mongoose.Schema(
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

    // "Other" option exists.
    // Custom string value is allowed.
    wheelManufacturer: {
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

    // Fixed dropdown - no "Other".
    plantLayout: {
      type: String,
      required: true,
      enum: [
        "Yes - Will Attach",
        "No - Will Attach",
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

    compressedAirSupply: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed dropdown - no "Other".
    compressedAirSupplyUnit: {
      type: String,
      required: true,
      enum: [
        "PSI",
        "KPI",
        "Bar",
      ],
    },

    // =====================================================
    // MONITORING SYSTEM
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

    currentGreaseType: {
      type: String,
      required: true,
      trim: true,
    },

    currentGreaseNlgiGrade: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // CONTROLLER
    // =====================================================

    // Fixed Yes / No dropdown.
    chainMasterController: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
    remote: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
    mountedOnGreaser: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
    controlsOtherUnits: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed dropdown - no "Other".
    timer: {
      type: String,
      required: true,
      enum: [
        "Not Required",
        "12 Hour",
        "1000 Hour",
      ],
    },

    // Fixed dropdown - no "Other".
    electricOnOff: {
      type: String,
      required: true,
      enum: [
        "On",
        "Off",
      ],
    },

    // Fixed dropdown - no "Other".
    mightyLubeMonitoring: {
      type: String,
      required: true,
      enum: [
        "On",
        "Off",
      ],
    },

    // "Other" option exists.
    // Custom string value is allowed.
    preMountingRequirements: {
      type: String,
      required: true,
      trim: true,
    },

    // Frontend does not mark this required.
    otherDescribe: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================================
    // GREASER - POWER CHAIN: MEASUREMENTS
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

    chainDropA: {
      type: String,
      required: true,
      trim: true,
    },

    powerTrolleyWheelB: {
      type: String,
      required: true,
      trim: true,
    },

    trolleyWheelBracketWidthC: {
      type: String,
      required: true,
      trim: true,
    },

    trolleyWheelSpacerD: {
      type: String,
      required: true,
      trim: true,
    },

    zerkFittingVerticalLocationE: {
      type: String,
      required: true,
      trim: true,
    },

    zerkFittingHorizontalLocationF: {
      type: String,
      required: true,
      trim: true,
    },

    railG: {
      type: String,
      required: true,
      trim: true,
    },

    railH: {
      type: String,
      required: true,
      trim: true,
    },

    trolleyPitchS: {
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

const OHP_GPC =
  mongoose.models.OHP_GPC ||
  mongoose.model(
    "OHP_GPC",
    OHP_GPCSchema
  );

module.exports = OHP_GPC;