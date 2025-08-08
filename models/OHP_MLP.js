const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const OHP_MLPSchema = new mongoose.Schema({
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

  orientationType: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },

  operatingVoltSingle: {
    type: Number,
    required: true,
  },

  controlVoltSingle: {
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

  ohpUnitType: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },

  ohpVertical: {
    type: Number,
    required: true,
  },

  ohpWidth: {
    type: Number,
    required: true,
  },

  ohpHeight: {
    type: Number,
    required: true,
  },

  ohpDiameter: {
    type: Number,
    required: true,
  },

  ohpWidthInverted: {
    type: Number,
    required: true,
  },


  distanceFromReservouir: {
    type: Number,
    required: true,
  },

  overSprayBrushStatus: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

});

const OHP_MLP = mongoose.model("tblOHP_MLP", OHP_MLPSchema);

module.exports = OHP_MLP;
