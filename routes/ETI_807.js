// // routes/ETI_807.js
// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const ETI_807 = require("../models/ETI_807");

// const router = express.Router();

// router.post("/", authenticate, async (req, res) => {
//     try {
//         const { ETI_807Data, numRequested } = req.body;

//         const order = new ETI_807({
//             conveyorName: ETI_807Data.conveyorName,
//             industrialChainManufacturer: ETI_807Data.industrialChainManufacturer,
//             ...(ETI_807Data.otherIndustrialChainManufacturer && { otherIndustrialChainManufacturer: ETI_807Data.otherIndustrialChainManufacturer }),
//             ...(ETI_807Data.conveyorLength && { conveyorLength: ETI_807Data.conveyorLength }),
//             ...(ETI_807Data.conveyorLengthUnit && { conveyorLengthUnit: ETI_807Data.conveyorLengthUnit }),
//         });

//         req.user.cart.push({ 
//             numRequested, 
//             productConfigurationInfo: order, 
//             productType: "ETI_807" 
//         });
//         await req.user.save();

//         return res.status(200).json({ message: "ETI_807 entry added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;



/**
 * routes/ETI_807.js
 * -----------------
 * ✅ What this file does:
 * - Receives ETI_807 form data from frontend
 * - Converts it into a MongoDB (Mongoose) document
 * - Pushes that configuration into the logged-in user’s cart
 * - Supports optional fields safely
 * - Adds technicianNote (NEW)
 *
 * IMPORTANT:
 * - Make sure ETI_807 mongoose schema has:
 *   technicianNote: { type: String, required: false }
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (not directly used here, safe to remove)
const { authenticate } = require("./sessions");
const ETI_807 = require("../models/ETI_807");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    /**
     * Frontend sends payload like:
     * {
     *   ETI_807Data: { ...form fields... },
     *   numRequested: 2
     * }
     */
    const { ETI_807Data, numRequested } = req.body || {};

    // ✅ Safety check – avoid runtime crash
    if (!ETI_807Data) {
      return res.status(400).json({ error: "ETI_807Data is required" });
    }

    /**
     * ✅ Create a new ETI_807 configuration object
     * This object is NOT saved directly to DB.
     * It is stored inside user's cart first.
     */
    const order = new ETI_807({
      // Required / primary fields
      conveyorName: ETI_807Data.conveyorName,
      industrialChainManufacturer: ETI_807Data.industrialChainManufacturer,

      // Optional fields – added only if provided by frontend
      ...(ETI_807Data.otherIndustrialChainManufacturer && {
        otherIndustrialChainManufacturer:
          ETI_807Data.otherIndustrialChainManufacturer,
      }),
      ...(ETI_807Data.conveyorLength && {
        conveyorLength: ETI_807Data.conveyorLength,
      }),
      ...(ETI_807Data.conveyorLengthUnit && {
        conveyorLengthUnit: ETI_807Data.conveyorLengthUnit,
      }),

      /**
       * ✅ NEW FIELD: technicianNote
       * - Free-text note entered by technician
       * - Trimmed to avoid saving empty spaces
       */
      ...(ETI_807Data.technicianNote &&
        ETI_807Data.technicianNote.trim() && {
          technicianNote: ETI_807Data.technicianNote.trim(),
        }),
    });

    /**
     * ✅ Push configuration into authenticated user's cart
     * Cart structure:
     * {
     *   numRequested,
     *   productConfigurationInfo,
     *   productType
     * }
     */
    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "ETI_807",
    });

    // ✅ Persist cart update in MongoDB
    await req.user.save();

    // ✅ Success response
    return res.status(200).json({ message: "ETI_807 entry added" });
  } catch (error) {
    // ✅ Log actual error for debugging
    console.error(error);

    // ✅ Generic error response to client
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
