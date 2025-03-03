const mongoose = require('mongoose');

const ETI_807_Schema = new mongoose.Schema({
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

const ETI_807 = mongoose.models.ETI_807 || mongoose.model('ETI_807', ETI_807_Schema);
module.exports = ETI_807;
