const mongoose = require("mongoose");
const templateB = require("./templateB.js");
const OHP_ESSchema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: false,
  },

  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 8;
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

  strandStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  openBearingStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  pinLubeType: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  pointsOfLube: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },

  m12PlugStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  controllingOP201: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  orderingOP201: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  newMonitorStatus: {
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
    required: true,
  },

  controlVoltSingle: {
    type: Number,
    required: true,
  },

  monitorData: templateB,

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

  openStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  freeWheelStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  guideRollerStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  openRaceStyleType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },

  closedRaceStyleType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },

  holeStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  actuatorStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  pivotStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  kingPinStatus: {
    type: Number,
    enum: [1, 2],
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

  chainMaster: {
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
    required: false,
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
});

const OHP_ES = mongoose.model("tblOHP_ES", OHP_ESSchema);

module.exports = OHP_ES;
