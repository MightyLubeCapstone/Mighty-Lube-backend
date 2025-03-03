const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_OP8Schema = new mongoose.Schema({
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
        type: Number, // Converted to simple type instead of ref
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

    monitorData: templateB,


    

    orientationType: {
        type: Number, // Converted to simple type instead of ref
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
        type: Number, // Converted to simple type instead of ref
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
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    threeStationType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    shroudType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    additionalInfo: {
        type: String,
        required: true,
    },

    pfUnitType: {
        type: Number, // Converted to simple type instead of ref
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

const PAF_OP8 = mongoose.model('tblPAF_OP8', PAF_OP8Schema);

module.exports = PAF_OP8;
