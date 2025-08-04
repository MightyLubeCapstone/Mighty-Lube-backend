const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const OHP_OP13Schema = new mongoose.Schema({
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
    required: false,
  },

  otherChainManufacturer: {
    type: String,
    required: function () {
      return this.industrialChainManufacturer === 9;
    },
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

  conveyorLoaded: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  operatingVoltTriple: {
    type: Number,
    required: false,
  },

  controlVoltSingle: {
    type: Number,
    required: false,
  },

  sanitaryUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },

  sanitaryA: {
    type: Number,
    required: true,
  },

  sanitaryC: {
    type: Number,
    required: false,
  },

  sanitaryA2: {
    type: Number,
    required: false,
  },

  sanitaryB2: {
    type: Number,
    required: false,
  },

  sanitaryC2: {
    type: Number,
    required: false,
  },

  sanitaryD2: {
    type: Number,
    required: false,
  },

  sanitaryE2: {
    type: Number,
    required: false,
  },

  sanitaryF2: {
    type: Number,
    required: false,
  },

  sanitaryG2: {
    type: Number,
    required: false,
  },

  sanitaryH2: {
    type: Number,
    required: false,
  },

  sanitaryJ2: {
    type: Number,
    required: false,
  },

  sanitaryL2: {
    type: Number,
    required: false,
  },

  sanitaryM2: {
    type: Number,
    required: false,
  },
});

const OHP_OP13 =
  mongoose.models.OHP_OP13 || mongoose.model("OHP_OP13", OHP_OP13Schema);
module.exports = OHP_OP13;
