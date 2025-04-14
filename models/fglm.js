const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const getDecodedInfo = require("./getDecodedInfo.js");  //have to add this for the dynamic mapping, required in every model

const FGLMSchema = new mongoose.Schema({
    // Gen Info
    conveyorName: {

        type: String,
        required: true,

    },

    chainSize: {

        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,

    },

    // otherChainSize: {

    //     type: String,
    //     required: function () {

    //         return this.chainSize === 5;

    //     }

    // },

    chainManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,

    },

    // otherChainManufacturer: {

    //     type: String,
    //     required: function () {
    //         return this.chainManufacturer === 10;
    //     }

    // },

    // wheelManufacturer: {

    //     type: Number,
    //     enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //     required: true,

    // },

    // otherWheelManufacturer: {
    //     type: String,

    //     required: function () {
    //         return this.wheelManufacturer === 10;
    //     }

    // },

    chainPinType: {

        type: Number,
        enum: [1, 2, 3],
        required: true,
        // add RegEx matching to this :D

    },

    conveyorLength: {

        type: Number,
        required: true,
        // add RegEx matching to this :D

    },

    conveyorLengthUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        // add RegEx matching to this :D

    },

    conveyorSpeed: {

        type: Number,
        required: true,
        // add RegEx matching to this :D

    },

    conveyorSpeedUnit: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    conveyorIndex: {

        type: String,
        required: true,
        // add RegEx matching to this :D

    },

    travelDirection: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    metalType: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        // add RegEx matching to this :D

    },

    // otherMetalType: {

    //     type: String,
    //     required: function () {
    //         return this.metalType === 4;
    //     }

    // },

    conveyorStyle: {

        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
        // add RegEx matching to this :D

    },

    // otherConveyorStyle: {

    //     type: String,
    //     required: function () {
    //         return this.conveyorStyle === 5;
    //     }

    // },

    trolleyColor: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        // add RegEx matching to this :D

    },

    // otherTrolleyColor: {

    //     type: String,
    //     required: function () {
    //         return this.trolleyColor === 4;
    //     }

    // },

    trolleyType: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
        required: true,
        // add RegEx matching to this :D

    },

    surroundingTemp: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    conveyorLoaded: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    conveyorSwing: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    plantLayout: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    requiredPics: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    // CPU
    operatingVoltage: {

        type: Number,
        required: true,

    },

    // MonSys

    // existingMonitor: {

    //     type: Number,
    //     enum: [1, 2],
    //     required: true,

    // },

    // newMonitor: {
    //     type: Number,
    //     enum: [1, 2],
    //     required: true,
    
    // },


    //monitorData: templateB, | UNCOMMENT THIS LATER ONCE WE ADD THE TEMPLATES TO THE FRONTEND

    // ConveyorSpecs
    sideLube: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    topLube: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    cleanChain: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    // Wire
    wireMeasurementUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,

    },

    conductor4: {

        type: Number,
        required: true,

    },

    conductor7: {

        type: Number,
        required: true,

    },

    conductor2: {

        type: Number,
        required: true,

    },

});

const FGLM = mongoose.models.FGLM || mongoose.model('FGLM', FGLMSchema);
module.exports = FGLM;