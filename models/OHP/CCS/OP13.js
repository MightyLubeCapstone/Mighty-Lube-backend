const mongoose = require("mongoose");

const OHCCSOP13Schema = new mongoose.Schema(
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

    otherConveyorChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    chainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    otherChainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    otherApplicationEnvironment: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLoadStatus: {
      type: String,
      required: true,
      trim: true,
    },

    hasPlantLayout: {
      type: String,
      default: "",
      trim: true,
    },

    plantLayoutAttachment: {
      type: String,
      default: "",
      trim: true,
    },

    hasRequiredPictures: {
      type: String,
      default: "",
      trim: true,
    },

    requiredPicturesAttachment: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================================================
    // CUSTOMER POWER UTILITIES
    // =========================================================

    operatingVoltage: {
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
    // SANITARY MEASUREMENTS
    // =========================================================

    measurementUnit: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryChainDropA: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryTrolleyWheelDiameterB: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryWheelDropD: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryTrolleyWheelBottomWidthE: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryTrolleyWheelTopWidthF: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryCenterSupportWidthG: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryCenterSupportHeightH: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryHookRadiusL1: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryHookRadiusL2: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryCHookSupportDiameterL3: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryCHookSupportHeightL4: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryHookRadiusL5: {
      type: String,
      default: "",
      trim: true,
    },

    sanitaryHookRadiusL6: {
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

const OH_CCS_OP13 =
  mongoose.models.OH_CCS_OP13 ||
  mongoose.model("OH_CCS_OP13", OHCCSOP13Schema);

module.exports = OH_CCS_OP13