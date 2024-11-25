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

async function getFglm(orderID) {
	try {
		await poolConnect;
		const request = pool.request();
		const response = await request
			.input("orderID", sql.VarChar, orderID)
			.query("SELECT * FROM tblProteinGeneral WHERE orderID = @orderID");
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

router.get("/", authenticate, async (req, res) => {
    try {
        // Get all FGLM entries
        const { orderID } = req.headers;
        const fglmEntries = await getFglm(orderID);
        return res.status(200).json({
            status: "success",
            fglmEntries: fglmEntries,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function putFglm(proteinGeneral) {
    try {
        await poolConnect;
        const request = pool.request();
        const response = await request
            .input("orderID", sql.VarChar, proteinGeneral.orderID)
            .input("conveyorName", sql.VarChar, proteinGeneral.conveyorName)
            .input("chainSizeType", sql.Int, proteinGeneral.chainSizeType)
            .input("chainManufacturerType", sql.Int, proteinGeneral.chainManufacturerType)
            .input("wheelManufacturerType", sql.Int, proteinGeneral.wheelManufacturerType)
            .input("chainPinType", sql.Int, proteinGeneral.chainPinType)
            .input("conveyorLength", sql.Decimal, proteinGeneral.conveyorLength)
            .input("measurementUnitType", sql.Int, proteinGeneral.measurementUnitType)
            .input("conveyorSpeed", sql.Decimal, proteinGeneral.conveyorSpeed)
            .input("speedUnitType", sql.Int, proteinGeneral.speedUnitType)
            .input("variableSpeed", sql.Decimal, proteinGeneral.variableSpeed)
            .input("travelDirection", sql.Int, proteinGeneral.travelDirection)
            .input("metalType", sql.Int, proteinGeneral.metalType)
            .input("conveyorStyleType", sql.Int, proteinGeneral.conveyorStyleType)
            .input("trolleyColorType", sql.Int, proteinGeneral.trolleyColorType)
            .input("trolleyType", sql.Int, proteinGeneral.trolleyType)
            .input("appEnvType", sql.Int, proteinGeneral.appEnvType)
            .input("tempSurrounding", sql.Bit, proteinGeneral.tempSurrounding)
            .input("loadedStatus", sql.Bit, proteinGeneral.loadedStatus)
            .input("swingStatus", sql.Bit, proteinGeneral.swingStatus)
            .input("plantLayout", sql.Bit, proteinGeneral.plantLayout)
            .input("chainPictures", sql.Bit, proteinGeneral.chainPictures)
            .input("numProductRequested", sql.Int, proteinGeneral.numProductRequested)
            .query("UPDATE tblProteinGeneral SET conveyorName = @conveyorName, chainSizeType = @chainSizeType, \
                chainManufacturerType = @chainManufacturerType, wheelManufacturerType = @wheelManufacturerType, chainPinType = @chainPinType, \
                conveyorLength = @conveyorLength, measurementUnitType = @measurementUnitType, conveyorSpeed = @conveyorSpeed, \
                speedUnitType = @speedUnitType, variableSpeed = @variableSpeed, travelDirection = @travelDirection, metalType = @metalType, \
                conveyorStyleType = @conveyorStyleType, trolleyColorType = @trolleyColorType, trolleyType = @trolleyType, appEnvType = @appEnvType, \
                tempSurrounding = @tempSurrounding, loadedStatus = @loadedStatus, swingStatus = @swingStatus, plantLayout = @plantLayout, \
                chainPictures = @chainPictures, numProductRequested = @numProductRequested WHERE orderID = @orderID");
        return response.rowsAffected[0] > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

router.put("/", authenticate, async (req, res) => {
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
        response = await putFglm(proteinGeneral);
        if (!response) {
            res.status(400).json({ error: "FGLM entry could not be updated" });
        } else {
            res.status(200).json({ message: "FGLM entry updated" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function deleteFglm(orderID) {
    try {
        await poolConnect;
        const request = pool.request();
        const response = await request
            .input("orderID", sql.VarChar, orderID)
            .query("DELETE FROM tblProteinGeneral WHERE orderID = @orderID");
        return response.rowsAffected[0] > 0 ? true : false;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

router.delete("/", authenticate, async (req, res) => {
    try {
        const { orderID } = req.headers;
        const response = await deleteFglm(orderID);
        if (!response) {
            res.status(400).json({ error: "FGLM entry could not be deleted" });
        } else {
            res.status(200).json({ message: "FGLM entry deleted" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;