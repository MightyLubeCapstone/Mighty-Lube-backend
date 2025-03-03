const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const IBR_RFC_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    chainSize: {
        type: Number,
        required: false,
    },
    // add enum and check
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: false,
    },
    otherChainManufacturer: {
        type: String,
        required: function () {
            return this.industrialChainManufacturer === 9;
        },
    },
    conveyorLength: {
        type: Number,
        required: false,
    },
    measurementUnit: {
        type: Number,
        required: false,
    },
    conveyorSpeed: {
        type: Number,
        required: false,
    },
    speedUnit: {
        type: Number,
        required: false,
    },
    conveyorIndex: {
        type: Number,
        required: false,
    },
    travelDirection: {
        type: Number,
        enum: [1, 2],
        required: false,
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
    monitorData: templateB,


    

    surroundingTemp: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    conveyorLoaded: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    conveyorSwing: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    strandStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    plantLayout: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    requiredPics: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    operatingVoltage: {
        type: Number,
        required: false,
    },
    controlVoltage: {
        type: Number,
        required: false,
    },
    wheelOpenType: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
    },
    wheelClosedType: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
    },
    openStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    powerChainStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    chainPinStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    catDriveStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    catDriveNum: {
        type: Number,
        required: false,
    },
    railLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    externalLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
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
    reservoirSize: {
        type: Number,
        required: false,
    },
    reservoirQuantity: {
        type: Number,
        required: false,
    },
    chainCleanStatus: {
        type: Number,
        enum: [1, 2],
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
    ibrUnitType: {
        type: Number,
        required: false,
    },
    ibrChainA1: {
        type: Number,
        required: false,
    },
    ibrChainB1: {
        type: Number,
        required: false,
    },
    ibrChainC1: {
        type: Number,
        required: false,
    },
    ibrChainD1: {
        type: Number,
        required: false,
    },
    ibrChainF1: {
        type: Number,
        required: false,
    },
});

const IBR_RFC = mongoose.models.IBR_RFC || mongoose.model('IBR_RFC', IBR_RFC_Schema);
module.exports = IBR_RFC;
