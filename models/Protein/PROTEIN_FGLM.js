const mongoose = require("mongoose");

// ============================================================
// PROTEIN
// FOOD GRADE LUBRICATION AND MONITOR
//
// Product ID:
// PROTEIN_FGLM
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
// This model is NOT directly persisted.
//
// After successful validation, the route stores the validated
// configuration inside:
//
// ProductConfiguration.configurationData
// ============================================================

const PROTEIN_FGLM_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" custom value is stored in the same field.
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" custom value is stored in the same field.
    chainManufacturer: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" custom value is stored in the same field.
    wheelManufacturer: {
      type: String,
      trim: true,
      required: true,
    },

    chainPinType: {
      type: String,
      enum: [
        "Bolts",
        "Pin",
        "Log",
      ],
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
        "Meters/ Minute",
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

    // Frontend field type is text.
    metalType: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend field type is text.
    conveyorStyle: {
      type: String,
      trim: true,
      required: true,
    },

    // "Other" custom value is stored in the same field.
    trolleyColor: {
      type: String,
      trim: true,
      required: true,
    },

    trolleyType: {
      type: String,
      enum: [
        "Meyn Trolley Halve Green Wheel Bolt Version",
        "Meyn Plastic Quick Version",
        "Meyn Stainless Steel Halve with Green Wheel",
        "Meyn Stainless Steel Halve Gray Wheel",
        "Stork Halve Bolt Version Blue Wheel",
        "Linco Plastic Halve Blue Wheel",
      ],
      required: true,
    },

    // "Other" custom value is stored in the same field.
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

    // Frontend field type is text.
    conveyorLoadedOrUnloaded: {
      type: String,
      trim: true,
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

    plantLayoutToAttach: {
      type: String,
      enum: [
        "Yes - Will Attach",
        "No - Do Not Have",
      ],
      required: true,
    },

    requiredPicturesToAttach: {
      type: String,
      enum: [
        "Yes - Will Attach",
        "No - Do Not Have",
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

    controlVoltage: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // NEW MONITORING SYSTEM OR ADDING TO EXISTING
    // MONITORING SYSTEM
    // ========================================================

    connectingToExistingMonitoring: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    addNewMonitoringSystem: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ========================================================
    // MONITORING FEATURES REQUESTED
    // ========================================================

    driveMotorAmp: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    driveTakeUpAir: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    takeUpDistance: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    driveMotorTemp: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    driveMotorVibration: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    dogPitchValidation: {
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

    lubricationFromSideOfChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    lubricationFromTopOfChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    timeLubrication: {
      type: String,
      trim: true,
      required: true,
    },

    timeDelayLubrication: {
      type: String,
      trim: true,
      required: true,
    },

    reservoirSize: {
      type: String,
      trim: true,
      required: true,
    },

    reservoirSizeQuantity: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorChainClean: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ========================================================
    // WIRE
    // ========================================================

    fourConductor: {
      type: String,
      trim: true,
      required: true,
    },

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

    sevenConductor: {
      type: String,
      trim: true,
      required: true,
    },

    twoConductor: {
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

    wireSecondaryMeasurementUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },

    // ========================================================
    // FOOD GRADE LUBRICATION AND MONITOR: MEASUREMENT
    // ========================================================

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

const PROTEIN_FGLM =
  mongoose.models.PROTEIN_FGLM ||
  mongoose.model(
    "PROTEIN_FGLM",
    PROTEIN_FGLM_Schema
  );

module.exports = PROTEIN_FGLM;