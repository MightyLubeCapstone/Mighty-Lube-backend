const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");

const FT_OPCO_Schema = new mongoose.Schema({
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
  conveyorLoaded: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  strandStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  conveyorSwing: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  wearStrips: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.conveyorSwing === 1;
    },
  },

  skiBars: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.conveyorSwing === 1;
    },
  },

  relayStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.conveyorSwing === 1;
    },
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
  compressedAir: {
    type: Number,
    enum: [1, 2],
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
    required: true,
  },

  actuatorStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  kingPinStatus: {
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
  rollerChainStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  brushStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  outboardStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  lubeBrand: {
    type: String,
    required: true,
  },
  lubeViscosity: {
    type: String,
    required: true,
  },

  currentGrease: {
    type: String,
    required: true,
  },

  currentLube: {
    type: String,
    required: true,
  },
  oilOrGrease: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  oilViscosity: {
    type: Number,
    required: function () {
      return this.oilOrGrease === 1;
    },
  },

  greaseNGLIGrade: {
    type: Number,
    required: function () {
      return this.oilOrGrease === 2;
    },
  },

  zerkDirection: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  zerkLocationType: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },

  //says to have swing status here too idek :(
  swingStatusAgain: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  wheelDiameter: {
    type: Number,
    required: true,
  },

  chainMaster: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  remoteStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  mountStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  otherUnitStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  timerStatus: {
    type: Number,
    enum: [1, 2, 3],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  electricStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  mightyLubeMonitoring: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  preMountType: {
    type: Number,
    enum: [1, 2, 3],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  otherPreMountType: {
    type: String,
    required: function () {
      return this.preMountType === 3;
    },
  },

  plcConnection: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  otherControllerNotes: {
    type: String,
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },

  ftUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
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

const FT_OPCO =
  mongoose.models.FT_OPCO || mongoose.model("FT_OPCO", FT_OPCO_Schema);
module.exports = FT_OPCO;
