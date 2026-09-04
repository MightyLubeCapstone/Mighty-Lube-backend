const mongoose = require("mongoose");

const ETO_9000E_Schema = new mongoose.Schema({
  // =========================================================
  // GENERAL INFORMATION
  // =========================================================

  conveyorName: {
    type: String,
    required: false,
    trim: true,
  },

  chainSize: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  otherChainSize: {
    type: String,
    required: false,
    trim: true,
  },

  industrialChainManufacturer: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  otherIndustrialChainManufacturer: {
    type: String,
    required: false,
    trim: true,
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
    trim: true,
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
  // MONITORING
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
    trim: true,
  },

  lubeType: {
    type: String,
    required: false,
    trim: true,
  },

  lubeViscosity: {
    type: String,
    required: false,
    trim: true,
  },

  sideLubeStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  topLubeStatus: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  reservoirSize: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  reservoirSizeQuantity: {
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
    trim: true,
  },

  // =========================================================
  // WIRE
  // =========================================================

  wireMeasurementUnit: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conductor2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conductor4: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conductor7: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  conductor12: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  junctionBoxNum: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  // =========================================================
  // ENCLOSED TRACK OVERHEAD MEASUREMENTS
  // =========================================================

  enclosedUnitType: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackB: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackG: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackH: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackS: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackK2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackL2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackM2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackN2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },

  enclosedTrackS2: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

const ETO_9000E =
  mongoose.models.ETO_9000E ||
  mongoose.model("ETO_9000E", ETO_9000E_Schema);

module.exports = ETO_9000E