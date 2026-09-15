const mongoose = require("mongoose");

const ETI_9000INVL_Schema = new mongoose.Schema(
  {
    // =====================================================
    // GENERAL INFORMATION
    // =====================================================

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

    otherChainSize: {
      type: String,
      required: false,
      trim: true,
    },

    industrialChainManufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    otherIndustrialChainManufacturer: {
      type: String,
      required: false,
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
      required: false,
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

    otherAppEnviroment: {
      type: String,
      required: function () {
        return this.appEnviroment === "Other";
      },
      trim: true,
    },

    ovenStatus: {
      type: String,
      required: false,
      trim: true,
    },

    ovenTemp: {
      type: String,
      required: false,
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

    // =====================================================
    // MONITORING SYSTEM
    // =====================================================

    existingMonitoring: {
      type: String,
      required: true,
      trim: true,
    },

    newMonitoringSystem: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // CONVEYOR SPECIFICATIONS
    // =====================================================

    openRaceStyle: {
      type: String,
      required: false,
      trim: true,
    },

    sealedStyle: {
      type: String,
      required: false,
      trim: true,
    },

    powerChain: {
      type: String,
      required: false,
      trim: true,
    },

    chainPins: {
      type: String,
      required: false,
      trim: true,
    },

    catDriveStatus: {
      type: String,
      required: false,
      trim: true,
    },

    catDriveNum: {
      type: String,
      required: false,
      trim: true,
    },

    railLubrication: {
      type: String,
      required: false,
      trim: true,
    },

    externalLubeStatus: {
      type: String,
      required: false,
      trim: true,
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
      type: String,
      required: false,
      trim: true,
    },

    topLubeStatus: {
      type: String,
      required: false,
      trim: true,
    },

    reservoirSize: {
      type: String,
      required: false,
      trim: true,
    },

    reservoirQuantity: {
      type: String,
      required: false,
      trim: true,
    },

    chainCleanStatus: {
      type: String,
      required: false,
      trim: true,
    },

    // =====================================================
    // CONTROLLER
    // =====================================================

    mightyLubeMonitoring: {
      type: String,
      required: false,
      trim: true,
    },

    ctrStatus: {
      type: String,
      required: false,
      trim: true,
    },

    plcConnection: {
      type: String,
      required: false,
      trim: true,
    },

    monitorControlStatus: {
      type: String,
      required: false,
      trim: true,
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

    // =====================================================
    // WIRE
    // =====================================================

    wireMeasurementUnit: {
      type: String,
      required: true,
      trim: true,
    },

    conductor2: {
      type: String,
      required: false,
      trim: true,
    },

    conductor4: {
      type: String,
      required: false,
      trim: true,
    },

    conductor7: {
      type: String,
      required: false,
      trim: true,
    },

    conductor12: {
      type: String,
      required: false,
      trim: true,
    },

    junctionBoxNum: {
      type: String,
      required: false,
      trim: true,
    },

    // =====================================================
    // ENCLOSED TRACK INVERTED MEASUREMENTS
    // =====================================================

    enclosedUnitType: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackB: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackG: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackH: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackS: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackK2: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackL2: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackM2: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackN2: {
      type: String,
      required: true,
      trim: true,
    },

    enclosedTrackS2: {
      type: String,
      required: true,
      trim: true,
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

const ETI_9000INVL =
  mongoose.models.ETI_9000INVL ||
  mongoose.model("ETI_9000INVL", ETI_9000INVL_Schema)

module.exports = ETI_9000INVL