const mongoose = require("mongoose");
const CCO_OEBSchema = new mongoose.Schema({
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

  surroundingTemp: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  ohpUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  chainDrop: {
    type: Number,
    required: true,
  },

  freeRailDiameter: {
    type: Number,
    required: false,
  },

  freeRailWidth: {
    type: Number,
    required: false,
  },

  freeRaiHeight: {
    type: Number,
    required: false,
  },
  freeRaiVerticle: {
    type: Number,
    required: false,
  },

  freeRailInvertedChain: {
    type: Number,
    required: false,
  },

  freeRailInvertedDiameter: {
    type: Number,
    required: false,
  },
  freeRailInvertedWidth: {
    type: Number,
    required: false,
  },

    freeRailInvertedHeight: {
    type: Number,
    required: false,
  },

    freeRailInvertedPitch: {
    type: Number,
    required: false,
  },

});

const CCO_OEB = mongoose.model("tblOHP_OEB", CCO_OEBSchema);
module.exports = CCO_OEB;
