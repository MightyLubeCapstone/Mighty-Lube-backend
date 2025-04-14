const enumMappingsETO_9000E = {

    chainSize: { 1: "X348 Chain (3\")", 2: "X458 Chain (4\")", 3: "X678 Chain (6\")", 4: "3/8\" Log Chain", 5: "Other", },

    industrialChainManufacturerET: { 1: "Webb", 2: "Richards-Wilcox", 3: "Rapid", 4: "Pacline", 5: "Other"},
    
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

    freeCarrierSystem: { 1: "Yes", 2: "No" },

    catDriveStatus: { 1: "Yes", 2: "No" },

    externalLubeStatus: { 1: "Yes", 2: "No" },

    timerStatus: { 1: "Not Required", 2: "12 Hour", 3: "1000 Hour" },

    electricStatus: { 1: "On", 2: "Off" },

    pneumaticStatus: { 1: "On", 2: "Off" },

    mightyLubeMonitoring: { 1: "Yes", 2: "No" },

    plcConnection: { 1: "Yes", 2: "No" },

    wireMeasurementUnit: { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" },

    enclosedUnitType: { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" }

};

module.exports = enumMappingsETO_9000E;
