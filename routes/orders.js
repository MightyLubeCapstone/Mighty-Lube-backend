/*

*/

const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const User = require("../models/user");


const router = express.Router();

// PUT /api/orders/editing - Update an order inside a user's configurations carts
router.put('/editing', authenticate, async (req, res) => {
    try {
        await dbConnect();

        const { userID, order } = req.body;
        if (!order || !order.orderID) {
            return res.status(400).json({ message: 'order with orderID is required' });
        }

        // Determine which user to update: request body userID (admin case) or the authenticated user
        let targetUser;
        if (userID) {
            targetUser = await User.findOne({ userID }).exec();
            if (!targetUser) return res.status(404).json({ message: 'User not found' });
        } else {
            // Try to find the owner of the order across all users' configurations
            targetUser = await User.findOne({ 'configurations.cart.orderID': order.orderID }).exec();
            if (!targetUser) {
                // Fallback: use the authenticated user if present (this is the requester)
                if (req.user) {
                    targetUser = await User.findById(req.user._id).exec();
                } else {
                    return res.status(400).json({ message: 'userID or valid session is required, or order owner could not be found' });
                }
            }
        }

        // Search for the order inside configurations[*].cart
        let found = false;
        for (let cfgIdx = 0; cfgIdx < (targetUser.configurations || []).length; cfgIdx++) {
            const cfg = targetUser.configurations[cfgIdx];
            if (!cfg.cart || !cfg.cart.length) continue;
            const ordIdx = cfg.cart.findIndex(o => o.orderID === order.orderID);
            if (ordIdx !== -1) {
                // Update only provided fields (do not overwrite orderID)
                const existing = cfg.cart[ordIdx];
                Object.keys(order).forEach(key => {
                    if (key === 'orderID') return;
                    existing[key] = order[key];
                });
                // Optionally set an updated timestamp on the order object
                existing.updatedAt = new Date();
                found = true;
                break;
            }
        }

        if (!found) {
            return res.status(404).json({ message: 'Order not found in user configurations' });
        }

        // Mark modified and save
        targetUser.markModified('configurations');
        await targetUser.save();

        return res.status(200).json({
            message: 'Order updated successfully',
            userID: targetUser.userID,
            orderID: order.orderID,
            updatedAt: new Date()
        });

    } catch (error) {
        console.error('Error updating order in configurations:', error);
        res.status(500).json({ message: 'Failed to update order' });
    }
});

module.exports = router