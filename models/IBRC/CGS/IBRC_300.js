const mongoose = require("mongoose");

const IBRC_300_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    otherChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    industrialChainManufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    otherIndustrialChainManufacturer: {
      type: String,
      default: "",
      trim: true,
    },

    wheelManufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    otherWheelManufacturer: {
      type: String,
      default: "",
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

    otherAppEnviroment: {
      type: String,
      default: "",
      trim: true,
    },

    surroundingTemp: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorLoaded: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorSwing: {
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

    conveyorOverhead: {
      type: String,
      required: true,
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

    compressedAir: {
      type: String,
      required: true,
      trim: true,
    },

    compressedAirUnit: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // NEW / EXISTING MONITORING SYSTEM
    // ========================================================

    existingMonitoring: {
      type: String,
      required: true,
      trim: true,
    },

    newMonitoringSystem: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    wheelOpenType: {
      type: String,
      required: true,
      trim: true,
    },

    wheelClosedType: {
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

guideRollersRaceStyle: {
  type: String,
  required: true,
  trim: true,
},

guideRollersSealed: {
  type: String,
  required: true,
  trim: true,
},
    openHole: {
      type: String,
      required: true,
      trim: true,
    },

    rollerChains: {
      type: String,
      required: true,
      trim: true,
    },

    bushings: {
      type: String,
      required: true,
      trim: true,
    },

    outboardWheels: {
      type: String,
      required: true,
      trim: true,
    },

    lubeBrand: {
      type: String,
      required: true,
      trim: true,
    },

    lubricantType: {
      type: String,
      required: true,
      trim: true,
    },

    lubeViscosity: {
      type: String,
      required: true,
      trim: true,
    },

    cleanConveyor: {
      type: String,
      required: true,
      trim: true,
    },

    currentGrease: {
      type: String,
      required: true,
      trim: true,
    },

    greaseNGLIGrade: {
      type: String,
      required: true,
      trim: true,
    },

    zerkFtgLocation: {
      type: String,
      required: true,
      trim: true,
    },

    ftgLocation: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // CONTROLLER
    // ========================================================

    chainMaster: {
      type: String,
      required: true,
      trim: true,
    },

    remoteStatus: {
      type: String,
      required: true,
      trim: true,
    },

    mountStatus: {
      type: String,
      required: true,
      trim: true,
    },

    otherUnitStatus: {
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

    mightyLubeMonitoring: {
      type: String,
      required: true,
      trim: true,
    },

    preMountRequirement: {
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

    // ========================================================
    // IN BOARD ROLLER CHAIN: MEASUREMENTS
    // ========================================================

    measurementUnit: {
      type: String,
      required: true,
      trim: true,
    },

    inBoardRollerChainRollerWheelA1: {
      type: String,
      required: true,
      trim: true,
    },

    inBoardRollerChainRollerWheelB1: {
      type: String,
      required: true,
      trim: true,
    },

    inBoardRollerChainLinkC1: {
      type: String,
      required: true,
      trim: true,
    },

    inBoardRollerChainLinkD1: {
      type: String,
      required: true,
      trim: true,
    },

    inBoardRollerChainLinkE1: {
      type: String,
      required: true,
      trim: true,
    },

    inBoardRollerChainOuterLinkOffsetF1: {
      type: String,
      required: true,
      trim: true,
    },

    inBoardRollerChainOuterLinkOffsetG1: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // TECHNICIAN NOTE
    // ========================================================

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

const IBRC_300 =
  mongoose.models.IBRC_300 ||
  mongoose.model("IBRC_300", IBRC_300_Schema);

module.exports = IBRC_300;