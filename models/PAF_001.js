const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_001Schema = new mongoose.Schema({
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

    conveyorLength: {
        type: Number,
        required: true,
    },

  conveyorLengthUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },

    conveyorSpeed: {
        type: Number,
        required: true,
    },

  conveyorSpeedUnit: {
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

    orientationType: {
        type: Number, 
        required: true,
    },
});

const PAF_001 = mongoose.model('tblPAF_001', PAF_001Schema);

module.exports = PAF_001;
