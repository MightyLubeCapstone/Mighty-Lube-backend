const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");

const IFT_OP4OE_Schema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: false,
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
  measurementUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  conveyorSpeed: {
    type: Number,
    required: true,
  },
  speedUnit: {
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
  strandStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  plantLayout: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  requiredPics: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  pointsOfLube: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },

  m12Plugs: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  operatingVoltage: {
    type: Number,
    required: true,
  },
  controlVoltage: {
    type: Number,
    required: true,
  },

  monitorData: templateA,

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
  openRaceStyle: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },
  closedRaceStyle: {
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
  outboardStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
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
  otherControllerInfo: {
    type: String,
    required: false,
  },

  iftUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  iftPowerA: {
    type: Number,
    required: false,
  },
  iftPowerB: {
    type: Number,
    required: false,
  },
  iftPowerG: {
    type: Number,
    required: false,
  },
  iftPowerH: {
    type: Number,
    required: false,
  },
  iftPowerJ: {
    type: Number,
    required: false,
  },
  iftPowerS1: {
    type: Number,
    required: false,
  },
  iftPowerT1: {
    type: Number,
    required: false,
  },
  iftPowerU1: {
    type: Number,
    required: false,
  },

  iftPowerW1: {
    type: Number,
    required: false,
  },
  iftPowerX1: {
    type: Number,
    required: false,
  },
});

const IFT_OP4OE =
  mongoose.models.IFT_OP4OE || mongoose.model("IFT_OP4OE", IFT_OP4OE_Schema);
module.exports = IFT_OP4OE;
