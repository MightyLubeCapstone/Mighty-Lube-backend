const { pool } = require("./config"); // Use pool directly as it auto-connects on import

async function createTables() {
	try {
		const request = pool.request();
        
        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProduct')
            create table tblProduct (
                productID VARCHAR(50) PRIMARY KEY,
                productName VARCHAR(255)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblProductInfo')
            create table tblProductInfo (
                productID VARCHAR(50),
                productCategory VARCHAR(10),
                productType VARCHAR(50),
                productApplication VARCHAR(15),
                FOREIGN KEY (productID) REFERENCES tblProduct (productID)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblSortingInfo')
            create table tblSortingInfo (
                productID VARCHAR(50),
                productPopularity INT,
                productPrice DECIMAL(10,2),
                productDateAdded DATETIME,
                FOREIGN KEY (productID) REFERENCES tblProduct (productID)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOrder')
            CREATE TABLE tblOrder (
                orderID VARCHAR(36) PRIMARY KEY,
                productID VARCHAR(50),
                userID VARCHAR(50),
                orderStatusType INT NOT NULL,
                timeRequested DATETIME NOT NULL DEFAULT GETDATE(),
                FOREIGN KEY (productID) REFERENCES tblProduct (productID),
                FOREIGN KEY (userID) REFERENCES tblUsers (userID),
                FOREIGN KEY (orderStatusType) REFERENCES tblOrderStatus (orderStatus)

            );
        `);

        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblNumProductRequested')
            CREATE TABLE tblNumProductRequested (
                orderID VARCHAR(36),
                numProductRequested INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOrderStatus')
            create table tblOrderStatus(
                orderStatus INT Primary key,
                orderStatusType varchar(50)

            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblAppEnv')
            CREATE TABLE tblAppEnv (
                appEnvType INT PRIMARY KEY,
                appEnvName VARCHAR(50)
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
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblMeasurementUnit')
            CREATE TABLE tblMeasurementUnit (
                measurementUnitType INT PRIMARY KEY,
                measurementUnitName VARCHAR(50)
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
                userStatus BIT DEFAULT 1,
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



        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblCC5_CL')
            CREATE TABLE tblCC5_CL (
                orderID VARCHAR(50),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                strandStatus BIT,
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                highRollerStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                cc5UnitType INT,
                powerRailWidth DECIMAL(5,2),
                powerRailHeight DECIMAL(5,2),
                rollerWheelA1 DECIMAL(5,2),
                rollerWheelB1 DECIMAL(5,2),
                linkD1 DECIMAL(5,2),
                wheelPitchM1 DECIMAL(5,2),
                rollerPinY1 DECIMAL(5,2),
                rollerPinZ1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (cc5UnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblCC5_OP4OE')
            CREATE TABLE tblCC5_OP4OE (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                strandStatus BIT,
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                outboardWheelStatus BIT,
                highRollerStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                cc5UnitType INT,
                cc5RailG DECIMAL(5,2),
                cc5RailH DECIMAL(5,2),
                cc5RailA1 DECIMAL(5,2),
                cc5RailB1 DECIMAL(5,2),
                cc5RailD1 DECIMAL(5,2),
                cc5RailM1 DECIMAL(5,2),
                cc5RailY1 DECIMAL(5,2),
                cc5RailZ1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (cc5UnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblCOE_CDL')
            CREATE TABLE tblCOE_CDL (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                appEnvType INT,
                controlVoltSingle DECIMAL(5,2),
                PRIMARY KEY (orderID, chainSizeType, appEnvType),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType)
            );

        `);



        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblCOE_CEL')
            CREATE TABLE tblCOE_CEL (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltTriple DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                catDriveStatus BIT,
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                coeUnitType INT,
                coeLineA DECIMAL(5,2),
                coeLineG DECIMAL(5,2),
                coeLineH DECIMAL(5,2),
                coeLineJ DECIMAL(5,2),
                coeLineX DECIMAL(5,2),
                coeLineY DECIMAL(5,2),
                PRIMARY KEY (orderID, chainSizeType, industrialChainManufacturerType, appEnvType),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (coeUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblCOE_OP4OE')
            CREATE TABLE tblCOE_OP4OE (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                wheelManufacturerType INT,    
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),    
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                holeStatus BIT,
                railLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                coeUnitType INT,
                coeLineA DECIMAL(5,2),
                coeLineG DECIMAL(5,2),
                coeLineH DECIMAL(5,2),
                coeLineJ DECIMAL(5,2),
                coeLineX DECIMAL(5,2),
                coeLineY DECIMAL(5,2),
                coeLineZ DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (coeUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblETI_807')
            CREATE TABLE tblETI_807 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerTwo(industrialChainManufacturerTypeTwo),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblETI_91')
            CREATE TABLE tblETI_91 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerTwo(industrialChainManufacturerTypeTwo),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblETI_9000INVL')
            CREATE TABLE tblETI_9000INVL (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                appEnvType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                freeCarrierSystem BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                mightyMonitorStatus BIT,
                ctrStatus BIT,
                plcStatus BIT,
                monitorControllStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT, 
                enclosedUnitType INT, 
                enclosedTrackB DECIMAL(5,2),
                enclosedTrackG DECIMAL(5,2),
                enclosedTrackH DECIMAL(5,2),
                enclosedTrackS DECIMAL(5,2),
                enclosedTrackK2 DECIMAL(5,2),
                enclosedTrackL2 DECIMAL(5,2),
                enclosedTrackM2 DECIMAL(5,2),
                enclosedTrackN2 DECIMAL(5,2),
                enclosedTrackS2 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerTwo(industrialChainManufacturerTypeTwo),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (enclosedUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblETI_OP48E')
            CREATE TABLE tblETI_OP48E (
                orderID VARCHAR(36),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                appEnvType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                freeCarrierSystem BIT,
                catDriveStatus BIT,
                catDriveNum INT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                enclosedUnitType INT, 
                enclosedTrackB DECIMAL(5,2),
                enclosedTrackG DECIMAL(5,2),
                enclosedTrackH DECIMAL(5,2),
                enclosedTrackS DECIMAL(5,2),
                enclosedTrackK2 DECIMAL(5,2),
                enclosedTrackL2 DECIMAL(5,2),
                enclosedTrackM2 DECIMAL(5,2),
                enclosedTrackN2 DECIMAL(5,2),
                enclosedTrackS2 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerTwo(industrialChainManufacturerTypeTwo),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (enclosedUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblETO_2100')
            CREATE TABLE tblETO_2100 (
                orderID VARCHAR(36),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),    
                existingConnection BIT,
                newConnection BIT,
                freeCarrierSystem BIT,
                catDriveStatus BIT,
                catDriveNum INT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                chainCleanStatus BIT,
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                etUnitType INT,
                etOverheadB DECIMAL(5,2),
                etOverheadG DECIMAL(5,2),
                etOverheadH DECIMAL(5,2),
                etOverheadS DECIMAL(5,2),
                etOverheadK2 DECIMAL(5,2),
                etOverheadLS DECIMAL(5,2),
                etOverheadM2 DECIMAL(5,2),
                etOverheadN2 DECIMAL(5,2),
                etOverheadS2 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerTwo(industrialChainManufacturerTypeTwo),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (etUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblETO_9000E')
            CREATE TABLE tblETO_9000E (
                orderID VARCHAR(36),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                appEnvType INT,
                tempSurrounding BIT,
                operatingVoltSingle DECIMAL(5,2),    
                existingConnection BIT,
                newConnection BIT,
                freeCarrierSystem BIT,
                catDriveStatus BIT,
                catDriveNum INT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                etUnitType INT,
                etOverheadB DECIMAL(5,2),
                etOverheadG DECIMAL(5,2),
                etOverheadH DECIMAL(5,2),
                etOverheadS DECIMAL(5,2),
                etOverheadK2 DECIMAL(5,2),
                etOverheadLS DECIMAL(5,2),
                etOverheadM2 DECIMAL(5,2),
                etOverheadN2 DECIMAL(5,2),
                etOverheadS2 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerTwo(industrialChainManufacturerTypeTwo),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (etUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblETO_OP48E')
            CREATE TABLE tblETO_OP48E (
                orderID VARCHAR(36),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                newMonitorStatus BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),    
                existingConnection BIT,
                newConnection BIT,
                freeCarrierSystem BIT,
                catDriveStatus BIT,
                catDriveNum INT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                etUnitType INT,
                etOverheadB DECIMAL(5,2),
                etOverheadG DECIMAL(5,2),
                etOverheadH DECIMAL(5,2),
                etOverheadS DECIMAL(5,2),
                etOverheadK2 DECIMAL(5,2),
                etOverheadLS DECIMAL(5,2),
                etOverheadM2 DECIMAL(5,2),
                etOverheadN2 DECIMAL(5,2),
                etOverheadS2 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerTwo(industrialChainManufacturerTypeTwo),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (etUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFT_OPCO')
            CREATE TABLE tblFT_OPCO (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                wheelManufacturerType INT,    
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                rollerChainStatus BIT,
                brushStatus BIT,
                outboardStatus BIT,
                lubeBrand VARCHAR(50),
                currentLube VARCHAR(50),
                oilOrGrease BIT,
                lubeViscosity VARCHAR(10),
                greaseNGLIGrade INT,
                zerkDirection BIT,
                zerkLocationType  INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                ftUnitType INT, 
                ftTopF DECIMAL(5,2),
                ftTopG DECIMAL(5,2),
                ftTopH DECIMAL(5,2),
                ftTopA1 DECIMAL(5,2),
                ftTopB1 DECIMAL(5,2),
                ftTopH1 DECIMAL(5,2),
                ftTopJ1 DECIMAL(5,2),
                ftTopK1 DECIMAL(5,2),
                ftTopL1 DECIMAL(5,2),
                ftTopM1 DECIMAL(5,2),
                ftTopN1 DECIMAL(5,2),
                ftTopP1 DECIMAL(5,2),
                ftTopR1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (zerkLocationType) REFERENCES tblZerkLocationType(zerkLocationType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (ftUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFT_FTL')
            CREATE TABLE tblFT_FTL (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                outboardStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                mightyMonitorStatus BIT,
                ctrStatus BIT,
                plcStatus BIT,
                monitorControllerStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                ftUnitType INT, 
                ftTopG DECIMAL(5,2),
                ftTopH DECIMAL(5,2),
                ftTopA1 DECIMAL(5,2),
                ftTopB1 DECIMAL(5,2),
                ftTopH1 DECIMAL(5,2),
                ftTopJ1 DECIMAL(5,2),
                ftTopL1 DECIMAL(5,2),
                ftTopM1 DECIMAL(5,2),
                ftTopN1 DECIMAL(5,2),
                ftTopP1 DECIMAL(5,2),
                ftTopR1 DECIMAL(5,2),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (ftUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


            await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFT_OP4OE')
            CREATE TABLE tblFT_OP4OE (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                wheelManufacturerType INT,    
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),    
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                outboardStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                ftUnitType INT, 
                ftTopG DECIMAL(5,2),
                ftTopH DECIMAL(5,2),
                ftTopA1 DECIMAL(5,2),
                ftTopB1 DECIMAL(5,2),
                ftTopH1 DECIMAL(5,2),
                ftTopJ1 DECIMAL(5,2),
                ftTopL1 DECIMAL(5,2),
                ftTopM1 DECIMAL(5,2),
                ftTopN1 DECIMAL(5,2),
                ftTopP1 DECIMAL(5,2),
                ftTopR1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (ftUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFC_314')
            CREATE TABLE tblFC_314 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                wheelManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                carrierWheelStatus BIT,
                freeWheelStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                currentOil VARCHAR(50),
                oilViscosity VARCHAR(10),
                zerkDirection BIT,
                zerkLocationType INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                fcUnitType INT,
                fcGreaserE DECIMAL(5,2),
                fcGreaserG DECIMAL(5,2),
                fcGreaserH DECIMAL(5,2),
                fcGreaserK DECIMAL(5,2),
                fcGreaserT DECIMAL(5,2),
                fcGreaserU DECIMAL(5,2),
                fcGreaserV DECIMAL(5,2),
                fcGreaserW DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (zerkLocationType) REFERENCES tblZerkLocationType(zerkLocationType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (fcUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFC_317')
           CREATE TABLE tblFC_317 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                wheelManufacturerType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                orientationType INT,
                evenGuideWheelStatus BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                carrierWheelStatus BIT,
                kingPinStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                currentOil VARCHAR(50),
                oilViscosity VARCHAR(10),
                zerkDirection BIT,
                zerkLocationType INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                fcUnitType INT,
                fcGreaserE DECIMAL(5,2),
                fcGreaserF DECIMAL(5,2),
                fcGreaserG DECIMAL(5,2),
                fcGreaserH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (zerkLocationType) REFERENCES tblZerkLocationType(zerkLocationType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (fcUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFRO_OEB')
            CREATE TABLE tblFRO_OEB (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                tempSurrounding BIT,
                frUnitType INT,
                frOverheadA DECIMAL(5,2),
                frOverheadB DECIMAL(5,2),
                frOverheadG DECIMAL(5,2),
                frOverheadH DECIMAL(5,2),
                frOverheadL DECIMAL(5,2),
                frInvertedA DECIMAL(5,2),
                frInvertedB DECIMAL(5,2),
                frInvertedG DECIMAL(5,2),
                frInvertedH DECIMAL(5,2),
                frInvertedK DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (frUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
);

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFRO_314')
            CREATE TABLE tblFRO_314 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                wheelManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                swingStatus BIT,    
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                freeWheelStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                zerkDirection BIT,
                zerkLocationType  INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                frUnitType INT,
                frInvertedB DECIMAL(5,2),
                frInvertedE DECIMAL(5,2),
                frInvertedG DECIMAL(5,2),
                frInvertedH DECIMAL(5,2),
                frInvertedK DECIMAL(5,2),
                frInvertedT DECIMAL(5,2),
                frInvertedU DECIMAL(5,2),
                frInvertedV DECIMAL(5,2),
                frInvertedW DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (zerkLocationType) REFERENCES tblZerkLocationType(zerkLocationType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (frUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFRO_317')
            CREATE TABLE tblFRO_317 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                wheelManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                swingStatus BIT,    
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                openStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                zerkDirection BIT,
                zerkLocationType  INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                frUnitType INT,
                frInvertedA DECIMAL(5,2),
                frInvertedB DECIMAL(5,2),
                frInvertedE DECIMAL(5,2),
                frInvertedG DECIMAL(5,2),
                frInvertedH DECIMAL(5,2),
                frInvertedS DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (zerkLocationType) REFERENCES tblZerkLocationType(zerkLocationType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (frUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFRO_9000F')
            CREATE TABLE tblFRO_9000F (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                frUnitType INT,
                frOverheadG DECIMAL(5,2),
                frOverheadH DECIMAL(5,2),
                frOverheadK DECIMAL(5,2),
                frOverheadL DECIMAL(5,2),
                frOverheadK2 DECIMAL(5,2),
                frInvertedA DECIMAL(5,2),
                frInvertedB DECIMAL(5,2),
                frInvertedG DECIMAL(5,2),
                frInvertedH DECIMAL(5,2),
                frInvertedK DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (frUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFRO_ES')
            CREATE TABLE tblFRO_ES (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                newMonitorStatus BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),    
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                frUnitType INT,
                frOverheadG DECIMAL(5,2),
                frOverheadH DECIMAL(5,2),
                frOverheadK DECIMAL(5,2),
                frInvertedA DECIMAL(5,2),
                frInvertedB DECIMAL(5,2),
                frInvertedG DECIMAL(5,2),
                frInvertedH DECIMAL(5,2),
                frInvertedK DECIMAL(5,2),
                frInvertedL DECIMAL(5,2),    
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (frUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblFRO_OP139A')
            CREATE TABLE tblFRO_OP139A (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                frUnitType INT,
                frOverheadG DECIMAL(5,2),
                frOverheadH DECIMAL(5,2),
                frOverheadK DECIMAL(5,2),
                frOverheadK2 DECIMAL(5,2),
                frInvertedA DECIMAL(5,2),
                frInvertedB DECIMAL(5,2),
                frInvertedG DECIMAL(5,2),
                frInvertedH DECIMAL(5,2),
                frInvertedK DECIMAL(5,2),
                frInvertedL DECIMAL(5,2),    
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (frUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIFT_IFTL')
            CREATE TABLE tblIFT_IFTL (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                sliderPlateStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                rollerChainStatus BIT,
                brushingsStatus BIT,
                riderPlatesStatus BIT,
                outboardStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                washdownStatus BIT,
                iftUnitType INT,
                iftPowerA DECIMAL(5,2),
                iftPowerB DECIMAL(5,2),
                iftPowerG DECIMAL(5,2),
                iftPowerH DECIMAL(5,2),
                iftPowerJ DECIMAL(5,2),
                iftPowerS1 DECIMAL(5,2),
                iftPowerT1 DECIMAL(5,2),
                iftPowerU1 DECIMAL(5,2),
                iftPowerW1 DECIMAL(5,2),
                iftPowerX1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (iftUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIFT_OP4OE')
            CREATE TABLE tblIFT_OP4OE (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                wheelManufacturerType INT,    
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),    
                controlVoltSingle DECIMAL(5,2),
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                outboardStatus BIT,
                railLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                iftUnitType INT,
                iftPowerA DECIMAL(5,2),
                iftPowerB DECIMAL(5,2),
                iftPowerG DECIMAL(5,2),
                iftPowerH DECIMAL(5,2),
                iftPowerJ DECIMAL(5,2),
                iftPowerS1 DECIMAL(5,2),
                iftPowerT1 DECIMAL(5,2),
                iftPowerU1 DECIMAL(5,2),
                iftPowerV1 DECIMAL(5,2),
                iftPowerW1 DECIMAL(5,2),
                iftPowerX1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (iftUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIBR_OPCO300')
            CREATE TABLE tblIBR_OPCO300 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                wheelManufacturerType INT,    
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),    
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                rollerChainStatus BIT,
                brushStatus BIT,
                outboardStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                zerkDirection BIT,
                zerkLocationType  INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                ibrUnitType INT,
                ibrChainA1 DECIMAL(5,2),
                ibrChainB1 DECIMAL(5,2),
                ibrChainC1 DECIMAL(5,2),
                ibrChainD1 DECIMAL(5,2),
                ibrChainE1 DECIMAL(5,2),
                ibrChainF1 DECIMAL(5,2),
                ibrChainG1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (ibrUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIBR_RFC')
            CREATE TABLE tblIBR_RFC (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                powerChainStatus BIT,
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                ibrUnitType INT,
                ibrChainA1 DECIMAL(5,2),
                ibrChainB1 DECIMAL(5,2),
                ibrChainC1 DECIMAL(5,2),
                ibrChainD1 DECIMAL(5,2),
                ibrChainF1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (ibrUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIBR_OP4OE')
            CREATE TABLE tblIBR_OP4OE (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                strandStatus BIT,    
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltSingle DECIMAL(5,2),    
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                outboardStatus BIT,
                railLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                ibrUnitType INT,
                ibrChainA1 DECIMAL(5,2),
                ibrChainB1 DECIMAL(5,2),
                ibrChainC1 DECIMAL(5,2),
                ibrChainD1 DECIMAL(5,2),
                ibrChainF1 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (ibrUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_CBS')
            CREATE TABLE tblOHP_CBS (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                ohpUnitType INT,
                ohpDiameter DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OP13')
            CREATE TABLE tblOHP_OP13 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                appEnvType INT,
                loadedStatus BIT,
                plantLayout BIT,
                chainPictures BIT,
                operatingVoltTriple DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                sanitaryUnitType INT,
                sanitaryA DECIMAL(5,2),
                sanitaryC DECIMAL(5,2),
                sanitaryA2 DECIMAL(5,2),
                sanitaryB2 DECIMAL(5,2),
                sanitaryC2 DECIMAL(5,2),
                sanitaryD2 DECIMAL(5,2),
                sanitaryE2 DECIMAL(5,2),
                sanitaryF2 DECIMAL(5,2),
                sanitaryG2 DECIMAL(5,2),
                sanitaryH2 DECIMAL(5,2),
                sanitaryJ2 DECIMAL(5,2),
                sanitaryL2 DECIMAL(5,2),
                sanitaryM2 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (sanitaryUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OP55')
            CREATE TABLE tblOHP_OP55 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                orientationType INT,
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                otherControllInfo VARCHAR(255),
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OP8')
            CREATE TABLE tblOHP_OP8 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                operatingVoltTriple DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                opPowerStatus BIT,
                brushMaterialType INT,
                clearanceStatus BIT,
                washStatus BIT,
                foodIndustryStatus BIT,
                powerPanelType INT,
                threeStationType INT,
                shroudType INT,
                additionalInfo VARCHAR(255),
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (brushMaterialType) REFERENCES tblBrushMaterialType(brushMaterialType),
                FOREIGN KEY (powerPanelType) REFERENCES tblPowerPanelType(powerPanelType),
                FOREIGN KEY (threeStationType) REFERENCES tblThreeStationType(threeStationType),
                FOREIGN KEY (shroudType) REFERENCES tblShroudType(shroudType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OP8NP')
            CREATE TABLE tblOHP_OP8NP (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                loadedStatus BIT,
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_001')
            CREATE TABLE tblOHP_001 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                appEnvType INT,
                tempSurrounding BIT,
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OEB')
            CREATE TABLE tblOHP_OEB (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                tempSurrounding BIT,
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_YCB')
            CREATE TABLE tblOHP_YCB (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                ohpUnitType INT,
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_GPC')
            CREATE TABLE tblOHP_GPC (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                wheelManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                orientationType INT,
                loadedStatus BIT,
                plantLayout BIT,
                operatingVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                mightyMonitorStatus BIT,
                preMountType INT,
                otherControllInfo VARCHAR(255),
                gpcUnitType INT,
                chainDrop DECIMAL(5,2),
                gpcDiameter DECIMAL(5,2),
                gpcWheelC DECIMAL(5,2),
                gpcWheelD DECIMAL(5,2),
                gpcWheelE DECIMAL(5,2),
                gpcWheelF DECIMAL(5,2),
                gpcWheelG DECIMAL(5,2),
                gpcWheelH DECIMAL(5,2),
                gpcWheelS DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (gpcUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
);
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_2100I')
            CREATE TABLE tblOHP_2100I (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                powerChainStatus BIT,
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainCleanStatus BIT,
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                ohpUnitType INT,
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


            await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_9000I')
            CREATE TABLE tblOHP_9000I (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,    
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                powerChainStatus BIT,
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                ohpUnitType INT,
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_CDL')
            CREATE TABLE tblOHP_CDL (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                controlVoltSingle DECIMAL(5,2),
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_ES')
            CREATE TABLE tblOHP_ES (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                newMonitorStatus BIT,
                loadedStatus BIT,
                swingStatus BIT,
                operatingVoltSingle DECIMAL(5,2),    
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OP139A')
            CREATE TABLE tblOHP_OP139A (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,    
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                railLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainCleanStatus BIT,
                chainMasterStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                radioButtonType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (radioButtonType) REFERENCES tblRadioButtonType(radioButtonType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OP4A')
            CREATE TABLE tblOHP_OP4A (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,    
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                railLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                fiveGallonStatus BIT,
                chainCleanStatus BIT,
                chainMasterStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_OP5')
            CREATE TABLE tblOHP_OP5 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_MLP')
            CREATE TABLE tblOHP_MLP (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,    
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                powerChainStatus BIT,
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                ohpUnitType INT,
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_PMM')
            CREATE TABLE tblOHP_PMM (
                orderID VARCHAR(36),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                existingConnection BIT,
                newConnection BIT,
                dcuNum INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_PML')
            CREATE TABLE tblOHP_PML (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,    
                operatingVoltSingle DECIMAL(5,2),    
                paintMakerStatus BIT,    
                paintMarketNum INT,    
                chainCleanStatus BIT,
                ohpUnitType INT,
                chainDrop DECIMAL(5,2),
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOHP_SLS')
            CREATE TABLE tblOHP_SLS (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,    
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                paintMakerStatus BIT,    
                paintMarketNum INT,    
                chainCleanStatus BIT,
                ohpUnitType INT,
                ohpDiameter DECIMAL(5,2),
                ohpWidth DECIMAL(5,2),
                ohpHeight DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (ohpUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_OP8')
            CREATE TABLE tblPAF_OP8 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                travelDirectionType INT,
                appEnvType INT,
                newMonitorStatus BIT,
                loadedStatus BIT,
                orientationType INT,
                operatingVoltTriple DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                opPowerStatus BIT,
                brushMaterialType INT,
                clearanceStatus BIT,
                washStatus BIT,
                foodIndustryStatus BIT,
                powerPanelType INT,
                threeStationType INT,
                shroudType INT,
                additionalInfo VARCHAR(255),
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedA DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (brushMaterialType) REFERENCES tblBrushMaterialType(brushMaterialType),
                FOREIGN KEY (powerPanelType) REFERENCES tblPowerPanelType(powerPanelType),
                FOREIGN KEY (threeStationType) REFERENCES tblThreeStationType(threeStationType),
                FOREIGN KEY (shroudType) REFERENCES tblShroudType(shroudType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_OP8NP')
            CREATE TABLE tblPAF_OP8NP (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                appEnvType INT,
                orientationType INT,
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedA DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


            await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_001')
            CREATE TABLE tblPAF_001 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                appEnvType INT,
                orientationType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType)
            );

        `);


            await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_314')
            CREATE TABLE tblPAF_314 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                wheelManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                swingStatus BIT,    
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                freeWheelStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                zerkDirection BIT,
                zerkLocationType INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                pfUnitType INT,
                pfInvertedB DECIMAL(5,2),
                pfInvertedE DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                pfInvertedK DECIMAL(5,2),
                pfInvertedT DECIMAL(5,2),
                pfInvertedU DECIMAL(5,2),
                pfInvertedV DECIMAL(5,2),
                pfInvertedW DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


            await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_317')
            CREATE TABLE tblPAF_317 (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                wheelManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                swingStatus BIT,    
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,    
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                zerkDirection BIT,
                zerkLocationType INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                pfUnitType INT,
                pfInvertedA DECIMAL(5,2),
                pfInvertedB DECIMAL(5,2),
                pfInvertedE DECIMAL(5,2),
                pfInvertedS DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_GPC')
            CREATE TABLE tblPAF_GPC (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                wheelManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                plantLayout BIT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                currentGrease VARCHAR(50),
                currentGreaseGrade INT,
                chainMasterStatus BIT,
                remoteStatus BIT,
                mountStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                otherControllInfo VARCHAR(255),
                gpcUnitType INT,
                chainDrop DECIMAL(5,2),
                gpcDiameter DECIMAL(5,2),
                gpcWheelC DECIMAL(5,2),
                gpcWheelD DECIMAL(5,2),
                gpcWheelE DECIMAL(5,2),
                gpcWheelF DECIMAL(5,2),
                gpcWheelG DECIMAL(5,2),
                gpcWheelH DECIMAL(5,2),
                gpcWheelS DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (wheelManufacturerType) REFERENCES tblWheelManufacturer(wheelManufacturerType),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (gpcUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_9000I')
            CREATE TABLE tblPAF_9000I (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,    
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                plantLayout BIT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                powerChainStatus BIT, 
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedB DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_9000E')
            CREATE TABLE tblPAF_9000E (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                powerChainStatus BIT, 
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedB DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_9000PF')
            CREATE TABLE tblPAF_9000PF (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                powerChainStatus BIT, 
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedA DECIMAL(5,2),    
                pfInvertedB DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                pfInvertedK2 DECIMAL(5,2),
                pfInvertedL2 DECIMAL(5,2),
                pfInvertedM2 DECIMAL(5,2),
                pfInvertedN2 DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_CDL')
            CREATE TABLE tblPAF_CDL (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                appEnvType INT,
                controlVoltSingle DECIMAL(5,2),
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                wireMeasurementUnitType INT,
                twoConductor INT,
                fourConductor INT, 
                sevenConductor INT, 
                twelveConductor INT,
                junctionBoxNum INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wireMeasurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_ES')
            CREATE TABLE tblPAF_ES (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                newMonitorStatus BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),    
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                openStatus BIT,
                freeWheelStatus BIT,
                guideRollerStatus BIT,
                openRaceStyleType INT,
                closedRaceStyleType INT,
                holeStatus BIT,
                actuatorStatus BIT,
                pivotStatus BIT,
                kingPinStatus BIT,
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainMasterStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedB DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (openRaceStyleType) REFERENCES tblOpenRaceStyleType(openRaceStyleType),
                FOREIGN KEY (closedRaceStyleType) REFERENCES tblClosedRaceStyleType(closedRaceStyleType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
);
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_OP139A')
            CREATE TABLE tblPAF_OP139A (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                controlVoltSingle DECIMAL(5,2),
                compressedAir DECIMAL(5,2),
                airSupplyType INT,
                existingConnection BIT,
                newConnection BIT,
                railLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                chainCleanStatus BIT,
                chainMasterStatus BIT,
                otherUnitStatus BIT,
                timerType INT,
                electricStatus BIT,
                pneumaticStatus BIT,
                mightyMonitorStatus BIT,
                preMountType INT,
                plcStatus BIT,
                otherControllInfo VARCHAR(255),
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedA DECIMAL(5,2),    
                pfInvertedB DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (airSupplyType) REFERENCES tblAirSupplyType(airSupplyType),
                FOREIGN KEY (timerType) REFERENCES tblTimerType(timerType),
                FOREIGN KEY (preMountType) REFERENCES tblPreMountType(preMountType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_MLP')
            CREATE TABLE tblPAF_MLP (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                wheelOpenType INT,
                wheelClosedType INT,
                powerChainStatus BIT,
                chainPinStatus BIT,
                catDriveStatus BIT,
                catDriveNum INT, 
                railLubeStatus BIT,
                externalLubeStatus BIT,
                lubeBrand VARCHAR(50),
                lubeType VARCHAR(50),
                lubeViscosity VARCHAR(10),
                sideLubeStatus BIT,
                topLubeStatus BIT,
                reservoirSizeType INT,
                reservoirSizeQuanity INT,
                chainCleanStatus BIT,
                specialControllerOption VARCHAR(30),
                specialControllerInfo VARCHAR(255),    
                pfUnitType INT,
                pfOverheadL DECIMAL(5,2),
                pfOverheadG DECIMAL(5,2),
                pfOverheadH DECIMAL(5,2),
                pfInvertedB DECIMAL(5,2),
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (wheelOpenType) REFERENCES tblWheelOpenType(wheelOpenType),
                FOREIGN KEY (wheelClosedType) REFERENCES tblWheelClosedType(wheelClosedType),
                FOREIGN KEY (reservoirSizeType) REFERENCES tblReservoirSize(reservoirSizeType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_PMM')
            CREATE TABLE tblPAF_PMM (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                orientationType INT,
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_PML')
            CREATE TABLE tblPAF_PML (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                paintMakerStatus BIT,    
                paintMarketNum INT,    
                chainCleanStatus BIT,
                pfUnitType INT,
                pfInvertedA DECIMAL(5,2),    
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPAF_SLS')
            CREATE TABLE tblPAF_SLS (
                orderID VARCHAR(36),
                conveyorName VARCHAR(255),
                chainSizeType INT,
                industrialChainManufacturerType INT,
                conveyorLength DECIMAL(5,2),
                measurementUnitType INT,
                conveyorSpeed DECIMAL(5,2),
                speedUnitType INT,
                variableSpeed DECIMAL(5,2),
                travelDirectionType INT,
                appEnvType INT,
                tempSurrounding BIT,
                loadedStatus BIT,
                swingStatus BIT,
                orientationType INT,
                operatingVoltSingle DECIMAL(5,2),
                controlVoltSingle DECIMAL(5,2),
                existingConnection BIT,
                newConnection BIT,
                chainCleanStatus BIT,
                pfUnitType INT,
                pfInvertedA DECIMAL(5,2),    
                pfInvertedG DECIMAL(5,2),
                pfInvertedH DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID),
                FOREIGN KEY (chainSizeType) REFERENCES tblChainSize(chainSizeType),
                FOREIGN KEY (industrialChainManufacturerType) REFERENCES tblIndustrialChainManufacturerOne(industrialChainManufacturerTypeOne),
                FOREIGN KEY (measurementUnitType) REFERENCES tblMeasurementUnit(measurementUnitType),
                FOREIGN KEY (speedUnitType) REFERENCES tblSpeedUnit(speedUnitType),
                FOREIGN KEY (travelDirectionType) REFERENCES tblTravelDirection(travelDirectionType),
                FOREIGN KEY (appEnvType) REFERENCES tblAppEnv(appEnvType),
                FOREIGN KEY (orientationType) REFERENCES tblOrientationType(orientationType),
                FOREIGN KEY (pfUnitType) REFERENCES tblMeasurementUnit(measurementUnitType)
            );

        `);


            await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIndustrialChainManufacturerOne')
            CREATE TABLE tblIndustrialChainManufacturerOne (
                industrialChainManufacturerTypeOne INT PRIMARY KEY,
                industrialChainManufacturerNameOne VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblIndustrialChainManufacturerTwo')
            CREATE TABLE tblIndustrialChainManufacturerTwo (
                industrialChainManufacturerTypeTwo INT PRIMARY KEY,
                industrialChainManufacturerNameTwo VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblCC5ChainSizeType')
            CREATE TABLE tblCC5ChainSizeType (
                cc5ChainSizeType INT PRIMARY KEY,
                cc5ChainSizeName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '')
            create table (
                

            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblWheelOpenType')
            CREATE TABLE tblWheelOpenType (
                wheelOpenType INT PRIMARY KEY,
                wheelOpenName VARCHAR(50)
            );
        `);


            await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblWheelClosedType')
            CREATE TABLE tblWheelClosedType (
                wheelClosedType INT PRIMARY KEY,
                wheelClosedName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOpenRaceStyleType')
            CREATE TABLE tblOpenRaceStyleType (
                openRaceStyleType INT PRIMARY KEY,
                openRaceStyleName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblClosedRaceStyleType')
            CREATE TABLE tblClosedRaceStyleType (
                closedRaceStyleType INT PRIMARY KEY,
                closedRaceStyleName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblTimerType')
            CREATE TABLE tblTimerType (
                timerType INT PRIMARY KEY,
                timerName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblAirSupplyType')
            CREATE TABLE tblAirSupplyType (
                airSupplyType INT PRIMARY KEY,
                airSupplyName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPreMountType')
            CREATE TABLE tblPreMountType (
                preMountType INT PRIMARY KEY,
                preMountName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblOrientationType')
            CREATE TABLE tblOrientationType (
                orientationType INT PRIMARY KEY,
                orientationName VARCHAR(50)
        );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblZerkLocationType')
            CREATE TABLE tblZerkLocationType (
                zerkLocationType INT PRIMARY KEY,
                zerkLocationName VARCHAR(50)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblBrushMaterialType')
            CREATE TABLE tblBrushMaterialType (
                brushMaterialType INT PRIMARY KEY,
                brushMaterialName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblPowerPanelType')
            CREATE TABLE tblPowerPanelType (
                powerPanelType INT PRIMARY KEY,
                powerPanelName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblThreeStationType')
            CREATE TABLE tblThreeStationType (
                threeStationType INT PRIMARY KEY,
                threeStationName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblShroudType')
            CREATE TABLE tblShroudType (
                shroudType INT PRIMARY KEY,
                shroudName VARCHAR(50)
            );
        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblRadioButtonType')
            CREATE TABLE tblRadioButtonType (
                radioButtonType INT PRIMARY KEY,
                radioButtonName VARCHAR(50)
            );

        `);


        await request.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tblAppEnvOvenInfo')
            CREATE TABLE tblAppEnvOvenInfo (
                orderID VARCHAR(36),
                coolingDownStatus BIT,
                overTemp DECIMAL(5,2),
                FOREIGN KEY (orderID) REFERENCES tblOrder(orderID)
            );
        `);


	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { createTables };
