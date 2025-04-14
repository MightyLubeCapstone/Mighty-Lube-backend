const mongoose = require("mongoose");
const templateB = require("./templateB.js");

const ETI_9000INVL_Schema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: false,
  },
  industrialChainManufacturerET: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  otherIndustrialChainManufacturerET: {
    type: String,
    required: function () {
      return this.industrialChainManufacturerET === 5;
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
    type: Number,
    required: false,
  },

  conveyorSpeedUnit: {
    type: Number,
    enum: [1, 2],
    required: false,
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

  monitorData: templateB,

  //This needs to be asked about next meeting
  freeCarrierSystem: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  catDriveStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  //Need to have template C so that we can add it here if yes is selected for the catDriveStatus
  catDriveNum: {
    type: Number,
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
  ctrStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  plcConnection: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  monitorControlStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  otherControllerInfo: {
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
  enclosedUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  enclosedTrackB: {
    type: Number,
    required: false,
  },
  enclosedTrackG: {
    type: Number,
    required: false,
  },
  enclosedTrackH: {
    type: Number,
    required: false,
  },
  enclosedTrackS: {
    type: Number,
    required: false,
  },
  enclosedTrackK2: {
    type: Number,
    required: false,
  },
  enclosedTrackL2: {
    type: Number,
    required: false,
  },
  enclosedTrackM2: {
    type: Number,
    required: false,
  },
  enclosedTrackN2: {
    type: Number,
    required: false,
  },
  enclosedTrackS2: {
    type: Number,
    required: false,
  },
});

const ETI_9000INVL =
  mongoose.models.ETI_9000INVL ||
  mongoose.model("ETI_9000INVL", ETI_9000INVL_Schema);
module.exports = ETI_9000INVL;
