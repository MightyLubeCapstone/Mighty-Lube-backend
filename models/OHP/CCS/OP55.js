const mongoose = require("mongoose");

// =========================================================
// PRODUCT
//
// Product Name: OP-55
// Product ID: OH_CCS_O55
// =========================================================

const OH_CCS_O55Schema = new mongoose.Schema(
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

    // Fixed dropdown - no "Other".
    travelDirection: {
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

    // Fixed Yes / No dropdown.
    surroundingTemperatureOutsideRange: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
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

    // Fixed dropdown - no "Other".
    conveyorOverhead: {
      type: String,
      required: true,
      enum: [
        "Overhead",
        "Inverted",
        "Inverted/Inverted",
      ],
    },

    // =====================================================
    // CUSTOMER POWER UTILITIES
    // =====================================================

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
    pneumaticOnOff: {
      type: String,
      required: true,
      enum: [
        "On",
        "Off",
      ],
    },

    // Frontend required: false
    otherDescribe: {
      type: String,
      default: "",
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

    chainDropA: {
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

const OH_CCS_O55 =
  mongoose.models.OH_CCS_O55 ||
  mongoose.model(
    "OH_CCS_O55",
    OH_CCS_O55Schema
  );

module.exports = OH_CCS_O55;