const mongoose = require('mongoose');

const mongoose = require("mongoose");

async function dbConnect() {
    if (mongoose.connection.readyState === 0) {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not set.");
        }

        await mongoose.connect(mongoUri);

        console.log("Connected to MongoDB");
    }
}

module.exports = { dbConnect };
