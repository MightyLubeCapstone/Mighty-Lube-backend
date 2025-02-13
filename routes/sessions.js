const express = require("express");
const bcrypt = require("bcrypt"); // used for creating hash of password
const { sql, pool, poolConnect } = require("../config/config");
const uuid = require("uuid"); // used for creating session ID
const User = require("../models/user");

const sessionsRoute = express.Router();

//######################

// these ALL need to be touched up so that we can successfully pass the User document from authenticate (req.user)

//######################

sessionsRoute.get("/", authenticate, async (req, res) => {
	try {
		res.status(200).json({ message: "Valid Session" });
	}
	catch (e) {
		res.status(500).json({ error: "Internal server error : ", e });
	}
});

async function hashPassword(password) {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
}

// Compare password
async function comparePassword(password, hash) {
	return await bcrypt.compare(password, hash);
}

async function login(req, res, next) {
	try {
		const { username, password } = req.headers;
		await poolConnect;
		const request = pool.request();
		const result = await request.input('Username', sql.VarChar, username)
			.query('SELECT * FROM tblUsers WHERE Username = @Username');
		if (result.recordset.length === 0) {
			return res.status(400).json({ error: "Invalid username" });
		}
		const user = result.recordset[0];
		const isValid = await comparePassword(password, user.password);
		if (!isValid) {
			return res.status(401).json({ error: "Invalid password" });
		}
		req.userID = user.userID;
		next();
	} catch (error) {
		throw error;
	}
}

async function postSession(sessionID, userID) {
	try {
		await poolConnect;
		const request = pool.request();
		const response = await request
			.input("sessionID", sql.VarChar, sessionID)
			.input("userID", sql.VarChar, userID)
			.query(`INSERT INTO tblSessions (sessionID, userID) VALUES (@sessionID, @userID)`);
		return response.rowsAffected[0] > 0 ? true : false;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

sessionsRoute.post("/", login, async (req, res) => {
	try {
		// Add new session to tblSessions
		const sessionID = uuid.v4();
		const sessionInsert = await postSession(sessionID, req.userID);
		if (sessionInsert) {
			// Return session ID
			return res.status(201).json({
				status: "success",
				sessionID: sessionID,
			});
		}
		else {
			return res.status(400).json({
				error: "Could not create session!"
			})
		}
	}
	catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

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

sessionsRoute.delete("/", authenticate, async (req, res) => {
	try {
		const user = req.user; // the same User document --dammit we should use TypeScript
		if (!response) {
			res.status(400).json({ error: "Session could not be deleted" });
		} else {
			res.status(200).json({ message: "Session deleted" });
		}
	}
	catch (e) {
		res.status(500).json({ error: "Internal server error : ", e });
	}
});

module.exports = { authenticate, hashPassword, sessionsRoute };
