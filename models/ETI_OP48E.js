const mongoose = require('mongoose');
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");  



const ETI_OP48E_Schema = new mongoose.Schema({
    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: false,
    },
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },
    // otherIndustrialChainManufacturer: {
    //     type: String,
    //     required: function () {
    //         return this.industrialChainManufacturer === 9;
    //     },
    // },
    conveyorLength: {
        type: Number,
        required: false,
    },
    conveyorLengthUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: false,

    },
    conveyorSpeed: {
        type: Number,
        required: false,
    },
    conveyorSpeedUnit: {

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

  ovenStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.appEnviroment === 3;
    },
  },

  ovenTemp: {
    type: Number,
    required: function () {
      return this.appEnviroment === 3;
    },
  },

  otherAppEnviroment: {
    type: String,
    required: function () {
      return this.appEnviroment === 7;
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
    operatingVoltage: {
        type: Number,
        required: false,
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



    
    freeCarrierSystem: {
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
    sideLubeStatus: {
        type: Number,
        enum: [1, 2],
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
    enclosedUnitType: {
        type: Number,
        required: false,
    },
    enclosedTrackB: {
        type: Number,
        required: false,
    },
    enclosedTrackG: {
        type: Number,
        required: false,
    },
    enclosedTrackH: {
        type: Number,
        required: false,
    },
    enclosedTrackS: {
        type: Number,
        required: false,
    },
    enclosedTrackK2: {
        type: Number,
        required: false,
    },
    enclosedTrackL2: {
        type: Number,
        required: false,
    },
    enclosedTrackM2: {
        type: Number,
        required: false,
    },
    enclosedTrackN2: {
        type: Number,
        required: false,
    },
    enclosedTrackS2: {
        type: Number,
        required: false,
    },
});

const ETI_OP48E = mongoose.models.ETI_OP48E || mongoose.model('ETI_OP48E', ETI_OP48E_Schema);
module.exports = ETI_OP48E;
