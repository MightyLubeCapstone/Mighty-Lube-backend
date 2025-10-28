const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");

const OHP_GPCSchema = new mongoose.Schema({
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

  orientation: {
    type: Number,
    required: true,
  },

  swingStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  conveyorLoaded: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  plantLayout: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  operatingVoltSingle: {
    type: Number,
    required: true,
  },

  controlVoltSingle: {
    type: Number,
    required: true,
  },

  compressedAir: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  monitorData: templateA,
  
  currentGrease: {
    type: String,
    required: true,
  },

  currentGreaseGrade: {
    type: Number,
    required: true,
  },

  wheelDiameter: {
    type: Number,
    required: true,
  },

  lubeBrand: {
    type: String,
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
  gpcUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  chainDrop: {
    type: Number,
    required: false,
  },

  gpcDiameter: {
    type: Number,
    required: false,
  },

  gpcWheelC: {
    type: Number,
    required: false,
  },

  gpcWheelD: {
    type: Number,
    required: false,
  },

  gpcWheelE: {
    type: Number,
    required: false,
  },

  gpcWheelF: {
    type: Number,
    required: false,
  },

  gpcWheelG: {
    type: Number,
    required: false,
  },

  gpcWheelH: {
    type: Number,
    required: false,
  },

  gpcWheelS: {
    type: Number,
    required: false,
  },
});

const OHP_GPC = mongoose.model("tblOHP_GPC", OHP_GPCSchema);

module.exports = OHP_GPC;
