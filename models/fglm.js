const mongoose = require('mongoose');
const templateA = require("./templateA.js");
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

    otherChainSize: {

        type: String,
        required: function () {

            return this.chainSize === 5;

        }

    },

    chainManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,

    },

    otherChainManufacturer: {

        type: String,
        required: function () {
            return this.chainManufacturer === 10;
        }

    },

    wheelManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,

    },

    otherWheelManufacturer: {
        type: String,

        required: function () {
            return this.wheelManufacturer === 10;
        }

    },

    chainPinType: {

        type: Number,
        enum: [1, 2, 3],
        required: true,
        

    },

    conveyorLength: {

        type: Number,
        required: true,
        

    },

    conveyorLengthUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        

    },

    conveyorSpeed: {

        type: Number,
        required: true,
        

    },

    conveyorSpeedUnit: {

        type: Number,
        enum: [1, 2],
        required: true,
        

    },

    conveyorIndex: {

        type: String,
        required: true,
        

    },

    travelDirection: {

        type: Number,
        enum: [1, 2],
        required: true,
        

    },

    metalType: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        

    },

    otherMetalType: {

        type: String,
        required: function () {
            return this.metalType === 4;
        }

    },

    conveyorStyle: {

        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
        

    },

    otherConveyorStyle: {

        type: String,
        required: function () {
            return this.conveyorStyle === 5;
        }

    },

    trolleyColor: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        

    },

    otherTrolleyColor: {

        type: String,
        required: function () {
            return this.trolleyColor === 4;
        }

    },

    trolleyType: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
        required: true,
        

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

    // CPU
    operatingVoltage: {

        type: Number,
        required: true,

    },

    monitorData: templateA,
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