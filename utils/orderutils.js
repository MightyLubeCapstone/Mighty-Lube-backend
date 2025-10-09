const mongoose = require('mongoose');

// Counter schema for order IDs
const CounterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', CounterSchema);

// Function to get total order count
async function getTotalOrderCount() {
    const User = require('../models/user'); // Import here to avoid circular dependency
    const result = await User.aggregate([
        { $unwind: "$cart" },
        { $count: "totalOrders" }
    ]);
    
    return result.length > 0 ? result[0].totalOrders : 0;
}

// Function to generate sequential 6-character hex order ID
async function generateOrderID() {
    // Ensure counter is seeded to at least the current DB count before incrementing.
    // We avoid combining $max and $inc in the same update (MongoDB will throw a conflict).
    const currentCount = await getTotalOrderCount();

    // Create or update the counter to be at least currentCount
    const existing = await Counter.findById('orderID').lean();
    if (!existing) {
        // Try to create; if another process creates concurrently, ignore duplicate key
        try {
            await Counter.create({ _id: 'orderID', sequence_value: currentCount });
        } catch (err) {
            // ignore duplicate key errors caused by race
            if (err.code !== 11000) throw err;
        }
    } else if (existing.sequence_value < currentCount) {
        // Ensure sequence_value is at least currentCount
        await Counter.findByIdAndUpdate('orderID', { $set: { sequence_value: currentCount } });
    }

    // Now atomically increment
    const counter = await Counter.findByIdAndUpdate(
        'orderID',
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    
    // Convert to 6-character hex (FFFFFF = 16,777,215 possible IDs)
    return counter.sequence_value.toString(16).padStart(6, '0').toUpperCase();
}

// Function to generate a new orderID and update a specific cart item's orderID
async function updateOrderID(userId, oldOrderID) {
    const User = require('../models/user'); // require here to avoid circular deps

    // Generate a new unique order ID
    const newOrderID = await generateOrderID();

    // Update only the orderID field of the matching cart item
    const updated = await User.findOneAndUpdate(
        { _id: userId, 'cart.orderID': oldOrderID },
        { $set: { 'cart.$.orderID': newOrderID } },
        { new: true }
    );

    if (!updated) {
        // no matching document/item found
        return null;
    }

    return newOrderID;
}

module.exports = {
    generateOrderID,
    updateOrderID,
    getTotalOrderCount
};