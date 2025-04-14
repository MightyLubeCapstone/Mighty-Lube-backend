const mongoose = require("mongoose");
const templateB = require("./templateB.js");

const ETO_2100_Schema = new mongoose.Schema({
  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: false,
    // add enum and check
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 5;
    },
  },
  industrialChainManufacturerET: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  otherIndustrialChainManufacturerET: {
    type: String,
    required: function () {
      return this.industrialChainManufacturerET === 5;
    },
  },
  conveyorLength: {
    type: Number,
    required: false,
  },
  conveyorLengthUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  conveyorSpeed: {
    type: Number,
    required: false,
  },
  conveyorSpeedUnit: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  conveyorIndex: {
    type: Number,
    required: false,
  },
  travelDirection: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  appEnviroment: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    required: true,
  },
  otherAppEnviroment: {
    type: String,
    required: function () {
      return this.appEnviroment === 7;
    },
  },

  ovenStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.appEnviroment === 3;
    },
  },
  ovenTemp: {
    type: Number,
    required: function () {
      return this.appEnviroment === 3;
    },
  },
  surroundingTemp: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  conveyorLoaded: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  conveyorSwing: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  operatingVoltage: {
    type: Number,
    required: true,
  },

  monitorData: templateB,

  freeCarrierSystem: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  catDriveStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  catDriveNum: {
    type: Number,
    required: false,
  },
  lubeBrand: {
    type: String,
    required: false,
  },
  lubeType: {
    type: String,
    required: false,
  },
  lubeViscosity: {
    type: String,
    required: false,
  },
  chainCleanStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  wireMeasurementUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  conductor2: {
    type: Number,
    required: false,
  },
  conductor4: {
    type: Number,
    required: false,
  },
  conductor7: {
    type: Number,
    required: false,
  },
  conductor12: {
    type: Number,
    required: false,
  },
  junctionBoxNum: {
    type: Number,
    required: false,
  },
  etUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  etOverheadB: {
    type: Number,
    required: false,
  },
  etOverheadG: {
    type: Number,
    required: false,
  },
  etOverheadH: {
    type: Number,
    required: false,
  },
  etOverheadS: {
    type: Number,
    required: false,
  },
  etOverheadK2: {
    type: Number,
    required: false,
  },
  etOverheadLS: {
    type: Number,
    required: false,
  },
  etOverheadM2: {
    type: Number,
    required: false,
  },
  etOverheadN2: {
    type: Number,
    required: false,
  },
  etOverheadS2: {
    type: Number,
    required: false,
  },
});

const ETO_2100 =
  mongoose.models.ETO_2100 || mongoose.model("ETO_2100", ETO_2100_Schema);
module.exports = ETO_2100;
