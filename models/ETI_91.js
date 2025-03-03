const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const ETI_91_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
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
        required: false,
    },
    conveyorLengthUnit: {
        type: Number,
        required: false,
    },
});

const ETI_91 = mongoose.models.ETI_91 || mongoose.model('ETI_91', ETI_91_Schema);
module.exports = ETI_91;
