const mongoose = require("mongoose");

const COE_CEL_Schema = new mongoose.Schema(
  {
    // =======================================================
    // GENERAL INFORMATION
    // =======================================================

    conveyorName: {
      type: String,
      required: true,
      trim: true,
    },

    chainSize: {
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

    openStatus: {
      type: String,
      required: true,
      trim: true,
    },

    powerChain: {
      type: String,
      required: true,
      trim: true,
    },

    chainPins: {
      type: String,
      required: true,
      trim: true,
    },

    sliderPlates: {
      type: String,
      required: true,
      trim: true,
    },

    catDriveStatus: {
      type: String,
      required: true,
      trim: true,
    },

    caterpillarDriveQuantity: {
      type: String,
      required: true,
      trim: true,
    },

    railLubeStatus: {
      type: String,
      required: true,
      trim: true,
    },

    externalLubeStatus: {
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

    reservoirSize: {
      type: String,
      required: true,
      trim: true,
    },

    reservoirSizeQuantity: {
      type: String,
      required: true,
      trim: true,
    },

    chainCleanStatus: {
      type: String,
      required: true,
      trim: true,
    },

    conditionDescription: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CONTROLLER
    // =======================================================

    specialControllerOptions: {
      type: String,
      required: true,
      trim: true,
    },

    specialControllerDetails: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // WIRE
    // =======================================================

    wireMeasurementUnit: {
      type: String,
      required: true,
      trim: true,
    },

    conductor2: {
      type: String,
      required: true,
      trim: true,
    },

    conductor4: {
      type: String,
      required: true,
      trim: true,
    },

    conductor7: {
      type: String,
      required: true,
      trim: true,
    },

    conductor12: {
      type: String,
      required: true,
      trim: true,
    },

    junctionBoxNum: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // CHAIN ON EDGE DRAG LINE MEASUREMENTS
    // =======================================================

    measurementUnit: {
      type: String,
      required: true,
      trim: true,
    },

    coeLineA: {
      type: String,
      required: true,
      trim: true,
    },

    coeLineG: {
      type: String,
      required: true,
      trim: true,
    },

    coeLineH: {
      type: String,
      required: true,
      trim: true,
    },

    coeLineJ: {
      type: String,
      required: true,
      trim: true,
    },

    coeLineX: {
      type: String,
      required: true,
      trim: true,
    },

    coeLineY: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // TECHNICIAN NOTE
    // =======================================================

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

const COE_CEL =
  mongoose.models.COE_CEL ||
  mongoose.model("COE_CEL", COE_CEL_Schema);

module.exports = COE_CEL