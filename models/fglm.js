const mongoose = require('mongoose');
const uuid = require("uuid");

const FGLMSchema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: true,
    },
    conveyorChainPinType: {
        type: String,
        required: true,
        // add RegEx matching to conveyorChainPinType
    },
    //...
});

const FGLM = mongoose.models.FGLM || mongoose.model('FGLM', FGLMSchema);
module.exports = FGLM;