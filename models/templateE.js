const mongoose = require("mongoose");

const templateE = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: true,

  },

  chainSize: {
    type: Number,
    enum: [1, 2, 3, 4],
        required: function () {
      return this.catDriveStatus === 1;
    },
  },

  otherChainSize: {
    type: String,
    required: function () {
      return this.chainSize === 4;
    },
  },

  industrialChainManufacturer: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    required: false,
  },

  otherChainManufacturer: {
    type: String,
    required: function () {
      return this.industrialChainManufacturer === 9;
    },
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
    required: false,
  },

  otherAppEnviroment: {
    type: String,
    required: function () {
      return this.appEnviroment === 7;
    },
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
  specialControllerOptions: {
    type: String,
    required: false,
  },

  wireMeasurementUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

  conductor2: {
    type: Number,
    required: false,
  },

  conductor4: {
    type: Number,
    required: false,
  },

  conductor7: {
    type: Number,
    required: false,
  },

  conductor12: {
    type: Number,
    required: false,
  },

  junctionBoxNum: {
    type: Number,
    required: false,
  },
});

module.exports = templateE;
