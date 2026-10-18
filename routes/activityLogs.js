const express = require("express");

const ActivityLog = require("../models/activity_log");

const {
  authenticate,
  requireAdmin,
} = require("./sessions");


const router = express.Router();


// =========================================================
// ALL ACTIVITY LOG ROUTES REQUIRE:
//
// 1. Valid login session
// 2. Admin role
// =========================================================

router.use(
  authenticate,
  requireAdmin
);


const ENTITY_TYPES = [
  "AUTH",
  "CONFIGURATION",
  "USER",
  "RFQ",
];

const MAX_LIMIT = 100;


function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}


// =========================================================
// GET /api/admin/activity-logs
//
// Query (all optional):
//
// page        default 1
// limit       default 30, max 100
// entityType  AUTH / CONFIGURATION / USER / RFQ
// from        ISO date, createdAt >= from
// to          ISO date, createdAt <= to
// search      matches message, action, actor name/email,
//             entity label
//
// Response:
//
// {
//   "data": [ { "id": "...", "createdAt": "...", ... } ],
//   "page": 1,
//   "limit": 30,
//   "total": 120
// }
//
// Newest first.
// =========================================================

router.get(
  "/",
  async (req, res) => {
    try {
      const page = Math.max(
        parseInt(req.query.page, 10) || 1,
        1
      );

      const limit = Math.min(
        Math.max(parseInt(req.query.limit, 10) || 30, 1),
        MAX_LIMIT
      );

      const filter = {};

      const entityType =
        `${req.query.entityType || ""}`.trim().toUpperCase();

      if (entityType) {
        if (!ENTITY_TYPES.includes(entityType)) {
          return res.status(400).json({
            success: false,
            message: `entityType must be one of ${ENTITY_TYPES.join(", ")}`,
          });
        }

        filter.entityType = entityType;
      }

      const from = parseDate(req.query.from);
      const to = parseDate(req.query.to);

      if (from || to) {
        filter.createdAt = {};

        if (from) {
          filter.createdAt.$gte = from;
        }

        if (to) {
          filter.createdAt.$lte = to;
        }
      }

      const search = `${req.query.search || ""}`.trim();

      if (search) {
        const pattern = new RegExp(
          escapeRegex(search.slice(0, 100)),
          "i"
        );

        filter.$or = [
          { message: pattern },
          { action: pattern },
          { actorName: pattern },
          { actorEmail: pattern },
          { entityLabel: pattern },
        ];
      }

      const [logs, total] = await Promise.all([
        ActivityLog.find(filter)
          .sort({ createdAt: -1, _id: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),

        ActivityLog.countDocuments(filter),
      ]);

      return res.status(200).json({
        data: logs.map(({ _id, ...log }) => ({
          id: _id.toString(),
          ...log,
        })),
        page,
        limit,
        total,
      });
    } catch (error) {
      console.error("Activity logs fetch error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to load activity logs",
      });
    }
  }
);


module.exports = router;
