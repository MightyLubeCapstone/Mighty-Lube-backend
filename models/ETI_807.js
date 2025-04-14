const mongoose = require("mongoose");
const templateB = require("./templateB.js");
const ETI_807_Schema = new mongoose.Schema({
  conveyorName: {
    type: String,
    required: false,
  },
  industrialChainManufacturerET: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  otherIndustrialChainManufacturerET: {
    type: String,
    required: function () {
      return this.industrialChainManufacturerET === 5;
    },
  },
  conveyorLength: {
    type: Number,
    required: false,
  },

  conveyorLengthUnit: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: false,
  },
});

const ETI_807 =
  mongoose.models.ETI_807 || mongoose.model("ETI_807", ETI_807_Schema);
module.exports = ETI_807;
