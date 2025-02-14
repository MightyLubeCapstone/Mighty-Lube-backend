const mongoose = require('mongoose');
const uuid = require("uuid");

const ProductSchema = new mongoose.Schema({

    productID: {

        type: String,
        required: true,
        default: uuid.v4(),

    },

    //EX: Food Grade Lubrication Monitor System
    productName: {

        type: String,
        required: true,

    },

    //EX: Protein
    productApplication: {

        type: String,
        required: true,

    },


    //EX: CC5 Chain
    productCategory: {

        type: String,
        required: false,

    },

    //EX: Conveyor Lubrication System
    productType: {

        type: String,
        required: false,

    },

    productPopularity: {

        type: Number,
        required: true,

    },

    productPrice: {

        type: Number,
        required: true,

    },

    productDateAdded: {

        type: Date,
        required: true,

    },

});



const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
module.exports = Product;