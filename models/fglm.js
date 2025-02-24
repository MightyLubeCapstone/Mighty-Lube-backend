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
        enum: [1, 2, 3, 4, 5],
        required: true,

    },

    otherChainSize: {

        type: String,
        required: function()
	    {

		    return this.chainSize === 5;

	    }

    },

    chainManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,
        
    },

    otherChainManufacturer: {

        type: String,
        required: function ()
        {
            return this.chainManufacturer === 10;
        }

    },

    wheelManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,

    },
    
    otherWheelManufacturer: {
        type: String,

        required: function ()
        {
            return this.wheelManufacturer === 10;
        }

    },

    chainPinType: {

        type: Number,
        enum: [1, 2, 3],
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
        enum: [1, 2, 3, 4],
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
        enum: [1, 2],
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
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    metalType: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        // add RegEx matching to this :D

    },

    otherMetalType: {

        type: String,
        required: function ()
        {
            return this.metalType === 4;
        }

    },

    conveyorStyle: {

        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
        // add RegEx matching to this :D

    },

    otherConveyorStyle: {

        type: String,
        required: function ()
        {
            return this.conveyorStyle === 5;
        }

    },

    trolleyColor: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        // add RegEx matching to this :D

    },

    otherTrolleyColor: {
        
        type: String,
        required: function ()
        {
            return this.trolleyColor === 4;
        }

    },

    trolleyType: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
        required: true,
        // add RegEx matching to this :D

    },

    surroundingTemp: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    conveyorLoaded: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    conveyorSwing: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    plantLayout: {

        type: Number,
        enum: [1, 2],
        required: true,
        // add RegEx matching to this :D

    },

    requiredPics: {

        type: Number,
        enum: [1, 2],
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
        enum: [1, 2],
        required: true,

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
    // ConveyorSpecs
    sideLube: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    topLube: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    cleanChain: {

        type: Number,
        enum: [1, 2],
        required: true,

    },
    
    // Wire
    wireMeasurementUnit: {

        type: Number,
        enum: [1, 2],
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