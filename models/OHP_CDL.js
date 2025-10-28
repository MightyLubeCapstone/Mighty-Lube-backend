const mongoose = require("mongoose");

const OHP_CDLSchema = new mongoose.Schema({
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
    required: false,
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
