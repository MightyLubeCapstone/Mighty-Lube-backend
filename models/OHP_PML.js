const mongoose = require("mongoose");
const OHP_PMLSchema = new mongoose.Schema({
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
    required: true,
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
    required: true,
  },

  conveyorLoaded: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  conveyorSwing: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  orientationType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },

  paintMakerStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  paintMarketNum: {
    type: Number,
    required: false,
  },

  chainCleanStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
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

  ohpDiameter: {
    type: Number,
    required: false,
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

const OHP_PML = mongoose.model("tblOHP_PML", OHP_PMLSchema);

module.exports = OHP_PML;
