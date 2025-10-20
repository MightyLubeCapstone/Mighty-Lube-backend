/*

*/

const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const User = require("../models/user");

const router = express.Router();

// update-only helper: only updates keys that already exist on target order
function updateExistingKeys(targetOrder, incomingPatch) {
    for (const key of Object.keys(incomingPatch)) {
        if (key === 'orderID') continue; // never touch orderID
        if (!(key in targetOrder)) {
            // skip any keys that do not already exist on the stored order
            continue;
        }
        const srcValue = incomingPatch[key];
        const targetValue = targetOrder[key];

        // Recurse for nested plain objects only when both sides are objects
        if (
            srcValue &&
            typeof srcValue === 'object' &&
            !Array.isArray(srcValue) &&
            targetValue &&
            typeof targetValue === 'object' &&
            !Array.isArray(targetValue)
        ) {
            updateExistingKeys(targetValue, srcValue);
        } else {
            // For primitives and arrays: replace only if the key exists on target
            targetOrder[key] = srcValue;
        }
    }
}


// PUT /api/orders/editing - Update an order inside a user's configurations carts
router.put('/editing', authenticate, async (req, res) => {
    try {
        await dbConnect();

        const { userID: providedUserID, order: incomingOrder } = req.body;
        if (!incomingOrder || !incomingOrder.orderID) {
            return res.status(400).json({ message: 'order with orderID is required' });
        }

        // Determine which user document to update: provided userID (admin case) or the authenticated user / owner lookup
        let targetUserDoc;
        if (providedUserID) {
            targetUserDoc = await User.findOne({ userID: providedUserID }).exec();
            if (!targetUserDoc) {
                return res.status(404).json({ message: 'User not found' });
            }
        } else {
            // Try to find the owner of the order across all users' configurations
            targetUserDoc = await User.findOne({ 'configurations.cart.orderID': incomingOrder.orderID }).exec();
            if (!targetUserDoc) {
                // fallback to authenticated requester if owner not found
                if (req.user) {
                    targetUserDoc = await User.findById(req.user._id).exec();
                    if (!targetUserDoc) return res.status(404).json({ message: 'Authenticated user not found' });
                } else {
                    return res.status(400).json({ message: 'userID or valid session is required' });
                }
            }
        }

        // Search for the order inside configurations[*].cart
        let orderFound = false;
        for (let configIndex = 0; configIndex < (targetUserDoc.configurations || []).length; configIndex++) {
            const configuration = targetUserDoc.configurations[configIndex];
            if (!configuration.cart || !configuration.cart.length) continue;
            const orderIndex = configuration.cart.findIndex(o => o.orderID === incomingOrder.orderID);
            if (orderIndex !== -1) {
                const existingOrder = configuration.cart[orderIndex];
                updateExistingKeys(existingOrder, incomingOrder);
                existingOrder.updatedAt = new Date();
                orderFound = true;
                break;
            }
        }

        if (!orderFound) {
            return res.status(404).json({ message: 'Order not found in user configurations' });
        }

        // Mark modified and save
        targetUserDoc.markModified('configurations');
        await targetUserDoc.save();

        return res.status(200).json({
            message: 'Order updated successfully',
            userID: targetUserDoc.userID,
            orderID: incomingOrder.orderID,
            updatedAt: new Date()
        });

    } catch (error) {
        console.error('Error updating order in configurations:', error);
        res.status(500).json({ message: 'Failed to update order' });
    }
});

module.exports = router