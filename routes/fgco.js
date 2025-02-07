const express = require("express");
const { sql, pool, poolConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const { addProteinCustomPowerOP8SS } = require("./functions.js");
const { ProteinCustomPower, OrderStatus } = require("./tableclasses.js");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const { orderid: orderID, operatingvolttriple: operatingVoltTriple, controlvoltsingle: controlVoltSingle, orderstatus: orderStatus} = req.headers;
        const operatingVoltSingle = null; // not used in FGCO form
        const proteinCustomPower = new ProteinCustomPower(
            orderID, operatingVoltSingle, operatingVoltTriple, controlVoltSingle);
        const classOrderStatus = new OrderStatus(orderStatus)
        const response = await addProteinCustomPowerOP8SS(proteinCustomPower, classOrderStatus);
        if (!response) {
            res.status(400).json({ error: "FGCO entry could not be added" });
        } else {
            res.status(200).json({ message: "FGCO entry added" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


async function getFgco(orderID) {
    try {
        await poolConnect;
        const request = pool.request();
        const response = await request
            .input("orderID", sql.VarChar, orderID)
            .query("SELECT * FROM tblProteinCustomPower WHERE orderID = @orderID");
        console.log(response);
        return response.recordset[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

router.get("/", authenticate, async (req, res) => {
    try {
        // Get all FGCO entries
        const { orderID } = req.headers;
        const fgcoEntries = await getFgco(orderID);
        console.log(fgcoEntries);
        return res.status(200).json({
            status: "success",
            fgcoEntries: fgcoEntries,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;