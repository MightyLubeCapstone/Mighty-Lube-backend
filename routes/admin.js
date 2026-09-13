const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");
const ProductConfiguration = require("../models/product_configuration");

const {
  authenticate,
  requireAdmin,
  hashPassword,
} = require("./sessions");


const router = express.Router();


// =========================================================
// CONFIGURATION ACTOR
// =========================================================

function configurationActor(user) {
  return {
    userID: user.userID,
    username: user.username,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    role: user.role || "user",
  };
}


// =========================================================
// DATE HELPERS
// =========================================================

function startOfDay(date) {
  const result = new Date(date);

  result.setHours(
    0,
    0,
    0,
    0
  );

  return result;
}


function endOfDay(date) {
  const result = new Date(date);

  result.setHours(
    23,
    59,
    59,
    999
  );

  return result;
}


function parseDateInput(
  value,
  useEndOfDay = false
) {
  if (!value) {
    return null;
  }


  const dateOnly =
    /^\d{4}-\d{2}-\d{2}$/.test(
      value
    );


  const parsed =
    new Date(
      dateOnly
        ? `${value}T00:00:00`
        : value
    );


  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    const error =
      new Error(
        `Invalid date: ${value}`
      );

    error.status = 400;

    throw error;
  }


  return (
    dateOnly &&
    useEndOfDay
  )
    ? endOfDay(parsed)
    : parsed;
}


// =========================================================
// LIST QUERY
//
// Used by both:
//
// GET /api/admin/configurations
// GET /api/admin/users
// =========================================================

function getListQuery(query) {
  const sortBy =
    query.sortBy ||
    "createdAt";


  const sortOrder =
    String(
      query.sortOrder ||
      "asc"
    ).toLowerCase();


  const dateField =
    query.dateField ||
    "createdAt";


  const requestedDateFilter =
    String(
      query.dateFilter ||
      (
        query.startDate ||
        query.endDate
          ? "custom"
          : "all"
      )
    ).toLowerCase();


  const dateFilterAliases = {
    all: "all",
    today: "today",
    lastday: "lastDay",
    yesterday: "lastDay",
    thisweek: "thisWeek",
    custom: "custom",
  };


  const dateFilter =
    dateFilterAliases[
      requestedDateFilter
    ];


  if (
    ![
      "createdAt",
      "updatedAt",
    ].includes(sortBy)
  ) {
    const error =
      new Error(
        "sortBy must be createdAt or updatedAt"
      );

    error.status = 400;

    throw error;
  }


  if (
    ![
      "asc",
      "desc",
    ].includes(sortOrder)
  ) {
    const error =
      new Error(
        "sortOrder must be asc or desc"
      );

    error.status = 400;

    throw error;
  }


  if (
    ![
      "createdAt",
      "updatedAt",
    ].includes(dateField)
  ) {
    const error =
      new Error(
        "dateField must be createdAt or updatedAt"
      );

    error.status = 400;

    throw error;
  }


  if (!dateFilter) {
    const error =
      new Error(
        "dateFilter must be all, today, lastDay, thisWeek, or custom"
      );

    error.status = 400;

    throw error;
  }


  let startDate = null;
  let endDate = null;

  const now =
    new Date();


  // =======================================================
  // TODAY
  // =======================================================

  if (
    dateFilter ===
    "today"
  ) {
    startDate =
      startOfDay(now);

    endDate =
      endOfDay(now);
  }


  // =======================================================
  // YESTERDAY
  // =======================================================

  else if (
    dateFilter ===
    "lastDay"
  ) {
    const yesterday =
      new Date(now);

    yesterday.setDate(
      yesterday.getDate() - 1
    );


    startDate =
      startOfDay(
        yesterday
      );

    endDate =
      endOfDay(
        yesterday
      );
  }


  // =======================================================
  // THIS WEEK
  // =======================================================

  else if (
    dateFilter ===
    "thisWeek"
  ) {
    const mondayOffset =
      (
        now.getDay() + 6
      ) % 7;


    startDate =
      startOfDay(now);


    startDate.setDate(
      startDate.getDate() -
      mondayOffset
    );


    endDate =
      endOfDay(now);
  }


  // =======================================================
  // CUSTOM
  // =======================================================

  else if (
    dateFilter ===
    "custom"
  ) {
    if (
      !query.startDate ||
      !query.endDate
    ) {
      const error =
        new Error(
          "startDate and endDate are required for a custom date filter"
        );

      error.status = 400;

      throw error;
    }


    startDate =
      parseDateInput(
        query.startDate
      );


    endDate =
      parseDateInput(
        query.endDate,
        true
      );


    if (
      startDate >
      endDate
    ) {
      const error =
        new Error(
          "startDate cannot be after endDate"
        );

      error.status = 400;

      throw error;
    }
  }


  return {
    sortBy,
    sortOrder,
    dateField,
    dateFilter,
    startDate,
    endDate,
  };
}


