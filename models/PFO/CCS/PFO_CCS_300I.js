const mongoose = require("mongoose");

const PFO_CCS_300ISchema = new mongoose.Schema({

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
      "Meters / minute",
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
  // TECHNICIAN NOTE
  // ============================================================

  technicianNote: {
    type: String,
    required: true,
    trim: true,
  },

});

const PFO_CCS_300I =
  mongoose.models.PFO_CCS_300I ||
  mongoose.model(
    "PFO_CCS_300I",
    PFO_CCS_300ISchema
  );

module.exports = PFO_CCS_300I;