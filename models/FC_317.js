const mongoose = require("mongoose");
const templateB = require("./templateB.js");
const FC_317_Schema = new mongoose.Schema({
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

  orientationType: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },

  evenGuideWheelStatus: {
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

  compressedAir: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  airSupplyType: {
    type: Number,
    enum: [1, 2, 3],
    required: function () {
      return this.compressedAir === 1;
    },
  },

  monitorData: templateB,

  freeWheelStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  actuatorStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  kingPinStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  guideRollerStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  openRaceStyleType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },
  closedRaceStyleType: {
    type: Number,
    enum: [1, 2, 3],
    required: false,
  },
  holeStatus: {
    type: Number,
    enum: [1, 2],
    required: false,
  },
  lubeBrand: {
    type: String,
    required: true,
  },
  lubeType: {
    type: String,
    required: true,
  },

  currentLubeGrade: {
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
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  remoteStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  mountStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  otherUnitStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  timerStatus: {
    type: Number,
    enum: [1, 2, 3],
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  electricStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  mightyLubeMonitoring: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  preMountType: {
    type: Number,
    enum: [1, 2, 3],
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
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
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },
  otherControllerInfo: {
    type: String,
    required: function () {
      return this.lubeBrand && this.lubeBrand.toLowerCase() === "mighty lube";
    },
  },

  fcUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  fcGreaserE: {
    type: Number,
    required: false,
  },
  fcGreaserF: {
    type: Number,
    required: false,
  },
  fcGreaserG: {
    type: Number,
    required: false,
  },
  fcGreaserH: {
    type: Number,
    required: false,
  },
});

const FC_317 =
  mongoose.models.FC_317 || mongoose.model("FC_317", FC_317_Schema);
module.exports = FC_317;
