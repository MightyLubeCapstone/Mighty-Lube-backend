const mongoose = require('mongoose');
const templateA = require("./templateA.js");
const OHP_OP55Schema = new mongoose.Schema({

    conveyorName: {
        type: String,
        required: true,
    },

    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },

    // otherChainSize: {
    //     type: String,
    //     required: function () {
    //         return this.chainSize === 8;
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
        required: true,
    },

    measurementUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
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

    // Required if appEnviroment === 1
    ovenStatus: {
        type: Number,
        enum: [1, 2],
        required: function () {
            return this.appEnviroment === 1;
        }
    },

    ovenTemp: {
        type: Number,
        required: function () {
            return this.appEnviroment === 1;
        }
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

    orientation: {
        type: Number,
        required: true,
    },

    controlVoltSingle: {
        type: Number,
        required: true,
    },

    compressedAir: {
        type: Number,
        required: true,
    },

    airSupply: {
        type: Number,
        required: true,
    },

    chainMaster: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    timerStatus: {
        type: Number,
        enum: [1, 2, 3],
        required: true,
    },

    electricStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    pneumaticStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    otherControllerNotes: {
        type: String,
        required: false,
    },

    ohpUnit: {
        type: Number,
        required: true,
    },

    chainDrop: {
        type: Number,
        required: false,
    },

    ohpWidth: {
        type: Number,
        required: true,
    },

    ohpHeight: {
        type: Number,
        required: true,
    },

});

const OHP_OP55 = mongoose.models.OHP_OP55 || mongoose.model('OHP_OP55', OHP_OP55Schema);
module.exports = OHP_OP55;
