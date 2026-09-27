const mongoose = require("mongoose");

const OHP_PMMSchema = new mongoose.Schema(
  {
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    // "Other" exists -> custom value can be stored in same field.
    conveyorChainSize: {
      type: String,
      required: true,
      trim: true,
    },

    // "Other" exists -> custom value can be stored in same field.
    chainManufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================================
    // NEW OR EXISTING MONITORING SYSTEM
    // ============================================================

    connectingToExistingMonitoring: {
      type: String,
      required: true,
      enum: [
        "Yes",
        "No",
      ],
    },

    addNewMonitoringSystem: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
    },

    // ============================================================
    // TECHNICIAN NOTE
    // ============================================================

    technicianNote: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OHP_PMM =
  mongoose.models.tblOHP_PMM ||
  mongoose.model("tblOHP_PMM", OHP_PMMSchema);

module.exports = OHP_PMM;