const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const uuid = require("uuid");
const getDecodedInfo = require("./getDecodedInfo.js");

const CC5_CLSchema = new mongoose.Schema({
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
    required: false,
  },

  conveyorLengthUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  conveyorSpeed: {
    type: String,
    required: false,
  },

  conveyorSpeedUnit: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  conveyorIndex: {
    type: String,
    required: false,
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
    type: String,
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

const CC5_CL = mongoose.models.CC5_CL || mongoose.model("CC5_CL", CC5_CLSchema);
module.exports = CC5_CL;
