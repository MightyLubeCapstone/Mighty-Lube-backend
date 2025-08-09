const mongoose = require('mongoose');
const templateA = require("./templateA.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const ETI_91_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: true,
    },
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    otherIndustrialChainManufacturer: {
        type: String,
        required: function () {
            return this.industrialChainManufacturer === 5;
        },
    },
    conveyorLength: {
        type: Number,
        required: true,
    },
    conveyorLengthUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,

    }
});

const ETI_91 = mongoose.models.ETI_91 || mongoose.model('ETI_91', ETI_91_Schema);
module.exports = ETI_91;
