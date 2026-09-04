const mongoose = require("mongoose");

const IFT_IFTL_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      default: "",
      trim: true,
    },

    conveyorChainSize: {
      type: String,
      default: "",
      trim: true,
    },

    otherConveyorChainSize: {
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
      required: true,
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
      required: true,
      trim: true,
    },

    conveyorSwingStatus: {
      type: String,
      required: true,
      trim: true,
    },

    conveyorStrand: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    operatingVoltage: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // NEW / EXISTING MONITORING SYSTEM
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

    freeTrolleyWheels: {
      type: String,
      default: "",
      trim: true,
    },

    guideRollers: {
      type: String,
      default: "",
      trim: true,
    },

    guideRollersOpenRaceStyle: {
      type: String,
      default: "",
      trim: true,
    },

    guideRollersSealedStyle: {
      type: String,
      default: "",
      trim: true,
    },

    dogActuator: {
      type: String,
      default: "",
      trim: true,
    },

    pivotPoints: {
      type: String,
      default: "",
      trim: true,
    },

    kingPin: {
      type: String,
      default: "",
      trim: true,
    },

    rollerChains: {
      type: String,
      default: "",
      trim: true,
    },

    bushings: {
      type: String,
      default: "",
      trim: true,
    },

    riderPlates: {
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

    lubricationFromSideOfChain: {
      type: String,
      default: "",
      trim: true,
    },

    lubricationFromTopOfChain: {
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

    specialControllerOptions: {
      type: String,
      default: "",
      trim: true,
    },

    controllerSpecify: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // ADDITIONAL OPTIONS AVAILABLE
    // ========================================================

    washDown: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // IN FLOOR TOWLINE MEASUREMENTS
    // ========================================================

    measurementUnit: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlineChainDropA: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlinePowerTrolleyWheelB: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlinePowerRailG: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlinePowerRailH: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlineRailOffsetJ: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlineConveyorHousingS1: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlineConveyorHousingT1: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlineConveyorHousingWallU1: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlineConveyorHousingOffsetW1: {
      type: String,
      default: "",
      trim: true,
    },

    inFloorTowlineFloorX1: {
      type: String,
      default: "",
      trim: true,
    },

    // ========================================================
    // TECHNICIAN NOTE
    // ========================================================

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

const IFT_IFTL =
  mongoose.models.IFT_IFTL ||
  mongoose.model("IFT_IFTL", IFT_IFTL_Schema);

module.exports = IFT_IFTL