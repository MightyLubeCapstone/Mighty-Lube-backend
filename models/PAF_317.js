const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_317Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: true,
    },

    wheelManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: false,
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
        // add RegEx matching to this :D

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

    surroundingTemp: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    conveyorSwing: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    orientationType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    operatingVoltSingle: {
        type: Number,
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



    

    freeWheelStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    guideRollerStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    openRaceStyleType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    closedRaceStyleType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    holeStatus: {
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

    currentGrease: {
        type: String,
        required: true,
    },

    currentGreaseGrade: {
        type: Number,
        required: true,
    },

    zerkDirection: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    zerkLocationType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    chainMaster: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    remoteStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    mountStatus: {
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
        required: true,
    },

    electricStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    preMountType: {
        type: Number, // Converted to simple type instead of ref
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

    pfUnitType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    pfInvertedA: {
        type: Number,
        required: true,
    },

    pfInvertedB: {
        type: Number,
        required: true,
    },

    pfInvertedE: {
        type: Number,
        required: true,
    },

    pfInvertedS: {
        type: Number,
        required: true,
    },
});

const PAF_317 = mongoose.model('tblPAF_317', PAF_317Schema);

module.exports = PAF_317;
