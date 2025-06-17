const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");

const IBR_RFC_Schema = new mongoose.Schema({
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
  speedUnit: {
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
  plantLayout: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  requiredPics: {
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
    required: true,
  },
  openStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  powerChainStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  chainPinStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  sliderPlateStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  outBoardStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  railLubeStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  externalLubeStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  lubeBrand: {
    type: String,
    required: true,
  },
  lubeType: {
    type: String,
    required: true,
  },
  lubeViscosity: {
    type: String,
    required: true,
  },

  reservoirSize: {
    type: String,
    required: true,
  },

  reservoirSizeNum: {
    type: Number,
    required: true,
  },

  chainCleanStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  mightyLubeMonitoring: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  ctrController: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  plcConnection: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  monitoringController: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  otherControllerInfo: {
    type: String,
    required: true,
  },

  specialControllerOptions: {
    type: Number,
    required: false,
    enum: [1, 2, 3],
  },

  measurementUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  powerRailG: {
    type: Number,
    required: true,
  },
  powerRailH: {
    type: Number,
    required: true,
  },
  powerRailA1: {
    type: Number,
    required: true,
  },
  powerRailB1: {
    type: Number,
    required: true,
  },
  powerRailH1: {
    type: Number,
    required: true,
  },

  powerRailJ1: {
    type: Number,
    required: true,
  },
  powerRailL1: {
    type: Number,
    required: true,
  },
  powerRailM1: {
    type: Number,
    required: true,
  },
  powerRailN1: {
    type: Number,
    required: true,
  },
  powerRailP1: {
    type: Number,
    required: true,
  },
  powerRailR1: {
    type: Number,
    required: true,
  },

  wireMeasurementUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },

  conductor2: {
    type: Number,
    required: true,
  },

  conductor4: {
    type: Number,
    required: true,
  },

  conductor7: {
    type: Number,
    required: true,
  },

  conductor12: {
    type: Number,
    required: true,
  },

  junctionBoxNum: {
    type: Number,
    required: true,
  },
});

const IBR_RFC =
  mongoose.models.IBR_RFC || mongoose.model("IBR_RFC", IBR_RFC_Schema);
module.exports = IBR_RFC;
