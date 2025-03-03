const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_GPCSchema = new mongoose.Schema({
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

    wheelManufacturer: {
        type: Number,
        required: true,
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

    compressedAir: {
        type: Number,
        required: true,
    },

    airSupplyType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    monitorData: templateB,


    

    currentGrease: {
        type: String,
        required: true,
    },

    currentGreaseGrade: {
        type: Number,
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

    otherControllerNotes: {
        type: String,
        required: true,
    },

    gpcUnitType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    chainDrop: {
        type: Number,
        required: true,
    },

    gpcDiameter: {
        type: Number,
        required: true,
    },

    gpcWheelC: {
        type: Number,
        required: true,
    },

    gpcWheelD: {
        type: Number,
        required: true,
    },

    gpcWheelE: {
        type: Number,
        required: true,
    },

    gpcWheelF: {
        type: Number,
        required: true,
    },

    gpcWheelG: {
        type: Number,
        required: true,
    },

    gpcWheelH: {
        type: Number,
        required: true,
    },

    gpcWheelS: {
        type: Number,
        required: true,
    },
});

const PAF_GPC = mongoose.model('tblPAF_GPC', PAF_GPCSchema);

module.exports = PAF_GPC;
