const express = require("express");

const { authenticate } = require("./sessions");

const {
  sendOrderNotification,
} = require("../utils/emailnotif");

const ProductConfiguration = require(
  "../models/product_configuration"
);

const uuid = require("uuid");

const {
  nextRfqNumber,
  nextProjectNumber,
} = require("../models/counter");

const {
  Project,
  projectNameKey,
  projectCustomerDetailsMap,
  customerDetailsFor,
} = require("../models/project");

const {
  normalizeCustomerDetails,
  hasCustomerDetails,
} = require("../models/customer_details");

const router = express.Router();


// =========================================================
// GET /api/configurations
//
// PURPOSE:
//
// Fetch submitted/completed configurations belonging
// to the logged-in user.
//
// Normal user:
//   sees ONLY own configurations.
//
// Admin:
//   can also use admin-specific APIs later to see all users.
//
// USER STATUS:
//
// submitted
// completed
//
// ADMIN STATUS:
//
// requested
// pending
// done
// =========================================================

router.get(
  "/",
  authenticate,
  async (req, res) => {
    try {
      const configurations =
        await ProductConfiguration.find({
          userID:
            req.user.userID,

          status: {
            $in: [
              "submitted",
              "completed",
            ],
          },
        }).sort({
          submittedAt: -1,
          createdAt: -1,
        });

      const projectDetails =
        await projectCustomerDetailsMap(
          configurations
        );


      return res
        .status(200)
        .json({
          success: true,

          count:
            configurations.length,

          configurations:
            configurations.map(
              (item) => ({
                configurationID:
                  item.configurationID,

                configurationName:
                  item.configurationName,

                productType:
                  item.productType,

                productName:
                  item.productName,

                rfqNumber:
                  item.rfqNumber,

                projectID:
                  item.projectID,

                projectNumber:
                  item.projectNumber,

                projectName:
                  item.projectName,

                customerDetails:
                  customerDetailsFor(
                    item,
                    projectDetails
                  ),

                quantity:
                  item.numRequested,

                // Lets the user's view-only details screen
                // show what was configured.
                configurationData:
                  item.configurationData,

                status:
                  item.status,

                adminStatus:
                  item.adminStatus,

                isComplete:
                  item.isComplete,

                submittedAt:
                  item.submittedAt,

                completedAt:
                  item.completedAt,

                adminRequestedAt:
                  item.adminRequestedAt,

                adminStartedAt:
                  item.adminStartedAt,

                adminCompletedAt:
                  item.adminCompletedAt,

                // -----------------------------------------
                // CURRENT ADMIN STATUS TIMER
                //
                // New configurations use:
                // adminStatusChangedAt
                //
                // Legacy records may not have it yet.
                // -----------------------------------------

                adminStatusChangedAt:
                  item.adminStatusChangedAt ||
                  item.adminStartedAt ||
                  item.adminRequestedAt ||
                  item.submittedAt ||
                  null,

                createdAt:
                  item.createdAt,

                updatedAt:
                  item.updatedAt,
              })
            ),
        });

    } catch (error) {
      console.error(
        "GET /api/configurations error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to fetch configurations",

          error:
            error.message,
        });
    }
  }
);


// =========================================================
// PUT /api/configurations
//
// PURPOSE:
//
// Submit ONE or MULTIPLE selected cart configurations.
//
// Frontend ALWAYS sends an array.
//
// ONE:
//
// {
//   "configurationIDs": [
//     "configuration-id-1"
//   ]
// }
//
// MULTIPLE:
//
// {
//   "configurationIDs": [
//     "configuration-id-1",
//     "configuration-id-2",
//     "configuration-id-3"
//   ]
// }
//
// Backend changes:
//
// USER WORKFLOW:
//
// cart -> submitted
//
// ADMIN WORKFLOW:
//
// null -> requested
//
// Only selected configurations are submitted.
//
// Unselected cart items remain:
//
// status = "cart"
// adminStatus = null
//
// AUDIT:
//
// Every submitted configuration gets:
//
// action = configuration_submitted
//
// changes:
//
// status:
// cart -> submitted
//
// adminStatus:
// null -> requested
//
// adminStatusChangedAt becomes the authoritative
// start time for the current Requested status.
// =========================================================

