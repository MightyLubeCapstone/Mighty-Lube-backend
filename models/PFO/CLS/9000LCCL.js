const mongoose = require("mongoose");

const PFO_9000LCCL_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // Supports custom "Other" value in same field
    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // Supports custom "Other" value in same field
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

    // Supports custom "Other" value in same field
    applicationEnvironment: {
      type: String,
      trim: true,
      required: true,
    },

    surroundingTemperature: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    conveyorLoadedOrUnloaded: {
      type: String,
      enum: ["Loaded", "Unloaded"],
      required: true,
    },

    conveyorSwingStatus: {
      type: String,
      enum: ["Yes", "No"],
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
    // NEW MONITORING SYSTEM OR ADDING TO EXISTING MONITORING
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

    addDcu: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    // Frontend shows this only when addDcu == "Yes".
    // Backend conditionally requires it in the same case.
    dcuQuantity: {
      type: String,
      trim: true,
      required: function () {
        return this.addDcu === "Yes";
      },
      default: "",
    },

    // ========================================================
    // IT INFORMATION
    // ========================================================

    // IT INFORMATION - 1
    // First IT group is required in the current frontend.

    itName1: {
      type: String,
      trim: true,
      required: true,
    },

    itIpAddress1: {
      type: String,
      trim: true,
      required: true,
    },

    itGateway1: {
      type: String,
      trim: true,
      required: true,
    },

    itSubnet1: {
      type: String,
      trim: true,
      required: true,
    },

    itDns1: {
      type: String,
      trim: true,
      required: true,
    },

    itSmtp1: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // IT INFORMATION - 2
    // Optional in current frontend
    // --------------------------------------------------------

    itName2: {
      type: String,
      trim: true,
      default: "",
    },

    itIpAddress2: {
      type: String,
      trim: true,
      default: "",
    },

    itGateway2: {
      type: String,
      trim: true,
      default: "",
    },

    itSubnet2: {
      type: String,
      trim: true,
      default: "",
    },

    itDns2: {
      type: String,
      trim: true,
      default: "",
    },

    itSmtp2: {
      type: String,
      trim: true,
      default: "",
    },

    // --------------------------------------------------------
    // IT INFORMATION - 3
    // Optional in current frontend
    // --------------------------------------------------------

    itName3: {
      type: String,
      trim: true,
      default: "",
    },

    itIpAddress3: {
      type: String,
      trim: true,
      default: "",
    },

    itGateway3: {
      type: String,
      trim: true,
      default: "",
    },

    itSubnet3: {
      type: String,
      trim: true,
      default: "",
    },

    itDns3: {
      type: String,
      trim: true,
      default: "",
    },

    itSmtp3: {
      type: String,
      trim: true,
      default: "",
    },

    itNotes: {
      type: String,
      trim: true,
      default: "",
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
      enum: ["Yes", "No"],
      required: true,
    },

    chainPins: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    caterpillarDrive: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    caterpillarDriveQuantity: {
      type: String,
      trim: true,
      required: true,
    },

    railLubrication: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    externalLubrication: {
      type: String,
      enum: ["Yes", "No"],
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
      enum: ["Yes", "No"],
      required: true,
    },

    lubricationFromTopOfChain: {
      type: String,
      enum: ["Yes", "No"],
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
      enum: ["Yes", "No"],
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

    invertedPowerAndFreeChainDropA: {
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

    invertedPowerAndFreeTrolleyPitchK2: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeTrolleyPitchL2: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeTrolleyPitchM2: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeTrolleyPitchN2: {
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

const PFO_9000LCCL =
  mongoose.models.PFO_9000LCCL ||
  mongoose.model(
    "PFO_9000LCCL",
    PFO_9000LCCL_Schema
  );

module.exports = PFO_9000LCCL;