const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const OHP_CDLSchema = new mongoose.Schema({
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

    conveyorLengthUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,

    },

    appEnviroment: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7],
        required: true,

    },

    // ovenStatus: {
    //     type: Number,
    //     enum: [1, 2],
    //     required: function () {
    //         return this.appEnviroment === 1;
    //     },
    // },

    // ovenTemp: {
    //     type: Number,
    //     required: function () {
    //         return this.appEnviroment === 1;
    //     },
    // },

    controlVoltSingle: {
        type: Number,
        required: true,
    },

    lubeBrand: {
        type: String,
        required: true,
    },

    lubeType: {
        type: String,
        required: true,
    },

    lubeViscosity: {
        type: String,
        required: true,
    },

    sideLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    topLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    specialControllerOption: {
        type: String,
        required: true,
    },

    specialControllerInfo: {
        type: String,
        required: true,
    },

    wireMeasurementUnit: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    twoConductor: {
        type: Number,
        required: true,
    },

    fourConductor: {
        type: Number,
        required: true,
    },

    sevenConductor: {
        type: Number,
        required: true,
    },

    twelveConductor: {
        type: Number,
        required: true,
    },

    junctionBoxNum: {
        type: Number,
        required: true,
    },
});

const OHP_CDL = mongoose.model('tblOHP_CDL', OHP_CDLSchema);

module.exports = OHP_CDL;