// =========================================================
// FILTER AND SORT
//
// Mainly kept for user list.
// =========================================================

function filterAndSort(
  items,
  listQuery
) {
  const {
    sortBy,
    sortOrder,
    dateField,
    startDate,
    endDate,
  } = listQuery;


  const filtered =
    startDate &&
    endDate
      ? items.filter(
          (item) => {
            const value =
              new Date(
                item[
                  dateField
                ]
              );


            return (
              !Number.isNaN(
                value.getTime()
              ) &&
              value >= startDate &&
              value <= endDate
            );
          }
        )
      : items;


  const direction =
    sortOrder === "asc"
      ? 1
      : -1;


  return filtered.sort(
    (a, b) => {
      const difference =
        new Date(
          a[sortBy]
        ) -
        new Date(
          b[sortBy]
        );


      if (
        difference !== 0
      ) {
        return (
          difference *
          direction
        );
      }


      return String(
        a._id
      ).localeCompare(
        String(
          b._id
        )
      ) * direction;
    }
  );
}


// =========================================================
// SERIALIZE QUERY
// =========================================================

function serializeListQuery(
  listQuery
) {
  return {
    sortBy:
      listQuery.sortBy,

    sortOrder:
      listQuery.sortOrder,

    dateField:
      listQuery.dateField,

    dateFilter:
      listQuery.dateFilter,

    startDate:
      listQuery.startDate
        ? listQuery.startDate.toISOString()
        : null,

    endDate:
      listQuery.endDate
        ? listQuery.endDate.toISOString()
        : null,
  };
}


// =========================================================
// ADMIN CONFIGURATION STATUS FILTER
//
// IMPORTANT:
//
// ProductConfiguration has TWO separate workflow states:
//
// USER STATUS:
//
// draft
// cart
// submitted
//
// ADMIN STATUS:
//
// requested
// pending
// done
//
// This filter is for ADMIN STATUS only.
//
// For backward compatibility with the current Flutter
// AdminListFilters implementation, both:
//
// ?status=requested
//
// and:
//
// ?adminStatus=requested
//
// are accepted.
// =========================================================

function getStatusFilter(query) {
  const rawStatus =
    query.adminStatus ||
    query.status ||
    query.statuses ||
    "all";


  const statuses =
    String(rawStatus)
      .split(",")
      .map(
        (status) =>
          status
            .trim()
            .toLowerCase()
      )
      .filter(Boolean);


  if (
    statuses.length === 0 ||
    statuses.includes(
      "all"
    )
  ) {
    return [];
  }


  const allowedStatuses = [
    "requested",
    "pending",
    "done",
  ];


  const invalidStatuses =
    statuses.filter(
      (status) =>
        !allowedStatuses.includes(
          status
        )
    );


  if (
    invalidStatuses.length > 0
  ) {
    const error =
      new Error(
        "status must be requested, pending, done, all, or a comma-separated combination"
      );

    error.status = 400;

    throw error;
  }


  return [
    ...new Set(
      statuses
    ),
  ];
}


// =========================================================
// ALL ADMIN ROUTES REQUIRE:
//
// 1. Valid login session
// 2. Admin role
// =========================================================

router.use(
  authenticate,
  requireAdmin
);


// =========================================================
// GET /api/admin/configurations
//
// ADMIN:
//
// Can see configurations belonging to ALL USERS.
//
// IMPORTANT:
//
// Only configurations submitted by users enter the
// administrator workflow.
//
// User workflow:
//
// draft -> cart -> submitted
//
// Admin workflow:
//
// requested -> pending -> done
//
// Data comes directly from:
//
// product_configurations
//
// Examples:
//
// /api/admin/configurations
//
// /api/admin/configurations?status=requested
//
// /api/admin/configurations?status=pending
//
// /api/admin/configurations?status=requested,pending
//
// /api/admin/configurations?adminStatus=done
//
// /api/admin/configurations?dateFilter=today
// =========================================================

