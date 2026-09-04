const express = require("express");
const { authenticate } = require("./sessions");
const IFT_IFTL = require("../models/IFT_IFTL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { IFT_IFTLData, numRequested } = req.body;

    if (!IFT_IFTLData) {
      return res.status(400).json({
        error: "IFT_IFTLData is required",
      });
    }

    const order = new IFT_IFTL({
      // ======================================================
      // GENERAL INFORMATION
      // ======================================================

      conveyorName: IFT_IFTLData.conveyorName,

      conveyorChainSize: IFT_IFTLData.conveyorChainSize,

      otherConveyorChainSize:
        IFT_IFTLData.otherConveyorChainSize,

      chainManufacturer:
        IFT_IFTLData.chainManufacturer,

      otherChainManufacturer:
        IFT_IFTLData.otherChainManufacturer,

      conveyorSpeed:
        IFT_IFTLData.conveyorSpeed,

      conveyorSpeedUnit:
        IFT_IFTLData.conveyorSpeedUnit,

      indexingVariableSpeedConditions:
        IFT_IFTLData.indexingVariableSpeedConditions,

      travelDirection:
        IFT_IFTLData.travelDirection,

      applicationEnvironment:
        IFT_IFTLData.applicationEnvironment,

      otherApplicationEnvironment:
        IFT_IFTLData.otherApplicationEnvironment,

      surroundingTemperature:
        IFT_IFTLData.surroundingTemperature,

      conveyorLoadedStatus:
        IFT_IFTLData.conveyorLoadedStatus,

      conveyorSwingStatus:
        IFT_IFTLData.conveyorSwingStatus,

      conveyorStrand:
        IFT_IFTLData.conveyorStrand,

      // ======================================================
      // CUSTOMER POWER UTILITIES
      // ======================================================

      operatingVoltage:
        IFT_IFTLData.operatingVoltage,

      // ======================================================
      // NEW / EXISTING MONITORING SYSTEM
      // ======================================================

      existingMonitoring:
        IFT_IFTLData.existingMonitoring,

      newMonitoringSystem:
        IFT_IFTLData.newMonitoringSystem,

      // ======================================================
      // CONVEYOR SPECIFICATIONS
      // ======================================================

      wheelOpenRaceStyle:
        IFT_IFTLData.wheelOpenRaceStyle,

      wheelSealedStyle:
        IFT_IFTLData.wheelSealedStyle,

      powerChain:
        IFT_IFTLData.powerChain,

      chainPins:
        IFT_IFTLData.chainPins,

      sliderPlates:
        IFT_IFTLData.sliderPlates,

      freeTrolleyWheels:
        IFT_IFTLData.freeTrolleyWheels,

      guideRollers:
        IFT_IFTLData.guideRollers,

      guideRollersOpenRaceStyle:
        IFT_IFTLData.guideRollersOpenRaceStyle,

      guideRollersSealedStyle:
        IFT_IFTLData.guideRollersSealedStyle,

      dogActuator:
        IFT_IFTLData.dogActuator,

      pivotPoints:
        IFT_IFTLData.pivotPoints,

      kingPin:
        IFT_IFTLData.kingPin,

      rollerChains:
        IFT_IFTLData.rollerChains,

      bushings:
        IFT_IFTLData.bushings,

      riderPlates:
        IFT_IFTLData.riderPlates,

      outboardWheels:
        IFT_IFTLData.outboardWheels,

      caterpillarDrive:
        IFT_IFTLData.caterpillarDrive,

      caterpillarDriveQuantity:
        IFT_IFTLData.caterpillarDriveQuantity,

      railLubrication:
        IFT_IFTLData.railLubrication,

      externalLubrication:
        IFT_IFTLData.externalLubrication,

      currentLubricationEquipmentBrand:
        IFT_IFTLData.currentLubricationEquipmentBrand,

      currentLubricantType:
        IFT_IFTLData.currentLubricantType,

      currentLubricantViscosityGrade:
        IFT_IFTLData.currentLubricantViscosityGrade,

      lubricationFromSideOfChain:
        IFT_IFTLData.lubricationFromSideOfChain,

      lubricationFromTopOfChain:
        IFT_IFTLData.lubricationFromTopOfChain,

      reservoirSize:
        IFT_IFTLData.reservoirSize,

      reservoirSizeQuantity:
        IFT_IFTLData.reservoirSizeQuantity,

      conveyorChainClean:
        IFT_IFTLData.conveyorChainClean,

      // ======================================================
      // CONTROLLER
      // ======================================================

      specialControllerOptions:
        IFT_IFTLData.specialControllerOptions,

      controllerSpecify:
        IFT_IFTLData.controllerSpecify,

      // ======================================================
      // ADDITIONAL OPTIONS AVAILABLE
      // ======================================================

      washDown:
        IFT_IFTLData.washDown,

      // ======================================================
      // IN FLOOR TOWLINE MEASUREMENTS
      // ======================================================

      measurementUnit:
        IFT_IFTLData.measurementUnit,

      inFloorTowlineChainDropA:
        IFT_IFTLData.inFloorTowlineChainDropA,

      inFloorTowlinePowerTrolleyWheelB:
        IFT_IFTLData.inFloorTowlinePowerTrolleyWheelB,

      inFloorTowlinePowerRailG:
        IFT_IFTLData.inFloorTowlinePowerRailG,

      inFloorTowlinePowerRailH:
        IFT_IFTLData.inFloorTowlinePowerRailH,

      inFloorTowlineRailOffsetJ:
        IFT_IFTLData.inFloorTowlineRailOffsetJ,

      inFloorTowlineConveyorHousingS1:
        IFT_IFTLData.inFloorTowlineConveyorHousingS1,

      inFloorTowlineConveyorHousingT1:
        IFT_IFTLData.inFloorTowlineConveyorHousingT1,

      inFloorTowlineConveyorHousingWallU1:
        IFT_IFTLData.inFloorTowlineConveyorHousingWallU1,

      inFloorTowlineConveyorHousingOffsetW1:
        IFT_IFTLData.inFloorTowlineConveyorHousingOffsetW1,

      inFloorTowlineFloorX1:
        IFT_IFTLData.inFloorTowlineFloorX1,

      // ======================================================
      // TECHNICIAN NOTE
      // ======================================================

      technicianNote:
        IFT_IFTLData.technicianNote,
    });

    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "IFT_IFTL",
    });

    await req.user.save();

    return res.status(200).json({
      message: "IFT_IFTL entry added",
    });
  } catch (error) {
    console.error("IFT_IFTL create error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router