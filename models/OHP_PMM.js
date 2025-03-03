const mongoose = require('mongoose');
const templateB = require("./templateB.js");
const OHP_PMMSchema = new mongoose.Schema({
    chainSize: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },

    otherChainSize: {
        type: String,
        required: function () {
            return this.chainSize === 8;
        },
    },

    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },

    otherChainManufacturer: {
        type: String,
        required: function () {
            return this.industrialChainManufacturer === 9;
        },
    },

    monitorData: templateB,




    dcuNum: {
        type: Number,
        required: true,
    },
>>>>>>> main
});

const OHP_PMM = mongoose.model('tblOHP_PMM', OHP_PMMSchema);

module.exports = OHP_PMM;
