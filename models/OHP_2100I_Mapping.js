const enumMappingsCC5_OP4OE = {
    ohpChainSize: { 1: "RW", 2: "Unibuilt", 3: "Other"},

    industrialChainManufacturer: { 1: "Daifuku", 2: "Frost", 3: "NKC", 4: "Pacline", 5: "Rapid", 6: "WEBB", 7: "Webb-Stiles", 8: "Wilkie Brothers", 9: "Other" },

    conveyorLengthUnit: { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" },

    conveyorSpeedUnit: { 1: "Feet/Minute", 2: "Meters/Minute" },

    travelDirection: { 1: "Right to Left", 2: "Left to Right" },

    appEnviroment: { 1: "Ambient", 2: "Caustic (i.e. Phosphate / E-Coat, etc.)", 3:"Oven", 4:"Wash Down", 5:"Intrinsic", 6:"Food Grade", 7:"Other" },

    ovenStatus: { 1: "Yes", 2: "No" },

    surroundingTemp: { 1: "Yes", 2: "No" },

    conveyorLoaded: { 1: "Yes", 2: "No" },

    conveyorSwing: { 1: "Yes", 2: "No" },

    monitorData: {

        newReservoir: { 1: "Yes", 2: "No" },

        reservoirSize: { 1: "10 Gallon", 2: "65 Gallon" },

        typeMonitor: { 1: "Permanent", 2: "Portable" },

        driveMotorAmp: { 1: "Yes", 2: "No" },

        driveTakeUpAir: { 1: "Yes", 2: "No" },

        takeUpDistance: { 1: "Yes", 2: "No" },

        driveTemp: { 1: "Yes", 2: "No" },

        driveVibration: { 1: "Yes", 2: "No" },

        dogPitch: { 1: "Yes", 2: "No" },

        paintMarker: { 1: "Yes", 2: "No" },

        chainVision: { 1: "Yes", 2: "No" },

        lubeVision: { 1: "Yes", 2: "No" },

        trolleyVision: { 1: "Yes", 2: "No" },

        trolleyDetect: { 1: "Yes", 2: "No" },

        omniView: { 1: "Yes", 2: "No" },

        specialControllerOptions: { 1: "I/O Link", 2: "Plug and Play", 3: "Dry Contacts" },
        
    },
    
    pointsOfLube:{1:"2",2:"4",3:"6",4:"8",5:"10",6:"12",7:"14",8:"16"},

    wheelClosedType: { 1: "Extended", 2: "Flush", 3: "Recessed" },

    catDriveStatus: { 1: "Yes", 2: "No" },

    railLubeStatus: { 1: "Yes", 2: "No" },

    externalLubeStatus: { 1: "Yes", 2: "No" },

    sideLubeStatus: { 1: "Yes", 2: "No" },

    topLubeStatus: { 1: "Yes", 2: "No" },

    chainCleanStatus: { 1: "Yes", 2: "No" },

    conveyorOrientationStatus: { 1: "Yes", 2: "No" },

    freeLubeStatus: { 1: "Yes", 2: "No" },

    pointsOfLubeTrolley:{1:"2",2:"4",3:"6",4:"8",5:"10",6:"12"},

    wireMeasurementUnit:  { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" },

    ohpUnitType:  { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" }


};

module.exports = enumMappingsCC5_OP4OE;
