const mongoose = require("mongoose");

const OHP_OP139ASchema = new mongoose.Schema(
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

    travelDirection: {
      type: String,
      required: true,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
    },

    // "Other" exists -> custom value allowed.
    // Exact frontend key spelling.
    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

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
    // NEW / EXISTING MONITORING SYSTEM
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

    isConveyorChainClean: {
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
        "Not Required",
        "12 Hour",
        "1000 Hour",
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

    // Optional in frontend.
    otherControllerDescribe: {
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

    chainDrop: {
      type: String,
      required: true,
      trim: true,
    },

    powerTrolleyWheelDiameter: {
      type: String,
      required: true,
      trim: true,
    },

    powerRailWidth: {
      type: String,
      required: true,
      trim: true,
    },

    powerRailHeight: {
      type: String,
      required: true,
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

const OHP_OP139A =
  mongoose.models.tblOHP_OP139A ||
  mongoose.model("tblOHP_OP139A", OHP_OP139ASchema);

module.exports = OHP_OP139A;