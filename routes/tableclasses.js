class appEnv {
    constructor(applicationType, applicationTypeName) {
        this.applicationType = applicationType;
        this.applicationTypeName = applicationTypeName;
    } 
}

class applicationType {
    constructor(applicationType, applicationTypeName) {
        this.applicationType = applicationType;
        this.applicationTypeName = applicationTypeName;
    } 
}

class conveyorStyle{
    constructor(conveyorStyleType, conveyorStyleName) {
        this.conveyorStyleType = conveyorStyleType;
        this.conveyorStyleName = conveyorStyleName;
    }
}

class chainSize {
    constructor(chainSizeType, chainSizeName) {
        this.chainSizeType = chainSizeType;
        this.chainSizeName = chainSizeName;
    }
}

class chainPinType {
    constructor(chainPinType, chainPinName) {
        this.chainPinType = chainPinType;
        this.chainPinName = chainPinName;
    }
}

class industrial {
    constructor(productID, industrialType) {
        this.productID = productID;
        this.industrialType = industrialType;
    }
}

class industrialApplication {
    constructor(productID, applicationType) {
        this.productID = productID;
        this.applicationType = applicationType;
    }
}

class industrialInfo {
    constructor(industrialInfoID, industrialPopularity, industrialPrice, industrialDateAdded) { 
        this.industrialInfoID = industrialInfoID;
        this.industrialPopularity = industrialPopularity;
        this.industrialPrice = industrialPrice;
        this.industrialDateAdded = industrialDateAdded;
    }
}

class industrialProduct {
    constructor(productID, industrialName, industrialInfoID) {
        this.productID = productID;
        this.industrialName = industrialName;
        this.industrialInfoID = industrialInfoID;
    }
}

class industrialType {
    constructor(industrialType, industrialTypeName) {
        this.industrialType = industrialType;
        this.industrialTypeName = industrialTypeName;
    }
}

class measurementUnit {
    constructor(measurementUnitType, measurementUnitName) {
        this.measurementUnitType = measurementUnitType;
        this.measurementUnitName = measurementUnitName;
    }
}

class order {
    constructor(orderID, productID, userID){
        this.orderID = orderID;
        this.productID = productID;
        this.userID = userID;
    }
}

class otherWheelManufacturer {
    constructor(orderID, otherWheelManufacturerName){
        this.orderID = orderID;
        this.otherWheelManufacturerName = otherWheelManufacturerName;
    }
}

class otherChainManufacturer {
    constructor(orderID, otherChainManufacturerName){
        this.orderID = orderID;
        this.otherChainManufacturerName = otherChainManufacturerName;
    }
}

class otherTrolleyColor {
    constructor(orderID, otherTrolleyColorName){
        this.orderID = orderID;
        this.otherTrolleyColorName = otherTrolleyColorName;
    }
}

class addOtherConveyorStyle {
    constructor(orderID, otherConveyorStyleName){
        this.orderID = orderID;
        this.otherConveyorStyleName = otherConveyorStyleName;
    }
}

class otherChainSize {
    constructor(orderID, otherChainSizeName){
        this.orderID = orderID;
        this.otherChainSizeName = otherChainSizeName;
    }
}

class otherAppEnv {
    constructor(orderID, otherAppEnvName){
        this.orderID = orderID;
        this.otherAppEnvName = otherAppEnvName;
    }
}

class product {
    constructor(productID, productType){
        this.productID = productID;
        this.productType = productType;
    }
}

class productType {
    constructor(productType, productTypeName){
        this.productType = productType;
        this.productTypeName = productTypeName;
    }
}

class proteinAdditional {
    constructor(orderID, oppsSpecification, washDown, foodIndustry, powerPanel, pushButtonSwitch, enclosedShroud, additionalOtherInfo){
        this.orderID = orderID;
        this.oppsSpecification = oppsSpecification;
        this.washDown = washDown;
        this.foodIndustry = foodIndustry;
        this.powerPanel = powerPanel;
        this.pushButtonSwitch = pushButtonSwitch;
        this.enclosedShroud = enclosedShroud;
        this.additionalOtherInfo = additionalOtherInfo;
    }
}

class proteinChainManufacturer {
    constructor(chainManufacturerType, chainManufacturerName){
        this.chainManufacturerType = chainManufacturerType;
        this.chainManufacturerName = chainManufacturerName;
    }
}

class proteinCustomPower {
    constructor(orderID, operatingVoltSingle, operatingVoltTriple, controlVoltSingle){
        this.orderID = orderID;
        this.operatingVoltSingle = operatingVoltSingle;
        this.operatingVoltTriple = operatingVoltTriple;
        this.controlVoltSingle = controlVoltSingle;
    }
}

class proteinConveyorSpec {
    constructor(orderID, sideLubrication, topLubrication, timeLubrication, timeDelay, reservoirSize, reservoirSizeQuantity, chainCleanStatus){
        this.orderID = orderID;
        this.sideLubrication = sideLubrication;
        this.topLubrication = topLubrication;
        this.timeLubrication = timeLubrication;
        this.timeDelay = timeDelay;
        this.reservoirSize = reservoirSize;
        this.reservoirSizeQuantity = reservoirSizeQuantity;
        this.chainCleanStatus = chainCleanStatus;
    }
}

