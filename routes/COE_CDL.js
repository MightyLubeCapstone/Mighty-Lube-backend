// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const COE_CDL = require("../models/COE_CDL");

// const router = express.Router();

// router.post("/", authenticate, async (req, res) => {
//     //used for COE_CDL form
//     try {
//         const { COE_CDLData, numRequested } = req.body;
//         const order = new COE_CDL({
//             ...(COE_CDLData.conveyorName && { conveyorName: COE_CDLData.conveyorName }),
//             ...(COE_CDLData.chainSize && { chainSize: COE_CDLData.chainSize }),
//             ...(COE_CDLData.otherChainSize && { otherChainSize: COE_CDLData.otherChainSize }),
//             ...(COE_CDLData.appEnviroment && { appEnviroment: COE_CDLData.appEnviroment }),
//             ...(COE_CDLData.ovenStatus && { ovenStatus: COE_CDLData.ovenStatus }),
//             ...(COE_CDLData.ovenTemp && { ovenTemp: COE_CDLData.ovenTemp }),
//             ...(COE_CDLData.otherAppEnviroment && { otherAppEnviroment: COE_CDLData.otherAppEnviroment }),
//             ...(COE_CDLData.controlVoltSingle && { controlVoltSingle: COE_CDLData.controlVoltSingle }),
//         });
//         req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "COE_CDL" });
//         await req.user.save();

//         return res.status(200).json({ message: "COE_CDL entry added" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;

/**
 * COE_CDL Route (POST)
 * -------------------
 * ✅ Update done:
 * 1) Added optional technicianNote (trim + save only if non-empty)
 * 2) Added safe guards so API doesn't crash if COE_CDLData is missing
 *
 * NOTE:
 * - Ensure your COE_CDL mongoose schema includes:
 *   technicianNote: { type: String, required: false }
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (unused here, safe to remove)
const { authenticate } = require("./sessions");
const COE_CDL = require("../models/COE_CDL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  // ✅ Used for COE_CDL form
  try {
    // ✅ Read request body safely
    const { COE_CDLData, numRequested } = req.body || {};

    // ✅ Guard: if payload missing, return 400 instead of crashing
    if (!COE_CDLData) {
      return res.status(400).json({ error: "COE_CDLData is required" });
    }

    // ✅ Create a Mongoose document (stored inside user's cart)
    const order = new COE_CDL({
      // -------------------------
      // Basic configuration fields (optional)
      // -------------------------
      ...(COE_CDLData.conveyorName && { conveyorName: COE_CDLData.conveyorName }),
      ...(COE_CDLData.chainSize && { chainSize: COE_CDLData.chainSize }),
      ...(COE_CDLData.otherChainSize && { otherChainSize: COE_CDLData.otherChainSize }),

      // -------------------------
      // Environment fields (optional)
      // -------------------------
      ...(COE_CDLData.appEnviroment && { appEnviroment: COE_CDLData.appEnviroment }),
      ...(COE_CDLData.ovenStatus && { ovenStatus: COE_CDLData.ovenStatus }),
      ...(COE_CDLData.ovenTemp && { ovenTemp: COE_CDLData.ovenTemp }),
      ...(COE_CDLData.otherAppEnviroment && { otherAppEnviroment: COE_CDLData.otherAppEnviroment }),

      // -------------------------
      // Electrical fields (optional)
      // -------------------------
      ...(COE_CDLData.controlVoltSingle && { controlVoltSingle: COE_CDLData.controlVoltSingle }),

      /**
       * ✅ NEW: technicianNote (optional)
       * Frontend should send: COE_CDLData.technicianNote
       */
      ...(COE_CDLData.technicianNote &&
        COE_CDLData.technicianNote.trim() && {
          technicianNote: COE_CDLData.technicianNote.trim(),
        }),
    });

    // ✅ Add item into user's cart
    req.user.cart.push({
      numRequested: numRequested,
      productConfigurationInfo: order,
      productType: "COE_CDL",
    });

    // ✅ Save user so cart persists
    await req.user.save();

    return res.status(200).json({ message: "COE_CDL entry added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
