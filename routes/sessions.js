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
	if (!authorization || !authorization.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Unauthorized: Missing token" });
	}
	req.sessionID = authorization.slice(7); // Extract token
	try {
		const user = await User.findOne({ "sessions.sessionID": req.sessionID });
		if (!user) {
			return res.status(401).json({ error: "Invalid session!" });
		}
		// Check session expiration
		const session = user.sessions.find(s => s.sessionID === req.sessionID);
		if (session && session.expiresAt && new Date(session.expiresAt) < new Date()) {
			// Remove the session with the matching sessionID
			const sessionID = session.sessionID;
			await User.findByIdAndUpdate(
				user._id,
				{ $pull: { sessions: { sessionID } } }, // Remove the session object that matches sessionID
				{ new: true } // Return updated document
			);
			return res.status(401).json({ error: "Session expired!" });
		}
		req.user = user; // Store user in request for further use
		next();
	} catch (error) {
		console.error("Authentication error:", error);
		res.status(500).json({ error: "Internal Server Error" });
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
