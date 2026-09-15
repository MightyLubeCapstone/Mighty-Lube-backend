const mongoose = require("mongoose");

// =========================================================
// ETI_91
//
// Product:
// Overhead Non-Powered Mighty Lube Rail Cleaners
// UN91 / RW91
//
// Latest frontend contract:
//
// {
//   conveyorName,
//   chainSize,
//   otherChainSize,
//   industrialChainManufacturer,
//   otherIndustrialChainManufacturer,
//   conveyorLength,
//   conveyorLengthUnit,
//   conveyorSpeed,
//   conveyorSpeedUnit,
//   appEnviroment,
//   otherAppEnviroment,
//   technicianNote
// }
// =========================================================

const ETI_91_Schema = new mongoose.Schema(
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

    appEnviroment: {
      type: String,
      required: true,
      trim: true,
    },

    otherAppEnviroment: {
      type: String,
      trim: true,
      default: null,
      required: function () {
        return this.appEnviroment === "Other";
      },
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
// =========================================================

const ETI_91 =
  mongoose.models.ETI_91 ||
  mongoose.model(
    "ETI_91",
    ETI_91_Schema
  );

module.exports = ETI_91