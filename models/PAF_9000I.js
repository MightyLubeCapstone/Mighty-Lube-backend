const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_9000ISchema = new mongoose.Schema({
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
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    conveyorSpeed: {
        type: Number,
        required: true,
    },

    conveyorSpeedUnit: {
        type: Number, // Converted to simple type instead of ref
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
    enum: [1,2,3],
    required: true,
},

    wheelClosedType: {
    type: Number, 
    enum: [1,2,3],
    required: true,
},

    powerChainStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    chainPinStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    catDriveStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    catDriveNum: {
        type: Number,
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

    reservoirSize: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    reservoirSizeQuantity: {
        type: Number,
        required: true,
    },

    chainCleanStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    specialControllerOption: {
        type: String,
        required: true,
    },

    specialControllerInfo: {
        type: String,
        required: true,
    },

    wireMeasurementUnitType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    twoConductor: {
        type: Number,
        required: true,
    },

    fourConductor: {
        type: Number,
        required: true,
    },

    sevenConductor: {
        type: Number,
        required: true,
    },

    twelveConductor: {
        type: Number,
        required: true,
    },

    junctionBoxNum: {
        type: Number,
        required: true,
    },

    pfUnitType: {
        type: Number, // Converted to simple type instead of ref
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

const PAF_9000I = mongoose.model('tblPAF_9000I', PAF_9000ISchema);

module.exports = PAF_9000I;
