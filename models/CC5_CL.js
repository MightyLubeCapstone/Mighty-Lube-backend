const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const uuid = require("uuid");
const getDecodedInfo = require("./getDecodedInfo.js");  



const CC5_CLSchema = new mongoose.Schema({


    conveyorName: {

        type: String,
        required: true,
    },


    cc5ChainSize: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,

    },

    // otherChainSize: {

    //     type: String,
    //     required: function ()
    //     {
    //         return this.cc5ChainSize === 8;
    //     }
    // },

    industrialChainManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,

    },

    // otherChainManufacturer: {

    //     type: String,
    //     required: function ()
    //     {
    //         return this.industrialChainManufacturer === 9;
    //     }

    // },

    conveyorLength: {

        type: Number,
        required: false,

    },

    conveyorLengthUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: false,

    },

    conveyorSpeed: {

        type: String,
        required: false,
        // add RegEx matching to this :D

    },
    
    conveyorSpeedUnit: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    conveyorIndex: {

        type: String,
        required: false,
        // add RegEx matching to this :D

    },

    travelDirection: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    appEnviroment: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7],
        required: true,

    },

    //This says that if they enter yes (or 1/true) then we require these two fields to be entered too. 
    //If it's no/0 then we pretend that these don't even exist

    // ovenStatus: {
    //     type: Number,
    //     enum: [1, 2],
    //     required: function ()
    //     {
    //         return this.appEnviroment === 1;
    //     }
    // },

    // ovenTemp: {
    //     type: Number,
    //     required: function ()
    //     {
    //         return this.appEnviroment === 1;
    //     }
    // },

    surroundingTemp: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    strandStatus: {
        
        type: Number,
        enum: [1, 2],
        required: true,

    },

    plantLayout: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    requiredPics: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    operatingVoltage: {

        type: String,
        required: true,

    },


    // MonSys
    existingMonitor: {

        type: Number,
        enum: [1, 2],
        required: false,

    },

    // newMonitor: {
    //     type: Number,
    //     enum: [1, 2],
    //     required: true,
    
    // },
   // monitorData: templateB,




    highRollerStatus: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    outboardStatus: {

        type: Number,
        enum: [1, 2],
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


    cleanChain: {

        type: Number,
        enum: [1, 2],
        required: false,

    },

    wireMeasurementUnit: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: false,
    },

    conductor2: {
        type: Number,
        required: false,
    },

    conductor4: {
        type: Number,
        required: false,
    },

    conductor7: {
        type: Number,
        required: false,
    },

    conductor12: {
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

const CC5_CL = mongoose.models.CC5_CL || mongoose.model('CC5_CL', CC5_CLSchema);
module.exports = CC5_CL;