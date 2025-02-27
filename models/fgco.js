const mongoose = require('mongoose');
const uuid = require("uuid");
const fgcoMapping = require("../models/fgcoMapping");

const FGCOSchema = new mongoose.Schema({

    conveyorName: {

        type: String,
        required: false,

    },

    chainSize: {

        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,

    },

    otherChainSize: {
        type: String,
        required: function () {
            return this.chainSize === 5;
        },
    },

    chainManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,

    },

    otherChainManufacturer: {
        type: String,
        required: function () {
            return this.chainManufacturer === 10;
        },
    },

    conveyorLoaded: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    dripLineStatus: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    operatingVoltTriple: {

        type: Number,
        required: true,

    },

    oppsSpecification: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    pushButtonSwitch: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    enclosedShroud: {

        type: Number,
        enum: [1, 2],
        required: false,

    },

    additionalOtherInfo: {

        type: String,
        required: false,

    }

});

FGCOSchema.methods.getDecodedInfo = function () {
    function mapValues(field, selectedValue) {
        if (!fgcoMapping[field]) return selectedValue;

        return Object.entries(fgcoMapping[field]).map(([key, value]) => ({
            key: parseInt(key),
            value: value,
            isSelected: parseInt(key) === selectedValue
        }));
    }

    let mappedInfo = { ...this.productConfigurationInfo };
    Object.keys(fgcoMapping).forEach(field => {
        if (mappedInfo[field] !== undefined) {
            mappedInfo[field] = mapValues(field, mappedInfo[field]);
        }
    });
    return mappedInfo;
}

const FGCO = mongoose.models.FGCO || mongoose.model('FGCO', FGCOSchema);
module.exports = FGCO;