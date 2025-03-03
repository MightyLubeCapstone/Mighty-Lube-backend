const mongoose = require('mongoose');
const uuid = require("uuid");

const CC5_OP4OE_Schema = new mongoose.Schema({


    conveyorName: {

        type: String,
        required: true,
    },


    cc5ChainSize: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,

    },

    otherChainSize: {

        type: String,
        required: function ()
        {
            return this.cc5ChainSize === 8;
        }
    },

    industrialChainManufacturer: {

        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,

    },

    otherChainManufacturer: {

        type: String,
        required: function ()
        {
            return this.industrialChainManufacturer === 9;
        }

    },

    conveyorLength: {

        type: Number,
        required: true,

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
        required: false,
        // add RegEx matching to this :D

    },

    travelDirection: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    appEnviroment: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    //This says that if they enter yes (or 1/true) then we require these two fields to be entered too. 
    //If it's no/0 then we pretend that these don't even exist
    ovenStatus: {
        type: Number,
        enum: [1, 2],
        required: function ()
        {
            return this.appEnviroment === 1;
        }
    },

    ovenTemp: {
        type: Number,
        required: function ()
        {
            return this.appEnviroment === 1;
        }
    },

    surroundingTemp: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    strandStatus: {
        
        type: Number,
        enum: [1, 2],
        required: true,

    },

    plantLayout: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    requiredPics: {

        type: Number,
        enum: [1, 2],
        required: false,
        // add RegEx matching to this :D

    },

    operatingVoltage: {

        type: String,
        required: false,

    },

    // MonSys
    existingMonitor: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    //Ensures that both 'Connecting to an existing monitor' and 'New Monitor' cannot both be 1 since that wouldn't be possible
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
        required: false,

    },
    
    outboardStatus: {

        type: Number,
        enum: [1, 2],
        required: true,

    },

    highRollerStatus: {

        type: Number,
        enum: [1, 2],
        required: true,

    },


    lubeBrand: {

        type: String,
        required: false,

    },

    lubeType: {

        type: String,
        required: false,

    },

    lubeViscosity: {

        type: String,
        required: false,

    },

    //Dont think this is needed since it's an option in the template B


    // reservoirSizeType: {

    //     type: Number,
    //     enum: [1, 2],
    //     required: false,

    // },

    // reservoirSizeQuanity: {

    //     type: Number,
    //     required: false,

    // },

    cleanChain: {

        type: Number,
        enum: [1, 2],
        required: false,

    },

    //Dont think this is needed since it's an option in the template B

    // specialControllerOption: {

    //     type: String,
    //     required: false,

    // },

    // specialControllerInfo: {
    //     type: String,
    //     required: false,
    // },


    chainMaster:{

        type: Number,
        enum: [1, 2],
        required: false,

    },

    timerStatus:{

        type: Number,
        enum: [1, 2, 3],
        required: false,

    },

    electricStatus:{

        type: Number,
        enum: [1, 2],
        required: false,

    },

    pneumaticStatus:{

        type: Number,
        enum: [1, 2],
        required: false,

    },


    mightyLubeMonitoring:{

        type: Number,
        enum: [1, 2],
        required: false,

    },


    plcConnection:{

        type: Number,
        enum: [1, 2],
        required: false,

    },

    otherControllerNotes:{

        type: String,
        required: false,

    },

    cc5UnitType: {

        type: Number,
        enum: [1, 2, 3, 4],
        required: false,

    },

    powerRailWidth: {

        type: Number,
        required: false,

    },

    powerRailHeight: {

        type: Number,
        required: false,

    },

    rollerWheelA1: {

        type: Number,
        required: false,

    },

    rollerWheelB1: {

        type: Number,
        required: false,

    },

    linkD1: {

        type: Number,
        required: false,

    },

    wheelPitchM1: {

        type: Number,
        required: false,

    },

    rollerPinY1: {

        type: Number,
        required: false,

    },

    rollerPinZ1: {

        type: Number,
        required: false,
        
    }


});

const CC5_OP4OE = mongoose.models.CC5_OP4OE || mongoose.model('CC5_OP4OE', CC5_OP4OE_Schema);
module.exports = CC5_OP4OE;