router.put(
  "/",
  authenticate,
  async (req, res) => {
    try {
      const {
        configurationIDs,
        projectName,
        projectID,
        customerDetails: customerDetailsInput,
      } = req.body;


      // =====================================================
      // VALIDATE INPUT
      // =====================================================

      if (
        !Array.isArray(
          configurationIDs
        ) ||
        configurationIDs.length === 0
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "At least one configurationID is required",
          });
      }


      // Remove duplicate IDs

      const uniqueConfigurationIDs = [
        ...new Set(
          configurationIDs
        ),
      ];


      // =====================================================
      // FIND SELECTED CART ITEMS
      //
      // SECURITY:
      //
      // userID comes from authenticated user.
      //
      // User cannot submit another user's configuration.
      // =====================================================

      const configurations =
        await ProductConfiguration.find({
          configurationID: {
            $in:
              uniqueConfigurationIDs,
          },

          userID:
            req.user.userID,

          status:
            "cart",
        });


      // =====================================================
      // VERIFY EVERY REQUESTED ID
      //
      // If frontend sends 3 IDs,
      // backend must find exactly 3 valid cart records.
      // =====================================================

      if (
        configurations.length !==
        uniqueConfigurationIDs.length
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "One or more configurations were not found in your cart",
          });
      }


      // =====================================================
      // MAKE SURE ALL ARE COMPLETE
      // =====================================================

      const incompleteConfigurations =
        configurations.filter(
          (item) =>
            item.isComplete !== true
        );


      if (
        incompleteConfigurations.length >
        0
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "One or more configurations are incomplete",

            incompleteConfigurationIDs:
              incompleteConfigurations.map(
                (item) =>
                  item.configurationID
              ),
          });
      }


      // =====================================================
      // AUDIT ACTOR
      // =====================================================

      const actor = {
        userID:
          req.user.userID,

        username:
          req.user.username,

        firstName:
          req.user.firstName || "",

        lastName:
          req.user.lastName || "",

        role:
          req.user.role || "user",
      };


      const now =
        new Date();


      // =====================================================
      // OPTIONAL PROJECT
      //
      // both missing/empty -> standalone RFQs.
      //
      // projectID given -> attach to the user's EXISTING
      // project. 404 if it is not one of this user's projects.
      //
      // projectName given -> create a NEW project first.
      // If this user already has a project with that name,
      // stop here with 409 so nothing gets submitted and the
      // user can pick another name.
      //
      // Sending both -> 400.
      //
      // customerDetails: required for a new project, an
      // existing project that has none yet (saved to it for
      // next time) and standalone RFQs. Ignored for an
      // existing project that already has details.
      // =====================================================

      let project = null;

      const hasProjectID =
        projectID !== undefined &&
        projectID !== null &&
        `${projectID}`.trim() !== "";

      const hasProjectName =
        projectName !== undefined &&
        projectName !== null &&
        `${projectName}`.trim() !== "";

      if (hasProjectID && hasProjectName) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Send either projectID or projectName, not both",
          });
      }

      if (hasProjectID) {
        project =
          await Project.findOne({
            projectID:
              `${projectID}`.trim(),
            userID:
              req.user.userID,
          });

        if (!project) {
          return res
            .status(404)
            .json({
              success: false,
              errorCode:
                "PROJECT_NOT_FOUND",
              message:
                "Project not found",
            });
        }
      }

      let customerDetails = null;

      if (
        !project ||
        !hasCustomerDetails(project.customerDetails)
      ) {
        const normalized =
          normalizeCustomerDetails(
            customerDetailsInput
          );

        if (normalized.error) {
          return res
            .status(400)
            .json({
              success: false,
              errorCode:
                "CUSTOMER_DETAILS_INVALID",
              message:
                normalized.error,
            });
        }

        customerDetails =
          normalized.value;
      }

      if (hasProjectName) {
        if (typeof projectName !== "string") {
          return res
            .status(400)
            .json({
              success: false,
              message:
                "projectName must be text",
            });
        }

        const cleanProjectName =
          projectName.trim().replace(/\s+/g, " ");

        if (cleanProjectName.length > 100) {
          return res
            .status(400)
            .json({
              success: false,
              message:
                "Project name must be 100 characters or less",
            });
        }

        const nameKey =
          projectNameKey(cleanProjectName);

        const existingProject =
          await Project.exists({
            userID:
              req.user.userID,
            nameKey,
          });

        if (existingProject) {
          return res
            .status(409)
            .json({
              success: false,
              errorCode:
                "PROJECT_NAME_EXISTS",
              message:
                "Project name already exists",
            });
        }

        try {
          project =
            await Project.create({
              projectID:
                uuid.v4(),
              projectNumber:
                await nextProjectNumber(),
              projectName:
                cleanProjectName,
              nameKey,
              userID:
                req.user.userID,
              createdBy: {
                userID:
                  actor.userID,
                username:
                  actor.username,
                firstName:
                  actor.firstName,
                lastName:
                  actor.lastName,
              },
              customerDetails,
              customerDetailsUpdatedAt:
                now,
            });
        } catch (projectError) {
          // Same name created at the same moment
          // (unique index on userID + nameKey).
          if (projectError.code === 11000) {
            return res
              .status(409)
              .json({
                success: false,
                errorCode:
                  "PROJECT_NAME_EXISTS",
                message:
                  "Project name already exists",
              });
          }

          throw projectError;
        }
      } else if (
        project &&
        customerDetails
      ) {
        // Existing project without details yet.
        project.customerDetails =
          customerDetails;
        project.customerDetailsUpdatedAt =
          now;
        project.customerDetailsUpdatedBy = {
          userID:
            actor.userID,
          username:
            actor.username,
          firstName:
            actor.firstName,
          lastName:
            actor.lastName,
        };

        await project.save();
      }


      // =====================================================
      // SUBMIT SELECTED CONFIGURATIONS
      //
      // Same records stay in:
      //
      // product_configurations
      //
      // USER STATUS:
      //
      // cart -> submitted
      //
      // ADMIN STATUS:
      //
      // null -> requested
      //
      // configurationID DOES NOT CHANGE.
      //
      // IMPORTANT:
      //
      // We use updateMany because all selected records are
      // guaranteed above to currently have:
      //
      // status = cart
      //
      // This route's workflow defines cart adminStatus as:
      //
      // null
      //
      // Therefore the audit transition is:
      //
      // status:
      // cart -> submitted
      //
      // adminStatus:
      // null -> requested
      // =====================================================

      const updateResult =
        await ProductConfiguration.updateMany(
          {
            configurationID: {
              $in:
                uniqueConfigurationIDs,
            },

            userID:
              req.user.userID,

            status:
              "cart",
          },

          {
            $set: {
              status:
                "submitted",

              adminStatus:
                "requested",

              submittedAt:
                now,

              adminRequestedAt:
                now,

              adminStartedAt:
                null,

              adminCompletedAt:
                null,

              // -------------------------------------------
              // NEW
              //
              // Authoritative start time of CURRENT
              // admin workflow status.
              // -------------------------------------------

              adminStatusChangedAt:
                now,

              updatedBy:
                actor,

              draftID:
                null,

              draftTitle:
                null,

              // null for standalone RFQs.
              projectID:
                project ? project.projectID : null,

              projectNumber:
                project ? project.projectNumber : null,

              projectName:
                project ? project.projectName : null,

              // Project RFQs read the project's details.
              customerDetails:
                project ? null : customerDetails,
            },

            // ---------------------------------------------
            // NEW AUDIT HISTORY
            //
            // One submission activity is appended to EACH
            // submitted configuration.
            // ---------------------------------------------

            $push: {
              activityHistory: {
                action:
                  "configuration_submitted",

                actor,

                changedAt:
                  now,

                changes: [
                  {
                    field:
                      "status",

                    from:
                      "cart",

                    to:
                      "submitted",
                  },

                  {
                    field:
                      "adminStatus",

                    from:
                      null,

                    to:
                      "requested",
                  },
                ],
              },
            },
          }
        );


      // =====================================================
      // ASSIGN RFQ NUMBERS
      //
      // One unique number per configuration, in the order
      // the user sent them.
      //
      // Finalize (3 items) -> 10001, 10002, 10003
      //
      // Only records without a number get one, so a retry
      // never changes an existing number.
      // =====================================================

      for (const configurationID of uniqueConfigurationIDs) {
        const rfqNumber =
          await nextRfqNumber();

        await ProductConfiguration.updateOne(
          {
            configurationID,
            userID:
              req.user.userID,
            status:
              "submitted",
            rfqNumber:
              null,
          },
          {
            $set: {
              rfqNumber,
            },
          }
        );
      }


      // =====================================================
      // FETCH UPDATED CONFIGURATIONS
      //
      // Useful for response + email notification.
      //
      // These records should now be:
      //
      // status = submitted
      // adminStatus = requested
      // =====================================================

      const submittedConfigurations =
        await ProductConfiguration.find({
          configurationID: {
            $in:
              uniqueConfigurationIDs,
          },

          userID:
            req.user.userID,

          status:
            "submitted",

          adminStatus:
            "requested",
        }).sort({
          rfqNumber: 1,
        });


      // =====================================================
      // EMAIL NOTIFICATION
      //
      // Existing notification utility is retained.
      //
      // If its expected structure needs changing,
      // we will migrate emailnotif.js separately.
      // =====================================================

      try {
        // Project RFQs use the project's details.
        await sendOrderNotification(
          req.user,
          submittedConfigurations,
          "new",
          null,
          project
            ? project.customerDetails
            : customerDetails
        );

      } catch (emailError) {
        console.error(
          "Failed to send configuration submission email:",
          emailError
        );
      }


      // =====================================================
      // RESPONSE
      // =====================================================

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Configurations submitted successfully",

          submittedCount:
            updateResult.modifiedCount,

          configurationIDs:
            uniqueConfigurationIDs,

          // null for standalone submissions.
          project:
            project
              ? {
                projectID:
                  project.projectID,
                projectNumber:
                  project.projectNumber,
                projectName:
                  project.projectName,
                customerDetails:
                  project.customerDetails,
              }
              : null,

          configurations:
            submittedConfigurations.map(
              (item) => ({
                configurationID:
                  item.configurationID,

                configurationName:
                  item.configurationName,

                productType:
                  item.productType,

                productName:
                  item.productName,

                rfqNumber:
                  item.rfqNumber,

                projectID:
                  item.projectID,

                projectNumber:
                  item.projectNumber,

                projectName:
                  item.projectName,

                customerDetails:
                  project
                    ? project.customerDetails
                    : item.customerDetails,

                quantity:
                  item.numRequested,

                status:
                  item.status,

                adminStatus:
                  item.adminStatus,

                submittedAt:
                  item.submittedAt,

                adminRequestedAt:
                  item.adminRequestedAt,

                adminStatusChangedAt:
                  item.adminStatusChangedAt ||
                  item.adminRequestedAt ||
                  item.submittedAt ||
                  null,
              })
            ),
        });

    } catch (error) {
      console.error(
        "PUT /api/configurations error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to submit configurations",

          error:
            error.message,
        });
    }
  }
);


