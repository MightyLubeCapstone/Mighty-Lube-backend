const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const IBR_OP4OE_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: false,
    },
    // add enum and check
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: false,
    },
    // otherChainManufacturer: {
    //     type: String,
    //     required: function () {
    //         return this.industrialChainManufacturer === 9;
    //     },
    // },
    conveyorLength: {
        type: Number,
        required: false,
    },
    measurementUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: false,

    },
    conveyorSpeed: {
        type: Number,
        required: false,
    },
    speedUnit: {

        type: Number,
        enum: [1, 2],
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
        enum: [1, 2, 3, 4, 5, 6, 7],
        required: true,

    },
    // ovenStatus: {
    //     type: Number,
    //     enum: [1, 2],
    //     required: function () {
    //         return this.appEnviroment === 1;
    //     },
    // },
    // ovenTemp: {
    //     type: Number,
    //     required: function () {
    //         return this.appEnviroment === 1;
    //     },
    // },
    existingMonitor: {

        type: Number,
        enum: [1, 2],
        required: false,

    },

    newMonitor: {
        type: Number,
        enum: [1, 2],
        required: false,
    
    },
   // monitorData: templateB,



    










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
    freeWheelStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    guideRollerStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    openRaceStyle: {
        type: Number,
        required: false,
    },
    closedRaceStyle: {
        type: Number,
        required: false,
    },
    holeStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    actuatorStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    pivotStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    kingPinStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    outboardStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    railLubeStatus: {
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
    chainMaster: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    timerStatus: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
    },
    electricStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    pneumaticStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    plcConnection: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    otherControllerInfo: {
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

const IBR_OP4OE = mongoose.models.IBR_OP4OE || mongoose.model('IBR_OP4OE', IBR_OP4OE_Schema);
module.exports = IBR_OP4OE;
