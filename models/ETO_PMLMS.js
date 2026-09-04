const mongoose = require("mongoose");

const ETO_PMLMSSchema = new mongoose.Schema({
    // ============================================================
    // GENERAL INFORMATION
    // ============================================================

    conveyorName: {
        type: String,
        default: ""
    },

    chainSize: {
        type: String,
        default: ""
    },

    otherChainSize: {
        type: String,
        default: ""
    },

    industrialChainManufacturer: {
        type: String,
        default: ""
    },

    otherIndustrialChainManufacturer: {
        type: String,
        default: ""
    },

    conveyorLength: {
        type: String,
        default: ""
    },

    conveyorLengthUnit: {
        type: String,
        default: ""
    },

    conveyorSpeed: {
        type: String,
        default: ""
    },

    conveyorSpeedUnit: {
        type: String,
        default: ""
    },

    conveyorIndex: {
        type: String,
        default: ""
    },

    travelDirection: {
        type: String,
        default: ""
    },

    appEnviroment: {
        type: String,
        default: ""
    },

    otherAppEnviroment: {
        type: String,
        default: ""
    },

    surroundingTemp: {
        type: String,
        default: ""
    },

    conveyorLoaded: {
        type: String,
        default: ""
    },

    conveyorSwing: {
        type: String,
        default: ""
    },


    // ============================================================
    // CUSTOMER POWER UTILITIES
    // ============================================================

    operatingVoltage: {
        type: String,
        default: ""
    },


    // ============================================================
    // MONITORING FEATURES REQUESTED
    // ============================================================

    paintMarkerSystem: {
        type: String,
        default: ""
    },


    // ============================================================
    // CONVEYOR SPECIFICATIONS
    // ============================================================

    chainCleanStatus: {
        type: String,
        default: ""
    },


    // ============================================================
    // ENCLOSED TRACK OVERHEAD MEASUREMENTS
    // ============================================================

    enclosedUnitType: {
        type: String,
        default: ""
    },

    enclosedTrackB: {
        type: String,
        default: ""
    },

    enclosedTrackG: {
        type: String,
        default: ""
    },

    enclosedTrackH: {
        type: String,
        default: ""
    },

    enclosedTrackS: {
        type: String,
        default: ""
    },

    enclosedTrackK2: {
        type: String,
        default: ""
    },

    enclosedTrackL2: {
        type: String,
        default: ""
    },

    enclosedTrackM2: {
        type: String,
        default: ""
    },

    enclosedTrackN2: {
        type: String,
        default: ""
    },

    enclosedTrackS2: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("ETO_PMLMS", ETO_PMLMSSchema);