// const express = require("express");
// const { dbConnect } = require("../config/config");
// const { authenticate } = require("./sessions");
// const CCO_OEB = require("../models/CCO_OEB");

// const router = express.Router();

// router.post("/", authenticate, async (req, res) => {
//     try {
//         const { CCO_OEBData, numRequested } = req.body;
//         const order = new CCO_OEB({
//             conveyorName: CCO_OEBData.conveyorName,
//             chainSize: CCO_OEBData.chainSize,
//             ...(CCO_OEBData.otherChainSize && { otherChainSize: CCO_OEBData.otherChainSize }),
//             industrialChainManufacturer: CCO_OEBData.industrialChainManufacturer,
//             ...(CCO_OEBData.otherChainManufacturer && { otherChainManufacturer: CCO_OEBData.otherChainManufacturer }),
//             ...(CCO_OEBData.appEnviroment && { appEnviroment: CCO_OEBData.appEnviroment }),
//             ...(CCO_OEBData.ovenStatus && { ovenStatus: CCO_OEBData.ovenStatus }),
//             ...(CCO_OEBData.ovenTemp && { ovenTemp: CCO_OEBData.ovenTemp }),
//             ...(CCO_OEBData.otherAppEnviroment && { otherAppEnviroment: CCO_OEBData.otherAppEnviroment }),
//             ...(CCO_OEBData.surroundingTemp && { surroundingTemp: CCO_OEBData.surroundingTemp }),
//             ...(CCO_OEBData.ohpUnitType && { ohpUnitType: CCO_OEBData.ohpUnitType }),
//             chainDrop: CCO_OEBData.chainDrop,
//             ...(CCO_OEBData.freeRailDiameter && { freeRailDiameter: CCO_OEBData.freeRailDiameter }),
//             ...(CCO_OEBData.freeRailWidth && { freeRailWidth: CCO_OEBData.freeRailWidth }),
//             ...(CCO_OEBData.freeRaiHeight && { freeRaiHeight: CCO_OEBData.freeRaiHeight }),
//             ...(CCO_OEBData.freeRaiVerticle && { freeRaiVerticle: CCO_OEBData.freeRaiVerticle }),
//             ...(CCO_OEBData.freeRailInvertedChain && { freeRailInvertedChain: CCO_OEBData.freeRailInvertedChain }),
//             ...(CCO_OEBData.freeRailInvertedDiameter && { freeRailInvertedDiameter: CCO_OEBData.freeRailInvertedDiameter }),
//             ...(CCO_OEBData.freeRailInvertedWidth && { freeRailInvertedWidth: CCO_OEBData.freeRailInvertedWidth }),
//             ...(CCO_OEBData.freeRailInvertedHeight && { freeRailInvertedHeight: CCO_OEBData.freeRailInvertedHeight }),
//             ...(CCO_OEBData.freeRailInvertedPitch && { freeRailInvertedPitch: CCO_OEBData.freeRailInvertedPitch }),

//         });
//         req.user.cart.push({
//             numRequested,
//             productConfigurationInfo: order,
//             productType: "CCO_OEB"
//         });
//         await req.user.save();
//         return res.status(200).json({ message: "CCO_OEB entry added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;


/**
 * CCO_OEB Route (POST)
 * -------------------
 * ✅ Update done:
 * 1) Added optional technicianNote (trim + save only if non-empty)
 * 2) Added small safety checks so code doesn't crash if CCO_OEBData is missing
 *
 * NOTE:
 * - Ensure your CCO_OEB mongoose schema includes:
 *   technicianNote: { type: String, required: false }
 */

const express = require("express");
const { dbConnect } = require("../config/config"); // (unused here, safe to remove)
const { authenticate } = require("./sessions");
const CCO_OEB = require("../models/CCO_OEB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    // ✅ Read payload safely
    const { CCO_OEBData, numRequested } = req.body || {};

    // ✅ Basic guard (prevents crash if frontend sends wrong body)
    if (!CCO_OEBData) {
      return res.status(400).json({ error: "CCO_OEBData is required" });
    }

    // ✅ Create Mongoose document (not saved directly; stored inside user cart)
    const order = new CCO_OEB({
      // -------------------------
      // Main CCO_OEB fields
      // -------------------------
      conveyorName: CCO_OEBData.conveyorName,

      chainSize: CCO_OEBData.chainSize,
      ...(CCO_OEBData.otherChainSize && { otherChainSize: CCO_OEBData.otherChainSize }),

      industrialChainManufacturer: CCO_OEBData.industrialChainManufacturer,
      ...(CCO_OEBData.otherChainManufacturer && {
        otherChainManufacturer: CCO_OEBData.otherChainManufacturer,
      }),

      ...(CCO_OEBData.appEnviroment && { appEnviroment: CCO_OEBData.appEnviroment }),
      ...(CCO_OEBData.ovenStatus && { ovenStatus: CCO_OEBData.ovenStatus }),
      ...(CCO_OEBData.ovenTemp && { ovenTemp: CCO_OEBData.ovenTemp }),
      ...(CCO_OEBData.otherAppEnviroment && { otherAppEnviroment: CCO_OEBData.otherAppEnviroment }),
      ...(CCO_OEBData.surroundingTemp && { surroundingTemp: CCO_OEBData.surroundingTemp }),
      ...(CCO_OEBData.ohpUnitType && { ohpUnitType: CCO_OEBData.ohpUnitType }),

      chainDrop: CCO_OEBData.chainDrop,

      // -------------------------
      // Free rail data (optional)
      // -------------------------
      ...(CCO_OEBData.freeRailDiameter && { freeRailDiameter: CCO_OEBData.freeRailDiameter }),
      ...(CCO_OEBData.freeRailWidth && { freeRailWidth: CCO_OEBData.freeRailWidth }),
      ...(CCO_OEBData.freeRaiHeight && { freeRaiHeight: CCO_OEBData.freeRaiHeight }),
      ...(CCO_OEBData.freeRaiVerticle && { freeRaiVerticle: CCO_OEBData.freeRaiVerticle }),

      // Inverted rail fields (optional)
      ...(CCO_OEBData.freeRailInvertedChain && { freeRailInvertedChain: CCO_OEBData.freeRailInvertedChain }),
      ...(CCO_OEBData.freeRailInvertedDiameter && { freeRailInvertedDiameter: CCO_OEBData.freeRailInvertedDiameter }),
      ...(CCO_OEBData.freeRailInvertedWidth && { freeRailInvertedWidth: CCO_OEBData.freeRailInvertedWidth }),
      ...(CCO_OEBData.freeRailInvertedHeight && { freeRailInvertedHeight: CCO_OEBData.freeRailInvertedHeight }),
      ...(CCO_OEBData.freeRailInvertedPitch && { freeRailInvertedPitch: CCO_OEBData.freeRailInvertedPitch }),

      /**
       * ✅ NEW: technicianNote (optional)
       * Frontend should send: CCO_OEBData.technicianNote
       */
      ...(CCO_OEBData.technicianNote &&
        CCO_OEBData.technicianNote.trim() && {
          technicianNote: CCO_OEBData.technicianNote.trim(),
        }),
    });

    // ✅ Push into authenticated user's cart
    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "CCO_OEB",
    });

    // ✅ Save user so cart is persisted
    await req.user.save();

    return res.status(200).json({ message: "CCO_OEB entry added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
