const express = require("express");
const { authenticate } = require("./sessions");
const FRO_OEB = require("../models/FRO_OEB");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { FRO_OEBData, numRequested } = req.body || {};

    if (!FRO_OEBData) {
      return res.status(400).json({
        error: "FRO_OEBData is required",
      });
    }

    const order = new FRO_OEB({
      // =====================================================
      // GENERAL INFORMATION
      // =====================================================

      conveyorName: FRO_OEBData.conveyorName || "",

      conveyorChainSize:
        FRO_OEBData.conveyorChainSize || "",

      chainManufacturer:
        FRO_OEBData.chainManufacturer || "",

      conveyorLength:
        FRO_OEBData.conveyorLength || "",

      conveyorLengthUnit:
        FRO_OEBData.conveyorLengthUnit || "",

      applicationEnvironment:
        FRO_OEBData.applicationEnvironment || "",

      otherApplicationEnvironment:
        FRO_OEBData.otherApplicationEnvironment || "",

      surroundingTemperature:
        FRO_OEBData.surroundingTemperature || "",

      // =====================================================
      // FREE RAIL: MEASUREMENTS
      // =====================================================

      measurementUnit:
        FRO_OEBData.measurementUnit || "",

      overheadFreeRailChainDropA:
        FRO_OEBData.overheadFreeRailChainDropA || "",

      overheadFreeRailPowerTrolleyWheelB:
        FRO_OEBData.overheadFreeRailPowerTrolleyWheelB || "",

      overheadFreeRailRailG:
        FRO_OEBData.overheadFreeRailRailG || "",

      overheadFreeRailRailH:
        FRO_OEBData.overheadFreeRailRailH || "",

      overheadFreeRailTrolleyWheelVerticalL:
        FRO_OEBData.overheadFreeRailTrolleyWheelVerticalL || "",

      invertedPowerFreeChainDropA:
        FRO_OEBData.invertedPowerFreeChainDropA || "",

      invertedPowerFreePowerTrolleyWheelB:
        FRO_OEBData.invertedPowerFreePowerTrolleyWheelB || "",

      invertedPowerFreeRailG:
        FRO_OEBData.invertedPowerFreeRailG || "",

      invertedPowerFreeRailH:
        FRO_OEBData.invertedPowerFreeRailH || "",

      invertedPowerFreeTrolleyWheelPitchK:
        FRO_OEBData.invertedPowerFreeTrolleyWheelPitchK || "",

      // =====================================================
      // TECHNICIAN NOTE
      // Legacy-retained optional field
      // =====================================================

      technicianNote:
        FRO_OEBData.technicianNote || "",
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "FRO_OEB",
    });

    await req.user.save();

    return res.status(200).json({
      message: "FRO_OEB entry added",
    });
  } catch (error) {
    console.log("FRO_OEB add error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router