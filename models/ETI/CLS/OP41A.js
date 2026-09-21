const mongoose = require("mongoose");

const ETI_OP41A_Schema = new mongoose.Schema(
  {
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

    controlVoltage: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    compressedAir: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    compressedAirUnit: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    existingMonitoring: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    newMonitoringSystem: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    railLubeStatus: {
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

    optionalReservoir: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    chainCleanStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    chainMaster: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    otherUnitStatus: {
      type: String,
      required: false,
      trim: true,
    },

    timerStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    electricStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    pneumaticStatus: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    mightyLubeMonitoring: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    preMountingRequirements: {
      type: String,
      required: false,
      trim: true,
    },

    plcConnection: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    otherControllerInfo: {
      type: String,
      required: false,
      trim: true,
    },

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

const ETI_OP41A =
  mongoose.models.ETI_OP41A ||
  mongoose.model("ETI_OP41A", ETI_OP41A_Schema);

module.exports = ETI_OP41A;