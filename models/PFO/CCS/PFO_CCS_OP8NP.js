const mongoose = require("mongoose");

const PFO_CCS_OP8NPSchema = new mongoose.Schema({

  // ============================================================
  // GENERAL INFORMATION
  // ============================================================

  conveyorName: {
    type: String,
    trim: true,
    required: true,
  },

  conveyorChainSize: {
    type: String,
    enum: [
      'X348 Chain (3")',
      'X458 Chain (4")',
      'X678 Chain (6")',
      '3/8" Log Chain',
      'Other',
    ],
    required: true,
  },

  otherConveyorChainSize: {
    type: String,
    trim: true,
    required: function () {
      return this.conveyorChainSize === "Other";
    },
  },

  chainManufacturer: {
    type: String,
    enum: [
      "Daifuku",
      "Frost",
      "NKC",
      "Pacline",
      "Rapid",
      "WEBB",
      "Webb-Stiles",
      "Wilkie Brothers",
      "Other",
    ],
    required: true,
  },

  otherChainManufacturer: {
    type: String,
    trim: true,
    required: function () {
      return this.chainManufacturer === "Other";
    },
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

  applicationEnvironment: {
    type: String,
    enum: [
      "Ambient",
      "Caustic (i.e. Phosphate / E-Coat, etc.)",
      "Oven",
      "Wash Down",
      "Intrinsic",
      "Food Grade",
      "Other",
    ],
    required: true,
  },

  otherApplicationEnvironment: {
    type: String,
    trim: true,
    required: function () {
      return this.applicationEnvironment === "Other";
    },
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

});

const PFO_CCS_OP8NP =
  mongoose.models.PFO_CCS_OP8NP ||
  mongoose.model(
    "PFO_CCS_OP8NP",
    PFO_CCS_OP8NPSchema
  );

module.exports = PFO_CCS_OP8NP;