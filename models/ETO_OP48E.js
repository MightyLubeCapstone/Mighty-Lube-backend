const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const templateB = require("./templateB.js");
const templateC = require("./templateC.js");
const templateF = require("./templateF.js");
const getDecodedInfo = require("./getDecodedInfo.js");

const ETO_OP48E_Schema = new mongoose.Schema({
  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: false,
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 5;
    },
  },
  industrialChainManufacturer: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  otherIndustrialChainManufacturer: {
    type: String,
    required: function () {
      return this.industrialChainManufacturer === 5;
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

  otherAppEnviroment: {
    type: String,
    required: function () {
      return this.appEnviroment === 7;
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

  controlVoltage: {
    type: Number,
    required: true,
  },

  monitorData: templateA,
  addFreeCarrier: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },

  templateBData: {
    type: templateB,
    required: function () {
      return this.addFreeCarrier === 1 || this.addFreeCarrier === 3;
    },
  },

  templateCData: {
    type: templateC,
    required: function () {
      return this.addFreeCarrier === 2 || this.addFreeCarrier === 3;
    },
  },

  catDriveStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  templateFData: templateF,

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
  chainMaster: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  timerStatus: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },
  electricStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  pneumaticStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  mightyLubeMonitoring: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  plcConnection: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  otherControllerInfo: {
    type: String,
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

const ETO_OP48E =
  mongoose.models.ETO_OP48E || mongoose.model("ETO_OP48E", ETO_OP48E_Schema);
module.exports = ETO_OP48E;
