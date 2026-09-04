const mongoose = require("mongoose");

const OHP_9000ISchema = new mongoose.Schema({

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
      "Feet",
    ],
    required: false,
  },

  indexingOrVariableSpeedConditions: {
    type: String,
    required: false,
    trim: true,
  },

  // Dropdown options were not clearly confirmed from website.
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
  // NEW MONITORING SYSTEM OR ADDING TO EXISTING MONITORING SYSTEM
  // ============================================================

  // Website dropdown/input options were not clearly confirmed.
  connectingToExistingMonitoring: {
    type: String,
    required: false,
    trim: true,
  },

  // Website dropdown/input options were not clearly confirmed.
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

  // Website options not clearly confirmed.
  railLubrication: {
    type: String,
    required: false,
    trim: true,
  },

  // Website options not clearly confirmed.
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

  // Website options not clearly confirmed.
  lubricationFromSideOfChain: {
    type: String,
    required: false,
    trim: true,
  },

  // Website options not clearly confirmed.
  lubricationFromTopOfChain: {
    type: String,
    required: false,
    trim: true,
  },

  reservoirSize: {
    type: String,
    enum: [
      "10 Gallon",
      "65 Gallon",
    ],
    required: false,
  },

  reservoirSizeQuantity: {
    type: String,
    required: false,
    trim: true,
  },


  // ============================================================
  // CONTROLLER
  // ============================================================

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
  // WIRE
  // ============================================================

  wireMeasurementUnit: {
    type: String,
    enum: [
      "Feet",
      "Inches",
      "m Meter",
      "mm Millimeter",
    ],
    required: false,
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

  junctionBoxQuantities: {
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


  // ============================================================
  // TECHNICIAN NOTE
  // Retained as part of existing product workflow.
  // ============================================================

  technicianNote: {
    type: String,
    required: true,
    trim: true,
  },

});


// Keep existing model/collection mapping unchanged.
const OHP_9000I = mongoose.model("tblOHP_9000I", OHP_9000ISchema);
module.exports = OHP_9000I