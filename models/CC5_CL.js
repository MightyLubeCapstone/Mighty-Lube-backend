//NOT DONE

const mongoose = require('mongoose');
const uuid = require("uuid");

const ___Schema = new mongoose.Schema({


    conveyorName: {
        type: String,
        required: true,
    },

    chainSizeType: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },

    otherChainType: {
        type: String,
        required: this.chainSizeType === 8
    },

    industrialChainManufacturerType: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },

    otherManufacturerType: {
        type: String,
        required: function ()
        {
            return this.industrialChainManufacturerType === 9;
        }
    },

    conveyorLength: {
        type: Number,
        required: true,
    },

    measurementUnitType: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: false,
    },

    conveyorSpeed: {
        type: Number,
        required: true,
    },
    
    speedUnitType: {
        type: Number,
        enum: [1, 2],
        required: false,
    },

    variableSpeed: {
        type: Number,
        required: false,
    },

    travelDirectionType: {
        type: Boolean,
        required: false,
    },

    appEnvType: {
        type: Boolean,
        required: true,
    },

    //This says that if they enter yes (or 1/true) then we require these two fields to be entered too. 
    //If it's no/0 then we pretend that these don't even exist
    ovenStatus: {
        type: Boolean,
        required: function ()
        {
            return this.appEnvType === true;
        }
    },

    ovenTemp: {
        type: Number,
        required: function ()
        {
            return this.appEnvType === true;
        }
    },

    tempSurrounding: {
        type: Boolean,
        required: false,
    },

    strandStatus: {
        type: Boolean,
        required: true,
    },

    plantLayout: {
        type: Boolean,
        required: false,
    },

    chainPictures: {
        type: Boolean,
        required: false,
    },

    operatingVoltSingle: {
        type: Number,
        required: true,
    },

    existingConnection: {
        type: Boolean,
        required: true,
    },

    newConnection: {
        type: Boolean,
        required: false,
    },











    highRollerStatus: {
        type: Boolean,
        required: true,
    },

    outboardStatus: {
        type: Boolean,
        required: true,
    },

    lubeBrand: {
        type: String,
        required: false,
    },

    lubeType: {
        type: String,
        required: false,
    },

    lubeViscosity: {
        type: String,
        required: false,
    },

    reservoirSizeType: {
        type: Number,
        enum: [1, 2],
        required: false,
    },

    reservoirSizeQuanity: {
        type: Number,
        required: false,
    },

    chainCleanStatus: {
        type: Boolean,
        required: false,
    },

    specialControllerOption: {
        type: String,
        required: false,
    },

    specialControllerInfo: {
        type: String,
        required: false,
    },

    wireMeasurementUnitType: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: false,
    },

    twoConductor: {
        type: Number,
        required: false,
    },

    fourConductor: {
        type: Number,
        required: false,
    },

    sevenConductor: {
        type: Number,
        required: false,
    },

    twelveConductor: {
        type: Number,
        required: false,
    },

    junctionBoxNum: {
        type: Number,
        required: false,
    },

    cc5UnitType: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: false,
    },

    powerRailWidth: {
        type: Number,
        required: false,
    },

    powerRailHeight: {
        type: Number,
        required: false,
    },

    rollerWheelA1: {
        type: Number,
        required: false,
    },

    rollerWheelB1: {
        type: Number,
        required: false,
    },

    linkD1: {
        type: Number,
        required: false,
    },

    wheelPitchM1: {
        type: Number,
        required: false,
    },

    rollerPinY1: {
        type: Number,
        required: false,
    },

    rollerPinZ1: {
        type: Number,
        required: false,
    }


});

const ____ = mongoose.models.__ || mongoose.model('___', ___Schema);
module.exports = ___;