const mongoose = require('mongoose');
const uuid = require("uuid");

const FGLMSchema = new mongoose.Schema({
    // Gen Info
    conveyorName: {
        type: String,
        required: true,
    },
    chainSize: {
        type: Number,
        required: true,
    },
    chainManufacturer: {
        type: Number,
        required: true,
    },
    chainPinType: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorLength: {
        type: String,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorLengthUnit: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorSpeed: {
        type: String,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorSpeedUnit: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorIndex: {
        type: String,
        required: true,
        // add RegEx matching to this :D
    },
    travelDirection: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    metalType: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    conveyorStyle: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    trolleyColor: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    trolleyType: {
        type: Number,
        required: true,
        // add RegEx matching to this :D
    },
    surroundingTemp: {
        type: Number,
        enum: [0, 1],
        required: true,
        // add RegEx matching to this :D
    },
    conveyorLoaded: {
        type: Number,
        enum: [0, 1],
        required: true,
        // add RegEx matching to this :D
    },
    conveyorSwing: {
        type: Number,
        enum: [0, 1],
        required: true,
        // add RegEx matching to this :D
    },
    plantLayout: {
        type: Number,
        enum: [0, 1],
        required: true,
        // add RegEx matching to this :D
    },
    requiredPics: {
        type: Number,
        enum: [0, 1],
        required: true,
        // add RegEx matching to this :D
    },
    // CPU
    operatingVoltage: {
        type: String,
        required: true,
    },
    // MonSys
    existingMonitor: {
        type: Number,
        enum: [0, 1],
        required: true,
    },

    newMonitor: {
        type: Number,
        enum: [0, 1],
        required: true,
    },

    dcuStatus: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }
    },

    dcuNum: {
        type: Number,
        required: function () {
            return this.dcuStatus === 1;
        }

    },

    existingWindows: {

        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1;
        }

    },

    existingHeadUnit: {

        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1;
        }

    },

    existingDCU: {

        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1;
        }

    },

    existingPowerInterface: {

        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1;
        }

    },

    newReservoir: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }
    },

    reservoirSize: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.newReservoir === 1;
        }
    },

    newReservoirNum: {
        type: Number,
        required: function () {
            return this.newReservoir === 1;
        }
    },

    typeMonitor: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }
    },

    driveMotorAmp: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    driveMotorAmpNum: {
        type: Number,
        required: function () {
            return this.driveMotorAmp === 1;
        }
    },

    driveTakeUpAir: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    driveTakeUpAirNum: {
        type: Number,
        required: function () {
            return this.driveTakeUpAir === 1;
        }
    },

    takeUpDistance: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    takeUpDistanceNum: {
        type: Number,
        required: function () {
            return this.takeUpDistance === 1;
        }
    },

    driveTemp: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    driveTempNum: {
        type: Number,
        required: function () {
            return this.driveTemp === 1;
        }
    },

    driveVibration: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    driveVibrationNum: {
        type: Number,
        required: function () {
            return this.driveVibration === 1;
        }
    },

    dogPitch: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    dogPitchNum: {
        type: Number,
        required: function () {
            return this.dogPitch === 1;
        }
    },

    paintMarker: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }
    },

    paintMarkerNum: {
        type: Number,
        required: function () {
            return this.paintMarker === 1;
        }
    },

    chainVision: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    lubeVision: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    trolleyVision: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    trolleyDetect: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.trolleyVision === 1;
        }
    },

    omniView: {
        type: Number,
        enum: [0, 1],
        required: function () {
            return this.typeMonitor === 1;
        }
    },

    dcuUpgradeNum: {
        type: Number,
        required: function () {
            return this.chainVision === 1 || this.omniView === 1;
        }
    },

    itNameOne: {

        type: String,
        required: false,

    },

    itIPOne: {

        type: Number,
        required: false,

    },

    itGatewayOne: {

        type: Number,
        required: false,

    },

    itSubnetOne: {

        type: Number,
        required: false,

    },

    itDNSOne: {

        type: Number,
        required: false,

    },

    itSMTPOne: {

        type: Number,
        required: false,

    },

    itNameTwo: {

        type: String,
        required: false,

    },

    itIPTwo: {

        type: Number,
        required: false,

    },

    itGatewayTwo: {

        type: Number,
        required: false,

    },

    itSubnetTwo: {

        type: Number,
        required: false,

    },

    itDNSTwo: {

        type: Number,
        required: false,

    },

    itSMTPTwo: {

        type: Number,
        required: false,

    },

    itNameThree: {

        type: String,
        required: false,

    },

    itIPThree: {

        type: Number,
        required: false,

    },

    itGatewayThree: {

        type: Number,
        required: false,

    },

    itSubnetThree: {

        type: Number,
        required: false,

    },

    itDNSThree: {

        type: Number,
        required: false,

    },

    itSMTPThree: {

        type: Number,
        required: false,

    },


    itAdditionalNotes: {

        type: String,
        required: false,

    },


    piuDistance: {

        type: Number,
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }

    },


    switchDistance: {

        type: Number,
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }

    },


    ampPickup: {

        type: Number,
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }

    },


    fromAirTakeUpDistance: {

        type: Number,
        required: function () {
            return this.existingMonitor === 1 || this.newMonitor === 1;
        }

    },


    specialControllerOptions: {

        type: Number,
        enum: [0, 1, 2],

    },
    // ConveyorSpecs
    sideLube: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    topLube: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    cleanChain: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    // Wire
    measureUnit: {
        type: Number,
        required: true,
    },
    conductor4: {
        type: String,
        required: true,
    },
    conductor7: {
        type: String,
        required: true,
    },
    conductor2: {
        type: String,
        required: true,
    },
});

const FGLM = mongoose.models.FGLM || mongoose.model('FGLM', FGLMSchema);
module.exports = FGLM;