const mongoose = require("mongoose");

const ETI_MLAIO_Schema = new mongoose.Schema(
  {
    // =========================================================
    // GENERAL INFORMATION
    // =========================================================

    conveyorName: {
      type: String,
      required: false,
      trim: true,
    },

    chainSize: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    industrialChainManufacturer: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
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
    // MONITORING SYSTEM
    // =========================================================

    existingMonitoring: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    newMonitoringSystem: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    dcuQuantity: {
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

    caterpillarDriveQuantity: {
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

    reservoirSize: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    reservoirSizeQuantity: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    chainCleanStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    // =========================================================
    // CONTROLLER
    // =========================================================

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
    // MEASUREMENTS
    // =========================================================

    measurementUnits: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

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

    // =====================================================
    // TECHNICIAN NOTE
    // =====================================================

    technicianNote: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ETI_MLAIO =
  mongoose.models.ETI_MLAIO ||
  mongoose.model("ETI_MLAIO", ETI_MLAIO_Schema);

module.exports = ETI_MLAIO;