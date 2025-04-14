const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const getDecodedInfo = require("./getDecodedInfo.js");  

const ETI_807_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: true,
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
        required: true,
    },
    conveyorLengthUnit: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,

    },
});

const ETI_807 = mongoose.models.ETI_807 || mongoose.model('ETI_807', ETI_807_Schema);
module.exports = ETI_807;
