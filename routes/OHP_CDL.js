const express = require("express");
const { authenticate } = require("./sessions");
const OHP_CDL = require("../models/OHP_CDL");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { OHP_CDLData, numRequested } = req.body;

    const order = new OHP_CDL({

      // ============================================================
      // GENERAL INFORMATION
      // ============================================================

      ...(OHP_CDLData.conveyorName && {
        conveyorName: OHP_CDLData.conveyorName,
      }),

      ...(OHP_CDLData.conveyorChainSize && {
        conveyorChainSize: OHP_CDLData.conveyorChainSize,
      }),

      ...(OHP_CDLData.otherConveyorChainSize && {
        otherConveyorChainSize: OHP_CDLData.otherConveyorChainSize,
      }),

      ...(OHP_CDLData.chainManufacturer && {
        chainManufacturer: OHP_CDLData.chainManufacturer,
      }),

      ...(OHP_CDLData.otherChainManufacturer && {
        otherChainManufacturer: OHP_CDLData.otherChainManufacturer,
      }),

      ...(OHP_CDLData.conveyorLength && {
        conveyorLength: OHP_CDLData.conveyorLength,
      }),

      ...(OHP_CDLData.conveyorLengthUnit && {
        conveyorLengthUnit: OHP_CDLData.conveyorLengthUnit,
      }),

      applicationEnvironment: OHP_CDLData.applicationEnvironment,


      // ============================================================
      // CUSTOMER POWER UTILITIES
      // ============================================================

      controlVoltage: OHP_CDLData.controlVoltage,


      // ============================================================
      // CONVEYOR SPECIFICATIONS
      // ============================================================

      ...(OHP_CDLData.currentLubricationEquipmentBrand && {
        currentLubricationEquipmentBrand:
          OHP_CDLData.currentLubricationEquipmentBrand,
      }),

      ...(OHP_CDLData.currentLubricantType && {
        currentLubricantType: OHP_CDLData.currentLubricantType,
      }),

      ...(OHP_CDLData.currentLubricantViscosityGrade && {
        currentLubricantViscosityGrade:
          OHP_CDLData.currentLubricantViscosityGrade,
      }),

      ...(OHP_CDLData.lubricationFromSideOfChain && {
        lubricationFromSideOfChain:
          OHP_CDLData.lubricationFromSideOfChain,
      }),

      ...(OHP_CDLData.lubricationFromTopOfChain && {
        lubricationFromTopOfChain:
          OHP_CDLData.lubricationFromTopOfChain,
      }),


      // ============================================================
      // CONTROLLER
      // ============================================================

      ...(OHP_CDLData.controllerSpecialOptions && {
        controllerSpecialOptions:
          OHP_CDLData.controllerSpecialOptions,
      }),

      ...(OHP_CDLData.controllerPleaseSpecify && {
        controllerPleaseSpecify:
          OHP_CDLData.controllerPleaseSpecify,
      }),


      // ============================================================
      // WIRE
      // ============================================================

      ...(OHP_CDLData.wireMeasurementUnit && {
        wireMeasurementUnit: OHP_CDLData.wireMeasurementUnit,
      }),

      ...(OHP_CDLData.twoConductor && {
        twoConductor: OHP_CDLData.twoConductor,
      }),

      ...(OHP_CDLData.fourConductor && {
        fourConductor: OHP_CDLData.fourConductor,
      }),

      ...(OHP_CDLData.sevenConductor && {
        sevenConductor: OHP_CDLData.sevenConductor,
      }),

      ...(OHP_CDLData.twelveConductor && {
        twelveConductor: OHP_CDLData.twelveConductor,
      }),

      ...(OHP_CDLData.junctionBoxQuantities && {
        junctionBoxQuantities:
          OHP_CDLData.junctionBoxQuantities,
      }),


      // ============================================================
      // TECHNICIAN NOTE
      // ============================================================

      technicianNote: OHP_CDLData.technicianNote,
    });


    req.user.cart.push({
      numRequested,
      productConfigurationInfo: order,
      productType: "OHP_CDL",
    });

    await req.user.save();

    return res.status(200).json({
      message: "OHP_CDL entry added",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router