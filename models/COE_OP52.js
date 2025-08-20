const mongoose = require("mongoose");
const getDecodedInfo = require("./getDecodedInfo.js");

const COE_OP52_Schema = new mongoose.Schema({
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
  brushApplicators: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  m12Plugs: {
    type: Number,
    enum: [1, 2],
    required: true,
  },

  oilBackupCat: {
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
});

const COE_OP52 =
  mongoose.models.COE_OP52 || mongoose.model("COE_OP52", COE_OP52_Schema);
module.exports = COE_OP52;
