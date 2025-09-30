// This file is the same as the file in the routes folder
// This file will be placed on the GCP in the path: routes\user_orders.js
// Small additions to the app.js file on the GCP will need to be added to set up proper routing
// After app.js is updated and a local instance of mongodb is set up with test data, test the file by running node app.js in a cmd. There should return console logs for each step
    /*

    To be added to app.js:
    Line 15: const user_orders = require("./routes/user_orders");
    Line 88: app.use("/api/user_orders", user_orders);

    */

const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const User = require("../models/user");


const router = express.Router();

// Sanity Check
router.get('/', (req, res) => {
  res.send('User Orders API is running');
});


// GET /api/user_orders/admin/userRaw
// NOTE: Lock this down with authenticate + admin check before prod.
router.get('/admin/userRaw', authenticate, async (req, res) => {
  try {
    await dbConnect();

    const shape = (req.query.shape || 'raw').toLowerCase(); // 'raw' | 'flatten'
    const includeSensitive = String(req.query.includeSensitive || 'false').toLowerCase() === 'true';
    const limit = Math.min(parseInt(req.query.limit || '500', 10) || 500, 5000);
    const skip = parseInt(req.query.skip || '0', 10) || 0;

    // Build base projection (exclude sensitive by default)
    const baseProjection = includeSensitive
      ? {} // include everything
      : { password: 0, sessions: 0, __v: 0 };

    // Detect wrapper vs normal layout
    const sample = await User.findOne({}, { users: 1 }).lean();

    if (shape === 'raw') {
      // RAW: return documents exactly as stored in the users collection
      // If wrapper exists, you’ll see it as-is.
      const docs = await User.find({}, baseProjection).skip(skip).limit(limit).lean();
      return res.status(200).json({
        shape: 'raw',
        count: docs.length,
        skip,
        limit,
        includeSensitive,
        data: docs,
      });
    }

    // FLATTEN: normalize to an array of user docs
    if (sample && Array.isArray(sample.users)) {
      // Wrapper layout: unwind users[]
      const docs = await User.aggregate([
        { $unwind: '$users' },
        // Optionally strip sensitive fields
        ...(includeSensitive
          ? []
          : [{ $project: { 'users.password': 0, 'users.sessions': 0, 'users.__v': 0 } }]),
        // Page AFTER unwind to keep page sizes meaningful
        { $skip: skip },
        { $limit: limit },
        // Return the inner users object only
        { $replaceRoot: { newRoot: '$users' } }
      ]);

      return res.status(200).json({
        shape: 'flatten',
        count: docs.length,
        skip,
        limit,
        includeSensitive,
        data: docs,
      });
    } else {
      // Normal layout: one doc per user
      const docs = await User.find({}, baseProjection).skip(skip).limit(limit).lean();
      return res.status(200).json({
        shape: 'flatten',
        count: docs.length,
        skip,
        limit,
        includeSensitive,
        data: docs,
      });
    }
  } catch (err) {
    console.error('Error in /admin/userRaw:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// /api/user_orders/allCarts
router.get('/allCarts', authenticate, async (_req, res) => {
  try {
    await dbConnect();

    const sample = await User.findOne({}, { users: 1, cart: 1, username: 1 }).lean();

    let items = [];
    if (sample && Array.isArray(sample.users)) {
      items = await User.aggregate([
        { $unwind: '$users' },
        { $unwind: { path: '$users.configurations', preserveNullAndEmptyArrays: false } },
        {
          $project: {
            _id: 0,
            userID: '$users.userID',
            username: '$users.username',
            productConfigurationInfo: '$users.configurations',
          }
        },
        { $sort: { orderCreated: -1, orderID: 1 } }
      ]);
    } else {
      // Layout B: normal one-doc-per-user (future-proof)
      items = await User.aggregate([
        { $unwind: { path: '$configurations', preserveNullAndEmptyArrays: false } },
        {
          $project: {
            _id: 0,
            userID: 1,
            username: 1,
            productConfigurationInfo: '$configurations',
          }
        },
        { $sort: { orderCreated: -1, orderID: 1 } }
      ]);
    }

    console.log(`Fetched ${items.length} cart items from all users.`);
    return res.status(200).json(items);
  } catch (err) {
    console.error('Error in /allCarts:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;