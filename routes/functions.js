async function addMachine(newMachine) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblMachine values (@machineID, @machineName, @machineType)";

		request.input("machineID", sql.VarChar, newMachine.machineID);
		request.input("machineName", sql.VarChar, newMachine.machineName);
		request.input("machineType", sql.VarChar, newMachine.machineType);

		await request.query(query);

		console.log("Machine Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
}

async function addProtein(newProtein) {
	try {
		await poolConnect;
		const request = pool.request();

		const query =
			"Insert into tblProtein values (@machineID, @machineName, @popularity, @price, @dateAdded)";

		request.input("machineID", sql.VarChar, newProtein.machineID);
		request.input("machineName", sql.VarChar, newProtein.machineName);
		request.input("popularity", sql.Int, newProtein.popularity);
		request.input("price", sql.Decimal, newProtein.price);
		request.input("dateAdded", sql.Date, newProtein.dateAdded);

		await request.query(query);

		console.log("Protein Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
}

async function addProteinGeneralInfo(newProteinGeneralInfo) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinGeneralInfo values (@proteinProductID, @machineID, @productName, @conveyorSystemName, @conveyorChainSize, @chainManufacturer, @conveyorLength, @conveyorLengthUnit, @travelDirection, @applicationEnviroment, @temperatureArea, @loadedStatus, @numRequested)";

		request.input(
			"proteinProductID",
			sql.VarChar,
			newProteinGeneralInfo.proteinProductID
		);
		request.input("machineID", sql.VarChar, newProteinGeneralInfo.machineID);
		request.input(
			"productName",
			sql.VarChar,
			newProteinGeneralInfo.productName
		);
		request.input(
			"conveyorSystemName",
			sql.VarChar,
			newProteinGeneralInfo.conveyorSystemName
		);
		request.input(
			"conveyorChainSize",
			sql.VarChar,
			newProteinGeneralInfo.conveyorChainSize
		);
		request.input(
			"chainManufacturer",
			sql.VarChar,
			newProteinGeneralInfo.chainManufacturer
		);
		request.input(
			"conveyorLength",
			sql.Decimal,
			newProteinGeneralInfo.conveyorLength
		);
		request.input(
			"conveyorLengthUnit",
			sql.VarChar,
			newProteinGeneralInfo.conveyorLengthUnit
		);
		request.input(
			"travelDirection",
			sql.Bit,
			newProteinGeneralInfo.travelDirection
		);
		request.input(
			"applicationEnviroment",
			sql.VarChar,
			newProteinGeneralInfo.applicationEnviroment
		);
		request.input(
			"temperatureArea",
			sql.Bit,
			newProteinGeneralInfo.temperatureArea
		);
		request.input("loadedStatus", sql.Bit, newProteinGeneralInfo.loadedStatus);
		request.input("numRequested", sql.Int, newProteinGeneralInfo.numRequested);

		await request.query(query);

		console.log("Protein Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
}

async function addAppEnv(newAppEnv) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblAppEnv values (@appEnvType, @appEnvName)";

		request.input("appEnvType", sql.Int, newAppEnv.appEnvType);
		request.input("appEnvName", sql.VarChar, newAppEnv.appEnvName);


		await request.query(query);

		console.log("New Application Enviroment Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addApplicationType(newApplicationType) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblApplicationType values (@applicationType, @applicationTypeName)";

		request.input("applicationType", sql.Int, newApplicationType.applicationType);
		request.input("applicationTypeName", sql.VarChar, newApplicationType.applicationTypeName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addConveyorStyle(newConveyorStyle) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblConveyorStyle values (@conveyorStyleType, @conveyorStyleName)";

		request.input("conveyorStyleType", sql.Int, newConveyorStyle.conveyorStyleType);
		request.input("conveyorStyleName", sql.VarChar, newConveyorStyle.conveyorStyleName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addChainSize(newChainSize) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblChainSize values (@chainSizeType, @chainSizeName)";

		request.input("chainSizeType", sql.Int, newChainSize.chainSizeType);
		request.input("chainSizeName", sql.VarChar, newChainSize.chainSizeName);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addChainPinType(newChainPinType) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblChainPinType values (@chainPinType, @chainPinName)";

		request.input("chainPinType", sql.Int, newChainPinType.chainPinType);
		request.input("chainPinName", sql.Varchar, newChainPinType.chainPinName);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addIndustrial(newIndustrial) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblIndustrial values (@productID, @industrialType)";

		request.input("productID", sql.VarChar, newIndustrial.productID);
		request.input("industrialType", sql.Int, newIndustrial.industrialType);		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addIndustrialApplication(newIndustrialApplication) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblIndustrialApplication values (@productID, @applicationType)";

		request.input("productID", sql.VarChar, newIndustrialApplication.productID);
		request.input("applicationType", sql.Int, newIndustrialApplication.applicationType);		


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addIndustrialInfo(newIndustrialInfo) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblIndustrialInfo values (@industrialInfoID, @industrialPopularity, @industrialPrice , @industrialDateAdded)";

		request.input("industrialInfoID", sql.VarChar, newIndustrialInfo.newIndustrialInfo);
		request.input("industrialPopularity", sql.Int, newIndustrialInfo.industrialPopularity);
		request.input("industrialPrice", sql.Decimal, newIndustrialInfo.industrialPrice);
		request.input("industrialDateAdded", sql.DateTime, newIndustrialInfo.industrialDateAdded);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addIndustrialProduct(newIndustrialProduct) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblIndustrialProduct values (@productID, @industrialName, @industrialInfoID)";

		request.input("productID", sql.VarChar, newIndustrialProduct.productID);
		request.input("industrialName", sql.VarChar, newIndustrialProduct.industrialName);
		request.input("industrialInfoID", sql.VarChar, newIndustrialProduct.industrialInfoID);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addIndustrialType(newIndustrialType) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblIndustrialType values (@industrialType, @industrialTypeName)";

		request.input("industrialType", sql.Int, newIndustrialType.industrialType);
		request.input("industrialTypeName", sql.VarChar, newIndustrialType.industrialTypeName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addMeasurementUnit(newMeasurementUnit) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblMeasurementUnit values (@measurementUnitType, @measurementUnitName)";

		request.input("measurementUnitType", sql.Int, newMeasurementUnit.measurementUnitType);
		request.input("measurementUnitName", sql.VarChar, newMeasurementUnit.measurementUnitName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addOrder(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherWheelManufacturer(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherTrolleyColor(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherConveyorStyle(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherChainManufacturer(newOtherChainManufacturer) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values (@orderID, @otherChainManufacturer)";

		request.input("orderID", sql.VarChar, newOtherChainManufacturer.orderID);
		request.input("otherChainManufacturer", sql.VarChar, newOtherChainManufacturer.otherChainManufacturer);


		await request.query(query);

		console.log("New Other Chain Manufacturer Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherChainSize(newOtherChainSize) {
	try {
		const request = pool.request();

		const query =
			"Insert into tblOtherChainSize values (@orderID, @otherChainSizeName)";

		request.input("orderID", sql.VarChar, newOtherChainSize.orderID);
		request.input("otherChainSizeName", sql.VarChar, newOtherChainSize.otherChainSizeName);


		await request.query(query);

		console.log("New Other Chain Size Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};


async function addOtherAppEnv(newOtherAppEnv) {
	try {
		const request = pool.request();

		const query =
			"Insert into ** values (@orderID, @otherOtherAppEnvName)";

		request.input("orderID", sql.VarChar, newOtherAppEnv.orderID);
		request.input("otherOtherAppEnvName", sql.VarChar, newOtherAppEnv.otherOtherAppEnvName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};





async function addProduct(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addProductType(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addProteinProduct(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addReservoirSize(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addSession(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addTrolleyType(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addTrolleyColor(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addSpeedUnit(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addTravelDirection(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addWheelManufacturer(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addMetalType(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addProteinChainManufacturer(newAppEnv) {

	try {
		const request = pool.request();

		const query =
			"Insert into ** values ()";

		request.input("**", sql.**, newAppEnv.**);
		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};

//Assuming the int for other is 1 for all "Type" fields
async function addProteinGeneralOP8SS(newProteinGeneralOP8SS){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinCustomPower values (@orderID, @conveyorName, @chainSizeType, @chainManufacturerType, @conveyorLength, @measurementUnitType, @travelDirection, @appEnvType, @tempSurrounding, @loadedStatus)";

		request.input("orderID", sql.VarChar, newProteinGeneralOP8SS.orderID);
		request.input("conveyorName", sql.VarChar, newProteinGeneralOP8SS.conveyorName);
		request.input("chainSizeType", sql.Int, newProteinGeneralOP8SS.chainSizeType);
		request.input("chainManufacturerType", sql.Int, newProteinGeneralOP8SS.chainManufacturerType);
		request.input("conveyorLength", sql.Decimal, newProteinGeneralOP8SS.conveyorLength);
		request.input("measurementUnitType", sql.Int, newProteinGeneralOP8SS.measurementUnitType);
		request.input("travelDirection", sql.Int, newProteinGeneralOP8SS.travelDirection);
		request.input("appEnvType", sql.Int, newProteinGeneralOP8SS.appEnvType);
		request.input("tempSurrounding", sql.Bit, newProteinGeneralOP8SS.tempSurrounding);
		request.input("loadedStatus", sql.Bit, newProteinGeneralOP8SS.loadedStatus);

		if(newProteinGeneralOP8SS.chainSizeType === 1)
		{
			const otherChainSizeName = newProteinGeneralOP8SS.otherChainSizeName

			await addOtherChainSize({

				orderID: newProteinGeneralOP8SS.orderID,
				otherChainSizeName: otherChainSizeName

			})
		}

		if(newProteinGeneralOP8SS.chainManufacturerType === 1)
		{
			const otherChainManufacturerName = newProteinGeneralOP8SS.otherChainManufacturerName

			await addOtherChainManufacturer({

				orderID: newProteinGeneralOP8SS.orderID,
				otherChainManufacturerName: otherChainManufacturerName

			})
		}

		if(newProteinGeneralOP8SS.appEnvType === 1)
		{
			const otherAppEnvName = newProteinGeneralOP8SS.otherAppEnvName

			await addOtherAppEnv({

				orderID: newProteinGeneralOP8SS.orderID,
				otherAppEnvName: otherAppEnvName

			})
		}

		await request.query(query);

		console.log("OP-8SS General Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addProteinCustomPowerOP8SS(newProteinCustomPowerOP8SS){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinCustomPower values (@orderID, @operatingVoltTriple, @controlVolt)";

		request.input("orderID", sql.VarChar, newProteinCustomPowerOP8SS.orderID);
		request.input("operatingVoltTriple", sql.Decimal, newProteinCustomPowerOP8SS.operatingVoltTriple);
		request.input("controlVolt", sql.Decimal, newProteinCustomPowerOP8SS.controlVolt);



		await request.query(query);

		console.log("OP-8SS Custom Power Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addProteinAdditionalOP8SS(newProteinAdditionalOP8SS){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinAdditional values (@orderID, @oppsSpecification, @washDown, @foodIndustry, @powerPanel, @pushButtonSwitch, @enclosedShroud, @additionalOtherInfo)";

		request.input("orderID", sql.VarChar, newProteinAdditionalOP8SS.orderID);
		request.input("oppsSpecification", sql.Bit, newProteinAdditionalOP8SS.oppsSpecification);
		request.input("washDown", sql.Bit, newProteinAdditionalOP8SS.washDown);
		request.input("foodIndustry", sql.Bit, newProteinAdditionalOP8SS.foodIndustry);
		request.input("powerPanel", sql.Bit, newProteinAdditionalOP8SS.powerPanel);
		request.input("pushButtonSwitch", sql.Bit, newProteinAdditionalOP8SS.pushButtonSwitch);
		request.input("enclosedShroud", sql.Int, newProteinAdditionalOP8SS.enclosedShroud);
		request.input("additionalOtherInfo", sql.VarChar, newProteinAdditionalOP8SS.additionalOtherInfo);


		await request.query(query);

		console.log("OP-8SS Additional Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addProteinWireOP8SS(newProteinWireOP8SS){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinCustomPower values (@orderID, @twoConductor, @fourConductor, @sevenConductor, @twelveConductor, @juntionBoxNum, @wireMeasurementUnitType)";

		request.input("orderID", sql.VarChar, newProteinWireOP8SS.orderID);
		request.input("twoConductor", sql.Int, newProteinWireOP8SS.twoConductor);
		request.input("fourConductor", sql.Int, newProteinWireOP8SS.fourConductor);
		request.input("sevenConductor", sql.Int, newProteinWireOP8SS.sevenConductor);
		request.input("twelveConductor", sql.Int, newProteinWireOP8SS.twelveConductor);
		request.input("juntionBoxNum", sql.Int, newProteinWireOP8SS.juntionBoxNum);
		request.input("wireMeasurementUnitType ", sql.Int, newProteinWireOP8SS.wireMeasurementUnitType );

		await request.query(query);

		console.log("OP-8SS Wire Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};


async function addProteinMeasurementOP8SS(newProteinMeasurementOP8SS){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinMeasurement values (@orderID, @powerTrolleyWheel, @powerRailWidth, @powerRailHeight, @chainDrop, @measurementUnitType)";

		request.input("orderID", sql.VarChar, newProteinMeasurementOP8SS.orderID);
		request.input("powerTrolleyWheel", sql.Decimal, newProteinMeasurementOP8SS.powerTrolleyWheel);
		request.input("powerRailWidth", sql.Decimal, newProteinMeasurementOP8SS.powerRailWidth);
		request.input("powerRailHeight", sql.Decimal, newProteinMeasurementOP8SS.powerRailHeight);
		request.input("chainDrop", sql.Decimal, newProteinMeasurementOP8SS.chainDrop);
		request.input("measurementUnitType", sql.Int, newProteinMeasurementOP8SS.measurementUnitType);


		await request.query(query);

		console.log("OP-8SS Measurement Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

async function addProteinCustomPowerFoodGradeLubrication
async function addProteinConveyorSpecFoodGradeLubrication
async function addProteinGeneralFoodGradeLubrication
async function addProteinMonitoringFoodGradeLubrication
async function addProteinMeasurementFoodGradeLubrication
async function addProteinWireFoodGradeLubrication