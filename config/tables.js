const { pool } = require("./config"); // Use pool directly as it auto-connects on import

async function createTables() {
	try {
		const request = pool.request();

		//Create tblUser
		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblControlVoltageUnit')
                CREATE TABLE tblControlVoltageUnit (
                    controlVoltage CHAR(1) NOT NULL PRIMARY KEY,
                    controlVoltageName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblJunctionBoxUnit')
                CREATE TABLE tblJunctionBoxUnit (
                    junctionBoxUnit CHAR(1) NOT NULL PRIMARY KEY,
                    junctionBoxUnitName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblMachine')
                CREATE TABLE tblMachine (
                    machineID VARCHAR(50) NOT NULL PRIMARY KEY,
                    machineName VARCHAR(255) DEFAULT NULL,
                    machineType VARCHAR(25) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOperatingVoltageUnit')
                CREATE TABLE tblOperatingVoltageUnit (
                    operatingVoltage CHAR(1) NOT NULL PRIMARY KEY,
                    operatingVoltageName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPinType')
                CREATE TABLE tblPinType (
                    chainPinType CHAR(1) NOT NULL PRIMARY KEY,
                    chainPinName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPowerRailWidthUnit')
                CREATE TABLE tblPowerRailWidthUnit (
                    powerRailWidthUnit CHAR(1) NOT NULL PRIMARY KEY,
                    powerRailWidthUnitName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPowerRailHeightUnit')
                CREATE TABLE tblPowerRailHeightUnit (
                    powerRailHeightUnit CHAR(1) NOT NULL PRIMARY KEY,
                    powerRailHeightUnitName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProtein')
                CREATE TABLE tblProtein (
                    machineID VARCHAR(50) DEFAULT NULL,
                    machineName VARCHAR(255) DEFAULT NULL,
                    popularity INT DEFAULT NULL,
                    price DECIMAL(10, 2) DEFAULT NULL,
                    dateAdded DATE DEFAULT NULL,
                    FOREIGN KEY (machineID) REFERENCES tblMachine (machineID)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinFGLMAdditionalGeneral')
                CREATE TABLE tblProteinFGLMAdditionalGeneral (
                    proteinProductID VARCHAR(50) DEFAULT NULL,
                    wheelManufacturer VARCHAR(50) DEFAULT NULL,
                    chainPinType CHAR(1) NOT NULL,
                    conveyorSpeed DECIMAL(10, 2) DEFAULT NULL,
                    conveyorSpeedUnit BIT DEFAULT NULL,
                    variableSpeedConditions VARCHAR(50) DEFAULT NULL,
                    metalType VARCHAR(50) NOT NULL,
                    conveyorStyle VARCHAR(50) NOT NULL,
                    trolleyColor VARCHAR(25) NOT NULL,
                    trolleyType VARCHAR(100) DEFAULT NULL,
                    conveyorSwingStatus BIT NOT NULL,
                    planLayout BIT DEFAULT NULL,
                    chainPhotos BIT DEFAULT NULL,
                    FOREIGN KEY (proteinProductID) REFERENCES tblProteinGeneralInfo (proteinProductID),
                    FOREIGN KEY (chainPinType) REFERENCES tblPinType (chainPinType)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinFGLMMeasurement')
                CREATE TABLE tblProteinFGLMMeasurement (
                    proteinProductID VARCHAR(50) DEFAULT NULL,
                    trolleyWheelDiameter DECIMAL(10, 2) DEFAULT NULL,
                    trolleyWheelUnit CHAR(1) DEFAULT NULL,
                    powerRailWidth DECIMAL(10, 2) DEFAULT NULL,
                    powerRailWidthUnit CHAR(1) DEFAULT NULL,
                    powerRailHeight DECIMAL(10, 2) DEFAULT NULL,
                    powerRailHeightUnit CHAR(1) DEFAULT NULL,
                    FOREIGN KEY (proteinProductID) REFERENCES tblProteinGeneralInfo (proteinProductID),
                    FOREIGN KEY (trolleyWheelUnit) REFERENCES tblTrolleyWheelUnit (trolleyWheelUnit),
                    FOREIGN KEY (powerRailWidthUnit) REFERENCES tblPowerRailWidthUnit (powerRailWidthUnit),
                    FOREIGN KEY (powerRailHeightUnit) REFERENCES tblPowerRailHeightUnit (powerRailHeightUnit)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinFGLMMonitoring')
                CREATE TABLE tblProteinFGLMMonitoring (
                    proteinProductID VARCHAR(50) DEFAULT NULL,
                    existingSystem BIT DEFAULT NULL,
                    newSystem BIT DEFAULT NULL,
                    motorAmp BIT DEFAULT NULL,
                    takeUpAir BIT DEFAULT NULL,
                    takeUpDistance BIT DEFAULT NULL,
                    motorTemp BIT DEFAULT NULL,
                    motorVibration BIT DEFAULT NULL,
                    pitchValidation BIT DEFAULT NULL,
                    FOREIGN KEY (proteinProductID) REFERENCES tblProteinGeneralInfo (proteinProductID)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinFGLMConveyorSpecs')
                CREATE TABLE tblProteinFGLMConveyorSpecs (
                    proteinProductID VARCHAR(50) DEFAULT NULL,
                    sideLubrication BIT DEFAULT NULL,
                    topLubrication BIT DEFAULT NULL,
                    timeLubrication VARCHAR(50) DEFAULT NULL,
                    timeDelayLubrication VARCHAR(50) DEFAULT NULL,
                    reservoirSizeType CHAR(1) DEFAULT NULL,
                    reservoirSizeQuantity INT DEFAULT NULL,
                    chainCleanStatus BIT DEFAULT NULL,
                    FOREIGN KEY (proteinProductID) REFERENCES tblProteinGeneralInfo (proteinProductID),
                    FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize (reservoirSizeType)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinFGLMPowerUtilities')
                CREATE TABLE tblProteinFGLMPowerUtilities (
                    proteinProductID VARCHAR(50) DEFAULT NULL,
                    operatingVoltage CHAR(1) NOT NULL,
                    controlVoltage CHAR(1) NOT NULL,
                    FOREIGN KEY (operatingVoltage) REFERENCES tblOperatingVoltageUnit (operatingVoltage),
                    FOREIGN KEY (controlVoltage) REFERENCES tblControlVoltageUnit (controlVoltage),
                    FOREIGN KEY (proteinProductID) REFERENCES tblProteinGeneralInfo (proteinProductID)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinFGLMWire')
                CREATE TABLE tblProteinFGLMWire (
                    proteinProductID VARCHAR(50) DEFAULT NULL,
                    twoConductorNum INT DEFAULT NULL,
                    fourConductorNum INT DEFAULT NULL,
                    sevenConductorNum INT DEFAULT NULL,
                    twelveConductorNum INT DEFAULT NULL,
                    junctionBoxNum INT DEFAULT NULL,
                    junctionBoxUnit CHAR(1) DEFAULT NULL,
                    FOREIGN KEY (proteinProductID) REFERENCES tblProteinGeneralInfo (proteinProductID),
                    FOREIGN KEY (junctionBoxUnit) REFERENCES tblJunctionBoxUnit (junctionBoxUnit)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinGeneralInfo')
                CREATE TABLE tblProteinGeneralInfo (
                    proteinProductID VARCHAR(50) NOT NULL PRIMARY KEY,
                    machineID VARCHAR(50) DEFAULT NULL,
                    productName VARCHAR(255) DEFAULT NULL,
                    conveyorSystemName VARCHAR(255) DEFAULT NULL,
                    conveyorChainSize VARCHAR(50) DEFAULT NULL,
                    chainManufacturer VARCHAR(50) DEFAULT NULL,
                    conveyorLength DECIMAL(10, 2) DEFAULT NULL,
                    conveyorLengthUnit VARCHAR(10) DEFAULT NULL,
                    travelDirection BIT DEFAULT NULL,
                    applicationEnvironment VARCHAR(50) NOT NULL,
                    temperatureArea BIT DEFAULT NULL,
                    loadedStatus BIT NOT NULL,
                    numRequested INT DEFAULT NULL,
                    FOREIGN KEY (machineID) REFERENCES tblMachine (machineID)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinProductOrders')
                CREATE TABLE tblProteinProductOrders (
                    proteinProductID VARCHAR(50) DEFAULT NULL,
                    machineID VARCHAR(50) DEFAULT NULL,
                    numRequested INT DEFAULT NULL,
                    FOREIGN KEY (proteinProductID) REFERENCES tblProteinGeneralInfo (proteinProductID),
                    FOREIGN KEY (machineID) REFERENCES tblMachine (machineID)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblReservoirSize')
                CREATE TABLE tblReservoirSize (
                    reservoirSizeType CHAR(1) NOT NULL PRIMARY KEY,
                    reservoirSizeName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblSessions')
                CREATE TABLE tblSessions (
                    sessionID VARCHAR(50) NOT NULL PRIMARY KEY,
                    userID VARCHAR(50) NOT NULL,
                    sessionCreateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    sessionExpireTime DATETIME DEFAULT NULL,
                    FOREIGN KEY (userID) REFERENCES tblUsers (userID)
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblTrolleyWheelUnit')
                CREATE TABLE tblTrolleyWheelUnit (
                    trolleyWheelUnit CHAR(1) NOT NULL PRIMARY KEY,
                    trolleyWheelUnitName VARCHAR(50) DEFAULT NULL
                );
            `);

		await request.query(`
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblUsers')
                CREATE TABLE tblUsers (
                    userID VARCHAR(50) NOT NULL PRIMARY KEY,
                    username VARCHAR(24) NOT NULL UNIQUE,
                    password VARCHAR(50) NOT NULL,
                    firstName VARCHAR(50) NOT NULL,
                    lastName VARCHAR(50) NOT NULL,
                    emailAddress VARCHAR(100) NOT NULL UNIQUE,
                    phoneNumber VARCHAR(10) DEFAULT NULL UNIQUE,
                    country VARCHAR(15) DEFAULT NULL,
                    companyName VARCHAR(255) DEFAULT NULL,
                    CONSTRAINT checkEmail CHECK (emailAddress LIKE '%_@__%.__%'),
                    CONSTRAINT checkPassword CHECK (password LIKE '%[A-Z]%' AND password LIKE '%[a-z]%' AND password LIKE '%[0-9]%' AND password LIKE '%[^a-zA-Z0-9]%' AND LEN(password) >= 8),
                    CONSTRAINT checkPhoneNum CHECK (phoneNumber LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
                    CONSTRAINT checkUsername CHECK (username LIKE '%[a-z0-9]%')
                );
            `);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { createTables };
