/*

*/

const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const User = require("../models/user");


const router = express.Router();


// PUT /api/order/editing - Update user preferences for all carts
router.put('/editing', authenticate, async (req, res) => {
    try {
        await dbConnect();

        const { order } = req.body;
        const user = req.user;
        
        if (!order) {
            return res.status(400).json({ 
                message: 'order info is required' 
            });
        } 
        else if (!user.userID) {
            return res.status(400).json({ 
                message: 'user info is required' 
            });
        }

        // Find and update the order
        const updatedOrder = await Order.findOneAndUpdate(
            { orderID: order.orderID },
            { 
                ...order,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ 
            message: 'User preferences updated successfully',
            userID: userID,
            orderID: order.orderID,
            updatedAt: updatedOrder.updatedAt
        });

    } catch (error) {
        console.error('Error updating user preferences:', error);
        res.status(500).json({ message: 'Failed to update user preferences' });
    }
});

module.exports = router