const express = require("express");

const { authenticate } = require("./sessions");
const FGCO = require("../models/fgco");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// ============================================================
// POST /api/fgco
//
// Body:
//
// {
//   "fgcoData": {
//     "conveyorSystemName": "...",
//     "conveyorChainSize": 0,
//     "otherChainSize": "...",
//     "chainManufacturer": 0,
//     "otherManufacturerSize": "...",
//     "conveyorLoaded": 0,
//     "dripLine": 0,
//     "operatingVoltTriple": 460,
//     "installationClearance": 0,
//     "pushButton": 0,
//     "enclosedShroud": 0,
//     "additionalOtherInfo": "...",
//     "technicianNote": "..."
//   },
//   "numRequested": 1
// }
//
// Flow:
//
// Flutter FGCO Form
//        ↓
// POST /api/fgco
//        ↓
// FGCO model validation
//        ↓
// ProductConfiguration
//        ↓
// product_configurations collection
//
// status = "cart"
// ============================================================

router.post("/", authenticate, async (req, res) => {
  try {
    const { fgcoData, numRequested } = req.body;


    // ========================================================
    // BASIC REQUEST VALIDATION
    // ========================================================

    if (!fgcoData) {
      return res.status(400).json({
        success: false,
        error: "FGCO data is required",
      });
    }

    if (
      numRequested === undefined ||
      numRequested === null ||
      Number(numRequested) < 1
    ) {
      return res.status(400).json({
        success: false,
        error: "numRequested must be at least 1",
      });
    }


    // ========================================================
    // MAP FRONTEND DATA TO FGCO MODEL FORMAT
    //
    // This keeps the same mapping that the old route used.
    // ========================================================

    const configurationData = {
      conveyorName: fgcoData.conveyorSystemName,

      chainSize: fgcoData.conveyorChainSize,

      ...(fgcoData.otherChainSize && {
        otherChainSize: fgcoData.otherChainSize,
      }),

      chainManufacturer: fgcoData.chainManufacturer,

      ...(fgcoData.otherManufacturerSize && {
        otherManufacturerSize: fgcoData.otherManufacturerSize,
      }),

      conveyorLoaded: fgcoData.conveyorLoaded,

      ...(fgcoData.dripLine !== undefined &&
        fgcoData.dripLine !== null && {
          dripLineStatus: fgcoData.dripLine,
        }),

      operatingVoltTriple: fgcoData.operatingVoltTriple,

      oppsSpecification: fgcoData.installationClearance,

      pushButtonSwitch: fgcoData.pushButton,

      ...(fgcoData.enclosedShroud !== undefined &&
        fgcoData.enclosedShroud !== null && {
          enclosedShroud: fgcoData.enclosedShroud,
        }),

      ...(fgcoData.additionalOtherInfo && {
        additionalOtherInfo: fgcoData.additionalOtherInfo,
      }),

      ...(fgcoData.technicianNote && {
        technicianNote: fgcoData.technicianNote,
      }),
    };


    // ========================================================
    // FGCO PRODUCT-SPECIFIC VALIDATION
    //
    // IMPORTANT:
    // FGCO is NOT saved into its own MongoDB collection.
    //
    // We only use the FGCO schema here to validate the
    // product-specific fields.
    // ========================================================

    const fgcoValidation = new FGCO(configurationData);

    await fgcoValidation.validate();


    // ========================================================
    // USER / ACTOR SNAPSHOT
    //
    // Ownership always comes from authenticated req.user.
    // Frontend is NOT allowed to decide userID.
    // ========================================================

    const actor = {
      userID: req.user.userID,
      username: req.user.username,
      firstName: req.user.firstName || "",
      lastName: req.user.lastName || "",
      role: req.user.role,
    };


    // ========================================================
    // CREATE GENERIC PRODUCT CONFIGURATION
    //
    // One FGCO configuration = one document.
    // ========================================================

    const productConfiguration = new ProductConfiguration({
      userID: req.user.userID,

      configurationName: fgcoData.conveyorSystemName,

      productType: "FGCO",

      productName: "FGCO",

      status: "cart",

      isComplete: true,

      numRequested: Number(numRequested),

      configurationData,

      createdBy: actor,

      updatedBy: actor,
    });


    // ========================================================
    // SAVE TO:
    //
    // product_configurations
    //
    // NOT:
    // req.user.cart
    // ========================================================

    await productConfiguration.save();


    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message: "FGCO configuration added to cart",
      configurationID: productConfiguration.configurationID,
      configuration: {
        configurationID: productConfiguration.configurationID,
        configurationName: productConfiguration.configurationName,
        productType: productConfiguration.productType,
        productName: productConfiguration.productName,
        status: productConfiguration.status,
        isComplete: productConfiguration.isComplete,
        numRequested: productConfiguration.numRequested,
      },
    });

  } catch (error) {
    console.error("Error adding FGCO configuration:", error);


    // ========================================================
    // MONGOOSE VALIDATION ERROR
    // ========================================================

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "FGCO validation failed",
        details: Object.values(error.errors).map(
          (validationError) => validationError.message
        ),
      });
    }


    // ========================================================
    // GENERIC SERVER ERROR
    // ========================================================

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});


module.exports = router