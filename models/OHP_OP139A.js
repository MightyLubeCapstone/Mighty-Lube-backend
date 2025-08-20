const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const templateB = require("./templateB.js");
const templateC = require("./templateC.js");

const OHP_OP139ASchema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,
  },

  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 5;
    },
  },

  industrialChainManufacturer: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    required: true,
  },

  otherChainManufacturer: {
    type: String,
    required: function () {
      return this.industrialChainManufacturer === 9;
    },
  },

  wheelManufacturer: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: true,
  },

  otherWheelManufacturer: {
    type: String,
    required: function () {
      return this.wheelManufacturer === 10;
    },
  },

  conveyorLength: {
    type: Number,
    required: true,
  },

  conveyorLengthUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },

  conveyorSpeed: {
    type: Number,
    required: true,
  },

  conveyorSpeedUnit: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  conveyorIndex: {
    type: Number,
    required: true,
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

  strandStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  pointsOfLube: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    required: true,
  },

  sensingMethod: {
    type: Number,
    enum: [1, 2],
    required: true,
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

  compressedAir: {
    type: Number,
    required: false,
  },

  airSupplyType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },

  operatingVoltSingle: {
    type: Number,
    required: true,
  },

  controlVoltSingle: {
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

  railLubeStatus: {
    type: Number,
    enum: [1, 2],
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

  sideLubeStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  topLubeStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  chainCleanStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  chainMaster: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  otherUnitStatus: {
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
    enum: [1, 2, 3],
    required: true,
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

  otherControllerNotes: {
    type: String,
    required: false,
  },

  ohpUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  chainDrop: {
    type: Number,
    required: false,
  },

  ohpDiameter: {
    type: Number,
    required: false,
  },

  ohpWidth: {
    type: Number,
    required: false,
  },

  ohpHeight: {
    type: Number,
    required: false,
  },

  radioButtonType: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
});

const OHP_OP139A = mongoose.model("tblOHP_OP139A", OHP_OP139ASchema);

module.exports = OHP_OP139A;
