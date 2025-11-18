/**
 * Routes for marking orders and configurations as completed
 * This will set the completedDate timestamp and can trigger completion notifications
 */

const express = require("express");
const { authenticate } = require("./sessions");
const { sendOrderNotification } = require("../utils/emailnotif");
const User = require("../models/user");

const router = express.Router();

// Mark a cart order as completed
router.put("/cart-order", authenticate, async (req, res) => {
    try {
        const { orderID } = req.body;
        const user = req.user;
        
        // Find the order in the user's cart
        const order = user.cart.find(order => order.orderID === orderID);
        if (!order) {
            return res.status(404).json({ error: "Order not found in cart" });
        }
        
        // Set completion timestamp
        order.completedDate = new Date();
        
        // Mark as modified and save
        user.markModified("cart");
        await user.save();
        
        // Send completion notification email
        try {
            await sendOrderNotification(user, order, 'completed');
        } catch (emailError) {
            console.warn('Failed to send completion notification:', emailError);
        }
        
        res.status(200).json({ 
            message: `Order ${orderID} marked as completed`,
            completedDate: order.completedDate,
            processingTime: calculateProcessingTime(order.orderCreated, order.completedDate)
        });
        
    } catch (error) {
        console.error('Error completing cart order:', error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

// Mark a configuration as completed
router.put("/configuration", authenticate, async (req, res) => {
    try {
        const { configurationName } = req.body;
        const user = req.user;
        
        // Find the configuration
        const config = user.configurations.find(config => config.configurationName === configurationName);
        if (!config) {
            return res.status(404).json({ error: "Configuration not found" });
        }
        
        // Set completion timestamp
        config.completedDate = new Date();
        
        // Also mark all orders in the configuration as completed
        config.cart.forEach(order => {
            if (!order.completedDate) {
                order.completedDate = new Date();
            }
        });
        
        // Mark as modified and save
        user.markModified("configurations");
        await user.save();
        
        // Send completion notification email
        try {
            await sendOrderNotification(user, config.cart, 'completed', configurationName);
        } catch (emailError) {
            console.warn('Failed to send completion notification:', emailError);
        }
        
        res.status(200).json({ 
            message: `Configuration "${configurationName}" marked as completed`,
            completedDate: config.completedDate,
            processingTime: calculateProcessingTime(config.dateOrdered, config.completedDate)
        });
        
    } catch (error) {
        console.error('Error completing configuration:', error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

// Get completion status of an order
router.get("/status/:orderID", authenticate, async (req, res) => {
    try {
        const { orderID } = req.params;
        const user = req.user;
        
        // Look for order in cart
        let order = user.cart.find(order => order.orderID === orderID);
        let location = 'cart';
        
        // If not in cart, look in configurations
        if (!order) {
            for (const config of user.configurations) {
                order = config.cart.find(o => o.orderID === orderID);
                if (order) {
                    location = 'configuration';
                    break;
                }
            }
        }
        
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        
        const processingTime = order.completedDate ? 
            calculateProcessingTime(order.orderCreated, order.completedDate) : null;
        
        res.status(200).json({
            orderID: order.orderID,
            location,
            created: order.orderCreated,
            completed: order.completedDate,
            isCompleted: !!order.completedDate,
            processingTime
        });
        
    } catch (error) {
        console.error('Error getting completion status:', error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

// Utility function to calculate processing time (duplicated from emailnotif.js for API responses)
function calculateProcessingTime(startDate, endDate) {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end - start;
    
    if (diffMs < 0) return null;
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
        totalMs: diffMs,
        days,
        hours,
        minutes,
        formatted: days > 0 ? 
            `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''}` :
            hours > 0 ? 
                `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''}` :
                `${minutes} minute${minutes > 1 ? 's' : ''}`
    };
}

module.exports = router;