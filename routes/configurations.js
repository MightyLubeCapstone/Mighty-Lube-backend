const express = require("express");
const { authenticate } = require("./sessions");
const { updateOrderID } = require("../utils/orderutils"); // added
const { sendOrderNotification } = require("../utils/emailnotif"); // added

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const configurations = req.user.configurations;
        if (!configurations || !configurations[0]) {
            return res.status(400).json({ error: "No orders found for this user!" });
        }
        return res.status(200).json({ configurations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

router.put("/", authenticate, async (req, res) => {
    try {
        const { configurationName } = req.body;
        const user = req.user;
        const cart = user.cart || [];

        // Update orderID for each cart item using the util function
        const updatedCart = await Promise.all(cart.map(async (item) => {
            try {
                if (!item || !item.orderID) return item;
                const newOrderID = await updateOrderID(user._id, item.orderID);
                if (newOrderID) {
                    item.orderID = newOrderID;
                }
                return item;
            } catch (err) {
                console.error("Failed to update orderID for item", item, err);
                return item; // fallback to original item on error
            }
        }));

        user.configurations.push({ configurationName, cart: updatedCart });
        user.cart = []; // clear out the user's current cart
        // Ensure Mongoose knows that the arrays have changed
        user.markModified("configurations");
        user.markModified("cart");
        await user.save();

        // Send email notification for the complete configuration order
        try {
            await sendOrderNotification(user, updatedCart, 'new', configurationName);
        } catch (emailError) {
            console.error("Failed to send order creation email:", emailError);
        }
        
        return res.status(200).json({ message: `Successfully updated orders` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
})

module.exports = router;
