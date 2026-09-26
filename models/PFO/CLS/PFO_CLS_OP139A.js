const mongoose = require("mongoose");


// ============================================================
// PFO - CONVEYOR LUBRICATION SYSTEMS
// OP-139A
//
// Product ID:
// PFO_CLS_OP139A
//
// PURPOSE OF THIS MODEL:
//
// This model is used ONLY for validating the product-specific
// configuration submitted by the frontend.
//
// This collection is NOT used for actual persistence.
//
// After successful validation, the route converts the validated
// document into a plain object and stores it inside the generic:
//
// ProductConfiguration
//
// collection as:
//
// configurationData
// ============================================================


const PFO_CLS_OP139A_Schema = new mongoose.Schema(
  {
    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    conveyorName: {
      type: String,
      trim: true,
      required: true,
    },


    // --------------------------------------------------------
    // Conveyor Chain Size
    // --------------------------------------------------------

    conveyorChainSize: {
      type: String,
      enum: [
        'X348 Chain (3")',
        'X458 Chain (4")',
        'X678 Chain (6")',
        '3/8" Log Chain',
        "Other",
      ],
      required: true,
    },

    // Required only when Conveyor Chain Size = Other.
    otherConveyorChainSize: {
      type: String,
      trim: true,
      required: function () {
        return this.conveyorChainSize === "Other";
      },
    },


    // --------------------------------------------------------
    // Chain Manufacturer
    // --------------------------------------------------------

    chainManufacturer: {
      type: String,
      enum: [
        "Daifuku",
        "Frost",
        "NKC",
        "Pacline",
        "Rapid",
        "WEBB",
        "Webb-Stiles",
        "Wilkie Brothers",
        "Other",
      ],
      required: true,
    },

    // Required only when Chain Manufacturer = Other.
    otherChainManufacturer: {
      type: String,
      trim: true,
      required: function () {
        return this.chainManufacturer === "Other";
      },
    },


    // --------------------------------------------------------
    // Conveyor Length
    // --------------------------------------------------------

    conveyorLength: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorLengthUnit: {
      type: String,
      enum: [
        "Feet",
        "Inches",
        "m Meter",
        "mm Millimeter",
      ],
      required: true,
    },


    // --------------------------------------------------------
    // Conveyor Speed
    // --------------------------------------------------------

    conveyorSpeed: {
      type: String,
      trim: true,
      required: true,
    },

    conveyorSpeedUnit: {
      type: String,
      enum: [
        "Feet / minute",
        "Meters / minute",
      ],
      required: true,
    },

    indexingVariableSpeedConditions: {
      type: String,
      trim: true,
      required: true,
    },

    travelDirection: {
      type: String,
      enum: [
        "Right to Left",
        "Left to Right",
      ],
      required: true,
    },


    // --------------------------------------------------------
    // Application Environment
    // --------------------------------------------------------

    applicationEnvironment: {
      type: String,
      enum: [
        "Ambient",
        "Caustic (i.e. Phosphate / E-Coat, etc.)",
        "Oven",
        "Wash Down",
        "Intrinsic",
        "Food Grade",
        "Other",
      ],
      required: true,
    },

    // Required only when Application Environment = Other.
    otherApplicationEnvironment: {
      type: String,
      trim: true,
      required: function () {
        return this.applicationEnvironment === "Other";
      },
    },


    // --------------------------------------------------------
    // Installation Conditions
    // --------------------------------------------------------

    surroundingTemperature: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    conveyorLoadedOrUnloaded: {
      type: String,
      enum: [
        "Loaded",
        "Unloaded",
      ],
      required: true,
    },

    conveyorSwingStatus: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    conveyorOrientation: {
      type: String,
      enum: [
        "Overhead",
        "Inverted",
        "Inverted/Inverted",
      ],
      required: true,
    },


    // ========================================================
    // CUSTOMER POWER UTILITIES
    // ========================================================

    controlVoltage: {
      type: String,
      trim: true,
      required: true,
    },

    compressedAirSupply: {
      type: String,
      trim: true,
      required: true,
    },

    compressedAirSupplyUnit: {
      type: String,
      enum: [
        "PSI",
        "KPI",
        "Bar",
      ],
      required: true,
    },


    // ========================================================
    // NEW / EXISTING MONITORING SYSTEM
    // ========================================================

    connectingToExistingMonitoring: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    addNewMonitoringSystem: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },


    // ========================================================
    // CONVEYOR SPECIFICATIONS
    // ========================================================

    railLubrication: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    currentLubricationEquipmentBrand: {
      type: String,
      trim: true,
      required: true,
    },

    currentLubricantType: {
      type: String,
      trim: true,
      required: true,
    },

    currentLubricantViscosityGrade: {
      type: String,
      trim: true,
      required: true,
    },

    lubricationFromSideOfChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    lubricationFromTopOfChain: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    conveyorChainClean: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },


    // ========================================================
    // CONTROLLER
    // ========================================================

    chainMasterController: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },


    // --------------------------------------------------------
    // Other Units Controlled
    //
    // Current website presents this as:
    // "Controls other units (list)"
    //
    // Therefore this is stored as free text rather than using
    // the Timer dropdown values from the legacy OHP model.
    // --------------------------------------------------------

    controlsOtherUnits: {
      type: String,
      trim: true,
      required: true,
    },


    // --------------------------------------------------------
    // Timer
    // --------------------------------------------------------

    timer: {
      type: String,
      enum: [
        "Not Required",
        "12 Hour",
        "1000 Hour",
      ],
      required: true,
    },

    electricOnOff: {
      type: String,
      enum: [
        "On",
        "Off",
      ],
      required: true,
    },

    pneumaticOnOff: {
      type: String,
      enum: [
        "On",
        "Off",
      ],
      required: true,
    },

    mightyLubeMonitoring: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },


    // --------------------------------------------------------
    // Pre-Mounting Requirements
    // --------------------------------------------------------

    preMountingRequirements: {
      type: String,
      enum: [
        "OPCO Track",
        "Customer Provided Track",
        "Other",
      ],
      required: true,
    },

    // Required only when Pre-Mounting Requirements = Other.
    otherPreMountingRequirements: {
      type: String,
      trim: true,
      required: function () {
        return this.preMountingRequirements === "Other";
      },
    },


    // --------------------------------------------------------
    // PLC / Other Controller Information
    // --------------------------------------------------------

    plcConnection: {
      type: String,
      enum: [
        "Yes",
        "No",
      ],
      required: true,
    },

    otherControllerDescribe: {
      type: String,
      trim: true,
      required: true,
    },


    // --------------------------------------------------------
    // Special Controller Options
    // --------------------------------------------------------

    controllerSpecialOptions: {
      type: String,
      trim: true,
      required: true,
    },

    controllerPleaseSpecify: {
      type: String,
      trim: true,
      required: true,
    },


    // ========================================================
    // P&F MEASUREMENTS
    // ========================================================

    // --------------------------------------------------------
    // Overhead P&F
    // --------------------------------------------------------

    freeTrolleyWheelPositionVerticalL: {
      type: String,
      trim: true,
      required: true,
    },

    overheadFreeRailG: {
      type: String,
      trim: true,
      required: true,
    },

    overheadFreeRailH: {
      type: String,
      trim: true,
      required: true,
    },


    // --------------------------------------------------------
    // Inverted Power & Free
    // --------------------------------------------------------

    invertedPowerAndFreeChainDropA: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerTrolleyWheelB: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeRailG: {
      type: String,
      trim: true,
      required: true,
    },

    invertedPowerAndFreeRailH: {
      type: String,
      trim: true,
      required: true,
    },


    // ========================================================
    // TECHNICIAN NOTE
    //
    // Internal application workflow field.
    // Not required.
    // ========================================================

    technicianNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


// ============================================================
// MODEL
//
// Reuse the model when already registered.
// This avoids OverwriteModelError during development/hot reload.
// ============================================================

const PFO_CLS_OP139A =
  mongoose.models.PFO_CLS_OP139A ||
  mongoose.model(
    "PFO_CLS_OP139A",
    PFO_CLS_OP139A_Schema
  );


module.exports = PFO_CLS_OP139A;