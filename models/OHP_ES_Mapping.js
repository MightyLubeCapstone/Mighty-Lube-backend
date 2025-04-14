const enumMappingsOHP_ES = {

    chainSize: { 1: "X348 Chain (3\")", 2: "X458 Chain (4\")", 3: "X678 Chain (6\")", 4: "3/8\" Log Chain", 5: "Other", },

    industrialChainManufacturer: { 1: "Daifuku", 2: "Frost", 3: "NKC", 4: "Pacline", 5: "Rapid", 6: "WEBB", 7: "Webb-Stiles", 8: "Wilkie Brothers", 9: "Other" },

    wheelManufacturer: { 1: "Green Line", 2: "Frost", 3: "M&K", 4: "Stork", 5: "Meyn", 6: "Linco", 7: "DC", 8: "Merel", 9: "D&F", 10: "Other" },

    conveyorLengthUnit: { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" },

    conveyorSpeedUnit: { 1: "Feet/Minute", 2: "Meters/Minute" },

    travelDirection: { 1: "Right to Left", 2: "Left to Right" },

    appEnviroment: { 1: "Ambient", 2: "Caustic (i.e. Phosphate / E-Coat, etc.)", 3:"Oven", 4:"Wash Down", 5:"Intrinsic", 6:"Food Grade", 7:"Other" },

    ovenStatus: { 1: "Yes", 2: "No" },

    strandStatus: { 1: "Yes", 2: "No" },

    openBearingStatus: { 1: "Yes", 2: "No" },

    pinLubeType: { 1: "Chain Pins and Trolley", 2: "Chain Pins" },

    pointsOfLube:{1:"2",2:"4",3:"6",4:"8",5:"10",6:"12",7:"14",8:"16"},

    m12PlugStatus: { 1: "Yes", 2: "No" },

    controllingOP201: { 1: "Yes", 2: "No" },

    orderingOP201: { 1: "Yes", 2: "No" },

    newMonitorStatus: { 1: "Yes", 2: "No" },

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

    wheelOpenType: { 1: "Not Applicable", 2: "Open Inside", 3: "Open Outside" },

    wheelClosedType: { 1: "Extended", 2: "Flush", 3: "Recessed" },

    openStatus: { 1: "Yes", 2: "No" },

    freeWheelStatus: { 1: "Yes", 2: "No" },

    guideRollerStatus: { 1: "Yes", 2: "No" },

    openRaceStyleType: { 1: "Not Applicable", 2: "Open Inside", 3: "Open Outside" },

    closedRaceStyleType: { 1: "Extended", 2: "Flush", 3: "Recessed" },

    holeStatus: { 1: "Yes", 2: "No" },

    actuatorStatus: { 1: "Yes", 2: "No" },

    pivotStatus: { 1: "Yes", 2: "No" },

    kingPinStatus: { 1: "Yes", 2: "No" },

    railLubeStatus: { 1: "Yes", 2: "No" },

    externalLubeStatus: { 1: "Yes", 2: "No" },

    sideLubeStatus: { 1: "Yes", 2: "No" },

    topLubeStatus: { 1: "Yes", 2: "No" },

    chainMaster: { 1: "Yes", 2: "No" },

    timerStatus: { 1: "Not Required", 2: "12 Hour", 3: "1000 Hour" },

    electricStatus: { 1: "On", 2: "Off" },

    pneumaticStatus: { 1: "On", 2: "Off" },

    mightyLubeMonitoring: { 1: "Yes", 2: "No" },

    plcConnection: { 1: "Yes", 2: "No" },

    ohpUnitType: { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" }

};

module.exports = enumMappingsOHP_ES;