class proteinGeneral {
    constructor(orderID, conveyorName, chainSizeType, chainManufacturerType, wheelManufacturerType, chainPinType, conveyorSpeed, speedUnitType, variableSpeed, metalType, conveyorStyleType, trolleyType, swingStatus, plantLayout, chainPictures, conveyorLength, measurementUnitType, appEnvType, tempSurrounding, loadedStatus, numProductRequested, trolleyColorType){
        this.orderID = orderID;
        this.conveyorName = conveyorName;
        this.chainSizeType = chainSizeType;
        this.chainManufacturerType = chainManufacturerType;
        this.wheelManufacturerType = wheelManufacturerType;
        this.chainPinType = chainPinType;
        this.conveyorSpeed = conveyorSpeed;
        this.speedUnitType = speedUnitType;
        this.variableSpeed = variableSpeed;
        this.metalType = metalType;
        this.conveyorStyleType = conveyorStyleType;
        this.trolleyType = trolleyType;
        this.swingStatus = swingStatus;
        this.plantLayout = plantLayout;
        this.chainPictures = chainPictures;
        this.conveyorLength = conveyorLength;
        this.measurementUnitType = measurementUnitType;
        this.appEnvType = appEnvType;
        this.tempSurrounding = tempSurrounding;
        this.loadedStatus = loadedStatus;
        this.numProductRequested = numProductRequested;
        this.trolleyColorType = trolleyColorType;
    }
}

class proteinInfo {
    constructor(proteinInfoID, proteinPopularity, proteinPrice, proteinDateAdded){
        this.proteinInfoID = proteinInfoID;
        this.proteinPopularity = proteinPopularity;
        this.proteinPrice = proteinPrice;
        this.proteinDateAdded = proteinDateAdded;
    }
}

class proteinMonitoring {
    constructor(orderID, existingConnection, newConnection, motorAmp, driveTakeUp, takeUpDistance, motorTemp, motorValidation, pitchValidation){
        this.orderID = orderID;
        this.existingConnection = existingConnection;
        this.newConnection = newConnection;
        this.motorAmp = motorAmp;
        this.driveTakeUp = driveTakeUp;
        this.takeUpDistance = takeUpDistance;
        this.motorTemp = motorTemp;
        this.motorValidation = motorValidation;
        this.pitchValidation = pitchValidation;
    }
}

class proteinMeasurement {
    constructor(orderID, powerTrolleyWheel, powerRailWidth, powerRailHeight, chainDrop, measurementUnitType){
        this.orderID = orderID;
        this.powerTrolleyWheel = powerTrolleyWheel;
        this.powerRailWidth = powerRailWidth;
        this.powerRailHeight = powerRailHeight;
        this.chainDrop = chainDrop;
        this.measurementUnitType = measurementUnitType;
    }
}

class proteinProduct {
    constructor(productID, proteinName, proteinInfoID){
        this.productID = productID;
        this.proteinName = proteinName;
        this.proteinInfoID = proteinInfoID;
    }
}

class proteinWire {
    constructor(orderID, twoConductor, fourConductor, sevenConductor, twelveConductor, junctionBoxNum, wireMeasurementUnitType){
        this.orderID = orderID;
        this.twoConductor = twoConductor;
        this.fourConductor = fourConductor;
        this.sevenConductor = sevenConductor;
        this.twelveConductor = twelveConductor;
        this.junctionBoxNum = junctionBoxNum;
        this.wireMeasurementUnitType = wireMeasurementUnitType;
    }
}

class reservoirSize {
    constructor(reservoirSizeType, reservoirSizeName){
        this.reservoirSizeType = reservoirSizeType;
        this.reservoirSizeName = reservoirSizeName;
    }
}

class sessions {
    constructor(sessionID, userID, sessionCreateTime, sessionExpireTime){
        this.sessionID = sessionID;
        this.userID = userID;
        this.sessionCreateTime = sessionCreateTime;
        this.sessionExpireTime = sessionExpireTime;
    }
}

class trolleyType {
    constructor(trolleyType, trolleyTypeName){
        this.trolleyType = trolleyType;
        this.trolleyTypeName = trolleyTypeName;
    }
}

class trolleyColor {
    constructor(trolleyColorType, trolleyColorName){
        this.trolleyColorType = trolleyColorType;
        this.trolleyColorName = trolleyColorName;
    }
}

class speedUnit {
    constructor(speedUnitType, speedUnitName){
        this.speedUnitType = speedUnitType;
        this.speedUnitName = speedUnitName;
    }
}

class travelDirection {
    constructor(travelDirectionType, travelDirectionDescription){
        this.travelDirectionType = travelDirectionType;
        this.travelDirectionDescription = travelDirectionDescription;
    }
}

class wheelManufacturer {
    constructor(wheelManufacturerType, wheelManufacturerName){
        this.wheelManufacturerType = wheelManufacturerType;
        this.wheelManufacturerName = wheelManufacturerName;
    }
}

class metalType {
    constructor(metalType, metalTypeName){
        this.metalType = metalType;
        this.metalTypeName = metalTypeName;
    }
}

class users {
    constructor(userID, username, password, firstName, lastName, emailAddress, phoneNumber, country, companyName){
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.companyName = companyName;
    }
}