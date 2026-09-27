const mongoose = require("mongoose");

const FT_MLCEL_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      default: "",
      trim: true,
    },

    chainSize: {
      type: String,
      default: "",
      trim: true,
    },

    otherChainSize: {
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
      default: "",
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
      default: "",
      trim: true,
    },

    conveyorSwingStatus: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorStrandType: {
      type: String,
      default: "",
      trim: true,
    },

    plantLayoutAvailable: {
      type: String,
      default: "",
      trim: true,
    },

    plantLayoutFile: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    chainPhotosAvailable: {
      type: String,
      default: "",
      trim: true,
    },

    chainPhotosFile: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltage: {
      type: String,
      default: "",
      trim: true,
    },

    controlVoltage: {
      type: String,
      default: "",
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

    mightyLubeMonitoring: {
      type: String,
      default: "",
      trim: true,
    },

    ctrController: {
      type: String,
      default: "",
      trim: true,
    },

    plcConnection: {
      type: String,
      default: "",
      trim: true,
    },

    monitoringController: {
      type: String,
      default: "",
      trim: true,
    },

    controllerOtherDescribe: {
      type: String,
      default: "",
      trim: true,
    },

    specialControllerOptions: {
      type: String,
      default: "",
      trim: true,
    },

    controllerPleaseSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // FLAT TOP MEASUREMENTS
    // ========================================================

    ftUnitType: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopG: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopH: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopA1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopB1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopH1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopJ1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopL1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopM1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopN1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopP1: {
      type: String,
      default: "",
      trim: true,
    },

    ftTopR1: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // WIRE
    // ========================================================

    wireMeasurementUnit: {
      type: String,
      default: "",
      trim: true,
    },

    wire2Conductor: {
      type: String,
      default: "",
      trim: true,
    },

    wire4Conductor: {
      type: String,
      default: "",
      trim: true,
    },

    wire7Conductor: {
      type: String,
      default: "",
      trim: true,
    },

    wire12Conductor: {
      type: String,
      default: "",
      trim: true,
    },

    junctionBoxQuantities: {
      type: String,
      default: "",
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

const FT_MLCEL = mongoose.model(
  "FT_MLCEL",
  FT_MLCEL_Schema
);

module.exports = FT_MLCEL;