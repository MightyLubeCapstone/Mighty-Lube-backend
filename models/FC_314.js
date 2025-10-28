const mongoose = require('mongoose');
const templateB = require("./templateB.js");



const FC_314_Schema = new mongoose.Schema({
    

    templateBDAta: templateB

});

const FC_314 = mongoose.models.FC_314 || mongoose.model('FC_314', FC_314_Schema);
module.exports = FC_314;
