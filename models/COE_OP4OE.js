const mongoose = require("mongoose");

// =========================================================
// COE OP-40E SCHEMA
//
// Product ID:
// COE_OP4OE
//
// Frontend:
// ProductDetailData -> op40eData
//
// API:
// POST /api/coe_op4oe
//
// Request:
//
// {
//   "COE_OP4OEData": {
//     ...
//   },
//   "numRequested": 1
// }
//
// IMPORTANT:
// Reusable Flutter configuration sends human-readable
// String values instead of old numeric dropdown indexes.
//
// Example:
// OLD -> chainSize: 1
// NEW -> chainSize: 'CC5 3"'
// =========================================================

const COE_OP4OE_Schema = new mongoose.Schema(
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

    // Required only when:
    // chainSize === "Other"
    otherChainSize: {
      type: String,
      trim: true,
      default: null,
      required: function () {
        return this.chainSize === "Other";
      },
    },

    industrialChainManufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    // Required only when:
    // industrialChainManufacturer === "Other"
    otherIndustrialChainManufacturer: {
      type: String,
      trim: true,
      default: null,
      required: function () {
        return this.industrialChainManufacturer === "Other";
      },
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
      default: null,
    },

    travelDirection: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

    // Required only when:
    // appEnviroment === "Other"
    otherAppEnviroment: {
      type: String,
      trim: true,
      default: null,
      required: function () {
        return this.appEnviroment === "Other";
      },
    },

    surroundingTemp: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    conveyorLoaded: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    conveyorSwing: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    plantLayout: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    requiredPics: {
      type: String,
      required: false,
      trim: true,
      default: null,
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
    // MONITORING
    // =====================================================

    existingMonitoring: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    addMonitoring: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    // =====================================================
    // CONVEYOR SPECIFICATIONS
    // =====================================================

    wheelOpenRaceStyle: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    wheelSealedStyle: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    openInsideShieldedOutside: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    freeTrolleyWheels: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    guideRollers: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    guideRollersOpenRaceStyle: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    guideRollersSealedStyle: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    openHole: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    dogActuator: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    pivotPoints: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    kingPin: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    railLubeStatus: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    lubeBrand: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    lubeType: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    lubeViscosity: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    // =====================================================
    // CONTROLLER
    // =====================================================

    chainMaster: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    timerStatus: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    electricStatus: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    pneumaticStatus: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    mightyLubeMonitoring: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    plcConnection: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    otherControllerInfo: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    specialControllerOptions: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },

    // =====================================================
    // CHAIN ON EDGE DRAG LINE MEASUREMENTS
    // =====================================================

    coeUnitType: {
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

    coeLineZ: {
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

// =========================================================
// MODEL
//
// mongoose.models check prevents:
//
// OverwriteModelError:
// Cannot overwrite `COE_OP4OE` model once compiled.
// =========================================================

const COE_OP4OE =
  mongoose.models.COE_OP4OE ||
  mongoose.model(
    "COE_OP4OE",
    COE_OP4OE_Schema
  );

module.exports = COE_OP4OE