router.get(
  "/configurations",
  async (req, res) => {
    try {
      const listQuery =
        getListQuery(
          req.query
        );


      const statusFilter =
        getStatusFilter(
          req.query
        );


      // ===================================================
      // BUILD MONGODB QUERY
      //
      // Admin queue contains ONLY configurations already
      // submitted by a user.
      // ===================================================

      const mongoQuery = {
        status:
          "submitted",
      };


      // Admin status filter
      if (
        statusFilter.length > 0
      ) {
        mongoQuery.adminStatus = {
          $in:
            statusFilter,
        };
      }


      // Date filter
      if (
        listQuery.startDate &&
        listQuery.endDate
      ) {
        mongoQuery[
          listQuery.dateField
        ] = {
          $gte:
            listQuery.startDate,

          $lte:
            listQuery.endDate,
        };
      }


      // ===================================================
      // SORT
      // ===================================================

      const sortDirection =
        listQuery.sortOrder ===
        "asc"
          ? 1
          : -1;


      const configurations =
        await ProductConfiguration
          .find(
            mongoQuery
          )
          .sort({
            [listQuery.sortBy]:
              sortDirection,
          })
          .lean();


      // ===================================================
      // SUMMARY
      //
      // Summary now represents ADMIN WORKFLOW.
      //
      // requested:
      // Newly submitted by user.
      //
      // pending:
      // Admin/business team is processing it.
      //
      // done:
      // Admin/business processing completed.
      // ===================================================

      const summary = {
        total:
          configurations.length,

        requested: 0,

        pending: 0,

        done: 0,
      };


      configurations.forEach(
        (configuration) => {
          const adminStatus =
            configuration.adminStatus ||
            "requested";


          if (
            summary[
              adminStatus
            ] !== undefined
          ) {
            summary[
              adminStatus
            ] += 1;
          }
        }
      );


      // ===================================================
      // RESPONSE
      // ===================================================

      return res
        .status(200)
        .json({
          summary,

          query: {
            ...serializeListQuery(
              listQuery
            ),

            status:
              statusFilter.length > 0
                ? statusFilter
                : ["all"],
          },

          data:
            configurations.map(
              (
                configuration
              ) => ({
                configurationID:
                  configuration.configurationID,

                userID:
                  configuration.userID,

                configurationName:
                  configuration.configurationName,

                productType:
                  configuration.productType,

                productName:
                  configuration.productName,

                status:
                  configuration.status,

                adminStatus:
                  configuration.adminStatus ||
                  "requested",

                isComplete:
                  configuration.isComplete,

                numRequested:
                  configuration.numRequested,

                configurationData:
                  configuration.configurationData,

                draftID:
                  configuration.draftID,

                draftTitle:
                  configuration.draftTitle,

                createdBy:
                  configuration.createdBy,

                updatedBy:
                  configuration.updatedBy,

                submittedAt:
                  configuration.submittedAt,

                completedAt:
                  configuration.completedAt,

                adminRequestedAt:
                  configuration.adminRequestedAt,

                adminStartedAt:
                  configuration.adminStartedAt,

                adminCompletedAt:
                  configuration.adminCompletedAt,

                createdAt:
                  configuration.createdAt,

                updatedAt:
                  configuration.updatedAt,
              })
            ),
        });

    } catch (error) {
      console.error(
        "Failed to fetch admin configurations:",
        error
      );


      if (
        error.status === 400
      ) {
        return res
          .status(400)
          .json({
            error:
              error.message,
          });
      }


      return res
        .status(500)
        .json({
          error:
            "Failed to fetch configurations",
        });
    }
  }
);


// =========================================================
// GET /api/admin/configurations/:configurationID
//
// Admin can fetch ANY user's complete configuration.
// =========================================================

