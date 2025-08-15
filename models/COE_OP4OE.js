const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const templateD = require("./templateD.js");
const templateF = require("./templateF.js");
const getDecodedInfo = require("./getDecodedInfo.js");
 
const COE_OP4OE_Schema = new mongoose.Schema({
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
      return this.cc5ChainSize === 8;
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

  controlVoltage: {
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


    templateFData: templateF,


  catDriveStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

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
  holeStatus: {
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
    required: true,
  },
  timerStatus: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  electricStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  pneumaticStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  mightyLubeMonitoring: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  plcConnection: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  otherControllerInfo: {
    type: String,
    required: true,
  },
  coeUnitType: {
    type: Number,
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
  coeLineZ: {
    type: Number,
    required: false,
  },
});

const COE_OP4OE = mongoose.models.COE_OP4OE || mongoose.model("COE_OP4OE", COE_OP4OE_Schema);
module.exports = COE_OP4OE;
