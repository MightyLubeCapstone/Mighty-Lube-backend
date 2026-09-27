const mongoose = require("mongoose");

const OHP_ESSchema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists, so custom value is allowed.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" option exists, so custom value is allowed.
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
        "Feet / minute",
        "Meters/ Minute",
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

    // IMPORTANT:
    // Exact frontend key is "appEnviroment".
    // "Other" can be replaced by custom entered text.
    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

    requiresMonitoringCapabilities: {
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

    // ============================================================
    // NEW MONITORING SYSTEM / EXISTING MONITORING SYSTEM
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

    wheelOpenType: {
      type: String,
      required: true,
      enum: [
        "Not Applicable",
        "Open Inside",
        "Open Outside",
      ],
    },

    wheelClosedType: {
      type: String,
      required: true,
      enum: [
        "Extended",
        "Flush",
        "Recessed",
      ],
    },

    openStatus: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    freeTrolleyWheels: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    guideRollers: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    guideRollersOpenRaceStyle: {
      type: String,
      required: true,
      enum: [
        "Not Applicable",
        "Open Inside",
        "Open Outside",
      ],
    },

    guideRollersSealedStyle: {
      type: String,
      required: true,
      enum: [
        "Extended",
        "Flush",
        "Recessed",
      ],
    },

    openHole: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    dogActuator: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    pivotPoints: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    kingPin: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

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
      trim: true,
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

    pneumaticOnOff: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
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

    plcConnection: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    otherControllerDescribe: {
      type: String,
      required: true,
      trim: true,
    },

    // Frontend does NOT mark these two as required.
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

    chainDropA: {
      type: String,
      required: true,
      trim: true,
    },

    overheadPowerMonoRailPowerTrolleyWheelB: {
      type: String,
      required: true,
      trim: true,
    },

    overheadPowerMonoRailPowerRailG: {
      type: String,
      required: true,
      trim: true,
    },

    overheadPowerMonoRailPowerRailH: {
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

// Existing Mongo model mapping preserved.
const OHP_ES =
  mongoose.models.tblOHP_ES ||
  mongoose.model("tblOHP_ES", OHP_ESSchema);

module.exports = OHP_ES;