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

    conveyorChainSize: {
      type: String,
      enum: [
        'X348 Chain (3")',
        'X458 Chain (4")',
        'X678 Chain (6")',
        '3/8" Log Chain',
        "Other",
      ],
      required: true,
    },

    otherConveyorChainSize: {
      type: String,
      trim: true,
      required: function () {
        return this.conveyorChainSize === "Other";
      },
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
      required: true,
    },

    otherChainManufacturer: {
      type: String,
      trim: true,
      required: function () {
        return this.chainManufacturer === "Other";
      },
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
      required: function () {
        return this.applicationEnvironment === "Other";
      },
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
      required: true,
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