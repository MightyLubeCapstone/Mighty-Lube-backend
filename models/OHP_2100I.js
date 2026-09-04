const mongoose = require("mongoose");

const OHP_2100ISchema = new mongoose.Schema({

  conveyorName: {
    type: String,
    required: false,
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
    required: false,
  },

  otherConveyorChainSize: {
    type: String,
    required: function () {
      return this.conveyorChainSize === "Other";
    },
    trim: true,
  },

  chainManufacturer: {
    type: String,
    enum: [
      "Other",
    ],
    required: false,
  },

  otherChainManufacturer: {
    type: String,
    required: function () {
      return this.chainManufacturer === "Other";
    },
    trim: true,
  },

  conveyorLength: {
    type: String,
    required: false,
    trim: true,
  },

  conveyorLengthUnit: {
    type: String,
    enum: [
      "Feet",
    ],
    required: false,
  },

  conveyorSpeed: {
    type: String,
    required: false,
    trim: true,
  },

  conveyorSpeedUnit: {
    type: String,
    enum: [
      "Feet / minute",
    ],
    required: false,
  },

  indexingOrVariableSpeedConditions: {
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

  surroundingTemperature: {
    type: String,
    required: false,
    trim: true,
  },

  conveyorLoadedOrUnloaded: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: true,
  },

  conveyorMovement: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: true,
  },

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

  connectingToExistingMonitoring: {
    type: String,
    required: false,
    trim: true,
  },

  addNewMonitoringSystem: {
    type: String,
    required: false,
    trim: true,
  },

  wheelOpenRaceStyle: {
    type: String,
    required: false,
    trim: true,
  },

  wheelSealedStyle: {
    type: String,
    required: false,
    trim: true,
  },

  powerChain: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },

  chainPins: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },

  caterpillarDrive: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },

  caterpillarDriveQuantity: {
    type: String,
    required: false,
    trim: true,
  },

  railLubrication: {
    type: String,
    required: false,
    trim: true,
  },

  externalLubrication: {
    type: String,
    required: false,
    trim: true,
  },

  currentLubricationEquipmentBrand: {
    type: String,
    required: false,
    trim: true,
  },

  currentLubricantType: {
    type: String,
    required: false,
    trim: true,
  },

  currentLubricantViscosityGrade: {
    type: String,
    required: false,
    trim: true,
  },

  lubricationFromSideOfChain: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },

  lubricationFromTopOfChain: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },

  conveyorChainClean: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },

  wireMeasurementUnit: {
    type: String,
    required: false,
    trim: true,
  },

  twoConductor: {
    type: String,
    required: false,
    trim: true,
  },

  fourConductor: {
    type: String,
    required: false,
    trim: true,
  },

  sevenConductor: {
    type: String,
    required: false,
    trim: true,
  },

  twelveConductor: {
    type: String,
    required: false,
    trim: true,
  },

  junctionBoxQuantity: {
    type: String,
    required: false,
    trim: true,
  },

  measurementUnit: {
    type: String,
    enum: [
      "Feet",
    ],
    required: false,
  },

  overheadPowerMonoRailPowerTrolleyWheelB: {
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

  technicianNote: {
    type: String,
    required: true,
    trim: true,
  },

});

const OHP_2100I = mongoose.model("OHP_2100I", OHP_2100ISchema);
module.exports = OHP_2100I