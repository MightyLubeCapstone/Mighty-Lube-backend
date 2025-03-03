const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const FT_FTL_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    chainSize: {
        type: Number,
        required: false,
        // add enum and check
    },
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },
    otherIndustrialChainManufacturer: {
        type: String,
        required: function () {
            return this.industrialChainManufacturer === 9;
        },
    },
    conveyorLength: {
        type: Number,
        required: false,
    },
    conveyorLengthUnit: {
        type: Number,
        required: false,
    },
    conveyorSpeed: {
        type: Number,
        required: false,
    },
    conveyorSpeedUnit: {
        type: Number,
        required: false,
    },
    conveyorIndex: {
        type: Number,
        required: false,
    },
    travelDirection: {
        type: Number,
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
    monitorData: templateB,


    
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
    outboardStatus: {
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
    reservoirSizeQuantity: {
        type: Number,
        required: false,
    },
    chainCleanStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    ctrStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    plcConnection: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    monitorControllerStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    otherControllerInfo: {
        type: String,
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
    ftUnitType: {
        type: Number,
        required: false,
    },
    ftTopG: {
        type: Number,
        required: false,
    },
    ftTopH: {
        type: Number,
        required: false,
    },
    ftTopA1: {
        type: Number,
        required: false,
    },
    ftTopB1: {
        type: Number,
        required: false,
    },
    ftTopH1: {
        type: Number,
        required: false,
    },
    ftTopJ1: {
        type: Number,
        required: false,
    },
    ftTopL1: {
        type: Number,
        required: false,
    },
    ftTopM1: {
        type: Number,
        required: false,
    },
    ftTopN1: {
        type: Number,
        required: false,
    },
    ftTopP1: {
        type: Number,
        required: false,
    },
    ftTopR1: {
        type: Number,
        required: false,
    },
    wireMeasurementUnit: {
        type: Number,
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
});

const FT_FTL = mongoose.models.FT_FTL || mongoose.model('FT_FTL', FT_FTL_Schema);
module.exports = FT_FTL;
