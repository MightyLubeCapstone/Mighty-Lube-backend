const mongoose = require("mongoose");

const ETO_OP48E_Schema = new mongoose.Schema({
  // =========================================================
  // GENERAL INFORMATION
  // =========================================================

  conveyorName: {
    type: String,
    required: false,
  },

  chainSize: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  otherChainSize: {
    type: String,
    required: false,
  },

  industrialChainManufacturer: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  otherIndustrialChainManufacturer: {
    type: String,
    required: false,
  },

  conveyorLength: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conveyorLengthUnit: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conveyorSpeed: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conveyorSpeedUnit: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conveyorIndex: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  travelDirection: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  appEnviroment: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  otherAppEnviroment: {
    type: String,
    required: false,
  },

  surroundingTemp: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  // =========================================================
  // CUSTOMER POWER UTILITIES
  // =========================================================

  operatingVoltage: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  controlVoltage: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  // =========================================================
  // MONITORING SYSTEM
  // =========================================================

  existingMonitoring: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  newMonitoringSystem: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  // =========================================================
  // CONVEYOR SPECIFICATIONS
  // =========================================================

  wheelOpenType: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  wheelClosedType: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  powerChain: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  chainPins: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  catDriveStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  catDriveNum: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  railLubeStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  externalLubeStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  lubeBrand: {
    type: String,
    required: false,
  },

  lubeType: {
    type: String,
    required: false,
  },

  lubeViscosity: {
    type: String,
    required: false,
  },

  sideLubeStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  topLubeStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  chainCleanStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  // =========================================================
  // CONTROLLER
  // =========================================================

  specialControllerOptions: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  controllerPleaseSpecify: {
    type: String,
    required: false,
  },

  // =========================================================
  // ENCLOSED TRACK OVERHEAD MEASUREMENTS
  // =========================================================

  etUnitType: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadB: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadG: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadH: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadS: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadK2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadL2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadM2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadN2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  etOverheadS2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

const ETO_OP48E =
  mongoose.models.ETO_OP48E ||
  mongoose.model("ETO_OP48E", ETO_OP48E_Schema);

module.exports = ETO_OP48E