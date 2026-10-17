const mongoose = require("mongoose");


// =========================================================
// PROJECT
//
// A user can group the RFQs of one Finalize under a named
// project, e.g. "Ford Plant Line 2".
//
// - Created only at Finalize (RFQs cannot be added to an
//   existing project later).
// - projectNumber shown as P-10001.
// - Name is unique per user, ignoring case and extra
//   spaces ("Ford" == "ford "). Different users can use the
//   same name.
// - No project-level status: admin changes status on each
//   RFQ.
//
// Each RFQ also stores projectID / projectNumber /
// projectName so lists can group without extra lookups.
// =========================================================

const projectActorSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      default: null,
    },

    username: {
      type: String,
      default: null,
    },

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);


const ProjectSchema = new mongoose.Schema(
  {
    projectID: {
      type: String,
      required: true,
      unique: true,
    },

    projectNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Lowercase, single-spaced name used for the
    // per-user uniqueness check.
    nameKey: {
      type: String,
      required: true,
    },

    userID: {
      type: String,
      required: true,
    },

    createdBy: {
      type: projectActorSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


// One project name per user.

ProjectSchema.index(
  {
    userID: 1,
    nameKey: 1,
  },
  {
    unique: true,
  }
);


function projectNameKey(
  projectName
) {
  return `${projectName || ""}`
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}


const Project =
  mongoose.models.Project ||
  mongoose.model(
    "Project",
    ProjectSchema
  );


module.exports = {
  Project,
  projectNameKey,
};
