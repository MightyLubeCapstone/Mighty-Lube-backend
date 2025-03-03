const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_ES_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: true,
    },

    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },

    otherChainSize: {
        type: String,
        required: function () {
            return this.chainSize === 8;
        },
    },

    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },

    otherChainManufacturer: {
        type: String,
        required: function () {
            return this.industrialChainManufacturer === 9;
        },
    },

    conveyorLength: {
        type: Number,
        required: true,
    },

    conveyorLengthUnit: {
        type: Number, // Using simple type instead of ref
        required: true,
    },

    conveyorSpeed: {
        type: Number,
        required: true,
    },

    conveyorSpeedUnit: {
        type: Number, // Using simple type instead of ref
        required: true,
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

    newMonitorStatus: {
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

    orientationType: {
        type: Number,
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

    monitorData: templateB,


    

    wheelOpenType: {
        type: Number,
        required: true,
    },

    wheelClosedType: {
        type: Number,
        required: true,
    },

    openStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

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
        type: Number,
        required: true,
    },

    closedRaceStyleType: {
        type: Number,
        required: true,
    },

    holeStatus: {
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

    railLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    externalLubeStatus: {
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

    sideLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    topLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    chainMaster: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    timerStatus: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
    },

    electricStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    pneumaticStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
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
        type: Number, // Using simple type instead of ref
        required: true,
    },

    pfOverheadL: {
        type: Number,
        required: true,
    },

    pfOverheadG: {
        type: Number,
        required: true,
    },

    pfOverheadH: {
        type: Number,
        required: true,
    },

    pfInvertedB: {
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
});

const PAF_ES = mongoose.model('tblPAF_ES', PAF_ES_Schema);

module.exports = PAF_ES;
