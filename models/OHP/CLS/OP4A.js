const mongoose = require("mongoose");

const OHP_OP4ASchema = new mongoose.Schema({
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

  otherConveyorChainSize: {
    type: String,
    required: function () {
      return this.conveyorChainSize === "Other";
    },
    trim: true,
  },

  chainManufacturer: {
    type: String,
    required: false,
    trim: true,
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
    required: false,
    enum: ["Feet"],
  },

  conveyorSpeed: {
    type: String,
    required: false,
    trim: true,
  },

  conveyorSpeedUnit: {
    type: String,
    required: false,
    enum: ["Feet"],
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

  surroundingTemperatureOutsideRange: {
    type: String,
    required: false,
    enum: ["No"],
  },

  conveyorLoadedOrUnloaded: {
    type: String,
    required: true,
    enum: ["Loaded"],
  },

  conveyorMovement: {
    type: String,
    required: true,
    enum: ["No"],
  },

  // ============================================================
  // CUSTOMER POWER UTILITIES
  // ============================================================

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
    required: false,
    enum: ["PSI"],
  },

  // ============================================================
  // MONITORING SYSTEM
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
    required: false,
    trim: true,
  },

  optionalFiveGallonReservoir: {
    type: String,
    required: false,
    enum: ["No"],
  },

  conveyorChainClean: {
    type: String,
    required: false,
    trim: true,
  },

  // ============================================================
  // CONTROLLER
  // ============================================================

  chainMasterController: {
    type: String,
    required: false,
    enum: ["Yes", "No"],
  },

  controlsOtherUnits: {
    type: String,
    required: false,
    enum: ["Yes", "No"],
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

  preMountingRequirements: {
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
    required: false,
    enum: ["Feet"],
  },

  chainDropA: {
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

  measurementDropdown: {
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

const OHP_OP4A = mongoose.model("tblOHP_OP4A", OHP_OP4ASchema);

module.exports = OHP_OP4A