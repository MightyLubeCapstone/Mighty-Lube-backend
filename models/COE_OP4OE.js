const mongoose = require('mongoose');

const COE_OP4OE_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: true,
    },
    chainSize: {
        type: Number,
        required: true,
        // add enum and check
    },
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },
    otherIndustrialChainManufacturer: {
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
        type: Number,
        required: true,
    },
    conveyorSpeed: {
        type: Number,
        required: true,
    },
    conveyorSpeedUnit: {
        type: Number,
        required: true,
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
        required: true,
    },


    monitorData: templateB,





    catDriveStatus: {
        type: Number,
        enum: [1, 2],
        required: true,
    },


    //template C needs to be added here when we get it if they enter yes for catDriveStatus



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
    openStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    holeStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    railLubeStatus: {
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
    coeUnitType: {
        type: Number,
        required: false,
    },
    coeLineA: {
        type: Number,
        required: false,
    },
    coeLineG: {
        type: Number,
        required: false,
    },
    coeLineH: {
        type: Number,
        required: false,
    },
    coeLineJ: {
        type: Number,
        required: false,
    },
    coeLineX: {
        type: Number,
        required: false,
    },
    coeLineY: {
        type: Number,
        required: false,
    },
    coeLineZ: {
        type: Number,
        required: false,
    },
});

const COE_OP4OE = mongoose.models.COE_OP4OE || mongoose.model('COE_OP4OE', COE_OP4OE_Schema);
module.exports = COE_OP4OE;
