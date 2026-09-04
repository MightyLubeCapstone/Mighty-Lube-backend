const express = require("express");
const { dbConnect } = require("../config/config"); // kept (even if unused)
const { authenticate } = require("./sessions");
const OH_CCS_OP8NP = require("../models/OH_CCS_OP8NP");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OH_CCS_OP8NPData, numRequested } = req.body;

    const order = new OH_CCS_OP8NP({
      // =========================================================
      // GENERAL INFORMATION
      // =========================================================

      ...(OH_CCS_OP8NPData.conveyorName && {
        conveyorName: OH_CCS_OP8NPData.conveyorName,
      }),

      ...(OH_CCS_OP8NPData.conveyorChainSize && {
        conveyorChainSize: OH_CCS_OP8NPData.conveyorChainSize,
      }),

      ...(OH_CCS_OP8NPData.otherConveyorChainSize && {
        otherConveyorChainSize: OH_CCS_OP8NPData.otherConveyorChainSize,
      }),

      ...(OH_CCS_OP8NPData.chainManufacturer && {
        chainManufacturer: OH_CCS_OP8NPData.chainManufacturer,
      }),

      ...(OH_CCS_OP8NPData.otherChainManufacturer && {
        otherChainManufacturer: OH_CCS_OP8NPData.otherChainManufacturer,
      }),

      ...(OH_CCS_OP8NPData.conveyorLength && {
        conveyorLength: OH_CCS_OP8NPData.conveyorLength,
      }),

      ...(OH_CCS_OP8NPData.conveyorLengthUnit && {
        conveyorLengthUnit: OH_CCS_OP8NPData.conveyorLengthUnit,
      }),

      applicationEnvironment:
        OH_CCS_OP8NPData.applicationEnvironment,

      conveyorLoadState:
        OH_CCS_OP8NPData.conveyorLoadState,

      // =========================================================
      // OVERHEAD POWER RAIL: MEASUREMENTS
      // =========================================================

      ...(OH_CCS_OP8NPData.measurementUnit && {
        measurementUnit: OH_CCS_OP8NPData.measurementUnit,
      }),

      ...(OH_CCS_OP8NPData.chainDropA && {
        chainDropA: OH_CCS_OP8NPData.chainDropA,
      }),

      ...(OH_CCS_OP8NPData.overheadPowerMonoRailPowerTrolleyWheelB && {
        overheadPowerMonoRailPowerTrolleyWheelB:
          OH_CCS_OP8NPData.overheadPowerMonoRailPowerTrolleyWheelB,
      }),

      ...(OH_CCS_OP8NPData.overheadPowerMonoRailPowerRailG && {
        overheadPowerMonoRailPowerRailG:
          OH_CCS_OP8NPData.overheadPowerMonoRailPowerRailG,
      }),

      ...(OH_CCS_OP8NPData.overheadPowerMonoRailPowerRailH && {
        overheadPowerMonoRailPowerRailH:
          OH_CCS_OP8NPData.overheadPowerMonoRailPowerRailH,
      }),

      // =========================================================
      // TECHNICIAN NOTE
      // =========================================================

      technicianNote:
        OH_CCS_OP8NPData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OH_CCS_OP8NP",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OH_CCS_OP8NP entry added",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router