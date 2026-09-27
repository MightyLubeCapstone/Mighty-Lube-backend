const mongoose = require("mongoose");

// ===========================================================
// IMAGE METADATA SCHEMA
//
// Customer-uploaded images are stored in private object
// storage. We only save permanent file metadata here.
// Signed URLs are NOT stored because they expire.
// ===========================================================

const ImageMetadataSchema = new mongoose.Schema(
  {
    objectKey: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    contentType: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const CC5_CLSchema = new mongoose.Schema(
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

    swingSwaySurgeStatus: {
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

    // Uploaded plant layout image metadata.
    plantLayoutImage: {
      type: ImageMetadataSchema,
      required: false,
    },

    chainPicture: {
      type: String,
      required: true,
      trim: true,
    },

    // Uploaded chain picture metadata.
    chainPictureImage: {
      type: ImageMetadataSchema,
      required: false,
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

    // Frontend sends:
    // wheelOpenType: "Not Applicable"
    wheelOpenType: {
      type: String,
      required: true,
      trim: true,
    },

    // Frontend sends:
    // wheelClosedType: "Flush"
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

    outboardStatus: {
      type: String,
      required: true,
      trim: true,
    },

    caterpillarDrive: {
      type: String,
      required: true,
      trim: true,
    },

    caterpillarDriveQuantity: {
      type: String,
      required: true,
      trim: true,
    },

    railLubrication: {
      type: String,
      required: true,
      trim: true,
    },

    externalLubrication: {
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

    cleanChain: {
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
    // =======================================================

    technicianNote: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const CC5_CL =
  mongoose.models.CC5_CL ||
  mongoose.model(
    "CC5_CL",
    CC5_CLSchema,
  );

module.exports = CC5_CL;