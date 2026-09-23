const mongoose = require("mongoose");

const IBR_OP4OE_Schema = new mongoose.Schema(
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
    // MONITORING SYSTEM
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

    freeTrolleyWheels: {
      type: String,
      default: "",
      trim: true,
    },

    guideRollers: {
      type: String,
      default: "",
      trim: true,
    },

    guideRollersOpenRaceStyle: {
      type: String,
      default: "",
      trim: true,
    },

    guideRollersSealedStyle: {
      type: String,
      default: "",
      trim: true,
    },

    openHole: {
      type: String,
      default: "",
      trim: true,
    },

    dogActuator: {
      type: String,
      default: "",
      trim: true,
    },

    pivotPoints: {
      type: String,
      default: "",
      trim: true,
    },

    kingPin: {
      type: String,
      default: "",
      trim: true,
    },

    outboardWheels: {
      type: String,
      default: "",
      trim: true,
    },

    railLubrication: {
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

    // ========================================================
    // CONTROLLER
    // ========================================================

    chainMasterController: {
      type: String,
      default: "",
      trim: true,
    },

    timer: {
      type: String,
      default: "",
      trim: true,
    },

    electricOnOff: {
      type: String,
      default: "",
      trim: true,
    },

    pneumaticOnOff: {
      type: String,
      default: "",
      trim: true,
    },

    mightyLubeMonitoring: {
      type: String,
      default: "",
      trim: true,
    },

    plcConnection: {
      type: String,
      default: "",
      trim: true,
    },

    otherControllerDescription: {
      type: String,
      default: "",
      trim: true,
    },

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

const IBR_OP4OE =
  mongoose.models.IBR_OP4OE ||
  mongoose.model("IBR_OP4OE", IBR_OP4OE_Schema);

module.exports = IBR_OP4OE