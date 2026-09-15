const mongoose = require("mongoose");

const OHCCSOP8Schema = new mongoose.Schema(
  {
    // =========================================================
    // GENERAL INFORMATION
    // =========================================================

    conveyorName: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    chainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLength: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      default: "",
      trim: true,
    },

    directionOfTravel: {
      type: String,
      default: "",
      trim: true,
    },

    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    surroundingTemperatureOutsideRange: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLoadState: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================================================
    // CUSTOMER POWER UTILITIES
    // =========================================================

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

    // =========================================================
    // OP-SS
    // =========================================================

    poweredNonPoweredAvailable: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Powered",
        "Non-Powered",
      ],
    },

    brushMaterialsAvailable: {
      type: String,
      required: true,
      trim: true,
    },

    installationClearanceConfirmed: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================================================
    // ADDITIONAL OPTIONS AVAILABLE
    // =========================================================

    washDown: {
      type: String,
      default: "",
      trim: true,
    },

    foodIndustry: {
      type: String,
      default: "",
      trim: true,
    },

    powerPanelWithTimer: {
      type: String,
      default: "",
      trim: true,
    },

    threeStationPushButtonSwitch: {
      type: String,
      default: "",
      trim: true,
    },

    shroud: {
      type: String,
      default: "",
      trim: true,
    },

    otherAdditionalOptions: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // =========================================================

    measurementUnit: {
      type: String,
      default: "",
      trim: true,
    },

    chainDropA: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerMonoRailPowerTrolleyWheelB: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerMonoRailPowerRailG: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerMonoRailPowerRailH: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================================================
    // TECHNICIAN NOTE
    // =========================================================

    technicianNote: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OH_CCS_OP8 =
  mongoose.models.OH_CCS_OP8 ||
  mongoose.model("OH_CCS_OP8", OHCCSOP8Schema);

module.exports = OH_CCS_OP8;