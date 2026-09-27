const mongoose = require("mongoose");

// ============================================================
// PFO - CONVEYOR MONITOR SYSTEMS
//
// PAINT MARKER FOR MONITORING SYSTEM (OPTIONAL)
//
// Product ID:
// PFO_CMS_PMMS
//
// PURPOSE:
//
// This is the product-specific VALIDATION model.
//
// It validates the configuration received from the Flutter
// Product Configurator.
//
// IMPORTANT:
//
// This model is NOT directly persisted.
//
// After validation, the backend route converts the validated
// document into a plain JavaScript object and stores it inside:
//
// ProductConfiguration.configurationData
// ============================================================

const PFO_CMS_PMMS_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    // --------------------------------------------------------
    // Name of Conveyor System
    // --------------------------------------------------------

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // Conveyor Chain Size
    //
    // Frontend supports "Other".
    // Custom value is stored directly in this field.
    // --------------------------------------------------------

    conveyorChainSize: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // Chain Manufacturer
    //
    // Frontend supports "Other".
    // Custom value is stored directly in this field.
    // --------------------------------------------------------

    chainManufacturer: {
      type: String,
      trim: true,
      required: true,
    },

    // --------------------------------------------------------
    // Conveyor Orientation
    // --------------------------------------------------------

    conveyorOrientation: {
      type: String,
      enum: [
        "Overhead",
        "Inverted",
        "Inverted/Inverted",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// MODEL REGISTRATION
// ============================================================

const PFO_CMS_PMMS =
  mongoose.models.PFO_CMS_PMMS ||
  mongoose.model(
    "PFO_CMS_PMMS",
    PFO_CMS_PMMS_Schema
  );

module.exports = PFO_CMS_PMMS;