const mongoose = require("mongoose");
const uuid = require("uuid");


// =========================================================
// CONFIGURATION ACTOR
//
// Stores who created / last updated the configurator.
// This can be either a normal user or an admin.
// =========================================================

const configurationActorSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  {
    _id: false,
  }
);


// =========================================================
// PRODUCT CONFIGURATION
//
// ONE configured product = ONE document.
//
// Example:
//
// ETI_91
// configurationID: ABC-1
//
// MLCC5CL
// configurationID: ABC-2
//
// Both live inside the SAME MongoDB collection:
//
// product_configurations
// =========================================================

const ProductConfigurationSchema = new mongoose.Schema(
  {
    // =====================================================
    // PERMANENT UNIQUE CONFIGURATOR ID
    //
    // Every individual configured product gets its own
    // permanent ID.
    //
    // Frontend can send one or multiple IDs:
    //
    // configurationIDs: [
    //   "id-1",
    //   "id-2",
    //   "id-3"
    // ]
    //
    // Used for:
    //
    // - edit
    // - delete
    // - draft
    // - restore
    // - submit
    // - admin tracking
    // =====================================================

    configurationID: {
      type: String,
      required: true,
      default: uuid.v4,
      unique: true,
      index: true,
    },


    // =====================================================
    // OWNER
    //
    // Always taken from authenticated backend user:
    //
    // req.user.userID
    //
    // Never trust userID sent from frontend.
    // =====================================================

    userID: {
      type: String,
      required: true,
      index: true,
    },


    // =====================================================
    // HUMAN-READABLE CONFIGURATION NAME
    //
    // Example:
    //
    // Conveyor Line 1
    // Main Packaging Conveyor
    // Production Line A
    // =====================================================

    configurationName: {
      type: String,
      required: true,
      trim: true,
    },


    // =====================================================
    // PRODUCT IDENTIFICATION
    //
    // productType:
    // Stable backend identifier.
    //
    // Example:
    // ETI_91
    //
    // productName:
    // User-friendly product name.
    // =====================================================

    productType: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },


    // =====================================================
    // USER / CONFIGURATION STATE
    //
    // This status represents the configuration lifecycle
    // from the user's side.
    //
    // draft:
    // Saved as draft.
    //
    // cart:
    // Ready for selection / submission.
    //
    // submitted:
    // Submitted to the admin/business workflow.
    //
    // completed:
    // Existing legacy/current state kept for backward
    // compatibility. Admin processing now has its own
    // separate adminStatus field below.
    //
    // archived:
    // No longer active.
    // =====================================================

    status: {
      type: String,
      enum: [
        "draft",
        "cart",
        "submitted",
        "completed",
        "archived",
      ],
      default: "draft",
      required: true,
      index: true,
    },


    // =====================================================
    // ADMIN WORKFLOW STATUS
    //
    // Separate from the user's configuration status.
    //
    // Before submission:
    //
    // status = draft/cart
    // adminStatus = null
    //
    // Once user submits:
    //
    // status = submitted
    // adminStatus = requested
    //
    // Admin workflow:
    //
    // requested
    //     ↓
    // pending
    //     ↓
    // done
    //
    // IMPORTANT:
    //
    // Changing adminStatus should NOT change the user's
    // configuration status.
    // =====================================================

    adminStatus: {
      type: String,
      enum: [
        "requested",
        "pending",
        "done",
      ],
      default: null,
      index: true,
    },


    // =====================================================
    // FORM COMPLETION
    //
    // Separate from status.
    //
    // Examples:
    //
    // draft + false
    // = incomplete saved form
    //
    // draft + true
    // = completed configuration saved as draft
    //
    // cart + true
    // = completed and added to cart
    // =====================================================

    isComplete: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },


    // =====================================================
    // DRAFT INFORMATION
    //
    // draftID groups multiple individual configurators
    // under one saved draft.
    //
    // Example:
    //
    // A101 ─┐
    // A102 ─┼── draftID: D500
    // A103 ─┘
    //
    // configurationID still remains unique for every item.
    //
    // When item is moved back to cart, these fields can
    // be cleared.
    // =====================================================

    draftID: {
      type: String,
      default: null,
      index: true,
    },

    draftTitle: {
      type: String,
      default: null,
      trim: true,
    },


    // =====================================================
    // QUANTITY
    // =====================================================

    numRequested: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },


    // =====================================================
    // PRODUCT-SPECIFIC CONFIGURATION DATA
    //
    // ETI_91 example:
    //
    // {
    //   conveyorName: "...",
    //   chainSize: "...",
    //   conveyorLength: "...",
    //   conveyorSpeed: "..."
    // }
    //
    // Every product can have completely different fields.
    // =====================================================

    configurationData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },


    // =====================================================
    // AUDIT INFORMATION
    // =====================================================

    createdBy: {
      type: configurationActorSchema,
      required: true,
    },

    updatedBy: {
      type: configurationActorSchema,
      required: true,
    },


    // =====================================================
    // USER WORKFLOW TIMESTAMPS
    // =====================================================

    submittedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },


    // =====================================================
    // ADMIN WORKFLOW TIMESTAMPS
    //
    // adminRequestedAt:
    // Configuration entered the admin queue.
    //
    // adminStartedAt:
    // Admin changed requested -> pending.
    //
    // adminCompletedAt:
    // Admin changed status -> done.
    // =====================================================

    adminRequestedAt: {
      type: Date,
      default: null,
    },

    adminStartedAt: {
      type: Date,
      default: null,
    },

    adminCompletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,

    // Every configured product goes into ONE collection.
    collection: "product_configurations",
  }
);


// =========================================================
// INDEXES
// =========================================================


// Fetch user's cart / drafts / submitted items
ProductConfigurationSchema.index({
  userID: 1,
  status: 1,
});


// Fetch user's configurations for particular product
ProductConfigurationSchema.index({
  userID: 1,
  productType: 1,
});


// User + product + status filtering
ProductConfigurationSchema.index({
  userID: 1,
  productType: 1,
  status: 1,
});


// Admin filtering
ProductConfigurationSchema.index({
  productType: 1,
  status: 1,
});


// Search configuration by name
ProductConfigurationSchema.index({
  userID: 1,
  configurationName: 1,
});


// Fetch all items belonging to one saved draft
ProductConfigurationSchema.index({
  userID: 1,
  draftID: 1,
});


// Fetch user's draft groups efficiently
ProductConfigurationSchema.index({
  userID: 1,
  status: 1,
  draftID: 1,
});


// =========================================================
// ADMIN WORKFLOW INDEXES
//
// Admin can efficiently fetch:
//
// requested configurations
// pending configurations
// completed/done configurations
// =========================================================

ProductConfigurationSchema.index({
  adminStatus: 1,
  createdAt: 1,
});


// User configuration state + admin processing state
ProductConfigurationSchema.index({
  status: 1,
  adminStatus: 1,
});


// Product-specific admin queue
ProductConfigurationSchema.index({
  productType: 1,
  adminStatus: 1,
});


// =========================================================
// MODEL
// =====================================================

const ProductConfiguration =
  mongoose.models.ProductConfiguration ||
  mongoose.model(
    "ProductConfiguration",
    ProductConfigurationSchema
  );


module.exports = ProductConfiguration;