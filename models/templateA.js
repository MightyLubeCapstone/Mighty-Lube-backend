const mongoose = require("mongoose");

const templateA = new mongoose.Schema({

  dcuStatus: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.existingMonitor === 1 || this.newMonitor === 1;
    },
  },

  dcuNum: {
    type: Number,
    required: function () {
      return this.dcuStatus === 1;
    },
  },

  existingWindows: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1;
    },
  },

  existingHeadUnit: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1;
    },
  },

  existingDCU: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1;
    },
  },

  existingPowerInterface: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1;
    },
  },

  newReservoir: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.existingMonitor === 1 || this.newMonitor === 1;
    },
  },

  reservoirSize: {
    type: Number,
    enum: [1, 2, 3],
    required: function () {
      return this.newReservoir === 1;
    },
  },

  otherReservoirSize: {
    type: String,
    required: function () {
      return this.reservoirSize === 1;
    },
  },

  newReservoirNum: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: function () {
      return this.newReservoir === 1;
    },
  },

  typeMonitor: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.existingMonitor === 1 || this.newMonitor === 1;
    },
  },

  driveMotorAmp: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  driveMotorAmpNum: {
    type: Number,
    required: function () {
      return this.driveMotorAmp === 1;
    },
  },

  driveTakeUpAir: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  driveTakeUpAirNum: {
    type: Number,
    required: function () {
      return this.driveTakeUpAir === 1;
    },
  },

  takeUpDistance: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  takeUpDistanceNum: {
    type: Number,
    required: function () {
      return this.takeUpDistance === 1;
    },
  },

  driveTemp: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  driveTempNum: {
    type: Number,
    required: function () {
      return this.driveTemp === 1;
    },
  },

  driveVibration: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  driveVibrationNum: {
    type: Number,
    required: function () {
      return this.driveVibration === 1;
    },
  },

  dogPitch: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  dogPitchNum: {
    type: Number,
    required: function () {
      return this.dogPitch === 1;
    },
  },

  paintMarker: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1 || this.typeMonitor === 2;
    },
  },

  paintMarkerNum: {
    type: Number,
    required: function () {
      return this.paintMarker === 1;
    },
  },

  chainVision: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },   

  lubeVision: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  trolleyVision: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  trolleyDetect: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.trolleyVision === 1;
    },
  },

  omniView: {
    type: Number,
    enum: [1, 2],
    required: function () {
      return this.typeMonitor === 1;
    },
  },

  dcuUpgradeNum: {
    type: Number,
    required: function () {
      return this.chainVision === 1 || this.omniView === 1;
    },
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
    },
  },

  switchDistance: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1 || this.newMonitor === 1;
    },
  },

  ampPickup: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1 || this.newMonitor === 1;
    },
  },

  fromAirTakeUpDistance: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1 || this.newMonitor === 1;
    },
  },

  specialControllerOptions: {
    type: Number,
    required: false,
    enum: [1, 2, 3],
  },

    operatingVoltage: {
    type: Number,
    required: function () {
      return this.existingMonitor === 1 || this.newMonitor === 1;
    },
  }
});

module.exports = templateA;
