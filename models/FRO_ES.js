const mongoose = require("mongoose");

const FRO_ES_Schema = new mongoose.Schema(
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

    conveyorChainSize: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    chainManufacturer: {
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

    conveyorLoadedStatus: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    conveyorSwingStatus: {
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
      required: false,
      default: "",
      trim: true,
    },

    controlVoltage: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // MONITORING
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

    wheelOpenRaceStyle: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    wheelSealedStyle: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    openInsideShieldedOutside: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    freeTrolleyWheels: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    guideRollers: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    guideRollersOpenRaceStyle: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    guideRollersSealedStyle: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    openHole: {
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

    railLubrication: {
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

    lubricationFromSideOfChain: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    lubricationFromTopOfChain: {
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

    pneumaticOnOff: {
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

    specialControllerOptions: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    controllerSpecify: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // =====================================================
    // FREE RAIL MEASUREMENTS
    // =====================================================

    freeRailMeasurementUnit: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    overheadFreeRailC: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    overheadFreeRailD: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    overheadTrolleyWheelPitchK: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    overheadFreeTrolleyWheelPositionL: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    overheadFreeRailTrolleyWheelC2: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerFreeRailE: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerFreeTrolleyWheelPitchK: {
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

const FRO_ES =
  mongoose.models.FRO_ES ||
  mongoose.model("FRO_ES", FRO_ES_Schema);

module.exports = FRO_ES