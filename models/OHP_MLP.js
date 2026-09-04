const mongoose = require("mongoose");

const OHP_MLPSchema = new mongoose.Schema({

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
      'Other',
    ],
  },

  otherConveyorChainSize: {
    type: String,
    trim: true,
  },

  chainManufacturer: {
    type: String,
    trim: true,
  },

  otherChainManufacturer: {
    type: String,
    trim: true,
  },

  conveyorLength: {
    type: String,
    trim: true,
  },

  conveyorLengthUnit: {
    type: String,
    enum: ["Feet"],
  },

  conveyorSpeed: {
    type: String,
    trim: true,
  },

  conveyorSpeedUnit: {
    type: String,
    enum: ["Feet / minute"],
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
  },

  surroundingAreaTemperature: {
    type: String,
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
    enum: ["PSI"],
  },


  // ============================================================
  // NEW MONITORING SYSTEM OR ADDING TO EXISTING MONITORING SYSTEM
  // ============================================================

  connectingToExistingMonitoring: {
    type: String,
    trim: true,
  },

  addNewMonitoringSystem: {
    type: String,
    trim: true,
  },


  // ============================================================
  // CONVEYOR SPECIFICATIONS
  // ============================================================

  powerRail: {
    type: String,
    trim: true,
  },

  powerChain: {
    type: String,
    trim: true,
  },

  currentLubricationEquipmentBrand: {
    type: String,
    trim: true,
  },

  currentLubricantType: {
    type: String,
    trim: true,
  },

  currentLubricantViscosityGrade: {
    type: String,
    trim: true,
  },

  lubricationFromSideOfChain: {
    type: String,
    trim: true,
  },

  lubricationFromTopOfChain: {
    type: String,
    trim: true,
  },

  isConveyorChainClean: {
    type: String,
    trim: true,
  },


  // ============================================================
  // CONTROLLER
  // ============================================================

  chainMasterController: {
    type: String,
    trim: true,
  },

  remote: {
    type: String,
    trim: true,
  },

  mountedOnGreaser: {
    type: String,
    trim: true,
  },

  controlsOtherUnits: {
    type: String,
    trim: true,
  },

  timer: {
    type: String,
    trim: true,
  },

  electricOnOff: {
    type: String,
    trim: true,
  },

  pneumaticOnOff: {
    type: String,
    trim: true,
  },

  mightyLubeMonitoring: {
    type: String,
    trim: true,
  },

  preMountingRequirements: {
    type: String,
    trim: true,
  },

  plcConnection: {
    type: String,
    trim: true,
  },

  otherControllerDescribe: {
    type: String,
    trim: true,
  },


  // ============================================================
  // SPECIAL OPTIONS
  // ============================================================

  specialControllerOptions: {
    type: String,
    trim: true,
  },

  specialOptionsPleaseSpecify: {
    type: String,
    trim: true,
  },


  // ============================================================
  // COMMENTS / ADDITIONAL INFORMATION
  // ============================================================

  commentsDescription: {
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

const OHP_MLP = mongoose.model("tblOHP_MLP", OHP_MLPSchema);

module.exports = OHP_MLP