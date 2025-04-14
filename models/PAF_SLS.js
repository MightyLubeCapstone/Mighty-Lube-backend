const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_SLS_Schema = new mongoose.Schema({
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
        required: true,
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
        required: true,
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

    monitorData: templateB,


    

    cleanChain: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    pfUnitType: {
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

const PAF_SLS = mongoose.model('tblPAF_SLS', PAF_SLS_Schema);

module.exports = PAF_SLS;
