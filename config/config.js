const mongoose = require('mongoose');
const { configDotenv } = require('dotenv');
configDotenv();

async function dbConnect() {
	//  connect using the URI
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");
	}
}

module.exports = { dbConnect };