const mongoose = require("mongoose");
const templateB = require("./templateB.js");
const OHPCBSSchema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,
  },

  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 8;
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
    
    conveyorRailSize: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
  conveyorLength: {
    type: Number,
    required: false,
  },

  conveyorLengthUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
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
      return this.appEnviroment === 1;
    },
  },

  ovenTemp: {
    type: Number,
    required: function () {
      return this.appEnviroment === 1;
    },
  },
});

const OHP_CBS =
  mongoose.models.OHP_CBS || mongoose.model("OHP_CBS", OHPCBSSchema);
module.exports = OHP_CBS;
