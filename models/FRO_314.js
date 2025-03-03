const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const FRO_314_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    wheelManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: false,
    },
    otherWheelManufacturer: {
        type: String,
        required: function () {
            return this.wheelManufacturer === 10;
        },
    },
    conveyorLength: {
        type: Number,
        required: false,
    },
    conveyorLengthUnit: {
        type: Number,
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
    travelDirection: {
        type: Number,
        enum: [1, 2],
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
    conveyorSwing: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    orientation: {
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
    airSupply: {
        type: Number,
        required: false,
    },
    monitorData: templateB,


    
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
    lubeViscosity: {
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
    zerkDirection: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    zerkLocation: {
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
    frUnitType: {
        type: Number,
        required: false,
    },
    frInvertedB: {
        type: Number,
        required: false,
    },
    frInvertedE: {
        type: Number,
        required: false,
    },
    frInvertedG: {
        type: Number,
        required: false,
    },
    frInvertedH: {
        type: Number,
        required: false,
    },
    frInvertedK: {
        type: Number,
        required: false,
    },
    frInvertedT: {
        type: Number,
        required: false,
    },
    frInvertedU: {
        type: Number,
        required: false,
    },
    frInvertedV: {
        type: Number,
        required: false,
    },
    frInvertedW: {
        type: Number,
        required: false,
    },
});

const FRO_314 = mongoose.models.FRO_314 || mongoose.model('FRO_314', FRO_314_Schema);
module.exports = FRO_314;
