const mongoose = require('mongoose');

const OHP_OEBSchema = new mongoose.Schema({
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

    ohpUnitType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    chainDrop: {
        type: Number,
        required: true,
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

const OHP_OEB = mongoose.model('tblOHP_OEB', OHP_OEBSchema);

module.exports = OHP_OEB;
