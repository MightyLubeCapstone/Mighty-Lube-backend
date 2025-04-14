const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_314Schema = new mongoose.Schema({
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

    actuatorStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    pivotStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    kingPinStatus: {
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

    pfInvertedB: {
        type: Number,
        required: true,
    },

    pfInvertedE: {
        type: Number,
        required: true,
    },

    pfInvertedG: {
        type: Number,
        required: true,
    },

    pfInvertedH: {
        type: Number,
        required: true,
    },

    pfInvertedK: {
        type: Number,
        required: true,
    },

    pfInvertedT: {
        type: Number,
        required: true,
    },

    pfInvertedU: {
        type: Number,
        required: true,
    },

    pfInvertedV: {
        type: Number,
        required: true,
    },

    pfInvertedW: {
        type: Number,
        required: true,
    },
});

const PAF_314 = mongoose.model('tblPAF_314', PAF_314Schema);

module.exports = PAF_314;
