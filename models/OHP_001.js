const mongoose = require("mongoose");

const OHP_001Schema = new mongoose.Schema({

  // ============================================================
  // GENERAL INFORMATION
  // ============================================================

  conveyorName: {
    type: String,
    trim: true,
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
  },

  conveyorLengthUnit: {
    type: String,
    enum: [
      "Feet",
      "Inches",
      "m Meter",
      "mm Millimeter",
    ],
  },

  conveyorSpeed: {
    type: String,
    trim: true,
  },

  conveyorSpeedUnit: {
    type: String,
    enum: [
      "Feet / minute",
      "Meters / minute",
    ],
  },

  indexingOrVariableSpeedConditions: {
    type: String,
    trim: true,
  },

  directionOfTravel: {
    type: String,
    enum: [
      "Right to Left",
      "Left to Right",
    ],
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

  surroundingAreaTemperature: {
    type: String,
    trim: true,
  },

  conveyorLoadedOrUnloaded: {
    type: String,
    enum: [
      "Loaded",
      "Unloaded",
    ],
    required: true,
  },

  conveyorSwingSwaySurge: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: true,
  },


  // ============================================================
  // CUSTOMER POWER UTILITIES
  // ============================================================

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


  // ============================================================
  // MONITORING FEATURES REQUESTED
  // ============================================================

  paintMarkerSystem: {
    type: String,
    trim: true,
  },


  // ============================================================
  // CONVEYOR SPECIFICATIONS
  // ============================================================

  isConveyorChainClean: {
    type: String,
    trim: true,
  },


  // ============================================================
  // OVERHEAD POWER RAIL MEASUREMENTS
  // ============================================================

  measurementUnit: {
    type: String,
    enum: [
      "Feet",
      "Inches",
      "m Meter",
      "mm Millimeter",
    ],
  },

  powerTrolleyWheelDiameter: {
    type: String,
    trim: true,
  },

  powerRailWidth: {
    type: String,
    trim: true,
  },

  powerRailHeight: {
    type: String,
    trim: true,
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

const OHP_001 =
  mongoose.models.OHP_001 ||
  mongoose.model("OHP_001", OHP_001Schema);

module.exports = OHP_001