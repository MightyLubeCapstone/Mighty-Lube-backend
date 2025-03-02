const express = require("express");
const { authenticate } = require("./sessions");
const User = require("../models/user");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const drafts = req.user.drafts;
        if (!drafts || !drafts[0]) {
            return res.status(400).json({ error: "No orders found for this user!" });
        }
        return res.status(200).json({ drafts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

// saving a cart as a draft
router.put("/", authenticate, async (req, res) => {
    try {
        const { draftTitle } = req.body;
        const user = req.user;
        const cart = user.cart;
        user.drafts.push({ cart, draftTitle });
        user.cart = []; // clear out the user's current cart
        // Ensure Mongoose knows that the arrays have changed
        user.markModified("drafts");
        user.markModified("cart");
        await user.save();
        return res.status(200).json({ message: `Successfully updated orders` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
})


router.delete("/", authenticate, async (req, res) => {
    try {
        const { cartID } = req.body;
        // Remove the order with the matching cartID
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { drafts: { cartID } } }, // Remove the order object that matches orderID
            { new: true } // Return updated document
        );
        return res.status(200).json({ message: "Successfully deleted order!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

module.exports = router;