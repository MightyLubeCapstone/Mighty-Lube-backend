const express = require("express");
const uuid = require("uuid");

const { authenticate } = require("./sessions");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// =========================================================
// GET /api/drafts
//
// PURPOSE:
//
// Fetch all drafts belonging to logged-in user.
//
// Draft records are stored inside:
//
// product_configurations
//
// where:
//
// userID = logged-in user
// status = "draft"
//
// Response is grouped by draftID so frontend can show:
//
// Factory Draft
//   - ETI_91
//   - MLCC5CL
//
// Another Draft
//   - FGCO
// =========================================================

router.get("/", authenticate, async (req, res) => {
  try {
    const draftItems = await ProductConfiguration.find({
      userID: req.user.userID,
      status: "draft",
    }).sort({
      updatedAt: -1,
    });


    // Empty drafts is not an error
    if (!draftItems.length) {
      return res.status(200).json({
        success: true,
        count: 0,
        drafts: [],
      });
    }


    // =====================================================
    // GROUP DRAFT ITEMS BY draftID
    // =====================================================

    const draftMap = new Map();


    draftItems.forEach((item) => {
      // Fallback is useful for an old/incomplete migrated item
      const key =
        item.draftID ||
        item.configurationID;


      if (!draftMap.has(key)) {
        draftMap.set(key, {
          draftID:
            item.draftID || null,

          draftTitle:
            item.draftTitle || "Untitled Draft",

          createdAt:
            item.createdAt,

          updatedAt:
            item.updatedAt,

          items: [],
        });
      }


      const draft = draftMap.get(key);


      draft.items.push({
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

        isComplete:
          item.isComplete,

        createdAt:
          item.createdAt,

        updatedAt:
          item.updatedAt,
      });


      // Keep latest updatedAt for group
      if (
        item.updatedAt &&
        (!draft.updatedAt ||
          item.updatedAt > draft.updatedAt)
      ) {
        draft.updatedAt =
          item.updatedAt;
      }
    });


    const drafts =
      Array.from(draftMap.values());


    return res.status(200).json({
      success: true,

      count:
        drafts.length,

      drafts,
    });

  } catch (error) {

    console.error(
      "GET /api/drafts error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch drafts",

      error:
        error.message,
    });
  }
});


// =========================================================
// PUT /api/drafts
//
// PURPOSE:
//
// Move one or multiple CART configurations into one draft.
//
// Frontend body:
//
// {
//   "draftTitle": "Factory Setup",
//   "configurationIDs": [
//      "id-1",
//      "id-2",
//      "id-3"
//   ]
// }
//
// Even if only ONE configuration is selected:
//
// {
//   "draftTitle": "My Draft",
//   "configurationIDs": [
//      "id-1"
//   ]
// }
//
// Backend will:
//
// status:
// cart -> draft
//
// and assign SAME:
//
// draftID
// draftTitle
//
// to all selected configurations.
// =========================================================

router.put("/", authenticate, async (req, res) => {
  try {
    const {
      draftTitle,
      configurationIDs,
    } = req.body;


    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !draftTitle ||
      typeof draftTitle !== "string" ||
      draftTitle.trim() === ""
    ) {
      return res.status(400).json({
        success: false,

        message:
          "draftTitle is required",
      });
    }


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


    // Remove duplicates if frontend accidentally sends
    // same configurationID more than once.
    const uniqueConfigurationIDs = [
      ...new Set(configurationIDs),
    ];


    // =====================================================
    // VERIFY CONFIGURATIONS
    //
    // Important security rule:
    //
    // Only logged-in user's cart items are allowed.
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
    // CREATE ONE DRAFT ID
    //
    // All selected configurations receive same draftID.
    // =====================================================

    const draftID =
      uuid.v4();


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


    // =====================================================
    // MOVE CART -> DRAFT
    // =====================================================

    const updateResult =
      await ProductConfiguration.updateMany(
        {
          configurationID: {
            $in: uniqueConfigurationIDs,
          },

          userID:
            req.user.userID,

          status:
            "cart",
        },

        {
          $set: {
            status:
              "draft",

            draftID,

            draftTitle:
              draftTitle.trim(),

            updatedBy:
              actor,
          },
        }
      );


    return res.status(200).json({
      success: true,

      message:
        "Configurations saved as draft successfully",

      draftID,

      draftTitle:
        draftTitle.trim(),

      configurationIDs:
        uniqueConfigurationIDs,

      count:
        updateResult.modifiedCount,
    });

  } catch (error) {

    console.error(
      "PUT /api/drafts error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to save draft",

      error:
        error.message,
    });
  }
});


// =========================================================
// PUT /api/drafts/restore
//
// PURPOSE:
//
// Restore an entire draft back to cart.
//
// Frontend body:
//
// {
//   "draftID": "..."
// }
//
// All configurations having this draftID:
//
// draft -> cart
//
// draftID and draftTitle are cleared.
// =========================================================

router.put(
  "/restore",
  authenticate,
  async (req, res) => {
    try {

      const {
        draftID,
      } = req.body;


      if (!draftID) {
        return res.status(400).json({
          success: false,

          message:
            "draftID is required",
        });
      }


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


      const result =
        await ProductConfiguration.updateMany(
          {
            userID:
              req.user.userID,

            draftID,

            status:
              "draft",
          },

          {
            $set: {
              status:
                "cart",

              draftID:
                null,

              draftTitle:
                null,

              updatedBy:
                actor,
            },
          }
        );


      if (
        result.matchedCount === 0
      ) {
        return res.status(404).json({
          success: false,

          message:
            "Draft not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "Draft restored to cart successfully",

        draftID,

        restoredCount:
          result.modifiedCount,
      });

    } catch (error) {

      console.error(
        "PUT /api/drafts/restore error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to restore draft",

        error:
          error.message,
      });
    }
  }
);


// =========================================================
// DELETE /api/drafts
//
// PURPOSE:
//
// Delete an entire saved draft.
//
// Frontend body:
//
// {
//   "draftID": "..."
// }
//
// This permanently deletes ALL ProductConfiguration
// records belonging to that draft.
//
// User can delete ONLY their own draft.
// =========================================================

router.delete("/", authenticate, async (req, res) => {
  try {

    const {
      draftID,
    } = req.body;


    if (!draftID) {
      return res.status(400).json({
        success: false,

        message:
          "draftID is required",
      });
    }


    const result =
      await ProductConfiguration.deleteMany({
        userID:
          req.user.userID,

        draftID,

        status:
          "draft",
      });


    if (
      result.deletedCount === 0
    ) {
      return res.status(404).json({
        success: false,

        message:
          "Draft not found",
      });
    }


    return res.status(200).json({
      success: true,

      message:
        "Draft deleted successfully",

      draftID,

      deletedCount:
        result.deletedCount,
    });

  } catch (error) {

    console.error(
      "DELETE /api/drafts error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to delete draft",

      error:
        error.message,
    });
  }
});


module.exports = router;