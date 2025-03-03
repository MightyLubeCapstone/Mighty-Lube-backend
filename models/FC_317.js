const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const FC_317_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    wheelManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,
    },
    otherWheelManufacturer: {
        type: String,
        required: function () {
            return this.wheelManufacturer === 10;
        },
    },
    conveyorSpeed: {
        type: Number,
        required: false,
    },
    conveyorSpeedUnit: {
        type: Number,
        required: false,
    },
    conveyorIndex: {
        type: Number,
        required: false,
    },
    travelDirection: {
        type: Number,
        required: false,
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
        required: false,
    },
    orientationType: {
        type: Number,
        required: false,
    },
    evenGuideWheelStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    operatingVoltage: {
        type: Number,
        required: false,
    },
    monitorData: templateB,


    
    carrierWheelStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    kingPinStatus: {
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
    openRaceStyleType: {
        type: Number,
        required: false,
    },
    closedRaceStyleType: {
        type: Number,
        required: false,
    },
    holeStatus: {
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
    fcGreaserF: {
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
});

const FC_317 = mongoose.models.FC_317 || mongoose.model('FC_317', FC_317_Schema);
module.exports = FC_317;
