const mongoose = require('mongoose');

mongoose.set("autoCreate", false);

async function dbConnect() {
    if (mongoose.connection.readyState === 0) {
        const dbMode = (
            process.env.DB_MODE ||
            (process.env.NODE_ENV === "production" ? "production" : "local")
        ).toLowerCase();
        const mongoUri = dbMode === "production"
            ? process.env.MONGODB_URI_PRODUCTION
            : process.env.MONGODB_URI_LOCAL;

        if (!mongoUri) {
            throw new Error(`MongoDB URI is not configured for DB_MODE=${dbMode}.`);
        }

        await mongoose.connect(mongoUri, {
            autoCreate: false,
        });

        console.log(`Connected to MongoDB (${dbMode})`);
    }
}

module.exports = { dbConnect };
