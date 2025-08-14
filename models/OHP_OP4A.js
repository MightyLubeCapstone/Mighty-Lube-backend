const mongoose = require("mongoose");
const templateA = require("./templateA.js");

const OHP_OP4ASchema = new mongoose.Schema({
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
    required: false,
  },

  conveyorSpeed: {
    type: Number,
    required: true,
  },

  conveyorSpeedUnit: {
    type: Number,
    enum: [1, 2],
    required: false,
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

  airOrElectric: {
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

  operatingVoltage: {
    type: Number,
    required: true,
  },

  controlVoltSingle: {
    type: Number,
    required: true,
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

    monitorData: templateA,



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

  fiveGallonStatus: {
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
    enum: [1, 2],
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
    enum: [1],
    required: false,
  },
});

const OHP_OP4A = mongoose.model("tblOHP_OP4A", OHP_OP4ASchema);

module.exports = OHP_OP4A;
