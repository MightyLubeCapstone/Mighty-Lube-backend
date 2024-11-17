const express = require("express");
const bcyrpt = require("bcrypt"); // used for creating hash of password
const { sql, pool } = require("../config/config");
const uuid = require("uuid"); // used for creating session ID
const functions = require("./functions");

const router = express.Router();

async function postSession(sessionID, userID) {
	try {
		const request = pool.request();
		const response = await request
			.input("sessionID", sql.VarChar, sessionID)
			.input("userID", sql.VarChar, userID)
			.query(`INSERT INTO tblSessions (sessionID, userID) VALUES ('${sessionID}', '${userID}')`);
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

router.post("/", async (req, res) => {
	try {
        const { username, password } = req.header("username", "password");
        // Add new session to tblSessions
        const sessionInsert = await postSession(sessionID, userID);
        if (sessionInsert) {
            // Return session ID
            return res.status(200).send({
                status: "success",
                sessionID: sessionID,
            });
        }
    } 
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

async function deleteSession(sessionID) {
	try {
		const request = pool.request();
		const response = await request
			.input("sessionID", sql.VarChar, sessionID)
			.query("DELETE FROM tblSessions WHERE sessionID = @sessionID");
			if (response.rowsAffected[0] === 0) {
				res.status(400).json({ error: "Session not found" });
			} else {
				res.status(200).json({ message: "Session deleted" });
			}
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

router.delete("/", async (req, res) => {
    try {
        const { sessionID } = req.header("sessionID");
		const response = deleteSession(sessionID); // FIXME: how to handle errors
		if (!response) {
			res.status(400).json({ error: "Session not found" });
		} else {
			res.status(200).json({ message: "Session deleted" });
		}
    } 
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = {postSession};
