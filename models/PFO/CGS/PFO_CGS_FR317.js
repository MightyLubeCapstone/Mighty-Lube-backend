const mongoose = require("mongoose");

const PFO_CGS_FR317Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
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

    indexingVariableSpeedConditions: {
      type: String,
      trim: true,
      required: true,
    },

    travelDirection: {
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
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    conveyorSwingStatus: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    conveyorOrientation: {
      type: String,
      enum: [
        "Overhead",
        "Inverted",
        "Inverted/Inverted",
      ],
      required: true,
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltage: {
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
    // NEW / EXISTING MONITORING SYSTEM
    // ========================================================

    existingMonitoring: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    newMonitoringSystem: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    freeTrolleyWheels: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    guideRollers: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    guideRollersOpenRaceStyle: {
      type: String,
      enum: [
        "No Applicable",
        "Open Inside",
        "Open Outside",
      ],
      required: true,
    },

    guideRollersSealedStyle: {
      type: String,
      enum: [
        "Extended",
        "Flush",
        "Recessed",
      ],
      required: true,
    },

    openHole: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

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
    },

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

    zerkFittingLocationSide: {
      type: String,
      enum: [
        "Left",
        "Right",
      ],
      required: true,
    },

    zerkFittingLocationOrientation: {
      type: String,
      enum: [
        "Center",
        "12 O'clock",
        "3 O'clock",
        "6 O'clock",
        "9 O'clock",
      ],
      required: true,
    },

    // ========================================================
    // CONTROLLER
    // ========================================================

    chainMasterController: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    remote: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    mountedOnGreaser: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    controlsOtherUnits: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
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
      enum: [
        "On",
        "Off",
      ],
      required: true,
    },

    mightyLubeMonitoring: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
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

    plcConnection: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    otherControllerInfo: {
      type: String,
      trim: true,
    },

    // ========================================================
    // INVERTED P&F: MEASUREMENTS
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

    invertedChainDropA: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerTrolleyWheelB: {
      type: String,
      trim: true,
      required: true,
    },

    invertedZerkFittingVerticalLocationE: {
      type: String,
      trim: true,
      required: true,
    },

    invertedRailG: {
      type: String,
      trim: true,
      required: true,
    },

    invertedRailH: {
      type: String,
      trim: true,
      required: true,
    },

    invertedMinimumTrolleyPitchS: {
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

const PFO_CGS_FR317 =
  mongoose.models.PFO_CGS_FR317 ||
  mongoose.model(
    "PFO_CGS_FR317",
    PFO_CGS_FR317Schema
  );

module.exports = PFO_CGS_FR317;