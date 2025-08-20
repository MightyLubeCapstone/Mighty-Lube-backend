const mongoose = require("mongoose");
const templateE = require("./templateE.js");
const templateA = require("./templateA.js");
const templateD = require("./templateD.js");
const getDecodedInfo = require("./getDecodedInfo.js");
 
const COE_CEL_Schema = new mongoose.Schema({
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
      return this.cc5ChainSize === 5;
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

  monitorData: templateA,
  
  wheelSealedChain: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  templateDData: {
    type: templateD,
    required: function () {
      return this.wheelSealedChain === 1;
    },
  },

  templateEData: templateE,



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

  catDriveStatus: {
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
  chainCleanStatus: {
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
  coeUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
  coeLineA: {
    type: Number,
    required: false,
  },
  coeLineG: {
    type: Number,
    required: false,
  },
  coeLineH: {
    type: Number,
    required: false,
  },
  coeLineJ: {
    type: Number,
    required: false,
  },
  coeLineX: {
    type: Number,
    required: false,
  },
  coeLineY: {
    type: Number,
    required: false,
  },
});

const COE_CEL =
  mongoose.models.COE_CEL || mongoose.model("COE_CEL", COE_CEL_Schema);
module.exports = COE_CEL;
