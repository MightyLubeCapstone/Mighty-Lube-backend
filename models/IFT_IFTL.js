const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");
const { chainPinStatus } = require("./IBR_RFC_Mappings.js");

const IFT_IFTL_Schema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,
  },
  pitchBetweenRollers: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },

  otherPitchBetweenRollers: {
    type: String,
    required: function () {
      return this.pitchBetweenRollers === 5;
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
  strandStatus: {
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
  freeWheelStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  guideRollerStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  openRaceStyle: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  closedRaceStyle: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  actuatorStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  pivotStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  kingPinStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  rollerChainStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  brushingsStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  riderPlatesStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
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
  catDriveNum: {
    type: Number,
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
  sideLubeStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  topLubeStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  reservoirSize: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },

  otherReservoirSize: {
    type: String,
    required: function () {
      return this.reservoirSize === 3;
    },
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

  specialControllerOptions: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },

  washdownStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  iftUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  iftPowerA: {
    type: Number,
    required: true,
  },
  iftPowerB: {
    type: Number,
    required: true,
  },
  iftPowerG: {
    type: Number,
    required: true,
  },
  iftPowerH: {
    type: Number,
    required: true,
  },
  iftPowerJ: {
    type: Number,
    required: true,
  },
  iftPowerS1: {
    type: Number,
    required: true,
  },
  iftPowerT1: {
    type: Number,
    required: true,
  },
  iftPowerU1: {
    type: Number,
    required: true,
  },
  iftPowerW1: {
    type: Number,
    required: true,
  },
  iftPowerX1: {
    type: Number,
    required: true,
  },
});

const IFT_IFTL =
  mongoose.models.IFT_IFTL || mongoose.model("IFT_IFTL", IFT_IFTL_Schema);
module.exports = IFT_IFTL;
