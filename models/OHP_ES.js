const mongoose = require("mongoose");

const OHP_ESSchema = new mongoose.Schema({

  // ============================================================
  // GENERAL INFORMATION
  // ============================================================

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

  otherApplicationEnvironment: {
    type: String,
    required: function () {
      return this.applicationEnvironment === "Other";
    },
    trim: true,
  },

  requiresMonitoringCapabilities: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
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


  // ============================================================
  // NEW MONITORING SYSTEM / EXISTING MONITORING SYSTEM
  // ============================================================

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


  // ============================================================
  // CONVEYOR SPECIFICATIONS
  // ============================================================

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

  openInsideShieldedOutside: {
    type: String,
    required: false,
    trim: true,
  },

  freeTrolleyWheels: {
    type: String,
    required: false,
    trim: true,
  },

  guideRollers: {
    type: String,
    required: false,
    trim: true,
  },

  guideRollersOpenRaceStyle: {
    type: String,
    required: false,
    trim: true,
  },

  guideRollersSealedStyle: {
    type: String,
    required: false,
    trim: true,
  },

  openHole: {
    type: String,
    required: false,
    trim: true,
  },

  dogActuator: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },

  pivotPoints: {
    type: String,
    required: false,
    trim: true,
  },

  kingPin: {
    type: String,
    required: false,
    trim: true,
  },

  railLubrication: {
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
    required: false,
    trim: true,
  },

  lubricationFromTopOfChain: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
    required: false,
  },


  // ============================================================
  // CONTROLLER
  // ============================================================

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

  mightyLubeMonitoring: {
    type: String,
    required: false,
    trim: true,
  },

  plcConnection: {
    type: String,
    required: false,
    trim: true,
  },

  otherControllerDescribe: {
    type: String,
    required: false,
    trim: true,
  },

  controllerSpecialOptions: {
    type: String,
    required: false,
    trim: true,
  },

  controllerPleaseSpecify: {
    type: String,
    required: false,
    trim: true,
  },


  // ============================================================
  // OVERHEAD POWER RAIL: MEASUREMENTS
  // ============================================================

  measurementUnit: {
    type: String,
    enum: [
      "Feet",
    ],
    required: false,
  },

  chainDropA: {
    type: String,
    required: false,
    trim: true,
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

  measurementText: {
    type: String,
    required: false,
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


// Existing Mongo model mapping preserved.
const OHP_ES = mongoose.model("tblOHP_ES", OHP_ESSchema);

module.exports = OHP_ES