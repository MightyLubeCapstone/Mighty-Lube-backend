const mongoose = require('mongoose');
const templateA = require("./templateA.js");
const OHP_OP8Schema = new mongoose.Schema({

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

    operatingVoltTriple: {
        type: Number,
        required: true,
    },

    controlVoltSingle: {
        type: Number,
        required: true,
    },

    opPowerStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    brushMaterialType: {
        type: Number,
        required: true,
    },

    clearanceStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    washStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    foodIndustryStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    powerPanelType: {
        type: Number,
        required: true,
    },

    threeStationType: {
        type: Number,
        required: true,
    },

    shroudType: {
        type: Number,
        required: true,
    },

    additionalInfo: {
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

const OHP_OP8 = mongoose.models.OHP_OP8 || mongoose.model('OHP_OP8', OHP_OP8Schema);
module.exports = OHP_OP8;
