const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const templateB = require("./templateB.js");
const templateC = require("./templateC.js");

const OHP_9000ISchema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,
  },

  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 4;
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

  operatingVoltSingle: {
    type: Number,
    required: false,
  },

  controlVoltSingle: {
    type: Number,
    required: false,
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

  wheelOpenType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },

  wheelClosedType: {
    type: Number, 
    enum: [1, 2, 3],
    required: false,
  },

  powerChainStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  chainPinStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  catDriveStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  catDriveNum: {
    type: Number,
    required: false,
  },

  railLubeStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  externalLubeStatus: {
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

  wireMeasurementUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  twoConductor: {
    type: Number,
    required: false,
  },

  fourConductor: {
    type: Number,
    required: false,
  },

  sevenConductor: {
    type: Number,
    required: false,
  },

  twelveConductor: {
    type: Number,
    required: false,
  },

  junctionBoxNum: {
    type: Number,
    required: false,
  },

  ohpUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  ohpDiameter: {
    type: Number,
    required: true,
  },

  ohpWidth: {
    type: Number,
    required: true,
  },

  ohpHeight: {
    type: Number,
    required: true,
  },
});

const OHP_9000I = mongoose.model("tblOHP_9000I", OHP_9000ISchema);

module.exports = OHP_9000I;
