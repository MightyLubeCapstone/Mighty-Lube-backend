const mongoose = require('mongoose');

const ETI_807_Schema = new mongoose.Schema(
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
        return this.chainSize === 'Other';
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
        return this.industrialChainManufacturer === 'Other';
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
        return this.appEnviroment === 'Other';
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

const ETI_807 =
  mongoose.models.ETI_807 ||
  mongoose.model('ETI_807', ETI_807_Schema);

module.exports = ETI_807