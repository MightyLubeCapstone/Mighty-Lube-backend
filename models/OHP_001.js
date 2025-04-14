const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const OHP_001Schema = new mongoose.Schema({

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

    conveyorSpeed: {
        type: Number,
        required: true,
    },

    speedUnit: {

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

    ohpUnit: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
    },

    chainDrop: {
        type: Number,
        required: false,
    },

    ohpDiameter: {
        type: Number,
        required: true,
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

const OHP_001 = mongoose.models.OHP_001 || mongoose.model('OHP_001', OHP_001Schema);
module.exports = OHP_001;
