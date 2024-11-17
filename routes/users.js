const express = require("express");
const bcyrpt = require("bcrypt"); // used for creating hash of password
const { sql, pool } = require("../config/config");
const uuid = require("uuid"); // used for creating session ID
const sessions = require("./sessions");

const router = express.Router();

async function getUser(username) {
	try {
		const request = pool.request();
		const response = await request
			.input("username", sql.VarChar, username)
			.query("Select * from tblUsers Where username = @username");
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

router.get("/", async (req, res) => {
	try {
		const { username } = req.header("username");
		const user = await getUser(username);
		if (!user) {
			res.status(200).json({ message: "Username available!" });
			return;
		}
		res.status(400).json({ error: "Account with that username already exists!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

async function postUser(userID, firstName, lastName, username, passwordHash, 
						emailAddress, phoneNumber, companyName, country) {
	try { // FIXME: Should I call to getuser to check if that user already exists
		const request = pool.request();
		const response = await request
			.input("userID", sql.VarChar, userID)
			.input("firstName", sql.VarChar, firstName)
			.input("lastName", sql.VarChar, lastName)
			.input("username", sql.VarChar, username)
			.input("password", sql.VarChar, passwordHash)
			.input("emailAddress", sql.VarChar, emailAddress)
			.input("phoneNumber", sql.VarChar, phoneNumber)
			.input("companyName", sql.VarChar, companyName)
			.input("country", sql.VarChar, country)
			.query(`INSERT INTO tblUsers (userID, firstName, lastName, username, password, emailAddress, phoneNumber, companyName, country)
					VALUES ('${userID}', '${firstName}', '${lastName}', '${username}', '${passwordHash}', '${emailAddress}', '${phoneNumber}',
					'${companyName}', '${country}')`);
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

router.post("/", async (req, res) => {
	try {
		// Get header fields
		const userID = req.header("userID"); // User ID
		const username = req.header("username"); // Username
		const password = req.header("password"); // Password
		const firstName = req.header("firstName"); // First name
		const lastName = req.header("lastName"); // Last name
		const emailAddress = req.header("emailAddress"); // Email address
		const phoneNumber = req.header("phoneNumber"); // Phone number
		const companyName = req.header("companyName"); // Company name
		const country = req.header("country"); // Country
		// Check if not null fields are empty
		if (!userID || !username || !password || !firstName || !lastName || !emailAddress) {
			return res.status(400).send("Missing fields");
		}
		// Username/password verification
		// FIXME: What are the username/password min requirements?
		else if (username.length < 6 || username.length > 24 ||
				 password.length < 8 || password.length > 50) {
			return res.status(400).send("Invalid username/password");
		}
		// Prevent SQL injection
		else if (!userID.match(/^[a-zA-Z0-9]+$/)) {
			return res.status(400).send("Invalid user ID");
		} else if (!username.match(/^[a-zA-Z0-9]+$/)) {
			return res.status(400).send("Invalid username");
		} else if (!firstName.match(/^[a-zA-Z]+$/)) {
			return res.status(400).send("Invalid first name");
		} else if (!lastName.match(/^[a-zA-Z]+$/)) {
			return res.status(400).send("Invalid last name");
		} else if ( !emailAddress.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
			return res.status(400).send("Invalid email address");
		} else if (phoneNumber !== undefined &&
				   !phoneNumber.match(/^\(?\d{3}\)?[\d -]?\d{3}[\d -]?\d{4}$/)) {
			return res.status(400).send("Invalid phone number");
		}
		// Handle non-required fields
		else if (companyName !== undefined && !companyName.match(/^[a-zA-Z0-9]+$/)) {
			return res.status(400).send("Invalid company name");
		}
		// FIXME: Do we want to check if the country is valid? https://www.npmjs.com/package/countries-list
		else if (country !== undefined && !country.match(/^[a-zA-Z]+$/)) {
			return res.status(400).send("Invalid country");
		} else {
			// Hash password
			const saltRounds = 10;
			const passwordHash = bcyrpt.hashSync(password, saltRounds);

			// Insert new account into database
			// FIXME: check if userID and username already exist using user var
			const user = await postUser(userID, firstName, lastName, username, 
										passwordHash, emailAddress, phoneNumber, 
										companyName, country);
			if (user) {
				// Generate session ID
				const sessionID = uuid.v4();

				// Add new session to tblSessions
				const sessionInsert = await sessions.postSession(sessionID, userID);
				if (sessionInsert) {
					// Return session ID
					return res.status(200).send({
						status: "success",
						sessionID: sessionID,
					});
				}
			} else{
				return res.status(400).send("Account not created");
			}
		}
	} catch (e) {
		console.error(e);
		return res.status(500).send("Internal server error");
	}
});

async function deleteUser() {
	try {
		const request = pool.request();
		const response = await request
			.input("userID", sql.VarChar, userID)
			.query("DELETE FROM tblUsers WHERE userID = @userID");
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

router.delete("/", async (req, res) => {
	try {
		const { userID } = req.header("userID");
		const response = deleteUser(userID);
		if (!response) {
			res.status(400).json({ error: "User not found" });
		} else {
			res.status(200).json({ message: "User deleted" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
