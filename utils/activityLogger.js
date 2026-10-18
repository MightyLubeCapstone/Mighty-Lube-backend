const mongoose = require("mongoose");

const ActivityLog = require("../models/activity_log");
const User = require("../models/user");
const ProductConfiguration = require("../models/product_configuration");


// =========================================================
// ACTIVITY LOGGER MIDDLEWARE
//
// Mounted once in app.js BEFORE all routes.
//
// For every request it checks the RULES below. When a rule
// matches:
//
// 1. rule.before() (optional) runs first and reads the
//    current DB value, e.g. the old admin status or old role.
// 2. res.json() is wrapped so the response body is captured.
// 3. After the response is sent, a 2xx response writes one
//    ActivityLog document.
//
// Route files do not need any change. To log a new action,
// add a rule here.
//
// Logging can NEVER break or slow down the real request:
// every write is fire-and-forget and errors are only
// printed.
//
// NEVER put passwords, OTPs, session IDs or tokens into
// message or metadata.
// =========================================================


// =========================================================
// HELPERS
// =========================================================

const ADMIN_STATUS_LABELS = {
  requested: "Requested",
  pending: "Pending",
  awaiting_response: "Awaiting Response",
  done: "Done",
};

const SECRET_FIELDS = [
  "password",
  "newPassword",
  "currentPassword",
  "oldPassword",
  "otp",
  "rememberToken",
  "securityPin",
];

function statusLabel(status) {
  if (!status) {
    return "None";
  }

  return ADMIN_STATUS_LABELS[status] || status;
}

function userDisplayName(user) {
  if (!user) {
    return null;
  }

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return fullName || user.username || null;
}

function configurationLabel(configuration) {
  if (!configuration) {
    return null;
  }

  if (configuration.rfqNumber) {
    return `RFQ-${configuration.rfqNumber}`;
  }

  return (
    configuration.configurationName ||
    configuration.productName ||
    configuration.configurationID ||
    null
  );
}

function changedFields(body) {
  return Object.keys(body || {}).filter(
    (key) => !SECRET_FIELDS.includes(key)
  );
}

async function findUserByAnyID(id) {
  if (!id) {
    return null;
  }

  const identifiers = [{ userID: id }];

  if (mongoose.isValidObjectId(id)) {
    identifiers.push({ _id: id });
  }

  return User.findOne({ $or: identifiers })
    .select("userID username firstName lastName email role")
    .lean();
}

async function findUserBy(filter) {
  return User.findOne(filter)
    .select("userID username firstName lastName email role")
    .lean();
}

async function findConfiguration(configurationID) {
  if (!configurationID) {
    return null;
  }

  return ProductConfiguration.findOne({ configurationID })
    .select(
      "configurationID configurationName productName rfqNumber status adminStatus userID"
    )
    .lean();
}

function requestIP(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || null;
}

function normalizedEmail(value) {
  return typeof value === "string"
    ? value.trim().toLowerCase()
    : null;
}


// =========================================================
// RULES
//
// method   HTTP method
// path     RegExp on the URL path (no query string)
// entity   AUTH / CONFIGURATION / USER / RFQ
// action   Saved action name
//
// before(ctx)   optional, runs BEFORE the route
// actor(ctx)    optional, finds the actor when the route is
//               not authenticated (req.user missing)
// build(ctx)    returns { message, entityID, entityLabel,
//               metadata } or null to skip logging
// onFailure     optional { statuses, action, build } for
//               failed requests worth logging (failed login)
//
// ctx = { req, body, params, before }
//
// First matching rule wins, so specific paths come first.
// =========================================================

