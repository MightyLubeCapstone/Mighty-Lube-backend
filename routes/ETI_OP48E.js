const express = require("express");
const { authenticate } = require("./sessions");
const ETI_OP48E = require("../models/ETI_OP48E");

const router = express.Router();

/**
 * POST /api/eti_op48e
 *
 * Adds OP-48E configuration to authenticated user's cart.
 *
 * Supports:
 * 1. New reusable Flutter flat payload.
 * 2. Legacy template data when it is still sent.
 */
router.post("/", authenticate, async (req, res) => {
  try {
    const { ETI_OP48EData, numRequested } = req.body || {};

    // =========================================================
    // BASIC REQUEST VALIDATION
    // =========================================================

    if (
      !ETI_OP48EData ||
      typeof ETI_OP48EData !== "object" ||
      Array.isArray(ETI_OP48EData)
    ) {
      return res.status(400).json({
        error: "ETI_OP48EData is required",
      });
    }

    if (
      numRequested === undefined ||
      numRequested === null ||
      Number(numRequested) <= 0
    ) {
      return res.status(400).json({
        error: "A valid numRequested is required",
      });
    }

    // =========================================================
    // NEW WEBSITE / REUSABLE FLUTTER DATA
    // =========================================================

    const orderData = {
      // -------------------------------------------------------
      // General Information
      // -------------------------------------------------------

      ...(ETI_OP48EData.conveyorName !== undefined && {
        conveyorName: ETI_OP48EData.conveyorName,
      }),

      ...(ETI_OP48EData.chainSize !== undefined && {
        chainSize: ETI_OP48EData.chainSize,
      }),

      ...(ETI_OP48EData.otherChainSize !== undefined && {
        otherChainSize: ETI_OP48EData.otherChainSize,
      }),

      ...(ETI_OP48EData.industrialChainManufacturer !== undefined && {
        industrialChainManufacturer:
          ETI_OP48EData.industrialChainManufacturer,
      }),

      ...(ETI_OP48EData.otherIndustrialChainManufacturer !== undefined && {
        otherIndustrialChainManufacturer:
          ETI_OP48EData.otherIndustrialChainManufacturer,
      }),

      ...(ETI_OP48EData.conveyorLength !== undefined && {
        conveyorLength: ETI_OP48EData.conveyorLength,
      }),

      ...(ETI_OP48EData.conveyorLengthUnit !== undefined && {
        conveyorLengthUnit: ETI_OP48EData.conveyorLengthUnit,
      }),

      ...(ETI_OP48EData.conveyorSpeed !== undefined && {
        conveyorSpeed: ETI_OP48EData.conveyorSpeed,
      }),

      ...(ETI_OP48EData.conveyorSpeedUnit !== undefined && {
        conveyorSpeedUnit: ETI_OP48EData.conveyorSpeedUnit,
      }),

      ...(ETI_OP48EData.conveyorIndex !== undefined && {
        conveyorIndex: ETI_OP48EData.conveyorIndex,
      }),

      ...(ETI_OP48EData.travelDirection !== undefined && {
        travelDirection: ETI_OP48EData.travelDirection,
      }),

      ...(ETI_OP48EData.appEnviroment !== undefined && {
        appEnviroment: ETI_OP48EData.appEnviroment,
      }),

      ...(ETI_OP48EData.otherAppEnviroment !== undefined && {
        otherAppEnviroment: ETI_OP48EData.otherAppEnviroment,
      }),

      ...(ETI_OP48EData.surroundingTemp !== undefined && {
        surroundingTemp: ETI_OP48EData.surroundingTemp,
      }),

      ...(ETI_OP48EData.conveyorLoaded !== undefined && {
        conveyorLoaded: ETI_OP48EData.conveyorLoaded,
      }),

      ...(ETI_OP48EData.conveyorSwing !== undefined && {
        conveyorSwing: ETI_OP48EData.conveyorSwing,
      }),

      // -------------------------------------------------------
      // Customer Power Utilities
      // -------------------------------------------------------

      ...(ETI_OP48EData.operatingVoltage !== undefined && {
        operatingVoltage: ETI_OP48EData.operatingVoltage,
      }),

      ...(ETI_OP48EData.controlVoltage !== undefined && {
        controlVoltage: ETI_OP48EData.controlVoltage,
      }),

      // -------------------------------------------------------
      // Monitoring
      // -------------------------------------------------------

      ...(ETI_OP48EData.existingMonitoring !== undefined && {
        existingMonitoring: ETI_OP48EData.existingMonitoring,
      }),

      ...(ETI_OP48EData.newMonitoringSystem !== undefined && {
        newMonitoringSystem: ETI_OP48EData.newMonitoringSystem,
      }),

      // -------------------------------------------------------
      // Conveyor Specifications
      // -------------------------------------------------------

      ...(ETI_OP48EData.wheelOpenType !== undefined && {
        wheelOpenType: ETI_OP48EData.wheelOpenType,
      }),

      ...(ETI_OP48EData.wheelClosedType !== undefined && {
        wheelClosedType: ETI_OP48EData.wheelClosedType,
      }),

      ...(ETI_OP48EData.openStatus !== undefined && {
        openStatus: ETI_OP48EData.openStatus,
      }),

      ...(ETI_OP48EData.freeTrolleyWheels !== undefined && {
        freeTrolleyWheels: ETI_OP48EData.freeTrolleyWheels,
      }),

      ...(ETI_OP48EData.guideRollers !== undefined && {
        guideRollers: ETI_OP48EData.guideRollers,
      }),

      ...(ETI_OP48EData.guideRollersOpenRaceStyle !== undefined && {
        guideRollersOpenRaceStyle:
          ETI_OP48EData.guideRollersOpenRaceStyle,
      }),

      ...(ETI_OP48EData.guideRollersSealedStyle !== undefined && {
        guideRollersSealedStyle:
          ETI_OP48EData.guideRollersSealedStyle,
      }),

      ...(ETI_OP48EData.holeStatus !== undefined && {
        holeStatus: ETI_OP48EData.holeStatus,
      }),

      ...(ETI_OP48EData.dogActuator !== undefined && {
        dogActuator: ETI_OP48EData.dogActuator,
      }),

      ...(ETI_OP48EData.pivotPoints !== undefined && {
        pivotPoints: ETI_OP48EData.pivotPoints,
      }),

      ...(ETI_OP48EData.kingPin !== undefined && {
        kingPin: ETI_OP48EData.kingPin,
      }),

      ...(ETI_OP48EData.railLubeStatus !== undefined && {
        railLubeStatus: ETI_OP48EData.railLubeStatus,
      }),

      ...(ETI_OP48EData.lubeBrand !== undefined && {
        lubeBrand: ETI_OP48EData.lubeBrand,
      }),

      ...(ETI_OP48EData.lubeType !== undefined && {
        lubeType: ETI_OP48EData.lubeType,
      }),

      ...(ETI_OP48EData.lubeViscosity !== undefined && {
        lubeViscosity: ETI_OP48EData.lubeViscosity,
      }),

      ...(ETI_OP48EData.sideLubeStatus !== undefined && {
        sideLubeStatus: ETI_OP48EData.sideLubeStatus,
      }),

      ...(ETI_OP48EData.topLubeStatus !== undefined && {
        topLubeStatus: ETI_OP48EData.topLubeStatus,
      }),

      // -------------------------------------------------------
      // Controller
      // -------------------------------------------------------

      ...(ETI_OP48EData.chainMaster !== undefined && {
        chainMaster: ETI_OP48EData.chainMaster,
      }),

      ...(ETI_OP48EData.timerStatus !== undefined && {
        timerStatus: ETI_OP48EData.timerStatus,
      }),

      ...(ETI_OP48EData.electricStatus !== undefined && {
        electricStatus: ETI_OP48EData.electricStatus,
      }),

      ...(ETI_OP48EData.pneumaticStatus !== undefined && {
        pneumaticStatus: ETI_OP48EData.pneumaticStatus,
      }),

      ...(ETI_OP48EData.mightyLubeMonitoring !== undefined && {
        mightyLubeMonitoring: ETI_OP48EData.mightyLubeMonitoring,
      }),

      ...(ETI_OP48EData.plcConnection !== undefined && {
        plcConnection: ETI_OP48EData.plcConnection,
      }),

      ...(ETI_OP48EData.otherControllerInfo !== undefined && {
        otherControllerInfo: ETI_OP48EData.otherControllerInfo,
      }),

      ...(ETI_OP48EData.controllerSpecialOptions !== undefined && {
        controllerSpecialOptions:
          ETI_OP48EData.controllerSpecialOptions,
      }),

      ...(ETI_OP48EData.controllerSpecialOptionsSpecify !== undefined && {
        controllerSpecialOptionsSpecify:
          ETI_OP48EData.controllerSpecialOptionsSpecify,
      }),

      // -------------------------------------------------------
      // Enclosed Track Inverted Measurements
      // -------------------------------------------------------

      ...(ETI_OP48EData.measurementUnits !== undefined && {
        measurementUnits: ETI_OP48EData.measurementUnits,
      }),

      ...(ETI_OP48EData.enclosedTrackB !== undefined && {
        enclosedTrackB: ETI_OP48EData.enclosedTrackB,
      }),

      ...(ETI_OP48EData.enclosedTrackG !== undefined && {
        enclosedTrackG: ETI_OP48EData.enclosedTrackG,
      }),

      ...(ETI_OP48EData.enclosedTrackH !== undefined && {
        enclosedTrackH: ETI_OP48EData.enclosedTrackH,
      }),

      ...(ETI_OP48EData.enclosedTrackS !== undefined && {
        enclosedTrackS: ETI_OP48EData.enclosedTrackS,
      }),

      ...(ETI_OP48EData.enclosedTrackK2 !== undefined && {
        enclosedTrackK2: ETI_OP48EData.enclosedTrackK2,
      }),

      ...(ETI_OP48EData.enclosedTrackL2 !== undefined && {
        enclosedTrackL2: ETI_OP48EData.enclosedTrackL2,
      }),

      ...(ETI_OP48EData.enclosedTrackM2 !== undefined && {
        enclosedTrackM2: ETI_OP48EData.enclosedTrackM2,
      }),

      ...(ETI_OP48EData.enclosedTrackN2 !== undefined && {
        enclosedTrackN2: ETI_OP48EData.enclosedTrackN2,
      }),

      ...(ETI_OP48EData.enclosedTrackS2 !== undefined && {
        enclosedTrackS2: ETI_OP48EData.enclosedTrackS2,
      }),

      // =======================================================
      // LEGACY FIELDS
      // Preserve when an older client still sends them.
      // =======================================================

      ...(ETI_OP48EData.ovenStatus !== undefined && {
        ovenStatus: ETI_OP48EData.ovenStatus,
      }),

      ...(ETI_OP48EData.ovenTemp !== undefined && {
        ovenTemp: ETI_OP48EData.ovenTemp,
      }),

      ...(ETI_OP48EData.addFreeCarrier !== undefined && {
        addFreeCarrier: ETI_OP48EData.addFreeCarrier,
      }),

      ...(ETI_OP48EData.catDriveStatus !== undefined && {
        catDriveStatus: ETI_OP48EData.catDriveStatus,
      }),

      ...(ETI_OP48EData.catDriveNum !== undefined && {
        catDriveNum: ETI_OP48EData.catDriveNum,
      }),

      ...(ETI_OP48EData.externalLubeStatus !== undefined && {
        externalLubeStatus: ETI_OP48EData.externalLubeStatus,
      }),

      ...(ETI_OP48EData.enclosedUnitType !== undefined && {
        enclosedUnitType: ETI_OP48EData.enclosedUnitType,
      }),

      ...(ETI_OP48EData.technicianNote !== undefined && {
        technicianNote: ETI_OP48EData.technicianNote,
      }),
    };

    // =========================================================
    // LEGACY TEMPLATE COMPATIBILITY
    // =========================================================
    //
    // Old clients used:
    // templateA
    // templateB
    // templateC
    // templateF
    //
    // Current database schema stores them as:
    // monitorData
    // templateBData
    // templateCData
    // templateFData
    //
    // New reusable Flutter does not need these.
    // =========================================================

    if (ETI_OP48EData.monitorData) {
      orderData.monitorData = ETI_OP48EData.monitorData;
    } else if (ETI_OP48EData.templateA) {
      orderData.monitorData = ETI_OP48EData.templateA;
    }

    if (ETI_OP48EData.templateBData) {
      orderData.templateBData = ETI_OP48EData.templateBData;
    } else if (ETI_OP48EData.templateB) {
      orderData.templateBData = ETI_OP48EData.templateB;
    }

    if (ETI_OP48EData.templateCData) {
      orderData.templateCData = ETI_OP48EData.templateCData;
    } else if (ETI_OP48EData.templateC) {
      orderData.templateCData = ETI_OP48EData.templateC;
    }

    if (ETI_OP48EData.templateFData) {
      orderData.templateFData = ETI_OP48EData.templateFData;
    } else if (ETI_OP48EData.templateF) {
      orderData.templateFData = ETI_OP48EData.templateF;
    }

    // =========================================================
    // CREATE ORDER
    // =========================================================

    const order = new ETI_OP48E(orderData);

    // Validate before putting it into the cart.
    await order.validate();

    // =========================================================
    // ADD TO AUTHENTICATED USER CART
    // =========================================================

    req.user.cart.push({
      numRequested: Number(numRequested),
      productConfigurationInfo: order,
      productType: "ETI_OP48E",
    });

    await req.user.save();

    return res.status(200).json({
      message: "ETI_OP48E entry added",
    });
  } catch (error) {
    console.error("ETI_OP48E add configuration error:", error);

    if (error?.name === "ValidationError") {
      return res.status(400).json({
        error: "Invalid ETI_OP48E configuration",
        details: error.message,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router