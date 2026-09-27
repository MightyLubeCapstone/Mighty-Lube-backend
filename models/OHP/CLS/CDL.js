const mongoose = require("mongoose");

const OHP_CDLSchema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists.
    // Custom string value is allowed.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists.
    // Custom string value is allowed.
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

    // Fixed dropdown - no "Other".
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

    // "Other" option exists.
    // Custom string value is allowed.
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
      trim: true,
    },

    lubricationFromTopOfChain: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================================
    // CONTROLLER
    // ============================================================

    controllerSpecialOptions: {
      type: String,
      required: true,
      trim: true,
    },

    // Frontend does not mark this as required.
    controllerPleaseSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================================
    // WIRE
    // ============================================================

    // Exact frontend key is "measurementUnit".
    measurementUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "Meter",
        "Millimeter",
      ],
    },

    twoConductor: {
      type: String,
      required: true,
      trim: true,
    },

    fourConductor: {
      type: String,
      required: true,
      trim: true,
    },

    sevenConductor: {
      type: String,
      required: true,
      trim: true,
    },

    twelveConductor: {
      type: String,
      required: true,
      trim: true,
    },

    junctionBoxQuantities: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

// Keep existing Mongo model / collection mapping unchanged.
const OHP_CDL =
  mongoose.models.tblOHP_CDL ||
  mongoose.model("tblOHP_CDL", OHP_CDLSchema);

module.exports = OHP_CDL;