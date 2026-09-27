const mongoose = require("mongoose");

const PFO_CLS_CDL_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" custom value in same field
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // Frontend supports "Other" custom value in same field
    chainManufacturer: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorLength: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorLengthUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },

    // Frontend supports "Other" custom value in same field
    applicationEnvironment: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    controlVoltage: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    currentLubricationEquipmentBrand: {
      type: String,
      trim: true,
      required: true,
    },

    currentLubricantType: {
      type: String,
      trim: true,
      required: true,
    },

    currentLubricantViscosityGrade: {
      type: String,
      trim: true,
      required: true,
    },

    lubricationFromSideOfChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    lubricationFromTopOfChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ========================================================
    // CONTROLLER
    // ========================================================

    controllerAddOnOptions: {
      type: String,
      trim: true,
      required: true,
    },

    controllerPleaseSpecify: {
      type: String,
      trim: true,
      default: "",
    },

    // ========================================================
    // WIRE
    // ========================================================

    wireMeasurementUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },

    twoConductor: {
      type: String,
      trim: true,
      required: true,
    },

    fourConductor: {
      type: String,
      trim: true,
      required: true,
    },

    sevenConductor: {
      type: String,
      trim: true,
      required: true,
    },

    twelveConductor: {
      type: String,
      trim: true,
      required: true,
    },

    junctionBoxQuantities: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // TECHNICIAN NOTE
    // ========================================================

    technicianNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const PFO_CLS_CDL =
  mongoose.models.PFO_CLS_CDL ||
  mongoose.model(
    "PFO_CLS_CDL",
    PFO_CLS_CDL_Schema
  );

module.exports = PFO_CLS_CDL;