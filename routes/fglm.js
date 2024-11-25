const { authenticate } = require("./sessions");
const { addProteinGeneralFoodGradeLubrication } = require("functions.js");
const { ProteinGeneral } = require("tableclasses.js");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    // used for FGLM form
    try {
        const { orderID, conveyorName, chainSizeType, chainManufacturerType, wheelManufacturerType, chainPinType, conveyorSpeed, 
            speedUnitType, variableSpeed, metalType, conveyorStyleType, trolleyType, swingStatus, plantLayout, chainPictures, 
            conveyorLength, measurementUnitType, travelDirection, appEnvType, tempSurrounding, loadedStatus, numProductRequested, 
            trolleyColorType} = req.headers;
        const proteinGeneral = new ProteinGeneral(
            orderID, conveyorName, chainSizeType, chainManufacturerType, wheelManufacturerType, chainPinType, conveyorSpeed, 
            speedUnitType, variableSpeed, metalType, conveyorStyleType, trolleyType, swingStatus, plantLayout, chainPictures, 
            conveyorLength, measurementUnitType, travelDirection, appEnvType, tempSurrounding, loadedStatus, numProductRequested, 
            trolleyColorType);
        await addProteinGeneralFoodGradeLubrication(proteinGeneral);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
//   General Information
// Conveyor Chain Size
// Protein: Chain Manufacturer
// Wheel Manufacturer
// Chain Pin Type 
// What Type of Metal 
// Style of Conveyor 
// Application Environment – Take off
//   Customer Power Utilities
// Operating Voltage - Single Phase: (Volts/hz
// Control Voltage (Volts/hz) – Take off
//   New Monitoring System or Adding to Existing Monitoring System
// Connecting to Existing Monitoring
// Add New Monitoring System
//   Monitoring Features Requested
// Drive Motor Amp
// Drive Take-up – Air
// Take-Up Distance
// Dog Pitch Validation – take off
// Add question - Bent or Missing Trolley detect – Answer yes or no
// Lubrication from the Side of Chain
// Lubrication from the Top
// Time Lubrication – Take off
// Time Delay Lubrication – Take off
//   Wire
// 4 Conductor - There answer will be a positive only integer
// 7 Conductor – There answer will be a positive only integer
// 2 Conductor - There answer will be a positive only integer
// Measurement Unit put this as the first question
// 12 conductor – take off
// Junction Box Quantity – take off
// Take off measurement unit this is a double question under the same wire category
//   Food Grade Lubrication and Monitoring: Measurements take this whole section out.
});