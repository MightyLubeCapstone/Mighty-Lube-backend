const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    try {
        const { productData } = req.body;

        const newProduct = new Product({
            productID: productData.productID,
            productName: productData.productName,
            productApplication: productData.productApplication,
            ...(productData.productCategory && { productCategory: productData.productCategory }),
            ...(productData.productType && { productType: productData.productType }),
            productPopularity: productData.productPopularity,
            productPrice: productData.productPrice,
            productDateAdded: productData.productDateAdded
        });

        await newProduct.save();
        return res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/", authenticate, async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;