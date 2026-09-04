const mongoose = require("mongoose");

const OHP_CDLSchema = new mongoose.Schema({

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

  // Website shows this as required dropdown,
  // but exact options were not confirmed.
  applicationEnvironment: {
    type: String,
    required: true,
    trim: true,
  },


  // ============================================================
  // CUSTOMER POWER UTILITIES
  // ============================================================

  controlVoltage: {
    type: String,
    required: true,
    trim: true,
  },


  // ============================================================
  // CONVEYOR SPECIFICATIONS
  // ============================================================

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

  junctionBoxQuantities: {
    type: String,
    required: false,
    trim: true,
  },


  // ============================================================
  // TECHNICIAN NOTE
  // Retained as part of current product workflow.
  // ============================================================

  technicianNote: {
    type: String,
    required: true,
    trim: true,
  },

});


// Keep existing Mongo model / collection mapping unchanged.
const OHP_CDL = mongoose.model("tblOHP_CDL", OHP_CDLSchema);

module.exports = OHP_CDL