const mongoose = require("mongoose");

const FRO_OP139A_Schema = new mongoose.Schema(
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

    otherConveyorChainSize: {
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

    otherChainManufacturer: {
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

    controlVoltage: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    compressedAirSupply: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    compressedAirSupplyUnit: {
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

    overheadFreeRailG: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    overheadFreeRailH: {
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

    overheadFreeRailTrolleyWheelK2: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerFreeChainDropA: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerFreePowerTrolleyWheelB: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerFreeRailG: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    invertedPowerFreeRailH: {
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

    overheadFreeTrolleyWheelPositionL: {
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

const FRO_OP139A =
  mongoose.models.FRO_OP139A ||
  mongoose.model("FRO_OP139A", FRO_OP139A_Schema);

module.exports = FRO_OP139A