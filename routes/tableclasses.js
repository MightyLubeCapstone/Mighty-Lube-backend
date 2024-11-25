class AppEnv {
    constructor(applicationType, applicationTypeName) {
        this.applicationType = applicationType;
        this.applicationTypeName = applicationTypeName;
    } 
}

class ApplicationType {
    constructor(applicationType, applicationTypeName) {
        this.applicationType = applicationType;
        this.applicationTypeName = applicationTypeName;
    } 
}

class ConveyorStyle{
    constructor(conveyorStyleType, conveyorStyleName) {
        this.conveyorStyleType = conveyorStyleType;
        this.conveyorStyleName = conveyorStyleName;
    }
}

class ChainSize {
    constructor(chainSizeType, chainSizeName) {
        this.chainSizeType = chainSizeType;
        this.chainSizeName = chainSizeName;
    }
}

class ChainPinType {
    constructor(chainPinType, chainPinName) {
        this.chainPinType = chainPinType;
        this.chainPinName = chainPinName;
    }
}

class Industrial {
    constructor(productID, industrialType) {
        this.productID = productID;
        this.industrialType = industrialType;
    }
}

class IndustrialApplication {
    constructor(productID, applicationType) {
        this.productID = productID;
        this.applicationType = applicationType;
    }
}

class IndustrialInfo {
    constructor(industrialInfoID, industrialPopularity, industrialPrice, industrialDateAdded) { 
        this.industrialInfoID = industrialInfoID;
        this.industrialPopularity = industrialPopularity;
        this.industrialPrice = industrialPrice;
        this.industrialDateAdded = industrialDateAdded;
    }
}

class IndustrialProduct {
    constructor(productID, industrialName, industrialInfoID) {
        this.productID = productID;
        this.industrialName = industrialName;
        this.industrialInfoID = industrialInfoID;
    }
}

class IndustrialType {
    constructor(industrialType, industrialTypeName) {
        this.industrialType = industrialType;
        this.industrialTypeName = industrialTypeName;
    }
}

class MeasurementUnit {
    constructor(measurementUnitType, measurementUnitName) {
        this.measurementUnitType = measurementUnitType;
        this.measurementUnitName = measurementUnitName;
    }
}

class Order {
    constructor(orderID, productID, userID){
        this.orderID = orderID;
        this.productID = productID;
        this.userID = userID;
    }
}

class OtherWheelManufacturer {
    constructor(orderID, otherWheelManufacturerName){
        this.orderID = orderID;
        this.otherWheelManufacturerName = otherWheelManufacturerName;
    }
}

class OtherChainManufacturer {
    constructor(orderID, otherChainManufacturerName){
        this.orderID = orderID;
        this.otherChainManufacturerName = otherChainManufacturerName;
    }
}

class OtherTrolleyColor {
    constructor(orderID, otherTrolleyColorName){
        this.orderID = orderID;
        this.otherTrolleyColorName = otherTrolleyColorName;
    }
}

class AddOtherConveyorStyle {
    constructor(orderID, otherConveyorStyleName){
        this.orderID = orderID;
        this.otherConveyorStyleName = otherConveyorStyleName;
    }
}

class OtherChainSize {
    constructor(orderID, otherChainSizeName){
        this.orderID = orderID;
        this.otherChainSizeName = otherChainSizeName;
    }
}

class OtherAppEnv {
    constructor(orderID, otherAppEnvName){
        this.orderID = orderID;
        this.otherAppEnvName = otherAppEnvName;
    }
}

class Product {
    constructor(productID, productType){
        this.productID = productID;
        this.productType = productType;
    }
}

class ProductType {
    constructor(productType, productTypeName){
        this.productType = productType;
        this.productTypeName = productTypeName;
    }
}