router.get(
  "/configurations/:configurationID",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;


      const configuration =
        await ProductConfiguration.findOne({
          configurationID,
        });


      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }


      return res
        .status(200)
        .json({
          configuration,
        });

    } catch (error) {
      console.error(
        "Failed to fetch configuration:",
        error
      );


      return res
        .status(500)
        .json({
          error:
            "Failed to fetch configuration",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/configurations/:configurationID
//
// Admin can edit configuration content.
//
// Allowed here:
//
// configurationName
// configurationData
// numRequested
// isComplete
//
// User status and admin status are intentionally NOT
// changed here.
//
// There is a separate admin workflow status API below.
// =========================================================

router.patch(
  "/configurations/:configurationID",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;


      const {
        configurationName,
        configurationData,
        numRequested,
        isComplete,
      } = req.body;


      // ===================================================
      // AT LEAST ONE FIELD REQUIRED
      // ===================================================

      if (
        configurationName === undefined &&
        configurationData === undefined &&
        numRequested === undefined &&
        isComplete === undefined
      ) {
        return res
          .status(400)
          .json({
            error:
              "Provide at least one field to update",
          });
      }


      // ===================================================
      // VALIDATE configurationName
      // ===================================================

      if (
        configurationName !== undefined &&
        (
          typeof configurationName !==
            "string" ||
          !configurationName.trim()
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "configurationName must be a non-empty string",
          });
      }


      // ===================================================
      // VALIDATE configurationData
      // ===================================================

      if (
        configurationData !== undefined &&
        (
          typeof configurationData !==
            "object" ||
          configurationData ===
            null ||
          Array.isArray(
            configurationData
          )
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "configurationData must be an object",
          });
      }


      // ===================================================
      // VALIDATE QUANTITY
      // ===================================================

      if (
        numRequested !== undefined
      ) {
        const quantity =
          Number(
            numRequested
          );


        if (
          Number.isNaN(
            quantity
          ) ||
          quantity < 1
        ) {
          return res
            .status(400)
            .json({
              error:
                "numRequested must be at least 1",
            });
        }
      }


      // ===================================================
      // VALIDATE isComplete
      // ===================================================

      if (
        isComplete !== undefined &&
        typeof isComplete !==
          "boolean"
      ) {
        return res
          .status(400)
          .json({
            error:
              "isComplete must be boolean",
          });
      }


      // ===================================================
      // FIND CONFIGURATION
      // ===================================================

      const configuration =
        await ProductConfiguration.findOne({
          configurationID,
        });


      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }


      // ===================================================
      // APPLY UPDATES
      // ===================================================

      if (
        configurationName !==
        undefined
      ) {
        configuration.configurationName =
          configurationName.trim();
      }


      if (
        configurationData !==
        undefined
      ) {
        configuration.configurationData = {
          ...configuration.configurationData,
          ...configurationData,
        };


        configuration.markModified(
          "configurationData"
        );
      }


      if (
        numRequested !==
        undefined
      ) {
        configuration.numRequested =
          Number(
            numRequested
          );
      }


      if (
        isComplete !==
        undefined
      ) {
        configuration.isComplete =
          isComplete;
      }


      configuration.updatedBy =
        configurationActor(
          req.user
        );


      await configuration.save();


      return res
        .status(200)
        .json({
          message:
            "Configuration updated",

          configuration,
        });

    } catch (error) {
      console.error(
        "Failed to update configuration:",
        error
      );


      return res
        .status(500)
        .json({
          error:
            "Failed to update configuration",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/configurations/:configurationID/status
//
// ADMIN WORKFLOW STATUS
//
// IMPORTANT:
//
// This endpoint does NOT change:
//
// configuration.status
//
// User status stays:
//
// submitted
//
// This endpoint changes:
//
// configuration.adminStatus
//
// Allowed:
//
// requested
// pending
// done
//
// Example:
//
// {
//   "status": "pending"
// }
//
// Lifecycle:
//
// submitted + requested
//          ↓
// submitted + pending
//          ↓
// submitted + done
//
// Endpoint name "/status" is retained for backward
// compatibility with the existing Flutter AdminApiService.
// =========================================================

router.patch(
  "/configurations/:configurationID/status",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;


      const requestedStatus =
        String(
          req.body.status ||
          req.body.adminStatus ||
          ""
        )
          .trim()
          .toLowerCase();


      const allowedStatuses = [
        "requested",
        "pending",
        "done",
      ];


      if (
        !allowedStatuses.includes(
          requestedStatus
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "Admin status must be requested, pending, or done",
          });
      }


      const configuration =
        await ProductConfiguration.findOne({
          configurationID,
        });


      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }


      // ===================================================
      // ADMIN WORKFLOW STARTS ONLY AFTER USER SUBMISSION
      // ===================================================

      if (
        configuration.status !==
        "submitted"
      ) {
        return res
          .status(400)
          .json({
            error:
              "Only submitted configurations can enter the admin workflow",
          });
      }


      const now =
        new Date();


      // ===================================================
      // UPDATE ADMIN STATUS
      //
      // IMPORTANT:
      //
      // DO NOT change:
      //
      // configuration.status
      //
      // It remains "submitted".
      // ===================================================

      configuration.adminStatus =
        requestedStatus;


      // ===================================================
      // REQUESTED TIMESTAMP
      // ===================================================

      if (
        requestedStatus ===
        "requested"
      ) {
        configuration.adminRequestedAt =
          configuration.adminRequestedAt ||
          now;

        configuration.adminStartedAt =
          null;

        configuration.adminCompletedAt =
          null;
      }


      // ===================================================
      // PENDING TIMESTAMP
      // ===================================================

      if (
        requestedStatus ===
        "pending"
      ) {
        configuration.adminRequestedAt =
          configuration.adminRequestedAt ||
          configuration.submittedAt ||
          now;

        configuration.adminStartedAt =
          configuration.adminStartedAt ||
          now;

        configuration.adminCompletedAt =
          null;
      }


      // ===================================================
      // DONE TIMESTAMP
      // ===================================================

      if (
        requestedStatus ===
        "done"
      ) {
        configuration.adminRequestedAt =
          configuration.adminRequestedAt ||
          configuration.submittedAt ||
          now;

        configuration.adminStartedAt =
          configuration.adminStartedAt ||
          now;

        configuration.adminCompletedAt =
          configuration.adminCompletedAt ||
          now;
      }


      configuration.updatedBy =
        configurationActor(
          req.user
        );


      await configuration.save();


      return res
        .status(200)
        .json({
          message:
            "Admin configuration status updated",

          configuration,
        });

    } catch (error) {
      console.error(
        "Failed to update admin configuration status:",
        error
      );


      return res
        .status(500)
        .json({
          error:
            "Failed to update admin configuration status",
        });
    }
  }
);


