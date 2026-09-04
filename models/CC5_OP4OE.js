const mongoose = require("mongoose");

const CC5_OP4OE_Schema = new mongoose.Schema(
  {
    // =======================================================
    // GENERAL INFORMATION
    // =======================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    cc5ChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    industrialChainManufacturer: {
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
      trim: true,
    },

    conveyorSpeed: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorSpeedUnit: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorIndex: {
      type: String,
      required: true,
      trim: true,
    },

    travelDirection: {
      type: String,
      required: true,
      trim: true,
    },

    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

    surroundingTemp: {
      type: String,
      required: true,
      trim: true,
    },

    loadedUnloadedStatus: {
      type: String,
      required: true,
      trim: true,
    },

    swingStatus: {
      type: String,
      required: true,
      trim: true,
    },

    strandStatus: {
      type: String,
      required: true,
      trim: true,
    },

    plantLayout: {
      type: String,
      required: true,
      trim: true,
    },

    requiredPics: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CUSTOMER POWER UTILITIES
    // =======================================================

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

    // =======================================================
    // MONITORING
    // =======================================================

    existingMonitoring: {
      type: String,
      required: true,
      trim: true,
    },

    addMonitoring: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CONVEYOR SPECIFICATIONS
    // =======================================================

    wheelOpenRaceStyle: {
      type: String,
      required: true,
      trim: true,
    },

    wheelSealedStyle: {
      type: String,
      required: true,
      trim: true,
    },

    openInsideShieldedOutside: {
      type: String,
      required: true,
      trim: true,
    },

    freeTrolleyWheels: {
      type: String,
      required: true,
      trim: true,
    },

    guideRollers: {
      type: String,
      required: true,
      trim: true,
    },

    guideRollersOpenRaceStyle: {
      type: String,
      required: true,
      trim: true,
    },

    guideRollersSealedStyle: {
      type: String,
      required: true,
      trim: true,
    },

    openHole: {
      type: String,
      required: true,
      trim: true,
    },

    dogActuator: {
      type: String,
      required: true,
      trim: true,
    },

    pivotPoints: {
      type: String,
      required: true,
      trim: true,
    },

    kingPin: {
      type: String,
      required: true,
      trim: true,
    },

    outboardStatus: {
      type: String,
      required: true,
      trim: true,
    },

    railLubrication: {
      type: String,
      required: true,
      trim: true,
    },

    lubeBrand: {
      type: String,
      required: true,
      trim: true,
    },

    lubeType: {
      type: String,
      required: true,
      trim: true,
    },

    lubeViscosity: {
      type: String,
      required: true,
      trim: true,
    },

    lubricationSideChain: {
      type: String,
      required: true,
      trim: true,
    },

    lubricationTopChain: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CONTROLLER
    // =======================================================

    chainMaster: {
      type: String,
      required: true,
      trim: true,
    },

    timerStatus: {
      type: String,
      required: true,
      trim: true,
    },

    electricStatus: {
      type: String,
      required: true,
      trim: true,
    },

    pneumaticStatus: {
      type: String,
      required: true,
      trim: true,
    },

    mightyLubeMonitoring: {
      type: String,
      required: true,
      trim: true,
    },

    plcConnection: {
      type: String,
      required: true,
      trim: true,
    },

    otherControllerNotes: {
      type: String,
      required: true,
      trim: true,
    },

    specialControllerOptions: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CC5 MEASUREMENTS
    // =======================================================

    measurementUnit: {
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

    rollerWheelA1: {
      type: String,
      required: true,
      trim: true,
    },

    rollerWheelB1: {
      type: String,
      required: true,
      trim: true,
    },

    linkD1: {
      type: String,
      required: true,
      trim: true,
    },

    wheelPitchM1: {
      type: String,
      required: true,
      trim: true,
    },

    rollerPinY1: {
      type: String,
      required: true,
      trim: true,
    },

    rollerPinZ1: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // TECHNICIAN NOTE
    //
    // Optional multiline note from mobile app.
    // Multiline is handled by Flutter UI.
    // MongoDB stores it as a normal String.
    // =======================================================

    technicianNote: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const CC5_OP4OE =
  mongoose.models.CC5_OP4OE ||
  mongoose.model(
    "CC5_OP4OE",
    CC5_OP4OE_Schema,
  );

module.exports = CC5_OP4OE