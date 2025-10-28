const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const OHP_OP8Schema = new mongoose.Schema({
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

  conveyorLoaded: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  operatingVoltTriple: {
    type: Number,
    required: false,
  },

  opPowerStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },  

  brushStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },  

  brushMaterialType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  otherBrushMaterialType: {
    type: String,
    required: function () {
      return this.brushMaterialType === 4;
    },
  },

  clearanceStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  washStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  foodIndustryStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  powerPanelType: {
    type: Number,
    enum: [1],
    required: false,
  },  

  threeStationType: {
    type: Number,
    enum: [1],
    required: false,
  },  

  shroudStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },  

  shroudType: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  additionalInfo: {
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
});

const OHP_OP8 =
  mongoose.models.OHP_OP8 || mongoose.model("OHP_OP8", OHP_OP8Schema);
module.exports = OHP_OP8;
