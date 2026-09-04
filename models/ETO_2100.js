const mongoose = require("mongoose");

const templateA = require("./templateA.js");
const templateB = require("./templateB.js");
const templateC = require("./templateC.js");
const templateE = require("./templateE.js");

const ETO_2100_Schema = new mongoose.Schema(
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
     * Mixed is intentional.
     *
     * Old application may contain numeric dropdown indexes.
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
    // LEGACY ENVIRONMENT FIELDS
    // =========================================================

    ovenStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    ovenTemp: {
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
    // CONVEYOR SPECIFICATIONS
    // =========================================================

    wheelOpenType: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    wheelClosedType: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    powerChain: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    chainPins: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    catDriveStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    catDriveNum: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    railLubeStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    externalLubeStatus: {
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

    chainCleanStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // WIRE
    // =========================================================

    wireMeasurementUnit: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor4: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor7: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    conductor12: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    junctionBoxNum: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // ENCLOSED TRACK OVERHEAD MEASUREMENTS
    // =========================================================

    etUnitType: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadB: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadG: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadH: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadS: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadK2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    /*
     * Current website / reusable Flutter key.
     */
    etOverheadL2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    /*
     * Legacy key.
     *
     * Old backend/model used "etOverheadLS".
     * Keep it so old database documents or clients do not break.
     */
    etOverheadLS: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadM2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    /*
     * Website currently displays an extra field literally named
     * "Dropdown" between M2 and N2.
     */
    measurementDropdown: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadN2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    etOverheadS2: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // LEGACY TEMPLATE DATA
    //
    // Do not remove these yet.
    // Existing clients/documents may still use them.
    // New reusable Flutter does NOT need to send them.
    // =========================================================

    monitorData: {
      type: templateA,
      required: false,
    },

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

    templateEData: {
      type: templateE,
      required: false,
    },

    freeCarrierSystem: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // LEGACY TECHNICIAN NOTE
    //
    // Not part of current website configurator,
    // but preserved for compatibility.
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

const ETO_2100 =
  mongoose.models.ETO_2100 ||
  mongoose.model("ETO_2100", ETO_2100_Schema);

module.exports = ETO_2100