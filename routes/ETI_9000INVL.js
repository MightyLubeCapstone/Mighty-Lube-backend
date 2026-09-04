const express = require("express");
const { authenticate } = require("./sessions");
const ETI_9000INVL = require("../models/ETI_9000INVL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { ETI_9000INVLData, numRequested } = req.body || {};

    // =====================================================
    // BASIC REQUEST VALIDATION
    // =====================================================

    if (!ETI_9000INVLData) {
      return res.status(400).json({
        error: "ETI_9000INVLData is required",
      });
    }

    if (!numRequested || numRequested < 1) {
      return res.status(400).json({
        error: "numRequested must be at least 1",
      });
    }

    // =====================================================
    // BUILD PRODUCT CONFIGURATION
    // =====================================================

    const order = new ETI_9000INVL({
      // ===================================================
      // GENERAL INFORMATION
      // ===================================================

      conveyorName: ETI_9000INVLData.conveyorName,

      chainSize: ETI_9000INVLData.chainSize,

      ...(ETI_9000INVLData.otherChainSize &&
        ETI_9000INVLData.otherChainSize.trim() && {
          otherChainSize: ETI_9000INVLData.otherChainSize.trim(),
        }),

      industrialChainManufacturer:
        ETI_9000INVLData.industrialChainManufacturer,

      ...(ETI_9000INVLData.otherIndustrialChainManufacturer &&
        ETI_9000INVLData.otherIndustrialChainManufacturer.trim() && {
          otherIndustrialChainManufacturer:
            ETI_9000INVLData.otherIndustrialChainManufacturer.trim(),
        }),

      conveyorLength: ETI_9000INVLData.conveyorLength,

      conveyorLengthUnit:
        ETI_9000INVLData.conveyorLengthUnit,

      conveyorSpeed:
        ETI_9000INVLData.conveyorSpeed,

      conveyorSpeedUnit:
        ETI_9000INVLData.conveyorSpeedUnit,

      ...(ETI_9000INVLData.conveyorIndex &&
        ETI_9000INVLData.conveyorIndex.trim() && {
          conveyorIndex:
            ETI_9000INVLData.conveyorIndex.trim(),
        }),

      travelDirection:
        ETI_9000INVLData.travelDirection,

      appEnviroment:
        ETI_9000INVLData.appEnviroment,

      ...(ETI_9000INVLData.otherAppEnviroment &&
        ETI_9000INVLData.otherAppEnviroment.trim() && {
          otherAppEnviroment:
            ETI_9000INVLData.otherAppEnviroment.trim(),
        }),

      ...(ETI_9000INVLData.ovenStatus && {
        ovenStatus:
          ETI_9000INVLData.ovenStatus,
      }),

      ...(ETI_9000INVLData.ovenTemp &&
        ETI_9000INVLData.ovenTemp.trim() && {
          ovenTemp:
            ETI_9000INVLData.ovenTemp.trim(),
        }),

      surroundingTemp:
        ETI_9000INVLData.surroundingTemp,

      conveyorLoaded:
        ETI_9000INVLData.conveyorLoaded,

      conveyorSwing:
        ETI_9000INVLData.conveyorSwing,

      // ===================================================
      // CUSTOMER POWER UTILITIES
      // ===================================================

      operatingVoltage:
        ETI_9000INVLData.operatingVoltage,

      controlVoltage:
        ETI_9000INVLData.controlVoltage,

      // ===================================================
      // MONITORING SYSTEM
      // ===================================================

      existingMonitoring:
        ETI_9000INVLData.existingMonitoring,

      newMonitoringSystem:
        ETI_9000INVLData.newMonitoringSystem,

      // ===================================================
      // CONVEYOR SPECIFICATIONS
      // ===================================================

      ...(ETI_9000INVLData.openRaceStyle &&
        ETI_9000INVLData.openRaceStyle.trim() && {
          openRaceStyle:
            ETI_9000INVLData.openRaceStyle.trim(),
        }),

      ...(ETI_9000INVLData.sealedStyle && {
        sealedStyle:
          ETI_9000INVLData.sealedStyle,
      }),

      ...(ETI_9000INVLData.powerChain &&
        ETI_9000INVLData.powerChain.trim() && {
          powerChain:
            ETI_9000INVLData.powerChain.trim(),
        }),

      ...(ETI_9000INVLData.chainPins &&
        ETI_9000INVLData.chainPins.trim() && {
          chainPins:
            ETI_9000INVLData.chainPins.trim(),
        }),

      ...(ETI_9000INVLData.catDriveStatus && {
        catDriveStatus:
          ETI_9000INVLData.catDriveStatus,
      }),

      ...(ETI_9000INVLData.catDriveNum &&
        ETI_9000INVLData.catDriveNum.trim() && {
          catDriveNum:
            ETI_9000INVLData.catDriveNum.trim(),
        }),

      ...(ETI_9000INVLData.railLubrication && {
        railLubrication:
          ETI_9000INVLData.railLubrication,
      }),

      ...(ETI_9000INVLData.externalLubeStatus && {
        externalLubeStatus:
          ETI_9000INVLData.externalLubeStatus,
      }),

      ...(ETI_9000INVLData.lubeBrand &&
        ETI_9000INVLData.lubeBrand.trim() && {
          lubeBrand:
            ETI_9000INVLData.lubeBrand.trim(),
        }),

      ...(ETI_9000INVLData.lubeType &&
        ETI_9000INVLData.lubeType.trim() && {
          lubeType:
            ETI_9000INVLData.lubeType.trim(),
        }),

      ...(ETI_9000INVLData.lubeViscosity &&
        ETI_9000INVLData.lubeViscosity.trim() && {
          lubeViscosity:
            ETI_9000INVLData.lubeViscosity.trim(),
        }),

      ...(ETI_9000INVLData.sideLubeStatus && {
        sideLubeStatus:
          ETI_9000INVLData.sideLubeStatus,
      }),

      ...(ETI_9000INVLData.topLubeStatus && {
        topLubeStatus:
          ETI_9000INVLData.topLubeStatus,
      }),

      ...(ETI_9000INVLData.reservoirSize && {
        reservoirSize:
          ETI_9000INVLData.reservoirSize,
      }),

      ...(ETI_9000INVLData.reservoirQuantity &&
        ETI_9000INVLData.reservoirQuantity.trim() && {
          reservoirQuantity:
            ETI_9000INVLData.reservoirQuantity.trim(),
        }),

      ...(ETI_9000INVLData.chainCleanStatus && {
        chainCleanStatus:
          ETI_9000INVLData.chainCleanStatus,
      }),

      // ===================================================
      // CONTROLLER
      // ===================================================

      ...(ETI_9000INVLData.mightyLubeMonitoring && {
        mightyLubeMonitoring:
          ETI_9000INVLData.mightyLubeMonitoring,
      }),

      ...(ETI_9000INVLData.ctrStatus && {
        ctrStatus:
          ETI_9000INVLData.ctrStatus,
      }),

      ...(ETI_9000INVLData.plcConnection && {
        plcConnection:
          ETI_9000INVLData.plcConnection,
      }),

      ...(ETI_9000INVLData.monitorControlStatus && {
        monitorControlStatus:
          ETI_9000INVLData.monitorControlStatus,
      }),

      ...(ETI_9000INVLData.otherControllerInfo &&
        ETI_9000INVLData.otherControllerInfo.trim() && {
          otherControllerInfo:
            ETI_9000INVLData.otherControllerInfo.trim(),
        }),

      ...(ETI_9000INVLData.controllerSpecialOptions &&
        ETI_9000INVLData.controllerSpecialOptions.trim() && {
          controllerSpecialOptions:
            ETI_9000INVLData.controllerSpecialOptions.trim(),
        }),

      ...(ETI_9000INVLData.controllerSpecialOptionsSpecify &&
        ETI_9000INVLData.controllerSpecialOptionsSpecify.trim() && {
          controllerSpecialOptionsSpecify:
            ETI_9000INVLData.controllerSpecialOptionsSpecify.trim(),
        }),

      // ===================================================
      // WIRE
      // ===================================================

      wireMeasurementUnit:
        ETI_9000INVLData.wireMeasurementUnit,

      ...(ETI_9000INVLData.conductor2 &&
        ETI_9000INVLData.conductor2.trim() && {
          conductor2:
            ETI_9000INVLData.conductor2.trim(),
        }),

      ...(ETI_9000INVLData.conductor4 &&
        ETI_9000INVLData.conductor4.trim() && {
          conductor4:
            ETI_9000INVLData.conductor4.trim(),
        }),

      ...(ETI_9000INVLData.conductor7 &&
        ETI_9000INVLData.conductor7.trim() && {
          conductor7:
            ETI_9000INVLData.conductor7.trim(),
        }),

      ...(ETI_9000INVLData.conductor12 &&
        ETI_9000INVLData.conductor12.trim() && {
          conductor12:
            ETI_9000INVLData.conductor12.trim(),
        }),

      ...(ETI_9000INVLData.junctionBoxNum &&
        ETI_9000INVLData.junctionBoxNum.trim() && {
          junctionBoxNum:
            ETI_9000INVLData.junctionBoxNum.trim(),
        }),

      // ===================================================
      // ENCLOSED TRACK INVERTED MEASUREMENTS
      // ===================================================

      enclosedUnitType:
        ETI_9000INVLData.enclosedUnitType,

      enclosedTrackB:
        ETI_9000INVLData.enclosedTrackB,

      enclosedTrackG:
        ETI_9000INVLData.enclosedTrackG,

      enclosedTrackH:
        ETI_9000INVLData.enclosedTrackH,

      enclosedTrackS:
        ETI_9000INVLData.enclosedTrackS,

      enclosedTrackK2:
        ETI_9000INVLData.enclosedTrackK2,

      enclosedTrackL2:
        ETI_9000INVLData.enclosedTrackL2,

      enclosedTrackM2:
        ETI_9000INVLData.enclosedTrackM2,

      enclosedTrackN2:
        ETI_9000INVLData.enclosedTrackN2,

      enclosedTrackS2:
        ETI_9000INVLData.enclosedTrackS2,

      // ===================================================
      // TECHNICIAN NOTE
      // ===================================================

      ...(ETI_9000INVLData.technicianNote &&
        ETI_9000INVLData.technicianNote.trim() && {
          technicianNote:
            ETI_9000INVLData.technicianNote.trim(),
        }),
    });

    // =====================================================
    // VALIDATE CONFIGURATION BEFORE ADDING TO CART
    // =====================================================

    await order.validate();

    // =====================================================
    // ADD TO AUTHENTICATED USER CART
    // =====================================================

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "ETI_9000INVL",
    });

    await req.user.save();

    return res.status(200).json({
      message: "ETI_9000INVL entry added",
    });
  } catch (error) {
    console.error(
      "ETI_9000INVL configuration error:",
      error
    );

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router