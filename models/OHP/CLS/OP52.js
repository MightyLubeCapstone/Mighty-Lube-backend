const mongoose = require("mongoose");

const OHP_OP52Schema = new mongoose.Schema({
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

  applicationEnvironment: {
    type: String,
    required: true,
    enum: [
      "Ambient",
      "Caustic (i.e. Phosphate / E-Coat, etc.)",
      "Oven",
      "Wash Down",
      "Intrinsic",
      "Food Grade",
      "Other",
    ],
  },

  otherApplicationEnvironment: {
    type: String,
    required: function () {
      return this.applicationEnvironment === "Other";
    },
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
    enum: ["Yes", "No"],
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

  controllerText: {
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
  // TECHNICIAN NOTE
  // ============================================================

  technicianNote: {
    type: String,
    required: true,
    trim: true,
  },
})

const OHP_OP52 =
  mongoose.models.OHP_OP52 ||
  mongoose.model("OHP_OP52", OHP_OP52Schema);

module.exports = OHP_OP52