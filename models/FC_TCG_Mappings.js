const enumMappingsFC_TCG = {

	industrialChainManufacturer: { 1: "Daifuku", 2: "Frost", 3: "NKC", 4: "Pacline", 5: "Rapid", 6: "WEBB", 7: "Webb-Stiles", 8: "Wilkie Brothers", 9: "Other" },
	
	wheelManufacturer: { 1: "Green Line", 2: "Frost", 3: "M&K", 4: "Stork", 5: "Meyn", 6: "Linco", 7: "DC", 8: "Merel", 9: "D&F", 10: "Other" },
	
	conveyorSpeedUnit: { 1: "Feet/Minute", 2: "Meters/Minute" },
		
	appEnviroment: { 1: "Ambient", 2: "Caustic", 3: "Oven", 4: "Wash Down", 5: "Intrinsic", 6: "Food Grade", 7: "Other" },
	
	surroundingTemp: { 1: "Yes", 2: "No" },
	
	orientationType: { 1: "Overhead", 2: "Inverted", 3: "Inverted/Inverted" },

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

	
	
	carrierWheels: { 1: "Yes", 2: "No" },
	
	kingPinStatus: { 1: "Yes", 2: "No" },

    greaseStatus: { 1: "Yes", 2: "No" },

	oilStatus: { 1: "Yes", 2: "No" },

	zerkDirection: { 1: "Left", 2: "Right" },
	
	zerkLocationType: { 1: "Center", 2: "12 O'Clock", 3: "3 O'Clock", 4: "6 O'Clock", 5: "9 O'Clock"},
	
	conveyorSwing: { 1: "Yes", 2: "No" },
	
	chainMaster: { 1: "Yes", 2: "No" },
	
	remoteStatus: { 1: "Yes", 2: "No" },
	
	mountStatus: { 1: "Yes", 2: "No" },
	
	otherUnitStatus: { 1: "Yes", 2: "No" },
	
	timerStatus: { 1: "Not Required", 2: "12 Hour", 3: "1000 Hour" },
	
	electricStatus: { 1: "On", 2: "Off" },
	
	mightyLubeMonitoring: { 1: "Yes", 2: "No" },
	
	preMountType: { 1: "OPCO Track", 2: "Customer Provided Track", 3: "Other" },
	
	plcConnection: { 1: "Yes", 2: "No" },

};

module.exports = enumMappingsFC_TCG;