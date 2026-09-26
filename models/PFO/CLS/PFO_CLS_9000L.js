const mongoose = require("mongoose");

const PFO_CLS_9000L_Schema = new mongoose.Schema(
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

    conveyorLoadedOrUnloaded: {
      type: String,
      enum: [
        "Loaded",
        "Unloaded",
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

    // ========================================================
    // MONITORING SYSTEM
    // ========================================================

    connectingToExistingMonitoring: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    addNewMonitoringSystem: {
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

    wheelOpenRaceStyle: {
      type: String,
      enum: [
        "No Applicable",
        "Open Inside",
        "Open Outside",
      ],
      required: true,
    },

    wheelSealedStyle: {
      type: String,
      enum: [
        "Extended",
        "Flush",
        "Recessed",
      ],
      required: true,
    },

    powerChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    chainPins: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    caterpillarDrive: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    caterpillarDriveQuantity: {
      type: String,
      trim: true,
      required: true,
    },

    railLubrication: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    externalLubrication: {
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

    reservoirSize: {
      type: String,
      enum: [
        "10 Gallon",
        "65 Gallon",
      ],
      required: true,
    },

    reservoirSizeQuantity: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorChainClean: {
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

    controllerSpecialOptions: {
      type: String,
      trim: true,
      required: true,
    },

    controllerPleaseSpecify: {
      type: String,
      trim: true,
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
    // P&F: MEASUREMENTS
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

    freeTrolleyWheelPositionVerticalL: {
      type: String,
      trim: true,
      required: true,
    },

    overheadFreeRailG: {
      type: String,
      trim: true,
      required: true,
    },

    overheadFreeRailH: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerTrolleyWheelB: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeRailG: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeRailH: {
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

const PFO_CLS_9000L =
  mongoose.models.PFO_CLS_9000L ||
  mongoose.model(
    "PFO_CLS_9000L",
    PFO_CLS_9000L_Schema
  );

module.exports = PFO_CLS_9000L;