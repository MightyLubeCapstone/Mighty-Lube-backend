const mongoose = require("mongoose");

const IBR_RFC_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    otherConveyorChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    chainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    otherChainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLength: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorSpeed: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorSpeedUnit: {
      type: String,
      default: "",
      trim: true,
    },

    indexingVariableSpeedConditions: {
      type: String,
      default: "",
      trim: true,
    },

    travelDirection: {
      type: String,
      default: "",
      trim: true,
    },

    applicationEnvironment: {
      type: String,
      required: true,
      trim: true,
    },

    otherApplicationEnvironment: {
      type: String,
      default: "",
      trim: true,
    },

    surroundingTemperature: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorLoadedStatus: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorSwingStatus: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorStrand: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltage: {
      type: String,
      required: true,
      trim: true,
    },

    controlVoltage: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // NEW / EXISTING MONITORING SYSTEM
    // ========================================================

    existingMonitoring: {
      type: String,
      default: "",
      trim: true,
    },

    newMonitoringSystem: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    wheelOpenRaceStyle: {
      type: String,
      default: "",
      trim: true,
    },

    wheelSealedStyle: {
      type: String,
      default: "",
      trim: true,
    },

    openInsideShieldedOutside: {
      type: String,
      default: "",
      trim: true,
    },

    powerChain: {
      type: String,
      default: "",
      trim: true,
    },

    chainPins: {
      type: String,
      default: "",
      trim: true,
    },

    sliderPlates: {
      type: String,
      default: "",
      trim: true,
    },

    outboardWheels: {
      type: String,
      default: "",
      trim: true,
    },

    caterpillarDrive: {
      type: String,
      default: "",
      trim: true,
    },

    caterpillarDriveQuantity: {
      type: String,
      default: "",
      trim: true,
    },

    railLubrication: {
      type: String,
      default: "",
      trim: true,
    },

    externalLubrication: {
      type: String,
      default: "",
      trim: true,
    },

    currentLubricationEquipmentBrand: {
      type: String,
      default: "",
      trim: true,
    },

    currentLubricantType: {
      type: String,
      default: "",
      trim: true,
    },

    currentLubricantViscosityGrade: {
      type: String,
      default: "",
      trim: true,
    },

    reservoirSize: {
      type: String,
      default: "",
      trim: true,
    },

    reservoirSizeQuantity: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorChainClean: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // CONTROLLER
    // ========================================================

    specialControllerOptions: {
      type: String,
      default: "",
      trim: true,
    },

    controllerSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // IN BOARD ROLLER CHAIN: MEASUREMENTS
    // ========================================================

    measurementUnit: {
      type: String,
      default: "",
      trim: true,
    },

    inBoardRollerChainRollerWheelA1: {
      type: String,
      default: "",
      trim: true,
    },

    inBoardRollerChainRollerWheelB1: {
      type: String,
      default: "",
      trim: true,
    },

    inBoardRollerChainLinkC1: {
      type: String,
      default: "",
      trim: true,
    },

    inBoardRollerChainLinkD1: {
      type: String,
      default: "",
      trim: true,
    },

    inBoardRollerChainOuterLinkOffsetF1: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // TECHNICIAN NOTE
    // ========================================================

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

const IBR_RFC =
  mongoose.models.IBR_RFC ||
  mongoose.model("IBR_RFC", IBR_RFC_Schema);

module.exports = IBR_RFC