// =========================================================
// GET /api/configurations/projects
//
// Projects of the logged-in user, newest first. Used by the
// Finalize dialog's "Add to existing project" option.
//
// Must stay above GET /:configurationID.
// =========================================================

router.get(
  "/projects",
  authenticate,
  async (req, res) => {
    try {
      const projects =
        await Project.find({
          userID:
            req.user.userID,
        })
          .sort({
            createdAt: -1,
          })
          .lean();

      return res
        .status(200)
        .json({
          success: true,

          data:
            projects.map(
              (project) => ({
                projectID:
                  project.projectID,
                projectNumber:
                  project.projectNumber,
                projectName:
                  project.projectName,
                // null for old projects: Finalize asks for
                // the details before sending.
                customerDetails:
                  project.customerDetails || null,
                createdAt:
                  project.createdAt,
              })
            ),
        });
    } catch (error) {
      console.error(
        "GET /api/configurations/projects error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to fetch projects",

          error:
            error.message,
        });
    }
  }
);


// =========================================================
// PATCH /api/configurations/projects/:projectID/details
//
// The project owner edits the project's customer details.
// Every RFQ in the project shows the new details.
//
// Body: { customerDetails: { customer, finalCustomer,
//         contact, additionalInfo } }
// =========================================================

router.patch(
  "/projects/:projectID/details",
  authenticate,
  async (req, res) => {
    try {
      const project =
        await Project.findOne({
          projectID:
            req.params.projectID,
          userID:
            req.user.userID,
        });

      if (!project) {
        return res
          .status(404)
          .json({
            success: false,
            errorCode:
              "PROJECT_NOT_FOUND",
            message:
              "Project not found",
          });
      }

      const normalized =
        normalizeCustomerDetails(
          req.body?.customerDetails
        );

      if (normalized.error) {
        return res
          .status(400)
          .json({
            success: false,
            errorCode:
              "CUSTOMER_DETAILS_INVALID",
            message:
              normalized.error,
          });
      }

      project.customerDetails =
        normalized.value;
      project.customerDetailsUpdatedAt =
        new Date();
      project.customerDetailsUpdatedBy = {
        userID:
          req.user.userID,
        username:
          req.user.username,
        firstName:
          req.user.firstName || "",
        lastName:
          req.user.lastName || "",
      };

      await project.save();

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Project details updated",

          project: {
            projectID:
              project.projectID,
            projectNumber:
              project.projectNumber,
            projectName:
              project.projectName,
            customerDetails:
              project.customerDetails,
            customerDetailsUpdatedAt:
              project.customerDetailsUpdatedAt,
          },
        });
    } catch (error) {
      console.error(
        "PATCH /api/configurations/projects/:projectID/details error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to update project details",

          error:
            error.message,
        });
    }
  }
);


