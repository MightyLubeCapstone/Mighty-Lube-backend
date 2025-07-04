const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const templateE = require("./templateE.js");

const FT_OP4OE_Schema = new mongoose.Schema({
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
  otherIndustrialChainManufacturer: {
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
  operatingVoltage: {
    type: Number,
    required: true,
  },
  controlVoltage: {
    type: Number,
    required: true,
  },
  existingMonitor: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  newMonitor: {
    type: Number,
    enum: [1, 2],
    required: true,
    validate: {
      validator: function (value) {
        return !(this.existingMonitor === 1 && value === 1);
      },
      message: "Existing monitor and New Monitor cannot both be 1.",
    },
  },

  monitorData: templateA,

  wheelOpenType: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  wheelClosedType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },
  openStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
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
    required: false,
  },
  closedRaceStyleType: {
    type: Number,
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
    required: true,
  },

  catDriveStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  templateEData: templateE,

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

  ftUnitType: {
    type: Number,
    required: false,
  },
  ftTopG: {
    type: Number,
    required: false,
  },
  ftTopH: {
    type: Number,
    required: false,
  },
  ftTopA1: {
    type: Number,
    required: false,
  },
  ftTopB1: {
    type: Number,
    required: false,
  },
  ftTopH1: {
    type: Number,
    required: false,
  },
  ftTopJ1: {
    type: Number,
    required: false,
  },
  ftTopL1: {
    type: Number,
    required: false,
  },
  ftTopM1: {
    type: Number,
    required: false,
  },
  ftTopN1: {
    type: Number,
    required: false,
  },
  ftTopP1: {
    type: Number,
    required: false,
  },
  ftTopR1: {
    type: Number,
    required: false,
  },
});

const FT_OP4OE =
  mongoose.models.FT_OP4OE || mongoose.model("FT_OP4OE", FT_OP4OE_Schema);
module.exports = FT_OP4OE;
