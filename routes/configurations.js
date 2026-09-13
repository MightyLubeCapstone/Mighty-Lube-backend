const express = require("express");

const { authenticate } = require("./sessions");
const { sendOrderNotification } = require("../utils/emailnotif");

const ProductConfiguration = require("../models/product_configuration");

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

router.get("/", authenticate, async (req, res) => {
  try {
    const configurations =
      await ProductConfiguration.find({
        userID: req.user.userID,

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


    return res.status(200).json({
      success: true,

      count:
        configurations.length,

      configurations:
        configurations.map((item) => ({
          configurationID:
            item.configurationID,

          configurationName:
            item.configurationName,

          productType:
            item.productType,

          productName:
            item.productName,

          quantity:
            item.numRequested,

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

          createdAt:
            item.createdAt,

          updatedAt:
            item.updatedAt,
        })),
    });

  } catch (error) {
    console.error(
      "GET /api/configurations error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch configurations",

      error:
        error.message,
    });
  }
});


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
// =========================================================

router.put("/", authenticate, async (req, res) => {
  try {
    const {
      configurationIDs,
    } = req.body;


    // =====================================================
    // VALIDATE INPUT
    // =====================================================

    if (
      !Array.isArray(configurationIDs) ||
      configurationIDs.length === 0
    ) {
      return res.status(400).json({
        success: false,

        message:
          "At least one configurationID is required",
      });
    }


    // Remove duplicate IDs
    const uniqueConfigurationIDs = [
      ...new Set(configurationIDs),
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
          $in: uniqueConfigurationIDs,
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
      return res.status(400).json({
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
      incompleteConfigurations.length > 0
    ) {
      return res.status(400).json({
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

            updatedBy:
              actor,

            draftID:
              null,

            draftTitle:
              null,
          },
        }
      );


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
      await sendOrderNotification(
        req.user,
        submittedConfigurations,
        "new"
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

    return res.status(200).json({
      success: true,

      message:
        "Configurations submitted successfully",

      submittedCount:
        updateResult.modifiedCount,

      configurationIDs:
        uniqueConfigurationIDs,

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
          })
        ),
    });

  } catch (error) {
    console.error(
      "PUT /api/configurations error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to submit configurations",

      error:
        error.message,
    });
  }
});


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
        req.user.role !== "admin"
      ) {
        query.userID =
          req.user.userID;
      }


      const configuration =
        await ProductConfiguration.findOne(
          query
        );


      if (!configuration) {
        return res.status(404).json({
          success: false,

          message:
            "Configuration not found",
        });
      }


      return res.status(200).json({
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

      return res.status(500).json({
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
// Can delete ONLY their own configuration.
//
// ADMIN:
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
        req.user.role !== "admin"
      ) {
        query.userID =
          req.user.userID;
      }


      const deletedConfiguration =
        await ProductConfiguration.findOneAndDelete(
          query
        );


      if (!deletedConfiguration) {
        return res.status(404).json({
          success: false,

          message:
            "Configuration not found",
        });
      }


      return res.status(200).json({
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

      return res.status(500).json({
        success: false,

        message:
          "Failed to delete configuration",

        error:
          error.message,
      });
    }
  }
);


module.exports = router