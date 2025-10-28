const mongoose = require('mongoose');
const templateC = require("./templateC.js");

const FC_317_Schema = new mongoose.Schema({

      templateCDAta: templateC

});

const FC_317 = mongoose.models.FC_317 || mongoose.model('FC_317', FC_317_Schema);
module.exports = FC_317;
