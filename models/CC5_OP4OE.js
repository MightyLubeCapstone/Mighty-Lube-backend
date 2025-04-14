const mongoose = require("mongoose");
const templateB = require("./templateB.js");
const uuid = require("uuid");
const templateB = require("./templateB.js");

const CC5_OP4OE_Schema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,
  },

  cc5ChainSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.cc5ChainSize === 8;
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
    // add RegEx matching to this :D
  },

  conveyorSpeed: {
    type: String,
    required: true,
    // add RegEx matching to this :D
  },

  conveyorSpeedUnit: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  conveyorIndex: {
    type: String,
    required: false,
    // add RegEx matching to this :D
  },

  travelDirection: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  appEnviroment: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  //This says that if they enter yes (or 1/true) then we require these two fields to be entered too.
  //If it's no/0 then we pretend that these don't even exist
  ovenStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.appEnviroment === 1;
    },
  },

  ovenTemp: {
    type: Number,
    required: function () {
      return this.appEnviroment === 1;
    },
  },

  surroundingTemp: {
    type: Number,
    enum: [1, 2],
    required: false,
    // add RegEx matching to this :D
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
    // add RegEx matching to this :D
  },

  requiredPics: {
    type: Number,
    enum: [1, 2],
    required: false,
    // add RegEx matching to this :D
  },

  operatingVoltage: {
    type: String,
    required: false,
  },

  controlVoltage: {
    type: Number,
    required: true,
  },

  // MonSys
  monitorData: templateB,

  outboardStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  highRollerStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
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

  cleanChain: {
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

  wireMeasurementUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  conductor2: {
    type: Number,
    required: false,
  },

  conductor4: {
    type: Number,
    required: false,
  },

  conductor7: {
    type: Number,
    required: false,
  },

  conductor12: {
    type: Number,
    required: false,
  },

  junctionBoxNum: {
    type: Number,
    required: false,
  },

  cc5UnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  powerRailWidth: {
    type: Number,
    required: false,
  },

  powerRailHeight: {
    type: Number,
    required: false,
  },

  rollerWheelA1: {
    type: Number,
    required: false,
  },

  rollerWheelB1: {
    type: Number,
    required: false,
  },

  linkD1: {
    type: Number,
    required: false,
  },

  wheelPitchM1: {
    type: Number,
    required: false,
  },

  rollerPinY1: {
    type: Number,
    required: false,
  },

  rollerPinZ1: {
    type: Number,
    required: false,
  },
});

const CC5_OP4OE =
  mongoose.models.CC5_OP4OE || mongoose.model("CC5_OP4OE", CC5_OP4OE_Schema);
module.exports = CC5_OP4OE;
