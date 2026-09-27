const mongoose = require("mongoose");

// ============================================================
// PFO - CONVEYOR MONITOR SYSTEMS
// PORTABLE (MULTI-LINE) MIGHTY LUBE® MONITORING SYSTEM
//
// Product ID:
// PFO_CMS_PMLMS
//
// This is a PRODUCT-SPECIFIC VALIDATION MODEL.
//
// This model is NOT directly persisted.
// After successful validation, configuration data is stored
// inside the generic ProductConfiguration document.
// ============================================================

const PFO_CMS_PMLMS_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" custom value is stored in this same field.
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" custom value is stored in this same field.
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

    // Exact frontend values.
    conveyorSpeedUnit: {
      type: String,
      enum: [
        "Feet / minute",
        "Meters /minute",
      ],
      required: true,
    },

    indexingVariableSpeedConditions: {
      type: String,
      trim: true,
      required: true,
    },

    travelDirection: {
      type: String,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
      required: true,
    },

    // "Other" custom value is stored in this same field.
    applicationEnvironment: {
      type: String,
      trim: true,
      required: true,
    },

    surroundingTemperature: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    conveyorLoadedOrUnloaded: {
      type: String,
      enum: [
        "Loaded",
        "Unloaded",
      ],
      required: true,
    },

    conveyorSwingStatus: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
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

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltageSinglePhase: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // MONITORING FEATURES REQUESTED
    // ========================================================

    paintMarkerSystem: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    conveyorChainClean: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ========================================================
    // INVERTED P&F: MEASUREMENTS
    // ========================================================

    measurementUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },

    invertedPowerAndFreeChainDropA: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeRailG: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeRailH: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // TECHNICIAN NOTE
    // ========================================================

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

// ============================================================
// MODEL REGISTRATION
// ============================================================

const PFO_CMS_PMLMS =
  mongoose.models.PFO_CMS_PMLMS ||
  mongoose.model(
    "PFO_CMS_PMLMS",
    PFO_CMS_PMLMS_Schema
  );

module.exports = PFO_CMS_PMLMS;