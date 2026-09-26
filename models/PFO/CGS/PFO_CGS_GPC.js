const mongoose = require("mongoose");

const PFO_CGS_GPCSchema = new mongoose.Schema(
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

    wheelManufacturer: {
      type: String,
      enum: [
        "Green Line",
        "Frost",
        "M&M",
        "Stork",
        "Meyn",
        "Linco",
        "DC",
        "Merel",
        "D&F",
        "Other",
      ],
      required: true,
    },

    otherWheelManufacturer: {
      type: String,
      trim: true,
      required: function () {
        return this.wheelManufacturer === "Other";
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

    conveyorSpeed: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorSpeedUnit: {
      type: String,
      enum: [
        "Feet / minute",
        "Meters /minute",
      ],
      required: true,
    },

    indexingOrVariableSpeedConditions: {
      type: String,
      trim: true,
      required: true,
    },

    directionOfTravel: {
      type: String,
      enum: [
        "Right to Left",
        "Left to Right",
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

    surroundingTemperature: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    conveyorLoadedOrUnloaded: {
      type: String,
      enum: [
        "Loaded",
        "Unloaded",
      ],
      required: true,
    },

    conveyorMovement: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    plantLayout: {
      type: String,
      enum: [
        "Yes - Will Attach",
        "No - Do Not Have",
      ],
      required: true,
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltageSinglePhase: {
      type: String,
      trim: true,
      required: true,
    },

    controlVoltage: {
      type: String,
      trim: true,
      required: true,
    },

    compressedAirSupply: {
      type: String,
      trim: true,
      required: true,
    },

    compressedAirSupplyUnit: {
      type: String,
      enum: [
        "PSI",
        "KPI",
        "Bar",
      ],
      required: true,
    },

    // ========================================================
    // MONITORING SYSTEM
    // ========================================================

    connectingToExistingMonitoring: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    addNewMonitoringSystem: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    currentGreaseType: {
      type: String,
      trim: true,
      required: true,
    },

    currentGreaseNlgiGrade: {
      type: String,
      trim: true,
      required: true,
    },

    // ========================================================
    // CONTROLLER
    // ========================================================

    chainMasterController: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    remote: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    mountedOnGreaser: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    controlsOtherUnits: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    timer: {
      type: String,
      enum: [
        "Not Required",
        "12 Hour",
        "1000 Hour",
      ],
      required: true,
    },

    electricOnOff: {
      type: String,
      enum: ["On", "Off"],
      required: true,
    },

    mightyLubeMonitoring: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    preMountingRequirements: {
      type: String,
      enum: [
        "OPCO Track",
        "Customer Provided Track",
        "Other",
      ],
      required: true,
    },

    otherDescribe: {
      type: String,
      trim: true,
    },

    // ========================================================
    // GREASER - POWER CHAIN: MEASUREMENTS
    // ========================================================

    measurementUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },

    chainDropA: {
      type: String,
      trim: true,
      required: true,
    },

    powerTrolleyWheelB: {
      type: String,
      trim: true,
      required: true,
    },

    trolleyWheelBracketWidthC: {
      type: String,
      trim: true,
      required: true,
    },

    trolleyWheelSpacerD: {
      type: String,
      trim: true,
      required: true,
    },

    zerkFittingVerticalLocationE: {
      type: String,
      trim: true,
      required: true,
    },

    zerkFittingHorizontalLocationF: {
      type: String,
      trim: true,
      required: true,
    },

    railG: {
      type: String,
      trim: true,
      required: true,
    },

    railH: {
      type: String,
      trim: true,
      required: true,
    },

    trolleyPitchS: {
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PFO_CGS_GPC =
  mongoose.models.PFO_CGS_GPC ||
  mongoose.model(
    "PFO_CGS_GPC",
    PFO_CGS_GPCSchema
  );

module.exports = PFO_CGS_GPC;