const mongoose = require('mongoose');
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const OHP_GPCSchema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: true,
    },

    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },

    // otherChainSize: {
    //     type: String,
    //     required: function () {
    //         return this.chainSize === 8;
    //     },
    // },

    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },

    // otherChainManufacturer: {
    //     type: String,
    //     required: function () {
    //         return this.industrialChainManufacturer === 9;
    //     },
    // },

    wheelManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,
    },

    // otherWheelManufacturer: {
    //     type: String,
    //     required: function () {
    //         return this.wheelManufacturer === 10;
    //     },
    // },

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

    orientation: {
        type: Number,
        required: true,
    },

    conveyorLoaded: {
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
   // monitorData: templateA,



    

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
        required: false,
    },

    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
        required: true,
    },

    preMountType: {
        type: Number,
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

const OHP_GPC = mongoose.model('tblOHP_GPC', OHP_GPCSchema);

module.exports = OHP_GPC;
