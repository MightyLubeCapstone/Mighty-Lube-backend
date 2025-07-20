const mongoose = require("mongoose");
const templateA = require("./templateA.js");

const templateC = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,
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

  guideWheelsEven: {
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

  pivotStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },

  kingPinStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  lubeBrand: {
    type: String,
    required: true,
  },

  lubeViscosity: {
    type: String,
    required: true,
  },

  lubeType: {
    type: String,
    required: false,
  },

  currentGrease: {
    type: String,
    required: true,
  },

  currentGreaseGrade: {
    type: Number,
    required: true,
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

  wheelDiameter: {
    type: Number,
    required: true,
  },

  conveyorSwing: {
    type: Number,
    enum: [1, 2],
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

  templateC_UnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  templateC_InvertedA: {
    type: Number,
    required: true,
  },

  templateC_InvertedB: {
    type: Number,
    required: true,
  },

  templateC_InvertedE: {
    type: Number,
    required: true,
  },

  templateC_InvertedS: {
    type: Number,
    required: true,
  },
});

module.exports = templateC;
