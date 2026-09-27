const mongoose = require("mongoose");

// ============================================================
// PFO - CONVEYOR MONITOR SYSTEMS
// MULTI LINE (PERMANENT) ALL IN ONE
// MONITORING + LUBRICATION
//
// Product ID:
// PFO_CMS_MLAIO
//
// Validation-only model.
// Validated data is stored inside ProductConfiguration.
// ============================================================

const PFO_CMS_MLAIO_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" and stores the custom value
    // directly in this same field.
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" and stores the custom value
    // directly in this same field.
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

    // Frontend supports "Other" and stores the custom value
    // directly in this same field.
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

    controlVoltage: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
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
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    wheelOpenRaceStyle: {
      type: String,
      enum: [
        "Not Applicable",
        "Open Inside",
        "Open Outside",
      ],
      required: true,
    },

    wheelSealedStyle: {
      type: String,
      enum: [
        "Extended",
        "Flush",
        "Recessed",
      ],
      required: true,
    },

    powerChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    chainPins: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    caterpillarDrive: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    caterpillarDriveQuantity: {
      type: String,
      trim: true,
      required: true,
    },

    railLubrication: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    externalLubrication: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    currentLubricationEquipmentBrand: {
      type: String,
      trim: true,
      required: true,
    },

    currentLubricantType: {
      type: String,
      trim: true,
      required: true,
    },

    currentLubricantViscosityGrade: {
      type: String,
      trim: true,
      required: true,
    },

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

    reservoirSize: {
      type: String,
      enum: [
        "10 Gallon",
        "65 Gallon",
      ],
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
    // CONTROLLER
    // ========================================================

    controllerSpecialOptions: {
      type: String,
      trim: true,
      required: true,
    },

    // Optional in frontend.
    controllerPleaseSpecify: {
      type: String,
      trim: true,
      default: "",
    },

    // ========================================================
    // P&F: MEASUREMENTS
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

    freeTrolleyWheelPositionVerticalL: {
      type: String,
      trim: true,
      required: true,
    },

    overheadFreeRailG: {
      type: String,
      trim: true,
      required: true,
    },

    overheadFreeRailH: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerTrolleyWheelB: {
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

const PFO_CMS_MLAIO =
  mongoose.models.PFO_CMS_MLAIO ||
  mongoose.model(
    "PFO_CMS_MLAIO",
    PFO_CMS_MLAIO_Schema
  );

module.exports = PFO_CMS_MLAIO;