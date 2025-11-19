/*

*/

const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const User = require("../models/user");
const { sendOrderNotification } = require("../utils/emailnotif");

// Utility function to calculate processing time
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

const router = express.Router();

// deep-merge helper: merges src into target, adds new keys, merges nested objects, replaces arrays/primitives.
// Does not allow replacing orderID.
function deepMergeAllowNew(target, src) {
    for (const key of Object.keys(src)) {
        if (key === 'orderID') continue; // never overwrite orderID
        const srcVal = src[key];
        const tgtVal = target[key];

        // If both are plain objects, merge recursively
        if (
            srcVal &&
            typeof srcVal === 'object' &&
            !Array.isArray(srcVal) &&
            tgtVal &&
            typeof tgtVal === 'object' &&
            !Array.isArray(tgtVal)
        ) {
            deepMergeAllowNew(tgtVal, srcVal);
        } else {
            // Replace primitives and arrays, or add new keys
            target[key] = srcVal;
        }
    }
}

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
                // Deep-merge incoming order into existing order: updates values and adds new fields
                const existing = cfg.cart[ordIdx];
                deepMergeAllowNew(existing, order);

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

        // Send email notification for configuration edit
        try {
            await sendOrderNotification(targetUser, order, 'edited');
        } catch (emailError) {
            console.warn('Failed to send configuration edit notification:', emailError);
        }

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

// PUT /api/orders/status - Update the status of an order in a user's configuration
router.put('/status', authenticate, async (req, res) => {
    try {
        await dbConnect();

        const { userID: providedUserID, configurationName, orderStatus } = req.body;

        if (!providedUserID || !configurationName || !orderStatus) {
            return res.status(400).json({ message: 'userID, configurationName and orderStatus are required' });
        }

        // Load the target user by userID
        const targetUserDoc = await User.findOne({ userID: providedUserID }).exec();
        if (!targetUserDoc) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the configuration by name
        const configIndex = (targetUserDoc.configurations || []).findIndex(cfg => cfg.configurationName === configurationName);
        if (configIndex === -1) {
            return res.status(404).json({ message: 'Configuration not found' });
        }

        // Update only the configuration-level orderStatus
        targetUserDoc.configurations[configIndex].orderStatus = orderStatus;
        targetUserDoc.configurations[configIndex].updatedAt = new Date();
        
        // If status is being set to "Completed", set completion timestamp
        if (orderStatus.toLowerCase() === 'complete') {
            targetUserDoc.configurations[configIndex].completeDate = new Date();
            
            // Also mark all orders in the configuration as complete
            targetUserDoc.configurations[configIndex].cart.forEach(order => {
                if (!order.completeDate) {
                    order.completeDate = new Date();
                }
            });
        }

        targetUserDoc.markModified('configurations');
        await targetUserDoc.save();
        
        // Send email notification if order was complete
        if (orderStatus.toLowerCase() === 'complete') {
            try {
                const { sendOrderNotification } = require('../utils/emailnotif');
                await sendOrderNotification(
                    targetUserDoc, 
                    targetUserDoc.configurations[configIndex].cart, 
                    'complete', 
                    configurationName
                );
            } catch (emailError) {
                console.warn('Failed to send completion notification:', emailError);
            }
        }
        
        const responseData = {
            message: 'Configuration orderStatus updated',
            userID: targetUserDoc.userID,
            configurationName: targetUserDoc.configurations[configIndex].configurationName,
            orderStatus: targetUserDoc.configurations[configIndex].orderStatus,
            updatedAt: targetUserDoc.configurations[configIndex].updatedAt
        };
        
        // Add completion data if applicable
        if (orderStatus.toLowerCase() === 'complete') {
            responseData.completeDate = targetUserDoc.configurations[configIndex].completeDate;
            responseData.processingTime = calculateProcessingTime(
                targetUserDoc.configurations[configIndex].dateOrdered,
                targetUserDoc.configurations[configIndex].completeDate
            );
        }

        return res.status(200).json(responseData);
    } catch (error) {
        console.error('Error updating configuration orderStatus:', error);
        return res.status(500).json({ message: 'Failed to update configuration orderStatus' });
    }
});

// PUT /api/orders/complete-cart-order - Mark individual cart order as complete
router.put('/complete-cart-order', authenticate, async (req, res) => {
    try {
        await dbConnect();
        
        const { orderID } = req.body;
        const user = req.user;
        
        if (!orderID) {
            return res.status(400).json({ message: 'orderID is required' });
        }
        
        // Find the order in the user's cart
        const order = user.cart.find(order => order.orderID === orderID);
        if (!order) {
            return res.status(404).json({ message: 'Order not found in cart' });
        }
        
        // Set completion timestamp
        order.completeDate = new Date();
        
        // Mark as modified and save
        user.markModified("cart");
        await user.save();
        
        // Send completion notification email
        try {
            await sendOrderNotification(user, order, 'complete');
        } catch (emailError) {
            console.warn('Failed to send completion notification:', emailError);
        }
        
        const processingTime = calculateProcessingTime(order.orderCreated, order.completeDate);
        
        res.status(200).json({ 
            message: `Order ${orderID} marked as complete`,
            orderID: order.orderID,
            completeDate: order.completeDate,
            processingTime
        });
        
    } catch (error) {
        console.error('Error completing cart order:', error);
        res.status(500).json({ message: 'Failed to complete cart order' });
    }
});

// GET /api/orders/completion-status/:orderID - Get completion status of an order
router.get('/completion-status/:orderID', authenticate, async (req, res) => {
    try {
        await dbConnect();
        
        const { orderID } = req.params;
        const user = req.user;
        
        // Look for order in cart
        let order = user.cart.find(order => order.orderID === orderID);
        let location = 'cart';
        let configurationName = null;
        
        // If not in cart, look in configurations
        if (!order) {
            for (const config of user.configurations) {
                order = config.cart.find(o => o.orderID === orderID);
                if (order) {
                    location = 'configuration';
                    configurationName = config.configurationName;
                    break;
                }
            }
        }
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        const processingTime = order.completeDate ? 
            calculateProcessingTime(order.orderCreated, order.completeDate) : null;
        
        const responseData = {
            orderID: order.orderID,
            location,
            created: order.orderCreated,
            complete: order.completeDate,
            isCompleted: !!order.completeDate,
            processingTime
        };
        
        if (configurationName) {
            responseData.configurationName = configurationName;
        }
        
        res.status(200).json(responseData);
        
    } catch (error) {
        console.error('Error getting completion status:', error);
        res.status(500).json({ message: 'Failed to get completion status' });
    }
});

module.exports = router;