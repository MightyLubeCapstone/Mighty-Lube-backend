const mongoose = require("mongoose");

const PFO_CGS_GPCSchema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" with custom value in same field
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" with custom value in same field
    chainManufacturer: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" with custom value in same field
    wheelManufacturer: {
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
        "Meters /minute",
      ],
      required: true,
    },

    indexingOrVariableSpeedConditions: {
      type: String,
      trim: true,
      required: true,
    },

    directionOfTravel: {
      type: String,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
      required: true,
    },

    // Frontend supports "Other" with custom value in same field
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

    conveyorMovement: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    plantLayout: {
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

    compressedAirSupply: {
      type: String,
      trim: true,
      required: true,
    },

    compressedAirSupplyUnit: {
      type: String,
      enum: [
        "PSI",
        "KPI",
        "Bar",
      ],
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

    currentGreaseType: {
      type: String,
      trim: true,
      required: true,
    },

    currentGreaseNlgiGrade: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // CONTROLLER
    // ========================================================

    chainMasterController: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    remote: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    mountedOnGreaser: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    controlsOtherUnits: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    timer: {
      type: String,
      enum: [
        "Not Required",
        "12 Hour",
        "1000 Hour",
      ],
      required: true,
    },

    electricOnOff: {
      type: String,
      enum: [
        "On",
        "Off",
      ],
      required: true,
    },

    mightyLubeMonitoring: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // Frontend supports "Other" with custom value in same field
    preMountingRequirements: {
      type: String,
      trim: true,
      required: true,
    },

    // Optional in frontend
    otherDescribe: {
      type: String,
      trim: true,
      default: "",
    },

    // ========================================================
    // GREASER - POWER CHAIN: MEASUREMENTS
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

    trolleyWheelBracketWidthC: {
      type: String,
      trim: true,
      required: true,
    },

    trolleyWheelSpacerD: {
      type: String,
      trim: true,
      required: true,
    },

    zerkFittingVerticalLocationE: {
      type: String,
      trim: true,
      required: true,
    },

    zerkFittingHorizontalLocationF: {
      type: String,
      trim: true,
      required: true,
    },

    railG: {
      type: String,
      trim: true,
      required: true,
    },

    railH: {
      type: String,
      trim: true,
      required: true,
    },

    trolleyPitchS: {
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

const PFO_CGS_GPC =
  mongoose.models.PFO_CGS_GPC ||
  mongoose.model(
    "PFO_CGS_GPC",
    PFO_CGS_GPCSchema
  );

module.exports = PFO_CGS_GPC;