const { pool } = require("./config"); // Use pool directly as it auto-connects on import

async function createTables() {
	try {
		const request = pool.request();

        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblAppEnv')
            CREATE TABLE tblAppEnv (
                appEnvType INT PRIMARY KEY,
                appEnvName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblApplicationType')
            CREATE TABLE tblApplicationType (
                applicationType INT PRIMARY KEY,
                applicationTypeName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblConveyorStyle')
            CREATE TABLE tblConveyorStyle (
                conveyorStyleType INT PRIMARY KEY,
                conveyorStyleName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblChainSize')
            CREATE TABLE tblChainSize (
                chainSizeType INT PRIMARY KEY,
                chainSizeName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblChainPinType')
            CREATE TABLE tblChainPinType (
                chainPinType INT PRIMARY KEY,
                chainPinName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIndustrial')
            CREATE TABLE tblIndustrial (
                productID VARCHAR(50),
                industrialType INT,
                FOREIGN KEY (productID) REFERENCES tblProduct (productID),
                FOREIGN KEY (industrialType) REFERENCES tblIndustrialType (industrialType)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIndustrialApplication')
            CREATE TABLE tblIndustrialApplication (
                productID VARCHAR(50),
                applicationType INT,
                FOREIGN KEY (productID) REFERENCES tblProduct (productID),
                FOREIGN KEY (applicationType) REFERENCES tblApplicationType (applicationType)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIndustrialInfo')
            CREATE TABLE tblIndustrialInfo (
                industrialInfoID VARCHAR(36) PRIMARY KEY,
                industrialPopularity INT,
                industrialPrice DECIMAL(10,2),
                industrialDateAdded DATETIME
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIndustrialProduct')
            CREATE TABLE tblIndustrialProduct (
                productID VARCHAR(50),
                industrialName VARCHAR(255),
                industrialInfoID VARCHAR(36),
                FOREIGN KEY (productID) REFERENCES tblProduct (productID),
                FOREIGN KEY (industrialInfoID) REFERENCES tblIndustrialInfo (industrialInfoID)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIndustrialType')
            CREATE TABLE tblIndustrialType (
                industrialType INT PRIMARY KEY,
                industrialTypeName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblMeasurementUnit')
            CREATE TABLE tblMeasurementUnit (
                measurementUnitType INT PRIMARY KEY,
                measurementUnitName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOrder')
            CREATE TABLE tblOrder (
                orderID VARCHAR(36) PRIMARY KEY,
                productID VARCHAR(50),
                userID VARCHAR(50),
                orderStatus BIT,
                quantity INT,
                FOREIGN KEY (productID) REFERENCES tblProduct (productID),
                FOREIGN KEY (userID) REFERENCES tblUsers (userID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOtherWheelManufacturer')
            CREATE TABLE tblOtherWheelManufacturer (
                orderID VARCHAR(36),
                otherWheelManufacturerName VARCHAR(50),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);

        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOtherChainManufacturer')
                create table tblOtherChainManufacturer(
                orderID VARCHAR(36), 
                otherChainManufacturerName VARCHAR(50),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);

        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOtherTrolleyColor')
            CREATE TABLE tblOtherTrolleyColor (
                orderID VARCHAR(36),
                otherTrolleyColorName VARCHAR(50),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOtherConveyorStyle')
            CREATE TABLE tblOtherConveyorStyle (
                orderID VARCHAR(36),
                otherConveyorStyleName VARCHAR(50),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOtherChainSize')
            CREATE TABLE tblOtherChainSize (
                orderID VARCHAR(36),
                otherChainSizeName VARCHAR(50),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOtherAppEnv')
            CREATE TABLE tblOtherAppEnv (
                orderID VARCHAR(36),
                otherAppEnvName VARCHAR(50),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProduct')
            CREATE TABLE tblProduct (
                productID VARCHAR(50) PRIMARY KEY,
                productType INT,
                FOREIGN KEY (productType) REFERENCES tblProductType (productType)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProductType')
            CREATE TABLE tblProductType (
                productType INT PRIMARY KEY,
                productTypeName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinAdditional')
            CREATE TABLE tblProteinAdditional (
                orderID VARCHAR(36),
                oppsSpecification BIT,
                washDown BIT,
                foodIndustry BIT,
                powerPanel BIT,
                pushButtonSwitch BIT,
                enclosedShroud INT,
                additionalOtherInfo VARCHAR(255),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinChainManufacturer')
            CREATE TABLE tblProteinChainManufacturer (
                chainManufacturerType INT PRIMARY KEY,
                chainManufacturerName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinCustomPower')
            CREATE TABLE tblProteinCustomPower (
                orderID VARCHAR(36),
                operatingVoltSingle DECIMAL(5,2),
                operatingVoltTriple DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinConveyorSpec')
            CREATE TABLE tblProteinConveyorSpec (
                orderID VARCHAR(36),
                sideLubrication BIT,
                topLubrication BIT,
                timeLubrication VARCHAR(50),
                timeDelay VARCHAR(50),
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize (reservoirSizeType)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinGeneral')
            CREATE TABLE tblProteinGeneral (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                chainManufacturerType INT,
                wheelManufacturerType INT,
                chainPinType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                metalType INT,
                conveyorStyleType INT,
                trolleyType INT,
                swingStatus BIT,
                plantLayout BIT,
                chainPictures BIT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                trolleyColorType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize (chainSizeType),
                FOREIGN KEY (chainManufacturerType) REFERENCES tblProteinChainManufacturer (chainManufacturerType),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer (wheelManufacturerType),
                FOREIGN KEY (chainPinType) REFERENCES tblChainPinType (chainPinType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit (speedUnitType),
                FOREIGN KEY (metalType) REFERENCES tblMetalType (metalType),
                FOREIGN KEY (conveyorStyleType) REFERENCES tblConveyorStyle (conveyorStyleType),
                FOREIGN KEY (trolleyType) REFERENCES tblTrolleyType (trolleyType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit (measurementUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection (travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv (appEnvType),
                FOREIGN KEY (trolleyColorType) REFERENCES tblTrolleyColor(trolleyColorType)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinInfo')
            CREATE TABLE tblProteinInfo (
                proteinInfoID VARCHAR(36) PRIMARY KEY,
                proteinPopularity INT,
                proteinPrice DECIMAL(10,2),
                proteinDateAdded DATETIME
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinMonitoring')
            CREATE TABLE tblProteinMonitoring (
                orderID VARCHAR(36),
                existingConnection BIT,
                newConnection BIT,
                motorAmp BIT,
                driveTakeUp BIT,
                takeUpDistance BIT,
                motorTemp BIT,
                motorValidation BIT,
                pitchValidation BIT,
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinMeasurement')
            CREATE TABLE tblProteinMeasurement (
                orderID VARCHAR(36),
                powerTrolleyWheel DECIMAL(5,2),
                powerRailWidth DECIMAL(5,2),
                powerRailHeight DECIMAL(5,2),
                chainDrop DECIMAL(5,2),
                measurementUnitType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit (measurementUnitType)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinProduct')
            CREATE TABLE tblProteinProduct (
                productID VARCHAR(50),
                proteinName VARCHAR(255),
                proteinInfoID VARCHAR(36),
                FOREIGN KEY (productID) REFERENCES tblProduct (productID),
                FOREIGN KEY (proteinInfoID) REFERENCES tblProteinInfo (proteinInfoID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProteinWire')
            CREATE TABLE tblProteinWire (
                orderID VARCHAR(36),
                twoConductor INT,
                fourConductor INT,
                sevenConductor INT,
                twelveConductor INT,
                junctionBoxNum INT,
                wireMeasurementUnitType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder (orderID),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit (measurementUnitType)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblReservoirSize')
            CREATE TABLE tblReservoirSize (
                reservoirSizeType INT PRIMARY KEY,
                reservoirSizeName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblSessions')
            CREATE TABLE tblSessions (
                sessionID VARCHAR(50) PRIMARY KEY,
                userID VARCHAR(50) NOT NULL,
                sessionCreateTime DATETIME NOT NULL DEFAULT GETDATE(),
                sessionExpireTime DATETIME,
                FOREIGN KEY (userID) REFERENCES tblUsers (userID)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblTrolleyType')
            CREATE TABLE tblTrolleyType (
                trolleyType INT PRIMARY KEY,
                trolleyTypeName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblTrolleyColor')
            CREATE TABLE tblTrolleyColor (
                trolleyColorType INT PRIMARY KEY,
                trolleyColorName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblSpeedUnit')
            CREATE TABLE tblSpeedUnit (
                speedUnitType INT PRIMARY KEY,
                speedUnitName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblTravelDirection')
            CREATE TABLE tblTravelDirection (
                travelDirectionType INT PRIMARY KEY,
                travelDirectionDescription VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblWheelManufacturer')
            CREATE TABLE tblWheelManufacturer (
                wheelManufacturerType INT PRIMARY KEY,
                wheelManufacturerName VARCHAR(50)
            );
        `);
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblMetalType')
            CREATE TABLE tblMetalType (
                metalType INT PRIMARY KEY,
                metalTypeName VARCHAR(50)
            );
        `);
        

        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblUsers')
            CREATE TABLE tblUsers (
                userID VARCHAR(50) NOT NULL PRIMARY KEY,
                username VARCHAR(24) NOT NULL UNIQUE,
                password VARCHAR(60) NOT NULL,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(50) NOT NULL,
                emailAddress VARCHAR(100) NOT NULL UNIQUE,
                phoneNumber VARCHAR(10) DEFAULT NULL UNIQUE,
                country VARCHAR(15) DEFAULT NULL,
                companyName VARCHAR(255) DEFAULT NULL,
                CONSTRAINT checkEmail CHECK (emailAddress LIKE '%_@__%.__%' ESCAPE '_'),
                CONSTRAINT checkPassword CHECK (password LIKE '%[A-Z]%' AND password LIKE '%[a-z]%' AND password LIKE '%[0-9]%' AND password LIKE '%[^a-zA-Z0-9]%'),
                CONSTRAINT checkPhoneNum CHECK (phoneNumber LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
                CONSTRAINT checkUsername CHECK (username LIKE '[a-z0-9]%')
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblDrafts')
            create table tblDrafts(
                draftID varchar(10) Primary key,
                draftName varchar(50),
                dateCreated datetime not null default getdate(),
                totalPrice decimal (10,2),
                orderID varchar(36),
                foreign key(orderID) references tblOrder(orderID)
            );
        `);


	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { createTables };
