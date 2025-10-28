const fglm_Mapping = {

    chainSize: { 1: "X348 Chain (3\")", 2: "X458 Chain (4\")", 3: "X678 Chain (6\")", 4: "3/8\" Log Chain", 5: "Other" },

    chainManufacturer: { 1: "Green Line", 2: "Frost", 3: "M&M", 4: "Stork", 5: "Meyn", 6: "Linco", 7: "DC", 8: "Merel", 9: "D&F", 10: "Other" },

    wheelManufacturer: { 1: "Green Line", 2: "Frost", 3: "M&K", 4: "Stork", 5: "Meyn", 6: "Linco", 7: "DC", 8: "Merel", 9: "D&F", 10: "Other" },

    chainPinType: { 1: "Bolts", 2: "Pin", 3: "Log" },

    conveyorLengthUnit: { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" },

    conveyorSpeedUnit: { 1: "Feet/Minute", 2: "Meters/Minute" },

    travelDirection: { 1: "Right to Left", 2: "Left to Right" },

    metalType: { 1: "Stainless Steel", 2: "Zinc", 3: "Mild Steel", 4: "Other" },
    
    conveyorStyle: { 1: "I-Beam", 2: "Meyn", 3: "Sani Track", 4: "T Rail", 5: "Other" },
    
    trolleyColor: { 1: "Blue", 2: "Green", 3: "Gray", 4: "Other" },
    
    trolleyType: { 1: "Meyn Trolley Halve Green Wheel", 2: "Meyn Plastic Click Version", 3: "Meyn SS Halve with Green Wheel", 4: "Meyn SS Halve Gray Wheel", 5: "Stork Halve Bolt Version Blue Wheel", 6: "Linco Plastic Halve Blue Wheel" },
    
    surroundingTemp: { 1: "Yes", 2: "No" },
    
    conveyorLoaded: {1:"Loaded", 2:"Unloaded"},  
      
    conveyorSwing: { 1: "Yes", 2: "No" },
    
    plantLayout: { 1: "Yes", 2: "No" },
    
    requiredPics: { 1: "Yes", 2: "No" },

	monitorData: {

        existingMonitor: { 1: "Yes", 2: "No" },
	
        newMonitor: { 1: "Yes", 2: "No" },

        dcuStatus: { 1: "Yes", 2: "No" },

        newReservoir: { 1: "Yes", 2: "No" },

        reservoirSize: { 1: "10 Gallon", 2: "65 Gallon", 3: "Other" },

        newReservoirNum: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10" },

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
    
    sideLube: { 1: "Yes", 2: "No" },

    topLube: { 1: "Yes", 2: "No" },

    cleanChain: { 1: "Yes", 2: "No" },

    wireMeasurementUnit: { 1: "Feet", 2: "Inches", 3: "Meters", 4: "Millimeters" }

};

module.exports = fglm_Mapping;
