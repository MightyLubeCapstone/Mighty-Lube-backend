const express = require("express");
const bcrypt = require("bcrypt"); // used for creating hash of password
const { dbConnect } = require("../config/config");
const uuid = require("uuid"); // used for creating session ID
const User = require("../models/user");

const sessionsRoute = express.Router();

async function hashPassword(password) {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
}

// Compare password
async function comparePassword(password, hash) {
	return await bcrypt.compare(password, hash);
}

async function authenticate(req, res, next) {
	const { authorization } = req.headers;
	if (authorization && authorization.startsWith("Bearer ")) {
		req.sessionID = authorization.slice(7); // Add token to the request object
		const user = await User.findOne({ "sessions.sessionID": req.sessionID });
		// FIXME: add some logic to check against expiration date eventually, shouldn't be too hard
		if (!user) {
			return res.status(401).json({ error: "Invalid session!" });
		}
		req.user = user; // this ONE line should save on a TON of network traffic because we store the document
		// back inside the req body and use it in whichever function we need
		next();
	} else {
		res.status(401).json({ error: "Unauthorized: Missing token" });
	}
}

sessionsRoute.get("/", authenticate, async (req, res) => {
	try {
		res.status(200).json({ message: "Valid Session" });
	}
	catch (e) {
		res.status(500).json({ error: "Internal server error : ", e });
	}
});

sessionsRoute.post("/", async (req, res) => {
	try {
		// Add new session to tblSessions
		const { username, password } = req.body;
		const user = await User.findOne({ "username": username }).exec();
		if (!user) {
			return res.status(401).json({ error: "Unauthorized: No account found with that username!" });
		}
		if (!(await comparePassword(password, user["password"]))) {
			return res.status(401).json({ error: "Unauthorized: Invalid credentials!" });
		}
		// create new session and add to user's sessions array
		const sessionID = uuid.v4(); // everything else is handled by the model :)
		user.sessions.push({ sessionID });
		await user.save(); // finally saves our changes into the cluster
		// Return session ID
		return res.status(201).json({
			status: "success",
			sessionID: sessionID,
		});
	}
	catch (error) {
		res.status(500).json({ error: `Internal server error: ${error}` });
	}
});



sessionsRoute.delete("/", authenticate, async (req, res) => {
	try {
		const user = req.user; // Assuming req.user is already populated from authentication middleware
		// Extract sessionID from request (you might get this from req.body, req.params, or req.query)
		const sessionID = req.sessionID;
		if (!sessionID) {
			return res.status(400).json({ error: "Session ID is required" });
		}
		// Remove the session with the matching sessionID
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ $pull: { sessions: { sessionID } } }, // Remove the session object that matches sessionID
			{ new: true } // Return updated document
		);
		if (!updatedUser) {
			return res.status(400).json({ error: "Session could not be deleted" });
		}
		res.status(200).json({ message: "Session deleted" });
	}
	catch (e) {
		res.status(500).json({ error: "Internal server error : ", e });
	}
});

module.exports = { authenticate, hashPassword, sessionsRoute };
