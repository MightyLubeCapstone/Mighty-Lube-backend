const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const getDecodedInfo = require("./getDecodedInfo.js");  


const FC_314_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
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
        required: false,
    },
    orientationType: {
        type: Number,
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
    compressedAir: {
        type: Number,
        required: false,
    },
    airSupplyType: {
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
   // monitorData: templateB,
    
    carrierWheelStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    freeWheelStatus: {
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
    lubeBrand: {
        type: String,
        required: false,
    },
    lubeType: {
        type: String,
        required: false,
    },
    currentGrease: {
        type: String,
        required: false,
    },
    currentGreaseGrade: {
        type: Number,
        required: false,
    },
    currentOil: {
        type: String,
        required: false,
    },
    oilViscosity: {
        type: String,
        required: false,
    },
    zerkDirection: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    zerkLocationType: {
        type: Number,
        required: false,
    },
    chainMaster: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    remoteStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    mountStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    otherUnitStatus: {
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
    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    preMountType: {
        type: Number,
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
    fcUnitType: {
        type: Number,
        required: false,
    },
    fcGreaserE: {
        type: Number,
        required: false,
    },
    fcGreaserG: {
        type: Number,
        required: false,
    },
    fcGreaserH: {
        type: Number,
        required: false,
    },
    fcGreaserK: {
        type: Number,
        required: false,
    },
    fcGreaserT: {
        type: Number,
        required: false,
    },
    fcGreaserU: {
        type: Number,
        required: false,
    },
    fcGreaserV: {
        type: Number,
        required: false,
    },
    fcGreaserW: {
        type: Number,
        required: false,
    },
});

const FC_314 = mongoose.models.FC_314 || mongoose.model('FC_314', FC_314_Schema);
module.exports = FC_314;
