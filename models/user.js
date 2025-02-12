const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
            default: Date.now(),
        },
        expiresAt: {
            type: Date,
            default: Date.now() + 1000 * 60 * 60 * 12, // 12 hour session window
        },
    }],
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;