// =========================================================
// GET /api/configurations/:configurationID
//
// PURPOSE:
//
// Fetch complete information for ONE submitted/completed
// configuration.
//
// configurationID is the permanent tracking ID.
//
// User status and admin workflow status are returned
// separately.
//
// NEW:
//
// This response also returns:
//
// adminStatusChangedAt
// activityHistory
//
// This allows frontend/admin UI to show:
//
// - current status timer
// - complete activity timeline
// - who made each change
// - from -> to values
// =========================================================

router.get(
  "/:configurationID",
  authenticate,
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;


      const query = {
        configurationID,
      };


      // ===================================================
      // NORMAL USER
      //
      // Can see only own configuration.
      //
      // ADMIN
      //
      // Can fetch any configuration.
      // ===================================================

      if (
        req.user.role !==
        "admin"
      ) {
        query.userID =
          req.user.userID;
      }


      const configuration =
        await ProductConfiguration.findOne(
          query
        );


      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Configuration not found",
          });
      }


      const projectDetails =
        await projectCustomerDetailsMap([
          configuration,
        ]);


      return res
        .status(200)
        .json({
          success: true,

          configuration: {
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

            rfqNumber:
              configuration.rfqNumber,

            projectID:
              configuration.projectID,

            projectNumber:
              configuration.projectNumber,

            projectName:
              configuration.projectName,

            customerDetails:
              customerDetailsFor(
                configuration,
                projectDetails
              ),

            status:
              configuration.status,

            adminStatus:
              configuration.adminStatus,

            isComplete:
              configuration.isComplete,

            numRequested:
              configuration.numRequested,

            configurationData:
              configuration.configurationData,

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

            // ---------------------------------------------
            // CURRENT ADMIN STATUS START TIME
            //
            // Legacy fallback retained.
            // ---------------------------------------------

            adminStatusChangedAt:
              configuration.adminStatusChangedAt ||
              configuration.adminStartedAt ||
              configuration.adminRequestedAt ||
              configuration.submittedAt ||
              null,

            // ---------------------------------------------
            // COMPLETE AUDIT / ACTIVITY HISTORY
            // ---------------------------------------------

            activityHistory:
              Array.isArray(
                configuration.activityHistory
              )
                ? configuration.activityHistory
                : [],

            createdAt:
              configuration.createdAt,

            updatedAt:
              configuration.updatedAt,
          },
        });

    } catch (error) {
      console.error(
        "GET /api/configurations/:configurationID error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to fetch configuration",

          error:
            error.message,
        });
    }
  }
);


// =========================================================
// DELETE /api/configurations/:configurationID
//
// HARD DELETE ONE configuration.
//
// NORMAL USER:
//
// Can delete ONLY their own configuration.
//
// ADMIN:
//
// Can delete any user's configuration.
//
// Permanent tracking is done using configurationID.
// =========================================================

router.delete(
  "/:configurationID",
  authenticate,
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;


      const query = {
        configurationID,
      };


      // Normal user ownership restriction

      if (
        req.user.role !==
        "admin"
      ) {
        query.userID =
          req.user.userID;
      }


      const deletedConfiguration =
        await ProductConfiguration
          .findOneAndDelete(
            query
          );


      if (
        !deletedConfiguration
      ) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Configuration not found",
          });
      }


      return res
        .status(200)
        .json({
          success: true,

          message:
            "Configuration deleted successfully",

          configurationID:
            deletedConfiguration.configurationID,
        });


    } catch (error) {
      console.error(
        "DELETE /api/configurations/:configurationID error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to delete configuration",

          error:
            error.message,
        });
    }
  }
);


module.exports = router;