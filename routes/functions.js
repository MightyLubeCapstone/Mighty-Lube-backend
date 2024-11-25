const { poolConnect } = require("../config/config");

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

async function addOrder(newOrder) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblOrder values (@orderID, @productID, @userID)";

		request.input("orderID", sql.VarChar, newOrder.orderID);
		request.input("productID", sql.VarChar, newOrder.productID);
		request.input("userID", sql.VarChar, newOrder.userID);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherWheelManufacturer(newOtherWheelManufacturer) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblOtherWheelManufacturer values (@orderID, @otherWheelManufacturerName)";

			request.input("orderID", sql.VarChar, newOtherWheelManufacturer.orderID);
			request.input("otherWheelManufacturerName", sql.VarChar, newOtherWheelManufacturer.otherWheelManufacturerName);

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherTrolleyColor(newOtherTrolleyColor) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblOtherTrolleyColor values (@orderID, @oherTrolleyColorName)";

		request.input("orderID", sql.VarChar, newOtherTrolleyColor.orderID);
		request.input("oherTrolleyColorName", sql.VarChar, newOtherTrolleyColor.oherTrolleyColorName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addOtherConveyorStyle(newOtherConveyorStyle) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblOtherConveyorStyle values (@orderID, @otherConveyorStyleName)";

			request.input("orderID", sql.VarChar, newOtherConveyorStyle.orderID);
			request.input("otherConveyorStyleName", sql.VarChar, newOtherConveyorStyle.otherConveyorStyleName);


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




async function addProduct(newProduct) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblProduct values (@productID, @productType)";

		request.input("productID", sql.VarChar, newProduct.productID);
		request.input("productType", sql.Int, newProduct.productType);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addProductType(newProductType) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblProductType values (@productType, @productTypeName)";

		request.input("productType", sql.Int, newProductType.productType);
		request.input("productTypeName", sql.Int, newProductType.productTypeName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addProteinProduct(newProteinProduct) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinProduct values (@productID, @proteinName, @proteinInfoID)";

		request.input("productID", sql.VarChar, newProteinProduct.productID);
		request.input("proteinName", sql.VarChar, newProteinProduct.proteinName);
		request.input("proteinInfoID", sql.VarChar, newProteinProduct.proteinInfoID);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addReservoirSize(newReservoirSize) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblReservoirSize values (@reservoirSizeType, @reservoirSizeName)";

		request.input("reservoirSizeType", sql.Int, newReservoirSize.reservoirSizeType);
		request.input("reservoirSizeName", sql.VarChar, newReservoirSize.reservoirSizeName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addTrolleyType(newTrolleyType) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblTrolleyType values (@trolleyType, @trolleyTypeName)";

		request.input("trolleyType", sql.Int, newTrolleyType.trolleyType);
		request.input("trolleyTypeName", sql.Int, newTrolleyType.trolleyTypeName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addTrolleyColor(newTrolleyColor) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblTrolleyColor values (@trolleyColorType, @trolleyColorName)";

		request.input("trolleyColorType", sql.Int, newTrolleyColor.trolleyColorType);
		request.input("trolleyColorName", sql.Int, newTrolleyColor.trolleyColorName);		

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addSpeedUnit(newSpeedUnit) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblSpeedUnit values (@speedUnitType, @speedUnitName)";

		request.input("speedUnitType", sql.Int, newSpeedUnit.speedUnitType);
		request.input("speedUnitName", sql.Int, newSpeedUnit.speedUnitName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addTravelDirection(newTravelDirection) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblTravelDirection values (@travelDirectionType, @travelDirectionDescription)";

		request.input("travelDirectionType", sql.Int, newTravelDirection.travelDirectionType);
		request.input("travelDirectionDescription", sql.Int, newTravelDirection.travelDirectionDescription);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addWheelManufacturer(newWheelManufacturer) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblWheelManufacturer values (@wheelManufacturerType, @wheelManufacturerName)";

		request.input("wheelManufacturerType", sql.Int, newWheelManufacturer.wheelManufacturerType);
		request.input("wheelManufacturerName", sql.VarChar, newWheelManufacturer.wheelManufacturerName);

		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addMetalType(newMetalType) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblMetalType values (@metalType, @metalTypeName)";

		request.input("metalType", sql.Int, newMetalType.metalType);
		request.input("metalTypeName", sql.Int, newMetalType.metalTypeName);


		await request.query(query);

		console.log("** Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}



};


async function addProteinChainManufacturer(newProteinChainManufacturer) {

	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinChainManufacturer values (@chainManufacturerType, @chainManufacturerName)";

		request.input("chainManufacturerType", sql.Int, newProteinChainManufacturer.chainManufacturerType);
		request.input("chainManufacturerName", sql.VarChar, newProteinChainManufacturer.chainManufacturerName);

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


async function addProteinGeneralFoodGradeLubrication(newProteinGeneralFoodGradeLubrication){
	try {
		await poolConnect;
		const request = pool.request();

		const query =
			"Insert into tblProteinGeneral values (@orderID, @conveyorName, @chainSizeType, @chainManufacturerType, @wheelManufacturerType, @chainPinType, @conveyorLength, @measurementUnitType, @conveyorSpeed, @speedUnitType, @variableSpeed, @travelDirection, @metalType, @conveyorStyleType, @trolleyColorType, @trolleyType, @appEnvType, @tempSurrounding, @loadedStatus, @swingStatus, @plantLayout, @chainPictures, @numProductRequested)";

		request.input("orderID", sql.VarChar, newProteinGeneralFoodGradeLubrication.orderID);
		request.input("conveyorName", sql.VarChar, newProteinGeneralFoodGradeLubrication.conveyorName);
		request.input("chainSizeType", sql.Int, newProteinGeneralFoodGradeLubrication.chainSizeType);
		request.input("chainManufacturerType", sql.Int, newProteinGeneralFoodGradeLubrication.chainManufacturerType);
		request.input("wheelManufacturerType", sql.Int, newProteinGeneralFoodGradeLubrication.wheelManufacturerType);
		request.input("chainPinType", sql.Int, newProteinGeneralFoodGradeLubrication.chainPinType);
		request.input("conveyorLength", sql.Decimal, newProteinGeneralFoodGradeLubrication.conveyorLength);
		request.input("measurementUnitType", sql.Int, newProteinGeneralFoodGradeLubrication.measurementUnitType);
		request.input("conveyorSpeed", sql.Decimal, newProteinGeneralFoodGradeLubrication.conveyorSpeed);
		request.input("speedUnitType", sql.Int, newProteinGeneralFoodGradeLubrication.speedUnitType);
		request.input("variableSpeed", sql.Decimal, newProteinGeneralFoodGradeLubrication.variableSpeed);
		request.input("travelDirection", sql.Int, newProteinGeneralFoodGradeLubrication.travelDirection);
		request.input("metalType", sql.Int, newProteinGeneralFoodGradeLubrication.metalType);
		request.input("conveyorStyleType", sql.Int, newProteinGeneralFoodGradeLubrication.conveyorStyleType);
		request.input("trolleyColorType", sql.Int, newProteinGeneralFoodGradeLubrication.trolleyColorType);
		request.input("trolleyType", sql.Int, newProteinGeneralFoodGradeLubrication.trolleyType);
		request.input("appEnvType", sql.Int, newProteinGeneralFoodGradeLubrication.appEnvType);
		request.input("tempSurrounding", sql.Bit, newProteinGeneralFoodGradeLubrication.tempSurrounding);
		request.input("loadedStatus", sql.Bit, newProteinGeneralFoodGradeLubrication.loadedStatus);
		request.input("swingStatus", sql.Bit, newProteinGeneralFoodGradeLubrication.swingStatus);
		request.input("plantLayout", sql.Bit, newProteinGeneralFoodGradeLubrication.plantLayout);
		request.input("chainPictures", sql.Bit, newProteinGeneralFoodGradeLubrication.chainPictures);
		request.input("numProductRequested", sql.Int, newProteinGeneralFoodGradeLubrication.numProductRequested);

		await request.query(query);

		console.log(" Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};


async function addProteinCustomPowerFoodGradeLubrication(newProteinCustomPowerFoodGradeLubrication){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinCustomPower values (@orderID, @operatingVoltSingle, @controlVolt)"
		request.input("orderID", sql.VarChar, newProteinCustomPowerFoodGradeLubrication.orderID);
		request.input("operatingVoltSingle", sql.Decimal, newProteinCustomPowerFoodGradeLubrication.operatingVoltSingle);
		request.input("controlVolt", sql.Decimal, newProteinCustomPowerFoodGradeLubrication.controlVolt);


		await request.query(query);

		console.log(" Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};


async function addProteinMonitoringFoodGradeLubrication(newProteinMonitoringFoodGradeLubrication){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinMonitoring values (@orderID, @existingConnection, @newConnection, @motorAmp, @driveTakeUp, @takeUpDistance, @motorTemp, @motorValidation, @pitchValidation)";

		request.input("orderID", sql.VarChar, newProteinMonitoringFoodGradeLubrication.orderID);
		request.input("existingConnection", sql.Bit, newProteinMonitoringFoodGradeLubrication.existingConnection);
		request.input("newConnection", sql.Bit, newProteinMonitoringFoodGradeLubrication.newConnection);
		request.input("motorAmp", sql.Bit, newProteinMonitoringFoodGradeLubrication.motorAmp);
		request.input("driveTakeUp", sql.Bit, newProteinMonitoringFoodGradeLubrication.orderID);
		request.input("takeUpDistance", sql.Bit, newProteinMonitoringFoodGradeLubrication.takeUpDistance);
		request.input("motorTemp", sql.Bit, newProteinMonitoringFoodGradeLubrication.motorTemp);
		request.input("motorValidation", sql.Bit, newProteinMonitoringFoodGradeLubrication.motorValidation);
		request.input("pitchValidation", sql.Bit, newProteinMonitoringFoodGradeLubrication.pitchValidation);


		await request.query(query);

		console.log("Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};


async function addProteinConveyorSpecFoodGradeLubrication(newProteinConveyorSpecFoodGradeLubrication){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinConveyorSpec values (@orderID, @sideLubrication, @topLubrication, @timeLubrication, @timeDelay, @reservoirSizeType, @reservoirSizeQuanity, @chainCleanStatus)";

		request.input("orderID", sql.VarChar, newProteinConveyorSpecFoodGradeLubrication.orderID);
		request.input("sideLubrication", sql.Bit, newProteinConveyorSpecFoodGradeLubrication.sideLubrication);
		request.input("timeLubrication", sql.Bit, newProteinConveyorSpecFoodGradeLubrication.timeLubrication);
		request.input("timeDelay", sql.VarChar, newProteinConveyorSpecFoodGradeLubrication.timeDelay);
		request.input("reservoirSizeType", sql.Int, newProteinConveyorSpecFoodGradeLubrication.reservoirSizeType);
		request.input("reservoirSizeQuanity", sql.Int, newProteinConveyorSpecFoodGradeLubrication.reservoirSizeQuanity);
		request.input("chainCleanStatus", sql.Bit, newProteinConveyorSpecFoodGradeLubrication.chainCleanStatus);

		await request.query(query);

		console.log("OP-8SS Measurement Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};


async function addProteinWireFoodGradeLubrication(newProteinWireFoodGradeLubrication){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinWire values (@orderID, @twoConductor, @fourConductor, @sevenConductor, @twelveConductor, @junctionBoxNum, @wireMeasurementUnitType)";

		request.input("orderID", sql.VarChar, newProteinWireFoodGradeLubrication.orderID);
		request.input("twoConductor", sql.Int, newProteinWireFoodGradeLubrication.twoConductor);
		request.input("fourConductor", sql.Int, newProteinWireFoodGradeLubrication.fourConductor);
		request.input("sevenConductor", sql.Int, newProteinWireFoodGradeLubrication.sevenConductor);
		request.input("twelveConductor", sql.Int, newProteinWireFoodGradeLubrication.twelveConductor);
		request.input("junctionBoxNum", sql.Int, newProteinWireFoodGradeLubrication.junctionBoxNum);
		request.input("wireMeasurementUnitType", sql.Int, newProteinWireFoodGradeLubrication.wireMeasurementUnitType);

		await request.query(query);

		console.log(" Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};



async function addProteinMeasurementFoodGradeLubrication(newProteinMeasurementFoodGradeLubrication){
	try {
		const request = pool.request();

		const query =
			"Insert into tblProteinMeasurement values (@orderID, @powerTrolleyWheel, @powerRailWidth, @powerRailHeight, @measurementUnitType)";

		request.input("orderID", sql.VarChar, newProteinMeasurementFoodGradeLubrication.orderID);
		request.input("powerTrolleyWheel", sql.Decimal, newProteinMeasurementFoodGradeLubrication.powerTrolleyWheel);
		request.input("powerRailWidth", sql.Decimal, newProteinMeasurementFoodGradeLubrication.powerRailWidth);
		request.input("powerRailHeight", sql.Decimal, newProteinMeasurementFoodGradeLubrication.powerRailHeight);
		request.input("measurementUnitType", sql.Int, newProteinMeasurementFoodGradeLubrication.measurementUnitType);


		await request.query(query);

		console.log(" Info Added");
	} catch (error) {
		console.error("Error", error);

		throw error;
	}
};

module.exports = { addProteinGeneralFoodGradeLubrication };

