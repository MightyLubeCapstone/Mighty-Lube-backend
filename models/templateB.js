const mongoose = require('mongoose');

const templateB = new mongoose.Schema({
    
    existingMonitor: {

        type: Number,
        enum: [1, 2],
        required: false,

    },

    newMonitor: {
        type: Number,
        enum: [1, 2],
        required: true,
        validate: {
            validator: function (value) {
                return !(this.existingMonitor === 1 && value === 1);
            },
            message: "Existing monitor and New Monitor cannot both be 1."
        }
    },

    dcuStatus: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }
        
    },

    dcuNum: {

        type: Number,
        required: function () 
        {
            return this.dcuStatus === 2;
        }

    },

    existingWindows: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2;
        }

    },

    existingHeadUnit: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2;
        }

    },

    existingDCU: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2;
        }

    },

    existingPowerInterface: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2;
        }

    },

    newReservoir: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }

    },

    reservoirSize: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.newReservoir === 2;
        }

    },

    otherReservoirSize: {

        type: String,
        required: function()
        {
            return this.reservoirSize === 2;
        }

    },

    newReservoirNum: {

        type: Number,
        required: function () 
        {
            return this.newReservoir === 2;
        }

    },

    typeMonitor: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }

    },

    driveMotorAmp: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    driveMotorAmpNum: {

        type: Number,
        required: function () 
        {
            return this.driveMotorAmp === 2;
        }

    },

    driveTakeUpAir: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    driveTakeUpAirNum: {

        type: Number,
        required: function () 
        {
            return this.driveTakeUpAir === 2;
        }

    },

    takeUpDistance: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    takeUpDistanceNum: {

        type: Number,
        required: function () 
        {
            return this.takeUpDistance === 2;
        }

    },

    driveTemp: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    driveTempNum: {

        type: Number,
        required: function () 
        {
            return this.driveTemp === 2;
        }

    },

    driveVibration: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    driveVibrationNum: {

        type: Number,
        required: function () 
        {
            return this.driveVibration === 2;
        }

    },

    dogPitch: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    dogPitchNum: {

        type: Number,
        required: function () 
        {
            return this.dogPitch === 2;
        }

    },

    paintMarker: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }

    },

    paintMarkerNum: {

        type: Number,
        required: function () 
        {
            return this.paintMarker === 2;
        }

    },

    chainVision: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    lubeVision: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    trolleyVision: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }

    },

    trolleyDetect: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.trolleyVision === 2;
        }

    },

    omniView: {

        type: Number,
        enum: [1, 2],
        required: function () 
        {
            return this.typeMonitor === 2;
        }
        
    },

    dcuUpgradeNum: {

        type: Number,
        required: function () 
        {
            return this.chainVision === 2 || this.omniView === 2;
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
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }

    },


    switchDistance: {

        type: Number,
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }

    },


    ampPickup: {

        type: Number,
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }

    },


    fromAirTakeUpDistance: {

        type: Number,
        required: function () 
        {
            return this.existingMonitor === 2 || this.newMonitor === 2;
        }

    },


    specialControllerOptions: {

        type: Number,
        enum: [1, 2, 3],

    },
});

module.exports = templateB;