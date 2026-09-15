const mongoose = require("mongoose");

const FT_OPCO_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      default: "",
    },

    chainSize: {
      type: String,
      default: "",
    },

    otherChainSize: {
      type: String,
      default: "",
    },

    industrialChainManufacturer: {
      type: String,
      default: "",
    },

    otherIndustrialChainManufacturer: {
      type: String,
      default: "",
    },

    wheelManufacturer: {
      type: String,
      default: "",
    },

    otherWheelManufacturer: {
      type: String,
      default: "",
    },

    conveyorLength: {
      type: String,
      default: "",
    },

    conveyorLengthUnit: {
      type: String,
      default: "",
    },

    conveyorSpeed: {
      type: String,
      default: "",
    },

    conveyorSpeedUnit: {
      type: String,
      default: "",
    },

    conveyorIndex: {
      type: String,
      default: "",
    },

    travelDirection: {
      type: String,
      default: "",
    },

    appEnviroment: {
      type: String,
      default: "",
    },

    otherAppEnviroment: {
      type: String,
      default: "",
    },

    surroundingTemp: {
      type: String,
      default: "",
    },

    conveyorLoaded: {
      type: String,
      default: "",
    },

    conveyorSwing: {
      type: String,
      default: "",
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltage: {
      type: String,
      default: "",
    },

    controlVoltage: {
      type: String,
      default: "",
    },

    compressedAir: {
      type: String,
      default: "",
    },

    compressedAirUnit: {
      type: String,
      default: "",
    },

    // ========================================================
    // NEW MONITORING SYSTEM OR ADDING TO EXISTING
    // ========================================================

    existingMonitoring: {
      type: String,
      default: "",
    },

    newMonitoringSystem: {
      type: String,
      default: "",
    },

    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    wheelOpenType: {
      type: String,
      default: "",
    },

    wheelClosedType: {
      type: String,
      default: "",
    },

    openInsideShieldedOutside: {
      type: String,
      default: "",
    },

    freeTrolleyWheels: {
      type: String,
      default: "",
    },

    guideRollers: {
      type: String,
      default: "",
    },

    rollerChains: {
      type: String,
      default: "",
    },

    bushings: {
      type: String,
      default: "",
    },

    outboardWheels: {
      type: String,
      default: "",
    },

    lubeBrand: {
      type: String,
      default: "",
    },

    lubeViscosity: {
      type: String,
      default: "",
    },

    currentGrease: {
      type: String,
      default: "",
    },

    currentLube: {
      type: String,
      default: "",
    },

    oilOrGrease: {
      type: String,
      default: "",
    },

    oilViscosity: {
      type: String,
      default: "",
    },

    greaseNGLIGrade: {
      type: String,
      default: "",
    },

    zerkDirection: {
      type: String,
      default: "",
    },

    zerkFtgLocation: {
      type: String,
      default: "",
    },

    wheelDiameter: {
      type: String,
      default: "",
    },

    chainCleanStatus: {
      type: String,
      default: "",
    },

    // ========================================================
    // CONTROLLER
    // ========================================================

    chainMaster: {
      type: String,
      default: "",
    },

    remoteStatus: {
      type: String,
      default: "",
    },

    mountStatus: {
      type: String,
      default: "",
    },

    otherUnitStatus: {
      type: String,
      default: "",
    },

    timerStatus: {
      type: String,
      default: "",
    },

    electricStatus: {
      type: String,
      default: "",
    },

    mightyLubeMonitoring: {
      type: String,
      default: "",
    },

    preMountType: {
      type: String,
      default: "",
    },

    otherPreMountType: {
      type: String,
      default: "",
    },

    plcConnection: {
      type: String,
      default: "",
    },

    otherControllerNotes: {
      type: String,
      default: "",
    },

    // ========================================================
    // FLAT TOP: MEASUREMENTS
    // ========================================================

    ftUnitType: {
      type: String,
      default: "",
    },

    ftTopG: {
      type: String,
      default: "",
    },

    ftTopH: {
      type: String,
      default: "",
    },

    ftTopA1: {
      type: String,
      default: "",
    },

    ftTopB1: {
      type: String,
      default: "",
    },

    ftTopH1: {
      type: String,
      default: "",
    },

    ftTopJ1: {
      type: String,
      default: "",
    },

    ftTopL1: {
      type: String,
      default: "",
    },

    ftTopM1: {
      type: String,
      default: "",
    },

    ftTopN1: {
      type: String,
      default: "",
    },

    ftTopP1: {
      type: String,
      default: "",
    },

    ftTopR1: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const FT_OPCO =
  mongoose.models.FT_OPCO ||
  mongoose.model("FT_OPCO", FT_OPCO_Schema);

module.exports = FT_OPCO