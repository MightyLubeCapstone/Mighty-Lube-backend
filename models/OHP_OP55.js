const mongoose = require("mongoose");

// =========================================================
// PRODUCT
//
// Product Name: OP-55
// Product ID: OH_CCS_O55
// =========================================================

const OHCCSO55Schema = new mongoose.Schema(
  {
    // =====================================================
    // GENERAL INFORMATION
    // =====================================================

    conveyorName: {
      type: String,
      required: false,
      trim: true,
    },

    conveyorChainSize: {
      type: String,
      required: false,
      trim: true,
    },

    chainManufacturer: {
      type: String,
      required: false,
      trim: true,
    },

    conveyorLength: {
      type: String,
      required: false,
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      required: false,
      trim: true,
    },

    directionOfTravel: {
      type: String,
      required: false,
      trim: true,
    },

    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    surroundingTemperatureOutsideRange: {
      type: String,
      required: false,
      trim: true,
    },

    conveyorLoadState: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorOrientation: {
      type: String,
      required: false,
      trim: true,
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

    compressedAirSupplyUnit: {
      type: String,
      required: false,
      trim: true,
    },

    // =====================================================
    // CONTROLLER
    // =====================================================

    chainMasterController: {
      type: String,
      required: false,
      trim: true,
    },

    timer: {
      type: String,
      required: false,
      trim: true,
    },

    electricOnOff: {
      type: String,
      required: false,
      trim: true,
    },

    pneumaticOnOff: {
      type: String,
      required: false,
      trim: true,
    },

    otherDescribe: {
      type: String,
      required: false,
      trim: true,
    },

    // =====================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // =====================================================

    measurementUnit: {
      type: String,
      required: false,
      trim: true,
    },

    chainDropA: {
      type: String,
      required: false,
      trim: true,
    },

    overheadPowerMonoRailPowerRailG: {
      type: String,
      required: false,
      trim: true,
    },

    overheadPowerMonoRailPowerRailH: {
      type: String,
      required: false,
      trim: true,
    },

    // =====================================================
    // TECHNICIAN NOTE
    // =====================================================

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

// =========================================================
// MODEL
// =========================================================

const OH_CCS_O55 = mongoose.model(
  "OH_CCS_O55",
  OHCCSO55Schema
);

module.exports = OH_CCS_O55;