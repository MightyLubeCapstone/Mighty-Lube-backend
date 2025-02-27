/**
 * This endpoint will be how the cart actually grabs all the orders that
 * a User has added to it. GET api/orders will return a list of all the orders
 * in the User document with minimal info (but containing the orderID)
 * GET api/orders/order will return EVERYTHING about an order if given an id.
 * DELETE api/orders/order will delete an order object if given an id.
 * */

const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const User = require("../models/user");
const mongoose = require("mongoose");

const router = express.Router();

router.put("/", authenticate, async (req, res) => {
    try {
        // data will be an entire Map object of String, dynamic pairs (dynamic being either a string or integer)
        // with the string key being the name of whichever attribute we are trying to update for whichever productType.
        const { orderID, data } = req.body;
        const user = req.user;
        const orderInfo = user.orders.find(order => order.orderID === orderID).productConfigurationInfo;
        Object.entries(data).forEach(([key, value]) => {
            orderInfo[key] = value;
        });
        // Ensure Mongoose knows that the `orders` array has changed
        user.markModified("orders");
        await user.save();
        return res.status(200).json({ message: `Successfully updated the order ${orderID}` });
    } catch (error) {
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
})

router.get("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const { ordercategory } = req.headers; // Extract orderCategory from headers
        const orders = req.user.orders;
        if (!orders[0]) {
            return res.status(400).json({ error: "No orders found for this user!" });
        }
        // dumb order info down for cards
        const filteredOrders = orders
            .filter(order => !ordercategory || order.orderCategory === ordercategory)
            .map(order => ({
                orderID: order.orderID,
                orderStatus: order.orderStatus,
                quantity: order.numRequested,
                name: order.productType,
                dateCreated: order.orderCreated,
            }));
        return res.status(200).json({ orders: filteredOrders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

router.get("/order", authenticate, async (req, res) => {
    try {
        const { orderid: orderID } = req.headers;
        const order = await req.user.orders.find(order => order.orderID === orderID); // grab whichever model is stored in productType
        const model = order.productType;
        const ProductModel = mongoose.model(model);
        const mappedInfo = ProductModel.prototype.getDecodedInfo.call(order);
        if (!mappedInfo) {
            return res.status(400).json({ error: "No order found with that id!" });
        }
        return res.status(200).json({ orderInfo: mappedInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

router.delete("/order", authenticate, async (req, res) => {
    try {
        const { orderID } = req.body;
        // Remove the order with the matching orderID
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { orders: { orderID } } }, // Remove the order object that matches orderID
            { new: true } // Return updated document
        );
        return res.status(200).json({ message: "Successfully deleted order!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

module.exports = router;