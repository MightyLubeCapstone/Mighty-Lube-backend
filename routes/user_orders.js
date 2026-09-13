const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate, requireAdmin } = require("./sessions");
const User = require("../models/user");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// =========================================================
// SANITY CHECK
// =========================================================

router.get("/", (req, res) => {
  res.send("User Orders API is running");
});


// =========================================================
// GET /api/user_orders/admin/userRaw
//
// Admin-only endpoint.
//
// Returns raw/flattened user information from users collection.
// Authentication-sensitive fields are never returned.
//
// This endpoint still belongs to User because it deals with
// account information, not product configurations.
// =========================================================

router.get(
  "/admin/userRaw",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      await dbConnect();

      const shape = (req.query.shape || "raw").toLowerCase();

      const limit = Math.min(
        parseInt(req.query.limit || "500", 10) || 500,
        5000
      );

      const skip =
        parseInt(req.query.skip || "0", 10) || 0;


      // Never expose authentication/security information.
      const baseProjection = {
        password: 0,
        securityPin: 0,
        resetCode: 0,
        sessions: 0,
        __v: 0,
      };


      // Detect old wrapper layout versus normal one-user-per-document.
      const sample = await User.findOne(
        {},
        { users: 1 }
      ).lean();


      // =====================================================
      // RAW USER DOCUMENTS
      // =====================================================

      if (shape === "raw") {
        const docs = await User.find(
          {},
          baseProjection
        )
          .skip(skip)
          .limit(limit)
          .lean();

        return res.status(200).json({
          shape: "raw",
          count: docs.length,
          skip,
          limit,
          data: docs,
        });
      }


      // =====================================================
      // FLATTEN OLD WRAPPER STRUCTURE
      // =====================================================

      if (sample && Array.isArray(sample.users)) {
        const docs = await User.aggregate([
          {
            $unwind: "$users",
          },
          {
            $project: {
              "users.password": 0,
              "users.securityPin": 0,
              "users.resetCode": 0,
              "users.sessions": 0,
              "users.__v": 0,
            },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $replaceRoot: {
              newRoot: "$users",
            },
          },
        ]);

        return res.status(200).json({
          shape: "flatten",
          count: docs.length,
          skip,
          limit,
          data: docs,
        });
      }


      // =====================================================
      // NORMAL USER STRUCTURE
      // =====================================================

      const docs = await User.find(
        {},
        baseProjection
      )
        .skip(skip)
        .limit(limit)
        .lean();

      return res.status(200).json({
        shape: "flatten",
        count: docs.length,
        skip,
        limit,
        data: docs,
      });

    } catch (err) {
      console.error(
        "Error in /admin/userRaw:",
        err
      );

      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
);


// =========================================================
// GET /api/user_orders/allCarts
//
// Admin-only.
//
// OLD:
//
// users
//   -> configurations[]
//
// NEW:
//
// product_configurations
//   -> status = "cart"
//
// Each configured product is now its own document.
// No User.configurations array traversal is required.
// =========================================================

router.get(
  "/allCarts",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      await dbConnect();


      // =====================================================
      // OPTIONAL PAGINATION
      // =====================================================

      const limit = Math.min(
        parseInt(req.query.limit || "500", 10) || 500,
        5000
      );

      const skip =
        parseInt(req.query.skip || "0", 10) || 0;


      // =====================================================
      // FETCH ALL CONFIGURATIONS CURRENTLY IN CART
      // =====================================================

      const configurations =
        await ProductConfiguration.find({
          status: "cart",
        })
          .sort({
            createdAt: -1,
            configurationID: 1,
          })
          .skip(skip)
          .limit(limit)
          .lean();


      // =====================================================
      // KEEP RESPONSE EASY FOR EXISTING ADMIN UI
      //
      // productConfigurationInfo now contains the complete
      // ProductConfiguration document instead of an embedded
      // User.configurations object.
      // =====================================================

      const items = configurations.map(
        (configuration) => ({
          userID:
            configuration.userID,

          username:
            configuration.createdBy?.username || "",

          productConfigurationInfo:
            configuration,
        })
      );


      console.log(
        `Fetched ${items.length} cart configurations from product_configurations.`
      );


      return res.status(200).json(items);

    } catch (err) {
      console.error(
        "Error in /allCarts:",
        err
      );

      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
);


module.exports = router