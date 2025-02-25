const mongoose = require('mongoose');

const OHP_OP8NPSchema = new mongoose.Schema({

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

    measurementUnit: {
        type: Number,
        required: true,
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

const OHP_OP8NP = mongoose.models.OHP_OP8NP || mongoose.model('OHP_OP8NP', OHP_OP8NPSchema);
module.exports = OHP_OP8NP;
