const mongoose = require('mongoose');
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const FRO_OEB_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: false,
    },
    // add enum and check
    // otherChainSize: {
    //     type: String,
    //     required: function () {
    //         return this.chainSize === 5;
    //     },
    // },
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },
    // otherChainManufacturer: {
    //     type: String,
    //     required: function () {
    //         return this.industrialChainManufacturer === 9;
    //     },
    // },
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
        required: false,
    },
    frUnitType: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: false,

    },
    frOverheadA: {
        type: Number,
        required: false,
    },
    frOverheadB: {
        type: Number,
        required: false,
    },
    frOverheadG: {
        type: Number,
        required: false,
    },
    frOverheadH: {
        type: Number,
        required: false,
    },
    frOverheadL: {
        type: Number,
        required: false,
    },
    frInvertedA: {
        type: Number,
        required: false,
    },
    frInvertedB: {
        type: Number,
        required: false,
    },
    frInvertedG: {
        type: Number,
        required: false,
    },
    frInvertedH: {
        type: Number,
        required: false,
    },
    frInvertedK: {
        type: Number,
        required: false,
    },
});

const FRO_OEB = mongoose.models.FRO_OEB || mongoose.model('FRO_OEB', FRO_OEB_Schema);
module.exports = FRO_OEB;
