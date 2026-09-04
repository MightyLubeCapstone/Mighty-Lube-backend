const mongoose = require("mongoose");

const OHP_PMLSchema = new mongoose.Schema({

  // ============================================================
  // GENERAL INFORMATION
  // ============================================================

  conveyorName: {
    type: String,
    trim: true,
  },

  conveyorChainSize: {
    type: String,
    trim: true,
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
    trim: true,
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
    ],
  },

  indexingOrVariableSpeedConditions: {
    type: String,
    trim: true,
  },

  directionOfTravel: {
    type: String,
    trim: true,
  },

  applicationEnvironment: {
    type: String,
    trim: true,
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
    trim: true,
    required: true,
  },

  conveyorSwingSwaySurge: {
    type: String,
    trim: true,
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


  // ============================================================
  // MONITORING FEATURES REQUESTED
  // ============================================================

  paintMarkerSystem: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
  },


  // ============================================================
  // CONVEYOR SPECIFICATIONS
  // ============================================================

  isConveyorClean: {
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
    ],
  },

  chainDrop: {
    type: String,
    trim: true,
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

const OHP_PML = mongoose.model(
  "tblOHP_PML",
  OHP_PMLSchema
);

module.exports = OHP_PML