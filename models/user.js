const mongoose = require('mongoose');
const uuid = require("uuid");

const configurationActorSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], required: true },
}, { _id: false });

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        default: uuid.v4,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    resetCode: {
        type: String,
        default: null,
    },
    securityPin: {
        type: String,
        default: null,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    sessions: [{
        sessionID: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        expiresAt: {
            type: Date,
            default: () => Date.now() + 1000 * 60 * 60 * 12, // 12-hour expiration per session
        },
    }],
    // it's data-ing timeeee...
    cart: [{
        orderID: {
            type: String,
            required: true,
            default: uuid.v4,
        },
        orderCreated: {
            type: Date,
            default: Date.now,
        },
        completeDate: {
            type: Date,
            default: null,
        },
        numRequested: {
            type: Number,
            required: true,
        },
        productConfigurationInfo: {
            //... so much info will be here
        },
        productType: {
            type: String,
            required: true,
        }
    }],
    drafts: [{
        cartID: {
            type: String,
            default: uuid.v4, // figure out how to change to auto-increment
        },
        cart: [], // array of however many order objects...
        dateSaved: {
            type: Date,
            default: Date.now,
        },
        draftTitle: {
            type: String,
            required: true,
        },
        // potentially price??
    }],
    configurations: [{
        orderStatus: { // this will not be used until the dashboard is able to modify it
            type: String,
            default: "Requested" // maybe, depends on whatever they want it to say
        },
        dateOrdered: {
            type: Date,
            default: Date.now,
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
            type: Date,
        },
        createdBy: {
            type: configurationActorSchema,
            default: null,
        },
        updatedBy: {
            type: configurationActorSchema,
            default: null,
        },
        completeDate: {
            type: Date,
            default: null,
        },
        configurationName: {
            type: String,
            required: true,
        },
        cart: [],
    }],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
