const mongoose = require("mongoose");

const OHP_OP52Schema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value can be stored in same field.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value can be stored in same field.
    chainManufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorLength: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "Meter",
        "Millimeter",
      ],
    },

    // "Other" exists -> custom value can be stored in same field.
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
      required: true,
      trim: true,
    },

    currentLubricantType: {
      type: String,
      required: true,
      trim: true,
    },

    currentLubricantViscosityGrade: {
      type: String,
      required: true,
      trim: true,
    },

    lubricationFromSideOfChain: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    lubricationFromTopOfChain: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ============================================================
    // CONTROLLER
    // ============================================================

    chainMasterController: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    timer: {
      type: String,
      required: true,
      enum: [
        "Not Required",
        "12 Hour",
        "1000 Hour",
      ],
    },

    electricOnOff: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    plcConnection: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // Optional in frontend.
    otherControllerDescribe: {
      type: String,
      default: "",
      trim: true,
    },

    controllerSpecialOptions: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional in frontend.
    controllerPleaseSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================================
    // TECHNICIAN NOTE
    // ============================================================

    technicianNote: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OHP_OP52 =
  mongoose.models.OHP_OP52 ||
  mongoose.model("OHP_OP52", OHP_OP52Schema);

module.exports = OHP_OP52;