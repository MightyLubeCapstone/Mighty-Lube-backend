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
            await sendOrderNotification(user, updatedCart, configurationName);
        } catch (emailError) {
            console.error("Failed to send order creation email:", emailError);
        }
        
        return res.status(200).json({ message: `Successfully updated orders` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
})
/**
 * DELETE /api/orders/:configId
 * HARD delete: remove an entire configuration (row) from the authenticated user.
 * Returns 204 No Content on success.
 */
router.delete("/:configId", authenticate, async (req, res) => {
    try {
      const { configId } = req.params;
      const user = req.user; // Mongoose doc for the authenticated user
  
      const configs = Array.isArray(user.configurations) ? user.configurations : [];
      const idx = configs.findIndex((c) => String(c._id) === String(configId));
      if (idx === -1) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Remove the configuration and save
      user.configurations.splice(idx, 1);
      user.markModified("configurations");
      await user.save();
  
      return res.status(204).end(); // hard delete: no body
    } catch (err) {
      console.error("Error deleting configuration:", err);
      return res.status(500).json({ message: "Failed to delete order" });
    }
  });

module.exports = router;
