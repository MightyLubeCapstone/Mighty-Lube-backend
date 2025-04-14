const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const PAF_PMM_Schema = new mongoose.Schema({

    conveyorName: {
        type: String,
        required: true,
    },

    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },

    // otherChainSize: {
    //     type: String,
    //     required: function () {
    //         return this.chainSize === 8;
    //     },
    // },

    orientationType: {
        type: Number,
        required: true,
    },
});

const PAF_PMM = mongoose.model('tblPAF_PMM', PAF_PMM_Schema);

module.exports = PAF_PMM;
