const mongoose = require("mongoose");
const templateB = require("./templateB.js");
const OHP_CDLSchema = new mongoose.Schema({
    
  conveyorName: {
    type: String,
    required: false,
  },

  ohpChainSizeTwo: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },

  otherOHPChainSizeTwo: {
    type: String,
    required: function () {
      return this.ohpChainSizeTwo === 4;
    },
  },

  industrialChainManufacturer: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    required: false,
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

  specialControllerOption: {
    type: String,
    required: false,
  },

  specialControllerInfo: {
    type: String,
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
});

const OHP_CDL = mongoose.model("tblOHP_CDL", OHP_CDLSchema);

module.exports = OHP_CDL;
