const express = require("express");
const { authenticate } = require("./sessions");
const ETO_2100 = require("../models/ETO_2100");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { ETO_2100Data, numRequested } = req.body || {};

    // =========================================================
    // BASIC REQUEST VALIDATION
    // =========================================================

    if (
      !ETO_2100Data ||
      typeof ETO_2100Data !== "object" ||
      Array.isArray(ETO_2100Data)
    ) {
      return res.status(400).json({
        error: "ETO_2100Data is required",
      });
    }

    const quantity = Number(numRequested);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).json({
        error: "numRequested must be a positive number",
      });
    }

    // =========================================================
    // CURRENT WEBSITE / REUSABLE FLUTTER DATA
    // =========================================================

    const orderData = {
      // -------------------------------------------------------
      // GENERAL INFORMATION
      // -------------------------------------------------------

      conveyorName: ETO_2100Data.conveyorName,

      chainSize: ETO_2100Data.chainSize,
      otherChainSize: ETO_2100Data.otherChainSize,

      industrialChainManufacturer:
        ETO_2100Data.industrialChainManufacturer,

      otherIndustrialChainManufacturer:
        ETO_2100Data.otherIndustrialChainManufacturer,

      conveyorLength: ETO_2100Data.conveyorLength,
      conveyorLengthUnit: ETO_2100Data.conveyorLengthUnit,

      conveyorSpeed: ETO_2100Data.conveyorSpeed,
      conveyorSpeedUnit: ETO_2100Data.conveyorSpeedUnit,

      conveyorIndex: ETO_2100Data.conveyorIndex,
      travelDirection: ETO_2100Data.travelDirection,

      appEnviroment: ETO_2100Data.appEnviroment,
      otherAppEnviroment: ETO_2100Data.otherAppEnviroment,

      surroundingTemp: ETO_2100Data.surroundingTemp,
      conveyorLoaded: ETO_2100Data.conveyorLoaded,
      conveyorSwing: ETO_2100Data.conveyorSwing,

      // -------------------------------------------------------
      // CUSTOMER POWER UTILITIES
      // -------------------------------------------------------

      operatingVoltage: ETO_2100Data.operatingVoltage,
      controlVoltage: ETO_2100Data.controlVoltage,

      // -------------------------------------------------------
      // NEW / EXISTING MONITORING
      // -------------------------------------------------------

      existingMonitoring: ETO_2100Data.existingMonitoring,
      newMonitoringSystem: ETO_2100Data.newMonitoringSystem,

      // -------------------------------------------------------
      // CONVEYOR SPECIFICATIONS
      // -------------------------------------------------------

      wheelOpenType: ETO_2100Data.wheelOpenType,
      wheelClosedType: ETO_2100Data.wheelClosedType,

      powerChain: ETO_2100Data.powerChain,
      chainPins: ETO_2100Data.chainPins,

      catDriveStatus: ETO_2100Data.catDriveStatus,
      catDriveNum: ETO_2100Data.catDriveNum,

      railLubeStatus: ETO_2100Data.railLubeStatus,
      externalLubeStatus: ETO_2100Data.externalLubeStatus,

      lubeBrand: ETO_2100Data.lubeBrand,
      lubeType: ETO_2100Data.lubeType,
      lubeViscosity: ETO_2100Data.lubeViscosity,

      sideLubeStatus: ETO_2100Data.sideLubeStatus,
      topLubeStatus: ETO_2100Data.topLubeStatus,
      chainCleanStatus: ETO_2100Data.chainCleanStatus,

      // -------------------------------------------------------
      // WIRE
      // -------------------------------------------------------

      wireMeasurementUnit: ETO_2100Data.wireMeasurementUnit,

      conductor2: ETO_2100Data.conductor2,
      conductor4: ETO_2100Data.conductor4,
      conductor7: ETO_2100Data.conductor7,
      conductor12: ETO_2100Data.conductor12,

      junctionBoxNum: ETO_2100Data.junctionBoxNum,

      // -------------------------------------------------------
      // ENCLOSED TRACK OVERHEAD MEASUREMENTS
      // -------------------------------------------------------

      etUnitType: ETO_2100Data.etUnitType,

      etOverheadB: ETO_2100Data.etOverheadB,
      etOverheadG: ETO_2100Data.etOverheadG,
      etOverheadH: ETO_2100Data.etOverheadH,
      etOverheadS: ETO_2100Data.etOverheadS,

      etOverheadK2: ETO_2100Data.etOverheadK2,

      // Current reusable Flutter / website key
      etOverheadL2: ETO_2100Data.etOverheadL2,

      etOverheadM2: ETO_2100Data.etOverheadM2,

      measurementDropdown:
        ETO_2100Data.measurementDropdown,

      etOverheadN2: ETO_2100Data.etOverheadN2,
      etOverheadS2: ETO_2100Data.etOverheadS2,
    };

    // =========================================================
    // LEGACY COMPATIBILITY
    //
    // Keep support for fields sent by the old Flutter app.
    // These are no longer required by the new reusable form.
    // =========================================================

    if (ETO_2100Data.ovenStatus !== undefined) {
      orderData.ovenStatus = ETO_2100Data.ovenStatus;
    }

    if (ETO_2100Data.ovenTemp !== undefined) {
      orderData.ovenTemp = ETO_2100Data.ovenTemp;
    }

    if (ETO_2100Data.freeCarrierSystem !== undefined) {
      orderData.freeCarrierSystem =
        ETO_2100Data.freeCarrierSystem;
    }

    if (ETO_2100Data.addFreeCarrier !== undefined) {
      orderData.addFreeCarrier =
        ETO_2100Data.addFreeCarrier;
    }

    /*
     * Old measurement key.
     *
     * Old code used etOverheadLS.
     * Current reusable Flutter uses etOverheadL2.
     */
    if (ETO_2100Data.etOverheadLS !== undefined) {
      orderData.etOverheadLS =
        ETO_2100Data.etOverheadLS;

      /*
       * If an old client sends LS but not L2,
       * also populate the new L2 field.
       */
      if (orderData.etOverheadL2 === undefined) {
        orderData.etOverheadL2 =
          ETO_2100Data.etOverheadLS;
      }
    }

    // ---------------------------------------------------------
    // LEGACY MONITORING TEMPLATE
    // ---------------------------------------------------------

    if (
      ETO_2100Data.monitorData &&
      typeof ETO_2100Data.monitorData === "object"
    ) {
      orderData.monitorData =
        ETO_2100Data.monitorData;
    } else if (
      ETO_2100Data.templateA &&
      typeof ETO_2100Data.templateA === "object"
    ) {
      orderData.monitorData =
        ETO_2100Data.templateA;
    }

    // ---------------------------------------------------------
    // LEGACY TEMPLATE B
    // ---------------------------------------------------------

    if (
      ETO_2100Data.templateBData &&
      typeof ETO_2100Data.templateBData === "object"
    ) {
      orderData.templateBData =
        ETO_2100Data.templateBData;
    } else if (
      ETO_2100Data.templateB &&
      typeof ETO_2100Data.templateB === "object"
    ) {
      orderData.templateBData =
        ETO_2100Data.templateB;
    }

    // ---------------------------------------------------------
    // LEGACY TEMPLATE C
    // ---------------------------------------------------------

    if (
      ETO_2100Data.templateCData &&
      typeof ETO_2100Data.templateCData === "object"
    ) {
      orderData.templateCData =
        ETO_2100Data.templateCData;
    } else if (
      ETO_2100Data.templateC &&
      typeof ETO_2100Data.templateC === "object"
    ) {
      orderData.templateCData =
        ETO_2100Data.templateC;
    }

    // ---------------------------------------------------------
    // LEGACY TEMPLATE E
    // ---------------------------------------------------------

    if (
      ETO_2100Data.templateEData &&
      typeof ETO_2100Data.templateEData === "object"
    ) {
      orderData.templateEData =
        ETO_2100Data.templateEData;
    } else if (
      ETO_2100Data.templateE &&
      typeof ETO_2100Data.templateE === "object"
    ) {
      orderData.templateEData =
        ETO_2100Data.templateE;
    }

    // ---------------------------------------------------------
    // LEGACY TECHNICIAN NOTE
    // Not present on current website.
    // Preserve only when an old client sends it.
    // ---------------------------------------------------------

    if (
      typeof ETO_2100Data.technicianNote === "string" &&
      ETO_2100Data.technicianNote.trim()
    ) {
      orderData.technicianNote =
        ETO_2100Data.technicianNote.trim();
    }

    // =========================================================
    // CREATE + VALIDATE CONFIGURATION
    // =========================================================

    const order = new ETO_2100(orderData);

    await order.validate();

    // =========================================================
    // ADD TO AUTHENTICATED USER CART
    // =========================================================

    req.user.cart.push({
      numRequested: quantity,
      productConfigurationInfo: order,
      productType: "ETO_2100",
    });

    await req.user.save();

    return res.status(200).json({
      message: "ETO_2100 entry added",
    });
  } catch (error) {
    console.error("ETO_2100 error:", error);

    if (error?.name === "ValidationError") {
      return res.status(400).json({
        error: "Invalid ETO_2100 configuration",
        details: error.message,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router