const RULES = [

  // =======================================================
  // AUTH
  // =======================================================

  {
    method: "POST",
    path: /^\/api\/sessions\/?$/,
    entity: "AUTH",
    action: "LOGIN",
    actor: ({ body }) =>
      body?.user?.userID
        ? findUserBy({ userID: body.user.userID })
        : null,
    build: () => ({
      message: "Logged in",
    }),
    onFailure: {
      statuses: [401],
      action: "LOGIN_FAILED",
      build: ({ req }) => ({
        message: "Failed login attempt",
        entityLabel:
          typeof req.body?.username === "string"
            ? req.body.username.trim().toLowerCase()
            : null,
      }),
    },
  },

  {
    method: "POST",
    path: /^\/api\/sessions\/remember\/?$/,
    entity: "AUTH",
    action: "LOGIN",
    actor: ({ req, body }) =>
      body?.user?.userID
        ? findUserBy({ userID: body.user.userID })
        : findUserBy({
          username: `${req.body?.username || ""}`.trim().toLowerCase(),
        }),
    build: () => ({
      message: "Logged in (remembered account)",
    }),
  },

  {
    method: "DELETE",
    path: /^\/api\/sessions\/?$/,
    entity: "AUTH",
    action: "LOGOUT",
    build: () => ({
      message: "Logged out",
    }),
  },

  {
    method: "POST",
    path: /^\/api\/users\/?$/,
    entity: "AUTH",
    action: "ACCOUNT_CREATED",
    actor: ({ req }) =>
      findUserBy({
        username: `${req.body?.username || ""}`.trim().toLowerCase(),
      }),
    build: ({ req }) => ({
      message: "Created a new account",
      entityLabel: `${req.body?.username || ""}`.trim().toLowerCase() || null,
    }),
  },

  {
    method: "PUT",
    path: /^\/api\/users\/?$/,
    entity: "AUTH",
    action: "PROFILE_UPDATED",
    build: ({ req }) => ({
      message: "Updated own profile",
      metadata: {
        fields: changedFields(req.body).join(", "),
      },
    }),
  },

  {
    method: "DELETE",
    path: /^\/api\/users\/?$/,
    entity: "AUTH",
    action: "ACCOUNT_DELETED",
    build: () => ({
      message: "Deleted own account",
    }),
  },

  {
    method: "POST",
    path: /^\/api\/email\/forgot\/request-otp\/?$/,
    entity: "AUTH",
    action: "PASSWORD_RESET_OTP_SENT",
    actor: ({ req }) => findUserBy({ email: normalizedEmail(req.body?.email) }),
    build: ({ req }) => ({
      message: "Requested password reset OTP",
      entityLabel: normalizedEmail(req.body?.email),
    }),
  },

  {
    method: "POST",
    path: /^\/api\/email\/forgot\/reset-password\/?$/,
    entity: "AUTH",
    action: "PASSWORD_RESET",
    actor: ({ req }) => findUserBy({ email: normalizedEmail(req.body?.email) }),
    build: () => ({
      message: "Reset password via email OTP",
    }),
  },

  {
    method: "PUT",
    path: /^\/api\/email\/forgot\/?$/,
    entity: "AUTH",
    action: "PASSWORD_RESET",
    actor: ({ req }) => findUserBy({ email: normalizedEmail(req.body?.email) }),
    build: () => ({
      message: "Reset password",
    }),
  },

  {
    method: "POST",
    path: /^\/api\/email\/forgot-username\/?$/,
    entity: "AUTH",
    action: "USERNAME_REMINDER_SENT",
    actor: ({ req }) => findUserBy({ email: normalizedEmail(req.body?.email) }),
    build: ({ req }) => ({
      message: "Requested username reminder email",
      entityLabel: normalizedEmail(req.body?.email),
    }),
  },

  {
    method: "POST",
    path: /^\/api\/email\/verification\/verify-otp\/?$/,
    entity: "AUTH",
    action: "EMAIL_VERIFIED",
    actor: ({ req }) => findUserBy({ email: normalizedEmail(req.body?.email) }),
    build: ({ req }) => ({
      message: "Verified email address",
      entityLabel: normalizedEmail(req.body?.email),
    }),
  },


  // =======================================================
  // ADMIN - CONFIGURATIONS
  // =======================================================

  {
    method: "PATCH",
    path: /^\/api\/admin\/configurations\/([^/]+)\/status\/?$/,
    entity: "CONFIGURATION",
    action: "CONFIG_STATUS_CHANGED",
    before: ({ params }) => findConfiguration(params[0]),
    build: ({ req, params, before }) => {
      const nextStatus = req.body?.adminStatus || req.body?.status;
      const previousStatus = before?.adminStatus || null;

      // Same status again: backend does not change anything.
      if (!nextStatus || nextStatus === previousStatus) {
        return null;
      }

      return {
        message:
          `Changed status ${statusLabel(previousStatus)} → ${statusLabel(nextStatus)}`,
        entityID: params[0],
        entityLabel: configurationLabel(before),
        metadata: {
          before: statusLabel(previousStatus),
          after: statusLabel(nextStatus),
        },
      };
    },
  },

  {
    method: "PATCH",
    path: /^\/api\/admin\/configurations\/([^/]+)\/?$/,
    entity: "CONFIGURATION",
    action: "CONFIG_UPDATED",
    before: ({ params }) => findConfiguration(params[0]),
    build: ({ req, body, params, before }) => {
      if (body?.message === "No configuration changes detected") {
        return null;
      }

      const history = body?.configuration?.activityHistory;
      const latest = Array.isArray(history)
        ? history[history.length - 1]
        : null;

      const changes = Array.isArray(latest?.changes)
        ? latest.changes.slice(0, 20).map((change) => ({
          field: change.field,
          from: change.from,
          to: change.to,
        }))
        : null;

      return {
        message: "Edited configuration",
        entityID: params[0],
        entityLabel: configurationLabel(before),
        metadata: changes
          ? { changes }
          : { fields: changedFields(req.body).join(", ") },
      };
    },
  },

  {
    method: "DELETE",
    path: /^\/api\/admin\/configurations\/([^/]+)\/?$/,
    entity: "CONFIGURATION",
    action: "CONFIG_DELETED",
    before: ({ params }) => findConfiguration(params[0]),
    build: ({ params, before }) => ({
      message: "Admin deleted configuration",
      entityID: params[0],
      entityLabel: configurationLabel(before),
    }),
  },


  // =======================================================
  // ADMIN - USERS
  // =======================================================

  {
    method: "PATCH",
    path: /^\/api\/admin\/users\/([^/]+)\/password\/?$/,
    entity: "USER",
    action: "USER_PASSWORD_RESET",
    before: ({ params }) => findUserByAnyID(params[0]),
    build: ({ params, before }) => ({
      message: `Reset password for ${userDisplayName(before) || "user"}`,
      entityID: before?.userID || params[0],
      entityLabel: before?.username || null,
    }),
  },

  {
    method: "PATCH",
    path: /^\/api\/admin\/users\/([^/]+)\/role\/?$/,
    entity: "USER",
    action: "USER_ROLE_CHANGED",
    before: ({ params }) => findUserByAnyID(params[0]),
    build: ({ req, params, before }) => {
      const previousRole = before?.role || null;
      const nextRole = req.body?.role;

      if (!nextRole || nextRole === previousRole) {
        return null;
      }

      return {
        message:
          `Changed role of ${userDisplayName(before) || "user"} ${previousRole || "—"} → ${nextRole}`,
        entityID: before?.userID || params[0],
        entityLabel: before?.username || null,
        metadata: {
          before: previousRole,
          after: nextRole,
        },
      };
    },
  },

  {
    method: "PATCH",
    path: /^\/api\/admin\/users\/([^/]+)\/?$/,
    entity: "USER",
    action: "USER_UPDATED",
    before: ({ params }) => findUserByAnyID(params[0]),
    build: ({ req, params, before }) => ({
      message: `Edited user ${userDisplayName(before) || ""}`.trim(),
      entityID: before?.userID || params[0],
      entityLabel: before?.username || null,
      metadata: {
        fields: changedFields(req.body).join(", "),
      },
    }),
  },

  {
    method: "DELETE",
    path: /^\/api\/admin\/users\/([^/]+)\/?$/,
    entity: "USER",
    action: "USER_DELETED",
    before: ({ params }) => findUserByAnyID(params[0]),
    build: ({ params, before }) => ({
      message: `Deleted user ${userDisplayName(before) || ""}`.trim(),
      entityID: before?.userID || params[0],
      entityLabel: before?.username || null,
      metadata: before?.email ? { email: before.email } : {},
    }),
  },


  // =======================================================
  // USER - RFQ SUBMIT (FINALIZE)
  // =======================================================

  {
    method: "PUT",
    path: /^\/api\/configurations\/?$/,
    entity: "RFQ",
    action: "RFQ_SUBMITTED",
    build: ({ body }) => {
      const configurations = Array.isArray(body?.configurations)
        ? body.configurations
        : [];

      const rfqNumbers = configurations
        .map((item) => item.rfqNumber)
        .filter(Boolean)
        .map((number) => `RFQ-${number}`);

      const project = body?.project;

      const projectText = project
        ? ` in project P-${project.projectNumber} – ${project.projectName}`
        : "";

      const count = body?.submittedCount ?? configurations.length;

      return {
        message:
          `Submitted ${count} RFQ${count === 1 ? "" : "s"}${projectText}`,
        entityID:
          configurations.length === 1
            ? configurations[0].configurationID
            : project?.projectID || null,
        entityLabel: rfqNumbers.slice(0, 3).join(", ") +
          (rfqNumbers.length > 3 ? ` +${rfqNumbers.length - 3}` : "") || null,
        metadata: {
          rfqNumbers: rfqNumbers.join(", "),
          ...(project
            ? { project: `P-${project.projectNumber} – ${project.projectName}` }
            : {}),
        },
      };
    },
  },


  // =======================================================
  // USER - CONFIGURATIONS / CART / DRAFTS
  // =======================================================

  {
    method: "DELETE",
    path: /^\/api\/configurations\/([^/]+)\/?$/,
    entity: "CONFIGURATION",
    action: "CONFIG_DELETED",
    before: ({ params }) => findConfiguration(params[0]),
    build: ({ params, before }) => ({
      message: "Deleted configuration",
      entityID: params[0],
      entityLabel: configurationLabel(before),
    }),
  },

  {
    method: "PUT",
    path: /^\/api\/cart\/order\/?$/,
    entity: "CONFIGURATION",
    action: "CART_ITEM_UPDATED",
    before: ({ req }) =>
      findConfiguration(req.body?.configurationID || req.body?.orderID),
    build: ({ req, before }) => ({
      message: "Edited cart item",
      entityID: req.body?.configurationID || req.body?.orderID || null,
      entityLabel: configurationLabel(before),
    }),
  },

  {
    method: "DELETE",
    path: /^\/api\/cart\/order\/?$/,
    entity: "CONFIGURATION",
    action: "CART_ITEM_REMOVED",
    before: ({ req }) =>
      findConfiguration(req.body?.configurationID || req.body?.orderID),
    build: ({ req, before }) => ({
      message: "Removed item from cart",
      entityID: req.body?.configurationID || req.body?.orderID || null,
      entityLabel: configurationLabel(before),
    }),
  },

  {
    method: "PUT",
    path: /^\/api\/drafts\/restore\/?$/,
    entity: "CONFIGURATION",
    action: "DRAFT_RESTORED",
    build: ({ req }) => ({
      message: "Moved draft back to cart",
      entityID: req.body?.draftID || null,
    }),
  },

  {
    method: "PUT",
    path: /^\/api\/drafts\/?$/,
    entity: "CONFIGURATION",
    action: "DRAFT_SAVED",
    build: ({ req }) => ({
      message: "Saved cart as draft",
      entityLabel: req.body?.draftTitle || null,
    }),
  },

  {
    method: "DELETE",
    path: /^\/api\/drafts\/?$/,
    entity: "CONFIGURATION",
    action: "DRAFT_DELETED",
    build: ({ req }) => ({
      message: "Deleted draft",
      entityID: req.body?.draftID || null,
    }),
  },

  // Every product route (POST /api/ohp_mlp, /api/fro_314, ...)
  // answers with configurationID + configuration when an item
  // is added to the cart. Must stay LAST.
  {
    method: "POST",
    path: /^\/api\/[^/]+\/?$/,
    entity: "CONFIGURATION",
    action: "CONFIG_CREATED",
    build: ({ body }) => {
      if (!body?.configurationID || !body?.configuration) {
        return null;
      }

      const product =
        body.configuration.productName ||
        body.configuration.productType ||
        "product";

      return {
        message: `Added ${product} to cart`,
        entityID: body.configurationID,
        entityLabel: body.configuration.configurationName || null,
      };
    },
  },
];


