const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_OP8NPSchema = new mongoose.Schema({
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

    pfUnitType: {
        type: Number, 
        required: true,
    },

    pfOverheadL: {
        type: Number,
        required: true,
    },

    pfOverheadG: {
        type: Number,
        required: true,
    },

    pfOverheadH: {
        type: Number,
        required: true,
    },

    pfInvertedA: {
        type: Number,
        required: true,
    },

    pfInvertedG: {
        type: Number,
        required: true,
    },

    pfInvertedH: {
        type: Number,
        required: true,
    },
});

const PAF_OP8NP = mongoose.model('tblPAF_OP8NP', PAF_OP8NPSchema);

module.exports = PAF_OP8NP;
