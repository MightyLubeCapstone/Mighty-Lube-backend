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
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorLoaded: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorSwing: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    plantLayout: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    requiredPics: {
        type: Number,
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
        type: Number,
        required: true,
    },
    newMonitor: {
        type: Number,
        required: true,
    },
    // MonFeatures
    motorAmp: {
        type: Number,
        required: true,
    },
    takeUpAir: {
        type: Number,
        required: true,
    },
    takeUpDist: {
        type: Number,
        required: true,
    },
    motorTemp: {
        type: Number,
        required: true,
    },
    motorVib: {
        type: Number,
        required: true,
    },
    detectFaultyTrolley: {
        type: Number,
        required: true,
    },
    // ConveyorSpecs
    sideLube: {
        type: Number,
        required: true,
    },
    topLube: {
        type: Number,
        required: true,
    },
    cleanChain: {
        type: Number,
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