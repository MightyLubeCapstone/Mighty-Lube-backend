const mongoose = require("mongoose");

const PFO_CCS_OP8Schema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" with custom value.
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" with custom value.
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

    directionOfTravel: {
      type: String,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
      required: true,
    },

    // Frontend supports "Other" with custom value.
    applicationEnvironment: {
      type: String,
      trim: true,
      required: true,
    },

    monitoringCapabilitiesRequired: {
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

    conveyorOrientation: {
      type: String,
      enum: [
        "Overhead",
        "Inverted",
        "Inverted/Inverted",
      ],
      required: true,
    },

    // ============================================================
    // CUSTOMER POWER UTILITIES
    // ============================================================

    operatingVoltage3Phase: {
      type: String,
      trim: true,
      required: true,
    },

    controlVoltage: {
      type: String,
      trim: true,
      required: true,
    },

    // ============================================================
    // OP-SS
    // ============================================================

    poweredNonPoweredAvailable: {
      type: String,
      enum: [
        "Powered",
        "Non-Powered",
      ],
      required: true,
    },

    // Frontend supports "Other" with custom value.
    brushMaterialsAvailable: {
      type: String,
      trim: true,
      required: true,
    },

    installationClearanceConfirmed: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ============================================================
    // ADDITIONAL OPTIONS AVAILABLE
    // ============================================================

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

    shroud: {
      type: String,
      enum: [
        "Neoprene Curtain",
        "Full Steel Enclosure",
      ],
      required: true,
    },

    otherAdditionalOptions: {
      type: String,
      trim: true,
      default: "",
    },

    // ============================================================
    // P&F: MEASUREMENTS
    // ============================================================

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

    // ============================================================
    // TECHNICIAN NOTE
    // ============================================================

    technicianNote: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PFO_CCS_OP8 =
  mongoose.models.PFO_CCS_OP8 ||
  mongoose.model(
    "PFO_CCS_OP8",
    PFO_CCS_OP8Schema
  );

module.exports = PFO_CCS_OP8;