// // routes/ETI_91.js
// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const ETI_91 = require("../models/ETI_91");

// const router = express.Router();

// router.post("/", authenticate, async (req, res) => {
//     try {
//         const { ETI_91Data, numRequested } = req.body;

//         const order = new ETI_91({
//             conveyorName: ETI_91Data.conveyorName,
//             industrialChainManufacturer: ETI_91Data.industrialChainManufacturer,
//             ...(ETI_91Data.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_91Data.otherIndustrialChainManufacturer }),
//             ...(ETI_91Data.conveyorLength && { conveyorLength: ETI_91Data.conveyorLength }),
//             ...(ETI_91Data.conveyorLengthUnit && { conveyorLengthUnit: ETI_91Data.conveyorLengthUnit }),        
//         });

//         req.user.cart.push({ numRequested, productConfigurationInfo: order, productType: "ETI_91" });
//         await req.user.save();

//         return res.status(200).json({ message: "ETI_91 entry added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;


/**
 * routes/ETI_91.js
 * ----------------
 * ✅ Update done:
 * 1) Added optional technicianNote (trim + save only if non-empty)
 * 2) Added safe guards so API doesn't crash if ETI_91Data is missing
 * 3) Added detailed comments
 *
 * NOTE:
 * - Ensure your ETI_91 mongoose schema includes:
 *   technicianNote: { type: String, required: false }
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (unused in this route, safe to remove)
const { authenticate } = require("./sessions");
const ETI_91 = require("../models/ETI_91");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    // ✅ Read request body safely (avoid crash if req.body is undefined)
    const { ETI_91Data, numRequested } = req.body || {};

    // ✅ Validate required payload object
    if (!ETI_91Data) {
      return res.status(400).json({ error: "ETI_91Data is required" });
    }

    // ✅ Create a new Mongoose document (product configuration)
    const order = new ETI_91({
      // Required/basic fields
      conveyorName: ETI_91Data.conveyorName,
      industrialChainManufacturer: ETI_91Data.industrialChainManufacturer,

      // Optional fields (save only if present)
      ...(ETI_91Data.otherIndustrialChainManufacturer && {
        otherIndustrialChainManufacturer: ETI_91Data.otherIndustrialChainManufacturer,
      }),
      ...(ETI_91Data.conveyorLength && { conveyorLength: ETI_91Data.conveyorLength }),
      ...(ETI_91Data.conveyorLengthUnit && { conveyorLengthUnit: ETI_91Data.conveyorLengthUnit }),

      /**
       * ✅ NEW: technicianNote (optional)
       * Frontend should send: ETI_91Data.technicianNote
       */
      ...(ETI_91Data.technicianNote &&
        ETI_91Data.technicianNote.trim() && {
          technicianNote: ETI_91Data.technicianNote.trim(),
        }),
    });

    // ✅ Push this configuration into the authenticated user's cart
    req.user.cart.push({
      numRequested, // how many units the user requested
      productConfigurationInfo: order, // full configuration object
      productType: "ETI_91", // product identifier
    });

    // ✅ Persist the cart update
    await req.user.save();

    // ✅ Return success response
    return res.status(200).json({ message: "ETI_91 entry added" });
  } catch (error) {
    // ✅ Log the error for debugging
    console.error(error);

    // ✅ Return generic server error to client
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
