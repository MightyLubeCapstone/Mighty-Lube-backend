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
