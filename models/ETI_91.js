const mongoose = require("mongoose");
const ETI_91_Schema = new mongoose.Schema({
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

const ETI_91 =
  mongoose.models.ETI_91 || mongoose.model("ETI_91", ETI_91_Schema);
module.exports = ETI_91;
