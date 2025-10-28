const mongoose = require("mongoose");
const templateA = require("./templateA.js");

const templateD = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,
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

  surroundingTemp: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  orientationType: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },

  conveyorLoaded: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  conveyorSwing: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  operatingVoltage: {
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

  airSupplyType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },


  monitorData: templateA,

  lubeBrand: {
    type: String,
    required: true,
  },

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

  otherControllerNotes: {
    type: String,
    required: function () {
      return this.lubeBrand === "Mighty Lube";
    },
  },
});

module.exports = templateD;
