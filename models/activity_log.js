const mongoose = require("mongoose");


// =========================================================
// ACTIVITY LOG
//
// One business action performed on the server, e.g.
// login, configuration created, RFQ submitted, admin
// status changed, user role changed.
//
// Written only by utils/activityLogger.js after a request
// succeeds. Append-only: never updated or deleted by the
// API.
//
// Shown in the admin app Activity Logs drawer:
//
// GET /api/admin/activity-logs
//
// NEVER store passwords, OTPs, session IDs or tokens here.
// =========================================================

const ActivityLogSchema = new mongoose.Schema(
  {
    // AUTH / CONFIGURATION / USER / RFQ
    entityType: {
      type: String,
      required: true,
      enum: ["AUTH", "CONFIGURATION", "USER", "RFQ"],
    },

    // e.g. LOGIN, CONFIG_STATUS_CHANGED, USER_ROLE_CHANGED
    action: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    // Who did it. null actor = unknown / anonymous.
    actorID: {
      type: String,
      default: null,
    },

    actorName: {
      type: String,
      default: null,
    },

    actorEmail: {
      type: String,
      default: null,
    },

    actorRole: {
      type: String,
      default: null,
    },

    // What it was done to.
    entityID: {
      type: String,
      default: null,
    },

    // Human readable, e.g. RFQ-10012 or a username.
    entityLabel: {
      type: String,
      default: null,
    },

    // Before / after values and other small details.
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    ipAddress: {
      type: String,
      default: null,
    },

    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);


ActivityLogSchema.index({ createdAt: -1 });

ActivityLogSchema.index({ entityType: 1, createdAt: -1 });

ActivityLogSchema.index({ actorID: 1, createdAt: -1 });

ActivityLogSchema.index({ entityID: 1, createdAt: -1 });


const ActivityLog =
  mongoose.models.ActivityLog ||
  mongoose.model(
    "ActivityLog",
    ActivityLogSchema,
    "activity_logs"
  );


module.exports = ActivityLog;
