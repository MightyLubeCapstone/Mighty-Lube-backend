const mongoose = require("mongoose");
const templateA = require("./templateA.js");
const OHP_PMMSchema = new mongoose.Schema({
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

  orientationType: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },

  markerToUnitDistance: {
    type: Number,
    required: true,
  },

    monitorData: templateA,


  dcuNum: {
    type: Number,
    required: false,
  },
});

const OHP_PMM = mongoose.model("tblOHP_PMM", OHP_PMMSchema);

module.exports = OHP_PMM;