// =========================================================
// DELETE /api/admin/configurations/:configurationID
//
// ADMIN ONLY
//
// Admin can hard-delete ANY user's configuration.
// =========================================================

router.delete(
  "/configurations/:configurationID",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;


      const deletedConfiguration =
        await ProductConfiguration.findOneAndDelete({
          configurationID,
        });


      if (
        !deletedConfiguration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }


      return res
        .status(200)
        .json({
          message:
            "Configuration deleted successfully",

          configurationID:
            deletedConfiguration.configurationID,
        });

    } catch (error) {
      console.error(
        "Failed to delete configuration:",
        error
      );


      return res
        .status(500)
        .json({
          error:
            "Failed to delete configuration",
        });
    }
  }
);


// =========================================================
// GET /api/admin/users
//
// UNCHANGED USER ADMIN LOGIC.
//
// Authentication secrets are intentionally never returned.
// =========================================================

router.get(
  "/users",
  async (req, res) => {
    try {
      const listQuery =
        getListQuery(
          req.query
        );


      const storedUsers =
        await User.find({})
          .select(
            "userID username role firstName lastName email phoneNumber companyName country createdAt updatedAt"
          )
          .lean();


      const normalizedUsers =
        storedUsers.map(
          (user) => {
            const fallbackCreatedAt =
              user._id.getTimestamp();


            return {
              ...user,

              createdAt:
                user.createdAt ||
                fallbackCreatedAt,

              updatedAt:
                user.updatedAt ||
                user.createdAt ||
                fallbackCreatedAt,
            };
          }
        );


      const users =
        filterAndSort(
          normalizedUsers,
          listQuery
        );


      return res
        .status(200)
        .json({
          count:
            users.length,

          query:
            serializeListQuery(
              listQuery
            ),

          data:
            users,
        });

    } catch (error) {
      console.error(
        "Failed to fetch admin users:",
        error
      );


      if (
        error.status === 400
      ) {
        return res
          .status(400)
          .json({
            error:
              error.message,
          });
      }


      return res
        .status(500)
        .json({
          error:
            "Failed to fetch users",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/users/:userId/password
//
// UNCHANGED USER ADMIN LOGIC.
//
// Admin can reset any user's password.
// =========================================================

router.patch(
  "/users/:userId/password",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;


      const password =
        req.body.password ||
        req.body.newPassword;


      if (!password) {
        return res
          .status(400)
          .json({
            error:
              "New password is required",
          });
      }


      if (
        typeof password !==
          "string" ||
        password.length < 8 ||
        password.length > 50
      ) {
        return res
          .status(400)
          .json({
            error:
              "Password must be between 8 and 50 characters",
          });
      }


      const identifiers = [
        {
          userID:
            userId,
        },
      ];


      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }


      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });


      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }


      targetUser.password =
        await hashPassword(
          password
        );


      targetUser.resetCode =
        null;


      // Password reset invalidates sessions.
      targetUser.sessions =
        [];


      await targetUser.save();


      return res
        .status(200)
        .json({
          message:
            "Password reset successfully",

          user: {
            userID:
              targetUser.userID,

            username:
              targetUser.username,

            role:
              targetUser.role,
          },
        });

    } catch (error) {
      console.error(
        "Failed to reset user password:",
        error
      );


      return res
        .status(500)
        .json({
          error:
            "Failed to reset user password",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/users/:userId/role
//
// UNCHANGED USER ADMIN LOGIC.
// =========================================================

router.patch(
  "/users/:userId/role",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;


      const {
        role,
      } = req.body;


      if (
        ![
          "user",
          "admin",
        ].includes(role)
      ) {
        return res
          .status(400)
          .json({
            error:
              "Role must be either user or admin",
          });
      }


      const identifiers = [
        {
          userID:
            userId,
        },
      ];


      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }


      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });


      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }


      if (
        String(
          targetUser._id
        ) ===
          String(
            req.user._id
          ) &&
        role !==
          "admin"
      ) {
        return res
          .status(400)
          .json({
            error:
              "You cannot remove your own admin role",
          });
      }


      targetUser.role =
        role;


      await targetUser.save();


      return res
        .status(200)
        .json({
          message:
            "User role updated",

          user: {
            userID:
              targetUser.userID,

            username:
              targetUser.username,

            role:
              targetUser.role,
          },
        });

    } catch (error) {
      console.error(
        "Failed to update user role:",
        error
      );


      return res
        .status(500)
        .json({
          error:
            "Failed to update user role",
        });
    }
  }
);





