const mongoose = require('mongoose');
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const OHP_ESSchema = new mongoose.Schema({
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

    operatingVoltSingle: {
        type: Number,
        required: true,
    },

    controlVoltSingle: {
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


    ohpUnitType: {
        type: Number, // Converted to simple type instead of ref
        required: true,
    },

    chainDrop: {
        type: Number,
        required: true,
    },

    ohpDiameter: {
        type: Number,
        required: true,
    },

    ohpWidth: {
        type: Number,
        required: true,
    },

    ohpHeight: {
        type: Number,
        required: true,
    },
});

const OHP_ES = mongoose.model('tblOHP_ES', OHP_ESSchema);

module.exports = OHP_ES;
