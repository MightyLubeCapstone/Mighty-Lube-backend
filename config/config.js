const mongoose = require('mongoose');

mongoose.set("autoCreate", false);

async function dbConnect() {
    if (mongoose.connection.readyState === 0) {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not set.");
        }

        await mongoose.connect(mongoUri, {
            autoCreate: false,
        });

        console.log("Connected to MongoDB");
    }
}

module.exports = { dbConnect };
