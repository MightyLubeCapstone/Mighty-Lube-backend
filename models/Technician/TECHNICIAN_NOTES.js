const mongoose = require("mongoose");

// ============================================================
// TECHNICIAN
// TECHNICIAN NOTES
//
// Product ID:
// TECHNICIAN_NOTES
//
// PURPOSE:
//
// This is the product-specific validation model for
// Technician Notes.
//
// This model validates the configuration received from the
// Flutter Product Configurator.
//
// IMPORTANT:
//
// This model is NOT directly persisted.
//
// After successful validation, the route converts the
// validated document into a plain JavaScript object and stores
// it inside:
//
// ProductConfiguration.configurationData
// ============================================================

const TECHNICIAN_NOTES_Schema = new mongoose.Schema(
  {
    // ========================================================
    // TECHNICIAN NOTES
    // ========================================================

    // --------------------------------------------------------
    // Notes
    //
    // Free-form multiline text entered by the technician.
    // --------------------------------------------------------

    notes: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// MODEL REGISTRATION
//
// Reuse the model if it has already been registered.
//
// This prevents Mongoose OverwriteModelError during
// development/server reloads.
// ============================================================

const TECHNICIAN_NOTES =
  mongoose.models.TECHNICIAN_NOTES ||
  mongoose.model(
    "TECHNICIAN_NOTES",
    TECHNICIAN_NOTES_Schema
  );

module.exports = TECHNICIAN_NOTES;