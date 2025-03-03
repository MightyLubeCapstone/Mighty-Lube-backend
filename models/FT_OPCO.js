const mongoose = require('mongoose');

const FT_OPCO_Schema = new mongoose.Schema({
    conveyorName: {
        type: String,
        required: false,
    },
    chainSize: {
        type: Number,
        required: false,
        // add enum and check
    },
    industrialChainManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        required: true,
    },
    otherIndustrialChainManufacturer: {
        type: String,
        required: function () {
            return this.industrialChainManufacturer === 9;
        },
    },
    wheelManufacturer: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,
    },
    otherWheelManufacturer: {
        type: String,
        required: function () {
            return this.wheelManufacturer === 10;
        },
    },
    conveyorLength: {
        type: Number,
        required: false,
    },
    conveyorLengthUnit: {
        type: Number,
        required: false,
    },
    conveyorSpeed: {
        type: Number,
        required: false,
    },
    conveyorSpeedUnit: {
        type: Number,
        required: false,
    },
    conveyorIndex: {
        type: Number,
        required: false,
    },
    travelDirection: {
        type: Number,
        required: false,
    },
    appEnviroment: {
        type: Number,
        enum: [1, 2],
        required: true,
    },
    ovenStatus: {
        type: Number,
        enum: [1, 2],
        required: function () {
            return this.appEnviroment === 1;
        },
    },
    ovenTemp: {
        type: Number,
        required: function () {
            return this.appEnviroment === 1;
        },
    },
    surroundingTemp: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    conveyorLoaded: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    conveyorSwing: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    strandStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    plantLayout: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    requiredPics: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
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
    wheelOpenType: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
    },
    wheelClosedType: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
    },
    openStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    freeWheelStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    guideRollerStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    openRaceStyleType: {
        type: Number,
        required: false,
    },
    closedRaceStyleType: {
        type: Number,
        required: false,
    },
    holeStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    rollerChainStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    brushStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    outboardStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    lubeBrand: {
        type: String,
        required: false,
    },
    currentLube: {
        type: String,
        required: false,
    },
    oilOrGrease: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    lubeViscosity: {
        type: String,
        required: false,
    },
    greaseNGLIGrade: {
        type: Number,
        required: false,
    },
    zerkDirection: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    zerkLocationType: {
        type: Number,
        required: false,
    },
    chainMaster: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    remoteStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    mountStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    otherUnitStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    timerStatus: {
        type: Number,
        enum: [1, 2, 3],
        required: false,
    },
    electricStatus: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    mightyLubeMonitoring: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    preMountType: {
        type: Number,
        required: false,
    },
    plcConnection: {
        type: Number,
        enum: [1, 2],
        required: false,
    },
    otherControllerInfo: {
        type: String,
        required: false,
    },
    ftUnitType: {
        type: Number,
        required: false,
    },
    ftTopF: {
        type: Number,
        required: false,
    },
    ftTopG: {
        type: Number,
        required: false,
    },
    ftTopH: {
        type: Number,
        required: false,
    },
    ftTopA1: {
        type: Number,
        required: false,
    },
    ftTopB1: {
        type: Number,
        required: false,
    },
    ftTopH1: {
        type: Number,
        required: false,
    },
    ftTopJ1: {
        type: Number,
        required: false,
    },
    ftTopK1: {
        type: Number,
        required: false,
    },
    ftTopL1: {
        type: Number,
        required: false,
    },
    ftTopM1: {
        type: Number,
        required: false,
    },
    ftTopN1: {
        type: Number,
        required: false,
    },
    ftTopP1: {
        type: Number,
        required: false,
    },
    ftTopR1: {
        type: Number,
        required: false,
    },
});

const FT_OPCO = mongoose.models.FT_OPCO || mongoose.model('FT_OPCO', FT_OPCO_Schema);
module.exports = FT_OPCO;
