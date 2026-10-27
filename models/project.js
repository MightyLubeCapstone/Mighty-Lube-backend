const mongoose = require("mongoose");

const {
  customerDetailsSchema,
} = require("./customer_details");


// =========================================================
// PROJECT
//
// A user can group the RFQs of one Finalize under a named
// project, e.g. "Ford Plant Line 2".
//
// - Created at Finalize. A later Finalize can attach its
//   RFQs to an existing project (projectID).
// - projectNumber shown as P-10001.
// - Name is unique per user, ignoring case and extra
//   spaces ("Ford" == "ford "). Different users can use the
//   same name.
// - No project-level status: admin changes status on each
//   RFQ.
//
// Each RFQ also stores projectID / projectNumber /
// projectName so lists can group without extra lookups.
//
// customerDetails is entered once at Finalize and shared by
// every RFQ in the project. The owner and admins can edit
// it later. null for projects created before it existed.
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

    customerDetails: {
      type: customerDetailsSchema,
      default: null,
    },

    customerDetailsUpdatedAt: {
      type: Date,
      default: null,
    },

    customerDetailsUpdatedBy: {
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


// =========================================================
// CUSTOMER DETAILS FOR RFQ LISTS
//
// Project RFQs show their project's (live) details,
// standalone RFQs their own.
//
// const map = await projectCustomerDetailsMap(rfqs);
// customerDetailsFor(rfq, map);
// =========================================================

async function projectCustomerDetailsMap(configurations) {
  const projectIDs = [
    ...new Set(
      configurations
        .map((item) => item.projectID)
        .filter(Boolean)
    ),
  ];

  const map = new Map();

  if (projectIDs.length === 0) {
    return map;
  }

  const projects =
    await Project.find(
      {
        projectID: {
          $in: projectIDs,
        },
      },
      {
        projectID: 1,
        customerDetails: 1,
      }
    ).lean();

  for (const project of projects) {
    map.set(
      project.projectID,
      project.customerDetails || null
    );
  }

  return map;
}


function customerDetailsFor(configuration, projectMap) {
  if (configuration.projectID) {
    return projectMap.get(configuration.projectID) || null;
  }

  return configuration.customerDetails || null;
}


module.exports = {
  Project,
  projectNameKey,
  projectCustomerDetailsMap,
  customerDetailsFor,
};
