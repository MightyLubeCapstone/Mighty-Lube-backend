const express = require("express");
const { authenticate } = require("./sessions");
const User = require("../models/user");
const { updateOrderID } = require("../utils/orderutils");

const router = express.Router();

// update an existing cart item's orderID only
// api/rfq/add-to-cart
router.put('/add-to-cart', authenticate, async (req, res) => {
    try {
        const { oldOrderID } = req.body;
        if (!oldOrderID) return res.status(400).json({ error: 'oldOrderID is required' });

        const newOrderID = await updateOrderID(req.user._id, oldOrderID);
        if (!newOrderID) return res.status(404).json({ error: 'No matching cart item found' });

        return res.status(200).json({ success: true, orderID: newOrderID });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});

module.exports = router;