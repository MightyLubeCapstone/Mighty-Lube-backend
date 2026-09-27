const mongoose = require("mongoose");

const OHP_OP4ASchema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value allowed.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value allowed.
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

    conveyorSpeed: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorSpeedUnit: {
      type: String,
      required: true,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
    },

    indexingOrVariableSpeedConditions: {
      type: String,
      required: true,
      trim: true,
    },

    // Exact frontend key.
    travelDirection: {
      type: String,
      required: true,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
    },

    // Exact frontend key.
    // "Other" exists -> custom value allowed.
    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

    // Exact frontend key.
    surroundingTemp: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    conveyorLoadedOrUnloaded: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    conveyorMovement: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ============================================================
    // CUSTOMER POWER UTILITIES
    // ============================================================

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
      required: true,
      enum: [
        "PSI",
        "KPI",
        "Bar",
      ],
    },

    // ============================================================
    // MONITORING SYSTEM
    // ============================================================

    connectingToExistingMonitoring: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    addNewMonitoringSystem: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    // ============================================================
    // CONVEYOR SPECIFICATIONS
    // ============================================================

    railLubrication: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

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

    optionalFiveGallonReservoir: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    conveyorChainClean: {
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

    controlsOtherUnits: {
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
        "On",
        "Off",
      ],
    },

    pneumaticOnOff: {
      type: String,
      required: true,
      enum: [
        "On",
        "Off",
      ],
    },

    mightyLubeMonitoring: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    preMountingRequirements: {
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

    // Frontend does NOT mark these as required.
    otherControllerDescribe: {
      type: String,
      default: "",
      trim: true,
    },

    controllerSpecialOptions: {
      type: String,
      default: "",
      trim: true,
    },

    controllerPleaseSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================================
    // OVERHEAD POWER RAIL: MEASUREMENTS
    // ============================================================

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

    // Frontend does not mark these measurement fields required.
    chainDropA: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerMonoRailPowerRailG: {
      type: String,
      default: "",
      trim: true,
    },

    overheadPowerMonoRailPowerRailH: {
      type: String,
      default: "",
      trim: true,
    },

    // Frontend has options: [] and does not mark it required.
    measurementDropdown: {
      type: String,
      default: "",
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

// Existing Mongo model mapping preserved.
const OHP_OP4A =
  mongoose.models.tblOHP_OP4A ||
  mongoose.model("tblOHP_OP4A", OHP_OP4ASchema);

module.exports = OHP_OP4A;