const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const templateE = require("./templateE.js");

const FT_FTL_Schema = new mongoose.Schema({
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

    strandStatus: {
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
    required: true,
  },
  conveyorSwing: {
    type: Number,
    enum: [1, 2],
    required: false,
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

  outBoardStatus: {
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

  reservoirSize: {
    type: String,
    required: false,
  },

  reservoirSizeNum: {
    type: Number,
    required: false,
  },

  chainCleanStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  mightyLubeMonitoring: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  ctrController: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  plcConnection: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  monitoringController: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  otherControllerInfo: {
    type: String,
    required: false,
  },

  specialControllerOptions: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },

  measurementUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  powerRailG: {
    type: Number,
    required: false,
  },
  powerRailH: {
    type: Number,
    required: false,
  },
  powerRailA1: {
    type: Number,
    required: false,
  },
  powerRailB1: {
    type: Number,
    required: false,
  },
  powerRailH1: {
    type: Number,
    required: false,
  },

  powerRailJ1: {
    type: Number,
    required: false,
  },
  powerRailL1: {
    type: Number,
    required: false,
  },
  powerRailM1: {
    type: Number,
    required: false,
  },
  powerRailN1: {
    type: Number,
    required: false,
  },
  powerRailP1: {
    type: Number,
    required: false,
  },
  powerRailR1: {
    type: Number,
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
});

const FT_FTL =
  mongoose.models.FT_FTL || mongoose.model("FT_FTL", FT_FTL_Schema);
module.exports = FT_FTL;
