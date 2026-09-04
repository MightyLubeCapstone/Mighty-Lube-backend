const mongoose = require("mongoose");

const FRO_314_Schema = new mongoose.Schema(
  {
    // =====================================================
    // GENERAL INFORMATION
    // =====================================================

    conveyorName: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    wheelManufacturer: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    otherWheelManufacturer: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorLength: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorLengthUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorSpeed: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorSpeedUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    indexingVariableSpeedConditions: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    travelDirection: {
      type: String,
      required: false,
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
      required: false,
      default: "",
      trim: true,
    },

    surroundingTemperature: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorSwingStatus: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorOrientation: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // CUSTOMER POWER UTILITIES
    // =====================================================

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

    compressedAirSupply: {
      type: String,
      required: true,
      trim: true,
    },

    compressedAirSupplyUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // MONITORING SYSTEM
    // =====================================================

    existingMonitoring: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    newMonitoringSystem: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // CONVEYOR SPECIFICATIONS
    // =====================================================

    freeTrolleyWheels: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    dogActuator: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    pivotPoints: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    kingPin: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentLubricationEquipmentBrand: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentLubricantType: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentLubricantViscosityGrade: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentGreaseType: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    currentGreaseNlgiGrade: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    zerkFittingLocationSide: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    zerkFittingLocationOrientation: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // CONTROLLER
    // =====================================================

    chainMasterController: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    remote: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    mountedOnGreaser: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    controlsOtherUnits: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    timer: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    electricOnOff: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    mightyLubeMonitoring: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    preMountingRequirements: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    plcConnection: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    otherControllerInfo: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // INVERTED P&F: MEASUREMENTS
    // =====================================================

    measurementUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerTrolleyWheelB: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedZerkFittingVerticalE: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedRailG: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedRailH: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedTrolleyWheelPitchK: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedCarrierTrolleyPitchT: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedCarrierTrolleyPitchU: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedCarrierTrolleyPitchV: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedFreeTrolleyWheelOffsetW: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // TECHNICIAN NOTE
    // =====================================================

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

const FRO_314 =
  mongoose.models.FRO_314 ||
  mongoose.model("FRO_314", FRO_314_Schema);

module.exports = FRO_314