class ProteinAdditional {
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

class ProteinChainManufacturer {
    constructor(chainManufacturerType, chainManufacturerName){
        this.chainManufacturerType = chainManufacturerType;
        this.chainManufacturerName = chainManufacturerName;
    }
}

class ProteinCustomPower {
    constructor(orderID, operatingVoltSingle, operatingVoltTriple, controlVoltSingle){
        this.orderID = orderID;
        this.operatingVoltSingle = operatingVoltSingle;
        this.operatingVoltTriple = operatingVoltTriple;
        this.controlVoltSingle = controlVoltSingle;
    }
}

class ProteinConveyorSpec {
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

class ProteinGeneral {
    constructor(orderID, conveyorName, chainSizeType, chainManufacturerType, wheelManufacturerType, chainPinType, conveyorSpeed, speedUnitType, variableSpeed, metalType, conveyorStyleType, trolleyType, swingStatus, plantLayout, chainPictures, conveyorLength, measurementUnitType, travelDirection, appEnvType, tempSurrounding, loadedStatus, numProductRequested, trolleyColorType){
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
        this.travelDirection = travelDirection;
        this.appEnvType = appEnvType;
        this.tempSurrounding = tempSurrounding;
        this.loadedStatus = loadedStatus;
        this.numProductRequested = numProductRequested;
        this.trolleyColorType = trolleyColorType;
    }
}

class ProteinInfo {
    constructor(proteinInfoID, proteinPopularity, proteinPrice, proteinDateAdded){
        this.proteinInfoID = proteinInfoID;
        this.proteinPopularity = proteinPopularity;
        this.proteinPrice = proteinPrice;
        this.proteinDateAdded = proteinDateAdded;
    }
}

class ProteinMonitoring {
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

class ProteinMeasurement {
    constructor(orderID, powerTrolleyWheel, powerRailWidth, powerRailHeight, chainDrop, measurementUnitType){
        this.orderID = orderID;
        this.powerTrolleyWheel = powerTrolleyWheel;
        this.powerRailWidth = powerRailWidth;
        this.powerRailHeight = powerRailHeight;
        this.chainDrop = chainDrop;
        this.measurementUnitType = measurementUnitType;
    }
}

class ProteinProduct {
    constructor(productID, proteinName, proteinInfoID){
        this.productID = productID;
        this.proteinName = proteinName;
        this.proteinInfoID = proteinInfoID;
    }
}

class ProteinWire {
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

class ReservoirSize {
    constructor(reservoirSizeType, reservoirSizeName){
        this.reservoirSizeType = reservoirSizeType;
        this.reservoirSizeName = reservoirSizeName;
    }
}

class Sessions {
    constructor(sessionID, userID, sessionCreateTime, sessionExpireTime){
        this.sessionID = sessionID;
        this.userID = userID;
        this.sessionCreateTime = sessionCreateTime;
        this.sessionExpireTime = sessionExpireTime;
    }
}

class TrolleyType {
    constructor(trolleyType, trolleyTypeName){
        this.trolleyType = trolleyType;
        this.trolleyTypeName = trolleyTypeName;
    }
}

class TrolleyColor {
    constructor(trolleyColorType, trolleyColorName){
        this.trolleyColorType = trolleyColorType;
        this.trolleyColorName = trolleyColorName;
    }
}

class SpeedUnit {
    constructor(speedUnitType, speedUnitName){
        this.speedUnitType = speedUnitType;
        this.speedUnitName = speedUnitName;
    }
}

class TravelDirection {
    constructor(travelDirectionType, travelDirectionDescription){
        this.travelDirectionType = travelDirectionType;
        this.travelDirectionDescription = travelDirectionDescription;
    }
}

class WheelManufacturer {
    constructor(wheelManufacturerType, wheelManufacturerName){
        this.wheelManufacturerType = wheelManufacturerType;
        this.wheelManufacturerName = wheelManufacturerName;
    }
}

class MetalType {
    constructor(metalType, metalTypeName){
        this.metalType = metalType;
        this.metalTypeName = metalTypeName;
    }
}

class Users {
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