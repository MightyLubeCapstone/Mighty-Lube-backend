const mongoose = require('mongoose');
const { configDotenv } = require('dotenv');
configDotenv();

async function dbConnect() {
	//  connect using the URI
	if (mongoose.connection.readyState === 0) {
		if (process.env.PRODUCTION == 1) {
			await mongoose.connect(process.env.MONGODB_URI);
			console.log("Connected to MongoDB");
		}
		else {
			await mongoose.connect(process.env.MONGODB_LOCAL_URI);
			console.log("Connected to MongoDB locally");
		}
	}
}

module.exports = { dbConnect };