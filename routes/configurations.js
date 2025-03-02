const express = require("express");
const { authenticate } = require("./sessions");

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
        const cart = user.cart;
        user.configurations.push({ configurationName, cart });
        user.cart = []; // clear out the user's current cart
        // Ensure Mongoose knows that the arrays have changed
        user.markModified("configurations");
        user.markModified("cart");
        await user.save();
        return res.status(200).json({ message: `Successfully updated orders` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
})

module.exports = router;
