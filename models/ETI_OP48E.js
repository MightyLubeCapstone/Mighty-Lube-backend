const mongoose = require("mongoose");

const templateA = require("./templateA.js");
const templateB = require("./templateB.js");
const templateC = require("./templateC.js");
const templateF = require("./templateF.js");

const ETI_OP48E_Schema = new mongoose.Schema(
  {
    // =========================================================
    // GENERAL INFORMATION
    // =========================================================

    conveyorName: {
      type: String,
      required: false,
      trim: true,
    },

    /*
     * Mixed is intentional for migration compatibility.
     *
     * Old Flutter/backend used numeric dropdown indexes.
     * New reusable Flutter sends actual String values.
     */
    chainSize: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    otherChainSize: {
      type: String,
      required: false,
      trim: true,
    },

    industrialChainManufacturer: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    otherIndustrialChainManufacturer: {
      type: String,
      required: false,
      trim: true,
    },

    conveyorLength: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorLengthUnit: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorSpeed: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorSpeedUnit: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorIndex: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    travelDirection: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    appEnviroment: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    /*
     * Legacy fields.
     * Kept so existing data/code remains readable.
     */
    ovenStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    ovenTemp: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    otherAppEnviroment: {
      type: String,
      required: false,
      trim: true,
    },

    surroundingTemp: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorLoaded: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conveyorSwing: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // CUSTOMER POWER UTILITIES
    // =========================================================

    operatingVoltage: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    controlVoltage: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // NEW / EXISTING MONITORING
    // New reusable Flutter fields
    // =========================================================

    existingMonitoring: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    newMonitoringSystem: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // LEGACY MONITORING
    // =========================================================

    monitorData: {
      type: templateA,
      required: false,
    },

    // =========================================================
    // LEGACY FREE-CARRIER / TEMPLATE DATA
    // Kept for backward compatibility
    // =========================================================

    addFreeCarrier: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    templateBData: {
      type: templateB,
      required: false,
    },

    templateCData: {
      type: templateC,
      required: false,
    },

    catDriveStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    templateFData: {
      type: templateF,
      required: false,
    },

    catDriveNum: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    externalLubeStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // CONVEYOR SPECIFICATIONS
    // Current website fields
    // =========================================================

    wheelOpenType: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    wheelClosedType: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    openStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    freeTrolleyWheels: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    guideRollers: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    guideRollersOpenRaceStyle: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    guideRollersSealedStyle: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    holeStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    dogActuator: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    pivotPoints: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    kingPin: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    railLubeStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    lubeBrand: {
      type: String,
      required: false,
      trim: true,
    },

    lubeType: {
      type: String,
      required: false,
      trim: true,
    },

    lubeViscosity: {
      type: String,
      required: false,
      trim: true,
    },

    sideLubeStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    topLubeStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // CONTROLLER
    // =========================================================

    chainMaster: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    timerStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    electricStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    pneumaticStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    mightyLubeMonitoring: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    plcConnection: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    otherControllerInfo: {
      type: String,
      required: false,
      trim: true,
    },

    controllerSpecialOptions: {
      type: String,
      required: false,
      trim: true,
    },

    controllerSpecialOptionsSpecify: {
      type: String,
      required: false,
      trim: true,
    },

    // =========================================================
    // LEGACY MEASUREMENT UNIT FIELD
    // =========================================================

    enclosedUnitType: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // CURRENT WEBSITE MEASUREMENT UNIT FIELD
    // =========================================================

    measurementUnits: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // ENCLOSED TRACK INVERTED MEASUREMENTS
    // =========================================================

    enclosedTrackB: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackG: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackH: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackS: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackK2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackL2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackM2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackN2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    enclosedTrackS2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // LEGACY TECHNICIAN NOTE
    // Website currently does not show it,
    // but preserve old stored/order compatibility.
    // =========================================================

    technicianNote: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ETI_OP48E =
  mongoose.models.ETI_OP48E ||
  mongoose.model("ETI_OP48E", ETI_OP48E_Schema);

module.exports = ETI_OP48E