// =========================================================
// PATCH /api/admin/users/:userId
//
// ADMIN ONLY
//
// Admin can update a user's profile information.
//
// Allowed fields:
//
// firstName
// lastName
// username
// email
// phoneNumber
// companyName
// country
//
// Password and role are intentionally NOT updated here.
//
// Separate APIs already exist for:
//
// PATCH /api/admin/users/:userId/password
// PATCH /api/admin/users/:userId/role
// =========================================================

router.patch(
  "/users/:userId",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;


      const {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        companyName,
        country,
      } = req.body;


      // ===================================================
      // AT LEAST ONE FIELD REQUIRED
      // ===================================================

      if (
        firstName === undefined &&
        lastName === undefined &&
        username === undefined &&
        email === undefined &&
        phoneNumber === undefined &&
        companyName === undefined &&
        country === undefined
      ) {
        return res
          .status(400)
          .json({
            error:
              "Provide at least one user field to update",
          });
      }


      // ===================================================
      // FIND USER
      //
      // Supports:
      //
      // userID
      // MongoDB _id
      // ===================================================

      const identifiers = [
        {
          userID:
            userId,
        },
      ];


      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }


      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });


      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }


      // ===================================================
      // VALIDATE FIRST NAME
      // ===================================================

      if (
        firstName !== undefined
      ) {
        if (
          typeof firstName !==
            "string" ||
          !firstName.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "firstName must be a non-empty string",
            });
        }
      }


      // ===================================================
      // VALIDATE LAST NAME
      // ===================================================

      if (
        lastName !== undefined
      ) {
        if (
          typeof lastName !==
            "string" ||
          !lastName.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "lastName must be a non-empty string",
            });
        }
      }


      // ===================================================
      // VALIDATE USERNAME
      // ===================================================

      if (
        username !== undefined
      ) {
        if (
          typeof username !==
            "string" ||
          !username.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "username must be a non-empty string",
            });
        }


        const existingUsername =
          await User.findOne({
            username:
              username.trim(),

            _id: {
              $ne:
                targetUser._id,
            },
          });


        if (
          existingUsername
        ) {
          return res
            .status(400)
            .json({
              error:
                "Account with that username already exists",
            });
        }
      }


      // ===================================================
      // VALIDATE EMAIL
      // ===================================================

      if (
        email !== undefined
      ) {
        if (
          typeof email !==
            "string" ||
          !email.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "email must be a non-empty string",
            });
        }


        const existingEmail =
          await User.findOne({
            email:
              email.trim(),

            _id: {
              $ne:
                targetUser._id,
            },
          });


        if (
          existingEmail
        ) {
          return res
            .status(400)
            .json({
              error:
                "Account with that email already exists",
            });
        }
      }


      // ===================================================
      // VALIDATE OPTIONAL STRING FIELDS
      // ===================================================

      const optionalStringFields = {
        phoneNumber,
        companyName,
        country,
      };


      for (
        const [
          fieldName,
          value,
        ] of Object.entries(
          optionalStringFields
        )
      ) {
        if (
          value !== undefined &&
          typeof value !==
            "string"
        ) {
          return res
            .status(400)
            .json({
              error:
                `${fieldName} must be a string`,
            });
        }
      }


      // ===================================================
      // APPLY UPDATES
      // ===================================================

      if (
        firstName !== undefined
      ) {
        targetUser.firstName =
          firstName.trim();
      }


      if (
        lastName !== undefined
      ) {
        targetUser.lastName =
          lastName.trim();
      }


      if (
        username !== undefined
      ) {
        targetUser.username =
          username.trim();
      }


      if (
        email !== undefined
      ) {
        targetUser.email =
          email.trim();
      }


      if (
        phoneNumber !== undefined
      ) {
        targetUser.phoneNumber =
          phoneNumber.trim();
      }


      if (
        companyName !== undefined
      ) {
        targetUser.companyName =
          companyName.trim();
      }


      if (
        country !== undefined
      ) {
        targetUser.country =
          country.trim();
      }


      await targetUser.save();


      // ===================================================
      // RESPONSE
      //
      // Never return:
      //
      // password
      // sessions
      // securityPin
      // resetCode
      // ===================================================

      return res
        .status(200)
        .json({
          message:
            "User updated successfully",

          user: {
            _id:
              targetUser._id,

            userID:
              targetUser.userID,

            username:
              targetUser.username,

            role:
              targetUser.role,

            firstName:
              targetUser.firstName,

            lastName:
              targetUser.lastName,

            email:
              targetUser.email,

            phoneNumber:
              targetUser.phoneNumber,

            companyName:
              targetUser.companyName,

            country:
              targetUser.country,

            createdAt:
              targetUser.createdAt,

            updatedAt:
              targetUser.updatedAt,
          },
        });

    } catch (error) {
      console.error(
        "Failed to update user:",
        error
      );


      // Mongo duplicate-key protection
      if (
        error &&
        error.code === 11000
      ) {
        return res
          .status(400)
          .json({
            error:
              "Username or email already exists",
          });
      }


      if (
        error &&
        error.name ===
          "ValidationError"
      ) {
        return res
          .status(400)
          .json({
            error:
              error.message,
          });
      }


      return res
        .status(500)
        .json({
          error:
            "Failed to update user",
        });
    }
  }
);


