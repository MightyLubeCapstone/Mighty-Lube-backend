const mongoose = require("mongoose");

const PFO_CCS_OP8Schema = new mongoose.Schema({

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

  directionOfTravel: {
    type: String,
    enum: [
      "Right to Left",
      "Left to Right",
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

  monitoringCapabilitiesRequired: {
    type: String,
    trim: true,
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
    trim: true,
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

  brushMaterialsAvailable: {
    type: String,
    enum: [
      "Standard Crimped Steel",
      "Nylon Carbide",
      "Polypropylene",
      "Other",
    ],
    required: true,
  },

  otherBrushMaterialsAvailable: {
    type: String,
    trim: true,
    required: function () {
      return this.brushMaterialsAvailable === "Other";
    },
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
    trim: true,
    required: true,
  },

  foodIndustry: {
    type: String,
    trim: true,
    required: true,
  },

  powerPanelWithTimer: {
    type: String,
    trim: true,
    required: true,
  },

  threeStationPushButtonSwitch: {
    type: String,
    trim: true,
    required: true,
  },

  shroud: {
    type: String,
    trim: true,
    required: true,
  },

  otherAdditionalOptions: {
    type: String,
    trim: true,
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

const PFO_CCS_OP8 =
  mongoose.models.PFO_CCS_OP8 ||
  mongoose.model(
    "PFO_CCS_OP8",
    PFO_CCS_OP8Schema
  );

module.exports = PFO_CCS_OP8;