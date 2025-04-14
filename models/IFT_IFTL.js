const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const IFT_IFTL_Schema = new mongoose.Schema({
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
    sliderPlateStatus: {
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
        enum: [1, 2, 3],
        required: false,
    },
    closedRaceStyle: {
        type: Number,
        enum: [1, 2, 3],
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
    rollerChainStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    brushingsStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    riderPlatesStatus: {
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
    railLubeStatus: {
        type: Number,
        enum: [1, 2],
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
    topLubeStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    
    chainCleanStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },

    washdownStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    iftUnitType: {
        type: Number,
        required: false,
    },
    iftPowerA: {
        type: Number,
        required: false,
    },
    iftPowerB: {
        type: Number,
        required: false,
    },
    iftPowerG: {
        type: Number,
        required: false,
    },
    iftPowerH: {
        type: Number,
        required: false,
    },
    iftPowerJ: {
        type: Number,
        required: false,
    },
    iftPowerS1: {
        type: Number,
        required: false,
    },
    iftPowerT1: {
        type: Number,
        required: false,
    },
    iftPowerU1: {
        type: Number,
        required: false,
    },
    iftPowerW1: {
        type: Number,
        required: false,
    },
    iftPowerX1: {
        type: Number,
        required: false,
    },
});

const IFT_IFTL = mongoose.models.IFT_IFTL || mongoose.model('IFT_IFTL', IFT_IFTL_Schema);
module.exports = IFT_IFTL;
