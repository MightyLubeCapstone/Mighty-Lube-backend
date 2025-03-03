const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const OHP_OP139ASchema = new mongoose.Schema({
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

    conveyorSpeed: {
        type: Number,
        required: true,
    },

    conveyorSpeedUnit: {
        type: Number, // Converted to simple type instead of ref
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

    controlVoltSingle: {
        type: Number,
        required: true,
    },

    compressedAir: {
        type: Number,
        required: true,
    },

    airSupplyType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    monitorData: templateB,


    

    railLubeStatus: {
        type: Number,
        enum: [1, 2],
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

    chainCleanStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    chainMaster: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    otherUnitStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    timerStatus: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
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

    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    plcConnection: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    otherControllerNotes: {
        type: String,
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

    radioButtonType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },
});

const OHP_OP139A = mongoose.model('tblOHP_OP139A', OHP_OP139ASchema);

module.exports = OHP_OP139A;
