const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const templateB = require("./templateB.js");
const templateC = require("./templateC.js");
const templateD = require("./templateD.js");
const templateF = require("./templateF.js");

const CCO_139ASchema = new mongoose.Schema({
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

  wheelsOnPowerChain: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  templateDData: {
    type: templateD,
    required: function () {
      return this.wheelsOnPowerChain === 1;
    },
  },

  templateFData: templateF,

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

  ccoG: {
    type: Number,
    required: false,
  },

  ccoH: {
    type: Number,
    required: false,
  },

  ccoK: {
    type: Number,
    required: false,
  },

  ccoA: {
    type: Number,
    required: false,
  },
  ccoB: {
    type: Number,
    required: false,
  },
  ccoIG: {
    type: Number,
    required: false,
  },
  ccoIH: {
    type: Number,
    required: false,
  },
  ccoIK: {
    type: Number,
    required: false,
  },
  ccoL: {
    type: Number,
    required: false,
  },
});

const CCO_139A = mongoose.model("tblCCO_139A", CCO_139ASchema);

module.exports = CCO_139A;
