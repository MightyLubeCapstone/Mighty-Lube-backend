const mongoose = require('mongoose');
const uuid = require("uuid");

const FGCOSchema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    
    chainSizeType: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        required: true,
    },

    otherChainSize: {
        type: String,
        required: this.chainSizeType === 4
    },

    chainManufacturerType: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },

    otherManufacturerType: {
        type: String,
        required: function ()
        {
            return this.chainManufacturerType === 9;
        }
    },

    loadedStatus: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    dripLineStatus: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    operatingVoltTriple: {
        type: Number,
        required: true,
    },
    oppsSpecification: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    pushButtonSwitch: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    enclosedShroud: {
        type: Number,
        enum: [0],
        required: false,
    },
    additionalOtherInfo: {
        type: Number,
        required: false,
    }

});

const FGCO = mongoose.models.FGCO || mongoose.model('FGCO', FGCOSchema);
module.exports = FGCO;