// =========================================================
// WRITE ONE LOG
// =========================================================

async function writeLog(rule, action, details, ctx) {
  let actor = ctx.req.user || null;

  if (!actor && rule.actor) {
    actor = await rule.actor(ctx);
  }

  await ActivityLog.create({
    entityType: rule.entity,
    action,
    message: details.message || "",

    actorID: actor?.userID || null,
    actorName: userDisplayName(actor),
    actorEmail: actor?.email || null,
    actorRole: actor?.role || null,

    entityID: details.entityID || null,
    entityLabel: details.entityLabel || null,
    metadata: details.metadata || {},

    ipAddress: requestIP(ctx.req),
    userAgent: ctx.req.headers["user-agent"] || null,
  });
}


// =========================================================
// MIDDLEWARE
// =========================================================

function findRule(req) {
  const path = req.originalUrl.split("?")[0];

  for (const rule of RULES) {
    if (rule.method !== req.method) {
      continue;
    }

    const match = path.match(rule.path);

    if (match) {
      return {
        rule,
        params: match.slice(1).map(decodeURIComponent),
      };
    }
  }

  return null;
}

async function activityLogger(req, res, next) {
  const found = findRule(req);

  if (!found) {
    return next();
  }

  const { rule, params } = found;

  const ctx = {
    req,
    params,
    body: null,
    before: null,
  };

  if (rule.before) {
    try {
      ctx.before = await rule.before(ctx);
    } catch (error) {
      console.error("Activity log before() failed:", error.message);
    }
  }

  const originalJson = res.json.bind(res);

  res.json = (body) => {
    ctx.body = body;
    return originalJson(body);
  };

  res.on("finish", () => {
    const success = res.statusCode >= 200 && res.statusCode < 300;

    const failure =
      !success &&
      rule.onFailure &&
      rule.onFailure.statuses.includes(res.statusCode);

    if (!success && !failure) {
      return;
    }

    Promise.resolve()
      .then(() => {
        const details = failure
          ? rule.onFailure.build(ctx)
          : rule.build(ctx);

        if (!details) {
          return null;
        }

        return writeLog(
          rule,
          failure ? rule.onFailure.action : rule.action,
          details,
          ctx
        );
      })
      .catch((error) => {
        console.error("Activity log write failed:", error.message);
      });
  });

  next();
}


module.exports = {
  activityLogger,
};
