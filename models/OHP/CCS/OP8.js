const mongoose = require("mongoose");

const OH_CCS_OP8Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

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

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltage3Phase: {
      type: String,
      required: true,
      trim: true,
    },

    controlVoltage: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // OP-SS
    // ========================================================

    // Fixed dropdown - no "Other".
    poweredNonPoweredAvailable: {
      type: String,
      required: true,
      enum: [
        "Powered",
        "Non-Powered",
      ],
    },

    // "Other" option exists.
    // Custom string value is allowed.
    brushMaterialsAvailable: {
      type: String,
      required: true,
      trim: true,
    },

    // Fixed Yes / No dropdown.
    installationClearanceConfirmed: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ========================================================
    // ADDITIONAL OPTIONS AVAILABLE
    // ========================================================

    // Fixed Yes / No dropdown.
    washDown: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed Yes / No dropdown.
    foodIndustry: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Fixed dropdown - no "Other".
    powerPanelWithTimer: {
      type: String,
      required: true,
      enum: [
        "Option 1",
      ],
    },

    // Fixed dropdown - no "Other".
    threeStationPushButtonSwitch: {
      type: String,
      required: true,
      enum: [
        "Option 1",
      ],
    },

    // Fixed dropdown - no "Other".
    shroud: {
      type: String,
      required: true,
      enum: [
        "Neoprene Curtain",
        "Full Steel Enclosure",
      ],
    },

    // Frontend text field.
    // Not marked required.
    otherAdditionalOptions: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // ========================================================

    // Fixed dropdown - no "Other".
    freeRailMeasurementUnit: {
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

    // ========================================================
    // TECHNICIAN NOTE
    //
    // Frontend required: false
    // ========================================================

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

// ==========================================================
// MODEL
// ==========================================================

const OH_CCS_OP8 =
  mongoose.models.OH_CCS_OP8 ||
  mongoose.model(
    "OH_CCS_OP8",
    OH_CCS_OP8Schema
  );

module.exports = OH_CCS_OP8;