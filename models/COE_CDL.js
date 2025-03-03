const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const COE_CDL_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    chainSize: {
        type: Number,
        required: false,
        // add enum and check
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
    controlVoltSingle: {
        type: Number,
        required: false,
    }
});

const COE_CDL = mongoose.models.COE_CDL || mongoose.model('COE_CDL', COE_CDL_Schema);
module.exports = COE_CDL;
