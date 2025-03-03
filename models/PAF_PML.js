const mongoose = require('mongoose');

const PAF_PML_Schema = new mongoose.Schema({
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
        enum: [1, 2],
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

    paintMakerStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    paintMarketNum: {
        type: Number,
        required: true,
    },

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

const PAF_PML = mongoose.model('tblPAF_PML', PAF_PML_Schema);

module.exports = PAF_PML;
