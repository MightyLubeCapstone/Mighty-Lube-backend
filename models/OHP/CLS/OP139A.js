const mongoose = require("mongoose");

const OHP_OP139ASchema = new mongoose.Schema({

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
    enum: [
      "Feet",
    ],
  },

  conveyorSpeed: {
    type: String,
    required: false,
    trim: true,
  },

  conveyorSpeedUnit: {
    type: String,
    required: false,
    enum: [
      "Feet / minute",
    ],
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
    required: true,
    trim: true,
  },

  surroundingAreaTemperature: {
    type: String,
    required: false,
    trim: true,
  },

  conveyorLoadedOrUnloaded: {
    type: String,
    required: true,
    trim: true,
  },

  conveyorSwingSwaySurge: {
    type: String,
    required: true,
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
    required: false,
    enum: [
      "PSI",
    ],
  },


  // ============================================================
  // NEW MONITORING SYSTEM OR ADDING TO EXISTING MONITORING SYSTEM
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

  isConveyorChainClean: {
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
    trim: true,
  },

  controlsOtherUnits: {
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
    enum: [
      "On",
      "Off",
    ],
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


  // ============================================================
  // OVERHEAD POWER RAIL: MEASUREMENTS
  // ============================================================

  measurementUnit: {
    type: String,
    required: false,
    enum: [
      "Feet",
    ],
  },

  chainDrop: {
    type: String,
    required: false,
    trim: true,
  },

  powerTrolleyWheelDiameter: {
    type: String,
    required: false,
    trim: true,
  },

  powerRailWidth: {
    type: String,
    required: false,
    trim: true,
  },

  powerRailHeight: {
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

const OHP_OP139A =
  mongoose.models.tblOHP_OP139A ||
  mongoose.model("tblOHP_OP139A", OHP_OP139ASchema);

module.exports = OHP_OP139A