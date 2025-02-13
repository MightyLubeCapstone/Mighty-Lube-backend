const express = require("express");
const { sql, pool, poolConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const { addProteinGeneralFoodGradeLubrication } = require("./functions.js");
const { ProteinGeneral, OrderStatus } = require("./tableclasses.js");
const FGLM = require("../models/fglm.js");
const User = require("../models/user.js");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    // used for FGLM form
    try {
        const { conveyorName, chainSizeType, chainmanufacturertype: chainManufacturerType, wheelmanufacturertype: wheelManufacturerType, chainpintype: chainPinType, conveyorspeed: conveyorSpeed, speedunittype: 
            speedUnitType, variablespeed: variableSpeed, metaltype: metalType, conveyorstyletype: conveyorStyleType, trolleytype: trolleyType,  swingstatus: swingStatus, plantlayout: plantLayout, chainpictures: chainPictures, conveyorlength:
            conveyorLength, measurementtype: measurementUnitType, traveldirectiontype: travelDirectionType, appenvtype: appEnvType, tempsurrounding: tempSurrounding, loadedstatus: loadedStatus, 
            trolleycolortype: trolleyColorType, orderstatus: orderStatus} = req.headers;
        // const proteinGeneral = new ProteinGeneral(
        //     orderID, conveyorName, chainSizeType, chainManufacturerType, wheelManufacturerType, chainPinType, conveyorSpeed, 
        //     speedUnitType, variableSpeed, metalType, conveyorStyleType, trolleyType, swingStatus, plantLayout, chainPictures, 
        //     conveyorLength, measurementUnitType, travelDirectionType, appEnvType, tempSurrounding, loadedStatus, 
        //     trolleyColorType);
        // const classOrderStatus = new OrderStatus(orderStatus)
        const order = new FGLM({
            conveyorName: conveyorName,
            chainManufacturerType: chainManufacturerType
        });
        const user = await User.findOne({});//...
        user.orders.push(order);


        if (!response) {
            res.status(400).json({ error: "FGLM entry could not be added" });
        } else {
            res.status(200).json({ message: "FGLM entry added" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
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
            .input("travelDirectionType", sql.Int, proteinGeneral.travelDirectionType)
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
            .query("UPDATE tblProteinGeneral SET conveyorName = @conveyorName, chainSizeType = @chainSizeType, \
                chainManufacturerType = @chainManufacturerType, wheelManufacturerType = @wheelManufacturerType, chainPinType = @chainPinType, \
                conveyorLength = @conveyorLength, measurementUnitType = @measurementUnitType, conveyorSpeed = @conveyorSpeed, \
                speedUnitType = @speedUnitType, variableSpeed = @variableSpeed, travelDirectionType = @travelDirectionType, metalType = @metalType, \
                conveyorStyleType = @conveyorStyleType, trolleyColorType = @trolleyColorType, trolleyType = @trolleyType, appEnvType = @appEnvType, \
                tempSurrounding = @tempSurrounding, loadedStatus = @loadedStatus, swingStatus = @swingStatus, plantLayout = @plantLayout, \
                chainPictures = @chainPictures WHERE orderID = @orderID");
        return response.rowsAffected[0] > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

router.put("/", authenticate, async (req, res) => {
    try {
        const { orderid: orderID, conveyorname: conveyorName, chainsizetype: chainSizeType, chainmanufacturertype: chainManufacturerType, wheelmanufacturertype: wheelManufacturerType, chainpintype: chainPinType, conveyorspeed: conveyorSpeed, speedunittype: 
            speedUnitType, variablespeed: variableSpeed, metaltype: metalType, conveyorstyletype: conveyorStyleType, trolleytype: trolleyType,  swingstatus: swingStatus, plantlayout: plantLayout, chainpictures: chainPictures, conveyorlength:
            conveyorLength, measurementtype: measurementUnitType, traveldirectiontype: travelDirectionType, appenvtype: appEnvType, tempsurrounding: tempSurrounding, loadedstatus: loadedStatus, 
            trolleycolortype: trolleyColorType} = req.headers;
        const proteinGeneral = new ProteinGeneral(
            orderID, conveyorName, chainSizeType, chainManufacturerType, wheelManufacturerType, chainPinType, conveyorSpeed, 
            speedUnitType, variableSpeed, metalType, conveyorStyleType, trolleyType, swingStatus, plantLayout, chainPictures, 
            conveyorLength, measurementUnitType, travelDirectionType, appEnvType, tempSurrounding, loadedStatus, 
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
            .query("DELETE FROM tblProteinGeneral WHERE orderID = @orderID;\
                DELETE FROM tblOrder WHERE orderID = @orderID; ");
        return response.rowsAffected[0] > 0 ? true : false;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

router.delete("/", authenticate, async (req, res) => {
    try {
        const { orderid: orderID } = req.headers;
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