const mongoose = require('mongoose');
const uuid = require("uuid");

const FGLMSchema = new mongoose.Schema({
    // Gen Info
    conveyorName: {
        type: String,
        required: true,
    },
    chainSize: {
        type: Number,
        required: true,
    },
    chainManufacturer: {
        type: Number,
        required: true,
    },
    chainPinType: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorLength: {
        type: String,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorLengthUnit: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorSpeed: {
        type: String,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorSpeedUnit: {
        type: Number,
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
        required: true,
        // add RegEx matching to this :D
    },
    metalType: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorStyle: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    trolleyColor: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    trolleyType: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    surroundingTemp: {
        type: Boolean,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorLoaded: {
        type: Boolean,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorSwing: {
        type: Boolean,
        required: true,
        // add RegEx matching to this :D
    },
    plantLayout: {
        type: Boolean,
        required: true,
        // add RegEx matching to this :D
    },
    requiredPics: {
        type: Boolean,
        required: true,
        // add RegEx matching to this :D
    },
    // CPU
    operatingVoltage: {
        type: String,
        required: true,
    },
    // MonSys
    existingMonitor: {
        type: Boolean,
        required: true,
    },
    newMonitor: {
        type: Boolean,
        required: true,
    },
    // MonFeatures
    motorAmp: {
        type: Boolean,
        required: true,
    },
    takeUpAir: {
        type: Boolean,
        required: true,
    },
    takeUpDist: {
        type: Boolean,
        required: true,
    },
    motorTemp: {
        type: Boolean,
        required: true,
    },
    motorVib: {
        type: Boolean,
        required: true,
    },
    detectFaultyTrolley: {
        type: Boolean,
        required: true,
    },
    // ConveyorSpecs
    sideLube: {
        type: Boolean,
        required: true,
    },
    topLube: {
        type: Boolean,
        required: true,
    },
    cleanChain: {
        type: Boolean,
        required: true,
    },
    // Wire
    measureUnit: {
        type: Number,
        required: true,
    },
    conductor4: {
        type: String,
        required: true,
    },
    conductor7: {
        type: String,
        required: true,
    },
    conductor2: {
        type: String,
        required: true,
    },
});

const FGLM = mongoose.models.FGLM || mongoose.model('FGLM', FGLMSchema);
module.exports = FGLM;