const mongoose = require("mongoose");

const OHP_GPCSchema = new mongoose.Schema({
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
      "Other",
    ],
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
    trim: true,
  },

  otherChainManufacturer: {
    type: String,
    trim: true,
    required: function () {
      return this.chainManufacturer === "Other";
    },
  },

  wheelManufacturer: {
    type: String,
    enum: [
      "Green Line",
      "Frost",
      "M&M",
      "Stork",
      "Meyn",
      "Linco",
      "DC",
      "Merel",
      "D&F",
      "Other",
    ],
    trim: true,
  },

  otherWheelManufacturer: {
    type: String,
    trim: true,
    required: function () {
      return this.wheelManufacturer === "Other";
    },
  },

  conveyorLength: {
    type: String,
    trim: true,
  },

  conveyorLengthUnit: {
    type: String,
    enum: ["Feet"],
    trim: true,
  },

  conveyorSpeed: {
    type: String,
    trim: true,
  },

  conveyorSpeedUnit: {
    type: String,
    enum: ["Feet / minute"],
    trim: true,
  },

  indexingOrVariableSpeedConditions: {
    type: String,
    trim: true,
  },

  directionOfTravel: {
    type: String,
    enum: ["Right to Left", "Left to Right"],
    trim: true,
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
    trim: true,
  },

  surroundingTemperature: {
    type: String,
    trim: true,
  },

  conveyorLoadedOrUnloaded: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
    trim: true,
  },

  conveyorMovement: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
    trim: true,
  },

  plantLayout: {
    type: String,
    trim: true,
  },

  // ============================================================
  // CUSTOMER POWER UTILITIES
  // ============================================================

  operatingVoltageSinglePhase: {
    type: String,
    required: true,
    trim: true,
  },

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
    enum: ["PSI", "KPI", "Bar"],
    trim: true,
  },

  // ============================================================
  // MONITORING SYSTEM
  // ============================================================

  connectingToExistingMonitoring: {
    type: String,
    trim: true,
  },

  addNewMonitoringSystem: {
    type: String,
    enum: ["Yes", "No"],
    trim: true,
  },

  // ============================================================
  // CONVEYOR SPECIFICATIONS
  // ============================================================

  currentGreaseType: {
    type: String,
    trim: true,
  },

  currentGreaseNlgiGrade: {
    type: String,
    trim: true,
  },

  // ============================================================
  // CONTROLLER
  // ============================================================

  chainMasterController: {
    type: String,
    enum: ["Yes", "No"],
    trim: true,
  },

  remote: {
    type: String,
    enum: ["Yes", "No"],
    trim: true,
  },

  mountedOnGreaser: {
    type: String,
    enum: ["Yes", "No"],
    trim: true,
  },

  controlsOtherUnits: {
    type: String,
    trim: true,
  },

  timer: {
    type: String,
    enum: [
      "Not Required",
      "12 Hour",
      "1000 Hour",
    ],
    trim: true,
  },

  electricOnOff: {
    type: String,
    enum: ["On", "Off"],
    trim: true,
  },

  mightyLubeMonitoring: {
    type: String,
    trim: true,
  },

  preMountingRequirements: {
    type: String,
    enum: [
      "OPCO Track",
      "Customer Provided Track",
      "Other",
    ],
    trim: true,
  },

  otherDescribe: {
    type: String,
    trim: true,
  },

  // ============================================================
  // GREASER - POWER CHAIN: MEASUREMENTS
  // ============================================================

  measurementUnit: {
    type: String,
    enum: [
      "Feet",
      "Inches",
      "m Meter",
      "mm Millimeter",
    ],
    trim: true,
  },

  chainDropA: {
    type: String,
    trim: true,
  },

  powerTrolleyWheelB: {
    type: String,
    trim: true,
  },

  trolleyWheelBracketWidthC: {
    type: String,
    trim: true,
  },

  trolleyWheelSpacerD: {
    type: String,
    trim: true,
  },

  zerkFittingVerticalLocationE: {
    type: String,
    trim: true,
  },

  zerkFittingHorizontalLocationF: {
    type: String,
    trim: true,
  },

  railG: {
    type: String,
    trim: true,
  },

  railH: {
    type: String,
    trim: true,
  },

  trolleyPitchS: {
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

const OHP_GPC = mongoose.model("OHP_GPC", OHP_GPCSchema);

module.exports = OHP_GPC