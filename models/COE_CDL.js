const mongoose = require("mongoose");
const templateB = require("./templateB.js");
const COE_CDL_Schema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: false,
  },
  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: false,
    // add enum and check
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 5;
    },
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
  controlVoltSingle: {
    type: Number,
    required: false,
  },
});

const COE_CDL =
  mongoose.models.COE_CDL || mongoose.model("COE_CDL", COE_CDL_Schema);
module.exports = COE_CDL;
