const mongoose = require("mongoose");

const FC_314_Schema = new mongoose.Schema(
  {
    // =====================================================
    // 1. GENERAL INFORMATION
    // =====================================================

    conveyorName: {
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

    indexingVariableSpeedConditions: {
      type: String,
      default: "",
    },

    travelDirection: {
      type: String,
      default: "",
    },

    applicationEnvironment: {
      type: String,
      required: true,
    },

    otherApplicationEnvironment: {
      type: String,
      default: "",
    },

    surroundingTemperature: {
      type: String,
      default: "",
    },

    conveyorSwingStatus: {
      type: String,
      required: true,
    },

    // =====================================================
    // 2. CUSTOMER POWER UTILITIES
    // =====================================================

    operatingVoltage: {
      type: String,
      required: true,
    },

    controlVoltage: {
      type: String,
      required: true,
    },

    compressedAirSupply: {
      type: String,
      required: true,
    },

    compressedAirSupplyUnit: {
      type: String,
      default: "",
    },

    // =====================================================
    // 3. NEW / EXISTING MONITORING SYSTEM
    // =====================================================

    existingMonitoring: {
      type: String,
      default: "",
    },

    newMonitoringSystem: {
      type: String,
      default: "",
    },

    // =====================================================
    // 4. CONVEYOR SPECIFICATIONS
    // =====================================================

    freeTrolleyWheels: {
      type: String,
      default: "",
    },

    dogActuator: {
      type: String,
      default: "",
    },

    pivotPoints: {
      type: String,
      default: "",
    },

    kingPin: {
      type: String,
      default: "",
    },

    currentLubricationEquipmentBrand: {
      type: String,
      default: "",
    },

    currentLubricantType: {
      type: String,
      default: "",
    },

    currentLubricantViscosityGrade: {
      type: String,
      default: "",
    },

    currentGreaseType: {
      type: String,
      default: "",
    },

    currentGreaseNlgiGrade: {
      type: String,
      default: "",
    },

    zerkFittingLocationSide: {
      type: String,
      default: "",
    },

    zerkFittingLocationOrientation: {
      type: String,
      default: "",
    },

    // =====================================================
    // 5. CONTROLLER
    // =====================================================

    chainMasterController: {
      type: String,
      default: "",
    },

    remote: {
      type: String,
      default: "",
    },

    mountedOnGreaser: {
      type: String,
      default: "",
    },

    controlsOtherUnits: {
      type: String,
      default: "",
    },

    timer: {
      type: String,
      default: "",
    },

    electricOnOff: {
      type: String,
      default: "",
    },

    mightyLubeMonitoring: {
      type: String,
      default: "",
    },

    preMountingRequirements: {
      type: String,
      default: "",
    },

    plcConnection: {
      type: String,
      default: "",
    },

    otherControllerInfo: {
      type: String,
      default: "",
    },

    // =====================================================
    // 6. GREASER - FREE CARRIER MEASUREMENTS
    // =====================================================

    measurementUnit: {
      type: String,
      default: "",
    },

    freeCarrierZerkFittingE: {
      type: String,
      default: "",
    },

    freeCarrierRailG: {
      type: String,
      default: "",
    },

    freeCarrierRailH: {
      type: String,
      default: "",
    },

    freeCarrierTrolleyWheelPitchK: {
      type: String,
      default: "",
    },

    freeCarrierTrolleyPitchT: {
      type: String,
      default: "",
    },

    freeCarrierTrolleyPitchU: {
      type: String,
      default: "",
    },

    freeCarrierTrolleyPitchV: {
      type: String,
      default: "",
    },

    // =====================================================
    // 7. TECHNICIAN NOTE
    // Intentionally retained from old Flutter application.
    // =====================================================

    technicianNote: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FC_314 =
  mongoose.models.FC_314 ||
  mongoose.model("FC_314", FC_314_Schema);

module.exports = FC_314