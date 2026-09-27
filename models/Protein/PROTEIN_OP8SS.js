const mongoose = require("mongoose");

// ============================================================
// PROTEIN
// FOOD GRADE CLEANER OP-8SS
//
// Product ID:
// PROTEIN_OP8SS
//
// PURPOSE:
//
// Product-specific validation model.
//
// This model validates the configuration received from the
// Flutter Product Configurator.
//
// IMPORTANT:
//
// This document is NOT saved directly.
//
// After successful validation, the route stores the validated
// data inside:
//
// ProductConfiguration.configurationData
// ============================================================

const PROTEIN_OP8SS_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // Conveyor Chain Size
    //
    // Frontend supports "Other".
    // Custom value is stored directly in this same field.
    // --------------------------------------------------------

    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // Protein Chain Manufacturer
    //
    // Frontend supports "Other".
    // Custom value is stored directly in this same field.
    // --------------------------------------------------------

    chainManufacturer: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // Conveyor Length
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // Direction of Travel
    // --------------------------------------------------------

    travelDirection: {
      type: String,
      enum: [
        "Right to left",
        "Left to right",
      ],
      required: true,
    },

    // --------------------------------------------------------
    // Application Environment
    //
    // Frontend supports "Other".
    // Custom value is stored directly in this same field.
    // --------------------------------------------------------

    applicationEnvironment: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // Surrounding Temperature
    // --------------------------------------------------------

    surroundingTemperature: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // --------------------------------------------------------
    // Conveyor Loaded / Unloaded
    // --------------------------------------------------------

    conveyorLoadedOrUnloaded: {
      type: String,
      enum: [
        "Loaded",
        "Unloaded",
      ],
      required: true,
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltageThreePhase: {
      type: String,
      trim: true,
      required: true,
    },

    controlVoltage: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // OP-SS
    // ========================================================

    installationClearanceConfirmed: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ========================================================
    // ADDITIONAL OPTIONS AVAILABLE
    // ========================================================

    washDown: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    foodIndustry: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    powerPanelWithTimer: {
      type: String,
      enum: [
        "Option 1",
      ],
      required: true,
    },

    threeStationPushButtonSwitch: {
      type: String,
      enum: [
        "Option 1",
      ],
      required: true,
    },

    totallyEnclosedFoodGradeMetalShroud: {
      type: String,
      enum: [
        "Option 1",
      ],
      required: true,
    },

    otherAdditionalOptions: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // WIRE
    // ========================================================

    wireMeasurementUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },

    twoConductor: {
      type: String,
      trim: true,
      required: true,
    },

    fourConductor: {
      type: String,
      trim: true,
      required: true,
    },

    sevenConductor: {
      type: String,
      trim: true,
      required: true,
    },

    twelveConductor: {
      type: String,
      trim: true,
      required: true,
    },

    junctionBoxQuantities: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // FOOD GRADE CLEANER OP-8SS: MEASUREMENTS
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

    chainDropA: {
      type: String,
      trim: true,
      required: true,
    },

    powerTrolleyWheelB: {
      type: String,
      trim: true,
      required: true,
    },

    powerRailG: {
      type: String,
      trim: true,
      required: true,
    },

    powerRailH: {
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

const PROTEIN_OP8SS =
  mongoose.models.PROTEIN_OP8SS ||
  mongoose.model(
    "PROTEIN_OP8SS",
    PROTEIN_OP8SS_Schema
  );

module.exports = PROTEIN_OP8SS;