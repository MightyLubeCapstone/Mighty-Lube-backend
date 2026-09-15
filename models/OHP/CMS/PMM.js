const mongoose = require("mongoose");

const OHP_PMMSchema = new mongoose.Schema({

  // ============================================================
  // GENERAL INFORMATION
  // ============================================================

  conveyorChainSize: {
    type: String,
    enum: [
      "Other",
    ],
  },

  otherConveyorChainSize: {
    type: String,
    trim: true,
    required: function () {
      return this.conveyorChainSize === "Other";
    },
  },

  chainManufacturer: {
    type: String,
    enum: [
      "Other",
    ],
  },

  otherChainManufacturer: {
    type: String,
    trim: true,
    required: function () {
      return this.chainManufacturer === "Other";
    },
  },


  // ============================================================
  // NEW MONITORING SYSTEM OR ADDING TO EXISTING
  // ============================================================

  connectingToExistingMonitoring: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
  },

  addNewMonitoringSystem: {
    type: String,
    enum: [
      "Yes",
      "No",
    ],
  },


  // ============================================================
  // CONFIGURATION
  // ============================================================

  dcuQuantity: {
    type: String,
    trim: true,
  },


  // ============================================================
  // TECHNICIAN NOTE
  // ============================================================

  technicianNote: {
    type: String,
    required: true,
    trim: true,
  },

});

const OHP_PMM =
  mongoose.models.tblOHP_PMM ||
  mongoose.model("tblOHP_PMM", OHP_PMMSchema);

module.exports = OHP_PMM