// =========================================================
// DELETE /api/admin/users/:userId
//
// ADMIN ONLY
//
// Admin can permanently delete another user.
//
// An administrator cannot delete their own account from
// this API. This prevents accidentally removing the admin
// account currently being used.
// =========================================================

router.delete(
  "/users/:userId",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;


      // ===================================================
      // FIND USER
      //
      // Supports:
      //
      // userID
      // MongoDB _id
      // ===================================================

      const identifiers = [
        {
          userID:
            userId,
        },
      ];


      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }


      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });


      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }


      // ===================================================
      // PREVENT SELF DELETE
      // ===================================================

      if (
        String(
          targetUser._id
        ) ===
          String(
            req.user._id
          )
      ) {
        return res
          .status(400)
          .json({
            error:
              "You cannot delete your own administrator account",
          });
      }


      // ===================================================
      // DELETE USER
      // ===================================================

      await User.deleteOne({
        _id:
          targetUser._id,
      });


      // ===================================================
      // IMPORTANT
      //
      // We intentionally DO NOT delete the user's
      // ProductConfiguration records here.
      //
      // ProductConfiguration stores actor snapshots and
      // configuration history independently of User.
      //
      // If configuration deletion should happen together
      // with user deletion later, implement that explicitly.
      // ===================================================


      return res
        .status(200)
        .json({
          message:
            "User deleted successfully",

          userID:
            targetUser.userID,
        });

    } catch (error) {
      console.error(
        "Failed to delete user:",
        error
      );


      return res
        .status(500)
        .json({
          error:
            "Failed to delete user",
        });
    }
  }
);

module.exports = router;