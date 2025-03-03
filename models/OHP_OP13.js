const mongoose = require('mongoose');

const OHP_OP13Schema = new mongoose.Schema({

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

    appEnviroment: {
        type: Number,
        enum: [1, 2],
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

    conveyorLoaded: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    plantLayout: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    requiredPics: {
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

    sanitaryUnit: {
        type: Number,
        required: true,
    },

    sanitaryA: {
        type: Number,
        required: true,
    },

    sanitaryC: {
        type: Number,
        required: true,
    },

    sanitaryA2: {
        type: Number,
        required: true,
    },

    sanitaryB2: {
        type: Number,
        required: true,
    },

    sanitaryC2: {
        type: Number,
        required: true,
    },

    sanitaryD2: {
        type: Number,
        required: true,
    },

    sanitaryE2: {
        type: Number,
        required: true,
    },

    sanitaryF2: {
        type: Number,
        required: true,
    },

    sanitaryG2: {
        type: Number,
        required: true,
    },

    sanitaryH2: {
        type: Number,
        required: true,
    },

    sanitaryJ2: {
        type: Number,
        required: true,
    },

    sanitaryL2: {
        type: Number,
        required: true,
    },

    sanitaryM2: {
        type: Number,
        required: true,
    },

});

const OHP_OP13 = mongoose.models.OHP_OP13 || mongoose.model('OHP_OP13', OHP_OP13Schema);
module.exports = OHP_OP13;
