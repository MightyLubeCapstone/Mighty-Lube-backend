const express = require("express");
const bcrypt = require("bcrypt"); // used for creating hash of password
const { sql, pool, poolConnect } = require("../config/config");
const uuid = require("uuid"); // used for creating session ID

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
	try {
		const { username, password } = req.headers;
		await poolConnect;
		const request = pool.request();
		const result = await request.input('Username', sql.NVarChar, username)
			.query('SELECT * FROM tblUsers WHERE Username = @Username');
		if (result.recordset.length === 0) {
			return false;
		}
		const user = result.recordset[0];
		const isValid = await comparePassword(password, user.password);
		if (!isValid) {
			return false;
		}
		req.userID = user.userID;
		next();
	} catch (error) {
		console.log(error);
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

sessionsRoute.post("/", authenticate, async (req, res) => {
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

async function deleteSession(sessionID) {
	try {
		await poolConnect;
		const request = pool.request();
		const response = await request
			.input("sessionID", sql.VarChar, sessionID)
			.query("DELETE FROM tblSessions WHERE sessionID = @sessionID");
		return response.rowsAffected[0] > 0 ? true : false;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

sessionsRoute.delete("/", async (req, res) => {
	try {
		const { sessionid: sessionID } = req.headers;
		if (sessionID == null) {
			res.status(400).json({ error: "No session provided!" });
		}
		const response = await deleteSession(sessionID); // FIXME: how to handle errors
		if (!response) {
			res.status(400).json({ error: "Session not found" });
		} else {
			res.status(200).json({ message: "Session deleted" });
		}
	}
	catch (e) {
		res.status(500).json({ error: "Internal server error : ", e });
	}
});

module.exports = { hashPassword, postSession, sessionsRoute };
