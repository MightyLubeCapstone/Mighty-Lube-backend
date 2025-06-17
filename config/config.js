const mongoose = require('mongoose');

async function dbConnect() {
	//  connect using the URI
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect("mongodb://127.0.0.1:27017/mightylube"); // hardcoded this for local VM access
		console.log("Connected to MongoDB");
	}
}

module.exports = { dbConnect };